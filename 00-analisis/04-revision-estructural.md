# Revisión estructural individual — 5 hubs + 18 subpáginas

Fecha: 2026-09-12
Método: scrape individual (markdown + HTML crudo + links) de las 23 páginas, sin asumir patrón repetido. Ninguna falló al cargar.

## Hallazgos transversales (en las 23 páginas, sin excepción)

1. **El grid final de "áreas/subcategorías/temas relacionados" nunca tiene enlace real.** Es siempre un widget decorativo de Elementor (imagen o emoji + título + texto) sin `<a href>`. No es un bug del scraper: confirmado en el HTML crudo. Si se quiere que sea navegable en la nueva web, hay que añadir el link — hoy no existe.
2. **16 de las 23 páginas no tienen ningún `<h1>` real.** El título del hero es un párrafo de texto, no un heading. Solo tienen H1 real: Hormonas, Menopausia, Ciclo Menstrual, Tiroides, Cortisol, Perimenopausia, Inflamación hormonal. Esto es relevante para SEO técnico al reconstruir.

## Hubs (5) — NO son todos iguales

- **Hormonas** (el que ya conocíamos a fondo) es la **excepción**, no la norma: grid final de 4 tarjetas (de sus 6 subpáginas reales, elige solo 4), y **no tiene** sección "Artículos relacionados".
- **Energía, Metabolismo, Microbiota, Mentalidad** comparten entre sí una variante distinta: grid final de **3** tarjetas (coincide 1:1 con sus 3 subpáginas cada uno), y sí tienen una sección adicional "Artículos relacionados" (3 tarjetas con link real a sus propias subpáginas) que Hormonas no tiene. Dentro de este grupo, además, el icono del grid es inconsistente: Metabolismo y Microbiota usan imagen, Energía y Mentalidad usan emoji.

→ Conclusión: hacen falta **al menos 2 variantes de plantilla de hub**, no 1.

## Subpáginas (18) — variación real, no solo de contenido sino de plantilla

- **3 de 18** (`ciclo-menstrual`, `tiroides`, y la propia `menopausia` de referencia) siguen el patrón completo con grid final "áreas clave relacionadas".
- **12 de 18** (`fatiga-cronica`, `sueno`, `rutinas-energeticas`, `perdida-grasa-femenina`, `resistencia-insulina`, `ayuno-intermitente-2`, `digestion`, `inflamacion-intestinal`, `probioticos-alimentacion`, `ansiedad-comida`, `estres-habitos`, `relacion-cuerpo-mujeres`) comparten el esqueleto genérico (intro, definición, grid de causas, síntomas, relación, soluciones, artículos relacionados) pero **sin** el grid final de áreas relacionadas, y con conteos inconsistentes de tarjetas/soluciones (algunas 5-6, otras 7-8) e iconografía mixta (emoji/imagen). Dos anomalías puntuales de contenido real detectadas: `resistencia-insulina` tiene la sección "Artículos relacionados" vacía (sin tarjetas), y `relacion-cuerpo-mujeres` tiene un heading de causa duplicado literalmente dos veces.
- **2 de 18 — desviación mayor** (`perimenopausia`, `cortisol`): no usan la composición de widgets estándar en absoluto. Es un único bloque de HTML/CSS a medida con: índice de salto ("Resumen clave"), texto en formato artículo largo, listas numeradas, bibliografía en texto plano sin links, y un elemento gráfico único cada una — `perimenopausia` tiene un **SVG dibujado a mano** (gráfico de niveles hormonales por década), `cortisol` tiene un **diagrama de flujo en CSS puro** (eje Hipotálamo-Hipófisis-Suprarrenal). No tienen grid de causas en tarjetas ni grid de áreas relacionadas.
- **1 de 18 — tercera variante** (`inflacion-hormonal`, slug interno real `sintomas-inflamacion-hormonal`): plantilla tipo "blog-post" con tabla de contenidos, sin grid de causas, un acordeón de Preguntas Frecuentes (5 preguntas), sección de conclusión, y 5 tarjetas de artículos relacionados en vez de 3.

→ Conclusión: hacen falta **al menos 2 variantes de plantilla de subpágina "estándar"** (con/sin grid de áreas) **+ 2 páginas totalmente a medida** (Perimenopausia, Cortisol) **+ 1 página con plantilla propia tipo blog-post** (Inflamación hormonal). En total, no hay una única "SubpageTemplate.astro" que sirva para las 18 — habría que forzarlas a un molde común (perdiendo el gráfico SVG, el diagrama CSS, el FAQ, la bibliografía...) o reconocer 3-4 plantillas distintas y replicarlas tal cual, que es lo fiel a "no rediseñar".

## Confirmación técnica adicional

- Los únicos enlaces reales en las subpáginas, aparte del contenido normal, son: la sección "Artículos relacionados" (a posts reales) + su paginación, y las 2 imágenes en lightbox de la sección "Relación con...".
- El material scrapeado completo (markdown, HTML, links, outline de widgets) quedó guardado por el agente en `CDN auto\.firecrawl\` (raw/md/html/links/outline) para auditoría si hace falta revisar el detalle de alguna página en concreto.

## Implicación práctica para Astro

Para una migración fiel (sin rediseñar), la arquitectura de plantillas correcta no es "1 HubTemplate + 1 SubpageTemplate" como se planteó en el mapa de migración inicial, sino algo así:

- `HubTemplateA.astro` — solo para Hormonas (grid final de 4, sin artículos relacionados).
- `HubTemplateB.astro` — Energía, Metabolismo, Microbiota, Mentalidad (grid final de 3 + artículos relacionados).
- `SubpageTemplateA.astro` — Ciclo Menstrual, Tiroides, Menopausia (con grid de áreas).
- `SubpageTemplateB.astro` — las otras 12 subpáginas "estándar" (sin grid de áreas).
- `SubpageInflamacionHormonal.astro` — página única con TOC + FAQ + conclusión (o generalizar como tercera variante si en el futuro se reutiliza).
- `Perimenopausia.astro` y `Cortisol.astro` — páginas completamente a medida, cada una con su elemento gráfico propio (SVG / diagrama CSS), no forzables a ninguna plantilla común sin perder contenido.

Esto no cambia ninguna URL ni la arquitectura pública — es una decisión interna de cuántos componentes .astro hacen falta para no perder fidelidad visual/estructural.
