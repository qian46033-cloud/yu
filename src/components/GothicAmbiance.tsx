import React from 'react';

export const GothicAmbiance: React.FC = () => {
  // Pre-calculated deterministic floating particles to keep it smooth and elegant
  const floatingElements = [
    { id: 1, symbol: '🥀', left: '8%', delay: '0s', duration: '14s', size: '14px', opacity: 0.25 },
    { id: 2, symbol: '♱', left: '22%', delay: '4s', duration: '18s', size: '18px', opacity: 0.15 },
    { id: 3, symbol: '✦', left: '38%', delay: '2s', duration: '12s', size: '10px', opacity: 0.3 },
    { id: 4, symbol: '†', left: '55%', delay: '6s', duration: '16s', size: '16px', opacity: 0.18 },
    { id: 5, symbol: '🥀', left: '72%', delay: '3s', duration: '15s', size: '13px', opacity: 0.22 },
    { id: 6, symbol: '✧', left: '88%', delay: '7s', duration: '13s', size: '12px', opacity: 0.28 },
    { id: 7, symbol: '♱', left: '94%', delay: '1s', duration: '19s', size: '17px', opacity: 0.14 },
    { id: 8, symbol: '‡', left: '14%', delay: '9s', duration: '17s', size: '15px', opacity: 0.16 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Viewport Four-Corner Gothic Ornate Metalwork */}
      <div className="absolute top-2 left-2 text-rose-500/30 text-xs font-cinzel leading-none">
        ╔═♱═╗
      </div>
      <div className="absolute top-2 right-2 text-rose-500/30 text-xs font-cinzel leading-none">
        ╔═♱═╗
      </div>
      <div className="absolute bottom-2 left-2 text-rose-500/30 text-xs font-cinzel leading-none">
        ╚═♱═╝
      </div>
      <div className="absolute bottom-2 right-2 text-rose-500/30 text-xs font-cinzel leading-none">
        ╚═♱═╝
      </div>

      {/* Floating Gothic Petals and Runes */}
      {floatingElements.map((item) => (
        <span
          key={item.id}
          className="absolute -bottom-10 animate-float-gothic"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
            opacity: item.opacity,
            color: item.symbol === '🥀' ? '#f43f5e' : '#e4e4e7',
            textShadow: '0 0 10px rgba(225, 29, 72, 0.4)',
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
};
