# Checklist de paso a producción (preparado, NO ejecutado)

Fecha: 2026-09-13. Este documento es solo una guía para cuando decidas hacer el cambio real a producción. **Nada de esto se ha ejecutado** — no se ha tocado DNS, dominio ni el WordPress en vivo en ningún momento de esta migración, y no se hará sin tu confirmación explícita paso a paso.

Orden recomendado:

## 1. Antes de tocar nada en producción

- [ ] Revisión visual completa tuya del preview actual (en curso).
- [ ] Resolver los 4 puntos de [13-pendientes-decision.md](13-pendientes-decision.md).
- [ ] Decidir la integración real de envío de los formularios (contacto + lead magnet), hoy en "modo de pruebas" — Mailrelay / MailerLite / Brevo u otra (`src/components/ContactForm.astro`, `src/pages/lm-5-pasos-optin/index.astro`).
- [ ] Backup completo del WordPress actual (base de datos + archivos) antes de cualquier cambio, por seguridad, aunque no se vaya a modificar todavía.

## 2. Build y despliegue definitivo

- [ ] `npm run build` limpio (0 errores) como último paso antes de desplegar.
- [ ] Desplegar en Vercel como proyecto **definitivo** (no `--temporary`) conectado al repo `machangafactory/clubdenutricion-web`, rama `master`.
- [ ] Configurar variables de entorno de producción en Vercel si la integración de formularios las requiere (API keys, etc.) — nunca commitear claves en el repo.

## 3. Dominio y DNS (el paso más delicado — hacerlo solo cuando todo lo demás esté validado)

- [ ] Añadir `clubdenutricion.es` (y `www.clubdenutricion.es` si aplica) como dominio en el proyecto de Vercel.
- [ ] Vercel indicará los registros DNS necesarios (normalmente A/ALIAS + CNAME) — anotarlos, pero **no cambiarlos todavía**.
- [ ] Reducir el TTL de los registros DNS actuales del dominio 24-48h antes del corte, para que el cambio se propague rápido cuando llegue el momento.
- [ ] Elegir una ventana de bajo tráfico para el cambio real de DNS.
- [ ] Cambiar los registros DNS en el proveedor actual para apuntar a Vercel.
- [ ] Esperar propagación (puede tardar de minutos a ~48h según el proveedor/TTL) y verificar con una herramienta de propagación DNS.
- [ ] Confirmar que Vercel emite el certificado SSL automáticamente para el dominio una vez propagado.

## 4. Verificaciones inmediatamente después del corte DNS

- [ ] `curl -I https://clubdenutricion.es/` → 200 OK, servido por Vercel.
- [ ] Redirect `/alimentacion-2/` → `/alimentacion/` → 301 en producción real (no solo en el preview).
- [ ] Sitemap accesible en `https://clubdenutricion.es/sitemap-index.xml`.
- [ ] `robots.txt` accesible y con la URL de sitemap correcta (dominio real, no `.vercel.app`).
- [ ] Revisar 10-15 URLs representativas al azar (home, un artículo de blog, una publicación de Radar, un hub, la política de privacidad) → todas 200 OK.
- [ ] Comprobar que ninguna imagen se sirve todavía desde el WordPress antiguo (ya verificado en el build que no ocurre, pero repetir la comprobación en producción real).
- [ ] Probar el envío real de los formularios de contacto y lead magnet en producción.
- [ ] Verificar Open Graph con el depurador de Facebook/LinkedIn y con la vista previa de Twitter/X, ya contra el dominio real (las cachés de estas plataformas pueden tener guardada la versión antigua de WordPress — puede requerir forzar un re-scrape).

## 5. Search Console y analítica

- [ ] Verificar la propiedad `clubdenutricion.es` en Google Search Console (si no está ya verificada, puede requerir un método de verificación adicional independiente de DNS).
- [ ] Enviar el nuevo sitemap en Search Console.
- [ ] Revisar en Search Console, en las semanas siguientes, si aparecen errores 404 nuevos por URLs antiguas de WordPress no migradas (categorías/tags/autores, páginas huérfanas) — con eso se termina de confirmar la decisión del punto 4 de [13-pendientes-decision.md](13-pendientes-decision.md).
- [ ] Reconectar Google Analytics / Meta Pixel / cualquier script de analítica que estuviera en el WordPress, si se quiere mantener continuidad de datos (confirmar antes cuáles existían y si deben migrarse o renovarse).
- [ ] Revisar Bing Webmaster Tools si el sitio estaba dado de alta ahí también.

## 6. Redes sociales y enlaces externos

- [ ] Revisar si hay enlaces al dominio publicados en biografías de redes sociales, Linktree, Google Business Profile, etc. — no requieren cambio (el dominio es el mismo), pero conviene confirmar que no apuntan a una URL antigua concreta que haya cambiado (solo `/alimentacion-2/`, que ya tiene redirect 301).

## 7. Qué hacer con el WordPress antiguo

- [ ] **No borrar ni apagar el WordPress inmediatamente.** Mantenerlo accesible (aunque desconectado del dominio público) durante un periodo de seguridad razonable, por si hace falta recuperar algún contenido o adjunto no migrado.
- [ ] Pasado ese periodo de seguridad (a decidir contigo, p. ej. 30-90 días), decidir si se da de baja el hosting/licencias de WordPress o se conserva como archivo.
- [ ] Cancelar o mantener (según se decida) los plugins de pago asociados (Elementor Pro, WPForms, etc.) una vez confirmado que ya no se usan.

---

Este documento se irá marcando a medida que se ejecuten los pasos reales, cuando decidas iniciar el corte a producción. Ninguna casilla se ha marcado todavía.
