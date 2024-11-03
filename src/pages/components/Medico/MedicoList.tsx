import React from 'react';
import { useParams } from 'react-router-dom';

const MedicoList: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Lógica para obtener los médicos de la especialidad con el ID
  return (
    <div>
      <h2 className='texto'>Médicos de la especialidad {id}</h2>
      {/* Aquí puedes agregar la lógica para listar los médicos */}
    </div>
  );
};

export default MedicoList;
