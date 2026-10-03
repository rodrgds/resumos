# Formatos e processamento de conteúdo

[Documentação](README.md)

Para escrever uma página, segue [CONTRIBUTING.md](../CONTRIBUTING.md). Este guia identifica os componentes que processam o conteúdo.

- `src/content/lessons/exemplo/apontamentos.md`: texto, fórmulas, imagem local, tabela e código.
- `src/content/lessons/exemplo/diagramas.mdx`: Typst, CeTZ-Plot, Fletcher, DOT, Mermaid e vídeo do YouTube.
- `src/content/lessons/exemplo/formatacao.mdx`: avisos, soluções recolhíveis, separadores e filtros de imagem.
- `src/content.config.ts` e `src/lib/course-content.ts`: coleção, secções, ordem, rascunhos e navegação automática.
- `src/content/exemplo/`: os ficheiros `.typ`, `.dot` e `.mmd` usados nos exemplos.
- `src/layouts/Lesson.astro`: layout de leitura, ações da página e ligação ao código.
- `src/components/Prose.astro`: estilos de conteúdo e KaTeX.

`Typst.astro` chama o compilador oficial no build, através de `src/lib/typst.ts`. O modo HTML mantém texto selecionável e MathML. SVG exige descrição alternativa e serve para gráficos e desenhos. A exportação HTML do Typst é experimental. Confirma sempre o resultado. Uma falha de compilação interrompe o build.

Os imports internos do Typst partem da raiz do projeto, por exemplo `/src/content/exemplo/nota.typ`. Os pacotes externos têm versões fixas e são descarregados no primeiro build. Só conteúdo revisto do repositório chega aos compiladores. Não são endpoints para conteúdo enviado por visitantes.

`Dot.astro` usa Graphviz através de `@viz-js/viz`, só no build. Não precisa de uma instalação de `dot` nem envia WebAssembly para o navegador. `YouTube.astro` mostra uma miniatura alojada pelo YouTube e só cria o iframe após um clique.

`Mermaid.astro` usa o renderer oficial `@mermaid-js/mermaid-cli` no build. Mermaid e Chrome headless são dependências de construção; o leitor recebe apenas SVG. Os comandos `npm run dev`, `npm run build` e `npm test` instalam no cache o Chrome headless exigido pelo lockfile, se ainda faltar. Não é preciso instalar um navegador no sistema. O exemplo publicado mostra uma sequência; fluxos, estados, classes, entidades e outros formatos usam a sintaxe oficial.

`src/lib/mermaid.ts` compila fontes revistas em ficheiros temporários, que elimina no fim. Uma falha interrompe o build. O cache em memória evita recompilar a mesma fonte durante a construção. SVGO incorpora os estilos e torna únicos os ids de nós e setas; `themeDiagram` adapta a paleta aos tokens de leitura. Os rótulos são texto SVG, sem HTML ou fontes externas. SVGs largos conservam o tamanho do texto e podem ser deslocados por teclado ou toque. A impressão ajusta-os à página. A exportação Markdown inclui o SVG e a descrição, como nos diagramas DOT.

Os testes em `tests/fixtures/` usam `RESUMOS_TEST_CONTENT=1`. Essa variável nunca deve estar definida em produção.

Markdown e MDX partilham KaTeX, notas de rodapé e caixas. `src/lib/remark-containers.mjs` transforma as diretivas em HTML; `markdown.shikiConfig` partilha a sintaxe e os marcadores de espaços. A navegação vem da coleção publicada, não de rotas escritas à mão.

## Notas do autor

Para uma explicação curta escrita pelo autor, usa `Bracket.astro` em MDX. A [página de formatação](../src/content/lessons/exemplo/formatacao.mdx) contém um exemplo. O conteúdo mantém-se legível sem JavaScript. O desenho não altera os links, as fórmulas ou o texto usado para localizar notas.
