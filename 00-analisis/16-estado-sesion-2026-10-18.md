# Estado — sesión 2026-10-18

Sustituye a `15-estado-sesion-2026-10-17.md` como estado vigente. Todo está en GitHub (`master`) y desplegado en el preview de Vercel: https://clubdenutricion-preview.vercel.app (18 oct)

**Resumen:** la web nueva está completa a nivel de contenido y plantillas. Todas las páginas madre, las 22 hijas, las entradas del blog, Radar de Salud, recetas y Quiénes somos siguen ya su plantilla. Revisión final del 18 oct: 146 páginas, 0 enlaces internos rotos, sin afiliados ni despedidas antiguas, y ninguna página se sale de la pantalla en móvil (390 px).

## Cierre de sesión (20 oct) — leer primero

**Hecho del 19 al 20 oct** (todo en GitHub y en el preview https://clubdenutricion-preview.vercel.app):
- **Correo del dominio arreglado** (no llegaba ningún correo: `mail` iba por el proxy de Cloudflare) y reenvío de la cuenta corporativa a Gmail (punto 11).
- **Mailrelay:** acceso recuperado, API conectada (`.env` + `scripts/mailrelay.py`), flujo de la guía comprobado de punta a punta, correo de bienvenida en plural y solo como entrega, formulario con nombre obligatorio y enlace a la política de privacidad, suscriptoras de prueba borradas (punto 1).
- **Página de descarga** con la cabecera del original y las 7 categorías; **página de registro** con las dos tarjetas iguales y el formulario centrado sin barra de desplazamiento (punto 2).
- **Aviso de cookies** alineado a la izquierda.
- **Decisiones de contenido:** emojis de las tarjetas de Energía y Mentalidad como imagen (igual que WordPress), coaching sin contacto, portada con 6, ilustración «descanso» sin negro (punto 9). Token de GitHub: ya no era válido (punto 10).
- **Adaptación a móvil en todas las páginas** (`src/styles/movil.css`, todo dentro de `@media (max-width: 767px)`: el escritorio no cambia): menú hamburguesa con apartados plegables y cabecera fija; títulos 20px, subtítulos 18px, párrafos y listas 16px en las 154 páginas; texto a la izquierda; causas con icono arriba; tarjetas de temas y áreas clave con la foto grande arriba; solo los artículos relacionados compactos. Quiénes somos: foto de Hormonas recortada por abajo.

**Revisión de dispositivos (25 oct), hecha:** pasada automática por las 143 páginas en 360, 390, 768 y 1024px (desbordes, tamaños de letra, imágenes rotas, zonas de toque). Corregido: menú hamburguesa también en tablet (hasta 1199px: el menú de escritorio no cabía y se partía en dos líneas); hero de las madres en tablet con el texto debajo de la foto (el título se cortaba en Hormonas); título del hero de las hijas a 32px en tablet; «Un enfoque diferente» de la portada en 2 + 2; texto a la izquierda en tablet; desborde de las píldoras de Resistencia a la insulina a 768px; botones «Anterior / Siguiente» de 44px en móvil. Resultado final: 0 desbordes, 0 tamaños fuera de norma, 0 imágenes rotas; solo quedan 2 enlaces sueltos «ver el vídeo» algo pequeños en 2 entradas antiguas (Papaya, Pepino), sin importancia. Falta que la usuaria lo mire en su móvil y tablet reales. **Revisión de la usuaria en su tablet (25 oct), corregido:** «Últimas entradas» de la portada mostraba todas las entradas en móvil y tablet (el formato compacto anulaba la paginación); «Un enfoque diferente» en 2 + 2 en cualquier tablet (hasta 1199px; el iPad mini mide 744px y quedaba 3 + 1); en tablets pequeñas causas, soluciones y áreas clave de 2 en 2 y centradas, con las ilustraciones de las causas más grandes. Síntomas unificados con el formato de Metabolismo (lista con check, título y explicación, una columna) en todas las páginas: Energía tenía tarjetas y Hormonas solo nombres en dos columnas (frases nuevas aprobadas por la usuaria). Pendiente: la usuaria revisa el móvil.

**Siguiente sesión, por este orden:**
1. ~~Revisión final a fondo en el móvil~~ (hecha el 25 oct, ver arriba) (pedido de la usuaria, 20 oct): recorrer en un móvil real todos los tipos de página (portada, 6 madres, 22 hijas, blog y entradas, Radar y noticias, recetas, Quiénes somos, embudo de la guía, legales, 404, buscador) y también tablet (768-1024px): heros, rejillas de píldoras y soluciones, tablas de recetas, menú entre 768 y 1200px.
2. **MIGRACIÓN HECHA (25 oct, ~12:00).** La web nueva está en el hosting (`public_html`, LiteSpeed) y el WordPress apartado en `public_html/_wordpress_antiguo/` (cerrado, 403). Cloudflare en «Solo DNS» para `clubdenutricion.es`, `www` y `ftp` (DNS directas a 62.210.212.90). Comprobado en el dominio real: las 137 páginas del sitemap dan 200; 301 de direcciones antiguas, `http`→`https` y `www`→sin `www`; 404 propia; certificado del hosting válido (clubdenutricion.es, www, mail; cPanel lo renueva); aviso de cookies, Analytics, buscador y formulario de la guía funcionando. Configuración del servidor en `public/.htaccess`, generada desde `vercel.json` con `scripts/generar_htaccess.py`. **Publicar cambios:** `npm run build` y `python scripts/ftp_hosting.py subir <carpetas o archivos de dist/>` (se salta lo que ya está igual). **Search Console:** propiedad de dominio verificada por la usuaria (DNS en Cloudflare) y sitemap `https://clubdenutricion.es/sitemap-index.xml` enviado (25 oct). **Mailrelay:** «Tras suscribirse» redirige a `/lm-5-pasos-gracias/` (hecho por la usuaria; probado el 25 oct: abre la página entera, no dentro del cuadro; prueba borrada). **Pendiente:** publicación automática desde GitHub (opcional), **borrar `_wordpress_antiguo` y las 2 bases de datos hacia el 25 nov** si todo va bien. Antes: migración en curso (25 oct). Decisión de la usuaria: la web va en el **hosting actual** (Sistemahost, LiteSpeed), sustituyendo el WordPress; **sin proxy de Cloudflare** (nube gris en `clubdenutricion.es` y `www`; las DNS siguen en Cloudflare) para evitar los bloqueos de LaLiga; el hosting tiene su propio SSL. Hecho: copia completa de la cuenta y de las 2 bases de datos (`cdnes_iwr81`, `cdnes_kwar1`) descargadas por la usuaria; cuenta FTP `web@` con directorio `/home/cdnes/public_html` (raíz de la web), datos en `.env`, script `scripts/ftp_hosting.py` (`listar`, `subir` con reconexión). **Prueba hecha:** subidos `_astro`, `fonts`, `emoji`, `images`, `pagefind`, `favicon.svg` y `recetas/` → `https://clubdenutricion.es/recetas/` sirve ya la página nueva (200, fuentes, imágenes, aviso de cookies, también a través de Cloudflare). **En `public_html` hay que conservar:** `.well-known/`, `googleba1716d3abd2b8b4.html` (Search Console), `ads.txt`, los 6 `.txt` de verificación con nombre en mayúsculas, y la carpeta **`formacion/`** (otro WordPress en construcción, responde 200: preguntar a la usuaria). Carpetas `archivo/`, `s/`, `tienda/`: restos de WordPress/caché. **Pendiente el día del cambio:** pasar las redirecciones de `vercel.json` a `.htaccess` (con 404 propia), apartar el WordPress a una carpeta protegida (no borrarlo), subir el resto de `dist/`, nube gris en Cloudflare, comprobar todo; publicación automática desde GitHub. Pasos originales: `14-checklist-produccion.md`: **CÓMO DESHACER el cambio (25 oct):** 1) por FTP, en `public_html`, devolver a su sitio todo lo que hay dentro de `_wordpress_antiguo/` (salvo su `.htaccess`); 2) subir el `.htaccess` original, guardado en `CLUBDENUTRICIÓN/respaldo-hosting/.htaccess` (también `.user.ini`); 3) en Cloudflare, volver a poner la nube naranja en `clubdenutricion.es` y `www` si se había quitado. Copia completa de la cuenta descargada por la usuaria. copia del WordPress, proyecto definitivo de Vercel conectado al repo, cambio de DNS **solo** de `clubdenutricion.es` y `www` (no tocar `mail`, MX, SPF, DKIM ni DMARC), SSL, Search Console y comprobaciones; no dar de baja el hosting (el correo vive ahí). Ese día, en Mailrelay, «Tras suscribirse» → redirigir a `/lm-5-pasos-gracias/` (comprobar cómo se ve dentro del iframe).

**Después de migrar:** embudos y email marketing (punto 1: lista de la comunidad en Mailrelay, replantear embudos, serie de correos, nuevo lead magnet; la guía de recetas se descarta, las recetas van al blog), artículos de las áreas clave, más recetas, monetización y limpieza técnica opcional.

**Va para largo (solo recordarlo cuando la usuaria pregunte qué falta):** punto 12 (dirección postal, actividad económica, marca) y, con eso, los datos de la titular en Privacidad y el Aviso legal (punto 6).

## Cierre de sesión (18 oct, tarde)

Hecho en esta parte de la sesión (todo en GitHub y en el preview):
- Nuevo preview de Vercel permanente: https://clubdenutricion-preview.vercel.app (punto 3).
- Página 404 propia (punto 4).
- Aviso de cookies con Consent Mode v2, Google Analytics `G-T6KPWKGF7F` activo solo con consentimiento y fuentes alojadas en la web (puntos 5 y 7).
- Páginas legales actualizadas, salvo los datos del titular y el Aviso legal, aplazados hasta que la usuaria tenga dirección postal (punto 6).
- Redirecciones 301 de todas las direcciones antiguas de WordPress, slug `/ayuno-intermitente/`, página `/buscar/?q=` para las etiquetas y buscador limpio de bloques repetidos (punto 8).

**Adaptación a móvil hecha (20 oct)** en todas las páginas (`src/styles/movil.css`): menú hamburguesa con apartados plegables y cabecera fija; títulos 20px, subtítulos 18px, párrafos y listas 16px (auditadas las 154 páginas: ningún otro tamaño), texto a la izquierda, causas con icono arriba de 130px; tarjetas de temas y áreas clave con la foto grande arriba como en escritorio; solo los artículos relacionados en formato compacto. Todo el cambio de móvil está dentro de @media (max-width: 767px): el escritorio no cambia. Aprobado por la usuaria con Menopausia como piloto. **Siguiente sesión:** la migración (punto 11). El punto 12 (dirección, actividad económica y marca) va para largo: recordarlo solo cuando la usuaria pregunte qué falta. Elegir entre el punto 2 (embudo de la guía: mockup y 7 categorías), el 9 (decisiones de contenido), el 10 (revocar el token de GitHub) o el 1 (ya hay acceso a Mailrelay desde el 19 oct). Después, la migración (punto 11).

**Para redesplegar el preview** tras cualquier cambio: `npm run build`, copiar `dist/` y `vercel.json` a una carpeta con nombre sin espacios (la usada fue `clubdenutricion-preview`, que conserva su `.vercel/`) y lanzar `npx vercel deploy --prod --yes` desde ella. La carpeta con espacio «nueva web» no sirve como nombre de proyecto.

## Lista de lo que falta antes de migrar (resumen, 18 oct)

1. [ ] **Embudos y email marketing** (**después de migrar**, decisión de la usuaria del 20 oct; la guía de recetas fáciles se descarta: las recetas irán al blog, y más adelante se hará otro lead magnet): acceso a Mailrelay recuperado el 19 oct (no llegaban los correos por el fallo del dominio, ya arreglado). **API de Mailrelay conectada (20 oct):** clave en `.env` (`MAILRELAY_API_KEY`, ignorado por git), consultas con `python scripts/mailrelay.py <ruta>`. No hay MCP oficial (solo uno de terceros vía Boost.space, descartado). Estado de la cuenta: plan con 20.000 suscriptores / 80.000 envíos al mes; grupos `CDN: LM_5PasosEH` (id 2), `CDN: Lista Comunidad` (id 3, vacío) y `Default`; **solo 3 suscriptores: la propia cuenta (mail@clubdenutricion.es) y 2 pruebas** (clubdenutriciononline+1849 / +1852 @gmail.com) → no hay suscriptoras reales, se puede reorganizar todo sin perder nada. Un formulario (`CDN: LM_5PasosEH`, solo email + aceptación, honeypot activo, sin reCAPTCHA). Remitente `mail@clubdenutricion.es`, confirmado. Sin campañas ni campos personalizados. La API **no** expone el correo de confirmación ni las automatizaciones: eso se revisa en el panel. Página tras suscribirse: «página personalizada» (mensaje «revisa tu email»); cambiar a redirigir a `/lm-5-pasos-gracias/` al migrar, comprobando antes si con el iframe abre la página dentro del cuadro. Texto de la casilla de aceptación sin enlace a la política de privacidad: añadirlo. Siguiente: retomar los embudos con Mailrelay o elegir herramienta; migrar todo a Mailrelay (MailerLite no tiene suscriptores); replantear embudos; lead magnet de recetas fáciles; formulario y página de la lista de la comunidad; valorar API/MCP de Mailrelay.
2. [x] **Embudo de la guía:** el mockup no hace falta (decisión de la usuaria, 20 oct: la imagen actual de la tableta y el móvil está bien). **Hecho (20 oct):** página de descarga rehecha con la parte superior del original (título Neucha 55px, frase Fredoka 35px, texto + botón grande Pathway Extreme a la izquierda y portada a la derecha, sin emojis; fuentes alojadas en `public/fonts/`), «Recuerda» y «¿Y ahora qué?» con las 7 categorías (4 + 3). **Flujo real de Mailrelay comprobado (20 oct):** formulario → mensaje «revisa tu email» dentro del cuadro → correo de activación → `/lm-5-pasos-descarga/` → al confirmar entra en el grupo `CDN: LM_5PasosEH` y la automatización envía el correo de bienvenida «Aquí tienes la guía…». Funciona: según el registro de actividad de Mailrelay, la automatización envía el correo unos 5 minutos después de entrar en el grupo (la API da las horas en UTC; la usuaria está en hora de Canarias). Su enlace «Descargar guía» es la descarga directa del archivo de Google Drive (el mismo que el botón de la página): sirve de respaldo por si alguien no llega a la página. Si se cambia el archivo de la guía, actualizar el enlace en los dos sitios. Correo de bienvenida corregido por la usuaria (20 oct): en plural y solo como entrega de la guía (sin prometer más correos; cuando haya una serie, llegará sin anunciarla). Suscriptoras de prueba borradas por API: el grupo de la guía queda a 0. **Queda de este embudo:** el mockup; y al migrar, cambiar en Mailrelay «Tras suscribirse» a redirigir a `/lm-5-pasos-gracias/` (comprobando cómo se comporta dentro del iframe).
3. [x] **Preview de Vercel:** redesplegado el 18 oct en https://clubdenutricion-preview.vercel.app (proyecto `clubdenutricion-preview` de la cuenta machanga-factory, no caduca). **No se actualiza solo con GitHub:** para ver cambios hay que compilar (`npm run build`), copiar `dist/` + `vercel.json` a una carpeta con nombre sin espacios y lanzar `vercel deploy --prod`. Pendiente para la migración: proyecto definitivo conectado al repo.
4. [x] **Página 404** propia (`src/pages/404.astro`, 18 oct): hero lateral con «Volver al inicio», botón que abre el buscador y las 7 categorías del menú (4 + 3). Vercel la sirve con código 404. Si en el hosting definitivo no es Vercel, configurar `404.html` como página de error.
5. [x] **Aviso de cookies** (18 oct, `src/components/AvisoCookies.astro`): Aceptar / Rechazar al mismo nivel y Configurar por categorías (técnicas y analíticas), según la guía de la AEPD. Consent Mode v2 denegado por defecto; Google Analytics solo se carga tras aceptar; la elección dura 12 meses; enlace «Configurar cookies» en el pie para cambiarla (al retirar, borra las cookies `_ga`). Política de cookies reescrita. Fuentes Rubik y Fredoka alojadas en la web (`public/fonts/`), ya no se cargan de Google.
6. [ ] **Páginas legales** (18 oct): Privacidad reescrita entera (RGPD/LOPDGDD: finalidades, bases legales, conservación, Mailrelay, MailerLite, Vercel, Google Analytics, transferencias, derechos, AEPD; correo contacto@clubdenutricion.es). Cookies reescrita; «Más información sobre las cookies» con guía de navegadores actual; Copyright con año dinámico y sin «formulario de contacto»; correos enlazados en Términos y Descargo. **Falta:** datos del titular (nombre o razón social, NIF, domicilio) en Privacidad (marcados `PENDIENTE` en el código) y crear la página de **Aviso legal** (LSSI art. 10), que no existía en el WordPress. **Aplazado por decisión de la usuaria (18 oct):** se muda en breve y no quiere publicar su dirección física; va a contratar una dirección postal propia para la web. Retomar cuando la tenga (los datos van en Privacidad y en el Aviso legal). Comprobar antes que la dirección elegida sirve como «domicilio» a efectos de la LSSI: un apartado de correos puede no bastar; una domiciliación de empresa o un coworking sí.
7. [x] **Analítica:** Google Analytics 4 activo (18 oct), ID `G-T6KPWKGF7F` en `src/data/analitica.ts`. Comprobado: rechazando no se carga nada; aceptando se cargan `gtag.js` y las cookies `_ga` / `_ga_T6KPWKGF7F` y se envían visitas; al retirar el consentimiento se borran. Ojo: el preview de Vercel también envía visitas (con dominio `.vercel.app`); se pueden filtrar en GA por nombre de host.
8. [x] **Decisiones de direcciones antiguas** (18 oct): Ayuno pasa a `/ayuno-intermitente/` (redirige desde `-2`); `/cuerpo/` → Relación con el cuerpo; `/keto-lowcarb/` y `/recetas-sanas-keto-y-low-carb/` → Recetas keto y low carb; `/servicios-del-club-de-nutricion/` → Quiénes somos; `/coaching-nutricional/` → artículo «Qué es el coaching nutricional»; `/alimentacion/2/` (y `/page/N/`) → Alimentación; las 31 categorías de WordPress (y su paginación) → su página; etiquetas (`/tag/<etiqueta>/`) → página de búsqueda nueva `/buscar/?q=<etiqueta>`, que lanza la búsqueda sola (las 21 etiquetas del WordPress comprobadas, todas con resultados; `legacy` va al Blog y `wegovi` busca «wegovy»); autora (`/author/…`) → Quiénes somos. El buscador ya no indexa cabecera, pie, aviso de cookies, migas, índice, compartir, Síguenos ni las tarjetas de relacionados: los resultados solo cuentan el contenido real. Todas son 301 reales en `vercel.json` (comprobadas una a una, destinos 200). `/suscripcion-lista-comunidad/` ya tenía noindex.
9. [x] **Decisiones de contenido (20 oct):** emojis de las tarjetas de Energía y Mentalidad como imagen, igual que WordPress (Twemoji en `public/emoji/`, `src/lib/emoji.ts`); los 2 títulos del blog con emoji se quedan como están (no perjudican el SEO); entrada de coaching sin el párrafo de contacto; portada con 6 entradas por página. Ilustración «descanso» de Inflamación hormonal recoloreada: lo negro pasa al rosa de la ilustración (20 oct).
10. [x] **Token de GitHub expuesto:** comprobado el 20 oct, el token (`ghp_rrVD…`) ya no es válido (GitHub responde 401). Nada que hacer.
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
