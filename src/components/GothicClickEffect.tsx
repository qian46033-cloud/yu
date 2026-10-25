import React, { useEffect, useState, useCallback } from 'react';
import { gothicAudio } from '../utils/audio';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

const GOTHIC_SYMBOLS = ['♱', '†', '‡', '🥀', '✦', '✧', '♰', 'ॱֺּ', '𓏽', '☾', '•'];
const COLORS = [
  '#f43f5e', // rose
  '#e11d48', // crimson
  '#fda4af', // pale pink rose
  '#e4e4e7', // silver zinc
  '#c5a059', // antique gold
  '#a855f7', // gothic purple
];

export const GothicClickEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    // Play subtle audio
    gothicAudio.playClickChime();

    let clientX = 0;
    let clientY = 0;
    if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const newParticles: Particle[] = [];
    const count = 6 + Math.floor(Math.random() * 4);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 3.5;
      newParticles.push({
        id: Date.now() + Math.random() * 1000,
        x: clientX,
        y: clientY,
        symbol: GOTHIC_SYMBOLS[Math.floor(Math.random() * GOTHIC_SYMBOLS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 11 + Math.random() * 14,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2, // slightly drift upward
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
      });
    }

    setParticles((prev) => [...prev.slice(-30), ...newParticles]);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [handlePointerDown]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.rotSpeed,
            opacity: p.opacity - 0.025,
            vy: p.vy + 0.05, // gravity
          }))
          .filter((p) => p.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(interval);
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            textShadow: `0 0 10px ${p.color}88`,
            userSelect: 'none',
          }}
          className="font-serif select-none"
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};
