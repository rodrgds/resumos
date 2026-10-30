import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  banda: '/cadeiras/rc/transmissao-de-dados/#banda-símbolos-e-débito',
  shannon: '/cadeiras/rc/transmissao-de-dados/#nyquist-e-shannon',
  gbn: '/cadeiras/rc/ligacao-de-dados/#go-back-n-e-selective-repeat',
  eficiencia: '/cadeiras/rc/ligacao-de-dados/#eficiência-com-erros',
  little: '/cadeiras/rc/desempenho-e-filas/#lei-de-little',
  lpm: '/cadeiras/rc/camada-de-rede/#longest-prefix-match',
  vlsm: '/cadeiras/rc/camada-de-rede/#vlsm-e-agregação',
  nat: '/cadeiras/rc/camada-de-rede/#nat-e-ipv6',
  ack: '/cadeiras/rc/transporte-e-aplicacoes/#sequência-ack-e-abertura',
  congestionamento:
    '/cadeiras/rc/transporte-e-aplicacoes/#fluxo-e-congestionamento',
  slowstart: '/cadeiras/rc/transporte-e-aplicacoes/#slow-start-aimd-e-perdas',
};

export const exameTransmissao: ExamQuestion[] = [
  {
    id: 'rc-exame-2024n-q1',
    title: 'Número de fases numa modulação por fase',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'transmissao',
    prompt:
      'Considere um canal de transmissão rádio com débito de símbolos de 16 ksymbol/s. Se o débito de informação do canal for 64 kbit/s e for usada modulação por fase, o número de fases usado é',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '4',
          correct: false,
          explanation: '4 fases dariam 2 bit/símbolo.',
        },
        {
          text: '8',
          correct: false,
          explanation: '8 fases dariam 3 bit/símbolo.',
        },
        {
          text: '16',
          correct: true,
          explanation:
            'São precisos 64/16 = 4 bit/símbolo, logo 2^4 = 16 fases.',
        },
        {
          text: '32',
          correct: false,
          explanation: '32 fases dariam 5 bit/símbolo.',
        },
      ],
    },
    solution: 'O número de fases é 16.',
    reasoning:
      'O débito de informação é $R = R_s \cdot \log_2 M$, onde $M$ é o número de fases. Assim, $\log_2 M = 64/16 = 4$, logo $M = 2^4 = 16$.',
    explanation: link.banda,
  },
  {
    id: 'rc-exame-2024r-q1',
    title: 'Débito de símbolos numa modulação 16QAM',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'transmissao',
    prompt:
      'Se numa transmissão de dados for usada uma modulação 16QAM (constelação de 16 pontos) e for observado um débito binário de 100 kbit/s, o débito de símbolos desta ligação é de',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '100/16 kbaud',
          correct: false,
          explanation:
            'Divide o débito binário pelo número de pontos em vez de pelos bits por símbolo.',
        },
        {
          text: '25 kbaud',
          correct: true,
          explanation:
            '16QAM transporta 4 bit/símbolo, logo 100/4 = 25 ksymbol/s.',
        },
        {
          text: '50 kbaud',
          correct: false,
          explanation: 'Corresponderia a 2 bit/símbolo.',
        },
        {
          text: '100 kbaud',
          correct: false,
          explanation: 'Ignora a modulação.',
        },
      ],
    },
    solution: 'O débito de símbolos é 25 kbaud.',
    reasoning:
      'Uma constelação 16QAM tem $M = 16$ pontos, ou seja, $\log_2 16 = 4$ bit por símbolo. O débito de símbolos é $R_s = 100/4 = 25$ ksymbol/s $= 25$ kbaud.',
    explanation: link.banda,
  },
  {
    id: 'rc-exame-2022-q2',
    title: 'Potência transmitida exigida por Shannon',
    source: 'Exame, 2021/22',
    topic: 'transmissao',
    prompt:
      'A capacidade de um canal rádio é dada por $C = A \\cdot \\log_2(1 + P_r/N)$, onde $A$ é uma constante, $P_r$ é a potência recebida e $N$ é a potência de ruído. Se a potência transmitida for $P_t = 1000 \\cdot P_r$, $N = 1$ mW e for exigida uma capacidade $C = 2A$ bit/s, a potência transmitida deve ser',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '3 mW',
          correct: false,
          explanation:
            'Esse é o valor da potência recebida, não da transmitida.',
        },
        {
          text: '3 W',
          correct: true,
          explanation: '$P_r = 3$ mW e $P_t = 1000 \\cdot P_r = 3$ W.',
        },
        { text: '1 mW', correct: false, explanation: 'Dá capacidade $C = A$.' },
        {
          text: '1 W',
          correct: false,
          explanation: 'Corresponde a $P_r = 1$ mW.',
        },
      ],
    },
    solution: 'A potência transmitida deve ser $P_t = 3$ W.',
    reasoning:
      'De $C = 2A$ vem $\log_2(1 + P_r/N) = 2$, logo $1 + P_r/N = 4$ e $P_r = 3N = 3$ mW. Como $P_t = 1000 \cdot P_r$, obtém-se $P_t = 3000$ mW $= 3$ W.',
    explanation: link.shannon,
  },
];

export const exameLigacao: ExamQuestion[] = [
  {
    id: 'rc-exame-2024n-q3',
    title: 'Probabilidade de uma trama chegar correta em L transmissões',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'ligacao',
    prompt:
      'Se a probabilidade de uma trama ser recebida com erros for $F$ e essa trama for transmitida $L$ vezes, a probabilidade de a trama ser recebida corretamente é',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$F^L$',
          correct: false,
          explanation: 'É a probabilidade de todas as transmissões falharem.',
        },
        {
          text: '$1 - (1-F)^L$',
          correct: false,
          explanation: 'Conta as transmissões com erros em vez das corretas.',
        },
        {
          text: '$1 - (1-L)^F$',
          correct: false,
          explanation: 'Troca os papéis de $F$ e $L$.',
        },
        {
          text: '$1 - F^L$',
          correct: true,
          explanation:
            'A trama falha só se as $L$ transmissões falharem, com probabilidadade $F^L$.',
        },
      ],
    },
    solution: 'A probabilidade é $1 - F^L$.',
    reasoning:
      'Cada transmissão é correta com probabilidade $1-F$. A trama só não chega correta se todas as $L$ transmissões tiverem erro, o que acontece com probabilidade $F^L$. Logo $P(\\text{correta}) = 1 - F^L$.',
    explanation: link.eficiencia,
  },
  {
    id: 'rc-exame-2024n-q4',
    title: 'Traço Go-Back-N após uma trama perdida',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'ligacao',
    prompt:
      'Considere o mecanismo ARQ Go-Back-N com janela $W = 7$. Na notação em que `?I(0).!RR(1)` representa a receção (?) da trama I(0) seguida (.) do envio (!) de RR(1), o recetor descrito pela sequência `?I(0).!RR(1).?I(1).?I(2).?I(4).!REJ(3).?I(5)` pode continuar do seguinte modo',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`!REJ(3).?I(3).!RR(4)`',
          correct: false,
          explanation: 'Repete o REJ já enviado.',
        },
        {
          text: '`?I(3).!RR(4)`',
          correct: true,
          explanation:
            'A próxima trama esperada é I(3); I(5) foi descartada por estar fora de ordem.',
        },
        {
          text: '`?I(3).!RR(6)`',
          correct: false,
          explanation:
            'RR(6) só seria enviado depois de receber I(5), que foi descartada.',
        },
        {
          text: '`!REJ(3).?I(3).!RR(6)`',
          correct: false,
          explanation: 'Combina o REJ repetido com o RR(6) prematuro.',
        },
      ],
    },
    solution: 'A sequência continua com `?I(3).!RR(4)`.',
    reasoning:
      'Depois de RR(1), I(1) e I(2), a trama I(4) está fora de ordem (falta I(3)), pelo que o recetor envia REJ(3). A trama I(5) também está fora de ordem e é descartada. Quando chega I(3), o recetor confirma com RR(4), indicando que espera a trama 4.',
    explanation: link.gbn,
  },
  {
    id: 'rc-exame-2024n-q11',
    title: 'Débito máximo com Selective Repeat',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'ligacao',
    prompt:
      'Duas estações comunicam com o mecanismo ARQ Selective Repeat. A capacidade do canal em cada sentido é de 600 kbit/s, o atraso de propagação num sentido é de 24 ms, as tramas de informação têm comprimento fixo de 300 bytes, usam-se 4 bits para numerar as tramas de informação e as tramas de controlo têm comprimento desprezável. O débito máximo é $R_{max} = $ ____ kbit/s.',
    answer: { kind: 'number', value: 369, tolerance: 1, unit: 'kbit/s' },
    solution: '$R_{max} \\approx 369$ kbit/s.',
    reasoning:
      'O tempo de transmissão de uma trama é $T_t = 300 \\cdot 8 / 600000 = 4$ ms, logo $a = T_p/T_t = 24/4 = 6$. Com 4 bits, a janela máxima do Selective Repeat é $W = 2^4/2 = 8$, menor que $1 + 2a = 13$. A eficiência é $U = W/(1+2a) = 8/13$ e $R_{max} = U \\cdot C = 600 \\cdot 8/13 \\approx 369$ kbit/s.',
    explanation: link.gbn,
  },
  {
    id: 'rc-exame-2024r-q13',
    title: 'Janela mínima do Go-Back-N para eficiência de 100%',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'ligacao',
    prompt:
      'Duas estações comunicam por uma ligação com ARQ Go-Back-N. A capacidade do canal é de 400 kbit/s, o atraso de propagação num sentido é de 50 ms e as tramas de informação têm 200 bytes. As tramas de controlo têm comprimento desprezável. A janela mínima necessária para obter uma eficiência de 100% é $W = $ ____.',
    answer: { kind: 'number', value: 26, tolerance: 0 },
    solution: '$W = 26$.',
    reasoning:
      'O tempo de transmissão de uma trama é $T_t = 200 \\cdot 8 / 400000 = 4$ ms e $a = T_p/T_t = 50/4 = 12{,}5$. Para o canal estar sempre ocupado é preciso $W \\geq 1 + 2a = 26$, pelo que a janela mínima é $W = 26$.',
    explanation: link.gbn,
  },
];

export const exameFilas: ExamQuestion[] = [
  {
    id: 'rc-exame-2024n-q14',
    title: 'Capacidade de uma linha modelizada por M/M/1',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'filas',
    prompt:
      'Um sistema de transmissão é modelizado por uma fila de espera M/M/1. Em média chegam ao sistema 480 pacote/s, com comprimento médio de 1500 bytes. Se a linha de transmissão está inativa (sem transmitir) 20% do tempo, a capacidade da linha é $C = $ ____ Mbit/s.',
    answer: { kind: 'number', value: 7.2, tolerance: 0.01, unit: 'Mbit/s' },
    solution: '$C = 7{,}2$ Mbit/s.',
    reasoning:
      'A probabilidade de a fila estar vazia é $P_0 = 1 - \\rho = 0{,}20$, logo $\\rho = 0{,}8$. A taxa de serviço é $\\mu = \\lambda/\\rho = 480/0{,}8 = 600$ pacote/s. A capacidade é $C = \\mu \\cdot L = 600 \\cdot 1500 \\cdot 8 = 7{,}2 \\times 10^6$ bit/s $= 7{,}2$ Mbit/s.',
  },
  {
    id: 'rc-exame-2024n-q15',
    title: 'Probabilidade de uma fila M/M/1 estar vazia',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'filas',
    prompt:
      'Nas condições da pergunta anterior (fila M/M/1 com 480 pacote/s de comprimento médio 1500 bytes e linha inativa 20% do tempo), a probabilidade de a fila de espera estar vazia é $P = $ ____ %.',
    answer: { kind: 'number', value: 20, tolerance: 0, unit: '%' },
    solution: '$P_0 = 20\\%$.',
    reasoning:
      'Num modelo M/M/1, a probabilidade de o sistema estar vazio é $P_0 = 1 - \\rho$, que coincide com a fração de tempo em que o servidor está inativo. Como a linha está inativa 20% do tempo, $P_0 = 20\\%$.',
  },
  {
    id: 'rc-exame-2024n-q16',
    title: 'Tempo médio de espera numa fila M/D/1',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'filas',
    prompt:
      'Nas condições da pergunta anterior, se os pacotes tiverem comprimento constante de 1500 bytes, o tempo médio de espera na fila (sem contar o tempo de transmissão) é $T_w = $ ____ ms.',
    answer: { kind: 'number', value: 3.3, tolerance: 0.1, unit: 'ms' },
    solution: '$T_w \\approx 3{,}3$ ms.',
    reasoning:
      'Com $\\lambda = 480$ pacote/s e $\\mu = 600$ pacote/s ($\\rho = 0{,}8$), numa fila M/D/1 o tempo médio de espera é $T_w = \\dfrac{\\lambda}{2\\mu(\\mu - \\lambda)} = \\dfrac{480}{2 \\cdot 600 \\cdot 120} = 3{,}33$ ms.',
  },
  {
    id: 'rc-exame-2024r-q5',
    title: 'Lei de Little numa fila G/G/1',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'filas',
    prompt:
      'A interface de rede eth0 de um computador tem uma fila G/G/1 estável, com débito médio de chegada de $A$ pacote/s e capacidade média de $S$ pacote/s. Se o número médio de pacotes na fila for $N$ e a intensidade de tráfego for $R = A/S$, o tempo médio $T$ que um pacote permanece no sistema é',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$T = N/S$',
          correct: false,
          explanation: 'Divide pelo débito de serviço em vez do de chegada.',
        },
        {
          text: '$T = R/A$',
          correct: false,
          explanation: 'Dá $1/S$, o tempo médio de serviço.',
        },
        {
          text: '$T = N/A$',
          correct: true,
          explanation: 'Pela lei de Little, $N = A \\cdot T$.',
        },
        {
          text: '$T = R/S$',
          correct: false,
          explanation: 'Não tem unidades de tempo.',
        },
      ],
    },
    solution: '$T = N/A$.',
    reasoning:
      'A lei de Little diz que o número médio de clientes no sistema é $N = A \\cdot T$, onde $A$ é a taxa média de chegada e $T$ o tempo médio no sistema. Isolando $T$, obtém-se $T = N/A$.',
    explanation: link.little,
  },
];

export const exameRede: ExamQuestion[] = [
  {
    id: 'rc-exame-2024n-q17',
    title: 'Encaminhamento por longest prefix match',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'rede',
    prompt:
      'Considere um router Linux com a tabela de encaminhamento\n\n| Destino | Gateway | Máscara | Interface |\n| --- | --- | --- | --- |\n| 192.168.1.0 | 172.16.10.1 | 255.255.255.128 | eth0 |\n| 192.168.1.128 | 172.16.10.2 | 255.255.255.128 | eth0 |\n| 10.0.0.0 | 0.0.0.0 | 255.255.255.0 | eth1 |\n| 172.16.0.0 | 0.0.0.0 | 255.255.0.0 | eth0 |\n| 0.0.0.0 | 172.16.10.3 | 0.0.0.0 | eth0 |\n\nSe este router receber um pacote com endereço IP de destino 10.1.2.3, qual é o endereço IP do vizinho para o qual encaminha o pacote? (use a notação a.b.c.d)',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que 10.1.2.3 não casa com 10.0.0.0/24.',
        'A resposta indica o gateway 172.16.10.3 (rota por omissão).',
      ],
    },
    solution: 'O pacote é encaminhado para 172.16.10.3.',
    reasoning:
      'O destino 10.1.2.3 não pertence a 10.0.0.0/24 (máscara 255.255.255.0), nem a nenhuma outra rota específica. Aplicando longest prefix match, a única entrada que casa é a rota por omissão 0.0.0.0/0, cujo gateway é 172.16.10.3.',
    explanation: link.lpm,
  },
  {
    id: 'rc-exame-2024n-q19',
    title: 'Número máximo de sub-redes para 35 terminais cada',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'rede',
    prompt:
      'Pretende-se dividir a sub-rede à qual a interface eth1 está ligada (10.0.0.0/24) em sub-redes mais pequenas, para ligar 35 terminais a cada uma. Qual é o número máximo de sub-redes que se pode obter?',
    answer: { kind: 'number', value: 4, tolerance: 0 },
    solution: 'Podem obter-se no máximo 4 sub-redes.',
    reasoning:
      'Cada sub-rede precisa de pelo menos 35 endereços utilizáveis, logo precisa de 64 endereços no total ($2^6$), ou seja, uma máscara /26 (62 utilizáveis). O bloco 10.0.0.0/24 comporta $256/64 = 4$ sub-redes /26.',
    explanation: link.vlsm,
  },
  {
    id: 'rc-exame-2024r-q17',
    title: 'Atribuição VLSM da LAN do SW3',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'rede',
    prompt:
      'Uma empresa tem a rede da figura, com dois routers (R1, R2) e três switches Ethernet (SW1, SW2, SW3). Adquiriu o bloco de endereços públicos 20.20.20.0/25 para fazer subnetting e atribuir endereços às LANs de cada switch. Considerando os endereços já atribuídos às LAN do SW1 e do SW2 e querendo o maior número possível de terminais na LAN do SW3, qual é o endereço de rede e o comprimento de prefixo a atribuir à LAN do SW3? (use o formato a.b.c.d/n)',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta escolhe a máscara /26 (62 endereços utilizáveis).',
        'A resposta indica a rede 20.20.20.64/26.',
      ],
    },
    solution: 'A LAN do SW3 deve ficar com 20.20.20.64/26.',
    reasoning:
      'Para maximizar os terminais usa-se o maior bloco livre dentro de 20.20.20.0/25, ou seja /26 com 62 endereços utilizáveis. Os blocos 20.20.20.0/26 e 20.20.20.32/27 já estão atribuídos às outras LANs, pelo que o primeiro bloco /26 livre é 20.20.20.64/26.',
    explanation: link.vlsm,
  },
  {
    id: 'rc-exame-2024r-q20',
    title: 'Endereços IP vistos pelo servidor com NAT',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'rede',
    prompt:
      'Na rede da figura, com dois routers (R1, R2) e três switches, configura-se NAT na interface eth2 de R2. Se o terminal H1 enviar um pacote ao servidor web, quando esse pacote é recebido pelo servidor, os endereços de origem e destino no cabeçalho IP são, respetivamente (use a notação a.b.c.d,w.x.y.z sem espaços; o endereço público de eth2 é 210.1.2.3 e o do servidor é 100.50.20.15)',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica o endereço de origem 210.1.2.3.',
        'A resposta indica o endereço de destino 100.50.20.15.',
      ],
    },
    solution: 'Origem 210.1.2.3 e destino 100.50.20.15.',
    reasoning:
      'O NAT reescreve o endereço de origem privado de H1 pelo endereço público da interface eth2 de R2 (210.1.2.3), mudando também a porta de origem. O endereço de destino não é alterado: o servidor recebe o pacote dirigido a 100.50.20.15.',
    explanation: link.nat,
  },
];

export const exameTransporte: ExamQuestion[] = [
  {
    id: 'rc-exame-2024n-q7',
    title: 'Janela de congestionamento do TCP após timeout',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'transporte',
    prompt: 'No TCP, quando ocorre um timeout,',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'o emissor reduz a janela de congestionamento para um segmento (MSS)',
          correct: true,
          explanation:
            'Além disso, o limiar passa a metade da janela anterior.',
        },
        {
          text: 'o recetor reduz a janela anunciada para um segmento (MSS)',
          correct: false,
          explanation:
            'A janela anunciada é de fluxo, controlada pelo recetor.',
        },
        {
          text: 'o recetor reduz a janela anunciada para metade',
          correct: false,
          explanation: 'Nada no recetor muda por causa do timeout.',
        },
        {
          text: 'o emissor reduz a janela de congestionamento para metade',
          correct: false,
          explanation:
            'Isso acontece na perda detetada por triplo ACK duplicado.',
        },
      ],
    },
    solution:
      'O emissor reduz a janela de congestionamento para um segmento (MSS).',
    reasoning:
      'Um timeout é sinal de congestionamento grave: o emissor fixa $cwnd = 1$ MSS, guarda metade da janela anterior como novo limiar ($ssthresh$) e volta à fase de slow start.',
    explanation: link.slowstart,
  },
  {
    id: 'rc-exame-2024n-q8',
    title: 'Significado do campo Acknowledgement Number do TCP',
    source: 'Exame, 2023/24 (época normal)',
    topic: 'transporte',
    prompt:
      'Nas confirmações (ACK) do TCP, o campo Acknowledgement Number indica',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'o número de sequência do próximo byte que o recetor espera receber em ordem',
          correct: true,
          explanation:
            'O ACK é cumulativo e confirma todos os bytes até esse número, exclusive.',
        },
        {
          text: 'o número do próximo segmento que o recetor espera receber em ordem',
          correct: false,
          explanation: 'O TCP confirma bytes, não segmentos.',
        },
        {
          text: 'o número do último segmento recebido sem erros',
          correct: false,
          explanation: 'O ACK não identifica segmentos, mas bytes.',
        },
        {
          text: 'o checksum do último segmento recebido sem erros',
          correct: false,
          explanation: 'O checksum é outro campo do cabeçalho.',
        },
      ],
    },
    solution: 'É o número de sequência do próximo byte esperado em ordem.',
    reasoning:
      'O TCP numera bytes, não segmentos. O Acknowledgement Number $n$ confirma a receção correta de todos os bytes até $n-1$ e indica que o próximo byte esperado é o $n$.',
    explanation: link.ack,
  },
  {
    id: 'rc-exame-2024r-q8',
    title: 'Transição de slow start para congestion avoidance',
    source: 'Exame, 2023/24 (época de recurso)',
    topic: 'transporte',
    prompt:
      'No TCP, o controlo de congestionamento passa da fase de slow start para a fase de congestion avoidance quando',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'é detetada uma perda por triplo ACK duplicado',
          correct: false,
          explanation:
            'Nesse caso passa diretamente a congestion avoidance, mas sem passar pelo limiar.',
        },
        {
          text: 'é recebido um segmento com número de sequência diferente do esperado',
          correct: false,
          explanation: 'Isso provoca ACKs duplicados, não a transição de fase.',
        },
        {
          text: 'é detetada uma perda por timeout',
          correct: false,
          explanation: 'Nesse caso volta ao slow start com janela de 1 MSS.',
        },
        {
          text: 'o tamanho da janela de congestionamento ultrapassa o limiar (ssthresh)',
          correct: true,
          explanation:
            'Em slow start a janela cresce exponencialmente até $cwnd \\geq ssthresh$.',
        },
      ],
    },
    solution:
      'A transição ocorre quando $cwnd$ atinge/ultrapassa o limiar $ssthresh$.',
    reasoning:
      'Em slow start, $cwnd$ duplica a cada RTT. Quando $cwnd \\geq ssthresh$, o crescimento passa a ser linear (um MSS por RTT), que é a fase de congestion avoidance.',
    explanation: link.congestionamento,
  },
];
