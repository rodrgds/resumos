import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  sistemas: '/cadeiras/fsc/sistemas-digitais/',
  inteiros: '/cadeiras/fsc/inteiros-complemento-dois/',
  flutuante: '/cadeiras/fsc/virgula-flutuante/',
  boole: '/cadeiras/fsc/algebra-boole-portas/',
  combinatorios: '/cadeiras/fsc/circuitos-combinatorios/',
  sequenciais: '/cadeiras/fsc/circuitos-sequenciais/',
  memorias: '/cadeiras/fsc/memorias/',
};

export const mt1Representacao: ExamQuestion[] = [
  {
    id: 'fsc-mt1-2023-q1',
    title: 'Conversão de binário com parte fracionária',
    source: 'Teste 1, 2023/24',
    topic: 'representacao',
    prompt:
      'O número binário $1110101{,}01_2$ está representado em que base e como?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'em octal por $165{,}1_8$',
          correct: false,
          explanation:
            'A parte fracionária $0{,}01_2 = 0{,}25_{10} = 0{,}2_8$, não $0{,}1_8$.',
        },
        {
          text: 'em octal por $165{,}4_8$',
          correct: false,
          explanation:
            'A parte fracionária $0{,}01_2 = 0{,}2_8$, não $0{,}4_8$.',
        },
        {
          text: 'em hexadecimal por $75{,}4_{16}$',
          correct: true,
          explanation: '$1110101_2 = 75_{16}$ e $0{,}01_2 = 0{,}4_{16}$.',
        },
        {
          text: 'em decimal por $117{,}125_{10}$',
          correct: false,
          explanation: 'O valor decimal é $117 + 0{,}25 = 117{,}25_{10}$.',
        },
      ],
    },
    solution: 'Em hexadecimal, $1110101{,}01_2 = 75{,}4_{16}$.',
    reasoning:
      'Agrupando os bits da parte inteira em nibbles, $0111\,0101_2 = 75_{16}$. Na parte fracionária, $0{,}01_2 = 2^{-1}/2 = 0{,}25_{10}$, que em hexadecimal é o dígito $4$ na primeira casa ($4/16 = 0{,}25$).',
    explanation: link.sistemas,
  },
  {
    id: 'fsc-mt1-2023-q2',
    title: 'Interpretação de 8 bits em complemento para dois',
    source: 'Teste 1, 2023/24',
    topic: 'representacao',
    prompt:
      'O número decimal representado por $10111010_2$ em 8 bits é quanto, consoante a interpretação?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$58$, se interpretado sem sinal',
          correct: false,
          explanation: 'Sem sinal, $10111010_2 = 186_{10}$.',
        },
        {
          text: '$58$, se interpretado em sinal e grandeza',
          correct: false,
          explanation:
            'Em sinal e grandeza, o bit de sinal é 1 e a grandeza é $0111010_2 = 58$, logo o valor é $-58$.',
        },
        {
          text: '$-70$, se interpretado em complemento para dois',
          correct: true,
          explanation:
            'Complementando: $\overline{10111010}_2 + 1 = 00000101_2 + 1 = 00000110_2 = 70$, com sinal negativo.',
        },
        {
          text: '$-186$, se interpretado em sinal e grandeza',
          correct: false,
          explanation: 'Em sinal e grandeza o valor é $-58$, não $-186$.',
        },
      ],
    },
    solution: 'Em complemento para dois com 8 bits, $10111010_2 = -70_{10}$.',
    reasoning:
      'O bit mais significativo é 1, logo o número é negativo em complemento para dois. O módulo obtém-se invertendo os bits e somando 1: $01000101_2 + 1 = 01000110_2 = 64 + 4 + 2 = 70$.',
    explanation: link.inteiros,
  },
  {
    id: 'fsc-mt1-2023-q17',
    title: 'Valor decimal de um número em vírgula fixa Q4.2',
    source: 'Teste 1, 2023/24',
    topic: 'representacao',
    prompt:
      'Considere o número binário $110101_2$ que denota um número em vírgula fixa no formato Q4.2. Qual é o valor decimal correspondente?',
    answer: {
      kind: 'number',
      value: -2.75,
      tolerance: 0,
    },
    solution: '$-2{,}75$.',
    reasoning:
      'No formato Q4.2, o número tem 6 bits no total: o bit de sinal, 3 bits inteiros e 2 bits fracionários. Como $110101_2$ em complemento para dois com 6 bits vale $53 - 64 = -11$, o valor em vírgula fixa é $-11 / 2^2 = -2{,}75$.',
    explanation: link.inteiros,
  },
  {
    id: 'fsc-mt1-2023-q5',
    title: 'Valor decimal de um número IEEE-754 em hexadecimal',
    source: 'Teste 1, 2023/24',
    topic: 'representacao',
    prompt:
      'A representação hexadecimal de um número no formato IEEE-754 de precisão simples é $\texttt{C0700000}_{16}$. Qual é o valor decimal do número?',
    answer: {
      kind: 'number',
      value: -3.75,
      tolerance: 0,
    },
    solution: '$-3{,}75$.',
    reasoning:
      'Separando os campos: sinal $= 1$ (negativo), expoente $= 10000000_2 = 128$, logo expoente real $128 - 127 = 1$, e mantissa $= 1{,}111_2 = 1{,}875$. O valor é $-1{,}875 \times 2^1 = -3{,}75$.',
    explanation: link.flutuante,
  },
  {
    id: 'fsc-mt1-2015-q2',
    title: 'Soma em complemento para dois com 7 bits',
    source: 'Teste 1, 2015/16',
    topic: 'representacao',
    prompt:
      'Considere os números $X = 1111001_2$ e $Y = 0100001_2$ com 7 bits. Assumindo que estão em complemento para dois, calcule $X + Y$.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$0011010_2$',
          correct: true,
          explanation: '$X = -7$ e $Y = 33$, logo $X + Y = 26 = 0011010_2$.',
        },
        {
          text: '$0011001_2$',
          correct: false,
          explanation: 'Esse valor corresponde a $25_{10}$, não a $26_{10}$.',
        },
        {
          text: '$10011101_2$',
          correct: false,
          explanation:
            'A soma não produz transporte para fora do bit mais significativo que altere o sinal.',
        },
        {
          text: '$10011010_2$',
          correct: false,
          explanation:
            'Esse valor seria negativo em complemento para dois, mas o resultado é positivo.',
        },
      ],
    },
    solution: '$X + Y = 0011010_2$.',
    reasoning:
      'Em complemento para dois, a soma faz-se como soma binária normal, ignorando o carry para fora do bit mais significativo: $1111001_2 + 0100001_2 = 1/0011010_2$, ou seja $0011010_2 = 26_{10}$. Em decimal, $X = -7$ e $Y = 33$.',
    explanation: link.inteiros,
  },
  {
    id: 'fsc-mt1-2017-q11',
    title: 'Manipulação da representação IEEE-754',
    source: 'Teste 1, 2017/18',
    topic: 'representacao',
    prompt:
      'A representação do número $X$ no formato IEEE-754 de precisão simples, em hexadecimal, é $\texttt{427F0000}_{16}$. (a) Determine o valor de $X$ em decimal. (b) Determine a representação de $16 \times X$ por manipulação da representação binária de $X$. (c) Para o cálculo de $2^k \times X$, com $k$ inteiro maior que zero, determine o maior valor de $k$ para o qual o resultado ainda é representável em precisão simples sem overflow.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $X = 63{,}75$.',
        'A resposta indica que $16 \times X$ se representa por $\texttt{447F0000}_{16}$.',
        'A resposta indica que o maior valor de $k$ é 122.',
      ],
    },
    solution: '(a) $X = 63{,}75$. (b) $\texttt{447F0000}_{16}$. (c) $k = 122$.',
    reasoning:
      '(a) A representação binária é $0100\,0010\,0111\,1111\,0000\,0000\,0000\,0000$: sinal 0, expoente $10000100_2 = 132$ (real $132 - 127 = 5$) e mantissa $1{,}1111111_2$. Deslocando a vírgula 5 casas, obtém-se $111111{,}11_2 = 63{,}75$. (b) Multiplicar por $16 = 2^4$ aumenta o expoente em 4: expoente codificado $136 = 10001000_2$, ou seja $\texttt{447F0000}_{16}$. (c) O maior expoente codificado utilizável é 254 (255 é reservado), logo $k_{\text{máx}} = 254 - 132 = 122$.',
    explanation: link.flutuante,
  },
  {
    id: 'fsc-mt1-2020-q11',
    title: 'Soma em vírgula flutuante sem conversão para decimal',
    source: 'Teste 1, 2020/21',
    topic: 'representacao',
    prompt:
      'Dois números $A$ e $B$ estão codificados no formato IEEE-754 de precisão simples, com representações hexadecimais $A = \texttt{C3E2B000}_{16}$ e $B = \texttt{C366A000}_{16}$. (a) Indique, justificando, o valor decimal de $B$. (b) Realize a operação $A + B$ sem conversão para decimal, indicando todos os passos.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $B = -230{,}625$.',
        'A resposta indica que $A + B = \texttt{C42B0000}_{16}$.',
      ],
    },
    solution: '(a) $B = -230{,}625$. (b) $A + B = \texttt{C42B0000}_{16}$.',
    reasoning:
      '(a) $B = 1\,10000110\,1100110101000000000000_2$: sinal 1, expoente $134$ (real $134 - 127 = 7$), mantissa $1{,}1100110101_2$. Assim, $B = -1{,}1100110101_2 \times 2^7 = -11100110{,}101_2 = -230{,}625$. (b) Ambos são negativos, logo o sinal do resultado é 1. Os expoentes reais são 8 (de $A$) e 7 (de $B$); alinhando a mantissa de $B$ uma casa para a direita e somando as mantissas de $A$ e $B$ obtém-se $10{,}1010110000_2$, que normalizado dá $1{,}0101011_2$ com expoente real 9. O resultado é $1\,10001000\,0101011000000000000000_2 = \texttt{C42B0000}_{16}$.',
    explanation: link.flutuante,
  },
  {
    id: 'fsc-mt1-2020-q4',
    title: 'Multiplicação de números binários sem sinal',
    source: 'Teste 1, 2020/21',
    topic: 'representacao',
    prompt:
      'Sejam $A = 101{,}01_2$ e $B = 10{,}1_2$ dois números em binário sem sinal. O valor do produto $A \times B$ é:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$1100{,}001_2$',
          correct: false,
          explanation: 'Esse valor é $12{,}125_{10}$, não $13{,}125_{10}$.',
        },
        {
          text: '$1101{,}101_2$',
          correct: false,
          explanation: 'Esse valor é $13{,}625_{10}$, não $13{,}125_{10}$.',
        },
        {
          text: '$1011{,}001_2$',
          correct: false,
          explanation: 'Esse valor é $11{,}125_{10}$, não $13{,}125_{10}$.',
        },
        {
          text: '$1101{,}001_2$',
          correct: true,
          explanation:
            '$A = 5{,}25_{10}$ e $B = 2{,}5_{10}$, logo $A \times B = 13{,}125_{10} = 1101{,}001_2$.',
        },
      ],
    },
    solution: '$A \times B = 1101{,}001_2$.',
    reasoning:
      'Em decimal, $A = 4 + 1 + 0{,}25 = 5{,}25$ e $B = 2 + 0{,}5 = 2{,}5$. O produto é $5{,}25 \times 2{,}5 = 13{,}125$. Convertendo: a parte inteira $13 = 1101_2$ e a parte fracionária $0{,}125 = 0{,}001_2$.',
    explanation: link.sistemas,
  },
];

export const mt1Booleana: ExamQuestion[] = [
  {
    id: 'fsc-mt1-2023-q7',
    title: 'Conjunto de portas que não é funcionalmente completo',
    source: 'Teste 1, 2023/24',
    topic: 'booleana',
    prompt:
      'Qual dos seguintes conjuntos de portas não pode ser usado para implementar todas as funções booleanas?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\{\text{MUX 4:1}\}$',
          correct: false,
          explanation:
            'Um multiplexador 4:1 com as entradas adecuadas realiza qualquer função de 2 variáveis e, com constantes, também o NOT, sendo funcionalmente completo.',
        },
        {
          text: '$\{\text{OR2}, \text{NOT}\}$',
          correct: false,
          explanation:
            'Com NOT e OR obtém-se AND por De Morgan, logo o conjunto é completo.',
        },
        {
          text: '$\{\text{NAND2}\}$',
          correct: false,
          explanation:
            'Só com NAND2 se obtém NOT e AND, logo o conjunto é completo.',
        },
        {
          text: '$\{\text{AND2}, \text{OR2}\}$',
          correct: true,
          explanation:
            'Sem porta de negação, nenhuma combinação de AND2 e OR2 produz a função NOT, pelo que o conjunto não é completo.',
        },
      ],
    },
    solution:
      'O conjunto $\{\text{AND2}, \text{OR2}\}$ não implementa todas as funções booleanas.',
    reasoning:
      'AND e OR são funções monótonas: trocar uma entrada de 0 para 1 nunca faz a saída passar de 1 para 0. A função NOT não é monótona, logo não pode ser realizada só com AND2 e OR2. Os restantes conjuntos incluem (direta ou derivados) uma porta de negação.',
    explanation: link.boole,
  },
  {
    id: 'fsc-mt1-2023-q16',
    title: 'Multiplexadores 2:1 necessários para um 8:1',
    source: 'Teste 1, 2023/24',
    topic: 'booleana',
    prompt:
      'Qual é o número mínimo de multiplexadores 2:1 necessários para construir um multiplexador 8:1?',
    answer: {
      kind: 'number',
      value: 7,
      tolerance: 0,
    },
    solution: '7 multiplexadores 2:1.',
    reasoning:
      'Cada nível de multiplexadores 2:1 reduz o número de entradas a metade: são precisos 4 para passar de 8 a 4 entradas, mais 2 para passar de 4 a 2, e mais 1 na saída, num total de $4 + 2 + 1 = 7$.',
    explanation: link.combinatorios,
  },
  {
    id: 'fsc-mt1-2017-q12',
    title: 'Função de maioria: tabela de verdade e forma canónica',
    source: 'Teste 1, 2017/18',
    topic: 'booleana',
    prompt:
      'Um sistema crítico é composto por 3 componentes iguais do tipo C e um módulo M que apresenta na sua saída o valor obtido pela maioria das três entradas $X$, $Y$ e $Z$ (votador por maioria). (a) Apresente a tabela de verdade da função $F(X, Y, Z)$ do módulo M. (b) Indique a expressão simplificada de $F$ no formato de produto de somas, usando simplificação algébrica. (c) Mostre que a função também pode ser escrita como $F(X, Y, Z) = X \cdot Y + Y \cdot Z + X \cdot Z$.',
    answer: {
      kind: 'self',
      checklist: [
        'A tabela de verdade tem $F = 1$ apenas quando pelo menos duas entradas são 1.',
        'A expressão em produto de somas simplificada é $(X + Y) \cdot (Y + Z) \cdot (X + Z)$.',
        'A justificação mostra que $X \cdot Y + Y \cdot Z + X \cdot Z$ vale 1 exatamente nos mesmos quatro casos.',
      ],
    },
    solution:
      '(a) $F = 1$ para $(0,1,1)$, $(1,0,1)$, $(1,1,0)$ e $(1,1,1)$, e $F = 0$ nos restantes casos. (b) $F(X, Y, Z) = (X + Y) \cdot (Y + Z) \cdot (X + Z)$. (c) $F(X, Y, Z) = X \cdot Y + Y \cdot Z + X \cdot Z$.',
    reasoning:
      '(a) A maioria de três bits é 1 quando há pelo menos dois uns. (b) A partir dos zeros da tabela, o produto de somas completo simplifica por distributividade e complemento para $(X + Y)(Y + Z)(X + Z)$. (c) A soma de produtos $X \cdot Y + Y \cdot Z + X \cdot Z$ vale 1 quando algum par de entradas é $(1,1)$, ou seja, precisamente nos quatro casos em que há maioria de uns; as duas expressões são, portanto, equivalentes.',
    explanation: link.boole,
  },
];

export const mt1Sequenciais: ExamQuestion[] = [
  {
    id: 'fsc-mt1-2015-q9',
    title: 'Registo de deslocamento que deteta o padrão 101',
    source: 'Teste 1, 2015/16',
    topic: 'sequenciais',
    prompt:
      'Considere um circuito com três flip-flops D em cascata, todos inicialmente a 0, em que a saída $Z$ é o AND lógico da entrada $X$ com as duas primeiras saídas dos flip-flops. Qual das sequências aplicadas à entrada $X$, em períodos sucessivos de relógio, faz com que a saída $Z$ fique exatamente duas vezes a 1?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$11111_2$',
          correct: false,
          explanation:
            'Só produz o padrão 101 uma vez (nas últimas três posições).',
        },
        {
          text: '$01101_2$',
          correct: false,
          explanation: 'Contém o padrão 101 apenas uma vez.',
        },
        {
          text: '$01010_2$',
          correct: false,
          explanation: 'Contém o padrão 101 apenas uma vez.',
        },
        {
          text: '$10101_2$',
          correct: true,
          explanation:
            'Os últimos três bits são 101 nas posições 3 e 5, logo $Z = 1$ exatamente duas vezes (sequência de saída $00101$).',
        },
      ],
    },
    solution: 'A sequência $10101_2$.',
    reasoning:
      'No ciclo $n$, as entradas do AND são $X_n$, $X_{n-1}$ e $X_{n-2}$, logo $Z = 1$ quando a janela de três bits é 101. Na sequência $10101$, isso acontece no 3.º e no 5.º ciclos, com saída $00101$.',
    explanation: link.sequenciais,
  },
  {
    id: 'fsc-mt1-2017-q13',
    title: 'Circuito sequencial com somador completo',
    source: 'Teste 1, 2017/18',
    topic: 'sequenciais',
    prompt:
      'Considere um circuito sequencial síncrono com um somador completo (full adder) e dois flip-flops, todos inicialmente a 0. As entradas recebem um novo valor a cada ciclo: $X = 1, 0, 1, 0, 1$ e $Y = 0, 1, 1, 1, 0$ (tempo crescente). (a) Determine os valores sucessivos da saída $Z$ ao longo de cinco períodos de relógio e o valor final guardado no segundo flip-flop. (b) Explique a relação geral entre a sequência de saída e as sequências de entrada.',
    answer: {
      kind: 'self',
      checklist: [
        'A sequência de saída é $Z = 0, 1, 1, 0, 0, 0$ (incluindo o valor inicial $Z_0 = 0$).',
        'O valor final do segundo flip-flop é 1.',
        'A relação geral é $Z_{i+1} = X_i \oplus Y_i \oplus C_i$, ou seja, a saída é a soma (mod 2) das entradas acumuladas.',
      ],
    },
    solution:
      '(a) $Z_0, Z_1, \ldots, Z_5 = 0, 1, 1, 0, 0, 0$ e o valor final em FF2 é 1. (b) $Z_{i+1} = X_i \oplus Y_i \oplus C_i$, com $C_i$ o carry acumulado.',
    reasoning:
      'O somador completo produz $S = X \oplus Y \oplus C_{in}$ e $C_{out}$ = maioria de $X$, $Y$, $C_{in}$; os flip-flops guardam $S$ e $C_{out}$ após cada flanco de relógio. Com $X = 1,0,1,0,1$ e $Y = 0,1,1,1,0$: ciclo 1 dá $S = 1$, $C = 0$; ciclo 2 dá $S = 1$, $C = 0$; ciclo 3 dá $S = 0$, $C = 1$; ciclo 4 dá $S = 0$, $C = 1$; ciclo 5 dá $S = 0$, $C = 1$. Logo $Z = 0,1,1,0,0,0$ e FF2 fica com o último carry, 1. Em geral, $Z_{i+1} = X_i \oplus Y_i \oplus C_i$, pelo que a sequência de saída é a soma lógica (bit a bit, mod 2) das sequências de entrada acumuladas.',
    explanation: link.sequenciais,
  },
  {
    id: 'fsc-mt1-2020-q13',
    title: 'Comparador ligado a um registo: deteção de máximos locais',
    source: 'Teste 1, 2020/21',
    topic: 'sequenciais',
    prompt:
      'Um comparador de 8 bits (números sem sinal) tem a entrada $A$ ligada ao valor atual e a entrada $B$ à saída de um registo de 8 bits que guarda o valor do ciclo anterior. A saída $Z$ do comparador é 1 se $A > B$ e 0 caso contrário. O registo está inicialmente a 0. Determine o valor da saída $Z$ em cada um dos nove ciclos para a sequência de entrada $A = 12, 15, 17, 11, 6, 9, 21, 14, 25$.',
    answer: {
      kind: 'self',
      checklist: [
        'A sequência de saída é $Z = 1, 1, 1, 0, 0, 1, 1, 0, 1$.',
        'A justificação compara cada valor de $A$ com o valor anterior guardado no registo.',
      ],
    },
    solution: '$Z = 1, 1, 1, 0, 0, 1, 1, 0, 1$.',
    reasoning:
      'Em cada ciclo, $B$ é o valor de $A$ no ciclo anterior (no primeiro ciclo, $B = 0$). Comparando: $12 > 0$, $15 > 12$, $17 > 15$, $11 \ngtr 17$, $6 \ngtr 11$, $9 > 6$, $21 > 9$, $14 \ngtr 21$, $25 > 14$. Logo a saída é $1, 1, 1, 0, 0, 1, 1, 0, 1$, ou seja, o circuito sinaliza os valores que são maiores que o antecessor.',
    explanation: link.sequenciais,
  },
];

export const mt1Memorias: ExamQuestion[] = [
  {
    id: 'fsc-mt1-2015-q8',
    title: 'Endereço da última posição de uma memória',
    source: 'Teste 1, 2015/16',
    topic: 'memorias',
    prompt:
      'A primeira posição de uma memória de 1 KiB (8 bits por posição) tem o endereço $\texttt{0x0C00}$. Qual é o endereço da última posição?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\texttt{0x0FFF}$',
          correct: true,
          explanation:
            'A memória tem $2^{10}$ posições; o endereço final tem os 10 bits menos significativos a 1: $\texttt{0x0C00} + \texttt{0x3FF} = \texttt{0x0FFF}$.',
        },
        {
          text: '$\texttt{0xFC00}$',
          correct: false,
          explanation:
            'Esse endereço não corresponde ao fim de um bloco de 1 KiB a partir de $\texttt{0x0C00}$.',
        },
        {
          text: '$\texttt{0xFFFF}$',
          correct: false,
          explanation:
            'Só seria o caso se a memória começasse em $\texttt{0xFC00}$.',
        },
        {
          text: '$\texttt{0x0FFE}$',
          correct: false,
          explanation:
            'Esse é o penúltimo endereço; faltam contar as 1024 posições.',
        },
      ],
    },
    solution: 'O endereço da última posição é $\texttt{0x0FFF}$.',
    reasoning:
      'Uma memória de 1 KiB tem $2^{10} = 1024$ posições, que ocupam 10 bits de endereço. O endereço inicial é $0000\,1100\,0000\,0000_2$; o endereço final tem esses 10 bits menos significativos todos a 1, ou seja $0000\,1111\,1111\,1111_2 = \texttt{0x0FFF}$.',
    explanation: link.memorias,
  },
  {
    id: 'fsc-mt1-2020-q6',
    title: 'Capacidade de uma SRAM de 16 bits de endereço e dados',
    source: 'Teste 1, 2020/21',
    topic: 'memorias',
    prompt:
      'Uma memória do tipo SRAM tem 16 bits de endereço e 16 bits de dados. Qual é a sua capacidade?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '256 KiB',
          correct: false,
          explanation: 'Esse seria o valor com 8 bits de dados por posição.',
        },
        {
          text: '32 KiB',
          correct: false,
          explanation:
            'Esse valor não corresponde a $2^{16}$ posições de 16 bits.',
        },
        {
          text: '64 KiB',
          correct: false,
          explanation:
            'Esse seria o número de posições, não a capacidade em bytes.',
        },
        {
          text: '128 KiB',
          correct: true,
          explanation:
            'A memória tem $2^{16}$ posições de 16 bits = 2 bytes, logo $65536 \times 2 = 131072$ bytes $= 128$ KiB.',
        },
      ],
    },
    solution: 'A capacidade é 128 KiB.',
    reasoning:
      'Com 16 bits de endereço há $2^{16} = 65536$ posições. Como cada posição guarda 16 bits = 2 bytes, a capacidade total é $65536 \times 2\,\text{bytes} = 131072\,\text{bytes} = 128\,\text{KiB}$.',
    explanation: link.memorias,
  },
  {
    id: 'fsc-mt1-2015-q13',
    title: 'Mapa de endereços com descodificação total e parcial',
    source: 'Teste 1, 2015/16',
    topic: 'memorias',
    prompt:
      'Um sistema de memória com 20 bits de endereço é composto por duas RAM: RAM1 usa descodificação total e o seu chip select é $CS_1 = \overline{A_{19}} \cdot \overline{A_{18}}$; RAM2 tem 16 bits de endereço ligados a $A_{15:0}$ e o seu chip select é $CS_2 = A_{19} \cdot \overline{A_{17}}$. (a) Calcule a capacidade de RAM1 e a sua gama de endereços. (b) Determine as gamas de endereços a que RAM2 responde. (c) Pretende-se acrescentar um novo módulo: determine a capacidade máxima possível, a gama de endereços que deve ocupar e a expressão do seu chip select, justificando o tipo de descodificação a usar.',
    answer: {
      kind: 'self',
      checklist: [
        'RAM1 tem 256 KiB e responde de $\texttt{00000}_{16}$ a $\texttt{3FFFF}_{16}$.',
        'RAM2 responde às gamas $\texttt{80000}$–$\texttt{9FFFF}$, $\texttt{C0000}$–$\texttt{DFFFF}$ (descodificação parcial, 4 gamas de 64 KiB).',
        'O novo módulo pode ter no máximo 256 KiB, na gama $\texttt{40000}$–$\texttt{7FFFF}$, com descodificação total e $CS = \overline{A_{19}} \cdot A_{18}$.',
      ],
    },
    solution:
      '(a) RAM1: 256 KiB, de $\texttt{00000}_{16}$ a $\texttt{3FFFF}_{16}$. (b) RAM2: $\texttt{80000}_{16}$–$\texttt{9FFFF}_{16}$ e $\texttt{C0000}_{16}$–$\texttt{DFFFF}_{16}$ (quatro gamas de 64 KiB cada). (c) Máximo de 256 KiB em $\texttt{40000}_{16}$–$\texttt{7FFFF}_{16}$, com $CS = \overline{A_{19}} \cdot A_{18}$ e descodificação total.',
    reasoning:
      '(a) Com descodificação total, os 18 bits $A_{17:0}$ endereçam a RAM1: $2^{18} \times 8\,\text{bits} = 256$ KiB. O chip select é 1 quando $A_{19} = A_{18} = 0$, logo a gama é $\texttt{00000}_{16}$–$\texttt{3FFFF}_{16}$. (b) $CS_2 = 1$ quando $A_{19} = 1$ e $A_{17} = 0$; como $A_{18}$ e $A_{16}$ não entram no chip select, cada posição responde a 4 endereços, dando as gamas $\texttt{80000}$–$\texttt{9FFFF}$, $\texttt{A0000}$–$\texttt{BFFFF}$, $\texttt{C0000}$–$\texttt{DFFFF}$ e $\texttt{E0000}$–$\texttt{FFFF}$, cada uma de 64 KiB. (c) A maior gama livre é $\texttt{40000}_{16}$–$\texttt{7FFFF}_{16}$ (256 KiB). Para que cada posição só seja acedida por um único endereço é preciso descodificação total; com 18 bits de endereço e 2 bits de seleção, $CS = \overline{A_{19}} \cdot A_{18}$.',
    explanation: link.memorias,
  },
];
