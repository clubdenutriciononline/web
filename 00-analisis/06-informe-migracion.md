# Informe de migración de contenido — clubdenutricion.es → Astro

Fecha: 2026-09-13

## 1. Páginas migradas (contenido real, sin placeholders de texto)

- **1** Home
- **5** hubs principales (Hormonas, Energía, Metabolismo, Microbiota, Mentalidad)
- **18** subpáginas (incluye Perimenopausia y Cortisol como páginas a medida, e Inflamación hormonal con su plantilla propia TOC+FAQ)
- **1** Alimentación (migrada de `/alimentacion-2/` a `/alimentacion/`)
- **1** Contacto
- **6** páginas legales (cookies, privacidad, términos, descargo, copyright, más información sobre cookies)
- **2** páginas de lead magnet (optin + descarga)
- **1** Suscripción lista comunidad (conservada tal cual, pendiente de tu confirmación sobre si el funnel sigue activo)

**Total páginas estáticas con contenido real: 35**

## 2. Artículos del Blog migrados

**73 de 73** — todos en `src/content/blog/<slug>/index.md`, con título, slug real, fecha, imagen destacada, categoría, etiquetas, descripción/SEO, contenido completo (encabezados, listas, enlaces, imágenes internas), tabla nutricional en las 5 recetas que la tenían, y fuentes cuando existían.

Un artículo (`sueno-profundo-hormona-crecimiento-metabolismo-cerebro`) se identificó inicialmente como posible Radar de Salud por su formato, pero se confirmó y migró como Blog normal (categoría `energia/sueno`), tal como determinaba el análisis inicial que sí había verificado el índice real de Radar.

**0 imágenes con placeholder** en los 73 artículos.

## 3. Publicaciones del Radar de Salud migradas

**9 de 9** — en `src/content/radar/<slug>/index.md`, en su propia content collection independiente del Blog, con las 4 secciones fijas (Qué ha pasado / Por qué importa / Interpretación clínica / Conclusión rápida) preservadas en el cuerpo, y nivel de evidencia + fuente en el frontmatter.

**Hallazgo aplicado**: el original usa **4** niveles de evidencia reales (Alto/Medio/Bajo/**Emergente**), no 3 — se amplió el schema (`content.config.ts`) para reflejarlo con fidelidad en vez de forzar "Emergente" a "Bajo".

**1 imagen con placeholder**: la publicación sobre primeras señales de perimenopausia no tiene imagen destacada en el original (confirmado por API de WordPress, `featured_media: 0`) — no es un fallo de migración, es fiel al estado real de esa publicación.

## 4. Recursos visuales migrados

- **253** imágenes reales descargadas dentro de `src/content/blog/` y `src/content/radar/` (portadas + imágenes de cuerpo).
- **137** imágenes reales descargadas para las páginas estáticas (`src/pages/**/_images/`).
- Logo real (`public/images/site/logo.png`) y banner decorativo (`public/images/site/banner-fondo-trans.png`), migrados y usados en Header/Footer.
- 2 imágenes del lead magnet que quedaron enlazadas directamente al WordPress original (`wp-content/uploads`) durante la primera pasada — **detectadas y corregidas** en esta revisión final, descargadas localmente.
- Iconos sociales: el original usa SVG inline propios del tema Astra (no son archivos descargables). Se creó un icon-set SVG genérico propio (`SocialIcon.astro`) para que se sigan viendo como iconos, no como texto — es la única pieza gráfica que no es una copia literal del original, sino una recreación equivalente.

## 5. Recursos que NO se han podido migrar (o migran con salvedad)

| Recurso | Motivo |
|---|---|
| Imagen destacada de la publicación Radar "primeras señales de perimenopausia" | No existe en el original (placeholder usado, fiel al estado real) |
| Formulario del lead magnet (`/lm-5-pasos-optin/`) | El original es un iframe de un servicio externo de funnels (`ipzmarketing.com`), contenido no accesible desde fuera — se reconstruyó visualmente con campos propios (nombre + email), sin conexión de envío real (ver punto 10) |
| Botones "compartir" exactos del tema / icono de búsqueda | El original no usa imágenes descargables para esto (SVG inline de tema / texto plano "Buscar") — no había nada que migrar |

## 6. URLs que han cambiado

**Solo una, según lo decidido**: `/alimentacion-2/` → `/alimentacion/`, con redirect 301 configurado en `astro.config.mjs` (verificado: el build genera `/alimentacion-2/index.html` como página de redirección).

Ninguna otra URL pública cambia.

## 7. Enlaces internos detectados que todavía apuntan a WordPress

Se revisaron todas las referencias a `clubdenutricion.es` en el contenido migrado:

- **Ninguna** apunta realmente al WordPress antiguo dentro del contenido de artículos — las únicas coincidencias eran enlaces a `facebook.com/clubdenutricion.es/` (la página de Facebook, cuyo nombre de usuario contiene ese texto) y menciones textuales del propio dominio dentro de las páginas legales (copyright, términos, privacidad — correcto, es el nombre de la marca/dominio, no un enlace roto).
- **2 imágenes** sí colgaban del WordPress original (`wp-content/uploads`) en las páginas de lead magnet — **ya corregidas** en esta revisión (descargadas y servidas localmente).
- **Enlaces internos ya existentes en el WordPress original que apuntan a rutas inconsistentes** (no introducidos por la migración, heredados tal cual por fidelidad): en `beneficios-del-boniato-o-batata` hay un enlace a `/nutricion/macronutrientes-y-micronutrientes/` que no coincide con el slug plano real de esa página — probable enlace roto ya en el sitio original, no corregido para no alterar contenido sin tu autorización.
- **Anchors de "Tabla de contenidos" en 14 artículos "pilar"**: usan IDs generados por Elementor/WordPress (`#elementor-toc__heading-anchor-N`) que no coincidirán con los IDs que genera el renderizador de Markdown de Astro — la navegación interna de esas tablas de contenido no funcionará hasta reconciliar los anchors (tarea menor pendiente, técnica, no de contenido).

## 8. Dependencias de WordPress que aún necesitan sustitución

| Dependencia WordPress | Estado en Astro |
|---|---|
| WPForms Lite + reCAPTCHA (formulario de contacto) | Sustituido por componente propio (`ContactForm.astro`), sin backend — **envío real pendiente** de decisión definitiva (Mailrelay en evaluación) |
| Iframe de ipzmarketing.com (formulario del lead magnet) | Sustituido por formulario propio equivalente — **envío real pendiente**, mismo caso que contacto |
| Buscador nativo de WordPress (`?s=`) | **Ya sustituido y funcional**: Pagefind (ver punto 9) |
| WordPress/PHP como servidor de páginas | Sustituido por generación estática de Astro |

## 9. Estado del buscador

**Implementado y funcional.** Pagefind indexa el HTML generado en el build (130 páginas, ~4.200 palabras), incluyendo Blog y Radar de Salud conjuntamente sin distinción — ambos son páginas HTML estáticas normales para Pagefind. Se monta bajo demanda (al pulsar el icono de búsqueda del header) para no cargar peso extra si nadie lo usa. Solo funciona en el sitio construido (`npm run build`), no en `astro dev`, porque el índice se genera post-build.

## 10. Estado del formulario de contacto

**Migrado visualmente, funcional en modo de pruebas, sin envío real conectado** — tal como decidiste. Al enviarse, muestra un aviso explícito de que el mensaje NO se ha enviado de verdad, para no engañar a quien lo rellene. Mismo patrón aplicado al formulario del lead magnet. Integración definitiva (probablemente Mailrelay) pendiente para una sesión posterior, antes del despliegue en producción.

## 11. Resultado de `astro check`

```
Result (70 files):
- 0 errors
- 0 warnings
- 39 hints
```
(Los 39 "hints" son avisos cosméticos de una API de Zod marcada como "deprecated" en esta versión, sin impacto funcional.)

## 12. Resultado de `astro build`

```
130 page(s) built — 0 errores
Pagefind: 130 páginas indexadas, 4.228 palabras, 1 idioma (es)
```

## Correcciones adicionales aplicadas durante esta revisión final

- Artículos relacionados y navegación anterior/siguiente en las páginas de artículo (`[slug]/index.astro`) — antes placeholder vacío, ahora calculado realmente por categoría (relacionados) y por fecha dentro de la misma collection (anterior/siguiente), replicando el comportamiento de WordPress.
- `TemasRelacionadosGrid.astro` ahora admite imágenes reales además de emoji (iguala el fix ya aplicado a `CausasGrid.astro`) — aplicado a Metabolismo y Microbiota, que en el original usan imagen, no emoji.
- Corrección del nivel de evidencia "Emergente" en 3 publicaciones del Radar (ver punto 3).
- Iconos sociales reales (SVG) en vez de texto, en Header y Footer.
- 2 imágenes del lead magnet migradas de hotlink a WordPress → alojamiento local.

## Pendiente para próximas fases (no bloquea el deploy de pruebas)

- Decisión definitiva sobre las páginas huérfanas, URLs automáticas de WordPress y `/suscripcion-lista-comunidad/` (ver `03-huerfanas-e-indexacion.md`).
- Integración real de envío en los formularios de contacto y lead magnet (Mailrelay u otra).
- Reconciliar los anchors de "Tabla de contenidos" en los 14 artículos pilar con los IDs reales de Astro.
- Revisar el enlace interno roto heredado en `beneficios-del-boniato-o-batata`.
- Feeds RSS (`/feed/`, `/comments/feed/`) — no recreados todavía.
