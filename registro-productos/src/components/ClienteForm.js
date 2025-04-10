import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { FaSave, FaTimes, FaEdit, FaUser, FaIdCard, FaHome, FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';
//import '../Styles/ClientesForm.css';
import '../Styles/Forms.css';

function ClienteForm({ cliente, onClienteCreado, onClienteActualizado, onCancel }) {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    domicilio: '',
    telefono: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData({
        dni: cliente.dni || '',
        nombre: cliente.nombre || '',
        apellido: cliente.apellido || '',
        domicilio: cliente.domicilio || '',
        telefono: cliente.telefono || ''
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFields = () => {
    const { dni, nombre, apellido, domicilio, telefono } = formData;
    if (!dni || !nombre || !apellido || !domicilio || !telefono) {
      Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
      return false;
    }

    if (!/^\d+$/.test(dni)) {
      Swal.fire('Error', 'El DNI debe contener solo números', 'error');
      return false;
    }

    if (!/^\d+$/.test(telefono)) {
      Swal.fire('Error', 'El teléfono debe contener solo números', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateFields()) return;
    
    setIsSubmitting(true);

    try {
      if (!cliente) {
        try {
          await axios.get(`http://localhost:5000/clientes/${formData.dni}`);
          Swal.fire('Error', 'El DNI ya existe', 'error');
          setIsSubmitting(false);
          return;
        } catch (error) {
          if (error.response?.status !== 404) {
            Swal.fire('Error', 'Error al verificar DNI', 'error');
            setIsSubmitting(false);
            return;
          }
        }
      }

      if (cliente) {
        await axios.put(`http://localhost:5000/clientes/${cliente.dni}`, formData);
        Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
        if (onClienteActualizado) onClienteActualizado();
      } else {
        await axios.post('http://localhost:5000/clientes', formData);
        Swal.fire('Éxito', 'Cliente creado correctamente', 'success');
        if (onClienteCreado) onClienteCreado();
      }

      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error al procesar cliente:', error);
      Swal.fire('Error', error.response?.data?.message || 'Hubo un problema al procesar el cliente', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="client-form-container">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl={10} lg={10} md={12}>
            <Card className="client-form-card">
              <div className="client-form-header">
                <h2>{cliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              </div>
              
              <div className="client-form-body p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xl={6} lg={6} md={6} className="mb-4">
                      <Form.Group controlId="formNombre">
                        <Form.Label className="form-label-custom">
                          <FaUser className="me-2" /> Nombre *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="form-control-custom"
                          placeholder="Ingrese el nombre"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col xl={6} lg={6} md={6} className="mb-4">
                      <Form.Group controlId="formApellido">
                        <Form.Label className="form-label-custom">
                          <FaUser className="me-2" /> Apellido *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          required
                          className="form-control-custom"
                          placeholder="Ingrese el apellido"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={12} lg={12} md={12} className="mb-4">
                      <Form.Group controlId="formDomicilio">
                        <Form.Label className="form-label-custom">
                          <FaHome className="me-2" /> Domicilio *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="domicilio"
                          value={formData.domicilio}
                          onChange={handleChange}
                          required
                          className="form-control-custom"
                          placeholder="Ingrese la dirección"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6} lg={6} md={6} className="mb-4">
                      <Form.Group controlId="formTelefono">
                        <Form.Label className="form-label-custom">
                          <FaPhone className="me-2" /> Teléfono *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                          className="form-control-custom"
                          placeholder="Ingrese el teléfono"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col xl={6} lg={6} md={6} className="mb-4">
                      <Form.Group controlId="formDni">
                        <Form.Label className="form-label-custom">
                          <FaIdCard className="me-2" /> DNI *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="dni"
                          value={formData.dni}
                          onChange={handleChange}
                          required
                          className="form-control-custom"
                          placeholder="Ingrese el DNI"
                          disabled={!!cliente}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-3 mt-5">
                    <Button
                      variant="outline-secondary"
                      onClick={onCancel}
                      className="btn-client-outline px-4 py-2"
                      disabled={isSubmitting}
                    >
                      <FaTimes className="me-2" />
                      Cancelar
                    </Button>
                    
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-client-primary px-4 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          {cliente ? <FaEdit className="me-2" /> : <FaSave className="me-2" />}
                          {cliente ? 'Actualizar' : 'Guardar'}
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClienteForm;