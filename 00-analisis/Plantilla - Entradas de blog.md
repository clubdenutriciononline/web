# Plantilla — Entradas de blog

Decidida el 18 oct 2026 sobre la entrada de Fatiga crónica (`/fatiga-cronica-sintomas-causas/`). Se aplica a **todas** las entradas del blog que no son recetas (las recetas usan `RecipeLayout` y Radar de Salud `RadarLayout`). Código: `src/layouts/ArticleLayout.astro` y `src/lib/articulo-html.ts`.

## Estructura

1. **Hero de las hijas** (fondo degradado): título de la entrada, frase debajo (el primer párrafo del Markdown), línea y botón de la guía, e imagen de portada a la derecha.
2. **Miga de pan y botones de compartir** (Facebook, Pinterest, LinkedIn, X, WhatsApp, email) en una línea discreta (Inicio › categoría madre › subcategoría). **Sin fecha visible** (decisión del 18 oct); las fechas siguen en los datos estructurados (JSON-LD) para buscadores.
3. **Tabla de contenidos** (fondo blanco), con todos los H2. Se mantiene por SEO.
4. **Una sección por cada H2**, alternando fondo **degradado** (impares, empezando por la Introducción) y **blanco** (pares).
5. **Síguenos en redes**: título, una frase e iconos de las redes (los del pie), al final del artículo.
6. **Artículos relacionados** con las tarjetas de las hijas: hasta 9 (primero la misma subcategoría y, si faltan, la misma categoría madre), de 3 en 3 con paginación "« Anterior · Página X de Y · Siguiente »". Sin navegación anterior/siguiente entre entradas.

## Tipografía (la de las hijas)

- H2: Rubik 600 32px, ciruela #6C2F50, centrado.
- Subtítulo (el párrafo corto justo después del H2, sin punto final): Fredoka 24px/39px, 1.3px de espaciado, centrado.
- Texto y listas: Fredoka 20px/33px, justificado.
- H3: Rubik 500 24px, ciruela.
- Enlaces en ciruela.

## Bloques especiales (automáticos, según el título de la sección)

- **"Qué vas a aprender":** el texto va dentro de un recuadro blanco con sombra.
- **"Preguntas frecuentes":** cada párrafo que acaba en "?" pasa a ser un desplegable (`<details>`) con su respuesta. Las preguntas frecuentes van en los artículos, no en las páginas fijas.
- **Soluciones en tarjetas con icono:** en las secciones cuyo título habla de soluciones, consejos, estrategias o "cómo mejorar / reducir / recuperar…", cada apartado `### ` pasa a ser una tarjeta (mismo estilo que las tarjetas de soluciones de las hijas). Reparto: 3 por fila; 4 = 2 + 2; 5 = 3 + 2; 7 = 2 + 3 + 2. El icono se elige por palabras del título del apartado (sueño, estrés, ejercicio, apoyo, alimentación, médico, hidratación, pantallas, cafeína…), siempre entre los iconos extraídos del original; si no encaja ninguno, una hoja.
- **Imágenes verticales:** la primera de cada sección sube junto al título y flota a la derecha, con el texto alrededor. Las horizontales van a todo el ancho.
- La primera letra de cada H2 se pone en mayúscula ("conclusión" → "Conclusión").

## Cómo escribir una entrada nueva para que encaje

- Primer párrafo: la frase del hero.
- Cada sección empieza con `## Título` y, en la línea siguiente, un subtítulo corto sin punto final.
- Preguntas frecuentes: `## Preguntas frecuentes` y, debajo, cada pregunta en su propio párrafo terminada en "?" seguida de la respuesta.

## Reglas de contenido (18 oct 2026)

- **Enlaces externos siempre en pestaña nueva** (en toda la web: los artículos se marcan al generar la página y el resto con un script en `BaseLayout`).
- **Sin afiliados:** se quitaron todos los bloques de Amazon ("Recomendamos", "TIP", fotos de producto y botones "Comprar") de 10 entradas.
- **Sin despedidas antiguas:** se quitaron "Nos vemos en el camino 🙂" y "Si quieres saber más… suscríbete a mi canal…" de 37 entradas; su función la cumple ahora el bloque "Síguenos en redes".


## Normas de redacción (pedidas por la usuaria, 25 oct)

1. **Texto al lado de una imagen vertical:** el apartado tiene que ocupar como mínimo el mismo alto que la imagen. Si la imagen baja más, se amplía el texto con contenido útil (más detalle, ejemplos, una lista práctica), nunca con relleno. Se comprueba midiendo en la vista previa (`medir.py`): el texto debe terminar por debajo de la imagen.
2. **Enlaces internos:** cada vez que se nombra un tema que tiene página propia (Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol...) se enlaza.
3. **Listas por etapas o tipos:** si se nombran varias etapas o casos (ciclo, embarazo, posparto, perimenopausia, menopausia), se explica qué pasa en cada uno, no solo en uno.
4. **Iconos de las tarjetas de soluciones:** relacionados con el título (comida, ejercicio, dos personas para relaciones...) y nunca repetidos dentro de un mismo artículo. Lo hace `src/lib/articulo-html.ts` (ICONOS_POR_TEMA y RESERVA); si un título nuevo no encaja, añadir su tema allí.
5. **Borradores:** en `00-analisis/Tanda N - borradores/`, cada carpeta empieza por el Nº de Notion (p. ej. «19 - estres-cronico-desregula-hormonas»). La usuaria los revisa en la vista previa de Vercel.
6. **Imágenes por lote** (`scripts/gemini_lote.py`, ejemplo en `scripts/lote_blog_tanda1.json`): por artículo, portada horizontal 1400 px (mujer de 35-50 años en la escena del tema) e infografías verticales 572 px con textos cortos en español; por receta, ilustración de ingredientes en acuarela 900 px **ocupando toda la imagen sobre fondo blanco, sin hoja de papel ni marco** (modelo: la de la crema de calabaza), 3 fotos de pasos 900 px y foto final 1200 px. Revisar siempre las imágenes (textos con tildes, sin hojas dentro) antes de colocarlas.
7. **Antes de programar:** la usuaria revisa la tanda en la vista previa de Vercel (versión con las fechas adelantadas); después se suben las entradas con su fecha real y la tarea automática las publica L-X-V-S a las 06:00.
8. **Actualizar Notion cuando la usuaria aprueba la tanda** («Calendario Editorial 2»), solo en las filas de esa tanda (no en el resto de la base de datos):
   - **Texto:** el texto completo de la entrada (`python scripts/texto_notion.py "00-analisis/Tanda N - borradores"` deja un .txt por Nº en la carpeta `notion`; títulos en negrita, sin imágenes, enlaces con la dirección completa; en las recetas añade ingredientes, preparación y consejo).
   - **Final link:** `https://clubdenutricion.es/<slug>/` (se sabe de antemano).
   - **Imágenes:** marcada.
   - **Icono de la página** = el de su categoría: Hormonas 🧬, Energía 🪫, Metabolismo 🎚️, Microbiota 🦠, Mentalidad 🧠, Nutrición 🥙, Recetas 🥘.
   - **Status** es una fórmula y cambia sola: Pendiente (rojo, sin Final link) → Borrador (ámbar, con Final link y fecha futura) → Publicado (verde, cuando la fecha ya ha pasado).
