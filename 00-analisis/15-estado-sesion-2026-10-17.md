# Estado — sesión 2026-10-17

Resumen de lo hecho hoy y lo que queda pendiente, para retomar sin perder contexto.

## Inmediato (lo que estaba a medias al cerrar la sesión)

1. **MCP de generación de imágenes** — la usuaria pidió crear una imagen para la portada de la entrada de Radar de Salud "La perimenopausia puede empezar antes de lo esperado..." (es la única sin foto real, lleva un fallback de marca desde antes). Eligió el perfil **Proyecto**.
   - Ya se actualizó `GEMINI_API_KEY` e `IMAGE_OUTPUT_DIR` en `C:\Users\BeaMar\.claude.json` al perfil Proyecto (antes estaba en Trabajo). Copia de seguridad guardada como `.claude.json.bak_<fecha>` en `C:\Users\BeaMar\`.
   - **Falta: la usuaria tiene que reiniciar Claude Code** para que el MCP cargue la nueva config. Después de reiniciar:
     - Generar una imagen sencilla con el texto "Perimenopausia", mirando el formato (tamaño/proporción, ~1.6:1, estilo) del resto de portadas de Radar en `src/content/radar/*/cover.jpg` (ver `ayuno-intermitente-cerebro-efectos-ciencia`, `kefir-microbiota-bacterias-yogur-salud-intestinal`, etc. como referencia).
     - Guardarla como `src/content/radar/la-perimenopausia-puede-empezar-antes-de-lo-esperado-estas-son-sus-primeras-senales/cover.jpg`, sustituyendo el fallback.
     - Revisar `imageAlt` en el `index.md` de esa entrada (hoy dice "Club de Nutrición", genérico del fallback — cambiarlo a algo descriptivo de la nueva imagen).
     - Build + check + commit + push + comprobar en el preview.

## Hecho en esta sesión (ya desplegado)

- **Hormonas**: pase completo de fidelidad visual frente al original (degradados por sección, imagen del hero sin recortar con zoom, píldoras de síntomas con emoji, iconos de causas en alta resolución de verdad —el bug real era que `CausasGrid` forzaba el `<Image>` a 80×80px—, tarjetas "explora área" con el ancho real medido en el HTML (~32%, no 20% ni 50%), artículos relacionados añadidos (antes era el único hub sin esa sección).
- **Energía**: adaptada a la misma plantilla validada en Hormonas, con sus propias diferencias reales (hero tipo "overlay", 3 temas relacionados en vez de 4, síntomas con tarjetas en vez de lista de check, patrón 3 arriba + 2 abajo en "Soluciones Prácticas").
- **Hallazgo clave de plantilla**: el hero **"overlay"** (imagen a ancho completo con tarjeta de texto semitransparente superpuesta) es el patrón real en 4 de las 5 páginas madre — **Hormonas es la única excepción** (hero "side a side"). `Hero.astro` ya tiene `overlay` como valor por defecto; `HubTemplateA` (solo Hormonas) fuerza `layout="side"`. Documentado en `Páginas madre.md`.
- **ArticulosRelacionados**: paginación "« Anterior / Página X de Y / Siguiente »" en colores de marca, ahora **por defecto** (3 por página) en cualquier página que use el componente, salvo que se pase `pageSize={false}`.
- **`/blog/` y `/radar-de-salud/`**: paginación unificada en los mismos colores; `/radar-de-salud/` además pasó a usar el mismo componente de tarjeta que `/blog/` (antes tenía una tarjeta propia sin imagen ni insignia).

## Pendiente — a medio plazo

1. **Adaptar Metabolismo, Microbiota y Mentalidad** a la plantilla validada (ver `Páginas madre.md`, sección "Receta de componentes validada"). Para cada una: copiar la estructura de `energia/index.astro` como punto de partida (ya usa `HubTemplateB`, hero "overlay" por defecto), comprobar banda A/B por sección en el CSS del original (no copiar a ciegas), contar causas/síntomas/pilares/temas reales, y pasar por una revisión visual de la usuaria igual que se hizo con Hormonas y Energía.
2. **Páginas hijas de Hormonas** (Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol, Inflamación hormonal) — documentadas en `Páginas hijas - Hormonas (Menopausia).md`, pero aún sin pasar por la revisión de fidelidad visual que sí tuvieron Hormonas y Energía.
3. **Publicaciones programadas de blog** — en pausa a propósito hasta terminar los formatos (ver `Pendiente - Publicaciones programadas de blog.md`).
4. **4 decisiones abiertas sin tocar** (ver `13-pendientes-decision.md`): slug `/ayuno-intermitente-2/`, vigencia de `/suscripcion-lista-comunidad/`, qué hacer con las páginas huérfanas, y las URLs automáticas históricas de WordPress (`/category/*/`, `/tag/*/`, `/author/*/`).
5. **Token de GitHub expuesto** (aviso de sesiones anteriores) — revocarlo si no se ha hecho ya.
