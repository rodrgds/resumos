import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  mochila: '/cadeiras/da/programacao-dinamica/#mochila-0-1',
  cyk: '/cadeiras/da/linguagens-dinamica/#cyk-e-forma-normal-de-chomsky',
  podas:
    '/cadeiras/da/retrocesso-ramificacao/#soma-de-subconjuntos-com-duas-podas',
  tsp: '/cadeiras/da/aproximacao-garantias/#tsp-m%C3%A9trico-e-atalhos',
  coberturaVertices:
    '/cadeiras/da/aproximacao-garantias/#cobertura-de-v%C3%A9rtices',
  coberturaConjuntos:
    '/cadeiras/da/aproximacao-garantias/#cobertura-de-conjuntos',
  garantia:
    '/cadeiras/da/aproximacao-garantias/#garantia-de-aproxima%C3%A7%C3%A3o',
  reducao:
    '/cadeiras/da/complexidade-aproximacao/#dire%C3%A7%C3%A3o-de-uma-redu%C3%A7%C3%A3o',
  cliqueCobertura:
    '/cadeiras/da/complexidade-aproximacao/#de-clique-para-cobertura-de-v%C3%A9rtices',
  ilpNP: '/cadeiras/da/programacao-inteira/#relacao-com-np-completude',
  formaStandard: '/cadeiras/da/programacao-linear/#forma-standard',
  modelar:
    '/cadeiras/da/programacao-linear/#modelar-um-plano-de-produ%C3%A7%C3%A3o',
  arredondar:
    '/cadeiras/da/programacao-inteira/#arredondar-n%C3%A3o-resolve-o-ilp',
  branchBound:
    '/cadeiras/da/programacao-inteira/#branch-and-bound-com-rela%C3%A7%C3%B5es',
  johnson: '/cadeiras/da/caminhos-minimos/#johnson',
  negativos: '/cadeiras/da/caminhos-minimos/#pesos-negativos-e-bellman-ford',
};

export const mt2Dinamica: ExamQuestion[] = [
  {
    id: 'da-mt2-2024-q1',
    title: 'Mochila 0/1 por programação dinâmica e limite da gulosa',
    source: 'Teste 2, 2024/25',
    topic: 'dinamica',
    prompt:
      'Considere a mochila 0/1 com capacidade $W=5$ e três objetos, com valores e pesos respetivamente $v=\\{5,8,9\\}$ e $w=\\{1,2,3\\}$.\\n\\nDescreva a recorrência da programação dinâmica para este problema, apresente a tabela de resultados dessa formulação e indique o melhor valor obtido. Que valor devolveria a abordagem gulosa que usa a razão $v/w$ como critério de seleção? Em geral, quão má pode ser essa abordagem gulosa em relação à seleção ótima? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A recorrência é $\\mathrm{val}[i,j]=\\max(\\mathrm{val}[i-1,j],\\mathrm{val}[i-1,j-w_i]+v_i)$.',
        'A tabela termina com $\\mathrm{val}[3,5]=17$, obtido com os objetos 2 e 3.',
        'A gulosa devolve apenas 5 e pode ser arbitrariamente má (exemplo com $v=\\{1,B-1\\}$, $w=\\{1,B\\}$, rácio $1/(B-1)$).',
      ],
    },
    solution:
      'Melhor valor: $17$, selecionando os objetos 2 e 3. A gulosa por $v/w$ devolve $5$.',
    reasoning:
      'Com $\\mathrm{val}[i,j]$ o melhor valor considerando objetos até $i$ e capacidade $j$, a recorrência compara ignorar o objeto $i$ com incluí-lo. A tabela (linhas objeto 1, 2, 3; colunas capacidade 0 a 5) é: objeto 1: $0,5,5,5,5,5$; objeto 2: $0,5,8,13,13,13$; objeto 3: $0,5,8,13,14,17$. Logo $\\mathrm{val}[3,5]=17$. A gulosa escolhe o objeto 1 (razão 5) e fica sem capacidade para mais nada, obtendo 5. Em geral pode ser arbitrariamente má: com $W=B$, $v=\\{1,B-1\\}$ e $w=\\{1,B\\}$, a gulosa escolhe o primeiro objeto e o rácio gulosa/ótima é $1/(B-1)$, que tende para 0 quando $B$ cresce.',
    explanation: link.mochila,
  },
  {
    id: 'da-mt2-2022-q2',
    title: 'Mochila 0/1 com quatro objetos e comparação com a gulosa',
    source: 'Recurso T2, 2022/23',
    topic: 'dinamica',
    prompt:
      'Considere a mochila 0/1 com capacidade $W=10$ e quatro objetos com valores e pesos $v=(4,5,5,6)$ e $w=(4,5,5,6)$. Apresente a tabela de problemas parciais que resulta diretamente da recorrência de programação dinâmica e indique o melhor valor. Que valor devolveria uma algoritmo guloso que escolhe primeiro os objetos com melhor razão $v/w$?',
    answer: {
      kind: 'self',
      checklist: [
        'A tabela tem melhor valor $10$ na célula final.',
        'Há duas soluções ótimas: objetos $\\{2,3\\}$ ou $\\{1,4\\}$.',
        'A gulosa devolve $9$, escolhendo os dois primeiros objetos.',
      ],
    },
    solution:
      'Ótimo de programação dinâmica: $10$ (objetos 2 e 3, ou 1 e 4). Gulosa: $9$.',
    reasoning:
      'A tabela (capacidades 0 a 10) dá: objeto 1: $0,0,0,0,4,4,4,4,4,4,4$; objeto 2: $0,0,0,0,4,5,5,5,5,9,9$; objeto 3: $0,0,0,0,4,5,5,5,5,9,10$; objeto 4: $0,0,0,0,4,5,6,6,6,6,10$. Todas as razões $v/w$ valem 1, logo a gulosa escolhe os dois primeiros objetos e obtém $4+5=9$, abaixo do ótimo 10.',
    explanation: link.mochila,
  },
  {
    id: 'da-mt2-2024-q3',
    title: 'Pertença de uma cadeia a uma gramática com o algoritmo CYK',
    source: 'Recurso T2, 2024/25',
    topic: 'dinamica',
    prompt:
      'Considere a gramática em forma normal de Chomsky com símbolo inicial $S$, não terminais $\\{S,A,B\\}$, terminais $\\{a,b\\}$ e produções $S\\to AB$, $A\\to BA \\mid a$, $B\\to AB \\mid b$. Usando a recorrência de programação dinâmica $S_{i,j}=\\{A\\to BC : B\\in S_{i,k},\\ C\\in S_{i+k,j-k},\\ 1\\le k<j\\}$, mostre que a cadeia «baab» pertence à linguagem da gramática. Discuta a complexidade temporal e espacial de uma implementação direta deste método em função do número de caracteres da entrada.',
    answer: {
      kind: 'self',
      checklist: [
        'A tabela CYK tem $S$ na célula da cadeia completa «baab».',
        'Uma derivação possível é $S\\Rightarrow AB\\Rightarrow BAB\\Rightarrow bAB\\Rightarrow baB\\Rightarrow baAB\\Rightarrow baaB\\Rightarrow baab$.',
        'A complexidade temporal é $O(n^3)$ e a espacial $O(n^2)$ para uma gramática fixa.',
      ],
    },
    solution: '«baab» pertence a $L(G)$, pois a célula $S_{1,4}$ contém $S$.',
    reasoning:
      'Células de comprimento 1: $S_{1,1}=\\{B\\}$, $S_{2,1}=\\{A\\}$, $S_{3,1}=\\{A\\}$, $S_{4,1}=\\{B\\}$. Comprimento 2: $S_{1,2}=\\{A\\}$ (por $A\\to BA$), $S_{3,2}=\\{S,B\\}$ (por $S\\to AB$ e $B\\to AB$). Comprimento 3: $S_{2,3}=\\{S,B\\}$ (por $S\\to AB$ e $B\\to AB$ com $S_{2,1}=\\{A\\}$, $S_{3,2}=\\{S,B\\}$). Comprimento 4: $S_{1,4}$ usa a divisão $k=2$: $S_{1,2}=\\{A\\}$ e $S_{3,2}=\\{S,B\\}$, donde $S\\to AB$ e $B\\to AB$, obtendo $S_{1,4}=\\{S,B\\}$. Como $S\\in S_{1,4}$, a cadeia pertence à linguagem. Uma derivação completa é $S\\Rightarrow AB\\Rightarrow BAB\\Rightarrow bAB\\Rightarrow baB\\Rightarrow baAB\\Rightarrow baaB\\Rightarrow baab$. O método preenche uma tabela triangular de $O(n^2)$ células, cada uma com $O(n)$ divisões, pelo que o tempo é $O(n^3)$ para gramática fixa e o espaço é $O(n^2)$.',
    explanation: link.cyk,
  },
];

export const mt2Retrocesso: ExamQuestion[] = [
  {
    id: 'da-mt2-2024-q4',
    title: 'Poda da árvore de estados na soma de subconjuntos',
    source: 'Teste 2, 2024/25',
    topic: 'retrocesso',
    prompt:
      'No problema da soma de subconjuntos, usa-se uma função de poda para decidir se um estado deve continuar a ser explorado. Considere a instância $S=\\{5,10,12,13,15,18\\}$ e $M=33$. O estado em que os dois primeiros elementos são escolhidos ($x_1=1$, $x_2=1$, soma 15) pode ser podado? Justifique. Mostre a subárvore podada (restrita a $x_1=1$, $x_2=1$) e determine quantos estados dessa subárvore ficam por explorar, supondo que se procura todas as soluções.',
    answer: {
      kind: 'self',
      checklist: [
        'O nó com soma 15 não é podado, pois $15\\le 33$.',
        'São podados os nós com somas 27 e 28, pois o próximo elemento já faz ultrapassar 33.',
        'Dos 31 nós da subárvore, apenas 9 são visitados; a única solução é $x=(1,1,0,0,0,1)$.',
      ],
    },
    solution:
      'Não se poda o nó de soma 15. Na subárvore ficam 22 estados por explorar (9 visitados de 31). Solução: $x=(1,1,0,0,0,1)$, com soma $5+10+18=33$.',
    reasoning:
      'Como a soma parcial 15 ainda não ultrapassa $M=33$, o nó não pode ser podado. Já o nó $(1,1,1)$ tem soma 27 e o próximo elemento vale pelo menos 13, logo $27+13=40>33$: é podado. O nó $(1,1,0,1)$ tem soma 28 e o próximo elemento vale 15, logo $28+15=43>33$: também é podado. Restam os nós $(1,1,0,0)$ (soma 15), $(1,1,0,0,1)$ (soma 30, podado pois $30+18>33$), $(1,1,0,0,0)$ e as duas folhas, num total de 9 nós visitados entre os 31 nós da subárvore (15 internos e 16 folhas). A única solução encontrada é $x=(1,1,0,0,0,1)$.',
    explanation: link.podas,
  },
];

export const mt2Aproximacao: ExamQuestion[] = [
  {
    id: 'da-mt2-2024-q5',
    title: 'Redução de ciclo hamiltoniano para TSP e não aproximabilidade',
    source: 'Teste 2, 2024/25',
    topic: 'aproximacao',
    prompt:
      'Mostre que não é possível uma aproximação polinomial de razão fixa para o problema do caixeiro-viajante (TSP) geral, salvo se $P=NP$, descrevendo uma redução polinomial do problema do ciclo hamiltoniano para o TSP. Mostre que a redução é polinomial quanto ao tamanho da instância de entrada e explique por que um algoritmo de aproximação polinomial para o TSP permitiria resolver o ciclo hamiltoniano em tempo polinomial.',
    answer: {
      kind: 'self',
      checklist: [
        "A redução cria um grafo completo $G'$ com pesos 1 nas arestas de $G$ e $\\rho N+1$ nas restantes.",
        "Há ciclo hamiltoniano em $G$ se e só se o TSP em $G'$ tem custo $N$.",
        'Um algoritmo de razão $p(n)$ permitiria distinguir os dois casos em tempo polinomial, logo $P=NP$.',
      ],
    },
    solution:
      'Redução: $w(u,v)=1$ se $(u,v)\\in E$ e $w(u,v)=\\rho N+1$ caso contrário, com $\\rho>1$.',
    reasoning:
      "Dado um grafo conexo $G$ com $N$ nós, constrói-se $G'$ completo com pesos 1 nas arestas existentes e $\\rho N+1$ nas que não existem. Se $G$ tem ciclo hamiltoniano, esse ciclo tem custo $N$ em $G'$. Se não tem, qualquer circuito em $G'$ usa pelo menos uma aresta de peso $\\rho N+1$, tendo custo superior a $\\rho N+1>N$. A construção cria no máximo $N^2$ arestas, logo é polinomial. Se existisse um algoritmo de aproximação de razão polinomial $p(n)$, ele devolveria um circuito de custo $\\le p(n)\\cdot N$ quando existe ciclo hamiltoniano, que para $\\rho>p(n)$ é menor que $\\rho N+1$; assim, distinguir os dois casos decidiria o ciclo hamiltoniano em tempo polinomial.",
    explanation: link.garantia,
  },
  {
    id: 'da-mt2-2023-q6',
    title: 'Cobertura de vértices: pior caso numa estrela',
    source: 'Teste 2, 2023/24',
    topic: 'aproximacao',
    prompt:
      'Considere o algoritmo de 2-aproximação para a cobertura de vértices que escolhe repetidamente uma aresta entre dois vértices ainda não cobertos. Mostre que, numa estrela com $n$ nós (todos ligados a um nó central), este algoritmo atinge o pior caso de ficar a um fator 2 do ótimo. Qual é o número de iterações do algoritmo?',
    answer: {
      kind: 'self',
      checklist: [
        'O algoritmo devolve uma cobertura com 2 vértices.',
        'O ótimo é o nó central, com 1 vértice.',
        'O número de iterações é $n-1$.',
      ],
    },
    solution:
      'Cobertura devolvida: 2 vértices (fator 2 sobre o ótimo 1). Iterações: $n-1$.',
    reasoning:
      'Numa estrela com $n$ nós há $n-1$ arestas, todas incidentes no nó central. O algoritmo escolhe uma aresta de cada vez; como as arestas escolhidas não partilham extremidades além do centro, em cada iteração apenas uma aresta nova é eliminada, pelo que são precisos $n-1$ passos. O conjunto dos dois extremos de uma última aresta forma uma cobertura de 2 vértices, enquanto o nó central, sozinho, cobre todas as arestas: o rácio é 2, o pior caso do algoritmo.',
    explanation: link.coberturaVertices,
  },
  {
    id: 'da-mt2-2022-q7',
    title: 'Cobertura de conjuntos: gulosa versus ótimo',
    source: 'Recurso T2, 2022/23',
    topic: 'aproximacao',
    prompt:
      'Considere uma instância do problema da cobertura de conjuntos com 8 conjuntos $s_1,\\dots,s_8$ sobre um universo de 32 pontos, em que $s_7$ e $s_8$ cobrem, juntos, todo o universo, e em que a cada passo de seleção os conjuntos ainda disponíveis empatam no número de pontos ainda por cobrir. Indique a cobertura devolvida pela heurística gulosa que escolhe o conjunto que cobre mais pontos por cobrir (com desempate pelo menor identificador), a cobertura ótima desta instância e o rácio entre as duas.',
    answer: {
      kind: 'self',
      checklist: [
        'A gulosa devolve $\\{s_1,s_2,s_3,s_4,s_5,s_6\\}$, com 6 conjuntos.',
        'A cobertura ótima é $\\{s_7,s_8\\}$, com 2 conjuntos.',
        'O rácio gulosa/ótimo é 3.',
      ],
    },
    solution:
      'Gulosa: $\\{s_1,\\dots,s_6\\}$ (6 conjuntos). Ótimo: $\\{s_7,s_8\\}$ (2 conjuntos). Rácio 3.',
    reasoning:
      'Como há sempre empate no número de pontos por cobrir, o desempate pelo menor identificador faz a gulosa escolher $s_1$, depois $s_2$, e assim sucessivamente até $s_6$, num total de 6 conjuntos. Os conjuntos $s_7$ e $s_8$ cobrem sozinhos os 32 pontos, pelo que a cobertura ótima tem 2 conjuntos. O rácio $6/2=3$ mostra que a heurística gulosa pode afastar-se do ótimo neste problema.',
    explanation: link.coberturaConjuntos,
  },
  {
    id: 'da-mt2-2023-q8',
    title: 'TSP: algoritmo da MST com pré-ordem sem garantia neste problema',
    source: 'Recurso T2, 2023/24',
    topic: 'aproximacao',
    prompt:
      'Considere um problema de sequenciamento de tarefas modelado por um grafo completo em que cada aresta indica o tempo que uma tarefa demora consoante a tarefa seguinte, começando e terminando na tarefa 0. O algoritmo que calcula a árvore de cobertura mínima a partir do nó 0 e percorre a árvore em pré-ordem devolve o percurso $0\\to1\\to2\\to4\\to3\\to0$ com custo 18, enquanto o percurso ótimo $0\\to2\\to4\\to1\\to3\\to0$ tem custo 12. Este algoritmo garante alguma razão de aproximação neste problema? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'O algoritmo devolve custo 18 contra o ótimo 12.',
        'Não há garantia de aproximação, pois os pesos não respeitam necessariamente a inequação triangular.',
        'A garantia de fator 2 exige pesos métricos.',
      ],
    },
    solution:
      'Custo do algoritmo: 18; ótimo: 12. Sem garantia de razão fixa, por falta da inequação triangular.',
    reasoning:
      'O algoritmo da 2-aproximação para o TSP métrico garante fator 2 porque os pesos respeitam a inequação triangular, permitindo atalhar arestas repetidas. Neste problema, o tempo de uma tarefa depende da tarefa seguinte, pelo que arestas com a mesma origem podem ter pesos diferentes consoante o destino e a inequação triangular pode falhar. Sem essa condição, o custo 18 do algoritmo não fica limitado por qualquer fator do ótimo 12.',
    explanation: link.tsp,
  },
];

export const mt2NP: ExamQuestion[] = [
  {
    id: 'da-mt2-2023-q9',
    title: 'Redução de CLIQUE para cobertura de vértices',
    source: 'Teste 2, 2023/24',
    topic: 'np-completude',
    prompt:
      'Sabendo que CLIQUE é NP-completo, mostre que a cobertura de vértices (Vertex-Cover) também é NP-completa: mostre primeiro que o problema está em NP e descreva uma redução polinomial de CLIQUE para Vertex-Cover, argumentando que é polinomial quanto ao tamanho da representação do grafo de entrada.',
    answer: {
      kind: 'self',
      checklist: [
        'Vertex-Cover está em NP: basta verificar em $O(V+E)$ se cada aresta tem uma extremidade na cobertura candidata.',
        'A redução usa o grafo complementar $\\bar G$: $G$ tem clique de tamanho $k$ se e só se $\\bar G$ tem cobertura de $|V|-k$ vértices.',
        'A construção do complementar é polinomial no número de nós e arestas.',
      ],
    },
    solution:
      'Redução: $G$ tem clique de tamanho $k$ se e só se $\\bar G$ tem cobertura de $|V|-k$ vértices.',
    reasoning:
      "Para mostrar que Vertex-Cover está em NP, dado um subconjunto $V'$ de vértices, basta verificar para cada aresta $(u,v)$ se $u\\in V'$ ou $v\\in V'$, o que demora $O(V+E)$. Para a redução, dado $G=(V,E)$, constrói-se o complementar $\\bar G$ com os mesmos vértices e arestas onde não havia. Um conjunto $C$ é clique em $G$ se e só se $V\\setminus C$ é cobertura de vértices em $\\bar G$: toda a aresta de $\\bar G$ tem pelo menos uma extremidade fora de $C$, ou seja, não liga dois vértices de $C$. Assim, $G$ tem clique de tamanho $k$ se e só se $\\bar G$ tem cobertura de tamanho $|V|-k$. O complementar tem no máximo $|V|^2$ arestas, logo a transformação é polinomial.",
    explanation: link.cliqueCobertura,
  },
  {
    id: 'da-mt2-2022-q10',
    title: 'Redução de conjunto independente para clique',
    source: 'Recurso T2, 2022/23',
    topic: 'np-completude',
    prompt:
      "Desenvolva uma redução polinomial do problema do conjunto independente (Independent Set) para o problema da clique (Clique). Num grafo, um conjunto de nós é independente se não há arestas diretas entre eles; uma clique é um conjunto de nós todos ligados entre si. Dado $G=(V,E)$ e $k$, o problema da clique pergunta se $G$ contém uma clique de tamanho $\\ge k$; dado $G'=(V',E')$ e $k'$, o conjunto independente pergunta se $G'$ contém um conjunto independente de tamanho $\\ge k'$. Forneça um exemplo ilustrativo com grafos de pelo menos 5 nós e $k=3$, e argumente por que a redução está correta.",
    answer: {
      kind: 'self',
      checklist: [
        "A redução constrói $G'$ como o complementar de $G$, com o mesmo $k$.",
        "Um conjunto é clique em $G$ se e só se é independente em $G'$.",
        'O exemplo com 5 nós e $k=3$ mostra a correspondência.',
      ],
    },
    solution:
      "$G'$ = complementar de $G$, com $k'=k$: $G$ tem clique de tamanho $k$ se e só se $G'$ tem conjunto independente de tamanho $k$.",
    reasoning:
      "Se $C$ é clique em $G$, todas as arestas entre os nós de $C$ existem em $G$ e, portanto, nenhuma existe em $G'$, logo $C$ é independente em $G'$. Reciprocamente, se $C$ é independente em $G'$, não há arestas de $G'$ entre os nós de $C$, ou seja, todas as pares de nós de $C$ estão ligados em $G$, logo $C$ é clique. A construção do complementar é polinomial, pelo que a redução é válida.",
    explanation: link.reducao,
  },
  {
    id: 'da-mt2-2024-q11',
    title: 'ILP é NP-completo por redução de 3-CNF-SAT',
    source: 'Recurso T2, 2024/25',
    topic: 'np-completude',
    prompt:
      'Mostre que o problema de programação linear inteira (ILP) é NP-completo, descrevendo e justificando a correção e a complexidade temporal de uma redução de 3-CNF-SAT para ILP. Mostre primeiro que o ILP está em NP e descreva a construção das variáveis e restrições da redução.',
    answer: {
      kind: 'self',
      checklist: [
        'ILP está em NP: basta adivinhar o vetor inteiro e verificar as restrições em tempo polinomial.',
        'Cada variável booleana $x_i$ corresponde a uma variável inteira $z_i$ com $0\\le z_i\\le 1$.',
        'Cada cláusula $(x_1\\lor\\lnot x_2\\lor x_3)$ dá a restrição $z_1+(1-z_2)+z_3\\ge 1$.',
      ],
    },
    solution:
      'Redução: $z_i\\in\\{0,1\\}$ e, por cada cláusula, a restrição soma dos literais (com $1-z_i$ para literais negados) é pelo menos 1.',
    reasoning:
      'Para a versão de decisão do ILP, basta «adivinhar» o vetor inteiro $\\vec x$, avaliar a função objetivo e verificar as restrições, o que é polinomial; logo ILP está em NP. Dada uma fórmula 3-CNF-SAT com variáveis $x_1,\\dots,x_n$, definem-se variáveis inteiras $z_1,\\dots,z_n$ com $0\\le z_i\\le 1$, onde $z_i=1$ representa $x_i=$ verdadeiro. Cada cláusula como $(x_1\\lor\\lnot x_2\\lor x_3)$ transforma-se na restrição $z_1+(1-z_2)+z_3\\ge 1$: para a satisfazer, pelo menos um dos termos tem de ser positivo, o que corresponde a tornar verdadeiro pelo menos um dos literais da cláusula. A fórmula é satisfazível se e só se o ILP resultante tem solução inteira, e a construção tem um número polinomial de variáveis e restrições.',
    explanation: link.ilpNP,
  },
];

export const mt2Linear: ExamQuestion[] = [
  {
    id: 'da-mt2-2024-q12',
    title: 'PL de duas variáveis: forma slack, região e ótimo inteiro',
    source: 'Teste 2, 2024/25',
    topic: 'pl-inteira',
    prompt:
      'Considere o problema linear $\\max\\;-2x_1-x_2$ sujeito a $x_1+x_2\\le 4$, $2x_1-x_2\\le 2$ e $x_1,x_2\\ge 0$. Converta-o para a forma slack, determine graficamente se é exequível e limitado, indique a solução ótima do PL e a solução ótima da variante inteira (ILP) deste problema.',
    answer: {
      kind: 'self',
      checklist: [
        'Forma slack: $x_3=4-x_1-x_2$, $x_4=2-2x_1+x_2$, com todas as variáveis $\\ge 0$.',
        'O problema é exequível e limitado; o ótimo do PL é $(0,0)$ com valor 0.',
        'A solução ótima do ILP coincide: $(0,0)$ com valor 0.',
      ],
    },
    solution: 'Ótimo do PL e do ILP: $(x_1,x_2)=(0,0)$, valor $0$.',
    reasoning:
      'Introduzindo as variáveis de folga, obtém-se $x_3=4-x_1-x_2$ e $x_4=2-2x_1+x_2$. Como ambos os coeficientes da função objetivo são negativos, o máximo ocorre na origem: $(0,0)$, com valor 0, que é também inteiro, pelo que é a solução ótima do ILP. A região é um polígono fechado (interseção de duas semiplanos com o primeiro quadrante), logo o problema é exequível e limitado.',
    explanation: link.formaStandard,
  },
  {
    id: 'da-mt2-2023-q13',
    title: 'PL e ILP: arredondar a solução fracionária não serve',
    source: 'Recurso T2, 2023/24',
    topic: 'pl-inteira',
    prompt:
      'Considere o problema $\\min\\;-2y$ sujeito a $x-y\\ge 0$, $-x-y\\ge -5$ e $x,y\\ge 0$. Converta-o para a forma standard e para a forma slack, determine graficamente se é exequível e limitado, e indique a solução ótima do PL com o valor da função objetivo. Para a variante inteira, indique a solução ótima e explique por que arredondar a solução do PL para o inteiro mais próximo não produz uma solução exequível.',
    answer: {
      kind: 'self',
      checklist: [
        'Forma standard: $\\max\\;2y$ com $-x+y\\le 0$ e $x+y\\le 5$.',
        'O PL é exequível e limitado; o ótimo é $(2{,}5,2{,}5)$ com valor 5 (na maximização).',
        'O ILP ótimo é $(2,2)$ ou $(3,2)$, com valor 4; arredondar para $(3,3)$ dá ponto infezível.',
      ],
    },
    solution:
      'PL: $(x,y)=(2{,}5,2{,}5)$, valor 5 em $\\max\\;2y$. ILP: $(2,2)$ ou $(3,2)$, valor 4.',
    reasoning:
      'Passando a minimização de $-2y$ para maximização de $2y$ e multiplicando as restrições por $-1$, obtém-se $-x+y\\le 0$ e $x+y\\le 5$. A região exequível é o triângulo com vértices $(0,0)$, $(5,0)$ e $(2{,}5,2{,}5)$; como se maximiza $2y$, o ótimo é $(2{,}5,2{,}5)$ com valor 5. No ILP, $y$ inteiro fica limitado por $y\\le 2$ (pois $x\\ge y$ e $x+y\\le 5$), pelo que o ótimo é $(2,2)$ ou $(3,2)$ com valor 4. Arredondar $(2{,}5,2{,}5)$ daria $(3,3)$, que viola $x+y\\le 5$, logo não é exequível.',
    explanation: link.arredondar,
  },
  {
    id: 'da-mt2-2022-q14',
    title: 'Formular e resolver um problema de exame como PL',
    source: 'Recurso T2, 2022/23',
    topic: 'pl-inteira',
    prompt:
      'Vai fazer um exame com 10 questões dissertativas (20 pontos cada, 10 minutos cada) e 50 questões de escolha múltipla (5 pontos cada, 2 minutos cada), dispondo de 90 minutos. Deve responder a pelo menos 3 dissertativas e pelo menos 10 de escolha múltipla, e quer maximizar os pontos. Formule o problema como programação linear, com $x$ o número de questões de escolha múltipla e $y$ o de dissertativas, e determine graficamente a solução ótima e o valor ótimo.',
    answer: {
      kind: 'self',
      checklist: [
        'O modelo é $\\max\\;5x+20y$ sujeito a $2x+10y\\le 90$, $10\\le x\\le 50$, $3\\le y\\le 10$.',
        'Os vértices relevantes são $(10,3)$, $(10,7)$ e $(30,3)$.',
        'A solução ótima é $x=30$, $y=3$, com valor 210 pontos.',
      ],
    },
    solution:
      'Ótimo: 30 questões de escolha múltipla e 3 dissertativas, num total de 210 pontos.',
    reasoning:
      'As restrições são $2x+10y\\le 90$ (tempo), $x\\ge 10$, $x\\le 50$, $y\\ge 3$, $y\\le 10$. Os vértices da região exequível com interesse são $(10,3)$, $(10,7)$ e $(30,3)$ (o vértice $(30,3)$ vem de $2x+10y=90$ com $y=3$). Os valores da função objetivo são 60, 190 e 210, respetivamente. O máximo é 210, com 30 questões de escolha múltipla e 3 dissertativas.',
    explanation: link.modelar,
  },
  {
    id: 'da-mt2-2024-q15',
    title: 'Branch and bound: poda, limites e ordem de exploração',
    source: 'Teste 2, 2024/25',
    topic: 'pl-inteira',
    prompt:
      'Considere a árvore de exploração de um ILP com variáveis $x_1,x_2,x_3$, explorada em profundidade (DFS) por branch and bound. O nó raiz $n_1$ tem solução $z=40{,}285$; o nó $n_2$ (ramo $x_1\\le 4$) tem $z=31$; o nó $n_5$ (ramo $x_3\\ge 1$ de $n_3$) tem $z=29$; o nó $n_4$ tem solução inteira $z=28$; o nó $n_7$ tem solução inteira $z=26$; o nó $n_{11}$ (ramo $x_1\\ge 5$) tem solução inteira $z=38$; os nós $n_8$, $n_9$ e $n_{10}$ são infezíveis. Responda: (1) Por que se abandona a exploração no nó $n_7$? (2) O valor de $z$ no nó $n_6$ poderia ser 30? Porquê? (3) Que nós seriam explorados numa exploração em largura (BFS)? Porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'Em $n_7$ há solução inteira 26 e já existe incidente 28, logo a subárvore de $n_7$ não pode melhorar.',
        'Em $n_6$, $z$ não pode ser 30 porque está abaixo de $n_5$, onde $z=29$.',
        'Em BFS exploram-se $n_1$, $n_2$ e $n_{11}$; como $n_{11}$ é inteiro com 38 e $n_2$ vale 31, o resto pode ser podado.',
      ],
    },
    solution:
      'n7: podado por incumbent 28 > 26. n6: z ≤ 29, logo não pode ser 30. BFS: n1, n2, n11.',
    reasoning:
      '(1) Ao chegar a $n_7$ já existe uma solução inteira com valor 28 (em $n_4$) e, como se maximiza, todos os nós abaixo de $n_7$ têm valor $\\le 26$; a exploração abaixo de $n_7$ é abandonada. (2) O nó $n_6$ está abaixo de $n_5$, onde a relaxação linear vale 29, pelo que qualquer solução inteira abaixo de $n_5$ vale no máximo 29; 30 é impossível. (3) Em BFS exploram-se primeiro $n_1$, depois os filhos $n_2$ e $n_{11}$. Como $n_{11}$ é inteiro com 38 e $n_2$ só vale 31, todos os nós abaixo de $n_2$ ficam com valor $\\le 31<38$ e podem ser podados de imediato.',
    explanation: link.branchBound,
  },
];

export const mt2Caminhos: ExamQuestion[] = [
  {
    id: 'da-mt2-2023-q16',
    title: 'Algoritmo de Johnson num grafo com aresta negativa',
    source: 'Recurso T2, 2023/24',
    topic: 'caminhos',
    prompt:
      'Considere o grafo dirigido com nós $a,b,c,d$ e arestas $a\\to b$ (2), $b\\to c$ ($-1$), $c\\to d$ (1), $d\\to a$ (3), $a\\to c$ (4) e $b\\to d$ (2). Indique qual dos algoritmos de Dijkstra e Bellman-Ford é adequado para caminhos mais curtos a partir de um nó neste grafo e justifique. Aplique o algoritmo de Johnson para determinar os caminhos mais curtos do nó $a$ para todos os outros nós, mostrando os pesos reponderados não negativos. Se a aresta $d\\to a$ passasse a ter peso $-3$, o algoritmo continuaria a dar caminhos mais curtos válidos? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'Usa-se Bellman-Ford, por causa da aresta negativa $b\\to c$.',
        'Os pesos de Johnson são $h(a)=h(b)=h(d)=0$, $h(c)=-1$, e os caminhos de $a$ são $d(a,b)=2$, $d(a,c)=1$, $d(a,d)=2$.',
        'Com $d\\to a=-3$ há ciclo negativo $a\\to b\\to c\\to d\\to a$, logo Johnson deixa de se aplicar.',
      ],
    },
    solution:
      'Distâncias de $a$: $b=2$, $c=1$, $d=2$. Com $d\\to a=-3$, há ciclo negativo e o algoritmo falha.',
    reasoning:
      "Como existe uma aresta de peso negativo, Dijkstra não é adequado; Bellman-Ford trata pesos negativos. No algoritmo de Johnson, adiciona-se um nó $s$ com arestas de peso 0 para todos os nós e corre-se Bellman-Ford, obtendo $h(a)=h(b)=h(d)=0$ e $h(c)=-1$. Reponderam-se as arestas com $w'(u,v)=w(u,v)+h(u)-h(v)$: $a\\to b$ fica 2, $b\\to c$ fica 0, $c\\to d$ fica 0, $d\\to a$ fica 3, $a\\to c$ fica 5 e $b\\to d$ fica 2, todos não negativos. Dijkstra a partir de $a$ dá distâncias reponderadas 0, 2, 2, 2; voltando aos pesos originais com $d(u,v)+h(v)-h(u)$, obtém-se $d(a,b)=2$, $d(a,c)=1$, $d(a,d)=2$. Se $d\\to a=-3$, o ciclo $a\\to b\\to c\\to d\\to a$ tem peso $2-1+1-3=-1<0$, pelo que não existem caminhos mais curtos bem definidos e Johnson não se aplica.",
    explanation: link.johnson,
  },
  {
    id: 'da-mt2-2024-q17',
    title: 'Dijkstra com aresta negativa: quando funciona e quando falha',
    source: 'Recurso T2, 2024/25',
    topic: 'caminhos',
    prompt:
      'Considere o grafo dirigido com nós $A,B,C$ e arestas $A\\to B$ (2), $A\\to C$ (1) e $C\\to B$ ($-1$). A aplicação do algoritmo de Dijkstra com fonte em $A$ funciona neste grafo? Porquê? Modifique os pesos das arestas de forma a obter um exemplo em que o Dijkstra falha neste grafo, ou explique por que tal não é possível, e justifique em geral por que o Dijkstra não tolera arestas de peso negativo. Qual é a complexidade temporal do Dijkstra com um min-heap em termos do número de nós $V$ e arestas $E$?',
    answer: {
      kind: 'self',
      checklist: [
        'No grafo original funciona: $C$ sai primeiro com distância 1 e atualiza $d(A,B)$ para $1+(-1)=0$.',
        'O Dijkstra falha quando um nó é finalizado antes de ser relaxado por um caminho com aresta negativa; exemplo: $A\\to B=1$, $A\\to C=2$, $C\\to B=-2$.',
        'A complexidade com min-heap é $O((V+E)\\log V)$.',
      ],
    },
    solution:
      'No grafo original, $d(A,B)=0$ e o algoritmo acerta. Exemplo de falha: $A\\to B=1$, $A\\to C=2$, $C\\to B=-2$ (ótimo 0, Dijkstra devolve 1). Complexidade $O((V+E)\\log V)$.',
    reasoning:
      'No grafo original, depois de processar $A$, o min-heap contém $B$ com 2 e $C$ com 1; sai $C$ primeiro e relaxa $B$ para $1+(-1)=0$, que é a distância correta. O algoritmo falha quando um nó é retirado definitivamente do heap antes de todas as arestas negativas que lhe chegam serem consideradas: com $A\\to B=1$, $A\\to C=2$ e $C\\to B=-2$, o nó $B$ sai com distância 1 e é finalizado, embora o caminho $A\\to C\\to B$ tenha custo 0. Em geral, o Dijkstra assenta na monotonicidade dos pesos (todo o prefixo de um caminho mais curto é ele próprio mais curto), que deixa de valer com arestas negativas. Com min-heap, cada nó entra e sai no máximo uma vez e cada aresta pode provocar uma atualização, donde $O((V+E)\\log V)$.',
    explanation: link.negativos,
  },
];
