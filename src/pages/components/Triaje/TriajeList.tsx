import React, { useEffect, useState } from 'react';
import { getFichasAtencionTriaje } from '../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import './TriajeLista.css';
import Header from '../Header/Header';

interface FichaAtencion {
  id: number;
  fechaAtencion: string;
  pacienteNombre: string;
  medicoNombre: string;
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
        console.error('Error fetching fichas para triaje:', error);
      }
    };
    fetchFichas();
  }, []);

  const handleVerFicha = (id: number) => {
    navigate(`/triaje/${id}`);
  };

  return (
    <div className="triaje-list-container">
      <Header/>
      <h2 className="triaje-list-title">Fichas de Atención en Triaje</h2>
      <div className="triaje-list">
        {fichas.map(ficha => (
          <div key={ficha.id} className="triaje-card">
            <p className="triaje-card-text">Fecha de Atención: {ficha.fechaAtencion}</p>
            <p className="triaje-card-text">Paciente: {ficha.pacienteNombre}</p>
            <p className="triaje-card-text">Médico: {ficha.medicoNombre}</p>
            <button className="ver-btn" onClick={() => handleVerFicha(ficha.id)}>Ver</button>
          </div>
        ))}
      </div>
    </div>
  );}
  

export default TriajeList;
