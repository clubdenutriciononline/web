# Deploy de pruebas en Vercel — informe

Fecha: 2026-09-13

## 1. URL de la preview / repositorio

- **Preview Vercel (temporal, sin login)**: https://temporary-prompt-coral-lgtc57c.vercel.app
- **Reclamar el deployment** (para vincularlo a una cuenta de Vercel y que no caduque): https://vercel.com/claim-deployment?code=472a184e-4675-4e90-822c-37f48da3e4ff — **caduca ~1 hora después de cada redeploy si no se reclama.**
- **Repositorio**: https://github.com/machangafactory/clubdenutricion-web (privado). Cualquier push a `master` puede volver a desplegarse con `vercel deploy --temporary` (temporal) o conectando el repo a un proyecto Vercel real (persistente, recomendado para las siguientes fases).

No se ha tocado el hosting ni el DNS de WordPress. `clubdenutricion.es` sigue intacto y sirviendo la web actual.

## 2. Resultado del build

```
astro check   → 0 errores, 0 warnings, 39 hints (cosméticos, Zod deprecation)
astro build   → 130 páginas, 0 errores
pagefind      → 130 páginas indexadas, ~4.200 palabras, 1 idioma (es)
vercel deploy → READY
```

## 3. Problemas encontrados durante la revisión

1. **`/alimentacion-2/` no hacía un 301 real** — el redirect de `astro.config.mjs` solo genera una página HTML con `<meta http-equiv="refresh">` (devolvía 200 OK), porque el output es estático sin adaptador de servidor. Confirmado con `curl -I`.

## 4. Problemas corregidos

1. Se añadió `vercel.json` con una regla de redirect nativa de la plataforma → `/alimentacion-2/` ahora devuelve **308 Permanent Redirect** con `Location: /alimentacion/` (verificado con `curl -I`). **Nota técnica**: es 308, no 301 literal — es el código moderno equivalente (preserva el método HTTP) y Google lo trata igual que un 301 a efectos de SEO. Si prefieres forzar el código exacto 301, puedo cambiarlo en `vercel.json` sin ningún otro impacto.

## 5. Comprobaciones realizadas (todas correctas)

| Elemento | Resultado |
|---|---|
| Home, 5 hubs, 18 subpáginas | Todas 200 OK |
| `/alimentacion/` | 200 OK |
| Blog (`/blog/`, `/blog/2/`) | 200 OK |
| Radar de Salud (`/radar-de-salud/`) | 200 OK |
| Artículos de Blog (spot-check en 8 artículos variados) | Todos 200 OK |
| Publicaciones de Radar (spot-check en 4) | Todas 200 OK |
| 6 páginas legales | Todas 200 OK |
| Contacto, lead magnet (2), suscripción | Todas 200 OK |
| Página inexistente | 404 correcto |
| Menú desplegable (Hormonas: Ciclo Menstrual, Perimenopausia, Cortisol...) | Presente en el HTML de la home |
| Grid final "Explora cada área clave" (Hormonas) | Enlaces reales confirmados: `/menopausia/`, `/perimenopausia/`, `/cortisol/`, `/inflamacion-hormonal/` |
| Breadcrumb en artículo de Blog | Presente |
| Tabla de contenidos / "Resumen clave" (Perimenopausia) | Presente |
| Gráfico SVG (Perimenopausia) y diagrama HPA (Cortisol) | Presentes en el HTML |
| Acordeón de Preguntas Frecuentes (Inflamación hormonal) | Presente |
| Artículos relacionados + navegación anterior/siguiente (artículo de Blog) | Presentes y con hrefs reales |
| Nivel de evidencia "Emergente" (Radar) | Se renderiza correctamente tras la corrección de schema |
| Buscador Pagefind (`pagefind-ui.js`, `pagefind-ui.css`, índice) | Todo servido correctamente (200 OK) |
| Meta viewport (base de responsive) | Presente |
| Logo e imágenes reales (spot-check) | Sirven en 200 OK desde `/images/` y `/_astro/` (Astro Image, optimizadas a webp) |
| Formulario de contacto — aviso de modo de pruebas | Presente en el HTML/JS servido |
| Enlaces/imágenes colgando del WordPress antiguo | Ninguno encontrado en el HTML servido (las únicas menciones a "clubdenutricion.es" son la URL de Facebook/Instagram y los metadatos canónicos/OG, que apuntan intencionadamente al dominio final de producción) |

## 6. Diferencia de comportamiento respecto a WordPress detectada (no es un bug)

En el WordPress original, `/resistencia-insulina/` mostraba la sección "Artículos relacionados" **vacía** porque, en el momento del análisis, ningún post tenía la categoría exacta. En la versión Astro, esa misma sección **ahora sí muestra un artículo** (el post de blog "Resistencia a la insulina: síntomas, causas y cómo revertirla de forma natural", migrado con categoría `metabolismo/resistencia-insulina`), porque el componente calcula la relación automáticamente contra el contenido real que ya existe — exactamente el comportamiento que pediste ("preparado para mostrar automáticamente artículos relacionados cuando existan"). No es un error: es la funcionalidad automática funcionando como se diseñó, con datos reales.

## 7. Comprobaciones NO realizadas en este pase (limitación de método)

Esta revisión se hizo con `curl` (peticiones HTTP directas), lo que permite verificar con certeza códigos de estado, contenido HTML/JS servido, redirects, y presencia de elementos — pero **no permite verificar visualmente**:
- Aspecto real en distintos tamaños de pantalla (responsive visual, más allá de confirmar que existe el meta viewport y media queries en el CSS).
- Comportamiento interactivo real del buscador (que el desplegable se abra, que escribir un término devuelva resultados visibles) — sí se confirmó que los archivos de Pagefind se sirven y el índice existe, pero no se simuló una búsqueda real en navegador.
- Aspecto visual de los gráficos SVG/diagrama CSS (se confirmó que el código existe en el HTML, no su renderizado visual).

Si quieres, puedo pedir una revisión visual complementaria (capturas de pantalla en varios tamaños) antes de dar esta fase por cerrada del todo.
