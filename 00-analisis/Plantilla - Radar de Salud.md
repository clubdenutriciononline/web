# Plantilla — Entradas de Radar de Salud

Medida el 18 oct 2026 en el original sobre "Aumentan las enfermedades digestivas y los expertos señalan a los ultraprocesados" (`/ultraprocesados-salud-digestiva-problemas-intestinales/`). Código: `src/layouts/RadarLayout.astro` y `src/lib/radar-html.ts`.

## Estructura

1. **Cabecera:** píldora "RADAR DE SALUD" a la izquierda (fondo lila rgb(232,158,255), radio 10px, Fredoka 20px) y el icono del radar (`mdi-radar` del original, rosa #F964C0, 50px) a la derecha.
2. **Titular:** Rubik 32px ciruela #6C2F50, centrado, **en negrita** (en el original va a 500; se pone en negrita a petición de la usuaria). Es el campo `titular` y, si no existe, `title`.
3. **Apartados**, cada uno en su caja (radio 20px, 40px entre cajas), **alternando fondo**: lila rgb(232,158,255) al 23% y malva rgb(172,110,193) al 15%.
   - Orden fijo: 🔬 Qué ha pasado · 🧠 Por qué importa · 🩺 Interpretación clínica · ⚡ Conclusión rápida.
   - Título del apartado: Rubik 26px ciruela, a la izquierda, en negrita.
   - Texto: Fredoka 20px/33px #212121, justificado.
4. **Nivel de evidencia:** una caja más, siguiendo la alternancia: "🔎 Nivel de evidencia: {emoji} {nivel}".
5. **Fuente** (izquierda) y **Fecha** (derecha) en la misma línea, Fredoka 14px gris claro rgb(170,167,167). Aquí **sí va la fecha**, porque son noticias fechadas. Se usa `fechaNoticia` (la fecha de la noticia) y, si no existe, `date`. Formato largo: "21 de junio de 2026". Si no hay fuente, el hueco queda vacío.
6. Botones de compartir centrados.
7. Artículos relacionados (otras entradas de Radar, más recientes primero), de 3 en 3 con paginación.

## Niveles de evidencia

Se elige uno por entrada en el campo `nivelEvidencia`:

| Nivel | Emoji | Cuándo usarlo |
|---|---|---|
| **Alto** | 🔬 | La información viene de un **estudio o una revisión publicados en una revista médica o científica de prestigio**, o de una institución de investigación reconocida (p. ej. Northwestern Medicine / Aging Cell). |
| **Medio** | 🧪 | Hay **varias fuentes coherentes** (prensa sanitaria, profesionales, organismos), pero **no un estudio médico concreto** detrás (p. ej. "Fuente: Varios"). |
| **Emergente** | 💭 | La información viene de un **blog, una web o una noticia poco relevante**, o es preliminar: puede ser interesante, pero aún no tiene respaldo sólido. |

## Campos de cada entrada (frontmatter)

- `title`: título de las tarjetas y del SEO.
- `titular` (opcional): titular visible, si es distinto del `title`.
- `date`: fecha de publicación. `fechaNoticia` (opcional): fecha que se muestra.
- `nivelEvidencia`: Alto · Medio · Emergente.
- `fuente`: texto libre (revista, institución, web o "Varios").
- Cuerpo en Markdown: un `### ` por apartado, con su emoji.
