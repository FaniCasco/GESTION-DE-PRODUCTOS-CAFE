import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioPage from './pages/InicioPage';
import ProductosPage from './pages/ProductosPage';
import ProductoFormPage from './pages/ProductoFormPage';
import ClientesPage from './pages/ClientesPage';
import ClienteForm from './components/ClienteForm';
import VentasPage from './pages/VentasPage';
import StockPage from './pages/StockPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/agregar" element={<ProductoFormPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/clientes/agregar" element={<ClienteForm />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/stock" element={<StockPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;