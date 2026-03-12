const jwt = require('jsonwebtoken');
const db = require('../config/db');
const logger = require('../utils/logger');
const AppError = require('../utils/AppError');

/**
 * JWT Authentication Middleware
 * Protects routes and attaches user object to request
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from database (excluding sensitive fields)
            const result = await db.query(
                'SELECT id, email, role FROM users WHERE id = $1',
                [decoded.id]
            );

            if (result.rows.length === 0) {
                return next(new AppError('Not authorized, user no longer exists', 401, 'UNAUTHORIZED'));
            }

            req.user = result.rows[0];
            next();
        } catch (error) {
            logger.error('Auth Middleware Error', { error: error.message, module: 'Auth', route: req.originalUrl });
            next(new AppError('Not authorized, token failed', 401, 'UNAUTHORIZED'));
        }
    }

    if (!token) {
        next(new AppError('Not authorized, no token', 401, 'UNAUTHORIZED'));
    }
};

/**
 * Role-based Access Control
 * Restricts access to specific user roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`User role ${req.user.role} is not authorized to access this route`, 403, 'FORBIDDEN'));
        }
        next();
    };
};

module.exports = { protect, authorize };
