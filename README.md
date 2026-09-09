# Resumos LEIC · FEUP

Apontamentos de LEIC da FEUP, feitos em Astro. [Abrir o site](https://resumos-feup.pages.dev).

A página inicial reúne as cadeiras de 2026/27 por ano e semestre. Ainda não há resumos das cadeiras reais. A [cadeira fictícia de exemplo](https://resumos-feup.pages.dev/exemplo/) mostra os formatos de conteúdo. A página de Núcleos liga à JuniFEUP, ACM FEUP, IEEE FEUP e NCGM.

## Correr

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

## Conteúdo

Lê [CONTRIBUTING.md](CONTRIBUTING.md) para escrever uma página. Markdown e MDX usam o mesmo processador de LaTeX: `$...$` no texto e `$$...$$` em bloco, renderizados com KaTeX.

- `src/pages/exemplo/apontamentos.md`: texto, fórmulas, imagem local, tabela e código.
- `src/pages/exemplo/diagramas.mdx`: Typst, CeTZ-Plot, Fletcher, DOT e vídeo do YouTube.
- `src/content/exemplo/`: os ficheiros `.typ` e `.dot` usados nos exemplos.
- `src/layouts/Lesson.astro`: layout de leitura, ações da página e ligação ao código.
- `src/components/Prose.astro`: estilos de conteúdo e KaTeX.

`Typst.astro` chama o compilador oficial no build, através de `src/lib/typst.ts`. O modo HTML mantém texto selecionável e MathML. SVG exige descrição alternativa e serve para gráficos e desenhos. A exportação HTML do Typst é experimental. Confirma sempre o resultado. Uma falha de compilação interrompe o build.

Os imports internos do Typst partem da raiz do projeto, por exemplo `/src/content/exemplo/nota.typ`. Os pacotes externos têm versões fixas e são descarregados no primeiro build. Só conteúdo revisto do repositório chega aos compiladores. Não são endpoints para conteúdo enviado por visitantes.

`Dot.astro` usa Graphviz através de `@viz-js/viz`, só no build. Não precisa de uma instalação de `dot` nem envia WebAssembly para o navegador. `YouTube.astro` só cria o iframe após um clique.

Os testes em `tests/fixtures/` usam `RESUMOS_TEST_CONTENT=1`. Essa variável nunca deve estar definida em produção.

## Pesquisa e ferramentas

A pesquisa global usa Pagefind e funciona sem servidor de pesquisa. O build indexa o conteúdo de `data-pagefind-body`; ferramentas e notas locais ficam excluídas. Em desenvolvimento, a integração serve o último índice construído. Corre `npm run build` para o atualizar.

As preferências de leitura, os atalhos e o bloco de notas ficam em `localStorage`, separados entre si. O bloco não sincroniza entre dispositivos. Permite descarregar um `.txt` e avisa quando não consegue guardar. Limpar os dados do navegador apaga estas preferências e notas.

Por predefinição, `/` pesquisa, `n` abre as notas, `,` abre a aparência, `?` abre os atalhos e `a` abre o menu de IA nas páginas que o têm. Ctrl ou ⌘ K também pesquisa. Os atalhos não atuam em campos de texto. Podes mudar ou desativar as teclas e ativar navegação com `h`, `j`, `k`, `l`.

O menu de IA abre ChatGPT, Claude, Perplexity ou Gemini. Os três primeiros recebem uma pergunta no URL. Gemini usa copiar e abrir. Estes links são convenções das interfaces dos fornecedores, não uma API estável. Há sempre uma pergunta visível para copiar. Em localhost, copia-se o conteúdo público da página, pois os fornecedores não conseguem ler endereços locais. O bloco de notas nunca é incluído. Não há chaves de API.

## Organização

- `src/data/courses.ts`: plano de estudos, ECTS, cores e ícones.
- `src/pages/index.astro`: página inicial.
- `src/pages/nucleos.astro`: grupos e ligações oficiais.
- `src/components/Header.astro`, `Footer.astro`, `StudyTools.astro`: elementos comuns.
- `src/scripts/`: pesquisa, notas, atalhos, IA e preferências.
- `src/styles/global.css`: grelha, temas e aparência.
- `src/styles/tools.css`: ferramentas, grupos e leitura.

Os dados curriculares vêm do [plano oficial de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_origem=CUR&pv_plano_id=31224&pv_tipo_cur_sigla=), consultado a 9 de setembro de 2026. CT I, II e III são grupos de opções. Projeto UP substitui o nome antigo Projeto FEUP.

## Publicar

O projeto Cloudflare Pages `resumos-feup` está ligado a este repositório. Pushes para `main` publicam em `https://resumos-feup.pages.dev`; outros branches têm previews.

A configuração usa `bash scripts/cloudflare-build.sh`, pasta de saída `dist`, Node 24 e imagem de build v3. O script descarrega Typst 0.15.1, confirma o SHA-256 do arquivo oficial, instala as dependências do lockfile, verifica tipos e compila o site com a pesquisa. Não é preciso um token Cloudflare no GitHub.

O workflow GitHub Actions verifica formatação, tipos, testes de navegador e build. Cloudflare compila de forma independente, por isso os checks de GitHub não bloqueiam automaticamente a publicação.

## Créditos

Fontes Manrope e Source Serif 4 alojadas localmente, ícones Lucide. [Fontes dos logótipos](public/logos/README.md). A ilustração dos pontos foi criada para este projeto.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/), com código novo. O site é independente da FEUP e da U.Porto. `data/` e `_data/` são referências locais, ignoradas pelo Git, TypeScript e formatação.
