const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const complaintController = require('../controllers/complaintController');
const noticeController = require('../controllers/noticeController');
const studentDashboard = require('../dashboards/studentDashboard');
const studentDashboard = require('../controllers/studentDashboard');
// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/complaints/'); // Ensure this folder exists!
    },
    filename: (req, file, cb) => {
        // Renames file to: complaint-TIMESTAMP.jpg
        cb(null, `complaint-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Only images (jpeg/jpg/png) or PDFs are allowed!"));
    }
});

// --- COMPLAINT ROUTES ---
// Notice the 'upload.single('file')' added to the POST route
router.post('/complaints', upload.single('file'), complaintController.createComplaint);

router.get('/complaints/stats', complaintController.getComplaintStats);
router.get('/complaints/recent', complaintController.getRecentComplaints);
router.get('/complaints', complaintController.getUserComplaints);
router.get('/complaints/:complaintId', complaintController.getComplaintById);

// --- OTHER ROUTES REMAIN THE SAME ---
router.get('/notices', noticeController.getNotices);
router.get('/notifications', noticeController.getNotifications);
router.put('/notifications/:notificationId/read', noticeController.markNotificationRead);
router.put('/notifications/read-all', noticeController.markAllNotificationsRead);
router.use('/dashboard', studentDashboard);
router.get('/dashboard', studentDashboard.getDashboardData);
module.exports = router;