# Resumos LEIC · FEUP

Apontamentos das cadeiras de LEIC e MEIC da FEUP, feitos por estudantes para partilhar o que aprendem.

[Abrir o site](https://resumos.rgo.pt)

## Como contribuir?

Podes corrigir um erro, acrescentar um exercício resolvido ou escrever apontamentos. O [guia de contribuição](CONTRIBUTING.md) explica como criar uma página e enviar um pull request. A [cadeira de exemplo](https://resumos.rgo.pt/exemplo/) mostra os formatos disponíveis.

Escreve com as tuas palavras e indica as fontes. Partilha apenas materiais que tenhas direito a publicar.

## Correr localmente

Faz um fork e clona o repositório. Na pasta do projeto:

```sh
devenv shell
npm ci
npm run build
npm run dev
```

Abre `http://localhost:4321`. O projeto usa Astro; o build inicial prepara a pesquisa. O [guia de desenvolvimento](docs/desenvolvimento.md) explica as dependências e os checks.

Os apontamentos ficam em `src/content/lessons/<cadeira>/`, em Markdown ou MDX. Segue o [formato de uma página](CONTRIBUTING.md#criar-um-resumo). Antes de enviar, corre `npm run format` e os [checks de contribuição](CONTRIBUTING.md#antes-de-enviar).

## Documentação

Consulta o [índice da documentação](docs/README.md) para os formatos de conteúdo, ferramentas de leitura, exemplos executáveis, vozes e publicação.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/). Projeto independente da FEUP e da U.Porto.
