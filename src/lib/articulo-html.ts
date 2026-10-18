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
// - pone en mayúscula la primera letra de los <h2> ("conclusión");
// - la primera imagen vertical de cada sección sube junto al título y
//   flota a la derecha con el texto alrededor (como en el original y en el
//   "¿Qué es…?" de las hijas); las horizontales siguen a todo el ancho.

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
      return `<section class="art-sec"><div class="art-sec-inner">${cabecera}${cuerpo}</div></section>`;
    });

  return { html: antes + secciones.join(''), lead };
}
