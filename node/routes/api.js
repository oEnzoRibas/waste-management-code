// routes/api.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/auth');
const Collection = require('../models/Collection');
const Material = require('../models/Material');

// Rotas de autenticação
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rotas de coletas
router.get('/collections', verifyToken, async (req, res) => {
    try {
        const collections = await Collection.findAll(); // Método para buscar todas as coletas
        res.status(200).json(collections);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar coletas.');
    }
});

router.post('/collections', verifyToken, async (req, res) => {
    const data = req.body;

    try {
        console.log("Dados de coleta:", data);
        const insertId = await Collection.create(data); // Criar uma nova coleta
        console.log("ID da nova coleta:", insertId);
        res.status(201).send(`Coleta criada com sucesso! ID: ${insertId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar a coleta.');
    }
});

router.put('/collections/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await Collection.update(id, data); // Método para atualizar a coleta
        res.status(200).send('Coleta atualizada com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar a coleta.');
    }
});

router.delete('/collections/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        await Collection.delete(id); // Método para deletar a coleta
        res.status(200).send('Coleta deletada com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar a coleta.');
    }
});

// Rotas de materiais
router.get('/materials', verifyToken, async (req, res) => {
    try {
        const materials = await Material.findAll(); // Método para buscar todos os materiais
        res.status(200).json(materials);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar materiais.');
    }
});

router.post('/materials', verifyToken, async (req, res) => {
    const data = req.body;

    try {
        await Material.create(data); // Criar um novo material
        res.status(201).send('Material criado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar o material.');
    }
});

router.put('/materials/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await Material.update(id, data); // Método para atualizar o material
        res.status(200).send('Material atualizado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar o material.');
    }
});

router.delete('/materials/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        await Material.delete(id); // Método para deletar o material
        res.status(200).send('Material deletado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar o material.');
    }
});

router.get('/reports/collections', verifyToken, async (req, res) => {
    try {
        const collections = await Collection.findAll(); // Busque todas as coletas
        // Formate os dados como necessário para visualização
        const report = collections.map(collection => ({
            id: collection.id,
            date: collection.date,
            route: collection.route,
            materials: collection.materials,
            weight: collection.weight,
            vehicle: collection.vehicle,
            documents: collection.documents,
            createdBy: collection.createdBy
        }));
        res.status(200).json(report);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar relatório de coletas.');
    }
});

module.exports = router;
