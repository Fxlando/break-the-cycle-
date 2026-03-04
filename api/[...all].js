const serverless = require('serverless-http');
const { buildApp } = require('../app');

const app = buildApp();

module.exports = serverless(app);
