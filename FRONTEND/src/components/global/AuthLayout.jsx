import React from 'react';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#181A1B' }}>
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-4 py-5">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          {/* Logo/Brand */}
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-2" style={{ color: '#ffffff', fontSize: '2rem' }}>
              EzPay
            </h1>
            {title && (
              <h2 className="fw-normal" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mb-0" style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="w-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}