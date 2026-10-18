# Plantilla — Páginas hijas (subcategorías)

Validada el 2026-10-17 sobre **Fatiga crónica** (`src/pages/fatiga-cronica/index.astro`, página de referencia viva: copiarla para hacer una hija nueva). Medida con `getComputedStyle` contra https://clubdenutricion.es/fatiga-cronica/ y comparada con Ciclo menstrual: las dos hijas originales comparten el mismo esqueleto.

Layout: `SubpageTemplateB` (envuelve en `.hub`, la misma tipografía que las madres; ver `Páginas madre.md`, sección 1).

## Estructura (en este orden)

| # | Sección | Fondo | Componente | Detalles medidos |
|---|---|---|---|---|
| 1 | Hero lateral | degradado A | `Hero layout="lateral"` (lo pone la plantilla) | Texto a la izquierda (662px), foto cuadrada 418×418 a la derecha, radio 20px y sombra. **Con o sin titular**: Fatiga no tiene titular visible, la frase va como `<h1>` en Fredoka 500 26px/50px gris 79% (`heroTitleSize="frase"`); Ciclo menstrual sí tiene H1 Rubik 48px + subtítulo (valor por defecto). Línea antes del botón Fredoka 500 16px; botón Fredoka 500 18px. |
| 2 | Introducción | — | `<section class="intro">` | 5 párrafos Fredoka 22px/33px justificados. |
| 3 | Píldoras | — | `SolucionesList variant="pill"` | 5 píldoras, título Rubik 500 24px, icono 29px **del original** (`src/lib/iconos.ts`). |
| 4 | Pregunta destacada | — | `<p class="pregunta">` | Fredoka 400 27px `#6C2F50` centrada. |
| 5 | Texto + checklist | — | `<section class="intro lista">` + `ChecklistCard` | Texto Fredoka 20px justificado. Checklist `fa-check`: **1 columna** (Fatiga) o **2 columnas** (Ciclo). |
| 6 | ¿Qué es…? | degradado B | `TextoConImagen` | H2 a la izquierda y a todo el ancho; imagen flotando a la derecha bajo el H2 (50%) y el texto rodeándola: al acabar la imagen, el texto sigue a todo el ancho (pedido de la usuaria, 2026-10-17; igual en las madres). Texto 20px justificado. |
| 7 | Causas | — | `CausasGrid` | H2 centrado, frase (`subheading`) **debajo** del H2 a 22px justificada, 6 tarjetas: **ilustración de línea magenta estilo Ciclo menstrual** (241px), título Rubik 600 26px, texto 20px. |
| 8 | Párrafo de cierre | — | `<p class="parrafo-suelto">` | Fredoka 26px justificado. |
| 9 | Síntomas | degradado B | `<div class="full-bleed band-b"><section class="sintomas">` + `ChecklistCard icon="check-circle"` | Frase 22px justificada; viñetas en **1 columna** (Fatiga) o **2** (Ciclo). Frases simples o "Título: texto". |
| 10 | Relación con los sistemas hormonales y metabólicos | — | `RelacionImagenes` | 1er párrafo 24px/35px +1.3px; imagen; párrafos 20px; imagen; cierre 22px. |
| 11 | Soluciones | degradado B | `SolucionesList variant="card" band="b"` (`subheadingVariant="destacado" subheadingAlign="center"`) | 5 tarjetas 3 + 2 con icono 50px, título Rubik 500 24px, texto 20px. **Variante Ciclo**: 5 píldoras solo con título (`variant="pill"`). |
| 12 | Explora cada área (opcional) | — | `TemasRelacionadosGrid` (`SubpageTemplateA`) | Solo en algunas hijas (Ciclo menstrual: 4 tarjetas con foto 2×2). |
| 13 | Artículos relacionados | — | lo pone la plantilla | Fredoka 400 32px a la izquierda; títulos Rubik 600 21px. Siempre 3: primero los de la subcategoría y, si faltan, de su página madre (`pickRelacionados(..., 3, respaldo)`), como el original. |

La banda final "¿Sientes que tu energía sube y baja?" se elimina por decisión de la usuaria (igual que en las madres).

## Imágenes

- Hero: foto realista cuadrada (800×800).
- ¿Qué es…?: foto o infografía vertical.
- Causas: ilustraciones de línea magenta (`#C8407A`), sin relleno, fondo blanco, mujer + objetos del tema (referencia: `ciclo-menstrual/_images/icono-*.jpg`). 700×700.
- Relación: infografía horizontal + foto realista (1400×781).
- Generadas con el MCP de imágenes (perfil Proyecto) cuando no existen en el original.

## Variantes añadidas (Sueño y Rutinas energéticas, 2026-10-17)

- Hero: `heroTitleSize="frase-rubik"` (Rubik 500 32px/48px, Sueño) y `"frase-media"` (Fredoka 500 22px/33px, Rutinas), además de `"frase"` (Fatiga) y el titular normal.
- `CausasGrid` y `SolucionesList`: `subtitulo` / `subtituloLista` (H3 Rubik 500 26px #212121 a la izquierda) y `subheading` con varios párrafos (array).
- 8 causas → 2 + 3 + 3; 7 soluciones → 2 + 3 + 2; píldoras `layout5="2-3"`.
- Iconos raros del original (Open Iconic, Themify, Iconic, IcoMoon Brands…): se extraen los glifos de las fuentes que carga el WordPress (ver `src/lib/iconos.ts`).
- Las tarjetas de causas no llevan emoji en el título: lo sustituye la ilustración.

## Hero de las hijas: título + frase, estilo único (18 oct 2026)

Sustituye a la regla anterior del mismo día (nombre en negrita y mayúsculas dentro de la frase) y a los tamaños por página (`frase`, `frase-rubik`, `medida`…), que hacían que cada hija tuviera una tipografía distinta.

- **Título (`heroTitle`, el `<h1>`):** el **título SEO del original** de cada página (que ya empieza por el nombre de la página). Si está mal redactado, se corrige (p. ej. Resistencia a la insulina, Pérdida de grasa femenina, Probióticos). Se usa también como `seoTitle`.
- **Frase (`heroSubtitle`):** la frase explicativa del hero del original (en *tú*).
- **Meta descripción (`seoDescription`):** la del original.
- **Tipografía (`titleSize="hija"`, por defecto en `SubpageTemplateB`):** la del hero de Menopausia en el original. Título Rubik 700 48px/67.2px #131313; frase Fredoka 500 22px/33px gris al 79%, 38.5px hasta la línea de la guía. Margen de 40px arriba y abajo. En móvil, 28px y 18px.
- No se pasan tamaños por página.

## Lo que NO llevan las hijas (18 oct 2026)

Las páginas hijas se ciñen a las secciones de esta plantilla. **No llevan preguntas frecuentes ni bibliografía** aunque el original las tenga (Perimenopausia, Cortisol, Inflamación hormonal). Las preguntas frecuentes van en los **artículos del blog**, donde mejoran el SEO.

## Áreas clave relacionadas (18 oct 2026)

Entre Soluciones y Artículos relacionados (`areas` en `SubpageTemplateB`): 4 tarjetas con foto, título y texto, **sin enlace** hasta que exista el artículo del blog de cada área. Cada área es un tema de artículo.
