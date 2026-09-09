interface SearchResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
  sub_results?: { title: string; url: string; excerpt: string }[];
}
interface SearchIndex {
  search: (
    query: string,
  ) => Promise<{ results: { data: () => Promise<SearchResult> }[] }>;
}
let index: Promise<SearchIndex> | undefined;
export function setupSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('#global-search')!;
  const input = document.querySelector<HTMLInputElement>('#search-input')!;
  const status = document.querySelector<HTMLElement>('#search-status')!;
  const list = document.querySelector<HTMLUListElement>('#search-results')!;
  let generation = 0;
  let timer: ReturnType<typeof setTimeout>;
  input.addEventListener('input', () => {
    const current = ++generation;
    clearTimeout(timer);
    list.replaceChildren();
    const query = input.value.trim();
    status.textContent = query
      ? 'A pesquisar…'
      : 'Escreve para pesquisar em todo o site.';
    if (!query) return;
    timer = setTimeout(async () => {
      try {
        const bundle = '/pagefind/pagefind.js';
        index ??= import(/* @vite-ignore */ bundle);
        const result = await (await index).search(query);
        const pages = await Promise.all(
          result.results.slice(0, 8).map((item) => item.data()),
        );
        if (current !== generation) return;
        const entries = pages
          .flatMap((page) =>
            page.sub_results?.length
              ? page.sub_results
              : [
                  {
                    title: page.meta.title || 'Resumos LEIC',
                    url: page.url,
                    excerpt: page.excerpt,
                  },
                ],
          )
          .slice(0, 15);
        status.textContent = entries.length
          ? `${entries.length} resultados`
          : 'Não encontrámos resultados. Tenta outra palavra.';
        for (const entry of entries) {
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.href = entry.url;
          const title = document.createElement('strong');
          title.textContent = entry.title;
          const excerpt = document.createElement('span');
          // Pagefind creates the excerpts from our own built HTML. Only keep its text.
          excerpt.textContent = new DOMParser().parseFromString(
            entry.excerpt,
            'text/html',
          ).body.textContent;
          link.append(title, excerpt);
          link.addEventListener('click', () => dialog.close());
          item.append(link);
          list.append(item);
        }
      } catch {
        index = undefined;
        if (current === generation)
          status.textContent =
            'Não foi possível carregar a pesquisa. Tenta novamente.';
      }
    }, 150);
  });
  dialog.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const links = [...list.querySelectorAll<HTMLAnchorElement>('a')];
    if (!links.length) return;
    event.preventDefault();
    const position = links.indexOf(document.activeElement as HTMLAnchorElement);
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    const next =
      position < 0
        ? direction === 1
          ? 0
          : links.length - 1
        : (position + direction + links.length) % links.length;
    links[next].focus();
  });
  return () => {
    dialog.showModal();
    input.focus();
  };
}
