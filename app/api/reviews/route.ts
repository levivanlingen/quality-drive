import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  // Haal API key uit environment variables
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API key niet geconfigureerd' },
      { status: 500 }
    );
  }

  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID is verplicht' },
      { status: 400 }
    );
  }

  try {
    // Google Places API - Place Details endpoint
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address,geometry&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache voor 1 uur
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Google Places API Response:', JSON.stringify(data, null, 2));

    if (data.status !== 'OK') {
      console.error('Google API Error:', data.status, data.error_message);
      return NextResponse.json(
        {
          error: `Google API status: ${data.status}`,
          message: data.error_message || 'Onbekende fout',
          details: data
        },
        { status: 400 }
      );
    }

    // Return de review data
    return NextResponse.json({
      name: data.result.name,
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
      address: data.result.formatted_address,
      location: data.result.geometry?.location
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Fout bij ophalen van reviews' },
      { status: 500 }
    );
  }
}
