import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const crearEspecialidad = async (especialidad: { tipo: string; descripcion: string }) => {
  try {
    const response = await apiClient.post('/especialidades', especialidad);
    return response.data;
  } catch (error) {
    console.error('Error creando la especialidad', error);
    throw error;
  }
};

// Asegúrate de exportar todas las funciones necesarias
export const getEspecialidades = async () => {
  try {
    const response = await apiClient.get('/especialidades');
    return response.data;
  } catch (error) {
    console.error('Error fetching especialidades', error);
    throw error;
  }
};

export const eliminarEspecialidad = async (id: number) => {
  try {
    await apiClient.delete(`/especialidades/${id}`);
  } catch (error) {
    console.error('Error eliminando la especialidad', error);
    throw error;
  }
};

export const crearMedico = async (medico: { nombreCompleto: string; especialidadId: string; usuarioNombre: string }) => {
  try {
    const response = await apiClient.post('/medicos', medico);
    return response.data;
  } catch (error) {
    console.error('Error creando médico', error);
    throw error;
  }
};

export const getMedicosByEspecialidad = async (especialidadId: string) => {
  try {
    const response = await apiClient.get(`/medicos/especialidad/${especialidadId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching médicos por especialidad', error);
    throw error;
  }
};


export const getUsuarios = async () => {
  try {
    const response = await apiClient.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching usuarios', error);
    throw error;
  }
};

export const eliminarMedico = async (medicoId: string) => {
  try {
    const response = await apiClient.delete(`/medicos/${medicoId}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando el médico', error);
    throw error;
  }
};


export const crearHorario = async (horarioData: { fecha: string; horaFin: string; capacidadFichas: number; medicoId: number }) => {
  const response = await apiClient.post('/horarios', horarioData);
  return response.data;
};


export const getHorariosByMedico = async (medicoId: string) => {
  try {
    const response = await apiClient.get(`/horarios/medico/${medicoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching horarios:', error);
    throw error;
  }
};

export const eliminarHorario = async (horarioId: string) => {
  try {
    await apiClient.delete(`/horarios/${horarioId}`);
  } catch (error) {
    console.error('Error deleting horario:', error);
    throw error;
  }
};
export const createFichaAtencion = async (fichaData: { medicoId: string; horarioId: string; fechaAtencion: string }) => {
  return apiClient.post('/fichas', fichaData);
};

export const getMedicos = async () => {
  try {
    const response = await apiClient.get('/medicos');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicos:', error);
    throw error;
  }
};
export const getFichasAtencion = async () => {
  const response = await apiClient.get('/fichas');
  return response.data;
};