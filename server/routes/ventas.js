const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Ventas');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Obtener una venta por ID
router.get('/:id_venta', async (req, res) => {
  try {
    const { id_venta } = req.params;
    const result = await pool.query('SELECT * FROM Ventas WHERE id_venta = $1', [id_venta]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Venta no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva venta
router.post('/', async (req, res) => {
  try {
    const { codigo_producto, fecha_venta, forma_pago, total_venta, dni_cliente } = req.body;
    await pool.query(
      'INSERT INTO Ventas (codigo_producto, fecha_venta, forma_pago, total_venta, dni_cliente) VALUES ($1, $2, $3, $4, $5)',
      [codigo_producto, fecha_venta, forma_pago, total_venta, dni_cliente]
    );
    res.status(201).send('Venta creada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar una venta
router.put('/:id_venta', async (req, res) => {
  try {
    const { id_venta } = req.params;
    const { codigo_producto, fecha_venta, forma_pago, total_venta, dni_cliente } = req.body;
    await pool.query(
      'UPDATE Ventas SET codigo_producto = $1, fecha_venta = $2, forma_pago = $3, total_venta = $4, dni_cliente = $5 WHERE id_venta = $6',
      [codigo_producto, fecha_venta, forma_pago, total_venta, dni_cliente, id_venta]
    );
    res.send('Venta actualizada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar una venta
router.delete('/:id_venta', async (req, res) => {
  try {
    const { id_venta } = req.params;
    await pool.query('DELETE FROM Ventas WHERE id_venta = $1', [id_venta]);
    res.send('Venta eliminada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;