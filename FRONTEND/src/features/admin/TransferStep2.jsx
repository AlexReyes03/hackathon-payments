import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function TransferStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('0');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('cuenta');
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [ezpayUsername, setEzpayUsername] = useState('');

  const recipient = location.state?.recipient || {
    name: 'Receptor',
    account: 'Cuenta',
    initials: 'RE',
    color: '#a855f7',
    type: 'bank',
  };

  const balance = location.state?.balance || 0;
  const username = location.state?.username || 'Usuario';
  const publicKey = location.state?.publicKey;

  const isAccountTransfer = recipient.type === 'bank' && recipient.name === 'Cuenta o Tarjeta';
  const isEzPayUserTransfer = recipient.type === 'ezpay_user' && recipient.name === 'Usuario EzPay';

  const accountTypes = [
    { label: 'Cuenta', value: 'cuenta' },
    { label: 'Tarjeta', value: 'tarjeta' },
  ];

  useEffect(() => {
    if (recipient.type === 'ezpay_user' && recipient.username) {
      setEzpayUsername(recipient.username);
    } else if (!isAccountTransfer && !isEzPayUserTransfer && recipient.accountNumber) {
      setAccountNumber(recipient.accountNumber);
      setAccountType(recipient.accountType || 'cuenta');
      setBankName(recipient.bankName || '');
      setHolderName(recipient.name);
    }
  }, [recipient, isAccountTransfer, isEzPayUserTransfer]);

  const handleNumberClick = (num) => {
    if (amount === '0') {
      setAmount(num);
    } else if (amount.length < 10) {
      setAmount(amount + num);
    }
  };

  const handleDecimalClick = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handleDelete = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0 && numericAmount <= balance) {
      let finalRecipient = recipient;

      if (isAccountTransfer && accountNumber && holderName && bankName) {
        finalRecipient = {
          name: holderName,
          account: `${accountType === 'cuenta' ? 'Cuenta' : 'Tarjeta'} ${accountNumber}`,
          initials: holderName.substring(0, 2).toUpperCase(),
          color: '#00d084',
          accountNumber: accountNumber,
          accountType: accountType,
          bankName: bankName,
          type: 'bank',
        };
      } else if (isEzPayUserTransfer && ezpayUsername) {
        finalRecipient = {
          name: `@${ezpayUsername}`,
          account: 'Usuario EzPay',
          initials: ezpayUsername.substring(0, 2).toUpperCase(),
          color: '#ffc107',
          username: ezpayUsername,
          type: 'ezpay_user',
        };
      }

      navigate('/admin/transfer-step3', {
        state: {
          amount: numericAmount,
          recipient: finalRecipient,
          balance: balance,
          username: username,
          publicKey: publicKey,
        },
      });
    }
  };

  const numericAmount = parseFloat(amount) || 0;
  const isValidAmount = numericAmount > 0 && numericAmount <= balance;
  
  let isDataValid = true;
  if (isAccountTransfer) {
    isDataValid = accountNumber && holderName && bankName;
  } else if (isEzPayUserTransfer) {
    isDataValid = ezpayUsername;
  }
  
  const canContinue = isValidAmount && isDataValid;

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: '#181A1B',
        paddingBottom: '20px',
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
        Tu Billetera
      </h2>

      <div
        className="p-4 mb-4"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(96, 96, 96, 0.6) 0%, rgba(64, 64, 64, 0.4) 30%, rgba(42, 42, 42, 0.3) 60%, #1f1f1f 100%)',
          backgroundColor: '#3a3a3a',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span style={{ color: '#d1d5db', fontSize: '0.95rem', fontWeight: '500' }}>Balance</span>
          <span style={{ color: '#d1d5db', fontSize: '0.95rem', fontWeight: '500' }}>{username}</span>
        </div>
        <div
          style={{
            color: '#ffc107',
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          $ {balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ color: '#d1d5db', fontSize: '0.9rem' }}>Valor total estimado (MXN)</div>
      </div>

      <div className="mb-4">
        <h3
          className="mb-3"
          style={{
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Ingresa el monto
        </h3>

        {isEzPayUserTransfer ? (
          <div className="mb-4">
            <div className="mb-3">
              <label
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Nombre de usuario
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    borderRadius: '12px 0 0 12px',
                    color: '#ffffff',
                  }}
                >
                  @
                </span>
                <InputText
                  value={ezpayUsername}
                  onChange={(e) => setEzpayUsername(e.target.value)}
                  placeholder="usuario123"
                  className="flex-grow-1"
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    borderLeft: 'none',
                    borderRadius: '0 12px 12px 0',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                  }}
                />
              </div>
            </div>
          </div>
        ) : isAccountTransfer ? (
          <div className="mb-4">
            <div className="mb-3">
              <label
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Tipo
              </label>
              <Dropdown
                value={accountType}
                onChange={(e) => setAccountType(e.value)}
                options={accountTypes}
                className="w-100"
                panelStyle={{
                  backgroundColor: '#2a2a2a',
                  color: '#ffffff',
                }}
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                }}
              />
            </div>

            <div className="mb-3">
              <label
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Nombre del titular
              </label>
              <InputText
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="Ej: Juan Perez"
                className="w-100"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div className="mb-3">
              <label
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Numero de {accountType === 'cuenta' ? 'cuenta' : 'tarjeta'}
              </label>
              <InputText
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={accountType === 'cuenta' ? 'Ej: 1234567890' : 'Ej: 1234 5678 9012 3456'}
                className="w-100"
                maxLength={accountType === 'cuenta' ? 18 : 19}
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div className="mb-3">
              <label
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Banco
              </label>
              <InputText
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Ej: BBVA, Santander, etc."
                className="w-100"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </div>
        ) : (
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
            </div>
          </div>
        )}
      </div>

      <div className="text-center mb-4">
        <div
          style={{
            color: numericAmount > balance ? '#ef4444' : '#ffffff',
            fontSize: '3.5rem',
            fontWeight: '300',
            letterSpacing: '1px',
            transition: 'color 0.3s',
          }}
        >
          ${amount}
        </div>
        {numericAmount > balance && <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>Monto superior al balance disponible</div>}
      </div>

      <div className="mb-4">
        <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="btn"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '500',
                padding: '1.25rem',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3a3a3a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
              }}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleDecimalClick}
            className="btn"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '500',
              padding: '1.25rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3a3a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
          >
            .
          </button>

          <button
            onClick={() => handleNumberClick('0')}
            className="btn"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '500',
              padding: '1.25rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3a3a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="btn d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1.2rem',
              padding: '1.25rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3a3a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
          >
            <i className="pi pi-arrow-left"></i>
          </button>
        </div>
      </div>

      <div className="w-100 mt-4">
        <Button
          label="Continuar"
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-100"
          style={{
            backgroundColor: canContinue ? '#ffc107' : '#6b7280',
            border: 'none',
            borderRadius: '25px',
            padding: '0.875rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#000000',
            cursor: canContinue ? 'pointer' : 'not-allowed',
          }}
        />
      </div>
    </div>
  );
}