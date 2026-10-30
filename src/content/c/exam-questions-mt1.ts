import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  dfa: '/cadeiras/c/analise-lexica/#da-expressão-regular-ao-dfa',
  desempate: '/cadeiras/c/analise-lexica/#autómatos-e-desempate',
  arvores: '/cadeiras/c/analise-sintatica/#árvores-e-famílias-de-analisadores',
  lr: '/cadeiras/c/analise-sintatica/#shift-redução-e-itens-lr',
  recursao:
    '/cadeiras/c/analise-sintatica/#recursão-à-esquerda-e-prefixos-comuns',
  ll1: '/cadeiras/c/analise-sintatica/#first-follow-e-tabela-ll1',
  âmbitos: '/cadeiras/c/analise-semantica/#tabela-de-símbolos-e-âmbitos',
  tipos: '/cadeiras/c/analise-semantica/#verificação-de-tipos',
  sobrecargas: '/cadeiras/c/analise-semantica/#resolução-de-sobrecargas',
  atributos: '/cadeiras/c/analise-semantica/#atributos-herdados-e-sintetizados',
  temporarios: '/cadeiras/c/codigo-intermedio/#temporários-rótulos-e-saltos',
};

export const mt1Lexico: ExamQuestion[] = [
  {
    id: 'c-mt1-2022-q1',
    title: 'Autómato para listas de identificadores entre parênteses',
    source: 'Teste 1, 2021/22',
    topic: 'lexico',
    prompt:
      'Considere a expressão regular `' +
      '‘(’ . (id . (‘,’ . id)*)? . ‘)’' +
      '`, onde `id` é o token de um identificador, os caracteres entre aspas são terminais e `.` é a concatenação. A linguagem gerada inclui `()` e `(id,id,id)`.\n\n' +
      'a) Converta a expressão regular num NFA pela construção de Thompson (pode simplificar transições-ε para reduzir o número de estados).\n' +
      'b) Converta esse NFA num DFA pela construção de subconjuntos, indicando a correspondência entre os estados do DFA e os subconjuntos do NFA.\n' +
      'c) Mostre que o DFA obtido é mínimo.',
    answer: {
      kind: 'self',
      checklist: [
        'O NFA tem um estado inicial, um estado final e um ciclo para os pares `, id` adicionais.',
        'O DFA tem 5 estados acessíveis, do estado inicial ao estado final, com as transições em `(` , `id`, `,` e `)`.',
        'A justificação de minimalidade mostra que cada estado é necessário (nomeadamente o caminho mínimo `()` e o caso `(id)`).',
      ],
    },
    solution:
      'NFA com estados 0 a 6: 0 -`(`→ 1; 1 -`id`→ 2 e 1 -ε→ 5; 2 -`,`→ 3 e 2 -ε→ 4; 3 -`id`→ 4; 4 -ε→ 5; 5 -`)`→ 6. DFA: A={0}, B={1,5}, C={2,4,5}, D={3}, E={6}, com A -`(`→ B, B -`id`→ C, C -`,`→ D, D -`id`→ C, C -`)`→ E. Todos os estados são alcançáveis e distinguíveis, logo o DFA é mínimo.',
    reasoning:
      'A construção de Thompson produz um autómato com transições-ε para a alternativa `?` e a estrela `*`. Na construção de subconjuntos, o fecho-ε de {1} dá {1,5} e o de {2} dá {2,4,5}. O estado {6} é o único final e só é alcançado por `)`, pelo que o caminho mínimo `()` distingue o estado inicial do final; os estados intermédios distinguem-se pelos prefixos `(` e `(id`. As transições em falta vão para um estado de erro implícito.',
    explanation: link.dfa,
  },
  {
    id: 'c-mt1-2025-q1',
    title: 'Sequência de tokens de um método em ANTLR',
    source: 'Teste 1, 2025/26',
    topic: 'lexico',
    prompt:
      'Considere a gramática ANTLR com as regras léxicas\n\n```\nID : [a-zA-Z_][a-zA-Z_0-9]* ;\nINT : [0-9]+ ;\nWS : [ \\t\\r\\n]+ -> skip ;\n```\n\n' +
      'Indique a sequência de tokens gerada pelo analisador lexical para a entrada\n\n```\nint inc(int x) {\n    return x + 1;\n}\n```\n\n' +
      'Se um token puder representar mais do que uma cadeia, indique também a cadeia capturada.',
    answer: {
      kind: 'self',
      checklist: [
        'A sequência começa por `int`, `ID(inc)`, `(`, `int`, `ID(x)`, `)`, `{`.',
        'O corpo produz `return`, `ID(x)`, `+`, `INT(1)`, `;`, `}`.',
        'Os espaços e a mudança de linha são ignorados pela regra `WS -> skip`.',
      ],
    },
    solution:
      '`int`, `ID(inc)`, `(`, `int`, `ID(x)`, `)`, `{`, `return`, `ID(x)`, `+`, `INT(1)`, `;`, `}`.',
    reasoning:
      'O analisador lexical aplica o prefixo mais longo: `inc` e `x` são identificadores, `1` é um inteiro e os espaços são descartados por `WS -> skip`. As palavras `int` e `return` não têm regra própria, pelo que são reconhecidas como literais implícitos da gramática do analisador sintático.',
    explanation: link.desempate,
  },
];

export const mt1Sintaxe: ExamQuestion[] = [
  {
    id: 'c-mt1-2022-q2',
    title: 'Prefixo comum numa gramática de um só não-terminal',
    source: 'Teste 1, 2021/22',
    topic: 'sintaxe',
    prompt:
      'Considere a gramática $G$ com um único não-terminal $S$ (símbolo inicial) e produções\n\n```\nS → aS | abS | c\n```\n\n' +
      'a) Explique por que $G$ não tem a propriedade LL(1).\n' +
      'b) Modifique $G$ para que tenha a propriedade LL(1), eliminando o prefixo comum.\n' +
      'c) Calcule os conjuntos FIRST e FOLLOW dos não-terminais da gramática modificada e construa a respetiva tabela de análise LL(1), mostrando que não tem entradas multiply-defined.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação indica que FIRST das duas primeiras produções têm interseção não vazia em `a`.',
        'A gramática改造 usa um novo não-terminal, por exemplo $S \\to aT \\mid c$ e $T \\to bS \\mid S$.',
        'A tabela LL(1) não tem conflitos: M[S,a] = S→aT, M[S,c] = S→c, M[T,b] = T→bS, M[T,a] = M[T,c] = T→S.',
      ],
    },
    solution:
      'FIRST(S) = {a, c}, FOLLOW(S) = {$}; FIRST(T) = {a, b, c}, FOLLOW(T) = {$}. Tabela: M[S,a] = S→aT, M[S,c] = S→c; M[T,a] = T→S, M[T,b] = T→bS, M[T,c] = T→S. Sem entradas com mais de uma produção.',
    reasoning:
      'Com o símbolo de avanço `a`, o analisador não sabe se expande S por aS ou por abS, porque as duas produções começam pelo mesmo terminal. Ao fatorizar o prefixo comum num novo não-terminal T, cada célula da tabela fica com uma única produção. Com dois símbolos de avanço seria possível decidir no caso da entrada `ab`, mas a gramática改造 resolve o conflito com um só símbolo.',
    explanation: link.recursao,
  },
  {
    id: 'c-mt1-2023-q2',
    title: 'Recursão à esquerda numa lista de elementos',
    source: 'Teste 1, 2022/23',
    topic: 'sintaxe',
    prompt:
      'Considere a gramática $G = (\\{S, L\\}, S, \\{a, (, ), ,\\}, P)$ com as produções\n\n```\nS → (L) | a\nL → L, S | S\n```\n\n' +
      'a) Esta gramática é adequada para análise descendente recursiva (parser preditivo)? Justifique e, se necessário, modifique a gramática.\n' +
      'b) Calcule os conjuntos FIRST e FOLLOW dos não-terminais da gramática resultante.\n' +
      'c) Construa a tabela de análise LL(1) correspondente.\n' +
      'd) A gramática original $G$ pode ser analisada por um parser bottom-up shift-reduce? Porquê?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica a recursão à esquerda de L → L, S e elimina-a com um novo não-terminal, por exemplo L → S L′ e L′ → , S L′ | ε.',
        'FIRST(S) = FIRST(L) = {(, a}; FIRST(L′) = {, , ε}; FOLLOW(L) = FOLLOW(L′) = {)}; FOLLOW(S) = {, , ), $}.',
        'A tabela LL(1) não tem conflitos e o parser bottom-up consegue tratar a gramática original porque aceita gramáticas recursivas à esquerda.',
      ],
    },
    solution:
      'Gramática LL(1): S → (L) | a; L → S L′; L′ → , S L′ | ε. FIRST(S) = {(, a}, FIRST(L) = {(, a}, FIRST(L′) = {`,`, ε}; FOLLOW(L) = {)}, FOLLOW(S) = {`,`, ), $}, FOLLOW(L′) = {)}. A gramática original é adequada para shift-reduce, ao contrário do parser preditivo.',
    reasoning:
      'A produção L → L, S tem L como símbolo mais à esquerda, pelo que o parser descendente entraria num ciclo infinito sem consumir entrada. A recursão à direita equivalente gera a mesma linguagem. Os parsers shift-reduce não têm esta limitação, pois podem reduzir antes de consumir o próximo símbolo.',
    explanation: link.recursao,
  },
  {
    id: 'c-mt1-2024-q1',
    title: 'Derivações e ambiguidade de uma gramática de expressões',
    source: 'Teste 1, 2023/24',
    topic: 'sintaxe',
    prompt:
      'Considere a gramática em que `+` e `*` são terminais\n\n```\nS → SS+ | SS* | a\n```\n\n' +
      'e a cadeia `aa+a*`.\n\n' +
      'a) Dê uma derivação mais à esquerda e uma derivação mais à direita para a cadeia.\n' +
      'b) Dê uma árvore de derivação para a cadeia e justifique se a gramática é ou não ambígua.',
    answer: {
      kind: 'self',
      checklist: [
        'Derivação mais à esquerda: S → SS* → SS+S* → aS+S* → aa+S* → aa+a*.',
        'Derivação mais à direita: S → SS* → Sa* → SS+a* → Sa+a* → aa+a*.',
        'A gramática é não ambígua: as três produções de S terminam num terminal diferente e só há uma árvore possível para cada cadeia.',
      ],
    },
    solution:
      'Derivações como nas listas de verificação; a árvore de `aa+a*` é S(SS+)(a, a, S(S*)(a, a)) e a gramática é não ambígua.',
    reasoning:
      'Na derivação mais à esquerda expande-se sempre o não-terminal mais à esquerda; na mais à direita, o mais à direita. Como as três produções de S terminam em terminais distintos (`a`, `+` ou `*`), ao analisar a cadeia da direita para a esquerda só é possível escolher uma produção de cada vez, pelo que cada cadeia tem no máximo uma árvore.',
    explanation: link.arvores,
  },
  {
    id: 'c-mt1-2024-q3',
    title: 'Conflito LL(1) por recursão à esquerda de B',
    source: 'Teste 1, 2023/24',
    topic: 'sintaxe',
    prompt:
      'Considere a gramática $G = (\\{S, B, D, E, F\\}, S, \\{u, v, w, x, y, z\\}, P)$ com as produções\n\n```\nS → uBDz\nB → Bv | w\nD → EF\nE → y | ε\nF → x | ε\n```\n\n' +
      'a) Calcule os conjuntos FIRST e FOLLOW dos não-terminais.\n' +
      'b) Construa a tabela de análise LL(1) e aponte a célula em conflito, justificando que a gramática não é LL(1).\n' +
      'c) Modifique a gramática o mínimo possível para que seja LL(1) e gere a mesma linguagem.',
    answer: {
      kind: 'self',
      checklist: [
        'FIRST(B) = {w}, FIRST(D) = {x, y, ε}, FOLLOW(B) = {x, y, z}.',
        'Há um conflito na célula [B, w] devido à recursão à esquerda de B → Bv.',
        'A linguagem de B é wv*, gerada por B → wB′ e B′ → vB′ | ε, com FIRST(B′) = {v} e FOLLOW(B) = FOLLOW(B′) = {x, y, z}.',
      ],
    },
    solution:
      'FIRST(S) = {u}, FIRST(B) = {w}, FIRST(D) = {x, y, ε}, FIRST(E) = {y, ε}, FIRST(F) = {x, ε}; FOLLOW(B) = {x, y, z}, FOLLOW(D) = {z}, FOLLOW(E) = {x, z}, FOLLOW(F) = {z}. O conflito está em M[B,w] (B → Bv e B → w). A gramática LL(1) usa B → wB′ e B′ → vB′ | ε.',
    reasoning:
      'Como D → EF é anulável, FOLLOW(B) inclui z além do FIRST de D. Na célula [B,w] competem duas produções porque FIRST(Bv) contém w, devido à recursão à esquerda. A linguagem de B é a cadeia w seguida de zero ou mais v, que a recursão à direita B → wB′, B′ → vB′ | ε gera sem conflito.',
    explanation: link.ll1,
  },
  {
    id: 'c-mt1-2025-q2',
    title: 'FIRST, FOLLOW e linhas da tabela LL(1)',
    source: 'Teste 1, 2025/26',
    topic: 'sintaxe',
    prompt:
      'Considere a gramática (não-terminais em maiúsculas, terminais em minúsculas)\n\n```\nS → A B C\nA → aA | Db\nD → d | ε\nB → X Y\nX → x | ε\nY → y | ε\nC → R Z\nR → rR | s\nZ → z | ε\n```\n\n' +
      'a) Calcule FIRST(A) e FIRST(D).\n' +
      'b) Calcule FOLLOW(X) e FOLLOW(Y), sabendo que FIRST(Y) = {y, ε} e FIRST(C) = {r, s}.\n' +
      'c) Construa as linhas R e Z da tabela de análise LL, sabendo que FIRST(R) = {r, s}, FOLLOW(R) = {z, $}, FIRST(Z) = {z, ε} e FOLLOW(Z) = {$}.',
    answer: {
      kind: 'self',
      checklist: [
        'FIRST(A) = {a, d, b} e FIRST(D) = {d, ε}.',
        'FOLLOW(X) = {y, r, s} e FOLLOW(Y) = {r, s}.',
        'M[R,r] = R→rR, M[R,s] = R→s; M[Z,z] = Z→z e M[Z,$] = Z→ε; as restantes células das linhas ficam vazias.',
      ],
    },
    solution:
      'FIRST(A) = {a, d, b}, FIRST(D) = {d, ε}; FOLLOW(X) = {y, r, s}, FOLLOW(Y) = {r, s}. Linhas da tabela: R: r → R→rR, s → R→s; Z: z → Z→z, $ → Z→ε.',
    reasoning:
      'FIRST(A) junta `a` (de aA) com FIRST(Db): como D é anulável, inclui `d` e `b`. Como B → XY e FIRST(C) = {r, s} (C não é anulável porque R não o é), FOLLOW(X) apanha FIRST(Y) = {y} e ainda r e s por Y ser anulável; FOLLOW(Y) = FOLLOW(B) = {r, s}. R não tem produção anulável, logo as células z e $ da linha R ficam vazias; Z é anulável, logo M[Z,$] = Z→ε.',
    explanation: link.ll1,
  },
];

export const mt1Semantica: ExamQuestion[] = [
  {
    id: 'c-mt1-2022-q3',
    title: 'Verificação de tipos com coerção e tipo bool',
    source: 'Teste 1, 2021/22',
    topic: 'semantica',
    prompt:
      'Considere uma linguagem com os tipos `int` e `float` e uma gramática de atributos para verificação de tipos de expressões aritméticas, em que o operador `+` está sobrecarregado. Para a produção\n\n```\nexp1 → exp2 + exp3\n```\n\n' +
      'a regra semântica dada é: se `exp2.type == exp3.type` então `exp1.type = exp2.type`, senão `type_error(exp1)`.\n\n' +
      'a) Altere a regra semântica para permitir a coerção implícita de `int` para `float` quando há desencontro de tipos.\n' +
      'b) Adicione um tipo `bool` e uma produção para expressões booleanas da forma `exp1 or exp2`. Admitindo que o inteiro zero e um inteiro não nulo podem representar as constantes False e True, defina as novas regras semânticas para verificar tipos de expressões com números, `+` e `or`, em que misturar booleanos e inteiros dá uma expressão booleana.',
    answer: {
      kind: 'self',
      checklist: [
        'A regra para `+` promove o operando `int` para `float` quando os tipos diferem e só um deles é numérico; caso contrário dá erro de tipo.',
        'A regra para `or` aceita tipos iguais desde que sejam `int` ou `bool`, e no caso misto `int`/`bool` produz `bool`.',
        'Nos dois casos, tipos incompatíveis (por exemplo `float` com `bool`) continuam a dar `type_error`.',
      ],
    },
    solution:
      'Para `+`: se os tipos são iguais, `exp1.type = exp2.type`; senão, se um dos lados é `int` e o outro `float`, `exp1.type = float`; senão `type_error(exp1)`. Para `or`: se os tipos são iguais e são `int` ou `bool`, `exp1.type = exp2.type`; se são mistos `int`/`bool`, `exp1.type = bool`; senão `type_error(exp1)`.',
    reasoning:
      'A coerção de `int` para `float` é sempre segura porque não perde informação; o contrário não. Na expressão booleana, misturar um inteiro (interpretado como falso se zero, verdadeiro caso contrário) com um booleano deve resultar em `bool`, e para isso o código gerado insere um teste explícito em tempo de execução. Combinações como `float` com `bool` não têm coerção possível e devem ser rejeitadas.',
    explanation: link.tipos,
  },
  {
    id: 'c-mt1-2022-q4',
    title: 'Tabelas de símbolos de procedimentos aninhados em Pascal',
    source: 'Teste 1, 2021/22',
    topic: 'semantica',
    prompt:
      'Em Pascal podem definir-se funções e procedimentos locais de outros procedimentos, visíveis apenas no âmbito do procedimento que os declara imediatamente. No código seguinte, `f3` só é visível dentro de `f2`, mas não dentro de `f1` nem de `main`:\n\n```\n01: procedure main\n02:   integer a, b, c;\n03:   procedure f1(a,b);\n04:      integer a, b;\n05:      call f2(b,a);\n06:      end;\n07:   procedure f2(y,z);\n08:      integer y, z;\n09:      procedure f3(m,n);\n10:        integer m, n;\n11:        end;\n12:      procedure f4(m,n);\n13:        integer m, n;\n14:        end;\n15:      call f3(c,z);\n16:      call f4(c,z);\n17:      end;\n18: ...\n19: call f1(a,b);\n20: end;\n```\n\n' +
      'a) Desenhe as tabelas de símbolos de cada procedimento (incluindo `main`) e mostre a relação de aninhamento através de um apontador para o âmbito pai, com as entradas relevantes para a geração de código (nome, tipo e localização em tempo de execução).\n' +
      'b) Para a instrução da linha 15, que instâncias concretas das variáveis `c` e `z` o compilador precisa de localizar? Explique como as obtém a partir das tabelas de símbolos.',
    answer: {
      kind: 'self',
      checklist: [
        'As tabelas de `main`, `f1`, `f2`, `f3` e `f4` estão ligadas por apontadores pai, com `f3` e `f4` a apontarem para `f2`.',
        'Na linha 15, `c` refere-se à variável local de `main` e `z` ao parâmetro de `f2`.',
        'A resolução percorre a cadeia de âmbitos do interior para o exterior até encontrar cada símbolo.',
      ],
    },
    solution:
      '`main` contém as variáveis a, b, c (integer); `f1` tem os parâmetros a, b; `f2` tem os parâmetros y, z; `f3` e `f4` têm os parâmetros m, n, ambas com pai `f2`. Na linha 15, `c` é a variável de `main` e `z` é o parâmetro de `f2`, localizados percorrendo a árvore de âmbitos até à raiz.',
    reasoning:
      'Cada procedimento cria um novo âmbito ligado ao âmbito que o declara. Para resolver um nome, o compilador procura primeiro no âmbito corrente e depois nos âmbitos exteriores, pelo que o `c` da linha 15 só pode ser o de `main` (não existe nenhum `c` em `f2`) e o `z` é o parâmetro declarado em `f2`.',
    explanation: link.âmbitos,
  },
  {
    id: 'c-mt1-2023-q3',
    title: 'Gramática de atributos que soma picos de uma lista',
    source: 'Teste 1, 2022/23',
    topic: 'semantica',
    prompt:
      'Desenvolva uma gramática de atributos que, numa lista de inteiros positivos separados por vírgulas, some apenas os valores (estritamente) maiores que os dois vizinhos imediatos, atribuindo o resultado a um atributo do símbolo inicial. Por exemplo, na sequência `34, 51, 22, 1, 4, 2, 7` só 51 e 4 são maiores que os vizinhos e o resultado é 51 + 4 = 55.\n\n' +
      'a) Desenvolva uma gramática livre de contexto simples que reconheça a lista, com um terminal `num` cujo valor inteiro fica no atributo `val`.\n' +
      'b) Defina os atributos (apenas tipos primitivos como inteiro ou booleano) e as regras semânticas de cada produção, indicando quais são sintetizados ou herdados.\n' +
      'c) Aplique a gramática à entrada `3, 2, 10, 9, 9` e indique o valor do atributo final; diga que tipo de percurso permite avaliar a gramática numa só passagem.',
    answer: {
      kind: 'self',
      checklist: [
        'A gramática pode ser S → S , num | num, com o valor de `num` no atributo inteiro `val`.',
        'Usam-se atributos como `sum` (inteiro), `value` (inteiro) e `leftBigger` (booleano), todos sintetizados.',
        'Para `3, 2, 10, 9, 9` o atributo final é `sum = 10` (só o 10 é maior que os dois vizinhos), e a avaliação faz-se numa travessia em pós-ordem ou durante um parser bottom-up.',
      ],
    },
    solution:
      'S → num { value = num.val; leftBigger = false; sum = 0 } e S0 → S1 , num { S0.sum e S0.leftBigger atualizados comparando num.val com S1.value e S1.leftBigger; S0.value = num.val }. Para `3, 2, 10, 9, 9`, sum = 10. Como todos os atributos são sintetizados, basta uma travessia em pós-ordem (ou a redução num parser bottom-up).',
    reasoning:
      'O atributo `leftBigger` memoriza se o valor anterior era maior que o seu vizinho esquerdo, o que permite decidir se o valor corrente tem os dois vizinhos menores usando apenas atributos sintetizados. Na entrada `3, 2, 10, 9, 9`, o 10 é maior que 2 e que 9, mas o 9 não é maior que 10, pelo que só o 10 conta e sum = 10.',
    explanation: link.atributos,
  },
  {
    id: 'c-mt1-2024-q4',
    title: 'Tradução dirigida pela sintaxe com verificação de tipos',
    source: 'Teste 1, 2023/24',
    topic: 'semantica',
    prompt:
      'Considere a gramática em que `num` é um inteiro ou um número de vírgula flutuante e `id` é um identificador\n\n```\nE → E + T\nE → T\nT → T * F\nT → F\nF → ( E )\nF → num\nF → id R\nR → [ E ]\nR → ε\n```\n\n' +
      'Desenvolva um esquema de tradução dirigida pela sintaxe, indicando atributos e regras semânticas, para:\n' +
      'a) detetar a correção de tipos das expressões derivadas de E, etiquetando como `invalid` (atributo booleano `valid`) a expressão inválida e todas as que dela dependem;\n' +
      'b) introduzir a promoção de tipos numéricos quando possível, indicando as suas hipóteses sobre quando a conversão é possível ou impossível.',
    answer: {
      kind: 'self',
      checklist: [
        'Usa um atributo booleano `valid` e um atributo `type` (com valor `undefined` quando inválido) nos não-terminais.',
        'Em `E + T` e `T * F`, tipos iguais propagam o tipo; tipos diferentes são convertidos se `conversionPossible` o permitir, senão ficam inválidos.',
        'Em `R → [ E ]` exige-se que a expressão de indexação seja `integer`; `F → id R` só é válida se R for válida.',
      ],
    },
    solution:
      'Regras: E1→E2+T e T1→T2*F copiam `valid`/`type` quando ambos os lados são válidos e os tipos coincidem ou são conversíveis (senão `valid = false`, `type = undefined`); E→T, T→F, F→(E), F→num propagam os atributos; F→id R exige R válida; R→[E] exige E válida e do tipo `integer`; R→ε é válida com `type = undefined`.',
    reasoning:
      'A verificação de tipos desce pela árvore propagando o tipo sintetizado de cada subexpressão. A promoción int → float é possível, mas float → int não o é (perde informação). A indexação de um array exige um índice inteiro, pelo que `R → [ E ]` só é válida quando E é do tipo `integer`. Se uma subexpressão é inválida, todas as que a contêm ficam inválidas.',
    explanation: link.tipos,
  },
  {
    id: 'c-mt1-2024-q5',
    title: 'Âmbitos num código C com blocos if/else',
    source: 'Teste 1, 2023/24',
    topic: 'semantica',
    prompt:
      'Considere o seguinte excerto de código C:\n\n```c\n01: int a, b, c;\n02:\n03: int funcA(int a[], int k, int n) {\n04:   int i;\n05:   double v = 0;\n06:   if (k > 0) {\n07:     int b, c;\n08:     b = a[0];\n09:     v = b + 1;\n10:   } else {\n11:     int b, d;\n12:     b = a[k-1];\n13:     d = c;\n14:     v = b + d;\n15:   }\n16:   return v;\n17: }\n```\n\n' +
      'Desenhe a organização das tabelas de símbolos dos vários âmbitos do código e indique a que variáveis se refere cada símbolo na linha 14.',
    answer: {
      kind: 'self',
      checklist: [
        'Há um âmbito de ficheiro (a, b, c e funcA), um de funcA (parâmetros a, k, n e locais i, v) e dois âmbitos de bloco, um por ramo, com pais respetivos.',
        'O ramo `then` declara b e c; o ramo `else` declara b e d.',
        'Na linha 14, `v` é a variável local de `funcA`, e `b` e `d` são as variáveis locais do bloco `else`.',
      ],
    },
    solution:
      'Âmbito global: a, b, c (integer) e funcA (função). Âmbito de funcA: parâmetros a (referência), k, n e locais i, v (double). Dois âmbitos anónimos filhos de funcA: o do `if` com b, c e o do `else` com b, d. Na linha 14: v de funcA, b e d do bloco else.',
    reasoning:
      'Cada bloco `{ ... }` cria um novo ámbito ligado ao de funcA. Na linha 14, `v` não está declarada no bloco `else`, pelo que a procura sobe até funcA; `b` e `d` estão declaradas no próprio bloco, pelo que o `c` global fica tapado e nunca é usado.',
    explanation: link.âmbitos,
  },
  {
    id: 'c-mt1-2025-q3',
    title: 'Sobrecarga de funções e âmbitos em C++',
    source: 'Teste 1, 2025/26',
    topic: 'semantica',
    prompt:
      'Considere o seguinte código C++:\n\n```cpp\n1:  double x = 1.0;\n2:  int y = 2;\n3:\n4:  int sum(int a, int b) {\n5:     return a + b;\n6:  }\n7:\n8:  double sum(double a, int b) {\n9:     return a + b;\n10: }\n11:\n12: int main() {\n13:   int z = 10;\n14:   {\n15:      double y = x;\n16:      double z = sum(y, 2);\n17:   }\n18:   sum(z, 3);\n19:   return 0;\n20: }\n```\n\n' +
      'a) Construa uma tabela de símbolos por âmbito e como se ligam entre si, identificando o tipo de âmbito (global, função com assinatura, bloco) e, para cada entrada, o nome, o tipo e a categoria (global, local, parâmetro).\n' +
      'b) Qual é a assinatura da função `sum` chamada na linha 18? Justifique com a tabela de símbolos.',
    answer: {
      kind: 'self',
      checklist: [
        'O âmbito global contém x, y e as duas sobrecargas de sum com as respetivas assinaturas.',
        'O âmbito de main contém z (int); o bloco interior contém y (double) e z (double), que tapam os exteriores.',
        'Na linha 18 a chamada é `sum(int, int)`, porque `z` é o inteiro declarado na linha 13 e o literal 3 é inteiro.',
      ],
    },
    solution:
      'Âmbito global: x (double), y (int), sum(int,int) e sum(double,int). Âmbito de main: z (int, local). Bloco interior: y (double) e z (double), que fazem shadowing. Na linha 18, `sum(z, 3)` resolve para a assinatura `sum(int, int)`.',
    reasoning:
      'A linha 18 está fora do bloco interior, pelo que o `z` visível é o inteiro de main e não o double do bloco. Como o segundo argumento 3 também é inteiro, a sobrecarga escolhida é `int sum(int, int)`; a outra overload exigiria converter o primeiro argumento para double, que tem menor prioridade na resolução de sobrecargas.',
    explanation: link.sobrecargas,
  },
];

export const mt1Intermedio: ExamQuestion[] = [
  {
    id: 'c-mt1-2023-q4',
    title: 'Código de três endereços para atribuições e expressões',
    source: 'Teste 1, 2022/23',
    topic: 'intermedio',
    prompt:
      'Considere a gramática para listas de instruções (StatList) com atribuições (Assign) e expressões (Expr), em que `const` é uma constante inteira e `id` uma variável escalar:\n\n```\n(0) StatList → Stat ; StatList\n(1) StatList → Stat\n(2) Stat → Assign\n(3) Expr → id\n(4) Expr → id + Expr\n(5) Expr → const\n(6) Assign → id = Expr\n(7) Assign → id += Expr\n```\n\n' +
      'a) Numa máquina alvo com instruções de três endereços, escreva uma definição dirigida pela sintaxe que gere código para StatList, Assign e Expr, usando o mínimo de registos temporários possível. Descreva os atributos e as funções auxiliares usadas.\n' +
      'b) Quanto às expressões aritméticas, esta gramática é associativa à esquerda ou à direita? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'O esquema usa atributos sintetizados que devolvem o nome do operando (variável, constante ou temporário) em vez de criar um temporário novo em cada nó.',
        'Assign → id = Expr e id += Expr emitem a instrução correspondente com o operando devolvido por Expr.',
        'A gramática é associativa à direita, porque a produção Expr → id + Expr agrega as expressões do lado direito (árvore inclinada à direita).',
      ],
    },
    solution:
      'Expr → id devolve o nome da variável; Expr → const devolve a constante; Expr0 → id + Expr1 emite `t = id + <operando de Expr1>` num novo temporário (ou aplica dobramento de constantes) e devolve `t`. Assign → id = Expr emite `id = <operando>` e Assign → id += Expr emite `id = id + <operando>`. A gramática é associativa à direita.',
    reasoning:
      'Para minimizar temporários, transporta-se para cima na árvore uma cadeia com o operando (variável, constante ou temporário) em vez de um novo temporário por nó; só a soma cria um temporário quando necessário. Como a recursão de Expr está no símbolo mais à direita de `id + Expr`, a árvore de `a + b + c` é inclinada à direita, ou seja, associativa à direita.',
    explanation: link.temporarios,
  },
  {
    id: 'c-mt1-2024-q6',
    title: 'Código intermédio de uma função com ciclo while',
    source: 'Teste 1, 2023/24',
    topic: 'intermedio',
    prompt:
      'Considere a função C e o respetivo ponto de chamada:\n\n```c\nint findNegative(int a[], int n) {\n   int i = 0;\n   int idx = -1;\n   while (true) {\n     if (i >= n)\n       break;\n     if (a[i] < 0)\n       break;\n     i = i + 1;\n     idx = idx + 1;\n   }\n   return idx;\n}\n\nv = findNegative(a, 20);\n```\n\n' +
      'Admitindo que os argumentos são passados numa pilha e que para arrays se passa o endereço do primeiro elemento, desenvolva um código intermédio plausível de três endereços para a função e para o ponto de chamada.',
    answer: {
      kind: 'self',
      checklist: [
        'O prólogo usa `getparam` para n e a e inicializa i = 0 e idx = -1.',
        'O ciclo while(true) traduz-se num salto incondicional para o teste, com dois ramos de saída para o rótulo de fim.',
        'O ponto de chamada usa `putparam a`, `putparam n` e `v = call findNegative, 2`.',
      ],
    },
    solution:
      'findNegative: n = getparam; a = getparam; i = 0; idx = -1; L1: if true goto L2; goto L3; L2: if i >= n goto L3; t2 = a[i]; if t2 < 0 goto L3; i = i + 1; idx = idx + 1; goto L1; L3: return idx. Chamada: putparam a; putparam n; v = call findNegative, 2.',
    reasoning:
      'O `while (true)` precisa de um ciclo infinito explícito: o corpo começa num teste e termina com um salto incondicional de volta ao início. Cada `break` é um salto condicional para o rótulo de fim L3. Como o array é passado por referência, basta passar o endereço de `a` com `putparam`.',
    explanation: link.temporarios,
  },
];
