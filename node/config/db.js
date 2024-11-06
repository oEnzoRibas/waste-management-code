const mysql = require('mysql2'); // Certifique-se de que mysql2 está instalado

// Criar uma conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'enzoribas', // sua senha do MySQL
  database: 'crudCode',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Para executar uma consulta com o pool
pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Erro ao executar a consulta:', err);
    return;
  }
  //console.log('Resultados:', results);
});
// Certifique-se de fechar a conexão quando não for mais necessária
// connection.end();

module.exports = pool;
