const mysql = require('mysql2/promise');  // importa o banco de dados mysql
const express = require('express');  // importando servidor para gerenciar rotas http

//cria a conexão com o banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'stock',
});

const app = express();
app.use(express.json()); // Middleware para lidar com JSON

//async.: função assíncrona
//await: aguarda o resultado da função assíncrona
app.get("/products", async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensagem: "Ocorreu um erro", error: error.message });
    }
});

// inicialização do servidor na porta 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});



