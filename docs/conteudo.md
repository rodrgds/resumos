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

`Mermaid.astro` mantém a API `source`, `alt` e `id` opcional, mas usa [Pele](https://pele.run/) 1.6.0 no build. Não precisa de Mermaid CLI ou Chrome. Os componentes existentes passam automaticamente para Pele; os blocos de código Mermaid continuam a mostrar código.

`src/lib/mermaid.ts` guarda a compilação em memória e prefixa todos os IDs por fonte e ocorrência, sem UUIDs aleatórios. Pele produz texto SVG, sem HTML. Desativamos links, imagens externas e callbacks; não fornecemos ícones ou opções vindas do autor. Os limites do renderer e os erros de sintaxe interrompem o build. Só fontes revistas do repositório chegam a este caminho; os apontamentos pessoais conservam o seu pipeline sanitizado e não compilam diagramas.

As variáveis Pele ficam dentro do SVG e apontam para os tokens de leitura. Alterar a paleta não recompila a figura. Preservamos a direção escrita. A figura pode encolher até o menor tamanho de letra emitido atingir 12 px, sem ultrapassar o tamanho natural. Assim, diagramas pequenos cabem sem deslocação; os que ainda precisam de espaço conservam a deslocação horizontal por teclado ou toque. O build calcula esse limite a partir dos tamanhos de letra do SVG, sem compilador no leitor. A impressão ajusta-os à página. A exportação Markdown inclui descrição e SVG autónomo com valores claros de reserva.

Pele tem layout próprio, não reproduz exatamente o Mermaid. Revê relações, rótulos longos e limites na página. Aceita fluxos, sequências, estados, classes e entidades, entre outros formatos, mas não traduz DOT, Typst ou Python. Mantemos Graphviz para grafos com atributos específicos, Typst/CeTZ para matemática e gráficos científicos, SVG para demos interativas e Manim para movimento. Migrar uma figura de uma cadeira exige rever o seu significado e layout, não apenas mudar o componente. Consulta [API](https://pele.run/api), [compatibilidade](https://pele.run/compatibility), [cores](https://pele.run/theming) e [segurança](https://pele.run/security).

Os testes em `tests/fixtures/` usam `RESUMOS_TEST_CONTENT=1`. Essa variável nunca deve estar definida em produção.

Markdown e MDX partilham KaTeX, notas de rodapé e caixas. `src/lib/remark-containers.mjs` transforma as diretivas em HTML; `markdown.shikiConfig` partilha a sintaxe e os marcadores de espaços. A navegação vem da coleção publicada, não de rotas escritas à mão.

## Notas do autor

Para uma explicação curta escrita pelo autor, usa `Bracket.astro` em MDX. A [página de formatação](../src/content/lessons/exemplo/formatacao.mdx) contém um exemplo. O conteúdo mantém-se legível sem JavaScript. O desenho não altera os links, as fórmulas ou o texto usado para localizar notas.
