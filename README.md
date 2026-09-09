# Resumos LEIC · FEUP

Apontamentos de LEIC da FEUP, feitos em Astro. [Abrir o site](https://resumos.rgo.pt).

A página inicial reúne as cadeiras de 2026/27 por ano e semestre. Ainda não há resumos das cadeiras reais. A [cadeira fictícia de exemplo](https://resumos.rgo.pt/exemplo/) mostra os formatos de conteúdo. A página de Núcleos liga ao NIAEFEUP, JuniFEUP, ACM FEUP, IEEE FEUP e NCGM.

Os links úteis incluem o TTS, a app Uni para Android e os Resumos SofiaViP.

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

- `src/content/lessons/exemplo/apontamentos.md`: texto, fórmulas, imagem local, tabela e código.
- `src/content/lessons/exemplo/diagramas.mdx`: Typst, CeTZ-Plot, Fletcher, DOT e vídeo do YouTube.
- `src/content/lessons/exemplo/formatacao.mdx`: avisos, soluções recolhíveis, separadores e filtros de imagem.
- `src/content.config.ts` e `src/lib/course-content.ts`: coleção, secções, ordem, rascunhos e navegação automática.
- `src/content/exemplo/`: os ficheiros `.typ` e `.dot` usados nos exemplos.
- `src/layouts/Lesson.astro`: layout de leitura, ações da página e ligação ao código.
- `src/components/Prose.astro`: estilos de conteúdo e KaTeX.

`Typst.astro` chama o compilador oficial no build, através de `src/lib/typst.ts`. O modo HTML mantém texto selecionável e MathML. SVG exige descrição alternativa e serve para gráficos e desenhos. A exportação HTML do Typst é experimental. Confirma sempre o resultado. Uma falha de compilação interrompe o build.

Os imports internos do Typst partem da raiz do projeto, por exemplo `/src/content/exemplo/nota.typ`. Os pacotes externos têm versões fixas e são descarregados no primeiro build. Só conteúdo revisto do repositório chega aos compiladores. Não são endpoints para conteúdo enviado por visitantes.

`Dot.astro` usa Graphviz através de `@viz-js/viz`, só no build. Não precisa de uma instalação de `dot` nem envia WebAssembly para o navegador. `YouTube.astro` mostra uma miniatura alojada pelo YouTube e só cria o iframe após um clique.

Os testes em `tests/fixtures/` usam `RESUMOS_TEST_CONTENT=1`. Essa variável nunca deve estar definida em produção.

A sidebar segue as secções do frontmatter, como nos [Resumos LEIC](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/src/components/Sidebar.js). O primeiro resumo publicado ativa o cartão da cadeira. Markdown e MDX suportam notas de rodapé e containers através de `remark-directive`; `src/lib/remark-containers.mjs` transforma-os em HTML sem JavaScript.

## Pesquisa e ferramentas

A pesquisa global usa Pagefind e funciona sem servidor de pesquisa. O build indexa o conteúdo de `data-pagefind-body`; ferramentas e notas locais ficam excluídas. Em desenvolvimento, a integração serve o último índice construído. Corre `npm run build` para o atualizar.

Seleciona texto numa página de apontamentos e escolhe **Destacar** ou **Comentar**. Tab chega às ações da seleção e Escape fecha-as. Clica num destaque para editar o comentário. O caderno reúne as notas desta página ou de todo o site, permite voltar ao trecho, desfazer uma remoção e descarregar tudo em Markdown. As notas do bloco antigo continuam em “Notas anteriores”.

As preferências, os atalhos e o caderno ficam em `localStorage`. Não sincronizam entre dispositivos ou domínios. O caderno avisa quando não consegue guardar e permite descarregar o texto antes de sair. Limpar os dados do navegador apaga as notas.

Os destaques usam a [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API), sem alterar o HTML do resumo. Em navegadores antigos, as notas continuam acessíveis no caderno. `src/lib/text-anchors.ts` guarda o trecho e o contexto: quando o conteúdo muda ou se torna ambíguo, a nota fica no caderno com um aviso. Fórmulas e imagens não entram na seleção de texto. `src/lib/annotations.ts` guarda uma entrada por nota para evitar que separadores diferentes sobrescrevam o caderno inteiro.

Por predefinição, `/` pesquisa, `n` abre as notas, `,` abre a aparência, `?` abre os atalhos e `a` abre o menu de IA nas páginas que o têm. Ctrl ou ⌘ K também pesquisa. Os atalhos não atuam em campos de texto. Podes mudar ou desativar as teclas e ativar navegação com `h`, `j`, `k`, `l`.

O menu de IA está nas páginas de apontamentos. Segue os [links do Fumadocs](https://github.com/fuma-nama/fumadocs/blob/824a02860da9701584d12462069963d172c3588f/packages/base-ui/src/layouts/shared/page-actions.tsx) para ChatGPT e Claude: envia o URL público e uma instrução para ler a página. ChatGPT recebe também `hints=search`, como no Fumadocs. O popover acompanha o botão através de Floating UI e ajusta-se às margens do ecrã. Perplexity recebe a mesma pergunta. Gemini usa copiar e abrir. Estes links são convenções das interfaces dos fornecedores, não uma API estável. Há uma pergunta visível para copiar se necessário. Em localhost usa-se o endereço público configurado em `astro.config.mjs`. O conteúdo da página e as notas privadas nunca são copiados ou enviados. Não há chaves de API.

## Organização

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

Oito fontes de leitura alojadas localmente: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata e IBM Plex Mono. O navegador descarrega a fonte escolhida. Ícones Lucide. [Fontes dos logótipos](public/logos/README.md). A ilustração dos pontos foi criada para este projeto.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/), com código novo. O site é independente da FEUP e da U.Porto. `data/` e `_data/` são referências locais, ignoradas pelo Git, TypeScript e formatação.
