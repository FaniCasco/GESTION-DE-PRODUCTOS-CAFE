import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css';
import logo from '../assets/images/logo.png';

function Nav() {
  const [productosDropdownOpen, setProductosDropdownOpen] = useState(false);
  const [clientesDropdownOpen, setClientesDropdownOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-brand">
        <img src={logo} alt="Logo" className="logo" 
          style={{
            width: '100px',
            height: '100px',
          }}
        />
      </div>
      <ul className="nav-list">
        <li><Link to="/">Inicio</Link></li>
        <li 
          className="dropdown" 
          onMouseEnter={() => setProductosDropdownOpen(true)} 
          onMouseLeave={() => setProductosDropdownOpen(false)}
        >
          <button className="dropdown-button">Productos</button>
          {productosDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/productos" className="dropdown-item">Lista</Link>
              <Link to="/productos/agregar" className="dropdown-item">Agregar</Link>
            </div>
          )}
        </li>
        <li 
          className="dropdown" 
          onMouseEnter={() => setClientesDropdownOpen(true)} 
          onMouseLeave={() => setClientesDropdownOpen(false)}
        >
          <button className="dropdown-button">Clientes</button>
          {clientesDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/clientes" className="dropdown-item">Lista</Link>
              <Link to="/clientes/agregar" className="dropdown-item">Agregar</Link>
            </div>
          )}
        </li>
        <li><Link to="/ventas">Ventas</Link></li>
        <li><Link to="/stock">Stock</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;

