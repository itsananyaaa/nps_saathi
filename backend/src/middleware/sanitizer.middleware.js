const validator = require('validator');

/**
 * Recursive function to sanitize all string fields in an object
 */
const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            // Escape HTML tags, trim whitespace
            sanitized[key] = validator.escape(obj[key].trim());
        } else if (typeof obj[key] === 'object') {
            sanitized[key] = sanitizeObject(obj[key]);
        } else {
            sanitized[key] = obj[key];
        }
    }
    return sanitized;
};

const sanitizeInput = (req, res, next) => {
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    if (req.params) {
        req.params = sanitizeObject(req.params);
    }
    next();
};

module.exports = sanitizeInput;
