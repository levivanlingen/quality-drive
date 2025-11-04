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
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [delayed3DHover, setDelayed3DHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Small delay to prevent loading all at once
          setTimeout(() => setShouldLoad(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Delay 3D animation until card CSS animation is complete
  useEffect(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (isHovered) {
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
  }, [isHovered]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {shouldLoad ? (
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
          minHeight: '180px'
        }}>
          <div style={{ textAlign: 'center', color: '#0065A6' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {type === 'car' ? '🚗' : '🏍️'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
