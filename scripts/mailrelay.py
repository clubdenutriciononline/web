"""Consulta la API de Mailrelay con la clave de .env (nunca se imprime).

Uso: python scripts/mailrelay.py <ruta> [param=valor ...]
Ejemplos: python scripts/mailrelay.py groups
          python scripts/mailrelay.py subscribers per_page=5
"""
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

def leer_env():
    env = {}
    for linea in (Path(__file__).resolve().parent.parent / '.env').read_text(encoding='utf-8').splitlines():
        linea = linea.strip()
        if linea and not linea.startswith('#') and '=' in linea:
            k, v = linea.split('=', 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env

def llamar(ruta, params=None, metodo='GET', datos=None):
    env = leer_env()
    url = f"https://{env['MAILRELAY_CUENTA']}.ipzmarketing.com/api/v1/{ruta}"
    if params:
        url += '?' + urllib.parse.urlencode(params)
    cuerpo = json.dumps(datos).encode() if datos is not None else None
    req = urllib.request.Request(url, data=cuerpo, method=metodo, headers={
        'X-AUTH-TOKEN': env['MAILRELAY_API_KEY'],
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.loads(r.read() or 'null')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(errors='replace')[:500]

if __name__ == '__main__':
    ruta = sys.argv[1] if len(sys.argv) > 1 else 'groups'
    params = dict(a.split('=', 1) for a in sys.argv[2:])
    estado, res = llamar(ruta, params)
    print(estado)
    print(json.dumps(res, ensure_ascii=False, indent=2) if not isinstance(res, str) else res)
