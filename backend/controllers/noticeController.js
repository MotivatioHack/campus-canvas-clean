const db = require('../config/db');

// Get active notices for user role
exports.getNotices = async (req, res) => {
    try {
        const userRole = req.user.role;
        const limit = parseInt(req.query.limit) || 10;

        const [notices] = await db.execute(
            `SELECT id, title, content, type, 
                    DATE_FORMAT(created_at, '%b %d, %Y') as date,
                    created_at
             FROM notices 
             WHERE is_active = TRUE 
             AND (target_role = 'all' OR target_role = ?) 
             AND (expires_at IS NULL OR expires_at > NOW())
             ORDER BY created_at DESC 
             LIMIT ?`,
            [userRole, limit]
        );

        res.json({
            success: true,
            notices
        });

    } catch (error) {
        console.error('Get notices error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch notices"
        });
    }
};

// Get user notifications
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 20;

        const [notifications] = await db.execute(
            `SELECT id, title, message, type, is_read, related_id,
                    CASE 
                        WHEN created_at >= NOW() - INTERVAL 1 HOUR THEN CONCAT(TIMESTAMPDIFF(MINUTE, created_at, NOW()), ' minutes ago')
                        WHEN created_at >= NOW() - INTERVAL 1 DAY THEN CONCAT(TIMESTAMPDIFF(HOUR, created_at, NOW()), ' hours ago')
                        ELSE DATE_FORMAT(created_at, '%b %d, %Y')
                    END as time
             FROM notifications 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT ?`,
            [userId, limit]
        );

        // Get unread count
        const [unreadResult] = await db.execute(
            'SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = FALSE',
            [userId]
        );

        res.json({
            success: true,
            notifications,
            unreadCount: unreadResult[0].unread
        });

    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications"
        });
    }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id;

        await db.execute(
            'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
            [notificationId, userId]
        );

        res.json({
            success: true,
            message: "Notification marked as read"
        });

    } catch (error) {
        console.error('Mark notification read error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update notification"
        });
    }
};

// Mark all notifications as read
exports.markAllNotificationsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await db.execute(
            'UPDATE notifications SET is_read = TRUE WHERE user_id = ?',
            [userId]
        );

        res.json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {
        console.error('Mark all notifications read error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update notifications"
        });
    }
};