const ACTIVE_MEMBERSHIP_STATUSES = new Set(['ACTIVE', 'TRIALING']);
const TRACK_ORDER = ['CAREER_PIVOT', 'SKILL_BUILD', 'ROUTINE_RESET', 'SIDE_PATHS'];
const TRACK_LABELS = {
  CAREER_PIVOT: 'Career Pivot',
  SKILL_BUILD: 'Skill Build',
  ROUTINE_RESET: 'Routine Reset',
  SIDE_PATHS: 'Side Paths'
};

function toMembershipStatus(value) {
  const normalized = String(value || '').trim().toUpperCase();
  if (['INACTIVE', 'INCOMPLETE', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID'].includes(normalized)) {
    return normalized;
  }
  const stripeMap = {
    incomplete: 'INCOMPLETE',
    trialing: 'TRIALING',
    active: 'ACTIVE',
    past_due: 'PAST_DUE',
    canceled: 'CANCELED',
    unpaid: 'UNPAID'
  };
  return stripeMap[String(value || '').trim().toLowerCase()] || 'INACTIVE';
}

function isMembershipActive(status) {
  return ACTIVE_MEMBERSHIP_STATUSES.has(toMembershipStatus(status));
}

function normalizeTrack(value) {
  const normalized = String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_');
  return TRACK_ORDER.includes(normalized) ? normalized : null;
}

function trackLabel(track) {
  const normalized = normalizeTrack(track);
  return normalized ? TRACK_LABELS[normalized] : 'General';
}

function inferTracksFromQuiz({ mode, results }) {
  const tracks = [];
  const add = (track) => {
    const normalized = normalizeTrack(track);
    if (normalized && !tracks.includes(normalized)) tracks.push(normalized);
  };

  if (mode === 'career' || mode === 'both') add('CAREER_PIVOT');
  if (mode === 'life' || mode === 'both') add('ROUTINE_RESET');

  const blob = JSON.stringify(results || {}).toLowerCase();
  if (/(developer|designer|analyst|writer|marketing|engineer|trade|electrician|plumber|ux|data|nurse|teacher|resume|portfolio)/.test(blob)) {
    add('SKILL_BUILD');
  }
  if (/(creator|youtube|podcast|stream|shopify|affiliate|business|freelance|content|ugc|community|brand)/.test(blob)) {
    add('SIDE_PATHS');
  }

  if (!tracks.length) add('CAREER_PIVOT');
  return tracks.slice(0, 2);
}

function inferPrimaryTrack({ mode, results }) {
  return inferTracksFromQuiz({ mode, results })[0] || 'CAREER_PIVOT';
}

function membershipSnapshotFromSubscription(subscription) {
  if (!subscription) {
    return {
      status: 'INACTIVE',
      stripeSubscriptionId: null,
      stripeCustomerId: null,
      stripePriceId: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false
    };
  }

  const item = Array.isArray(subscription.items?.data) ? subscription.items.data[0] : null;
  return {
    status: toMembershipStatus(subscription.status),
    stripeSubscriptionId: subscription.id || null,
    stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id || null,
    stripePriceId: item?.price?.id || null,
    currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end)
  };
}

module.exports = {
  TRACK_ORDER,
  TRACK_LABELS,
  toMembershipStatus,
  isMembershipActive,
  normalizeTrack,
  trackLabel,
  inferTracksFromQuiz,
  inferPrimaryTrack,
  membershipSnapshotFromSubscription
};
