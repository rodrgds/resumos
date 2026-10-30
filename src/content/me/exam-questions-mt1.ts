import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  localizacao: '/cadeiras/me/estatistica-descritiva/#localização',
  dispersao: '/cadeiras/me/estatistica-descritiva/#dispersão',
  caixa: '/cadeiras/me/estatistica-descritiva/#caixa-bigodes-e-extremos',
  correlacao:
    '/cadeiras/me/dados-bivariados/#cálculo-da-covariância-e-correlação',
  condicionar: '/cadeiras/me/probabilidades/#condicionar-e-multiplicar',
  transformar: '/cadeiras/me/variaveis-aleatorias/#transformar-uma-variável',
  binomial: '/cadeiras/me/distribuicoes/#bernoulli-e-binomial',
  normal: '/cadeiras/me/distribuicoes/#normal',
  aproximar: '/cadeiras/me/distribuicoes/#aproximar-uma-binomial',
  mediaNormal:
    '/cadeiras/me/amostragem-limite-central/#média-normal-resultado-exato',
};

export const mt1Descritiva: ExamQuestion[] = [
  {
    id: 'me-mt1-2022-q1',
    title: 'Média e mediana do número de defeitos',
    source: 'Teste 1, 2021/22',
    topic: 'descritiva',
    prompt:
      'Foi registado o número de defeitos em 120 máquinas de um determinado tipo, escolhidas aleatoriamente. Na tabela, o número de defeitos é 1, 2, 3, 4, 5, 6 e o número de máquinas respetivo é 44, 41, 21, 9, 3, 2. Determine a média $\\bar x$ e a mediana $Q_2$ desta amostra.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\bar x = 2{,}1$.',
        'A resposta indica $Q_2 = 2$.',
      ],
    },
    solution: '$\\bar x = 2{,}1$ e $Q_2 = 2$.',
    reasoning:
      'O total de defeitos é $\\sum n_i x_i = 44+82+63+36+15+12=252$, logo $\\bar x=252/120=2{,}1$. As frequências acumuladas são 44 e 85, pelo que $x_{(60)}=x_{(61)}=2$. Como $np=120\\cdot0{,}5=60$ é inteiro, $Q_2=(x_{(60)}+x_{(61)})/2=2$.',
    explanation: link.localizacao,
  },
  {
    id: 'me-mt1-2022-q2',
    title: 'Média e desvio padrão de classificações',
    source: 'Teste 1, 2021/22',
    topic: 'descritiva',
    prompt:
      'Foi selecionada uma amostra aleatória de 20 classificações (escala de 0 a 100) de um teste de matemática, com $\\sum_{i=1}^{20} x_i = 880{,}4$ e $\\sum_{i=1}^{20} x_i^2 = 40854{,}56$. Determine a média e o desvio padrão amostral dos dados.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\bar x = 44{,}02$.',
        'A resposta indica $s \\approx 10{,}51$.',
      ],
    },
    solution: '$\\bar x = 44{,}02$ e $s \\approx 10{,}51$.',
    reasoning:
      '$\\bar x = 880{,}4/20 = 44{,}02$. A variância amostral é $s^2=\\frac{1}{n-1}\\left(\\sum x_i^2 - \\frac{(\\sum x_i)^2}{n}\\right)=\\frac{1}{19}\\left(40854{,}56-\\frac{880{,}4^2}{20}\\right)=\\frac{2099{,}352}{19}\\approx110{,}49$, logo $s\\approx10{,}51$.',
    explanation: link.dispersao,
  },
  {
    id: 'me-mt1-2024-q1',
    title: 'Efeito de uma transformação linear na média e no desvio padrão',
    source: 'Teste 1, 2023/24',
    topic: 'descritiva',
    prompt:
      'A média e o desvio padrão de uma amostra de 50 elementos de uma variável $X$ são $\\bar x = 3$ mm e $s = 2$ mm. A cada valor observado $x_i$ fez-se corresponder o valor $y_i = 3x_i - 2$. Determine a média $\\bar y$ e o desvio padrão $s_y$ dos novos dados $y_i$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\bar y = 7$ mm.',
        'A resposta indica $s_y = 6$ mm.',
      ],
    },
    solution: '$\\bar y = 7$ mm e $s_y = 6$ mm.',
    reasoning:
      'A média transforma-se como os próprios dados: $\\bar y = 3\\cdot3-2=7$. O desvio padrão é afetado apenas pelo fator multiplicativo: $s_y=|3|\\cdot2=6$ mm.',
    explanation: link.dispersao,
  },
  {
    id: 'me-mt1-2024-q2',
    title: 'Valores afastados pelo diagrama de caixa',
    source: 'Teste 1, 2023/24',
    topic: 'descritiva',
    prompt:
      'Considere a amostra aleatória de 22 valores: 43, 25, 15, 34, 28, 33, 22, 32, 47, 26, 31, 26, 20, 38, 30, 36, 30, 31, 32, 25, 28, 49. Usando quartis do tipo 2 e as barreiras $Q_1-1{,}5\\,AIQ$ e $Q_3+1{,}5\\,AIQ$, indique quais destes valores são valores afastados (outliers).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $Q_1=26$, $Q_3=34$ e $AIQ=8$.',
        'A resposta indica que os valores afastados são 47 e 49.',
      ],
    },
    solution: 'Os valores afastados são 47 e 49.',
    reasoning:
      'Ordenando os dados, $Q_1=x_{(6)}=26$ (pois $22\\cdot0{,}25=5{,}5$) e $Q_3=x_{(17)}=34$ (pois $22\\cdot0{,}75=16{,}5$), logo $AIQ=8$. A barreira superior é $34+1{,}5\\cdot8=46$ e a inferior é $26-12=14$. Os valores 47 e 49 excedem 46; o valor 15 não fica abaixo de 14.',
    explanation: link.caixa,
  },
];

export const mt1Bivariados: ExamQuestion[] = [
  {
    id: 'me-mt1-2024-q3',
    title: 'Coeficiente de correlação de Pearson com resumo dado',
    source: 'Teste 1, 2023/24',
    topic: 'bivariados',
    prompt:
      'Considere a amostra bivariada $(x_i, y_i)$ com 11 pares: $x$: 5,1, 4,2, 4,6, 4,0, 4,5, 3,2, 3,9, 4,8, 5,2, 4,9, 4,0 e $y$: 3,9, 3,4, 4,2, 4,0, 3,5, 4,5, 4,5, 4,4, 3,9, 4,3, 4,5. Sabendo que $\\bar x=4{,}4$, $\\bar y=4{,}1$, $s_X=0{,}6033$, $s_Y=0{,}3950$ e $\\sum_{i=1}^{11}x_iy_i=197{,}66$, determine o coeficiente de correlação linear amostral de Pearson.',
    answer: { kind: 'number', value: -0.3273, tolerance: 0.001 },
    solution: '$r \\approx -0{,}3273$.',
    reasoning:
      '$r=\\frac{\\sum x_iy_i-n\\bar x\\bar y}{(n-1)s_Xs_Y}=\\frac{197{,}66-11\\cdot4{,}4\\cdot4{,}1}{10\\cdot0{,}6033\\cdot0{,}3950}=\\frac{197{,}66-198{,}44}{2{,}3830}=\\frac{-0{,}78}{2{,}3830}\\approx-0{,}3273$.',
    explanation: link.correlacao,
  },
];

export const mt1Probabilidades: ExamQuestion[] = [
  {
    id: 'me-mt1-2022-q3',
    title: 'Probabilidade condicionada com acontecimentos independentes',
    source: 'Teste 1, 2021/22',
    topic: 'probabilidades',
    prompt:
      'Sejam $A$ e $B$ dois acontecimientos independentes definidos no mesmo espaço de probabilidade, com $P(B)=2/5$ e $P(A)=4/5$. Determine $P(A|B)$.',
    answer: { kind: 'number', value: 0.8, tolerance: 0 },
    solution: '$P(A|B)=0{,}8$.',
    reasoning: 'Como $A$ e $B$ são independentes, $P(A|B)=P(A)=4/5=0{,}8$.',
    explanation: link.condicionar,
  },
];

export const mt1Variaveis: ExamQuestion[] = [
  {
    id: 'me-mt1-2024-q4',
    title: 'Variância de uma combinação linear de variáveis',
    source: 'Teste 1, 2023/24',
    topic: 'variaveis',
    prompt:
      'Seja $X$ uma variável aleatória contínua com média $\\mu_X$ e variância $\\sigma_X^2$. Considere uma amostra aleatória $(X_1, X_2, \\dots, X_n)$ dessa população e a variável aleatória $Y = 0{,}4X_1 + 0{,}1X_3 - 0{,}3X_5 + 0{,}2X_n - 0{,}5$. Determine a variância de $Y$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa a independência para somar as variâncias ponderadas pelos quadrados dos coeficientes.',
        'A resposta indica $\\operatorname{V}(Y)=0{,}30\\,\\sigma_X^2$.',
      ],
    },
    solution: '$\\operatorname{V}(Y)=0{,}30\\,\\sigma_X^2$.',
    reasoning:
      'A constante não altera a variância e, como a amostra é aleatória, as parcelas são independentes: $\\operatorname{V}(Y)=(0{,}4^2+0{,}1^2+0{,}3^2+0{,}2^2)\\sigma_X^2=(0{,}16+0{,}01+0{,}09+0{,}04)\\sigma_X^2=0{,}30\\,\\sigma_X^2$.',
    explanation: link.transformar,
  },
];

export const mt1Distribuicoes: ExamQuestion[] = [
  {
    id: 'me-mt1-2022-q4',
    title: 'Binomial: no máximo cinco bicos amarelos em seis aves',
    source: 'Teste 1, 2021/22',
    topic: 'distribuicoes',
    prompt:
      'O bico de determinada espécie de aves pode ser cinzento ou amarelo. Numa certa região, 60% dos indivíduos dessa espécie têm o bico cinzento. Selecionadas aleatoriamente 6 aves dessa região, qual é a probabilidade de no máximo 5 terem o bico amarelo?',
    answer: { kind: 'number', value: 0.996, tolerance: 0.001 },
    solution: '$P(X\\le5)\\approx0{,}996$.',
    reasoning:
      'O número de aves com bico amarelo segue $X\\sim B(6, 0{,}4)$. Então $P(X\\le5)=1-P(X=6)=1-0{,}4^6=1-0{,}004096=0{,}995904\\approx0{,}996$.',
    explanation: link.binomial,
  },
  {
    id: 'me-mt1-2022-q5',
    title: 'Binomial exata: 50 parafusos do tamanho A em 100',
    source: 'Teste 1, 2021/22',
    topic: 'distribuicoes',
    prompt:
      'Uma unidade fabril produz parafusos de dois tamanhos: 42,3% são do tamanho A e os restantes do tamanho B. Foi selecionada uma amostra aleatória de 100 parafusos. Qual é a probabilidade de exatamente 50 parafusos dessa amostra serem do tamanho A?',
    answer: { kind: 'number', value: 0.024, tolerance: 0.001 },
    solution: '$P(X=50)\\approx0{,}024$.',
    reasoning:
      'O número de parafusos do tamanho A segue $X\\sim B(100, 0{,}423)$. Assim, $P(X=50)=\\binom{100}{50}0{,}423^{50}\\,0{,}577^{50}\\approx0{,}024$.',
    explanation: link.binomial,
  },
  {
    id: 'me-mt1-2022-q6',
    title: 'Normal: altura inferior a 1,70 m',
    source: 'Teste 1, 2021/22',
    topic: 'distribuicoes',
    prompt:
      'A altura dos alunos de Métodos Estatísticos segue uma distribuição normal com valor esperado 1,74 m e desvio padrão 0,07 m. Selecionado ao acaso um aluno, qual é a probabilidade de a sua altura ser inferior a 1,70 m?',
    answer: { kind: 'number', value: 0.2843, tolerance: 0.001 },
    solution: '$P(X<1{,}70)\\approx0{,}2843$.',
    reasoning:
      'Padronizando, $Z=\\frac{1{,}70-1{,}74}{0{,}07}\\approx-0{,}5714$. Da tabela da normal padrão, $\\Phi(-0{,}57)\\approx0{,}2843$.',
    explanation: link.normal,
  },
  {
    id: 'me-mt1-2024-q5',
    title: 'Binomial: mais de 2 e menos de 6 peixes com mutação',
    source: 'Teste 1, 2023/24',
    topic: 'distribuicoes',
    prompt:
      'Num determinado lago, a percentagem de peixes de uma dada espécie com uma mutação genética é 5%. Foi selecionada uma amostra aleatória de 15 peixes dessa espécie. Qual é a probabilidade de na amostra existirem mais de 2 e menos de 6 peixes com a mutação?',
    answer: { kind: 'number', value: 0.0361, tolerance: 0.001 },
    solution: '$P(2<X<6)\\approx0{,}0361$.',
    reasoning:
      'O número de peixes com mutação segue $X\\sim B(15, 0{,}05)$. Então $P(2<X<6)=P(3\\le X\\le5)=P(X\\le5)-P(X\\le2)\\approx0{,}9999-0{,}9638=0{,}0361$.',
    explanation: link.binomial,
  },
  {
    id: 'me-mt1-2024-q6',
    title: 'Aproximação normal: pelo menos 50 sem hipertensão em 100',
    source: 'Teste 1, 2023/24',
    topic: 'distribuicoes',
    prompt:
      'Num determinado país, a probabilidade de uma pessoa necessitar de tratamento para a hipertensão é 0,4. Numa amostra aleatória de 100 indivíduos desse país, qual é, aproximadamente, a probabilidade de pelo menos 50 não necessitarem de tratamento?',
    answer: { kind: 'number', value: 0.9838, tolerance: 0.001 },
    solution: '$P(X\\ge50)\\approx0{,}9838$.',
    reasoning:
      'O número de indivíduos sem hipertensão segue $X\\sim B(100, 0{,}6)$, com $\\mu=60$ e $\\sigma=\\sqrt{100\\cdot0{,}6\\cdot0{,}4}=\\sqrt{24}\\approx4{,}899$. Com correção de continuidade, $P(X\\ge50)\\approx P\\!\\left(Z\\ge\\frac{49{,}5-60}{4{,}899}\\right)=P(Z\\ge-2{,}14)\\approx0{,}9838$.',
    explanation: link.aproximar,
  },
  {
    id: 'me-mt1-2024-q7',
    title: 'Distribuição da média de 10 capacidades normais',
    source: 'Teste 1, 2023/24',
    topic: 'distribuicoes',
    prompt:
      'A capacidade de cada garrafa de um dado tipo é normalmente distribuída com média 500 ml e desvio padrão 10 ml. Seja $Y$ a variável aleatória que representa a capacidade média de 10 garrafas de uma amostra aleatória simples. Indique a distribuição de $Y$ (média e variância).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que $Y$ segue uma distribuição normal.',
        'A resposta indica média 500 ml e variância 10 ml² (desvio padrão $\\sqrt{10}\\approx3{,}16$ ml).',
      ],
    },
    solution: '$Y\\sim N(500, 10)$, isto é, média 500 ml e variância 10 ml².',
    reasoning:
      'A média de variáveis normais independentes é normal. Tem-se $E(Y)=500$ e $\\operatorname{V}(Y)=\\frac{10^2}{10}=10$, logo $Y\\sim N(500, 10)$.',
    explanation: link.mediaNormal,
  },
];
