import React, { useState } from 'react';
import axios from 'axios';
import './CrearRecetaForm.css';
import Header from '../Header/Header';

const CrearRecetaForm: React.FC = () => {
  const [descripcion, setDescripcion] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Elimina `response` si no es necesario
      await axios.post('http://localhost:8080/api/recetas', { descripcion });
      
      // Configura el mensaje de éxito y limpia los campos
      setSuccessMessage("Receta creada con éxito.");
      setErrorMessage("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al crear la receta:", error);
      
      // Configura el mensaje de error
      setErrorMessage("Hubo un problema al crear la receta.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="crear-receta-container">
      <Header />
      <div className="form-wrapper">
        <h2 className="crear-receta-title">Crear Receta</h2>
        <form onSubmit={handleSubmit} className="crear-receta-form">
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input
              id="descripcion"
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              placeholder="Describe la receta..."
            />
          </div>
          <button type="submit" className="submit-button">Crear Receta</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CrearRecetaForm;