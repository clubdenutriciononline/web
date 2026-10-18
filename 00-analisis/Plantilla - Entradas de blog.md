# Plantilla — Entradas de blog

Decidida el 18 oct 2026 sobre la entrada de Fatiga crónica (`/fatiga-cronica-sintomas-causas/`). Se aplica a **todas** las entradas del blog que no son recetas (las recetas usan `RecipeLayout` y Radar de Salud `RadarLayout`). Código: `src/layouts/ArticleLayout.astro` y `src/lib/articulo-html.ts`.

## Estructura

1. **Hero de las hijas** (fondo degradado): título de la entrada, frase debajo (el primer párrafo del Markdown), línea y botón de la guía, e imagen de portada a la derecha.
2. **Miga de pan y fecha** en una línea discreta (Inicio › categoría madre › subcategoría · autor y fecha).
3. **Tabla de contenidos** (fondo blanco), con todos los H2. Se mantiene por SEO.
4. **Una sección por cada H2**, alternando fondo **degradado** (impares, empezando por la Introducción) y **blanco** (pares).
5. **Artículos relacionados** con las tarjetas de las hijas: primero la misma subcategoría y, si faltan, la misma categoría madre.
6. Navegación « anterior · siguiente ».

## Tipografía (la de las hijas)

- H2: Rubik 600 32px, ciruela #6C2F50, centrado.
- Subtítulo (el párrafo corto justo después del H2, sin punto final): Fredoka 24px/39px, 1.3px de espaciado, centrado.
- Texto y listas: Fredoka 20px/33px, justificado.
- H3: Rubik 500 24px, ciruela.
- Enlaces en ciruela.

## Bloques especiales (automáticos, según el título de la sección)

- **"Qué vas a aprender":** el texto va dentro de un recuadro blanco con sombra.
- **"Preguntas frecuentes":** cada párrafo que acaba en "?" pasa a ser un desplegable (`<details>`) con su respuesta. Las preguntas frecuentes van en los artículos, no en las páginas fijas.
- **Imágenes verticales:** la primera de cada sección sube junto al título y flota a la derecha, con el texto alrededor. Las horizontales van a todo el ancho.
- La primera letra de cada H2 se pone en mayúscula ("conclusión" → "Conclusión").

## Cómo escribir una entrada nueva para que encaje

- Primer párrafo: la frase del hero.
- Cada sección empieza con `## Título` y, en la línea siguiente, un subtítulo corto sin punto final.
- Preguntas frecuentes: `## Preguntas frecuentes` y, debajo, cada pregunta en su propio párrafo terminada en "?" seguida de la respuesta.
