import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/ventas').then((response) => {
      setVentas(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Código Producto</th>
            <th>Fecha Venta</th>
            <th>Forma Pago</th>
            <th>Total Venta</th>
            <th>DNI Cliente</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.codigo_producto}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.forma_pago}</td>
              <td>{venta.total_venta}</td>
              <td>{venta.dni_cliente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;