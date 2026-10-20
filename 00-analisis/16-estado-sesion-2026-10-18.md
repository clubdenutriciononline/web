# Estado — sesión 2026-10-18

Sustituye a `15-estado-sesion-2026-10-17.md` como estado vigente. Todo está en GitHub (`master`) y desplegado en el preview de Vercel: https://clubdenutricion-preview.vercel.app (18 oct)

**Resumen:** la web nueva está completa a nivel de contenido y plantillas. Todas las páginas madre, las 22 hijas, las entradas del blog, Radar de Salud, recetas y Quiénes somos siguen ya su plantilla. Revisión final del 18 oct: 146 páginas, 0 enlaces internos rotos, sin afiliados ni despedidas antiguas, y ninguna página se sale de la pantalla en móvil (390 px).

## Cierre de sesión (18 oct, tarde) — leer primero

Hecho en esta parte de la sesión (todo en GitHub y en el preview):
- Nuevo preview de Vercel permanente: https://clubdenutricion-preview.vercel.app (punto 3).
- Página 404 propia (punto 4).
- Aviso de cookies con Consent Mode v2, Google Analytics `G-T6KPWKGF7F` activo solo con consentimiento y fuentes alojadas en la web (puntos 5 y 7).
- Páginas legales actualizadas, salvo los datos del titular y el Aviso legal, aplazados hasta que la usuaria tenga dirección postal (punto 6).
- Redirecciones 301 de todas las direcciones antiguas de WordPress, slug `/ayuno-intermitente/`, página `/buscar/?q=` para las etiquetas y buscador limpio de bloques repetidos (punto 8).

**Siguiente sesión:** recordar a la usuaria el punto 12 (dirección, actividad económica y marca). Elegir entre el punto 2 (embudo de la guía: mockup y 7 categorías), el 9 (decisiones de contenido), el 10 (revocar el token de GitHub) o el 1 (ya hay acceso a Mailrelay desde el 19 oct). Después, la migración (punto 11).

**Para redesplegar el preview** tras cualquier cambio: `npm run build`, copiar `dist/` y `vercel.json` a una carpeta con nombre sin espacios (la usada fue `clubdenutricion-preview`, que conserva su `.vercel/`) y lanzar `npx vercel deploy --prod --yes` desde ella. La carpeta con espacio «nueva web» no sirve como nombre de proyecto.

## Lista de lo que falta antes de migrar (resumen, 18 oct)

1. [ ] **Embudos y email marketing:** acceso a Mailrelay recuperado el 19 oct (no llegaban los correos por el fallo del dominio, ya arreglado). **API de Mailrelay conectada (20 oct):** clave en `.env` (`MAILRELAY_API_KEY`, ignorado por git), consultas con `python scripts/mailrelay.py <ruta>`. No hay MCP oficial (solo uno de terceros vía Boost.space, descartado). Estado de la cuenta: plan con 20.000 suscriptores / 80.000 envíos al mes; grupos `CDN: LM_5PasosEH` (id 2), `CDN: Lista Comunidad` (id 3, vacío) y `Default`; **solo 3 suscriptores: la propia cuenta (mail@clubdenutricion.es) y 2 pruebas** (clubdenutriciononline+1849 / +1852 @gmail.com) → no hay suscriptoras reales, se puede reorganizar todo sin perder nada. Un formulario (`CDN: LM_5PasosEH`, solo email + aceptación, honeypot activo, sin reCAPTCHA). Remitente `mail@clubdenutricion.es`, confirmado. Sin campañas ni campos personalizados. La API **no** expone el correo de confirmación ni las automatizaciones: eso se revisa en el panel. Página tras suscribirse: «página personalizada» (mensaje «revisa tu email»); cambiar a redirigir a `/lm-5-pasos-gracias/` al migrar, comprobando antes si con el iframe abre la página dentro del cuadro. Texto de la casilla de aceptación sin enlace a la política de privacidad: añadirlo. Siguiente: retomar los embudos con Mailrelay o elegir herramienta; migrar todo a Mailrelay (MailerLite no tiene suscriptores); replantear embudos; lead magnet de recetas fáciles; formulario y página de la lista de la comunidad; valorar API/MCP de Mailrelay.
2. [ ] **Embudo de la guía:** falta el mockup de la guía (libro sobre una mesa con té) en optin y gracias. **Hecho (20 oct):** página de descarga rehecha con la parte superior del original (título Neucha 55px, frase Fredoka 35px, texto + botón grande Pathway Extreme a la izquierda y portada a la derecha, sin emojis; fuentes alojadas en `public/fonts/`), «Recuerda» y «¿Y ahora qué?» con las 7 categorías (4 + 3). **Flujo real de Mailrelay comprobado (20 oct):** formulario → mensaje «revisa tu email» dentro del cuadro → correo de activación → `/lm-5-pasos-descarga/` → al confirmar entra en el grupo `CDN: LM_5PasosEH` y la automatización envía el correo de bienvenida «Aquí tienes la guía…». Funciona: según el registro de actividad de Mailrelay, la automatización envía el correo unos 5 minutos después de entrar en el grupo (la API da las horas en UTC; la usuaria está en hora de Canarias). Su enlace «Descargar guía» es la descarga directa del archivo de Google Drive (el mismo que el botón de la página): sirve de respaldo por si alguien no llega a la página. Si se cambia el archivo de la guía, actualizar el enlace en los dos sitios. Correo de bienvenida corregido por la usuaria (20 oct): en plural y solo como entrega de la guía (sin prometer más correos; cuando haya una serie, llegará sin anunciarla). Suscriptoras de prueba borradas por API: el grupo de la guía queda a 0. **Queda de este embudo:** el mockup; y al migrar, cambiar en Mailrelay «Tras suscribirse» a redirigir a `/lm-5-pasos-gracias/` (comprobando cómo se comporta dentro del iframe).
3. [x] **Preview de Vercel:** redesplegado el 18 oct en https://clubdenutricion-preview.vercel.app (proyecto `clubdenutricion-preview` de la cuenta machanga-factory, no caduca). **No se actualiza solo con GitHub:** para ver cambios hay que compilar (`npm run build`), copiar `dist/` + `vercel.json` a una carpeta con nombre sin espacios y lanzar `vercel deploy --prod`. Pendiente para la migración: proyecto definitivo conectado al repo.
4. [x] **Página 404** propia (`src/pages/404.astro`, 18 oct): hero lateral con «Volver al inicio», botón que abre el buscador y las 7 categorías del menú (4 + 3). Vercel la sirve con código 404. Si en el hosting definitivo no es Vercel, configurar `404.html` como página de error.
5. [x] **Aviso de cookies** (18 oct, `src/components/AvisoCookies.astro`): Aceptar / Rechazar al mismo nivel y Configurar por categorías (técnicas y analíticas), según la guía de la AEPD. Consent Mode v2 denegado por defecto; Google Analytics solo se carga tras aceptar; la elección dura 12 meses; enlace «Configurar cookies» en el pie para cambiarla (al retirar, borra las cookies `_ga`). Política de cookies reescrita. Fuentes Rubik y Fredoka alojadas en la web (`public/fonts/`), ya no se cargan de Google.
6. [ ] **Páginas legales** (18 oct): Privacidad reescrita entera (RGPD/LOPDGDD: finalidades, bases legales, conservación, Mailrelay, MailerLite, Vercel, Google Analytics, transferencias, derechos, AEPD; correo contacto@clubdenutricion.es). Cookies reescrita; «Más información sobre las cookies» con guía de navegadores actual; Copyright con año dinámico y sin «formulario de contacto»; correos enlazados en Términos y Descargo. **Falta:** datos del titular (nombre o razón social, NIF, domicilio) en Privacidad (marcados `PENDIENTE` en el código) y crear la página de **Aviso legal** (LSSI art. 10), que no existía en el WordPress. **Aplazado por decisión de la usuaria (18 oct):** se muda en breve y no quiere publicar su dirección física; va a contratar una dirección postal propia para la web. Retomar cuando la tenga (los datos van en Privacidad y en el Aviso legal). Comprobar antes que la dirección elegida sirve como «domicilio» a efectos de la LSSI: un apartado de correos puede no bastar; una domiciliación de empresa o un coworking sí.
7. [x] **Analítica:** Google Analytics 4 activo (18 oct), ID `G-T6KPWKGF7F` en `src/data/analitica.ts`. Comprobado: rechazando no se carga nada; aceptando se cargan `gtag.js` y las cookies `_ga` / `_ga_T6KPWKGF7F` y se envían visitas; al retirar el consentimiento se borran. Ojo: el preview de Vercel también envía visitas (con dominio `.vercel.app`); se pueden filtrar en GA por nombre de host.
8. [x] **Decisiones de direcciones antiguas** (18 oct): Ayuno pasa a `/ayuno-intermitente/` (redirige desde `-2`); `/cuerpo/` → Relación con el cuerpo; `/keto-lowcarb/` y `/recetas-sanas-keto-y-low-carb/` → Recetas keto y low carb; `/servicios-del-club-de-nutricion/` → Quiénes somos; `/coaching-nutricional/` → artículo «Qué es el coaching nutricional»; `/alimentacion/2/` (y `/page/N/`) → Alimentación; las 31 categorías de WordPress (y su paginación) → su página; etiquetas (`/tag/<etiqueta>/`) → página de búsqueda nueva `/buscar/?q=<etiqueta>`, que lanza la búsqueda sola (las 21 etiquetas del WordPress comprobadas, todas con resultados; `legacy` va al Blog y `wegovi` busca «wegovy»); autora (`/author/…`) → Quiénes somos. El buscador ya no indexa cabecera, pie, aviso de cookies, migas, índice, compartir, Síguenos ni las tarjetas de relacionados: los resultados solo cuentan el contenido real. Todas son 301 reales en `vercel.json` (comprobadas una a una, destinos 200). `/suscripcion-lista-comunidad/` ya tenía noindex.
9. [ ] **Decisiones de contenido** pendientes (sección "Pendiente — por decidir con la usuaria"): emojis heredados, entrada de coaching, portada de 6 en 6, etc.
10. [ ] **Token de GitHub expuesto:** revocarlo.
11. [ ] **Migración:** copia de seguridad del WordPress, dominio y DNS, SSL, Search Console y comprobaciones (`14-checklist-produccion.md`). No borrar el WordPress hasta pasado un periodo de seguridad.
    - **Correo corporativo (19 oct):** no llegaba ningún correo a @clubdenutricion.es porque `mail` era un CNAME a `clubdenutricion.es`, que va con proxy de Cloudflare (Cloudflare no entrega correo). Corregido por la usuaria: `mail` → A `62.210.212.90`, Solo DNS (servidor de correo del hosting, host.sistemahost.es). Comprobado: MX → mail → 62.210.212.90 y la prueba desde Gmail llega. **Al migrar:** cambiar solo `clubdenutricion.es` y `www` a Vercel; no tocar `mail`, MX, SPF, DKIM ni DMARC. **El correo vive en el hosting actual:** no darlo de baja sin mantenerlo solo para el correo o pasar el correo a otro servicio (Google Workspace, Zoho…). `ftp` sigue con proxy (FTP no funcionaría; solo importa si se usa). **Reenvío a Gmail (19 oct):** la usuaria creó en cPanel un reenviador de la cuenta corporativa a su Gmail; probado, llega a Principal. El original se queda también en el buzón del hosting: vaciarlo de vez en cuando. Opcional: «Enviar como» en Gmail con SMTP `mail.clubdenutricion.es`:465 SSL. **Si se pasa el correo a otro servicio al migrar, rehacer el reenvío allí.**
12. [ ] **Tareas de la usuaria: legal y administrativo** (apuntado el 18 oct a petición suya, para no despistarse; no hay que hacer nada en la web hasta tenerlo):
    - **Dirección para la web sin usar la suya:** investigar la *domiciliación de empresa* u *oficina virtual* (centros de negocios o coworking, unos 10-40 €/mes; reciben y reenvían el correo y no cambia aunque se mude). Idea: buscar una **gestoría online de Canarias** (por la fiscalidad) que incluya este servicio. El apartado de correos es lo más barato, pero no es un domicilio físico. Preguntar: si sirve como domicilio legal en la web, si reenvían o escanean el correo y si hay permanencia.
    - **Preguntar a la gestoría desde cuándo la web cuenta como actividad económica** (LSSI): ahora está en zona gris; la guía, la monetización o la comunidad la meterían de lleno. Mientras tanto, para el RGPD basta con identidad + un correo de contacto (no exige dirección física); la dirección hace falta para el Aviso legal.
    - **Marca comercial:** no quiere poner su nombre completo, prefiere una marca. Investigar cómo registrarla (OEPM: marca o nombre comercial; también si conviene una sociedad). Ojo a preguntarlo a la gestoría: una marca registrada protege el nombre, pero por sí sola no evita identificar a la titular en la web; si la titular es una sociedad, aparece la sociedad en vez de su nombre personal.
    - Con todo eso decidido: pasar nombre o razón social, NIF y dirección para completar Privacidad y crear el Aviso legal (punto 6).

## Antes de publicar — prioritario

1. **Embudo de la guía y correo (revisado el 18 oct):**
   - Páginas rehechas con el formato de la web y fuera de buscadores: `/lm-5-pasos-optin/` (registro), `/lm-5-pasos-gracias/` (nueva: "revisa tu correo"), `/lm-5-pasos-descarga/` (botón al PDF de Drive) y `/suscripcion-lista-comunidad/` (gracias de la lista de la comunidad, con el texto completo).
   - El formulario de registro es de nuevo el de **Mailrelay** del original (`clubdenutricion.ipzmarketing.com/f/5gCYfuS_XVI`), que sigue funcionando. Se cambia en un único sitio: `src/data/formularios.ts`.
   - **Problema:** la usuaria no puede entrar en Mailrelay (no le llega el correo de acceso ni el de recuperar contraseña). Cuenta: `clubdenutricion.ipzmarketing.com/admin`. Opciones: soporte de Mailrelay o **pasar la guía a MailerLite**, donde ya está la lista de la comunidad (pasos en `src/data/formularios.ts`).
   - La lista de la comunidad usa un formulario alojado en **MailerLite** (no está en ninguna página del WordPress); su página de gracias es `/suscripcion-lista-comunidad/`.
   - **Siguiente paso (decisión de la usuaria, 18 oct, final de sesión):** usar **Mailrelay** para todo (MailerLite ha cambiado las condiciones de las cuentas gratis). La usuaria ha escrito al **soporte de Mailrelay** para recuperar el acceso; **esperar su respuesta**. Si no se recupera, se valorará otra opción.
   - **Valorar conectar Mailrelay por API** (o un MCP de Mailrelay si existe) para gestionar formularios, grupos y automatizaciones desde aquí. Requiere el acceso a la cuenta (clave de API).
   - **Lista de la comunidad:** la usuaria no sabe dónde está el formulario de suscripción ni desde dónde se llega a él. Está alojado en MailerLite y no aparece en ninguna página del WordPress (quizá en la bio de Instagram o en un enlace de redes). **Pendiente:** localizarlo y, al pasar a Mailrelay, crear el formulario de la comunidad y una página propia para él en la web (con `/suscripcion-lista-comunidad/` como página de gracias).
   - **Cambios pedidos en las páginas del embudo (pendientes):**
     - **Imagen de la guía en optin, gracias y descarga:** queda rara dentro del cuadro (espacios blancos a los lados). Generar un **mockup**: la guía como un libro sobre una mesa, con una taza de té y algún detalle que encaje, que llene el cuadro.
     - **"¿Y ahora qué?" de la descarga:** poner las **7 categorías** en el orden del menú (Hormonas, Energía, Metabolismo, Microbiota, Mentalidad, Alimentación, Recetas), en 2 filas de 4 + 3 o 3 + 4, con un ancho parecido.
   - **MailerLite no tiene ningún suscriptor** (confirmado por la usuaria): se puede migrar todo a Mailrelay sin perder nada, si se recupera el acceso.
   - **Replantear los embudos y el email marketing en conjunto** antes de montar nada más: qué lead magnets hay, qué formulario y página lleva cada uno, qué automatizaciones y qué herramienta.
   - **Lead magnet pendiente: guía de recetas fáciles.** Definir su embudo (formulario, gracias, descarga) dentro de ese replanteamiento.
2. **Token de GitHub expuesto** (aviso de sesiones anteriores): revocarlo si no se ha hecho.
3. **4 decisiones abiertas** de `13-pendientes-decision.md`: resueltas el 18 oct (punto 8 de la lista).
4. **Paginación antigua `/alimentacion/2/…`:** resuelto, redirige a Alimentación (punto 8 de la lista).

## Revisión previa a la migración (18 oct, final)

- **Buscador:** en Vercel no se generaba el índice (solo corría `astro build`). Corregido: Pagefind se ejecuta dentro de `astro build` (`astro.config.mjs`). En local con `npm run dev` el buscador **no funciona nunca** (mensaje "solo disponible en la versión publicada"): es normal.
- **El preview de Vercel ya no existe** (`DEPLOYMENT_NOT_FOUND`): eran despliegues temporales anónimos que caducan, **no se despliega solo desde GitHub**. Para ver la web: desplegar de nuevo un preview, o crear ya el proyecto definitivo de Vercel conectado al repo (checklist §2).
- **Página 404 propia:** hecha (ver lista, punto 4).
- **Aviso de cookies:** hecho (ver lista, punto 5). Comprobado el 18 oct: sin aceptar, la web no instala ninguna cookie ni hace peticiones a Google (tampoco el formulario de Mailrelay).
- **Páginas legales:** revisar que Privacidad y Cookies reflejen las herramientas reales (Mailrelay, Vercel; sin WordPress ni WPForms).
- **Analítica:** Google Analytics 4 con consentimiento (ver lista, punto 7).
- Resto de la checklist: `14-checklist-produccion.md`.

## Después: publicar la web nueva

Cuando estén resueltos el embudo y el email marketing, **siguiente paso: retirar el WordPress actual y subir la web nueva al hosting real** (dominio clubdenutricion.es). Antes de hacerlo:
- copia de seguridad completa del WordPress (archivos y base de datos);
- revisar `14-checklist-produccion.md`;
- comprobar redirecciones de las URLs antiguas, sitemap y Search Console tras el cambio.

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
