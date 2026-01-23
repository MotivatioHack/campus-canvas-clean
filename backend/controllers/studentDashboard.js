const db = require('../config/db');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Fetch Status Counts (Stats)
        // We use SUM(CASE) to count everything in one single scan of the table
        const [statsRows] = await db.execute(
            `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'In-Progress' THEN 1 ELSE 0 END) as inProgress,
                SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved
             FROM complaints 
             WHERE user_id = ?`,
            [userId]
        );

        // 2. Fetch 5 Most Recent Complaints
        const [recentComplaints] = await db.execute(
            `SELECT complaint_id, category, subject, status, created_at, description, file_path
             FROM complaints 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT 5`,
            [userId]
        );

        // 3. Fetch Latest 3 Notices (Global for all students)
        const [notices] = await db.execute(
    `SELECT 
        id, 
        title, 
        content, 
        type as category, -- We 'alias' type as category so the frontend doesn't break
        created_at as date -- We 'alias' created_at as date to match frontend
     FROM notices 
     WHERE is_active = TRUE 
     AND target_role IN ('all', 'student')
     ORDER BY created_at DESC 
     LIMIT 3`
);
const [unreadRows] = await db.execute(
    `SELECT COUNT(*) as unreadCount 
     FROM notifications 
     WHERE user_id = ? AND is_read = FALSE`, 
    [userId]
);
        // 4. Combine and Send
       res.status(200).json({
    success: true,
    stats: {
        total: Number(statsRows[0].total) || 0,
        pending: Number(statsRows[0].pending) || 0,
        inProgress: Number(statsRows[0].inProgress) || 0,
        resolved: Number(statsRows[0].resolved) || 0
    },
    recentComplaints,
    notices,
    unreadCount: 4, // You can make this dynamic later!
    user: {
        fullName: req.user.full_name,
        username: req.user.username,
                avatar: req.user.avatar // If you have avatars
            }
        });

    } catch (error) {
        console.error("Dashboard Controller Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to load dashboard data" 
        });
    }
};