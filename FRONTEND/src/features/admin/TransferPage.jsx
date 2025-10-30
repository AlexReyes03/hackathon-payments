import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BalanceCard from './components/BalanceCard';
import ContactCarousel from './components/ContactCarousel';
import TransactionItem from './components/TransactionItem';

export default function TransferPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - Replace with real data from API
  const balanceData = {
    balance: 34378.0,
    percentage: 12.4,
  };

  const contacts = [
    { id: 1, name: 'Juan', initials: 'JU', color: '#ef4444' },
    { id: 2, name: 'Alejandro', initials: 'AL', color: '#3b82f6' },
    { id: 3, name: 'Josef', initials: 'JO', color: '#10b981' },
    { id: 4, name: 'Jafet', initials: 'JF', color: '#f59e0b' },
    { id: 5, name: 'Maria', initials: 'MA', color: '#ec4899' },
    { id: 6, name: 'Carlos', initials: 'CA', color: '#8b5cf6' },
    { id: 7, name: 'Ana', initials: 'AN', color: '#06b6d4' },
    { id: 8, name: 'Pedro', initials: 'PE', color: '#f97316' },
    { id: 9, name: 'Sofia', initials: 'SO', color: '#a855f7' },
    { id: 10, name: 'Luis', initials: 'LU', color: '#14b8a6' },
  ];

  const transactions = [
    {
      id: 1,
      date: '25 de octubre',
      items: [
        {
          icon: 'pi pi-calendar',
          title: 'Transferencia Crypto',
          subtitle: 'Restaurante Cuernavaca',
          amount: 100.0,
          type: 'expense',
        },
        {
          icon: 'pi pi-calendar',
          title: 'Transferencia Crypto',
          subtitle: 'Restaurante Cuernavaca',
          amount: 100.0,
          type: 'expense',
        },
        {
          icon: 'pi pi-arrow-down',
          title: 'Transferencia Crypto',
          subtitle: 'Restaurante Cuernavaca',
          amount: 100.0,
          type: 'income',
        },
      ],
    },
  ];

  const username = user?.first_name ? `${user.first_name} ${user.last_name_paternal}` : user?.username || 'Usuario';

  const handleBuyClick = () => {
    console.log('Comprar clicked');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddContact = () => {
    console.log('Agregar contacto');
  };

  const handleTransferToAccount = () => {
    navigate('/admin/transfer-step2', {
      state: {
        recipient: {
          name: 'Cuenta o Tarjeta',
          account: 'Banco',
          initials: 'BA',
          color: '#00d084',
        },
        balance: balanceData.balance,
        username: username,
      },
    });
  };

  const handleContactClick = (contact) => {
    navigate('/admin/transfer-step2', {
      state: {
        recipient: {
          name: contact.name,
          account: `Cuenta **** ${Math.floor(1000 + Math.random() * 9000)}`,
          initials: contact.initials,
          color: contact.color,
        },
        balance: balanceData.balance,
        username: username,
      },
    });
  };

  const handleTransactionClick = (transaction) => {
    console.log('Transaction clicked:', transaction);
  };

  const handleViewAll = () => {
    navigate('/admin/movements');
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Section: Tu Billetera */}
      <div className="mb-4">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Tu Billetera
        </h6>
        <BalanceCard balance={balanceData.balance} percentage={balanceData.percentage} username={username} onBuyClick={handleBuyClick} />
      </div>

      {/* Section: Transferir Rapidamente */}
      <div className="mb-4">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Transferir Rapidamente
        </h6>

        {/* Search and Add */}
        <div className="d-flex gap-2 mb-3">
          {/* Search Input */}
          <div className="flex-grow-1 position-relative">
            <i
              className="pi pi-search position-absolute top-50 translate-middle-y ms-3"
              style={{
                color: '#888',
                fontSize: '1rem',
                zIndex: 1,
              }}
            ></i>
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: '25px',
                color: '#ffffff',
                padding: '0.75rem 1rem 0.75rem 3rem',
                fontSize: '0.95rem',
              }}
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddContact}
            className="btn d-flex align-items-center gap-2 px-3"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #00d084',
              borderRadius: '25px',
              color: '#00d084',
              fontSize: '0.95rem',
              fontWeight: '500',
              whiteSpace: 'nowrap',
            }}
          >
            <i className="pi pi-user-plus" style={{ fontSize: '1rem' }}></i>
            <span>Agregar</span>
          </button>
        </div>

        {/* Transfer to Account Option */}
        <button
          onClick={handleTransferToAccount}
          className="w-100 bg-transparent d-flex align-items-center justify-content-between p-3 rounded-3"
          style={{
            border: '1px solid #444',
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
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0, 208, 132, 0.15)',
              }}
            >
              <i
                className="pi pi-building"
                style={{
                  fontSize: '1.1rem',
                  color: '#00d084',
                }}
              ></i>
            </div>
            <span className="text-white" style={{ fontSize: '0.95rem' }}>
              Transferir a una cuenta o tarjeta
            </span>
          </div>
          <i
            className="pi pi-chevron-right"
            style={{
              fontSize: '1rem',
              color: '#888',
            }}
          ></i>
        </button>
      </div>

      {/* Section: Contact Carousel */}
      <div className="mb-4">
        <ContactCarousel contacts={contacts} onContactClick={handleContactClick} />
      </div>

      {/* Section: Ultimas Transferencias */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-white mb-0" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
            Ultimas Transferencias
          </h6>
          <button
            onClick={handleViewAll}
            className="btn btn-link p-0 text-decoration-none"
            style={{
              color: '#00d084',
              fontSize: '0.85rem',
              fontWeight: '500',
            }}
          >
            Ver todas
          </button>
        </div>

        {/* Transactions List */}
        <div>
          {transactions.map((group) => (
            <div key={group.id} className="mb-3">
              {/* Date Header */}
              <div
                className="px-3 py-2 mb-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white-50" style={{ fontSize: '0.85rem' }}>
                    {group.date}
                  </span>
                  <span className="text-white-50" style={{ fontSize: '0.85rem' }}>
                    Saldo del dia $100,000
                  </span>
                </div>
              </div>

              {/* Transaction Items */}
              <div className="d-flex flex-column">
                {group.items.map((transaction, index) => (
                  <TransactionItem key={index} icon={transaction.icon} title={transaction.title} subtitle={transaction.subtitle} amount={transaction.amount} type={transaction.type} onClick={() => handleTransactionClick(transaction)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
