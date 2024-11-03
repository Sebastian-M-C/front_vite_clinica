import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearEspecialidad } from '../../services/apiService';
import './crearEspecialidad.css';
import Header from './Header/Header';

const CrearEspecialidadForm: React.FC = () => {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await crearEspecialidad({ tipo, descripcion });
      navigate('/especialidades'); // Redirige a la lista de especialidades después de crear
    } catch (error) {
      console.error('Error creando la especialidad', error);
    }
  };

  return (
    <div className="crear-especialidad-form">
        <Header/>
      <h2>Crear Nueva Especialidad</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tipo">Tipo de Especialidad:</label>
        <input
          type="text"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearEspecialidadForm;
