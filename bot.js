require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  Partials,
  SlashCommandBuilder
} = require('discord.js');
const { prisma } = require('./app');
const { isMembershipActive, normalizeTrack, trackLabel } = require('./membership-service');
const { extractTopMatches, generateMentorReply, getMentorRuntimeSummary } = require('./mentor-service');
const { syncDiscordMemberRoles } = require('./discord-service');

const DISCORD_BOT_TOKEN = (process.env.DISCORD_BOT_TOKEN || '').trim();
const DISCORD_GUILD_ID = (process.env.DISCORD_GUILD_ID || '').trim();
const MENTOR_DAILY_LIMIT = parseInt(process.env.MENTOR_DAILY_LIMIT || '3', 10);
const DM_SWEEP_INTERVAL_MS = parseInt(process.env.MENTOR_DM_SWEEP_INTERVAL_MS || String(1000 * 60 * 60 * 6), 10);

if (!DISCORD_BOT_TOKEN) {
  throw new Error('DISCORD_BOT_TOKEN is required to run the Discord bot.');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

const commandBuilders = [
  new SlashCommandBuilder()
    .setName('goal')
    .setDescription('Set a concrete goal for this week.')
    .addStringOption((option) => option.setName('title').setDescription('What are you trying to finish?').setRequired(true))
    .addStringOption((option) => option.setName('notes').setDescription('Optional notes or constraints'))
    .addStringOption((option) => option.setName('track').setDescription('Optional track').addChoices(
      { name: 'Career Pivot', value: 'CAREER_PIVOT' },
      { name: 'Skill Build', value: 'SKILL_BUILD' },
      { name: 'Routine Reset', value: 'ROUTINE_RESET' },
      { name: 'Side Paths', value: 'SIDE_PATHS' }
    )),
  new SlashCommandBuilder()
    .setName('checkin')
    .setDescription('Log progress, a blocker, or a small win.')
    .addStringOption((option) => option.setName('summary').setDescription('What happened this week?').setRequired(true))
    .addStringOption((option) => option.setName('win').setDescription('Small win'))
    .addStringOption((option) => option.setName('blocker').setDescription('What got in the way?'))
    .addStringOption((option) => option.setName('momentum').setDescription('Energy level').addChoices(
      { name: 'Low', value: 'low' },
      { name: 'Medium', value: 'medium' },
      { name: 'High', value: 'high' }
    )),
  new SlashCommandBuilder()
    .setName('nextstep')
    .setDescription('Get the sharpest next move based on your quiz and progress.'),
  new SlashCommandBuilder()
    .setName('stuck')
    .setDescription('Get help shrinking a problem when you are spinning.')
    .addStringOption((option) => option.setName('details').setDescription('What are you stuck on?').setRequired(false)),
  new SlashCommandBuilder()
    .setName('roadmap')
    .setDescription('See the lane your current results are pointing toward.'),
  new SlashCommandBuilder()
    .setName('ask-mentor')
    .setDescription('Ask the accountability mentor a focused question.')
    .addStringOption((option) => option.setName('question').setDescription('Your question').setRequired(true))
];

function toModeLabel(mode) {
  return String(mode || '').toLowerCase();
}

async function registerCommands() {
  const payload = commandBuilders.map((builder) => builder.toJSON());
  if (DISCORD_GUILD_ID) {
    const guild = await client.guilds.fetch(DISCORD_GUILD_ID);
    await guild.commands.set(payload);
    return;
  }
  await client.application.commands.set(payload);
}

async function loadMemberSnapshotByDiscordId(discordId) {
  const user = await prisma.user.findUnique({
    where: { discordId },
    include: { membership: true }
  });
  if (!user) return null;

  const [goals, checkIns, latestRun] = await Promise.all([
    prisma.memberGoal.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    prisma.memberCheckIn.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.quizRun.findFirst({
      where: { userId: user.id },
      orderBy: { completedAt: 'desc' }
    })
  ]);

  return { user, membership: user.membership, goals, checkIns, latestRun };
}

async function requireMemberSnapshot(interaction) {
  const snapshot = await loadMemberSnapshotByDiscordId(interaction.user.id);
  if (!snapshot) {
    await interaction.reply({
      ephemeral: true,
      content: 'Your Discord account is not connected to Break the Cycle yet. Connect it from the website first.'
    });
    return null;
  }
  if (!isMembershipActive(snapshot.membership?.status)) {
    await interaction.reply({
      ephemeral: true,
      content: 'Your membership is not active right now. Renew it on the website to unlock the mentor and member tools.'
    });
    return null;
  }
  return snapshot;
}

async function mentorUsageCountToday(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return prisma.eventLog.count({
    where: {
      userId,
      name: 'mentor_prompt',
      createdAt: { gte: start }
    }
  });
}

async function enforceMentorLimit(interaction, snapshot) {
  const count = await mentorUsageCountToday(snapshot.user.id);
  if (count >= MENTOR_DAILY_LIMIT) {
    await interaction.reply({
      ephemeral: true,
      content: `You have already used ${MENTOR_DAILY_LIMIT} mentor prompts today. Use /checkin or come back tomorrow for a fresh answer.`
    });
    return false;
  }
  return true;
}

async function logMentorUsage(userId, command, prompt = '') {
  await prisma.eventLog.create({
    data: {
      userId,
      name: 'mentor_prompt',
      properties: { command, prompt }
    }
  });
}

function formatRoadmap(snapshot) {
  const matches = extractTopMatches(snapshot.latestRun);
  const goal = snapshot.goals[0];
  const first = matches[0];
  const lines = [
    `Track: ${trackLabel(snapshot.user.primaryTrack)}`,
    `Quiz mode: ${toModeLabel(snapshot.latestRun?.mode) || 'not saved yet'}`
  ];
  if (first) {
    lines.push(`Top lane: ${first.name}${first.category ? ` (${first.category})` : ''}`);
    if (first.nextMove) lines.push(`Best next move: ${String(first.nextMove).slice(0, 240)}`);
  }
  if (goal) {
    lines.push(`Current goal: ${goal.title}`);
  } else {
    lines.push('Current goal: none set yet');
  }
  return lines.join('\n');
}

async function handleGoal(interaction) {
  const snapshot = await requireMemberSnapshot(interaction);
  if (!snapshot) return;

  const title = interaction.options.getString('title', true).trim();
  const notes = interaction.options.getString('notes');
  const requestedTrack = normalizeTrack(interaction.options.getString('track'));
  const track = requestedTrack || snapshot.user.primaryTrack || null;

  const goal = await prisma.memberGoal.create({
    data: {
      userId: snapshot.user.id,
      title,
      notes: notes || null,
      track
    }
  });

  await interaction.reply({
    ephemeral: true,
    content: `Locked in. Your goal is now "${goal.title}". Check back in with /checkin after you put real time into it.`
  });
}

async function handleCheckIn(interaction) {
  const snapshot = await requireMemberSnapshot(interaction);
  if (!snapshot) return;

  const summary = interaction.options.getString('summary', true).trim();
  const blocker = interaction.options.getString('blocker');
  const win = interaction.options.getString('win');
  const momentum = interaction.options.getString('momentum');

  await prisma.memberCheckIn.create({
    data: {
      userId: snapshot.user.id,
      track: snapshot.user.primaryTrack || null,
      summary,
      blocker: blocker || null,
      win: win || null,
      momentum: momentum || null,
      kind: 'discord_slash'
    }
  });

  await interaction.reply({
    ephemeral: true,
    content: win
      ? `Check-in saved. Good. Keep the win "${win}" visible and make the next move smaller than you think it needs to be.`
      : 'Check-in saved. Good. Now make the next move small enough that you will actually do it this week.'
  });
}

async function handleMentor(interaction, kind, prompt) {
  const snapshot = await requireMemberSnapshot(interaction);
  if (!snapshot) return;
  const allowed = await enforceMentorLimit(interaction, snapshot);
  if (!allowed) return;

  const reply = await generateMentorReply({
    kind,
    prompt,
    snapshot
  });
  await logMentorUsage(snapshot.user.id, kind, prompt);
  await interaction.reply({ ephemeral: true, content: reply });
}

async function handleRoadmap(interaction) {
  const snapshot = await requireMemberSnapshot(interaction);
  if (!snapshot) return;
  await interaction.reply({
    ephemeral: true,
    content: formatRoadmap(snapshot)
  });
}

async function maybeSendNudges() {
  const cutoff = new Date(Date.now() - (1000 * 60 * 60 * 24 * 6));
  const recentDmCutoff = new Date(Date.now() - (1000 * 60 * 60 * 20));

  const members = await prisma.user.findMany({
    where: {
      discordId: { not: null },
      membership: {
        is: {
          status: { in: ['ACTIVE', 'TRIALING'] }
        }
      }
    },
    include: {
      membership: true,
      memberCheckIns: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      memberGoals: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    take: 50
  });

  for (const member of members) {
    const lastCheckIn = member.memberCheckIns[0];
    if (lastCheckIn && lastCheckIn.createdAt > cutoff) continue;

    const alreadyMessaged = await prisma.eventLog.findFirst({
      where: {
        userId: member.id,
        name: 'mentor_dm_sent',
        createdAt: { gte: recentDmCutoff }
      }
    });
    if (alreadyMessaged) continue;

    try {
      const user = await client.users.fetch(member.discordId);
      const goal = member.memberGoals[0];
      const message = goal
        ? `Quick nudge: you said this mattered this week -> "${goal.title}". What is the 20-minute version you can still do today? Reply with /checkin when you touch it.`
        : 'Quick nudge: do not restart your whole life tonight. Pick one small move, set it with /goal, then come back with /checkin.';
      await user.send(message);
      await prisma.eventLog.create({
        data: {
          userId: member.id,
          name: 'mentor_dm_sent',
          properties: { kind: 'accountability_nudge' }
        }
      });
    } catch (err) {
      console.warn('mentor dm failed', member.discordId, err?.message || err);
    }
  }
}

client.once('clientReady', async () => {
  console.log(`Break the Cycle bot ready as ${client.user.tag}`);
  const mentorRuntime = getMentorRuntimeSummary();
  console.log(`Mentor provider: ${mentorRuntime.provider}${mentorRuntime.model ? ` (${mentorRuntime.model})` : ''}`);
  await registerCommands();
  setInterval(() => {
    maybeSendNudges().catch((err) => console.error('nudge sweep error', err));
  }, DM_SWEEP_INTERVAL_MS);
  maybeSendNudges().catch((err) => console.error('initial nudge sweep error', err));
});

client.on('guildMemberAdd', async (member) => {
  try {
    const user = await prisma.user.findUnique({
      where: { discordId: member.id },
      include: { membership: true }
    });
    if (!user) return;
    await syncDiscordMemberRoles({
      discordUserId: member.id,
      membershipStatus: user.membership?.status || 'INACTIVE',
      tracks: user.primaryTrack ? [user.primaryTrack] : []
    });
  } catch (err) {
    console.warn('guildMemberAdd sync failed', err?.message || err);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case 'goal':
        await handleGoal(interaction);
        break;
      case 'checkin':
        await handleCheckIn(interaction);
        break;
      case 'nextstep':
        await handleMentor(interaction, 'nextstep', '');
        break;
      case 'stuck':
        await handleMentor(interaction, 'stuck', interaction.options.getString('details') || '');
        break;
      case 'roadmap':
        await handleRoadmap(interaction);
        break;
      case 'ask-mentor':
        await handleMentor(interaction, 'ask', interaction.options.getString('question', true));
        break;
      default:
        await interaction.reply({ ephemeral: true, content: 'Unknown command.' });
        break;
    }
  } catch (err) {
    console.error('interaction handler error', err);
    const replyPayload = {
      ephemeral: true,
      content: 'Something went wrong on my side. Try again in a moment.'
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(replyPayload).catch(() => {});
    } else {
      await interaction.reply(replyPayload).catch(() => {});
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
