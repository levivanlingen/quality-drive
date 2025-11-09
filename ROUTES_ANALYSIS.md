# Routes Analyse Rapport

Gegenereerd op: 9-11-2025, 16:11:56

---

## Samenvatting

- **Totaal pagina's in database:** 62
- **Pagina's met routes:** 38
- **Pagina's ZONDER routes:** 24
- **Fysieke route bestanden:** 14

---

## ✅ Bestaande Routes (14)

1. `/about`
2. `/auto-pakketten`
3. `/autorijles`
4. `/blog/[slug]`
5. `/blog`
6. `/blog/page/[pageNum]`
7. `/contact`
8. `/motor-pakketten`
9. `/`
10. `/rijles-pakketten`
11. `/rijopleidingen`
12. `/rijschool/[city]`
13. `/taxi-rijles/[city]`
14. `/theorie`

---

## ❌ Pagina's Zonder Routes (24)

Deze pagina's staan in de database maar hebben geen route:

### Algemeen (6)

- **Actie** - `actie` - /actie
- **Algemene voorwaarden** - `algemene-voorwaarden` - /algemene-voorwaarden
- **Reviews** - `reviews` - /reviews
- **Team** - `team` - /team
- **Vacature** - `vacature` - /vacature
- **Veelgestelde Vragen** - `veelgestelde-vragen` - /veelgestelde-vragen

### Motorrijschool Steden (10)

- **Motorrijschool Delft** - `motorrijschool-delft` - /motorrijschool-delft
- **Motorrijschool Den Haag** - `motorrijschool-den-haag` - /motorrijschool-den-haag
- **Motorrijschool Lansingerland** - `motorrijschool-lansingerland` - /motorrijschool-lansingerland
- **Motorrijschool Leidschenveen** - `motorrijschool-leidschenveen` - /motorrijschool-leidschenveen
- **Motorrijschool Nootdorp** - `motorrijschool-nootdorp` - /motorrijschool-nootdorp
- **Motorrijschool Rijswijk** - `motorrijschool-rijswijk` - /motorrijschool-rijswijk
- **Motorrijschool Voorburg** - `motorrijschool-voorburg` - /motorrijschool-voorburg
- **Motorrijschool Wateringen** - `motorrijschool-wateringen` - /motorrijschool-wateringen
- **Motorrijschool Ypenburg** - `motorrijschool-ypenburg` - /motorrijschool-ypenburg
- **Motorrijschool Zoetermeer** - `motorrijschool-zoetermeer` - /motorrijschool-zoetermeer

### Motor Snelcursus (5)

- **Snel je motorrijbewijs Bergschenhoek** - `snel-je-motorrijbewijs-bergschenhoek` - /snel-je-motorrijbewijs-bergschenhoek
- **Snel je motorrijbewijs Berkel en Rodenrijs** - `snel-je-motorrijbewijs-berkel-en-rodenrijs` - /snel-je-motorrijbewijs-berkel-en-rodenrijs
- **Snel je motorrijbewijs Bleiswijk** - `snel-je-motorrijbewijs-delft` - /snel-je-motorrijbewijs-delft
- **Snel je motorrijbewijs Den Haag** - `snel-je-motorrijbewijs-den-haag` - /snel-je-motorrijbewijs-den-haag
- **Snel je motorrijbewijs Zoetermeer** - `snel-je-motorrijbewijs-zoetermeer` - /snel-je-motorrijbewijs-zoetermeer

### Overige (3)

- **Automaat rijles** - `automaat-rijles` - /automaat-rijles
- **Motorrijles** - `motorrijles` - /motorrijles
- **Taxi rijles** - `taxi-rijles` - /taxi-rijles

---

## 📋 Benodigde Acties

Om alle pagina's toegankelijk te maken, moeten de volgende routes aangemaakt worden:

1. **Motorrijles hoofdpagina** - `app/motorrijles/page.tsx`
2. **Automaat rijles hoofdpagina** - `app/automaat-rijles/page.tsx`
3. **Motor steden (dynamisch)** - `app/motor-rijles/[city]/page.tsx` of `app/motorrijschool/[city]/page.tsx`
5. **Statische pagina's** - Voor elke algemene pagina een aparte route

