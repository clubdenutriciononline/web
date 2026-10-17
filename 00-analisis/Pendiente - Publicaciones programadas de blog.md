# Pendiente — Publicaciones programadas del blog

Estado: **A FUTURO.** No empezar hasta terminar de arreglar los formatos de las páginas (madres, hijas, blog y radar).

## Objetivo

Poder crear varias entradas de blog (p. ej. 20) con fecha de publicación futura, de forma que se publiquen solas en su fecha sin tocar nada a mano.

## Situación actual

- El esquema de `blog` y `radar` ya tiene `date` y `draft` ([src/content.config.ts](../src/content.config.ts)).
- Ninguna lista ni página filtra por fecha. Todas usan `getCollection` y solo excluyen `draft: true`.
- Astro es estático: el filtro se evalúa al construir, no al llegar la fecha.

## Trabajo a realizar

1. **Helper de publicación.** Un único punto que devuelva solo entradas con `draft: false` y `date <= ahora`. Usarlo en: listado de blog, paginación, páginas de detalle (`getStaticPaths`), relacionados (`src/lib/relacionados.ts`), Radar y hubs. Así una entrada futura no tiene URL pública ni aparece en listados.
2. **Rebuild diario en la fecha.** GitHub Action programado (cron) que llama al Deploy Hook de Vercel. No depende del plan de Vercel.
3. **Script de validación.** Avisa de fechas duplicadas, de `draft: true` olvidados y de entradas con fecha pasada que aún no aparecen.
4. **Prueba.** Crear una entrada con fecha de mañana en una rama, comprobar que no aparece en el build de hoy y sí en el de mañana.

## Idea de temas: las tarjetas de soluciones (propuesta de la usuaria, 2026-10-17)

Cada tarjeta de **Soluciones** de las páginas hija (y madre) puede ser un artículo del blog que la desarrolle. Ejemplos de Alimentos:

- "Prioriza alimentos frescos" → cómo hacer una compra de alimentos frescos, cuáles elegir, de temporada, etc.
- "Aprende a leer etiquetas" → cómo leer las etiquetas de los alimentos.
- "Varía los colores del plato", "Incluye proteína de calidad", "Cocina más en casa" → un artículo cada una.

Repetir con todas las subpáginas: así sale un calendario de temas coherente con la web (unas 5 ideas por página).

**Enlace desde la tarjeta:** cuando el artículo esté publicado, la tarjeta de solución enlaza a él. Hace falta añadir un `href` opcional a los items de `SolucionesList` (variante `card`), que solo se muestre si el artículo ya está publicado (usar el mismo helper de publicación del punto 1, para no enlazar a entradas futuras). Refuerza el enlazado interno (SEO) y lleva al lector de la página de tema al artículo concreto.

## Decisiones pendientes

- ¿La fecha visible al lector es la de publicación programada?
- Las redes se programan en Metricool por separado. ¿Hay que coordinar la hora de la web con la de las redes?

## Coste y riesgo

- Unas dos horas de trabajo.
- Solo toca el repositorio y el proyecto de Vercel conectado a GitHub. No toca producción ni WordPress.
- Reversible: se quita el Action y el filtro.
