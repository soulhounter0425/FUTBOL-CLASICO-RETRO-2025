const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/jugadores', (req, res) => {
    res.json([
        { id: 1, nombre: "Pelé", goles: 1281 },
        { id: 2, nombre: "Maradona", goles: 345 },
        { id: 3, nombre: "Valderrama", goles: 40 }
    ]);
});

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor activo en http://localhost:3000');
});
