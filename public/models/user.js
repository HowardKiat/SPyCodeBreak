const db = require('../../config/db');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    },

    async findUserByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
};
