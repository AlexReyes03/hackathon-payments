import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function TransferReview() {
    const navigate = useNavigate();
    const [concept, setConcept] = useState('');
    const [reference, setReference] = useState('');

    // Datos de ejemplo - estos vendrían de la pantalla anterior
    const transferData = {
        recipientName: 'Nombre receptor',
        recipientAccount: 'Cuenta **** 1234',
        recipientInitials: 'nu',
        recipientColor: '#a855f7',
        amount: 0.00
    };

    const handleModify = () => {
        navigate(-1);
    };

    const handleTransfer = () => {
        console.log({
            ...transferData,
            concept,
            reference
        });
        navigate('/transfer-success');
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
                Revisa los datos
            </h2>

            {/* Información del Receptor */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div 
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: transferData.recipientColor,
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        flexShrink: 0
                    }}
                >
                    {transferData.recipientInitials}
                </div>
                <div>
                    <div style={{ 
                        color: '#ffffff', 
                        fontSize: '1rem', 
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                    }}>
                        {transferData.recipientName}
                    </div>
                    <div style={{ 
                        color: '#9ca3af', 
                        fontSize: '0.9rem' 
                    }}>
                        {transferData.recipientAccount}
                    </div>
                </div>
            </div>

            {/* Monto */}
            <div className="mb-4">
                <label 
                    style={{ 
                        color: '#ffffff', 
                        fontSize: '0.95rem',
                        display: 'block',
                        marginBottom: '0.75rem'
                    }}
                >
                    Monto
                </label>
                <div className="d-flex align-items-center justify-content-between">
                    <span 
                        style={{ 
                            color: '#ffc107', 
                            fontSize: '2rem',
                            fontWeight: '600'
                        }}
                    >
                        ${transferData.amount.toFixed(2)}
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
                            padding: '0.5rem 1rem'
                        }}
                    >
                        Modificar
                    </button>
                </div>
            </div>

            {/* Concepto (opcional) */}
            <div className="mb-4">
                <label 
                    htmlFor="concept"
                    style={{ 
                        color: '#ffffff', 
                        fontSize: '0.95rem',
                        display: 'block',
                        marginBottom: '0.75rem'
                    }}
                >
                    Concepto (opcional)
                </label>
                <InputText
                    id="concept"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="w-100"
                    style={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #3a3a3a',
                        borderRadius: '12px',
                        padding: '0.875rem 1rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* Número de referencia (opcional) */}
            <div className="mb-4">
                <label 
                    htmlFor="reference"
                    style={{ 
                        color: '#ffffff', 
                        fontSize: '0.95rem',
                        display: 'block',
                        marginBottom: '0.75rem'
                    }}
                >
                    Número de referencia (opcional)
                </label>
                <InputText
                    id="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-100"
                    style={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #3a3a3a',
                        borderRadius: '12px',
                        padding: '0.875rem 1rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* Espaciador */}
            <div className="flex-grow-1"></div>

            {/* Botón Transferir */}
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
                        color: '#000000'
                    }}
                />
            </div>
        </div>
    );
}