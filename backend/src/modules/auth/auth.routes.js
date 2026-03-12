const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const prisma = require('../../config/db');
const { authLimiter } = require('../../middleware/rate-limit.middleware');
const { protect } = require('../../middleware/auth.middleware');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

// Rate limiter moved to centralized middleware

// Implementation of generateToken logic matching environment configurations
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || 'npssaathi123', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

// @route   POST /auth/register
// @desc    Register a new user
router.post('/register', authLimiter, async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        // Strict input validation
        if (!name || !email || !password) {
            logger.warn('Registration Failed: Missing required fields', { module: 'auth', route: req.originalUrl });
            return next(new AppError('Please provide name, email, and password.', 400, 'VALIDATION_ERROR'));
        }

        // Check if user already exists
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    ...(phone ? [{ phone }] : [])
                ]
            }
        });

        if (userExists) {
            logger.warn('Registration Failed: Duplicate user email or phone', { module: 'auth', route: req.originalUrl });
            return next(new AppError('User with this email or phone already exists.', 400, 'DUPLICATE_USER'));
        }

        // Securely hash the password with bcrypt (Cost Factor: 10)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user record utilizing Prisma
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password_hash: hashedPassword,
            }
        });

        logger.info('User registered successfully', { module: 'auth', userId: user.id, route: req.originalUrl });

        // Create active session JWT
        const token = generateToken(user.id, user.email);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /auth/login
// @desc    Login and return token
router.post('/login', authLimiter, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400, 'VALIDATION_ERROR'));
        }

        // 1. Locate User
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            logger.warn(`SUSPICIOUS ACTIVITY: Failed login attempt (User not found) for email: ${email}`, { 
                module: 'auth', 
                route: req.originalUrl,
                ip: req.ip
            });
            return next(new AppError('Invalid credentials', 401, 'UNAUTHORIZED'));
        }

        // 2. Validate Password matches stored Hash securely
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            logger.warn(`SUSPICIOUS ACTIVITY: Failed login attempt (Invalid password) for email: ${email}`, { 
                module: 'auth', 
                route: req.originalUrl,
                ip: req.ip
            });
            return next(new AppError('Invalid credentials', 401, 'UNAUTHORIZED'));
        }

        logger.info('Login successful', { module: 'auth', userId: user.id, route: req.originalUrl });

        // 3. Issue Token
        const token = generateToken(user.id, user.email);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /auth/profile
// @desc    Get current user profile parameters
router.get('/profile', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                language_preference: true,
                aadhaar_linked: true,
                digilocker_linked: true,
                created_at: true
            }
        });

        if (!user) {
            return next(new AppError('User not found in database', 404, 'NOT_FOUND'));
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
