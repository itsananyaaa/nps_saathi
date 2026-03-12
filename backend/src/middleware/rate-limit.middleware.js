const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

const createLimiter = (windowMs, max, message, moduleName) => {
    return rateLimit({
        windowMs,
        max,
        message: { 
            success: false, 
            error: {
                code: 'TOO_MANY_REQUESTS',
                message 
            }
        },
        handler: (req, res, next, options) => {
            logger.warn(`SUSPICIOUS ACTIVITY: Rate limit exceeded for IP: ${req.ip}`, { 
                module: moduleName, 
                route: req.originalUrl,
                method: req.method
            });
            res.status(options.statusCode).send(options.message);
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

// Sensitive auth routes: 5 attempts per 15 mins
const authLimiter = createLimiter(
    15 * 60 * 1000, 
    5, 
    'Too many login/registration attempts. Please try again after 15 minutes.',
    'Auth'
);

// Simulation engine: 10 requests per hour (heavy computation)
const simulationLimiter = createLimiter(
    60 * 60 * 1000, 
    10, 
    'Simulation limit reached. Please wait an hour before requesting more forecasts.',
    'Simulation'
);

// Aggregator routes: 20 requests per 15 mins
const aggregatorLimiter = createLimiter(
    15 * 60 * 1000, 
    20, 
    'Too many aggregator requests. Please slow down.',
    'Aggregator'
);

module.exports = {
    authLimiter,
    simulationLimiter,
    aggregatorLimiter
};
