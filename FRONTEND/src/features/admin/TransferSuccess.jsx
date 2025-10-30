import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function TransferSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos de la transferencia
  const transferData = location.state || {
    amount: 0,
    recipient: {
      name: 'Receptor',
      account: 'Cuenta',
      initials: 'RE',
      color: '#a855f7',
    },
    concept: '',
    reference: '',
    date: new Date().toISOString(),
    username: 'Usuario',
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleDone = () => {
    navigate('/admin/transfer');
  };

  const handleShare = () => {
    console.log('Compartir comprobante');
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
      {/* Icono de Exito */}
      <div className="text-center mb-4">
        <div
          className="d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
          }}
        >
          <i
            className="pi pi-check"
            style={{
              fontSize: '2.5rem',
              color: '#10b981',
            }}
          ></i>
        </div>
        <h2
          style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
          }}
        >
          Transferencia exitosa
        </h2>
        <p
          style={{
            color: '#9ca3af',
            fontSize: '1rem',
          }}
        >
          Tu transferencia se ha realizado correctamente
        </p>
      </div>

      {/* Ticket de Pago */}
      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: '#2a2a2a',
          borderRadius: '20px',
          border: '1px solid #3a3a3a',
        }}
      >
        {/* Monto */}
        <div className="text-center mb-4 pb-4" style={{ borderBottom: '1px solid #3a3a3a' }}>
          <div
            style={{
              color: '#ffc107',
              fontSize: '3rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            }}
          >
            ${transferData.amount.toFixed(2)}
          </div>
          <div
            style={{
              color: '#9ca3af',
              fontSize: '0.9rem',
            }}
          >
            MXN
          </div>
        </div>

        {/* Receptor */}
        <div className="mb-4">
          <div
            style={{
              color: '#9ca3af',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            Enviado a
          </div>
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: transferData.recipient.color,
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              {transferData.recipient.initials}
            </div>
            <div>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                }}
              >
                {transferData.recipient.name}
              </div>
              <div
                style={{
                  color: '#9ca3af',
                  fontSize: '0.85rem',
                }}
              >
                {transferData.recipient.account}
              </div>
              {transferData.recipient.bankName && (
                <div
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem',
                  }}
                >
                  {transferData.recipient.bankName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detalles de la Transaccion */}
        <div className="pt-3" style={{ borderTop: '1px solid #3a3a3a' }}>
          {/* Fecha y Hora */}
          <div className="d-flex justify-content-between mb-3">
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Fecha</span>
            <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>{formatDate(transferData.date)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Hora</span>
            <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>{formatTime(transferData.date)}</span>
          </div>

          {/* ID de Transaccion */}
          <div className="d-flex justify-content-between mb-3">
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>ID de transaccion</span>
            <span
              style={{
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '500',
                fontFamily: 'monospace',
              }}
            >
              {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </span>
          </div>

          {/* Concepto (si existe) */}
          {transferData.concept && (
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Concepto</span>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>{transferData.concept}</span>
            </div>
          )}

          {/* Referencia (si existe) */}
          {transferData.reference && (
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Referencia</span>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>{transferData.reference}</span>
            </div>
          )}

          {/* Remitente */}
          <div className="d-flex justify-content-between">
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Remitente</span>
            <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>{transferData.username}</span>
          </div>
        </div>
      </div>

      {/* Botones de Accion */}
      <div className="d-flex flex-column gap-3">
        {/* Boton Compartir Comprobante */}
        <Button
          label="Compartir comprobante"
          icon="pi pi-share-alt"
          onClick={handleShare}
          className="w-100"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #ffc107',
            borderRadius: '25px',
            padding: '0.875rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffc107',
          }}
        />

        {/* Boton Listo */}
        <Button
          label="Listo"
          onClick={handleDone}
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
  );
}
