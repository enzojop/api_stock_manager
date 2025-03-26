const mysql = require('mysql2/promise');  // Importa o MySQL
const express = require('express');  // Importa o Express
const cors = require('cors'); // Middleware para evitar problemas de CORS

// Cria a conexão com o banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'stock',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();
app.use(express.json()); // Middleware para lidar com JSON
app.use(cors()); // Habilita CORS para requisições externas

// Rota para buscar todos os produtos
app.get("/products", async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ mensagem: "Ocorreu um erro", erro: error.message });
    }
});

// Inicialização do servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});



