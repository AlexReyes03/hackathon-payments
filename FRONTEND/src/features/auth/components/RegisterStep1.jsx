import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import FloatingInput from './FloatingInput';

export default function RegisterStep1({
    formData,
    setFormData,
    errors,
    onContinue
}) {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column gap-3">
            <h3 className="text-center mb-3" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                Ingresa tus datos
            </h3>

            <FloatingInput
                id="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                error={errors.nombre}
            />

            <FloatingInput
                id="apellidoPaterno"
                label="Apellido paterno"
                value={formData.apellidoPaterno}
                onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
                error={errors.apellidoPaterno}
            />

            <FloatingInput
                id="apellidoMaterno"
                label="Apellido materno (opcional)"
                value={formData.apellidoMaterno}
                onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
                error={errors.apellidoMaterno}
            />

            <FloatingInput
                id="fechaNacimiento"
                label="Fecha de nacimiento"
                placeholder="DD/MM/YYYY"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                error={errors.fechaNacimiento}
            />

            <Button
                type="button"
                label="Continuar"
                onClick={onContinue}
                className="w-100 mt-3"
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
                    onClick={() => navigate('/')}
                    className="btn btn-link text-decoration-none"
                    style={{ color: '#ffffff', fontSize: '0.9rem' }}
                >
                    Volver al inicio de sesion
                </button>
            </div>
        </div>
    );
}