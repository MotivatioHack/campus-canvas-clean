const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        console.log("--- Login Attempt Detected ---");
        console.log("Body Received:", req.body);

        const { identifier, password } = req.body;
        // If 'role' is missing from body, we'll initialize it as null
        let selectedRole = req.body.role; 

        if (!identifier || !password) {
            return res.status(400).json({ success: false, message: "Username and Password are required." });
        }

        // 1. Fetch user from DB first to find their TRUE role
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ? OR email = ?", [identifier, identifier]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // 2. FALLBACK LOGIC: If frontend forgot the role, use the DB role
        if (!selectedRole) {
            console.log("Warning: Frontend forgot 'role' field. Using DB role instead.");
            selectedRole = user.role;
        }

        // 3. Strict Check: If they DID send a role, it must match the DB
        if (user.role.toLowerCase() !== selectedRole.toLowerCase()) {
            return res.status(401).json({ 
                success: false, 
                message: `You are a ${user.role}. Please select the correct tab.` 
            });
        }

        // 4. Token & Success
        const token = jwt.sign(
            { id: user.id, role: user.role.toLowerCase() }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            token,
            role: user.role.toLowerCase(),
            name: user.full_name,
            redirectUrl: `/dashboard/${user.role.toLowerCase()}`
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ... register function remains unchanged ...
// --- REGISTER LOGIC ---
exports.register = async (req, res) => {
    try {
        const { role, photo, fullName, email, mobile, username, password, department } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (role, profile_picture, full_name, email, mobile_number, username, password, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [role.toLowerCase(), photo, fullName, email, mobile, username, hashedPassword, department];

        await db.execute(sql, params);
        res.status(201).json({ success: true, message: "Registration Successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Registration Error" });
    }
};