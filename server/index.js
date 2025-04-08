const express = require('express');
const cors = require('cors');
const { pool } = require('./db'); // Importa la conexión a la base de datos
const productosRoutes = require('./routes/productos');
const clientesRoutes = require('./routes/clientes');
const ventasRoutes = require('./routes/ventas');
const stockRoutes = require('./routes/stock');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Rutas
app.use('/productos', productosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/ventas', ventasRoutes);
app.use('/stock', stockRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = { pool };