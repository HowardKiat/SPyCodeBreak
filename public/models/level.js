// public/models/level.js
const db = require('../../config/db');

module.exports = {
    async findLevelByQRCode(qrCode) {
        const [rows] = await db.query('SELECT * FROM levels WHERE qr_code = ?', [qrCode]);
        return rows[0];
    },

    async updateUserProgress(userId, levelId) {
        return db.query('UPDATE users SET progress = ? WHERE id = ?', [levelId, userId]);
    }
};
