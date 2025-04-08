const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Obtener todo el stock
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Stock');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Obtener stock de un producto
router.get('/:codigo_producto', async (req, res) => {
  try {
    const { codigo_producto } = req.params;
    const result = await pool.query('SELECT * FROM Stock WHERE codigo_producto = $1', [codigo_producto]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Stock no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar stock de un producto
router.put('/:codigo_producto', async (req, res) => {
  try {
    const { codigo_producto } = req.params;
    const { cantidad } = req.body;
    await pool.query(
      'UPDATE Stock SET cantidad = $1 WHERE codigo_producto = $2',
      [cantidad, codigo_producto]
    );
    res.send('Stock actualizado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;