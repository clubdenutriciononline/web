// Estructura de las entradas del blog (decisión de la usuaria, 18 oct). El
// Markdown de cada entrada es texto seguido, y la plantilla de artículo
// (ArticleLayout) necesita secciones para alternar fondos degradado/blanco
// como en las páginas hijas. Se trabaja sobre el HTML ya generado (Astro 7
// no ejecuta plugins rehype con su procesador de Markdown por defecto):
// - saca el primer párrafo (la frase que en el original va bajo el título)
//   como `lead`, para el hero;
// - agrupa el contenido en <section class="art-sec"> por cada <h2>;
// - marca como subtítulo el párrafo corto que sigue al <h2>;
// - mete "Qué vas a aprender" en un recuadro (art-caja);
// - convierte "Preguntas frecuentes" en desplegables <details>;
// - en las secciones de soluciones, cada apartado <h3> pasa a ser una
//   tarjeta con icono;
// - pone en mayúscula la primera letra de los <h2> ("conclusión");
// - la primera imagen vertical de cada sección sube junto al título y
//   flota a la derecha con el texto alrededor (como en el original y en el
//   "¿Qué es…?" de las hijas); las horizontales siguen a todo el ancho.

import * as iconos from './iconos';

const sinEtiquetas = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
const PARRAFO = /^\s*<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/;
// Bloques de primer nivel que produce el Markdown de las entradas.
const BLOQUE = /<(p|ul|ol|h3|h4|figure|blockquote|table|div)(?:\s[^>]*)?>[\s\S]*?<\/\1>|<img\b[^>]*>/g;

function esSubtitulo(inner: string) {
  if (/<img\b/.test(inner)) return false;
  const t = sinEtiquetas(inner);
  return t.length > 0 && t.length <= 110 && !/[.?:]$/.test(t);
}

function mayusculaInicial(htmlTitulo: string) {
  return htmlTitulo.replace(/^((?:<[^>]+>|\s)*)(\S)/, (_, pre, c) => pre + c.toLocaleUpperCase('es'));
}

// Primera imagen vertical de la sección (con su <p> envolvente si lo hay).
function sacarImagenVertical(cuerpo: string): { cuerpo: string; img?: string } {
  const m = cuerpo.match(/(?:<p(?:\s[^>]*)?>\s*)?(<img\b[^>]*>)(?:\s*<\/p>)?/);
  if (!m) return { cuerpo };
  const w = Number(m[1].match(/\bwidth="(\d+)"/)?.[1] ?? 0);
  const h = Number(m[1].match(/\bheight="(\d+)"/)?.[1] ?? 0);
  if (!w || !h || h <= w) return { cuerpo };
  return { cuerpo: cuerpo.replace(m[0], ''), img: m[1] };
}

// Secciones de soluciones con apartados H3 → tarjetas con icono, como en el
// original y en las hijas (decisión de la usuaria, 18 oct). El icono se
// elige por palabras del título del apartado, siempre entre los iconos
// extraídos de las fuentes del original (src/lib/iconos.ts).
const SECCION_TARJETAS = /soluci|consejo|estrategia|recomendaci|c[oó]mo (mejorar|reducir|bajar|aumentar|recuperar|prevenir|gestionar|cuidar|combatir|equilibrar)/;
// Revisado el 25 oct (pedido de la usuaria): más temas y nunca el mismo
// icono dos veces en un artículo; si un apartado no encaja con ningún tema,
// se usa el primer icono libre de RESERVA. Ampliado con la tanda 2 (compra,
// desayuno, ciclo, cocina, tiempo, progresión, historia de salud...); el
// té solo cuenta como palabra suelta (antes «muévete con» daba la taza).
// Un tema puede tener varios iconos para alternar (pedido de la usuaria,
// 25 oct: el sueño alterna las «Z» y la cama, no siempre la cara dormida);
// se elige según el título, así cada apartado conserva siempre el suyo.
type Icono = { svg: string };
const ICONOS_POR_TEMA: [RegExp, Icono | Icono[]][] = [
  [/pantalla|m[oó]vil|tecnolog|digital/, iconos.movil],
  [/cafe[ií]na|caf[eé]|alcohol|estimulante|(^|\s)t[eé](\s|$)/, iconos.taza],
  [/entorno|dormitorio|habitaci[oó]n|cama/, iconos.cama],
  [/sue[nñ]o|dorm|duerm|descans|noche/, [iconos.sueno, iconos.cama]],
  [/ciclo|menstrua/, iconos.calendarioCheck],
  [/compra|supermercado|etiqueta/, iconos.etiqueta],
  [/desayuno/, iconos.manzana],
  [/mastica|despacio/, iconos.cubiertosLinea],
  [/cocina|horno|vapor|plancha|en lote/, iconos.olla],
  [/historia|antecedente/, iconos.estetoscopio],
  [/alternativ|pregunta|duda/, iconos.cerebroIdeas],
  [/\d+ horas|espera/, iconos.despertador],
  [/pausa|desconect|respira|medita|mindful|relaj|yoga/, iconos.meditacion],
  [/estr[eé]s|ansiedad|calma|emocion|tensi[oó]n/, iconos.caraSonrojada],
  [/fuerza|m[uú]sculo|pesas/, iconos.mancuerna],
  [/actividad|ejercicio|mov[ei]|mu[eé]vete|deporte|entren|caminar|paseo/, iconos.ejercicio],
  [/relaci[oó]n|relaciones|apoyo|social|acompa|grupo|pareja|amig|entorno|otras personas/, iconos.personasAmigas],
  [/hidrat|agua|beber/, iconos.vasoAgua],
  [/suplement|vitamina|mineral|magnesio|hierro/, iconos.pastillas],
  [/plato|verdura|vegetal|fruta|tentempi/, iconos.zanahoria],
  [/integral|cereal|hidrato|avena/, iconos.espiga],
  [/grasa|aceite|pescado|omega/, iconos.pescado],
  [/fibra|legumbre/, iconos.hojaVerde],
  [/prote[ií]na/, iconos.cubiertos],
  [/aliment|dieta|comida|comer|come|nutri|cocina|receta|antiinflamatori/, iconos.cestaComida],
  [/m[eé]dic|profesional|consult|doctor|ginec|diagn[oó]stico|tratamiento|ayuda/, iconos.doctora],
  [/calor|caliente/, iconos.fuego],
  [/luz|sol|ritmo/, iconos.sol],
  [/gratitud|diario|escrib|carta|cuaderno|apunta|anota|registr/, iconos.biblioteca],
  [/detalle|f[ií]jate|atenci[oó]n/, iconos.ojo],
  [/meta|objetiv|constan/, iconos.diana],
  [/voz alta|agradece|gracias/, iconos.corazon],
  [/h[aá]bito|rutina|horario|regular|momento fijo|cada d[ií]a|plan |d[ií]as malos/, iconos.calendario],
  [/carga|delega|tiempo|corta|minuto/, iconos.reloj],
  [/80\/20/, iconos.check],
  [/metabolismo|muy poco|progres|gradual/, iconos.velocimetro],
];
const RESERVA = [iconos.hoja, iconos.spa, iconos.corazon, iconos.check, iconos.diana, iconos.sol, iconos.lunaIon, iconos.calendarioCheck];
function iconoPara(titulo: string, usados: Set<Icono>) {
  const t = titulo.toLowerCase();
  // Hash del título; se descartan los 2 bits bajos porque, con un
  // multiplicador impar, el último bit solo depende de la suma de letras y
  // casi todos los apartados acababan con el mismo icono.
  const giro = [...t].reduce((n, c) => (Math.imul(n, 31) + c.charCodeAt(0)) >>> 0, 0) >>> 2;
  const candidatos = (ic: Icono | Icono[]) =>
    Array.isArray(ic) ? ic.map((_, i) => ic[(i + giro) % ic.length]) : [ic];
  let icono: Icono | undefined;
  for (const [re, ic] of ICONOS_POR_TEMA) {
    if (!re.test(t)) continue;
    icono = candidatos(ic).find((c) => !usados.has(c));
    if (icono) break;
  }
  icono ??= RESERVA.find((ic) => !usados.has(ic)) ?? iconos.hoja;
  usados.add(icono);
  return icono.svg;
}

function tarjetas(cuerpo: string) {
  const bloques = cuerpo.match(BLOQUE) ?? [];
  const iPrimero = bloques.findIndex((b) => b.startsWith('<h3'));
  if (iPrimero === -1 || bloques.filter((b) => b.startsWith('<h3')).length < 2) return cuerpo;
  const intro = bloques.slice(0, iPrimero);
  const grupos: { h3: string; resto: string[] }[] = [];
  for (const b of bloques.slice(iPrimero)) {
    if (b.startsWith('<h3')) grupos.push({ h3: b, resto: [] });
    else grupos[grupos.length - 1].resto.push(b);
  }
  const usados = new Set<{ svg: string }>();
  const html = grupos
    .map((g) => `<div class="art-tarjeta"><span class="art-icono" aria-hidden="true">${iconoPara(sinEtiquetas(g.h3), usados)}</span>${g.h3}${g.resto.join('')}</div>`)
    .join('');
  return intro.join('') + `<div class="art-tarjetas" data-count="${grupos.length}">${html}</div>`;
}

function preguntas(cuerpo: string) {
  const bloques = cuerpo.match(BLOQUE) ?? [];
  const items: { q: string; a: string[] }[] = [];
  const sueltos: string[] = [];
  for (const b of bloques) {
    const p = b.match(/^<p(?:\s[^>]*)?>([\s\S]*?)<\/p>$/);
    if (p && sinEtiquetas(p[1]).endsWith('?')) items.push({ q: p[1], a: [] });
    else if (items.length) items[items.length - 1].a.push(b);
    else sueltos.push(b);
  }
  return sueltos.join('') + items.map((i) => `<details class="art-faq"><summary>${i.q}</summary>${i.a.join('')}</details>`).join('');
}

export function estructurarArticulo(html: string): { html: string; lead?: string } {
  const iH2 = html.search(/<h2[\s>]/);
  if (iH2 === -1) return { html };

  let antes = html.slice(0, iH2);
  let lead: string | undefined;
  antes = antes.replace(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/, (m, inner) => {
    if (/<img\b/.test(inner) || !sinEtiquetas(inner)) return m;
    lead = sinEtiquetas(inner);
    return '';
  });

  const secciones = html
    .slice(iH2)
    .split(/(?=<h2[\s>])/)
    .map((sec) => {
      const m = sec.match(/^(<h2[^>]*>)([\s\S]*?)(<\/h2>)([\s\S]*)$/);
      if (!m) return sec;
      const [, abre, tituloHtml, cierra] = m;
      let cuerpo = m[4];
      const titulo = sinEtiquetas(tituloHtml).toLowerCase();
      let cabecera = abre + mayusculaInicial(tituloHtml) + cierra;
      const sub = cuerpo.match(PARRAFO);
      if (sub && esSubtitulo(sub[1])) {
        cabecera += `<p class="art-subtitulo">${sub[1]}</p>`;
        cuerpo = cuerpo.slice(sub[0].length);
      }
      const vertical = sacarImagenVertical(cuerpo);
      if (vertical.img) {
        cuerpo = vertical.cuerpo;
        cabecera += `<div class="art-img-flotante">${vertical.img}</div>`;
      }
      if (/preguntas frecuentes/.test(titulo)) cuerpo = preguntas(cuerpo);
      else if (/qu[eé] vas a aprender/.test(titulo)) cuerpo = `<div class="art-caja">${cuerpo}</div>`;
      else if (SECCION_TARJETAS.test(titulo)) cuerpo = tarjetas(cuerpo);
      return `<section class="art-sec"><div class="art-sec-inner">${cabecera}${cuerpo}</div></section>`;
    });

  // Enlaces externos en pestaña nueva (decisión de la usuaria, 18 oct).
  const conEnlaces = (antes + secciones.join('')).replace(/<a\s+href="(https?:\/\/[^"]+)"([^>]*)>/g, (m, href, resto) =>
    /^https?:\/\/(www\.)?clubdenutricion\.es/.test(href) || /target=/.test(resto) ? m : `<a href="${href}"${resto} target="_blank" rel="noopener noreferrer">`,
  );
  return { html: conEnlaces, lead };
}
