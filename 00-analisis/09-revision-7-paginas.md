# Revisión de las 7 páginas pendientes — informe por categorías

Fecha: 2026-09-13
Método: captura fresca (sin caché) de Metabolismo, Menopausia, Fatiga Crónica, Perimenopausia, Cortisol, Inflamación hormonal y un Radar de Salud en el deploy de Vercel, comparadas visualmente contra las capturas reales de WordPress ya tomadas.

## 1. Diferencias globales que quedan

- **Altura de página muy distinta en las páginas de plantilla estándar** (Metabolismo 61%, Menopausia 57%, Fatiga Crónica 59%, Inflamación hormonal 70% de la altura original). Investigado en detalle en Fatiga Crónica: el contenido está completo, la diferencia se explica principalmente por los **iconos ilustrados/fotográficos circulares** del original (más grandes, más padding) frente a nuestros emoji planos — no por contenido faltante. Confirma que el pendiente de "iconos de causas" (ya identificado, aún no corregido) tiene más impacto visual del que parecía.
- **Cajas de color destacado ("callout boxes") ausentes de forma sistemática**: el original usa recuadros redondeados de color (lila/rosa/ámbar) para resaltar frases clave dentro del cuerpo de texto — visto en Perimenopausia (4 cajas), Cortisol (5 cajas incluida una de aviso en ámbar) e Inflamación hormonal ("Qué vas a aprender"). En Astro estas frases se renderizan como párrafo plano sin ningún estilo. Es un patrón repetido en varias plantillas, candidato a un componente compartido (`Callout.astro`) en vez de arreglarlo página por página.
- **Grids de tarjetas con fondo de color para sub-bloques** (ej. "Cómo afecta el cortisol al peso" en Cortisol, "Soluciones" en Inflamación hormonal) se están renderizando como texto plano en columna en vez de tarjetas en grid — mismo patrón que el punto anterior, mismo candidato a componente compartido.

## 2. Diferencias específicas de un template (no de componente compartido)

- **Perimenopausia** — el bloque "Resumen clave" está implementado como una caja de **enlaces de navegación** (usando `TableOfContents.astro`, igual que Cortisol), pero en el original real de Perimenopausia el "Resumen clave" es un **resumen factual con 4-5 viñetas con check**, no enlaces. Es correcto en Cortisol (que sí usa enlaces de navegación reales) pero incorrecto en Perimenopausia — un error de contenido específico de esta página, no del componente `TableOfContents` en sí.
- **Inflamación hormonal**:
  - Falta el encabezado "CONCLUSIÓN" antes del párrafo de cierre (el párrafo está, pero sin el H2 que lo introduce en el original).
  - La sección "Soluciones" en el original es un grid de 6 tarjetas con icono; en Astro es una lista vertical de encabezados+párrafo sin grid ni tarjetas.
  - La "Tabla de contenidos" real del original es un widget colapsable con ~10 entradas (incluye las 5 preguntas del FAQ como sub-lista numerada); la nuestra es una lista fija de 4 enlaces, simplificación ya conocida y documentada, no nueva.
- **Radar de Salud**: el conteo de "Artículos relacionados" (corregido de 4 a 5 en esta ronda) y las 4 secciones sin caja de color (ver punto 1) son específicos de esta plantilla.

## 3. Errores de contenido (bugs reales, no solo estética)

Todos corregidos ya en esta ronda:

1. **Menopausia, Ciclo Menstrual, Tiroides**: el grid "Áreas clave relacionadas" mostraba literalmente el texto de la ruta de archivo (`/images/osteoporosis.jpg`, `/images/corazon.jpg`...) en pantalla, en vez de un icono — quedó el valor de placeholder original sin sustituir por contenido real. **Corregido** con emoji.
2. **Bug de arquitectura**: existía una entrada duplicada en la content collection `blog` (`sintomas-inflamacion-hormonal`) con el mismo contenido que ya sirve correctamente la página especial `/inflamacion-hormonal/`. Generaba una **URL extra no planeada** (`/sintomas-inflamacion-hormonal/`) fuera del mapa de migración original, y explica también por qué una imagen de Inflamación hormonal se veía con un icono roto (colisión de nombre de asset entre las dos copias del mismo contenido). **Eliminada** la entrada duplicada — 130 → 129 páginas.
3. **Radar**: "Artículos relacionados" mostraba 4 tarjetas en vez de 5. **Corregido** (slice global de 4→5 para Radar en la ruta dinámica `[slug]/index.astro`).
4. **Radar**: una tarjeta de "artículos relacionados" se ve como un bloque negro — no es un bug nuevo, es el placeholder de 1x1 px ya documentado (la única publicación de Radar sin imagen destacada real en el original).

## 4. Pendientes puramente estéticos (no bloqueantes, para después)

- Iconos ilustrados/fotográficos en vez de emoji (causas, síntomas, subcategorías) — impacto visual mayor de lo esperado, ver punto 1.
- Cajas de color ("callouts") ausentes — candidato a componente compartido `Callout.astro`.
- Grids de tarjetas con color de fondo para sub-bloques (Cortisol "peso y metabolismo", Inflamación hormonal "soluciones").
- Números circulares con color de marca en listas numeradas (Cortisol "causas"/"soluciones") — hoy son números planos "1. 2. 3.".
- Gráfico de Perimenopausia: el original usa un área/curva suave con leyenda; el nuestro es una polilínea simple — funcional pero menos pulido.
- Botones de compartir del Radar sin estilo (texto plano en vez de iconos circulares de color).
- Ya identificados en la ronda anterior y aún pendientes: badges de categoría sobre imágenes de tarjetas, icono circular tipo avatar en tarjetas de blog, H1 multicolor de la Home.

## Validación técnica tras esta ronda

```
astro check  → 0 errores
astro build  → 129 páginas, 0 errores (antes 130 — eliminada la URL duplicada)
```

Todo commiteado y pusheado a `master`. Pendiente: redeploy en Vercel para ver estos últimos cambios en vivo (el deployment temporal usado para las capturas de esta ronda puede haber caducado).
