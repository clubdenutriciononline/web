// Cajas de las entradas de Radar de Salud (decisión de la usuaria, 18 oct,
// medido en el original): cada apartado ("🔬 Qué ha pasado", "🧠 Por qué
// importa", "🩺 Interpretación clínica", "⚡ Conclusión rápida") va en su
// propia caja redondeada, y los fondos se alternan. El Markdown de cada
// entrada es texto seguido con un <h3> por apartado; aquí se agrupa sobre
// el HTML ya generado (como en articulo-html.ts para el blog).
export function cajasRadar(html: string): string {
  const i = html.search(/<h3[\s>]/);
  if (i === -1) return html;
  const antes = html.slice(0, i);
  const cajas = html
    .slice(i)
    .split(/(?=<h3[\s>])/)
    .map((c) => `<section class="radar-caja">${c}</section>`);
  return antes + cajas.join('');
}

// Niveles de evidencia del Radar (los tres que usa el original), con su
// emoji y el criterio para elegirlos. Ver 00-analisis/Plantilla - Radar de
// Salud.md.
export const NIVELES_EVIDENCIA: Record<string, { emoji: string; criterio: string }> = {
  Alto: { emoji: '🔬', criterio: 'Estudio o revisión publicados en una revista médica o científica de prestigio, o de una institución de investigación reconocida.' },
  Medio: { emoji: '🧪', criterio: 'Varias fuentes coherentes (prensa sanitaria, profesionales, organismos), sin un estudio médico concreto detrás.' },
  Emergente: { emoji: '💭', criterio: 'Información preliminar o de una fuente poco relevante (blog, web o noticia aislada) que puede ser interesante, pero aún sin respaldo sólido.' },
};
