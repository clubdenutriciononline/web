# Estado — sesión 2026-10-17 (cerrada)

Resumen de lo hecho y de lo que queda pendiente, para retomar sin perder contexto. Todo lo de abajo está subido a GitHub (`master`, último commit de la sesión) y desplegado en el preview de Vercel: https://temporary-prompt-coral-lgtc57c.vercel.app

## Para retomar — por este orden

1. **Imágenes con la API de Gemini en lugar del MCP** (pedido de la usuaria, revisar el 18 oct). Comparar coste por imagen y modelo elegible (p. ej. uno más barato o sin "mejora de prompt"), control del tamaño de salida y límites de gasto. Valorar un script propio (como `CDN auto/scripts/drive_upload.py`) con la clave del perfil Proyecto que genere en lote, guarde directamente en `src/pages/*/_images` ya redimensionadas y lleve la cuenta de imágenes y gasto por tanda. Contexto: el MCP usa `gemini-nano-banana-2.1` a 1K; el 17 oct se agotó primero el saldo de prepago (error 402) y después saltó el límite de gasto mensual (error 429, "monthly spending cap"); la usuaria recargó y subió el límite.
2. **Reenfocar Rutinas energéticas en las rutinas** (la usuaria nota que parece la página de Fatiga crónica). El texto es fiel al original de WordPress, que ya está centrado en la fatiga ("Causas de la Fatiga", "Síntomas de la Fatiga"; "fatiga" aparece 23 veces), y las 6 ilustraciones de causas son reutilizadas de Fatiga crónica (5) y Alimentos (1). Propuesta pendiente de validar con la usuaria:
   - "Hábitos que te roban energía" en lugar de "Causas de la fatiga".
   - "Señales de que tu rutina no te está dando energía" en lugar de "Síntomas de la fatiga".
   - Añadir una rutina de ejemplo de mañana, tarde y noche.
   - Revisar intro, "¿Qué son…?", relación y soluciones para que hablen de rutinas, no de fatiga.
   - 6 ilustraciones nuevas propias de rutinas (mañana, pausas activas, horarios, movimiento…), estilo Ciclo menstrual, a 1K.
3. **Adaptar el resto de páginas hijas** a la plantilla validada en Fatiga crónica (`Plantilla - Páginas hijas.md`).
   - Hechas: Fatiga crónica, Sueño, Rutinas energéticas (Energía completa) y las 4 de Alimentación (nuevas).
   - Faltan: **Metabolismo** (Pérdida de grasa femenina, Resistencia a la insulina, Ayuno intermitente), **Microbiota** (Digestión, Inflamación intestinal, Probióticos y alimentación), **Mentalidad** (Ansiedad por la comida, Estrés y hábitos, Relación con el cuerpo) y **Hormonas** (Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol, Inflamación hormonal; usan `SubpageTemplateA` y tienen variantes: título en el hero, listas en 2 columnas, soluciones en píldoras, "Explora cada área").
   - Método en cada una: medir el original (estructura + `getComputedStyle`), textos completos del original, iconos del original (si no están en npm, extraer el glifo de la fuente que carga el WordPress; ver `src/lib/iconos.ts`), causas con ilustración estilo Ciclo menstrual (sin emoji en el título), síntomas en viñetas, relacionados con respaldo de la madre, comprobación visual y de tipografía contra el original.
4. **Revisar el formato de las entradas de blog** (plantilla de artículo `ArticleLayout`): tipografía, imágenes, tabla de contenidos, etc., igual que se ha hecho con madres, hijas y recetas.

## Ideas pendientes de definir — tarjetas de entradas

En las tarjetas de entradas (blog, relacionados, recetas, portada) hoy solo hay una etiqueta rosa con la subcategoría. Ideas de la usuaria, **por definir cuál se aplica**:

- **Distinguir las recetas:** un icono en la esquina superior izquierda de la miniatura (p. ej. cuchara y tenedor) o una etiqueta "Receta". Ejemplo: en `/blog/` las primeras entradas ahora son recetas y no se distinguen de un artículo.
- **Etiqueta de la categoría madre:** una segunda píldora igual que la de la subcategoría pero con el nombre de la madre (Recetas, Energía, Hormonas…), en **morado oscuro** (`#6C2F50`, el color de los títulos). Dos ubicaciones posibles: esquina superior izquierda de la imagen, o fuera de la imagen junto al logo pequeño de debajo (para no saturarla; también le gusta a la usuaria). Ejemplo: Sueño llevaría "Energía" además de "Sueño".

## Otros pendientes

- **Responsive (móvil y tablet):** blog a 9 entradas por página, tarjetas compactas en móvil, menú hamburguesa y cabecera fija en móvil (ver `Pendiente - Responsive (móvil y tablet).md`).
- **Publicaciones programadas del blog** y la idea de convertir cada tarjeta de soluciones en un artículo enlazado (ver `Pendiente - Publicaciones programadas de blog.md`).
- **Más recetas** de los 3 tipos con el calendario de publicaciones (cómo crearlas: `Pendiente - Recetas.md`).
- **Portada:** "Últimas entradas" muestra 6 por página (decisión de septiembre); el resto de la web va de 3 en 3. Preguntar si se unifica.
- **4 decisiones abiertas** (ver `13-pendientes-decision.md`): slug `/ayuno-intermitente-2/`, `/suscripcion-lista-comunidad/`, páginas huérfanas y URLs automáticas de WordPress.
- **Paginación antigua de `/alimentacion/2/…`:** ya no existe (Alimentación es ahora página madre); valorar redirigir a `/blog/`.
- **Token de GitHub expuesto** (aviso de sesiones anteriores) — revocarlo si no se ha hecho.
- **Google Drive y git:** Drive crea archivos `desktop.ini` dentro de `.git` y rompe el mantenimiento de git (se limpiaron 248 el 17 oct). Si vuelve a pasar, valorar sacar la carpeta del proyecto de Drive (el código ya está en GitHub).
- **Cloudflare:** se pausó el 17 oct por el bloqueo de Movistar durante LaLiga y la usuaria lo reactivó el mismo día. El plugin que debía desactivarlo solo no detectó el bloqueo: revisarlo si vuelve a pasar.

## Reglas de trabajo acordadas (aplicar siempre)

- **Iconos:** siempre los del original (Font Awesome, MDI, IcoFont, Ionicons, IcoMoon, Open Iconic, Themify…), nunca emojis. Todos en `src/lib/iconos.ts`.
- **Cambiar solo lo que se pide:** si hay otra diferencia con el original, comentarla, no cambiarla.
- **Entradas del blog:** siempre de 3 en 3 y, si hay más, paginación "« Anterior · Página X de Y · Siguiente »".
- **Fotos IA:** la misma mujer en todas las páginas, pero con ropa distinta en cada foto. Generar a `imageSize: "1K"` sin bajar la calidad. Si sale un error de saldo (402) o de límite (429), parar y avisar.
- **Textos nuevos:** registro neutro de la marca, sin consejo médico concreto; suplementos y dietas restrictivas siempre "con un profesional".

## Hecho en esta sesión

### Páginas madre (todas unificadas)
- **Hero unificado** en Hormonas, Energía, Metabolismo, Microbiota, Mentalidad, Alimentación y Recetas: imagen horizontal y tarjeta blanca dentro de la imagen, pegada a sus bordes izquierdo e inferior, 4 esquinas redondeadas, tipografía de Energía (título + subtítulo de ~2 líneas + línea + botón).
- **Tipografía real medida en el original** aplicada a todos los componentes (H2 Rubik 32px sin mayúsculas forzadas, texto Fredoka 20/22px, carga de Fredoka 400 y Rubik 600). Ver `Páginas madre.md` §1.
- **"¿Qué es…?":** título a todo el ancho e imagen flotante con el texto alrededor.
- Metabolismo, Microbiota y Mentalidad adaptadas; **Hormonas pasa a la plantilla de Energía** (HubTemplateB).
- **Alimentación** pasa de listado a página madre con textos e imágenes nuevos, y sus 4 hijas nuevas: Alimentos, Macronutrientes, Micronutrientes, Patrones alimentarios.

### Páginas hijas
- **Plantilla de hijas** validada sobre Fatiga crónica (hero lateral, causas con ilustración estilo Ciclo menstrual, síntomas en viñetas…). Ver `Plantilla - Páginas hijas.md` (incluye las variantes de Sueño y Rutinas).
- **Energía completa:** Fatiga crónica, Sueño (8 ilustraciones de causas nuevas) y Rutinas energéticas (ver punto 2 de "Para retomar").
- Relacionados de las hijas: primero los de la subcategoría y, si faltan, de la madre.

### Recetas (sección nueva)
- `/recetas/` (madre) y sus 3 subpáginas, en el menú detrás de Alimentación.
- Plantilla de receta (`RecipeLayout`): datos rápidos, ingredientes con ilustración, pasos con fotos, resultado, información nutricional por ración y datos schema.org/Recipe.
- 12 recetas: las 6 keto existentes migradas (textos reescritos, nutrición recalculada, imágenes nuevas), 3 de Energía hormonal (bol de quinoa, garbanzos, boniato y huevo; salteado de pollo con brócoli y arroz integral; tostada de aguacate con huevo poché) y 3 antiinflamatorias (crema de calabaza con cúrcuma y jengibre; sardinas al horno con tomate y pimiento; dahl de lentejas rojas con espinacas).

### Cabecera y navegación
- Cabecera fija al bajar (escritorio), en dos filas: arriba las páginas de tema (Inicio … Alimentación, Recetas); abajo el buscador bajo "Inicio" y Blog · Radar de Salud · Contacto a la derecha. Desplegable con el formato del original.

### Regla fija de entradas
- `pickRelacionados` devuelve todas las entradas propias; `ArticulosRelacionados` muestra 3 con paginación.

### Otros
- Portada nueva para la entrada de Radar sobre perimenopausia.
