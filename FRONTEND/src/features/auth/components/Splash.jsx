import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

import Stellar from '../../../assets/img/Stellar.png';

export default function Splash({ onAccederClick }) {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center gap-4">
            {/* Logo Stellar */}
            <div className="text-center mb-4">
                <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                        width: '120px',
                        height: '120px',
                        margin: '0 auto',
                    }}
                >
                    <img
                        src={Stellar}
                        alt="Stellar Logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <h3
                    className="mb-0"
                    style={{
                        color: '#ffffff',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                    }}
                >
                </h3>
            </div>

            <Button
                type="button"
                label="Acceder"
                onClick={onAccederClick}
                className="w-100"
                style={{
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#000000',
                }}
            />

            <div className="text-center">
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="btn btn-link text-decoration-none"
                    style={{ color: '#ffffff', fontSize: '0.9rem' }}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}