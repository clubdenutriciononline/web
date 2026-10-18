"""Generación por lotes (Batch API de Gemini) de las ilustraciones de causas.

Uso:
  python -I gemini_lote.py enviar  <escenas.json> <estado.json>
  python -I gemini_lote.py estado  <estado.json>
  python -I gemini_lote.py recoger <estado.json> <carpeta_salida>

- Sube las imágenes de referencia una sola vez (Files API) y las cita en
  cada petición.
- Modelo: Nano Banana 2 Lite, 1:1, 1K.
"""
import base64, json, sys, time, urllib.request, urllib.error, os

MODEL = 'gemini-3.1-flash-lite-image'
API = 'https://generativelanguage.googleapis.com'
REFS = [
    r'C:/Users/BeaMar/Documents/Negocios/CLUBDENUTRICIÓN/nueva web/src/pages/ciclo-menstrual/_images/icono-estres-ansiedad.jpg',
    r'C:/Users/BeaMar/Documents/Negocios/CLUBDENUTRICIÓN/nueva web/src/pages/ciclo-menstrual/_images/icono-peso-y-dieta.jpg',
]
BASE = ("Line-art illustration in exactly the same style as the reference images: thin magenta-pink (#C8407A) "
        "outline strokes, no fill, pure white background, friendly woman figure, small decorative doodles around. "
        "Scene: {scene}. Square, centred, no text, no letters, no numbers.")


def key():
    cfg = json.load(open(r'C:/Users/Proyectos/.claude.json', encoding='utf-8'))
    def find(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if k == 'GEMINI_API_KEY' and isinstance(v, str):
                    return v
                r = find(v)
                if r:
                    return r
        if isinstance(o, list):
            for v in o:
                r = find(v)
                if r:
                    return r
    return find(cfg)


KEY = key()


def call(url, body=None, headers=None, method=None):
    h = {'x-goog-api-key': KEY}
    if body is not None:
        h['Content-Type'] = 'application/json'
    h.update(headers or {})
    req = urllib.request.Request(url, data=json.dumps(body).encode() if body is not None else None, headers=h, method=method)
    try:
        r = urllib.request.urlopen(req, timeout=300)
        return json.load(r), r.headers
    except urllib.error.HTTPError as e:
        raise SystemExit(f'HTTP {e.code}: {e.read().decode()[:600]}')


def upload(path):
    data = open(path, 'rb').read()
    req = urllib.request.Request(f'{API}/upload/v1beta/files', data=json.dumps({'file': {'display_name': os.path.basename(path)}}).encode(),
                                 headers={'x-goog-api-key': KEY, 'X-Goog-Upload-Protocol': 'resumable', 'X-Goog-Upload-Command': 'start',
                                          'X-Goog-Upload-Header-Content-Length': str(len(data)), 'X-Goog-Upload-Header-Content-Type': 'image/jpeg',
                                          'Content-Type': 'application/json'})
    up_url = urllib.request.urlopen(req, timeout=120).headers['X-Goog-Upload-URL']
    req = urllib.request.Request(up_url, data=data, headers={'Content-Length': str(len(data)), 'X-Goog-Upload-Offset': '0',
                                                              'X-Goog-Upload-Command': 'upload, finalize'})
    f = json.load(urllib.request.urlopen(req, timeout=120))['file']
    return f['uri']


def enviar(escenas_path, estado_path):
    escenas = json.load(open(escenas_path, encoding='utf-8'))
    uris = [upload(p) for p in REFS]
    refs = [{'file_data': {'mime_type': 'image/jpeg', 'file_uri': u}} for u in uris]
    reqs = []
    for page, items in escenas.items():
        for k, scene in items.items():
            reqs.append({'request': {'contents': [{'parts': [{'text': BASE.format(scene=scene)}] + refs}],
                                     'generation_config': {'response_modalities': ['IMAGE'],
                                                           'image_config': {'aspect_ratio': '1:1', 'image_size': '1K'}}},
                         'metadata': {'key': f'{page}|{k}'}})
    body = {'batch': {'display_name': f'causas-{time.strftime("%Y%m%d-%H%M")}', 'input_config': {'requests': {'requests': reqs}}}}
    d, _ = call(f'{API}/v1beta/models/{MODEL}:batchGenerateContent', body)
    json.dump({'name': d['name'], 'n': len(reqs), 'model': MODEL, 'enviado': time.strftime('%Y-%m-%d %H:%M')}, open(estado_path, 'w'))
    print('lote enviado:', d['name'], 'peticiones:', len(reqs))


def estado(estado_path):
    st = json.load(open(estado_path))
    d, _ = call(f"{API}/v1beta/{st['name']}")
    meta = d.get('metadata', {})
    print('estado:', meta.get('state'), '| stats:', json.dumps(meta.get('batchStats', {})))
    return d


def recoger(estado_path, out):
    d = estado(estado_path)
    resp = d.get('response') or d.get('metadata', {}).get('output') or {}
    items = resp.get('inlinedResponses', {}).get('inlinedResponses') or resp.get('inlinedResponses') or []
    ok = fail = 0
    tokens = 0
    for it in items:
        k = it.get('metadata', {}).get('key', '?')
        r = it.get('response')
        img = None
        if r:
            tokens += r.get('usageMetadata', {}).get('candidatesTokenCount', 0)
            img = next((p['inlineData'] for c in r.get('candidates', []) for p in c.get('content', {}).get('parts', []) if 'inlineData' in p), None)
        if not img:
            fail += 1; print('FALLO', k, json.dumps(it.get('error') or r)[:200]); continue
        page, name = k.split('|')
        os.makedirs(f'{out}/{page}', exist_ok=True)
        open(f'{out}/{page}/causa-{name}.jpg', 'wb').write(base64.b64decode(img['data']))
        ok += 1
    print(f'recogidas {ok}, fallidas {fail}, tokens de salida {tokens}')


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'enviar':
        enviar(sys.argv[2], sys.argv[3])
    elif cmd == 'estado':
        estado(sys.argv[2])
    elif cmd == 'recoger':
        recoger(sys.argv[2], sys.argv[3])
