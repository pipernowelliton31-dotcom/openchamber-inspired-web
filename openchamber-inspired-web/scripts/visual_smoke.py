#!/usr/bin/env python3
"""Optional Playwright screenshot + interaction smoke test for the starter."""
from __future__ import annotations
import argparse
import os
from pathlib import Path
import re


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--chromium', default=os.environ.get('CHROMIUM_BIN', '/usr/bin/chromium'))
    args = parser.parse_args()
    from playwright.sync_api import sync_playwright
    site = args.site.resolve()
    output = args.out.resolve()
    output.mkdir(parents=True, exist_ok=True)
    errors = []
    # In CI environments where file:// and localhost navigation is blocked,
    # inline local CSS and JS into an about:blank document for visual checking.
    css = (site / 'styles.css').read_text(encoding='utf-8')
    css = re.sub(r'@font-face\s*\{[^}]*\}', '', css)  # no external CDN wait
    js = (site / 'app.js').read_text(encoding='utf-8')
    def prepare(filename):
        raw = (site / filename).read_text(encoding='utf-8')
        raw = raw.replace('<link rel="stylesheet" href="styles.css">', '<style>' + css + '</style>')
        raw = raw.replace('<script src="app.js" defer></script>', '')
        return raw
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path=args.chromium, args=['--no-sandbox'])
        for label, width, height in [('desktop', 1440, 900), ('tablet', 768, 1024), ('mobile', 390, 844)]:
            print(f'Checking {label} ({width}x{height})', flush=True)
            page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1, reduced_motion='reduce')
            page.set_default_timeout(5000)
            page.set_content(prepare('index.html'), wait_until='domcontentloaded', timeout=30000)
            page.add_script_tag(content=js)
            page.screenshot(path=str(output / f'landing-{label}.png'), full_page=True, animations='disabled', timeout=30000)
            overflow = page.evaluate('document.documentElement.scrollWidth - window.innerWidth')
            if overflow > 2: errors.append(f'landing {label}: horizontal overflow {overflow}px')
            page.set_content(prepare('workbench.html'), wait_until='domcontentloaded', timeout=30000)
            page.add_script_tag(content=js)
            page.screenshot(path=str(output / f'workbench-{label}.png'), full_page=False, animations='disabled', timeout=30000)
            overflow = page.evaluate('document.documentElement.scrollWidth - window.innerWidth')
            if overflow > 2: errors.append(f'workbench {label}: horizontal overflow {overflow}px')
            try:
                if width <= 760:
                    page.locator('#sidebar-open').click()
                    if not page.locator('#workspace-root').evaluate('(el) => el.classList.contains("sidebar-open")'):
                        errors.append('mobile: sidebar did not open')
                    page.locator('#sidebar-close').click()
                page.locator('#inspector-toggle').click()
                if width > 1180:
                    expected = page.locator('#workspace-root').evaluate('(el) => el.classList.contains("inspector-collapsed")')
                    if not expected: errors.append('desktop: inspector did not collapse')
                    page.locator('#inspector-toggle').click()
                else:
                    if not page.locator('#workspace-root').evaluate('(el) => el.classList.contains("inspector-open")'):
                        errors.append(f'{label}: inspector did not open')
                page.locator('[data-panel="files"]').click()
                if not page.locator('[data-panel-content="files"]').is_visible(): errors.append(f'{label}: Files tab did not activate')
                if width <= 1180: page.locator('#inspector-close').click()
                if width <= 760: page.locator('#sidebar-open').click()
                page.locator('#session-search').fill('Component')
                if page.locator('[data-session="Research synthesis"]').is_visible(): errors.append(f'{label}: search failed to filter')
                page.locator('#session-search').fill('')
                page.locator('#new-session').click()
                page.locator('#prompt-input').fill('A short test prompt')
                page.locator('#prompt-form button[type="submit"]').click()
                if 'not been configured' not in page.locator('#new-messages').inner_text(): errors.append(f'{label}: composer did not acknowledge demo')
                if width <= 760: page.locator('#sidebar-open').click()
                page.locator('[data-theme-toggle]').first.click()
                if page.locator('html').get_attribute('data-theme') != 'dark': errors.append(f'{label}: theme did not switch to dark')
            except Exception as exc:
                errors.append(f'{label} interaction: {exc}')
            page.close()
        browser.close()
    print('Screenshots:', output)
    for error in errors: print('ERROR:', error)
    print('Result:', 'PASS' if not errors else f'{len(errors)} error(s)')
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
