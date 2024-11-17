import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validar credenciales
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true'); // Guardar en localStorage para simular autenticación
      navigate('/home'); // Redirigir a la página principal
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '300px' }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: '10px', width: '150px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Iniciar Sesión
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Login;
