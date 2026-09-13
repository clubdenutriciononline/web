# Auditoría completa (Fases 2A-2M) — informe final

Fecha: 2026-09-13
Deploy de pruebas verificado: https://temporary-express-acacia-1p4svee.vercel.app
Reclamar: https://vercel.com/claim-deployment?code=49716b30-087a-4a1f-9ed8-3814a4d7ca87

---

## 1. Visual

**Callouts (Fase 2A)**: investigado contra el HTML real — confirmado que las cajas de color (lila/rosa/ámbar) son exclusivas de las 3 páginas a medida (Perimenopausia, Cortisol, Inflamación hormonal), ya implementadas en la fase anterior. Los hubs y subpáginas estándar usan **texto plano en cursiva/centrado** para sus frases destacadas (ej. "El cuerpo no falla. Se adapta." en Hormonas es un `<p>` normal sin caja), no cajas de color — confirmado en el HTML fuente. **No se ha añadido ningún Callout artificial** donde el original no lo tiene.

**Diferencias importantes que quedan** (documentadas, no bloqueantes):
- Las plantillas estándar de hub/subpágina (Hormonas, Metabolismo, Menopausia, Fatiga Crónica, etc.) siguen siendo entre un 60-64% de la altura del original — explicado en la fase anterior: el original usa iconos ilustrados más grandes con más padding, no contenido faltante.
- Badges de categoría sobre imagen y avatar circular en tarjetas: implementados de forma genérica (fase anterior); no se ha hecho un muestreo de color exacto pixel a pixel del original (fuera del criterio de prioridad que marcaste).
- Imágenes OG específicas por hub/subpágina: hoy usan el logo como fallback; sería mejor una imagen propia por página, pero no es un error, es una mejora futura.

## 2. Navegación

**Auditado**: todos los `href` internos de `src/pages/**/*.astro`, el menú principal y submenús (`src/data/navigation.ts`), footer, breadcrumbs, artículos relacionados, prev/next, enlaces del Radar, temas relacionados, lead magnet y contacto.

**Corregido**: nada — no se encontró ningún enlace roto, ninguna referencia residual a `/alimentacion-2/`, ninguna URL absoluta innecesaria al propio dominio, ni inconsistencias de barra final.

**Requiere tu decisión**: `/ayuno-intermitente-2/` tiene el mismo patrón de sufijo histórico de WordPress que tenía `/alimentacion-2/` (slug duplicado nunca renombrado), pero a diferencia de aquella, **nunca se decidió corregirla** — no tiene redirect ni URL definitiva acordada. No se ha tocado. Si quieres, puedo aplicarle el mismo tratamiento (`/ayuno-intermitente/` + redirect 301) en cuanto lo confirmes.

## 3. Contenido

**Auditados los 81 artículos/publicaciones (72 Blog + 9 Radar)** uno a uno. Corregido:
- **13 artículos**: eliminado un widget "Tabla de contenidos" de Elementor que quedó filtrado como texto en el cuerpo, con enlaces a anclas (`#elementor-toc__heading-anchor-N`) que no existen en Astro.
- **6 artículos**: un `<h1>` suelto en el cuerpo (debería ser `<h2>`, ya que el H1 lo pone la plantilla) corregido.
- **1 artículo** (`propiedades-de-la-pina-tropical`): título duplicado residual eliminado (mismo patrón que los 29 ya corregidos en la fase de migración).
- **2 artículos**: imágenes de carrusel/afiliado repetidas por error de scraping, eliminada la repetición.
- **1 artículo** (`receta-salmon-al-horno-con-esparragos`): encabezado de cierre duplicado sin contenido debajo, eliminado.

**Verificado sin problemas**: cero placeholders/TODO/Lorem ipsum, cero HTML escapado, cero rutas de imagen visibles como texto, cero enlaces vacíos, cero mezcla de contenido Blog/Radar.

**Nota**: el recuento real de artículos de Blog es **72**, no 73 (el que se había contado de más era `sintomas-inflamacion-hormonal`, identificado y eliminado como duplicado arquitectónico en una fase anterior — el recuento actual de 72+9=81 es el correcto y definitivo).

## 4. SEO

**Comprobado y corregido**:
- Meta robots explícito (`index, follow`) añadido — antes no existía.
- Twitter Card completada (faltaban `twitter:title/description/image`).
- Fallback de `og:image`/`twitter:image` al logo real cuando una página no pasa imagen propia (antes quedaban vacíos en hubs/subpáginas).
- **Sitemap** (`@astrojs/sitemap`) instalado y configurado — no existía. Excluye `/lm-5-pasos-descarga/` y `/suscripcion-lista-comunidad/` (sin valor SEO propio). Verificado en vivo.
- **robots.txt** creado — no existía. Verificado en vivo.
- **JSON-LD** añadido: `WebSite` + `Organization` (todas las páginas), `Article` + `BreadcrumbList` (artículos de Blog), `NewsArticle` (Radar) — todos con datos reales del propio contenido, sin inventar autor, fechas ni organización.
- H1 único por página: confirmado sin regresión en todas las plantillas.

**Pendiente / requiere tu decisión**:
- Excluir del sitemap no evita indexación si Google encuentra la URL por otra vía. Para bloquear de verdad `/suscripcion-lista-comunidad/` haría falta un `noindex` — pero esa página puede seguir siendo el destino de un funnel externo activo (ya señalado en fases previas), así que antes de bloquear su indexación necesito que confirmes si ese funnel sigue en uso.
- Imágenes OG específicas por hub/subpágina (hoy usan el logo) — mejora futura, no error.

## 5. Responsive

**Comprobado** (por análisis de CSS, sin navegador real): todos los grids compartidos usan `repeat(auto-fit, minmax(...))`, sin anchos fijos que puedan provocar overflow horizontal en ~375-400px.

**Corregido**: la tabla de composición nutricional de las recetas no tenía scroll horizontal propio — ahora sí (`overflow-x: auto` en un contenedor dedicado, sin cambiar su aspecto en escritorio).

**Sin problemas encontrados** en el resto de componentes revisados (Header, Footer, Hero, cards, callouts, TOC, FAQ, share buttons).

## 6. Rendimiento

**Sin problemas importantes encontrados**:
- Pagefind sigue cargándose solo bajo demanda (al pulsar el buscador), no en la carga inicial.
- No se carga ninguna librería de iconos externa completa (Font Awesome/MDI) — todo son SVG inline puntuales, confirmado sin regresión.
- CSS duplicado detectado pero de bajo impacto (un mismo bloque de estilo de tarjeta repetido en 3 componentes) — documentado, no refactorizado por no ser urgente ni justificar el riesgo de tocarlo ahora.

## 7. Accesibilidad

**Corregido**:
- `alt=""` en el banner decorativo del footer (antes tenía el nombre de archivo como alt, incorrecto para una imagen puramente decorativa).
- Contraste de los metadatos de artículo (autor/fecha) corregido de `#777` a `#666` — el original quedaba justo por debajo del umbral AA (4.48:1 vs 4.5:1 requerido).

**Verificado sin problemas**: `aria-label` en todos los botones/enlaces solo-icono, FAQ con `<details>/<summary>` nativos (accesible por teclado sin JS), labels del formulario de contacto correctamente asociados por `for`/`id`, dropdown del menú accesible por teclado (`:focus-within`).

## 8. Blog

**Estado final**: arquitectura verificada correcta — content collection independiente, ruta dinámica única (`[slug]/index.astro`) sin archivos por artículo, categorías, relacionados (por categoría) y navegación anterior/siguiente (por fecha) funcionando, breadcrumbs presentes, SEO con `Article` + `BreadcrumbList`, indexado en el buscador. 72 artículos, todos auditados y con los errores técnicos de migración corregidos.

## 9. Radar

**Estado final**: content collection independiente confirmada (nunca se mezcla con categorías de Blog), 9 publicaciones, las 4 secciones fijas presentes y en orden en las 9, `nivelEvidencia` con sus 4 valores reales (incluido "Emergente"), fuentes correctas (3 vacías porque así es el original, ya documentado), botones de compartir con iconos de color, SEO con `NewsArticle`, indexado en el buscador junto con Blog.

## 10. Formularios

**Estado actual**: sin cambios respecto a la fase anterior — formulario de contacto en modo de pruebas (aviso visible de que el envío no está conectado todavía), labels correctamente asociados, validación HTML5 nativa en los campos obligatorios. **Envío real sigue pendiente** de tu decisión sobre Mailrelay/MailerLite/Brevo, como ya se acordó — no se ha tocado en esta fase.

## 11. Redirects

- **`/alimentacion/`**: funciona correctamente (200 OK), confirmado en vivo.
- **`/alimentacion-2/` → `/alimentacion/`**: redirect 308 (permanente) real, confirmado en vivo con `curl -I`.
- **`/ayuno-intermitente-2/`**: sin redirect — ver punto 2 (requiere tu decisión, mismo patrón que alimentación pero nunca abordado).

## 12. Pendientes (requieren tu decisión — acumulados, no bloquean nada de lo demás)

1. **`/ayuno-intermitente-2/`**: ¿corregir a `/ayuno-intermitente/` con redirect 301, igual que se hizo con alimentación, o dejarlo tal cual?
2. **`/suscripcion-lista-comunidad/`**: ¿sigue activo el funnel externo que apunta aquí? Si no, se puede añadir `noindex` para que no aparezca en buscadores (ya excluida del sitemap, pero eso no impide indexación si Google la encuentra por otra vía).
3. Imágenes Open Graph específicas por hub/subpágina (hoy usan el logo genérico) — mejora futura, no error.
4. CSS duplicado entre `CausasGrid`/`TemasRelacionadosGrid`/`SolucionesList` (tarjeta blanca con sombra) — consolidable en una clase compartida si se quiere, bajo impacto.
5. Integración real de envío del formulario de contacto (Mailrelay u otra) — ya acordado como fase posterior.
6. Las páginas huérfanas y URLs automáticas de WordPress (`/category/*/`, `/tag/*/`, etc.) — ya documentadas en fases muy anteriores, siguen pendientes de tu decisión final sobre cuáles redirigir/descartar.

## 13. Build

```
astro check  → 0 errores, 0 warnings, 39 hints (preexistentes, deprecación de Zod, sin relación con esta auditoría)
astro build  → 129 páginas, 0 errores
sitemap      → generado correctamente, 2 URLs excluidas verificadas
robots.txt   → generado y servido correctamente
Pagefind     → 129 páginas indexadas, sin errores
```

Todo commiteado y pusheado a `master`. Deploy de pruebas verificado en vivo (robots.txt, sitemap, redirect 308, JSON-LD en artículo y en Radar — todo confirmado con `curl` contra la URL real).

---

## Resumen de metodología de esta fase

Se ejecutaron 4 auditorías en paralelo con propiedad de archivos disjunta para evitar conflictos: SEO técnico (capas `BaseLayout`/`ArticleLayout`/`RadarLayout`/`Breadcrumb`/`astro.config.mjs`), navegación y enlaces (`src/pages/**` + `navigation.ts`), contenido (`src/content/blog|radar/**`), e imágenes/responsive/rendimiento/accesibilidad (resto de componentes). Cada una verificó `astro check` + `npm run build` de forma independiente antes de entregar su informe; la consolidación final repitió ambas comprobaciones sobre el conjunto completo de cambios.
