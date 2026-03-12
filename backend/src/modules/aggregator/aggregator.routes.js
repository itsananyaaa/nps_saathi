const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const { aggregatorLimiter } = require('../../middleware/rate-limit.middleware');
const prisma = require('../../config/db');
const { v4: uuidv4 } = require('uuid');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

// @route   POST /aggregator/consent
// @desc    Initiate Account Aggregator consent request
router.post('/consent', protect, aggregatorLimiter, async (req, res, next) => {
    try {
        const { fipId, purpose } = req.body;
        const userId = req.user.id;

        // 1. Generate unique consent ID
        const consentId = uuidv4();

        // 2. Store consent in pending state
        const consent = await prisma.aggregatorConsent.create({
            data: {
                user_id: userId,
                consent_id: consentId,
                consent_status: 'pending'
            }
        });

        logger.info(`Consent created - ID: ${consentId}, Status: pending`, { module: 'aggregator', userId, route: req.originalUrl });

        // 3. Simulate asynchronous user approval flow (webhook/callback simulation)
        setTimeout(async () => {
            try {
                await prisma.aggregatorConsent.update({
                    where: { consent_id: consentId },
                    data: { consent_status: 'approved' }
                });
                logger.info(`Consent approved - ID: ${consentId}`, { module: 'aggregator', userId, route: req.originalUrl });
            } catch (err) {
                logger.error(`Failed to auto-approve consent ${consentId}`, { module: 'aggregator', userId, route: req.originalUrl, error: err.message });
            }
        }, 2000); // 2 second delay for approval simulation

        res.status(202).json({
            success: true,
            message: 'Consent request initiated. Please approve the consent via the AA app.',
            data: {
                consentId: consent.consent_id,
                status: consent.consent_status,
                fipId,
                purpose
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /aggregator/data/:consentId
// @desc    Fetch aggregated financial information from FIUs via AA
router.get('/data/:consentId', protect, aggregatorLimiter, async (req, res, next) => {
    try {
        const { consentId } = req.params;
        const userId = req.user.id;

        // 1. Validate Consent
        const consent = await prisma.aggregatorConsent.findUnique({
            where: { consent_id: consentId }
        });

        if (!consent || consent.user_id !== userId) {
            return next(new AppError('Consent not found or unauthorized', 404, 'NOT_FOUND'));
        }

        if (consent.consent_status !== 'approved') {
            return next(new AppError(`Cannot fetch data. Consent status is: ${consent.consent_status}`, 400, 'INVALID_CONSENT_STATUS'));
        }

        logger.info(`Validated approved consent: ${consentId}`, { module: 'aggregator', userId, route: req.originalUrl });
        logger.info('Requesting financial data from sandbox...', { module: 'aggregator', userId, route: req.originalUrl });

        // 2. Simulate API Call to AA Sandbox
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s latency

        const mockSandboxData = {
            bankAccounts: [
                { bankName: 'HDFC Bank', type: 'Savings', balance: 450000 },
                { bankName: 'ICICI Bank', type: 'Savings', balance: 125000 }
            ],
            investments: {
                mutualFunds: 850000,
                fixedDeposits: 400000,
                equities: 350000
            },
            pensionContributions: [
                { provider: 'NPS', tier: 1, balance: 1452380 }
            ]
        };

        const totalBankBalance = mockSandboxData.bankAccounts.reduce((acc, curr) => acc + curr.balance, 0);
        const totalInvestments = Object.values(mockSandboxData.investments).reduce((acc, curr) => acc + curr, 0);
        const totalNPS = mockSandboxData.pensionContributions.reduce((acc, curr) => acc + curr.balance, 0);

        // Chart-optimized data format for Frontend
        const formattedData = [
            { name: 'Bank Accounts', value: totalBankBalance, color: 'hsl(214, 80%, 32%)', key: 'bank_accounts' },
            { name: 'Investments', value: totalInvestments, color: 'hsl(142, 71%, 35%)', key: 'investments' },
            { name: 'NPS Balance', value: totalNPS, color: 'hsl(38, 92%, 50%)', key: 'nps_balance' },
        ];

        // 3. Store the retrieved data in the database
        const savedFinancialData = await prisma.financialData.create({
            data: {
                consent_id: consent.id,
                bank_balance: totalBankBalance,
                investments: mockSandboxData.investments,
                pension_contributions: mockSandboxData.pensionContributions
            }
        });

        res.status(200).json({
            success: true,
            message: 'Financial Information retrieved successfully',
            data: {
                consentId,
                totalCorpus: totalBankBalance + totalInvestments + totalNPS,
                formattedData,
                rawSandboxData: mockSandboxData
            }
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
