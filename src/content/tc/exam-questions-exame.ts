import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  equivalenciaRe:
    '/cadeiras/tc/expressoes-automatos/#equivalência-de-representações',
  provarDfa:
    '/cadeiras/tc/automatos-finitos/#provar-que-a-construção-está-correcta',
  construirG:
    '/cadeiras/tc/gramaticas-livres/#construir-uma-gramática-e-provar-a-linguagem',
  ambiguidade:
    '/cadeiras/tc/gramaticas-livres/#árvores-sintáticas-e-ambiguidade',
  derivacoes: '/cadeiras/tc/gramaticas-livres/#definição-e-derivações',
  turingBlocos:
    '/cadeiras/tc/turing-decidibilidade/#comparar-extremos-e-vários-blocos',
  turingAnbn: '/cadeiras/tc/turing-decidibilidade/#uma-máquina-que-decide-aⁿbⁿ',
  decidivel: '/cadeiras/tc/turing-decidibilidade/#reconhecível-e-decidível',
  fechoRegulares: '/cadeiras/tc/limites-regulares/#propriedades-de-fecho',
  fechoLivres: '/cadeiras/tc/propriedades-livres/#propriedades-de-fecho',
  expressoes: '/cadeiras/tc/linguagens-expressoes/#expressões-regulares',
};

export const automatosRegulares: ExamQuestion[] = [
  {
    id: 'tc-exame-2022-q1',
    title: 'Expressão de um DFA mínimo e equivalência',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'automatos-regulares',
    prompt:
      'Um ε-NFA foi convertido num DFA e depois minimizado; a expressão regular do DFA mínimo obtida é $(01)^*$. Pode concluir-se que a expressão regular obtida pelo método de eliminação de estados para o mesmo autómato é equivalente a $(01)^*$? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta é sim (as duas expressões são equivalentes).',
        'A justificação recorre ao facto de ambos os métodos (eliminação de estados e minimização) serem técnicas provadas que produzem autómatos/expressões para a mesma linguagem.',
      ],
    },
    solution:
      'Sim. A expressão regular que representa o DFA mínimo é $(01)^*$. Como o DFA mínimo se obtém por técnicas provadas que transformam qualquer ε-NFA num DFA equivalente e depois num DFA mínimo, e a expressão regular foi obtida por outra técnica provada (eliminação de estados), as duas expressões são equivalentes, isto é, representam a mesma linguagem.',
    reasoning:
      'Dois procedimentos correctos aplicados à mesma linguagem não podem dar resultados diferentes: ambos preservam a linguagem reconhecida. Assim, se o DFA mínimo gera $(01)^*$, a expressão por eliminação de estados tem de gerar a mesma linguagem.',
    explanation: link.equivalenciaRe,
  },
  {
    id: 'tc-exame-2022-q2',
    title: 'Prova por indução de um subconjunto de (01)*',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'automatos-regulares',
    prompt:
      'Prove por indução que todas as palavras representadas pela expressão regular $0101(01)^*$, isto é, da forma $0101(01)^n$ com $n\\geq 0$, pertencem à linguagem $(01)^*$.',
    answer: {
      kind: 'self',
      checklist: [
        'A hipótese de indução é $S_n$: as palavras $0101(01)^n$, com $n\\geq0$, pertencem a $(01)^*$.',
        'O caso de base trata a palavra mais curta, $0101=(01)^2$.',
        'No passo indutivo usa-se $0101(01)^{n+1}=0101(01)^n\\,(01)$ e a hipótese para concluir que a palavra seguinte também pertence a $(01)^*$.',
      ],
    },
    solution:
      'Hipótese: $S_n$: as palavras dadas por $0101(01)^n$, com $n\\geq0$, pertencem a $(01)^*$. Caso de base: a palavra mais curta é $0101=(01)^2$, que pertence a $(01)^*$. Passo indutivo: $0101(01)^{n+1}=0101(01)^n(01)$; por hipótese, $0101(01)^n\\in(01)^*$, e como $(01)^*$ é fechada para a concatenação, a concatenação com $(01)$ continua em $(01)^*$. Logo todas as palavras $0101(01)^n$ pertencem a $(01)^*$.',
    reasoning:
      'Como $0101=(01)^2$, cada palavra $0101(01)^n$ é $(01)^{n+2}$, claramente uma palavra de $(01)^*$. A prova por indução formaliza este facto: o caso de base cobre $n=0$ e o passo mostra que acrescentar um bloco $(01)$ preserva a pertença.',
    explanation: link.provarDfa,
  },
  {
    id: 'tc-exame-2022-q3',
    title:
      'Equivalência de duas expressões regulares de um autómato generalizado',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'automatos-regulares',
    prompt:
      'Nas aulas sugeriu-se a expressão regular $(R+SU^*T)^*SU^*$ para converter um autómato finito generalizado numa expressão regular. Alguém propõe antes $R^*SU^*(TR^*SU^*)^*$, com $R$, $S$, $U$ e $T$ expressões regulares. Acha que esta expressão é equivalente a $(R+SU^*T)^*SU^*$? Se sim, descreva como o poderia provar.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica um método de prova válido (converter ambas para DFA e testar equivalência, ou provar por indução).',
        'A justificação explica que dois autómatos são equivalentes se os estados iniciais forem indistinguíveis (ou se ambas as subtrações produzirem a linguagem vazia).',
      ],
    },
    solution:
      'Sim, são equivalentes. Pode provar-se convertendo $R^*SU^*(TR^*SU^*)^*$ num DFA (expressão $\\to$ ε-NFA $\\to$ DFA) e comparando-o com o DFA do autómato generalizado: se os estados iniciais forem equivalentes (indistinguíveis pela tabela de estados distinguíveis), as duas expressões são equivalentes. Alternativamente, constrói-se o produto cartesiano dos dois DFA e verifica-se que ambas as subtrações dão a linguagem vazia, ou prova-se por indução que $L(R^*SU^*(TR^*SU^*)^*)$ é a linguagem do autómato.',
    reasoning:
      'Ambas as expressões descrevem percursos no mesmo autómato generalizado: ciclos no estado inicial ($R$), um avanço $S$ seguido de ciclos $U^*$, e repetições do bloco $TR^*SU^*$. A equivalência prova-se pelos métodos padrão de equivalência de autómatos, que são completos.',
    explanation: link.equivalenciaRe,
  },
];

export const gramaticasPilha: ExamQuestion[] = [
  {
    id: 'tc-exame-2022-q4',
    title: 'Linguagem de uma gramática com dois blocos',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'gramaticas-pilha',
    prompt:
      'Considere a gramática livre de contexto $G$ com produções $S\\to aSc\\mid B$ e $B\\to bBc\\mid\\varepsilon$. Defina formalmente o conjunto das palavras da linguagem de $G$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta $L(G)=\\{a^k b^l c^m\\mid m=k+l,\\ k,l,m\\geq0\\}$.',
        'A justificação separa o papel de $S$ (acrescenta um $a$ à esquerda e um $c$ à direita) do de $B$ (acrescenta um $b$ à esquerda e um $c$ à direita, ou termina com $\\varepsilon$).',
      ],
    },
    solution: '$L(G)=\\{a^k b^l c^m\\mid m=k+l,\\ k,l,m\\geq0\\}$.',
    reasoning:
      'A produção de $S$ gera $k$ letras $a$ à esquerda e $k$ letras $c$ à direita, com um bloco $B$ no meio. Por sua vez, $B$ gera $l$ letras $b$ à esquerda e $l$ letras $c$ à direita. No total, o número de $c$ é $m=k+l$, pelo que a linguagem é exatamente $\\{a^k b^l c^m\\mid m=k+l\\}$.',
    explanation: link.construirG,
  },
  {
    id: 'tc-exame-2022-q5',
    title: 'Uma gramática é ambígua?',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'gramaticas-pilha',
    prompt:
      'Considere ainda a gramática $G$ com produções $S\\to aSc\\mid B$ e $B\\to bBc\\mid\\varepsilon$. A gramática é ambígua? Justifique a sua resposta.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que a gramática não é ambígua.',
        'A justificação mostra que não existe nenhuma palavra de $L(G)$ com duas árvores sintáticas distintas.',
      ],
    },
    solution:
      'A gramática não é ambígua, pois não é possível derivar duas árvores sintáticas diferentes para a mesma palavra de $L(G)$.',
    reasoning:
      'A primeira produção do símbolo inicial $S$ deriva recursivamente um $a$ à esquerda e um $c$ à direita, e deriva $B$ para o substring do meio; em $B$, a primeira produção deriva um $b$ à esquerda e um $c$ à direita, ou termina com $\\varepsilon$. Como só há uma maneira de acrescentar o par $a,c$ e depois o par $b,c$, não há mais do que uma árvore sintática por palavra.',
    explanation: link.ambiguidade,
  },
  {
    id: 'tc-exame-2022-q6',
    title: 'Gramática para a^k b^l a^m com m=k+l',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'gramaticas-pilha',
    prompt:
      'Considere a linguagem $L_1=\\{a^k b^l a^m\\mid m=k+l\\ \\wedge\\ k,l,m\\geq0\\}$. Defina uma gramática livre de contexto para $L_1$.',
    answer: {
      kind: 'self',
      checklist: [
        'A gramática apresentada tem produções equivalentes a $S\\to aSa\\mid B$ e $B\\to bBa\\mid\\varepsilon$.',
        'A justificação relaciona cada $a$ inicial com um $a$ final e cada $b$ com um $a$ final, garantindo $m=k+l$.',
      ],
    },
    solution:
      'Uma gramática para $L_1$ é $S\\to aSa\\mid B$, $B\\to bBa\\mid\\varepsilon$.',
    reasoning:
      'A regra $S\\to aSa$ acrescenta um $a$ no início e um $a$ no fim (contribuindo $k$ de cada lado), e $B\\to bBa$ acrescenta um $b$ no início e um $a$ no fim (contribuindo $l$ $b$ e $l$ $a$ finais). No total, o número de $a$ finais é $m=k+l$, como se pretende.',
    explanation: link.construirG,
  },
  {
    id: 'tc-exame-2022-q7',
    title: 'Prova por indução de que uma gramática gera L2',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'gramaticas-pilha',
    prompt:
      'Considere a linguagem $L_2=\\{a^n c^m d^m b^n\\mid n,m\\geq0\\}$ e a gramática $G_2$ (sendo $S$ o símbolo inicial) com produções $S\\to aSb\\mid T$ e $T\\to cTd\\mid\\varepsilon$. Prove por indução que as palavras de $L_2$ são reconhecidas pela gramática $G_2$.',
    answer: {
      kind: 'self',
      checklist: [
        'A prova faz indução no comprimento de $w$, com caso de base $w=\\varepsilon$ ($S\\Rightarrow T\\Rightarrow\\varepsilon$).',
        'O passo indutivo considera as duas formas de aumentar a palavra: $v=cwd$ (via $T\\to cTd$) e $v=awb$ (via $S\\to aSb$ ).',
        'A conclusão afirma que todas as palavras de $L_2$ têm derivação em $G_2$.',
      ],
    },
    solution:
      'Prova por indução no tamanho de $w$, para todo $w\\in L_2$. Caso de base: $|w|=0$, logo $w=\\varepsilon$, e $S\\Rightarrow T\\Rightarrow\\varepsilon$. Passo indutivo: seja $w\\in L_2$ com derivação em $G_2$ e $|w|=n$; a palavra seguinte $v$, de tamanho $n+2$, pode formar-se de duas maneiras: (i) $v$ só com $c$ e $d$ (ou $w=\\varepsilon$), e $v=cwd$, pois $S\\Rightarrow T\\Rightarrow cTd\\Rightarrow^* cwd$; (ii) $v=awb$, pois $S\\Rightarrow aSb\\Rightarrow^* awb$. Assim, as palavras de $L_2$ são reconhecidas por $G_2$.',
    reasoning:
      'Cada palavra de $L_2$ obtém-se a partir de $\\varepsilon$ aplicando repetidamente um par exterior $a\\ldots b$ (regra de $S$) ou um par interior $c\\ldots d$ (regra de $T$). A indução cobre exatamente estas duas possibilidades de crescimento.',
    explanation: link.derivacoes,
  },
];

export const maquinasTuring: ExamQuestion[] = [
  {
    id: 'tc-exame-2022-q8',
    title: 'Máquina de Turing para a^3m b c^2n',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'turing',
    prompt:
      'Pretende-se implementar uma máquina de Turing (MT) que aceite a linguagem $L_3=\\{a^{3m}bc^{2n}\\mid m,n\\geq0\\}$. Por exemplo, $aaab$ e $aaabcc$ são aceites; $aaabc$ é rejeitado. Descreva uma possível MT para $L_3$, apresentando a tabela de transições.',
    answer: {
      kind: 'self',
      checklist: [
        'A MT proposta tem estados distintos para contar os $a$ (múltiplo de 3) e os $c$ (múltiplo de 2).',
        'A tabela de transições cobre as leituras de $a$, $b$, $c$ e do branco $B$, com o estado final $s_f$.',
        'A justificação mostra que $aaab$ e $aaabcc$ são aceites e $aaabc$ é rejeitado.',
      ],
    },
    solution:
      'Uma possível MT é $M=(\\{s_0,s_1,s_2,s_3,s_4,s_5,s_6,s_f\\},\\{a,b,c\\},\\{a,b,c,B\\},\\delta,s_0,B,\\{s_f\\})$, com $\\delta$ dada pela tabela: $s_0$: em $a\\to(s_1,B,R)$, em $b\\to(s_4,B,R)$; $s_1$: em $a\\to(s_2,B,R)$; $s_2$: em $a\\to(s_3,B,R)$; $s_3$: em $a\\to(s_1,B,R)$, em $b\\to(s_4,B,R)$; $s_4$: em $c\\to(s_5,B,R)$, em $B\\to(s_f,B,R)$; $s_5$: em $c\\to(s_6,B,R)$; $s_6$: em $c\\to(s_5,B,R)$, em $B\\to(s_f,B,L)$; $s_f$: sem transições.',
    reasoning:
      'Os estados $s_0,s_1,s_2,s_3$ varrem os $a$ em ciclo de três ($s_0\\to s_1\\to s_2\\to s_3\\to s_1$), garantindo que o número de $a$ é múltiplo de 3; o $b$ leva a $s_4$. Depois, $s_4,s_5,s_6$ varrem os $c$ em ciclo de dois ($s_4\\to s_5\\to s_6\\to s_5$), garantindo que o número de $c$ é par. Se a fita chegar ao branco nesse padrão, a máquina aceita em $s_f$; caso contrário (como $aaabc$, com um único $c$) não há transição e rejeita.',
    explanation: link.turingBlocos,
  },
  {
    id: 'tc-exame-2022-q9',
    title: 'Traço de computação para a entrada aaab',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'turing',
    prompt:
      'Usando a máquina de Turing $M$ da questão anterior (cuja tabela de transições foi dada), indique os primeiros 6 passos do traço de computação quando a entrada é $aaab$.',
    answer: {
      kind: 'self',
      checklist: [
        'O traço começa em $s_0aaab$.',
        'O traço apresenta as configurações intermédias até $s_fB$.',
        'O número de passos indicado é 5 (ou 6 incluindo a configuração final).',
      ],
    },
    solution:
      '$s_0aaab\\vdash s_1aab\\vdash s_2ab\\vdash 1s_3b\\vdash s_4B\\vdash s_fB$.',
    reasoning:
      'Aplicando a tabela: $s_0$ com $a$ escreve $B$ e vai para $s_1$ ($s_1aab$); $s_1$ com $a\\to s_2$ ($s_2ab$); $s_2$ com $a\\to s_3$ ($1s_3b$); $s_3$ com $b\\to(s_4,B,R)$ ($s_4B$); $s_4$ com $B\\to(s_f,B,R)$ ($s_fB$). A máquina aceita, pois atinge o estado final.',
    explanation: link.turingAnbn,
  },
  {
    id: 'tc-exame-2022-q10',
    title: 'Modificar a MT para a^2m b c^2n',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'turing',
    prompt:
      'Reutilizando a MT da questão anterior com o menor número possível de alterações, descreva uma possível MT que aceite a linguagem $L_4=\\{a^{2m}bc^{2n}\\mid m,n\\geq0\\}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta altera a transição $(s_1,a)$ para $(s_3,B,R)$.',
        'A resposta remove o estado $s_2$.',
        'A justificação explica que o ciclo de $a$ passa a ser de dois em vez de três.',
      ],
    },
    solution:
      'Altera-se $(s_1,a)$ para $(s_3,B,R)$ e remove-se o estado $s_2$. Assim, os $a$ são varridos em ciclo de dois ($s_0\\to s_1\\to s_3\\to s_1$), o que corresponde a $a^{2m}$.',
    reasoning:
      'Na MT original, o ciclo $s_0\\to s_1\\to s_2\\to s_3\\to s_1$ conta os $a$ de três em três. Para passar a contar de dois em dois, basta que $s_1$ volte diretamente a $s_3$, eliminando $s_2$; o resto da máquina (o $b$ e os $c$ pares) permanece inalterado.',
    explanation: link.turingBlocos,
  },
];

export const afirmacoesLinguagens: ExamQuestion[] = [
  {
    id: 'tc-exame-2022-q11',
    title: 'Subtração de uma linguagem regular por uma não regular',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente (com um par de frases ou um contraexemplo), se a seguinte afirmação é Verdadeira (V) ou Falsa (F): a linguagem obtida pela subtração de uma linguagem regular (LR) por uma linguagem não regular (LNR) que inclua palavras da LR é sempre uma LNR.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Falsa.',
        'A justificação apresenta um contraexemplo (por exemplo, LR finita, ou $L_1=ab^+(0+1)^*$ e $L_2=\\{c^nd^{n+1}ab\\}$, com $L_1-L_2=(0+1)^*$).',
      ],
    },
    solution:
      'Falsa. Contraexemplo: se a LR for uma linguagem finita, a subtração resulta noutra linguagem finita, e toda a linguagem finita é regular. Outro contraexemplo: com $L_1=ab^+(0+1)^*$ (regular) e $L_2=\\{c^nd^{n+1}ab\\mid n\\geq0\\}$ (não regular), tem-se $L_1-L_2=(0+1)^*$, que é regular.',
    reasoning:
      'A subtração não preserva a não-regularidade. Se a LR tem um número finito de palavras em comum com a LNR, o resultado pode ser finito (logo regular), e mesmo que haja sobreposição infinita o resultado pode continuar regular.',
    explanation: link.fechoRegulares,
  },
  {
    id: 'tc-exame-2022-q12',
    title: 'Duas derivações diferentes implicam gramática ambígua?',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente, se a seguinte afirmação é Verdadeira (V) ou Falsa (F): dada uma gramática livre de contexto $G$, se for possível definir duas derivações diferentes para a mesma palavra, podemos dizer que $G$ é ambígua.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Falsa.',
        'A justificação explica que, para a gramática ser ambígua, as duas derivações têm de ser ambas à esquerda (ou ambas à direita), não bastando serem diferentes.',
      ],
    },
    solution:
      'Falsa. Para uma gramática ser ambígua, as duas derivações diferentes têm de ser ambas à esquerda ou ambas à direita. Numa gramática não ambígua podem existir duas derivações diferentes, uma à esquerda e outra à direita, que conduzem à mesma árvore sintática.',
    reasoning:
      'A ambiguidade mede a existência de duas árvores sintáticas distintas, e duas árvores distintas equivalem a duas derivações à esquerda diferentes (ou, equivalentemente, duas à direita). Duas derivações genéricas diferentes não bastam.',
    explanation: link.ambiguidade,
  },
  {
    id: 'tc-exame-2022-q13',
    title: 'Interseção decidível implica linguagens decidíveis?',
    source: 'Exame de Época Normal, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente, se a seguinte afirmação é Verdadeira (V) ou Falsa (F): se $L_1\\cap L_2$ é decidível (recursiva), então $L_1$ e $L_2$ são ambas decidíveis.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Falsa.',
        'A justificação dá um contraexemplo: $L_1$ e/ou $L_2$ podem ser apenas recursivamente enumeráveis e a interseção ser vazia (decidível).',
      ],
    },
    solution:
      'Falsa. $L_1$ e/ou $L_2$ podem ser linguagens recursivamente enumeráveis (não decidíveis) cuja interseção é decidível; por exemplo, se a interseção for o conjunto vazio, que é uma linguagem decidível.',
    reasoning:
      'A decidibilidade não é hereditária para os operandos de uma interseção. O conjunto vazio é decidível, pelo que duas linguagens não decidíveis podem ter interseção vazia e, ainda assim, a interseção ser decidível.',
    explanation: link.decidivel,
  },
  {
    id: 'tc-exame-2022-q14',
    title: 'A linguagem w^(2^n) é regular?',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente, se a seguinte afirmação é Verdadeira (V) ou Falsa (F): a linguagem $L=\\{w^{2^n}\\mid w\\in\\{0,1\\}^*\\ \\wedge\\ n\\geq0\\}$ é uma linguagem regular (LR).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Verdadeira.',
        'A justificação nota que $2^n$ pode ser 1 (para $n=0$), pelo que $L$ contém todas as palavras de $\\{0,1\\}^*$, sendo representada por $(0+1)^*$.',
      ],
    },
    solution:
      'Verdadeira. Como $w$ representa qualquer palavra sobre $\\{0,1\\}$ e $2^n$ pode ser 1 (quando $n=0$), $L$ é a linguagem de todas as palavras sobre $\\{0,1\\}$, que se representa pela expressão regular $(0+1)^*$, sendo assim uma LR.',
    reasoning:
      'O expoente $2^n$ percorre 1, 2, 4, 8, ..., incluindo o valor 1. Para $n=0$, $w^{2^0}=w^1=w$, com $w$ arbitrário em $\\{0,1\\}^*$. Logo $L=\\{0,1\\}^*$, que é regular.',
    explanation: link.expressoes,
  },
  {
    id: 'tc-exame-2022-q15',
    title: 'Interseção de duas CFL é sempre uma CFL?',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente, se a seguinte afirmação é Verdadeira (V) ou Falsa (F): a interseção de duas linguagens, cada uma representada por uma gramática livre de contexto (GLC), resulta sempre numa linguagem que pode ser representada por uma GLC.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Falsa.',
        'A justificação usa o contraexemplo $L_1=\\{a^nb^nc^m\\}$ e $L_2=\\{a^nb^mc^m\\}$, cuja interseção $\\{a^nb^nc^n\\}$ não é livre de contexto.',
      ],
    },
    solution:
      'Falsa. Se as linguagens são represented por GLC, são ambas livres de contexto. A interseção de duas CFL não é uma propriedade de fecho das CFL. Exemplo: $L_1=\\{a^nb^nc^m\\mid m,n\\geq0\\}$ e $L_2=\\{a^nb^mc^m\\mid m,n\\geq0\\}$; então $L_1\\cap L_2=\\{a^nb^nc^n\\mid n\\geq0\\}$, que não é uma CFL e, portanto, não pode ser representada por uma GLC.',
    reasoning:
      'As CFL são fechadas para a unión, a concatenação e a estrela, mas não para a interseção nem para o complemento. O exemplo clássico $a^nb^nc^n$ mostra que a interseção de duas CFL pode cair fora da classe.',
    explanation: link.fechoLivres,
  },
  {
    id: 'tc-exame-2022-q16',
    title: 'L* decidível implica L decidível?',
    source: 'Exame de Época de Recurso, 2021/22',
    topic: 'afirmacoes',
    prompt:
      'Indique, justificando sucintamente, se a seguinte afirmação é Verdadeira (V) ou Falsa (F): se $L^*$ é decidível (linguagem recursiva), então $L$ é decidível.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como Falsa.',
        'A justificação apresenta um contraexemplo: $L_2=\\{0,1\\}\\cup L_1$, com $L_1$ não decidível, tem $L_2^*=\\{0,1\\}^*$ decidível mas $L_2$ não decidível.',
      ],
    },
    solution:
      'Falsa. Contraexemplo: seja $L_1$ uma linguagem não decidível sobre $\\{0,1\\}$ e $L_2=\\{0,1\\}\\cup L_1$. $L_2$ continua não decidível, mas $L_2^*=\\{0,1\\}^*$, que é decidível. Logo $L^*$ decidível não implica $L$ decidível.',
    reasoning:
      'A operação estrela pode "absorver" a parte não decidível: se $L$ já contém todos os símbolos do alfabeto, $L^*$ é todo o $\\Sigma^*$, que é decidível, independentemente de $L$ ser ou não decidível.',
    explanation: link.decidivel,
  },
];
