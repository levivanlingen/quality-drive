'use client';

import { useEffect, useState } from 'react';

interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: Review[];
  address: string;
}

interface GooglePlacesReviewsProps {
  placeId: string;
  maxReviews?: number;
  className?: string;
}

export default function GooglePlacesReviews({
  placeId,
  maxReviews = 5,
  className = ''
}: GooglePlacesReviewsProps) {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews?placeId=${placeId}`);

        if (!response.ok) {
          throw new Error('Fout bij ophalen van reviews');
        }

        const data = await response.json();
        setPlaceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Onbekende fout');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [placeId]);

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={star <= rating ? '#FFC107' : '#E0E0E0'}
          >
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
          </svg>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`reviews-container ${className}`}>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Reviews laden...</p>
        </div>
        <style jsx>{`
          .reviews-container {
            padding: 4rem 1rem;
          }
          .loading-state {
            text-align: center;
            padding: 3rem;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4285F4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`reviews-container ${className}`}>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <p className="error-hint">Controleer of de API key en Place ID correct zijn geconfigureerd.</p>
        </div>
        <style jsx>{`
          .reviews-container {
            padding: 4rem 1rem;
          }
          .error-state {
            text-align: center;
            padding: 3rem;
            color: #d32f2f;
          }
          .error-hint {
            margin-top: 1rem;
            color: #666;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    );
  }

  if (!placeData) {
    return null;
  }

  const displayedReviews = placeData.reviews.slice(0, maxReviews);

  return (
    <div className={`reviews-container ${className}`}>
      <div className="reviews-header">
        <h2>Wat onze klanten zeggen</h2>
        <div className="overall-rating">
          <div className="rating-score">
            <span className="score">{placeData.rating.toFixed(1)}</span>
            {renderStars(Math.round(placeData.rating))}
          </div>
          <p className="total-reviews">
            Gebaseerd op {placeData.totalReviews} reviews
          </p>
          <div className="google-badge">
            <svg width="92" height="30" viewBox="0 0 92 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.611 14.669v-3.819h12.84c.127.66.191 1.447.191 2.298 0 2.859-.784 6.395-3.31 8.92-2.462 2.525-5.61 3.873-9.721 3.873-7.689 0-14.151-6.268-14.151-13.956 0-7.689 6.462-13.957 14.15-13.957 4.367 0 7.498 1.716 9.848 3.937l-2.78 2.78c-1.684-1.575-3.96-2.801-7.069-2.801-5.773 0-10.286 4.659-10.286 10.04 0 5.382 4.513 10.041 10.286 10.041 3.746 0 5.879-1.507 7.246-2.874 1.11-1.11 1.839-2.698 2.125-4.867h-9.37v.385z" fill="#4285F4"/>
              <path d="M62.806 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.69 7.689 4.238 0 7.689-3.259 7.689-7.69 0-4.45-3.45-7.688-7.69-7.688zm0 12.333c-2.315 0-4.321-1.915-4.321-4.644 0-2.752 2.006-4.644 4.321-4.644 2.316 0 4.322 1.892 4.322 4.644 0 2.73-2.006 4.644-4.322 4.644z" fill="#EA4335"/>
              <path d="M80.427 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.689 7.689 4.239 0 7.69-3.259 7.69-7.69 0-4.45-3.451-7.688-7.69-7.688zm0 12.333c-2.315 0-4.321-1.915-4.321-4.644 0-2.752 2.006-4.644 4.321-4.644 2.316 0 4.322 1.892 4.322 4.644 0 2.73-2.006 4.644-4.322 4.644z" fill="#FBBC05"/>
              <path d="M47.255 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.689 7.689s7.689-3.259 7.689-7.69c0-4.45-3.45-7.688-7.689-7.688zm0 12.333c-2.316 0-4.321-1.915-4.321-4.644 0-2.752 2.005-4.644 4.321-4.644 2.315 0 4.321 1.892 4.321 4.644 0 2.73-2.006 4.644-4.321 4.644z" fill="#4285F4"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="reviews-grid">
        {displayedReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="author-photo"
              />
              <div className="author-info">
                <a
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-name"
                >
                  {review.author_name}
                </a>
                <span className="review-time">{review.relative_time_description}</span>
              </div>
            </div>
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <a
          href={`https://search.google.com/local/writereview?placeid=${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="write-review-btn"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
          </svg>
          Schrijf een review
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-btn"
        >
          Bekijk alle {placeData.totalReviews} reviews
        </a>
      </div>

      <style jsx>{`
        .reviews-container {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(to bottom, #f8f9fa, #ffffff);
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .reviews-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #1a1a1a;
        }

        .overall-rating {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
        }

        .rating-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .score {
          font-size: 3rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .total-reviews {
          color: #666;
          margin-bottom: 1rem;
        }

        .google-badge {
          display: flex;
          justify-content: center;
          opacity: 0.8;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .review-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .author-photo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
          transition: color 0.2s;
        }

        .author-name:hover {
          color: #4285F4;
        }

        .review-time {
          font-size: 0.875rem;
          color: #666;
        }

        .review-rating {
          margin-bottom: 1rem;
        }

        .review-text {
          color: #333;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .cta-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .write-review-btn,
        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .write-review-btn {
          background: #4285F4;
          color: white;
        }

        .write-review-btn:hover {
          background: #3367D6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
        }

        .write-review-btn svg {
          fill: #FFC107;
        }

        .view-all-btn {
          background: white;
          color: #4285F4;
          border: 2px solid #4285F4;
        }

        .view-all-btn:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .reviews-header h2 {
            font-size: 1.8rem;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
          }

          .score {
            font-size: 2.5rem;
          }

          .cta-section {
            flex-direction: column;
          }

          .write-review-btn,
          .view-all-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
