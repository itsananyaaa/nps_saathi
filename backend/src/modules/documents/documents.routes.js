const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const prisma = require('../../config/db');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

// @route   POST /documents/link-digilocker
// @desc    Link user account to DigiLocker
router.post('/link-digilocker', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;

        logger.info('Linking account', { module: 'documents', userId, route: req.originalUrl });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { digilocker_linked: true },
            select: { id: true, digilocker_linked: true }
        });

        logger.info('Success: User is now linked', { module: 'documents', userId, route: req.originalUrl });

        res.status(200).json({
            success: true,
            message: 'DigiLocker linked successfully',
            data: updatedUser
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return next(new AppError('User not found in database for linking', 404, 'NOT_FOUND'));
        }
        next(error);
    }
});

// @route   GET /documents/digilocker
// @desc    Mock DigiLocker retrieval integration & sync with local DB
router.get('/digilocker', protect, async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 1. Simulate API call to DigiLocker API Sandbox
        logger.info('Sandbox Request initiated', { module: 'documents', userId, route: req.originalUrl });

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock network latency

        // Mock Response from Sandbox matching frontend requirements
        const sandboxDocuments = [
            {
                id: `dl_${userId}_nps`,
                type: 'NPS Statement',
                key: 'nps_statement',
                authority: 'PFRDA',
                status: 'available',
                downloadUrl: 'https://npscra.nsdl.co.in/download/statement'
            },
            {
                id: `dl_${userId}_pan`,
                type: 'PAN Card',
                key: 'kyc_docs',
                authority: 'IT Department',
                status: 'available',
                downloadUrl: 'https://web.umang.gov.in/landing/pan'
            },
            {
                id: `dl_${userId}_pension`,
                type: 'Pension Certificate',
                key: 'pension_cert',
                authority: 'PFRDA',
                status: 'pending',
                downloadUrl: '#'
            }
        ];

        logger.info(`Sandbox Response: Retrieved ${sandboxDocuments.length} documents.`, { module: 'documents', userId, route: req.originalUrl });

        // Sync retrieved documents with Prisma DB
        const savedDocuments = [];

        for (const doc of sandboxDocuments) {
            const savedDoc = await prisma.documents.upsert({
                where: {
                    digilocker_reference_id: doc.id
                },
                update: {
                    retrieved_at: new Date()
                },
                create: {
                    user_id: userId,
                    document_type: doc.type,
                    digilocker_reference_id: doc.id,
                    retrieved_at: new Date()
                }
            });

            // Merge back the extra mock fields for the final response
            savedDocuments.push({
                ...savedDoc,
                key: doc.key,
                authority: doc.authority,
                status: doc.status,
                downloadUrl: doc.downloadUrl
            });
        }

        res.status(200).json({
            success: true,
            message: 'Documents retrieved from DigiLocker sandbox and synced to database',
            data: savedDocuments
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
