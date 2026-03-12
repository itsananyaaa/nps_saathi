const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');

router.get('/me', protect, (req, res) => res.json({ msg: 'Profile data' }));
router.put('/update', protect, (req, res) => res.json({ msg: 'Profile updated' }));

module.exports = router;
