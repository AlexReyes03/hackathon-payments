import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ProfileFilled from '../../assets/svg/ProfileFilled.svg?url';
import ProfileOutlined from '../../assets/svg/ProfileOutlined.svg?url';
import HomeFilled from '../../assets/svg/HomeFilled.svg?url';
import HomeOutlined from '../../assets/svg/HomeOutlined.svg?url';
import TransferFilled from '../../assets/svg/TransferFilled.svg?url';
import TransferOutlined from '../../assets/svg/TransferOutlined.svg?url';
import BankFilled from '../../assets/svg/BankFilled.svg?url';
import BankOutlined from '../../assets/svg/BankOutlined.svg?url';
import CreditFilled from '../../assets/svg/CreditFilled.svg?url';
import CreditOutlined from '../../assets/svg/CreditOutlined.svg?url';


export default function Tabbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'home',
      label: 'Inicio',
      path: '/admin/dashboard',
      iconFilled: HomeFilled, // Insertar: /assets/icons/home-filled.svg
      iconOutlined: HomeOutlined, // Insertar: /assets/icons/home-outlined.svg
    },
    {
      id: 'history',
      label: 'Historial',
      path: '/admin/movements',
      iconFilled: BankFilled, // Insertar: /assets/icons/history-filled.svg
      iconOutlined: BankOutlined, // Insertar: /assets/icons/history-outlined.svg
    },
    {
      id: 'transfer',
      label: '',
      path: '/admin/transfer',
      iconFilled: TransferFilled, // Insertar: /assets/icons/transfer-filled.svg
      iconOutlined: TransferOutlined, // Insertar: /assets/icons/transfer-outlined.svg
      isCenter: true,
    },
    {
      id: 'credit',
      label: 'Crédito',
      path: '/admin/credits',
      iconFilled: CreditFilled, // Insertar: /assets/icons/credit-filled.svg
      iconOutlined: CreditOutlined, // Insertar: /assets/icons/credit-outlined.svg
    },
    {
      id: 'profile',
      label: 'Cuenta',
      path: '/admin/profile',
      iconFilled: ProfileFilled,
      iconOutlined: ProfileOutlined,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <nav
      className="fixed-bottom"
      style={{
        backgroundColor: '#0C0D0E',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="d-flex justify-content-around align-items-end position-relative" style={{ paddingTop: '8px' }}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const iconSrc = active ? tab.iconFilled : tab.iconOutlined;
          const color = active ? '#E0A500' : '#E5E5E5';

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className="d-flex flex-column align-items-center bg-transparent border-0 position-relative"
                style={{
                  cursor: 'pointer',
                  minWidth: '60px',
                  marginBottom: '20px',
                }}
              >
                {/* Center Elevated Button */}
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: active ? '#E0A500' : '#2a2a2a',
                    boxShadow: active ? '0 4px 16px rgba(224, 165, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    border: active ? 'none' : '2px solid #444',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt="Transferir"
                      style={{
                        width: '32px',
                        height: '32px',
                        objectFit: 'contain',
                        filter: active ? 'brightness(0)' : 'brightness(1)',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: active ? '#000' : color,
                        borderRadius: '50%',
                        opacity: 0.5,
                      }}
                    />
                  )}
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className="d-flex flex-column align-items-center bg-transparent border-0"
              style={{
                cursor: 'pointer',
                minWidth: '60px',
                paddingTop: '8px',
                paddingBottom: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Icon */}
              <div
                className="d-flex align-items-center justify-content-center mb-1"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              >
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt={tab.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: color,
                      borderRadius: '4px',
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: '0.7rem',
                  color: color,
                  fontWeight: active ? '600' : '400',
                  textAlign: 'center',
                  lineHeight: '1',
                  marginTop: '4px',
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
