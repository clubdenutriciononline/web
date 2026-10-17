import type { CollectionEntry } from 'astro:content';

// Tipos de receta (subcategorías de RECETAS en el WordPress). Fuente única
// para el menú, la página madre /recetas/, sus 3 subpáginas y las migas de
// pan de cada receta.
export interface TipoReceta {
  category: string;
  label: string;
  titulo: string;
  href: string;
}

export const tiposReceta: TipoReceta[] = [
  { category: 'recetas/antiinflamatorias', label: 'Antiinflamatorias', titulo: 'Recetas antiinflamatorias', href: '/recetas-antiinflamatorias/' },
  { category: 'recetas/energia-hormonal', label: 'Energía hormonal', titulo: 'Recetas para la energía hormonal', href: '/recetas-energia-hormonal/' },
  { category: 'recetas/keto-low-carb', label: 'Keto / low carb', titulo: 'Recetas keto y low carb', href: '/recetas-keto-low-carb/' },
];

export const tipoDeReceta = (category: string) => tiposReceta.find((t) => t.category === category);

// Recetas publicadas (más recientes primero); con `category`, solo las de ese
// tipo. Cualquier entrada del blog con categoría "recetas…" cuenta.
export function recetas(todos: CollectionEntry<'blog'>[], category?: string) {
  return todos
    .filter((p) => !p.data.draft)
    .filter((p) => (category ? p.data.category === category : p.data.category.startsWith('recetas')))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
