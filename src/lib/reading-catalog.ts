export function readTldrPaths(): Record<string, string> {
  const paths: string[] = JSON.parse(
    document.getElementById('tldr-paths')?.textContent || '[]',
  );
  return Object.fromEntries(paths.map((path) => [path, `${path}tldr/`]));
}

type ReadingPage = {
  path: string;
  title: string;
  course: string;
  next?: string;
};
type PageRow = [path: string, title: string, course: string, next?: string];

export function readReadingPages(): ReadingPage[] {
  const rows: PageRow[] = JSON.parse(
    document.getElementById('reading-pages')?.textContent || '[]',
  );
  const summaries = readTldrPaths();
  return rows.flatMap(([path, title, course, next]) => {
    const page = { path, title, course, next };
    return [
      page,
      ...(summaries[path]
        ? [{ ...page, path: summaries[path], title: `${title} · TLDR` }]
        : []),
    ];
  });
}
