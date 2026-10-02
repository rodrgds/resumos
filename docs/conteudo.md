# Formatos e processamento de conteúdo

[Documentação](README.md)

Para escrever uma página, segue [CONTRIBUTING.md](../CONTRIBUTING.md). Este guia identifica os componentes que processam o conteúdo.

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

Markdown e MDX partilham KaTeX, notas de rodapé e caixas. `src/lib/remark-containers.mjs` transforma as diretivas em HTML; `markdown.shikiConfig` partilha a sintaxe e os marcadores de espaços. A navegação vem da coleção publicada, não de rotas escritas à mão.

## Notas do autor

Para uma explicação curta escrita pelo autor, usa `Bracket.astro` em MDX. A [página de formatação](../src/content/lessons/exemplo/formatacao.mdx) contém um exemplo. O conteúdo mantém-se legível sem JavaScript. O desenho não altera os links, as fórmulas ou o texto usado para localizar notas.
