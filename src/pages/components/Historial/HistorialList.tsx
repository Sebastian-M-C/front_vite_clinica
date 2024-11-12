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
        // Cargar datos de triaje y recetas desde el backend
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

    // Título del documento
    doc.setFontSize(18);
    doc.text('Historial Clínico', 10, 10);

    // Sección de Triaje
    doc.setFontSize(14);
    doc.text('Triaje', 10, 20);
    let yOffset = 30;

    triajes.forEach((triaje) => {
      doc.setFontSize(12);
      doc.text(`- ${triaje.descripcion}`, 10, yOffset);
      yOffset += 10;
    });

    yOffset += 10; // Espacio entre las secciones

    // Sección de Recetas
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
      <h2 className="historial-triaje-title">Historial Clínico</h2>

      {/* Botón para generar el PDF */}
      <button onClick={generatePDF} className="report-button">Generar Reporte (PDF)</button>

      {/* Lista de Triaje */}
      <div className="triaje-list">
        <h3>Triaje</h3>
        {triajes.length > 0 ? (
          triajes.map((triaje) => (
            <div key={triaje.id} className="triaje-card">
              <p className="colorcito">{triaje.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay registros de triaje.</p>
        )}
      </div>

      {/* Lista de Recetas */}
      <div className="receta-list">
        <h3 className="colorcito">Recetas</h3>
        {recetas.length > 0 ? (
          recetas.map((receta) => (
            <div key={receta.id} className="receta-card">
              <p className="colorcito">{receta.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay recetas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default HistorialTriajeList;
