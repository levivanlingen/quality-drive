# 🔍 Debug Production Performance - Quality Drive

## 📊 Stap 1: Chrome DevTools Network Analysis

### A. Basis Network Check

1. **Open Chrome DevTools** (F12)
2. **Network tab** → Refresh pagina
3. **Kijk naar:**

```
Name                           Size      Time    Waterfall
---------------------------------------------------------
quality-drive.nl              234 KB    1.2s    ████████
_next/static/chunks/...       145 KB    800ms   ████
source/Golf%20GTI.glb         1.2 MB    5.8s    ████████████████
source motor/kawasaki...      831 KB    3.2s    ██████████
```

### B. Specifieke Checks

**Filter op GLB bestanden:**
```
In filter box type: .glb
```

**Check deze headers voor ELKE .glb file:**

✅ **Goed:**
```
Status: 200 OK
Cache-Control: public, max-age=31536000, immutable
Content-Type: model/gltf-binary
Content-Length: 1200000 (1.2MB)
Transfer-Encoding: chunked (of gzip/br)
```

❌ **Slecht:**
```
Status: 200 OK (maar laadt traag)
Cache-Control: no-cache (PROBLEEM!)
Content-Encoding: (geen) → Niet gecomprimeerd!
Time: >5 seconds voor 1-2MB → Server/netwerk probleem
```

### C. Waterfall Analysis

**Kijk naar kleurcode:**
- **Grijs (Queueing)**: >1s = Te veel requests tegelijk
- **Oranje (Initial connection)**: >500ms = Server ver weg / slow
- **Groen (Waiting - TTFB)**: >2s = Server traag / processing
- **Blauw (Content Download)**: Normaal voor grote files

---

## 🎯 Stap 2: Performance Tab Analysis

### A. Record Page Load

1. **DevTools → Performance tab**
2. **Record** (rode knop)
3. **Refresh pagina**
4. **Stop recording** na 10 seconden

### B. Analyze Recording

**Kijk naar:**

```
Main Thread Activity:
├─ Scripting (Yellow) → >3s = JavaScript probleem
├─ Rendering (Purple) → >2s = CSS/animatie probleem
├─ Painting (Green) → >1s = GPU/render probleem
└─ Other (Grey)
```

**Specifiek zoeken:**
- Zoek naar "Long Tasks" (rode hoekjes) → >50ms
- Filter op "three" of "fiber" → 3D rendering time
- Kijk naar "Frames" → Dropped frames = lag

### C. Screenshots gedurende load

Enable: **⚙️ → Capture screenshots**

Dit toont **wanneer** de pagina traag wordt:
- Bij start?
- Na 3D models laden?
- Bij hover over cards?

---

## 🚀 Stap 3: Lighthouse Audit

### A. Run Lighthouse

1. **DevTools → Lighthouse tab**
2. **Mode:** Navigation
3. **Device:** Desktop én Mobile (beide testen!)
4. **Categories:** ✅ Performance
5. **Analyze page load**

### B. Check Scores

```
Performance: __ / 100

Metrics:
├─ First Contentful Paint (FCP): __s (target: <1.8s)
├─ Largest Contentful Paint (LCP): __s (target: <2.5s)
├─ Total Blocking Time (TBT): __ms (target: <200ms)
├─ Cumulative Layout Shift (CLS): __ (target: <0.1)
└─ Speed Index: __s (target: <3.4s)
```

### C. Diagnostics Section

Kijk naar **"Opportunities"** en **"Diagnostics"**:

**Common issues:**
```
❌ Serve static assets with efficient cache policy
   → Cache headers werken niet

❌ Reduce unused JavaScript
   → Three.js te groot

❌ Properly size images
   → Images niet geoptimaliseerd

❌ Minimize main-thread work
   → Te veel JavaScript/rendering

❌ Avoid large layout shifts
   → 3D cards veroorzaken CLS
```

---

## 🌐 Stap 4: Network Throttling Test

### A. Simuleer Slow Connection

1. **DevTools → Network tab**
2. **Throttling dropdown** → Selecteer:
   - "Slow 3G" (extreem traag)
   - "Fast 3G" (normaal mobiel)
   - "No throttling" (snel)

### B. Compare Times

```
Connection    | GLB Load Time | Total Page Load
-------------------------------------------------
No throttling | 2s           | 3s
Fast 3G       | 15s          | 20s      ← Verwacht
Slow 3G       | 45s          | 60s      ← Zeer traag

Als "No throttling" al traag is → Server probleem!
Als alleen 3G traag is → File size probleem (normaal)
```

---

## 🔥 Stap 5: Specifieke 3D Model Debug

### A. Three.js DevTools Extension

**Install:**
1. [Three.js DevTools Chrome Extension](https://chrome.google.com/webstore/detail/threejs-developer-tools/ebpnegggocnnhleeicgljbedjkganaek)
2. Open extension tijdens pagina load

**Check:**
- **Draw calls**: <100 = goed, >500 = slecht
- **Triangles**: <50k per model = goed
- **Textures**: Totale size <10MB
- **Programs**: <10 shaders

### B. Manual 3D Check in Console

Open DevTools Console en type:

```javascript
// Check hoeveel Canvas renderers actief zijn
document.querySelectorAll('canvas').length
// Expected: 3 (één per card)
// Als >3 → Memory leak!

// Check Three.js renderer info
const canvases = document.querySelectorAll('canvas');
canvases.forEach((canvas, i) => {
  console.log(`Canvas ${i}:`, canvas.width, 'x', canvas.height);
});

// Check if frameloop is working correctly
// In console tijdens niet-hovering:
// Should NOT see constant updates
```

### C. Monitor FPS

```javascript
// Paste in console:
let lastTime = performance.now();
let fps = 0;

function checkFPS() {
  const now = performance.now();
  fps = 1000 / (now - lastTime);
  lastTime = now;
  console.log('FPS:', Math.round(fps));
  requestAnimationFrame(checkFPS);
}

checkFPS();

// Expected:
// Idle (no hover): ~0-5 FPS (frameloop='demand')
// Hover: ~60 FPS (frameloop='always')
// If always 60 FPS → frameloop not working!
```

---

## 🏗️ Stap 6: Railway-Specifieke Checks

### A. Railway Deployment Logs

1. **Railway Dashboard** → Your project
2. **Deployments** → Latest deployment
3. **View logs**

**Kijk naar:**
```
✓ Build completed (check time: <5min?)
✓ Using Railpack builder (niet Nixpacks!)
✓ Server started on port 3000
✗ Warning: Memory usage high (upgrade plan?)
✗ Error: ECONNRESET (netwerk probleem)
```

### B. Railway Metrics

**Dashboard → Metrics tab:**

```
CPU Usage: __% (target: <70%)
Memory: __MB / __MB (target: <80%)
Network In: __MB
Network Out: __MB (als hoog → veel downloads)
```

**Probleem checks:**
- CPU >90% = Server overload
- Memory >90% = Out of memory risk
- Network Out hoog = Files niet cached

### C. Test Verschillende Regions

**Check je Railway region:**
1. Settings → Region
2. Probeer verschillende regions:
   - US East
   - EU West ← **Beste voor NL!**
   - Asia

**Test latency per region:**
```bash
# From terminal
ping <your-railway-url>

# Expected voor EU-West from NL:
64 bytes from ...: time=20-50ms  ← Goed!
64 bytes from ...: time=150ms+   ← Te ver weg
```

---

## 🌍 Stap 7: Real User Monitoring

### A. Google PageSpeed Insights

**Online tool (geen install nodig):**

1. Ga naar [pagespeed.web.dev](https://pagespeed.web.dev)
2. Enter: `https://quality-drive.nl`
3. **Analyze**

**Benefits:**
- Real-world data from actual users
- Mobile + Desktop scores
- Core Web Vitals
- Field data vs Lab data

### B. WebPageTest

**Detailed analysis:**

1. Ga naar [webpagetest.org](https://www.webpagetest.org)
2. Enter URL: `quality-drive.nl`
3. Test Location: Amsterdam (dichtst bij)
4. Browser: Chrome
5. **Start Test**

**Check:**
- **Waterfall chart**: Detailed timing
- **First View** vs **Repeat View**: Cache werkt?
- **Video**: Visual load progression
- **Connection View**: Server location

---

## 🎬 Stap 8: Specifieke Card Hover Debug

### A. Monitor tijdens Hover

Open console en paste:

```javascript
// Monitor hover performance
let isHovering = false;
const cards = document.querySelectorAll('[class*="serviceCard"]');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    console.time('Card Hover Animation');
    isHovering = true;

    // Check FPS drop
    let frameCount = 0;
    let startTime = performance.now();

    function checkPerf() {
      if (!isHovering) return;
      frameCount++;

      const elapsed = performance.now() - startTime;
      if (elapsed >= 1000) {
        console.log('FPS during hover:', frameCount);
        frameCount = 0;
        startTime = performance.now();
      }
      requestAnimationFrame(checkPerf);
    }
    checkPerf();
  });

  card.addEventListener('mouseleave', () => {
    console.timeEnd('Card Hover Animation');
    isHovering = false;
  });
});

console.log('Monitoring', cards.length, 'cards');
```

**Expected output:**
```
Card Hover Animation: 350ms     ← Card CSS animation
FPS during hover: 50-60         ← Good!
FPS during hover: 20-30         ← Probleem!
```

### B. Disable 3D to Test

```javascript
// Temporarily disable 3D rendering to isolate issue
document.querySelectorAll('canvas').forEach(c => c.style.display = 'none');

// Now hover over cards
// Still slow? → CSS probleem
// Fast? → 3D rendering probleem
```

---

## 📋 Stap 9: Checklist per Scenario

### Scenario A: Alles is traag

**Check:**
- [ ] Railway region = EU-West?
- [ ] Railway using Railpack (not Nixpacks)?
- [ ] Memory/CPU not maxed in Railway metrics?
- [ ] DNS pointing to correct Railway URL?
- [ ] No Cloudflare errors (523, 524)?

**Likely issue:** Server/infrastructure

---

### Scenario B: Alleen 3D models traag

**Check:**
- [ ] GLB files <2MB? (ls -lh public/source/*.glb)
- [ ] Draco compression enabled?
- [ ] Cache-Control headers present?
- [ ] Downloading from correct domain?
- [ ] Cloudflare cache hit rate >0%?

**Likely issue:** File size / caching / CDN

---

### Scenario C: Hover maakt alles vast

**Check:**
- [ ] Frameloop='demand' bij idle?
- [ ] CSS backdrop-filter niet te zwaar?
- [ ] Only 1 card animating at a time?
- [ ] Three.js draw calls <100?
- [ ] No memory leaks (check with Memory tab)?

**Likely issue:** Animations/rendering

---

### Scenario D: Eerste load traag, daarna snel

**Check:**
- [ ] Cache headers correct?
- [ ] Service Worker caching?
- [ ] Cloudflare CDN enabled?
- [ ] Preload niet werkend?

**Likely issue:** Caching (dit is eigenlijk normaal!)

---

## 🛠️ Stap 10: Quick Fixes to Test

### Test 1: Disable 3D completely

**Temporary edit in browser console:**
```javascript
// Hide all 3D cards
document.querySelectorAll('[class*="serviceIcon3D"]').forEach(el => {
  el.innerHTML = '<div style="font-size:60px">🚗</div>';
});

// Refresh and test
// Fast now? → 3D is the issue
```

### Test 2: Disable CSS animations

```javascript
// Disable all transforms
document.querySelectorAll('[class*="serviceCard"]').forEach(card => {
  card.style.transition = 'none';
  card.style.transform = 'none';
  card.style.backdropFilter = 'none';
});

// Hover now
// Fast now? → CSS animations issue
```

### Test 3: Use different environment

```javascript
// Check if running on Railway
console.log('Environment:', {
  host: window.location.host,
  userAgent: navigator.userAgent,
  connection: navigator.connection?.effectiveType
});
```

---

## 📊 Comparison Table

Na alle tests, vul dit in:

```
Metric                  | Dev (Replit) | Prod (Railway) | Target
------------------------------------------------------------------
Page Load Time          | __s          | __s            | <3s
Golf GTI GLB Load       | __s          | __s            | <1s
Kawasaki GLB Load       | __s          | __s            | <1s
FPS (idle)             | __fps        | __fps          | ~5fps
FPS (hover)            | __fps        | __fps          | 60fps
Lighthouse Score        | __/100       | __/100         | >90
First Contentful Paint  | __s          | __s            | <1.8s
Total Blocking Time     | __ms         | __ms           | <200ms
```

---

## 🎯 Beslissingsboom

```
Is ALLES traag?
├─ YES → Check Railway metrics/region/plan
└─ NO → Continue

Zijn alleen GLB files traag?
├─ YES → Check file sizes + caching + CDN
└─ NO → Continue

Is hover traag?
├─ YES → Check FPS + animations + backdrop-filter
└─ NO → Continue

Alleen eerste load traag?
├─ YES → Setup CDN (normaal gedrag)
└─ NO → Check all of the above
```

---

## 📞 Hulp Nodig?

**Share deze info:**
1. Screenshot van Network tab waterfall
2. Lighthouse score screenshot
3. Railway metrics screenshot
4. Console output van FPS check
5. Comparison table ingevuld

**Dan kan ik exact zien waar het probleem zit!** 🔍

---

## 🚀 Volgende Stappen

Na debugging:
1. **Probleem geïdentificeerd?** → Targeted fix
2. **Meerdere problemen?** → Prioriteer (biggest impact first)
3. **Niet duidelijk?** → Share debug results met mij

**Let's fix this!** 💪
