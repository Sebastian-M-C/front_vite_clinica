import React, { useEffect, useState } from 'react';
import { getFichasAtencion } from '../../../services/apiService';
import './FichaAtencionList.css'

interface FichaAtencion {
  id: number;
  fechaAtencion: string;
  pacienteId: number;
  pacienteNombre: string;
  medicoId: number;
  medicoNombre: string;
  horarioId: number;
  horarioDescripcion: string;
  especialidadId: number;
}

const FichaAtencionList: React.FC = () => {
  const [fichas, setFichas] = useState<FichaAtencion[]>([]);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const data = await getFichasAtencion();
        setFichas(data);
      } catch (error) {
        console.error('Error fetching fichas de atención:', error);
      }
    };

    fetchFichas();
  }, []);

  return (
    <div className="ficha-list-container">
      <h2 className="ficha-list-title">Lista de Fichas de Atención</h2>
      <div className="ficha-list">
        {fichas.map((ficha) => (
          <div key={ficha.id} className="ficha-card">
            {/* <p className="ficha-item">Fecha de Atención: {ficha.fechaAtencion}</p> */}
            <p className="ficha-item">Paciente: {ficha.pacienteNombre}</p>
            <p className="ficha-item">Médico: {ficha.medicoNombre}</p>
            <p className="ficha-item">Especialidad ID: {ficha.especialidadId}</p>
            <p className="ficha-item">Horario: {ficha.horarioDescripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );}

export default FichaAtencionList;
