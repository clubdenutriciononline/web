"""Calendario de publicación del blog a partir de scripts/titulos_blog.py
(25 oct). Orden pedido por la usuaria, por rondas:
  ronda 1: Hormonas, Energía, Metabolismo, Microbiota, Mentalidad,
           Alimentación y una receta;
  ronda 2: la primera subpágina de cada una (Ciclo menstrual, Fatiga
           crónica, Pérdida de grasa, Digestión, Ansiedad por la comida,
           Alimentos) y otra receta; y así sucesivamente.
Cada página va soltando sus artículos alternando causa, síntoma y solución.
Las recetas rotan: antiinflamatoria, energía hormonal, keto/low carb.
(Ver en el punto 4 las reglas de alternar tipo y separar temas.)

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
from recetas_blog import RECETAS as LISTA_RECETAS  # noqa: E402

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

# 4) Calendario (decisión de la usuaria, 25 oct): artículos lunes, miércoles
#    y viernes, por rondas Hormonas, Energía, Metabolismo, Microbiota,
#    Hormonas, Mentalidad, Alimentación (Hormonas dos veces: tiene el doble de
#    temas); en cada turno se avanza a la siguiente página de la sección. Los
#    sábados, una receta fija rotando antiinflamatoria, energía hormonal y
#    keto/low carb.
from datetime import date, timedelta  # noqa: E402

familias = {}
for p in paginas:
    familias.setdefault(p['madre'], []).append(p['pagina'])
RONDA = ['Hormonas', 'Energía', 'Metabolismo', 'Microbiota', 'Hormonas', 'Mentalidad', 'Alimentación']
RECETAS = ['Receta antiinflamatoria', 'Receta de energía hormonal', 'Receta keto / low carb']
INICIO = date(2026, 11, 2)  # primer lunes de publicación
# Reglas de la usuaria (25 oct):
#  - el tipo se alterna en todo el calendario (causa, síntoma, solución...),
#    sea de la sección que sea;
#  - un mismo tema (estrés, sueño, peso...) no se repite en las 6
#    publicaciones siguientes (unas dos semanas): si toca, se adelanta otro
#    artículo de esa página.
TEMAS = {  # solo temas que saltan entre secciones (no «alimentación» o «energía», que son la propia sección)
    'estrés': r'estr[eé]s|cortisol|nervios',
    'ansiedad': r'ansiedad',
    'sueño': r'sue[nñ]o|dormir|descans|insomnio|despert',
    'peso': r'peso|grasa|adelgaz|engorda|b[aá]scula',
    'inflamación': r'inflam',
    'azúcar': r'az[uú]car|dulce|antojo|glucosa|insulina',
    'ejercicio': r'ejercicio|entrena|actividad f[ií]sica|sedentari|moverte',
    'ánimo': r'humor|[aá]nimo|irritab|autoestima',
    'cafeína': r'caf[eé]|cafe[ií]na|estimulante',
    'piel': r'piel|cabello|u[nñ]as',
    'fibra': r'fibra',
    'proteína': r'prote[ií]na',
    'hierro': r'hierro|anemia',
}
def temas_de(titulo):
    t = titulo.lower()
    return {k for k, r in TEMAS.items() if re.search(r, t)}

VENTANA = 6
TIPOS_CICLO = ['Causa', 'Síntoma', 'Solución']


def elegir(cola, tipo, recientes):
    """Índice del artículo a publicar: primero el del tipo que toca y sin
    temas recientes; si no, sin temas recientes; si no, el del tipo; si no,
    el primero."""
    ocupados = set().union(*recientes) if recientes else set()
    for cond in (lambda a: a['tipo'] == tipo and not (temas_de(a['titulo']) & ocupados),
                 lambda a: not (temas_de(a['titulo']) & ocupados),
                 lambda a: a['tipo'] == tipo,
                 lambda a: True):
        for i, a in enumerate(cola):
            if cond(a):
                return i


turno = {m: 0 for m in familias}
articulos = []
while any(colas[x] for fam in familias.values() for x in fam):
    for madre in RONDA:
        fam = familias[madre]
        tipo = TIPOS_CICLO[len(articulos) % 3]
        recientes = [temas_de(x['titulo']) for x in articulos[-VENTANA:]]
        ocupados = set().union(set(), *recientes)
        # Páginas de la sección en el orden de turno; se usa la primera que
        # tenga un artículo del tipo que toca y sin temas recientes; si
        # ninguna, la primera con artículos (con la mejor opción posible).
        orden = [fam[(turno[madre] + k) % len(fam)] for k in range(len(fam))]
        con_cola = [x for x in orden if colas[x]]
        if not con_cola:
            continue
        def ideal(x):
            return any(a['tipo'] == tipo and not (temas_de(a['titulo']) & ocupados) for a in colas[x])
        pag = next((x for x in con_cola if ideal(x)), con_cola[0])
        turno[madre] = (orden.index(pag) + turno[madre] + 1) % len(fam)
        articulos.append(colas[pag].pop(elegir(colas[pag], tipo, recientes)))

# Comprobación: cuántas veces se repite un tema dentro de la ventana.
repes = sum(1 for n, a in enumerate(articulos)
            if temas_de(a['titulo']) & set().union(set(), *[temas_de(x['titulo']) for x in articulos[max(0, n - VENTANA):n]]))
tipos_seguidos = sum(1 for n in range(1, len(articulos)) if articulos[n]['tipo'] == articulos[n - 1]['tipo'])
print(f'temas repetidos a menos de {VENTANA} publicaciones: {repes} | mismo tipo seguido: {tipos_seguidos}')

calendario, nreceta = [], 0
semanas = -(-len(articulos) // 3)
for sem in range(semanas):
    lunes = INICIO + timedelta(weeks=sem)
    for k, dia in enumerate((0, 2, 4)):
        n = sem * 3 + k
        if n < len(articulos):
            calendario.append({**articulos[n], 'fecha': lunes + timedelta(days=dia)})
    calendario.append({'pagina': 'Recetas', 'madre': 'Recetas', 'href': '/recetas/', 'tipo': RECETAS[nreceta % 3],
                       'titulo': LISTA_RECETAS[RECETAS[nreceta % 3]][nreceta // 3], 'solape': '',
                       'fecha': lunes + timedelta(days=5)})
    nreceta += 1
DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

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
L += ['## Recetas de los sábados', '']
for tipo, lista in LISTA_RECETAS.items():
    L += [f'### {tipo} ({len(lista)})', ''] + [f'- {r}' for r in lista] + ['']
L += ['## Temas descartados por repetidos', '']
L += [f'- {pag} ({tipo}): {t}' for pag, tipo, t in repetidos]
(out / 'Plan blog - artículos por página.md').write_text('\n'.join(L) + '\n', encoding='utf-8')

C = ['# Plan del blog — calendario de publicación', '',
     'Artículos los lunes, miércoles y viernes, por rondas: Hormonas → Energía → Metabolismo → Microbiota → Hormonas → Mentalidad → Alimentación (en cada turno, la siguiente subpágina de la sección). Los sábados, receta fija rotando antiinflamatoria → energía hormonal → keto/low carb. Hormonas va dos veces por ronda porque tiene el doble de temas.', '',
     f'**{len(calendario)} publicaciones en {semanas} semanas** ({len(calendario) - nreceta} artículos y {nreceta} recetas), del {calendario[0]["fecha"]:%d/%m/%Y} al {calendario[-1]["fecha"]:%d/%m/%Y}.', '',
     '| Nº | Fecha | Sección | Página | Tipo | Título | Nota |', '|---|---|---|---|---|---|---|']
for n, a in enumerate(calendario, 1):
    nota = f"Revisar: ya existe «{a['solape']}»" if a['solape'] else ''
    C.append(f"| {n} | {DIAS[a['fecha'].weekday()]} {a['fecha']:%d/%m/%Y} | {a['madre']} | {a['pagina']} | {a['tipo']} | {a['titulo']} | {nota} |")
(out / 'Plan blog - calendario.md').write_text('\n'.join(C) + '\n', encoding='utf-8')
with open(out / 'Plan blog - calendario.csv', 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f, delimiter=';')
    w.writerow(['Nº', 'Fecha', 'Sección', 'Página', 'Tipo', 'Título', 'Nota', 'Estado'])
    for n, a in enumerate(calendario, 1):
        w.writerow([n, f"{a['fecha']:%d/%m/%Y}", a['madre'], a['pagina'], a['tipo'], a['titulo'],
                    f"Revisar: ya existe «{a['solape']}»" if a['solape'] else '', 'Pendiente'])

print('artículos', total, '| repetidos descartados', len(repetidos), '| publicaciones', len(calendario), '| recetas', nreceta, '| semanas', semanas, '| hasta', calendario[-1]['fecha'])
import collections  # noqa: E402
ultima = {}
for a in calendario:
    ultima[a['madre']] = a['fecha']
print('última publicación de cada sección:', {k: f'{v:%d/%m/%Y}' for k, v in ultima.items()})
print('recetas por tipo:', collections.Counter(a['tipo'] for a in calendario if a['madre'] == 'Recetas'))
print('posibles solapes con entradas existentes:', sum(1 for v in por_pagina.values() for a in v if a['solape']))
