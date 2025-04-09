const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Actualizar stock
router.put('/:codigo_producto', async (req, res) => {
  const { cantidad, operacion } = req.body;
  const { codigo_producto } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM actualizar_stock($1, $2, $3) AS nuevo_stock',
      [codigo_producto, cantidad, operacion || 'incrementar']
    );
    res.json({ success: true, stock: result.rows[0].nuevo_stock });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener estado de stock
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT s.*, p.nombre, p.precio_venta_efectivo
      FROM stock s
      JOIN productos p ON s.codigo_producto = p.codigo
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;