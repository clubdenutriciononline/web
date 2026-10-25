"""Saca de cada página madre y subpágina sus causas, síntomas y soluciones,
para planificar artículos del blog (25 oct). Resultado en
scripts/temas_blog.json.

Uso: python scripts/temas_blog.py
"""
import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
raiz = Path(__file__).resolve().parent.parent
nav = (raiz / 'src/data/navigation.ts').read_text(encoding='utf-8')

# Madres y sus hijas, en el orden del menú (sin Inicio, Recetas, Blog...).
madres = []
for bloque in re.finditer(r"label: '([^']+)',\s*href: '(/[^']+/)',\s*children: \[(.*?)\]", nav, re.S):
    nombre, href, hijos = bloque.groups()
    if href == '/recetas/':
        continue
    madres.append({'nombre': nombre, 'href': href,
                   'hijas': [{'nombre': n, 'href': h} for n, h in re.findall(r"label: '([^']+)', href: '([^']+)'", hijos)]})


def titulos(bloque):
    """Títulos de una lista de tarjetas o de checklist."""
    t = re.findall(r"title: '((?:[^'\\]|\\.)*)'", bloque)
    if not t:  # checklist de solo texto: ['Fatiga', 'Ansiedad', ...]
        t = re.findall(r"^\s*'((?:[^'\\]|\\.)+)',\s*$", bloque, re.M)
    return [x.replace("\\'", "'") for x in t]


def extraer(href):
    f = raiz / 'src/pages' / href.strip('/') / 'index.astro'
    s = f.read_text(encoding='utf-8')
    res = {'causa': [], 'sintoma': [], 'solucion': []}
    # Causas
    for m in re.finditer(r'<CausasGrid(.*?)/>\s*\n', s, re.S):
        bloque = m.group(1)
        lista = re.search(r'causas=\{\[(.*?)\]\}', bloque, re.S)
        if lista:
            res['causa'] += titulos(lista.group(1))
    # Síntomas / señales: checklist dentro de la sección con ese h2
    for m in re.finditer(r'<h2>([^<]*(?:[Ss]íntoma|[Ss]eñal)[^<]*)</h2>(.*?)</section>', s, re.S):
        lista = re.search(r'items=\{\[(.*?)\]\}', m.group(2), re.S)
        if lista:
            res['sintoma'] += titulos(lista.group(1))
    # Soluciones: listas de tarjetas (no las píldoras del principio)
    # Termina en «/>» o, si lleva texto de cierre dentro, en «>».
    for m in re.finditer(r'<SolucionesList(.*?)\n\s*/?>', s, re.S):
        bloque = m.group(1)
        cab = re.search(r'heading="([^"]*)"', bloque)
        # Las píldoras del principio (síntomas, sin título) no cuentan; las de
        # «Cómo equilibrar…» sí son soluciones.
        if 'variant="pill"' in bloque and not cab:
            continue
        if cab and re.search(r'[Ss]íntoma|[Ss]eñal', cab.group(1)):
            continue
        lista = re.search(r'soluciones=\{\[(.*?)\]\}', bloque, re.S)
        if lista:
            res['solucion'] += titulos(lista.group(1))
    return res


paginas = []
for m in madres:
    paginas.append({'pagina': m['nombre'], 'href': m['href'], 'madre': m['nombre'], 'nivel': 'madre', **extraer(m['href'])})
    for h in m['hijas']:
        paginas.append({'pagina': h['nombre'], 'href': h['href'], 'madre': m['nombre'], 'nivel': 'hija', **extraer(h['href'])})

(raiz / 'scripts/temas_blog.json').write_text(json.dumps(paginas, ensure_ascii=False, indent=1), encoding='utf-8')
total = 0
for p in paginas:
    n = len(p['causa']) + len(p['sintoma']) + len(p['solucion'])
    total += n
    print(f"{p['nivel']:5} {p['pagina']:30} causas {len(p['causa']):2}  síntomas {len(p['sintoma']):2}  soluciones {len(p['solucion']):2}")
print('páginas', len(paginas), '| temas', total)
