// controllers/collectionController.js
const Collection = require('../models/Collection');

const collectionController = {
    createCollection: async (req, res) => {
        const data = req.body;

        try {
            await Collection.create(data);
            res.status(201).send('Coleta criada com sucesso!');
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao criar a coleta.');
        }
    },

    // Adicione outras funções (ler, atualizar, deletar) conforme necessário
};

module.exports = collectionController;
