const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let code = err.code || 'INTERNAL_ERROR';

    // Prisma Error Interception
    if (err.code === 'P2002') {
        statusCode = 409;
        code = 'P2002';
        message = 'Duplicate unique field value entered';
    } else if (err.code === 'P2025') {
        statusCode = 404;
        code = 'P2025';
        message = 'Record not found';
    }

    logger.error(message, { module: 'Error', route: req.originalUrl, method: req.method, status: statusCode, errCode: code });

    const errorResponse = {
        code,
        message
    };

    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stack = err.stack;
        if (statusCode === 500) {
            logger.error(err.stack, { module: 'Error Stack' });
        }
    }

    res.status(statusCode).json({
        success: false,
        error: errorResponse
    });
};

module.exports = errorHandler;
