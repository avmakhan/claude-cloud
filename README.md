# claude-cloud

Een voorbeeldwebsite gebouwd met [Astro](https://astro.build), klaar om te deployen naar Hostinger.

## Lokaal werken

Je hebt [Node.js](https://nodejs.org) 22 of nieuwer nodig.

```bash
npm install      # eenmalig: dependencies installeren
npm run dev      # ontwikkelserver op http://localhost:4321 (ververst automatisch)
npm run build    # de site bouwen naar de map dist/
npm run preview  # de gebouwde site lokaal bekijken
```

## Structuur

```
src/
├── consts.ts             ← sitenaam, e-mail en menu (pas hier aan)
├── layouts/Basis.astro   ← header, footer en <head> voor alle pagina's
├── components/           ← herbruikbare onderdelen (Header, Footer, Kaart)
├── pages/                ← elke file wordt een pagina (over.astro → /over/)
│   └── blog/             ← blogoverzicht en sjabloon voor blogposts
├── content/blog/         ← blogposts als Markdown-bestanden
└── styles/global.css     ← opmaak (werkt ook in donkere modus)
public/                   ← wordt ongewijzigd gekopieerd
├── .htaccess             ← HTTPS, caching en beveiligingsheaders voor Hostinger
├── robots.txt
└── favicon.svg
```

### Een blogpost toevoegen

Maak een bestand in `src/content/blog/`, bijvoorbeeld `nieuwe-post.md`:

```markdown
---
titel: 'Titel van de post'
beschrijving: 'Korte samenvatting'
datum: 2026-11-10
---

Je tekst hier.
```

## Deployen naar Hostinger

De GitHub Action in `.github/workflows/deploy.yml` bouwt de site bij elke push naar
`main` en zet het resultaat op de branch **`deploy`**. Hostinger haalt die branch binnen.

### Eenmalig instellen

1. **Domein aanpassen:** vervang `https://www.jouwdomein.nl` in `astro.config.mjs`
   en `public/robots.txt` door je eigen domein.
2. **Eerste build:** push naar `main` (of start de workflow handmatig onder *Actions*).
   Daarna bestaat de branch `deploy`.
3. **Hostinger koppelen:** in hPanel ga je naar *Websites → Beheren → Geavanceerd → Git*.
   - Repository: `https://github.com/avmakhan/claude-cloud.git`
     (of de SSH-URL bij een private repo; voeg dan de deploy key van Hostinger
     toe in GitHub onder *Settings → Deploy keys*).
   - Branch: `deploy`
   - Map: leeg laten, zodat de bestanden in `public_html` komen. Die map moet bij
     de eerste keer leeg zijn.
4. **Automatisch deployen:** zet in hPanel *Auto Deployment* aan en kopieer de
   webhook-URL. Voeg die in GitHub toe onder *Settings → Webhooks → Add webhook*,
   met als trigger *Just the push event*.
5. **SSL:** zet in hPanel onder *Beveiliging → SSL* het gratis certificaat aan.

Daarna geldt: push naar `main` → GitHub bouwt de site → Hostinger haalt de nieuwe versie op.
