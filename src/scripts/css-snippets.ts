import {
  applySnippets,
  defaultSnippets,
  readSnippets,
  saveSnippets,
  SNIPPETS_KEY,
  type CssSnippet,
} from '../lib/css-snippets';

const list = document.querySelector<HTMLElement>('[data-snippet-list]')!;
const template =
  document.querySelector<HTMLTemplateElement>('#snippet-template')!;
const status = document.querySelector<HTMLElement>('[data-snippet-status]')!;
let snippets = readSnippets();
const addPresets =
  document.querySelector<HTMLButtonElement>('[data-add-presets]')!;
function syncPresets() {
  addPresets.hidden = defaultSnippets.every((preset) =>
    snippets.some((snippet) => snippet.id === preset.id),
  );
}

function save() {
  const persisted = saveSnippets(snippets);
  applySnippets(snippets);
  syncPresets();
  status.textContent = persisted
    ? 'Guardado.'
    : 'Não foi possível guardar. Estas alterações duram só esta visita.';
}

function row(snippet: CssSnippet, isNew = false) {
  const element = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const toggle = element.querySelector<HTMLInputElement>(
    '[data-snippet-enabled]',
  )!;
  const heading = element.querySelector<HTMLElement>('.snippet-heading')!;
  const remove = element.querySelector<HTMLButtonElement>(
    '[data-delete-snippet]',
  )!;
  const title = element.querySelector<HTMLElement>('[data-snippet-title]')!;
  const edit = element.querySelector<HTMLButtonElement>('[data-edit-snippet]')!;
  const form = element.querySelector<HTMLFormElement>('form')!;
  const name = form.elements.namedItem('name') as HTMLInputElement;
  const css = form.elements.namedItem('css') as HTMLTextAreaElement;
  const sync = () => {
    title.textContent = snippet.name;
    toggle.checked = snippet.enabled;
    name.value = snippet.name;
    css.value = snippet.css;
    edit.setAttribute('aria-label', `Editar ${snippet.name}`);
  };
  const close = () => {
    form.hidden = true;
    edit.setAttribute('aria-expanded', 'false');
    edit.focus();
  };
  sync();
  form.id = `snippet-${snippet.id}`;
  edit.setAttribute('aria-controls', form.id);
  edit.setAttribute('aria-expanded', String(isNew));
  toggle.disabled = isNew;
  heading.hidden = isNew;
  remove.hidden = isNew;
  form.hidden = !isNew;
  edit.onclick = () => {
    form.hidden = !form.hidden;
    edit.setAttribute('aria-expanded', String(!form.hidden));
    if (!form.hidden) {
      sync();
      name.focus();
    }
  };
  toggle.onchange = () => {
    snippet.enabled = toggle.checked;
    save();
  };
  form.onsubmit = (event) => {
    event.preventDefault();
    if (!name.value.trim()) {
      name.setCustomValidity('Escreve um nome.');
      name.reportValidity();
      return;
    }
    snippet.name = name.value.trim();
    snippet.css = css.value;
    if (isNew) {
      snippets.push(snippet);
      isNew = false;
      toggle.disabled = false;
      heading.hidden = false;
      remove.hidden = false;
    }
    sync();
    close();
    save();
  };
  name.oninput = () => name.setCustomValidity('');
  element.querySelector<HTMLButtonElement>('[data-cancel-snippet]')!.onclick =
    () => {
      if (isNew) {
        element.remove();
        document
          .querySelector<HTMLButtonElement>('[data-add-snippet]')!
          .focus();
      } else {
        sync();
        close();
      }
    };
  element.querySelector<HTMLButtonElement>('[data-delete-snippet]')!.onclick =
    () => {
      snippets = snippets.filter((item) => item.id !== snippet.id);
      element.remove();
      document.querySelector<HTMLButtonElement>('[data-add-snippet]')!.focus();
      if (!isNew) save();
    };
  list.append(element);
  if (isNew) name.focus();
}
function render() {
  list.replaceChildren();
  snippets.forEach((snippet) => row(snippet));
  syncPresets();
}
addPresets.onclick = () => {
  snippets.push(
    ...defaultSnippets
      .filter((preset) => !snippets.some((snippet) => snippet.id === preset.id))
      .map((preset) => ({ ...preset })),
  );
  save();
  render();
  document.querySelector<HTMLButtonElement>('[data-add-snippet]')!.focus();
};
document.querySelector<HTMLButtonElement>('[data-add-snippet]')!.onclick = () =>
  row({ id: crypto.randomUUID(), name: '', css: '', enabled: false }, true);
window.addEventListener('storage', (event) => {
  if (event.key !== SNIPPETS_KEY && event.key !== null) return;
  snippets = readSnippets();
  applySnippets(snippets);
  render();
});
render();
if (new URLSearchParams(location.search).has('sem-css')) {
  status.textContent =
    'O CSS personalizado está suspenso nesta página. Podes editar ou desativar os snippets.';
  document.querySelector<HTMLDialogElement>('#appearance')!.showModal();
  document.querySelector('.css-snippets')!.scrollIntoView();
}
