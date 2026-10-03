# Páginas hijas de Hormonas — estructura de referencia

Página representativa analizada: **/menopausia/** (original clubdenutricion.es, WordPress + Elementor). Es el patrón de las páginas hijas de Hormonas: Ciclo menstrual, Perimenopausia, Menopausia, Tiroides, Cortisol e Inflamación hormonal. Perimenopausia y Cortisol son páginas a medida con variaciones (ver al final).

Valores extraídos del HTML de Elementor y del CSS compilado del original.

---

## 1. Tipografía

| Elemento | Fuente | Tamaño | Peso | Color / notas |
|---|---|---|---|---|
| H1 (hero) | Rubik | 48px | 700 | `#131313` |
| H1 en hero secundario | Rubik | 32px | 700 | — |
| Subtítulo / kicker | Rubik | 15px | 600 | `#FFF9F4` (sobre foto) |
| H2 de sección | Rubik | 22px | 600 | `#6C2F50`, centrado |
| Títulos de tarjeta (image-box) | Rubik | — | 600 | `#6C2F50` |
| Cuerpo | Fredoka | 18–20px | 400–500 | `#212121` |
| Botones | Fredoka | 18px | 500 | blanco sobre `#6C2F50` |

## 2. Colores

- Ciruela (títulos, botones): `#6C2F50`
- Rosa (iconos, fondos de icono): `#F964C0`
- Negro de titulares: `#131313`
- Gris de metadatos: `#AAA7A7`
- Blanco de tarjetas: `#FFF`

## 3. Fondos de sección

- **Hero** y bandas altas: `linear-gradient(180deg, #FFE3FE69 0%, #ECDBF1 100%)`
- **Bandas intermedias:** `linear-gradient(180deg, #E89EFF08 0%, #ECDBF1 100%)`
- **Banda de cierre (CTA):** `#9A4DB10A`. *Eliminada por decisión de la usuaria.*
- Margen superior entre bandas: 29px a 46px según sección.

## 4. Componentes

- **Pildoras de icono (icon-box, 5 en fila):** padding 10px, radio 10px, sombra `0 0 10px rgba(0,0,0,.5)`. Hover: radio 20px y sombra `5px 5px 10px rgba(0,0,0,.5)`. Icono sobre fondo `#F964C0`.
- **Tarjetas de causas (image-box, 6 en 3 columnas):** fondo `#FFF`, padding 20px (los 86px inferiores para el texto), radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`. Hover: sombra `10px 10px 10px rgba(0,0,0,.5)`. Imagen de icono ilustrado arriba, título en ciruela y texto debajo.
- **Tarjetas "Áreas clave relacionadas" (image-box, 4 en 2 columnas):** foto redonda o cuadrada, título y texto. Mismo sistema de tarjeta blanca con sombra.
- **Listas con check (icon-list):** icono de 29px, margen izquierdo 30px. Dos columnas.
- **Imágenes sueltas (hero, diagramas):** radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`, ancho 73%.
- **Botones:** fondo `#6C2F50`, texto blanco Fredoka 18px, radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`.

## 5. Estructura de la página (de arriba abajo)

1. **Hero** (degradado A): H1 de 2-3 líneas (Rubik 700, 48px, `#131313`) a la izquierda; foto con radio 20px y sombra a la derecha.
2. **Intro:** párrafo de 20px (Fredoka), centrado o justificado.
3. **Pildoras de síntomas:** 5 icon-box en fila (icono rosa + texto corto).
4. **Caja "¿Qué vas a entender?":** texto y 4 viñetas con check en dos columnas.
5. **"Definición y contexto":** H2 en ciruela (22px, centrado) + texto a la izquierda + imagen a la derecha.
6. **"Causas de la menopausia":** H2 + 6 tarjetas de causa en 3 columnas (ilustración, título, texto).
7. **"Síntomas":** H2 + texto + 2 listas con check en dos columnas.
8. **"Relación con sistemas hormonales y metabólicos":** H2 + párrafos + 2 imágenes (infografía y foto) en fila.
9. **"Soluciones prácticas":** H2 + texto + 5 icon-box en fila (con icono rosa).
10. **"Áreas clave relacionadas":** H2 + 4 image-box en 2 columnas.
11. **Artículos relacionados:** 3 tarjetas (ver plantilla de Blog).
12. **Banda CTA:** eliminada.

## 6. Variaciones conocidas

- **Perimenopausia y Cortisol** son páginas a medida: "Resumen clave" como caja con viñetas o índice, y bloques propios (gráfico de hormonas, eje HPA). Se documentan aparte.
- **Inflamación hormonal** usa la plantilla de artículo largo (tabla de contenidos numerada, acordeón de preguntas frecuentes, conclusión).

## 7. Pendiente de confirmar

- Tamaños exactos de las ilustraciones de cada tarjeta.
- Paddings internos exactos de los icon-box.
