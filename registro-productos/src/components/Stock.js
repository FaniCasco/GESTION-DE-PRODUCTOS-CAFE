import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import StockModal from './StockModal';

function Stock() {
  const [stock, setStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const res = await axios.get('http://localhost:5000/stock');
    setStock(res.data);
  };

  const handleUpdateStock = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  return (
    <div className="stock-container">
      <div className="d-flex justify-content-between mb-4">
        <h2>Gestión de Stock</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock Actual</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.codigo_producto}>
              <td>{item.producto_nombre}</td>
              <td>{item.cantidad}</td>
              <td>
                {item.cantidad <= 0 ? (
                  <Badge bg="danger">Agotado</Badge>
                ) : item.cantidad < 10 ? (
                  <Badge bg="warning">Bajo Stock</Badge>
                ) : (
                  <Badge bg="success">Disponible</Badge>
                )}
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleUpdateStock(item)}
                >
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <StockModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={fetchStock}
      />
    </div>
  );
}

export default Stock;