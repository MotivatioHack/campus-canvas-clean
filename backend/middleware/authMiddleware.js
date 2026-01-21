const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ success: false, message: "No token, access denied" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Strict role check
            if (req.user.role !== requiredRole.toLowerCase()) {
                return res.status(403).json({ 
                    success: false, 
                    message: `Access denied. You are a ${req.user.role}.` 
                });
            }

            next();
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
    };
};

module.exports = { verifyRole };