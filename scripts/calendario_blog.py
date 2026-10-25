"""Calendario de publicación del blog a partir de scripts/titulos_blog.py
(25 oct). Orden pedido por la usuaria, por rondas:
  ronda 1: Hormonas, Energía, Metabolismo, Microbiota, Mentalidad,
           Alimentación y una receta;
  ronda 2: la primera subpágina de cada una (Ciclo menstrual, Fatiga
           crónica, Pérdida de grasa, Digestión, Ansiedad por la comida,
           Alimentos) y otra receta; y así sucesivamente.
Cada página va soltando sus artículos alternando causa, síntoma y solución.
Las recetas rotan: antiinflamatoria, energía hormonal, keto/low carb.

Salida: 00-analisis/Plan blog - artículos por página.md,
        00-analisis/Plan blog - calendario.md y .csv
"""
import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from titulos_blog import TITULOS  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
raiz = Path(__file__).resolve().parent.parent
paginas = json.loads((raiz / 'scripts/temas_blog.json').read_text(encoding='utf-8'))
TIPOS = {'C': 'Causa', 'S': 'Síntoma', 'O': 'Solución'}
CLAVE = {'C': 'causa', 'S': 'sintoma', 'O': 'solucion'}

# 1) Comprobar que cada página tiene un título por tema
for p in paginas:
    t = TITULOS[p['pagina']]
    for k in 'CSO':
        assert len(t[k]) == len(p[CLAVE[k]]), (p['pagina'], k, len(t[k]), len(p[CLAVE[k]]))

# 2) Entradas que ya existen en el blog, para avisar de posibles solapes
def normal(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9 ]', ' ', ''.join(c for c in s if unicodedata.category(c) != 'Mn'))

VACIAS = set('el la los las de del y o a en para por que como con sin tu tus su sus un una es lo al se no mas cuando cual cuales'.split())
def palabras(s):
    return {w for w in normal(s).split() if w not in VACIAS and len(w) > 3}

existentes = []
for f in (raiz / 'src/content/blog').glob('*/index.md'):
    m = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', f.read_text(encoding='utf-8'), re.M)
    if m:
        existentes.append(m.group(1))

def solape(titulo):
    pt = palabras(titulo)
    mejor = max(existentes, key=lambda e: len(pt & palabras(e)))
    comunes = pt & palabras(mejor)
    return mejor if len(comunes) >= 3 or (len(pt) <= 4 and len(comunes) >= 2 and len(comunes) == len(pt)) else ''

# 3) Cola de artículos de cada página (causa, síntoma, solución, causa...)
colas, repetidos, por_pagina = {}, [], {}
for p in paginas:
    t = TITULOS[p['pagina']]
    listas = {k: [x for x in t[k]] for k in 'CSO'}
    cola, fila = [], []
    i = 0
    while any(listas.values()):
        k = 'CSO'[i % 3]
        i += 1
        if not listas[k]:
            continue
        titulo = listas[k].pop(0)
        if titulo.startswith('='):
            repetidos.append((p['pagina'], TIPOS[k], titulo[1:].strip()))
            continue
        cola.append({'pagina': p['pagina'], 'madre': p['madre'], 'href': p['href'], 'tipo': TIPOS[k],
                     'titulo': titulo, 'solape': solape(titulo)})
    colas[p['pagina']] = cola
    por_pagina[p['pagina']] = list(cola)  # copia: las colas se vacían al montar el calendario

# 4) Calendario por rondas
familias = []
for p in paginas:
    if p['nivel'] == 'madre':
        familias.append([p['pagina']])
    else:
        familias[-1].append(p['pagina'])
RECETAS = ['Receta antiinflamatoria', 'Receta de energía hormonal', 'Receta keto / low carb']
turno = [0] * len(familias)
calendario, nreceta = [], 0
def receta():
    global nreceta
    calendario.append({'pagina': 'Recetas', 'madre': 'Recetas', 'href': '/recetas/',
                       'tipo': RECETAS[nreceta % 3], 'titulo': f'{RECETAS[nreceta % 3]} (por definir)', 'solape': ''})
    nreceta += 1


# Una receta cada 6 artículos (no una por ronda): al final, cuando solo quedan
# temas de Hormonas, las recetas no pasan a ser la mitad de las entradas.
desde_receta = 0
while any(colas[x] for fam in familias for x in fam):
    for i, fam in enumerate(familias):
        # siguiente página de la familia que aún tenga artículos
        for _ in range(len(fam)):
            pag = fam[turno[i] % len(fam)]
            turno[i] += 1
            if colas[pag]:
                calendario.append(colas[pag].pop(0))
                desde_receta += 1
                if desde_receta == 6:
                    receta()
                    desde_receta = 0
                break

# 5) Documentos
out = raiz / '00-analisis'
total = sum(len(v) for v in por_pagina.values())
L = ['# Plan del blog — artículos por página', '',
     'Generado el 25 oct con `scripts/calendario_blog.py` a partir de las causas, síntomas y soluciones de cada página (`scripts/titulos_blog.py`).', '',
     f'**{total} artículos** en {len(por_pagina)} páginas, más {len(repetidos)} temas descartados por repetirse en otra página. «Revisar» indica que se parece a una entrada que ya existe en el blog.', '']
madre_actual = None
for p in paginas:
    if p['madre'] != madre_actual:
        madre_actual = p['madre']
        L += [f'## {madre_actual}', '']
    L += [f"### {p['pagina']} ({len(por_pagina[p['pagina']])})", '']
    for a in por_pagina[p['pagina']]:
        L.append(f"- **{a['tipo']}:** {a['titulo']}" + (f" — *revisar: ya existe «{a['solape']}»*" if a['solape'] else ''))
    L.append('')
L += ['## Temas descartados por repetidos', '']
L += [f'- {pag} ({tipo}): {t}' for pag, tipo, t in repetidos]
(out / 'Plan blog - artículos por página.md').write_text('\n'.join(L) + '\n', encoding='utf-8')

C = ['# Plan del blog — calendario de publicación', '',
     'Orden por rondas: Hormonas → Energía → Metabolismo → Microbiota → Mentalidad → Alimentación → receta; en cada ronda se avanza a la siguiente subpágina de cada sección. Hay una receta cada 6 artículos; hacia el final, cuando las demás secciones ya no tienen temas, quedan solo los de Hormonas. Las recetas rotan entre antiinflamatoria, energía hormonal y keto/low carb. Las fechas se ponen cuando se decida la frecuencia de publicación.', '',
     f'**{len(calendario)} publicaciones** ({len(calendario) - nreceta} artículos y {nreceta} recetas).', '',
     '| Nº | Sección | Página | Tipo | Título | Nota |', '|---|---|---|---|---|---|']
for n, a in enumerate(calendario, 1):
    nota = f"Revisar: ya existe «{a['solape']}»" if a['solape'] else ''
    C.append(f"| {n} | {a['madre']} | {a['pagina']} | {a['tipo']} | {a['titulo']} | {nota} |")
(out / 'Plan blog - calendario.md').write_text('\n'.join(C) + '\n', encoding='utf-8')
with open(out / 'Plan blog - calendario.csv', 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f, delimiter=';')
    w.writerow(['Nº', 'Fecha', 'Sección', 'Página', 'Tipo', 'Título', 'Nota', 'Estado'])
    for n, a in enumerate(calendario, 1):
        w.writerow([n, '', a['madre'], a['pagina'], a['tipo'], a['titulo'],
                    f"Revisar: ya existe «{a['solape']}»" if a['solape'] else '', 'Pendiente'])

print('artículos', total, '| repetidos descartados', len(repetidos), '| publicaciones', len(calendario), '| recetas', nreceta)
print('posibles solapes con entradas existentes:', sum(1 for v in por_pagina.values() for a in v if a['solape']))
