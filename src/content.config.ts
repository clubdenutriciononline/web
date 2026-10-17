import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog y Radar de Salud son DOS tipos de contenido independientes (mismo
// namespace de URL en la web actual, pero dos collections separadas aquí),
// tal como exige la arquitectura pública: no deben mezclarse.

const nutricionSchema = z
  .object({
    calorias: z.string().optional(),
    proteinas: z.string().optional(),
    grasas: z.string().optional(),
    carbohidratos: z.string().optional(),
    sodio: z.string().optional(),
    potasio: z.string().optional(),
    calcio: z.string().optional(),
    hierro: z.string().optional(),
    vitaminaA: z.string().optional(),
    vitaminaC: z.string().optional(),
    // Añadidos para la plantilla de receta (2026-10-17).
    fibra: z.string().optional(),
    azucares: z.string().optional(),
    grasasSaturadas: z.string().optional(),
  })
  .optional();

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .optional();

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // slug público real (por si difiere del nombre de archivo); si no se
      // indica, Astro usa el id del archivo como slug.
      slug: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      image: image(),
      imageAlt: z.string(),
      // Categoría/subcategoría a la que pertenece (para relacionar con la
      // página hub/subpágina correspondiente), ej. "hormonas/menopausia".
      category: z.string(),
      tags: z.array(z.string()).default([]),
      description: z.string(),
      seo: seoSchema,
      author: z.string().default('Club de Nutrición'),
      // Solo presente en artículos tipo receta (valores por ración).
      nutricion: nutricionSchema,
      // Plantilla de receta (2026-10-17, ver 00-analisis/Pendiente -
      // Recetas.md): si existe, la entrada se muestra con RecipeLayout
      // (ingredientes, pasos con fotos, resultado final y tabla nutricional
      // por ración) en lugar de la plantilla de artículo.
      receta: z
        .object({
          raciones: z.number(),
          preparacion: z.string(),
          coccion: z.string().optional(),
          dificultad: z.enum(['Fácil', 'Media', 'Difícil']),
          ingredientes: z.array(z.string()),
          imagenIngredientes: image().optional(),
          imagenIngredientesAlt: z.string().optional(),
          pasos: z.array(
            z.object({
              texto: z.string(),
              imagen: image().optional(),
              imagenAlt: z.string().optional(),
            }),
          ),
          resultado: image(),
          resultadoAlt: z.string(),
          consejo: z.string().optional(),
        })
        .optional(),
      // Fuentes/referencias, cuando corresponda (no todos los artículos lo tienen).
      sources: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const radar = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/radar' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      image: image(),
      imageAlt: z.string(),
      description: z.string(),
      seo: seoSchema,
      // Estructura fija editorial del Radar (ver plantilla RadarLayout):
      // Qué ha pasado / Por qué importa / Interpretación clínica /
      // Conclusión rápida / Nivel de evidencia / Fuente.
      // "Emergente" es una 4ª categoría real usada en el original (confirmada
      // en 3 publicaciones reales, no un error de una sola vez) además de
      // Alto/Medio/Bajo — se añadió tras detectarla durante la migración.
      nivelEvidencia: z.enum(['Alto', 'Medio', 'Bajo', 'Emergente']),
      fuente: z.string(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, radar };
