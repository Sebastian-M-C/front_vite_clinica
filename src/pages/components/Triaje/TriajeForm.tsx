import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearTriaje } from '../../../services/apiService'; // Crear este método en apiService
import './TriajeForm.css';
import Header from '../Header/Header';

const TriajeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la ficha de atención
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearTriaje({ fichaAtencionId: Number(id), descripcion });
      navigate('/historial-triaje'); // Redirige al historial después de guardar
    } catch (error) {
      console.error('Error creando triaje:', error);
    }
  };

  return (
    <div className="triaje-form-container">
      <Header />
      <div className="form-wrapper">
        <h2>Registrar Estado del Paciente en Triaje</h2>
        <form onSubmit={handleSubmit} className="triaje-form">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            placeholder="Describe el estado actual del paciente..."
          />
          <button type="submit" className="guardar-btn">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default TriajeForm;