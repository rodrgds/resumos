# Contribuir

Tens apontamentos de uma cadeira? Abre um pull request em [rodrgds/resumos](https://github.com/rodrgds/resumos). Para sugerir uma alteração ou avisar de um erro, [abre uma issue](https://github.com/rodrgds/resumos/issues/new).

## Começar

1. Faz um fork e clona o repositório.
2. Entra em `devenv shell` e corre `npm ci`.
3. Corre `npm run build` e `npm run dev`.
4. Abre `http://localhost:4321/exemplo/` para ver os exemplos.

O índice de pesquisa é gerado no build. Volta a correr `npm run build` quando quiseres pesquisar conteúdo novo durante o desenvolvimento.

## Escolher um formato

- **Markdown** para texto, imagens, tabelas, código e fórmulas LaTeX. Copia `src/pages/exemplo/apontamentos.md`.
- **MDX** para juntar esse texto a componentes. Copia `src/pages/exemplo/diagramas.mdx`.
- **Typst** para escrever o conteúdo inteiro ou só gráficos e diagramas. Guarda os ficheiros em `src/content/<cadeira>/` e importa-os com `?raw` no componente `Typst`.
- **DOT** para grafos. Importa o ficheiro com `?raw` e passa-o ao componente `Dot`.

Usa `Lesson.astro` como layout das páginas de conteúdo. Inclui `title`, `description` e `source` no frontmatter. O campo `source` é o caminho do ficheiro no repositório.

```mdx
import Typst from '../../components/Typst.astro';
import grafico from '../../content/minha-cadeira/grafico.typ?raw';

<Typst source={grafico} format="svg" alt="O que o gráfico representa." />
```

O número de `../` depende da pasta da tua página. `Typst` sem `format` produz HTML selecionável. `format="svg"` usa a paginação do Typst e exige uma descrição `alt`. A exportação HTML ainda é experimental, por isso revê o resultado, sobretudo as equações.

As páginas de exemplo usam CeTZ 0.5.2, CeTZ-Plot 0.1.4 e Fletcher 0.5.8. Fixa sempre a versão nos imports Typst. O primeiro build descarrega esses pacotes do Typst Universe.

## Antes de enviar

- Escreve em português simples, com as tuas palavras. Indica as fontes.
- Só inclui imagens e materiais que tenhas direito a partilhar. Dá crédito ao autor.
- Adiciona descrições às imagens e aos diagramas.
- Verifica as equações e abre a página num ecrã pequeno e nos dois temas.
- Liga a cadeira ao conteúdo apenas quando a página estiver pronta. Os cartões atuais dizem claramente que ainda não há resumos.
- Corre `npm run format`, `npm run check`, `npm test` e `npm run build`.

O pull request deve dizer o que acrescentaste ou corrigiste. Uma alteração pequena e completa é suficiente.
