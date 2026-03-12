const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const logger = require('../../utils/logger');

// @route   POST /assistant/query
// @desc    Get AI assistant response
router.post('/query', protect, async (req, res, next) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        logger.info(`AI Assistant query from user ${userId}: ${message}`);

        // Placeholder logic: Basic intent detection
        let reply = "I'm your NPS Saathi assistant. How can I help you today?";
        
        const msg = message.toLowerCase();
        if (msg.includes('nps') || msg.includes('pension')) {
            reply = "National Pension System (NPS) is a voluntary, defined contribution retirement savings scheme. Would you like me to simulate your pension forecast?";
        } else if (msg.includes('balance') || msg.includes('corpus')) {
            reply = "You can view your current corpus in the Financial Overview or Dashboard. Would you like me to take you there?";
        } else if (msg.includes('digilocker') || msg.includes('document')) {
            reply = "You can manage your documents and NPS statements in the DigiLocker section.";
        } else if (msg.includes('help')) {
            reply = "I can help you with pension simulations, viewing your financial overview, managing documents, or understanding NPS rules. What would you like to know?";
        }

        res.status(200).json({
            success: true,
            reply: reply
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
