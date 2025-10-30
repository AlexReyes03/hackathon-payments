import { useEffect } from 'react';

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
    useEffect(() => {
        // Inyectar estilos para focus y autofill
        const styleId = 'floating-input-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .form-control:focus {
                    background-color: #2a2a2a !important;
                    color: #ffffff !important;
                    border-color: #ffc107 !important;
                    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25) !important;
                }
                .form-control:-webkit-autofill,
                .form-control:-webkit-autofill:hover,
                .form-control:-webkit-autofill:focus,
                .form-control:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px #2a2a2a inset !important;
                    -webkit-text-fill-color: #ffffff !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

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