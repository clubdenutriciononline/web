// Formularios de suscripción del embudo (18 oct). Un único sitio para
// cambiar de proveedor: la página solo muestra el formulario que haya aquí.
//
// Guía "5 pasos" — formulario de Mailrelay del original (desde el 20 oct pide
// nombre y email; alto 280: justo su contenido), que sigue
// funcionando (los registros entran en la lista aunque la usuaria no tenga
// acceso a la cuenta). Flujo: formulario → correo de confirmación de Mailrelay
// → /lm-5-pasos-descarga/.
// Para pasar a MailerLite: crear el formulario y el grupo "Guía 5 pasos" con
// doble opt-in, poner como página de agradecimiento /lm-5-pasos-gracias/ y
// como enlace del correo de confirmación /lm-5-pasos-descarga/, y sustituir
// `guia` por { proveedor: 'mailerlite', url: '<URL del formulario embebido>' }.
export type Formulario = { proveedor: 'mailrelay' | 'mailerlite'; url: string; alto?: number };

export const formularios: Record<'guia', Formulario> = {
  guia: { proveedor: 'mailrelay', url: 'https://clubdenutricion.ipzmarketing.com/f/5gCYfuS_XVI', alto: 280 },
};
