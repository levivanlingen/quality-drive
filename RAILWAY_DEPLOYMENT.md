# Quality Drive - Railway Deployment Guide

## 🚀 Deployment naar Railway

### Stap 1: Railway Account
1. Ga naar [railway.app](https://railway.app)
2. Log in met GitHub
3. Klik op "New Project"

### Stap 2: Project Setup
1. Selecteer "Deploy from GitHub repo"
2. Kies de Quality Drive repository
3. Railway detecteert automatisch Next.js

### Stap 3: Environment Variables
Voeg deze environment variables toe in Railway dashboard:

```bash
GOOGLE_PLACES_API_KEY=your_google_places_api_key
NODE_ENV=production
```

**Hoe toe te voegen:**
1. Ga naar je project in Railway
2. Klik op "Variables" tab
3. Voeg elke variable toe

### Stap 4: Domain Setup
1. Ga naar "Settings" in Railway dashboard
2. Klik op "Generate Domain" voor een gratis railway.app domain
3. Of voeg een custom domain toe:
   - Klik op "Custom Domain"
   - Voer je domain in (bijv. quality-drive.nl)
   - Voeg de DNS records toe bij je domain provider:
     - **CNAME**: www → [generated-railway-domain]
     - **A Record**: @ → Railway IP

### Stap 5: Deployment
Railway start automatisch met deployen. Je kunt het proces volgen in:
- "Deployments" tab
- Build logs tonen de voortgang

### Stap 6: Google Places API Setup
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project of selecteer bestaand
3. Activeer de "Places API"
4. Maak API credentials (API key)
5. Voeg de API key toe als environment variable in Railway

## 🔧 Configuratie Bestanden

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10,
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev -p 5000 -H 0.0.0.0",
    "build": "next build && npm run postbuild",
    "postbuild": "next-sitemap",
    "start": "next start -p ${PORT:-5000} -H 0.0.0.0"
  }
}
```

## 📊 Deploy Status Checken

### Logs bekijken:
```bash
# In Railway dashboard:
1. Ga naar je project
2. Klik op "Deployments"
3. Selecteer de actieve deployment
4. Bekijk "Deploy Logs"
```

### Health Check:
Railway controleert automatisch of de app draait via `healthcheckPath: "/"`.

## 🔄 Automatische Deploys

Railway deployt automatisch wanneer je pusht naar de main branch:
```bash
git add .
git commit -m "Update website"
git push origin main
```

Railway detecteert de push en start een nieuwe deployment.

## 🛠️ Troubleshooting

### Build Failed
- Check de build logs in Railway
- Zorg dat alle dependencies in package.json staan
- Verifieer dat `npm run build` lokaal werkt

### App crasht na deployment
- Check de runtime logs in Railway
- Verifieer environment variables
- Controleer of PORT variable correct is

### 404 Errors
- Check next.config.ts redirects
- Verifieer dat alle routes correct zijn

### Afbeeldingen laden niet
- Check of `/public` directory correct is gecommit
- Verifieer Next.js image optimization settings

## 📱 Post-Deployment Checklist

- [ ] Website bereikbaar op Railway URL
- [ ] Custom domain geconfigureerd (indien van toepassing)
- [ ] SSL/HTTPS werkt
- [ ] Alle pagina's laden correct
- [ ] Afbeeldingen tonen correct
- [ ] Contact formulier werkt
- [ ] Google Places reviews laden
- [ ] Sitemap toegankelijk op /sitemap.xml
- [ ] robots.txt toegankelijk

## 💰 Railway Kosten

Railway heeft een gratis tier met:
- $5 gratis credits per maand
- Daarna $0.000231/GB-sec memory
- $0.000463/vCPU-sec

Voor een Next.js app als Quality Drive:
- Geschatte kosten: ~$5-10/maand voor laag traffic
- Kan schalen met gebruik

## 🔐 Security

Railway voorziet automatisch:
- HTTPS/SSL certificates
- DDoS protection
- Environment variable encryption

## 📞 Support

Railway support:
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/railwayapp/nixpacks/issues)

---

**Deployed by**: [levivl.nl](https://levivl.nl)
