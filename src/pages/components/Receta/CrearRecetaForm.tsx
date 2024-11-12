import React, { useState } from 'react';
import axios from 'axios';
import './CrearRecetaForm.css';

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
      <h2 className="crear-receta-title">Crear Receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Crear Receta</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CrearRecetaForm;
