import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que la URL base esté configurada correctamente
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
