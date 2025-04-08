// components/Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/productos').then(({ data }) => setProductos(data));
  }, []);

  return (
    <div className="productos-container">
    
      <table className="productos-table">
   
        <thead>
          <tr>
            {['Código', 'Nombre', 'Precio Costo', 'Venta Efectivo', 'Venta Crédito', 'Venta Débito', 'Ganancia'].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productos.map(({ codigo,nombre, precio_costo, precio_venta_efectivo, precio_venta_credito, precio_venta_debito, ganancia }) => (
            <tr key={codigo}>
              <td>{codigo}</td>              
              <td>{nombre}</td>
              <td>{precio_costo}</td>
              <td>{precio_venta_efectivo}</td>
              <td>{precio_venta_credito}</td>
              <td>{precio_venta_debito}</td>
              <td>{ganancia}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Productos;