const express = require('express');
const router = express.Router();
const { pool } = require('../db'); // Importa la conexión a PostgreSQL

const path = require('path');
const cors = require('cors');
const app = express();



app.use(cors({
  origin: 'http://localhost:3000', // Ajusta según tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());


// 📌 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error del servidor');
  }
});

// 📌 Obtener un producto por código
router.get('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const result = await pool.query('SELECT * FROM Productos WHERE codigo = $1', [codigo]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).send('Error del servidor');
  }
});

// 📌 Crear un nuevo producto (Ahora maneja imágenes)
router.post('/', async (req, res) => {
  try {
      console.log("Datos recibidos:", req.body); // Depuración

      const { codigo, nombre, precio_costo, precio_venta_efectivo, precio_venta_credito, precio_venta_debito, ganancia, peso } = req.body;

      // Convertir valores a números
      const precioCostoNum = parseFloat(precio_costo) || 0;
      const precioEfectivoNum = parseFloat(precio_venta_efectivo) || 0;
      const precioCreditoNum = parseFloat(precio_venta_credito) || 0;
      const precioDebitoNum = parseFloat(precio_venta_debito) || 0;
      const gananciaNum = parseFloat(ganancia) || 0;
      const pesoNum = parseInt(peso) || 0;

      await pool.query(
          'INSERT INTO Productos (codigo, nombre, precio_costo, precio_venta_efectivo, precio_venta_credito, precio_venta_debito, ganancia, peso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [codigo, nombre, precioCostoNum, precioEfectivoNum, precioCreditoNum, precioDebitoNum, gananciaNum, pesoNum]
      );

      res.status(201).json({ mensaje: 'Producto creado' });
  } catch (error) {
      console.error('Error detallado:', error.message, error.stack);
      res.status(500).json({ error: error.message });
  }
});
// 📌 Actualizar un producto (Incluye opción de nueva imagen)
router.put('/:codigo', async (req, res) => {

  const { codigo } = req.params;
  const { nombre, precio_costo, precio_venta_efectivo, precio_venta_credito, precio_venta_debito, ganancia, peso } = req.body;

  // Convertir a números
  const precioCostoNum = parseFloat(precio_costo) || 0;
  const precioEfectivoNum = parseFloat(precio_venta_efectivo) || 0;
  const precioCreditoNum = parseFloat(precio_venta_credito) || 0;
  const precioDebitoNum = parseFloat(precio_venta_debito) || 0;
  const gananciaNum = parseFloat(ganancia) || 0;
  const pesoNum = parseInt(peso) || 0;

  await pool.query(
    'UPDATE Productos SET nombre = $1, precio_costo = $2, precio_venta_efectivo = $3, precio_venta_credito = $4, precio_venta_debito = $5, ganancia = $6, peso = $7 WHERE codigo = $8',
    [nombre, precioCostoNum, precioEfectivoNum, precioCreditoNum, precioDebitoNum, gananciaNum, pesoNum, codigo] //cambio de orden de peso y codigo.
  );

  res.status(200).json({ mensaje: 'Producto actualizado' });
});

// 📌 Eliminar un producto
router.delete('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    await pool.query('DELETE FROM Productos WHERE codigo = $1', [codigo]);
    res.send('Producto eliminado');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
