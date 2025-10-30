import React from 'react';
import { Button } from 'primereact/button';

export default function BalanceCard({ balance, percentage, username, onBuyClick }) {
    return (
        <div
            className="p-4 rounded-4 position-relative overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 30% 0%, #464C50 0%, #25282A 50%, #25282A 75%, #181A1B 100%)',
                border: '1px solid #3a3d40',
            }}
        >
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <div className="text-white-50 mb-2" style={{ fontSize: '0.9rem' }}>
                        Balance
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span
                            className="fw-bold"
                            style={{
                                fontSize: '2.5rem',
                                color: '#FAB800',
                                lineHeight: '1',
                            }}
                        >
                            $ {balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span
                            className="d-flex align-items-center gap-1"
                            style={{
                                fontSize: '0.9rem',
                                color: '#00d084',
                            }}
                        >
                            <i className="pi pi-arrow-up" style={{ fontSize: '0.7rem' }}></i>
                            {percentage}%
                        </span>
                    </div>
                </div>

                <div className="text-end">
                    <div
                        className="text-white-50 mb-2"
                        style={{ fontSize: '0.85rem' }}
                    >
                        {username}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <span
                    className="text-white-50"
                    style={{ fontSize: '0.85rem' }}
                >
                    Valor total estimado (MXN)
                </span>

                <Button
                    label="Comprar"
                    icon="pi pi-plus"
                    onClick={onBuyClick}
                    className="fw-semibold"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.65rem 1.5rem',
                        fontSize: '0.95rem',
                        color: '#000000',
                    }}
                />
            </div>
        </div>
    );
}