const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/facultydashboardController');

// This matches: GET /api/faculty/stats
router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;