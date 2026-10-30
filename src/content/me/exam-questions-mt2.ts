import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  icNormalConhecido:
    '/cadeiras/me/intervalos-confianca/#normal-com-desvio-conhecido',
  icNormalDesconhecido:
    '/cadeiras/me/intervalos-confianca/#normal-com-desvio-desconhecido',
  icDimensionar: '/cadeiras/me/intervalos-confianca/#dimensionar-uma-amostra',
  valorP: '/cadeiras/me/testes-hipoteses/#valor-p-e-região-crítica',
  testes:
    '/cadeiras/me/testes-hipoteses/#estatÃ­stica-valor-p-e-nível-de-significância',
  erros: '/cadeiras/me/erros-potencia/#dois-erros-diferentes',
  wald: '/cadeiras/me/proporcoes/#intervalo-de-wald',
  dimProporcao: '/cadeiras/me/proporcoes/#dimensionar-a-amostra',
  diffProporcoes: '/cadeiras/me/proporcoes/#diferença-entre-duas-proporções',
  welch: '/cadeiras/me/comparacao-medias/#desvios-desconhecidos-welch',
  emparelhadas: '/cadeiras/me/comparacao-medias/#amostras-emparelhadas',
  ajustamento: '/cadeiras/me/qui-quadrado/#ajustamento-a-um-modelo',
  independencia: '/cadeiras/me/qui-quadrado/#independência-e-homogeneidade',
  medianas:
    '/cadeiras/me/qui-quadrado/#comparar-medianas-por-uma-tabela-de-contagens',
};

export const mt2IcMedia: ExamQuestion[] = [
  {
    id: 'me-mt2-2025-q1',
    title: 'Intervalo de confiança para a vida média de lâmpadas',
    source: 'Teste 2, 2025/26',
    topic: 'ic-media',
    prompt:
      'Sabe-se que a vida (em horas) de um tipo de lâmpada de halogénio tem distribuição normal com desvio padrão de 25 horas. Uma amostra aleatória de 20 lâmpadas tem uma vida média de 1014 horas. Indique o intervalo de confiança a 95% para a vida média destas lâmpadas.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$]1011, 1017[$',
          correct: false,
          explanation: 'Usa uma margem de erro muito inferior à correta.',
        },
        {
          text: '$]952, 1076[$',
          correct: false,
          explanation: 'Usa o desvio padrão sem o dividir por $\\sqrt{n}$.',
        },
        {
          text: '$]1008, 1020[$',
          correct: false,
          explanation: 'Usa uma margem de erro muito inferior à correta.',
        },
        {
          text: '$]1003, 1025[$',
          correct: true,
          explanation:
            '$1014\\pm1.96\\cdot25/\\sqrt{20}=1014\\pm10.96$, ou seja $]1003.04, 1024.96[$.',
        },
        {
          text: 'Nenhuma das opções anteriores é correta.',
          correct: false,
          explanation: 'A quarta opção é o intervalo correto.',
        },
      ],
    },
    solution: '$]1003, 1025[$ horas.',
    reasoning:
      'Como a população é normal com desvio padrão conhecido, usa-se $z_{0.025}=1.96$: $1014\\pm1.96\\cdot\\frac{25}{\\sqrt{20}}=1014\\pm1.96\\cdot5.590=1014\\pm10.96$, donde resulta $]1003.04, 1024.96[$.',
    explanation: link.icNormalConhecido,
  },
  {
    id: 'me-mt2-2021-q4',
    title: 'Intervalo t para a temperatura mínima de uma bactéria',
    source: 'Teste 2, 2021/22',
    topic: 'ic-media',
    prompt:
      'Foi realizado um estudo relativo à temperatura mínima necessária para o desenvolvimento de uma bactéria, que se admite ser normalmente distribuída. Recolheu-se uma amostra de dimensão 17, para a qual se obteve, em média, 5.5 graus, e um desvio padrão de 0.5 graus. Indique o valor que pertence ao intervalo de confiança a 95% para a temperatura mínima média.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '5.84',
          correct: false,
          explanation: 'Fica acima do limite superior do intervalo.',
        },
        {
          text: '5.25',
          correct: true,
          explanation: 'É o único valor dentro de $]5.24, 5.76[$.',
        },
        {
          text: '5.79',
          correct: false,
          explanation: 'Fica acima do limite superior do intervalo.',
        },
        {
          text: '5.21',
          correct: false,
          explanation: 'Fica abaixo do limite inferior do intervalo.',
        },
        {
          text: 'Nenhuma das hypothèses anteriores está correta.',
          correct: false,
          explanation: 'O valor 5.25 pertence ao intervalo.',
        },
      ],
    },
    solution: '5.25 graus.',
    reasoning:
      'Com variância desconhecida usa-se a distribuição t com 16 graus de liberdade: $t_{0.025,16}=2.1199$. O erro padrão é $s/\\sqrt{n}=0.5/\\sqrt{17}=0.1213$, logo a margem é $2.1199\\cdot0.1213=0.257$ e o intervalo é $]5.5-0.257, 5.5+0.257[=]5.24, 5.76[$.',
    explanation: link.icNormalDesconhecido,
  },
  {
    id: 'me-mt2-2021-q9',
    title: 'Intervalo de confiança para a concentração média de chumbo',
    source: 'Teste 2, 2021/22',
    topic: 'ic-media',
    prompt:
      'Para estimar a concentração média $\\mu$ de chumbo no sangue das crianças de uma certa população, foi medida a concentração de chumbo (em ng/ml) de 49 crianças escolhidas aleatoriamente. Obteve-se uma média de 10.12 e um desvio padrão de 0.65. Indique o intervalo de confiança a 95% para $\\mu$.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$]9.93, 10.31[$',
          correct: true,
          explanation: '$10.12\\pm2.011\\cdot0.65/7=10.12\\pm0.187$.',
        },
        {
          text: '$]8.81, 11.43[$',
          correct: false,
          explanation:
            'Corresponde a usar um quantil demasiado grande (90% com z, por exemplo).',
        },
        {
          text: '$]9.03, 11.21[$',
          correct: false,
          explanation: 'Corresponde a uma margem de erro demasiado grande.',
        },
        {
          text: '$]9.47, 10.77[$',
          correct: false,
          explanation: 'Corresponde a uma margem de erro demasiado pequena.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A primeira opção é o intervalo correto.',
        },
      ],
    },
    solution: '$]9.93, 10.31[$ ng/ml.',
    reasoning:
      'Com $n=49$ usa-se $t_{0.025,48}\\approx2.011$. O erro padrão é $0.65/\\sqrt{49}=0.0929$, logo a margem é $2.011\\cdot0.0929=0.187$ e o intervalo é $]10.12-0.187, 10.12+0.187[=]9.93, 10.31[$.',
    explanation: link.icNormalDesconhecido,
  },
  {
    id: 'me-mt2-2025-q2',
    title: 'Dimensão da amostra para um erro máximo de 2 cm',
    source: 'Teste 2, 2025/26',
    topic: 'ic-media',
    prompt:
      'Num estudo sobre o comprimento dos lagartos de uma dada espécie, de uma população normalmente distribuída, foi medido o comprimento de 50 lagartos, obtendo-se $\\bar{x}=61.80$ cm e $s=3.50$ cm. Admite-se (por hipótese) que $s$ se mantém constante para qualquer valor de $n$. Pretende-se construir um intervalo com 95% de confiança para a média em que o erro seja no máximo 2.00 cm. Indique o menor valor de $n$ que satisfaz a condição.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '118',
          correct: false,
          explanation: 'Excede largamente o valor necessário.',
        },
        {
          text: '98',
          correct: false,
          explanation: 'Excede largamente o valor necessário.',
        },
        {
          text: '22',
          correct: false,
          explanation: 'Ainda dá um erro superior a 2 cm.',
        },
        {
          text: '14',
          correct: false,
          explanation:
            'Com $n=14$ o erro é $2.1604\\cdot3.5/\\sqrt{14}\\approx2.02>2$.',
        },
        {
          text: 'Nenhuma das opções anteriores é correta.',
          correct: true,
          explanation: 'O menor $n$ é 15, que não consta das opções.',
        },
      ],
    },
    solution:
      'Nenhuma das opções anteriores é correta: o menor valor é $n=15$.',
    reasoning:
      'É preciso $t_{0.025,n-1}\\cdot3.5/\\sqrt{n}\\le2$. Com $n=14$ o erro é $2.1604\\cdot3.5/\\sqrt{14}\\approx2.02$; com $n=15$ é $2.1448\\cdot3.5/\\sqrt{15}\\approx1.94\\le2$. Logo o menor valor é 15. (Com o quantil da normal, $n\\ge(1.96\\cdot3.5/2)^2=11.76$, que também não consta das opções.)',
    explanation: link.icDimensionar,
  },
];

export const mt2Testes: ExamQuestion[] = [
  {
    id: 'me-mt2-2023-q1',
    title: 'Estatística e valor-p de um teste-t sobre a resistência de peças',
    source: 'Teste 2, 2023/24',
    topic: 'testes',
    prompt:
      'Sabe-se que a resistência mecânica das peças produzidas numa empresa tem distribuição aproximadamente normal de média 53.00. Após mudança de fornecedor, selecionou-se uma amostra aleatória de 15 peças, com média 49.957 e desvio padrão 3.959. Para testar $H_0:\\mu=53$ contra $H_1:\\mu\\neq53$ a 5%, indique a estatÃ­stica do teste (3 casas decimais) e o valor-p.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$2.977$, $0.77$',
          correct: false,
          explanation:
            'O sinal da estatÃ­stica está trocado e o valor-p não corresponde.',
        },
        {
          text: '$-0.752$, $0.001$',
          correct: false,
          explanation: 'A estatÃ­stica não usa o erro padrão $s/\\sqrt{n}$.',
        },
        {
          text: '$-2.977$, $0.01$',
          correct: true,
          explanation:
            '$t_s=(49.957-53)/(3.959/\\sqrt{15})=-2.977$ e, com 14 graus de liberdade, o valor-p bilateral é cerca de 0.01.',
        },
        {
          text: '$0.773$, $0.5$',
          correct: false,
          explanation: 'Nem a estatÃ­stica nem o valor-p estão corretos.',
        },
        {
          text: 'Nenhuma das hypothèses anteriores está correta.',
          correct: false,
          explanation: 'A terceira opção é o par correto.',
        },
      ],
    },
    solution: '$t_s=-2.977$ e valor-p $\\approx0.01$.',
    reasoning:
      'A estatÃ­stica é $t_s=\\frac{49.957-53}{3.959/\\sqrt{15}}=\\frac{-3.043}{1.0223}=-2.977$. Com $\\nu=14$, $P(T_{14}\\ge2.977)\\approx0.005$, logo o valor-p bilateral é $2\\cdot0.005\\approx0.01$. Como $0.01<0.05$, rejeita-se $H_0$.',
    explanation: link.testes,
  },
  {
    id: 'me-mt2-2021-q7',
    title: 'Interpretação do valor-p num teste bilateral',
    source: 'Teste 2, 2021/22',
    topic: 'testes',
    prompt:
      'Para testar $H_0:\\mu=75$ contra $H_1:\\mu\\neq75$, foi conduzido um teste-t a partir de uma amostra de dimensão 40, com estatÃ­stica $t_s=-2.405$ e valor-p 0.021. Indique a afirmação correta.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Há evidência estatÃ­stica de $H_1$ a um nível de significância de 1%.',
          correct: false,
          explanation: 'Como $0.021>0.01$, a 1% não se rejeita $H_0$.',
        },
        {
          text: 'A probabilidade de $H_1$ ser verdadeira é 0.021.',
          correct: false,
          explanation:
            'O valor-p não é a probabilidade de uma hipóteses ser verdadeira.',
        },
        {
          text: 'A um nível de significância de 5% devemos aceitar $H_0$.',
          correct: false,
          explanation:
            'A 5% rejeita-se $H_0$; além disso, não se "aceita" $H_0$.',
        },
        {
          text: 'Sob $H_0$, a probabilidade de se ter uma estatÃ­stica de teste igual ou mais extrema que $-2.405$ é 0.021.',
          correct: true,
          explanation:
            'É exatamente a definição de valor-p num teste bilateral.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A quarta opção é a correta.',
        },
      ],
    },
    solution:
      'Sob $H_0$, a probabilidade de uma estatÃ­stica igual ou mais extrema que $-2.405$ é 0.021.',
    reasoning:
      'O valor-p é a probabilidade, admitindo $H_0$ verdadeira, de obter uma estatÃ­stica de teste pelo menos tão extrema quanto a observada. Num teste bilateral, conta as duas caudas: $2P(T\\ge|t_s|)=0.021$.',
    explanation: link.valorP,
  },
  {
    id: 'me-mt2-2025-q7',
    title: 'Decisão consoante o nível de significância para valor-p 0.0254',
    source: 'Teste 2, 2025/26',
    topic: 'testes',
    prompt:
      'Num aviário foi testada a hipótese $H_0:\\mu=1.2$ face a $H_1:\\mu\\neq1.2$ (consumo semanal médio de água por frango), com uma amostra de 15 frangos, obtendo-se valor-p 0.0254. Indique a única opção incorreta.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Com $\\alpha=0.05$ rejeitamos $H_0$.',
          correct: false,
          explanation: 'É correta: $0.0254<0.05$.',
        },
        {
          text: 'Com $\\alpha=0.02$ rejeitamos $H_0$.',
          correct: true,
          explanation:
            'É incorreta: como $0.0254>0.02$, a 2% não se rejeita $H_0$.',
        },
        {
          text: 'Com $\\alpha=0.03$ rejeitamos $H_0$.',
          correct: false,
          explanation: 'É correta: $0.0254<0.03$.',
        },
        {
          text: 'Com $\\alpha=0.01$ as observações favorecem $H_0$.',
          correct: false,
          explanation:
            'É correta no sentido de não haver evidência contra $H_0$ a 1%.',
        },
        {
          text: 'Com $\\alpha=0.04$ as observações favorecem $H_1$.',
          correct: false,
          explanation: 'É correta: $0.0254<0.04$.',
        },
      ],
    },
    solution: 'A opção incorreta é: com $\\alpha=0.02$ rejeitamos $H_0$.',
    reasoning:
      'Rejeita-se $H_0$ quando valor-p $<\\alpha$. Como $0.0254>0.02$, a 2% não se rejeita $H_0$; para $\\alpha=0.03$, $0.04$ e $0.05$ rejeita-se, e para $\\alpha=0.01$ não.',
    explanation: link.testes,
  },
  {
    id: 'me-mt2-2021-q8',
    title: 'Definição de erro de Tipo I',
    source: 'Teste 2, 2021/22',
    topic: 'testes',
    prompt:
      'Num teste de hipóteses, o erro de Tipo I ocorre quando, admitindo verdadeira a hipóteses nula, dizemos que um resultado é feste... Indique a描述 correta do erro de Tipo I.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Concluímos que não há evidências a favor de um «novo» valor quando na realidade ele existe.',
          correct: false,
          explanation: 'Isso descreve o erro de Tipo II.',
        },
        {
          text: 'Concluímos que a estatÃ­stica do teste é significativa quando, de facto, não o é.',
          correct: false,
          explanation:
            'Isso não corresponde à definição padrão do erro de Tipo I.',
        },
        {
          text: 'Os dados amostrais não são representativos do fenómeno em estudo.',
          correct: false,
          explanation:
            'Isso é um problema de amostragem, não o erro de Tipo I.',
        },
        {
          text: 'Concluímos que há evidências a favor de um «novo» valor para um parâmetro da população quando de facto não é verdade.',
          correct: true,
          explanation:
            'Rejeitar $H_0$ quando $H_0$ é verdadeira é o erro de Tipo I.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A quarta opção é a correta.',
        },
      ],
    },
    solution:
      'Rejeitar $H_0$ (concluir pelo «novo» valor) quando $H_0$ é verdadeira.',
    reasoning:
      'O erro de Tipo I tem probabilidade $\\alpha$ e consiste em rejeitar a hipóteses nula quando ela é verdadeira. O erro de Tipo II é o simétrico: não rejeitar $H_0$ quando $H_1$ é verdadeira.',
    explanation: link.erros,
  },
];

export const mt2Proporcoes: ExamQuestion[] = [
  {
    id: 'me-mt2-2021-q6',
    title: 'Intervalo de Agresti-Coull para a proporção de curas',
    source: 'Teste 2, 2021/22',
    topic: 'proporcoes',
    prompt:
      'Numa amostra aleatória de 40 doentes submetidos a um tratamento, 25 ficaram curados. Indique o intervalo de confiança a 95% para a proporção $p$ de cura, usando o método de Agresti-Coull.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$]46.9\\%, 75.8\\%[$',
          correct: true,
          explanation:
            '$\\tilde p=27/44=0.6136$ e $1.96\\sqrt{\\tilde p(1-\\tilde p)/44}=0.1439$, dando $]0.4698, 0.7575[$.',
        },
        {
          text: '$]49.9\\%, 75.1\\%[$',
          correct: false,
          explanation:
            'Corresponde ao intervalo de Wald, não ao de Agresti-Coull.',
        },
        {
          text: '$]56.3\\%, 66.4\\%[$',
          correct: false,
          explanation: 'A margem de erro é demasiado pequena.',
        },
        {
          text: '$]57.5\\%, 67.5\\%[$',
          correct: false,
          explanation: 'A margem de erro é demasiado pequena.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A primeira opção é o intervalo correto.',
        },
      ],
    },
    solution: '$]46.9\\%, 75.8\\%[$.',
    reasoning:
      'O método de Agresti-Coull a 95% usa $\\tilde p=(y+2)/(n+4)=27/44=0.6136$ e $\\tilde n=n+4=44$: $0.6136\\pm1.96\\sqrt{0.6136\\cdot0.3864/44}=0.6136\\pm0.1439$, ou seja $]0.4698, 0.7575[$.',
    explanation: link.wald,
  },
  {
    id: 'me-mt2-2023-q8',
    title: 'Tamanho mínimo da amostra no método de Wald',
    source: 'Teste 2, 2023/24',
    topic: 'proporcoes',
    prompt:
      'Pretende-se construir um intervalo de confiança a 95% para uma proporção, pelo método de Wald, com margem de erro não superior a 0.05. Indique o menor valor de $n$ que satisfaz a condição (sem conhecer $p$, usa-se o caso mais desfavorável $p=0.5$).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '372',
          correct: false,
          explanation: 'Fica aquém do valor necessário (385).',
        },
        {
          text: '485',
          correct: false,
          explanation: 'Excede o valor necessário.',
        },
        {
          text: '391',
          correct: false,
          explanation: 'Excede ligeiramente o valor necessário (385).',
        },
        {
          text: '497',
          correct: false,
          explanation: 'Excede o valor necessário.',
        },
        {
          text: 'Nenhuma das hypothèses anteriores está correta.',
          correct: true,
          explanation: 'O valor mínimo é $n=385$, que não consta das opções.',
        },
      ],
    },
    solution: 'Nenhuma das opções: o tamanho mínimo é $n=385$.',
    reasoning:
      'A margem de erro é $z_{0.025}\\sqrt{p(1-p)/n}\\le0.05$. O caso mais desfavorável é $p=0.5$, donde $n\\ge\\frac{1.96^2\\cdot0.25}{0.05^2}=384.16$, ou seja $n=385$.',
    explanation: link.dimProporcao,
  },
  {
    id: 'me-mt2-2023-q10',
    title: 'Comparação da eficácia de dois tipos de capacetes',
    source: 'Teste 2, 2023/24',
    topic: 'proporcoes',
    prompt:
      'Duas amostras aleatórias de capacetes foram sujeitas a um teste de impacto: numa de 50 capacetes do tipo C1 observaram-se danos em 18, e numa de 70 do tipo C2 observaram-se danos em 39. Indique o que se pode afirmar com 95% de confiança.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Os capacetes do tipo C2 são mais eficazes que os do tipo C1.',
          correct: false,
          explanation: 'C2 tem maior proporção de danos, logo é menos eficaz.',
        },
        {
          text: 'Não podemos concluir que há diferença de eficácia entre os dois tipos.',
          correct: false,
          explanation:
            'O intervalo para $p_{C1}-p_{C2}$ não contém 0: $]-0.374, -0.020[$.',
        },
        {
          text: 'Com os dados fornecidos nada é possível concluir.',
          correct: false,
          explanation: 'Há dados suficientes para concluir.',
        },
        {
          text: 'Os capacetes do tipo C1 são mais eficazes que os do tipo C2.',
          correct: true,
          explanation:
            '$\\hat p_1-\\hat p_2=0.36-0.557=-0.197$ e o IC a 95% é $]-0.374, -0.020[$, todo negativo.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A quarta opção é a correta.',
        },
      ],
    },
    solution: 'Os capacetes do tipo C1 são mais eficazes que os do tipo C2.',
    reasoning:
      '$\\hat p_{C1}=18/50=0.36$ e $\\hat p_{C2}=39/70=0.557$. O intervalo a 95% para a diferença é $-0.197\\pm1.96\\sqrt{\\frac{0.36\\cdot0.64}{50}+\\frac{0.557\\cdot0.443}{70}}=-0.197\\pm0.177=]-0.374,-0.020[$. Como é todo negativo, a proporção de danos em C1 é menor: C1 é mais eficaz.',
    explanation: link.diffProporcoes,
  },
];

export const mt2Comparacao: ExamQuestion[] = [
  {
    id: 'me-mt2-2021-q3',
    title: 'Conclusão de um teste-t para duas médias',
    source: 'Teste 2, 2021/22',
    topic: 'comparacao-medias',
    prompt:
      'Para comparar as médias de um parâmetro em duas populações A e B, foi realizado um teste-t com 44 graus de liberdade. Resultados: $\\bar{x}=58.458$, $\\bar{y}=62.591$, estatÃ­stica do teste $-1.686$, valor-p 0.099 e intervalo de confiança a 95% para a diferença de médias $]-9.072, 0.807[$. Indique a conclusão correta.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Ao nível de 5%, as populações A e B são iguais.',
          correct: false,
          explanation: 'Não rejeitar $H_0$ não prova igualdadee.',
        },
        {
          text: 'As médias das populações não são iguais com 95% de confiança.',
          correct: false,
          explanation:
            'O intervalo contém 0, logo não há evidência de diferença.',
        },
        {
          text: 'As médias das populações A e B são iguais.',
          correct: false,
          explanation: 'Igualmente, não se pode afirmar igualdade.',
        },
        {
          text: 'Ao nível de 5%, há evidências para considerar que as médias são iguais.',
          correct: false,
          explanation: 'A não rejeição não é evidência a favor de $H_0$.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: true,
          explanation:
            'Com valor-p 0.099>0.05 não se rejeita $H_0$, mas isso não permite nenhuma das afirmações anteriores.',
        },
      ],
    },
    solution: 'Nenhuma das afirmações anteriores está correta.',
    reasoning:
      'Como valor-p $=0.099>0.05$ (e o IC a 95% contém 0), não se rejeita $H_0$ ao nível de 5%. Mas não rejeitar não demonstra igualdade nem é "evidência a favor" das médias serem iguais.',
    explanation: link.welch,
  },
  {
    id: 'me-mt2-2023-q9',
    title: 'Intervalo para a diferença emparelhada de COHb no sangue',
    source: 'Teste 2, 2023/24',
    topic: 'comparacao-medias',
    prompt:
      'Num estudo sobre o efeito do monóxido de carbono dos cigarros em mulheres grávidas, colheu-se sangue a 10 mulheres antes e depois de fumarem um cigarro, registando-se a percentagem de hemoglobina ligada ao CO (COHb). As diferenças (Depois − Antes) têm média $\\bar{d}=3.87$ e desvio padrão $s_d=1.27$. Admitindo população normal das diferenças, indique o intervalo de confiança a 95% para a diferença média de COHb.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa a distribuição t com 9 graus de liberdade ($t_{0.025,9}=2.2622$).',
        'A resposta usa o erro padrão $s_d/\\sqrt{n}=1.27/\\sqrt{10}\\approx0.4016$.',
        'O intervalo apresentado é aproximadamente $]2.96, 4.78[$.',
      ],
    },
    solution: '$]2.96, 4.78[$.',
    reasoning:
      'Por se tratar de medições emparelhadas, trabalha-se com as diferenças. A margem é $t_{0.025,9}\\cdot s_d/\\sqrt{n}=2.2622\\cdot1.27/\\sqrt{10}=2.2622\\cdot0.4016=0.909$, logo o intervalo é $3.87\\pm0.909=]2.96, 4.78[$. Como não contém 0, há evidência de aumento da COHb depois de fumar.',
    explanation: link.emparelhadas,
  },
  {
    id: 'me-mt2-2024-q1',
    title: 'Teste-t de Welch para o tempo de recuperação com dois medicamentos',
    source: 'Teste Tipo 2, 2024/25',
    topic: 'comparacao-medias',
    prompt:
      'Numa exploração de gado foram testados dois medicamentos (A e B) em animais doentes: $n_A=10$, $\\bar{x}_A=165$, $s_A=42$; $n_B=15$, $\\bar{x}_B=180$, $s_B=56$ (tempo médio de recuperação). A um nível de significância de 5%, indique a estatÃ­stica do teste e a conclusão adequada.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta calcula o erro padrão combinado $\\sqrt{42^2/10+56^2/15}\\approx19.6$.',
        'A resposta indica $t_s\\approx-0.76$ (com cerca de 23 graus de liberdade de Welch).',
        'A resposta concluye que os dados não evidenciam diferença entre A e B (valor-p $\\approx0.45>0.05$).',
      ],
    },
    solution:
      '$t_s\\approx-0.76$, valor-p $\\approx0.45$: os dados não evidenciam diferença entre A e B.',
    reasoning:
      'Com desvios desconhecidos e possivelmente diferentes usa-se Welch: $t_s=\\frac{165-180}{\\sqrt{42^2/10+56^2/15}}=\\frac{-15}{19.63}\\approx-0.76$. Os graus de liberdade de Welch são cerca de 23, donde o valor-p bilateral é cerca de 0.45. Como $0.45>0.05$, não se rejeita $H_0$: não há evidência de diferença no tempo médio de recuperação.',
    explanation: link.welch,
  },
];

export const mt2QuiQuadrado: ExamQuestion[] = [
  {
    id: 'me-mt2-2023-q4',
    title: 'Tipo de teste do qui-quadrado para três medicamentos',
    source: 'Teste 2, 2023/24',
    topic: 'qui-quadrado',
    prompt:
      'Pretende-se estudar um efeito secundário associado a três medicamentos distintos (M1, M2, M3). Foram recolhidas três amostras aleatórias e independentes de 80 pessoas cada, uma por medicamento, e registou-se o número de pessoas que desenvolveu o efeito secundário: M1: 8 sim, 72 não; M2: 15 sim, 65 não; M3: 11 sim, 69 não. Indique o teste do qui-quadrado adequado.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Teste-t',
          correct: false,
          explanation: 'A variável é de contagens, não uma média.',
        },
        {
          text: 'Teste de independência do $\\chi^2$',
          correct: false,
          explanation:
            'Não há uma única amostra classificada em duas variáveis.',
        },
        {
          text: 'Teste de ajustamento do $\\chi^2$',
          correct: false,
          explanation:
            'Não se compara com um modelo teórico de probabilidades.',
        },
        {
          text: 'Teste de homogeneidade do $\\chi^2$',
          correct: true,
          explanation:
            'Comparam-se várias populações (uma amostra independente por medicamento) quanto à mesma variável categórica.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'O teste de homogeneidade é o adequado.',
        },
      ],
    },
    solution: 'Teste de homogeneidade do $\\chi^2$.',
    reasoning:
      'Há várias amostras independentes retiradas de várias populações (grupos de medicamentos) e pretende-se comparar a distribuição de uma mesma variável categórica (efeito secundário sim/não). Isso é um teste de homogeneidade; o de independência parte de uma única amostra de duas variáveis.',
    explanation: link.independencia,
  },
  {
    id: 'me-mt2-2023-q7',
    title: 'Estatística e valor-p do qui-quadrado para duas classificações',
    source: 'Teste 2, 2023/24',
    topic: 'qui-quadrado',
    prompt:
      'Para testar se dois testes de matemática (T1 e T2) têm o mesmo grau de dificuldade, compararam-se as notas positivas/negativas: T1: 55 positivas, 25 negativas; T2: 48 positivas, 32 negativas. A um nível de significância de 2.5%, indique o par possível para a estatística $\\chi^2_s$ e o valor-p.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\chi^2_s=1.34$ e $Vp=0.2470$',
          correct: true,
          explanation:
            'Com os esperados 51.5 e 28.5 em cada linha, $\\chi^2_s=1.335$ e $P(\\chi^2_1>1.335)\\approx0.248$.',
        },
        {
          text: '$\\chi^2_s=1.34$ e $Vp=2.7055$',
          correct: false,
          explanation: '2.7055 é um quantil do $\\chi^2$, não um valor-p.',
        },
        {
          text: '$\\chi^2_s=1.43$ e $Vp=0.2318$',
          correct: false,
          explanation: 'A estatística não corresponde aos dados.',
        },
        {
          text: '$\\chi^2_s=1.52$ e $Vp=1.0742$',
          correct: false,
          explanation: 'Nem a estatística nem o valor-p são possíveis.',
        },
        {
          text: 'Nenhuma das hipóteses anteriores está correta.',
          correct: false,
          explanation: 'A primeira opção é o par correto.',
        },
      ],
    },
    solution: '$\\chi^2_s=1.34$ e valor-p $=0.2470$.',
    reasoning:
      'Os efectivos esperados são $80\\cdot103/160=51.5$ e $80\\cdot57/160=28.5$ em cada grupo. A estatística é $\\chi^2_s=2\\cdot\\frac{(55-51.5)^2}{51.5}+2\\cdot\\frac{(25-28.5)^2}{28.5}=0.476+0.860=1.34$, com 1 grau de liberdade. O valor-p é $P(\\chi^2_1>1.34)\\approx0.247>0.025$, logo não se rejeita a igualdade de dificuldade.',
    explanation: link.independencia,
  },
  {
    id: 'me-mt2-2025-q8',
    title: 'Teste do qui-quadrado para comparar medianas de salários',
    source: 'Teste 2, 2025/26',
    topic: 'qui-quadrado',
    prompt:
      'Para saber se as medianas dos salários de trabalhadores de duas empresas (E1 e E2) são iguais, compararam-se as contagens acima/abaixo da mediana global (MG): em A1 ($n=100$): 34 acima, 66 abaixo; em A2 ($n=60$): 30 acima, 30 abaixo. A 5% ($\\chi^2_{0.05,1}=3.8415$), indique a conclusão correta.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$H_0$ não é rejeitada; $\\chi^2_s=1.5$',
          correct: false,
          explanation: 'A estatística não é 1.5.',
        },
        {
          text: '$\\chi^2_s=2.4$; $H_0$ não é rejeitada',
          correct: false,
          explanation: 'A estatística não é 2.4.',
        },
        {
          text: 'Rejeita-se $H_0$; $\\chi^2_s=2.4$',
          correct: false,
          explanation: 'A estatística não é 2.4.',
        },
        {
          text: '$\\chi^2_s=4.0$; não se rejeita $H_0$',
          correct: false,
          explanation:
            'A estatística é 4.0, mas $4.0>3.8415$, logo rejeita-se $H_0$.',
        },
        {
          text: '$\\chi^2_s=4.0$; $H_0$ é rejeitada',
          correct: true,
          explanation:
            '$\\chi^2_s=4.0>3.8415=\\chi^2_{0.05,1}$, logo rejeita-se $H_0$ a 5%.',
        },
      ],
    },
    solution: '$\\chi^2_s=4.0$ e $H_0$ é rejeitada a 5%.',
    reasoning:
      'Os efectivos esperados são 40, 60, 24 e 36. A estatística é $\\chi^2_s=\\frac{(34-40)^2}{40}+\\frac{(30-24)^2}{24}+\\frac{(66-60)^2}{60}+\\frac{(30-36)^2}{36}=0.9+1.5+0.6+1.0=4.0$. Com 1 grau de liberdade, $4.0>3.8415$, donde se rejeita $H_0$: há evidência de que as medianas diferem.',
    explanation: link.medianas,
  },
];
