const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const noticeController = require('../controllers/noticeController');

// Complaint routes
// NOTE: More specific routes must come before generic ones to avoid :id matching
router.post('/complaints', complaintController.createComplaint);
router.get('/complaints/stats', complaintController.getComplaintStats);
router.get('/complaints/recent', complaintController.getRecentComplaints);
router.get('/complaints/:complaintId', complaintController.getComplaintById);
router.get('/complaints', complaintController.getUserComplaints);

// Notice routes
router.get('/notices', noticeController.getNotices);
router.get('/notifications', noticeController.getNotifications);
router.put('/notifications/:notificationId/read', noticeController.markNotificationRead);
router.put('/notifications/read-all', noticeController.markAllNotificationsRead);

module.exports = router;