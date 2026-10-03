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

## 5. Estructura de la página Hormonas (de arriba abajo)

1. **Hero** — degradado A. Columna izquierda: H1 de 2-3 líneas (Rubik 700, 48px, `#131313`), subtítulo, botón "Descargar guía gratuita". Columna derecha: foto con radio 20px y sombra.
2. **Intro** — párrafo centrado de 20px (Fredoka).
3. **Pildoras de síntomas** — 5 icon-box en fila (icono rosa + texto corto), con sombra suave.
4. **Caja "¿Qué vas a entender?"** — texto de intro y 4 viñetas con check en dos columnas.
5. **"¿Qué son las hormonas?"** — H2 centrado (ciruela). Texto a la izquierda, diagrama del sistema endocrino a la derecha.
6. **"¿Por qué se desregulan las hormonas?"** — H2 + subtítulo + 6 image-box en 3 columnas (ilustración, título, texto).
7. **"Síntomas de desequilibrio hormonal"** — H2 en mayúsculas + 2 listas con check en dos columnas.
8. **"Relación entre hormonas, energía y metabolismo"** — H2 en mayúsculas, párrafos, infografía grande a ancho completo y texto debajo.
9. **Frase de cierre** — "No es falta de fuerza de voluntad. Es regulación interna." (centrada).
10. **"Cómo equilibrar las hormonas de forma natural"** — H2 en mayúsculas + 5 pilares (icon-box) en fila.
11. **"Explora cada área clave"** — H2 + 4 tarjetas con foto redonda/cuadrada, título y texto, en 2 columnas.
12. **Banda CTA** — H2 + texto + botón. *Eliminada por decisión de la usuaria.*
13. **Banner Energía Femenina** — footer.

## 6. Qué hay que replicar en las madres

Todas las madres comparten el mismo esquema: hero con H1 + foto → intro → pildoras → bloque "qué es" con imagen → 6 tarjetas de causas (3 columnas) → síntomas con checks → relación con infografía → pilares/soluciones (fila de icon-box) → "explora" (4 tarjetas, 2 columnas) → relacionados (3 artículos, 3 columnas).

## 7. Pendiente de confirmar

- Tamaños exactos de los iconos ilustrados de cada tarjeta.
- Paddings internos exactos de cada tarjeta (aproximados con los valores de las cajas).
