import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearTriaje } from '../../../services/apiService'; // Crear este método en apiService
import './TriajeForm.css';

const TriajeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la ficha de atención
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearTriaje({ fichaAtencionId: Number(id), descripcion });
      navigate('/historial'); // Redirige al historial después de guardar
    } catch (error) {
      console.error('Error creando triaje:', error);
    }
  };

  return (
    <div className="triaje-form-container">
      <h2>Registrar Estado del Paciente en Triaje</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default TriajeForm;
