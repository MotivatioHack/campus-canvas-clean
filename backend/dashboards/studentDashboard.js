const express = require('express');
const router = express.Router();

// Student dashboard home
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: `Welcome to Student Dashboard, ${req.user.role}!`,
        user: {
            id: req.user.id,
            role: req.user.role
        }
    });
});

module.exports = router;