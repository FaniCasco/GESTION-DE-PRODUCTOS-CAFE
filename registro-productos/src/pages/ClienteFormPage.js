import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClienteForm from '../components/ClienteForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Styles/Forms.css';

function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = React.useState(null);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/clientes/${id}`);
          setCliente(response.data);
        } catch (error) {
          console.error('Error al obtener cliente:', error);
          Swal.fire('Error', 'No se pudo cargar el cliente', 'error');
          navigate('/clientes');
        } finally {
          setLoading(false);
        }
      };
      fetchCliente();
    }
  }, [id, navigate]);

  const handleSubmitSuccess = (actionType) => {
    Swal.fire({
      title: '¡Éxito!',
      text: `Cliente ${actionType === 'edit' ? 'actualizado' : 'creado'} correctamente`,
      icon: 'success'
    });
    navigate('/clientes');
  };

  const handleCancel = () => {
    navigate('/clientes');
  };

  if (loading) {
    return (
      <div className="client-form-container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <div className="client-form-container">
      <div className="cliente-form-wrapper client-form-card">
        <div className="client-form-header">
          <h2>{id ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
        </div>
        <div className="client-form-body p-4">
          <ClienteForm
            cliente={cliente}
            onClienteCreado={() => handleSubmitSuccess('create')}
            onClienteActualizado={() => handleSubmitSuccess('edit')}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}

export default ClienteFormPage;
