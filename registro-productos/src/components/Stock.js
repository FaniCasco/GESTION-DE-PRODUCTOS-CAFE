import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import axios from 'axios';

function Stock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/stock');
      setStock(res.data);
    } catch (err) {
      console.error('Error al obtener stock:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <h2>Gestión de Stock</h2>
      
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(item => (
              <tr key={item.codigo_producto}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio_venta_efectivo?.toFixed(2)}</td>
                <td>
                  {item.cantidad <= 0 ? (
                    <Badge bg="danger">Agotado</Badge>
                  ) : item.cantidad <= (item.minimo_inventario || 5) ? (
                    <Badge bg="warning">Bajo Stock</Badge>
                  ) : (
                    <Badge bg="success">Disponible</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Stock;