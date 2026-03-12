const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const AppError = require('../utils/AppError');

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'npssaathi123');
            req.user = decoded; // Attaches { id, email } to the request
            return next();
        } catch (error) {
            logger.warn(`SUSPICIOUS ACTIVITY: Invalid JWT token attempt from IP: ${req.ip}`, { 
                module: 'Auth', 
                route: req.originalUrl,
                error: error.message 
            });
            return next(new AppError('Not authorized, token failed', 401, 'UNAUTHORIZED'));
        }
    }

    if (!token) {
        logger.warn('Unauthorized request blocked: No token provided', { module: 'Auth', route: req.originalUrl });
        return next(new AppError('Not authorized, no token provided', 401, 'UNAUTHORIZED'));
    }
};

module.exports = { protect };
