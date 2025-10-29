import React from 'react';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';

export default function RegisterStep3({
    formData,
    setFormData,
    errors,
    onBack,
    onSubmit,
    loading
}) {
    return (
        <div className="d-flex flex-column gap-3">
            <div className="text-center mb-3">
                <h3 className="mb-2" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                    Configura un PIN
                </h3>
                <p className="mb-0" style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Establece un codigo de 6 digitos para acceder a la app y confirmar tus transacciones.
                </p>
            </div>

            <div>
                <label htmlFor="pin" className="form-label" style={{ color: '#ffffff' }}>
                    PIN
                </label>
                <InputMask
                    id="pin"
                    mask="999999"
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.value })}
                    placeholder="000000"
                    className={`w-100 ${errors.pin ? 'p-invalid' : ''}`}
                    style={{
                        backgroundColor: '#2a2a2a',
                        border: `1px solid ${errors.pin ? '#f44336' : '#444'}`,
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
                {errors.pin && (
                    <small className="text-danger d-block mt-1">{errors.pin}</small>
                )}
            </div>

            <div>
                <label htmlFor="confirmarPin" className="form-label" style={{ color: '#ffffff' }}>
                    Confirmar PIN
                </label>
                <InputMask
                    id="confirmarPin"
                    mask="999999"
                    value={formData.confirmarPin}
                    onChange={(e) => setFormData({ ...formData, confirmarPin: e.value })}
                    placeholder="000000"
                    className={`w-100 ${errors.confirmarPin ? 'p-invalid' : ''}`}
                    style={{
                        backgroundColor: '#2a2a2a',
                        border: `1px solid ${errors.confirmarPin ? '#f44336' : '#444'}`,
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
                {errors.confirmarPin && (
                    <small className="text-danger d-block mt-1">{errors.confirmarPin}</small>
                )}
            </div>

            {errors.general && (
                <div className="alert alert-danger mb-0" role="alert" style={{ fontSize: '0.9rem' }}>
                    {errors.general}
                </div>
            )}

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
                    onClick={onSubmit}
                    loading={loading}
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