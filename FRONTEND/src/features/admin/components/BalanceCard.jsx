import React from 'react';
import { Button } from 'primereact/button';

export default function BalanceCard({ balance, percentage, username, onBuyClick }) {
    // Ajustar tamaño de fuente basado en la longitud del balance
    const balanceString = balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // Incluir el símbolo $ y el espacio en el cálculo
    const totalLength = balanceString.length + 2; // +2 por "$ "
    const fontSize = totalLength >= 14 ? '1.5rem' : totalLength >= 11 ? '1.8rem' : '2.5rem';

    return (
        <div
            className="p-4 rounded-4 position-relative overflow-hidden card-slide-up"
            style={{
                background: 'radial-gradient(circle at 30% 0%, #464C50 0%, #25282A 50%, #25282A 75%, #181A1B 100%)',
                border: '1px solid #3a3d40',
                animation: 'slideUpFade 0.6s ease-out forwards',
                animationDelay: '0.1s',
                opacity: 0,
                transform: 'translateY(30px)',
            }}
        >
            {/* Header: Balance, Porcentaje y Username en una sola línea */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-white-50" style={{ fontSize: '0.9rem' }}>
                    Balance
                </span>
                <span
                    className="d-flex align-items-center gap-1"
                    style={{
                        fontSize: '0.85rem',
                        color: '#00d084',
                    }}
                >
                    <i className="pi pi-arrow-up" style={{ fontSize: '0.7rem' }}></i>
                    {percentage}%
                </span>
                <span
                    className="text-white-50"
                    style={{ fontSize: '0.85rem' }}
                >
                    {username}
                </span>
            </div>

            {/* Balance Amount: Ocupa TODO el ancho de la card */}
            <div className="mb-4">
                <span
                    className="fw-bold d-block"
                    style={{
                        fontSize: fontSize,
                        color: '#FAB800',
                        lineHeight: '1.1',
                    }}
                >
                    $ {balanceString}
                </span>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
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
                    className="fw-semibold d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#FAB800',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.55rem 1.2rem',
                        fontSize: '0.85rem',
                        color: '#000000',
                        minWidth: 'fit-content',
                    }}
                />
            </div>
        </div>
    );
}