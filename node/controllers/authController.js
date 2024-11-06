const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Para carregar variáveis de ambiente

const authController = {
    register: async (req, res) => {
        const { username, password, role } = req.body;

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe.' });
            }

            const hashedPassword = await bcrypt.hash(password, 8); // Usando async/await
            const newUser = await User.create(username, hashedPassword, role); // Chamada correta

            res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { id: newUser.id, username: newUser.username } });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao registrar o usuário.' });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ message: 'Senha inválida.' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Usando variável de ambiente

            res.status(200).json({ message: 'Login realizado com sucesso!', auth: true, token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao fazer login.' });
        }
    },
    
    // Adicione mais funções conforme necessário
};

module.exports = authController;
