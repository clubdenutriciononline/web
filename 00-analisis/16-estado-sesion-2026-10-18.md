# Estado — sesión 2026-10-18

Sustituye a `15-estado-sesion-2026-10-17.md` como estado vigente. Todo está en GitHub (`master`) y desplegado en el preview de Vercel: https://temporary-prompt-coral-lgtc57c.vercel.app

**Resumen:** la web nueva está completa a nivel de contenido y plantillas. Todas las páginas madre, las 22 hijas, las entradas del blog, Radar de Salud, recetas y Quiénes somos siguen ya su plantilla. Revisión final del 18 oct: 146 páginas, 0 enlaces internos rotos, sin afiliados ni despedidas antiguas, y ninguna página se sale de la pantalla en móvil (390 px).

## Antes de publicar — prioritario

1. **El formulario de la guía no envía nada.** `/lm-5-pasos-optin/` (adonde llevan todos los botones "Descargar la guía ahora") tiene un formulario propio sin conexión: hay que conectarlo con la herramienta de correo (probablemente Mailrelay) y comprobar que llega la guía (`/lm-5-pasos-descarga/`). Es también la base de la monetización recomendada (lista de correo → productos propios).
2. **Token de GitHub expuesto** (aviso de sesiones anteriores): revocarlo si no se ha hecho.
3. **4 decisiones abiertas** de `13-pendientes-decision.md`: slug `/ayuno-intermitente-2/`, `/suscripcion-lista-comunidad/`, páginas huérfanas y URLs automáticas de WordPress.
4. **Paginación antigua `/alimentacion/2/…`:** ya no existe; valorar redirigir a `/blog/`.

## Pendiente — por decidir con la usuaria

- **Emojis heredados del original** (la regla es no usar emojis, pero vienen del original y no se han tocado):
  - Tarjetas de las madres Energía ("⚡ Fatiga crónica", "😴 Sueño", "🔋 Rutinas energéticas") y Mentalidad ("😰 Ansiedad por comer", "🪞 Relación con el cuerpo", "🧠 Estrés y hábitos").
  - Títulos de 2 entradas del blog: "⚠️ Errores comunes al hacer ayuno intermitente" y "🔹 Soluciones naturales para la resistencia a la insulina".
  - "Ya puedes descargar tu guía 📘" en `/lm-5-pasos-descarga/`.
  - En Radar de Salud los emojis de los apartados **sí son intencionados** (forman parte de su formato).
- **Entrada `que-es-el-coaching-nutricional`:** ofrece contactar "conmigo" para coaching personal; el enlace ahora lleva a Quiénes somos. Adaptar o quitar el párrafo.
- **Entradas antiguas del blog (2016…):** se ven con la plantilla nueva, pero su contenido es corto y anticuado; actualizarlas sería una tarea aparte.
- **Portada:** "Últimas entradas" muestra 6 por página; el resto de la web va de 3 en 3 (y blog/Radar de 9 en 9). ¿Se unifica?
- **Fecha en los datos para buscadores** del blog: no se ve en la página, pero Google puede mostrarla en los resultados. Se mantiene salvo que la usuaria prefiera quitarla.
- **Ilustración "descanso" de Inflamación hormonal:** la nube salió en negro; regenerar si molesta.
- **Formulario de contacto:** retirado; si se recupera, conectar el envío o poner contacto@clubdenutricion.es.

## Pendiente — próximas tareas

- **Responsive (móvil y tablet):** no hay desbordes, pero falta el trabajo de diseño apuntado: menú hamburguesa, cabecera fija en móvil, tarjetas compactas (`Pendiente - Responsive (móvil y tablet).md`).
- **Publicaciones del blog** (`Pendiente - Publicaciones programadas de blog.md`):
  - Artículos de las **áreas clave** (76 temas, títulos y textos en `scripts/areas_clave.json`): al publicar cada uno, añadir su `href` en la tarjeta del área.
  - Artículos a partir de las tarjetas de soluciones.
  - Las **preguntas frecuentes** van en los artículos (no en las páginas fijas).
- **Más recetas** de los 3 tipos (`Pendiente - Recetas.md`).
- **Monetización** (recomendación del 18 oct): 1) productos propios a la lista de correo; 2) publicidad (Ezoic sin mínimo; Mediavine/Raptive con 50-100 k sesiones/mes) cuando haya tráfico; 3) colaboraciones patrocinadas; 4) afiliación muy selectiva e integrada en el texto (no bloques "Recomendamos").
- **Limpieza técnica opcional:** plantillas y componentes que ya no usa ninguna página (`SubpageTemplateA`, `HubTemplateA`, `SubpageBlogPost`, `ListaSintomas`, `SintomasDestacados`, `FAQAccordion`, `Bibliografia`, `NumberedList`, `Callout`, `ContactForm`).
- **Google Drive y git:** Drive sigue creando `desktop.ini` dentro de `.git` (se limpian antes de cada commit). Valorar sacar el proyecto de Drive.
- **Cloudflare:** si vuelve el bloqueo de Movistar, revisar el plugin que debía desactivarlo.

## Hecho el 18 oct

### Páginas hijas (22, todas con la plantilla de hijas)
- **Metabolismo, Microbiota y Mentalidad** (9) adaptadas con textos, iconos y tipografía del original.
- **Hormonas** (6) rehechas desde cero: Ciclo menstrual, Menopausia y Tiroides con el texto íntegro del original ampliado y corregido; Perimenopausia, Cortisol e Inflamación hormonal (artículos en el original) reorganizadas con textos nuevos. Textos aprobados en `Textos - Hormonas/01-06`.
- **Rutinas energéticas** reenfocada en las rutinas (`Textos - Hormonas/08`); **Ayuno intermitente** ampliado (`09`).
- **Sueño y Relación con el cuerpo:** 9 causas (3 + 3 + 3) en lugar de 8.
- **Hero único de hijas:** título SEO del original + frase debajo, misma tipografía en todas (estilo de Menopausia original).
- **Áreas clave relacionadas** en las 22 hijas, sin enlace (cada una es un futuro artículo); las madres conservan sus enlaces.
- Sin preguntas frecuentes ni bibliografía en las hijas.

### Imágenes (API de Gemini por lotes, Nano Banana 2 Lite, 1K)
- Script `scripts/gemini_lote.py` (ilustraciones con referencia de estilo y fotos), clave leída de la configuración.
- 56 + 18 + 8 ilustraciones de causas, 78 fotos de áreas clave y relación, 2 fotos de Quiénes somos. Coste total aproximado: 3-4 $.

### Blog
- **Plantilla nueva de entradas** (`Plantilla - Entradas de blog.md`): hero de hijas, miga de pan y compartir, tabla de contenidos, secciones alternando degradado/blanco, tipografía de hijas, imágenes verticales flotando, **soluciones en tarjetas con icono**, preguntas frecuentes en desplegable, "Síguenos en redes" y relacionados paginados. Sin fecha visible.
- **Limpieza:** sin afiliados de Amazon (10 entradas) ni despedidas antiguas (37 entradas). Enlaces rotos de URLs antiguas corregidos y redirigidos.
- Listados de `/blog/` y `/radar-de-salud/` de 9 en 9.
- **Tarjetas de entradas:** píldora con la categoría madre junto al logo (salvo Radar) y subcategorías con tildes.

### Radar de Salud
- **Plantilla con el formato real del original** (`Plantilla - Radar de Salud.md`): cajas por apartado alternando lila/malva, nivel de evidencia como caja, fuente y fecha en gris claro, titular y fecha de la noticia del original. **Niveles de evidencia documentados:** 🔬 Alto · 🧪 Medio · 💭 Emergente.

### Recetas
- Compartir junto a la miga de pan y "Síguenos en redes" antes de "Más recetas".

### Resto de la web
- **Quiénes somos** sustituye a Contacto (menú y redirección de `/contacto/`), sin formulario.
- **Aviso médico fijo** en todas las páginas, entre el banner y el pie.
- **Enlaces externos siempre en pestaña nueva.**
- **Botones de compartir** en rosa con hover berenjena (al revés que "Síguenos").

## Reglas de trabajo (aplicar siempre)

- **Iconos:** siempre los del original, extraídos de sus fuentes (`src/lib/iconos.ts`); nunca emojis nuevos.
- **Cambiar solo lo que se pide:** otras diferencias con el original, comentarlas.
- **Textos:** primero el documento de textos para revisión, luego imágenes por lotes, luego montaje. Registro neutro, sin consejo médico concreto; suplementos y dietas restrictivas "con un profesional".
- **Entradas:** de 3 en 3 con paginación; listados de blog y Radar de 9 en 9.
- **Fotos IA:** mujer de 35-50 años en una escena que cuadre con la página (no hace falta que sea la misma). 1K, Nano Banana 2 Lite, por lotes. Error 402/429: parar y avisar.
- **Plantillas:** `Plantilla - Páginas hijas.md`, `Plantilla - Entradas de blog.md`, `Plantilla - Radar de Salud.md`, `Páginas madre.md`.
