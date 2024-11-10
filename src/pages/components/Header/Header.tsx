import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de crear este archivo CSS para los estilos del header

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">Prescripto</h1>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/especialidades">Find a specialist</Link>
        <Link to="/triaje">Triaje</Link>
        <Link to="/Medico">Medico</Link>
        <Link to="/historial-triaje">Historial</Link>
      </nav>
    </header>
  );
};

export default Header;
