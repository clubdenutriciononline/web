# Pendiente — Sección Recetas

Estado: **EN CURSO (2026-10-17).** Hecho: página madre `/recetas/`, las 3 subpáginas, Recetas en el menú, plantilla de receta (`RecipeLayout`, campo `receta` en la collection `blog`) y las 6 recetas existentes migradas a la plantilla (salmón, ensalada de pollo y aguacate, tacos keto, tortilla de espinacas, pan de proteínas —ahora keto/low carb, sin la afirmación "efecto quemagrasas"— y yogur griego), con textos reescritos, valores nutricionales recalculados por ración e imágenes nuevas. Pendiente: recetas de Antiinflamatorias y Energía hormonal (con el calendario de publicaciones).

### Cómo crear una receta nueva

Copiar `src/content/blog/receta-salmon-al-horno-con-esparragos/` y cambiar: `category` (`recetas/antiinflamatorias`, `recetas/energia-hormonal` o `recetas/keto-low-carb`), `nutricion` (por ración), el bloque `receta` (raciones, tiempos, dificultad, ingredientes, `imagenIngredientes`, `pasos` con 2-3 imágenes, `resultado`, `consejo` opcional) y la introducción del cuerpo. Imágenes: ilustración de ingredientes en acuarela, fotos de pasos y foto final, generadas con el MCP. La página se monta sola y aparece en su subpágina y en `/recetas/`.

En el WordPress existen la categoría RECETAS y sus 3 subcategorías (Antiinflamatorias, Energía hormonal, Keto / low carb). En la web nueva todavía no hay ninguna página de recetas; solo las 6 recetas keto del blog (`category: "recetas/keto-low-carb"` y una `"recetas"`).

## Decisiones de la usuaria

- **Menú:** "Recetas" detrás de Alimentación, con desplegable de sus 3 tipos: … Mentalidad · Alimentación · Recetas · Blog · Radar de Salud · Contacto. Comprobar que el menú sigue cabiendo en una línea (si no, ajustar el espacio entre opciones).
- **Las 6 recetas keto existentes:** pasarlas a la plantilla nueva de receta, manteniendo su dirección (no perder posicionamiento).
- **Recetas nuevas:** ninguna por ahora. Las de Antiinflamatorias y Energía hormonal irán con el calendario de publicaciones (ver `Pendiente - Publicaciones programadas de blog.md`).

## Estructura

1. **Página madre `/recetas/` (sencilla):** hero, introducción corta y los 3 tipos explicados en un bloque cada uno (imagen + enlace a su página). Debajo, 6 recetas relacionadas mezclando los 3 tipos.
2. **Subpáginas** `/recetas-antiinflamatorias/`, `/recetas-energia-hormonal/`, `/recetas-keto-low-carb/`: hero sencillo con una frase y, debajo, directamente las tarjetas de sus recetas con el título del tipo (p. ej. "Recetas antiinflamatorias") en lugar de "Artículos relacionados". Sin texto fijo. Las tarjetas aparecen solas al publicar cada receta. Si una subpágina no tiene recetas aún, mostrar un aviso breve ("Próximamente…") en vez de un bloque vacío.
3. **Plantilla de receta** (nueva, `RecipeLayout`):
   - Título y una introducción corta.
   - Foto del plato terminado (generada con IA).
   - Datos rápidos: raciones, tiempo, dificultad.
   - Ingredientes, con alguna ilustración de ingredientes.
   - Pasos numerados, con 2-3 fotos de pasos intermedios (generadas).
   - Tabla nutricional por ración (calorías, grasas, proteínas, hidratos y algunos minerales), calculada a partir de los ingredientes con tablas de composición (BEDCA / USDA) e indicada como aproximada. Ya existe `RecipeNutritionTable.astro` y el campo `nutricion` en la collection `blog`.
   - Datos estructurados `schema.org/Recipe` para que Google pueda mostrar foto, tiempo y calorías.

## Contenido

Partir de recetas de internet como base, pero reescribir siempre textos y pasos con palabras propias y el tono de la marca, con fotos propias generadas. No copiar texto ni fotos de otros sitios.
