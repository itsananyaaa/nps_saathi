const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const userId = req.user ? req.user.id : null;
        let level = 'info';

        if (res.statusCode >= 400 && res.statusCode < 500) {
            level = 'warn';
        } else if (res.statusCode >= 500) {
            level = 'error';
        }

        logger.log({
            level,
            message: `${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`,
            module: 'http',
            userId,
            route: req.originalUrl
        });
    });

    next();
};

module.exports = requestLogger;
