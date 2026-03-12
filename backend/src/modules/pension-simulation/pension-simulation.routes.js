const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const { simulationLimiter } = require('../../middleware/rate-limit.middleware');
const prisma = require('../../config/db');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');
const cache = require('../../utils/cache');
const crypto = require('crypto');

// @route   POST /pension-simulation/forecast
// @desc    Calculate advanced retirement forecast scenarios based on inputs
router.post('/forecast', protect, simulationLimiter, async (req, res, next) => {
    try {
        const {
            current_age,
            retirement_age,
            monthly_contribution,
            salary,
            risk_appetite,
            expectedReturns = 10,
            inflationRate = 6,
            salaryGrowthRate = 5
        } = req.body;

        // Map to internal logic variables
        const currentAge = current_age;
        const retirementAge = retirement_age || 60;
        const monthlyContribution = monthly_contribution;
        const riskProfile = risk_appetite || 'balanced';

        const userId = req.user.id;

        // Create a unique cache key based on simulation parameters
        const paramsHash = crypto.createHash('md5').update(JSON.stringify({
            currentAge, retirementAge, monthlyContribution, salary, riskProfile
        })).digest('hex');
        const cacheKey = `simulation_${userId}_${paramsHash}`;

        const cachedResult = cache.get(cacheKey);
        if (cachedResult) {
            return res.status(200).json({ success: true, data: cachedResult });
        }

        if (!currentAge || !monthlyContribution) {
            return next(new AppError('Missing required simulation inputs (age, contribution).', 400, 'VALIDATION_ERROR'));
        }

        const yearsToRetire = retirementAge - currentAge;

        // Define scenarios matrix mapping
        const returns = { conservative: 8, balanced: 10, aggressive: 12 };
        const baseReturn = returns[riskProfile] || expectedReturns;

        const generateProjection = (ratePercent) => {
            let currentCorpus = 0;
            let totalContributions = 0;
            let yearlyContribution = monthlyContribution * 12;
            const rate = ratePercent / 100;

            const dataPoints = [];

            for (let year = 1; year <= yearsToRetire; year++) {
                totalContributions += yearlyContribution;
                currentCorpus = (currentCorpus + yearlyContribution) * (1 + rate);

                dataPoints.push({
                    age: currentAge + year,
                    corpus: Math.round(currentCorpus)
                });
            }

            const annuityPurchase = currentCorpus * 0.40;
            const estimatedMonthlyPension = (annuityPurchase * 0.06) / 12 + (currentCorpus * 0.6) / (20 * 12);

            return {
                projectedCorpus: Math.round(currentCorpus),
                estimatedMonthlyPension: Math.round(estimatedMonthlyPension),
                yearlyData: dataPoints
            };
        };

        const projectionResult = {
            conservative: generateProjection(8),
            balanced: generateProjection(10),
            aggressive: generateProjection(12)
        };

        const activeScenario = projectionResult[riskProfile] || projectionResult.balanced;

        const responseData = {
            projectedCorpus: activeScenario.projectedCorpus,
            projectedMonthlyPension: activeScenario.estimatedMonthlyPension,
            yearlyProjectionData: activeScenario.yearlyData,
            scenarios: projectionResult // For the scenario comparison bar chart
        };

        // Store in DB
        await prisma.simulationResult.create({
            data: {
                user_id: userId,
                simulation_parameters: { current_age, retirement_age, monthly_contribution, salary, risk_appetite },
                projection_result: responseData
            }
        });

        cache.set(cacheKey, responseData, 600);

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
