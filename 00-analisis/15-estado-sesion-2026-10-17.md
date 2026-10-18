# Estado — sesión 2026-10-17 (cerrada)

Resumen de lo hecho y de lo que queda pendiente, para retomar sin perder contexto. Todo lo de abajo está subido a GitHub (`master`, último commit de la sesión) y desplegado en el preview de Vercel: https://temporary-prompt-coral-lgtc57c.vercel.app

## Actualización 18 oct

- **Imágenes por lotes con la API de Gemini (hecho):** script `scripts/gemini_lote.py` (enviar / estado / recoger). Modelo Nano Banana 2 Lite (`gemini-3.1-flash-lite-image`), 1:1 a 1K, Batch API (mitad de precio, unos 0,017 $ por imagen) y las 2 ilustraciones de Ciclo menstrual como referencia de estilo. La clave se lee de `C:\Users\Proyectos\.claude.json` (perfil Proyecto), nunca va en el script. Primer lote: 56 ilustraciones de causas para las 9 hijas, 56 de 56 correctas, en unos 20 minutos (escenas en `scripts/lote_causas_2026-10-18.json`). Se guardan a 700×700 JPG en `src/pages/<slug>/_images/causa-*.jpg`.
- **Hijas adaptadas a la plantilla:** Metabolismo (Pérdida de grasa femenina, Resistencia a la insulina, Ayuno intermitente), Microbiota (Digestión, Inflamación intestinal, Probióticos y alimentación) y Mentalidad (Ansiedad por la comida, Estrés y hábitos, Relación con el cuerpo). Textos, iconos (31 nuevos extraídos de las fuentes del original) y tipografía medidos en el original.
- **Componentes:** Hero admite `titleSize="medida"` con `titleMedida` (cada hija del original usa una tipografía distinta en el hero). SolucionesList: 8 píldoras 4+4, 6 en 2+3+1 o 3+3, 7 píldoras en 3+4 y 8 tarjetas en 3+2+3.
- **Diferencias con el original, corregidas (revisar si se quieren mantener):** Ayuno intermitente tenía en la intro un fragmento pegado de otra página ("…ulan prácticamente todo en el cuerpo femenino…") y "niciar" en lugar de "Iniciar"; Relación con el cuerpo repetía la tarjeta "Estrés y presión emocional" (aquí sale una vez, 8 causas).
- **Falta:** las hijas de Hormonas (`SubpageTemplateA`), y lo de abajo.

### Plan acordado el 18 oct (Hormonas + áreas clave)

1. **Rehacer las 6 hijas de Hormonas** con la plantilla de hijas (`SubpageTemplateB`). Nuestra versión de septiembre de Ciclo menstrual, Menopausia y Tiroides es un resumen (falta o cambia ~75 % del texto del original: sin píldoras, sin checklist, causas y síntomas con otros textos, relación muy corta). Se copian los textos íntegros del original; se amplía la relación y las soluciones pasan a tarjetas con texto. Perimenopausia, Cortisol e Inflamación hormonal (artículos en el original) se montan sobre la plantilla escribiendo lo que falta. Primero los textos (revisión página a página, en `00-analisis/Textos - Hormonas/`), luego el lote de ilustraciones de causas (~18) y luego el montaje.
2. **Áreas clave relacionadas en la plantilla de hijas** (entre Soluciones y Artículos relacionados), **sin enlace** hasta que exista el artículo del blog de cada área; cada área es un tema de artículo para el blog. En el original solo las tenían Ciclo menstrual, Menopausia y Tiroides (se mantienen). Las **madres sí conservan los enlaces** a sus hijas. Fotos de áreas: lote aparte al final (~45-60).
3. ~~Rutinas energéticas: reenfocar en las rutinas~~ — **hecho el 18 oct** (textos aprobados en `Textos - Hormonas/08`, 6 ilustraciones nuevas).

## Para retomar — por este orden

1. ~~Imágenes con la API de Gemini en lugar del MCP~~ — hecho el 18 oct (ver arriba).
2. ~~**Reenfocar Rutinas energéticas en las rutinas**~~ — hecho el 18 oct. (la usuaria nota que parece la página de Fatiga crónica). El texto es fiel al original de WordPress, que ya está centrado en la fatiga ("Causas de la Fatiga", "Síntomas de la Fatiga"; "fatiga" aparece 23 veces), y las 6 ilustraciones de causas son reutilizadas de Fatiga crónica (5) y Alimentos (1). Propuesta pendiente de validar con la usuaria:
   - "Hábitos que te roban energía" en lugar de "Causas de la fatiga".
   - "Señales de que tu rutina no te está dando energía" en lugar de "Síntomas de la fatiga".
   - Añadir una rutina de ejemplo de mañana, tarde y noche.
   - Revisar intro, "¿Qué son…?", relación y soluciones para que hablen de rutinas, no de fatiga.
   - 6 ilustraciones nuevas propias de rutinas (mañana, pausas activas, horarios, movimiento…), estilo Ciclo menstrual, a 1K.
3. **Adaptar el resto de páginas hijas** a la plantilla validada en Fatiga crónica (`Plantilla - Páginas hijas.md`).
   - Hechas: Fatiga crónica, Sueño, Rutinas energéticas (Energía completa) y las 4 de Alimentación (nuevas).
   - Hechas el 18 oct: Metabolismo, Microbiota y Mentalidad (las 9). Falta **Hormonas** (Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol, Inflamación hormonal; usan `SubpageTemplateA` y tienen variantes: título en el hero, listas en 2 columnas, soluciones en píldoras, "Explora cada área").
   - Método en cada una: medir el original (estructura + `getComputedStyle`), textos completos del original, iconos del original (si no están en npm, extraer el glifo de la fuente que carga el WordPress; ver `src/lib/iconos.ts`), causas con ilustración estilo Ciclo menstrual (sin emoji en el título), síntomas en viñetas, relacionados con respaldo de la madre, comprobación visual y de tipografía contra el original.
4. **Revisar el formato de las entradas de blog** (plantilla de artículo `ArticleLayout`): tipografía, imágenes, tabla de contenidos, etc., igual que se ha hecho con madres, hijas y recetas.

## Tarjetas de entradas — hecho el 18 oct

Junto al logo pequeño, una **píldora con la categoría madre** (Hormonas, Energía, Recetas, Alimentación…) en morado #6C2F50; la etiqueta rosa de la imagen sigue mostrando la subcategoría, ahora con tildes. Si la entrada no tiene subcategoría, solo se muestra la píldora (para no repetir el nombre). Se descartó el icono de cubiertos para recetas: la píldora "Recetas" ya las distingue. Aplica en blog, portada, relacionados y recetas (`ArticulosRelacionados.astro`).

## (Histórico) Ideas que se valoraron — tarjetas de entradas

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
- **Entradas del blog:** siempre de 3 en 3 y, si hay más, paginación "« Anterior · Página X de Y · Siguiente »". **Excepción (18 oct):** los listados de `/blog/` y `/radar-de-salud/` van de **9 en 9** (3 filas completas).
- **Fotos IA:** no hace falta que sea siempre la misma mujer (decisión 18 oct): mujer de unos 35-50 años en una escena que cuadre con la página. Generar a `imageSize: "1K"` sin bajar la calidad. Si sale un error de saldo (402) o de límite (429), parar y avisar.
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
