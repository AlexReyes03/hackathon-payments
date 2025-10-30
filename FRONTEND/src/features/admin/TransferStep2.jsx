import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function TransferAmount() {
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState('0.00');

    // Datos del usuario y receptor
    const userData = {
        name: 'Nombre del Usuario',
        balance: 34378.00,
        currency: 'MXN'
    };

    const recipientData = {
        name: 'Nombre receptor',
        account: 'Cuenta **** 1234',
        initials: 'nu',
        color: '#a855f7'
    };

    const handleNumberClick = (num) => {
        if (amount === '0.00') {
            setAmount(num === '.' ? '0.' : num);
        } else {
            setAmount(amount + num);
        }
    };

    const handleDelete = () => {
        if (amount.length > 1) {
            setAmount(amount.slice(0, -1));
        } else {
            setAmount('0.00');
        }
    };

    const handleContinue = () => {
        const numericAmount = parseFloat(amount);
        if (numericAmount > 0 && numericAmount <= userData.balance) {
            navigate('/transfer-review', {
                state: {
                    amount: numericAmount,
                    recipient: recipientData
                }
            });
        }
    };

    return (
        <div 
            className="container-fluid d-flex flex-column px-4 py-4"
            style={{ 
                backgroundColor: '#1a1a1a', 
                minHeight: 'calc(100vh - 120px)'
            }}
        >
            {/* Título */}
            <h2 
                className="mb-4"
                style={{ 
                    color: '#ffffff', 
                    fontSize: '1.25rem',
                    fontWeight: '600'
                }}
            >
                Tu Billetera
            </h2>

            {/* Card de Balance con Degradado Radial */}
            <div 
                className="p-4 mb-4"
                style={{
                    background: 'radial-gradient(ellipse at top right, rgba(96, 96, 96, 0.6) 0%, rgba(64, 64, 64, 0.4) 30%, rgba(42, 42, 42, 0.3) 60%, #1f1f1f 100%)',
                    backgroundColor: '#3a3a3a',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span style={{ color: '#d1d5db', fontSize: '0.95rem', fontWeight: '500' }}>
                        Balance
                    </span>
                    <span style={{ color: '#d1d5db', fontSize: '0.95rem', fontWeight: '500' }}>
                        {userData.name}
                    </span>
                </div>
                <div style={{ 
                    color: '#ffc107', 
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>
                    $ {userData.balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                    Valor total estimado ({userData.currency})
                </div>
            </div>

            {/* Sección Ingresa el monto */}
            <div className="mb-4">
                <h3 
                    className="mb-3"
                    style={{ 
                        color: '#ffffff', 
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    Ingresa el monto
                </h3>

                {/* Información del Receptor */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            backgroundColor: recipientData.color,
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            flexShrink: 0
                        }}
                    >
                        {recipientData.initials}
                    </div>
                    <div>
                        <div style={{ 
                            color: '#ffffff', 
                            fontSize: '1rem', 
                            fontWeight: '600',
                            marginBottom: '0.25rem'
                        }}>
                            {recipientData.name}
                        </div>
                        <div style={{ 
                            color: '#9ca3af', 
                            fontSize: '0.9rem' 
                        }}>
                            {recipientData.account}
                        </div>
                    </div>
                </div>
            </div>

            {/* Monto Grande */}
            <div className="text-center mb-4">
                <div 
                    style={{ 
                        color: '#ffffff', 
                        fontSize: '3.5rem',
                        fontWeight: '300',
                        letterSpacing: '1px'
                    }}
                >
                    ${amount}
                </div>
            </div>

            {/* Botón Continuar */}
            <div className="w-100 mt-4">
                <Button
                    label="Continuar"
                    onClick={handleContinue}
                    disabled={parseFloat(amount) <= 0}
                    className="w-100"
                    style={{
                        backgroundColor: '#ffc107',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.875rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#000000',
                        opacity: parseFloat(amount) <= 0 ? 0.5 : 1
                    }}
                />
            </div>
        </div>
    );
}