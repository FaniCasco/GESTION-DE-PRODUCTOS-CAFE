import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClienteForm from '../components/ClienteForm';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Swal from 'sweetalert2';

function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = React.useState(null);
  const [loading, setLoading] = React.useState(!!id);

  // Obtener datos del cliente si estamos en modo edición
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
      <Container className="my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando datos del cliente...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">{id ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
      <ClienteForm
        cliente={cliente}
        onClienteCreado={() => handleSubmitSuccess('create')}
        onClienteActualizado={() => handleSubmitSuccess('edit')}
        onCancel={handleCancel}
      />
    </Container>
  );
}

export default ClienteFormPage;