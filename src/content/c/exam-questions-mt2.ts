import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  registos: '/cadeiras/c/ambientes-execucao/#registos-de-uma-chamada-recursiva',
  blocos: '/cadeiras/c/codigo-intermedio/#blocos-básicos-e-grafo-de-fluxo',
  dominadores: '/cadeiras/c/codigo-intermedio/#dominância-e-ciclos-naturais',
  coloracao: '/cadeiras/c/geracao-codigo/#alocação-por-coloração',
  webs: '/cadeiras/c/otimizacao-codigo/#definições-usos-e-webs',
  fluxo: '/cadeiras/c/otimizacao-codigo/#análise-de-fluxo-de-dados',
  licm: '/cadeiras/c/otimizacao-codigo/#propagação-dobramento-e-código-morto',
};

export const mt2Ambientes: ExamQuestion[] = [
  {
    id: 'c-mt2-2023-q1',
    title: 'Por que a recursão obriga a registos de ativação numa pilha',
    source: 'Teste 2, 2022/23',
    topic: 'ambientes',
    prompt:
      'Em linguagens que suportam recursão, por que é que os registos de ativação (AR) têm de ser alocados numa pilha? Que informação têm de capturar e porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que o AR guarda o endereço de retorno e o apontador de frame do chamador.',
        'A resposta refere o access link para aceder a variáveis não locais em procedimentos aninhados.',
        'A resposta conclui que a ordem LIFO de ativações e desativações exige uma pilha.',
      ],
    },
    solution:
      'O AR regista o ambiente de execução de um procedimento: endereço de retorno, apontador de frame do procedimento que chamou o corrente, access link (para aceder a variáveis não locais em linguagens com procedimentos aninhados) e parâmetros atuais. Como cada nova chamada cria uma nova ativação e a desativação segue a ordem inversa (LIFO), os ARs têm de viver numa pilha.',
    reasoning:
      'Numa chamada recursiva, cada invocação ativa precisa do seu próprio AR com as suas variáveis locais; quando a chamada mais recente termina, o seu AR é libertado primeiro, o que corresponde exatamente ao comportamento de uma pilha.',
    explanation: link.registos,
  },
  {
    id: 'c-mt2-2023-q2',
    title: 'Variáveis locais, offsets e tabela de símbolos',
    source: 'Teste 2, 2022/23',
    topic: 'ambientes',
    prompt:
      'Onde ficam alocadas as variáveis locais de um procedimento em memória? Explique o mecanismo de acesso em tempo de execução e a ligação entre a informação da tabela de símbolos e esse mecanismo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que ficam a offsets fixos a partir do stack pointer, dentro do AR.',
        'A resposta explica o acesso indireto do tipo rx = offset(sp).',
        'A resposta liga os offsets à tabela de símbolos, calculados pelo compilador durante a análise do código.',
      ],
    },
    solution:
      'As variáveis locais ficam em offsets específicos a partir do stack pointer (sp), dentro do AR. O compilador gera acessos indiretos da forma rx = offset(sp) para ler e offset(sp) = rx para escrever. Os offsets são calculados pelo compilador ao analisar o código do procedimento e guardados na tabela de símbolos, ficando cada variável local conhecida pelo seu offset no AR corrente.',
    reasoning:
      'Numa função recursiva, cada invocação tem o seu próprio AR na pilha, pelo que existem múltiplas instâncias das variáveis locais, uma por ativação, todas endereçadas pelo mesmo offset relativo ao sp da respetiva frame.',
    explanation: link.registos,
  },
  {
    id: 'c-mt2-2024-q1',
    title: 'Registo de ativação sem recursão',
    source: 'Teste 2, 2023/24',
    topic: 'ambientes',
    prompt:
      'Numa linguagem que não suporta recursão, continua a ser necessário ter um registo de ativação numa pilha? Porquê ou por que não? Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta reconhece que o AR continua a ser necessário.',
        'A resposta justifica que é preciso guardar o endereço de retorno e a informação das variáveis locais.',
        'A resposta conclui que, sem recursão, não é necessária uma pilha.',
      ],
    },
    solution:
      'Continua a ser necessário um registo de ativação para guardar o endereço de retorno e a informação das variáveis locais, mas como não há recursão não é necessária uma pilha: basta uma localização estática por procedimento.',
    reasoning:
      'Sem recursão, no máximo existe uma ativação ativa de cada procedimento, pelo que um único local estático por procedimento chega. Ainda assim, é preciso guardar e restaurar o endereço de retorno de cada chamada.',
    explanation: link.registos,
  },
  {
    id: 'c-mt2-2022r-q1',
    title: 'Access links em procedimentos aninhados',
    source: 'Recurso do Teste 2, 2021/22',
    topic: 'ambientes',
    definitions: `01: procedure main
02:   integer a, b, c;
03:   procedure f1(a,b);
04:      integer a, b;
05:      call f2(0,b,a);
06:   end;
07:   procedure f2(x,y,z);
08:      integer x, y, z;
09:      procedure f3(m,n);
10:         integer m, n;
11:        ...
12:      end;
13:      procedure f4(m,n);
14:        integer m, n;
15:         ...
16:      end;
17:      call f3(y,z);
18:      call f4(c,x);
19:   end;
20: ...
21: call f1(a,b);
22: end;`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o código Pascal acima, em que `f3` e `f4` são procedimentos locais de `f2`. Indique quais as variáveis usadas como valores reais dos parâmetros nas chamadas das linhas 17 e 18. Quando o controlo chega à linha 11 (dentro de `f3`), desenhe a pilha de registos de ativação com os respetivos access links e explique como o compilador gera código para aceder, no corpo de `f3`, à variável local `x` de `f2`.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que a chamada de linha 17 usa y e z, variáveis locais de f2.',
        'A resposta indica que a chamada de linha 18 usa c (local de main) e x (local de f2).',
        'O desenho mostra a pilha main → f1 → f2 → f3, com o access link de f3 a apontar para o AR de f2.',
        'A explicação refere o acesso a x como offset negativo a partir do access link (dois níveis de frames).',
      ],
    },
    solution:
      'Linha 17: `call f3(y,z)` usa as variáveis locais y e z de f2. Linha 18: `call f4(c,x)` usa c, local de main, e x, local de f2. Na linha 11, a pilha contém os AR de main, f1, f2 e f3; o access link de f3 aponta para o AR de f2 (o seu frame imediatamente exterior). Para aceder a x no corpo de f3, o compilador segue o access link de f3 até ao AR de f2 e aplica-lhe o offset de x nesse AR.',
    reasoning:
      'Em Pascal, um procedimento aninhado acede às variáveis não locais através de access links que formam uma cadeia estática. Como f3 está declarado dentro de f2, o seu access link aponta para o AR de f2, e x é alcançado nesse AR pelo offset que a tabela de símbolos lhe atribuiu.',
    explanation: link.registos,
  },
];

export const mt2Grafos: ExamQuestion[] = [
  {
    id: 'c-mt2-2023-q3',
    title: 'Blocos básicos e grafo de fluxo',
    source: 'Teste 2, 2022/23',
    topic: 'grafos',
    definitions: `00  a = arg0
01  b = arg1
02  if a == b goto L1
03  b = b + 1
04  goto L2
05 L1: a = a + 1
06 L2: d = b + a
07  c = a + 1
08  d = c + 2
09  ret d`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o código de três endereços acima, de uma função com 2 argumentos e variáveis locais a, b, c e d. Determine os blocos básicos e o grafo de fluxo de controlo (CFG), indicando para cada bloco básico os números de linha correspondentes.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica 4 blocos básicos: BB1 (00-02), BB2 (03-04), BB3 (05), BB4 (06-09).',
        'O grafo tem arestas BB1→BB2 e BB1→BB3 (pelo salto condicional), BB2→BB4 e BB3→BB4.',
      ],
    },
    solution:
      'BB1: linhas 00-02; BB2: linhas 03-04; BB3: linha 05; BB4: linhas 06-09. O CFG tem arestas BB1→BB2 (a≠b), BB1→BB3 (a==b), BB2→BB4 e BB3→BB4.',
    reasoning:
      'Um líder é a primeira instrução, uma instrução alvo de salto ou a instrução a seguir a um salto. Os líderes são as linhas 00, 03, 05 e 06, o que define os quatro blocos; as arestas seguem os saltos condicionais e incondicionais.',
    explanation: link.blocos,
  },
  {
    id: 'c-mt2-2024-q2',
    title: 'Blocos básicos e árvore de dominadores',
    source: 'Teste 2, 2023/24',
    topic: 'grafos',
    definitions: `00  a = arg0
01  b = arg1
02  c = 20
03  if (a == b) goto L1
04 L0: b = b + 1
05  if (b > 1) goto L2
06  goto L3
07 L3: a = a + 1
08  if (a < c) goto L0
09  goto L2
10 L1: a = 0
11 L2: d = b + a
12  c = a + 1
13  d = c + 1
14  ret d`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o código de três endereços acima. Determine os blocos básicos e o grafo de fluxo de controlo, e desenhe a respetiva árvore de dominadores.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica 7 blocos básicos: BB1 (00-03), BB2 (04-05), BB3 (06), BB4 (07-08), BB5 (09), BB6 (10), BB7 (11-14).',
        'A árvore de dominadores tem BB1 como raiz, com filhos BB2, BB3 e BB6; BB2 tem filhos BB4 e BB5; e BB7 é filho de BB2, BB3, BB4, BB5 e BB6.',
      ],
    },
    solution:
      'Blocos básicos: BB1 (00-03), BB2 (04-05), BB3 (06), BB4 (07-08), BB5 (09), BB6 (10), BB7 (11-14). Dominadores: BB1 domina todos; BB2 domina BB3, BB4, BB5, BB7; BB6 só é dominado por BB1; BB7 é dominado por BB1, BB2, BB3, BB4, BB5 e BB6. Na árvore, BB1 tem como filhos BB2 e BB6; BB2 tem como filhos BB3 e BB5; BB3 e BB5 têm como filho BB4 (BB4 também é alcançado por BB3); todos os ramos terminam em BB7.',
    reasoning:
      'Os líderes são as linhas 00, 04, 06, 07, 09, 10 e 11. Um bloco B domina outro se todos os caminhos da entrada até esse bloco passam por B: o ciclo 04-08 (BB2→BB4→BB2) faz com que BB2 domine o ciclo inteiro, e BB7, por ser o ponto de junção de todos os caminhos, só é dominado por quem domina todos os seus predecessores.',
    explanation: link.dominadores,
  },
  {
    id: 'c-mt2-2022-q1',
    title: 'Dominadores, arco de retorno e ciclo natural',
    source: 'Teste 2, 2021/22',
    topic: 'grafos',
    definitions: `01: t1 = 0
02: t0 = p1
03: t2 = 0
04: t1 = p2
05: if (t1 > 0) goto L1
06: t1 = t0
07: t0 = 1
08: t2 = 0
09 L1: t1 = t0
10: t4 = t0
11: if (t2 > t4) goto L2
12: t2 = t2 + 1
13: goto L1
14 L2: t0 = p1
15: t3 = t0
16: t1 = t2 + t3
17: ret t1`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o código de três endereços acima. Determine os blocos básicos e o grafo de fluxo, a árvore de dominadores e os ciclos naturais (se houver), indicando o(s) arco(s) de retorno cuja cabeça domina a cauda.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica 5 blocos básicos: BB1 (01-05), BB2 (06-08), BB3 (09-11), BB4 (12-13), BB5 (14-17).',
        'O único arco de retorno é BB4→BB3 (linha 13, goto L1), cuja cabeça BB3 domina a cauda BB4.',
        'O ciclo natural é composto pelos blocos BB3 e BB4.',
      ],
    },
    solution:
      'Blocos básicos: BB1 (01-05), BB2 (06-08), BB3 (09-11), BB4 (12-13), BB5 (14-17). O único arco de retorno é BB4→BB3 (instrução 13, `goto L1`); como BB3 domina BB4, o ciclo natural correspondente é {BB3, BB4}.',
    reasoning:
      'Um arco de retorno é uma aresta cuja cabeça domina a cauda. A aresta 13→09 (BB4 para BB3) é a única que satisfaz esta condição: BB3 é o líder do bloco que contém L1 e todos os caminhos até BB4 passam por BB3. O ciclo natural desse arco é o conjunto de blocos que podem alcançar BB4 sem passar por BB3, mais o próprio BB3, ou seja, {BB3, BB4}.',
    explanation: link.dominadores,
  },
];

export const mt2Registos: ExamQuestion[] = [
  {
    id: 'c-mt2-2023-q4',
    title: 'Webs, grafos de interferência e número mínimo de registos',
    source: 'Teste 2, 2022/23',
    topic: 'registos',
    definitions: `00  a = arg0
01  b = arg1
02  if a == b goto L1
03  b = b + 1
04  goto L2
05 L1: a = a + 1
06 L2: d = b + a
07  c = a + 1
08  d = c + 2
09  ret d`,
    definitionsLanguage: 'text',
    prompt:
      'Para o código acima, determine os intervalos de vida (live ranges) das variáveis a, b, c e d, as respetivas webs e os grafos de interferência segundo as duas notions de interferência discutidas nas aulas (a menos refinada e a mais refinada, em que duas variáveis usadas na mesma linha não interferem se uma web termina nessa linha com uma leitura e a outra começa com uma escrita). Qual é o número mínimo de registos para cada grafo de interference e porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'Os live ranges são a: {0-7}, b: {1-6}, c: {7-8}, d: {6-9}.',
        'O grafo menos refinado (mais arestas) exige 3 cores, por conter um clique de tamanho 3.',
        'O grafo mais refinado exige apenas 2 cores.',
      ],
    },
    solution:
      'Live ranges: a vivo nas linhas 0-7, b nas linhas 1-6, c nas linhas 7-8 e d nas linhas 6-9. No grafo de interferência menos refinado há um clique de tamanho 3 (por exemplo a, b e d na linha 6), pelo que são precisos 3 registos. Com a notion mais refinada, em que c (leitura em 7, escrita em 8) e d (escrita em 6 e 8) não interferem na linha 8, o grafo exige apenas 2 cores, ou seja, 2 registos.',
    reasoning:
      'Duas webs interferem se estão vivas no mesmo ponto. Na linha 6, a, b e d estão simultaneamente vivas, formando um clique de 3 no grafo menos refinado. Na notion refinada, na linha 8 a web de c termina com uma leitura e a de d começa com uma escrita, pelo que não interferem, e o grafo torna-se 2-colorível.',
    explanation: link.webs,
  },
  {
    id: 'c-mt2-2024-q3',
    title: 'Webs, clique de tamanho 4 e descarga com 3 registos',
    source: 'Teste 2, 2023/24',
    topic: 'registos',
    definitions: `BB1
11: a = ...
12: b = ...
13: c = ...
14: if(Pred(a)) goto L2

BB3
15 L3: c = ...
16:    a = ...
17:    d = ...
18:    ... = a
19:    ... = c
20:    ... = b
21:    ... = d
22:    goto L4

BB2
26 L2: b = ...
27:    ... = b
28:    ... = c
29:    ... = a
30:    if (Pred(a)) goto L3

BB4
31 L4: ... = b
32:    a = ...
33:    ... = a`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o excerto de código acima, de um procedimento com as variáveis locais a, b, c e d (a referência a um predicado, como em Pred, conta como leitura). Determine as webs das 4 variáveis (indicando as cadeias def-use), o grafo de interference correspondente e o número mínimo de registos. Se tivesse um registo a menos, que variável não alocaria a registo e porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta 3 webs para a, 2 para b, 2 para c e 1 para d, com as cadeias def-use respetivas.',
        'O grafo de interference tem um clique de tamanho 4, pelo que o mínimo é 4 registos.',
        'Com 3 registos, descarrega-se a web mais curta (Wa2), obtendo coloração com 3 cores.',
      ],
    },
    solution:
      'Webs: Wa1 (def. 11, usos 14, 29), Wa2 (def. 16, usos 18, 30), Wa3 (def. 32, uso 33); Wb1 (def. 12, usos 20, 31), Wb2 (def. 26, uso 27); Wc1 (def. 13, uso 28), Wc2 (def. 15, usos 19 e 28); Wd1 (def. 17, uso 21). No bloco BB2 estão simultaneamente vivas quatro webs mutuamente interferentes (Wa1, Wa2, Wb2 e Wc2), que formam um clique de tamanho 4, pelo que o número mínimo é 4 registos. Com um registo a menos, descarrega-se a web mais curta, Wa2, e o grafo torna-se 3-colorível, com Wa2 na memória.',
    reasoning:
      'O número mínimo de registos é o número cromático do grafo de interference. Como existe um clique de tamanho 4 (quatro webs mutuamente interferentes), são precisos pelo menos 4 cores. Retirando a web mais curta (Wa2, com apenas duas instruções), o maior clique passa a ter tamanho 3 e o grafo passa a ser 3-colorível, com Wa2 na memória.',
    explanation: link.coloracao,
  },
  {
    id: 'c-mt2-2022-q2',
    title: 'Webs e coloração com 3 cores',
    source: 'Teste 2, 2021/22',
    topic: 'registos',
    definitions: `01: t1 = 0
02: t0 = p1
03: t2 = 0
04: t1 = p2
05: if (t1 > 0) goto L1
06: t1 = t0
07: t0 = 1
08: t2 = 0
09 L1: t1 = t0
10: t4 = t0
11: if (t2 > t4) goto L2
12: t2 = t2 + 1
13: goto L1
14 L2: t0 = p1
15: t3 = t0
16: t1 = t2 + t3
17: ret t1`,
    definitionsLanguage: 'text',
    prompt:
      'Para o código acima, determine os live ranges e as webs dos temporários t0 a t4 (segundo a notion refinada de interference), construa o grafo de interference e indique se é possível colori-lo com 3 cores. Assuma que, à saída do último bloco, t2 está vivo e os restantes temporários estão mortos; ignore os parâmetros p0 e p1.',
    answer: {
      kind: 'self',
      checklist: [
        'As webs são: t0: {02-14} e {15-16}; t1: {04-05} e {16-17}; t2: {03-05} e {08-16}; t3: {15-16}; t4: {10-11}.',
        'O grafo de interference tem vários cliques de tamanho 3, pelo que é colorível com 3 cores.',
        'A resposta apresenta uma atribuição possível de 3 cores às webs.',
      ],
    },
    solution:
      'Webs: t0a {02-14}, t0b {15-16}; t1a {04-05}, t1b {16-17}; t2a {03-05}, t2b {08-16}; t3 {15-16}; t4 {10-11}. O grafo de interference resultante tem vários cliques de tamanho 3 (por exemplo, na linha 16 estão vivas t0b, t1b, t2b e t3, com interferências que formam triângulos), mas nenhum clique de tamanho 4, pelo que é colorível com 3 cores. Uma coloração possível atribui, por exemplo, a cor 1 a t2a/t2b, cor 2 a t0a/t4/t3 e cor 3 a t1a/t0b/t1b, ajustando para evitar conflitos nos pontos de junção.',
    reasoning:
      'Uma variável está viva numa instrução se o seu valor pode ser usado mais tarde sem redefinição. As webs repartem-se nos pontos de redefinição (t0, t1 e t2 têm duas webs cada). Como nenhum ponto do programa tem 4 webs mutuamente interferentes, o grafo é 3-colorível e bastam 3 registos.',
    explanation: link.coloracao,
  },
  {
    id: 'c-mt2-2023-q5',
    title: 'Alocação local de registos por bloco básico',
    source: 'Teste 2, 2022/23',
    topic: 'registos',
    definitions: `BB1                          BB2
11: t0 = a + b               21: a = 0
12: t1 = c                   22: b = 2
13: t2 = t1 + t0             23: c = 0
14: c = t2                   24: goto L1
15: goto L1

BB3
31 L1: t2 = a + c
32:     b = t2`,
    definitionsLanguage: 'text',
    prompt:
      'Considere os blocos básicos acima, de um procedimento com as variáveis locais a, b e c (a offsets 0, 4 e 8 a partir de sp) e os temporários t0 a t2. Usando 4 registos (r0 a r3), derive o alocador local de registos para cada bloco, usando a forma rx = offset(sp) para leitura e offset(sp) = rx para escrita, e guardando no fim de cada bloco as variáveis modificadas. Depois comente como se pode melhorar a alocação entre blocos básicos neste caso, reutilizando registos para minimizar as operações de memória.',
    answer: {
      kind: 'self',
      checklist: [
        'A alocação por bloco carrega as variáveis para registos no início e guarda as modificadas no fim de cada bloco.',
        'A resposta identifica que c fica em registos diferentes no fim de BB1 (r3) e em BB2 (r2).',
        'A melhoria consiste em conciliar a alocação de a e c entre blocos, eliminando 4 acessos à memória em BB1, BB2 e BB3.',
      ],
    },
    solution:
      'Em BB1: r0 = 0(sp), r1 = 4(sp), r2 = r0 + r1 (t0), r3 = 12(sp) (c), r0 = r3 (t1), r1 = r0 + r2 (t2), r3 = r1, 12(sp) = r3. Em BB2: r0 = 0, r1 = 2, r2 = 0, 0(sp) = r2, 4(sp) = r1, 12(sp) = r2. Em BB3: r0 = 0(sp), r1 = 12(sp), r2 = r0 + r1, r0 = r2, 12(sp) = r1, 4(sp) = r0. Conciliando a e c no mesmo registo entre BB1 e BB2 (c em r3 em vez de r2), eliminam-se 4 operações de memória ao longo dos três blocos.',
    reasoning:
      'O alocador local guloso atribui registos às variáveis e expulsa quem vai ser usado mais longe no futuro; no fim de cada bloco guarda as variáveis modificadas. Como BB1 e BB2 chegam a BB3 por caminhos diferentes, um alocador local não garante coerêcia de registos entre blocos; um alocador global (ou a harmonização manual da alocação de a e c) reutiliza os mesmos registos e reduz loads e stores.',
    explanation: link.coloracao,
  },
];

export const mt2FluxoDados: ExamQuestion[] = [
  {
    id: 'c-mt2-2023-q6',
    title: 'Análise de variáveis vivas: lattice, direção e equações',
    source: 'Teste 2, 2022/23',
    topic: 'fluxo-dados',
    prompt:
      'Na análise de fluxo de dados de variáveis vivas (live-variable analysis), uma variável diz-se viva num ponto p se o seu valor pode ser usado num caminho de fluxo a partir de p sem redefinição intermédia. Responda: (a) qual o conjunto de valores do lattice e os valores iniciais? (b) qual a direção do problema, para a frente ou para trás, e porquê? (c) quais as equações da função de transferência (GEN/KILL) que o método iterativo resolve, e qual o operador de junção (meet) nos pontos de confluência e porquê? (d) qual a ordem preferida de processamento dos blocos neste problema e porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'O lattice é o conjunto de conjuntos não ordenados de variáveis, com IN inicializado a vazio.',
        'A direção é para trás (backwards), porque a informação se propaga dos usos para as definições.',
        'As equações são OUT(B) = ∪ IN(s) para sucessores s e IN(B) = Use(B) ∪ (OUT(B) − Def(B)); o meet é a união.',
        'A ordem preferida é a pré-ordem reversa, para calcular os sucessores antes de cada bloco.',
      ],
    },
    solution:
      'Lattice: conjuntos não ordenados de variáveis; todos os blocos começam com IN vazio. Direção: backwards, pois IN(B) é função dos OUT dos sucessores. Transferência: OUT(B) = ∪_{s sucessor de B} IN(s) e IN(B) = Use(B) ∪ (OUT(B) − Def(B)); o meet é a união, porque a variável está viva se estiver viva em pelo menos um caminho. Ordem: pré-ordem reversa, que garante que os sucessores de cada nó já foram processados.',
    reasoning:
      'Numa variável viva, o valor definido pode ser usado mais tarde; essa necessidade propaga-se para trás no fluxo de controlo e é morta (kill) no ponto da definição. Como basta um caminho em que a variável esteja viva, a confluência usa união, e o facto de os conjuntos só poderem crescer (a partir do vazio) garante terminação limitada pelo universo de variáveis.',
    explanation: link.fluxo,
  },
  {
    id: 'c-mt2-2022-q3',
    title: 'Análise de fluxo de dados para propagação de cópias',
    source: 'Teste 2, 2021/22',
    topic: 'fluxo-dados',
    definitions: `Entry
BB1: a = 0
     b = arg2
     c = arg1
     if (a = c) goto L1
BB2: a = 0
     if (a = b) goto L2
BB5: goto L3
BB3 L1: c = 1
        a = arg2
        b = b + 1
BB4 L2: c = arg1
        if (b = c) goto L1
BB6 L3: return b + c
Exit`,
    definitionsLanguage: 'text',
    prompt:
      'Formalize a análise de fluxo de dados de propagação de cópias (copy propagation), em que se determinam os pares de variáveis {u,v} tais que uma afetação da forma u = v num ponto p chega a um ponto q sem que u nem v sejam redefinidos. Para o problema, indique: (a) o conjunto de valores do lattice e os valores iniciais; (b) a direção do problema e porquê; (c) a função meet, o GEN e o KILL e as equações do método iterativo; (d) como construir a função de transferência de um bloco básico; (e) que otimizações esta informação permite, com exemplos no código acima.',
    answer: {
      kind: 'self',
      checklist: [
        'O lattice é o conjunto de conjuntos não ordenados de pares {u,v}, com valor inicial vazio.',
        'A direção é para a frente (forward), porque a pertinência de um par depende do que acontece depois.',
        'O meet é a interseção; GEN = {<v,u> | v = u é uma instrução} e KILL remove pares em que a variável do lado esquerdo é redefinida; OUT = GEN ∪ (IN − KILL).',
        'No exemplo, a associations c = arg1 que chega a BB4 permite reescrever if (b = c) como if (b = arg1), e o return b + c como return b + arg1.',
      ],
    },
    solution:
      'Lattice: conjuntos não ordenados de pares {u,v} de variáveis com o mesmo valor; inicial: vazio. Direção: forward, porque um par só deixa de valer quando uma das variáveis é redefinida, o que se deteta avançando no fluxo. Meet: interseção (o par tem de valer em todos os caminhos). Equações: OUT = GEN ∪ (IN − KILL), com GEN = {<v,u> | v = u} e KILL = {<v,u> | a afetação redefine v ou u}. A transferência do bloco constrói-se por uma passagem forward pelas instruções, acumulando o GEN e removendo o que é morto. No exemplo, em BB4 chega o par {c, arg1}, pelo que if (b = c) goto L1 pode escrever-se if (b = arg1) goto L1, e em BB6 o return b + c pode escrever-se return b + arg1, permitindo depois eliminar o código morto associado a c.',
    reasoning:
      'Para que a reescrita u = v como u = w seja segura, o par {u,v} tem de alcançar o ponto de uso sem redefinição de nenhuma das variáveis; por isso o problema é forward e o meet é interseção. Conhecidos os pares que chegam, pode substituir-se uma variável pela outra e, se a afetação original ficar sem usos, eliminá-la como código morto.',
    explanation: link.fluxo,
  },
];

export const mt2Otimizacao: ExamQuestion[] = [
  {
    id: 'c-mt2-2023-q7',
    title: 'Código invariante num ciclo e remoção de x',
    source: 'Teste 2, 2022/23',
    topic: 'otimizacao',
    definitions: `int x, acc = 0;
for (int i = 0; i < N; i++) {
   x = b + 1;
   acc = acc + x + i;
}`,
    definitionsLanguage: 'c',
    prompt:
      'Considere o excerto acima, em que b e N estão definidos antes e x está vivo à saída do excerto. (a) Derive o CFG e os blocos básicos e identifique oportunidades de movimento de código invariante de ciclo (LICM); para onde pode mover o código invariante e porquê? (b) Pode remover o código que calcula x? Porquê? (c) Em que circunstâncias são as transformações lucrativas? Que outras transformações simplificariam o código?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica b + 1 (e a afetação a x) como invariantes do ciclo, a mover para o pré-cabeçalho que domina o ciclo.',
        'A resposta explica que x não pode ser removido porque está vivo à saída e o bloco que o define não domina a saída do ciclo.',
        'A transformação só é lucrativa para N > 1; o ciclo pode ainda ser substituído pela expressão fechada N*b + N(N+1)/2.',
      ],
    },
    solution:
      'A expressão b + 1 é invariante do ciclo e pode ser movida para o pré-cabeçalho (bloco que domina todos os blocos do ciclo); o mesmo se aplica à afetação a x, assumindo que o ciclo executa pelo menos uma vez. A cálculo de x não pode ser eliminado: x está vivo à saída e o bloco onde x é definido não domina a saída do ciclo. A transformação só é lucrativa quando N > 1; para N = 0 piora o código. Como o corpo é, no fundo, uma progressão aritmética, pode substituir-se o ciclo todo por acc = N*b + N(N+1)/2 (com x = b + 1).',
    reasoning:
      'O LICM exige que a expressão seja invariante e que o bloco de destino domine todas as saídas do ciclo onde a variável resultante é usada. Mover x para o pré-cabeçalho alteraria o comportamento visível se N = 0, pois x ficaria indefinido. A expressão fechada elimina o ciclo por completo.',
    explanation: link.licm,
  },
  {
    id: 'c-mt2-2024-q4',
    title: 'Propagação de constantes, LICM e variáveis de indução',
    source: 'Teste 2, 2023/24',
    topic: 'otimizacao',
    definitions: `Entry
BB1: a = 1
     b = 0
     c = p1
BB2: t = a * c
     z = p1
BB3: t = a * c
     z = p1 + p2
     b = b + 1
BB4: x = a * c + z
     k = b * x
Exit`,
    definitionsLanguage: 'text',
    prompt:
      'Considere o excerto de código de três endereços acima, com os parâmetros p1 e p2. (a) Identifique oportunidades de propagação de constantes, expressões disponíveis, simplificação algébrica e redução de força (strength reduction). (b) Identifique oportunidades de movimento de código invariante de ciclo (LICM) e a variável de indução. Em ambos os casos, justifique a legalidade das transformações quanto ao fluxo de controlo e à notion de dominância.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta propaga a = 1 para todos os usos (o bloco BB1 domina todos os usos), simplificando a*c para c e propagando c = p1.',
        'A resposta identifica a*c e z = p1 + p2 em BB3 como invariantes do ciclo, a mover para um pré-cabeçalho.',
        'A única variável de indução é b, que aumenta uma unidade por iteração.',
      ],
    },
    solution:
      'A afetação a = 1 está num bloco que domina todos os usos de a, pelo que a pode ser propagada como constante e a expressão a*c simplifica-se para c; como todas as definições de c estão em BB1, o valor p1 propaga-se para os usos de c (ficando t = p1 e x = p1 + z). Dentro do ciclo (BB3), a*c e z = p1 + p2 são invariantes e podem ser movidos para um pré-cabeçalho do ciclo. A única variável de indução é b (variável de indução básica), com b = b + 1 em cada iteração. O código resultante fica com BB4: x = p1 + z, k = b * x.',
    reasoning:
      'A propagação de constantes é legal porque a definição de a domina todos os usos e não há outra definição de a. O LICM é legal porque as expressões movidas não dependem de valores alterados dentro do ciclo e o pré-cabeçalho domina o ciclo; a introdução do pré-cabeçalho não altera a validade das outras otimizações.',
    explanation: link.licm,
  },
];
