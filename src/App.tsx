
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EspecialidadesForm from './pages/components/EspecialidadesForm';
import CrearEspecialidadForm from './pages/components/CrearEspecialidadForm';
import MedicoList from './pages/components/Medico/MedicoList';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/especialidades" element={<EspecialidadesForm />} />
        <Route path="/crear-especialidad" element={<CrearEspecialidadForm />} />
        <Route path="/medicos/:id" element={<MedicoList />} />
      </Routes>
    </Router>
  );
}
export default App;