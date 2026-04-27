const { buildApp } = require('../app');

const app = buildApp();

module.exports = (req, res) => app(req, res);
