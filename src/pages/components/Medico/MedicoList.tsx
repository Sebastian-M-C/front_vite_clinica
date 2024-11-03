import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicosByEspecialidad } from '../../../services/apiService';
import './MedicoList.css'; // Asegúrate de tener este archivo CSS para los estilos

interface Medico {
  id: number;
  nombreCompleto: string;
}

const MedicoList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la especialidad
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      if (id) {
        try {
          const data = await getMedicosByEspecialidad(id);
          setMedicos(data);
        } catch (error) {
          console.error('Error fetching médicos', error);
        }
      }
    };

    fetchMedicos();
  }, [id]);

  const handleCrearMedico = () => {
    navigate(`/crear-medico/${id}`);
  };

  return (
    <div className="medico-list-container">
      <h2>Médicos de la Especialidad {id}</h2>
      {medicos.length > 0 ? (
        <ul>
          {medicos.map((medico) => (
            <li key={medico.id}>{medico.nombreCompleto}</li>
          ))}
        </ul>
      ) : (
        <p>No hay médicos asociados a esta especialidad.</p>
      )}
      <button onClick={handleCrearMedico} className="crear-medico-btn">Crear Médico</button>
    </div>
  );
};

export default MedicoList;
