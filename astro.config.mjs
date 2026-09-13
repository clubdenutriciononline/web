// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://clubdenutricion.es',
  trailingSlash: 'always',
  redirects: {
    // El slug "-2" es un artefacto histórico de WordPress (slug duplicado).
    // Se corrige a la URL definitiva /alimentacion/ sin perder la URL antigua indexada.
    '/alimentacion-2/': '/alimentacion/',
  },
});
