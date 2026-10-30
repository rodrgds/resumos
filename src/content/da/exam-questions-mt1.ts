import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  mochila: '/cadeiras/da/algoritmos-gulosos/#mochila-fracionária',
  provaTroca: '/cadeiras/da/algoritmos-gulosos/#prova-por-troca',
  selecao: '/cadeiras/da/algoritmos-gulosos/#seleção-de-atividades',
  prim: '/cadeiras/da/arvores-abrangentes/#prim',
  kruskal: '/cadeiras/da/arvores-abrangentes/#kruskal',
  dijkstra: '/cadeiras/da/caminhos-minimos/#dijkstra',
  negativos: '/cadeiras/da/caminhos-minimos/#pesos-negativos-e-bellman-ford',
  edmondsKarp: '/cadeiras/da/fluxo-maximo/#ford-fulkerson-e-edmonds-karp',
  corte: '/cadeiras/da/fluxo-maximo/#corte-mínimo-como-prova-do-resultado',
  mestre: '/cadeiras/da/divisao-conquista/#teorema-mestre',
  mergeSort: '/cadeiras/da/divisao-conquista/#merge-sort',
  podas:
    '/cadeiras/da/retrocesso-ramificacao/#soma-de-subconjuntos-com-duas-podas',
};

export const mt1Gulosos: ExamQuestion[] = [
  {
    id: 'da-mt1-2024-q1',
    title: 'Mochila 0/1: escolha gulosa e valor ótimo',
    source: 'Teste 1, 2023/24',
    topic: 'gulosos',
    prompt:
      'Considere o problema da mochila 0/1 com capacidade $W=10$ e 3 artigos: artigo 1 $\\{v_1=70, w_1=7\\}$, artigo 2 $\\{v_2=36, w_2=6\\}$, artigo 3 $\\{v_3=42, w_3=4\\}$.\n\na) Indique a seleção feita pelo algoritmo guloso que insere os artigos por ordem decrescente do rácio $v/w$ e o valor resultante.\nb) Essa seleção é ótima? Justifique.\nc) Em geral, a que distância pode a solução gulosa ficar da solução ótima? Discuta, podendo dar um exemplo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica a seleção gulosa pelos artigos 3 e 2, com valor 78.',
        'A resposta conclui que, nesta instância, a seleção gulosa é ótima.',
        'A justificação da parte c) dá um exemplo em que o rácio guloso/ótimo tende para zero.',
      ],
    },
    solution:
      'a) Seleção gulosa: artigos 3 e 2, com valor $42+36=78$. b) Sim, é ótima nesta instância. c) A gulosa pode ser arbitrariamente má: com $v=\\{1, W-1\\}$ e $w=\\{1, W\\}$, o rácio guloso/ótimo é $1/(W-1)$.',
    reasoning:
      'Os rácios são $70/7=10$, $36/6=6$ e $42/4=10{,}5$. A ordem decrescente é artigo 3, artigo 1, artigo 2. O artigo 3 enche 4 unidades; sobram 6, onde o artigo 1 (peso 7) não cabe e o artigo 2 (peso 6) cabe exatamente, dando $42+36=78$ e enchendo a mochila por completo. Como a mochila fica cheia, nenhuma solução pode ter valor superior a $78$ nesta instância. Em geral, a gulosa pode falhar por um fator arbitrário: com dois artigos de valores $1$ e $W-1$ e pesos $1$ e $W$, a gulosa escolhe o primeiro (valor 1) e a ótima escolhe o segundo (valor $W-1$).',
    explanation: link.mochila,
  },
  {
    id: 'da-mt1-2024-q2',
    title: 'Estações de comboio numa linha férrea',
    source: 'Teste 1, 2023/24',
    topic: 'gulosos',
    prompt:
      'Uma linha férrea é representada por uma reta numérica onde estão marcadas as localidades. Pretende-se escolher pontos da reta para construir estações de comboio, de modo a que cada localidade fique a uma distância máxima $R$ de uma estação. As estações não precisam de coincidir com localidades.\n\nDescreva um algoritmo guloso que encontra uma coleção mínima de localizações para as estações. Discuta a sua complexidade e a prova de otimalidade.',
    answer: {
      kind: 'self',
      checklist: [
        'O algoritmo escolhe a primeira localidade ainda não coberta e coloca a estação a distância $R$ à sua frente.',
        'A complexidade indicada é $O(n)$ (ou $O(n\\log n)$ se as localidades não estiverem ordenadas).',
        'A prova de otimalidade usa um argumento de troca com uma solução ótima.',
      ],
    },
    solution:
      'Percorrer as localidades por ordem crescente; para a primeira localidade $t$ ainda não coberta, colocar uma estação em $t+R$. Complexidade $O(n)$ com as localidades ordenadas. A prova de otimalidade compara com uma solução ótima qualquer e troca, uma a uma, cada estação da solução ótima pela estação que o algoritmo guloso coloca na mesma posição, sem nunca uncoverir localidades.',
    reasoning:
      'Se a solução ótima colocasse a sua próxima estação antes de $t+R$, a localidade $t$ ficaria descoberta, pelo que a próxima estação ótima tem de estar em $t+R$ ou depois. Trocá-la pela estação em $t+R$ não descubre nenhuma localidade e faz a solução ótima coincidir com a gulosa numa estação a mais. Por troca sucessiva, a solução gulosa é ótima.',
    explanation: link.selecao,
  },
  {
    id: 'da-mt1-2023-q2',
    title: 'Paragens de gasolina com o menor número de depósitos',
    source: 'Teste 1, 2022/23',
    topic: 'gulosos',
    prompt:
      'O Ralph vai de Los Angeles a Chicago pela rota 66. O depósito do carro, quando cheio, dá para viajar $n$ milhas, e o mapa indica as distâncias entre os postos de gasolina da rota. Pretende-se minimizar o número de paragens para abastecer.\n\nDê um algoritmo eficiente que determina em que postos deve parar e prove que a estratégia é ótima.',
    answer: {
      kind: 'self',
      checklist: [
        'A estratégia gulosa indica: abastecer no posto mais distante alcançável com o depósito atual.',
        'A prova usa subestrutura ótima e a propriedade da escolha gulosa.',
        'A complexidade indicada é $O(m)$ para $m$ postos.',
      ],
    },
    solution:
      'Começando com o depósito cheio, parar no posto mais afastado que é alcançável dentro de $n$ milhas e abastecer lá; repetir a partir desse posto. O problema tem subestrutura ótima e a escolha gulosa é segura: nenhum posto para lá do $k$-ésimo é alcançável como primeira paragem, e escolher um posto $j<k$ nunca permite ir mais longe. Com $m$ postos, cada um é inspecionado uma vez, logo $O(m)$.',
    reasoning:
      'Se uma solução ótima tem a primeira paragem no posto $k$, o resto tem de ser ótimo para o subproblema dos $m-k$ postos seguintes, caso contrário havia uma solução com menos paragens. Como a escolha do posto $k$ deixa pelo menos tanto combustível como qualquer escolha $j<k$, a gulosa nunca fica em pior posição.',
    explanation: link.provaTroca,
  },
  {
    id: 'da-mt1-2023-q6',
    title: 'Mochila fracionária com valores todos iguais',
    source: 'Teste 1, 2022/23',
    topic: 'gulosos',
    prompt:
      'Considere a variante da mochila fracionária em que todos os artigos têm o mesmo valor $v$, mas pesos possivelmente diferentes, podendo incluir-se uma fração de qualquer artigo numa mochila de capacidade $W$.\n\nDerive um algoritmo eficiente que maximiza o valor da mochila e discuta a sua complexidade e a otimalidade da solução.',
    answer: {
      kind: 'self',
      checklist: [
        'O algoritmo ordena os artigos por peso crescente e enche a mochila pelos mais leves, com fração no último.',
        'A complexidade indicada é $O(n\\log n)$, dominada pela ordenação.',
        'A justificação de otimalidade refere que ordenar por $v/w$ decrescente equivale a ordenar por peso crescente quando os valores são iguais.',
      ],
    },
    solution:
      'Como todos os artigos valem o mesmo, maximizar o valor é o mesmo que maximizar o número de artigos na mochila. Basta ordenar os artigos por peso crescente e ir enchendo a mochila pelos mais leves; quando a capacidade restante não chega para o artigo seguinte, insere-se a fração correspondente. A complexidade é $O(n\\log n)$, dominada pela ordenação.',
    reasoning:
      'Ordenar por rácio $v/w$ decrescente é, quando todos os $v$ são iguais, equivalente a ordenar por peso crescente: $v_i/w_i > v_{i+1}/w_{i+1}$ implica $w_i < w_{i+1}$. Assim, réutiliza-se a prova de otimalidade da mochila fracionária clássica. Em alternativa, trocar um artigo mais pesado por um mais leve, de igual valor, liberta capacidade para outro artigo ou fração, aumentando o valor.',
    explanation: link.mochila,
  },
];

export const mt1Arvores: ExamQuestion[] = [
  {
    id: 'da-mt1-2024-q4',
    title: 'Árvore abrangente mínima com pesos todos iguais',
    source: 'Teste 1, 2023/24',
    topic: 'arvores',
    prompt:
      'Considere um grafo conexo e pesado com $N$ nós em que todas as arestas têm o mesmo peso, por exemplo 1. É possível melhorar o algoritmo de Prim ou o de Kruskal para encontrar a árvore abrangente de custo mínimo? Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que basta marcar os nós visitados e percorrer as arestas até obter $N-1$ arestas sem ciclo.',
        'A complexidade indicada é $O(V+E)$.',
      ],
    },
    solution:
      'Sim. Como todas as arestas têm o mesmo peso, basta varrer as arestas até recolher $N-1$ arestas que não formem ciclo, marcando os nós já alcançados. A complexidade é $O(V+E)$, uma ligeira melhoria sobre a de Prim ou Kruskal com filas de prioridade.',
    reasoning:
      'Qualquer conjunto de $N-1$ arestas sem ciclo é uma árvore abrangente e, com pesos unitários, todas as árvores abrangentes têm custo $N-1$. Portanto a ordenação de arestas é dispensável e uma simples travessia com marcação de nós resolve o problema.',
    explanation: link.prim,
  },
  {
    id: 'da-mt1-2023-q4',
    title: 'Variante eficiente de Prim para pesos unitários',
    source: 'Teste 1, 2022/23',
    topic: 'arvores',
    prompt:
      'Considere a classe dos grafos não dirigidos, conexos, com $N$ nós e todas as arestas de peso unitário. Adapte o algoritmo de Prim para encontrar a árvore abrangente de custo mínimo, simplificando-o numa variante mais eficiente. Descreva o algoritmo em pseudo-código e justifique a complexidade melhorada.',
    answer: {
      kind: 'self',
      checklist: [
        'O pseudo-código usa um vetor booleano de nós visitados e para quando tiver $N-1$ arestas.',
        'A complexidade indicada é $O(E+V)$, a de uma travessia em profundidade.',
        'A resposta indica que o custo da árvore é $N-1$.',
      ],
    },
    solution:
      'Basta uma travessia (por exemplo DFS) que vai adicionando arestas para nós ainda não visitados até perfazer $N-1$ arestas, usando um vetor booleano de visitados. Complexidade $O(E+V)$ e custo da árvore $N-1$.',
    reasoning:
      'Com pesos todos iguais, a parte mais cara de Prim, a ordenação das arestas, torna-se desnecessária: qualquer aresta que ligue um nó novo serve. Uma DFS com marcação de nós visitados escolhe essas arestas em tempo linear.',
    explanation: link.kruskal,
  },
];

export const mt1Caminhos: ExamQuestion[] = [
  {
    id: 'da-mt1-2024-q8',
    title: 'Dijkstra a partir de um nó: primeira iteração e limite de um peso',
    source: 'Teste 1, 2023/24',
    topic: 'caminhos',
    prompt:
      'Considere o grafo dirigido e pesado com nós $a,b,c,d,e,f$ e arestas $a\\to b$ (4), $a\\to c$ (8), $a\\to d$ (1), $a\\to e$ (4), $b\\to d$ (1), $b\\to e$ (1), $d\\to e$ (1), $c\\to e$ (3), $c\\to f$ (1).\n\na) Usando o algoritmo de Dijkstra a partir do nó $a$, indique os valores das distâncias na inicialização e após uma iteração, assumindo que, em caso de empate numérico, se escolhe o nó de menor valor lexicográfico ($a<b<c<d<e<f$), e ainda os valores finais.\nb) Qual é o menor valor que a aresta $(a,e)$ pode ter sem alterar a forma da árvore de caminhos mais curtos? Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'Inicialização: $\\{0,4,8,1,4,\\infty\\}$; após a primeira iteração: $\\{0,2,8,1,2,\\infty\\}$.',
        'Valores finais: $d(a)=0$, $d(b)=2$, $d(c)=5$, $d(d)=1$, $d(e)=2$, $d(f)=6$.',
        'A aresta $(a,e)$ não pode ter peso inferior a 2.',
      ],
    },
    solution:
      'a) Inicialização $\\{0,4,8,1,4,\\infty\\}$; após a primeira iteração (nó $d$ selecionado) $\\{0,2,8,1,2,\\infty\\}$; finais $\\{0,2,5,1,2,6\\}$. b) O peso de $(a,e)$ não pode ser inferior a 2.',
    reasoning:
      'Após inicializar com as arestas diretas de $a$, seleciona-se $d$ (distância 1) e relaxam-se $b$ e $e$ para 2. Depois seleciona-se $b$ (empate com $e$, vence $b$), depois $e$, que leva $c$ a $2+3=5$, e por fim $c$, que leva $f$ a $5+1=6$. Se o peso de $(a,e)$ fosse menor que 2, o nó $e$ passaria a ser alcançado diretamente por $a$, alterando a árvore de caminhos mais curtos e, via $e$, os caminhos para $c$ e $f$.',
    explanation: link.dijkstra,
  },
  {
    id: 'da-mt1-2024r-p2',
    title: 'Dijkstra falha com arestas negativas: que aresta remover',
    source: 'Recurso global, 2023/24',
    topic: 'caminhos',
    prompt:
      'Considere o grafo dirigido e pesado com nós $A,B,C,D,E$ e arestas $A\\to B$ (2), $A\\to C$ (8), $A\\to E$ (12), $B\\to D$ (2), $C\\to E$ ($-7$), $D\\to E$ (2), $E\\to D$ (1).\n\na) Aplique o algoritmo de Dijkstra a partir de $A$, indicando a ordem pela qual os nós são conhecidos e as distâncias finais que produz.\nb) O algoritmo encontrou algum caminho mais curto incorreto? Indique o caminho calculado e o correto.\nc) Se pudesse retirar apenas uma aresta, qual escolheria para que o Dijkstra produzisse resultados corretos para todos os nós?',
    answer: {
      kind: 'self',
      checklist: [
        'Ordem de seleção: $A, B, D, E, C$, com distâncias finais $d(B)=2$, $d(C)=8$, $d(D)=4$, $d(E)=6$.',
        'As distâncias incorretas são $d(D)=4$ (correta: 2, via $A\\to C\\to E\\to D$) e $d(E)=6$ (correta: 1, via $A\\to C\\to E$).',
        'A aresta a remover é $(C,E)$ de peso $-7$.',
      ],
    },
    solution:
      'a) Ordem $A;B;D;E;C$, com $\\{d(B),d(C),d(D),d(E)\\}=\\{2,8,4,6\\}$. b) Sim: $d(D)=4$ deveria ser 2 e $d(E)=6$ deveria ser 1. c) Remove-se a aresta $(C,E)$.',
    reasoning:
      'O Dijkstra só é correto com pesos não negativos. Aqui, depois de fixar $D=4$ e $E=6$, a aresta negativa $C\\to E$ já não é reaplicada: o caminho $A\\to C\\to E$ dá $8-7=1$ e $A\\to C\\to E\\to D$ dá 2. Sem a aresta $(C,E)$, todos os pesos são não negativos e o Dijkstra produz os caminhos corretos.',
    explanation: link.negativos,
  },
];

export const mt1Fluxo: ExamQuestion[] = [
  {
    id: 'da-mt1-2024-q7',
    title: 'Fluxo máximo numa rede em duas camadas',
    source: 'Teste 1, 2023/24',
    topic: 'fluxo',
    prompt:
      'Considere a rede de fluxo com fonte $s$ e sumidouro $t$, em que $L=\\{a,b,c\\}$ e $R=\\{d,e,f\\}$. As arestas entre $s$ e os nós de $L$ têm capacidade 2, as arestas entre $L$ e $R$ têm capacidade 1, e as arestas entre $R$ e $t$ têm capacidade 1.\n\na) Indique um corte mínimo e a respetiva capacidade.\nb) Liste os caminhos de aumento que o algoritmo de Edmonds-Karp encontra, por ordem.\nc) Qual é o fluxo máximo entre $s$ e $t$?\nd) Quantas arestas entre $L$ e $R$ podem ser retiradas sem afetar o fluxo máximo? Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'O corte mínimo é $S=\\{t\\}$ com capacidade 3.',
        'Os caminhos de aumento são $s\\to a\\to d\\to t$, $s\\to a\\to e\\to t$ e $s\\to b\\to f\\to t$, todos de capacidade 1.',
        'O fluxo máximo é 3.',
        'Pode retirar-se uma aresta por cada nó de $L$, porque o fluxo se desvia para o nó alternativo de $R$.',
      ],
    },
    solution:
      'a) Corte $S_1=\\{t\\}$, $S_2=\\{s,a,b,c,d,e,f\\}$, capacidade 3. b) $s\\to a\\to d\\to t$, $s\\to a\\to e\\to t$, $s\\to b\\to f\\to t$ (capacidade 1 cada). c) Fluxo máximo = corte mínimo = 3. d) Uma aresta por cada nó de $\\{a,b,c\\}$.',
    reasoning:
      'Só entram em $t$ três arestas de capacidade 1, pelo que o fluxo máximo é no máximo 3; o corte $\\{t\\}$ mostra que 3 é atingível com os três caminhos indicados. Em cada nó de $L$ há duas arestas para $R$, pelo que retirar uma delas não impede desviar o fluxo pela outra.',
    explanation: link.edmondsKarp,
  },
  {
    id: 'da-mt1-2023r-p5',
    title: 'Fluxo máximo com capacidades X, Y e Z',
    source: 'Recurso T1, 2022/23',
    topic: 'fluxo',
    prompt:
      'Considere a rede de fluxo com fonte $s$ e sumidouro $t$, em que $X$, $Y$ e $Z$ são valores inteiros não negativos. As arestas são $s\\to a$ (20), $s\\to c$ (20), $a\\to b$ ($X$), $b\\to d$ ($Y$), $c\\to b$ ($X$), $c\\to d$ ($Z$) e $d\\to t$ (20).\n\na) Qual é a expressão analítica do fluxo máximo entre $s$ e $t$ em função de $X$, $Y$ e $Z$?\nb) Quais devem ser os valores de $X$, $Y$ e $Z$ para que todas as arestas fiquem saturadas no fluxo máximo?\nc) Faz sentido aumentar $Y$ para lá do valor de $X$? Porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'O fluxo máximo é $\\min(20, \\min(X,Y)+\\min(X,Z))$.',
        'Para saturar todas as arestas: $X=Y=Z=10$.',
        'Não faz sentido aumentar $Y$ para lá de $X$, porque a capacidade do caminho fica limitada por $X$.',
      ],
    },
    solution:
      'a) Fluxo máximo $=\\min(20,\\min(X,Y)+\\min(X,Z))$. b) $X=Y=Z=10$. c) Não, pois o gargalo do caminho é a aresta de capacidade $X$.',
    reasoning:
      'O fluxo que chega a $d$ vem dos caminhos $s\\to a\\to b\\to d$ (limitado por $\\min(20,X,Y)$) e $s\\to c\\to\\ldots\\to d$ (limitado por $\\min(20,X,Z)$), e a aresta $d\\to t$ limita tudo a 20. Para saturar as arestas de $s$ (20 cada) e a de $t$, cada ramo tem de transportar 10, ou seja $X=Y=Z=10$. Aumentar $Y$ além de $X$ não ajuda, porque o troço partilhado de capacidade $X$ continua a limitar o caminho.',
    explanation: link.corte,
  },
];

export const mt1Divisao: ExamQuestion[] = [
  {
    id: 'da-mt1-2024-q6',
    title: 'Recorrência com quatro ramos de tamanho n/4',
    source: 'Teste 1, 2023/24',
    topic: 'divisao',
    prompt:
      'Considere a função recursiva\n\n```text\nvoid myAlgorithm(int arr[], int n, int blk) {\n  if (n == 1) return;\n  checkArray(arr, n, blk);\n  for (int i = 0; i < 4; i++)\n    myAlgorithm(arr, n/4, i);\n}\n```\n\nonde `checkArray` não chama outras funções e o seu custo depende apenas de $n$. Determine a complexidade assintótica de `myAlgorithm` discutindo os vários casos para o custo de `checkArray`: e se for $O(n)$? E se for $O(n^2)$? E se for $O(\\sqrt{n})$?',
    answer: {
      kind: 'self',
      checklist: [
        'A recorrência indicada é $T(n)=4T(n/4)+f(n)$ com $n^{\\log_4 4}=n$.',
        'Para $f(n)=O(n)$: $T(n)=\\Theta(n\\log n)$; para $f(n)=O(\\sqrt{n})$: $T(n)=\\Theta(n)$; para $f(n)=O(n^2)$: $T(n)=\\Theta(n^2)$.',
      ],
    },
    solution:
      '$T(n)=4T(n/4)+f(n)$. Como $a=4$ e $b=4$, $\\log_b a=1$: se $f(n)=\\Theta(n)$, caso 2 do teorema mestre, $T(n)=\\Theta(n\\log n)$; se $f(n)=O(n^{1-\\varepsilon})$ (por exemplo $O(\\sqrt{n})$), caso 1, $T(n)=\\Theta(n)$; se $f(n)=\\Omega(n^{1+\\varepsilon})$ (por exemplo $\\Theta(n^2)$), caso 3, $T(n)=\\Theta(n^2)$.',
    reasoning:
      'Cada chamada gera 4 subproblemas de tamanho $n/4$, pelo que a árvore de recursão tem profundidade $\\log_4 n$ e o trabalho fora das folhas domina conforme o expoente de $f(n)$ comparado com $n^{\\log_4 4}=n$.',
    explanation: link.mestre,
  },
  {
    id: 'da-mt1-2024-q5',
    title: 'Contar os zeros de uma cadeia 1^m 0^n em O(log k)',
    source: 'Teste 1, 2023/24',
    topic: 'divisao',
    prompt:
      'Dado um vetor binário $S$ da forma $1^m0^n$, ou seja, com $m$ valores 1 seguidos de $n$ valores 0, conceba um algoritmo melhor que $O(n)$ que encontre o número de zeros em $O(\\log k)$, onde $k=m+n$. Formalize a complexidade assintótica apresentando o pseudo-código.',
    answer: {
      kind: 'self',
      checklist: [
        'A estratégia é uma pesquisa binária pelo ponto em que o valor muda de 1 para 0.',
        'O pseudo-código trata os casos extremos $m=0$ e $n=0$ em tempo constante.',
        'A complexidade indicada é $O(\\log k)$.',
      ],
    },
    solution:
      'Pesquisa binária sobre o índice em que o vetor muda de 1 para 0: se $S[1]=0$ há $k$ zeros; se $S[k]=1$ não há zeros; caso contrário divide-se o intervalo ao meio até encontrar a transição. O número de zeros é $k-i$ (ou $k-i+1$) onde $i$ é o último índice com valor 1. Complexidade $O(\\log k)$.',
    reasoning:
      'Como o vetor está ordenado (todos os 1 antes de todos os 0), a posição da mudança é monotónica e a pesquisa binária encontra-a em $\\log_2 k$ passos, cada um de custo constante.',
    explanation: link.mestre,
  },
  {
    id: 'da-mt1-2023-q5',
    title: 'Recorrência com três ramos de tamanho n/9',
    source: 'Teste 1, 2022/23',
    topic: 'divisao',
    prompt:
      'Considere a função recursiva\n\n```text\npublic int G(int n, ...) {\n  if (n < 1) return 1;\n  F(n, ...);\n  int x = G(n / 9, ...);\n  int y = G(n / 9, ...);\n  int z = G(n / 9, ...);\n  return x + y * z;\n}\n```\n\nonde `F` tem custo polinomial, logarítmico ou mesmo constante em $n$. Derive a recorrência do tempo de execução de `G` e a sua complexidade assintótica pelo teorema mestre, examinando vários cenários para `F`. Discuta a complexidade quando `F(n)` é linear e quando é quadrático. Faria sentido tornar `F` logarítmica? Porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'A recorrência é $T(n)=3T(n/9)+f(n)$ com $\\log_9 3 = 0{,}5$.',
        'Para $f(n)=\\Theta(n)$ ou $\\Theta(n^2)$: $T(n)=\\Theta(n)$ e $\\Theta(n^2)$, respetivamente; para $f(n)=\\Theta(\\sqrt{n})$: $T(n)=\\Theta(\\sqrt{n}\\log n)$.',
        'Tornar `F` logarítmica não altera a complexidade global, que continua $\\Theta(\\sqrt{n})$.',
      ],
    },
    solution:
      '$T(n)=3T(n/9)+f(n)$, com $a=3$, $b=9$ e $\\log_9 3=0{,}5$. Se $f(n)=\\Theta(n)$ ou $\\Theta(n^2)$, domina a solução homogénea: $T(n)=\\Theta(n)$ e $\\Theta(n^2)$. Se $f(n)=\\Theta(\\sqrt{n})$, caso 2: $T(n)=\\Theta(\\sqrt{n}\\log n)$. Se `F` fosse $O(\\log n)$, continuava a ser polinomialmente inferior a $\\sqrt{n}$ e $T(n)=\\Theta(\\sqrt{n})$: não vale a pena investir numa implementação mais eficiente de `F`.',
    reasoning:
      'O expoente crítico é $0{,}5$. Qualquer $f(n)$ polinomialmente acima de $\\sqrt{n}$ domina a recorrência; o próprio $\\sqrt{n}$ dá o caso 2 com fator logarítmico; abaixo disso, o custo das $3^{\\log_9 n}=\\sqrt{n}$ folhas domina.',
    explanation: link.mestre,
  },
  {
    id: 'da-mt1-2023r-q2',
    title: 'Recorrência com nove ramos de tamanho n/3',
    source: 'Recurso T1, 2022/23',
    topic: 'divisao',
    prompt:
      'Considere a função recursiva\n\n```text\npublic int G(int n, ...) {\n  if (n < 1) return 1;\n  F(n, ...);\n  x = 0;\n  for (i = 0; i < 9; i++)\n    x = max(x, G(n / 3, ...));\n  return;\n}\n```\n\nonde `F` tem custo polinomial, logarítmico ou constante em $n$. Derive a recorrência do tempo de execução e a respetiva complexidade assintótica pelo teorema mestre, examinando vários cenários para `F`. Discuta a complexidade quando `F(n)` é linear e quando é quadrático. Faria sentido tornar `F` logarítmica? Porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'A recorrência é $T(n)=9T(n/3)+f(n)$ com $\\log_3 9 = 2$.',
        'Para $f(n)=\\Theta(n)$: $T(n)=\\Theta(n^2)$; para $f(n)=\\Theta(n^2)$: $T(n)=\\Theta(n^2\\log n)$.',
        'Tornar `F` mais eficiente que linear não altera a complexidade global, que continua quadrática.',
      ],
    },
    solution:
      '$T(n)=9T(n/3)+f(n)$, com $a=9$, $b=3$ e $\\log_3 9=2$. Se $f(n)=\\Theta(n)$, caso 1: $T(n)=\\Theta(n^2)$. Se $f(n)=\\Theta(n^2)$, caso 2: $T(n)=\\Theta(n^2\\log n)$. Se `F` fosse mais eficiente que linear, a complexidade continuava $\\Theta(n^2)$, pelo que não faz sentido investir nisso.',
    reasoning:
      'O número de folhas é $9^{\\log_3 n}=n^2$, que já domina qualquer $f(n)$ de expoente inferior a 2. Só um `F` quadrático (caso 2) ou superior altera a ordem de grandeza, e nesse caso o custo de `F` passa a dominar.',
    explanation: link.mestre,
  },
];

export const mt1Retrocesso: ExamQuestion[] = [
  {
    id: 'da-mt1-2024r-p5',
    title: 'Particionar um conjunto em dois subconjuntos de soma igual',
    source: 'Recurso global, 2023/24',
    topic: 'retrocesso',
    prompt:
      'Dado o conjunto $S=\\{5,7,12,13,15,18\\}$, determine se pode ser particionado em dois subconjuntos $A$ e $B$ com a mesma soma (se a soma dos elementos de $A$ é $X$, a soma dos de $B$ também é $X$), usando retrocesso com podas. Assuma que o primeiro elemento não está em $B$ e o segundo está em $B$ ($x_1=0$, $x_2=1$).\n\na) Qual é o valor de $X$?\nb) Indique os elementos dos subconjuntos $A$ e $B$.\nc) Quantos estados do espaço de procura (16, com $x_1$ e $x_2$ fixos) foram totalmente explorados e quantos foram podados?',
    answer: {
      kind: 'self',
      checklist: [
        'O valor de $X$ é 35.',
        'Os subconjuntos são $A=\\{5,12,18\\}$ e $B=\\{7,13,15\\}$.',
        'Dos 16 estados, nenhum foi totalmente explorado e os 16 foram podados.',
      ],
    },
    solution:
      'a) $X=35$. b) $A=\\{5,12,18\\}$, $B=\\{7,13,15\\}$. c) 0 estados totalmente explorados; 16 podados.',
    reasoning:
      'A soma total é $5+7+12+13+15+18=70$, logo $X=35$. Com $x_1=0$ e $x_2=1$, a poda pelo limite superior (soma parcial + próximo elemento > $X$) e pelo limite inferior (soma parcial + soma dos restantes < $X$) impede qualquer ramo de chegar ao fim: a primeira solução válida, o estado $(0,1,1,0,1,0)$, corresponde a $B=\\{7,13,15\\}$.',
    explanation: link.podas,
  },
  {
    id: 'da-mt1-2023r-p7',
    title: 'Soma de subconjuntos com podas: W = {1,3,4,5}, M = 8',
    source: 'Recurso T1, 2022/23',
    topic: 'retrocesso',
    prompt:
      'Considere o problema da soma de subconjuntos com $W=\\{1,3,4,5\\}$ e $M=8$. Usando retrocesso, mostre a árvore completa de estados e, com as duas funções de poda descritas nas aulas, determine que estados podem ser podados.\n\nAs podas são: abandonar o ramo se a soma parcial mais o próximo elemento exceder $M$; e abandoná-lo se a soma parcial mais a soma de todos os elementos restantes for inferior a $M$. Cada nó da árvore é um triplo (soma, nível, resto), onde "resto" é a soma dos elementos que ainda podem ser incluídos.',
    answer: {
      kind: 'self',
      checklist: [
        'A árvore de estados parte da raiz $(0,1,13)$ e cada nível escolhe $x_i=1$ ou $x_i=0$.',
        'Os estados podados são os que violam uma das duas condições de poda.',
        'As soluções encontradas são os subconjuntos de soma 8: $\\{3,5\\}$ e $\\{1,3,4\\}$.',
      ],
    },
    solution:
      'A árvore de estados (soma, nível, resto) é:\n\n```text\n(0,1,13)\n├── x1=1 → (1,2,12)\n│   ├── x2=1 → (4,3,9)\n│   │   ├── x3=1 → (8,4,5)\n│   │   │   ├── x4=1 → 13 > 8, podado\n│   │   │   └── x4=0 → (8,5,0), solução {1,3,4}\n│   │   └── x3=0 → (4,4,5), ambos os ramos seguintes podados\n│   └── x2=0 → (1,3,9), todos os ramos podados\n└── x1=0 → (0,2,12)\n    ├── x2=1 → (3,3,9)\n    │   ├── x3=1 → (7,4,5), podado\n    │   └── x3=0 → (3,4,5)\n    │       ├── x4=1 → (8,5,0), solução {3,5}\n    │       └── x4=0 → 3 < 8, podado\n    └── x2=0 → (0,3,9), todos os ramos podados\n```\n\nAs soluções são $\\{1,3,4\\}$ e $\\{3,5\\}$.',
    reasoning:
      'A poda superior impede continuar quando a soma parcial mais o próximo elemento ultrapassa $M=8$ (por exemplo, em (4,4,5) o próximo elemento 5 daria 9); a poda inferior impede continuar quando nem com todos os restantes se chega a $M$ (por exemplo, em (3,4,5) com $x_4=0$ a soma fica 3 < 8). Só os estados (8,5,0) atingem a soma exata.',
    explanation: link.podas,
  },
];
