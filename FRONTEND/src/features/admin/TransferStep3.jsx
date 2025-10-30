import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function TransferStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const [concept, setConcept] = useState('');
  const [reference, setReference] = useState('');

  const amount = location.state?.amount || 0;
  const recipient = location.state?.recipient || {
    name: 'Receptor',
    account: 'Cuenta',
    initials: 'RE',
    color: '#a855f7',
  };
  const balance = location.state?.balance || 0;
  const username = location.state?.username || 'Usuario';
  const publicKey = location.state?.publicKey;

  const handleModify = () => {
    navigate('/admin/transfer-step2', {
      state: {
        recipient: recipient,
        balance: balance,
        username: username,
        publicKey: publicKey,
      },
    });
  };

  const handleTransfer = () => {
    const transferData = {
      amount: amount,
      recipient: recipient,
      concept: concept,
      reference: reference,
      date: new Date().toISOString(),
      username: username,
      publicKey: publicKey,
    };

    navigate('/admin/transfer-success', {
      state: transferData,
    });
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
      <h2
        className="mb-4"
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
        }}
      >
        Revisa los datos
      </h2>

      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: recipient.color,
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          {recipient.initials}
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
            {recipient.name}
          </div>
          <div
            style={{
              color: '#9ca3af',
              fontSize: '0.9rem',
            }}
          >
            {recipient.account}
          </div>
          {recipient.bankName && (
            <div
              style={{
                color: '#9ca3af',
                fontSize: '0.85rem',
                marginTop: '0.25rem',
              }}
            >
              {recipient.bankName}
            </div>
          )}
        </div>
      </div>

      {/* Conversion Preview */}
      <div
        className="p-3 mb-4"
        style={{
          backgroundColor: '#2a2a2a',
          borderRadius: '12px',
          border: '1px solid #3a3a3a',
        }}
      >
        <div className="text-white-50 mb-2" style={{ fontSize: '0.85rem' }}>
          Proceso de conversión
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>Cripto</span>
            <i className="pi pi-arrow-right" style={{ color: '#9ca3af', fontSize: '0.7rem' }}></i>
            <span style={{ color: '#00d084', fontSize: '0.9rem' }}>USDC</span>
            <i className="pi pi-arrow-right" style={{ color: '#9ca3af', fontSize: '0.7rem' }}></i>
            <span style={{ color: '#ffc107', fontSize: '0.9rem' }}>MXN ${amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          style={{
            color: '#ffffff',
            fontSize: '0.95rem',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          Monto
        </label>
        <div className="d-flex align-items-center justify-content-between">
          <span
            style={{
              color: '#ffc107',
              fontSize: '2rem',
              fontWeight: '600',
            }}
          >
            ${amount.toFixed(2)}
          </span>
          <button
            onClick={handleModify}
            className="btn"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffc107',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
            }}
          >
            Modificar
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="concept"
          style={{
            color: '#ffffff',
            fontSize: '0.95rem',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          Concepto (opcional)
        </label>
        <InputText
          id="concept"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Ej: Pago de servicios"
          className="w-100"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '12px',
            padding: '0.875rem 1rem',
            color: '#ffffff',
            fontSize: '1rem',
          }}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="reference"
          style={{
            color: '#ffffff',
            fontSize: '0.95rem',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          Numero de referencia (opcional)
        </label>
        <InputText
          id="reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Ej: 123456"
          className="w-100"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '12px',
            padding: '0.875rem 1rem',
            color: '#ffffff',
            fontSize: '1rem',
          }}
        />
      </div>

      <div className="flex-grow-1"></div>

      <div className="w-100 mt-auto pt-4">
        <Button
          label="Transferir"
          onClick={handleTransfer}
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
