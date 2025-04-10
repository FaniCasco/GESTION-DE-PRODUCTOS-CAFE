const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Registrar nueva venta
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { codigo_producto, dni_cliente, cantidad, forma_pago } = req.body;
    
    // 1. Obtener precio del producto
    const producto = await client.query(
      'SELECT precio_venta_efectivo, precio_venta_credito, precio_venta_debito FROM productos WHERE codigo = $1',
      [codigo_producto]
    );
    
    if (producto.rows.length === 0) {
      throw new Error('Producto no encontrado');
    }
    
    // 2. Determinar precio según forma de pago
    let precio_unitario;
    switch(forma_pago) {
      case 'EFECTIVO':
        precio_unitario = producto.rows[0].precio_venta_efectivo;
        break;
      case 'CREDITO':
        precio_unitario = producto.rows[0].precio_venta_credito;
        break;
      case 'DEBITO':
        precio_unitario = producto.rows[0].precio_venta_debito;
        break;
      default:
        throw new Error('Forma de pago no válida');
    }
    
    const total_venta = precio_unitario * cantidad;
    
    // 3. Registrar venta
    const venta = await client.query(
      `INSERT INTO ventas (
        codigo_producto, dni_cliente, cantidad, 
        forma_pago, precio_unitario, total_venta
       ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [codigo_producto, dni_cliente, cantidad, forma_pago, precio_unitario, total_venta]
    );
    
    // 4. Actualizar stock
    await client.query(
      'UPDATE stock SET cantidad = cantidad - $1 WHERE codigo_producto = $2',
      [cantidad, codigo_producto]
    );
    
    await client.query('COMMIT');
    res.status(201).json(venta.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Obtener historial de ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, 
             p.nombre as producto_nombre,
             c.nombre as cliente_nombre,
             c.apellido as cliente_apellido
      FROM ventas v
      LEFT JOIN productos p ON v.codigo_producto = p.codigo
      LEFT JOIN clientes c ON v.dni_cliente = c.dni
      ORDER BY v.fecha_venta DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;