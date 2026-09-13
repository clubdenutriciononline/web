# Mapa de migración — WordPress → Astro

Regla general: **si la URL existe hoy y es pública, se mantiene exactamente igual**. La columna "Nueva ruta" solo difiere de la actual cuando hay una razón técnica (marcada explícitamente) o cuando la URL es de un tipo cuyo destino aún hay que decidir (marcado como PENDIENTE DE DECISIÓN).

## 1. Home

| URL actual | Nueva ruta | Tipo | Plantilla/componente Astro |
|---|---|---|---|
| `/` | `/` (igual) | Página estática | `src/pages/index.astro` — Hero + bloque 4 tarjetas + listado paginado de posts (últimos N, usando `getCollection('blog')` + `getCollection('radar')` combinados si el buscador/listado los mezcla; a confirmar si la home mezcla ambos o solo blog) |

## 2. Hubs principales — ARQUITECTURA DE PLANTILLAS CORREGIDA (tras revisión estructural 2026-09-12, ver [04-revision-estructural.md](04-revision-estructural.md))

La revisión individual de las 23 páginas confirmó que **no hay una plantilla única de hub**. Se mantienen las diferencias reales, sin forzar unificación:

| URL actual | Nueva ruta | Tipo | Plantilla | Variante |
|---|---|---|---|---|
| `/hormonas/` | igual | Página estática hub | `HubTemplateA.astro` | Grid final de **4** tarjetas (de sus 6 subpáginas reales, elección editorial) · **sin** sección "Artículos relacionados" |
| `/energia/` | igual | Página estática hub | `HubTemplateB.astro` | Grid final de **3** tarjetas (1:1 con sus 3 subpáginas) · **con** sección "Artículos relacionados" · icono emoji |
| `/metabolismo/` | igual | Página estática hub | `HubTemplateB.astro` | Igual que Energía · icono imagen |
| `/microbiota/` | igual | Página estática hub | `HubTemplateB.astro` | Igual que Energía · icono imagen |
| `/mentalidad/` | igual | Página estática hub | `HubTemplateB.astro` | Igual que Energía · icono emoji |

`HubTemplateA.astro` y `HubTemplateB.astro` comparten componentes internos reutilizables (hero, bloque intro+síntomas, grid de causas, lista de síntomas, sección relación+imágenes lightbox, CTA final, footer) mediante composición — pero son dos plantillas de página distintas porque su composición final difiere (una lleva "Artículos relacionados" y la otra no; el grid final tiene 4 vs 3 tarjetas). El campo `icono` del grid final (imagen o emoji) es una prop de contenido, no de plantilla.

**Corrección de contenido a aplicar en ambas** (ver sección 9 de este documento): el grid final de tarjetas pasa a llevar `<a href>` real hacia la subpágina correspondiente (hoy es puramente decorativo).

## 3. Subpáginas — ARQUITECTURA DE PLANTILLAS CORREGIDA

**No existe una `SubpageTemplate.astro` única.** Se detectaron 4 variantes reales, más 2 páginas sin plantilla común (a medida):

| URL actual | Nueva ruta | Hub padre | Plantilla | Variante |
|---|---|---|---|---|
| `/menopausia/` | igual | Hormonas | `SubpageTemplateA.astro` | Patrón completo, con grid final "áreas clave relacionadas" |
| `/ciclo-menstrual/` | igual | Hormonas | `SubpageTemplateA.astro` | Patrón completo |
| `/tiroides/` | igual | Hormonas | `SubpageTemplateA.astro` | Patrón completo |
| `/perimenopausia/` | igual | Hormonas | **`PerimenopausiaCustom.astro`** (página a medida, no plantilla compartida) | Bloque HTML único: índice de salto "Resumen clave", listas numeradas, bibliografía en texto plano, **SVG de niveles hormonales por década dibujado a mano** — todo se replica tal cual, sin simplificar |
| `/cortisol/` | igual | Hormonas | **`CortisolCustom.astro`** (página a medida) | Igual familia que Perimenopausia: índice de salto, listas numeradas, bibliografía, **diagrama de flujo del eje HPA en CSS puro** — se replica tal cual |
| `/inflamacion-hormonal/` | igual (slug interno real de WP es `sintomas-inflamacion-hormonal`, pero la URL pública `/inflamacion-hormonal/` se mantiene) | Hormonas | **`SubpageBlogPost.astro`** (tercera variante propia) | Tabla de contenidos, sin grid de causas, **acordeón de Preguntas Frecuentes** (5 preguntas), sección de conclusión, 5 tarjetas de artículos relacionados (no 3) — se replica tal cual |
| `/fatiga-cronica/` | igual | Energía | `SubpageTemplateB.astro` | Patrón estándar simplificado (sin grid final de áreas) |
| `/sueno/` | igual | Energía | `SubpageTemplateB.astro` | Estándar simplificado (8 tarjetas de causa en vez de 6, 7 mini-headings de solución — se respeta el conteo real de esta página, no se fuerza a 6/5) |
| `/rutinas-energeticas/` | igual | Energía | `SubpageTemplateB.astro` | Estándar simplificado |
| `/perdida-grasa-femenina/` | igual | Metabolismo | `SubpageTemplateB.astro` | Estándar simplificado |
| `/resistencia-insulina/` | igual | Metabolismo | `SubpageTemplateB.astro` | Estándar simplificado · sección "Artículos relacionados" hoy vacía — ver corrección en sección 9 |
| `/ayuno-intermitente-2/` | igual (se mantiene el slug con el `-2`) | Metabolismo | `SubpageTemplateB.astro` | Estándar simplificado, con encabezados reformulados en tono positivo ("¿Por Qué Funciona...?" en vez de "Causas de...") — se respeta el texto real, no se normaliza |
| `/digestion/` | igual | Microbiota | `SubpageTemplateB.astro` | Estándar simplificado (7 mini-headings de solución, encabezado duplicado real de la página de origen — ver nota) |
| `/inflamacion-intestinal/` | igual | Microbiota | `SubpageTemplateB.astro` | Estándar simplificado (7 síntomas, 6 soluciones) |
| `/probioticos-alimentacion/` | igual | Microbiota | `SubpageTemplateB.astro` | Estándar simplificado |
| `/ansiedad-comida/` | igual | Mentalidad | `SubpageTemplateB.astro` | Estándar simplificado |
| `/estres-habitos/` | igual | Mentalidad | `SubpageTemplateB.astro` | Estándar simplificado (8 mini-headings de solución) |
| `/relacion-cuerpo-mujeres/` | igual | Mentalidad | `SubpageTemplateB.astro` | Estándar simplificado · **corrección de contenido**: el heading de causa duplicado ("Estrés y presión emocional" repetido) se corrige a una sola aparición (ver sección 9) |

**Resumen de plantillas de subpágina**: `SubpageTemplateA` (3 páginas, con grid final) · `SubpageTemplateB` (12 páginas, sin grid final) · `PerimenopausiaCustom` y `CortisolCustom` (a medida, 1 página cada una) · `SubpageBlogPost` (a medida, 1 página: Inflamación hormonal).

`SubpageTemplateA.astro` = composición de hero + intro/síntomas + definición + grid de causas + síntomas + relación+imágenes + soluciones + **grid final de áreas relacionadas (con enlaces reales, ver sección 9)** + artículos relacionados + CTA + footer.
`SubpageTemplateB.astro` = igual que A pero **sin** el bloque de grid final de áreas relacionadas.

Ambas comparten los mismos componentes internos que `HubTemplateA/B` donde el bloque es idéntico (grid de causas, lista de síntomas, CTA final, etc.) — reutilización de componentes sin forzar unificación de plantilla de página.

La paginación del bloque "artículos relacionados" (hoy `/menopausia/2/`) se resuelve como componente de paginación bajo la misma ruta (Astro `[...page].astro` o estado de UI), sin generar contenido nuevo ni URLs adicionales fuera de las ya existentes.

## 3bis. Alimentación (decisión de la usuaria, 2026-09-12)

| URL actual | Nueva ruta | Tipo | Notas |
|---|---|---|---|
| `/alimentacion-2/` | **`/alimentacion/`** | Página estática (listado simple, NO hub por ahora) | El sufijo `-2` es un artefacto de WordPress (slug duplicado histórico). Se corrige a la URL definitiva `/alimentacion/`, manteniendo contenido y funcionamiento actuales sin rediseñar. Redirección 301 obligatoria: `/alimentacion-2/` → `/alimentacion/`. Conversión futura a hub real: pendiente, fuera del alcance de esta fase. |

## 4. Blog

| URL actual | Nueva ruta | Tipo | Plantilla |
|---|---|---|---|
| `/blog/` | igual | Índice | `src/pages/blog/index.astro` (+ `[page].astro` para `/blog/2/` … `/blog/13/`) |
| `/blog/2/` … `/blog/13/` | igual | Índice paginado | Astro `paginate()` sobre `getCollection('blog')` |
| `/{slug-articulo}/` (73 artículos) | igual (slug raíz, sin prefijo `/blog/`, tal como está hoy) | Artículo | `src/pages/[...slug].astro` o colección de contenido con `getStaticPaths`, plantilla `ArticleTemplate.astro` (breadcrumb, imagen destacada, cuerpo, relacionados, prev/next, meta SEO Yoast-equivalente) |
| `/{slug}/2/` (paginación de "relacionados" embebida en un artículo, si aplica) | igual | Paginación embebida | mismo componente de paginación que en subpáginas |

Cada artículo pasa a ser una entrada de la content collection `blog` (Astro Content Collections), con frontmatter: `title, slug, date, updated, image, category, tags, description, seo{title,description}, sources?`.

## 5. Radar de Salud (tipo de contenido independiente, NO integrado en categorías del Blog)

| URL actual | Nueva ruta | Tipo | Plantilla |
|---|---|---|---|
| `/radar-de-salud/` | igual | Índice | `src/pages/radar-de-salud/index.astro` (+ `/2/` paginado) |
| `/radar-de-salud/2/` | igual | Índice paginado | `paginate()` sobre `getCollection('radar')` |
| `/{slug-radar}/` (9 publicaciones) | igual (mismo esquema de slug raíz que el blog, ya que hoy comparten post type y namespace de URL) | Publicación Radar | Content collection separada `radar`, plantilla `RadarTemplate.astro` (bloques fijos con emoji: Qué ha pasado / Por qué importa / Interpretación clínica / Conclusión rápida / Nivel de evidencia / Fuente / Fecha + share buttons, sin breadcrumb) |

Importante: aunque Blog y Radar comparten hoy el mismo namespace de slugs (todo cuelga de la raíz `/slug/`), en Astro serán dos content collections distintas (`src/content/blog/` y `src/content/radar/`) — así se cumple "deben tener sus propias plantillas y estructuras" y "permanecer separados en la navegación y arquitectura" sin tocar las URLs públicas.

## 6. Buscador

| URL actual | Nueva ruta | Tipo | Notas |
|---|---|---|---|
| `/?s={query}` | igual | Resultados de búsqueda | PENDIENTE DE DECISIÓN TÉCNICA: WordPress hace esto server-side; en Astro estático hace falta un índice de búsqueda client-side (ej. Pagefind) que indexe `blog` + `radar` juntos y sirva resultados en esta misma URL con un parámetro `s`, o un componente que lea `?s=` desde JS y filtre. Se decidirá en Fase 3. |
| `/page/{n}/?s={query}` | igual | Paginación de resultados | depende de la solución anterior |

## 7. Contacto y legales

| URL actual | Nueva ruta | Tipo | Plantilla |
|---|---|---|---|
| `/contacto/` | igual | Formulario | `src/pages/contacto.astro` — formulario que envíe a un endpoint (Astro API route / servicio externo tipo Formspree o similar, a decidir) + protección anti-spam (reCAPTCHA o alternativa) |
| `/politica-de-cookies/` | igual | Legal estática | `src/pages/politica-de-cookies.astro` |
| `/politica-de-privacidad/` | igual | Legal estática | `src/pages/politica-de-privacidad.astro` — **contenido actual es boilerplate genérico de WordPress; recomendaría revisar el texto antes de clonarlo tal cual, pero se mantiene igual salvo que digas lo contrario** |
| `/terminos-y-condiciones/` | igual | Legal estática | `src/pages/terminos-y-condiciones.astro` |
| `/descargo-de-responsabilidad/` | igual | Legal estática | `src/pages/descargo-de-responsabilidad.astro` |
| `/copyright/` | igual | Legal estática | `src/pages/copyright.astro` |
| `/mas-informacion-sobre-las-cookies/` | igual | Legal estática | `src/pages/mas-informacion-sobre-las-cookies.astro` |

## 8. Elementos — decisiones confirmadas por la usuaria (2026-09-12)

| Elemento | Decisión |
|---|---|
| `/alimentacion-2/` (menú "Alimentación") | **Migrar a `/alimentacion/`** (contenido y funcionamiento actuales, sin rediseñar) + redirect 301 desde `/alimentacion-2/`. Conversión a hub real: futura, fuera de esta fase. |
| 31 URLs `/category/*/`, 21 `/tag/*/`, `/author/admin/` | **No recrear como páginas Astro.** Antes de descartarlas, comprobar señales de indexación (research en curso). Las indexadas/con valor → redirect 301 a la página más relevante. Las sin valor → 404/410. |
| Páginas huérfanas (8, listadas abajo) | **No eliminar todavía.** Inventario detallado en curso (research en curso) antes de decidir conservar/redirigir/eliminar una por una. |
| `/lm-5-pasos-optin/` y `/lm-5-pasos-descarga/` | Migrar igual — enlazadas activamente desde CTAs de toda la web. |
| Política de privacidad | **Clonar el texto actual tal cual**, sin reescribir. Revisión legal como tarea independiente posterior. |
| Buscador | **Pagefind** (client-side, sin backend/BD), indexando Blog + Radar de Salud conjuntamente. |
| Feeds `/feed/`, `/comments/feed/` | Pendiente de decidir — recrear con `@astrojs/rss` es trivial si se quiere conservar. |
| Recetas (tabla nutricional) | Pendiente de decidir — probablemente campo opcional en el frontmatter de la collection `blog`, sin collection separada. |

Pendiente de research antes de decidir definitivamente sobre las categorías/tags/author y las páginas huérfanas:
- Inventario específico de las 8 páginas huérfanas (URL, título, función, enlaces internos, señal de indexación, destino de redirect posible).
- Señales de indexación agregadas de las URLs `/category/*/`, `/tag/*/`, `/author/*/`.

Páginas huérfanas a inventariar:
```
/keto-lowcarb/
/nutricion/
/mente/
/cuerpo/
/recetas-sanas-keto-y-low-carb/
/servicios-del-club-de-nutricion/
/coaching-nutricional/
/suscripcion-lista-comunidad/
```

Research completado — ver [03-huerfanas-e-indexacion.md](03-huerfanas-e-indexacion.md) para el detalle página a página y las señales de indexación encontradas (categorías/tags de temas pilar sí indexadas; `/nutricion/` con indicios reales de rastreo; `/suscripcion-lista-comunidad/` indexada y con aviso de posible funnel activo — pendiente de decisión final de la usuaria sobre cada una).

## 9. Correcciones de contenido a aplicar durante la migración (decisión de la usuaria, 2026-09-12)

Esto no son cambios de arquitectura ni rediseño — son correcciones de errores técnicos/de contenido reales detectados en la web actual, que se aprovechan durante la reconstrucción:

| Página(s) | Problema detectado | Corrección a aplicar |
|---|---|---|
| 16 de las 23 páginas (hubs "B" + 12 subpáginas "B" + los 3 hubs/subpáginas custom) | Sin `<h1>` real — el título del hero es un párrafo, no un heading semántico | Cada página debe tener un único `<h1>` real y semánticamente correcto. **El resultado visual se mantiene igual** — no cambia el aspecto del título, solo el marcado semántico. |
| `/relacion-cuerpo-mujeres/` | Heading de causa "⚡ Estrés y presión emocional" duplicado literalmente dos veces en el grid de causas | Se corrige a una única aparición en el contenido migrado. |
| `/resistencia-insulina/` | Sección "Artículos relacionados" presente pero vacía (sin tarjetas) | El componente de artículos relacionados se implementa para poblarse automáticamente vía `getCollection` filtrando por categoría/tag. **Si no hay artículos disponibles para esa página, la sección no se renderiza** (sin bloque vacío visible) — en vez de forzar contenido o eliminar la sección del componente reutilizable. |
| Grid final "Explora cada área clave" / "Temas relacionados" en los 5 hubs y en `SubpageTemplateA` (3 subpáginas) | Visualmente parece una tarjeta de navegación (foto/emoji + título + texto, mismo formato que otras tarjetas sí clicables del sitio) pero no lleva `<a href>` — comprobado con captura de pantalla real, sin CTA/flecha visible pero con formato de tarjeta de tema, y cada tarjeta nombra una subpágina que ya existe | Se añade `<a href>` real hacia la subpágina/hub correspondiente ya existente (sin crear páginas nuevas ni cambiar URLs). Aplica a: grid de 4 en Hormonas, grid de 3 en Energía/Metabolismo/Microbiota/Mentalidad, y grid de 4 "áreas clave relacionadas" en Ciclo Menstrual/Tiroides/Menopausia (`SubpageTemplateA`). |

Estas correcciones se aplican en el contenido/plantilla, no alteran ninguna URL ni la arquitectura pública del sitio.

---

## Resumen de conteo

- **1** home
- **5** hubs principales
- **18** subpáginas
- **82** artículos de blog/radar (73 blog + 9 radar) — repartidos en 2 content collections separadas
- **6** páginas legales/utilitarias
- **1** contacto
- **~14** páginas huérfanas / lead magnet — pendientes de decisión
- **~52** URLs automáticas de WordPress (category/tag/author) — pendientes de decisión, probablemente no se migran 1:1

Ninguna URL pública activa (menú + footer + contenido enlazado) se elimina ni se renombra en este mapa. Los únicos cambios estructurales internos son: Blog y Radar de Salud pasan a ser dos content collections separadas en Astro (hoy son la misma cosa con distinta categoría en WordPress), y la paginación embebida en pages/posts se resuelve como componente en vez de contenido real — ninguno de los dos cambios afecta a las URLs públicas.
