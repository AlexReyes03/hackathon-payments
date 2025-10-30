import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Datos de ejemplo - reemplazar con datos reales del usuario
  const userData = {
    initials: user?.first_name && user?.last_name_paternal ? `${user.first_name[0]}${user.last_name_paternal[0]}`.toUpperCase() : 'NA',
    fullName: user?.first_name ? `${user.first_name} ${user.last_name_paternal} ${user.last_name_maternal || ''}`.trim() : 'Nombre Apellido',
    username: user?.username || 'Usuario',
    email: user?.email || 'correo@electronico.mx',
    birthDate: user?.birth_date || 'DD/MM/YYYY',
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div
      className="d-flex flex-column px-4 py-4"
      style={{
        backgroundColor: '#181A1B',
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '100px',
      }}
    >
      {/* Titulo Centrado */}
      <h2
        className="text-center mb-4"
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
        }}
      >
        Mi cuenta
      </h2>

      {/* Contenido del Perfil */}
      <div className="d-flex flex-column align-items-center flex-grow-1">
        {/* Avatar con Iniciales */}
        <div
          className="d-flex align-items-center justify-content-center mb-3"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            backgroundColor: '#d1d5db',
            fontSize: '3.5rem',
            fontWeight: '600',
            color: '#1a1a1a',
            letterSpacing: '2px',
          }}
        >
          {userData.initials}
        </div>

        {/* Boton Editar Perfil */}
        <button
          onClick={handleEditProfile}
          className="btn d-flex align-items-center gap-2 mb-5"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ffc107',
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
          }}
        >
          <i className="pi pi-pencil" style={{ fontSize: '0.9rem' }}></i>
          <span>Editar Perfil</span>
        </button>

        {/* Lista de Informacion del Usuario */}
        <div className="w-100" style={{ maxWidth: '500px' }}>
          {/* Nombre Apellido */}
          <div className="d-flex align-items-center gap-3 mb-4" style={{ padding: '0.5rem 0' }}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
                flexShrink: 0,
              }}
            >
              <i className="pi pi-user" style={{ color: '#ffffff', fontSize: '1.1rem' }}></i>
            </div>
            <span style={{ color: '#ffffff', fontSize: '1rem' }}>{userData.fullName}</span>
          </div>

          {/* Usuario */}
          <div className="d-flex align-items-center gap-3 mb-4" style={{ padding: '0.5rem 0' }}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
                flexShrink: 0,
              }}
            >
              <i className="pi pi-id-card" style={{ color: '#ffffff', fontSize: '1.1rem' }}></i>
            </div>
            <span style={{ color: '#ffffff', fontSize: '1rem' }}>{userData.username}</span>
          </div>

          {/* Email */}
          <div className="d-flex align-items-center gap-3 mb-4" style={{ padding: '0.5rem 0' }}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
                flexShrink: 0,
              }}
            >
              <i className="pi pi-envelope" style={{ color: '#ffffff', fontSize: '1.1rem' }}></i>
            </div>
            <span style={{ color: '#ffffff', fontSize: '1rem' }}>{userData.email}</span>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="d-flex align-items-center gap-3 mb-4" style={{ padding: '0.5rem 0' }}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
                flexShrink: 0,
              }}
            >
              <i className="pi pi-calendar" style={{ color: '#ffffff', fontSize: '1.1rem' }}></i>
            </div>
            <span style={{ color: '#ffffff', fontSize: '1rem' }}>{userData.birthDate}</span>
          </div>
        </div>

        {/* Espaciador para empujar el boton hacia abajo */}
        <div className="flex-grow-0"></div>

        {/* Boton Cerrar Sesion */}
        <div className="w-100 pt-4" style={{ maxWidth: '500px' }}>
          <Button
            label="Cerrar sesion"
            onClick={handleLogout}
            className="w-100"
            style={{
              backgroundColor: '#ffc107',
              border: 'none',
              borderRadius: '25px',
              padding: '0.875rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#000000',
            }}
          />
        </div>
      </div>
    </div>
  );
}
