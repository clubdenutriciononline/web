# Comprobaciones finales antes de la revisión visual

Fecha: 2026-09-13
Método: crawl automatizado sobre las 129 páginas ya construidas (`dist/`), analizando el HTML final generado — no una nueva ronda de scraping externo. Además de un fix puntual (redirect 301) y otro (H1 de Alimentación), esta fase es principalmente de **comprobación**, no de cambios.

Deploy de pruebas activo: https://temporary-rapid-amber-lppd9ax.vercel.app (reclamar: https://vercel.com/claim-deployment?code=9fb132df-e76b-41fa-9a00-a3c45ee3a2a3) — **el fix del H1 de Alimentación es posterior a este deploy** (invisible, sin impacto en tu revisión visual); si quieres verlo reflejado, dímelo y redespliego.

---

## CORREGIDO

1. **Redirect `/alimentacion-2/` → `/alimentacion/`**: cambiado de 308 a **301 permanente** en `vercel.json`. Verificado en vivo con `curl -I` → `HTTP/1.1 301 Moved Permanently`.
2. **Sin enlaces internos residuales a `/alimentacion-2/`**: confirmado en código fuente y en el HTML construido — cero coincidencias.
3. **H1 real en `/alimentacion/`** (y su paginación `/alimentacion/2/` a `/5/`): la página solo tenía un H2 ("Alimentación"), sin H1. Añadido un H1 con la misma clase visual (mayúsculas, centrado, color de marca) — **sin cambiar el aspecto**.

## COMPROBADO (crawl de las 129 páginas)

| Comprobación | Resultado |
|---|---|
| Páginas vacías o casi vacías | Solo 1 — `/alimentacion-2/`, que es el stub de redirect (51 bytes, esperado, no es un error) |
| H1 ausente | Solo la misma página de redirect (no aplica tener H1 en un redirect) |
| H1 duplicado | 0 |
| IDs duplicados dentro de la misma página | 0 |
| Anchors internos (`#ancla`) sin destino real | 0 |
| Enlaces `<a href="">` vacíos | 0 |
| `<img>` sin `src` | 0 |
| `alt` sospechoso (nombre de archivo en vez de descripción) | 0 |
| Placeholders / TODO / Lorem ipsum visibles | 0 |
| Referencias a WordPress/Elementor visibles en el texto | 0 |
| Referencias a `localhost` | 0 |
| Referencias a `*.vercel.app` dentro del propio HTML | 0 |
| `example.com` u otros dominios de prueba | 0 |
| Botones sin nombre accesible | 0 |
| Imágenes servidas desde dominio externo (WordPress u otro) | 0 — las 768 referencias de imagen comprobadas apuntan todas a archivos locales existentes |
| Referencias `/_astro/*` rotas (archivo no existe) | 0 de 768 comprobadas |
| JSON-LD inválido (JSON malformado) | 0 |
| JSON-LD por tipo | `WebSite`: 129 · `Organization`: 129 · `Article`: 72 (= nº real de artículos de Blog) · `BreadcrumbList`: 72 (coincide con Article) · `NewsArticle`: 9 (= nº real de publicaciones de Radar) — los recuentos cuadran exactamente, sin mezcla Blog/Radar |
| Enlaces externos malformados | 0 de 48 enlaces externos únicos (Amazon afiliados, YouTube, redes sociales, Google Drive, Google Fonts/Analytics) |
| Rendimiento — fuentes duplicadas | 0 (Google Fonts se referencia una sola vez por página) |
| Rendimiento — scripts innecesarios | Solo el script de búsqueda de Pagefind (carga diferida al hacer clic) — sin librerías de iconos externas cargadas |
| Rendimiento — tamaño de `dist/` | 38MB en total (incluye ~250 imágenes reales + índice de Pagefind) |
| Sitemap — páginas de funnel excluidas | Confirmado en vivo: `/lm-5-pasos-descarga/` y `/suscripcion-lista-comunidad/` no aparecen en `sitemap-0.xml` |
| robots.txt | Servido correctamente, referencia el sitemap |

## PENDIENTE DE DECISIÓN (no se han tocado)

1. **4 enlaces internos rotos dentro de contenido de artículos** (heredados del WordPress original, no introducidos por la migración):
   - `beneficios-del-boniato-o-batata`: enlaza a `/nutricion/macronutrientes-y-micronutrientes/` — la página real existe en `/macronutrientes-y-micronutrientes/` (sin el prefijo `/nutricion/`). Ya señalado en una fase anterior como probable error del propio WordPress.
   - `hambre-fisica-o-emocional`: enlaza a `/mente/` — es una de las páginas huérfanas, que **no está construida todavía** (ver punto de huérfanas más abajo).
   - `propiedades-de-la-zanahoria`: enlaza a `/nutricion/` — misma situación, página huérfana no construida.
   - `que-es-el-coaching-nutricional`: enlaza a `/coach/contacto/` — no corresponde a ninguna página real ni antigua ni nueva; parece un enlace ya roto en el WordPress original.
   - **No corregidos** porque arreglarlos implica decidir: (a) construir las páginas huérfanas correspondientes, o (b) reescribir el enlace dentro del contenido editorial — ambas cosas están fuera de "corrección objetiva" y tú pediste explícitamente no tocar páginas huérfanas todavía.
2. **Imágenes de portada pesadas** (500-640KB, formato PNG sin convertir a WebP) en ~10 artículos/publicaciones — podría reducirse sin cambio visual perceptible, pero es una optimización que no se ha aplicado para no arriesgar nada mientras haces tu revisión.
3. Enlace `http://safeharbor.export.gov/...` dentro del texto de la Política de Privacidad (boilerplate de WordPress, ya clonado tal cual por decisión tuya): apunta a un programa gubernamental de EE.UU. descontinuado hace años — es un enlace muerto **del contenido legal original**, no introducido por la migración. Documentado, no tocado (la revisión legal es una fase aparte, ya decidida).

## NO TOCAR TODAVÍA (confirmado, sin acción)

- `/ayuno-intermitente-2/` — mismo patrón de sufijo histórico que tenía `/alimentacion-2/`, sin resolver.
- `/suscripcion-lista-comunidad/` — posible funnel externo activo, pendiente de confirmar.
- Páginas huérfanas (`/nutricion/`, `/mente/`, `/cuerpo/`, `/keto-lowcarb/`, `/recetas-sanas-keto-y-low-carb/`, `/servicios-del-club-de-nutricion/`, `/coaching-nutricional/`) — **ni siquiera están construidas en Astro todavía** (nunca se llegó a crear una página para ellas, a diferencia de lo que sugería el inventario inicial). Antes de decidir qué hacer con ellas hay que decidir primero si se construyen, se redirigen o se descartan.
- URLs automáticas históricas de WordPress (`/category/*/`, `/tag/*/`, `/author/*/`) — siguen sin recrearse, pendientes de la decisión sobre indexación ya documentada en fases anteriores.

## Grep final sobre código fuente (no solo el build)

Además del crawl sobre `dist/`, se ha hecho un grep dedicado sobre `src/` (código fuente, no HTML generado) buscando `TODO|FIXME|PLACEHOLDER|mock|test mode|modo de pruebas|temporary|temporal|localhost|example.com|wordpress|elementor`, para distinguir avisos intencionados de errores reales olvidados.

**Todo lo encontrado es intencionado y ya documentado, nada es un olvido real**:
- 4 comentarios `TODO` en `ContactForm.astro` y `lm-5-pasos-optin/index.astro`: todos marcan explícitamente la integración de envío real pendiente de tu decisión (Mailrelay/MailerLite/Brevo) — ya acordado como fase posterior, no un olvido.
- Avisos de "modo de pruebas" en esos mismos 2 formularios: son avisos **visibles a propósito** en la propia interfaz para que nadie confunda un envío de prueba con uno real — comportamiento deseado mientras no se conecte el envío definitivo.
- "temporal" aparece 2 veces como palabra normal de contenido real (una cookie técnica en la Política de Privacidad, una bajada de energía transitoria en el artículo de Ayuno Intermitente) — no son residuos de desarrollo.
- Referencias a "WordPress"/"Elementor": todas dentro de comentarios de código (`.astro`) que documentan decisiones de migración (de dónde viene cada estructura, por qué se hizo así) — se eliminan en el build, nunca llegan al HTML servido (ya confirmado: 0 referencias a WordPress/Elementor en `dist/`).
- Referencias a `/alimentacion-2/` en código fuente: son la propia configuración del redirect (`vercel.json`, `astro.config.mjs`) y comentarios explicando la migración — no enlaces sueltos.
- **Cero** coincidencias de `localhost`, `example.com`, `FIXME`, `PLACEHOLDER`, `mock` en todo `src/`.

## Build final

```
astro check  → 0 errores, 0 warnings, 39 hints (preexistentes)
astro build  → 129 páginas, 0 errores
```

Todo commiteado y pusheado a `master`. Fase cerrada — no se seguirá buscando mejoras adicionales salvo que tú lo pidas después de tu revisión visual.
