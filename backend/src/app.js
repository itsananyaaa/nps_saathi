const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/error.middleware');
const requestLogger = require('./middleware/logger.middleware');
const sanitizeInput = require('./middleware/sanitizer.middleware');
const AppError = require('./utils/AppError');

// Route Imports
const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const financialDataRoutes = require('./modules/financial-data/financial-data.routes');
const pensionSimulationRoutes = require('./modules/pension-simulation/pension-simulation.routes');
const documentsRoutes = require('./modules/documents/documents.routes');
const aggregatorRoutes = require('./modules/aggregator/aggregator.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const assistantRoutes = require('./modules/assistant/assistant.routes');

const app = express();

// Middleware Setups
app.use(helmet()); // Set security headers
app.use(express.json({ limit: '10kb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(sanitizeInput); // Sanitize all incoming inputs

// General Request Logger Middleware
app.use(requestLogger);

// Mount API Route Groups
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/financial-data', financialDataRoutes);
app.use('/pension-simulation', pensionSimulationRoutes);
app.use('/documents', documentsRoutes);
app.use('/aggregator', aggregatorRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/assistant', assistantRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'up', message: 'NPS Saathi API is running' }));

// 404 Not Found Handler
app.use((req, res, next) => {
    next(new AppError('Route Not Found', 404, 'NOT_FOUND'));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
