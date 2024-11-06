// middlewares/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Busca o token no cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token após "Bearer"

    // Verifica se o token existe
    if (!token) return res.status(403).send('Um token é necessário para acessar esta rota.');

    // Valida o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido.');
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
