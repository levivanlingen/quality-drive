# Google Places API Setup - Complete Handleiding

## Stap 1: Google Cloud Console Setup (5 minuten)

### 1.1 Maak een Google Cloud Project aan

1. Ga naar: https://console.cloud.google.com/
2. Klik rechtsboven op "Select a project" → "New Project"
3. Geef je project een naam: "Quality Drive Website"
4. Klik op "Create"

### 1.2 Enable Places API

1. Ga naar: https://console.cloud.google.com/apis/library
2. Zoek naar "Places API"
3. Klik op "Places API"
4. Klik op "Enable"

### 1.3 Maak een API Key aan

1. Ga naar: https://console.cloud.google.com/apis/credentials
2. Klik op "+ CREATE CREDENTIALS" → "API key"
3. Je API key wordt gegenereerd
4. **BELANGRIJK**: Klik op "RESTRICT KEY" voor beveiliging

### 1.4 Beveilig je API Key (BELANGRIJK!)

1. Bij "Application restrictions":
   - Kies "HTTP referrers (web sites)"
   - Voeg toe: `https://jouwdomain.com/*`
   - Voeg toe: `http://localhost:3000/*` (voor development)

2. Bij "API restrictions":
   - Kies "Restrict key"
   - Selecteer alleen: "Places API"

3. Klik op "Save"

## Stap 2: Vind je Place ID (2 minuten)

### Optie A: Via Place ID Finder (Makkelijkst)

1. Ga naar: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Zoek in het zoekveld naar "Quality Drive" + je locatie
3. Klik op je bedrijf in de resultaten
4. Kopieer de **Place ID** (begint meestal met "ChIJ...")

### Optie B: Via Google Maps URL

1. Ga naar Google Maps: https://maps.google.com
2. Zoek je bedrijf: "Quality Drive"
3. Kopieer de URL uit je browser
4. De Place ID zit in de URL na `!1s` (bijvoorbeeld: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

**Voorbeeld Place ID**: `ChIJN1t_tDeuEmsRUsoyG83frY4`

## Stap 3: Configureer je Website

### 3.1 Voeg API Key toe aan Environment Variables

1. Kopieer `.env.example` naar `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` en voeg je API key toe:
   ```
   GOOGLE_PLACES_API_KEY=AIzaSyD-xxxxxxxxxxxxxxxxxxxxxx
   ```

3. **BELANGRIJK**: Zorg dat `.env.local` in je `.gitignore` staat (staat er al standaard in Next.js)

### 3.2 Voeg het Component toe aan je Homepage

Open `app/page.tsx` en voeg het volgende toe:

```tsx
import GooglePlacesReviews from './components/GooglePlacesReviews';

export default function Home() {
  return (
    <main>
      {/* ... je bestaande content ... */}

      <GooglePlacesReviews
        placeId="ChIJN1t_tDeuEmsRUsoyG83frY4"  // VERVANG met jouw Place ID
        maxReviews={5}  // Aantal reviews om te tonen (optioneel, standaard 5)
      />

      {/* ... rest van je content ... */}
    </main>
  );
}
```

## Stap 4: Test je Implementatie

1. Start de development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Je zou nu je Google reviews moeten zien!

## Wat wordt er getoond?

✅ Gemiddelde rating (bijv. 4.8 sterren)
✅ Totaal aantal reviews
✅ De laatste 5 reviews (instelbaar) met:
  - Auteur naam en foto
  - Rating (sterren)
  - Review tekst
  - Datum
✅ Link om een review te schrijven
✅ Link om alle reviews te bekijken

## Kosten & Limieten

### Gratis Tier:
- **$200 gratis credit per maand** van Google
- 1 API request kost ongeveer $0.017
- Dit betekent: **~11,700 gratis requests per maand**
- Caching zorgt ervoor dat je maar 1x per uur een request doet

### Voorbeeld:
- 1000 bezoekers per dag = 1000 requests per dag (zonder cache)
- Met 1 uur cache: ~24 requests per dag
- **720 requests per maand = ~$12 → Ruim binnen gratis tier!**

## Troubleshooting

### "API key niet geconfigureerd"
- Controleer of `.env.local` bestaat
- Controleer of de variabele naam exact `GOOGLE_PLACES_API_KEY` is
- Herstart de development server na het toevoegen van env variables

### "INVALID_REQUEST" of "REQUEST_DENIED"
- Controleer of Places API enabled is in Cloud Console
- Controleer of je API key restrictions correct zijn
- Wacht 1-2 minuten na het enablen van de API

### Geen reviews zichtbaar
- Controleer of de Place ID correct is
- Sommige bedrijven hebben geen publieke reviews
- Check de browser console voor error messages

### Reviews worden niet ververst
- Reviews worden 1 uur gecached voor performance
- Verwijder de cache in Next.js: `rm -rf .next`

## Security Best Practices

✅ **DOE WEL**:
- API key in `.env.local` bewaren
- API key restrictions instellen in Cloud Console
- Alleen Places API toestaan voor deze key
- HTTP referrers restricties toevoegen

❌ **DOE NIET**:
- API key in je code hardcoden
- `.env.local` committen naar Git
- API key delen in public repositories
- API key zonder restrictions gebruiken

## Extra Features (Optioneel)

### Toon meer reviews
```tsx
<GooglePlacesReviews placeId="jouw_place_id" maxReviews={10} />
```

### Custom styling
```tsx
<GooglePlacesReviews
  placeId="jouw_place_id"
  className="my-custom-class"
/>
```

## Deploy naar Production

### Vercel (Aanbevolen)

1. Ga naar: https://vercel.com/
2. Import je repository
3. Voeg Environment Variable toe:
   - Name: `GOOGLE_PLACES_API_KEY`
   - Value: je API key
4. Deploy!

### Andere platforms

Voeg `GOOGLE_PLACES_API_KEY` toe aan je environment variables in:
- Netlify: Site settings → Environment variables
- Railway: Settings → Variables
- Cloudflare Pages: Settings → Environment variables

## Support

Problemen? Check:
- Google Cloud Console: https://console.cloud.google.com/
- Places API Docs: https://developers.google.com/maps/documentation/places/web-service
- Next.js Environment Variables: https://nextjs.org/docs/basic-features/environment-variables

## Klaar!

Je hebt nu een werkende Google Reviews integratie die:
- Gratis is (binnen $200/maand tier)
- Automatisch updates
- Mooi vormgegeven is
- Veilig is geconfigureerd

Veel succes met Quality Drive! 🚗✨
