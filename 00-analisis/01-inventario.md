# Inventario técnico — clubdenutricion.es (WordPress)

Fecha de análisis: 2026-09-12
Método: `firecrawl map` + sitemap_index.xml (Yoast) + `firecrawl scrape` sobre una muestra representativa de cada tipo de página.

Stack detectado: WordPress 7.1, tema Astra 4.13.8 (+ child theme "Astra Child"), Elementor 4.2.1 (+ Elementor Pro Theme Builder), Yoast SEO, Site Kit by Google, WPForms Lite, Cookie Law Info.

Dominio canónico: `https://clubdenutricion.es` (sin `www`, con barra final). `http://` y `https://www.` redirigen 301 a esta forma.

---

## 1. Listado completo de URLs públicas

Total en sitemap: 179 URLs de contenido (post 82 + page 44 + category 31 + tag 21 + author 1), más URLs de paginación/feed/búsqueda generadas dinámicamente (no están en sitemap pero son accesibles).

### 1.1 Home
```
https://clubdenutricion.es/
```

### 1.2 Páginas hub principales (5, con desplegable en menú)
```
/hormonas/
/energia/
/metabolismo/
/microbiota/
/mentalidad/
```

### 1.3 Subpáginas dentro de cada hub (18, dropdown del menú)
```
Hormonas:      /ciclo-menstrual/  /perimenopausia/  /menopausia/  /tiroides/  /cortisol/  /inflamacion-hormonal/
Energía:       /fatiga-cronica/  /sueno/  /rutinas-energeticas/
Metabolismo:   /perdida-grasa-femenina/  /resistencia-insulina/  /ayuno-intermitente-2/
Microbiota:    /digestion/  /inflamacion-intestinal/  /probioticos-alimentacion/
Mentalidad:    /ansiedad-comida/  /estres-habitos/  /relacion-cuerpo-mujeres/
```

### 1.4 Ítems de menú de primer nivel sin desplegable
```
/radar-de-salud/    → índice curado del Radar de Salud
/alimentacion-2/    → listado simple de posts (plantilla de archivo, no hub) — ver anomalía 12.3
/blog/              → índice del blog
/contacto/          → formulario de contacto
```

### 1.5 Artículos — Blog "normal" (73 posts)
```
/cuales-son-los-principales-beneficios-de-la-dieta-keto/
/receta-ensalada-de-pollo-y-aguacate/
/receta-salmon-al-horno-con-esparragos/
/yogur-griego-con-nueces-y-chia/
/receta-keto-tacos-de-carne-molida-y-queso/
/que-efectos-tienen-los-ritmos-circadianos-en-la-salud-metabolica/
/cuales-son-los-metodos-mas-comunes-de-ayuno-intermitente/
/como-afectan-los-ritmos-circadianos-al-sueno/
/que-alimentos-estan-permitidos-en-la-dieta-keto/
/que-pensamientos-limitantes-tengo/
/cuales-son-los-beneficios-de-las-almendras-para-la-salud-cardiovascular/
/que-beneficios-tiene-el-ayuno-intermitente-para-la-salud/
/cual-es-la-relacion-entre-los-ritmos-circadianos-y-la-alimentacion/
/que-alimentos-estan-prohibidos-en-la-dieta-keto/
/como-puedo-cambiar-mis-creencias-negativas-sobre-la-alimentacion-saludable/
/que-nutrientes-contiene-la-quinoa-y-por-que-es-considerada-un-superalimento/
/que-se-puede-consumir-durante-el-ayuno/
/la-leptina-descubriendo-su-funcionamiento-y-significado-para-la-salud/
/ayuno-lunar-otra-forma-de-mejorar-la-salud/
/receta-keto-tortilla-espinacas-champinones-y-queso/
/beneficios-del-ayuno-y-como-puede-mejorar-la-salud/
/los-distintos-tipos-de-ayuno-intermitente-para-mejorar-tu-salud/
/exposicion-al-sol-importancia/
/dieta-keto-todo-lo-que-necesitas-saber-para-empezar/
/beneficios-del-boniato-o-batata/
/desayuno-la-comida-mas-importante/
/alimentos-ricos-en-hierro/
/propiedades-de-las-manzanas-beneficios/
/hambre-y-los-5-sentidos-corporales/
/hambre-fisica-o-emocional/
/que-es-el-coaching-nutricional/
/propiedades-de-la-granada-beneficios/
/propiedades-de-la-papaya-beneficios/
/propiedades-de-la-pina-tropical/
/propiedades-de-la-mandarina/
/propiedades-de-la-acelga-beneficios/
/receta-pan-de-proteinas/
/propiedades-del-ajo-beneficios-para-el-organismo/
/propiedades-del-amaranto-beneficios/
/propiedades-de-la-lechuga/
/propiedades-de-las-fresas/
/beneficios-y-propiedades-del-perejil/
/macronutrientes-y-micronutrientes/
/10-beneficios-de-beber-agua-con-limon/
/metabolismo-que-es-y-como-aumentarlo/
/cuando-tomar-agua-mejores-momentos/
/propiedades-del-pepino/
/propiedades-de-la-zanahoria/
/porque-tomar-fibra-a-diario/
/superalimento-bayas-de-goji-beneficios/
/azucar-en-los-alimentos-i/
/bocio-causas-sintomas-y-tratamientos/
/todo-lo-que-debes-saber-sobre-el-hipotiroidismo-subclinico-sintomas-diagnostico-y-tratamiento/
/cortisol-alto-sintomas-causas-y-como-equilibrarlo-de-forma-natural/
/sintomas-inflamacion-hormonal/
/sintomas-hipotiroidismo/
/menopausia-sintomas-cambios-hormonales/
/sintomas-perimenopausia/
/fatiga-cronica-sintomas-causas/
/ansiedad-por-la-comida-causas-sintomas/
/ciclo-menstrual-fases/
/perdida-grasa-femenina-hormonas-metabolismo/
/digestion-lenta-causas-sintomas-como-mejorar/
/resistencia-a-la-insulina-sintomas-causas-soluciones-naturales/
/insomnio-sintomas-causas-soluciones-naturales/
/inflamacion-intestinal-sintomas-causas-tratamiento-natural/
/estres-y-habitos-diarios/
/todo-sobre-el-ayuno-intermitente-de-16-horas/
/rutinas-energeticas-aumentar-energia-diaria-natural/
/ayuno-intermitente-beneficios-como-empezar/
/probioticos-microbiota-intestinal-salud-digestiva/
/relacion-con-el-cuerpo-conexion-emocional-fisica/
/sueno-profundo-hormona-crecimiento-metabolismo-cerebro/
```

### 1.6 Artículos — Radar de Salud (9 posts)
```
/la-perimenopausia-puede-empezar-antes-de-lo-esperado-estas-son-sus-primeras-senales/
/ultraprocesados-salud-digestiva-problemas-intestinales/
/dieta-cetogenica-posibles-beneficios-neurologicos/
/colesterol-ldl-riesgo-cardiovascular-perfil-lipidico/
/ayuno-intermitente-cerebro-efectos-ciencia/
/menopausia-perdida-memoria-estrogenos-cerebro/
/kefir-microbiota-bacterias-yogur-salud-intestinal/
/glp1-trastornos-alimentarios-riesgo-recaida/
/proteina-helz2-colesterol-regulacion-arn-higado/
```
Nota: técnicamente Radar de Salud es una *categoría* de WordPress sobre el mismo post type `post`, no un custom post type. Ver plantilla propia en sección 9 del análisis detallado (más abajo).

### 1.7 Páginas legales / utilitarias
```
/politica-de-cookies/
/politica-de-privacidad/
/terminos-y-condiciones/
/descargo-de-responsabilidad/
/copyright/
/mas-informacion-sobre-las-cookies/
```

### 1.8 Páginas huérfanas (existen en sitemap, accesibles, pero NO enlazadas desde menú ni footer)
```
/keto-lowcarb/
/nutricion/
/mente/
/cuerpo/
/recetas-sanas-keto-y-low-carb/
/servicios-del-club-de-nutricion/
/coaching-nutricional/
/lm-5-pasos-optin/            ← lead magnet, SÍ enlazada desde CTAs "Descargar guía" (home, hubs, subpáginas)
/lm-5-pasos-descarga/         ← página de descarga tras el optin
/suscripcion-lista-comunidad/
```

### 1.9 Archivos automáticos de WordPress (generados, no contenido editorial)
```
31 URLs /category/*/   (ej. /category/hormonas/, /category/hormonas/menopausia/, /category/radar-de-salud/...)
21 URLs /tag/*/        (ej. /tag/menopausia/, /tag/metabolismo/...)
1 URL   /author/admin/
```

### 1.10 Otras URLs dinámicas (no en sitemap, confirmadas o inferidas)
```
/blog/2/ … /blog/13/                  (paginación blog, 13 páginas)
/page/2/ … /page/4/                   (paginación home)
/radar-de-salud/2/                    (paginación índice radar)
/alimentacion-2/2/ … /alimentacion-2/5/
/menopausia/2/, /menopausia/3/        (paginación del bloque "relacionados" DENTRO de la propia page — ver anomalía 12.4)
/category/{slug}/2/, etc.
/feed/, /comments/feed/
/?s={query}, /page/{n}/?s={query}     (buscador)
```

---

## 2. Estructura del menú principal

Header global (Elementor), idéntico en todas las páginas. Logo → home. Icono de buscador (oculto hasta clic).

| Item | URL | Desplegable |
|---|---|---|
| INICIO | `/` | No |
| HORMONAS | `/hormonas/` | Ciclo Menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol, Inflamación hormonal |
| ENERGÍA | `/energia/` | Fatiga Crónica, Sueño, Rutinas Energéticas |
| METABOLISMO | `/metabolismo/` | Pérdida de Grasa Femenina, Resistencia a la Insulina, Ayuno Intermitente |
| MICROBIOTA | `/microbiota/` | Digestión, Inflamación intestinal, Probióticos y Alimentación |
| MENTALIDAD | `/mentalidad/` | Ansiedad por la Comida, Estrés y Hábitos, Relación con el cuerpo |
| RADAR DE SALUD | `/radar-de-salud/` | No |
| ALIMENTACIÓN | `/alimentacion-2/` | No |
| BLOG | `/blog/` | No |
| CONTACTO | `/contacto/` | No |

## 3. Estructura del footer

1. Imagen decorativa (banner transparente).
2. Iconos sociales: Facebook, X/Twitter, Instagram, Pinterest, Grupo de Facebook.
3. Enlaces legales: cookies, privacidad, copyright, descargo de responsabilidad, términos y condiciones.
4. Copyright "© 2026 Club de Nutrición | Diseñado por BeamarDesign".
5. Botón scroll-to-top.
6. Badge reCAPTCHA (cargado globalmente aunque solo lo usa el formulario de contacto).

No hay newsletter ni widgets adicionales.

## 4. Plantilla de la Home

1. Cookie banner (Cookie Law Info).
2. Header + nav + iconos sociales duplicados.
3. Hero: H1 + subtítulo + 2 CTAs ("Descargar guía gratuita" → `/lm-5-pasos-optin/`, "Explorar artículos" → `/blog/`) + imagen.
4. Bloque "Un enfoque diferente para entender tu cuerpo": 4 tarjetas de texto.
5. Listado de posts paginado en la propia home (widget `posts.cards`), 4 páginas (`/page/2/` … `/page/4/`).
6. Footer.

## 5. Plantilla de página hub principal (ejemplo: /hormonas/)

1. Header.
2. Hero (H1 + subtítulo + CTA + imagen).
3. Intro + 5 síntomas destacados + bullets "en esta guía vas a entender".
4. Sección "¿Qué son las hormonas?" (texto + imagen).
5. Sección "¿Por qué se desregulan?" (grid 6 tarjetas icono+texto).
6. Sección "Síntomas de desequilibrio hormonal" (8 bullets).
7. Sección relación hormonas/energía/metabolismo (texto + 2 imágenes lightbox).
8. Sección "Cómo equilibrar las hormonas" (5 mini-headings).
9. Grid de 4 tarjetas de subcategoría ("Explora cada área clave...") — **enlaces no confirmados en el markdown, revisar en HTML real**.
10. CTA final + imagen banner.
11. Footer.

Sin breadcrumb, sin listado de relacionados al final (eso es propio de la subpágina).

## 6. Plantilla de subpágina (ejemplo: /menopausia/)

Mismo patrón que el hub + estos cambios:
- Bloques de contenido específicos del tema (definición, causas, síntomas, relación con otros sistemas, soluciones prácticas).
- Grid final de 4 "áreas clave relacionadas" (mismo patrón sin link confirmado que en el hub).
- **Bloque "Artículos relacionados"**: 3 tarjetas + paginación propia (`/menopausia/2/`, `/menopausia/3/`).
- CTA final + footer.

No verificado individualmente en las otras 17 subpáginas ni en los otros 4 hubs — se asume mismo patrón Elementor por consistencia de diseño, pendiente de confirmar.

## 7. Plantilla del Blog (/blog/)

- Listado con widget `posts.cards`: imagen, etiqueta de categoría, avatar+autor, título, extracto, "Leer Artículo »".
- Paginación numérica completa: 13 páginas.
- Sin buscador embebido, sin filtro de categorías/etiquetas, sin sidebar.

## 8. Plantilla de artículo de Blog (ejemplo: /receta-ensalada-de-pollo-y-aguacate/)

- Template por defecto de Astra (no Elementor dedicado).
- Breadcrumb: "Inicio > CATEGORÍA > Título" (único lugar del sitio donde aparece breadcrumb).
- H1 + imagen destacada embebida en el cuerpo.
- Cuerpo variable según tipo de post; en recetas incluye: ingredientes, carrusel de imágenes, pasos, tabla de composición nutricional.
- "Entradas relacionadas" (4 tarjetas) + navegación "Entrada anterior / siguiente".
- Meta SEO vía Yoast: title, description, published_time, modified_time, autor.
- No verificado en un artículo no-receta si cambia el cuerpo (probable que sí, sin tabla nutricional).

## 9. Radar de Salud

Es una categoría de WordPress (`category/radar-de-salud`) sobre el post type `post`, no un custom post type — pero el índice público real vive en la **page** `/radar-de-salud/` (distinta del archivo automático `/category/radar-de-salud/`, que no muestra listado, ver anomalía 12.1).

**Índice** (`/radar-de-salud/`, pág. 2 en `/radar-de-salud/2/`): mismo widget `posts.cards`, 9 artículos, etiqueta "RADAR DE SALUD" en cada tarjeta.

**Plantilla de artículo individual**: usa un template de Elementor Pro Theme Builder dedicado (page 4029), aplicado condicionalmente a esta categoría. Estructura fija tipo "boletín científico":
- Sin breadcrumb, sin imagen destacada en el cuerpo.
- Etiqueta "RADAR DE SALUD" sobre el título.
- Secciones fijas con emoji: 🔬 Qué ha pasado / 🧠 Por qué importa / 🩺 Interpretación clínica / ⚡ Conclusión rápida / 🔎 Nivel de evidencia (Alto/Medio/Bajo).
- Línea "Fuente: …" (texto, sin links a papers) + línea "Fecha: …".
- Botones de compartir (share-buttons) — ausentes en el blog normal.
- "Artículos relacionados" al final + paginación propia (mismo patrón anómalo que en subpáginas).

**Diferencia clave con el Blog**: plantilla Elementor dedicada, estructura editorial fija de 5 bloques con emoji, sin breadcrumb, con share-buttons, sin imagen en cuerpo, sin tabla de datos — frente al template por defecto de Astra del blog normal.

## 10. Buscador

Buscador nativo de WordPress (bloque `wp-block-search`), icono en el header en todas las páginas.
- URL de resultados: `/?s={query}`.
- Paginación: `/page/{n}/?s={query}`.
- Mismo widget `posts.cards` para renderizar resultados.
- Sin filtros adicionales. Busca sobre todo el post type `post`, así que Blog y Radar de Salud ya aparecen juntos hoy en los resultados (son el mismo post type con categoría distinta).

## 11. Contacto y páginas legales

- **/contacto/**: formulario WPForms Lite (Nombre*, Apellidos, Email*, Mensaje) + reCAPTCHA. Sin datos de contacto directo visibles.
- **/politica-de-cookies/**: gestionada por Cookie Law Info.
- **/politica-de-privacidad/**: texto genérico por defecto de WordPress (boilerplate, no personalizado al negocio — menciona Gravatar, comentarios de blog, etc.). **Revisar si se quiere un texto real antes de migrar.**
- **/terminos-y-condiciones/**: genérico (edad/capacidad legal, uso permitido, propiedad intelectual, conducta, enlaces a terceros).
- **/descargo-de-responsabilidad/**: disclaimer médico/de contenido (no releído línea a línea).
- **/copyright/**: página de copyright.
- **/mas-informacion-sobre-las-cookies/**: información adicional de cookies, no enlazada desde el footer (solo en sitemap).

## 12. Anomalías y decisiones pendientes

1. **`/category/radar-de-salud/` vs `/radar-de-salud/`**: nombres muy parecidos, contenido muy distinto. El archivo automático de categoría no muestra listado de posts (solo CTA + footer) — mismo patrón esperable en las otras 30 URLs `/category/*/`. **Probablemente no aportan valor y podrían no migrarse** (o redirigirse a la page/hub equivalente), a decidir.
2. **`/author/admin/`**: archivo de autor por defecto de Astra, único autor del sitio. A decidir si se migra o se elimina (con o sin redirect).
3. **`/alimentacion-2/`**: ítem de menú de primer nivel que NO sigue el patrón de hub — es un listado simple tipo archivo, paginado en 5 páginas. Convive con Blog y Radar de Salud como "tercer tipo" de listado. A decidir qué hacer con este apartado en la nueva arquitectura (¿se mantiene como listado? ¿se reconvierte en hub real?).
4. **Paginación embebida en pages/posts individuales** (ej. `/menopausia/2/`, `/menopausia/3/`, o `.../senales/2/`): no es "página 2 del hub", sino la paginación del bloque de "artículos relacionados" embebido en esa misma page/post. Genera URLs indexables adicionales no listadas en sitemap pero accesibles. Hay que decidir cómo se replica esto en Astro (probablemente con un componente de paginación client-side o server-rendered en la misma ruta, sin URLs nuevas).
5. **Tarjetas de subcategoría sin link confirmado** en hub y subpágina ("Explora cada área clave...", "Áreas clave relacionadas") — a verificar contra el HTML real antes de migrar (puede ser limitación del extractor, no del sitio).
6. **URL con parámetros `?nocache=1765012468&jet_blog_ajax=1`** encontrada solo por `firecrawl map`: origen no confirmado (posible endpoint AJAX interno de Elementor Pro). No parece contenido público real — descartable para el inventario de páginas a migrar.
7. **Feeds RSS** (`/feed/`, `/comments/feed/`) activos por defecto de WordPress — a decidir si se recrean en Astro o se descartan.
8. **Páginas huérfanas** (sección 1.8): existen y son accesibles pero no están enlazadas desde ningún sitio visible del front. A decidir para cada una: migrar igual (por si tienen tráfico/backlinks), redirigir, o descartar.

## Limitaciones de este análisis (a tener en cuenta antes de dar el inventario por definitivo)

- Solo se inspeccionó en profundidad **1 de 5 hubs** (Hormonas) y **1 de 18 subpáginas** (Menopausia); el resto se asume con el mismo patrón por consistencia de diseño Elementor, no verificado individualmente.
- Solo se inspeccionó **1 artículo de blog normal** (una receta) y **1 de Radar de Salud**; no se comprobó si artículos de blog no-receta varían el cuerpo.
- No se confirmaron todos los plugins activos (deducido de metadatos, no de un listado exhaustivo).
- No se releyeron completas las páginas legales línea por línea.
- Antes de construir en Astro, conviene revisar al menos 2-3 hubs/subpáginas más y 2-3 artículos más para confirmar que el patrón es realmente uniforme.
