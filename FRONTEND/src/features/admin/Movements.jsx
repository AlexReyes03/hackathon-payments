import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import bankService from '../../api/financial/bankService';
import userTransferService from '../../api/financial/userTransferService';

export default function Movements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    setLoading(true);
    try {
      const bankTransfersData = bankService.listTransfers();
      const userTransfersData = userTransferService.getAllTransfers();

      const bankGrouped = bankService.groupTransfersByDate(bankTransfersData.transfers);
      const userGrouped = userTransferService.groupTransfersByDate(userTransfersData);

      const allGrouped = {};

      bankGrouped.forEach((group) => {
        if (!allGrouped[group.date]) {
          allGrouped[group.date] = {
            date: group.date,
            items: [],
          };
        }
        allGrouped[group.date].items.push(...group.items);
      });

      userGrouped.forEach((group) => {
        if (!allGrouped[group.date]) {
          allGrouped[group.date] = {
            date: group.date,
            items: [],
          };
        }
        allGrouped[group.date].items.push(...group.items);
      });

      const sortedGrouped = Object.values(allGrouped).sort((a, b) => {
        const dateA = new Date(a.items[0]?.created_at || Date.now());
        const dateB = new Date(b.items[0]?.created_at || Date.now());
        return dateB - dateA;
      });

      sortedGrouped.forEach((group) => {
        group.items.sort((a, b) => {
          const dateA = new Date(a.created_at || Date.now());
          const dateB = new Date(b.created_at || Date.now());
          return dateB - dateA;
        });
      });

      setTransactions(sortedGrouped);
    } catch (error) {
      console.error('Error loading transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconType) => {
    const iconStyles = {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(13, 110, 100, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0d6e64',
    };

    return (
      <div style={iconStyles}>
        <i className={`pi pi-${iconType}`} style={{ fontSize: '1.25rem' }}></i>
      </div>
    );
  };

  const filteredTransactions = transactions.filter((group) =>
    group.items.some(
      (item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-4" style={{ paddingBottom: '100px', maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
      <div className="d-flex gap-3 mb-4">
        <div className="flex-grow-1 position-relative">
          <i
            className="pi pi-search position-absolute"
            style={{
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888888',
            }}
          ></i>
          <InputText
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar"
            className="w-100"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: '25px',
              padding: '0.75rem 1rem 0.75rem 3rem',
              color: '#ffffff',
              fontSize: '1rem',
            }}
          />
        </div>
        <Button
          icon="pi pi-filter"
          className="p-button-outlined"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '25px',
            color: '#ffffff',
            minWidth: '120px',
          }}
          label="Filtrar"
        />
      </div>

      <h2 className="mb-4" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '600' }}>
        Historial
      </h2>

      {filteredTransactions.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {filteredTransactions.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div
                className="d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                style={{
                  backgroundColor: '#3a3a3a',
                  borderRadius: '8px',
                }}
              >
                <span style={{ color: '#cccccc', fontSize: '0.95rem' }}>{day.date}</span>
              </div>

              <div className="d-flex flex-column gap-2">
                {day.items.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="d-flex align-items-center gap-3 p-3"
                    style={{
                      backgroundColor: '#2a2a2a',
                      borderRadius: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {getIconComponent(transaction.icon)}

                    <div className="flex-grow-1">
                      <div
                        style={{
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {transaction.type}
                      </div>
                      <div
                        style={{
                          color: '#cccccc',
                          fontSize: '0.9rem',
                        }}
                      >
                        {transaction.description}
                      </div>
                      {transaction.status === 'rejected' && (
                        <div
                          style={{
                            color: '#ef4444',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem',
                          }}
                        >
                          Rechazado - Reputacion insuficiente
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        color: transaction.amount > 0 ? '#10b981' : transaction.amount < 0 ? '#ef4444' : '#888888',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                      }}
                    >
                      {transaction.amount !== 0 && (
                        <>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </>
                      )}
                      {transaction.amount === 0 && <span style={{ color: '#888888' }}>N/A</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white-50 py-4">
          <p>No se encontraron transacciones</p>
        </div>
      )}
    </div>
  );
}