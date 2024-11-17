import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearHorario } from '../../../services/apiService'; // Asegúrate de que este método exista en apiService
import './CrearHorarioForm.css';
import Header from '../Header/Header';

interface CrearHorarioFormProps {}

const CrearHorarioForm: React.FC<CrearHorarioFormProps> = () => {
  const { medicoId } = useParams<{ medicoId: string }>();
  const [fecha, setFecha] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [capacidadFichas, setCapacidadFichas] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!medicoId) {
      console.error('El ID del médico no está definido.');
      return;
    }

    try {
      await crearHorario({ fecha, horaFin, capacidadFichas, medicoId: parseInt(medicoId) });
      navigate(`/horarios/${medicoId}`); // Redirige a la lista de horarios del médico
    } catch (error) {
      console.error('Error al crear el horario', error);
    }
  };

  return (
    <div className="crear-horario-form-container">
      <Header/>
      <h2>Crear Horario para el Médico</h2>
      <form onSubmit={handleSubmit} className="crear-horario-form">
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label htmlFor="horaFin">Hora de Fin:</label>
        <input
          type="time"
          id="horaFin"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
          required
        />

        <label htmlFor="capacidadFichas">Capacidad de Fichas:</label>
        <input
          type="number"
          id="capacidadFichas"
          value={capacidadFichas}
          onChange={(e) => setCapacidadFichas(parseInt(e.target.value))}
          min="1"
          required
        />

        <button type="submit" className="guardar-btn">Guardar</button>
      </form>
    </div>
  );
};

export default CrearHorarioForm;
