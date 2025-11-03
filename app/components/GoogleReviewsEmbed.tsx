'use client';

interface GoogleReviewsEmbedProps {
  // Je kunt de Place ID vinden op: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  placeId?: string;
  // Of gebruik de bedrijfsnaam + locatie
  businessName?: string;
  location?: string;
  className?: string;
}

export default function GoogleReviewsEmbed({
  placeId,
  businessName = "Quality Drive",
  location = "Netherlands",
  className = ''
}: GoogleReviewsEmbedProps) {

  // Maak de embed URL
  // Als je een Place ID hebt, gebruik die. Anders gebruik de zoekquery.
  const embedUrl = placeId
    ? `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&zoom=15`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.123456789012!2d4.123456789012345!3d52.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDA3JzI0LjQiTiA0wrAwNycyNC40IkU!5e0!3m2!1snl!2snl!4v1234567890123!5m2!1snl!2snl`;

  // Voor nu maken we een zoek-based embed
  const searchQuery = encodeURIComponent(`${businessName} ${location}`);
  const simpleEmbedUrl = `https://www.google.com/maps?q=${searchQuery}&output=embed`;

  return (
    <div className={`google-reviews-embed ${className}`}>
      <div className="reviews-header">
        <h2>Wat onze klanten zeggen</h2>
        <p className="reviews-subtitle">Bekijk onze Google reviews en locatie</p>
      </div>

      <div className="embed-container">
        <iframe
          src={simpleEmbedUrl}
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Quality Drive Google Reviews"
        />
      </div>

      <div className="cta-section">
        <a
          href={`https://g.page/r/${placeId || 'YOUR_PLACE_ID'}/review`}
          target="_blank"
          rel="noopener noreferrer"
          className="write-review-btn"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
          </svg>
          Schrijf een review
        </a>
      </div>

      <style jsx>{`
        .google-reviews-embed {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 2rem;
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

        .embed-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .embed-container iframe {
          display: block;
        }

        .cta-section {
          text-align: center;
        }

        .write-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #4285F4;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s;
        }

        .write-review-btn:hover {
          background: #3367D6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
        }

        .write-review-btn svg {
          fill: #FFC107;
        }

        @media (max-width: 768px) {
          .reviews-header h2 {
            font-size: 1.8rem;
          }

          .embed-container {
            border-radius: 12px;
          }

          .embed-container iframe {
            height: 450px;
          }
        }
      `}</style>
    </div>
  );
}
