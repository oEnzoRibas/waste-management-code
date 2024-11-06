const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application instance

// Configura o CORS para permitir requisições da origem http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(session({ 
    secret: 'seu_segredo_aqui', // Secret used to sign the session
    resave: false, // Do not resave the session if it hasn't been modified
    saveUninitialized: true // Save a new session even if it hasn't been modified
}));

app.use('/api', apiRoutes); // Define API routes, prefixed with /api

const PORT = process.env.PORT || 2000; // Define the port to be used
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Log message when the server starts
});