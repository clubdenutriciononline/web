// Píldora de la categoría madre junto al logo (decisión de la usuaria,
// 18 oct): la etiqueta rosa de la imagen dice la subcategoría y esta dice a
// qué sección pertenece la entrada. "nutricion" es la antigua madre que hoy
// es Alimentación.
export const MADRES: Record<string, string> = {
  hormonas: 'Hormonas', energia: 'Energía', metabolismo: 'Metabolismo', microbiota: 'Microbiota',
  mentalidad: 'Mentalidad', nutricion: 'Alimentación', alimentacion: 'Alimentación', recetas: 'Recetas',
};
// Nombre con tildes de cada subcategoría (el slug no las lleva).
export const SUBS: Record<string, string> = {
  'alimentos': 'Alimentos', 'ansiedad-comida': 'Ansiedad por la comida', 'antiinflamatorias': 'Antiinflamatorias',
  'ayuno-intermitente': 'Ayuno intermitente', 'ciclo-menstrual': 'Ciclo menstrual', 'cortisol': 'Cortisol',
  'digestion': 'Digestión', 'energia-hormonal': 'Energía hormonal', 'estres-habitos': 'Estrés y hábitos',
  'estres-y-habitos': 'Estrés y hábitos', 'fatiga-cronica': 'Fatiga crónica', 'inflamacion-intestinal': 'Inflamación intestinal',
  'inflamacion-hormonal': 'Inflamación hormonal', 'keto-low-carb': 'Keto / low carb', 'menopausia': 'Menopausia',
  'patrones-alimentarios': 'Patrones alimentarios', 'perdida-grasa-femenina': 'Pérdida de grasa', 'perimenopausia': 'Perimenopausia',
  'probioticos-alimentacion': 'Probióticos', 'relacion-con-el-cuerpo': 'Relación con el cuerpo', 'relacion-cuerpo': 'Relación con el cuerpo',
  'resistencia-insulina': 'Resistencia a la insulina', 'rutinas-energeticas': 'Rutinas energéticas', 'sueno': 'Sueño', 'tiroides': 'Tiroides',
  'macronutrientes': 'Macronutrientes', 'micronutrientes': 'Micronutrientes',
};
// Página de cada categoría madre (miga de pan de los artículos).
export const MADRE_HREF: Record<string, string> = {
  hormonas: '/hormonas/', energia: '/energia/', metabolismo: '/metabolismo/', microbiota: '/microbiota/',
  mentalidad: '/mentalidad/', nutricion: '/alimentacion/', alimentacion: '/alimentacion/', recetas: '/recetas/',
};
