import React from 'react';

export default function FloatingInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder = ' ',
    error = null,
    required = false,
    disabled = false,
}) {
    return (
        <div className="mb-3">
            <div className="form-floating">
                <input
                    id={id}
                    type={type}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    style={{
                        backgroundColor: '#2a2a2a',
                        border: `1px solid ${error ? '#dc3545' : '#444'}`,
                        borderRadius: '8px',
                        color: '#ffffff',
                    }}
                />
                <label
                    htmlFor={id}
                    style={{ color: '#999' }}
                >
                    {label}
                </label>
            </div>
            {error && (
                <small className="text-danger d-block mt-1">{error}</small>
            )}
        </div>
    );
}