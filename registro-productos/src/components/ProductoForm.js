import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { LuPackagePlus } from "react-icons/lu";
import { FaWeightHanging } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import '../Styles/ProductosForm.css';

function ProductoForm({ producto, onProductoCreado, onProductoActualizado, onCancel }) {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [precioCosto, setPrecioCosto] = useState(0);
    const [precioVentaEfectivo, setPrecioVentaEfectivo] = useState(0);
    const [precioVentaCredito, setPrecioVentaCredito] = useState(0);
    const [precioVentaDebito, setPrecioVentaDebito] = useState(0);
    const [ganancia, setGanancia] = useState(0);
    const [peso, setPeso] = useState(0);

    useEffect(() => {
        if (producto) {
            setCodigo(producto.codigo || '');
            setNombre(producto.nombre || '');
            setPrecioCosto(producto.precio_costo || 0);
            setPrecioVentaEfectivo(producto.precio_venta_efectivo || 0);
            setPrecioVentaCredito(producto.precio_venta_credito || 0);
            setPrecioVentaDebito(producto.precio_venta_debito || 0);
            setGanancia(producto.ganancia || 0);
            setPeso(producto.peso || 0);
        }
    }, [producto]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            codigo: parseFloat(codigo),
            nombre: nombre,
            precio_costo: parseFloat(precioCosto),
            precio_venta_efectivo: parseFloat(precioVentaEfectivo),
            precio_venta_credito: parseFloat(precioVentaCredito),
            precio_venta_debito: parseFloat(precioVentaDebito),
            ganancia: parseFloat(ganancia),
            peso: parseInt(peso),
        };

        try {
            if (producto) {
                await axios.put(`http://localhost:5000/productos/${producto.codigo}`, data);
                Swal.fire('Actualizado', 'Producto actualizado con éxito', 'success');
                if (onProductoActualizado) {
                    onProductoActualizado();
                }
            } else {
                await axios.post('http://localhost:5000/productos', data);
                Swal.fire('Creado', 'Producto creado con éxito', 'success');
                if (onProductoCreado) {
                    onProductoCreado();
                }
            }
            if (onCancel) {
                onCancel();
            }
        } catch (error) {
            console.error('Error al actualizar producto', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el producto', 'error');
        }
    };

    return (
        <Container>
            <div className="formulario-productos">
                <Form onSubmit={handleSubmit}>
                    <h1 className='titulo-form-productos'>  <LuPackagePlus /> Agregar producto
                    </h1>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="formNombre">
                                <Form.Label><FaRegFileAlt /> Nombre del Producto</Form.Label>
                                <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formCodigo">
                                <Form.Label><FaBarcode /> Código</Form.Label>
                                <Form.Control type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPeso">
                                <Form.Label><FaWeightHanging /> Peso (gms.)</Form.Label>
                                <Form.Control type="number" value={peso} onChange={(e) => setPeso(e.target.value)} required />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formPrecioCosto">
                                <Form.Label><AiFillDollarCircle />  Costo</Form.Label>
                                <Form.Control type="number" value={precioCosto} onChange={(e) => setPrecioCosto(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Row></Row>
                        <Col>
                            <Form.Group controlId="formPrecioVentaEfectivo">
                                <Form.Label><BsCashCoin />  Efectivo</Form.Label>
                                <Form.Control type="number" value={precioVentaEfectivo} onChange={(e) => setPrecioVentaEfectivo(e.target.value)} required />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formPrecioVentaDebito">
                                <Form.Label><FaRegCreditCard />  Débito</Form.Label>
                                <Form.Control type="number" value={precioVentaDebito} onChange={(e) => setPrecioVentaDebito(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPrecioVentaCredito">
                                <Form.Label><FaRegCreditCard />  Crédito</Form.Label>
                                <Form.Control type="number" value={precioVentaCredito} onChange={(e) => setPrecioVentaCredito(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="formPorcentajeGanancia">
                                <Form.Label><GiMoneyStack />  Ganancia</Form.Label>
                                <Form.Control type="number" value={ganancia} onChange={(e) => setGanancia(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className='btn-crear-producto'>
                        {producto ? 'Actualizar Producto' : 'Crear Producto'}
                    </Button>
                    {producto && (
                        <Button variant="secondary" className='btn-cancelar' onClick={onCancel}>
                            Cancelar
                        </Button>
                    )}
                </Form>
            </div>
        </Container>
    );
}

export default ProductoForm;