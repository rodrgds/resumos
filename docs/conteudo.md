# Formatos e processamento de conteúdo

[Documentação](README.md)

Lê [CONTRIBUTING.md](../CONTRIBUTING.md) para escrever uma página. Markdown e MDX usam o mesmo processador de LaTeX: `$...$` no texto e `$$...$$` em bloco, renderizados com KaTeX.

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

O menu de conteúdos abre sobre a página e segue as secções do frontmatter, como nos [Resumos LEIC](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/src/components/Sidebar.js). O primeiro resumo publicado ativa o cartão da cadeira. Markdown e MDX suportam notas de rodapé e containers através de `remark-directive`; `src/lib/remark-containers.mjs` transforma-os em HTML sem JavaScript.

## Notas do autor

Para uma explicação curta escrita pelo autor, usa `Bracket.astro` em MDX. A [página de formatação](../src/content/lessons/exemplo/formatacao.mdx) contém um exemplo. O conteúdo mantém-se legível sem JavaScript. O desenho não altera os links, as fórmulas ou o texto usado para localizar notas.
