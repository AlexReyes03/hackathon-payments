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
            className="p-4 rounded-4 position-relative overflow-hidden card-slide-up"
            style={{
                background: 'radial-gradient(circle at 30% 0%, #703FB5 0%, #42256A 50%, #42256A 75%, #2A1845 100%)',
                border: '1px solid #8b5cb8',
                animation: 'slideUpFade 0.6s ease-out forwards',
                animationDelay: '0.3s',
                opacity: 0,
                transform: 'translateY(30px)',
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
                <div className="row g-2 mb-2">
                    <div className="col-7">
                        <span className="text-white d-block" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                            {amountLabel}
                        </span>
                    </div>
                    <div className="col-5 text-end">
                        <span className="text-white fw-semibold d-block" style={{ fontSize: '0.75rem', lineHeight: '1.3', wordBreak: 'break-all' }}>
                            {amount}
                        </span>
                    </div>
                </div>

                <div className="row g-2 mb-2">
                    <div className="col-7">
                        <span className="text-white d-block" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                            Valor estimado (MXN)
                        </span>
                    </div>
                    <div className="col-5 text-end">
                        <span className="text-white fw-semibold d-block" style={{ fontSize: '0.75rem', lineHeight: '1.3', wordBreak: 'break-all' }}>
                            $ {estimatedValue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-7">
                        <span className="text-white d-block" style={{ fontSize: '0.7rem', lineHeight: '1.3' }}>
                            Precio actual por 1 {name}
                        </span>
                    </div>
                    <div className="col-5 text-end">
                        <span
                            className="fw-semibold d-block"
                            style={{ fontSize: '0.75rem', color: '#FAB800', lineHeight: '1.3', wordBreak: 'break-all' }}
                        >
                            $ {pricePerUnit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 flex-wrap">
                <Button
                    label="Convertir"
                    icon="pi pi-refresh"
                    onClick={onConvertClick}
                    className="flex-fill fw-semibold d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.55rem 0.8rem',
                        fontSize: '0.8rem',
                        color: '#000000',
                        minWidth: '110px',
                    }}
                />

                <Button
                    label="Detalles"
                    icon="pi pi-ellipsis-h"
                    onClick={onDetailsClick}
                    className="flex-fill fw-semibold d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.55rem 0.8rem',
                        fontSize: '0.8rem',
                        color: '#000000',
                        minWidth: '110px',
                    }}
                />
            </div>
        </div>
    );
}