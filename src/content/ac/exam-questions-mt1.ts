import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  saltos: '/cadeiras/ac/riscv-assembly/#saltos-e-decisões',
  abi: '/cadeiras/ac/riscv-assembly/#registos-e-convenção-de-chamadas',
  contas: '/cadeiras/ac/riscv-assembly/#contas-imediatos-e-memória',
  amdahl: '/cadeiras/ac/desempenho/#a-lei-de-amdahl',
  limiteTaxa: '/cadeiras/ac/armazenamento/#o-recurso-que-limita-a-taxa',
  localidade: '/cadeiras/ac/hierarquia-cache/#localidade-e-organização',
  endereco: '/cadeiras/ac/hierarquia-cache/#decompor-um-endereço',
  writeback: '/cadeiras/ac/politicas-cache/#write-through-e-write-back',
  disco: '/cadeiras/ac/armazenamento/#disco-magnético',
  interrupcoes: '/cadeiras/ac/entrada-saida/#interrupções',
  varrimento: '/cadeiras/ac/entrada-saida/#varrimento-periódico',
  dma: '/cadeiras/ac/entrada-saida/#dma',
};

export const mt1Desempenho: ExamQuestion[] = [
  {
    id: 'ac-mt1-2018-q5',
    title: 'Atualizações sucessivas do componente certo',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'desempenho',
    prompt:
      'Uma aplicação demora 100 ms a executar: 72 ms de processamento no CPU e 28 ms de acesso a disco. O avanço da tecnologia permite duplicar o desempenho de um componente por ano. Se em cada ano se atualizar apenas o componente que, nesse ano, conduz a um melhor tempo total, qual é o tempo de execução ao fim de 4 atualizações?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '23 ms',
          correct: false,
          explanation:
            'Não corresponde à sequência de atualizações do enunciado.',
        },
        {
          text: '8 ms',
          correct: false,
          explanation: 'Subestima o tempo que resta após 4 anos.',
        },
        {
          text: '10,75 ms',
          correct: true,
          explanation: 'É o tempo da tabela de atualizações ano a ano.',
        },
        {
          text: '11,5 ms',
          correct: false,
          explanation: 'Próximo, mas não é o valor da tabela oficial.',
        },
      ],
    },
    solution: 'Ao fim de 4 atualizações, a aplicação demora 10,75 ms.',
    reasoning:
      'Acompanha-se o tempo total ano a ano, atualizando um componente de cada vez: ano 0: 72 + 28 = 100 ms; ano 1: 36 + 28 = 64 ms; ano 2: 36 + 7 = 43 ms; ano 3: 9 + 7 = 16 ms; ano 4: 9 + 1,75 = 10,75 ms.',
    explanation: link.amdahl,
  },
  {
    id: 'ac-mt1-2020-q12b',
    title: 'Componente que limita as operações de E/S',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'desempenho',
    prompt:
      'Um computador tem um CPU a 2,4 GHz que gasta 1,5 milhões de ciclos por cada operação de E/S e um barramento de memória com capacidade para 256 MB/s. As leituras do disco fazem-se em blocos de 128 kB. Indique a taxa máxima de operações de E/S permitida pelo CPU e pelo barramento e qual dos dois limita o desempenho do sistema.',
    answer: {
      kind: 'self',
      checklist: [
        'O CPU permite 1600 operações/s (0,625 ms por operação).',
        'O barramento permite cerca de 2000 operações/s (256 MB/s ÷ 128 kB).',
        'A resposta indica que o CPU é o componente limitante.',
      ],
    },
    solution:
      'CPU: 1600 operações/s. Barramento: 2000 operações/s. O CPU limita o desempenho.',
    reasoning:
      'O CPU leva $1{,}5\\times10^6 / 2{,}4\\times10^9 = 0{,}625$ ms por operação, ou seja 1600 operações/s. O barramento transfere 256 MB/s, ou seja $256\\times10^6 / (128\\times10^3) = 2000$ blocos/s. Como 1600 < 2000, o CPU é o gargalo do sistema.',
    explanation: link.limiteTaxa,
  },
];

export const mt1Caches: ExamQuestion[] = [
  {
    id: 'ac-mt1-2020-q7',
    title: 'Vantagem de write-back face a write-through',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'caches',
    prompt: 'Em comparação com write-through, o uso de write-back permite:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'implementar um sistema de memória mais rápido',
          correct: false,
          explanation: 'A política de escrita não torna a memória mais rápida.',
        },
        {
          text: 'simplificar as operações de leitura',
          correct: false,
          explanation: 'As leituras são tratadas da mesma forma.',
        },
        {
          text: 'reduzir o número total de bits de memória',
          correct: false,
          explanation: 'O número de bits não depende da política de escrita.',
        },
        {
          text: 'reduzir o número de acessos à memória principal',
          correct: true,
          explanation:
            'As escritas acumulam-se na cache e só descem à memória na substituição.',
        },
      ],
    },
    solution: 'Write-back reduz o número de acessos à memória principal.',
    reasoning:
      'Com write-back, as escritas ficam na cache (marcando o bloco como modificado) e só são transferidas para a memória principal quando o bloco vai ser substituído. Assim, várias escritas consecutivas no mesmo bloco resultam numa única escrita na memória principal.',
    explanation: link.writeback,
  },
  {
    id: 'ac-mt1-2020-q9',
    title: 'O que blocos de cache maiores aproveitam',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'caches',
    prompt: 'O uso de blocos de cache maiores permite aproveitar melhor:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a frequência de relógio',
          correct: false,
          explanation: 'O tamanho do bloco não altera o relógio do CPU.',
        },
        {
          text: 'a penalidade de falta',
          correct: false,
          explanation:
            'Blocos maiores podem até aumentar a penalidade de falta.',
        },
        {
          text: 'a proximidade espacial',
          correct: true,
          explanation:
            'Blocos maiores trazem para a cache os bytes vizinhos do acedido.',
        },
        {
          text: 'a proximidade temporal',
          correct: false,
          explanation:
            'A localidade temporal depende da reutilização no tempo.',
        },
      ],
    },
    solution: 'Blocos maiores aproveitam melhor a proximidade espacial.',
    reasoning:
      'Um bloco maior traz para a cache, além do byte acedido, os bytes que lhe são adjacentes em memória. Como os programas tendem a aceder a endereços próximos uns dos outros, esses bytes têm grande probabilidade de vir a ser necessários, e já estão na cache. Isso é a localidade espacial.',
    explanation: link.localidade,
  },
  {
    id: 'ac-mt1-2020-q13',
    title: 'Cache de mapeamento direto: endereço, faltas e taxa de acertos',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'caches',
    prompt:
      'Uma memória cache de mapeamento direto com política write-through tem 128 blocos de 32 bytes e etiquetas com 12 bits.\n\n(a) Quantos bits são usados para representar endereços de memória?\n\n(b) A cache é usada como cache de dados e começa vazia (todos os blocos com V=0). Antes da execução do fragmento abaixo, tem-se `X0 = 0x00000A80` e `X2 = 0x00000014`. Quantos blocos são transferidos da memória principal devido às leituras de dados?\n\n```\nL1:  ldr   W1, [ X0 ]\n     add   W1, W1, 1\n     str   W1, [ X0 ]\n     add   X0, X0, 4\n     add   W2, W2, -1\n     cbnz  W2, L1\n```\n\n(c) A mesma memória é usada como cache de instruções de um CPU com CPI ideal 1,5 e penalidade de falta de 100 ciclos. Qual deve ser a taxa de acertos para que o CPI efetivo não seja superior a 12,5?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica 24 bits de endereço (12 de etiqueta + 7 de índice + 5 de offset).',
        'A resposta indica que são transferidos 3 blocos nas leituras.',
        'A resposta indica uma taxa de acertos de pelo menos 0,89 (89%).',
      ],
    },
    solution:
      '(a) 24 bits. (b) 3 blocos. (c) Taxa de acertos $h \\geq 0{,}89$.',
    reasoning:
      '(a) 128 blocos → 7 bits de índice; 32 bytes por bloco → 5 bits de offset; com 12 bits de etiqueta, o endereço tem $12+7+5=24$ bits. (b) O ciclo acede a `0xA80, 0xA84, …, 0xACC` (20 endereços de 4 em 4 bytes), que pertencem aos blocos `0xA80`, `0xAA0` e `0xAC0`: 3 blocos distintos, logo 3 faltas e 3 blocos transferidos. (c) $\\mathrm{CPI}_{efetivo} = 1{,}5 + (1-h)\\times100 \\leq 12{,}5$, logo $(1-h)\\leq0{,}11$ e $h\\geq0{,}89$.',
    explanation: link.endereco,
  },
];

export const mt1Armazenamento: ExamQuestion[] = [
  {
    id: 'ac-mt1-2018-q3',
    title: 'Transferência de 200 MB em disco magnético e em SSD',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'armazenamento',
    prompt:
      'Um computador possui um disco magnético de 10000 RPM, 832 setores de 4 kB por cilindro, tempo de busca mínimo 2 ms e médio de 8 ms, e taxa de transferência 100 MB/s, e um SSD com taxa de transferência 50 MB/s. Pretende-se transferir um ficheiro de 200 MB de cada disco, no cenário mais favorável (sem atrasos de controlador). Qual das afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O tempo no SSD é 2 vezes menor.',
          correct: false,
          explanation: 'O SSD é mais lento neste cenário: 4 s contra 2,131 s.',
        },
        {
          text: 'O tempo no SSD é 4 vezes menor.',
          correct: false,
          explanation: 'Vale o contrário: o disco magnético é mais rápido.',
        },
        {
          text: 'O tempo é menor no disco magnético.',
          correct: true,
          explanation: '2,131 s no magnético contra 4 s no SSD.',
        },
        {
          text: 'O tempo é igual em ambos os discos.',
          correct: false,
          explanation: 'As taxas de transferência são diferentes.',
        },
      ],
    },
    solution:
      'O ficheiro de 200 MB transfere-se mais depressa no disco magnético (≈ 2,131 s contra 4 s no SSD).',
    reasoning:
      'No disco magnético, 200 MB são 50000 setores de 4 kB, que ocupam 61 cilindros. No melhor caso, o tempo é 8 ms de busca média + 3 ms de rotação média (a 10000 RPM) + 60 × 2 ms de buscas mínimas entre cilindros + 200 MB / 100 MB/s = 2 s, num total de ≈ 2131 ms. No SSD, o tempo é 200 MB / 50 MB/s = 4 s. Logo o disco magnético é mais rápido neste cenário.',
    explanation: link.disco,
  },
  {
    id: 'ac-mt1-2018-q11',
    title: 'Configuração RAID para 32 TB de capacidade útil',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'armazenamento',
    prompt:
      'Pretende-se construir um sistema RAID com 32 TB de capacidade útil. Estão disponíveis discos Dsk1 (2 TB, 5,9 W, 140 €) e Dsk2 (1 TB, 3,2 W, 65 €), e as organizações Org1 (RAID-1), Org2 (RAID-5 com 4 grupos de proteção) e Org3 (RAID-6 com 2 grupos de proteção). Indique, para cada alínea, a melhor configuração:\n\n(a) a que requer mais discos;\n(b) a que tem o custo de aquisição mais baixo;\n(c) a que tem menor consumo;\n(d) aquela em que, com um disco avariado, a situação normal pode ser restabelecida mais depressa.',
    answer: {
      kind: 'self',
      checklist: [
        '(a) A resposta indica RAID-1 com Dsk2 (64 discos).',
        '(b) A resposta indica RAID-5 com 4 grupos e Dsk2 (2340 €).',
        '(c) A resposta indica RAID-6 com 2 grupos e Dsk2 (115,2 W).',
        '(d) A resposta indica RAID-1 com Dsk2.',
      ],
    },
    solution:
      '(a) RAID-1 e Dsk2. (b) RAID-5 (4 grupos) e Dsk2. (c) RAID-6 (2 grupos) e Dsk2. (d) RAID-1 e Dsk2.',
    reasoning:
      'Número de discos: RAID-1 precisa de 32 (Dsk1) ou 64 (Dsk2); RAID-5 com 4 grupos precisa de 4×(8/d+1) = 20 (Dsk1) ou 36 (Dsk2); RAID-6 com 2 grupos precisa de 2×(16/d+2) = 20 (Dsk1) ou 36 (Dsk2). Custos: 4480/4160 € (RAID-1), 2800/2340 € (RAID-5), 2800/2340 € (RAID-6). Consumos: 188,8/204,8 W (RAID-1), 118/115,2 W (RAID-5 e RAID-6). Na avaria, RAID-1 copia o disco espelho, enquanto RAID-5/6 recalculam a paridade lendo todo o grupo; com discos menores (Dsk2) a recuperação é mais rápida.',
  },
  {
    id: 'ac-mt1-2020-q8',
    title: 'Tempo de leitura de um ficheiro em disco magnético',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'armazenamento',
    prompt:
      'Um disco magnético roda a 10000 RPM, tem latência média de busca de 40 ms, latência de controlador de 15 ms e transfere dados a 50 MB/s. Qual é o tempo de leitura de um ficheiro de 25 MB guardado em setores adjacentes?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '58,5 ms',
          correct: false,
          explanation: 'Esquece o tempo de transferência dos dados.',
        },
        {
          text: '61,5 ms',
          correct: false,
          explanation: 'Usa a rotação média de forma incorreta.',
        },
        {
          text: '558 ms',
          correct: true,
          explanation: '40 + 3 + 15 + 500 = 558 ms.',
        },
        {
          text: '601 ms',
          correct: false,
          explanation: 'Usa a rotação completa em vez da média.',
        },
      ],
    },
    solution: 'O tempo de leitura é 558 ms.',
    reasoning:
      'A 10000 RPM, uma rotação completa demora 6 ms e a latência média de rotação é metade: 3 ms. O tempo total é 40 ms (busca) + 3 ms (rotação média) + 15 ms (controlador) + 25 MB / 50 MB/s = 500 ms (transferência), ou seja 558 ms.',
    explanation: link.disco,
  },
  {
    id: 'ac-mt1-2020-q12a',
    title: 'Disponibilidade de um disco com MTTR = MTTF/4',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'armazenamento',
    prompt:
      'Um disco tem tempo médio entre avarias (MTTF) e tempo médio de reparação (MTTR) com $MTTR = \\frac{1}{4}MTTF$. Qual é a disponibilidade do disco?',
    answer: { kind: 'number', value: 0.8, tolerance: 0 },
    solution:
      'Disponibilidade $= \\frac{MTTF}{MTTF+MTTR} = \\frac{MTTF}{MTTF + MTTF/4} = \\frac{1}{1{,}25} = 0{,}8$.',
    reasoning:
      'A disponibilidade é a fração do tempo em que o sistema está operacional: $\\frac{MTTF}{MTTF+MTTR}$. Substituindo $MTTR = MTTF/4$, obtém-se $\\frac{MTTF}{1{,}25\\,MTTF} = 0{,}8$ (80%).',
  },
];

export const mt1EntradaSaida: ExamQuestion[] = [
  {
    id: 'ac-mt1-2018-q7',
    title: 'Quando convém usar interrupções em vez de varrimento',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'entrada-saida',
    prompt:
      'Qual das seguintes afirmações sobre a gestão de periféricos é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Quanto mais frequentes forem os acessos, mais convém interrupção.',
          correct: false,
          explanation: 'Acessos frequentes adaptam-se melhor a varrimento.',
        },
        {
          text: 'Quanto mais esporádicos forem os acessos, mais convém interrupção.',
          correct: true,
          explanation:
            'O varrimento gasta ciclos à espera; a interrupção só quando é preciso.',
        },
        {
          text: 'O varrimento é sempre mais rápido que a interrupção.',
          correct: false,
          explanation: 'Depende do trabalho exigido pelo periférico.',
        },
        {
          text: 'O varrimento é sempre mais lento que a interrupção.',
          correct: false,
          explanation: 'Depende do trabalho exigido pelo periférico.',
        },
      ],
    },
    solution:
      'Quanto mais esporádicos forem os acessos a um periférico, mais conveniente é geri-los por interrupção.',
    reasoning:
      'O varrimento (polling) interroga o periférico a uma taxa constante e gasta ciclos de CPU mesmo quando não há nada para fazer. Com interrupções, o CPU só é desviado quando o periférico sinaliza que precisa de atenção, o que compensa quando os acessos são esporádicos.',
    explanation: link.interrupcoes,
  },
  {
    id: 'ac-mt1-2018-q9',
    title: 'Papel do CPU numa transferência por DMA',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'entrada-saida',
    prompt:
      'No contexto de uma transferência por acesso direto à memória (DMA), qual das afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O CPU tem de executar a transferência.',
          correct: false,
          explanation: 'Quem comanda a transferência é o controlador de DMA.',
        },
        {
          text: 'O CPU não tem qualquer intervenção na transferência.',
          correct: false,
          explanation: 'O CPU tem de configurar e iniciar a transferência.',
        },
        {
          text: 'O CPU tem apenas de iniciar a transferência.',
          correct: true,
          explanation:
            'Depois de iniciada, o controlador de DMA trata de tudo.',
        },
        {
          text: 'O CPU tem de iniciar e terminar a transferência.',
          correct: false,
          explanation: 'O fim é sinalizado por interrupção do controlador.',
        },
      ],
    },
    solution:
      'Numa transferência por DMA, o CPU apenas inicia a transferência.',
    reasoning:
      'O CPU configura o controlador de DMA e inicia a transferência. A partir daí, é o controlador de DMA que comanda a transferência de dados entre o periférico e a memória, enviando uma interrupção ao CPU apenas no fim do processo.',
    explanation: link.dma,
  },
  {
    id: 'ac-mt1-2018-q12',
    title: 'Sistema com CPU, barramento e disco: blocos, latências e sensores',
    source: 'Teste 1 (MPCP), 2018/19',
    topic: 'entrada-saida',
    prompt:
      'Um sistema é composto por um CPU a 3 GHz que gasta 2 milhões de ciclos por operação de E/S, um barramento de memória com capacidade para 750 MB/s e um disco com tempo de acesso de 4 ms e taxa de transferência de 80 MB/s.\n\n(a) Assumindo que a taxa média de transferência do disco é 25 MB/s, calcule o tamanho do bloco de dados transferido em cada acesso e o tempo médio de busca mais rotação do disco.\n\n(b) Determine o desempenho de cada componente em blocos/s e indique qual deles limita o desempenho do sistema.\n\n(c) A comunicação com sensores ambientais faz-se por varrimento (polling), gastando o CPU 1000 ciclos por acesso, com 3 acessos/s por sensor. Quantos sensores podem ser usados se a taxa de ocupação do CPU com os sensores for 0,0025%?',
    answer: {
      kind: 'self',
      checklist: [
        'O bloco transferido em cada acesso tem 100 kB e o tempo de busca mais rotação é 2,75 ms.',
        'O disco limita o sistema, com 250 blocos/s (CPU: 1500 blocos/s; barramento: 7500 blocos/s).',
        'Podem ser usados 25 sensores.',
      ],
    },
    solution:
      '(a) 100 kB por acesso; busca + rotação = 2,75 ms. (b) O disco limita o sistema (250 blocos/s). (c) 25 sensores.',
    reasoning:
      '(a) Bloco = 25 MB/s × 4 ms = 100 kB; busca + rotação = 4 ms − 100 kB / 80 MB/s = 4 − 1,25 = 2,75 ms. (b) CPU: 2×10⁶ ciclos a 3×10⁹ ciclos/s = 2/3 ms por bloco → 1500 blocos/s; barramento: 750 MB/s ÷ 100 kB = 7500 blocos/s; disco: 1 / 4 ms = 250 blocos/s. O disco é o gargalo. (c) Cada sensor consome 1000 × 3 = 3000 ciclos/s; 0,0025% de 3×10⁹ = 75000 ciclos/s; N = 75000/3000 = 25 sensores.',
    explanation: link.varrimento,
  },
  {
    id: 'ac-mt1-2020-q11',
    title: 'Polling ou interrupções: ciclos de CPU gastos por cada estratégia',
    source: 'Teste 1 (MPCP), 2020/21',
    topic: 'entrada-saida',
    prompt:
      'Um disco rígido transfere 4 palavras (8 bytes cada) a uma taxa de 16 MB/s e está ocupado a transferir dados durante 80% do tempo. O CPU opera a 2,5 GHz. Cada operação de polling consome 800 ciclos e a sobrecarga de cada transferência por interrupção é 1000 ciclos. Apresentando os ciclos de CPU consumidos por segundo em cada opção, indique qual é a estratégia de gestão do periférico mais vantajosa.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta calcula 400000 transferências/s (16 MB/s × 80% ÷ 32 bytes).',
        'O polling consome 3,2×10⁸ ciclos/s e as interrupções 4×10⁸ ciclos/s.',
        'A resposta conclui que o polling é mais vantajoso neste caso.',
      ],
    },
    solution:
      'Polling: 3,2×10⁸ ciclos/s. Interrupções: 4×10⁸ ciclos/s. O polling é mais vantajoso.',
    reasoning:
      'O disco transfere 16 MB/s × 0,8 = 12,8 MB/s, ou seja 12,8×10⁶ / 32 = 400000 blocos de 32 bytes por segundo. Com polling, é preciso sondar pelo menos uma vez por transferência: 400000 × 800 = 3,2×10⁸ ciclos/s. Com interrupções: 400000 × 1000 = 4×10⁸ ciclos/s. Como 3,2×10⁸ < 4×10⁸, o polling consome menos ciclos de CPU.',
    explanation: link.varrimento,
  },
];
