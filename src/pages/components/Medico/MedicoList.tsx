import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFichasAtencionTriaje } from '../../../services/apiService'; // Asegúrate de que este servicio esté configurado correctamente


interface FichaAtencion {
  id: number;
  fechaAtencion: string;
  pacienteNombre: string;
  medicoNombre: string;
  especialidadId: number;
  horarioDescripcion: string;
}

const TriajeList: React.FC = () => {
  const [fichas, setFichas] = useState<FichaAtencion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const data = await getFichasAtencionTriaje();
        setFichas(data);
      } catch (error) {
        console.error('Error al obtener las fichas de atención para triaje:', error);
      }
    };

    fetchFichas();
  }, []);

  const handleVerFicha = (fichaId: number) => {
    navigate(`/triaje/${fichaId}`);
  };

  return (
    <div className="triaje-list-container">
      <h2>Fichas de Atención en Triaje</h2>
      <div className="triaje-list">
        {fichas.length === 0 ? (
          <p>No hay fichas de atención en triaje.</p>
        ) : (
          fichas.map((ficha) => (
            <div key={ficha.id} className="triaje-card">
              <p>Fecha de Atención: {ficha.fechaAtencion}</p>
              <p>Paciente: {ficha.pacienteNombre}</p>
              <p>Médico: {ficha.medicoNombre}</p>
              <p>Especialidad ID: {ficha.especialidadId}</p>
              <p>Horario: {ficha.horarioDescripcion}</p>
              <button onClick={() => handleVerFicha(ficha.id)}>Ver</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TriajeList;
