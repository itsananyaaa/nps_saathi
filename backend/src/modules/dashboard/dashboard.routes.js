const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const prisma = require('../../config/db');
const logger = require('../../utils/logger');
const cache = require('../../utils/cache');

// @route   GET /dashboard/summary
// @desc    Provide a consolidated financial overview for the authenticated user
router.get('/summary', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cacheKey = `dashboard_summary_${userId}`;
        
        // Try to retrieve from cache
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            logger.info('Serving dashboard summary from cache', { module: 'dashboard', userId });
            return res.status(200).json({
                success: true,
                message: 'Financial summary retrieved from cache',
                data: cachedData
            });
        }

        logger.info('Summary requested', { module: 'dashboard', userId, route: req.originalUrl });

        // Fetch all relevant data concurrently
        const [
            userProfile,
            financialProfile,
            pensionAccount,
            latestSimulationRaw,
            digilockerDocuments,
            aggregatedConsents
        ] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, name: true, email: true, phone: true, language_preference: true }
            }),
            prisma.financialProfile.findUnique({
                where: { user_id: userId }
            }),
            prisma.pensionAccount.findFirst({
                where: { user_id: userId },
                orderBy: { id: 'desc' }
            }),
            prisma.simulationResult.findFirst({
                where: { user_id: userId },
                orderBy: { simulation_date: 'desc' }
            }),
            prisma.documents.findMany({
                where: { user_id: userId },
                take: 5
            }),
            prisma.aggregatorConsent.findFirst({
                where: { user_id: userId, consent_status: 'approved' },
                orderBy: { created_at: 'desc' },
                include: { financial_data: { take: 1, orderBy: { id: 'desc' } } }
            })
        ]);

        // Flatten simulation projection result
        const latestSimulation = latestSimulationRaw ? {
            ...latestSimulationRaw,
            ...(latestSimulationRaw.projection_result || {})
        } : null;

        const responseData = {
            user: userProfile,
            financialProfile,
            pensionAccount: pensionAccount || null,
            latestSimulation,
            documents: digilockerDocuments,
            financialOverview: aggregatedConsents?.financial_data?.[0] || null
        };

        // Cache the result for 5 minutes
        cache.set(cacheKey, responseData);

        res.status(200).json({
            success: true,
            message: 'Financial summary retrieved successfully',
            data: responseData
        });

    } catch (error) {
        logger.error('Failed to aggregate summary', { module: 'dashboard', userId: req.user?.id, route: req.originalUrl, error: error.message });
        next(error);
    }
});

module.exports = router;
