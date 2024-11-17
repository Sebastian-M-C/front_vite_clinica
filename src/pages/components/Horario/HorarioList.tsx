import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHorariosByMedico, eliminarHorario } from '../../../services/apiService';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (medicoId) {
      const fetchHorarios = async () => {
        try {
          const data = await getHorariosByMedico(medicoId);
          setHorarios(data);
        } catch (error) {
          console.error('Error fetching horarios', error);
        }
      };
      fetchHorarios();
    }
  }, [medicoId]);

  const handleEliminar = async (horarioId: string) => {
    try {
      await eliminarHorario(horarioId);
      setHorarios(horarios.filter(horario => horario.id !== horarioId)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando horario', error);
    }
  };

  const handleCrearHorario = () => {
    navigate(`/crear-horario/${medicoId}`);
  };

  const handleSacarFicha = (horarioId: string) => {
    navigate(`/crear-ficha?horarioId=${horarioId}`);
  };
  

  return (
    <div className="horario-list-container">
      <Header/>
      <h2>Horarios del Médico {medicoId} </h2>
      <div className="horario-list">
        {horarios.map((horario) => (
          <div key={horario.id} className="horario-card">
            <p>Fecha: {horario.fecha}</p>
            <p>Hora Fin: {horario.horaFin}</p>
            <p>Capacidad de Fichas: {horario.capacidadFichas}</p>
            <button className="eliminar-btn" onClick={() => handleEliminar(horario.id)}>Eliminar</button>
            <button className="sacar-ficha-btn" onClick={() => handleSacarFicha(horario.id)}>Sacar Ficha</button>
          </div>
        ))}
      </div>
      <button onClick={handleCrearHorario} className="crear-horario-btn">Crear Horario</button>
    </div>
  );
};

export default HorarioList;
