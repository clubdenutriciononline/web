"""Convierte los borradores de una tanda en texto para el campo «Texto» de
Notion (25 oct). Uso: python scripts/texto_notion.py "00-analisis/Tanda 1 - borradores"
Deja un .txt por entrada en la carpeta «notion» de la tanda.
"""
import re
import sys
from pathlib import Path

import yaml

WEB = 'https://clubdenutricion.es'


def limpiar(cuerpo):
    lineas = []
    for linea in cuerpo.splitlines():
        if linea.startswith('!['):
            continue
        m = re.match(r'^#{2,4}\s+(.*)', linea)
        if m:
            linea = f'**{m.group(1).strip()}**'
        lineas.append(linea)
    texto = '\n'.join(lineas)
    texto = re.sub(r'\]\(/', f']({WEB}/', texto)
    texto = re.sub(r'\n{3,}', '\n\n', texto)
    return texto.strip()


def receta(datos):
    r = datos.get('receta') or {}
    if not r:
        return ''
    partes = ['**Ingredientes**', '\n'.join(f'- {i}' for i in r['ingredientes'])]
    partes.append('**Preparación**')
    partes.append('\n'.join(f'{n}. {p["texto"]}' for n, p in enumerate(r['pasos'], 1)))
    if r.get('freidora'):
        partes += ['**Sin horno, en freidora de aire**', r['freidora']]
    if r.get('consejo'):
        partes += ['**Consejo**', r['consejo']]
    return '\n\n'.join(partes)


def main(carpeta):
    carpeta = Path(carpeta)
    salida = carpeta / 'notion'
    salida.mkdir(exist_ok=True)
    for md in sorted(carpeta.glob('*/index.md')):
        _, cabecera, cuerpo = md.read_text(encoding='utf-8').split('---', 2)
        datos = yaml.safe_load(cabecera)
        texto = '\n\n'.join(t for t in (limpiar(cuerpo), receta(datos)) if t)
        num = md.parent.name.split(' - ')[0]
        (salida / f'{num}.txt').write_text(texto, encoding='utf-8')
        print(num, datos['slug'], len(texto))


if __name__ == '__main__':
    main(sys.argv[1])
