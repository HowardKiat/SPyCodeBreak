// public/routes/auth.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

// Login Page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// Handle Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        return res.redirect('/game/dashboard');
    }
    res.render('auth/login', { error: 'Invalid email or password' });
});

// Handle Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    await userModel.createUser(username, email, password);
    res.redirect('/auth/login');
});

module.exports = router;
