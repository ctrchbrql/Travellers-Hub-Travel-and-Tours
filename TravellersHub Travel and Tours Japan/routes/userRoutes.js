const express = require('express');
const User = require('../models/User'); // Adjust the path if needed
const router = express.Router();

// GET /users endpoint to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Return the users as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
