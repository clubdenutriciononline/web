# Páginas huérfanas y señales de indexación — clubdenutricion.es

Fecha: 2026-09-12
Método: `firecrawl scrape` (contenido), lectura de HTML crudo (title/H1/meta robots/canonical), y dos motores de búsqueda (WebSearch + firecrawl-search) con consultas `site:` para señales de indexación.

**Aviso metodológico**: ninguno de los dos motores de búsqueda equivale a Google Search Console real. El operador `site:` en motores de terceros es poco fiable (resultados inconsistentes entre llamadas para la misma URL). Todo lo marcado como "indexado"/"no indexado" aquí es una estimación heurística, no un dato confirmado. Antes de borrar nada de forma definitiva, lo ideal sería contrastar con Google Search Console real si se tiene acceso.

---

## Hallazgo transversal importante

6 de las 8 páginas huérfanas (`keto-lowcarb`, `nutricion`, `mente`, `cuerpo`, `recetas-sanas-keto-y-low-carb`, `coaching-nutricional`) muestran **el mismo listado genérico de los últimos 5 posts del blog**, sin filtrar por temática (ej. `/keto-lowcarb/` incluye un post sobre sueño y otro sobre colesterol, nada específico de keto). No son archivos de categoría funcionando de verdad — parecen plantillas Elementor con un widget "últimos posts" genérico, con solo el título cambiando. Contenido duplicado entre sí.

Ninguna de las 8 tiene `meta robots noindex` ni cabecera bloqueante — todas son técnicamente indexables (200 OK, canonical a sí mismas).

## Parte A — Las 8 páginas huérfanas

| # | URL | Título / H1 | Contenido real | Enlaces internos | Indexación (heurística) | Valor SEO estimado | Destino de redirect sugerido |
|---|---|---|---|---|---|---|---|
| 1 | `/keto-lowcarb/` | Title "KETO / LOW CARB - Club de Nutrición". Sin H1. | Feed genérico de últimos 5 posts (idéntico a los demás). | Sin enlaces entrantes detectados (no se rastreó todo el sitio). | Sin evidencia de indexación en ninguno de los dos motores. | Bajo. | `/category/recetas/keto-low-carb/` (confirmada indexada) o futuro hub Keto/Low-carb. |
| 2 | `/nutricion/` | Title "Nutrición - Club de Nutrición". Sin H1. | Mismo feed genérico. | Sin enlaces entrantes detectados. | **Indicios reales**: variantes paginadas AJAX indexadas (`/nutricion/4/?...jet_blog_ajax=1`, `/nutricion/5/?...`) — evidencia de rastreo/indexación de esta página o su paginación, aunque en forma de URLs con parámetros técnicos. | Medio (señal real, aunque técnica). | Pillar "Nutrición" si existe en la nueva arquitectura, o al blog general. |
| 3 | `/mente/` | Title "MENTE". Sin H1. | Mismo feed genérico. | Sin enlaces entrantes detectados. | Sin coincidencias en ningún motor. | Bajo. | Pillar "Mente" o blog general. |
| 4 | `/cuerpo/` | Title "CUERPO". Sin H1. | Mismo feed genérico. | Sin enlaces entrantes detectados. | Sin coincidencias en ningún motor. | Bajo. | Pillar "Cuerpo" o blog general. |
| 5 | `/recetas-sanas-keto-y-low-carb/` | Title "RECETAS SANAS, KETO Y LOW-CARB". Sin H1. | Mismo feed genérico (ninguno de los 5 posts es realmente una receta). | Sin enlaces entrantes detectados. | Sin coincidencias en ningún motor. | Bajo, pero el nombre coincide con intención de búsqueda razonable. | `/category/recetas/` o `/category/recetas/keto-low-carb/` (confirmadas indexadas). |
| 6 | `/servicios-del-club-de-nutricion/` | Title "Servicios del Club de Nutrición". **Única con H1 real**: "SERVICIOS DE CLUB DE NUTRICIÓN". | Landing estática de texto tipo "coming soon" desactualizada (fechada ~2024, anuncia recetas/vídeos/formación/apps "muy pronto"). Sin formulario ni CTA funcional. | Sin enlaces salientes ni entrantes detectados. | Sin coincidencias en ningún motor. | Bajo — contenido obsoleto. | Página real de "Servicios" si se construye, o home. |
| 7 | `/coaching-nutricional/` | Title "COACHING NUTRICIONAL". Sin H1. | Mismo feed genérico, sin descripción del servicio, precios ni CTA. | Sin enlaces entrantes detectados. | Sin coincidencias en ningún motor. | El término "coaching nutricional" tiene volumen de búsqueda real (confirmado por resultados de terceros en el SERP), pero esta página concreta no aparece indexada. | Landing real de coaching si se construye, si no, a servicios/home. |
| 8 | `/suscripcion-lista-comunidad/` | Title "Suscripción Lista Comunidad". Sin H1; H2 "Ya formas parte de la lista". | Página de confirmación/agradecimiento tras un opt-in ("Gracias por unirte, te avisaré cuando abramos la comunidad"). Contenido mínimo, sin imágenes ni enlaces. | Ninguno detectado. | **Única con indexación confirmada** (aparece con su title y meta description en la búsqueda). | Bajo por sí sola, **pero atención operativa**: este tipo de página suele ser el destino de un formulario de opt-in activo (lead magnet, grupo, funnel de anuncios/email/Metricool). Podría seguir recibiendo tráfico real aunque no esté en menú/footer. | **Antes de retirarla, comprobar si algún formulario o campaña activa sigue apuntando aquí.** Si se conserva el funnel, replicar en Astro con la misma URL exacta. |

## Parte B — Señales de indexación de URLs automáticas de WordPress

Confirmado en sitemap: 31 URLs `/category/*/`, 21 URLs `/tag/*/` (sitemap real `post_tag-sitemap.xml`), 1 URL `/author/admin/`.

**Consultas agregadas** (`site:.../category/`, `/tag/`, `/author/`) dieron señal débil por sí solas. Se complementó con consultas dirigidas a temas pilares (menopausia, cortisol, recetas), donde sí apareció indexación real:

**Categorías confirmadas indexadas:**
```
/category/recetas/
/category/recetas/keto-low-carb/
/category/hormonas/cortisol/
/category/hormonas/menopausia/
/category/hormonas/ciclo-menstrual/
/category/hormonas/inflamacion-hormonal/
/category/radar-de-salud/
```
(el resto de las 31 no se comprobaron una a una por límites de rate del buscador — no confirmadas ni descartadas)

**Tags confirmados indexados:**
```
/tag/colesterol/
/tag/memoria/
/tag/radar-de-salud/
/tag/tacos-keto/
```
(resto de los 21 no comprobados individualmente)

**Author**: `/author/admin/` no apareció en ninguna consulta — señal más consistente de "no indexado" de todo el informe, aunque no es prueba definitiva.

### Patrón observado
Los temas pilar de negocio (hormonas/menopausia/cortisol, recetas/keto-low-carb, radar de salud) muestran indexación confirmable; la consulta genérica no revela nada para la mayoría de las ~52 URLs. Recomendación: priorizar redirect 301 para las categorías/tags confirmadas (y sus "hermanas" temáticamente cercanas dentro de hormonas/*), y considerar 404/410 solo para las que no mostraron ninguna señal — idealmente contrastando con Google Search Console real antes de decidir de forma definitiva, ya que esta comprobación cubrió solo ~10 de 52 URLs individualmente.

### Limitaciones honestas del método
- Sin acceso a Google Search Console ni Analytics reales — toda la indexación aquí es heurística.
- Los dos motores usados dieron resultados inconsistentes entre sí y entre llamadas repetidas para la misma URL — "sin resultados" no equivale con certeza a "no indexado".
- Sin datos reales de backlinks — cualquier "valor SEO" es inferencia razonada, no medición.
- No se rastreó el sitio completo para confirmar enlaces entrantes hacia las 8 páginas huérfanas (solo se comprobó la home y las 8 páginas entre sí); podría haber algún post antiguo que enlace a alguna sin haberlo detectado.
