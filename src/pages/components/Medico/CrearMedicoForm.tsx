import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearMedico, getEspecialidades, getUsuarios } from '../../../services/apiService';
import './CrearMedicoForm.css';

interface Especialidad {
  id: string;
  tipo: string;
}

interface Usuario {
  id: string;
  nombreUsuario: string;
}

const CrearMedicoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
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

    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error fetching usuarios', error);
      }
    };

    fetchEspecialidades();
    fetchUsuarios();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await crearMedico({ nombreCompleto, especialidadId: especialidadSeleccionada, usuarioNombre: usuarioSeleccionado });
      navigate(`/medicos/${especialidadSeleccionada}`);
    } catch (error) {
      console.error('Error creando médico', error);
    }
  };

  return (
    <div className="crear-medico-form-container">
      <h2>Crear Nuevo Médico</h2>
      <form onSubmit={handleSubmit} className="crear-medico-form">
        <label htmlFor="nombreCompleto">Nombre Completo del Médico:</label>
        <input
          type="text"
          id="nombreCompleto"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
        />

        <label htmlFor="especialidad">Especialidad:</label>
        <select
          id="especialidad"
          value={especialidadSeleccionada}
          onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
          required
        >
          <option value="">Selecciona una especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.tipo}
            </option>
          ))}
        </select>

        <label htmlFor="usuario">Usuario:</label>
        <select
          id="usuario"
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          required
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.nombreUsuario}>
              {usuario.nombreUsuario}
            </option>
          ))}
        </select>

        <button type="submit" className="guardar-btn">Guardar</button>
      </form>
    </div>
  );
};

export default CrearMedicoForm;
