const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Registrar nueva venta
router.post('/', async (req, res) => {
  const { codigo_producto, cantidad, forma_pago, dni_cliente } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM registrar_venta($1, $2, $3, $4) AS id_venta',
      [codigo_producto, cantidad, forma_pago, dni_cliente]
    );
    res.json({ success: true, id_venta: result.rows[0].id_venta });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener historial de ventas
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT v.*, p.nombre AS producto, c.nombre AS cliente
      FROM ventas v
      JOIN productos p ON v.codigo_producto = p.codigo
      LEFT JOIN clientes c ON v.dni_cliente = c.dni
      ORDER BY v.fecha_venta DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;