"""Mueve el WordPress antiguo de public_html a la carpeta cerrada
_wordpress_antiguo (migración, 25 oct). Conserva la web nueva (lo que hay en
dist/) y los archivos del servidor y de verificación.

Uso: python scripts/apartar_wordpress.py          (solo enseña qué movería)
     python scripts/apartar_wordpress.py --mover  (lo mueve)
"""
import io
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ftp_hosting import conectar  # noqa: E402

DESTINO = '_wordpress_antiguo'
CONSERVAR = {'.well-known', 'cgi-bin', '.ftpquota', 'ads.txt', 'googleba1716d3abd2b8b4.html', DESTINO}
dist = Path(__file__).resolve().parent.parent / 'dist'
nuevos = {p.name for p in dist.iterdir()} - {'desktop.ini', '.htaccess'}

ftp = conectar()
actuales = [n for n, _ in ftp.mlsd('.') if n not in ('.', '..')]
# .txt de verificación de servicios (nombre hexadecimal en mayúsculas)
conservar = CONSERVAR | {n for n in actuales if re.fullmatch(r'[0-9A-F]{32}\.txt', n)}
mover = sorted(n for n in actuales if n not in conservar and n not in nuevos)
# El .htaccess y el index.php del WordPress también se apartan (se sustituyen).
print('Se conservan:', sorted(n for n in actuales if n in conservar))
print('Se mueven a', DESTINO + ':', mover)

if '--mover' in sys.argv:
    if DESTINO not in actuales:
        ftp.mkd(DESTINO)
    for n in mover:
        ftp.rename(n, f'{DESTINO}/{n}')
    # Carpeta cerrada: nadie puede entrar desde internet.
    ftp.storbinary(f'STOR {DESTINO}/.htaccess', io.BytesIO(b'Require all denied\n'))
    print('Movido. Queda en public_html:', sorted(n for n, _ in ftp.mlsd('.') if n not in ('.', '..')))
ftp.quit()
