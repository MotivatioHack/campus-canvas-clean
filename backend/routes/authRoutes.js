const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyRole } = require('../middleware/authMiddleware');

// Debugging: Added changePassword to the check
console.log("Checking Auth Controller Functions:", {
    login: typeof authController.login,
    updateProfile: typeof authController.updateProfile,
    changePassword: typeof authController.changePassword
});

// 1. Login Route
if (typeof authController.login === 'function') {
    router.post('/login', authController.login);
}

// 2. Update Profile Route
if (typeof authController.updateProfile === 'function') {
    router.put('/update-profile', verifyRole('student'), authController.updateProfile);
}

// 3. Change Password Route (NEW)
if (typeof authController.changePassword === 'function') {
    router.put('/change-password', verifyRole('student'), authController.changePassword);
} else {
    console.warn("⚠️ WARNING: authController.changePassword is NOT a function!");
}

module.exports = router;