"""Acceso FTP al hosting con los datos de .env (nunca se imprimen).

Uso: python scripts/ftp_hosting.py listar [carpeta]
     python scripts/ftp_hosting.py subir <ruta local> [<ruta local> ...]
       (rutas relativas a dist/; se suben a la misma ruta en el hosting y se
       saltan los archivos que ya están con el mismo tamaño)
"""
import ftplib
import sys
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


def conectar():
    env = leer_env()
    ftp = ftplib.FTP_TLS(env['FTP_HOST'], timeout=60)
    ftp.login(env['FTP_USUARIO'], env['FTP_CONTRASENA'])
    ftp.prot_p()  # datos cifrados
    return ftp


def tamanos_remotos(ftp, carpeta):
    try:
        return {n: int(d.get('size', -1)) for n, d in ftp.mlsd(carpeta) if d.get('type') == 'file'}
    except ftplib.error_perm:
        return None


def asegurar_carpeta(ftp, carpeta):
    partes = [x for x in carpeta.split('/') if x]
    actual = ''
    for parte in partes:
        actual = f'{actual}/{parte}' if actual else parte
        try:
            ftp.mkd(actual)
        except ftplib.error_perm:
            pass


def subir(ftp, dist, rutas):
    """Devuelve la conexión (puede ser nueva si hubo que reconectar)."""
    subidos = saltados = 0
    cache = {}
    archivos = []
    for r in rutas:
        local = dist / r
        archivos += [local] if local.is_file() else [f for f in local.rglob('*') if f.is_file() and f.name != 'desktop.ini']
    for f in sorted(archivos):
        rel = f.relative_to(dist).as_posix()
        carpeta = rel.rsplit('/', 1)[0] if '/' in rel else ''
        if carpeta not in cache:
            remotos = tamanos_remotos(ftp, carpeta or '.')
            if remotos is None:
                asegurar_carpeta(ftp, carpeta)
                remotos = {}
            cache[carpeta] = remotos
        if cache[carpeta].get(f.name) == f.stat().st_size:
            saltados += 1
            continue
        for intento in range(4):
            try:
                with open(f, 'rb') as fh:
                    ftp.storbinary(f'STOR {rel}', fh)
                break
            except (OSError, EOFError, ftplib.Error) as e:
                # El servidor corta a veces la conexión: reconectar y repetir.
                print(f'  conexión cortada en {rel} ({type(e).__name__}); reconecto', flush=True)
                try:
                    ftp.close()
                except Exception:
                    pass
                ftp = conectar()
        else:
            raise RuntimeError(f'No se pudo subir {rel}')
        subidos += 1
        if subidos % 100 == 0:
            print('  subidos', subidos, flush=True)
    print(f'Subidos {subidos}, ya estaban {saltados}')
    return ftp


if __name__ == '__main__':
    orden = sys.argv[1] if len(sys.argv) > 1 else 'listar'
    ftp = conectar()
    if orden == 'listar':
        carpeta = sys.argv[2] if len(sys.argv) > 2 else '.'
        print('Directorio:', ftp.pwd())
        for nombre, datos in sorted(ftp.mlsd(carpeta), key=lambda x: (x[1].get('type') != 'dir', x[0])):
            if nombre in ('.', '..'):
                continue
            print(('[carpeta] ' if datos.get('type') == 'dir' else '          ') + nombre, datos.get('size', ''))
    elif orden == 'subir':
        ftp = subir(ftp, Path(__file__).resolve().parent.parent / 'dist', sys.argv[2:])
    ftp.quit()
