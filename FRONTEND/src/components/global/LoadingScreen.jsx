import React from 'react';
import stellarLogo from '../../assets/img/Stellar.png';

export default function LoadingScreen() {
    return (
        <div
            className="loading-screen"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                animation: 'fadeIn 0.3s ease-in-out',
            }}
        >
            {/* Logo de Stellar con animación */}
            <div
                className="loading-logo-container"
                style={{
                    animation: 'pulseScale 2s ease-in-out infinite',
                }}
            >
                <img
                    src={stellarLogo}
                    alt="Stellar"
                    style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 20px rgba(250, 184, 0, 0.5))',
                    }}
                />
            </div>

            {/* Texto de carga */}
            <div
                style={{
                    marginTop: '2rem',
                    fontSize: '1.1rem',
                    color: '#FAB800',
                    fontWeight: '500',
                    animation: 'fadeInOut 2s ease-in-out infinite',
                }}
            >
                Cargando...
            </div>

            {/* Spinner circular moderno */}
            <div
                className="loading-spinner"
                style={{
                    marginTop: '1.5rem',
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(250, 184, 0, 0.2)',
                    borderTop: '3px solid #FAB800',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}
            />

            {/* Estilos de las animaciones */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes pulseScale {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .loading-screen {
                    backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    );
}
