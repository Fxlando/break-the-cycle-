const { trackLabel } = require('./membership-service');

const MENTOR_PROVIDER = (process.env.MENTOR_PROVIDER || 'ollama').trim().toLowerCase();
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').trim().replace(/\/+$/, '');
const OLLAMA_MODEL = (process.env.OLLAMA_MODEL || 'llama3.2:3b').trim();
const OLLAMA_REQUEST_TIMEOUT_MS = parseInt(process.env.OLLAMA_REQUEST_TIMEOUT_MS || '45000', 10);

function extractTopMatches(latestRun) {
  const groups = [];
  if (Array.isArray(latestRun?.results?.career)) groups.push(...latestRun.results.career);
  if (Array.isArray(latestRun?.results?.life)) groups.push(...latestRun.results.life);
  return groups.slice(0, 3).map((item) => ({
    key: item?.key || '',
    name: item?.path?.name || item?.name || item?.key || 'match',
    category: item?.path?.category || item?.category || '',
    nextMove: item?.path?.whatToDo || item?.path?.description || item?.description || ''
  }));
}

function buildMemberSnapshotText(snapshot) {
  const topMatches = extractTopMatches(snapshot?.latestRun);
  const activeGoals = Array.isArray(snapshot?.goals) ? snapshot.goals.slice(0, 3) : [];
  const recentCheckIns = Array.isArray(snapshot?.checkIns) ? snapshot.checkIns.slice(0, 3) : [];

  return [
    `Primary track: ${trackLabel(snapshot?.user?.primaryTrack)}`,
    topMatches.length
      ? `Top matches: ${topMatches.map((item) => `${item.name}${item.category ? ` (${item.category})` : ''}`).join(', ')}`
      : 'Top matches: none saved yet',
    activeGoals.length
      ? `Active goals: ${activeGoals.map((goal) => goal.title).join(' | ')}`
      : 'Active goals: none set',
    recentCheckIns.length
      ? `Recent check-ins: ${recentCheckIns.map((item) => item.summary).join(' | ')}`
      : 'Recent check-ins: none logged'
  ].join('\n');
}

function buildFallbackResponse(kind, prompt, snapshot) {
  const topMatch = extractTopMatches(snapshot?.latestRun)[0];
  const goal = Array.isArray(snapshot?.goals) && snapshot.goals.length ? snapshot.goals[0] : null;
  const baseline = topMatch?.nextMove
    ? `Start with this move: ${topMatch.nextMove}`
    : 'Start with a 20-minute action that lowers uncertainty instead of trying to solve your whole future tonight.';

  if (kind === 'nextstep') {
    return [
      topMatch ? `Your strongest lane still looks like ${topMatch.name}.` : `Let's keep this practical.`,
      baseline,
      goal ? `You already set this goal: ${goal.title}` : 'Set one concrete goal for the next 7 days and keep it small enough to finish.',
      'Reply with what got in the way if you need the move shrunk down.'
    ].join('\n\n');
  }

  if (kind === 'stuck') {
    return [
      'You probably do not need a brand new direction right now. You need a smaller move.',
      goal ? `Your current goal is "${goal.title}". Cut that in half and do the easiest first step.` : 'Pick the smallest proof-of-effort version of the thing you keep postponing.',
      'Use /checkin after you do 20 minutes so the system can keep momentum with you.'
    ].join('\n\n');
  }

  return [
    'Here is the grounded version:',
    baseline,
    prompt ? `Your question: ${prompt}` : 'Ask something specific if you want a sharper answer.',
    'End this by choosing one move you can finish this week.'
  ].join('\n\n');
}

async function callMentorProvider(system, userInput) {
  if (MENTOR_PROVIDER !== 'ollama' || !OLLAMA_BASE_URL || !OLLAMA_MODEL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_REQUEST_TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        keep_alive: '10m',
        options: {
          temperature: 0.5,
          num_predict: 350
        },
        messages: [
          {
            role: 'system',
            content: system
          },
          {
            role: 'user',
            content: userInput
          }
        ]
      })
    });
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new Error(`Ollama mentor request timed out after ${OLLAMA_REQUEST_TIMEOUT_MS}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = {};
  }
  if (!res.ok) {
    throw new Error(data?.error || `Ollama mentor request failed with ${res.status}`);
  }

  return String(data?.message?.content || '').trim() || null;
}

function getMentorRuntimeSummary() {
  if (MENTOR_PROVIDER === 'ollama') {
    return {
      provider: 'ollama',
      model: OLLAMA_MODEL,
      baseUrl: OLLAMA_BASE_URL
    };
  }

  return {
    provider: MENTOR_PROVIDER || 'fallback',
    model: null,
    baseUrl: null
  };
}

async function generateMentorReply({ kind = 'ask', prompt = '', snapshot }) {
  const context = buildMemberSnapshotText(snapshot);
  const system = [
    'You are Break the Cycle, an accountability-first mentor.',
    'Be direct, calm, practical, and grounded.',
    'Do not sound like a generic therapist or life coach.',
    'Use the member context to give one next move, one smaller fallback move, and one accountability question.',
    'Keep the reply under 220 words.',
    '',
    'Member context:',
    context
  ].join('\n');

  const userInput = [
    `Mentor mode: ${kind}`,
    prompt ? `Member request: ${prompt}` : 'Member wants support.'
  ].join('\n');

  try {
    const reply = await callMentorProvider(system, userInput);
    if (reply) return reply;
  } catch (err) {
    console.warn('mentor ai fallback', err?.message || err);
  }

  return buildFallbackResponse(kind, prompt, snapshot);
}

module.exports = {
  extractTopMatches,
  buildMemberSnapshotText,
  generateMentorReply,
  getMentorRuntimeSummary
};
