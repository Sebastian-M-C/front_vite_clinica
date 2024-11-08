import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicosByEspecialidad, eliminarMedico } from '../../../services/apiService';
import './MedicoList.css';

interface Medico {
  id: string;
  nombreCompleto: string;
  usuarioNombre: string;
}

const MedicoList: React.FC = () => {
  const { id: especialidadId } = useParams<{ id: string }>();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (especialidadId) {
      const fetchMedicos = async () => {
        try {
          const data = await getMedicosByEspecialidad(especialidadId);
          setMedicos(data);
        } catch (error) {
          console.error('Error fetching médicos', error);
        }
      };
      fetchMedicos();
    }
  }, [especialidadId]);

  const handleEliminar = async (medicoId: string) => {
    try {
      await eliminarMedico(medicoId);
      setMedicos(medicos.filter(medico => medico.id !== medicoId));
    } catch (error) {
      console.error('Error eliminando médico', error);
    }
  };

  const handleCrearMedico = () => {
    navigate(`/crear-medico/${especialidadId}`);
  };

  const handleHorarioClick = (medicoId: string) => {
    navigate(`/horarios/${medicoId}`);
  };

  return (
    <div className="medico-list-container">
      <h2>Médicos de la Especialidad {especialidadId}</h2>
      <div className="medico-list">
        {medicos.map((medico) => (
          <div key={medico.id} className="medico-card">
            <h3>{medico.nombreCompleto}</h3>
            <p>Usuario: {medico.usuarioNombre}</p>
            <div className="medico-buttons">
              <button className="eliminar-btn" onClick={() => handleEliminar(medico.id)}>Eliminar</button>
              <button className="horario-btn" onClick={() => handleHorarioClick(medico.id)}>Horario</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCrearMedico} className="crear-medico-btn">Crear Médico</button>
    </div>
  );
};

export default MedicoList;
