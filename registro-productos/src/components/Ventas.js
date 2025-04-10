import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    codigo_producto: '',
    dni_cliente: '',
    cantidad: 1,
    forma_pago: 'EFECTIVO'
  });

  // Utilidad para formatear precios de forma segura
  const formatPrice = (valor) => (Number(valor) || 0).toFixed(2);

  useEffect(() => {
    fetchVentas();
    fetchProductos();
    fetchClientes();
  }, []);

  const fetchVentas = async () => {
    const res = await axios.get('http://localhost:5000/ventas');
    setVentas(res.data);
  };

  const fetchProductos = async () => {
    const res = await axios.get('http://localhost:5000/productos');
    setProductos(res.data);
  };

  const fetchClientes = async () => {
    const res = await axios.get('http://localhost:5000/clientes');
    setClientes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/ventas', formData);
      fetchVentas();
      setShowModal(false);
      Swal.fire('Éxito', 'Venta registrada correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Error al registrar venta', 'error');
    }
  };

  return (
    <div className="ventas-container">
      <div className="d-flex justify-content-between mb-4">
        <h2>Registro de Ventas</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Nueva Venta
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Forma de Pago</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
              <td>{venta.producto_nombre}</td>
              <td>{venta.cliente_nombre} {venta.cliente_apellido}</td>
              <td>{venta.cantidad}</td>
              <td>${formatPrice(venta.precio_venta_efect)}</td>
              <td>{venta.forma_pago}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Nueva Venta</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.codigo_producto}
                    onChange={(e) => setFormData({ ...formData, codigo_producto: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar producto...</option>
                    {productos.map((p) => (
                      <option key={p.codigo} value={p.codigo}>
                        {p.nombre} (${formatPrice(p.precio_venta_efectivo)})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.dni_cliente}
                    onChange={(e) => setFormData({ ...formData, dni_cliente: e.target.value })}
                  >
                    <option value="">Sin cliente</option>
                    {clientes.map((c) => (
                      <option key={c.dni} value={c.dni}>
                        {c.nombre} {c.apellido} - {c.dni}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) || 1 })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Forma de Pago</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.forma_pago}
                    onChange={(e) => setFormData({ ...formData, forma_pago: e.target.value })}
                  >
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="DEBITO">Débito</option>
                    <option value="CREDITO">Crédito</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Registrar Venta
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Ventas;
