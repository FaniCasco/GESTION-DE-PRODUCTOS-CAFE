import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout
import Nav from './components/Nav';
import Footer from './components/Footer';

// Pages
import InicioPage from './pages/InicioPage';
import ProductosPage from './pages/ProductosPage';
import ProductoFormPage from './pages/ProductoFormPage';
import ClientesPage from './pages/ClientesPage';
import ClienteFormPage from './pages/ClienteFormPage';
import VentasPage from './pages/VentasPage';
import StockPage from './pages/StockPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            
            {/* Productos */}
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/agregar" element={<ProductoFormPage />} />
            <Route path="/productos/editar/:id" element={<ProductoFormPage />} />
            
            {/* Clientes */}
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/clientes/agregar" element={<ClienteFormPage />} />
            <Route path="/clientes/editar/:id" element={<ClienteFormPage />} />
            
            {/* Ventas */}
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/ventas/agregar" element={<VentasPage />} />
            <Route path="/ventas/editar/:id" element={<VentasPage />} />
            
            {/* Stock */}
            <Route path="/stock" element={<StockPage />} />
            <Route path="/stock/agregar" element={<StockPage />} />
           
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;