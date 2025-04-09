import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    codigo_producto: '',
    cantidad: 1,
    forma_pago: 'efectivo',
    dni_cliente: ''
  });

  // Función para obtener ventas
  const fetchVentas = async () => {
    const res = await axios.get('http://localhost:5000/ventas');
    setVentas(res.data);
  };

  // Función para obtener productos
  const fetchProductos = async () => {
    const res = await axios.get('http://localhost:5000/productos');
    setProductos(res.data);
  };

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/ventas', formData);
      fetchVentas();
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Error al registrar venta');
    }
  };

  return (
    <div>
      <h2>Registro de Ventas</h2>
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Nueva Venta
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Forma de Pago</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id_venta}>
              <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
              <td>{venta.producto}</td>
              <td>{venta.cantidad}</td>
              <td>${venta.total_venta?.toFixed(2)}</td>
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
                    onChange={(e) => setFormData({...formData, codigo_producto: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar producto...</option>
                    {productos.map(p => (
                      <option key={p.codigo} value={p.codigo}>
                        {p.nombre} (${p.precio_venta_efectivo?.toFixed(2)})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value) || 1})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Forma de Pago</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.forma_pago}
                    onChange={(e) => setFormData({...formData, forma_pago: e.target.value})}
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="debito">Débito</option>
                    <option value="credito">Crédito</option>
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