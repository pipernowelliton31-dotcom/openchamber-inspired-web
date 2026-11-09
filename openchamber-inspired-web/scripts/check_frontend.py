#!/usr/bin/env python3
"""Small structural smoke-check for the dependency-free starter (not visual QA)."""
from __future__ import annotations
import argparse
import pathlib
import re
import sys
from html.parser import HTMLParser


class Scan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.controls = []
        self.links = []
        self.labels = []
    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if 'id' in attr:
            if attr['id'] in self.ids:
                self.controls.append(f'duplicate id: {attr["id"]}')
            self.ids.add(attr['id'])
        if tag == 'button':
            if 'type' not in attr:
                self.controls.append('button missing explicit type')
            self.controls.append(('button-name', attr.get('aria-label'), attr.get('title'), attr.get('class', '')))
        if tag == 'a':
            self.links.append(attr.get('href', ''))
        if tag == 'label':
            self.labels.append(attr.get('for', ''))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=pathlib.Path)
    args = parser.parse_args()
    directory = args.directory.resolve()
    required = ('index.html', 'workbench.html', 'styles.css', 'app.js')
    errors, notes = [], []
    for filename in required:
        if not (directory / filename).is_file(): errors.append(f'missing {filename}')
    if errors:
        print('\n'.join('ERROR: '+e for e in errors)); return 1
    css = (directory / 'styles.css').read_text(encoding='utf-8')
    js = (directory / 'app.js').read_text(encoding='utf-8')
    for token in ('--page', '--surface', '--paper', '--text', '--muted', '--accent', '--shadow-raised'):
        if token not in css: errors.append(f'missing CSS token {token}')
    for feature in ('prefers-reduced-motion','focus-visible','max-width: 760px','data-theme="dark"'):
        if feature not in css: errors.append(f'missing responsiveness/a11y feature {feature}')
    for feature in ('addEventListener', 'setInspector', 'setSidebar', "#prompt-form", 'aria-selected'):
        if feature not in js: errors.append(f'missing demo interaction {feature}')
    for filename in ('index.html', 'workbench.html'):
        body = (directory / filename).read_text(encoding='utf-8')
        p = Scan(); p.feed(body)
        for link in p.links:
            if link and not link.startswith('#') and not re.match(r'^https?://',link) and not (directory / link.split('#')[0]).exists():
                errors.append(f'{filename}: unresolved local link {link}')
        for item in p.controls:
            if isinstance(item, str): errors.append(f'{filename}: {item}')
        if 'aria-label' not in body: notes.append(f'{filename}: no aria-label found')
    for issue in notes: print('NOTE:', issue)
    for error in errors: print('ERROR:', error)
    print(f'Checked {len(required)} files; {len(errors)} error(s).')
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
