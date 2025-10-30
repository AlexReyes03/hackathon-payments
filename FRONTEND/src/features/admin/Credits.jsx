import React, { useState } from 'react';
import { Button } from 'primereact/button';

export default function Credits() {
  const [selectedCredit, setSelectedCredit] = useState(null);

  // Datos simulados
  const creditScore = 'AA';
  const availableCredits = 1;
  const creditLimit = 50000.0;
  const usedCredit = 0.0;
  const availableBalance = creditLimit - usedCredit;

  const creditOptions = [
    {
      id: 1,
      name: 'Crédito Bitcoin',
      crypto: 'BTC',
      amount: 0.5,
      equivalentMXN: 25000.0,
      interestRate: 5.5,
      term: '30 días',
      color: '#F7931A',
    },
    {
      id: 2,
      name: 'Crédito Ethereum',
      crypto: 'ETH',
      amount: 8.0,
      equivalentMXN: 35000.0,
      interestRate: 6.0,
      term: '30 días',
      color: '#627EEA',
    },
    {
      id: 3,
      name: 'Crédito USDT',
      crypto: 'USDT',
      amount: 1500.0,
      equivalentMXN: 30000.0,
      interestRate: 4.5,
      term: '30 días',
      color: '#26A17B',
    },
  ];

  const handleRequestCredit = (credit) => {
    console.log('Solicitar crédito:', credit);
  };

  const getScoreColor = (score) => {
    if (score === 'AA' || score === 'A') return '#10b981';
    if (score === 'B' || score === 'BB') return '#ffc107';
    return '#ef4444';
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: '#181A1B',
        paddingBottom: '20px',
      }}
    >
      {/* Titulo */}
      <h2
        className="mb-4"
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
        }}
      >
        Créditos Crypto
      </h2>

      {/* Card de Reputaci�n */}
      <div
        className="p-4 mb-4"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.15) 40%, #1f1f1f 100%)',
          backgroundColor: '#1f1f1f',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Tu Calificación Crediticia</div>
            <div
              style={{
                color: getScoreColor(creditScore),
                fontSize: '3rem',
                fontWeight: '700',
                lineHeight: '1',
                letterSpacing: '2px',
              }}
            >
              {creditScore}
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '3px solid rgba(16, 185, 129, 0.4)',
            }}
          >
            <i className="pi pi-star-fill" style={{ color: '#10b981', fontSize: '2rem' }}></i>
          </div>
        </div>
        <div
          style={{
            color: '#d1d5db',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}
        >
          Excelente historial de pagos y uso responsable de inversiones
        </div>
      </div>

      {/* Card de Créditos Disponibles */}
      <div
        className="p-4 mb-4"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255, 193, 7, 0.25) 0%, rgba(255, 193, 7, 0.1) 40%, #1f1f1f 100%)',
          backgroundColor: '#1f1f1f',
          borderRadius: '20px',
          border: '1px solid rgba(255, 193, 7, 0.2)',
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Créditos Disponibles</div>
            <div
              style={{
                color: '#ffc107',
                fontSize: '2.5rem',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              {availableCredits}
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 193, 7, 0.15)',
            }}
          >
            <i className="pi pi-check-circle" style={{ color: '#ffc107', fontSize: '1.8rem' }}></i>
          </div>
        </div>
        <div className="d-flex justify-content-between" style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>Límite Total</div>
            <div style={{ fontWeight: '600' }}>${creditLimit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>Disponible</div>
            <div style={{ fontWeight: '600', color: '#10b981' }}>${availableBalance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="mb-4">
        <h3
          className="mb-3"
          style={{
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          ¿Por qué tienes crédito disponible?
        </h3>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                minWidth: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
              }}
            >
              <i className="pi pi-check" style={{ color: '#10b981', fontSize: '1.1rem' }}></i>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem' }}>Uso Responsable</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.4' }}>Has demostrado un manejo responsable de tus inversiones y transacciones</div>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                minWidth: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
              }}
            >
              <i className="pi pi-wallet" style={{ color: '#10b981', fontSize: '1.1rem' }}></i>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem' }}>Solvencia Verificada</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.4' }}>Mantienes fondos suficientes para respaldar tus operaciones</div>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                minWidth: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
              }}
            >
              <i className="pi pi-chart-line" style={{ color: '#10b981', fontSize: '1.1rem' }}></i>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem' }}>Historial Positivo</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.4' }}>Tu actividad constante y positiva en la plataforma te respalda</div>
            </div>
          </div>
        </div>
      </div>

      {/* Opciones de crédito */}
      <div className="mb-4">
        <h3
          className="mb-3"
          style={{
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Créditos Disponibles
        </h3>
        <div className="d-flex flex-column gap-3">
          {creditOptions.map((credit) => (
            <div
              key={credit.id}
              className="p-3"
              style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '16px',
                border: selectedCredit?.id === credit.id ? `2px solid ${credit.color}` : '1px solid #3a3a3a',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedCredit(credit)}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: `${credit.color}20`,
                      border: `2px solid ${credit.color}`,
                    }}
                  >
                    <span style={{ color: credit.color, fontWeight: '700', fontSize: '0.9rem' }}>{credit.crypto}</span>
                  </div>
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{credit.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                      {credit.amount} {credit.crypto}
                    </div>
                  </div>
                </div>
                {selectedCredit?.id === credit.id && <i className="pi pi-check-circle" style={{ color: credit.color, fontSize: '1.5rem' }}></i>}
              </div>

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af' }}>Equivalente MXN</span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>${credit.equivalentMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af' }}>Tasa de interés</span>
                <span style={{ color: '#ffc107', fontWeight: '600' }}>{credit.interestRate}%</span>
              </div>

              <div className="d-flex justify-content-between" style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af' }}>Plazo</span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>{credit.term}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bot�n Solicitar crédito */}
      <div className="w-100 mt-4">
        <Button
          label={selectedCredit ? `Solicitar ${selectedCredit.crypto}` : 'Selecciona un crédito'}
          onClick={() => selectedCredit && handleRequestCredit(selectedCredit)}
          disabled={!selectedCredit}
          className="w-100"
          style={{
            backgroundColor: selectedCredit ? '#ffc107' : '#6b7280',
            border: 'none',
            borderRadius: '25px',
            padding: '0.875rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#000000',
            cursor: selectedCredit ? 'pointer' : 'not-allowed',
          }}
        />
      </div>

      {/* Informaci�n Adicional */}
      <div
        className="mt-4 p-3"
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <div className="d-flex gap-2 align-items-start">
          <i className="pi pi-info-circle" style={{ color: '#3b82f6', fontSize: '1.1rem', marginTop: '2px' }}></i>
          <div style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5' }}>Los Créditos se otorgan basados en tu comportamiento en la plataforma. Mantén un buen historial de pagos y uso responsable para acceder a mejores condiciones.</div>
        </div>
      </div>
    </div>
  );
}
