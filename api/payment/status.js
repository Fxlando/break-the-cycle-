function parseCookies(header) {
  if (!header) return {};
  return header.split(';').reduce((acc, part) => {
    const [key, ...rest] = part.trim().split('=');
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join('=') || '');
    return acc;
  }, {});
}

module.exports = (req, res) => {
  const cookies = parseCookies(req.headers?.cookie || '');
  const paid = cookies.quiz_paid === 'true';
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ paid }));
};
