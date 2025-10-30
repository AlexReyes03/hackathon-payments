import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { setAuthHandlers } from './api/fetchWrapper';
import AppRouter from './routes/AppRouter';

function AppContent() {
  const { handleAuthError } = useAuth();

  useEffect(() => {
    if (handleAuthError) {
      setAuthHandlers({ handleAuthError });
    }
  }, [handleAuthError]);

  return <AppRouter />;
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}