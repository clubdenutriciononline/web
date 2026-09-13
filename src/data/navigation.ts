// Estructura real del menú de cabecera y del footer de clubdenutricion.es,
// documentada en 00-analisis/01-inventario.md (sección 2 y 3).
// Fuente única de verdad para Header.astro y Footer.astro: no se debe
// duplicar esta lista dentro de los componentes.

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Hormonas',
    href: '/hormonas/',
    children: [
      { label: 'Ciclo Menstrual', href: '/ciclo-menstrual/' },
      { label: 'Perimenopausia', href: '/perimenopausia/' },
      { label: 'Menopausia', href: '/menopausia/' },
      { label: 'Tiroides', href: '/tiroides/' },
      { label: 'Cortisol', href: '/cortisol/' },
      { label: 'Inflamación hormonal', href: '/inflamacion-hormonal/' },
    ],
  },
  {
    label: 'Energía',
    href: '/energia/',
    children: [
      { label: 'Fatiga Crónica', href: '/fatiga-cronica/' },
      { label: 'Sueño', href: '/sueno/' },
      { label: 'Rutinas Energéticas', href: '/rutinas-energeticas/' },
    ],
  },
  {
    label: 'Metabolismo',
    href: '/metabolismo/',
    children: [
      { label: 'Pérdida de Grasa Femenina', href: '/perdida-grasa-femenina/' },
      { label: 'Resistencia a la Insulina', href: '/resistencia-insulina/' },
      { label: 'Ayuno Intermitente', href: '/ayuno-intermitente-2/' },
    ],
  },
  {
    label: 'Microbiota',
    href: '/microbiota/',
    children: [
      { label: 'Digestión', href: '/digestion/' },
      { label: 'Inflamación intestinal', href: '/inflamacion-intestinal/' },
      { label: 'Probióticos y Alimentación', href: '/probioticos-alimentacion/' },
    ],
  },
  {
    label: 'Mentalidad',
    href: '/mentalidad/',
    children: [
      { label: 'Ansiedad por la Comida', href: '/ansiedad-comida/' },
      { label: 'Estrés y Hábitos', href: '/estres-habitos/' },
      { label: 'Relación con el cuerpo', href: '/relacion-cuerpo-mujeres/' },
    ],
  },
  { label: 'Radar de Salud', href: '/radar-de-salud/' },
  { label: 'Alimentación', href: '/alimentacion/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contacto', href: '/contacto/' },
];

// En el original los iconos sociales son SVG inline del tema Astra (no
// imágenes descargables) — se recrean aquí como icon set genérico propio
// (SocialIcon.astro) para ser fieles a que el original los muestra como
// iconos, no como texto.
export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/clubdenutricion.es/', icon: 'facebook' as const },
  { label: 'X (Twitter)', href: 'https://x.com/nutriclubonline', icon: 'x' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/clubdenutricion.es.online/', icon: 'instagram' as const },
  { label: 'Pinterest', href: 'https://www.pinterest.es/nutricionclub/', icon: 'pinterest' as const },
  { label: 'Grupo de Facebook', href: 'https://www.facebook.com/share/8vLX9gbWrxxnTsAv/', icon: 'facebook-group' as const },
];

export const legalLinks = [
  { label: 'Política de cookies', href: '/politica-de-cookies/' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad/' },
  { label: 'Copyright', href: '/copyright/' },
  { label: 'Descargo de Responsabilidad', href: '/descargo-de-responsabilidad/' },
  { label: 'Términos y condiciones', href: '/terminos-y-condiciones/' },
];
