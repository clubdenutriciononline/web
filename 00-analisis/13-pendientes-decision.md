# Pendientes de decisión — lista corta final

Fecha: 2026-09-13. Estas son las únicas 4 cosas que quedan abiertas y que necesitan una decisión tuya. Todo lo demás de la migración está corregido o comprobado (ver [12-comprobaciones-finales.md](12-comprobaciones-finales.md) y [11-auditoria-completa.md](11-auditoria-completa.md)).

1. **`/ayuno-intermitente-2/`** — mismo patrón de slug duplicado histórico que tenía `/alimentacion-2/`. ¿Se aplica el mismo tratamiento (`/ayuno-intermitente/` + redirect 301) o se deja como está?

2. **`/suscripcion-lista-comunidad/`** — ¿sigue activo algún funnel externo que apunte a esta URL? Ya está excluida del sitemap, pero eso no basta para evitar indexación si Google la encuentra por otra vía; si el funnel ya no se usa, se le puede añadir `noindex`.

3. **Páginas huérfanas** (`/nutricion/`, `/mente/`, `/cuerpo/`, `/keto-lowcarb/`, `/recetas-sanas-keto-y-low-carb/`, `/servicios-del-club-de-nutricion/`, `/coaching-nutricional/`) — no están construidas en Astro. Hay que decidir, para cada una: construirla, redirigirla a otra página existente, o descartarla. Esto también determina si se corrigen los 3 enlaces internos de artículos que apuntan a `/mente/` y `/nutricion/` (ver detalle en el punto 1 de "Pendiente de decisión" en [12-comprobaciones-finales.md](12-comprobaciones-finales.md)).

4. **URLs automáticas históricas de WordPress** (`/category/*/`, `/tag/*/`, `/author/*/`) — decidir si se recrean con redirect, se dejan morir (404), o se ignoran porque nunca estuvieron indexadas de forma relevante.

Nada de esto se ha tocado. En cuanto decidas, retomamos.
