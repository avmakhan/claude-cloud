// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Vervang dit door je eigen domein zodra je het op Hostinger koppelt.
export default defineConfig({
  site: 'https://www.jouwdomein.nl',
  integrations: [sitemap()],
  build: {
    // Elke pagina wordt een map met index.html, zodat URL's netjes zijn: /over/ in plaats van /over.html
    format: 'directory',
  },
});
