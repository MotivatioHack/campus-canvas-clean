const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyRole } = require('../middleware/authMiddleware');

// Public Routes
// Line 7 is usually here - make sure authController.login EXISTS
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Routes
router.use('/student', verifyRole('student'), require('../dashboards/studentDashboard'));
router.use('/faculty', verifyRole('faculty'), require('../dashboards/facultyDashboard'));
router.use('/admin', verifyRole('admin'), require('../dashboards/adminDashboard'));

module.exports = router;