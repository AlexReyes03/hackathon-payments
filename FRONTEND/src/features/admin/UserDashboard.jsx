import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BalanceCard from './components/BalanceCard';
import AssetCard from './components/AssetCard';
import ServiceButton from './components/ServiceButton';

import walletService from '../../api/financial/walletService';
import convertService from '../../api/financial/convertService';

export default function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    percentage: 0,
  });
  const [assets, setAssets] = useState([]);

  const publicKey = user?.wallet_public_key;
  const username = user?.first_name ? `${user.first_name} ${user.last_name_paternal}` : user?.username || 'Usuario';

  useEffect(() => {
    if (!publicKey) {
      setLoading(false);
      setError('No se encontró la clave pública de la billetera');
      return;
    }

    loadWalletData();
  }, [publicKey]);

  const loadWalletData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch balance from Stellar
      const balanceResponse = await walletService.getBalance(publicKey);
      console.log('Balance response:', balanceResponse);

      if (!balanceResponse.balances || balanceResponse.balances.length === 0) {
        setBalanceData({ balance: 0, percentage: 0 });
        setAssets([]);
        return;
      }

      // Process each asset
      const processedAssets = await Promise.all(
        balanceResponse.balances.map(async (balance) => {
          const amount = parseFloat(balance.balance);
          if (amount <= 0) return null;

          try {
            // Convert to USDC and MXN
            const conversion = await convertService.convertToUsdc(
              balance.asset_code,
              amount.toString()
            );

            // Get current rate for price per unit
            let pricePerUnit = 0;
            try {
              const rateData = await convertService.getExchangeRate(
                balance.asset_code.toLowerCase(),
                'mxn'
              );
              pricePerUnit = rateData.rate;
            } catch (rateError) {
              console.warn(`Could not get rate for ${balance.asset_code}:`, rateError);
            }

            return {
              assetCode: balance.asset_code,
              name: getAssetName(balance.asset_code),
              amount: amount.toFixed(7),
              amountLabel: `Cantidad en ${balance.asset_code}`,
              estimatedValue: conversion.fiatAmount,
              pricePerUnit: pricePerUnit,
              percentage: 3.4, // Mock percentage for now
              icon: getAssetIcon(balance.asset_code),
            };
          } catch (error) {
            console.error(`Error processing ${balance.asset_code}:`, error);
            return null;
          }
        })
      );

      // Filter out null values
      const validAssets = processedAssets.filter((asset) => asset !== null);
      setAssets(validAssets);

      // Calculate total balance in MXN
      const totalMXN = validAssets.reduce((sum, asset) => sum + asset.estimatedValue, 0);
      setBalanceData({
        balance: totalMXN,
        percentage: 12.4, // Mock percentage for now
      });

      console.log('Assets loaded:', validAssets);
      console.log('Total balance:', totalMXN);
    } catch (error) {
      console.error('Error loading wallet data:', error);
      setError(error.message || 'Error al cargar los datos de la billetera');
    } finally {
      setLoading(false);
    }
  };

  const getAssetName = (assetCode) => {
    const names = {
      XLM: 'Stellar Lumens',
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      USDC: 'USD Coin',
      USDT: 'Tether',
    };
    return names[assetCode] || assetCode;
  };

  const getAssetIcon = (assetCode) => {
    switch (assetCode) {
      case 'BTC':
        return <BitcoinIcon />;
      case 'XLM':
        return <StellarIcon />;
      case 'ETH':
        return <EthereumIcon />;
      case 'USDC':
        return <USDCIcon />;
      default:
        return <DefaultCryptoIcon />;
    }
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

  const handleConvertClick = (asset) => {
    console.log('Convertir a clicked:', asset);
  };

  const handleDetailsClick = (asset) => {
    console.log('Ver detalles clicked:', asset);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-warning mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-white-50">Cargando tu billetera...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
          <h4 className="text-white mb-3">Error</h4>
          <p className="text-white-50 mb-4">{error}</p>
          <button onClick={loadWalletData} className="btn btn-warning">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
      {assets.length > 0 && (
        <div className="mb-3">
          <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
            Tus Activos
          </h6>
          
          {/* Full width container for assets */}
          <div className="d-flex flex-column gap-3">
            {assets.map((asset, index) => (
              <div key={index}>
                <AssetCard
                  icon={asset.icon}
                  name={asset.name}
                  percentage={asset.percentage}
                  amount={asset.amount}
                  amountLabel={asset.amountLabel}
                  estimatedValue={asset.estimatedValue}
                  pricePerUnit={asset.pricePerUnit}
                  onConvertClick={() => handleConvertClick(asset)}
                  onDetailsClick={() => handleDetailsClick(asset)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {assets.length === 0 && (
        <div className="mb-3">
          <h6 className="text-white mb-3" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
            Tus Activos
          </h6>
          <div className="text-center py-5">
            <i className="pi pi-wallet text-white-50 mb-3" style={{ fontSize: '3rem' }}></i>
            <p className="text-white-50">No tienes activos en tu billetera</p>
            <button onClick={handleBuyClick} className="btn btn-warning mt-2">
              Comprar Crypto
            </button>
          </div>
        </div>
      )}

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

// Crypto Icons Components
function BitcoinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
        fill="white"
      />
    </svg>
  );
}

function StellarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#000000" />
      <path
        d="M9.5 16.5L22 10.5L19.5 16.5L22 22.5L9.5 16.5Z"
        fill="white"
      />
      <circle cx="22" cy="10.5" r="2" fill="white" />
      <circle cx="9.5" cy="16.5" r="2" fill="white" />
      <circle cx="22" cy="22.5" r="2" fill="white" />
    </svg>
  );
}

function EthereumIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16 4L15.5 5.5V19.5L16 20L22 16L16 4Z" fill="white" fillOpacity="0.6" />
      <path d="M16 4L10 16L16 20V4Z" fill="white" />
      <path d="M16 21.5L15.7 21.8V26.5L16 27.5L22 17.5L16 21.5Z" fill="white" fillOpacity="0.6" />
      <path d="M16 27.5V21.5L10 17.5L16 27.5Z" fill="white" />
    </svg>
  );
}

function USDCIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        d="M19.5 14.5C19.5 13.1 18.4 12 17 12H15C13.6 12 12.5 13.1 12.5 14.5C12.5 15.9 13.6 17 15 17H17C18.4 17 19.5 18.1 19.5 19.5C19.5 20.9 18.4 22 17 22H15C13.6 22 12.5 20.9 12.5 19.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M16 10V12M16 22V24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DefaultCryptoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#6B7280" />
      <path
        d="M16 8C11.6 8 8 11.6 8 16C8 20.4 11.6 24 16 24C20.4 24 24 20.4 24 16C24 11.6 20.4 8 16 8ZM16 22C12.7 22 10 19.3 10 16C10 12.7 12.7 10 16 10C19.3 10 22 12.7 22 16C22 19.3 19.3 22 16 22Z"
        fill="white"
      />
      <path d="M16 12V20M12 16H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}