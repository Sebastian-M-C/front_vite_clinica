import React, { useEffect, useState } from 'react';
import { getAllTriaje, getAllRecetas } from '../../../services/apiService';
import jsPDF from 'jspdf';
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
        const triajeData = await getAllTriaje();
        setTriajes(triajeData);

        const recetaData = await getAllRecetas();
        setRecetas(recetaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Historial Clínico', 10, 10);

    doc.setFontSize(14);
    doc.text('Triaje', 10, 20);
    let yOffset = 30; // Margen inicial para la sección de Triaje

    triajes.forEach((triaje) => {
      doc.setFontSize(12);
      doc.text(`- ${triaje.descripcion}`, 10, yOffset);
      yOffset += 10;
    });

    yOffset += 10; // Espacio entre Triaje y Recetas

    doc.setFontSize(14);
    doc.text('Recetas', 10, yOffset);
    yOffset += 10;

    recetas.forEach((receta) => {
      doc.setFontSize(12);
      doc.text(`- ${receta.descripcion}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save('historial_clinico.pdf');
  };

  return (
    <div className="historial-triaje-container">
      <h2 className="historial-triaje-title">Historial</h2>

      <button onClick={generatePDF} className="report-button">Reportes</button>

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
