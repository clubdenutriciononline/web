# Plantilla de artículo de Blog — estructura de referencia

Página representativa analizada: **/ayuno-intermitente-beneficios-como-empezar/** (original clubdenutricion.es). Aplica a los 72 artículos del blog.

---

## 1. Tipografía

| Elemento | Fuente | Tamaño | Peso | Color / notas |
|---|---|---|---|---|
| Título del artículo (H1) | Rubik | — | 700 | `#131313` |
| Encabezados de sección (H2) | **Fredoka** | 24–28px | 500 | MAYÚSCULAS, `#6C2F50` |
| Subencabezados (H3) | Fredoka | ~22px | 500 | `#6C2F50` |
| Cuerpo | Fredoka | 18px | 400 | `#212121`, justificado |
| Botones | Fredoka | 18px | 500 | blanco sobre `#6C2F50` |

Nota: en el blog los encabezados de sección van en **Fredoka mayúsculas** (no en Rubik como en las madres e hijas).

## 2. Colores

- Ciruela (H2, H3, botones): `#6C2F50`
- Rosa (acentos, insignias): `#F964C0`
- Texto de cuerpo: `#212121`

## 3. Fondos

- Fondo de página claro, sin degradado propio en el cuerpo del artículo.
- Banda CTA de cierre `#9A4DB10A`. *Eliminada por decisión de la usuaria.*

## 4. Estructura del artículo (de arriba abajo)

1. **Imagen de portada:** foto a ancho completo del contenedor, radio 20px, sombra `5px 5px 10px rgba(0,0,0,.5)`.
2. **Título H1** (Rubik 700) y **entradilla** (Fredoka 18px).
3. **Tabla de contenidos** (widget de Elementor, con anclas numeradas). *Eliminada en la migración: el original la mostraba como texto con enlaces, y Astro la sustituye por el contenido real.*
4. **Cuerpo:** H2 en mayúsculas (Fredoka 24–28px, `#6C2F50`), párrafos justificados (Fredoka 18px), imágenes intercaladas con radio 20px y sombra, y listas.
5. **Bloques de apoyo dentro del cuerpo:** pildoras de icono (icon-box), acordeón de preguntas, pestañas (tabs) y listas de pasos.
6. **Banda CTA** (eliminada).
7. **Artículos relacionados:** 3 tarjetas (ver plantilla de tarjetas de blog, Páginas madre).

## 5. Tarjetas de blog (relacionados y listados)

- Foto con radio 20px, insignia de categoría en `#F964C0` con texto blanco, en la esquina inferior derecha.
- Avatar: icono circular de la marca (sin texto).
- Título en ciruela `#6C2F50`, Rubik 600.
- Enlace "LEER ARTÍCULO »" en rosa `#F964C0`, mayúsculas.
- 3 tarjetas por fila en escritorio; 2 en tablet; 1 en móvil.

## 6. Pendiente de confirmar

- Tamaño exacto de la entradilla y de las imágenes intercaladas.
- Espaciado vertical entre bloques del cuerpo.
