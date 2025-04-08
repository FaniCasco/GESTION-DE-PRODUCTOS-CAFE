// pages/InicioPage.js
import React from 'react';
import logo from '../assets/images/logo.png';
import '../App.css';

function InicioPage() {
  return (
    <div className="inicio-container">
      <h1>Bienvenido a la <br/> Gestión de Productos</h1>
      <p>Administra fácilmente tus productos, clientes, ventas y stock.</p>
      <img 
      src={logo} 
      alt="Logo"
      width="200px" />
    </div>
  );
}

export default InicioPage;