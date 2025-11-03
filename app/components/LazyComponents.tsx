'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect, useRef } from 'react';

// Lazy load 3D components with no SSR and loading state
export const LazyIntersectionObserver = ({ children, threshold = 0.1 }: {
  children: React.ReactNode;
  threshold?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : (
        <div style={{
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f3f3',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ marginBottom: '1rem' }}>🚗</div>
            <div>Laden...</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export lazy loaded components
export const LazyInfoCarousel = dynamic(() => import('./InfoCarousel'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px', background: '#f5f7fa', borderRadius: '24px' }} />
});

export const LazyGooglePlacesReviews = dynamic(() => import('./GooglePlacesReviews'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px', background: '#f5f7fa', borderRadius: '16px' }} />
});
