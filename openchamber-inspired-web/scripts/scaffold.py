#!/usr/bin/env python3
"""Copy the dependency-free warm website starter to a target directory."""
from __future__ import annotations
import argparse
import pathlib
import shutil
import sys

HERE = pathlib.Path(__file__).resolve().parent
STARTER = HERE.parent / 'assets' / 'starter'
FILES = ('index.html', 'workbench.html', 'styles.css', 'app.js', 'README.md')


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=pathlib.Path, required=True, help='Destination folder')
    parser.add_argument('--brand', default='Morrow', help='Brand name to replace in HTML')
    parser.add_argument('--force', action='store_true', help='Overwrite known starter filenames')
    args = parser.parse_args()
    dest = args.output.expanduser().resolve()
    if not args.brand.strip() or len(args.brand) > 80 or any(c in args.brand for c in '<>&'):
        parser.error('--brand must be nonempty, <=80 chars, and cannot contain HTML metacharacters')
    if any((dest / name).exists() for name in FILES) and not args.force:
        parser.error('Target contains starter files; use --force to overwrite only those files')
    dest.mkdir(parents=True, exist_ok=True)
    for name in FILES:
        src = STARTER / name
        dst = dest / name
        if not src.exists():
            print(f'Missing starter asset: {src}', file=sys.stderr)
            return 2
        if name.endswith('.html'):
            content = src.read_text(encoding='utf-8').replace('Morrow', args.brand).replace('morrow', args.brand.lower())
            dst.write_text(content, encoding='utf-8')
        else:
            shutil.copy2(src, dst)
    print(f'Created {len(FILES)} starter files in {dest}')
    print(f'Run: python -m http.server 8765 --directory "{dest}"')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
