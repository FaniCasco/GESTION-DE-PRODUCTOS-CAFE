import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCreditCard, FaWeightHanging, FaBarcode, FaTimes, FaEdit, FaSave } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { LuPackagePlus } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
//import '../Styles/ClientesForm.css';
import '../Styles/Forms.css';

function ProductoForm({ producto, onProductoCreado, onProductoActualizado, onCancel }) {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        precio_costo: 0,
        precio_venta_efectivo: 0,
        precio_venta_credito: 0,
        precio_venta_debito: 0,
        ganancia: 0,
        peso: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (producto) {
            setFormData({
                codigo: producto.codigo || '',
                nombre: producto.nombre || '',
                precio_costo: producto.precio_costo || 0,
                precio_venta_efectivo: producto.precio_venta_efectivo || 0,
                precio_venta_credito: producto.precio_venta_credito || 0,
                precio_venta_debito: producto.precio_venta_debito || 0,
                ganancia: producto.ganancia || 0,
                peso: producto.peso || 0
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                ...formData,
                codigo: parseFloat(formData.codigo),
                precio_costo: parseFloat(formData.precio_costo),
                precio_venta_efectivo: parseFloat(formData.precio_venta_efectivo),
                precio_venta_credito: parseFloat(formData.precio_venta_credito),
                precio_venta_debito: parseFloat(formData.precio_venta_debito),
                ganancia: parseFloat(formData.ganancia),
                peso: parseFloat(formData.peso),
            };

            if (producto) {
                await axios.put(`http://localhost:5000/productos/${producto.codigo}`, data);
                Swal.fire('Éxito', 'Producto actualizado con éxito', 'success');
                if (onProductoActualizado) onProductoActualizado();
            } else {
                await axios.post('http://localhost:5000/productos', data);
                Swal.fire('Éxito', 'Producto creado con éxito', 'success');
                if (onProductoCreado) onProductoCreado();
            }

            if (onCancel) onCancel();
        } catch (error) {
            console.error('Error al guardar producto', error);
            Swal.fire('Error', 'Hubo un problema al procesar el producto', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="client-form-container">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl={10} lg={10} md={12}>
                        <Card className="client-form-card">
                            <div className="client-form-header">
                                <h2><LuPackagePlus className="me-2" /> {producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                            </div>
                            <div className="client-form-body p-4">
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <Form.Group controlId="formNombre">
                                                <Form.Label className="form-label-custom">
                                                    <FaRegFileAlt className="me-2" /> Nombre *
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formCodigo">
                                                <Form.Label className="form-label-custom">
                                                    <FaBarcode className="me-2" /> Código *
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="codigo"
                                                    value={formData.codigo}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                    disabled={!!producto}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <Form.Group controlId="formPeso">
                                                <Form.Label className="form-label-custom">
                                                    <FaWeightHanging className="me-2" /> Peso (g) *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="peso"
                                                    value={formData.peso}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPrecioCosto">
                                                <Form.Label className="form-label-custom">
                                                    <AiFillDollarCircle className="me-2" /> Costo *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="precio_costo"
                                                    value={formData.precio_costo}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col md={4}>
                                            <Form.Group controlId="formPrecioVentaEfectivo">
                                                <Form.Label className="form-label-custom">
                                                    <BsCashCoin className="me-2" /> Efectivo *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="precio_venta_efectivo"
                                                    value={formData.precio_venta_efectivo}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formPrecioVentaDebito">
                                                <Form.Label className="form-label-custom">
                                                    <FaRegCreditCard className="me-2" /> Débito *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="precio_venta_debito"
                                                    value={formData.precio_venta_debito}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formPrecioVentaCredito">
                                                <Form.Label className="form-label-custom">
                                                    <FaRegCreditCard className="me-2" /> Crédito *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="precio_venta_credito"
                                                    value={formData.precio_venta_credito}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col md={12}>
                                            <Form.Group controlId="formGanancia">
                                                <Form.Label className="form-label-custom">
                                                    <GiMoneyStack className="me-2" /> Ganancia *
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="ganancia"
                                                    value={formData.ganancia}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-end gap-3 mt-5">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={onCancel}
                                            className="btn-client-outline px-4 py-2"
                                            disabled={isSubmitting}
                                        >
                                            <FaTimes className="me-2" />
                                            Cancelar
                                        </Button>

                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="btn-client-primary px-4 py-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Procesando...
                                                </>
                                            ) : (
                                                <>
                                                    {producto ? <FaEdit className="me-2" /> : <FaSave className="me-2" />}
                                                    {producto ? 'Actualizar' : 'Guardar'}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductoForm;
