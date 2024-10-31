// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const path = require('path');
require('dotenv').config();

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const gameRoutes = require('./routes/game');
app.use('/game', gameRoutes);
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/', leaderboardRoutes);



app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
