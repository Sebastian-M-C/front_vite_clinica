
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EspecialidadesForm from './pages/components/EspecialidadesForm';
import CrearEspecialidadForm from './pages/components/CrearEspecialidadForm';
import MedicoList from './pages/components/Medico/MedicoList';
import CrearMedicoForm from './pages/components/Medico/CrearMedicoForm';
import CrearHorarioForm from './pages/components/Horario/CrearHorarioForm';
import HorarioList from './pages/components/Horario/HorarioList';
import CrearFichaAtencionForm from './pages/components/Ficha/FichaAtencionList';
import FichaAtencionList from './pages/components/Ficha/FichaAtencionList';
 // Asegúrate de que la ruta es correcta
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/especialidades" element={<EspecialidadesForm />} />
        <Route path="/crear-especialidad" element={<CrearEspecialidadForm />} />
        <Route path="/medicos/:id" element={<MedicoList />} />
        <Route path="/crear-medico/:id" element={<CrearMedicoForm />} />
        <Route path="/crear-horario/:medicoId" element={<CrearHorarioForm />} />
        <Route path="/horarios/:medicoId" element={<HorarioList />} />
        <Route path="/crear-ficha" element={<CrearFichaAtencionForm />} />
        <Route path="/fichas-atencion" element={<FichaAtencionList />} />

      </Routes>
    </Router>
  );
}
export default App;