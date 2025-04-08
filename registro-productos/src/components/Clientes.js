import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClienteForm from '../components/ClienteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../Styles/Clientes.css';
import { IoIosPersonAdd } from "react-icons/io";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [recargarClientes, setRecargarClientes] = useState(false); // Nuevo estado

  useEffect(() => {
    cargarClientes();
    setRecargarClientes(false); // Restablecer el estado después de cargar
  }, [recargarClientes]); // Dependencia en recargarClientes

  const cargarClientes = () => {
    axios.get('http://localhost:5000/clientes').then((response) => {
      setClientes(response.data);
    });
  };

  const handleClienteAgregado = () => {
    setRecargarClientes(true); // Establecer el estado para recargar
    cerrarModal(); // Cerrar el modal
  };

  const handleEliminar = (dni) => {
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
        axios.delete(`http://localhost:5000/clientes/${dni}`).then(() => {
          setClientes(clientes.filter((cliente) => cliente.dni !== dni));
          Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
        });
      }
    });
  };

  const handleEditar = (cliente) => {
    setClienteAEditar(cliente);
    setModalAbierto(true);
    setModoAgregar(false);
  };

  const handleAgregar = () => {
    setClienteAEditar(null);
    setModalAbierto(true);
    setModoAgregar(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteAEditar(null);
    setModoAgregar(false);
  };


  return (
    <div className="clientes-container">
      <h2>Lista de Clientes</h2>
      <button onClick={handleAgregar} className="agregar-cliente-btn">
        <FontAwesomeIcon icon={faPlus} /><IoIosPersonAdd /> Agregar Cliente
      </button>
      <table className="clientes-table">
        <thead> 
     
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Domicilio</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.dni}>
              <td>{cliente.dni}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.domicilio}</td>
              <td>{cliente.telefono}</td>
              <td>
                <button onClick={() => handleEditar(cliente)} className="editar-cliente-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleEliminar(cliente.dni)} className="eliminar-cliente-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>
              &times;
            </span>
            <ClienteForm
              cliente={clienteAEditar}
              onClienteCreado={cargarClientes}
              onClienteActualizado={cargarClientes}
              onCancel={cerrarModal}
              modoAgregar={modoAgregar}
              onClienteAgregado={handleClienteAgregado}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;