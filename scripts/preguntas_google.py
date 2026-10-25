"""Preguntas reales de Google para las preguntas frecuentes del blog (25 oct).
Uso: python scripts/preguntas_google.py "tema 1" "tema 2" ...
Pide al autocompletado de Google (español, España) el tema con comienzos de
pregunta (qué, por qué, cómo, cuándo, es normal...) y lista las búsquedas.
"""
import json, sys, urllib.request, urllib.parse
PREF = ['', 'qué ', 'por qué ', 'cómo ', 'cuándo ', 'es normal ', 'se puede ', 'cuánto ', 'es malo ', 'es bueno ']
def sug(q):
    u = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=es&q=' + urllib.parse.quote(q)
    try:
        return json.loads(urllib.request.urlopen(u, timeout=15).read().decode('utf-8', 'replace'))[1]
    except Exception as e:
        return [f'ERROR {e}']
for tema in sys.argv[1:]:
    vistos = []
    for p in PREF:
        for s in sug(p + tema):
            if s not in vistos: vistos.append(s)
    print(f'\n## {tema} ({len(vistos)})'); print('\n'.join(vistos))
