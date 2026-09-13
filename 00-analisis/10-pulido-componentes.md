# Pulido de componentes — informe final de esta fase

Fecha: 2026-09-13

## 1. Qué se ha implementado

### Componentes compartidos nuevos/ampliados
- **`Callout.astro`** (nuevo): cajas de color lila/rosa/ámbar, aplicadas en Perimenopausia, Cortisol e Inflamación hormonal.
- **`NumberedList.astro`** (nuevo): listas con círculos numerados de color de marca, sustituye "1. 2. 3." de texto plano (Cortisol, Perimenopausia).
- **`SolucionesList.astro`** (ampliado): nueva variante `card` (tarjetas blancas con icono, grid) para Inflamación hormonal; icono ahora admite emoji, imagen real o SVG inline (`{ svg: string }`).
- **`ShareButtons.astro`** (rediseñado): iconos circulares de color en vez de texto plano (Radar de Salud).
- **`ArticulosRelacionados.astro`** (ampliado): badge de categoría superpuesto sobre la imagen + icono/avatar circular bajo la imagen — se propaga automáticamente a Home, los 4 hubs tipo B, las subpáginas tipo A y todos los artículos de Blog/Radar.
- **`CausasGrid.astro`**: icono ahora opcional (permite páginas donde el original genuinamente no tiene icono, sin forzar uno inventado).

### Iconos/ilustraciones reales recuperados (no emoji genérico)
Investigación página a página contra el HTML real de WordPress, con hallazgos que variaron según la página — **no se asumió un patrón único**:

| Familia | Resultado |
|---|---|
| **Hormonas** (hub + Menopausia + Ciclo Menstrual + Tiroides) | 34 tarjetas con imagen real recuperada — el original SÍ usa iconos ilustrados propios en toda esta familia |
| **Microbiota** (hub) | Imagen real completada para "Probióticos" (ya existía descargada, solo faltaba cablear) |
| **Energía, Metabolismo, Microbiota, Mentalidad** (subpáginas, 12 páginas) | El original NO usa imagen en estos grids — en la mayoría el emoji ya coincidía exactamente con el original (viene incrustado en el propio texto del título de WordPress). Sin cambios. |
| **Fatiga Crónica y Pérdida de Grasa Femenina** | El original no tiene icono NI emoji — el emoji que había era una adición de la migración, no del original. **Eliminado** para ser fiel. |
| **Home e Inflamación hormonal** | El original usa fuentes de iconos vectoriales (Font Awesome, Material Design Icons, IcoFont) — se reprodujeron los SVG oficiales inline, sin cargar librerías completas por 3-6 iconos. |

### Páginas específicas corregidas
- **Perimenopausia**: "Resumen clave" vuelve a ser un resumen factual con viñetas (no navegación con enlaces — error de la migración inicial); 4 frases destacadas en `Callout`; lista de soluciones con `NumberedList`; gráfico SVG mejorado (curvas de área rellena con leyenda, en vez de líneas simples).
- **Cortisol**: frases destacadas en `Callout` (rosa/ámbar); bloque "metabolismo" ahora es un grid de 4 tarjetas; causas/soluciones con `NumberedList`.
- **Inflamación hormonal**: añadido el encabezado "Conclusión" que faltaba (en el layout compartido `SubpageBlogPost.astro`, se propaga a cualquier página futura que lo use); "Soluciones" convertida a grid de tarjetas con icono real; "Qué vas a aprender" en `Callout`.
- **Home**: palabras destacadas en naranja en el H1 ("equilibra tus hormonas", "tu energía"); iconos reales (Font Awesome SVG) en el bloque "Un enfoque diferente".

## 2. Medición de altura de página — antes/después/original

Mismo método que en la ronda anterior (altura real de captura de pantalla, no estimación):

| Página | Original | Antes de esta fase | Después de esta fase |
|---|---|---|---|
| Home | 3060px | — | **89%** |
| Hormonas | 7929px | ~55-60%* | **64%** |
| Metabolismo | 14390px | 61% | 62% |
| Menopausia | 8916px | 57% | 60% |
| Fatiga Crónica | 9127px | 59% | 60% |
| Perimenopausia | 7800px | 98% | **102%** |
| Cortisol | 5617px | 108% | **119%** |
| Inflamación hormonal | 8383px | 70% | **83%** |
| Artículo de Blog | 4833px | — | 90% |
| Radar de Salud | 3175px | — | 88% |

*Hormonas no se había medido con precisión en la ronda anterior (comparación cualitativa únicamente).

**Lectura de los resultados**: los 3 páginas a medida (Perimenopausia, Cortisol, Inflamación hormonal) — donde se concentró el trabajo de callouts, grids y listas numeradas — pasaron de un rango 70-108% a 83-119%, es decir, ahora igualan o incluso superan ligeramente la altura del original. Las páginas de plantilla estándar (Hormonas, Metabolismo, Menopausia, Fatiga Crónica) mejoraron más modestamente (57-61% → 60-64%) porque esta ronda se centró en iconos, no en añadir callouts a esas plantillas — el hueco restante ahí se explica principalmente por la ausencia de cajas de color en `HubTemplateA/B` y `SubpageTemplateA/B` (no incluidas en el alcance de esta fase) y por diferencias de tamaño de imagen/espaciado fino.

## 3. Verificación técnica

```
astro check  → 0 errores (verificado tras cada lote de cambios)
astro build  → 129 páginas, 0 errores
```

Todo commiteado y pusheado a `master` (3 commits: componentes+páginas específicas, iconos reales, y este informe).

## 4. Deploy de pruebas

Deployment temporal anterior caducó sin reclamar (duran ~60 min). Se generó uno **nuevo**:

- **URL**: https://temporary-express-acacia-1p4svee.vercel.app
- **Reclamar** (evita que vuelva a caducar): https://vercel.com/claim-deployment?code=49716b30-087a-4a1f-9ed8-3814a4d7ca87

## 5. Pendiente para una siguiente pasada (no bloqueante)

- Añadir cajas `Callout` a los hubs y subpáginas estándar (`HubTemplateA/B`, `SubpageTemplateA/B`) donde el original las use — no se ha confirmado todavía si esas plantillas las tienen, habría que revisarlo específicamente.
- Los 12 casos donde el emoji ya coincide con el original podrían, si se quiere ir más allá de la fidelidad textual, convertirse igualmente en iconos ilustrados propios — pero eso sería un rediseño (el original no lo tiene así), no una corrección de fidelidad.
- Revisar visualmente las 7 páginas de esta ronda que no se inspeccionaron con captura ampliada (Home, Metabolismo, Menopausia, Fatiga Crónica, Blog, Radar) — se dispone de las capturas guardadas en `.firecrawl/final-*.png`, solo falta la revisión manual si se quiere más detalle.
