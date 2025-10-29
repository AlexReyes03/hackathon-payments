import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { useAuth } from '../../contexts/AuthContext';

const STORED_USERNAME_KEY = 'ezpay_remembered_username';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [rememberedUsername, setRememberedUsername] = useState(null);
  const [loginMode, setLoginMode] = useState('credentials'); // 'credentials' or 'pin'

  // Credentials mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // PIN mode
  const [pin, setPin] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORED_USERNAME_KEY);
    if (stored) {
      setRememberedUsername(stored);
      setLoginMode('pin');
    }
  }, []);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      await login({ username, password });
      localStorage.setItem(STORED_USERNAME_KEY, username);
      // Navigation will be handled by PublicRouter based on user role
    } catch (err) {
      setError(err.message || 'Error al iniciar sesion');
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 6) {
      setError('El PIN debe tener 6 digitos');
      return;
    }

    try {
      await login({ username: rememberedUsername, pin });
      // Navigation will be handled by PublicRouter based on user role
    } catch (err) {
      setError(err.message || 'PIN incorrecto');
    }
  };

  const handleSwitchAccount = () => {
    localStorage.removeItem(STORED_USERNAME_KEY);
    setRememberedUsername(null);
    setLoginMode('credentials');
    setPin('');
    setError('');
  };

  if (loginMode === 'pin' && rememberedUsername) {
    return (
      <form onSubmit={handlePinSubmit} className="d-flex flex-column gap-4">
        <div className="text-center mb-3">
          <p className="mb-2" style={{ color: '#cccccc', fontSize: '0.95rem' }}>
            Bienvenido de nuevo
          </p>
          <p className="mb-0 fw-semibold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
            {rememberedUsername}
          </p>
        </div>

        <div>
          <label htmlFor="pin" className="form-label" style={{ color: '#ffffff' }}>
            PIN de acceso
          </label>
          <InputMask
            id="pin"
            mask="999999"
            value={pin}
            onChange={(e) => setPin(e.value)}
            placeholder="000000"
            className="w-100"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#ffffff',
              padding: '0.75rem',
            }}
            inputStyle={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
            }}
          />
        </div>

        {error && (
          <div className="alert alert-danger mb-0" role="alert" style={{ fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <Button
          type="submit"
          label="Ingresar"
          loading={loading}
          className="w-100"
          style={{
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: '25px',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#000000',
          }}
        />

        <div className="text-center">
          <button
            type="button"
            onClick={handleSwitchAccount}
            className="btn btn-link text-decoration-none"
            style={{ color: '#ffffff', fontSize: '0.9rem' }}
          >
            Iniciar con otra cuenta
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleCredentialsSubmit} className="d-flex flex-column gap-4">
      <div>
        <label htmlFor="username" className="form-label" style={{ color: '#ffffff' }}>
          Usuario
        </label>
        <InputText
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          className="w-100"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '0.75rem',
          }}
        />
      </div>

      <div>
        <label htmlFor="password" className="form-label" style={{ color: '#ffffff' }}>
          Contraseña
        </label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          toggleMask
          feedback={false}
          className="w-100"
          inputClassName="w-100"
          inputStyle={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '0.75rem',
            width: '100%',
          }}
        />
        <div className="text-end mt-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-decoration-none"
            style={{ color: '#ffffff', fontSize: '0.85rem' }}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mb-0" role="alert" style={{ fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <Button
        type="submit"
        label="Ingresar"
        loading={loading}
        className="w-100"
        style={{
          backgroundColor: '#ffc107',
          border: 'none',
          borderRadius: '25px',
          padding: '0.75rem',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#000000',
        }}
      />

      <div className="text-center">
        <button
          type="button"
          onClick={() => {/* TODO: Navigate to register */ }}
          className="btn btn-link text-decoration-none"
          style={{ color: '#ffffff', fontSize: '0.9rem' }}
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}