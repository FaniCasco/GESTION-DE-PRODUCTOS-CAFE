// pages/ProductosPage.js
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import api from "../api";
import Swal from 'sweetalert2';
import '../Styles/ProductosPage.css';
import ProductoForm from '../components/ProductoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaClipboardList } from "react-icons/fa";

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    api.get('http://localhost:5000/productos').then((response) => {
      setProductos(response.data);
      console.log('Productos cargados:', response.data);
    });
  };

  const handleEliminar = (codigo) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`http://localhost:5000/productos/${codigo}`).then(() => {
          setProductos(productos.filter((producto) => producto.codigo !== codigo));
          Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        });
      }
    });
  };

  const handleEditar = (producto) => {
    console.log('Botón Editar clickeado, producto:', producto);
    setProductoAEditar(producto);
  };

  // Verifica si `productoAEditar` cambia
  useEffect(() => {
    console.log('Estado actualizado del modal:', productoAEditar);
  }, [productoAEditar]);



  const cerrarModal = () => {
    setProductoAEditar(null);
  };

  return (
    <div className="productos-container">
      <h1 style={{ fontFamily: " Karla, sans-serif" }}><FaClipboardList /> Lista de Productos</h1>
      <table className="productos-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio Costo</th>
            <th>Precio Venta Efectivo</th>
            <th>Precio Venta Crédito</th>
            <th>Precio Venta Débito</th>
            <th>Ganancia</th>
            <th>Peso (gms.)</th> {/* Nueva columna para el peso */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio_costo}</td>
                <td>{producto.precio_venta_efectivo}</td>
                <td>{producto.precio_venta_credito}</td>
                <td>{producto.precio_venta_debito}</td>
                <td>{producto.ganancia}</td>
                <td>{producto.peso}</td> 
                <td>
                  <button
                    onClick={() => handleEditar(producto)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} style={{ color: '#4CAF50' }} /> {/* Icono de edición */}

                  </button>
                  <button
                    onClick={() => handleEliminar(producto.codigo)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#f44336' }} /> {/* Icono de eliminación */}

                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      {productoAEditar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>
              &times;
            </span>
            {(() => {
              try {
                return <ProductoForm producto={productoAEditar} onProductoActualizado={cargarProductos} onCancel={cerrarModal} />;
              } catch (error) {
                console.error("Error al renderizar ProductoForm:", error);
                return <p>Error al cargar el formulario.</p>;
              }
            })()}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductosPage;