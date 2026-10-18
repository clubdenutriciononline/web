// Google Analytics 4 (decisión de la usuaria, 18 oct). Pegar aquí el ID de
// medición de la propiedad (Analytics → Administrar → Flujos de datos →
// "G-XXXXXXXXXX"). Mientras esté vacío no se carga nada de Google, aunque la
// visitante acepte.
//
// Analytics solo se carga si la visitante acepta las cookies analíticas en
// el aviso (src/components/AvisoCookies.astro), con el modo de
// consentimiento de Google (Consent Mode v2) denegado por defecto.
export const GA_ID = 'G-T6KPWKGF7F';

// Clave donde se guarda la elección de la visitante (localStorage; es
// técnica, no necesita consentimiento) y meses que vale antes de volver a
// preguntar (la AEPD recomienda no más de 24).
export const CONSENTIMIENTO_CLAVE = 'cdn-consentimiento-cookies';
export const CONSENTIMIENTO_MESES = 12;
