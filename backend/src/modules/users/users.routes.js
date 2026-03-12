const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const AppError = require('../../utils/AppError');

// @route   GET /users/profile
// @desc    Get user profile details
router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            userId: req.user.id,
            name: 'John Doe',
            email: req.user.email,
            phone: '+91 9876543210',
            dob: '1985-05-15',
        }
    });
});

// @route   PUT /users/profile
// @desc    Update user profile
router.put('/profile', protect, (req, res) => {
    const updates = req.body;

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
            userId: req.user.id,
            ...updates
        }
    });
});

module.exports = router;
