import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  trabalho: '/cadeiras/f1/trabalho-energia/#trabalho-de-uma-força',
  energiaCinetica: '/cadeiras/f1/trabalho-energia/#teorema-da-energia-cinética',
  equilibrio: '/cadeiras/f1/trabalho-energia/#equilíbrio-e-estabilidade',
  leisNewton: '/cadeiras/f1/leis-newton/#leis-de-newton',
  rolamento: '/cadeiras/f1/rotacao/#rolamento-sem-deslizamento',
  inercia: '/cadeiras/f1/rotacao/#momento-de-inércia',
};

export const mt2TrabalhoEnergia: ExamQuestion[] = [
  {
    id: 'f1-mt2-2016-q17',
    title: 'Trabalho da força de atrito num plano inclinado',
    source: 'Teste 2, 2015/16',
    topic: 'trabalho-energia',
    prompt:
      'Um bloco de massa $3\\ \\mathrm{kg}$ desce deslizando sobre a superfície de um plano inclinado, partindo do ponto $A$ com velocidade de valor $3\\ \\mathrm{m/s}$ e parando completamente no ponto $B$. As alturas dos pontos $A$ e $B$, medidas na vertical desde a base horizontal do plano, são $h_A = 100\\ \\mathrm{cm}$ e $h_B = 10\\ \\mathrm{cm}$. Use $g = 9{,}8\\ \\mathrm{m/s^2}$. Calcule o trabalho realizado pela força de atrito, desde $A$ até $B$.',
    answer: { kind: 'number', value: -40.0, tolerance: 0.1, unit: 'J' },
    solution:
      '$W_{\\text{atrito}} = -39{,}96\\ \\mathrm{J} \\approx -40{,}0\\ \\mathrm{J}$.',
    reasoning:
      'Pelo teorema da energia cinética, $W_{\\text{atrito}} + W_{\\text{peso}} = \\Delta E_c$. O trabalho do peso é $mg(h_A - h_B) = 3\\cdot9{,}8\\cdot0{,}90 = 26{,}46\\ \\mathrm{J}$ e $\\Delta E_c = 0 - \\tfrac{1}{2}\\cdot3\\cdot3^2 = -13{,}5\\ \\mathrm{J}$. Logo $W_{\\text{atrito}} = -13{,}5 - 26{,}46 = -39{,}96\\ \\mathrm{J}$.',
    explanation: link.trabalho,
  },
  {
    id: 'f1-mt2-2020-q1',
    title: 'Trabalho do atrito com velocidade inicial não nula',
    source: 'Teste 2, 2019/20',
    topic: 'trabalho-energia',
    prompt:
      'Um bloco de massa $5\\ \\mathrm{kg}$ desce deslizando sobre a superfície de um plano inclinado, partindo do ponto $A$ com velocidade de valor $7\\ \\mathrm{m/s}$ e parando completamente no ponto $B$. As alturas dos pontos $A$ e $B$, medidas na vertical desde a base horizontal do plano, são $h_A = 60\\ \\mathrm{cm}$ e $h_B = 10\\ \\mathrm{cm}$. Use $g = 9{,}8\\ \\mathrm{m/s^2}$. Calcule o trabalho realizado pela força de atrito, desde $A$ até $B$.',
    answer: { kind: 'number', value: -147.0, tolerance: 0.01, unit: 'J' },
    solution: '$W_{\\text{atrito}} = -147{,}0\\ \\mathrm{J}$.',
    reasoning:
      '$W_{\\text{atrito}} = \\Delta E_c - W_{\\text{peso}} = \\left(0 - \\tfrac{1}{2}\\cdot5\\cdot7^2\\right) - 5\\cdot9{,}8\\cdot(0{,}60 - 0{,}10) = -122{,}5 - 24{,}5 = -147{,}0\\ \\mathrm{J}$.',
    explanation: link.trabalho,
  },
  {
    id: 'f1-mt2-2016-q13',
    title: 'Trabalho mínimo para subir uma caixa por uma rampa',
    source: 'Teste 2, 2015/16',
    topic: 'trabalho-energia',
    prompt:
      'Para subir uma caixa de massa $60\\ \\mathrm{kg}$, desde o chão até um camião com altura $115\\ \\mathrm{cm}$, um homem empurra a caixa ao longo de uma rampa inclinada $30^\\circ$ em relação à horizontal. Determine o trabalho mínimo que o homem deve realizar, desprezando o atrito e a resistência do ar. Use $g = 9{,}8\\ \\mathrm{m/s^2}$.',
    answer: { kind: 'number', value: 676.2, tolerance: 0.1, unit: 'J' },
    solution: '$W_{\\min} = 676{,}2\\ \\mathrm{J} \\approx 676\\ \\mathrm{J}$.',
    reasoning:
      'O trabalho mínimo realiza-se quando a caixa chega ao camião em repouso, ou seja, quando toda a energia fornecida fica como energia potencial: $W_{\\min} = mgh = 60\\cdot9{,}8\\cdot1{,}15 = 676{,}2\\ \\mathrm{J}$. O ângulo da rampa não entra no resultado porque o trabalho mínimo depende apenas da variação de altura.',
    explanation: link.energiaCinetica,
  },
];

export const mt2Rotacao: ExamQuestion[] = [
  {
    id: 'f1-mt2-2016-q15',
    title: 'Energia cinética de uma esfera em rolamento',
    source: 'Teste 2, 2015/16',
    topic: 'rotacao',
    prompt:
      'Uma esfera de massa $m$ e raio $R$ rola sobre uma superfície plana, sem deslizar. O momento de inércia da esfera em relação ao centro de massa é $\\tfrac{2}{5}mR^2$. Determine a expressão da energia cinética total da esfera em função da velocidade $v$ do centro de massa.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta escreve a energia cinética como soma das parcelas de translação e de rotação.',
        'A resposta usa a condição de rolamento $v = \\omega R$.',
        'A resposta indica $E_c = \\tfrac{7}{10}mv^2$.',
      ],
    },
    solution: '$E_c = \\tfrac{7}{10}mv^2$.',
    reasoning:
      '$E_c = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}I\\omega^2 = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}\\cdot\\tfrac{2}{5}mR^2\\cdot\\tfrac{v^2}{R^2} = \\left(\\tfrac{1}{2} + \\tfrac{1}{5}\\right)mv^2 = \\tfrac{7}{10}mv^2$.',
    explanation: link.rolamento,
  },
  {
    id: 'f1-mt2-2020-q18',
    title: 'Velocidade de um cilindro no fim de uma rampa',
    source: 'Teste 2, 2019/20',
    topic: 'rotacao',
    prompt:
      'Um cilindro desce uma rampa com $49\\ \\mathrm{cm}$ de altura, partindo do repouso e rolando à volta do seu eixo sem deslizar. Despreze a resistência do ar. O momento de inércia do cilindro de massa $m$ e raio $r$, à volta do seu eixo, é $\\tfrac{1}{2}mr^2$. Use $g = 9{,}8\\ \\mathrm{m/s^2}$. Determine a velocidade do centro de massa do cilindro quando chega ao fim da rampa.',
    answer: { kind: 'number', value: 2.53, tolerance: 0.01, unit: 'm/s' },
    solution: '$v = 2{,}53\\ \\mathrm{m/s}$.',
    reasoning:
      'A energia mecânica conserva-se: $mgh = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}I\\omega^2 = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}\\cdot\\tfrac{1}{2}mr^2\\cdot\\tfrac{v^2}{r^2} = \\tfrac{3}{4}mv^2$. Logo $v = \\sqrt{\\tfrac{4gh}{3}} = \\sqrt{\\tfrac{4\\cdot9{,}8\\cdot0{,}49}{3}} = 2{,}53\\ \\mathrm{m/s}$.',
    explanation: link.rolamento,
  },
];

export const mt2Forcas: ExamQuestion[] = [
  {
    id: 'f1-mt2-2016-q10',
    title: 'Componente tangencial da força resultante',
    source: 'Teste 2, 2015/16',
    topic: 'forcas',
    prompt:
      'Quando uma partícula passa por um ponto $P$, a sua velocidade é $\\vec{v} = 4\\,\\hat{\\imath} + 2\\,\\hat{\\jmath}$ (SI) e a força resultante é $\\vec{F} = 6\\,\\hat{\\imath} + 6\\,\\hat{\\jmath}$ (SI). Calcule o valor da componente tangencial da força resultante nesse ponto.',
    answer: { kind: 'number', value: 8.05, tolerance: 0.01, unit: 'N' },
    solution: '$F_t = 8{,}05\\ \\mathrm{N}$.',
    reasoning:
      'A componente tangencial é a projeção da força na direção da velocidade: $F_t = \\vec{F}\\cdot\\vec{v}/|\\vec{v}| = (6\\cdot4 + 6\\cdot2)/\\sqrt{4^2+2^2} = 36/\\sqrt{20} = 8{,}05\\ \\mathrm{N}$.',
    explanation: link.leisNewton,
  },
  {
    id: 'f1-mt2-2020-q7',
    title: 'Componente tangencial da força num instante',
    source: 'Teste 2, 2019/20',
    topic: 'forcas',
    prompt:
      'Quando uma partícula passa por um ponto $P$, a sua velocidade é $\\vec{v} = 3\\,\\hat{\\imath} + 2\\,\\hat{\\jmath}$ (SI) e a força resultante é $\\vec{F} = 4\\,\\hat{\\imath} + 6\\,\\hat{\\jmath}$ (SI). Calcule o valor da componente tangencial da força resultante nesse ponto.',
    answer: { kind: 'number', value: 6.66, tolerance: 0.01, unit: 'N' },
    solution: '$F_t = 6{,}66\\ \\mathrm{N}$.',
    reasoning:
      '$F_t = \\vec{F}\\cdot\\vec{v}/|\\vec{v}| = (4\\cdot3 + 6\\cdot2)/\\sqrt{3^2+2^2} = 24/\\sqrt{13} = 6{,}66\\ \\mathrm{N}$.',
    explanation: link.leisNewton,
  },
];

export const mt2Equilibrio: ExamQuestion[] = [
  {
    id: 'f1-mt2-2016-q8',
    title: 'Ponto de equilíbrio instável de uma força tangencial',
    source: 'Teste 2, 2015/16',
    topic: 'equilibrio',
    prompt:
      'Num sistema que se desloca no eixo dos $x$, a força tangencial resultante é $F_t = x^2 + x - 2$ (SI). Qual dos seguintes valores corresponde à posição $x$ de um ponto de equilíbrio instável?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$x = 1$',
          correct: true,
          explanation:
            'Os equilíbrios são $x = -2$ e $x = 1$. Como $\\mathrm{d}F_t/\\mathrm{d}x = 2x + 1$, em $x = 1$ a derivada é positiva, logo o equilíbrio é instável.',
        },
        {
          text: '$x = -1$',
          correct: false,
          explanation:
            '$F_t(-1) = -2 \\neq 0$, logo não é ponto de equilíbrio.',
        },
        {
          text: '$x = 3$',
          correct: false,
          explanation: '$F_t(3) = 10 \\neq 0$, logo não é ponto de equilíbrio.',
        },
        {
          text: '$x = 2$',
          correct: false,
          explanation: '$F_t(2) = 4 \\neq 0$, logo não é ponto de equilíbrio.',
        },
        {
          text: '$x = -2$',
          correct: false,
          explanation:
            'É ponto de equilíbrio, mas $\\mathrm{d}F_t/\\mathrm{d}x = -3 < 0$ nesse ponto, logo é estável.',
        },
      ],
    },
    solution: '$x = 1$.',
    reasoning:
      'Os pontos de equilíbrio são as raízes de $F_t = (x+2)(x-1) = 0$, ou seja $x = -2$ e $x = 1$. Um equilíbrio é instável quando a força afasta a partícula dele, o que acontece quando $\\mathrm{d}F_t/\\mathrm{d}x > 0$. Como $\\mathrm{d}F_t/\\mathrm{d}x = 2x+1$, só $x = 1$ (derivada $3 > 0$) é instável.',
    explanation: link.equilibrio,
  },
  {
    id: 'f1-mt2-2020-q9',
    title: 'Órbita homoclínica e ponto de equilíbrio instável',
    source: 'Teste 2, 2019/20',
    topic: 'equilibrio',
    prompt:
      'A força tangencial resultante sobre um objeto é $F_t = -s^2 + 2s + 3$, onde $s$ é a posição na trajetória. Sabendo que o retrato de fase do sistema tem uma órbita homoclínica que se aproxima assimptoticamente do ponto $(a, 0)$, determine o valor de $a$.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$a = -1$',
          correct: true,
          explanation:
            'A órbita homoclínica liga um ponto de equilíbrio instável a ele próprio; $s = -1$ é o único equilíbrio instável de $F_t = -(s-3)(s+1)$.',
        },
        {
          text: '$a = 3$',
          correct: false,
          explanation:
            'Em $s = 3$ a derivada de $F_t$ é negativa, logo o equilíbrio é estável.',
        },
        {
          text: '$a = -2$',
          correct: false,
          explanation:
            '$F_t(-2) = -5 \\neq 0$, logo não é ponto de equilíbrio.',
        },
        {
          text: '$a = 2$',
          correct: false,
          explanation: '$F_t(2) = 3 \\neq 0$, logo não é ponto de equilíbrio.',
        },
        {
          text: '$a = 1$',
          correct: false,
          explanation: '$F_t(1) = 4 \\neq 0$, logo não é ponto de equilíbrio.',
        },
      ],
    },
    solution: '$a = -1$.',
    reasoning:
      'Os equilíbrios são $s = -1$ e $s = 3$. A estabilidade dada por $\\mathrm{d}F_t/\\mathrm{d}s = -2s + 2$: em $s = -1$ é $4 > 0$ (instável) e em $s = 3$ é $-4 < 0$ (estável). Uma órbita homoclínica parte e regressa ao mesmo ponto de equilíbrio instável, logo $a = -1$.',
    explanation: link.equilibrio,
  },
  {
    id: 'f1-mt2-2020-q4',
    title: 'Equilíbrios e órbitas homoclínicas de um potencial',
    source: 'Teste 2, 2019/20',
    topic: 'equilibrio',
    prompt:
      'Uma partícula de massa $m = 2$ desloca-se no eixo dos $x$ sob uma força resultante conservativa de energia potencial $U = 2x^2 e^{-x}$. Qual das seguintes afirmações é correta?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Há 2 pontos de equilíbrio e nenhuma órbita homoclínica.',
          correct: false,
          explanation:
            'Há 2 pontos de equilíbrio, mas existe uma órbita homoclínica associada ao equilíbrio instável.',
        },
        {
          text: 'Há 3 pontos de equilíbrio e uma órbita homoclínica.',
          correct: false,
          explanation: 'Só há 2 pontos de equilíbrio, $x = 0$ e $x = 2$.',
        },
        {
          text: 'Há 2 pontos de equilíbrio e uma órbita homoclínica.',
          correct: true,
          explanation:
            '$\\mathrm{d}U/\\mathrm{d}x = 2x(2-x)e^{-x}$ anula-se em $x = 0$ (mínimo, estável) e $x = 2$ (máximo, instável); a energia do máximo gera uma órbita homoclínica.',
        },
        {
          text: 'Há 3 pontos de equilíbrio e uma órbita heteroclínica.',
          correct: false,
          explanation:
            'Só há 2 pontos de equilíbrio e a órbita é homoclínica, não heteroclínica.',
        },
        {
          text: 'Há 2 pontos de equilíbrio e uma órbita heteroclínica.',
          correct: false,
          explanation:
            'A órbita que parte do máximo de potencial regressa ao mesmo ponto, logo é homoclínica.',
        },
      ],
    },
    solution:
      'Há 2 pontos de equilíbrio ($x = 0$ e $x = 2$) e uma órbita homoclínica.',
    reasoning:
      '$\\mathrm{d}U/\\mathrm{d}x = (4x - 2x^2)e^{-x} = 2x(2-x)e^{-x}$, que se anula em $x = 0$ e $x = 2$. A segunda derivada é positiva em $x = 0$ (mínimo, equilíbrio estável) e negativa em $x = 2$ (máximo, equilíbrio instável, com $U = 8e^{-2}$). Uma trajetória com energia igual à do máximo parte do ponto instável e regressa a ele: é uma órbita homoclínica.',
    explanation: link.equilibrio,
  },
  {
    id: 'f1-mt2-2020-q20',
    title: 'Número de pontos de equilíbrio instáveis',
    source: 'Teste 2, 2019/20',
    topic: 'equilibrio',
    prompt:
      'A força tangencial resultante sobre um corpo é $F_t = s(s+1)(s+2)(s-1)(s-2)$. Quantos pontos de equilíbrio instáveis tem este sistema mecânico?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '3',
          correct: true,
          explanation:
            'Os equilíbrios são $s = -2, -1, 0, 1, 2$ e os instáveis são $s = -2, 0, 2$, onde a derivada de $F_t$ é positiva.',
        },
        {
          text: '1',
          correct: false,
          explanation: 'Há mais de um ponto instável.',
        },
        {
          text: '2',
          correct: false,
          explanation: 'Há três pontos instáveis, não dois.',
        },
        {
          text: '4',
          correct: false,
          explanation: 'Só três dos cinco equilíbrios são instáveis.',
        },
        {
          text: '5',
          correct: false,
          explanation: 'Nem todos os equilíbrios são instáveis.',
        },
      ],
    },
    solution: '3 pontos de equilíbrio instáveis: $s = -2$, $s = 0$ e $s = 2$.',
    reasoning:
      'Os equilíbrios são as raízes $s = -2, -1, 0, 1, 2$. Como o polinómio muda de sinal em cada raiz simples, a derivada de $F_t$ é positiva nas raízes de índice par a contar de $-2$: $s = -2$, $s = 0$ e $s = 2$. Nesses pontos a força afasta a partícula, logo são instáveis.',
    explanation: link.equilibrio,
  },
  {
    id: 'f1-mt2-2020-q8',
    title: 'Ciclo limite em coordenadas polares',
    source: 'Teste 2, 2019/20',
    topic: 'equilibrio',
    prompt:
      'As equações de um sistema dinâmico em coordenadas polares $(r, \\theta)$ são $\\dot{\\theta} = -2$ e $\\dot{r} = r^2 - 3r$. Como tal, o sistema tem um ciclo limite. Indique o seu raio e o seu tipo.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Atrativo com $r = 2$',
          correct: false,
          explanation: '$\\dot{r}$ não se anula em $r = 2$.',
        },
        {
          text: 'Repulsivo com $r = 3$',
          correct: true,
          explanation:
            '$\\dot{r} = r(r-3)$ anula-se em $r = 3$; para $r < 3$ é negativa e para $r > 3$ é positiva, logo as trajetórias se afastam do ciclo.',
        },
        {
          text: 'Atrativo com $r = 0$',
          correct: false,
          explanation:
            '$r = 0$ é o ponto de equilíbrio da origem, não um ciclo limite.',
        },
        {
          text: 'Atrativo com $r = 3$',
          correct: false,
          explanation:
            'O ciclo em $r = 3$ é repulsivo, pois $\\dot{r} > 0$ para $r > 3$.',
        },
        {
          text: 'Repulsivo com $r = 2$',
          correct: false,
          explanation: '$\\dot{r}$ não se anula em $r = 2$.',
        },
      ],
    },
    solution: 'Ciclo limite repulsivo com $r = 3$.',
    reasoning:
      'Os ciclos limite são os círculos em que $\\dot{r} = 0$ com $\\dot{\\theta} \\neq 0$: $r(r-3) = 0$ dá $r = 0$ (equilíbrio) e $r = 3$. Para $2 < r < 3$, $\\dot{r} < 0$, e para $r > 3$, $\\dot{r} > 0$, logo as trajetórias afastam-se de $r = 3$: o ciclo é repulsivo.',
    explanation: link.equilibrio,
  },
  {
    id: 'f1-mt2-2020-q13',
    title: 'Quantos ciclos limite tem o sistema polar',
    source: 'Teste 2, 2019/20',
    topic: 'equilibrio',
    prompt:
      'O espaço de fase de um sistema dinâmico é o plano $xy$. Em coordenadas polares, as equações de evolução são $\\dot{\\theta} = -3$ e $\\dot{r} = r^3 - 2r^2 + r$. Quantos ciclos limite tem o sistema?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '2',
          correct: false,
          explanation:
            'Só há um círculo em que $\\dot{r} = 0$ com $\\dot{\\theta} \\neq 0$.',
        },
        {
          text: '0',
          correct: false,
          explanation: 'Existe o ciclo limite $r = 1$.',
        },
        {
          text: '4',
          correct: false,
          explanation: 'Só há um ciclo limite.',
        },
        {
          text: '1',
          correct: true,
          explanation:
            '$\\dot{r} = r(r-1)^2$ anula-se em $r = 1$ (além de $r = 0$, que é equilíbrio).',
        },
        {
          text: '3',
          correct: false,
          explanation: 'Só há um ciclo limite.',
        },
      ],
    },
    solution: '1 ciclo limite, em $r = 1$.',
    reasoning:
      '$\\dot{r} = r(r-1)^2$ anula-se em $r = 0$ e $r = 1$. Como $\\dot{\\theta} = -3 \\neq 0$, o círculo $r = 1$ é um ciclo limite (semi-estável, pois $\\dot{r} \\geq 0$ nas proximidades). $r = 0$ é o ponto de equilíbrio da origem.',
    explanation: link.equilibrio,
  },
];

export const mt2Linearizacao: ExamQuestion[] = [
  {
    id: 'f1-mt2-2016-q2',
    title: 'Linearização de um sistema não linear',
    source: 'Teste 2, 2015/16',
    topic: 'linearizacao',
    prompt:
      'O sistema dinâmico não linear $\\dot{x} = xy - 4x + y - 4$, $\\dot{y} = xy + x - y - 1$ tem um ponto de equilíbrio em $x = 1$, $y = 4$. Qual é o sistema linear que aproxima o sistema não linear na vizinhança desse ponto de equilíbrio?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\dot{x} = 2y$, $\\dot{y} = 5x$',
          correct: true,
          explanation:
            'A jacobiana em $(1,4)$ é $\\begin{pmatrix}0&2\\\\5&0\\end{pmatrix}$.',
        },
        {
          text: '$\\dot{x} = 5y$, $\\dot{y} = -2x$',
          correct: false,
          explanation: 'Troca as entradas da jacobiana e muda o sinal.',
        },
        {
          text: '$\\dot{x} = -5y$, $\\dot{y} = -2x$',
          correct: false,
          explanation: 'Os sinais não correspondem à jacobiana em $(1,4)$.',
        },
        {
          text: '$\\dot{x} = 5y$, $\\dot{y} = 2x$',
          correct: false,
          explanation: 'Só a segunda linha tem o sinal correto.',
        },
        {
          text: '$\\dot{x} = -2y$, $\\dot{y} = 5x$',
          correct: false,
          explanation: 'Só a segunda coluna tem o valor correto.',
        },
      ],
    },
    solution: '$\\dot{x} = 2y$, $\\dot{y} = 5x$.',
    reasoning:
      'Fatorando, $\\dot{x} = (x+1)(y-4)$ e $\\dot{y} = (x-1)(y+1)$. A jacobiana é $J = \\begin{pmatrix}y-4 & x+1\\\\ y+1 & x-1\\end{pmatrix}$, que em $(1,4)$ vale $\\begin{pmatrix}0&2\\\\5&0\\end{pmatrix}$. O sistema linearizado é $\\dot{x} = 2y$, $\\dot{y} = 5x$.',
  },
  {
    id: 'f1-mt2-2020-q15',
    title: 'Linearização em torno de outro ponto de equilíbrio',
    source: 'Teste 2, 2019/20',
    topic: 'linearizacao',
    prompt:
      'O sistema dinâmico não linear $\\dot{x} = xy - 2x + y - 2$, $\\dot{y} = xy + x - 5y - 5$ tem um ponto de equilíbrio em $x = 5$, $y = 2$. Qual é o sistema linear que aproxima o sistema não linear na vizinhança desse ponto de equilíbrio?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\dot{x} = 6y$, $\\dot{y} = 3x$',
          correct: true,
          explanation:
            'A jacobiana em $(5,2)$ é $\\begin{pmatrix}0&6\\\\3&0\\end{pmatrix}$.',
        },
        {
          text: '$\\dot{x} = -3y$, $\\dot{y} = -6x$',
          correct: false,
          explanation: 'Os sinais não correspondem à jacobiana em $(5,2)$.',
        },
        {
          text: '$\\dot{x} = 3y$, $\\dot{y} = 6x$',
          correct: false,
          explanation: 'Troca as entradas da jacobiana.',
        },
        {
          text: '$\\dot{x} = 3y$, $\\dot{y} = -6x$',
          correct: false,
          explanation: 'Só a primeira linha está correta.',
        },
        {
          text: '$\\dot{x} = -6y$, $\\dot{y} = 3x$',
          correct: false,
          explanation: 'Só a segunda linha está correta.',
        },
      ],
    },
    solution: '$\\dot{x} = 6y$, $\\dot{y} = 3x$.',
    reasoning:
      'Fatorando, $\\dot{x} = (x+1)(y-2)$ e $\\dot{y} = (x-5)(y+1)$. A jacobiana é $J = \\begin{pmatrix}y-2 & x+1\\\\ y+1 & x-5\\end{pmatrix}$, que em $(5,2)$ vale $\\begin{pmatrix}0&6\\\\3&0\\end{pmatrix}$. O sistema linearizado é $\\dot{x} = 6y$, $\\dot{y} = 3x$.',
  },
  {
    id: 'f1-mt2-2016-q9',
    title: 'Matriz jacobiana do sistema equivalente',
    source: 'Teste 2, 2015/16',
    topic: 'linearizacao',
    prompt:
      'Qual das seguintes matrizes é a matriz jacobiana do sistema dinâmico equivalente à equação diferencial $\\ddot{x}\\,x - 4x^2\\dot{x} + 2x^2 = 0$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\begin{pmatrix}0&1\\\\0&2\\end{pmatrix}$',
          correct: false,
          explanation: 'Ignora a dependência em $x$ e em $y = \\dot{x}$.',
        },
        {
          text: '$\\begin{pmatrix}0&1\\\\-2&2\\end{pmatrix}$',
          correct: false,
          explanation:
            'Não corresponde às derivadas parciais de $\\dot{y} = 4xy - 2x$.',
        },
        {
          text: '$\\begin{pmatrix}0&1\\\\4y-2&4x\\end{pmatrix}$',
          correct: true,
          explanation:
            'Com $y = \\dot{x}$, $\\dot{x} = y$ e $\\dot{y} = 4xy - 2x$, logo a jacobiana é $\\begin{pmatrix}0&1\\\\4y-2&4x\\end{pmatrix}$.',
        },
        {
          text: '$\\begin{pmatrix}0&1\\\\y-4x&x\\end{pmatrix}$',
          correct: false,
          explanation:
            'Não corresponde às derivadas parciais do sistema equivalente.',
        },
        {
          text: '$\\begin{pmatrix}0&1\\\\1&2\\end{pmatrix}$',
          correct: false,
          explanation: 'Ignora a dependência em $x$ e em $y = \\dot{x}$.',
        },
      ],
    },
    solution: '$J = \\begin{pmatrix}0&1\\\\4y-2&4x\\end{pmatrix}$.',
    reasoning:
      'Fazendo $y = \\dot{x}$, a equação $\\ddot{x}\\,x - 4x^2\\dot{x} + 2x^2 = 0$ equivale ao sistema $\\dot{x} = y$, $\\dot{y} = 4xy - 2x$. As derivadas parciais de $(y,\\, 4xy-2x)$ são $\\partial\\dot{x}/\\partial x = 0$, $\\partial\\dot{x}/\\partial y = 1$, $\\partial\\dot{y}/\\partial x = 4y-2$ e $\\partial\\dot{y}/\\partial y = 4x$.',
  },
  {
    id: 'f1-mt2-2016-q16',
    title: 'Matriz de um sistema linear de duas variáveis',
    source: 'Teste 2, 2015/16',
    topic: 'linearizacao',
    prompt:
      'As equações de evolução de um sistema linear são $\\dot{x} = 3(x-2) - 4(x-y)$ e $\\dot{y} = 2(y-2) + 2(x-y)$. Qual das seguintes matrizes é a matriz do sistema?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\begin{pmatrix}1&2\\\\2&2\\end{pmatrix}$',
          correct: false,
          explanation:
            'Não corresponde aos coeficientes de $x$ e $y$ após simplificar.',
        },
        {
          text: '$\\begin{pmatrix}-1&4\\\\2&0\\end{pmatrix}$',
          correct: true,
          explanation:
            '$\\dot{x} = -x + 4y - 6$ e $\\dot{y} = 2x - 4$, logo a matriz é $\\begin{pmatrix}-1&4\\\\2&0\\end{pmatrix}$.',
        },
        {
          text: '$\\begin{pmatrix}-3&5\\\\-1&4\\end{pmatrix}$',
          correct: false,
          explanation:
            'Não corresponde aos coeficientes de $x$ e $y$ após simplificar.',
        },
        {
          text: '$\\begin{pmatrix}-3&5\\\\-1&3\\end{pmatrix}$',
          correct: false,
          explanation:
            'Não corresponde aos coeficientes de $x$ e $y$ após simplificar.',
        },
        {
          text: '$\\begin{pmatrix}2&0\\\\-2&4\\end{pmatrix}$',
          correct: false,
          explanation: 'Troca linhas e não corresponde aos coeficientes.',
        },
      ],
    },
    solution: '$A = \\begin{pmatrix}-1&4\\\\2&0\\end{pmatrix}$.',
    reasoning:
      'Simplificando, $\\dot{x} = 3x - 6 - 4x + 4y = -x + 4y - 6$ e $\\dot{y} = 2y - 4 + 2x - 2y = 2x - 4$. Os termos independentes não fazem parte da matriz do sistema, que é $\\begin{pmatrix}-1&4\\\\2&0\\end{pmatrix}$.',
  },
];
