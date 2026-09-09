# Contribuir

Tens apontamentos de uma cadeira? Abre um pull request em [rodrgds/resumos](https://github.com/rodrgds/resumos). Para sugerir uma alteração ou avisar de um erro, [abre uma issue](https://github.com/rodrgds/resumos/issues/new).

## Começar

1. Faz um fork e clona o repositório.
2. Entra em `devenv shell` e corre `npm ci`.
3. Corre `npm run build` e `npm run dev`.
4. Abre `http://localhost:4321/exemplo/` para ver os exemplos.

O índice de pesquisa é gerado no build. Volta a correr `npm run build` quando quiseres pesquisar conteúdo novo durante o desenvolvimento.

## Criar um resumo

Cria `src/content/lessons/<cadeira>/<pagina>.md` ou `.mdx`. O nome da pasta da cadeira é o seu `id` em `src/data/courses.ts` (LEIC) ou `src/data/meic.ts` (MEIC). Usa nomes curtos, em minúsculas e separados por hífen, como `fp/primeiros-passos.md`.

```yaml
---
title: Primeiros passos
description: Variáveis, expressões e o primeiro programa.
section: conteudo
order: 1
draft: true
---
```

`title` e `description` são obrigatórios. `section` pode ser `conteudo`, `laboratorios`, `exercicios`, `guias` ou `recursos`. Dentro de cada secção, `order` define a ordem; títulos desempatam. Os valores por defeito são `conteudo`, `0` e `draft: false`.

Mantém `draft: true` enquanto escreves. O rascunho não tem página pública, não aparece na pesquisa e não ativa o cartão da cadeira. Para o rever no navegador, muda temporariamente para `false` no teu checkout. Só publica essa mudança quando o conteúdo estiver pronto.

O primeiro resumo publicado liga automaticamente o cartão da cadeira a `/cadeiras/<cadeira>/`. A sidebar, o índice da página e os links anterior/seguinte são gerados pelo conteúdo. Não precisas de editar rotas ou layouts. Um `index.md` opcional escreve a apresentação da cadeira. A pasta `exemplo` é reservada à cadeira fictícia, em `/exemplo/`.

## Escolher um formato

- **Markdown** para texto, imagens, tabelas, código e fórmulas LaTeX. Vê `src/content/lessons/exemplo/apontamentos.md`.
- **MDX** para juntar esse texto a componentes. Vê `diagramas.mdx` e `formatacao.mdx` na mesma pasta.
- **Typst** para escrever o conteúdo inteiro ou só gráficos e diagramas. Guarda os ficheiros em `src/content/<cadeira>/` e importa-os com `?raw` numa página MDX.
- **DOT** para grafos. Importa o ficheiro com `?raw` e passa-o ao componente `Dot`.

Markdown e MDX partilham `$...$` e `$$...$$`, renderizados com KaTeX. Não incluas `layout` nem `source` no frontmatter: o site trata deles.

### Notas de rodapé e caixas

```md
Uma observação com uma fonte.[^fonte]

[^fonte]: Autor, título e ligação à fonte.

:::tip[Uma ideia útil]
Texto com **negrito**, ligações e $fórmulas$.
:::

:::details[Ver a resolução]
A solução fica aqui. Experimenta primeiro sem a abrir.
:::
```

As caixas aceitam `note`, `info`, `tip`, `warning`, `danger` e `details`. O título entre parênteses retos é opcional. Dentro da caixa podes usar Markdown normal. Um nome desconhecido interrompe o build para detetar erros de escrita.

### Imagens

Guarda imagens públicas em `public/` e usa texto alternativo que explique o que mostram. Fotografias e logótipos mantêm as cores por defeito. Para adaptar um esquema ao modo escuro, escolhe `dim` (menos brilho) ou `invert` (inverter cores) e verifica o resultado.

```md
![Descrição da imagem.](/examples/pontos.svg)

::image{src="/examples/pontos.svg" alt="Quatro filas de pontos." dark="dim"}
```

Em MDX, `Figure` acrescenta legenda e um link para abrir a imagem original:

```mdx
import Figure from '../../../components/Figure.astro';

<Figure
  src="/examples/pontos.svg"
  alt="Quatro filas de pontos."
  caption="Legenda e crédito."
  dark="dim"
/>
```

### Separadores

Usa um `id` único por página. Os painéis têm nomes `panel-0`, `panel-1`, etc. Os separadores suportam setas, Home e End; sem JavaScript, o conteúdo de todos os painéis continua visível.

```mdx
import Tabs from '../../../components/Tabs.astro';

<Tabs id="linguagens" labels={['Python', 'C++']}>
  <div slot="panel-0">Exemplo em Python.</div>
  <div slot="panel-1">Exemplo em C++.</div>
</Tabs>
```

### Typst, grafos e vídeo

```mdx
import Typst from '../../../components/Typst.astro';
import Dot from '../../../components/Dot.astro';
import YouTube from '../../../components/YouTube.astro';
import grafico from '../../exemplo/crescimento.typ?raw';
import grafo from '../../exemplo/arvore.dot?raw';

<Typst source={grafico} format="svg" alt="O que o gráfico representa." />
<Dot source={grafo} alt="O que o grafo representa." />
<YouTube id="fNk_zzaMoSs" title="Uma explicação em vídeo" />
```

Os caminhos relativos acima partem de `src/content/lessons/<cadeira>/`. Ajusta-os se criares subpastas. Copia os nomes reais dos ficheiros em `src/content/exemplo/`.

`Typst` sem `format` produz HTML selecionável. `format="svg"` usa a paginação do Typst e exige uma descrição `alt`. A exportação HTML ainda é experimental, por isso revê o resultado, sobretudo as equações.

As páginas de exemplo usam CeTZ 0.5.2, CeTZ-Plot 0.1.4 e Fletcher 0.5.8. Fixa sempre a versão nos imports Typst. O primeiro build descarrega esses pacotes do Typst Universe. Typst e DOT compilam no build, não no navegador do leitor.

O vídeo mostra uma miniatura do YouTube. O leitor só carrega o player quando clica.

## Antes de enviar

- Escreve em português simples, com as tuas palavras. Indica as fontes.
- Só inclui imagens e materiais que tenhas direito a partilhar. Dá crédito ao autor.
- Adiciona descrições às imagens e aos diagramas.
- Verifica as equações, os links, a sidebar e a página num ecrã pequeno e nos dois temas.
- Corre `npm run format`, `npm run check`, `npm test` e `npm run build`.

O pull request deve dizer o que acrescentaste ou corrigiste. Uma alteração pequena e completa é suficiente.

## Código que o leitor pode executar

Em MDX, usa `CodePlayground` para os exemplos das linguagens abaixo:

```mdx
import CodePlayground from '../../../components/CodePlayground.astro';

<CodePlayground
  language="cpp"
  input="5"
  code={
    '#include <iostream>\nint main() { int n; std::cin >> n; std::cout << n * n; }'
  }
/>
```

`language` aceita `python`, `c`, `cpp`, `java`, `javascript`, `sql`, `haskell`, `prolog` ou `php`. `code` é o programa completo; `input` fornece a entrada padrão, ou o corpo HTTP acessível por `php://input` em PHP e `title` muda o título do bloco. Java precisa da classe `Main`, sem declaração de pacote. Haskell precisa de `main` e não suporta entrada interativa; GHC requer WebAssembly JSPI, disponível nas versões recentes de Chrome e Edge. Prolog executa o predicado `main/0` com SWI-Prolog, não SICStus. Os exemplos usam Python 3.11, C17, C++17, Java 8, QuickJS, SQLite, GHC 9.14 e PHP 8.4. Não dependas de pacotes externos, rede ou ficheiros do computador do leitor. Cada execução começa de novo. Os motores só são descarregados ao executar.

Para HTML, CSS e JavaScript com DOM, usa `WebPlayground`. A pré-visualização não tem acesso às notas nem à rede:

```mdx
import WebPlayground from '../../../components/WebPlayground.astro';

<WebPlayground html={'<h1>Olá!</h1>'} css={'h1 { color: teal; }'} js={''} />
```

Consulta [os exemplos](https://resumos.rgo.pt/exemplo/codigo/). Testa o resultado com entradas conhecidas antes de publicar. Para testar os motores isolados localmente, executa `npm run build:runners` e serve o resultado noutra origem: `python3 -m http.server 4324 --bind 127.0.0.1 --directory runners/dist`. Essa porta é exclusiva do motor e não deve servir o site.

Para Dart/Flutter e RISC-V, usa `<ToolEmbed tool="dartpad" />` ou `<ToolEmbed tool="ripes" />`, importando `components/ToolEmbed.astro`. DartPad também aceita `gist="ID"` para carregar um exemplo público. Estes serviços só carregam depois de o leitor escolher abrir o editor. O DartPad usa compilação externa. Consulta [linguagens e limites](docs/linguagens.md) antes de preparar conteúdo para uma cadeira.

## Leitura e versões Markdown

A largura da página e a largura do texto são independentes. Os temas mudam as cores de leitura; os cartões das cadeiras mantêm as suas cores. Nos diagramas Typst e DOT, preto, branco e as cores base do projeto acompanham o tema. Outras cores escolhidas pelo autor são preservadas. Não uses apenas a cor para distinguir dados.

O build gera uma versão `.md` de cada página pública e um índice `/llms.txt`. Usa o endereço sem a barra final, por exemplo `/exemplo/diagramas.md`. O Markdown vem do HTML publicado, incluindo fórmulas, código e links para SVG com descrição. Não inclui rascunhos nem notas locais. Não edites esses ficheiros gerados.
