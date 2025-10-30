import React from 'react';
import { Button } from 'primereact/button';

export default function AssetCard({
    icon,
    name,
    percentage,
    amount,
    amountLabel,
    estimatedValue,
    pricePerUnit,
    onConvertClick,
    onDetailsClick
}) {
    const isPositive = percentage >= 0;

    return (
        <div
            className="p-4 rounded-4 position-relative overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 30% 0%, #703FB5 0%, #42256A 50%, #42256A 75%, #2A1845 100%)',
                border: '1px solid #8b5cb8',
            }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                        style={{ width: '48px', height: '48px' }}
                    >
                        {icon}
                    </div>
                    <span
                        className="fw-semibold"
                        style={{ fontSize: '1.5rem', color: '#ffffff' }}
                    >
                        {name}
                    </span>
                </div>

                <span
                    className="d-flex align-items-center gap-1 fw-semibold"
                    style={{
                        fontSize: '0.95rem',
                        color: isPositive ? '#00d084' : '#ff4757',
                    }}
                >
                    <i className={`pi pi-arrow-${isPositive ? 'up' : 'down'}`} style={{ fontSize: '0.75rem' }}></i>
                    {isPositive ? '+' : ''}{percentage}%
                </span>
            </div>

            {/* Details Grid */}
            <div className="mb-4">
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-white" style={{ fontSize: '0.95rem' }}>
                        {amountLabel}
                    </span>
                    <span className="text-white fw-semibold" style={{ fontSize: '0.95rem' }}>
                        {amount}
                    </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <span className="text-white" style={{ fontSize: '0.95rem' }}>
                        Valor estimado (MXN)
                    </span>
                    <span className="text-white fw-semibold" style={{ fontSize: '0.95rem' }}>
                        $ {estimatedValue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="d-flex justify-content-between">
                    <span className="text-white" style={{ fontSize: '0.95rem' }}>
                        Precio actual por 1 {name}
                    </span>
                    <span
                        className="fw-semibold"
                        style={{ fontSize: '0.95rem', color: '#FAB800' }}
                    >
                        $ {pricePerUnit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3">
                <Button
                    label="Convertir a"
                    icon="pi pi-refresh"
                    onClick={onConvertClick}
                    className="flex-fill fw-semibold"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.65rem 1rem',
                        fontSize: '0.9rem',
                        color: '#000000',
                    }}
                />

                <Button
                    label="Ver detalles"
                    icon="pi pi-ellipsis-h"
                    onClick={onDetailsClick}
                    className="flex-fill fw-semibold"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.65rem 1rem',
                        fontSize: '0.9rem',
                        color: '#000000',
                    }}
                />
            </div>
        </div>
    );
}