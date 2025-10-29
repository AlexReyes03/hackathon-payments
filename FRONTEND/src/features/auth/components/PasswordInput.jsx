import React, { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = ' ',
  error = null,
  required = false,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);

  const Icon = visible ? MdOutlineVisibility : MdOutlineVisibilityOff;

  return (
    <div className="mb-3">
      <div className="form-floating position-relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{
            backgroundColor: '#2a2a2a',
            border: `1px solid ${error ? '#dc3545' : '#444'}`,
            borderRadius: '8px',
            color: '#ffffff',
            paddingRight: '3rem',
          }}
        />
        <label
          htmlFor={id}
          style={{ color: '#999' }}
        >
          {label}
        </label>
        <Icon
          role="button"
          size={24}
          onClick={() => setVisible((v) => !v)}
          className="position-absolute end-0 me-3 top-50 translate-middle-y"
          style={{
            cursor: 'pointer',
            color: '#888',
            zIndex: 10,
          }}
          title={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        />
      </div>
      {error && (
        <small className="text-danger d-block mt-1">{error}</small>
      )}
    </div>
  );
}