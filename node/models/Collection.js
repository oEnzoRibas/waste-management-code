// models/Collection.js
const pool = require('../config/db'); // Use o pool de conexões

const Collection = {
    create: (data) => {
        const query = 'INSERT INTO collections (date, route, materials, weight, vehicle, documents, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            pool.query(query, [data.date, data.route, data.materials, data.weight, data.vehicle, data.documents, data.createdBy], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Retorna o ID da nova coleta
            });
        });
    },

    findAll: () => {
        const query = 'SELECT * FROM collections';
        return new Promise((resolve, reject) => {
            pool.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, data) => {
        const query = 'UPDATE collections SET date = ?, route = ?, materials = ?, weight = ?, vehicle = ?, documents = ?, createdBy = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            pool.query(query, [data.date, data.route, data.materials, data.weight, data.vehicle, data.documents, data.createdBy, id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM collections WHERE id = ?';
        return new Promise((resolve, reject) => {
            pool.query(query, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },
};

module.exports = Collection;