const { buildApp } = require('../app');

const EXTERNAL_API_ORIGIN = String(process.env.EXTERNAL_API_ORIGIN || '').trim().replace(/\/+$/, '');
const app = buildApp();

function getPathSegment(req) {
  if (typeof req.query?.path === 'string') return req.query.path;
  if (Array.isArray(req.query?.path)) return req.query.path.join('/');
  return '';
}

async function readRawBody(req) {
  if (req.body == null) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
      req.on('end', () => resolve(chunks.length ? Buffer.concat(chunks) : null));
      req.on('error', reject);
    });
  }

  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return Buffer.from(req.body);
  if (typeof req.body === 'object') return Buffer.from(JSON.stringify(req.body));
  return null;
}

async function proxyToExternalOrigin(req, res) {
  const targetBase = new URL(EXTERNAL_API_ORIGIN);
  const targetPath = getPathSegment(req);
  const targetUrl = new URL(targetPath ? `/api/${targetPath}` : '/api', targetBase);

  for (const [key, value] of Object.entries(req.query || {})) {
    if (key === 'path') continue;
    if (Array.isArray(value)) {
      for (const item of value) targetUrl.searchParams.append(key, String(item));
    } else if (value != null) {
      targetUrl.searchParams.set(key, String(value));
    }
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (value == null) continue;
    const lower = key.toLowerCase();
    if (['host', 'content-length', 'connection'].includes(lower)) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, value);
    }
  }
  headers.set('x-btc-proxied-by', 'vercel-api-index');

  const method = String(req.method || 'GET').toUpperCase();
  const body = method === 'GET' || method === 'HEAD' ? undefined : await readRawBody(req);

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body,
    // Preserve upstream 3xx responses so the browser receives the original
    // redirect plus any auth cookies instead of the proxy following it first.
    redirect: 'manual'
  });

  res.statusCode = upstream.status;
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (['content-length', 'transfer-encoding', 'connection'].includes(lower)) return;
    if (lower !== 'set-cookie') {
      res.setHeader(key, value);
    }
  });

  const setCookie = typeof upstream.headers.getSetCookie === 'function'
    ? upstream.headers.getSetCookie()
    : [];
  if (setCookie.length) {
    res.setHeader('Set-Cookie', setCookie);
  }

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.end(buffer);
}

module.exports = async (req, res) => {
  if (EXTERNAL_API_ORIGIN) {
    return proxyToExternalOrigin(req, res);
  }
  return app(req, res);
};
