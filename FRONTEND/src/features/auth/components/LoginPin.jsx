import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';

export default function LoginPin({ username, onSubmit, onSwitchAccount, loading }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (pin.length !== 6) {
            setError('El PIN debe tener 6 digitos');
            return;
        }

        try {
            await onSubmit({ username, pin });
        } catch (err) {
            setError(err.message || 'PIN incorrecto');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            <div className="text-center mb-3">
                <p className="mb-2" style={{ color: '#cccccc', fontSize: '0.95rem' }}>
                    Bienvenido de nuevo
                </p>
                <p className="mb-0 fw-semibold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
                    {username}
                </p>
            </div>

            <div>
                <label htmlFor="pin" className="form-label" style={{ color: '#ffffff' }}>
                    PIN de acceso
                </label>
                <InputMask
                    id="pin"
                    mask="999999"
                    value={pin}
                    onChange={(e) => setPin(e.value)}
                    placeholder="000000"
                    className="w-100"
                    style={{
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #444',
                        borderRadius: '8px',
                        color: '#ffffff',
                        padding: '0.75rem',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        letterSpacing: '0.5rem',
                    }}
                    inputStyle={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ffffff',
                    }}
                />
            </div>

            {error && (
                <div className="alert alert-danger mb-0" role="alert" style={{ fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            <Button
                type="submit"
                label="Ingresar"
                loading={loading}
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
                    onClick={onSwitchAccount}
                    className="btn btn-link text-decoration-none"
                    style={{ color: '#ffffff', fontSize: '0.9rem' }}
                >
                    Iniciar con otra cuenta
                </button>
            </div>
        </form>
    );
}