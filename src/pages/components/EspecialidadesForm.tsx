import React, { useState, useEffect } from 'react';
import { getEspecialidades, eliminarEspecialidad } from '../../services/apiService'; // Asegúrate de tener esta función
import { Link, useNavigate } from 'react-router-dom';
import './EspecialidadesForm.css';
import Header from './Header/Header';

const EspecialidadesForm: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<{ id: number; tipo: string; descripcion: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        console.error('Error fetching especialidades', error);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarEspecialidad(id);
      setEspecialidades(especialidades.filter((especialidad) => especialidad.id !== id));
    } catch (error) {
      console.error('Error eliminando la especialidad', error);
    }
  };

  return (
    <div className="especialidades-container">
      <Header/>
      <h2>Lista de Especialidades</h2>
      <ul>
        {especialidades.map((especialidad) => (
          <li key={especialidad.id}>
            <h3>{especialidad.tipo}</h3>
            <p>{especialidad.descripcion}</p>
            <div className="especialidad-actions">
              <button onClick={() => handleEliminar(especialidad.id)} className="eliminar-btn">Eliminar</button>
              <button onClick={() => navigate(`/medicos/${especialidad.id}`)} className="medico-btn">Médico</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/crear-especialidad">
        <button className="crear-btn">Crear Nueva Especialidad</button>
      </Link>
    </div>
  );
};

export default EspecialidadesForm;
