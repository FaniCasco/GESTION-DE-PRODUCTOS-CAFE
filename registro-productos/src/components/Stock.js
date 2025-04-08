import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stock() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stock').then((response) => {
      setStock(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.codigo_producto}>
              <td>{item.codigo_producto}</td>
              <td>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;