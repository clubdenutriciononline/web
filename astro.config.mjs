// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Páginas sin valor SEO propio (agradecimiento/descarga de un funnel de
// captación) que no deben aparecer en el sitemap: no son contenido de
// búsqueda, y en el caso de /lm-5-pasos-descarga/ además exponen el paso
// final de un funnel que no interesa indexar.
const EXCLUDED_FROM_SITEMAP = ['/lm-5-pasos-optin/', '/lm-5-pasos-gracias/', '/lm-5-pasos-descarga/', '/suscripcion-lista-comunidad/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://clubdenutricion.es',
  trailingSlash: 'always',
  redirects: {
    // El slug "-2" es un artefacto histórico de WordPress (slug duplicado).
    // Se corrige a la URL definitiva /alimentacion/ sin perder la URL antigua indexada.
    '/alimentacion-2/': '/alimentacion/',
    // Contacto pasa a ser Quiénes somos (18 oct): el formulario se retira hasta
    // conectarlo; se mantiene la URL antigua.
    '/contacto/': '/quienes-somos/',
    // URLs antiguas de WordPress que aún enlazan entradas antiguas o webs
    // externas (revisión del 18 oct).
    '/mente/': '/mentalidad/',
    '/nutricion/': '/alimentacion/',
    '/nutricion/macronutrientes-y-micronutrientes/': '/macronutrientes-y-micronutrientes/',
    '/coach/contacto/': '/quienes-somos/',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        return !EXCLUDED_FROM_SITEMAP.includes(url.pathname);
      },
    }),
  ],
});
