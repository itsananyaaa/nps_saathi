const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const prisma = require('../../config/db');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

// ==========================================
// FINANCIAL PROFILE MANAGEMENT
// ==========================================

// @route   POST /financial-data/profile
// @desc    Create user's financial profile
router.post('/profile', protect, async (req, res, next) => {
    try {
        const { annual_income, monthly_contribution, retirement_age, risk_appetite, employment_type } = req.body;
        const userId = req.user.id;

        // Validation
        if (annual_income && isNaN(annual_income)) return next(new AppError('annual_income must be a number', 400, 'VALIDATION_ERROR'));
        if (monthly_contribution && isNaN(monthly_contribution)) return next(new AppError('monthly_contribution must be a number', 400, 'VALIDATION_ERROR'));
        if (retirement_age && (isNaN(retirement_age) || retirement_age < 18 || retirement_age > 100)) return next(new AppError('Provide a valid retirement_age', 400, 'VALIDATION_ERROR'));

        // Check if profile already exists
        const existingProfile = await prisma.financialProfile.findUnique({
            where: { user_id: userId }
        });

        if (existingProfile) {
            return next(new AppError('Financial profile already exists. Use PUT to update.', 400, 'ALREADY_EXISTS'));
        }

        const profile = await prisma.financialProfile.create({
            data: {
                user_id: userId,
                annual_income,
                monthly_contribution,
                retirement_age,
                risk_appetite,
                employment_type
            }
        });

        logger.info('Profile created', { module: 'financial-data', userId, route: req.originalUrl });
        logger.info(`Financial data stored: Profile ${profile.id}`, { module: 'database', userId, route: req.originalUrl });

        res.status(201).json({ success: true, message: 'Profile created successfully', data: profile });
    } catch (error) {
        next(error);
    }
});

// @route   GET /financial-data/profile
// @desc    Retrieve user's financial profile
router.get('/profile', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const profile = await prisma.financialProfile.findUnique({
            where: { user_id: userId },
            select: {
                annual_income: true,
                monthly_contribution: true,
                retirement_age: true,
                risk_appetite: true,
                employment_type: true
            }
        });

        if (!profile) {
            return next(new AppError('Financial profile not found', 404, 'NOT_FOUND'));
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /financial-data/profile
// @desc    Update user's financial profile
router.put('/profile', protect, async (req, res, next) => {
    try {
        const { annual_income, monthly_contribution, retirement_age, risk_appetite, employment_type } = req.body;
        const userId = req.user.id;

        // Validation
        if (annual_income && isNaN(annual_income)) return next(new AppError('annual_income must be a number', 400, 'VALIDATION_ERROR'));
        if (monthly_contribution && isNaN(monthly_contribution)) return next(new AppError('monthly_contribution must be a number', 400, 'VALIDATION_ERROR'));
        if (retirement_age && (isNaN(retirement_age) || retirement_age < 18 || retirement_age > 100)) return next(new AppError('Provide a valid retirement_age', 400, 'VALIDATION_ERROR'));

        const profile = await prisma.financialProfile.update({
            where: { user_id: userId },
            data: {
                annual_income,
                monthly_contribution,
                retirement_age,
                risk_appetite,
                employment_type
            }
        });

        logger.info('Profile updated', { module: 'financial-data', userId, route: req.originalUrl });
        logger.info(`Financial data updated: Profile ${profile.id}`, { module: 'database', userId, route: req.originalUrl });

        res.status(200).json({ success: true, message: 'Profile updated successfully', data: profile });
    } catch (error) {
        if (error.code === 'P2025') {
            return next(new AppError('Financial profile not found', 404, 'NOT_FOUND'));
        }
        next(error);
    }
});


// ==========================================
// PENSION ACCOUNT MANAGEMENT
// ==========================================

// @route   POST /financial-data/pension-account
// @desc    Store or append to user's pension account data
router.post('/pension-account', protect, async (req, res, next) => {
    try {
        const { tier1_balance, tier2_balance, new_contribution } = req.body;
        const userId = req.user.id;

        // Validation
        if (tier1_balance && isNaN(tier1_balance)) return next(new AppError('tier1_balance must be a number', 400, 'VALIDATION_ERROR'));
        if (tier2_balance && isNaN(tier2_balance)) return next(new AppError('tier2_balance must be a number', 400, 'VALIDATION_ERROR'));

        // Check if account already exists
        let pensionAccount = await prisma.pensionAccount.findFirst({
            where: { user_id: userId }
        });

        if (pensionAccount) {
            // Append contribution to history if provided
            let updatedHistory = pensionAccount.contribution_history || [];
            if (new_contribution) {
                updatedHistory.push({
                    amount: new_contribution.amount,
                    date: new_contribution.date || new Date().toISOString(),
                    type: new_contribution.type || 'Tier 1'
                });
            }

            pensionAccount = await prisma.pensionAccount.update({
                where: { id: pensionAccount.id },
                data: {
                    tier1_balance: tier1_balance !== undefined ? tier1_balance : pensionAccount.tier1_balance,
                    tier2_balance: tier2_balance !== undefined ? tier2_balance : pensionAccount.tier2_balance,
                    contribution_history: updatedHistory
                }
            });
            logger.info('Pension account data updated', { module: 'financial-data', userId, route: req.originalUrl });
        } else {
            // Create new account
            const initialHistory = new_contribution ? [{
                amount: new_contribution.amount,
                date: new_contribution.date || new Date().toISOString(),
                type: new_contribution.type || 'Tier 1'
            }] : [];

            pensionAccount = await prisma.pensionAccount.create({
                data: {
                    user_id: userId,
                    tier1_balance: tier1_balance || 0,
                    tier2_balance: tier2_balance || 0,
                    contribution_history: initialHistory
                }
            });
            logger.info('Pension account data created', { module: 'financial-data', userId, route: req.originalUrl });
        }

        logger.info('Financial data stored', { module: 'database', userId, route: req.originalUrl });

        res.status(200).json({ success: true, message: 'Pension account stored successfully', data: pensionAccount });
    } catch (error) {
        next(error);
    }
});

// @route   GET /financial-data/pension-account
// @desc    Retrieve user's pension account data
router.get('/pension-account', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const account = await prisma.pensionAccount.findFirst({
            where: { user_id: userId },
            select: {
                tier1_balance: true,
                tier2_balance: true,
                contribution_history: true
            }
        });

        if (!account) {
            return next(new AppError('Pension account not found', 404, 'NOT_FOUND'));
        }

        logger.info('Pension account data retrieved', { module: 'financial-data', userId, route: req.originalUrl });

        res.status(200).json({ success: true, data: account });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
