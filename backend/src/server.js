// src/server.js
require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');

const prisma = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('PostgreSQL Database connected successfully', { module: 'database' });

    app.listen(PORT, () => {
      logger.info(`NPS Saathi Server running on port ${PORT}`, { module: 'server' });
      logger.info(`Environment: ${process.env.NODE_ENV}`, { module: 'server' });
    });
  } catch (error) {
    logger.error('Failed to connect to the database', { error: error.message, module: 'database' });
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  logger.info('Disconnected from database.', { module: 'server' });
  process.exit(0);
});
