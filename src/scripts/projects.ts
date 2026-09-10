const form = document.querySelector<HTMLFormElement>('[data-project-filters]')!;
const search = form.querySelector<HTMLInputElement>('[name="q"]')!;
const course = form.querySelector<HTMLSelectElement>('[name="course"]')!;
const language = form.querySelector<HTMLSelectElement>('[name="language"]')!;
const reset = document.querySelector<HTMLButtonElement>(
  '[data-project-reset]',
)!;
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt');
const projects = [
  ...document.querySelectorAll<HTMLElement>('[data-project]'),
].map((element) => ({ element, text: normalize(element.textContent ?? '') }));

function filter() {
  const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const { element, text } of projects) {
    const matches =
      (!course.value || element.dataset.course === course.value) &&
      (!language.value || element.dataset.language === language.value) &&
      terms.every((term) => text.includes(term));
    element.hidden = !matches;
    if (matches) count++;
  }
  reset.hidden = !search.value && !course.value && !language.value;
  document.querySelector('[data-project-count]')!.textContent =
    count === 1 ? '1 projeto' : `${count} projetos`;
  document.querySelector<HTMLElement>('[data-project-empty]')!.hidden =
    count > 0;
  const url = new URL(location.href);
  for (const field of [search, course, language]) {
    if (field.value) url.searchParams.set(field.name, field.value);
    else url.searchParams.delete(field.name);
  }
  history.replaceState(null, '', url);
}

const params = new URLSearchParams(location.search);
for (const field of [search, course, language])
  field.value = params.get(field.name) ?? '';
form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('input', filter);
reset.addEventListener('click', () => {
  form.reset();
  filter();
  search.focus();
});
form.hidden = false;
filter();
