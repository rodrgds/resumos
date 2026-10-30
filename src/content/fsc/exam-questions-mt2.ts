import type { ExamQuestion } from '../../lib/exam-question';

export const mt2Desempenho: ExamQuestion[] = [
  {
    id: 'fsc-mt2-2018-q8',
    title: 'Alteração que produz o melhor desempenho',
    source: 'Teste 2, 2017/18',
    topic: 'desempenho',
    prompt:
      'O tempo de execução de um programa está repartido entre a execução de instruções da classe A (60% do tempo) e da classe B (40% do tempo). Qual das seguintes alterações leva ao melhor desempenho?\n\n- A. Diminuir para metade o tempo das instruções de classe A.\n- B. Diminuir o tempo das instruções de classe B para um quarto do original.\n- C. Reduzir o tempo de A para um terço e aumentar o de B para o dobro.\n- D. Reduzir 1,5 vezes o tempo de A e reduzir o de B para metade.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A',
          correct: false,
          explanation: 'Novo tempo proporcional: 0,6/2 + 0,4 = 0,7.',
        },
        {
          text: 'B',
          correct: false,
          explanation: 'Novo tempo proporcional: 0,6 + 0,4/4 = 0,7.',
        },
        {
          text: 'C',
          correct: false,
          explanation:
            'Novo tempo proporcional: 0,6/3 + 0,4*2 = 1,0, pior que o original.',
        },
        {
          text: 'D',
          correct: true,
          explanation:
            'Novo tempo proporcional: 0,6/1,5 + 0,4/2 = 0,4 + 0,2 = 0,6, o menor de todos.',
        },
      ],
    },
    solution:
      'A melhor alternativa é a D, com tempo proporcional 0,6 do original.',
    reasoning:
      'Comparando os tempos proporcionais: A dá 0,7, B dá 0,7, C dá 1,0 e D dá 0,6. Quanto menor o tempo, melhor o desempenho, logo a alternativa D é a correta.',
  },
  {
    id: 'fsc-mt2-2018-q9',
    title: 'Speedup de Amdahl numa transferência de dados',
    source: 'Teste 2, 2017/18',
    topic: 'desempenho',
    prompt:
      'Um programa gasta 75% do tempo em transferências de dados para outro computador via rede sem fios. Quantas vezes é preciso aumentar a velocidade de transferência para obter um speedup de duas vezes no tempo de execução total?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '4',
          correct: false,
          explanation: 'Daria speedup 1/(0,25 + 0,75/4) = 16/7, inferior a 2.',
        },
        { text: '1,5', correct: false, explanation: 'Speedup insuficiente.' },
        {
          text: '3',
          correct: true,
          explanation: 'Pela lei de Amdahl: 1/(0,25 + 0,75/3) = 1/0,5 = 2.',
        },
        {
          text: '2',
          correct: false,
          explanation: 'Daria speedup 1/(0,25 + 0,75/2) = 8/5 = 1,6.',
        },
      ],
    },
    solution: 'É preciso aumentar 3 vezes a velocidade de transferência.',
    reasoning:
      'Pela lei de Amdahl, com fração melhorada $f = 0{,}75$ e fator de melhoria $k$: $\\text{speedup} = \\frac{1}{(1-f) + f/k} = 2$. Resolvendo, $0{,}25 + 0{,}75/k = 0{,}5$, logo $k = 3$.',
  },
  {
    id: 'fsc-mt2-2019-q6',
    title: 'Speedup global ao acelerar funções trigonométricas',
    source: 'Teste 2, 2018/19',
    topic: 'desempenho',
    prompt:
      'Um programa de cálculo científico gasta 80% do tempo em operações numéricas, repartidas entre operações aritméticas (40% desse tempo) e operações trigonométricas (60% desse tempo). Um novo método reduz 4 vezes o tempo das funções trigonométricas. Qual é o speedup global aproximado?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '1,82',
          correct: false,
          explanation: 'Corresponderia a uma melhoria maior do que 4 vezes.',
        },
        {
          text: '2,40',
          correct: false,
          explanation: 'Corresponderia a uma fração melhorada superior a 80%.',
        },
        {
          text: '2,62',
          correct: false,
          explanation:
            'Excede o limite teórico 1/0,2 = 5, mas não é o valor correto.',
        },
        {
          text: '1,56',
          correct: true,
          explanation:
            'Speedup = 1/(0,2 + 0,8*(0,4 + 0,6/4)) = 1/0,64 = 1,5625.',
        },
      ],
    },
    solution: 'O speedup global é aproximadamente 1,56.',
    reasoning:
      'A fração não melhorada é 20%. Dos 80% numéricos, as trigonométricas (60% de 80% = 48% do total) ficam 4 vezes mais rápidas, sobrando 0,8*(0,4 + 0,6/4) = 0,44. Pela lei de Amdahl, speedup = 1/(0,2 + 0,44) = 1/0,64 = 1,5625.',
  },
  {
    id: 'fsc-mt2-2017-q5',
    title: 'Speedup ao acelerar a unidade de vírgula flutuante',
    source: 'Teste 2, 2016/17',
    topic: 'desempenho',
    prompt:
      'Um programa gasta 50% do tempo a executar cálculos de vírgula flutuante. Qual é o speedup que se obteria se a unidade de vírgula flutuante fosse 5 vezes mais rápida?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '5/3',
          correct: true,
          explanation: 'Pela lei de Amdahl: 1/(0,5 + 0,5/5) = 1/0,6 = 5/3.',
        },
        {
          text: '2,5',
          correct: false,
          explanation: 'Ignoraria a parte não melhorada do programa.',
        },
        {
          text: '10/3',
          correct: false,
          explanation: 'Corresponderia a uma fração melhorada de 70%.',
        },
        {
          text: '2',
          correct: false,
          explanation: 'Corresponderia a k = 4 com f = 50%.',
        },
      ],
    },
    solution: 'O speedup é $5/3 \\approx 1{,}67$.',
    reasoning:
      'Com $f = 0{,}5$ e $k = 5$, a lei de Amdahl dá $\\text{speedup} = \\frac{1}{0{,}5 + 0{,}5/5} = \\frac{1}{0{,}6} = \\frac{5}{3}$.',
  },
];

export const mt2Cache: ExamQuestion[] = [
  {
    id: 'fsc-mt2-2018-q12',
    title: 'Decomposição de endereço e leitura numa cache write-back',
    source: 'Teste 2, 2017/18',
    topic: 'cache',
    prompt:
      'Considere uma memória cache do tipo write-back com 8 blocos de 8 bytes, usada como D-cache num CPU com endereços de 16 bits. O conteúdo da cache é:\n\n| bloco | conteúdo (bytes 7 a 0) | etiqueta | v | d |\n| --- | --- | --- | --- | --- |\n| 0 | aa cc de hf 34 33 11 01 | 235 | 1 | 0 |\n| 1 | bb ad 45 4f af de 21 99 | 391 | 1 | 1 |\n| 2 | cc 34 ab 1f 56 cd ff ff | 023 | 1 | 1 |\n| 3 | dd 67 22 2b 32 56 32 21 | 198 | 0 | 1 |\n| 4 | ee 32 11 9f aa ba ab bb | 311 | 1 | 0 |\n| 5 | ff 10 00 04 01 02 03 04 | 278 | 0 | 0 |\n| 6 | 11 03 41 32 cc dd ee ff | 212 | 1 | 1 |\n| 7 | 22 01 65 01 05 06 07 08 | 387 | 0 | 1 |\n\n(a) Como se decompõe o endereço de 16 bits para aceder a esta cache? (b) Indique o valor do byte em memória principal no endereço `0xc467`.',
    answer: {
      kind: 'self',
      checklist: [
        'A decomposição usa 10 bits de etiqueta, 3 bits de índice e 3 bits de offset.',
        'O endereço 0xc467 tem etiqueta 0x311, índice 4 e offset 7, com acerto (hit).',
        'O valor lido é 0xEE.',
      ],
    },
    solution:
      '(a) Etiqueta: 10 bits; índice: 3 bits; offset: 3 bits. (b) `0xC467 = 1100 0100 0110 0111`, logo etiqueta `1100010001` (0x311), índice `100` (4) e offset `111` (7). A etiqueta e o bit v=1 do bloco 4 coincidem, pelo que há acerto e o byte lido é o byte 7 do bloco 4: `0xEE`.',
    reasoning:
      'Cada bloco tem 8 bytes, logo são precisos 3 bits de offset. A cache tem 8 blocos, logo 3 bits de índice. Dos 16 bits do endereço sobram 10 para a etiqueta. Como o bloco 4 está válido e a etiqueta coincide, trata-se de um read hit; como d=0, o conteúdo da cache está atualizado e corresponde ao da memória principal.',
  },
  {
    id: 'fsc-mt2-2018-q12c',
    title: 'Write-back durante uma falta de leitura',
    source: 'Teste 2, 2017/18',
    topic: 'cache',
    prompt:
      'Na cache da questão anterior, explique quais as alterações que ocorrem na cache e na memória principal durante a leitura do byte residente no endereço `0xe48d`.',
    answer: {
      kind: 'self',
      checklist: [
        'O endereço 0xe48d decompõe-se em etiqueta 0x392, índice 1 e offset 5.',
        'O bloco 1 está válido e sujo (d=1), pelo que ocorre write-back para a memória principal antes de carregar o novo bloco.',
        'O novo bloco é carregado na posição 1 com etiqueta 0x392 e flags v=1 e d=0.',
      ],
    },
    solution:
      '`0xE48D = 1110 0100 1000 1101`, logo etiqueta `1110010010` (0x392), índice `001` (1) e offset `101` (5). A etiqueta residente no bloco 1 é 0x391, diferente, pelo que há falta de leitura (read miss). Como o bloco 1 tem v=1 e d=1, o seu conteúdo é primeiro escrito na memória principal (write-back, no endereço com etiqueta 0x391, ou seja, na zona 0xE440-0xE447). Depois, o bloco que contém 0xE48D é lido da memória principal para a posição 1 da cache, atualizando a etiqueta para 0x392 e pondo v=1 e d=0.',
    reasoning:
      'Numa cache write-back, um bloco sujo (d=1) só é escrito na memória principal quando é substituído. Como a etiqueta não coincide, o bloco 1 tem de ser guardado antes de ser overwritten, e o novo bloco entra limpo (d=0).',
  },
  {
    id: 'fsc-mt2-2019-q7',
    title: 'Número de blocos de uma memória cache',
    source: 'Teste 2, 2018/19',
    topic: 'cache',
    prompt:
      'Uma memória cache contém 32 KiB de dados e cada bloco tem 64 bytes. Quantos blocos tem esta memória?',
    answer: { kind: 'number', value: 512, tolerance: 0 },
    solution: '$32\\,\\text{KiB} = 32768$ bytes; $32768 / 64 = 512$ blocos.',
    reasoning:
      'O número de blocos é o tamanho total da cache a dividir pelo tamanho de cada bloco: $2^{15} / 2^{6} = 2^{9} = 512$.',
  },
  {
    id: 'fsc-mt2-2019-q13',
    title: 'Blocos e bytes por bloco a partir de etiqueta e índice',
    source: 'Teste 2, 2018/19',
    topic: 'cache',
    prompt:
      'Um CPU com endereços de 24 bits está equipado com uma memória cache de dados do tipo write-through em que a etiqueta tem 14 bits e o índice 6 bits. Determine o número de blocos e o número de bytes por bloco desta cache.',
    answer: {
      kind: 'self',
      checklist: ['A cache tem 64 blocos.', 'Cada bloco tem 16 bytes.'],
    },
    solution:
      'Número de blocos: $2^6 = 64$. Bytes por bloco: $2^{24-14-6} = 2^4 = 16$.',
    reasoning:
      'O índice com 6 bits endereça $2^6 = 64$ blocos. Os restantes $24 - 14 - 6 = 4$ bits são o offset, pelo que cada bloco tem $2^4 = 16$ bytes.',
  },
  {
    id: 'fsc-mt2-2017-q4',
    title: 'Taxa de faltas para um tempo médio de acesso',
    source: 'Teste 2, 2016/17',
    topic: 'cache',
    prompt:
      'A memória principal usada com um CPU de 2 GHz tem um tempo de acesso de 60 ns. O acesso à memória cache demora 0,5 ns. Qual deve ser o valor máximo da taxa de faltas da cache para que o tempo médio de acesso à memória seja 10 ciclos de relógio?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '5%',
          correct: false,
          explanation: 'Daria tempo médio inferior a 10 ciclos.',
        },
        {
          text: '10%',
          correct: false,
          explanation: 'Daria 0,5 + 0,10*60 = 6,5 ns, mais de 10 ciclos.',
        },
        {
          text: '2,5%',
          correct: false,
          explanation: 'Daria tempo médio inferior a 10 ciclos.',
        },
        {
          text: '7,5%',
          correct: true,
          explanation: '0,5 + 0,075*60 = 5 ns = 10 ciclos a 2 GHz.',
        },
      ],
    },
    solution: 'A taxa de faltas máxima é 7,5%.',
    reasoning:
      'O período de relógio é 0,5 ns, logo 10 ciclos correspondem a 5 ns. O tempo médio é $t_c + t_f \\cdot t_m = 0{,}5 + t_f \\cdot 60$. Igualando a 5 ns: $t_f = 4{,}5/60 = 0{,}075 = 7{,}5\\%$.',
  },
];
