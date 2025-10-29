import React from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import FloatingInput from './FloatingInput';

export default function RegisterStep1({
    formData,
    setFormData,
    errors,
    onContinue
}) {
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100);

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

            <div className="mb-3">
                <label className="form-label" style={{ color: '#ffffff' }}>
                    Fecha de nacimiento
                </label>
                <Calendar
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.value })}
                    dateFormat="dd/mm/yy"
                    inline
                    maxDate={today}
                    minDate={minDate}
                    yearNavigator
                    monthNavigator
                    yearRange={`${today.getFullYear() - 100}:${today.getFullYear()}`}
                    className="w-100"
                    panelStyle={{
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #444',
                        borderRadius: '8px',
                    }}
                />
                {errors.fechaNacimiento && (
                    <small className="text-danger d-block mt-1">{errors.fechaNacimiento}</small>
                )}
            </div>

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
        </div>
    );
}