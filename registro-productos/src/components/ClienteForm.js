import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FaSave, FaTimes, FaEdit } from 'react-icons/fa';
import '../Styles/ClientesForm.css';

function ClienteForm({ cliente, onClienteCreado, onClienteActualizado, onCancel, onClienteAgregado }) {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (cliente) {
      setDni(cliente.dni || '');
      setNombre(cliente.nombre || '');
      setApellido(cliente.apellido || '');
      setDomicilio(cliente.domicilio || '');
      setTelefono(cliente.telefono || '');
    }
  }, [cliente]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!dni || !nombre || !apellido || !domicilio || !telefono) {
      Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
      return;
    }

    try {
      if (!cliente) {
        // Verificar si el DNI ya existe
        try {
          await axios.get(`http://localhost:5000/clientes/${dni}`);
          Swal.fire('Error', 'El DNI ya existe', 'error');
          return;
        } catch (error) {
          if (error.response && error.response.status !== 404) {
            // Si el error no es 404 (no encontrado), es un error real
            Swal.fire('Error', 'Error al verificar DNI', 'error');
            return;
          }
          // Si es 404, el DNI no existe, continuar con la creación
        }
      }

      const data = { dni, nombre, apellido, domicilio, telefono };

      if (cliente) {
        await axios.put(`http://localhost:5000/clientes/${cliente.dni}`, data);
        Swal.fire('Editado', 'Cliente actualizado con éxito', 'success');
        if (onClienteActualizado) {
          onClienteActualizado();
        }
      } else {
        await axios.post('http://localhost:5000/clientes', data);
        Swal.fire('Creado', 'Cliente creado con éxito', 'success');
        if (onClienteCreado) {
          onClienteCreado();
        }
        if (onClienteAgregado) { // Llama a onClienteAgregado
          onClienteAgregado();
        }
      }

      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error('Error al procesar cliente', error);
      Swal.fire('Error', 'Hubo un problema al procesar el cliente', 'error');
    }
  };

  return (
    <Container>
    <div className="formulario formulario-clintes">
      <h2>{cliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formDomicilio">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control type="text" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDni">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" value={dni} onChange={(e) => setDni(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex gap-3 mt-4">
          <Button
            variant={cliente ? "warning" : "success"}
            type="submit"
            className="px-4 py-2 fw-bold d-flex align-items-center gap-2"
          >
            {cliente ? <FaEdit /> : <FaSave />}
            {cliente ? 'Actualizar' : 'Agregar'}
          </Button>

          {/* Botón Cancelar - Ahora SIEMPRE visible */}
          <Button
            variant={cliente ? "outline-danger" : "outline-secondary"}  // Rojo al editar, Gris al agregar
            onClick={onCancel}  // Asegúrate de que `onCancel` esté definido desde el componente padre
            className="px-4 py-2 fw-bold d-flex align-items-center gap-2 cancelar"
          >
            <FaTimes />
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  </Container >
);
}

export default ClienteForm;