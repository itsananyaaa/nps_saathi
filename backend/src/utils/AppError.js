class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.status = statusCode;
        this.code = code || 'API_ERROR';
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
