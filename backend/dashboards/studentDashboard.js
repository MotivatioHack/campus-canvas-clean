const express = require('express');
const router = express.Router();

// This route only triggers if the user is a verified student
router.get('/', (req, res) => {
    res.send("Student Dashboard – Placeholder. This is private data for students only.");
});

module.exports = router;