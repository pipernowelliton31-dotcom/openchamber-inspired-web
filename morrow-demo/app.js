/* Working frontend-only demo interactions; no model, network, or filesystem access. */
(() => {
  const root = document.documentElement;
  const all = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const one = (selector, scope = document) => scope.querySelector(selector);
  const safeStore = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* storage optional */ } }
  };

  function applyTheme(value) {
    const next = value === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    all('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('title', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      const symbol = one('.theme-symbol', button);
      if (symbol) symbol.textContent = next === 'dark' ? '\u2600' : '\u263e';
    });
  }
  applyTheme(safeStore.get('morrow-theme') || 'light');
  all('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    safeStore.set('morrow-theme', next);
  }));

  const workspace = one('#workspace-root');
  if (!workspace) return;

  const sidebar = one('#wb-sidebar');
  const backdrop = one('#mobile-backdrop');
  const openSidebar = one('#sidebar-open');
  const closeSidebar = one('#sidebar-close');
  const inspectorToggle = one('#inspector-toggle');
  const inspectorClose = one('#inspector-close');
  const sessionSearch = one('#session-search');
  const feedback = one('#composer-feedback');
  const transcript = one('#wb-transcript');
  const initialSession = one('#session-content').innerHTML;

  function setSidebar(open) {
    workspace.classList.toggle('sidebar-open', !!open);
    openSidebar.setAttribute('aria-expanded', String(!!open));
    backdrop.hidden = !workspace.classList.contains('sidebar-open') && !workspace.classList.contains('inspector-open');
  }
  function setInspector(open) {
    if (window.innerWidth > 1180) {
      workspace.classList.toggle('inspector-collapsed', !open);
      workspace.classList.remove('inspector-open');
    } else {
      workspace.classList.toggle('inspector-open', !!open);
      workspace.classList.remove('inspector-collapsed');
    }
    inspectorToggle.setAttribute('aria-expanded', String(!!open));
    backdrop.hidden = !workspace.classList.contains('sidebar-open') && !workspace.classList.contains('inspector-open');
  }
  function inspectorIsVisible() {
    return window.innerWidth > 1180 ? !workspace.classList.contains('inspector-collapsed') : workspace.classList.contains('inspector-open');
  }
  openSidebar.addEventListener('click', () => { setInspector(false); setSidebar(true); });
  closeSidebar.addEventListener('click', () => setSidebar(false));
  inspectorToggle.addEventListener('click', () => { setSidebar(false); setInspector(!inspectorIsVisible()); });
  inspectorClose.addEventListener('click', () => setInspector(false));
  backdrop.addEventListener('click', () => { setSidebar(false); setInspector(false); });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') { setSidebar(false); if (window.innerWidth <= 1180) setInspector(false); }
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (['input','textarea'].includes(tag) || document.activeElement?.isContentEditable) return;
    if (event.key === '/') { event.preventDefault(); setSidebar(true); sessionSearch.focus(); }
    if (event.key.toLowerCase() === 'n') { event.preventDefault(); one('#new-session').click(); }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setSidebar(false);
    if (window.innerWidth <= 1180) {
      workspace.classList.remove('inspector-collapsed');
      inspectorToggle.setAttribute('aria-expanded', String(workspace.classList.contains('inspector-open')));
    } else {
      workspace.classList.remove('inspector-open');
      inspectorToggle.setAttribute('aria-expanded', String(!workspace.classList.contains('inspector-collapsed')));
    }
  });
  setInspector(window.innerWidth > 1180);

  function selectSession(button) {
    all('[data-session]').forEach(item => item.classList.toggle('selected', item === button));
    const title = button.dataset.session || 'New session';
    const project = button.dataset.project || 'Workspace';
    const state = button.dataset.state || 'Ready';
    one('#session-title').textContent = title;
    one('.wb-breadcrumb').textContent = project;
    one('#inspector-project').textContent = project;
    one('#run-state-text').textContent = state;
    one('#run-state-dot').className = 'status-dot ' + (state === 'Completed' ? 'status-dot-green' : state === 'Working' ? 'status-dot-blue' : '');
    if (title === 'Research synthesis') {
      one('#session-content').innerHTML = initialSession;
    } else {
      one('#session-content').replaceChildren();
      const panel = document.createElement('div');
      panel.className = 'empty-session-card';
      const heading = document.createElement('h2');
      heading.textContent = title;
      const paragraph = document.createElement('p');
      paragraph.textContent = `This sample session belongs to ${project}. Write a prompt below to test the composer UI. No AI backend is connected.`;
      panel.append(heading, paragraph);
      one('#session-content').append(panel);
    }
    one('#new-messages').replaceChildren();
    one('#composer-feedback').textContent = 'Demo interface only. No model or tool will be called.';
    transcript.scrollTop = 0;
    if (window.innerWidth <= 760) setSidebar(false);
  }
  sidebar.addEventListener('click', event => {
    const button = event.target.closest('[data-session]');
    if (button) selectSession(button);
  });
  sessionSearch.addEventListener('input', () => {
    const query = sessionSearch.value.trim().toLocaleLowerCase();
    let shown = 0;
    all('[data-session]', sidebar).forEach(button => {
      const visible = button.textContent.toLocaleLowerCase().includes(query) || (button.dataset.project || '').toLocaleLowerCase().includes(query);
      button.hidden = !visible;
      if (visible) shown += 1;
    });
    one('#session-empty').hidden = shown > 0;
  });
  one('#new-session').addEventListener('click', () => {
    sessionSearch.value = '';
    sessionSearch.dispatchEvent(new Event('input'));
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'session-row';
    button.dataset.session = 'Untitled session';
    button.dataset.project = 'Workspace';
    button.dataset.state = 'Ready';
    const mark = document.createElement('span'); mark.className = 'session-icon state-neutral';
    const title = document.createElement('span'); title.className = 'session-title'; title.textContent = 'Untitled session';
    button.append(mark, title);
    one('.session-scroll').insertBefore(button, one('.session-scroll .rail-section-heading').nextSibling);
    selectSession(button);
    one('#prompt-input').focus();
  });

  all('[data-panel]').forEach(tab => tab.addEventListener('click', () => {
    const panel = tab.dataset.panel;
    all('[data-panel]').forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    all('[data-panel-content]').forEach(section => section.hidden = section.dataset.panelContent !== panel);
  }));
  one('.inspector-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = all('[data-panel]');
    const active = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (active + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  });
    all('[data-mode]').forEach(button => button.addEventListener('click', () => {
    all('[data-mode]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    feedback.textContent = `${button.dataset.mode} mode selected. Demo only; no agent is connected.`;
  }));

  one('#prompt-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = one('#prompt-input');
    const text = input.value.trim();
    if (!text) { input.focus(); feedback.textContent = 'Enter a prompt to try the interface.'; return; }
    const mode = one('[data-mode].active')?.dataset.mode || 'Discuss';
    const question = document.createElement('div');
    question.className = 'new-prompt'; question.textContent = text;
    const acknowledgement = document.createElement('div');
    acknowledgement.className = 'demo-reply';
    acknowledgement.textContent = `${mode} mode: prompt added to this local demo. A live agent service has not been configured.`;
    one('#new-messages').append(question, acknowledgement);
    feedback.textContent = 'Demo prompt added locally. No model or service was called.';
    input.value = '';
    transcript.scrollTop = transcript.scrollHeight;
  });
  one('#prompt-input').addEventListener('keydown', event => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault(); one('#prompt-form').requestSubmit();
    }
  });
})();
