import React from 'react';
import imagenDoctores from '../assets/imagen-doctores.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Elimina el estado de autenticación
    navigate('/'); // Redirige al login
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Prescripto</h1>
        <nav className="home-nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/especialidades" className="nav-link">Find a specialist</Link>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="home-content">
        <div className="home-text">
          <h2>Book Appointment With Trusted Doctors</h2>
          <p>
            Simply browse through our extensive list of trusted doctors, schedule your
            appointment hassle-free.
          </p>
          <button className="book-appointment-btn">Book appointment →</button>
        </div>
        <div className="home-image">
          <img src={imagenDoctores} alt="Trusted Doctors" />
        </div>
      </div>
      <footer className="home-footer">
        <div className="footer-section">
          <div className="footer-logo">
            <h2>Prescripto</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><Link to="/home" className="footer-link">Home</Link></li>
              <li><a href="#about" className="footer-link">About us</a></li>
              <li><a href="#delivery" className="footer-link">Delivery</a></li>
              <li><a href="#privacy" className="footer-link">Privacy policy</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>+1-212-456-7890</p>
            <p>greatstackdev@gmail.com</p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>Copyright 2024 © Prescripto.com - All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
