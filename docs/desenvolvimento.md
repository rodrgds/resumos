# Desenvolvimento e publicação

[Documentação](README.md)

## Correr e verificar

```sh
devenv shell
npm ci
npm run build
npm run dev
```

Abre `http://localhost:4321`. Devenv fornece Node 24 e Typst 0.15.1. Fora de Devenv, instala estas dependências no ambiente do projeto.

```sh
npm run check
npm run format:check
npm test
npm run build
npm run preview
```

O build fica em `dist/`. Os testes compilam o site em `.test-dist/` e verificam-no com Chromium. Para usar um navegador existente, define `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Em CI, o workflow instala o Chromium.

As animações Manim usam o perfil opcional `devenv --profile manim shell`. `npm run render:manim` gera as cenas registadas em `src/data/manim-scenes.json` e ignora as que já estão atualizadas. Inclui os vídeos, posters e manifests gerados no Git. O build valida a correspondência com as fontes sem precisar de Manim ou FFmpeg. Consulta [o guia de contribuição](../CONTRIBUTING.md#animações-com-manim) para preparar uma cena.

## Organização e dados

A página inicial reúne as cadeiras de 2026/27 por ano e semestre. As cadeiras com conteúdo publicado dão acesso aos apontamentos. A [cadeira fictícia de exemplo](https://resumos.rgo.pt/exemplo/) mostra os formatos de conteúdo.

- `src/data/courses.ts`: plano de estudos, ECTS, cores e ícones.
- `src/pages/index.astro`: página inicial.
- `src/pages/nucleos.astro`: grupos e ligações oficiais.
- `src/components/Header.astro`, `Footer.astro`, `StudyTools.astro`: elementos comuns.
- `src/scripts/`: pesquisa, notas, atalhos, IA e preferências.
- `src/styles/global.css`: grelha, temas e aparência.
- `src/styles/tools.css`: ferramentas, grupos e leitura.

Os dados curriculares vêm do [plano oficial de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_origem=CUR&pv_plano_id=31224&pv_tipo_cur_sigla=), consultado a 9 de setembro de 2026. CT I, II e III são grupos de opções. Projeto UP substitui o nome antigo Projeto FEUP.

O [MEIC](https://resumos.rgo.pt/meic/) inclui as 57 cadeiras com nome no [plano SIGARRA de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_plano_id=31204), incluindo as optativas e as opções de Competências Transversais.

## Publicar

O projeto Cloudflare Pages `resumos-feup` está ligado a este repositório. Pushes para `main` publicam em `https://resumos.rgo.pt`; outros branches têm previews.

A configuração usa `bash scripts/cloudflare-build.sh`, pasta de saída `dist`, Node 24 e imagem de build v3. O script descarrega Typst 0.15.1, confirma o SHA-256 do arquivo oficial, instala as dependências do lockfile, verifica tipos e compila o site com a pesquisa. Não é preciso um token Cloudflare no GitHub.

O workflow GitHub Actions verifica formatação, tipos, testes de navegador e build. Cloudflare compila de forma independente, por isso os checks de GitHub não bloqueiam automaticamente a publicação.

## Créditos

Oito fontes de leitura alojadas localmente: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata e IBM Plex Mono. O navegador descarrega a fonte escolhida. Ícones [Heroicons](https://heroicons.com/) nos controlos. As cadeiras usam [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT) e desenhos próprios através de `CourseIcon.astro`. O campo `icon` de cada cadeira escolhe o símbolo. Todos são SVG, sem JavaScript no navegador. [Fontes dos logótipos](../public/logos/README.md). A ilustração dos pontos foi criada para este projeto.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/), com código novo. O site é independente da FEUP e da U.Porto. `data/` e `_data/` são referências locais, ignoradas pelo Git, TypeScript e formatação.

## Projetos de estudantes

`/projetos/` reúne 60 repositórios públicos, selecionados a partir de READMEs e metadados consultados em 10 de setembro de 2026. `src/data/student-projects.json` guarda os links, descrições, cadeira ou área, linguagem e datas. O ano letivo só aparece quando existe evidência na fonte; caso contrário, a página identifica a criação do repositório. A pesquisa e os filtros correm no navegador e ficam no URL. Sem JavaScript, todos os links continuam disponíveis. As fontes permanecem nos repositórios dos autores.

A página de Núcleos reúne grupos de estudantes, equipas de competição e projetos ligados à FEUP, com descrições e ligações oficiais. Os links úteis incluem o TTS, a app Uni para Android e os Resumos SofiaViP.
