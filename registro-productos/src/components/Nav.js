import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Nav.css';
import logo from '../assets/images/logo.png';

function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { 
      label: 'Productos',
      subItems: [
        { path: '/productos', label: 'Lista' },
        { path: '/productos/agregar', label: 'Agregar' }
      ]
    },
    { 
      label: 'Clientes',
      subItems: [
        { path: '/clientes', label: 'Lista' },
        { path: '/clientes/agregar', label: 'Agregar' }
      ]
    },
    { path: '/ventas', label: 'Ventas' },
    { path: '/stock', label: 'Stock' }
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="nav-container">
      <div className="nav-brand">
        <img 
          src={logo} 
          alt="Logo" 
          className="logo" 
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li 
            key={item.label}
            className={`nav-item ${
              item.subItems ? 'dropdown' : ''
            } ${
              isActive(item.path) || 
              (item.subItems && item.subItems.some(sub => isActive(sub.path))) ? 
              'active' : ''
            }`}
            onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
            onMouseLeave={() => item.subItems && setActiveDropdown(null)}
          >
            {item.path ? (
              <Link to={item.path} className="nav-link">
                {item.label}
              </Link>
            ) : (
              <>
                <button 
                  className="dropdown-button"
                  onClick={() => toggleDropdown(item.label)}
                >
                  {item.label}
                </button>
                {activeDropdown === item.label && (
                  <div className="dropdown-menu">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`dropdown-item ${
                          isActive(subItem.path) ? 'active' : ''
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;

