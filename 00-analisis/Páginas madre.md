# Páginas madre — estructura de referencia

Fuente: clubdenutricion.es (WordPress + Elementor), página de referencia **/hormonas/**. Valores extraídos del HTML de Elementor y del CSS compilado del sitio original.

Páginas madre (mismo esquema): **Hormonas, Energía, Metabolismo, Microbiota, Mentalidad** y **Alimentación** (esta última en pausa).

---

## 1. Tipografía (global)

| Elemento | Fuente | Tamaño | Peso | Color |
|---|---|---|---|---|
| H1 (hero) | Rubik | 48px | 700 | `#131313` |
| H2 de sección | Rubik | 22px | 600 | `#6C2F50` (ciruela), centrado |
| H3 / títulos de tarjeta | Rubik | — | 600 | `#6C2F50` |
| Texto de cuerpo | **Fredoka** | 20px | 500 | `#212121` al 79% de opacidad |
| Botones | Fredoka | 18px | 500 | blanco sobre `#6C2F50` |

Nota: en el original, **los titulares van en Rubik y el cuerpo en Fredoka** (al revés que en la primera versión de Astro). Algunos H2 van en mayúsculas (p. ej. "¿QUÉ SON LAS HORMONAS?"), otros en tipo oración.

## 2. Colores de marca

- Ciruela (títulos H2, fondo de botones): `#6C2F50`
- Rosa (iconos, viñetas, acento): `#F964C0`
- Negro de titulares: `#131313`
- Texto de cuerpo: `#212121`

## 3. Fondos de sección

- **Degradado A** (hero y bandas altas): `linear-gradient(180deg, #FFE3FE69 0%, #ECDBF1 100%)`
- **Degradado B** (bandas intermedias): `linear-gradient(180deg, #E89EFF08 0%, #ECDBF1 100%)`
- **Banda sólida** (cierre): `#9A4DB10A`
- Separación vertical entre bandas: margen superior de 29px a 46px según sección.

## 4. Componentes de tarjeta

- **Icon-box (pildoras / pilares):** padding 10px, radio 10px, sombra `0 0 10px rgba(0,0,0,.5)`. Al pasar el ratón: radio 20px y sombra `5px 5px 10px rgba(0,0,0,.5)`. Icono en rosa `#F964C0`.
- **Image-box (tarjetas con foto/ilustración):** radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`, hover sombra `10px 10px 10px rgba(0,0,0,.5)`.
- **Imágenes sueltas (hero, diagramas):** radio 20px, misma sombra, ancho 73% del contenedor.
- **Listas con check (icon-list):** icono de 29px, margen izquierdo de 30px.
- **Botón:** fondo `#6C2F50`, texto blanco Fredoka 18px, radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`.

## 5. Hero: dos patrones reales (importante, confirmado 2026-10-17)

Hay **dos** layouts de hero distintos, no uno solo — comprobado al adaptar Energía:

- **"overlay" (4 de las 5 madres: Energía, Metabolismo, Microbiota, Mentalidad):** imagen a ancho completo, con una tarjeta de texto semitransparente (`background-color:#FFFFFF70`, radio 20px) superpuesta en la esquina inferior izquierda, lograda en el original con un `margin-top` negativo. **Es el valor por defecto de `Hero.astro`** (`layout="overlay"`).
- **"side" (solo Hormonas, la excepción):** columna de texto a la izquierda (H1, subtítulo, botón), foto a la derecha con radio 20px y sombra, sin superposición. `HubTemplateA` (exclusiva de Hormonas) pasa `layout="side"` explícitamente a `Hero`.

Al adaptar una madre nueva, **asumir "overlay" por defecto** y solo revisar si de verdad se parece más al hero de Hormonas (muy improbable, es la única así).

Resto del hero (igual en ambos patrones): H1 Rubio 700 48px `#131313`, subtítulo Fredoka 20px `#212121C9`, línea corta antes del botón ("Descubre cómo estabilizar tu energía, descarga la guía ahora:" — confirmado igual en Hormonas y Energía, probablemente igual en el resto), botón `#6C2F50` radio 20px sombra `5px 5px 10px rgba(0,0,0,.5)`, todo sobre el degradado A.

## 6. Receta de componentes validada (Hormonas + Energía)

Esta es la secuencia real de componentes compartidos tal como quedó tras la revisión visual de ambas páginas — usar `hormonas/index.astro` y `energia/index.astro` como plantilla viva para copiar y adaptar, no reinventar la estructura:

1. `Hero` (layout por defecto "overlay", ver arriba) — banda A incluida.
2. Intro: 1-5 párrafos sueltos centrados, 20-22px Fredoka. **Confirmar banda**: en Hormonas va sobre banda A (dentro del hero), en Energía no lleva banda — no asumir, hay que mirar el CSS del original o pedir confirmación visual.
3. `SolucionesList variant="pill"` — píldoras de síntomas (icono emoji + título corto, sin body). 5 items en ambas páginas vistas hasta ahora.
4. `ChecklistCard` — tarjeta blanca interactiva con viñetas check (columnas CSS, se reparten de arriba a abajo: 3+2 si hay 5 items, 2+2 si hay 4).
5. `TextoConImagen` — bloque "¿Qué es/son...?", banda B incluida en el propio componente.
6. `CausasGrid` — 6 tarjetas en 3 columnas. El párrafo introductorio va como prop `subheading` (aparece DESPUÉS del H2, no antes — error cometido una vez, confirmar siempre el orden real en el HTML).
7. `SolucionesList variant="card" band="b"` o `ListaSintomas` — síntomas. Qué componente exacto usa cada página varía; en Energía es `SolucionesList variant="card"` con emoji por item y banda B.
8. `RelacionImagenes` — imágenes intercaladas directamente en el slot (texto, imagen, texto, imagen, texto), nunca agrupadas en una rejilla al final. Sin banda.
9. `SolucionesList variant="card"` o `variant="pill"` — soluciones/pilares finales. **Si hay exactamente 5 items, comprobar si el original usa el patrón 3 arriba + 2 abajo** (`data-count='5'`, ya soportado en el componente) en vez de una rejilla pareja — confirmado en Energía, con degradado suave de fondo en las tarjetas.
10. `TemasRelacionadosGrid` — "Explora cada área" / "Temas relacionados". **Dos patrones reales, usar `temas.length` para distinguir** (ya soportado vía `data-count`): 3 tarjetas en una fila igual (la mayoría de los hubs tipo B), o 4 tarjetas en 2 filas con huecos a los lados, cada una ~32% del contenedor, no ~50% (solo Hormonas, caso confirmado).
11. `ArticulosRelacionados` — solo en los hubs tipo B (HubTemplateB), Hormonas no lo lleva.
12. Banda CTA final — *eliminada por decisión de la usuaria en todas las páginas.*

## 7. Pendiente de confirmar (por página, al adaptar cada una)

- Qué secciones llevan banda A/B y cuáles no — varía por página, siempre comprobar en el CSS compilado del original, no copiar de Hormonas a ciegas.
- Conteo real de causas/síntomas/pilares/temas (puede no ser 6/8/5/3-4).
- Si el bloque de síntomas usa `ListaSintomas` (check simple) o `SolucionesList variant="card"` (icono + título + texto) — ambos patrones existen.
- Tamaños exactos de los iconos ilustrados de cada tarjeta (aproximados).

## 8. Metabolismo — adaptada 2026-10-17 (variantes nuevas de la plantilla)

- **Hero sin titular**: el original no lleva H1 sino una frase larga en un text-editor (Rubik 26px/500 `#212121`, 24px en tablet — widget `b60edae`, CSS post-3580). A 48px desbordaba la imagen y tapaba el menú. Solución: `heroTitleSize="lead"` en `HubTemplateB` → `Hero titleSize="lead"` (sigue siendo `<h1>`). Usar en cualquier madre cuyo hero sea una frase y no un titular.
- **7 píldoras** de síntomas → 4 arriba + 3 abajo (`SolucionesList variant="pill"`, `data-count='7'`).
- **Iconos de fuente** (Font Awesome, MDI, IcoFont, Ionicons) → SVG inline del icono concreto (`icon: { svg }`). Corregido además que el tamaño del SVG no se aplicaba (faltaba `:global`, afectaba también a Inflamación hormonal).
- `ChecklistCard columns={1}` y items `{ title, text }` (título en negrita) para listas de una sola columna — checklist "¿Sabías que...?" y bloque de síntomas.
- `TextoConImagen` sin prop `image`: la infografía va intercalada en el slot, a ancho completo.
- `CausasGrid lead` / `SolucionesList lead`: pregunta en negrita entre el H2 y el subheading. `SolucionesList` admite un slot para el párrafo de cierre dentro de la banda.
- **5 soluciones en 2 arriba + 3 abajo** (`layout5="2-3"`), al revés que Energía (3+2).
