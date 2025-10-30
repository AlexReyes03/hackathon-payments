import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import Stellar from '../../assets/img/Stellar.png';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar px-3 py-3"
      style={{
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      <div className="container-fluid p-0">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Logo y Nombre */}
          <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')}>
            <img
              src={Stellar}
              alt="EzPay Logo"
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
              }}
            />
            <span
              style={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              EzPay
            </span>
          </div>

          {/* Icono de Notificaciones */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn p-0 position-relative"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#ffc107',
                fontSize: '1.5rem',
              }}
              onClick={() => navigate('/admin/notifications')}
            >
              <i className="pi pi-bell"></i>
              {/* Badge de notificaciones */}
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  backgroundColor: '#ef4444',
                  fontSize: '0.65rem',
                  padding: '0.25rem 0.4rem',
                }}
              >
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
