'use client';

interface GoogleReviewsProps {
  businessName?: string;
  location?: string;
  className?: string;
}

export default function GoogleReviews({
  businessName = "Quality Drive",
  location = "Netherlands",
  className = ''
}: GoogleReviewsProps) {

  // Maak de Google search/maps URL voor de business
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(businessName + ' ' + location)}`;
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(businessName + ' ' + location)}`;

  return (
    <div className={`google-reviews-container ${className}`}>
      <div className="reviews-header">
        <h2>Wat onze klanten zeggen</h2>
        <p className="reviews-subtitle">Bekijk onze Google reviews</p>
      </div>

      <div className="reviews-content">
        {/* Google Reviews Badge/Link */}
        <div className="review-badge">
          <div className="google-logo-container">
            <svg width="92" height="30" viewBox="0 0 92 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.611 14.669v-3.819h12.84c.127.66.191 1.447.191 2.298 0 2.859-.784 6.395-3.31 8.92-2.462 2.525-5.61 3.873-9.721 3.873-7.689 0-14.151-6.268-14.151-13.956 0-7.689 6.462-13.957 14.15-13.957 4.367 0 7.498 1.716 9.848 3.937l-2.78 2.78c-1.684-1.575-3.96-2.801-7.069-2.801-5.773 0-10.286 4.659-10.286 10.04 0 5.382 4.513 10.041 10.286 10.041 3.746 0 5.879-1.507 7.246-2.874 1.11-1.11 1.839-2.698 2.125-4.867h-9.37v.385z" fill="#4285F4"/>
              <path d="M62.806 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.69 7.689 4.238 0 7.689-3.259 7.689-7.69 0-4.45-3.45-7.688-7.69-7.688zm0 12.333c-2.315 0-4.321-1.915-4.321-4.644 0-2.752 2.006-4.644 4.321-4.644 2.316 0 4.322 1.892 4.322 4.644 0 2.73-2.006 4.644-4.322 4.644z" fill="#EA4335"/>
              <path d="M80.427 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.689 7.689 4.239 0 7.69-3.259 7.69-7.69 0-4.45-3.451-7.688-7.69-7.688zm0 12.333c-2.315 0-4.321-1.915-4.321-4.644 0-2.752 2.006-4.644 4.321-4.644 2.316 0 4.322 1.892 4.322 4.644 0 2.73-2.006 4.644-4.322 4.644z" fill="#FBBC05"/>
              <path d="M47.255 10.15c-4.239 0-7.689 3.237-7.689 7.689 0 4.43 3.45 7.689 7.689 7.689s7.689-3.259 7.689-7.69c0-4.45-3.45-7.688-7.689-7.688zm0 12.333c-2.316 0-4.321-1.915-4.321-4.644 0-2.752 2.005-4.644 4.321-4.644 2.315 0 4.321 1.892 4.321 4.644 0 2.73-2.006 4.644-4.321 4.644z" fill="#4285F4"/>
            </svg>
          </div>

          <div className="rating-display">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 20 20" fill="#FFC107">
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                </svg>
              ))}
            </div>
            <p className="rating-text">Bekijk al onze reviews</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="review-actions">
          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="review-button primary"
          >
            <span>Bekijk Google Reviews</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z"/>
            </svg>
          </a>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="review-button secondary"
          >
            <span>Schrijf een review</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .google-reviews-container {
          padding: 4rem 1rem;
          background: linear-gradient(to bottom, #f8f9fa, #ffffff);
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .reviews-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .reviews-subtitle {
          font-size: 1.1rem;
          color: #666;
        }

        .reviews-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
        }

        .review-badge {
          text-align: center;
          margin-bottom: 2rem;
        }

        .google-logo-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .rating-display {
          margin-top: 1rem;
        }

        .stars {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .rating-text {
          color: #666;
          font-size: 1rem;
        }

        .review-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .review-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .review-button.primary {
          background: #4285F4;
          color: white;
        }

        .review-button.primary:hover {
          background: #3367D6;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(66, 133, 244, 0.3);
        }

        .review-button.secondary {
          background: white;
          color: #4285F4;
          border: 2px solid #4285F4;
        }

        .review-button.secondary:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .reviews-header h2 {
            font-size: 1.8rem;
          }

          .reviews-content {
            padding: 2rem 1.5rem;
          }

          .review-actions {
            flex-direction: column;
          }

          .review-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
