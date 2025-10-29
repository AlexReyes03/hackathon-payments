import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Splash from './components/Splash';
import LoginCredentials from './components/LoginCredentials';
import LoginPin from './components/LoginPin';

const STORED_USERNAME_KEY = 'ezpay_remembered_username';

export default function LoginForm() {
  const { login, loading } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  const [rememberedUsername, setRememberedUsername] = useState(null);
  const [loginMode, setLoginMode] = useState('credentials'); // 'credentials' or 'pin'

  useEffect(() => {
    const stored = localStorage.getItem(STORED_USERNAME_KEY);
    if (stored) {
      setRememberedUsername(stored);
      setLoginMode('pin');
    }
  }, []);

  const handleAccederClick = () => {
    setShowSplash(false);
  };

  const handleCredentialsSubmit = async ({ username, password }) => {
    await login({ username, password });
    localStorage.setItem(STORED_USERNAME_KEY, username);
    // Navigation will be handled by PublicRouter based on user role
  };

  const handlePinSubmit = async ({ username, pin }) => {
    await login({ username, pin });
    // Navigation will be handled by PublicRouter based on user role
  };

  const handleSwitchAccount = () => {
    localStorage.removeItem(STORED_USERNAME_KEY);
    setRememberedUsername(null);
    setLoginMode('credentials');
  };

  // Splash Screen
  if (showSplash) {
    return <Splash onAccederClick={handleAccederClick} />;
  }

  // PIN Mode - User Remembered
  if (loginMode === 'pin' && rememberedUsername) {
    return (
      <LoginPin
        username={rememberedUsername}
        onSubmit={handlePinSubmit}
        onSwitchAccount={handleSwitchAccount}
        loading={loading}
      />
    );
  }

  // Credentials Mode - No User Remembered
  return (
    <LoginCredentials
      onSubmit={handleCredentialsSubmit}
      loading={loading}
    />
  );
}