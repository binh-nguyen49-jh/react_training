import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/authentication';
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user) {
    return children;
  } else {
    return <Navigate to='/authentication'></Navigate>;
  }
}
