const winston = require('winston');

const customFormat = winston.format.printf(({ level, message, timestamp, module, userId, route, ...meta }) => {
    const logFormat = {
        timestamp,
        level,
        module: module || 'system',
        userId: userId || null,
        route: route || null,
        message,
        ...meta
    };

    // Clean up nulls for cleaner output if desired, but requirements specify structure
    if (!logFormat.userId) delete logFormat.userId;
    if (!logFormat.route) delete logFormat.route;

    return JSON.stringify(logFormat);
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        winston.format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;
