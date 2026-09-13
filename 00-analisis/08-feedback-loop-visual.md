# Feedback loop visual — Fase 1 (layout global) + comparación selectiva

Fecha: 2026-09-13

## Método

1. Medición por análisis de píxeles (no a ojo) sobre las capturas de pantalla reales ya tomadas de clubdenutricion.es (Hormonas y Energía): para cientos de filas de cada imagen se detectó dónde el color deja de ser el del fondo, obteniendo el margen izquierdo/derecho real del contenido.
2. Corrección del sistema de layout global (`BaseLayout.astro`, `Header.astro`, `Footer.astro`, componentes compartidos).
3. Rebuild + redeploy en el mismo entorno temporal de Vercel.
4. Captura de pantalla fresca (sin caché) de la home y comparación visual directa contra el original.
5. Spot-check de un artículo de Blog real, que reveló un bug de contenido (no de diseño) corregido también en esta fase.

## 1. Cambios globales realizados

### Ancho de contenido
- **Medido**: ~1124-1140px (margen simétrico de ~397-399px sobre un viewport de 1920px, en dos páginas independientes — Hormonas y Energía).
- **Aplicado**: `--container-width: 1140px` en `BaseLayout.astro`, con `main { max-width: var(--container-width); margin-inline: auto; padding-inline: var(--container-padding) }`.
- Tu hipótesis inicial de 1240px quedaba por encima del valor real medido.

### Contenedor + fondos a ancho completo
- Header y Footer (fuera de `<main>`) ahora tienen su propio contenedor interno (`.site-header-inner`, `.footer-inner`) del mismo ancho, mientras el elemento exterior puede llevar fondo de ancho completo.
- Utilidad `.full-bleed` añadida para el patrón "fondo ancho completo + contenido acotado" (disponible para usar donde haga falta).

### Header
- **Antes**: sin fondo, icono de lupa suelto, nav en azul por defecto del navegador.
- **Ahora**: degradado verde claro de ancho completo (confirmado visualmente en el original), nav en naranja mayúsculas, buscador como input de texto + botón "Buscar" (en vez de solo un icono).

### Footer
- **Antes**: fondo blanco/transparente.
- **Ahora**: banda negra de ancho completo para redes/legales/copyright (confirmado en el original); el banner decorativo "Energía Femenina" queda fuera de esa banda, sobre fondo blanco, igual que en el original.

### Tipografía
- **Antes**: `system-ui` en todo el sitio.
- **Ahora**: Fredoka (titulares) y Rubik (cuerpo) — confirmadas porque el sitio original carga exactamente esas fuentes de Google Fonts.
- H2 de sección: mayúsculas, centrado, color de marca (rosa/magenta) — patrón confirmado en los hubs/subpáginas.

### Espaciado vertical
- Se normalizó el padding vertical de `Hero`, `TextoConImagen`, `CTAFinal` y la Home a una variable compartida `--space-section` (3rem escritorio / 2rem móvil), eliminando el padding horizontal redundante que ya aporta el contenedor global (antes cada componente añadía su propio `1rem` lateral encima del margen del contenedor, duplicando el espacio en los bordes).

### Fondo general
- Degradado suave rosa-claro → blanco en todo `<body>` (confirmado visualmente: el original no usa bandas de color por sección sino un degradado continuo de página).

## 2. Bug de contenido detectado y corregido (no es de diseño)

Al comparar un artículo de Blog real contra el original, se detectó que **29 de los 73 artículos** repetían el título y la imagen destacada al principio del cuerpo, duplicando lo que la plantilla ya renderiza desde el frontmatter. Corregido con un script que elimina esa duplicación solo cuando el encabezado inicial coincide (exacta o casi exactamente) con el título — sin tocar artículos cuyo primer encabezado es contenido genuino distinto. 27 archivos modificados, 64 líneas eliminadas, ninguna adición (cambio seguro, solo quita duplicados).

**Nota**: quedan casos no cubiertos por el criterio conservador (encabezado inicial con redacción distinta pero mismo tema que el título, ej. "Leptina: Funcionamiento y Significado para la Salud" vs. título "La Leptina: Descubriendo su Funcionamiento..."). No se tocaron para no arriesgar borrar contenido por error — revisable manualmente si se quiere una limpieza más agresiva.

## 3. Páginas comparadas visualmente

| # | Página | Capturado (original) | Capturado (Astro) | Revisado en detalle |
|---|---|---|---|---|
| 1 | Home | ✅ | ✅ (antes y después del fix) | ✅ Sí |
| 2 | Hormonas | ✅ (de un análisis previo) | ✅ | ✅ Sí |
| 3 | Energía | ✅ (de un análisis previo) | ✅ | Parcial (usado para la medición de ancho) |
| 4 | Metabolismo | ✅ | ✅ | No revisado visualmente todavía |
| 5 | Menopausia | ✅ | ✅ | No revisado visualmente todavía |
| 6 | Fatiga Crónica | ✅ | ✅ | No revisado visualmente todavía |
| 7 | Perimenopausia | ✅ | ✅ | No revisado visualmente todavía |
| 8 | Cortisol | ✅ | ✅ | No revisado visualmente todavía |
| 9 | Inflamación hormonal | ✅ | ✅ | No revisado visualmente todavía |
| 10 | Artículo de Blog (receta) | ✅ | ✅ | ✅ Sí (reveló el bug de duplicación) |
| 11 | Radar de Salud | ✅ | ✅ | No revisado visualmente todavía |

**Importante**: las 11 capturas del original y las 11 del sitio Astro (antes del último fix) ya están guardadas en `nueva web/.firecrawl/orig-*.png` y `new-*.png` — no hace falta volver a scrapear para revisar las 7 páginas pendientes, solo mirarlas.

## 4. Diferencias importantes detectadas

**Corregidas en esta fase:**
- Ancho de contenido (ver arriba).
- Header/Footer sin color de fondo.
- Tipografía genérica en vez de Fredoka/Rubik.
- H2 sin el patrón mayúsculas/centrado/color de marca.
- Espaciado vertical duplicado por padding horizontal redundante.
- Bug de contenido: título/imagen duplicados en 29 artículos.

**Detectadas pero NO corregidas todavía** (quedan pendientes, no son "layout global" sino diseño de componente):
- Tarjetas de "Últimas entradas"/Blog en el original llevan una etiqueta tipo *badge* rosa superpuesta sobre la imagen (ej. "HORMONAS"), y un pequeño icono circular (aguacate) debajo de la imagen — nuestras tarjetas solo muestran texto de categoría en color, sin badge ni icono.
- El H1 de la home usa varias palabras resaltadas en color naranja dentro del mismo titular ("equilibra tus hormonas... tu energía") — el nuestro es monocromo.
- El botón principal de la home ("Descargar guía gratuita") es morado/lila en el original, distinto del rosa que usamos en el resto de CTAs — no está claro si es una variante deliberada o inconsistencia del propio original.
- Los iconos de las tarjetas "¿Por qué se desregulan las hormonas?" son ilustraciones/fotos circulares en el original; usamos emoji.
- Colores exactos (verde del header, naranja del nav, rosa de los títulos) son aproximaciones visuales, no un muestreo de color preciso pixel a pixel.

## 5. Validación técnica

```
astro check  → 0 errores (tras cada uno de los 3 commits de esta fase)
astro build  → 130 páginas, 0 errores (tras cada uno de los 3 commits)
```

Todos los cambios están commiteados y pusheados a `master` en https://github.com/machangafactory/clubdenutricion-web. El deployment temporal de Vercel usado para las capturas puede haber caducado a estas alturas (duran ~1h sin reclamar) — hace falta un nuevo `vercel deploy --temporary` (o reclamar uno) para ver estos últimos cambios en vivo.

## 6. Siguiente paso sugerido

Con el sistema global ya mucho más fiel, lo lógico sería:
1. Redesplegar y revisar visualmente las 7 páginas capturadas pero aún no inspeccionadas (Metabolismo, Menopausia, Fatiga Crónica, Perimenopausia, Cortisol, Inflamación hormonal, Radar) — ya tengo las capturas, solo falta mirarlas.
2. Decidir si abordamos ya las diferencias de componente pendientes (badges de categoría, icono avatar, H1 multicolor, iconos ilustrados) como una fase de "pulido de componentes", o las dejamos para más adelante.
