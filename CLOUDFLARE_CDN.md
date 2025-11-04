# 🚀 Cloudflare CDN Setup voor Quality Drive op Railway

## Waarom Cloudflare CDN?

Railway heeft **GEEN ingebouwde CDN**. Dit betekent:
- 3D modellen (2MB) worden ELKE keer vanaf Railway server geladen
- Langzame laadtijden voor bezoekers ver van Railway server
- **Cloudflare CDN = 80-95% sneller voor static files!**

## ✅ Setup (Gratis!)

### Stap 1: Cloudflare Account
1. Ga naar [cloudflare.com](https://cloudflare.com)
2. Maak gratis account
3. Klik "Add a Site"
4. Voer je domain in: `quality-drive.nl`

### Stap 2: DNS Transfer
1. Cloudflare geeft je 2 nameservers:
   ```
   Example:
   austin.ns.cloudflare.com
   camila.ns.cloudflare.com
   ```
2. Ga naar je domain registrar (waar je quality-drive.nl hebt gekocht)
3. Verander nameservers naar Cloudflare's nameservers
4. Wacht 5-60 minuten voor propagatie

### Stap 3: DNS Records Setup
In Cloudflare dashboard → DNS → Records:

**Voor Railway deployment:**
```
Type: CNAME
Name: www
Content: [je-railway-app].up.railway.app
Proxy status: ✅ Proxied (oranje cloud)
```

**Root domain (@):**
```
Type: CNAME
Name: @
Content: [je-railway-app].up.railway.app
Proxy status: ✅ Proxied
```

**BELANGRIJK:** Oranje cloud = CDN enabled! 🎉

### Stap 4: Cache Rules (CRUCIAAL!)
Ga naar Cloudflare → Caching → Cache Rules → Create Rule

**Rule 1: Cache 3D Models**
```
Rule name: Cache GLB Models
When incoming requests match:
  - URI Path contains "/source"
  - File extension is "glb"

Then:
  - Cache eligibility: Eligible for cache
  - Edge TTL: 1 year
  - Browser TTL: 1 year
```

**Rule 2: Cache Static Assets**
```
Rule name: Cache Static Files
When incoming requests match:
  - URI Path starts with "/_next/static"
  OR
  - URI Path starts with "/uploads"

Then:
  - Cache eligibility: Eligible for cache
  - Edge TTL: 1 year
  - Browser TTL: 1 year
```

### Stap 5: Compression Settings
Ga naar Cloudflare → Speed → Optimization

**Enable:**
- ✅ Auto Minify → JavaScript, CSS
- ✅ Brotli compression
- ✅ Early Hints
- ✅ HTTP/2
- ✅ HTTP/3 (QUIC)

### Stap 6: Page Rules (Optional maar Recommended)
Ga naar Cloudflare → Rules → Page Rules

**Cache Everything:**
```
URL: quality-drive.nl/source*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year
```

## 📊 Verwachte Resultaten

| Metric | Zonder Cloudflare | Met Cloudflare | Verbetering |
|--------|------------------|----------------|-------------|
| **3D Model Load (eerste keer)** | 2-5 seconden | 2-5 seconden | - |
| **3D Model Load (cached)** | 2-5 seconden | 50-200ms | **95% sneller!** 🚀 |
| **Global Latency** | 100-500ms | 20-50ms | **90% sneller** |
| **Bandwidth kosten** | Hoog | 80% minder | 💰 |

## 🔧 Verificatie

### Test of CDN werkt:
```bash
# Check response headers
curl -I https://quality-drive.nl/source/2021%20Volkswagen%20Golf%20GTI.glb

# Kijk naar:
cf-cache-status: HIT  # = Cached door Cloudflare ✅
cf-cache-status: MISS # = Nog niet cached
cf-ray: [...]         # = Cloudflare is actief
```

### Browser DevTools:
1. Open Chrome DevTools (F12)
2. Network tab
3. Reload pagina
4. Klik op een GLB file
5. Kijk naar Headers:
   - `cf-cache-status: HIT` = Cloudflare cache hit! 🎉
   - `x-cache: HIT` = Extra confirmation

## 🎯 Extra Optimalisaties

### 1. **Cloudflare Rocket Loader** (Optional)
- Auto lazy-load JavaScript
- Kan Three.js vertraging veroorzaken
- **Test eerst!**

### 2. **Cloudflare Images** (Paid)
Voor `/uploads/*` images:
- Auto resize
- WebP/AVIF conversie
- $5/maand voor 100k images

### 3. **Cloudflare Workers** (Advanced)
Custom edge logic voor nog betere caching:
```javascript
// Example: Force cache GLB files
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Cache GLB files for 1 year
  if (url.pathname.endsWith('.glb')) {
    const cache = caches.default
    let response = await cache.match(request)

    if (!response) {
      response = await fetch(request)
      const headers = new Headers(response.headers)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      response = new Response(response.body, { headers })
      event.waitUntil(cache.put(request, response.clone()))
    }

    return response
  }

  return fetch(request)
}
```

## 🚨 Troubleshooting

### GLB files niet cached?
**Check:**
1. DNS record heeft oranje cloud (proxied)
2. Cache rules zijn correct ingesteld
3. Browser cache geleegd
4. Response headers tonen `cf-cache-status`

### Website werkt niet meer?
**Check:**
1. SSL/TLS mode: "Full" (niet "Flexible")
   - Cloudflare → SSL/TLS → Overview → Full
2. Railway HTTPS is enabled
3. DNS records kloppen

### Soms snel, soms traag?
**Dit is normaal:**
- Eerste request = MISS (traag)
- Volgende requests = HIT (super snel)
- Cache expireert na ingestelde tijd

## 💰 Kosten

**Cloudflare Free tier:**
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Basic DDoS protection
- ✅ SSL certificates
- ✅ Page Rules (3x)
- ✅ Cache Rules

**Pro tier** ($20/maand):
- Meer Cache Rules
- Beter analytics
- Image optimization
- Recommended voor production

## 📈 Monitoring

Cloudflare Dashboard → Analytics:
- **Requests**: Hoeveel traffic
- **Bandwidth**: Hoeveel data
- **Cache hit rate**: % requests from cache
  - **Target: >80% voor static files**

## ✅ Checklist

Na setup:
- [ ] DNS records op Cloudflare (proxied/oranje cloud)
- [ ] Cache rules ingesteld voor GLB files
- [ ] Cache rules ingesteld voor static assets
- [ ] Compression enabled
- [ ] SSL/TLS mode = Full
- [ ] Test: `cf-cache-status: HIT` in response headers
- [ ] Cache hit rate >80%

## 🎯 Resultaat

Met Cloudflare CDN:
- **3D modellen laden 95% sneller** (na eerste load)
- **Global visitors** ervaren snelle laadtijden
- **Railway bandwidth kosten** drastisch lager
- **Better SEO** door snellere site

---

**Need help?** Check [Cloudflare Docs](https://developers.cloudflare.com/cache/)
