# Arquitectura del proyecto Astro — resumen para validación

Fecha: 2026-09-12
Estado: **scaffold funcional creado y compilado con éxito** (`npx astro build` → 37 páginas, 0 errores de tipos con `astro check`). Contenido real (copy de las 82 páginas de artículos, texto real de hubs/subpáginas/legales, imágenes) **todavía no migrado** — eso es la fase de construcción de contenido, posterior a esta validación de arquitectura.

Stack: Astro 7.3.2, TypeScript, Content Collections (Content Layer API), Pagefind para buscador. Sin framework de UI adicional (React/Vue) — no hace falta para este sitio, mantiene el bundle mínimo.

---

## 1. Configuración raíz

- **`astro.config.mjs`**: `site`, `trailingSlash: 'always'` (para que las URLs terminen en `/` igual que en WordPress), y el redirect `/alimentacion-2/` → `/alimentacion/` (confirmado: genera un `alimentacion-2/index.html` de redirección en el build estático).
- **`src/content.config.ts`**: define las dos content collections independientes, `blog` y `radar`, cada una con su propio schema (ver sección 4).
- **`package.json`**: script `build` encadena `astro build && pagefind --site dist` (el buscador se indexa automáticamente en cada build).

## 2. Árbol de carpetas

```
nueva web/
├── astro.config.mjs
├── package.json
├── src/
│   ├── content.config.ts          # schemas de blog + radar
│   ├── content/
│   │   ├── blog/                  # 73 artículos (pendiente de migrar)
│   │   └── radar/                 # 9 publicaciones (pendiente de migrar)
│   ├── data/
│   │   └── navigation.ts          # menú + footer, fuente única de verdad
│   ├── layouts/
│   │   ├── BaseLayout.astro       # <html> + Header + Footer + SEO
│   │   ├── HubTemplateA.astro     # SOLO Hormonas
│   │   ├── HubTemplateB.astro     # Energía/Metabolismo/Microbiota/Mentalidad
│   │   ├── SubpageTemplateA.astro # Menopausia/Ciclo Menstrual/Tiroides
│   │   ├── SubpageTemplateB.astro # las otras 12 subpáginas estándar
│   │   ├── SubpageBlogPost.astro  # SOLO Inflamación hormonal
│   │   ├── ArticleLayout.astro    # artículos de Blog normal
│   │   └── RadarLayout.astro      # publicaciones de Radar de Salud
│   ├── components/
│   │   ├── Header.astro / Footer.astro
│   │   ├── Hero.astro / TextoConImagen.astro
│   │   ├── SintomasDestacados.astro / ListaSintomas.astro / CausasGrid.astro / SolucionesList.astro
│   │   ├── RelacionImagenes.astro / CTAFinal.astro
│   │   ├── TemasRelacionadosGrid.astro   # con <a href> real (corrección aplicada)
│   │   ├── ArticulosRelacionados.astro   # se oculta si no hay artículos (corrección aplicada)
│   │   ├── Breadcrumb.astro              # solo Blog
│   │   ├── TableOfContents.astro         # Perimenopausia/Cortisol ("Resumen clave") e Inflamación hormonal (TOC)
│   │   ├── FAQAccordion.astro            # solo Inflamación hormonal
│   │   ├── ShareButtons.astro            # solo Radar de Salud
│   │   ├── RecipeNutritionTable.astro    # solo recetas
│   │   └── Bibliografia.astro            # Perimenopausia/Cortisol
│   └── pages/
│       ├── index.astro                          → /
│       ├── hormonas/index.astro                  → /hormonas/
│       ├── energia|metabolismo|microbiota|mentalidad/index.astro
│       ├── menopausia|ciclo-menstrual|tiroides/index.astro   (SubpageTemplateA)
│       ├── perimenopausia/index.astro · cortisol/index.astro (a medida)
│       ├── inflamacion-hormonal/index.astro                 (SubpageBlogPost)
│       ├── fatiga-cronica|sueno|rutinas-energeticas|perdida-grasa-femenina|
│       │   resistencia-insulina|ayuno-intermitente-2|digestion|
│       │   inflamacion-intestinal|probioticos-alimentacion|ansiedad-comida|
│       │   estres-habitos|relacion-cuerpo-mujeres/index.astro (SubpageTemplateB)
│       ├── alimentacion/[...page].astro          → /alimentacion/ (+ paginación)
│       ├── blog/[...page].astro                  → /blog/ (+ /blog/2/ … /blog/13/)
│       ├── radar-de-salud/[...page].astro        → /radar-de-salud/ (+ paginación)
│       ├── [slug]/index.astro                    → /{slug-de-articulo-o-radar}/
│       ├── contacto/index.astro
│       ├── politica-de-cookies|politica-de-privacidad|terminos-y-condiciones|
│       │   descargo-de-responsabilidad|copyright|mas-informacion-sobre-las-cookies/index.astro
│       ├── lm-5-pasos-optin|lm-5-pasos-descarga/index.astro
│       └── suscripcion-lista-comunidad/index.astro   (pendiente de decisión, ver 03)
├── public/
│   ├── favicon.ico / favicon.svg
│   └── images/                    # assets estáticos (placeholder, pendiente de poblar)
└── 00-analisis/                   # los 5 documentos de este análisis (no se despliegan)
```

Cada ruta de `src/pages/` corresponde exactamente a la misma URL que tiene hoy en WordPress (ver columna "Nueva ruta" del [02-mapa-migracion.md](02-mapa-migracion.md)), excepto `/alimentacion-2/` → `/alimentacion/` con su redirect.

## 3. Por qué esta cantidad de plantillas (no es sobre-ingeniería)

Esta arquitectura tiene deliberadamente **7 layouts de página distintos** (`HubTemplateA/B`, `SubpageTemplateA/B`, `SubpageBlogPost`, `ArticleLayout`, `RadarLayout`) más **2 páginas totalmente a medida** (Perimenopausia, Cortisol) en vez de una única plantilla genérica. Esto es consecuencia directa de la revisión estructural página a página ([04-revision-estructural.md](04-revision-estructural.md)): la web real no usa una plantilla única, y la decisión tomada fue respetar esa realidad en vez de forzar unificación. Todos comparten componentes internos (`Hero`, `CausasGrid`, `CTAFinal`, etc.) para no duplicar código donde de verdad es igual.

## 4. Content Collections

```ts
// src/content.config.ts
blog:  { title, slug?, date, updated?, image, imageAlt, category, tags[],
         description, seo{title,description}?, author, nutricion?{...}, sources[], draft }
radar: { title, slug?, date, updated?, image, imageAlt, description,
         seo{title,description}?, nivelEvidencia: 'Alto'|'Medio'|'Bajo', fuente, draft }
```

- `blog` y `radar` son **collections independientes** (carpetas `src/content/blog/` y `src/content/radar/`), tal como exige mantener Blog y Radar de Salud como sistemas separados — aunque en la web pública ambos artículos vivan bajo el mismo namespace de URL raíz (`/{slug}/`), resuelto por la ruta dinámica `src/pages/[slug]/index.astro` que consulta ambas collections y elige `ArticleLayout` o `RadarLayout` según de dónde venga cada entrada.
- El campo `nutricion` (tabla de composición nutricional) es opcional dentro de `blog` — sin collection separada para recetas, tal como se decidió.
- Ahora mismo ambas collections están **vacías** (solo carpetas con `.gitkeep`): la migración del contenido real (82 artículos + imágenes) es la siguiente fase.

## 5. Correcciones de contenido ya reflejadas en el código (no solo documentadas)

| Corrección | Dónde está aplicada |
|---|---|
| H1 real en cada página | `Hero.astro` siempre renderiza `<h1>{title}</h1>` |
| Grid "temas relacionados" con enlace real | `TemasRelacionadosGrid.astro` — cada tarjeta es un `<a href>` |
| Sin bloque vacío de "artículos relacionados" | `ArticulosRelacionados.astro` — `{articulos.length > 0 && (...)}`, no renderiza nada si el array llega vacío (demostrado en `/resistencia-insulina/`, que hoy pasa un array vacío real) |
| Heading duplicado en Relación con el Cuerpo | Marcado con comentario TODO en `src/pages/relacion-cuerpo-mujeres/index.astro` para corregirlo al migrar el contenido real (una sola aparición) |
| Perimenopausia / Cortisol a medida | Páginas propias con índice de salto, listas numeradas, bibliografía sin enlaces, y placeholder estructural del gráfico SVG / diagrama CSS — a sustituir por la réplica visual exacta en la fase de contenido |
| Inflamación hormonal con TOC + FAQ + conclusión | `SubpageBlogPost.astro`, usado solo por esta página |

## 6. Pendiente para la fase de construcción de contenido (no arquitectura)

- Migrar los 82 artículos reales (Blog + Radar) a `src/content/blog/` y `src/content/radar/`, con sus imágenes.
- Rellenar el contenido editorial real de los 5 hubs, 18 subpáginas y las 6 páginas legales (hoy son placeholders `TODO`).
- Recrear visualmente el SVG de Perimenopausia y el diagrama CSS de Cortisol de forma fiel al original (hoy son placeholders estructurales funcionales, no la réplica exacta).
- Implementar el buscador Pagefind en el header (`#pagefind-search`, ya montado en `Header.astro`) una vez haya contenido que indexar.
- Decidir e implementar el endpoint real del formulario de contacto (hoy apunta a `/api/contacto`, no implementado).
- Calcular relacionados reales y navegación anterior/siguiente en `src/pages/[slug]/index.astro` (hoy son un array vacío marcado TODO).
- Migrar las imágenes reales (`public/images/` está vacío; los `icon`/`image` de los grids de temas relacionados usan rutas placeholder).
- Decidir definitivamente sobre las páginas huérfanas y las URLs automáticas de WordPress (ver [03-huerfanas-e-indexacion.md](03-huerfanas-e-indexacion.md)) y aplicar los redirects 301 que correspondan en `astro.config.mjs`.

## 7. Validación técnica ya realizada

```
npx astro build   →  37 páginas generadas, 0 errores
npx astro check   →  0 errores de tipos (solo warnings cosméticos de Zod)
```

El proyecto vive en `Negocios\CLUBDENUTRICIÓN\nueva web\` (carpeta hermana de `CDN auto`, no mezclada con el sistema de redes sociales). Repositorio git: **aún no inicializado** — se hará al preparar el despliegue en Vercel, salvo que prefieras inicializarlo ya.
