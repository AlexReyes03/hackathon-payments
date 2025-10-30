import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BalanceCard from './components/BalanceCard';
import ContactCarousel from './components/ContactCarousel';
import TransactionItem from './components/TransactionItem';
import AddAccountModal from './components/AddAccountModal';
import contactService from '../../api/financial/contactService';
import walletService from '../../api/financial/walletService';
import convertService from '../../api/financial/convertService';
import bankService from '../../api/financial/bankService';
import userTransferService from '../../api/financial/userTransferService';

export default function TransferPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    percentage: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const publicKey = user?.wallet_public_key;
  const username = user?.first_name ? `${user.first_name} ${user.last_name_paternal}` : user?.username || 'Usuario';

  useEffect(() => {
    console.log('TransferPage mounted');
    console.log('User:', user);
    console.log('Public Key:', publicKey);

    loadData();
  }, [publicKey]);

  const loadData = async () => {
    console.log('Starting loadData...');
    setLoading(true);
    setError(null);

    try {
      const loadedContacts = contactService.getAllContacts();
      console.log('Contacts loaded:', loadedContacts);
      setContacts(loadedContacts);

      let totalMXN = 0;
      try {
        const balanceResponse = await walletService.getBalance(publicKey);
        console.log('Balance response:', balanceResponse);

        if (balanceResponse.balances && balanceResponse.balances.length > 0) {
          totalMXN = await convertService.calculateTotalBalanceInMXN(balanceResponse.balances);
          console.log('Total MXN calculated:', totalMXN);
        }
      } catch (balanceError) {
        console.error('Error fetching balance:', balanceError);
      }
      
      setBalanceData({
        balance: totalMXN,
        percentage: 12.4,
      });

      const bankTransfers = bankService.listTransfers();
      const userTransfers = userTransferService.getAllTransfers();
      
      const allTransfers = [...bankTransfers.transfers, ...userTransfers];
      
      allTransfers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const bankGrouped = bankService.groupTransfersByDate(bankTransfers.transfers);
      const userGrouped = userTransferService.groupTransfersByDate(userTransfers);
      
      const allGrouped = [...bankGrouped, ...userGrouped];
      
      allGrouped.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      console.log('All grouped transfers:', allGrouped);
      setTransactions(allGrouped.slice(0, 1));

      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error in loadData:', error);
      setError(error.message || 'Error al cargar los datos');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleBuyClick = () => {
    console.log('Comprar clicked');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddContact = () => {
    setShowAddModal(true);
  };

  const handleContactAdded = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleTransferToAccount = () => {
    navigate('/admin/transfer-step2', {
      state: {
        recipient: {
          name: 'Cuenta o Tarjeta',
          account: 'Banco',
          initials: 'BA',
          color: '#00d084',
          type: 'bank',
        },
        balance: balanceData.balance,
        username: username,
        publicKey: publicKey,
      },
    });
  };

  const handleTransferToEzPayUser = () => {
    navigate('/admin/transfer-step2', {
      state: {
        recipient: {
          name: 'Usuario EzPay',
          account: 'Usuario',
          initials: 'EZ',
          color: '#ffc107',
          type: 'ezpay_user',
        },
        balance: balanceData.balance,
        username: username,
        publicKey: publicKey,
      },
    });
  };

  const handleContactClick = (contact) => {
    if (contact.contactType === 'ezpay_user') {
      navigate('/admin/transfer-step2', {
        state: {
          recipient: {
            name: contact.name,
            account: `@${contact.username}`,
            initials: contact.initials,
            color: contact.color,
            username: contact.username,
            type: 'ezpay_user',
          },
          balance: balanceData.balance,
          username: username,
          publicKey: publicKey,
        },
      });
    } else {
      navigate('/admin/transfer-step2', {
        state: {
          recipient: {
            name: contact.name,
            account: `${contact.accountType === 'cuenta' ? 'Cuenta' : 'Tarjeta'} ${contact.accountNumber}`,
            initials: contact.initials,
            color: contact.color,
            accountNumber: contact.accountNumber,
            accountType: contact.accountType,
            bankName: contact.bank,
            type: 'bank',
          },
          balance: balanceData.balance,
          username: username,
          publicKey: publicKey,
        },
      });
    }
  };

  const handleTransactionClick = (transaction) => {
    console.log('Transaction clicked:', transaction);
  };

  const handleViewAll = () => {
    navigate('/admin/movements');
  };

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.username && contact.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-warning mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-white-50">Cargando datos de tu billetera...</p>
      </div>
    );
  }

  if (error && !publicKey) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
          <h4 className="text-white mb-3">Error</h4>
          <p className="text-white-50 mb-4">{error}</p>
          <button onClick={() => navigate('/admin/wallet')} className="btn btn-warning">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      {error && (
        <div className="alert alert-warning mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="mb-4">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Tu Billetera
        </h6>
        <BalanceCard balance={balanceData.balance} percentage={balanceData.percentage} username={username} onBuyClick={handleBuyClick} />
      </div>

      <div className="mb-4">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Transferir Rapidamente
        </h6>

        <div className="d-flex gap-2 mb-3">
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

        <button
          onClick={handleTransferToAccount}
          className="w-100 bg-transparent d-flex align-items-center justify-content-between p-3 rounded-3 mb-2"
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

        <button
          onClick={handleTransferToEzPayUser}
          className="w-100 bg-transparent d-flex align-items-center justify-content-between p-3 rounded-3 mb-3"
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
                backgroundColor: 'rgba(255, 193, 7, 0.15)',
              }}
            >
              <i
                className="pi pi-user"
                style={{
                  fontSize: '1.1rem',
                  color: '#ffc107',
                }}
              ></i>
            </div>
            <span className="text-white" style={{ fontSize: '0.95rem' }}>
              Transferir a Usuario EzPay
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

      {filteredContacts.length > 0 && (
        <div className="mb-4">
          <ContactCarousel contacts={filteredContacts} onContactClick={handleContactClick} />
        </div>
      )}

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

        {transactions.length > 0 ? (
          <div>
            {transactions.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-3">
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
                  </div>
                </div>

                <div className="d-flex flex-column">
                  {group.items.slice(0, 3).map((transaction, index) => (
                    <TransactionItem
                      key={index}
                      icon={`pi pi-${transaction.icon}`}
                      title={transaction.type}
                      subtitle={transaction.description}
                      amount={Math.abs(transaction.amount)}
                      type={transaction.amount < 0 ? 'expense' : 'income'}
                      onClick={() => handleTransactionClick(transaction)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white-50 py-4">
            <p>No hay transferencias recientes</p>
          </div>
        )}
      </div>

      <AddAccountModal show={showAddModal} onHide={() => setShowAddModal(false)} onContactAdded={handleContactAdded} />
    </div>
  );
}