const {
  normalizeTrack,
  isMembershipActive
} = require('./membership-service');

const DISCORD_API_BASE = 'https://discord.com/api/v10';

const TRACK_ROLE_ENV_MAP = {
  CAREER_PIVOT: 'DISCORD_ROLE_CAREER_PIVOT_ID',
  SKILL_BUILD: 'DISCORD_ROLE_SKILL_BUILD_ID',
  ROUTINE_RESET: 'DISCORD_ROLE_ROUTINE_RESET_ID',
  SIDE_PATHS: 'DISCORD_ROLE_SIDE_PATHS_ID'
};

function getDiscordConfig() {
  const redirectUri = (process.env.DISCORD_REDIRECT_URI || '').trim();
  return {
    clientId: (process.env.DISCORD_CLIENT_ID || '').trim(),
    clientSecret: (process.env.DISCORD_CLIENT_SECRET || '').trim(),
    botToken: (process.env.DISCORD_BOT_TOKEN || '').trim(),
    guildId: (process.env.DISCORD_GUILD_ID || '').trim(),
    redirectUri,
    memberRoleId: (process.env.DISCORD_ROLE_MEMBER_ID || '').trim(),
    inviteUrl: (process.env.DISCORD_SERVER_INVITE_URL || '').trim(),
    trackRoleIds: Object.fromEntries(
      Object.entries(TRACK_ROLE_ENV_MAP).map(([track, envKey]) => [track, (process.env[envKey] || '').trim()])
    )
  };
}

function normalizeUrlForComparison(raw) {
  try {
    const url = new URL(String(raw || '').trim());
    url.hash = '';
    url.search = '';
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    return url.toString();
  } catch (_) {
    return '';
  }
}

function buildExpectedDiscordRedirectUri(frontendUrl) {
  try {
    const url = new URL(String(frontendUrl || '').trim());
    url.hash = '';
    url.search = '';
    url.pathname = '/api/discord/callback';
    return url.toString();
  } catch (_) {
    return '';
  }
}

function getDiscordOAuthConfigStatus({ frontendUrl } = {}) {
  const config = getDiscordConfig();
  const missing = [];
  if (!config.clientId) missing.push('DISCORD_CLIENT_ID');
  if (!config.clientSecret) missing.push('DISCORD_CLIENT_SECRET');
  if (!config.redirectUri) missing.push('DISCORD_REDIRECT_URI');

  const expectedRedirectUri = buildExpectedDiscordRedirectUri(frontendUrl);
  const actualRedirectUri = normalizeUrlForComparison(config.redirectUri);
  const issues = [];

  if (missing.length) {
    issues.push(`Missing required Discord OAuth env: ${missing.join(', ')}`);
  } else if (!actualRedirectUri) {
    issues.push('DISCORD_REDIRECT_URI is invalid.');
  }

  if (expectedRedirectUri && actualRedirectUri && actualRedirectUri !== expectedRedirectUri) {
    issues.push(`DISCORD_REDIRECT_URI should be ${expectedRedirectUri} but is ${actualRedirectUri}.`);
  }

  return {
    ok: issues.length === 0,
    issues,
    missing,
    expectedRedirectUri,
    actualRedirectUri
  };
}

function hasDiscordOAuthConfig() {
  const config = getDiscordConfig();
  return Boolean(config.clientId && config.clientSecret && config.redirectUri);
}

function hasDiscordGuildConfig() {
  const config = getDiscordConfig();
  return Boolean(config.botToken && config.guildId);
}

function buildDiscordAuthUrl({ state }) {
  const config = getDiscordConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: 'identify guilds.join',
    prompt: 'consent',
    state
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

async function discordFetch(path, options = {}) {
  const res = await fetch(`${DISCORD_API_BASE}${path}`, options);
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = { raw: text };
  }
  if (!res.ok) {
    const error = new Error(data?.message || `Discord API error ${res.status}`);
    error.statusCode = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

async function exchangeDiscordCode({ code }) {
  const config = getDiscordConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.redirectUri
  });

  const res = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = { raw: text };
  }
  if (!res.ok) {
    const error = new Error(data?.error_description || data?.message || 'Discord token exchange failed');
    error.statusCode = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

async function fetchDiscordIdentity(accessToken) {
  return discordFetch('/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

async function joinGuildMember({ discordUserId, accessToken }) {
  const config = getDiscordConfig();
  if (!config.botToken || !config.guildId || !discordUserId || !accessToken) return false;
  await discordFetch(`/guilds/${config.guildId}/members/${discordUserId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${config.botToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ access_token: accessToken })
  });
  return true;
}

function getRoleIdsForMember({ membershipStatus, tracks = [] }) {
  const config = getDiscordConfig();
  const roleIds = [];
  if (isMembershipActive(membershipStatus) && config.memberRoleId) {
    roleIds.push(config.memberRoleId);
  }
  for (const track of tracks) {
    const normalized = normalizeTrack(track);
    const roleId = normalized ? config.trackRoleIds[normalized] : '';
    if (roleId && !roleIds.includes(roleId)) roleIds.push(roleId);
  }
  return roleIds;
}

async function fetchGuildMember(discordUserId) {
  const config = getDiscordConfig();
  if (!config.botToken || !config.guildId || !discordUserId) return null;
  return discordFetch(`/guilds/${config.guildId}/members/${discordUserId}`, {
    headers: { Authorization: `Bot ${config.botToken}` }
  });
}

async function syncDiscordMemberRoles({ discordUserId, membershipStatus, tracks = [] }) {
  const config = getDiscordConfig();
  if (!config.botToken || !config.guildId || !discordUserId) return { ok: false, reason: 'missing_config' };

  const desiredRoles = getRoleIdsForMember({ membershipStatus, tracks });
  const trackRoleIds = Object.values(config.trackRoleIds).filter(Boolean);
  const managedRoleIds = [config.memberRoleId, ...trackRoleIds].filter(Boolean);

  const member = await fetchGuildMember(discordUserId);
  const existingRoles = Array.isArray(member?.roles) ? member.roles : [];
  const retainedRoles = existingRoles.filter((roleId) => !managedRoleIds.includes(roleId));
  const nextRoles = Array.from(new Set([...retainedRoles, ...desiredRoles]));

  await discordFetch(`/guilds/${config.guildId}/members/${discordUserId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bot ${config.botToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ roles: nextRoles })
  });

  return { ok: true, roleIds: nextRoles };
}

function buildDiscordAvatarUrl(identity) {
  if (!identity?.id || !identity?.avatar) return null;
  return `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.png?size=256`;
}

module.exports = {
  getDiscordConfig,
  getDiscordOAuthConfigStatus,
  hasDiscordOAuthConfig,
  hasDiscordGuildConfig,
  buildDiscordAuthUrl,
  buildExpectedDiscordRedirectUri,
  exchangeDiscordCode,
  fetchDiscordIdentity,
  joinGuildMember,
  syncDiscordMemberRoles,
  getRoleIdsForMember,
  buildDiscordAvatarUrl
};
