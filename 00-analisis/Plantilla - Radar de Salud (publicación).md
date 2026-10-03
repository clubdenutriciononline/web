# Plantilla de publicación de Radar de Salud — estructura de referencia

Página representativa analizada: **/ayuno-intermitente-cerebro-efectos-ciencia/** (original clubdenutricion.es). Aplica a las 9 publicaciones de Radar.

---

## 1. Tipografía

| Elemento | Fuente | Tamaño | Peso | Color / notas |
|---|---|---|---|---|
| Insignia "RADAR DE SALUD" | Fredoka | 14px | 500 | blanco sobre `#F964C0`, pill |
| Título (H1) | Rubik | ~32px | 700 | `#131313`, centrado |
| Cabeceras de sección (H3 con emoji) | Rubik | 22px | 500 | `#6C2F50` |
| Cuerpo | Fredoka | 18px | 400 | `#212121` |
| Metadatos (fuente, fecha) | Fredoka | 14px | 400 | `#AAA7A7` |
| Nivel de evidencia | Rubik | 22px | 500 | `#6C2F50` |

## 2. Colores

- Ciruela (cabeceras, nivel de evidencia): `#6C2F50`
- Rosa (insignia): `#F964C0`
- Gris de metadatos: `#AAA7A7`

## 3. Estructura de la publicación (de arriba abajo)

1. **Insignia** "RADAR DE SALUD": pill rosa `#F964C0`, texto blanco en mayúsculas, con un icono a la derecha.
2. **Título H1**, centrado, Rubik 700.
3. **Cuatro cajas de contenido**, cada una con su cabecera y texto:
   - 🔬 **Qué ha pasado** (caja de fondo lila `#F3E5F5` aprox., radio 20px, sin sombra)
   - 🧠 **Por qué importa** (caja rosa claro, radio 20px)
   - 🩺 **Interpretación clínica** (caja lila, radio 20px)
   - ⚡ **Conclusión rápida** (caja crema/amarilla suave, radio 20px)
   Cada caja tiene padding de 20–30px. En el original van separadas por espacios (spacer).
4. **Nivel de evidencia:** línea con emoji y el valor (Alto, Medio, Bajo, Emergente), en ciruela.
5. **Fuente:** texto en gris `#AAA7A7`, 14px. Puede estar vacía (3 de 9 publicaciones).
6. **Fecha:** texto en gris `#AAA7A7`, 14px.
7. **Botones de compartir:** 6 círculos de color, en fila: Facebook `#39558e`, Pinterest `#b2081b`, LinkedIn `#0170aa`, X `#000`, WhatsApp `#24c761`, Email `#dc4034`. Icono blanco.
8. **Artículos relacionados:** 3 tarjetas en 3 columnas (ver plantilla de Blog).

## 4. Diferencias frente al blog

- No tiene imagen de portada.
- Tiene insignia "RADAR DE SALUD" y bloques de color por sección.
- Tiene nivel de evidencia, fuente y botones de compartir (el blog no los tiene).
- Se trata como noticia: su JSON-LD es `NewsArticle`, no `Article`.

## 5. Pendiente de confirmar

- Tono exacto de los fondos de cada caja (aproximados a lila/rosa/crema; la captura da una estimación visual).
- Tamaño exacto de la insignia.
