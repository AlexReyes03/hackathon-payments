import React from 'react';

export default function ServiceButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="d-flex flex-column align-items-center gap-2 bg-transparent border-0 p-0"
            style={{ cursor: 'pointer' }}
        >
            <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#3a3d40',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4a4d50';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3a3d40';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <i
                    className={icon}
                    style={{
                        fontSize: '1.5rem',
                        color: '#E5E5E5',
                    }}
                ></i>
            </div>
            <span
                className="text-white text-center"
                style={{
                    fontSize: '0.75rem',
                    maxWidth: '80px',
                    lineHeight: '1.2',
                }}
            >
                {label}
            </span>
        </button>
    );
}