# Estado — sesión 2026-10-17

Resumen de lo hecho hoy y lo que queda pendiente, para retomar sin perder contexto. Todo lo de abajo está subido a GitHub y desplegado en el preview de Vercel.

## ⚠️ Recordatorio urgente

- **Volver a activar Cloudflare** en clubdenutricion.es (dash.cloudflare.com → dominio → Overview → "Enable Cloudflare on Site", o poner las nubes en naranja en DNS). Se pausó a mano el 17 oct por el bloqueo de Movistar durante los partidos de LaLiga; el plugin que debía desactivarlo solo no detectó el bloqueo. Comprobar: si la web responde desde 62.210.212.90 sigue pausado; si responde desde 188.114.x.x está activo.

## Siguiente sesión — por este orden

1. **Adaptar las páginas hijas** a la plantilla validada en Fatiga crónica (`Plantilla - Páginas hijas.md`): Sueño, Rutinas energéticas, Pérdida de grasa femenina, Resistencia a la insulina, Ayuno intermitente, Digestión, Inflamación intestinal, Probióticos y alimentación, Ansiedad por la comida, Estrés y hábitos, Relación con el cuerpo; y las de Hormonas (Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol, Inflamación hormonal), que usan otra plantilla (SubpageTemplateA) y tienen variantes propias (título en el hero, listas en 2 columnas, soluciones en píldoras, "Explora cada área"). En cada una: medir el original, iconos del original (`src/lib/iconos.ts`), causas con ilustración estilo Ciclo menstrual y relacionados con respaldo de la madre.
2. **Revisar el formato de las entradas de blog** (plantilla de artículo `ArticleLayout`): tipografía, imágenes, tabla de contenidos, etc., igual que se ha hecho con madres, hijas y recetas.

## Ideas pendientes de definir — tarjetas de entradas

En las tarjetas de entradas (blog, relacionados, recetas, portada) hoy solo hay una etiqueta rosa con la subcategoría. Ideas de la usuaria, **por definir cuál se aplica**:

- **Distinguir las recetas:** un icono en la esquina superior izquierda de la miniatura (p. ej. cuchara y tenedor) o una etiqueta "Receta", para saber de un vistazo que la entrada es una receta. Ejemplo: en `/blog/` la primera entrada ahora es la receta de energía hormonal y no se distingue de un artículo.
- **Etiqueta de la categoría madre:** una segunda píldora igual que la de la subcategoría pero con el nombre de la categoría madre (Recetas, Energía, Hormonas…), en **morado oscuro** (`#6C2F50`, el color de los títulos de las entradas). Dos posibles ubicaciones:
  - en la esquina superior izquierda de la imagen, o
  - fuera de la imagen, al lado del logo pequeño que hay justo debajo, para no saturar la imagen (opción que también le gusta a la usuaria).
  Ejemplo: la entrada de Sueño llevaría "Energía" (madre) además de "Sueño" (subcategoría).

## Otros pendientes

- **Responsive (móvil y tablet):** blog a 9 entradas por página, tarjetas compactas en móvil, menú hamburguesa y cabecera fija en móvil (ver `Pendiente - Responsive (móvil y tablet).md`).
- **Publicaciones programadas del blog** y la idea de convertir cada tarjeta de soluciones en un artículo enlazado (ver `Pendiente - Publicaciones programadas de blog.md`).
- **Más recetas** de Antiinflamatorias y Energía hormonal (tienen 1 cada una), con el calendario de publicaciones.
- **4 decisiones abiertas** (ver `13-pendientes-decision.md`): slug `/ayuno-intermitente-2/`, `/suscripcion-lista-comunidad/`, páginas huérfanas y URLs automáticas de WordPress.
- **Token de GitHub expuesto** (aviso de sesiones anteriores) — revocarlo si no se ha hecho.
- **Google Drive y git:** Drive crea archivos `desktop.ini` dentro de `.git` y rompe el mantenimiento de git (se limpiaron 248 el 17 oct). Si vuelve a pasar, valorar sacar la carpeta del proyecto de Drive (el código ya está en GitHub).

## Hecho en esta sesión

### Páginas madre (todas unificadas)
- **Hero unificado** en Hormonas, Energía, Metabolismo, Microbiota, Mentalidad, Alimentación y Recetas: imagen horizontal y tarjeta blanca dentro de la imagen, pegada a sus bordes izquierdo e inferior, 4 esquinas redondeadas, tipografía de Energía (título + subtítulo de ~2 líneas + línea + botón).
- **Tipografía real medida en el original** aplicada a todos los componentes (H2 Rubik 32px sin mayúsculas forzadas, texto Fredoka 20/22px, carga de Fredoka 400 y Rubik 600). Ver `Páginas madre.md` §1.
- **Iconos siempre los del original** (Font Awesome, MDI, IcoFont, Ionicons, IcoMoon) en `src/lib/iconos.ts`; nunca emojis.
- **"¿Qué es…?":** título a todo el ancho e imagen flotante con el texto alrededor.
- Metabolismo, Microbiota y Mentalidad adaptadas a la plantilla; **Hormonas pasa a la plantilla de Energía** (HubTemplateB).
- **Alimentación** pasa de listado a página madre con textos e imágenes nuevos, y sus 4 hijas nuevas: Alimentos, Macronutrientes, Micronutrientes, Patrones alimentarios.

### Páginas hijas
- **Plantilla de hijas** validada sobre Fatiga crónica (hero lateral, causas con ilustración estilo Ciclo menstrual, síntomas en viñetas…). Ver `Plantilla - Páginas hijas.md`.
- Relacionados de las hijas: primero los de la subcategoría y, si faltan, de la madre.

### Recetas (sección nueva)
- `/recetas/` (madre) y sus 3 subpáginas, en el menú detrás de Alimentación.
- Plantilla de receta (`RecipeLayout`): datos rápidos, ingredientes con ilustración, pasos con fotos, resultado, información nutricional por ración y datos schema.org/Recipe.
- Las 6 recetas keto existentes migradas (textos reescritos, nutrición recalculada, imágenes nuevas) 1 receta nueva de Energía hormonal (bol de quinoa, garbanzos, boniato y huevo) y 1 antiinflamatoria (crema de calabaza con cúrcuma, jengibre y garbanzos crujientes): las 3 subpáginas ya tienen contenido.

### Cabecera y navegación
- Cabecera fija al bajar (escritorio), en dos filas: arriba las páginas de tema (Inicio … Alimentación, Recetas); abajo el buscador bajo "Inicio" y Blog · Radar de Salud · Contacto a la derecha. Desplegable con el formato del original.

### Regla fija de entradas
- Siempre que se muestren entradas del blog (relacionados, recetas, Radar…), se ven 3 y, si hay más, paginación "« Anterior · Página X de Y · Siguiente »" con el formato del blog.

### Otros
- Portada nueva para la entrada de Radar sobre perimenopausia.
- Fotos generadas con IA: misma mujer en todas las páginas, pero con ropa distinta en cada foto.
