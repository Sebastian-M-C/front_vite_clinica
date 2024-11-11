import React, { useEffect, useState } from 'react';
import { getAllTriaje, getAllRecetas } from '../../../services/apiService';
import './HistorialList.css';

interface Triaje {
  id: number;
  descripcion: string;
}

interface Receta {
  id: number;
  descripcion: string;
}

const HistorialTriajeList: React.FC = () => {
  const [triajes, setTriajes] = useState<Triaje[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener triajes
        const triajeData = await getAllTriaje();
        setTriajes(triajeData);

        // Obtener recetas
        const recetaData = await getAllRecetas();
        setRecetas(recetaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="historial-triaje-container">
      <h2 className="historial-triaje-title">Historial</h2>

      <div className="triaje-list">
        <h3>Triaje</h3>
        {triajes.map((triaje) => (
          <div key={triaje.id} className="triaje-card">
            <p className="colorcito">{triaje.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="receta-list">
        <h3 className='colorcito'>Recetas</h3>
        {recetas.map((receta) => (
          <div key={receta.id} className="receta-card">
            <p className="colorcito">{receta.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialTriajeList;
