const { buildApp, prisma } = require('./app');

const app = buildApp();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Break the Cycle server listening on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
