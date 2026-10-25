"""Genera public/.htaccess (configuración del hosting, LiteSpeed/Apache) a
partir de las redirecciones de vercel.json, que siguen siendo la lista
única. Volver a ejecutarlo si se cambia alguna redirección:

    python scripts/generar_htaccess.py
"""
import json
import re
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
redirecciones = json.loads((raiz / 'vercel.json').read_text(encoding='utf-8'))['redirects']


def a_regex(origen):
    """'/tag/:slug/page/:n(\\d+)' -> ('^tag/([^/]+)/page/\\d+/?$', {'slug': 1})"""
    ruta = origen.strip('/')
    grupos = {}
    partes = []
    for trozo in ruta.split('/'):
        m = re.fullmatch(r':(\w+)(\((.+)\))?', trozo)
        if m:
            nombre, patron = m.group(1), m.group(3)
            if patron:
                partes.append(patron)  # sin captura: no se usa en el destino
            else:
                grupos[nombre] = len(grupos) + 1
                partes.append('([^/]+)')
        else:
            partes.append(re.escape(trozo).replace('\\-', '-'))
    return '^' + '/'.join(partes) + '/?$', grupos


reglas, vistas = [], set()
for r in redirecciones:
    regex, grupos = a_regex(r['source'])
    if regex in vistas:  # vercel.json repite cada regla con y sin barra final
        continue
    vistas.add(regex)
    destino = r['destination']
    for nombre, n in grupos.items():
        destino = destino.replace(':' + nombre, f'${n}')
    reglas.append(f'RewriteRule {regex} {destino} [R=301,L,NE]')

htaccess = f'''# Configuración del hosting para la web nueva (Astro, estática).
# GENERADO por scripts/generar_htaccess.py a partir de vercel.json: no
# editar las redirecciones aquí, sino en vercel.json, y volver a generar.

Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Siempre HTTPS y sin «www» (la dirección principal es clubdenutricion.es).
RewriteCond %{{HTTPS}} !=on [OR]
RewriteCond %{{HTTP_HOST}} ^www\\. [NC]
RewriteRule ^(.*)$ https://clubdenutricion.es/$1 [R=301,L,NE]

# Direcciones antiguas del WordPress ({len(reglas)} reglas).
{chr(10).join(reglas)}
</IfModule>

# Caché del navegador: los archivos de _astro llevan huella en el nombre y
# no cambian nunca; las páginas se revalidan siempre.
<IfModule mod_headers.c>
<FilesMatch "\\.(webp|avif|jpe?g|png|gif|svg|woff2?|css|js)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(html|xml|txt)$">
Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# php -- BEGIN cPanel-generated handler, do not edit
<IfModule mime_module>
  AddHandler application/x-httpd-ea-php81 .php .php8 .phtml
</IfModule>
# php -- END cPanel-generated handler, do not edit
'''
(raiz / 'public' / '.htaccess').write_text(htaccess, encoding='utf-8', newline='\n')
print(len(reglas), 'redirecciones escritas en public/.htaccess')
