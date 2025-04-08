const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Clientes');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Obtener un cliente por DNI
router.get('/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const result = await pool.query('SELECT * FROM Clientes WHERE dni = $1', [dni]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { dni, nombre, apellido, domicilio, telefono } = req.body;
    await pool.query(
      'INSERT INTO Clientes (dni, nombre, apellido, domicilio, telefono) VALUES ($1, $2, $3, $4, $5)',
      [dni, nombre, apellido, domicilio, telefono]
    );
    res.status(201).send('Cliente creado');
  } catch (error) {
    if (error.code === '23505') { // Código de error para clave primaria duplicada en PostgreSQL
      res.status(400).send('DNI ya existe');
    } else {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  }
});

// Actualizar un cliente
router.put('/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const { nombre, apellido, domicilio, telefono } = req.body;
    await pool.query(
      'UPDATE Clientes SET nombre = $1, apellido = $2, domicilio = $3, telefono = $4 WHERE dni = $5',
      [nombre, apellido, domicilio, telefono, dni]
    );
    res.send('Cliente actualizado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar un cliente
router.delete('/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    await pool.query('DELETE FROM Clientes WHERE dni = $1', [dni]);
    res.send('Cliente eliminado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;