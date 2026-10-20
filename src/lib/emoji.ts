// Emojis como imagen, igual que los muestra WordPress (Twemoji, licencia
// CC-BY 4.0), para los títulos que los llevan en el original (decisión de
// la usuaria, 20 oct: tarjetas de Energía y Mentalidad). Las imágenes están
// alojadas en public/emoji/<código>.svg; si se usa un emoji nuevo, hay que
// descargar su SVG de https://s.w.org/images/core/emoji/15.0.3/svg/<código>.svg.

const escapar = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function emojiComoImagen(texto: string): string {
  return escapar(texto).replace(/\p{Extended_Pictographic}️?/gu, (e) => {
    const codigo = [...e.replace('️', '')].map((c) => c.codePointAt(0)!.toString(16)).join('-');
    return `<img class="emoji" src="/emoji/${codigo}.svg" alt="${e}" width="20" height="20" />`;
  });
}
