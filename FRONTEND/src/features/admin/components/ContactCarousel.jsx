import React from 'react';

export default function ContactCarousel({ contacts, onContactClick }) {
  return (
    <div
      className="d-flex gap-3 overflow-x-auto pb-2"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {contacts.map((contact, index) => (
        <button key={index} onClick={() => onContactClick(contact)} className="d-flex flex-column align-items-center gap-2 bg-transparent border-0 p-0 flex-shrink-0" style={{ cursor: 'pointer', minWidth: '70px' }}>
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #703FB5 0%, #42256A 100%)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i
              className="pi pi-user"
              style={{
                fontSize: '1.75rem',
                color: '#ffffff',
              }}
            ></i>
          </div>
          <span
            className="text-white text-center"
            style={{
              fontSize: '0.8rem',
              maxWidth: '70px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {contact.name}
          </span>
        </button>
      ))}

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
