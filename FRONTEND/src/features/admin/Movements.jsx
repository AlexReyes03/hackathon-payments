import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function TransactionHistory() {
    const [searchQuery, setSearchQuery] = useState('');

    // Datos de ejemplo - reemplazar con datos reales de tu API
    const transactions = [
        {
            date: '25 de octubre',
            dailyBalance: '$100,000',
            items: [
                {
                    id: 1,
                    type: 'Transferencia Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: -100.00,
                    icon: 'download'
                },
                {
                    id: 2,
                    type: 'Transferencia Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: -100.00,
                    icon: 'download'
                },
                {
                    id: 3,
                    type: 'Transferencia Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: 100.00,
                    icon: 'upload'
                },
                {
                    id: 4,
                    type: 'Transferencia Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: -100.00,
                    icon: 'download'
                }
            ]
        },
        {
            date: '25 de octubre',
            dailyBalance: '$150,000',
            items: [
                {
                    id: 5,
                    type: 'Conversión Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: 100.00,
                    icon: 'refresh'
                },
                {
                    id: 6,
                    type: 'Transferencia Crypto',
                    description: 'Restaurante Cuernavaca',
                    amount: -100.00,
                    icon: 'download'
                }
            ]
        }
    ];

    const getIconComponent = (iconType) => {
        const iconStyles = {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 110, 100, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0d6e64'
        };

        return (
            <div style={iconStyles}>
                <i className={`pi pi-${iconType}`} style={{ fontSize: '1.25rem' }}></i>
            </div>
        );
    };

    return (
        <div className="container-fluid px-3 py-4" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
            <div className="row mb-4">
                <div className="col-12">
                    {/* Search Bar y Filtro */}
                    <div className="d-flex gap-3 mb-4">
                        <div className="flex-grow-1 position-relative">
                            <i className="pi pi-search position-absolute" 
                               style={{ 
                                   left: '1rem', 
                                   top: '50%', 
                                   transform: 'translateY(-50%)',
                                   color: '#888888'
                               }}>
                            </i>
                            <InputText
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar"
                                className="w-100"
                                style={{
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #3a3a3a',
                                    borderRadius: '25px',
                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                    color: '#ffffff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <Button
                            icon="pi pi-filter"
                            className="p-button-outlined"
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                borderRadius: '25px',
                                color: '#ffffff',
                                minWidth: '120px'
                            }}
                            label="Filtrar"
                        />
                    </div>

                    {/* Título */}
                    <h2 className="mb-4" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '600' }}>
                        Historial
                    </h2>

                    {/* Lista de Transacciones por Día */}
                    <div className="d-flex flex-column gap-3">
                        {transactions.map((day, dayIndex) => (
                            <div key={dayIndex}>
                                {/* Header del Día */}
                                <div 
                                    className="d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                                    style={{
                                        backgroundColor: '#3a3a3a',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <span style={{ color: '#cccccc', fontSize: '0.95rem' }}>
                                        {day.date}
                                    </span>
                                    <span style={{ color: '#cccccc', fontSize: '0.95rem' }}>
                                        Saldo del día {day.dailyBalance}
                                    </span>
                                </div>

                                {/* Transacciones del Día */}
                                <div className="d-flex flex-column gap-2">
                                    {day.items.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="d-flex align-items-center gap-3 p-3"
                                            style={{
                                                backgroundColor: '#2a2a2a',
                                                borderRadius: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {/* Icono */}
                                            {getIconComponent(transaction.icon)}

                                            {/* Información de la transacción */}
                                            <div className="flex-grow-1">
                                                <div style={{ 
                                                    color: '#ffffff', 
                                                    fontSize: '1rem', 
                                                    fontWeight: '600',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {transaction.type}
                                                </div>
                                                <div style={{ 
                                                    color: '#cccccc', 
                                                    fontSize: '0.9rem' 
                                                }}>
                                                    {transaction.description}
                                                </div>
                                            </div>

                                            {/* Monto */}
                                            <div style={{
                                                color: transaction.amount > 0 ? '#10b981' : '#ef4444',
                                                fontSize: '1.1rem',
                                                fontWeight: '600'
                                            }}>
                                                {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}