# 🔧 Railway Environment Variables Setup

## ✅ Verplichte Variabelen

In Railway Dashboard → Variables, voeg toe:

### **1. NODE_ENV**
```
NODE_ENV=production
```
**Belangrijk:** Enabled production optimalisaties

### **2. GOOGLE_PLACES_API_KEY** (als je Google Reviews gebruikt)
```
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
```
**Waar haal je deze?**
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak project → Enable "Places API"
3. Credentials → Create API Key
4. Copy & plak in Railway

---

## 🚀 Performance Variabelen (ZEER AANBEVOLEN)

### **3. NEXT_TELEMETRY_DISABLED**
```
NEXT_TELEMETRY_DISABLED=1
```
**Voordeel:** Scheelt bandwidth en privacy

### **4. NODE_OPTIONS** (Memory Optimization)
```
NODE_OPTIONS=--max-old-space-size=2048
```
**Voordeel:**
- Voorkomt out-of-memory crashes
- Optimale memory voor build
- **2048** = 2GB RAM (pas aan voor je Railway plan)

### **5. RAILWAY_STATIC_URL** (voor Static Files CDN)
```
RAILWAY_STATIC_URL=https://quality-drive.nl
```
**Voordeel:** Helpt met asset URLs

---

## 🎯 Railway Metal Variabelen (Nieuw!)

### **6. Enable Railway Metal**
In Railway Dashboard:
1. Settings → Metal Environment
2. Enable **"Use Railway Metal"** toggle
3. Select region closest to je users (bijv. EU-West)

**Voordelen:**
- 38% kleinere Docker images
- Snellere builds
- Betere caching
- 50% goedkoper egress vanaf Juli 2025

---

## 📦 Next.js Specifieke Variabelen

### **7. NEXT_SHARP_PATH** (Optional)
```
NEXT_SHARP_PATH=/tmp/node_modules/sharp
```
**Wanneer nodig:** Als je image optimization errors krijgt

### **8. NEXT_PUBLIC_API_URL** (als je een API hebt)
```
NEXT_PUBLIC_API_URL=https://quality-drive.nl/api
```

---

## 🔒 Security Variabelen (Recommended)

### **9. ALLOWED_HOSTS** (Optional maar goed)
```
ALLOWED_HOSTS=quality-drive.nl,www.quality-drive.nl
```

---

## 📊 Complete Setup Checklist

Kopieer deze in Railway Variables tab:

```env
# Required
NODE_ENV=production
GOOGLE_PLACES_API_KEY=your_key_here

# Performance
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=2048
RAILWAY_STATIC_URL=https://quality-drive.nl

# Optional
NEXT_SHARP_PATH=/tmp/node_modules/sharp
```

---

## 🎯 Railway Settings (Niet Variables!)

In Railway Dashboard → Settings:

### **Deployment Settings**
- ✅ **Builder:** RAILPACK (in railway.json)
- ✅ **Metal Environment:** Enabled
- ✅ **Region:** EU-West (dichtstbij Nederland)

### **Health Check**
- **Path:** `/`
- **Timeout:** 100s
- **Interval:** 30s

### **Resources** (afhankelijk van je plan)
**Minimaal Recommended:**
- **Memory:** 2GB
- **CPU:** 1 vCPU
- **Disk:** 10GB

**Optimaal:**
- **Memory:** 4GB
- **CPU:** 2 vCPU
- **Disk:** 20GB

---

## 🚀 Deploy Sequence

1. **Update railway.json** met RAILPACK builder
2. **Add environment variables** in Railway dashboard
3. **Enable Railway Metal** in settings
4. **Select EU-West region**
5. **Deploy!**

---

## 🔍 Verificatie na Deploy

### Check logs voor:
```
✓ Using Railpack builder
✓ Next.js build successful
✓ Server listening on port 3000
✓ No memory warnings
```

### Test website:
1. Open je Railway URL
2. Check browser DevTools → Network
3. Kijk naar 3D model load times
4. Should be **significant sneller** dan Nixpacks

---

## 📊 Verwachte Performance Verbetering

| Metric | Nixpacks | Railpack + Metal |
|--------|----------|------------------|
| **Build time** | 3-5 min | 2-3 min (-40%) |
| **Image size** | 1.2GB | 744MB (-38%) |
| **Memory usage** | Hoog | Optimaal |
| **3D Model load** | Traag | **Snel** ✅ |

---

## 🆘 Troubleshooting

### Build faalt?
**Check:**
1. `NODE_ENV=production` is set
2. All dependencies in package.json
3. Railway logs voor errors

### Website traag?
**Check:**
1. Railway Metal is enabled
2. Region = EU-West
3. Cloudflare CDN setup (zie CLOUDFLARE_CDN.md)
4. Memory limit is 2GB+

### Out of Memory?
**Fix:**
```
NODE_OPTIONS=--max-old-space-size=4096
```
(verhoog naar 4GB)

---

## 💰 Kosten Optimalisatie

Met Railway Metal (vanaf Juli 2025):
- **Egress:** $0.10/GB → $0.05/GB (-50%)
- **Disk:** $0.25/GB → $0.15/GB (-40%)
- **Savings:** ~$20-30/maand voor gemiddelde traffic

---

**Ready to deploy?**
1. Set deze variables
2. Enable Railway Metal
3. Push je code
4. Watch de magic happen! ✨
