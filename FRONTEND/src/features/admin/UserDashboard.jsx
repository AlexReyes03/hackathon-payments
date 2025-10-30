import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BalanceCard from './components/BalanceCard';
import AssetCard from './components/AssetCard';
import ServiceButton from './components/ServiceButton';

export default function UserDashboard() {
  const { user } = useAuth();

  // Mock data - Replace with real data from API
  const balanceData = {
    balance: 34378.0,
    percentage: 12.4,
  };

  const bitcoinData = {
    name: 'Bitcoin',
    amount: '0.015',
    amountLabel: 'Cantidad en BTC',
    estimatedValue: 30200.0,
    pricePerUnit: 2080552.38,
    percentage: 3.4,
  };

  const services = [
    { icon: 'pi pi-mobile', label: 'Recarga celular', onClick: () => console.log('Recarga celular') },
    { icon: 'pi pi-credit-card', label: 'Dinero del extranjero', onClick: () => console.log('Dinero del extranjero') },
    { icon: 'pi pi-calendar', label: 'Pagar servicios', onClick: () => console.log('Pagar servicios') },
    { icon: 'pi pi-qrcode', label: 'Pagar con QR', onClick: () => console.log('Pagar con QR') },
    { icon: 'pi pi-plus-circle', label: 'Puntos', onClick: () => console.log('Puntos') },
    { icon: 'pi pi-gift', label: 'Beneficios', onClick: () => console.log('Beneficios') },
    { icon: 'pi pi-chart-line', label: 'Invertir', onClick: () => console.log('Invertir') },
    { icon: 'pi pi-question-circle', label: 'Ayuda', onClick: () => console.log('Ayuda') },
  ];

  const handleBuyClick = () => {
    console.log('Comprar clicked');
  };

  const handleConvertClick = () => {
    console.log('Convertir a clicked');
  };

  const handleDetailsClick = () => {
    console.log('Ver detalles clicked');
  };

  const BitcoinIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
        fill="white"
      />
    </svg>
  );

  const username = user?.first_name ? `${user.first_name} ${user.last_name_paternal}` : user?.username || 'Usuario';

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Section: Tu Cuenta */}
      <div className="mb-3">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Tu Cuenta
        </h6>
        <BalanceCard balance={balanceData.balance} percentage={balanceData.percentage} username={username} onBuyClick={handleBuyClick} />
      </div>

      {/* Section: Tus Activos */}
      <div className="mb-3">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Tus Activos
        </h6>
        <AssetCard
          icon={<BitcoinIcon />}
          name={bitcoinData.name}
          percentage={bitcoinData.percentage}
          amount={bitcoinData.amount}
          amountLabel={bitcoinData.amountLabel}
          estimatedValue={bitcoinData.estimatedValue}
          pricePerUnit={bitcoinData.pricePerUnit}
          onConvertClick={handleConvertClick}
          onDetailsClick={handleDetailsClick}
        />
      </div>

      {/* Section: Servicios */}
      <div className="mb-3">
        <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
          Servicios
        </h6>
        <div className="d-flex justify-content-center">
          <div className="row g-4" style={{ maxWidth: '400px' }}>
            {services.map((service, index) => (
              <div key={index} className="col-3">
                <ServiceButton icon={service.icon} label={service.label} onClick={service.onClick} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
