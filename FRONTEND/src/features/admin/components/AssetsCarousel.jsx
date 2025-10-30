import React from 'react';
import AssetCard from './AssetCard';

export default function AssetsCarousel({ assets, onConvertClick, onDetailsClick }) {
  if (!assets || assets.length === 0) {
    return (
      <div className="text-center text-white-50 py-4">
        <p>No hay activos disponibles</p>
      </div>
    );
  }

  return (
    <div
      className="d-flex gap-3 overflow-x-auto pb-3"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#3a3a3a #1a1a1a',
      }}
    >
      {assets.map((asset, index) => (
        <div
          key={index}
          style={{
            minWidth: '320px',
            maxWidth: '320px',
          }}
        >
          <AssetCard
            icon={asset.icon}
            name={asset.name}
            percentage={asset.percentage}
            amount={asset.amount}
            amountLabel={asset.amountLabel}
            estimatedValue={asset.estimatedValue}
            pricePerUnit={asset.pricePerUnit}
            onConvertClick={() => onConvertClick(asset)}
            onDetailsClick={() => onDetailsClick(asset)}
          />
        </div>
      ))}

      <style jsx>{`
        div::-webkit-scrollbar {
          height: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: #3a3a3a;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
}
