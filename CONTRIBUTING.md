# Contribuir

Corrige um erro, acrescenta um exercício ou escreve apontamentos num pull request em [rodrgds/resumos](https://github.com/rodrgds/resumos). Para sugerir alterações, [abre uma issue](https://github.com/rodrgds/resumos/issues/new).

## Começar

Faz um fork, clona o repositório e segue o [ambiente de desenvolvimento](docs/desenvolvimento.md#correr-e-verificar). A [cadeira fictícia](https://resumos.rgo.pt/exemplo/) mostra os formatos disponíveis; as suas fontes estão em `src/content/lessons/exemplo/`.

## Criar um resumo

Cria `src/content/lessons/<cadeira>/<pagina>.md` ou `.mdx`. Usa o `id` da cadeira em `src/data/courses.ts` ou `src/data/meic.ts` e nomes como `fp/primeiros-passos.md`.

```yaml
---
title: Primeiros passos
description: Variáveis, expressões e o primeiro programa.
section: conteudo
order: 1
draft: true
---
```

`title` e `description` são obrigatórios. `section` aceita `conteudo`, `laboratorios`, `exercicios`, `guias` ou `recursos`. `order` ordena as páginas; títulos desempatam. Os valores por defeito são `conteudo`, `0` e `draft: false`.

Mantém `draft: true` até o conteúdo estar pronto. Para o rever no navegador, muda-o temporariamente para `false` no teu checkout. Rascunhos não geram páginas nem pesquisa. O primeiro resumo publicado ativa o cartão da cadeira; menus e links anterior/seguinte são automáticos. Um `index.md` opcional apresenta a cadeira. A pasta `exemplo` fica separada, em `/exemplo/`.

Escreve em português simples, com palavras próprias. Explica os passos e as condições de aplicação. Usa os materiais da cadeira como base, verificando o ano académico, e reúne a bibliografia na apresentação, não no corpo de cada lição. Publica apenas materiais que possas reproduzir. O [guia de escrita](.agents/skills/resumos-writing/SKILL.md) desenvolve estes critérios.

Liga entre páginas por rotas absolutas, como `/cadeiras/fp/funcoes/`. Confirma os fragmentos nos títulos da página construída.

## Versões TLDR

Guarda a síntese em `src/content/tldr/<cadeira>/<pagina>.md` ou `.mdx`, com o mesmo caminho relativo da lição. Não acrescentes frontmatter: o título e a descrição vêm da lição. Usa os mesmos componentes, fórmulas e figuras do restante conteúdo; os imports de componentes continuam em `../../../components/`.

O build rejeita sínteses sem uma lição correspondente e sínteses de apresentações, revisões, exercícios, guias, recursos ou páginas da cadeira fictícia. Só aceita lições com `studyKind: lesson` e `section: conteudo` ou `laboratorios`. Uma síntese de uma lição com `draft: true` permanece privada.

Escreve uma explicação muito mais curta, com as condições essenciais e os visuais necessários à compreensão. Não copies a lição inteira nem substituas o texto por um inventário de títulos. Os links para aprofundar devem apontar para o URL completo e o fragmento exato. O TLDR tem a sua própria navegação por títulos, em `/cadeiras/<cadeira>/<pagina>/tldr/`.

## Cheat sheets e âmbito

Uma folha de consulta reúne fórmulas, condições, procedimentos e erros frequentes, com links para as explicações. Usa `studyKind: revision` e `section: recursos`. Aparece como Cheat sheet, fora da sequência de leitura.

O frontmatter `editorial` é opcional. `basedOn` identifica o ano usado; `sources` recebe títulos e URLs; `coverage` e `gaps` descrevem o âmbito e as lacunas da página. Uma revisão pode acrescentar `review` com `edition`, `reviewer` e `date` em `AAAA-MM-DD`, só depois de conferir as fontes. A data de um commit não é uma revisão. Estes metadados não geram blocos na leitura e não são herdados por outras páginas.

Downloads e notas de revisão ficam no arquivo local ignorado `_data/`. Mantém os créditos das adaptações em `editorial.sources`. Não publiques inventários de recolha nem testes que repitam o texto dos apontamentos.

## Exercícios ligados ao tema

Cria um MDX com `section: exercicios` e componentes `Exercise`. Na lição correspondente, associa o conjunto:

```yaml
practices:
  - exemplo/praticar-somas
```

As questões aparecem recolhidas no fim da lição. Cada conjunto precisa de uma lição publicada da mesma cadeira; referências inválidas interrompem o build. Escolhe questões que peçam decisões diferentes.

```mdx
import Exercise from '../../../components/Exercise.astro';

<Exercise
  id="soma-20"
  title="Calcular uma soma"
  explanation="/exemplo/apontamentos/#uma-ideia-de-cada-vez"
  answer={{ kind: 'number', value: 210, tolerance: 0 }}
>
  <p>Quanto vale a soma de 1 até 20, incluindo os extremos?</p>
  <div slot="hint">Usa a fórmula da soma.</div>
  <div slot="hint-more">Calcula 20 × 21 / 2.</div>
  <div slot="solution">O resultado é 210.</div>
  <div slot="mistakes">Não esqueças a divisão por 2.</div>
</Exercise>
```

Cada questão precisa de um `id` único na cadeira, uma ligação à explicação exata e do slot `solution`. `hint`, `hint-more` e `mistakes` são opcionais. Omite ajuda que não acrescenta um passo ou uma distinção útil; slots vazios, só com espaços, comentários ou elementos sem conteúdo não geram controlos nem títulos. Uma pista apenas gráfica continua disponível. Se só existir `hint-more`, aparece como a única pista. Aumenta `revision` quando mudares o enunciado, a resposta ou o seu significado. Alterar apenas a disposição da UI não muda a revisão.

Em MDX, o Markdown cria os parágrafos dentro de componentes. Para texto em várias linhas, usa Markdown ou um `div`, não um `p` a envolver outro parágrafo. Um `p` com texto todo na mesma linha, como nos exemplos acima, continua válido.

Marca funções, chamadas e valores de código com crases em Markdown e com `<code>` no texto JSX. As strings `options[].text`, `options[].explanation` e `checklist[]` aceitam Markdown inline, incluindo código e fórmulas. O build gera a formatação; o navegador reutiliza esse HTML também no feedback. Usa slots para parágrafos ou blocos.

As diretivas documentadas usam blocos. Os dois pontos dentro do texto, como em `HH:MM`, `imm[11:5]` ou `ns:livro`, conservam-se como texto literal em Markdown e MDX.

| Tipo     | Quando usar                                           | Campos                                                    |
| -------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `number` | Valor verificável; indica unidades e arredondamento   | `value`, tolerância absoluta `tolerance`, `unit` opcional |
| `choice` | Uma opção correta, com explicação de cada alternativa | `options` com `text`, `correct` e `explanation`           |
| `self`   | Prova ou raciocínio que exige justificação            | `checklist` com critérios observáveis                     |
| `code`   | Programa verificável por comportamento                | `language`, `starter`, `tests`                            |

O problema e a resposta aparecem antes da ajuda. Verificar é a ação principal; na autoavaliação, Comparar abre e foca a solução. As pistas e a solução usam expansíveis nativos, acessíveis por teclado e sem JavaScript. A ligação à explicação fica dentro da solução. Limpar só aparece quando há uma resposta; no editor, Repor código só aparece após uma edição e Parar substitui Verificar durante a execução.

Na autoavaliação, o leitor compara com a solução e indica se está certo ou precisa de corrigir. Não é uma classificação automática. O navegador guarda apenas resultados e ajuda consultada, nunca respostas ou código. Abrir uma pista depois da resposta não muda a ajuda atribuída àquela resposta. Enunciados, pistas e soluções continuam legíveis sem JavaScript.

### Respostas de programação

`code` aceita Python e JavaScript. Os casos são públicos, executados separadamente em motores descartáveis. Define entradas normais e casos limite, incluindo a entrada vazia quando fizer sentido. Verifica uma implementação alternativa e uma errada, sem comparar o texto do código.

```mdx
<Exercise
  id="somar-lista"
  title="Somar uma lista"
  explanation="/exemplo/apontamentos/#limites-de-um-ciclo"
  answer={{
    kind: 'code',
    language: 'python',
    starter: 'def soma(valores):\n    pass',
    tests: [
      { name: 'Três valores', code: 'print(soma([1, 2, 3]))', output: '6' },
      { name: 'Lista vazia', code: 'print(soma([]))', output: '0' },
      { name: 'Com negativos', code: 'print(soma([-4, 0, 7]))', output: '3' },
    ],
  }}
>
  <p>
    Define <code>soma(valores)</code>: devolve a soma sem imprimir. A soma vazia
    é zero.
  </p>
  <div slot="hint">Começa com um total igual a zero.</div>
  <div slot="hint-more">Acumula os valores antes de devolver o total.</div>
  <div slot="solution">
    Usa <code>return sum(valores)</code> ou um ciclo acumulador.
  </div>
  <div slot="mistakes">
    Não devolvas dentro do ciclo nem uses <code>print</code>.
  </div>
</Exercise>
```

Cada teste tem `name` e `output`; `input` e `code` são opcionais. `code` executa depois da resposta. Compara-se toda a saída padrão e exige-se código de saída zero. Só se normalizam CRLF e quebras de linha finais. Prefere imprimir o valor devolvido a imprimir uma comparação que só dá `True` ou `False`. Para strings e estruturas Python, `repr` distingue os tipos. O leitor vê o teste executado, a entrada fornecida e a saída esperada; se falhar, vê também a saída obtida e o erro. Se o motor falhar, o erro aparece sem substituir o resultado guardado. Os casos ajudam a aprender, não provam correção nem impedem fraude.

## Escolher um formato

- Markdown para texto, tabelas, imagens, código e LaTeX. MDX acrescenta componentes.
- `$...$` e `$$...$$` usam KaTeX nos dois formatos. O site define o layout; não acrescentes `layout` ou `source` ao frontmatter.
- Typst produz texto selecionável ou SVG; DOT produz grafos SVG. Consulta [o processamento de conteúdo](docs/conteudo.md) para compilação e imports.
- Mermaid serve para fluxos, sequências, estados, classes e relações entre entidades. Prefere-o quando a ordem das mensagens ou as transições são o assunto. Usa DOT para árvores, grafos e layouts que precisem de controlo próprio.

Guarda Mermaid num ficheiro `.mmd` e incorpora-o em MDX:

```mdx
import Mermaid from '../../../components/Mermaid.astro';
import pedido from '../../minha-cadeira/pedido.mmd?raw';

<Mermaid
  source={pedido}
  alt="O cliente pede uma página e o servidor responde."
/>
```

O diagrama é SVG estático gerado no build, com as cores de leitura. Usa mensagens curtas e descrição alternativa. Nos diagramas largos, conserva letras legíveis e verifica a deslocação horizontal por teclado e toque. Blocos de código com Mermaid mostram apenas o código; para desenhar, usa o componente.

O renderer usa o estilo `classic`, com bordas sólidas e sem gradientes ou sombras. Mantém os fundos, traços e texto ligados aos tokens da paleta de leitura.

### Fórmulas

Usa `$…$` para fórmulas em linha. Para uma fórmula centrada, escreve `$$…$$` num parágrafo próprio ou coloca os delimitadores `$$` em linhas próprias. Várias fórmulas em linhas consecutivas, cada uma entre `$$`, formam blocos separados. Os delimitadores duplos dentro de uma frase continuam em linha.

### Notas de rodapé e caixas

```md
Uma observação com uma fonte.[^fonte]

[^fonte]: Autor, título e ligação à fonte.

:::tip[Uma ideia útil]
Texto com **negrito**, ligações e $fórmulas$.
:::

:::details[Ver a resolução]
Uma explicação mais longa.
:::
```

As caixas aceitam `note`, `info`, `tip`, `warning`, `danger` e `details`. Escolhe-as pela dúvida que resolvem; mantém a explicação principal visível.

### Imagens, separadores e vídeo

Guarda imagens em `public/` com texto alternativo descritivo. `Figure` acrescenta legenda e ligação ao original. Para o modo escuro, escolhe `dim` ou `invert` apenas quando necessário; fotografias e logótipos conservam as cores.

`Tabs` recebe um `id` único e `labels`, com slots `panel-0`, `panel-1`, etc. `YouTube` recebe `id` e `title`, e só carrega o player por escolha do leitor. A [página de formatação](src/content/lessons/exemplo/formatacao.mdx) mostra os componentes completos.

### Animações com Manim

Usa movimento quando ajudar a explicar uma mudança; para comparar estados ao ritmo do leitor, prefere uma figura. Vê as [animações de exemplo](https://resumos.rgo.pt/exemplo/animacoes/).

1. Guarda a cena em `src/content/<cadeira>/`. Usa as cores de `palette` em `resumos_manim` e rótulos que não dependam só da cor.
2. Regista `source`, `scene`, `posterTime` e dependências locais em `src/data/manim-scenes.json`.
3. Gera a cena pelo identificador:

   ```sh
   devenv --profile manim shell -- npm run render:manim -- soma-vetores
   ```

4. Importa `Manim.astro` e usa `<Manim animation="soma-vetores" title="Somar deslocamentos" description="O vetor v começa na ponta de u; a soma liga o início ao ponto final." />`.
5. Inclui a cena e as dependências no pull request. GitHub Actions reutiliza os renders existentes e gera os que faltam. Revê rótulos em telemóvel e nos dois temas.

O renderizador executa Python no computador do autor ou em GitHub Actions. O build e os visitantes usam apenas os ficheiros gerados. O cache tem uma chave por cena, incluindo fontes, dependências, paletas e configuração. Os bundles completos ficam também no [release de renders](https://github.com/rodrgds/resumos/releases/tag/manim-assets), fora do histórico Git, para recuperar um cache expirado. `npm run fetch:manim` descarrega apenas os renders em falta; os ficheiros de `public/manim/` são ignorados pelo Git.

Em `main`, o workflow publica os bundles e atualiza os pequenos manifests em `src/generated/manim/`. Esse commit desencadeia o build de Cloudflare com os renders já disponíveis. Um build que ainda não encontre o bundle falha e mantém a versão publicada anterior. Os pull requests geram artifacts para os testes, sem publicar releases ou alterar `main`.

A descrição deve ensinar a mudança sem depender da animação, que começa pausada com movimento reduzido.

### Demos interativas

Cria um componente em `src/content/<cadeira>/`, envolvido em `InteractiveDemo.astro` com `label` descritivo, e importa-o na lição. A [transformação de uma matriz](src/content/exemplo/Transformacao.astro) é um exemplo completo.

Mostra controlos da matéria, não a implementação web. Explica as hipóteses na lição e conserva um visual útil sem JavaScript. O desenho e os valores iniciais devem corresponder aos controlos, com as mesmas contas usadas na interação. Dá nomes aos controlos, trata entradas inválidas e usa os tokens do tema. Prefere SVG para figuras simples; uma biblioteca só se justifica quando a experiência precisa dela. Verifica contas, teclado, movimento reduzido, claro/escuro e 320 px.

### Laboratórios de provas, autómatos e gramáticas

Usa estes editores quando alterar uma prova, máquina ou gramática ajuda a investigar a matéria. Conserva na lição o enunciado, as hipóteses e uma resolução ou figura estática: a interação não substitui o conteúdo para impressão, Markdown e leitura sem JavaScript. As verificações correm no navegador; as edições e respostas não são enviadas nem guardadas para outra visita.

`ProofLab` oferece exemplos fixos de dedução e um modo Prova livre para o leitor definir premissas e conclusão:

```mdx
import ProofLab from '../../../components/ProofLab.astro';

<ProofLab />
```

O verificador aceita dedução natural proposicional clássica em notação de Fitch, com $\neg$, $\land$, $\lor$, $\to$ e $\bot$. Confere cada regra e o âmbito das caixas, exigindo a conclusão sem hipóteses abertas. As regras disponíveis estão na ajuda do componente; `¬E` significa eliminação da dupla negação. Não verifica quantificadores nem regras derivadas. Sem JavaScript, a prova inicial continua visível, mas não é verificada. O componente ainda não recebe exemplos próprios por props.

`AutomataLab` permite editar e seguir DFA, Moore e Mealy determinísticos completos. Escolhe o exemplo inicial com `preset` e limita o seletor ao tema com `examples`, incluindo sempre o exemplo inicial:

```mdx
import AutomataLab from '../../../components/AutomataLab.astro';

<AutomataLab preset="suffix-ab" examples={['suffix-ab']} />
```

Os identificadores disponíveis são `suffix-ab`, `modulo-three`, `modulo-five` e `overlap-eleven`. Os dois exemplos de resto são Moore; o último é Mealy. O editor admite até 12 estados, 8 símbolos no alfabeto e 128 símbolos de entrada. Moore inclui a saída do estado inicial, mesmo para a entrada vazia; Mealy produz uma saída por transição.

Em Resolver exercício, Verificar máquina compara com a referência por exploração de todos os pares de estados alcançáveis. Para DFA, compara aceitação; para Moore e Mealy, compara as sequências de saída. Esta verificação é exata para máquinas completas do mesmo modelo e alfabeto, incluindo a entrada vazia, e dá uma palavra testemunha quando diferem. Os exemplos de entrada mostrados não são a base da prova de equivalência. Não há simulação de NFA, PDA ou máquinas de Turing. Sem JavaScript, o laboratório não desenha a máquina, por isso inclui o diagrama ou a tabela na lição.

`GrammarLab` recebe uma lista não vazia de gramáticas. Define o nome, as produções, a palavra inicial e os casos públicos:

```mdx
import GrammarLab from '../../../components/GrammarLab.astro';

<GrammarLab
  presets={[
    {
      name: 'Pares de a e b',
      source: 'S -> a S b | ε',
      word: 'aabb',
      tests: 'ε -> aceita\nab -> aceita\naab -> rejeita',
    },
  ]}
/>
```

Para listas maiores, importa dados de `src/content/<cadeira>/`; o tipo `GrammarPreset` está em `src/lib/grammar-lab-types.ts`. `task`, `solution` e `solutionExplanation` são opcionais. Usa nomes curtos para o seletor e conserva a justificação da solução na lição ou no exercício associado.

A primeira variável é a inicial. O editor aceita produções compactas ou espaçadas, variáveis com nomes, recursão à esquerda e $\varepsilon$. A ajuda explica terminais entre aspas e a sintaxe dos casos. O reconhecimento admite palavras até 80 símbolos e gramáticas até 32 variáveis e 80 alternativas; atingir um limite de cálculo não significa rejeição. Para uma palavra aceite, mostra uma árvore possível e a derivação mais à esquerda. Passar os casos finitos não prova equivalência de linguagens nem ausência de ambiguidade. Sem JavaScript, ficam visíveis as produções, a palavra, o resultado inicial e a solução configurada, mas a árvore e a derivação interativas não são desenhadas.

## Código que o leitor pode executar

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

`code` é o ficheiro principal, o que corre, e `title` é opcional. Declara `input` apenas quando o exemplo lê entrada padrão, ou um corpo de pedido em PHP. Omiti-lo esconde esse controlo; `input=""` oferece uma entrada inicialmente vazia. SQL e Haskell não aceitam `input`. Para várias linhas, usa `input={"3\n10 20 30"}`; um atributo MDX entre aspas não interpreta `\n`. Consulta [linguagens e limites](docs/linguagens.md) e [execução local](docs/execucao.md) antes de escolher o motor. Verifica o programa no editor do site, além de o correr nativamente.

Os exemplos executam uma vez quando entram no ecrã, em fila, sem antecipar blocos fora do ecrã. Java e Haskell começam por escolha do leitor. Usa `autoRun={false}` para programas caros, efeitos que o leitor deva iniciar ou experiências que exijam escolher a entrada. Exercícios de programação ficam manuais. Editar código ou entrada antes da execução automática também a impede; voltar ao bloco nunca reexecuta a edição.

Para bases de dados, usa `language="sqlite"` ou `language="postgresql"`. `sql` mantém compatibilidade com SQLite. Os ficheiros `.sql` de apoio correm pela ordem das tabs antes do principal, numa base vazia por execução. Mantém criação e povoamento nas sementes quando o principal ensina transações, para um `ROLLBACK` não anular a preparação. Cada chamada PostgreSQL executa um lote SQL com a semântica de transação implícita do motor, não uma sessão de `psql` que envia cada instrução separadamente. Não dividas scripts por ponto e vírgula, que também aparece em strings, triggers e funções.

Os resultados são tabelas com nomes de colunas, `NULL` distinto de texto e uma indicação quando só se mostram as primeiras 200 linhas. As instruções SQLite de consola, como `.mode` e `.read`, pertencem à ferramenta `sqlite3`, não ao SQL deste editor. PostgreSQL usa PGlite numa só ligação; bloqueios entre clientes, replicação e extensões não incluídas precisam do ambiente da cadeira.

### Ficheiros de apoio

Quando o exemplo precisa de dados ou de código auxiliar, importa cada ficheiro com `?raw` e passa-o em `files`. O principal corre; os outros ficam em tabs editáveis por cima do editor, disponíveis para importar ou ler:

```mdx
import CodePlayground from '../../../components/CodePlayground.astro';
import vendas from '../../ct-iadp/vendas.csv?raw';

<CodePlayground
  language="python"
  files={{ 'vendas.csv': vendas }}
  code={
    'import pandas as pd\nvendas = pd.read_csv("vendas.csv", sep=";", decimal=",")'
  }
/>
```

Os ficheiros também saem nas versões Markdown, sem JavaScript e na impressão. Prefere ficheiros a `StringIO` ou a tabelas escritas no código quando os dados apenas alimentam o exemplo. Não escondas neles o algoritmo, os parâmetros nem a sintaxe que estás a ensinar: o leitor deve conseguir perceber o exemplo lendo o ficheiro principal. Em Python, importa o módulo auxiliar (`from apoio import funcao`); os pacotes são detetados nos imports de todos os ficheiros. Não acrescentes frases que apenas antecipem a saída ou mandem carregar em Executar.

Para ensinar HTML, CSS e JavaScript com DOM, usa `WebPlayground`. Para observar um parâmetro da matéria, usa uma demo com controlos próprios. DartPad e Ripes estão disponíveis através de `ToolEmbed`; o DartPad compila externamente.

## Leitura e versões Markdown

Cores de diagramas acompanham o tema; distingue dados também por rótulos ou traços. O build gera `.md` das páginas públicas e `/llms.txt`, sem rascunhos nem notas locais. Por exemplo, `/exemplo/diagramas.md`. Não edites esses ficheiros gerados.

## Antes de enviar

- Confirma fontes, direitos de reprodução, contas e programas.
- Revê links, navegação, imagens com descrição e a página em telemóvel, nos dois temas e em impressão A4.
- No ambiente Devenv, corre `npm run format:check`, `npm run check`, `npm test` e `npm run build`. Corrige a formatação só nos ficheiros alterados.
- Explica no pull request o que acrescentaste ou corrigiste.

## Referência técnica

[Documentação](docs/README.md) · [Guia de escrita](.agents/skills/resumos-writing/SKILL.md)
