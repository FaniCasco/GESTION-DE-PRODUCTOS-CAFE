import React, { useState, useEffect } from 'react';
import api from "../api";
import Swal from 'sweetalert2';
import '../Styles/ProductosPage.css';
import ProductoForm from '../components/ProductoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaClipboardList } from "react-icons/fa";

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    api.get('http://localhost:5000/productos').then((response) => {
      setProductos(response.data);
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
    setProductoAEditar(producto);
    setMostrarFormulario(true);
  };

  const handleAgregar = () => {
    setProductoAEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarModal = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1><FaClipboardList className="me-2" /> Lista de Productos</h1>
        <button className="btn-agregar-producto" onClick={handleAgregar}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Agregar Producto
        </button>
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio Costo</th>
            <th>Venta Efectivo</th>
            <th>Venta Crédito</th>
            <th>Venta Débito</th>
            <th>Ganancia</th>
            <th>Peso (g)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio_costo}</td>
                <td>${producto.precio_venta_efectivo}</td>
                <td>${producto.precio_venta_credito}</td>
                <td>${producto.precio_venta_debito}</td>
                <td>${producto.ganancia}</td>
                <td>{producto.peso}</td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(producto)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn-icon delete" onClick={() => handleEliminar(producto.codigo)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-data">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <ProductoForm
              producto={productoAEditar}
              onProductoCreado={cargarProductos}
              onProductoActualizado={cargarProductos}
              onCancel={cerrarModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosPage;
