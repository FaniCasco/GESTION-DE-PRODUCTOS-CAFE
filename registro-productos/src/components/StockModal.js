import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function StockModal({ show, handleClose, product, onSave }) {
  const [formData, setFormData] = useState({
    codigo_producto: '',
    cantidad: 0
  });

  useEffect(() => {
    if (product) {
      setFormData({
        codigo_producto: product.codigo_producto,
        cantidad: product.cantidad
      });
    } else {
      setFormData({
        codigo_producto: '',
        cantidad: 0
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/stock/${formData.codigo_producto}`, {
        cantidad: formData.cantidad
      });
      onSave();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? 'Actualizar Stock' : 'Agregar Producto al Stock'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Código de Producto</Form.Label>
            <Form.Control
              type="text"
              value={formData.codigo_producto}
              onChange={(e) => setFormData({...formData, codigo_producto: e.target.value})}
              required
              disabled={!!product}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value) || 0})}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default StockModal;