// public/routes/game.js
const express = require('express');
const router = express.Router();
const levelModel = require('../models/level');

// Dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    res.render('game/dashboard', { user: req.session.user });
});

// Scan QR Code
router.get('/scan', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    res.render('game/scan');
});

router.post('/scan', async (req, res) => {
    const { qrCode } = req.body;
    const level = await levelModel.findLevelByQRCode(qrCode);
    if (level) {
        await levelModel.updateUserProgress(req.session.user.id, level.id);
        return res.redirect(`/game/level/${level.id}`);
    }
    res.render('game/scan', { error: 'Invalid QR Code' });
});

// Level Page
router.get('/level/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    const level = await levelModel.findLevelByQRCode(req.params.id);
    res.render('game/level', { level });
});

module.exports = router;
