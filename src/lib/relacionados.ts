import type { CollectionEntry } from 'astro:content';

// Revisión visual 2026-09-14: la usuaria pidió que las tarjetas de
// "artículos relacionados" muestren siempre 3 (para llenar la fila de la
// rejilla a 3 columnas), en vez de dejar la fila incompleta cuando la
// categoría real solo tiene 1 o 2 coincidencias. Se priorizan siempre los
// artículos que realmente coinciden por categoría; el resto de huecos se
// rellena con los más recientes del blog (nunca contenido inventado).
export function pickRelacionados(
  todos: CollectionEntry<'blog'>[],
  match: (post: CollectionEntry<'blog'>) => boolean,
  count = 3,
): CollectionEntry<'blog'>[] {
  const ordenados = [...todos]
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const propios = ordenados.filter(match);
  if (propios.length >= count) return propios.slice(0, count);
  const resto = ordenados.filter((p) => !propios.includes(p));
  return [...propios, ...resto].slice(0, count);
}
