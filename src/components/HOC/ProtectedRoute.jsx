import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/authentication';
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to='/authentication/login' />;
}
