import React from 'react';
import { Button } from 'primereact/button';
import FloatingInput from './FloatingInput';
import PasswordInput from './PasswordInput';

export default function RegisterStep2({
    formData,
    setFormData,
    errors,
    onBack,
    onContinue
}) {
    return (
        <div className="d-flex flex-column gap-3">
            <h3 className="text-center mb-3" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                Ingresa tus datos
            </h3>

            <FloatingInput
                id="correo"
                type="email"
                label="Correo Electronico"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                error={errors.correo}
            />

            <FloatingInput
                id="usuario"
                label="Usuario"
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                error={errors.usuario}
            />

            <PasswordInput
                id="contrasena"
                label="Contraseña"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                error={errors.contrasena}
            />

            <PasswordInput
                id="confirmarContrasena"
                label="Confirmar Contraseña"
                value={formData.confirmarContrasena}
                onChange={(e) => setFormData({ ...formData, confirmarContrasena: e.target.value })}
                error={errors.confirmarContrasena}
            />

            <div className="d-flex gap-2 mt-3">
                <Button
                    type="button"
                    label="Regresar"
                    onClick={onBack}
                    outlined
                    className="flex-fill"
                    style={{
                        border: '1px solid #ffc107',
                        borderRadius: '25px',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#ffc107',
                        backgroundColor: 'transparent',
                    }}
                />
                <Button
                    type="button"
                    label="Continuar"
                    onClick={onContinue}
                    className="flex-fill"
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
            </div>
        </div>
    );
}