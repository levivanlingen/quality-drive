# Google Reviews Gratis Setup

## Stap 1: Vind je Place ID

1. Ga naar: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Zoek naar "Quality Drive" + je locatie
3. Kopieer de **Place ID** (bijvoorbeeld: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

## Stap 2A: Via Google Maps URL (Makkelijkste)

1. Ga naar Google Maps
2. Zoek je bedrijf "Quality Drive"
3. Kopieer de URL uit je browser (bijvoorbeeld: `https://www.google.com/maps/place/Quality+Drive/...`)
4. Gebruik de embed code hieronder

## Gebruik op je website

### Optie 1: Iframe Embed (100% Gratis)

Voeg dit toe aan je pagina:

```tsx
import GoogleReviewsEmbed from './components/GoogleReviewsEmbed';

// In je page component:
<GoogleReviewsEmbed
  placeId="JOUW_PLACE_ID_HIER"
  businessName="Quality Drive"
  location="Jouw Stad, Nederland"
/>
```

### Optie 2: Direct Google Maps Embed

Vervang in `GoogleReviewsEmbed.tsx` de `simpleEmbedUrl` met je eigen Google Maps embed code:

1. Ga naar Google Maps
2. Zoek je bedrijf
3. Klik op "Delen" > "Kaart insluiten"
4. Kopieer de iframe src URL
5. Plak deze in de component

### Optie 3: Google Review Link Widget

Gebruik het simpele component met alleen een link:

```tsx
import GoogleReviews from './components/GoogleReviews';

<GoogleReviews
  businessName="Quality Drive"
  location="Jouw Stad, Nederland"
/>
```

## Direct Link naar Review Schrijven

Om mensen direct naar je review pagina te sturen:

```
https://search.google.com/local/writereview?placeid=JOUW_PLACE_ID
```

## Voorbeeld Setup

Voor de homepage:

```tsx
// app/page.tsx
import GoogleReviewsEmbed from './components/GoogleReviewsEmbed';

export default function Home() {
  return (
    <main>
      {/* ... andere content ... */}

      <GoogleReviewsEmbed
        placeId="ChIJN1t_tDeuEmsRUsoyG83frY4"  // VERVANG DIT
        businessName="Quality Drive"
        location="Amsterdam, Netherlands"      // VERVANG DIT
      />

      {/* ... andere content ... */}
    </main>
  );
}
```

## Wat toont elk component?

- **GoogleReviewsEmbed**: Toont Google Maps met je locatie + reviews (interactive)
- **GoogleReviews**: Toont alleen een mooie badge met link naar je reviews

## Voordelen Gratis Methode

✅ Geen API key nodig
✅ Geen kosten
✅ Reviews blijven automatisch up-to-date
✅ Toont je locatie op de kaart
✅ Klanten kunnen direct reviews lezen
✅ Professionele uitstraling

## Nadelen

❌ Minder styling controle
❌ Google branding is zichtbaar
❌ Kan niet individuele reviews tonen
❌ Afhankelijk van Google's embed functionaliteit
