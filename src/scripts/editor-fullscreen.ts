import { createFocusTrap } from 'focus-trap';

export function setupEditorFullscreen() {
  document
    .querySelectorAll<HTMLButtonElement>('[data-editor-fullscreen]')
    .forEach((button) => {
      if (button.dataset.ready) return;
      button.dataset.ready = 'true';
      const root = button.closest<HTMLElement>('.playground, .web-playground')!;
      const workspace = root.closest<HTMLElement>('[data-editor-workspace]')!;
      const trap = createFocusTrap(workspace, {
        initialFocus: () =>
          root.querySelector<HTMLElement>('.cm-content') || button,
        fallbackFocus: button,
        escapeDeactivates: false,
        returnFocusOnDeactivate: false,
      });
      let expanded = false;
      const inertSiblings = new Set<HTMLElement>();
      const closeLabel = button.querySelector<HTMLElement>(
        '.editor-close-label',
      )!;
      button.onclick = () => {
        if (expanded) {
          close();
          return;
        }
        expanded = true;
        workspace.classList.add('editor-workspace');
        workspace.setAttribute('popover', 'manual');
        workspace.setAttribute('role', 'dialog');
        workspace.setAttribute('aria-modal', 'true');
        workspace.setAttribute(
          'aria-label',
          root.getAttribute('aria-label') || 'Editor de código',
        );
        // Top-layer promotion keeps preview and runner iframes connected.
        workspace.showPopover();
        for (
          let ancestor: HTMLElement | null = workspace;
          ancestor && ancestor !== document.body;
          ancestor = ancestor.parentElement
        ) {
          for (const sibling of ancestor.parentElement!.children) {
            if (
              sibling === ancestor ||
              !(sibling instanceof HTMLElement) ||
              sibling.inert
            )
              continue;
            sibling.inert = true;
            inertSiblings.add(sibling);
          }
        }
        button.setAttribute('aria-label', 'Fechar editor expandido');
        button.title = 'Fechar editor expandido';
        button.setAttribute('aria-expanded', 'true');
        closeLabel.hidden = false;
        root.dispatchEvent(new Event('resumos:workspace'));
        trap.activate();
      };
      function close() {
        if (!expanded) return;
        expanded = false;
        trap.deactivate();
        workspace.hidePopover();
        workspace.removeAttribute('popover');
        workspace.removeAttribute('role');
        workspace.removeAttribute('aria-modal');
        workspace.removeAttribute('aria-label');
        workspace.classList.remove('editor-workspace');
        for (const sibling of inertSiblings) sibling.inert = false;
        inertSiblings.clear();
        root.dispatchEvent(new Event('resumos:workspace'));
        button.setAttribute('aria-label', 'Expandir editor');
        button.title = 'Expandir editor';
        button.setAttribute('aria-expanded', 'false');
        closeLabel.hidden = true;
        button.focus();
      }
      workspace.addEventListener('toggle', (event) => {
        if ((event as ToggleEvent).newState === 'closed') close();
      });
      workspace.addEventListener(
        'keydown',
        (event) => {
          if (
            !expanded ||
            event.key !== 'Escape' ||
            document.documentElement.dataset.vim === 'true'
          )
            return;
          // Let editor search and completion dismiss themselves before the workspace.
          if (root.querySelector('.cm-tooltip, .cm-search')) return;
          event.preventDefault();
          event.stopPropagation();
          close();
        },
        { capture: true },
      );
    });
}
