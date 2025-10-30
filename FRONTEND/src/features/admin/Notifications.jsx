import { useState } from 'react';

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'read', label: 'Leídas' },
    { id: 'unread', label: 'No leídas' },
  ];

  return (
    <div
      className="d-flex flex-column px-4 py-4"
      style={{
        backgroundColor: '#181A1B',
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '100px',
      }}
    >
      {/* Titulo */}
      <h2
        className="text-center mb-4"
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
        }}
      >
        Notificaciones
      </h2>

      {/* Filtros */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className="btn"
            style={{
              backgroundColor: activeFilter === filter.id ? '#ffc107' : '#2a2a2a',
              color: activeFilter === filter.id ? '#000000' : '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Estado Vacio */}
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ marginTop: '4rem' }}>
        {/* Icono de Notificacion */}
        <div
          className="d-flex align-items-center justify-content-center mb-4"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#2a2a2a',
          }}
        >
          <i className="pi pi-bell" style={{ color: '#666666', fontSize: '3.5rem' }}></i>
        </div>

        {/* Mensaje Principal */}
        <h3
          className="text-center mb-2"
          style={{
            color: '#ffffff',
            fontSize: '1.15rem',
            fontWeight: '600',
          }}
        >
          Sin notificaciones por ahora
        </h3>

        {/* Mensaje Secundario */}
        <p
          className="text-center"
          style={{
            color: '#999999',
            fontSize: '0.95rem',
            maxWidth: '300px',
            lineHeight: '1.5',
          }}
        >
          Cuando tengas notificaciones sobre tus transacciones o actualizaciones importantes, aparecerán aquí
        </p>
      </div>
    </div>
  );
}
