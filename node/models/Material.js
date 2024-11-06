// models/Material.js
const pool = require('../config/db'); // Use o pool de conexões

const Material = {
    create: (data) => {
        const query = 'INSERT INTO materials (type, subtype, value) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            pool.query(query, [data.type, data.subtype, data.value], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Retorna o ID do novo material
            });
        });
    },

    findAll: () => {
        const query = 'SELECT * FROM materials';
        return new Promise((resolve, reject) => {
            pool.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, data) => {
        const query = 'UPDATE materials SET type = ?, subtype = ?, value = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            pool.query(query, [data.type, data.subtype, data.value, id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM materials WHERE id = ?';
        return new Promise((resolve, reject) => {
            pool.query(query, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },
};

module.exports = Material;
