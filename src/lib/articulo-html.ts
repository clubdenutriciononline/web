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
const ICONOS_POR_TEMA: [RegExp, { svg: string }][] = [
  [/pantalla|m[oó]vil|tecnolog/, iconos.movil],
  [/cafe[ií]na|caf[eé]|alcohol|estimulante/, iconos.taza],
  [/entorno|dormitorio|habitaci[oó]n|cama/, iconos.cama],
  [/sue[nñ]o|dorm|descans/, iconos.caraSomnolienta],
  [/estr[eé]s|relaj|ansiedad|calma|emocion/, iconos.caraSonrojada],
  [/actividad|ejercicio|mover|deporte|entren|fuerza|caminar/, iconos.ejercicio],
  [/apoyo|social|acompa|grupo/, iconos.personasAmigas],
  [/hidrat|agua/, iconos.vasoAgua],
  [/suplement|vitamina|mineral/, iconos.pastillas],
  [/aliment|dieta|comida|comer|nutri|fibra|prote/, iconos.cestaComida],
  [/m[eé]dic|profesional|consult|doctor|diagn[oó]stico|tratamiento/, iconos.doctora],
  [/luz|sol\b|ritmo/, iconos.sol],
  [/h[aá]bito|rutina|horario/, iconos.calendario],
];
function iconoPara(titulo: string) {
  const t = titulo.toLowerCase();
  return (ICONOS_POR_TEMA.find(([re]) => re.test(t))?.[1] ?? iconos.hoja).svg;
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
  const html = grupos
    .map((g) => `<div class="art-tarjeta"><span class="art-icono" aria-hidden="true">${iconoPara(sinEtiquetas(g.h3))}</span>${g.h3}${g.resto.join('')}</div>`)
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
