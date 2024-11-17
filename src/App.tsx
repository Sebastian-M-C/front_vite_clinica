import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/components/Login/Login'; // Importa el componente de login
import Home from './pages/Home';
import EspecialidadesForm from './pages/components/EspecialidadesForm';
import CrearEspecialidadForm from './pages/components/CrearEspecialidadForm';
import MedicoList from './pages/components/Medico/MedicoList';
import CrearMedicoForm from './pages/components/Medico/CrearMedicoForm';
import CrearHorarioForm from './pages/components/Horario/CrearHorarioForm';
import HorarioList from './pages/components/Horario/HorarioList';
import CrearFichaAtencionForm from './pages/components/Ficha/FichaAtencionList';
import FichaAtencionList from './pages/components/Ficha/FichaAtencionList';
import TriajeForm from './pages/components/Triaje/TriajeForm';
import TriajeList from './pages/components/Triaje/TriajeList';
import HistorialList from './pages/components/Historial/HistorialList';
import CrearRecetaForm from './pages/components/Receta/CrearRecetaForm';
import PrivateRoute from './pages/components/Login/PrivateRoute'; // Importa el componente de rutas privadas

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
         <Route path="/especialidades" element={<EspecialidadesForm />} />
        <Route path="/crear-especialidad" element={<CrearEspecialidadForm />} />
        <Route path="/medicos/:id" element={<MedicoList />} />
        <Route path="/crear-medico/:id" element={<CrearMedicoForm />} />
        <Route path="/crear-horario/:medicoId" element={<CrearHorarioForm />} />
        <Route path="/horarios/:medicoId" element={<HorarioList />} />
        <Route path="/crear-ficha" element={<CrearFichaAtencionForm />} />
        <Route path="/fichas-atencion" element={<FichaAtencionList />} />
        <Route path="/triaje" element={<TriajeList />} />
        <Route path="/triaje/:id" element={<TriajeForm />} />
        <Route path="/historial-triaje" element={<HistorialList />} />
        <Route path="/crear-receta" element={<CrearRecetaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
