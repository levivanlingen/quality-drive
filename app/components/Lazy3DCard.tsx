'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Car3DCard = dynamic(() => import('./Car3DCard'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.1) 0%, rgba(193, 21, 23, 0.05) 100%)',
      borderRadius: '16px',
      minHeight: '180px'
    }}>
      <div style={{ textAlign: 'center', color: '#0065A6' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚗</div>
        <div style={{ fontSize: '0.9rem' }}>Laden...</div>
      </div>
    </div>
  ),
});

const Motor3DCard = dynamic(() => import('./Motor3DCard'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.1) 0%, rgba(193, 21, 23, 0.05) 100%)',
      borderRadius: '16px',
      minHeight: '180px'
    }}>
      <div style={{ textAlign: 'center', color: '#0065A6' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏍️</div>
        <div style={{ fontSize: '0.9rem' }}>Laden...</div>
      </div>
    </div>
  ),
});

interface Lazy3DCardProps {
  type: 'car' | 'motor';
  isHovered?: boolean;
}

export default function Lazy3DCard({ type, isHovered = false }: Lazy3DCardProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(true); // Changed to true to load immediately
  const [delayed3DHover, setDelayed3DHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load 3D immediately on mount
  useEffect(() => {
    setShouldLoad3D(true);
  }, []);

  // Delay 3D animation until card CSS animation is complete
  useEffect(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (isHovered && shouldLoad3D) {
      // Wait 350ms for card animation to complete before starting 3D animation
      hoverTimeoutRef.current = setTimeout(() => {
        setDelayed3DHover(true);
      }, 350);
    } else {
      // Immediately stop 3D animation when unhovered
      setDelayed3DHover(false);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered, shouldLoad3D]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {shouldLoad3D ? (
        type === 'car' ? (
          <Car3DCard isCardHovered={delayed3DHover} />
        ) : (
          <Motor3DCard isCardHovered={delayed3DHover} />
        )
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.1) 0%, rgba(193, 21, 23, 0.05) 100%)',
          borderRadius: '16px',
          minHeight: '180px',
          transition: 'opacity 0.3s ease'
        }}>
          <div style={{ textAlign: 'center', color: '#0065A6' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '0.5rem',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}>
              {type === 'car' ? '🚗' : '🏍️'}
            </div>
            {isHovered && !shouldLoad3D && (
              <div style={{ fontSize: '0.85rem', color: '#0065A6', marginTop: '0.5rem' }}>
                3D model laden...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
