// models/User.js
const pool = require('../config/db'); // Certifique-se de exportar o pool de conexões


const User = {
    findOne: (query) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE username = ?', [query.where.username], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Retorna o primeiro usuário encontrado ou undefined
            });
        });
    },

    create: (username, password, role) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            pool.query(query, [username, password, role], (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, username, role }); // Retorna o id gerado junto com username e role
            });
        });
    },

    // Adicione mais métodos conforme necessário
};

module.exports = User;
