const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Obtener todo el stock
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, p.nombre as producto_nombre 
      FROM stock s
      JOIN productos p ON s.codigo_producto = p.codigo
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar stock
router.put('/:codigo_producto', async (req, res) => {
  try {
    const { codigo_producto } = req.params;
    const { cantidad } = req.body;
    
    await pool.query(
      'INSERT INTO stock (codigo_producto, cantidad) VALUES ($1, $2) ' +
      'ON CONFLICT (codigo_producto) DO UPDATE SET cantidad = $2',
      [codigo_producto, cantidad]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Obtener stock bajo (ejemplo: menos de 10 unidades)
router.get('/bajo', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, p.nombre as producto_nombre 
      FROM stock s
      JOIN productos p ON s.codigo_producto = p.codigo
      WHERE s.cantidad < 10
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;