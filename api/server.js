const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let jugadores = [
  { id: 1, nombre: "Carlos Valderrama", pais: "Colombia", equipo: "Retro FC" },
  { id: 2, nombre: "Diego Maradona", pais: "Argentina", equipo: "Retro FC" },
  { id: 3, nombre: "Ronaldo Nazário", pais: "Brasil", equipo: "Retro FC" }
];

// Ver todos los jugadores
app.get('/jugadores', (req, res) => {
  res.json(jugadores);
});

// Ver un jugador por ID
app.get('/jugadores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jugador = jugadores.find(j => j.id === id);

  if (jugador) {
    res.json(jugador);
  } else {
    res.status(404).json({ mensaje: "Jugador no encontrado" });
  }
});

// Agregar jugador
app.post('/jugadores', (req, res) => {
  const nuevo = req.body;

  if (!nuevo.nombre || !nuevo.pais || !nuevo.equipo) {
    return res.status(400).json({ mensaje: "Faltan datos del jugador" });
  }

  nuevo.id = jugadores.length + 1;
  jugadores.push(nuevo);
  res.status(201).json(nuevo);
});

// Eliminar jugador por ID
app.delete('/jugadores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jugadores.findIndex(j => j.id === id);

  if (index !== -1) {
    jugadores.splice(index, 1);
    res.json({ mensaje: "Jugador eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Jugador no encontrado" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Endpoint POST para agregar un nuevo jugador