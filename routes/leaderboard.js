// public/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.get('/leaderboard', async (req, res) => {
    const [leaderboard] = await db.query('SELECT username, current_score FROM users ORDER BY current_score DESC LIMIT 10');
    res.render('leaderboard', { leaderboard });
});

module.exports = router;
