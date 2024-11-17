import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem('auth') === 'true'; // Verifica si el usuario está autenticado
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
