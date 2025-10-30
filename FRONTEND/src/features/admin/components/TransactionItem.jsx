import React from 'react';

export default function TransactionItem({ icon, title, subtitle, amount, type, onClick }) {
  const isPositive = type === 'income';

  return (
    <button
      onClick={onClick}
      className="w-100 bg-transparent border-0 p-3 d-flex align-items-center gap-3 rounded-3"
      style={{
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Icon */}
      <div
        className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: isPositive ? 'rgba(0, 208, 132, 0.15)' : 'rgba(0, 208, 132, 0.15)',
        }}
      >
        <i
          className={icon}
          style={{
            fontSize: '1.25rem',
            color: '#00d084',
          }}
        ></i>
      </div>

      {/* Content */}
      <div className="flex-grow-1 text-start">
        <div
          className="text-white mb-1"
          style={{
            fontSize: '0.95rem',
            fontWeight: '500',
          }}
        >
          {title}
        </div>
        <div className="text-white-50" style={{ fontSize: '0.85rem' }}>
          {subtitle}
        </div>
      </div>

      {/* Amount */}
      <div
        className="fw-semibold flex-shrink-0"
        style={{
          fontSize: '0.95rem',
          color: isPositive ? '#00d084' : '#ff4757',
        }}
      >
        {isPositive ? '+' : '-'}${Math.abs(amount).toFixed(2)}
      </div>
    </button>
  );
}
