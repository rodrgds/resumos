import type { ExamQuestion } from '../../lib/exam-question';

export const mt1Cinematica: ExamQuestion[] = [
  {
    id: 'f1-mt1-2016-q2',
    title: 'Vetor posição a partir da velocidade',
    source: 'Teste 1, 2015/16',
    topic: 'cinematica',
    prompt:
      'O vetor velocidade de uma partícula, em função do tempo, é $\\vec{v}=2t^2\\,\\hat{\\imath}+t^4\\,\\hat{\\jmath}$ (unidades SI). Sabendo que a posição da partícula em $t=0$ é $\\vec{r}_0=2\\,\\hat{\\imath}+3\\,\\hat{\\jmath}$, determine o vetor posição em $t=1$ s.',
    answer: {
      kind: 'self',
      checklist: [
        'A componente segundo $\\hat{\\imath}$ da resposta é $2{,}67$ m.',
        'A componente segundo $\\hat{\\jmath}$ da resposta é $3{,}2$ m.',
      ],
    },
    solution: '$\\vec{r}(1)=2{,}67\\,\\hat{\\imath}+3{,}2\\,\\hat{\\jmath}$ m.',
    reasoning:
      'Integra-se a velocidade: $\\vec{r}(t)=\\vec{r}_0+\\int_0^t\\vec{v}\\,dt$. Assim, $x(1)=2+\\int_0^1 2t^2\\,dt=2+\\frac{2}{3}=2{,}67$ m e $y(1)=3+\\int_0^1 t^4\\,dt=3+\\frac{1}{5}=3{,}2$ m.',
  },
  {
    id: 'f1-mt1-2016-q9',
    title: 'Aceleração tangencial em função da posição',
    source: 'Teste 1, 2015/16',
    topic: 'cinematica',
    prompt:
      'A velocidade de um ponto é dada pela expressão $v=3s^2$ (unidades SI), em que $s$ é a posição na trajetória. Determine a expressão para a aceleração tangencial, $a_t$, em função de $s$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa $a_t=v\\,\\frac{dv}{ds}$.',
        'A resposta indica $a_t=18s^3$.',
      ],
    },
    solution: '$a_t=18s^3$ (unidades SI).',
    reasoning:
      'Como $a_t=\\frac{dv}{dt}=v\\frac{dv}{ds}$ e $\\frac{dv}{ds}=6s$, obtém-se $a_t=3s^2\\cdot 6s=18s^3$.',
  },
  {
    id: 'f1-mt1-2016-q11',
    title: 'Distância percorrida com inversão de sentido',
    source: 'Teste 1, 2015/16',
    topic: 'cinematica',
    prompt:
      'A posição de um ponto ao longo de um percurso, em função do tempo, é dada por $s=42t-3t^2$ (SI). Determine a distância percorrida pelo ponto entre $t=0$ e $t=10{,}5$ s.',
    answer: { kind: 'number', value: 183.75, tolerance: 0.01, unit: 'm' },
    solution: '$183{,}75$ m.',
    reasoning:
      'A velocidade é $v=42-6t$, que se anula em $t=7$ s. Até aí, $s(7)=42\\cdot7-3\\cdot49=147$ m. Depois, o ponto recua até $s(10{,}5)=441-330{,}75=110{,}25$ m. A distância total é $147+(147-110{,}25)=183{,}75$ m.',
  },
  {
    id: 'f1-mt1-2016-q13',
    title: 'Aceleração tangencial num instante',
    source: 'Teste 1, 2015/16',
    topic: 'cinematica',
    prompt:
      'A velocidade de uma partícula, em função do tempo, é dada por $\\vec{v}=2t^2\\,\\hat{\\imath}+(t^4+1)\\,\\hat{\\jmath}$ (unidades SI). Determine o valor da aceleração tangencial $a_t$ em $t=1$ s.',
    answer: {
      kind: 'number',
      value: 5.66,
      tolerance: 0.01,
      unit: 'm/s²',
    },
    solution: '$a_t=4\\sqrt{2}\\approx 5{,}66$ m/s².',
    reasoning:
      'Em $t=1$: $\\vec{v}=(2,2)$ e $\\vec{a}=(4t,4t^3)=(4,4)$. Logo $a_t=\\frac{\\vec{a}\\cdot\\vec{v}}{|\\vec{v}|}=\\frac{4\\cdot2+4\\cdot2}{\\sqrt{2^2+2^2}}=\\frac{16}{2\\sqrt{2}}=4\\sqrt{2}\\approx 5{,}66$ m/s².',
  },
  {
    id: 'f1-mt1-2020-q19',
    title: 'Velocidade quando a aceleração depende da posição',
    source: 'Teste 1, 2019/20',
    topic: 'cinematica',
    prompt:
      'A aceleração tangencial de um objeto verifica a expressão $a_t=2s^4$ (unidades SI), em que $s$ é a posição na trajetória. Se o objeto parte do repouso em $s=1$ m, determine o valor absoluto da sua velocidade em $s=2$ m.',
    answer: { kind: 'number', value: 4.98, tolerance: 0.01, unit: 'm/s' },
    solution: '$|v|=\\sqrt{24{,}8}\\approx 4{,}98$ m/s.',
    reasoning:
      'Usa-se $a_t=v\\frac{dv}{ds}$, logo $\\int_0^v v\\,dv=\\int_1^2 2s^4\\,ds$. Assim, $\\frac{v^2}{2}=\\frac{2}{5}(2^5-1)=\\frac{62}{5}$, donde $v^2=24{,}8$ e $v\\approx 4{,}98$ m/s.',
  },
];

export const mt1MovimentoCircular: ExamQuestion[] = [
  {
    id: 'f1-mt1-2020-q7',
    title: 'Tempo de uma volta completa',
    source: 'Teste 1, 2019/20',
    topic: 'movimento-circular',
    prompt:
      'O movimento de um ponto no plano $xy$ é circular, não uniforme, com raio de 4 m. O vetor posição do ponto, em função do tempo, é $\\vec{r}=4\\cos(4t^2)\\,\\hat{\\imath}+4\\sin(4t^2)\\,\\hat{\\jmath}$ (unidades SI). Determine o tempo que o ponto demora, desde $t=0$, até regressar à posição inicial, após uma volta completa.',
    answer: { kind: 'number', value: 1.25, tolerance: 0.01, unit: 's' },
    solution: '$t=\\sqrt{\\pi/2}\\approx 1{,}25$ s.',
    reasoning:
      'O ângulo varrido é $\\theta=4t^2$. Uma volta completa corresponde a $\\theta=2\\pi$, logo $4t^2=2\\pi$ e $t=\\sqrt{\\pi/2}\\approx 1{,}25$ s.',
  },
  {
    id: 'f1-mt1-2016-q3',
    title: 'Velocidade de um ponto de uma roda em rolamento',
    source: 'Teste 1, 2015/16',
    topic: 'movimento-circular',
    prompt:
      'Uma roda com 12 cm de raio roda sem deslizar sobre uma superfície plana horizontal. Num dado instante, a velocidade do ponto de contacto $O$ com o solo é nula e o módulo da velocidade do ponto $P$ no topo da roda é 30 cm/s. Determine o módulo da velocidade do ponto $Q$, que está à mesma altura do centro $C$ da roda.',
    answer: {
      kind: 'number',
      value: 21.2,
      tolerance: 0.1,
      unit: 'cm/s',
    },
    solution: '$|\\vec{v}_Q|=15\\sqrt{2}\\approx 21{,}2$ cm/s.',
    reasoning:
      'Num rolamento sem deslizamento, o ponto do topo tem velocidade $2v_C$, logo $v_C=15$ cm/s. O ponto $Q$, à altura do centro, tem componentes horizontal $v_C$ e vertical $v_C$ (devido à rotação), donde $|\\vec{v}_Q|=\\sqrt{v_C^2+v_C^2}=v_C\\sqrt{2}\\approx 21{,}2$ cm/s.',
  },
  {
    id: 'f1-mt1-2016-q20',
    title: 'Aceleração centrípeta de Vénus',
    source: 'Teste 1, 2015/16',
    topic: 'movimento-circular',
    prompt:
      'Determine o módulo da aceleração de Vénus à volta do Sol, sabendo que a distância média entre o Sol e Vénus é $1{,}08\\times10^{11}$ m e que Vénus demora 224,7 dias a completar uma volta (admita uma órbita circular).',
    answer: {
      kind: 'number',
      value: 0.0113,
      tolerance: 0.001,
      unit: 'm/s²',
    },
    solution: '$a_c\\approx 1{,}13\\times10^{-2}$ m/s².',
    reasoning:
      'Com $T=224{,}7\\times86400$ s, a velocidade angular é $\\omega=2\\pi/T$. A aceleração centrípeta é $a_c=\\omega^2 r=\\left(\\frac{2\\pi}{T}\\right)^2 r\\approx 1{,}13\\times10^{-2}$ m/s².',
  },
];

export const mt1LeisNewton: ExamQuestion[] = [
  {
    id: 'f1-mt1-2016-q1',
    title: 'Força entre dois blocos com atrito',
    source: 'Teste 1, 2015/16',
    topic: 'leis-newton',
    prompt:
      'Uma força $\\vec{F}$ horizontal, constante e de módulo 72 N, faz acelerar dois blocos sobre uma mesa horizontal. As massas dos blocos são $m_1=6$ kg e $m_2=18$ kg e o coeficiente de atrito cinético entre os blocos e a mesa é 0,25. Calcule o módulo da força que o bloco da esquerda exerce sobre o bloco da direita. Use $g=9{,}8$ m/s².',
    answer: { kind: 'number', value: 54.0, tolerance: 0.1, unit: 'N' },
    solution: '$54{,}0$ N.',
    reasoning:
      'Para o conjunto, $72-\\mu_k(m_1+m_2)g=(m_1+m_2)a$, logo $a=\\frac{72-0{,}25\\cdot24\\cdot9{,}8}{24}=0{,}55$ m/s². Para o bloco da direita, $F_{12}-\\mu_k m_2 g=m_2 a$, donde $F_{12}=18\\cdot0{,}55+0{,}25\\cdot18\\cdot9{,}8=54{,}0$ N.',
  },
  {
    id: 'f1-mt1-2020-q5',
    title: 'Aceleração relativa entre dois objetos',
    source: 'Teste 1, 2019/20',
    topic: 'leis-newton',
    prompt:
      'O vetor velocidade do objeto 1, em função do tempo, é $\\vec{v}_1=(1-4t)\\,\\hat{\\imath}+8t\\,\\hat{\\jmath}$ (unidades SI) e o do objeto 2, no mesmo referencial, é $\\vec{v}_2=3t\\,\\hat{\\imath}+(1-7t)\\,\\hat{\\jmath}$. Determine o vetor aceleração do objeto 1 em relação ao objeto 2.',
    answer: {
      kind: 'self',
      checklist: [
        'A componente segundo $\\hat{\\imath}$ é $-7$ m/s².',
        'A componente segundo $\\hat{\\jmath}$ é $+15$ m/s².',
      ],
    },
    solution: '$\\vec{a}_{1/2}=-7\\,\\hat{\\imath}+15\\,\\hat{\\jmath}$ m/s².',
    reasoning:
      '$\\vec{a}_1=\\frac{d\\vec{v}_1}{dt}=-4\\,\\hat{\\imath}+8\\,\\hat{\\jmath}$ e $\\vec{a}_2=3\\,\\hat{\\imath}-7\\,\\hat{\\jmath}$. A aceleração relativa é $\\vec{a}_{1/2}=\\vec{a}_1-\\vec{a}_2=-7\\,\\hat{\\imath}+15\\,\\hat{\\jmath}$ m/s².',
  },
  {
    id: 'f1-mt1-2020-q13',
    title: 'Aceleração do centro de massa',
    source: 'Teste 1, 2019/20',
    topic: 'leis-newton',
    prompt:
      'Num objeto com massa de 0,4 kg atuam unicamente duas forças externas: $3\\,\\hat{\\imath}-6\\,\\hat{\\jmath}$ e $8\\,\\hat{\\imath}+11\\,\\hat{\\jmath}$ (ambas em newtons). Determine o módulo da aceleração do centro de massa do objeto.',
    answer: {
      kind: 'number',
      value: 30.2,
      tolerance: 0.1,
      unit: 'm/s²',
    },
    solution: '$30{,}2$ m/s².',
    reasoning:
      'A força resultante é $\\vec{F}=11\\,\\hat{\\imath}+5\\,\\hat{\\jmath}$ N, com módulo $\\sqrt{11^2+5^2}=\\sqrt{146}\\approx 12{,}08$ N. Pela segunda lei de Newton, $a=F/m=12{,}08/0{,}4\\approx 30{,}2$ m/s².',
  },
  {
    id: 'f1-mt1-2020-q15',
    title: 'Resultante de duas forças em equilíbrio',
    source: 'Teste 1, 2019/20',
    topic: 'leis-newton',
    prompt:
      'Sobre um objeto atuam unicamente 3 forças externas, com módulos $F_1=40$ N, $F_2=50$ N e $F_3=50$ N. Sabendo que o objeto se encontra em equilíbrio, calcule o módulo da soma das duas primeiras forças, $|\\vec{F}_1+\\vec{F}_2|$.',
    answer: { kind: 'number', value: 50, tolerance: 0, unit: 'N' },
    solution: '$|\\vec{F}_1+\\vec{F}_2|=50$ N.',
    reasoning:
      'Em equilíbrio, a resultante é nula: $\\vec{F}_1+\\vec{F}_2+\\vec{F}_3=\\vec{0}$. Logo $\\vec{F}_1+\\vec{F}_2=-\\vec{F}_3$ e o módulo pedido é igual a $F_3=50$ N.',
  },
  {
    id: 'f1-mt1-2016-q18',
    title: 'Forças que atuam sobre um bloco',
    source: 'Teste 1, 2015/16',
    topic: 'leis-newton',
    prompt:
      'Um homem empurra um bloco de madeira sobre uma superfície horizontal. Sobre o bloco está pousado um livro. Considere as forças: 1. Força de contacto entre as mãos do homem e o bloco; 2. Peso do livro; 3. Força de atrito produzida pela superfície horizontal. Quais dessas forças atuam sobre o bloco de madeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '1 e 2',
          correct: false,
          explanation: 'O peso do livro atua sobre o livro, não sobre o bloco.',
        },
        {
          text: '1',
          correct: false,
          explanation: 'Falta a força de atrito da superfície sobre o bloco.',
        },
        {
          text: '1 e 3',
          correct: true,
          explanation:
            'O homem e a superfície exercem força sobre o bloco; o peso do livro atua sobre o livro.',
        },
        {
          text: '1, 2 e 3',
          correct: false,
          explanation: 'O peso do livro não atua sobre o bloco de madeira.',
        },
        {
          text: '2 e 3',
          correct: false,
          explanation:
            'A força das mãos atua sobre o bloco; o peso do livro não.',
        },
      ],
    },
    solution: 'Atuam sobre o bloco as forças 1 e 3.',
    reasoning:
      'Num diagrama de corpo livre representamse apenas as forças que atuam nesse corpo. As mãos do homem exercem contacto no bloco (força 1) e a superfície exerce atrito (força 3). O peso do livro (força 2) atua sobre o livro, não sobre o bloco.',
  },
];

export const mt1Rotacao: ExamQuestion[] = [
  {
    id: 'f1-mt1-2020-q9',
    title: 'Binário de atrito num eixo',
    source: 'Teste 1, 2019/20',
    topic: 'rotacao',
    prompt:
      'Para determinar o binário produzido pelo atrito no eixo de uma roda, foi encaixado na roda um volante, aumentando a massa da roda para 560 kg; o raio de giração da roda com o volante é 1,3 m. Foi comunicada à roda uma velocidade angular correspondente a uma frequência de 220 r.p.m. e, abandonada a própria sorte, acabou por parar após 10 minutos. Determine o binário do atrito, considerando-o constante.',
    answer: {
      kind: 'number',
      value: 36.3,
      tolerance: 0.1,
      unit: 'N·m',
    },
    solution: '$\\approx 36{,}3$ N·m.',
    reasoning:
      'O momento de inércia é $I=mk^2=560\\cdot1{,}3^2=947{,}6$ kg·m². A velocidade angular inicial é $\\omega=220\\cdot\\frac{2\\pi}{60}\\approx 23{,}04$ rad/s e a aceleração angular $\\alpha=\\omega/600\\approx 0{,}0384$ s⁻². O binário é $\\tau=I\\alpha\\approx 36{,}3$ N·m.',
  },
  {
    id: 'f1-mt1-2016-q6',
    title: 'Altura máxima antes de tombar',
    source: 'Teste 1, 2015/16',
    topic: 'rotacao',
    prompt:
      'Uma caixa cúbica homogénea, com arestas de 240 mm e peso total de 60 N, está em repouso sobre uma mesa horizontal. No lado direito da caixa aplica-se uma força horizontal $\\vec{F}$ de módulo 50 N, a uma altura $h$ do solo. Se o coeficiente de atrito estático com a mesa for suficiente para evitar que a caixa deslize, determine o valor máximo que $h$ pode ter para que a caixa não rode (tombe).',
    answer: { kind: 'number', value: 144, tolerance: 1, unit: 'mm' },
    solution: '$h_{\\max}=144$ mm.',
    reasoning:
      'A caixa tomba quando o momento da força aplicada em torno da aresta inferior iguala o momento do peso: $F\\,h=P\\cdot\\frac{a}{2}$. Assim, $h=\\frac{60\\cdot0{,}12}{50}=0{,}144$ m $=144$ mm.',
  },
  {
    id: 'f1-mt1-2016-q14',
    title: 'Momento de inércia de uma esfera num eixo tangente',
    source: 'Teste 1, 2015/16',
    topic: 'rotacao',
    prompt:
      'Calcule o momento de inércia de uma esfera com raio de 3 centímetros e massa 452 gramas, que roda à volta de um eixo tangente à superfície da esfera, sabendo que o momento de inércia de uma esfera de raio $R$ e massa $m$ à volta do eixo que passa pelo centro é $\\frac{2}{5}mR^2$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução aplica o teorema dos eixos paralelos.',
        'A resposta indica $5{,}70\\times10^{-4}$ kg·m².',
      ],
    },
    solution: '$I=\\frac{7}{5}mR^2\\approx 5{,}70\\times10^{-4}$ kg·m².',
    reasoning:
      'Pelo teorema dos eixos paralelos, $I=I_{CM}+mR^2=\\frac{2}{5}mR^2+mR^2=\\frac{7}{5}mR^2$. Com $m=0{,}452$ kg e $R=0{,}03$ m: $I=1{,}4\\cdot0{,}452\\cdot0{,}03^2\\approx 5{,}70\\times10^{-4}$ kg·m².',
  },
];
