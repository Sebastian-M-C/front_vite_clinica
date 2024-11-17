import React, { useEffect, useState } from 'react';
import { getFichasAtencion } from '../../../services/apiService';
import './FichaAtencionList.css';
import Header from '../Header/Header';

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
  const [loading, setLoading] = useState(true); // Estado para mostrar un spinner mientras carga

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const data = await getFichasAtencion();
        setFichas(data);
      } catch (error) {
        console.error('Error fetching fichas de atención:', error);
      } finally {
        setLoading(false); // Oculta el spinner una vez que los datos se cargan
      }
    };

    fetchFichas();
  }, []);

  return (
    <div className="ficha-list-container">
      <Header />
      <h2 className="ficha-list-title">Lista de Fichas de Atención</h2>
      {loading ? (
        <p className="loading-message">Cargando fichas de atención...</p>
      ) : fichas.length === 0 ? (
        <p className="no-data-message">No hay fichas de atención disponibles.</p>
      ) : (
        <div className="ficha-list">
          {fichas.map((ficha) => (
            <div key={ficha.id} className="ficha-card">
              <p className="ficha-item">
                <strong>Fecha de Atención:</strong> {ficha.fechaAtencion}
              </p>
              <p className="ficha-item">
                <strong>Paciente:</strong> {ficha.pacienteNombre}
              </p>
              <p className="ficha-item">
                <strong>Médico:</strong> {ficha.medicoNombre}
              </p>
              <p className="ficha-item">
                <strong>Especialidad:</strong> {ficha.especialidadId}
              </p>
              <p className="ficha-item">
                <strong>Horario:</strong> {ficha.horarioDescripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FichaAtencionList;
