import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import './HorarioList.css';
import Header from '../Header/Header';

interface Horario {
  id: string;
  fecha: string;
  horaFin: string;
  capacidadFichas: number;
}

const HorarioList: React.FC = () => {
  const { medicoId } = useParams<{ medicoId: string }>();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const navigate = useNavigate(); // Para redirigir después de guardar

  useEffect(() => {
    if (medicoId) {
      const fetchHorarios = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/horarios/medico/${medicoId}` // Endpoint de horarios por médico
          );
          setHorarios(response.data);
        } catch (error) {
          console.error('Error fetching horarios:', error);
        }
      };
      fetchHorarios();
    }
  }, [medicoId]);

  const handleEliminar = async (horarioId: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/horarios/${horarioId}`);
      setHorarios(horarios.filter((horario) => horario.id !== horarioId)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando horario:', error);
    }
  };

  const handleGuardarFicha = async (horarioId: string) => {
    try {
      const fichaData = {
        fechaAtencion: new Date().toISOString().split('T')[0], // Fecha actual
        pacienteId: 1, // Asegúrate de que este ID sea válido en la base de datos
        medicoId: Number(medicoId), // ID del médico actual
        especialidadId: 6, // ID de especialidad (ajústalo según la lógica)
        horarioId: Number(horarioId), // ID del horario seleccionado
      };

      const response = await axios.post('http://localhost:8080/api/fichas', fichaData);

      if (response.status === 200 || response.status === 201) {
        alert('Ficha creada exitosamente');
        navigate('/fichas-atencion'); // Redirige a la lista de fichas
      } else {
        throw new Error('Error desconocido al guardar ficha');
      }
    } catch (error: any) {
      console.error('Error al guardar ficha:', error.response?.data || error.message);
      alert(`Ocurrió un error: ${error.response?.data?.message || 'Error desconocido'}`);
    }
  };

  const handleCrearHorario = () => {
    if (medicoId) {
      navigate(`/crear-horario/${medicoId}`);
    }
  };

  return (
    <div className="horario-list-container">
      <Header />
      <h2>Horarios del Médico {medicoId}</h2>
      <div className="horario-list">
        {horarios.map((horario) => (
          <div key={horario.id} className="horario-card">
            <p>Fecha: {horario.fecha}</p>
            <p>Hora Fin: {horario.horaFin}</p>
            <p>Capacidad de Fichas: {horario.capacidadFichas}</p>
            <button
              className="eliminar-btn"
              onClick={() => handleEliminar(horario.id)}
            >
              Eliminar
            </button>
            <button
              className="guardar-ficha-btn"
              onClick={() => handleGuardarFicha(horario.id)}
            >
              Guardar Ficha
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleCrearHorario} className="crear-horario-btn">
        Crear Horario
      </button>
    </div>
  );
};

export default HorarioList;
