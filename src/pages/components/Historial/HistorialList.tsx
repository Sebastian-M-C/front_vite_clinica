import React, { useEffect, useState } from 'react';
import { getAllTriaje } from '../../../services/apiService'; // Asegúrate de que esta función esté correctamente configurada
import './HistorialList.css'

interface Triaje {
  id: number;
  descripcion: string;
}

const HistorialTriajeList: React.FC = () => {
  const [triajes, setTriajes] = useState<Triaje[]>([]);

  useEffect(() => {
    const fetchTriajes = async () => {
      try {
        const data = await getAllTriaje();
        setTriajes(data);
      } catch (error) {
        console.error('Error fetching triajes:', error);
      }
    };

    fetchTriajes();
  }, []);

  return (
    <div className="historial-triaje-container">
      <h2 className="historial-triaje-title">Historial</h2>
      <div className="triaje-list">
        {triajes.map((triaje) => (
          <div key={triaje.id} className="triaje-card">
            <p className='colorcito'>{triaje.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialTriajeList;
