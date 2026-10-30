import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  lhospital:
    '/cadeiras/am1/teoremas-valor-medio/#teorema-de-cauchy-e-regra-de-lhôpital',
  taxas: '/cadeiras/am1/teoremas-valor-medio/#taxas-relacionadas',
  inversa:
    '/cadeiras/am1/derivadas/#derivadas-das-funções-trigonométricas-e-inversas',
  substituicao: '/cadeiras/am1/primitivas/#primitivação-por-substituição',
  fracoes: '/cadeiras/am1/primitivas-avancadas/#frações-racionais',
  trig: '/cadeiras/am1/primitivas-avancadas/#potências-e-produtos-trigonométricos',
  irracionais: '/cadeiras/am1/primitivas-avancadas/#expressões-irracionais',
  areas: '/cadeiras/am1/integral-definido/#áreas-entre-curvas',
  geometricas:
    '/cadeiras/am1/series-numericas/#o-teste-do-termo-geral-e-as-séries-geométricas',
  telescopicas:
    '/cadeiras/am1/series-numericas/#séries-telescópicas-somar-por-cancelamento',
  comparacao: '/cadeiras/am1/series-numericas/#comparação-e-séries-p',
  taylor: '/cadeiras/am1/taylor/#polinómio-de-taylor',
  serieTaylor: '/cadeiras/am1/taylor/#da-fórmula-à-série-de-taylor',
  edo2: '/cadeiras/am1/equacoes-segunda-ordem/#coeficientes-indeterminados-e-ressonância',
  laplaceInversa: '/cadeiras/am1/laplace/#transformada-inversa',
  laplaceDegrau: '/cadeiras/am1/laplace/#translações-e-degrau-unitário',
};

export const mt1LimitesDerivadas: ExamQuestion[] = [
  {
    id: 'am1-mt1-2016-q1',
    title: 'Limite com logaritmo no numerador',
    source: 'Teste modelo 1, 2016/17',
    topic: 'limites-derivadas',
    prompt:
      'Calcule, se existir, $\\lim_{x\\to+\\infty}\\frac{\\ln(x^3-5)}{x^2}$.',
    answer: { kind: 'number', value: 0, tolerance: 0 },
    solution: '$\\lim_{x\\to+\\infty}\\frac{\\ln(x^3-5)}{x^2}=0$.',
    reasoning:
      "É uma indeterminação $\\infty/\\infty$. Pela regra de L'Hôpital, deriva-se numerador e denominador: $\\frac{3x^2/(x^3-5)}{2x}=\\frac{3}{2x(x^3-5)/x^2}\\to 0$, pois o numerador tende para 0 e o denominador para $+\\infty$.",
    explanation: link.lhospital,
  },
  {
    id: 'am1-mt1-2016-q2',
    title: 'Limite de potência com expoente variável',
    source: 'Teste modelo 1, 2016/17',
    topic: 'limites-derivadas',
    prompt:
      'Calcule, se existir, $\\lim_{x\\to0^+}(\\operatorname{sen} x)^{\\operatorname{tg} x}$.',
    answer: { kind: 'number', value: 1, tolerance: 0 },
    solution:
      '$\\lim_{x\\to0^+}(\\operatorname{sen} x)^{\\operatorname{tg} x}=1$.',
    reasoning:
      'Escreve-se $(\\operatorname{sen} x)^{\\operatorname{tg} x}=e^{\\operatorname{tg} x\\ln(\\operatorname{sen} x)}$. Quando $x\\to0^+$, $\\operatorname{tg} x\\sim x$ e $\\ln(\\operatorname{sen} x)\\sim\\ln x$, logo o expoente tende para $\\lim_{x\\to0^+}x\\ln x=0$. Assim o limite é $e^0=1$.',
    explanation: link.lhospital,
  },
  {
    id: 'am1-mt1-2016-q3',
    title: 'Derivada da função arco seno pelo conceito de inversa',
    source: 'Teste modelo 1, 2016/17',
    topic: 'limites-derivadas',
    prompt:
      'Usando o conceito de derivada da inversa de uma função, calcule $\\frac{dy}{dx}$ para $y=\\operatorname{arcsen}(x)$.',
    answer: {
      kind: 'self',
      checklist: [
        "A resposta escreve a derivada da inversa como $1/f'(y)$.",
        'A resposta indica $\\frac{dy}{dx}=\\frac{1}{\\sqrt{1-x^2}}$.',
      ],
    },
    solution: '$\\frac{dy}{dx}=\\frac{1}{\\sqrt{1-x^2}}$, para $|x|<1$.',
    reasoning:
      'Se $y=\\operatorname{arcsen}(x)$, então $x=\\operatorname{sen} y$ e $\\frac{dx}{dy}=\\cos y$. Logo $\\frac{dy}{dx}=\\frac{1}{\\cos y}=\\frac{1}{\\sqrt{1-\\operatorname{sen}^2 y}}=\\frac{1}{\\sqrt{1-x^2}}$, com $\\cos y>0$ para $y\\in(-\\pi/2,\\pi/2)$.',
    explanation: link.inversa,
  },
];

export const mt1Primitivas: ExamQuestion[] = [
  {
    id: 'am1-mt1-2016-q4',
    title: 'Primitiva por substituição com logaritmo',
    source: 'Teste modelo 1, 2016/17',
    topic: 'primitivas',
    prompt: 'Calcule $\\int\\frac{dx}{x\\ln x}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a substituição $u=\\ln x$.',
        'A resposta indica $\\ln|\\ln x|+C$.',
      ],
    },
    solution: '$\\int\\frac{dx}{x\\ln x}=\\ln|\\ln x|+C$.',
    reasoning:
      'Com $u=\\ln x$, tem-se $du=\\frac{dx}{x}$, logo o integral fica $\\int\\frac{du}{u}=\\ln|u|+C=\\ln|\\ln x|+C$.',
    explanation: link.substituicao,
  },
  {
    id: 'am1-mt1-2016-q5',
    title: 'Primitiva de expressão irracional',
    source: 'Teste modelo 1, 2016/17',
    topic: 'primitivas',
    prompt: 'Calcule $\\int\\frac{\\sqrt{x^2-4}}{x}\\,dx$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a sustitución trigonométrica $x=2\\sec\\theta$.',
        'A resposta indica $\\sqrt{x^2-4}-2\\operatorname{arcsec}(x/2)+C$.',
      ],
    },
    solution:
      '$\\int\\frac{\\sqrt{x^2-4}}{x}\\,dx=\\sqrt{x^2-4}-2\\operatorname{arcsec}\\frac{x}{2}+C$.',
    reasoning:
      'Com $x=2\\sec\\theta$, $dx=2\\sec\\theta\\operatorname{tg}\\theta\\,d\\theta$ e $\\sqrt{x^2-4}=2\\operatorname{tg}\\theta$. O integral transforma-se em $\\int2\\operatorname{tg}^2\\theta\\,d\\theta=\\int2(\\sec^2\\theta-1)\\,d\\theta=2\\operatorname{tg}\\theta-2\\theta+C$, que se reescreve na variável $x$.',
    explanation: link.irracionais,
  },
  {
    id: 'am1-mt1-2016-q6',
    title: 'Primitiva de produto de potências trigonométricas',
    source: 'Teste modelo 2, 2016/17',
    topic: 'primitivas',
    prompt: 'Calcule $\\int\\cos^3 x\\,\\operatorname{sen}^4 x\\,dx$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução separa um fator $\\cos x$ e usa $u=\\operatorname{sen} x$.',
        'A resposta indica $\\frac{\\operatorname{sen}^5 x}{5}-\\frac{\\operatorname{sen}^7 x}{7}+C$.',
      ],
    },
    solution:
      '$\\int\\cos^3 x\\,\\operatorname{sen}^4 x\\,dx=\\frac{\\operatorname{sen}^5 x}{5}-\\frac{\\operatorname{sen}^7 x}{7}+C$.',
    reasoning:
      '$\\cos^3 x=\\cos x(1-\\operatorname{sen}^2 x)$. Com $u=\\operatorname{sen} x$, $du=\\cos x\\,dx$, o integral fica $\\int(u^4-u^6)\\,du=\\frac{u^5}{5}-\\frac{u^7}{7}+C$.',
    explanation: link.trig,
  },
  {
    id: 'am1-mt1-2016-q7',
    title: 'Primitiva por frações racionais',
    source: 'Teste modelo 2, 2016/17',
    topic: 'primitivas',
    prompt: 'Calcule $\\int\\frac{2x^2+4}{x(x^2+4)}\\,dx$.',
    answer: {
      kind: 'self',
      checklist: [
        'A decomposição é $\\frac{1}{x}+\\frac{x}{x^2+4}$.',
        'A resposta indica $\\ln|x|+\\frac{1}{2}\\ln(x^2+4)+C$.',
      ],
    },
    solution:
      '$\\int\\frac{2x^2+4}{x(x^2+4)}\\,dx=\\ln|x|+\\frac{1}{2}\\ln(x^2+4)+C$.',
    reasoning:
      'Escreve-se $\\frac{2x^2+4}{x(x^2+4)}=\\frac{A}{x}+\\frac{Bx+C}{x^2+4}$. Igualando, $2x^2+4=(A+B)x^2+Cx+4A$, logo $A=1$, $C=0$ e $B=1$. O integral fica $\\int\\frac{dx}{x}+\\int\\frac{x}{x^2+4}\\,dx=\\ln|x|+\\frac{1}{2}\\ln(x^2+4)+C$.',
    explanation: link.fracoes,
  },
];

export const mt1Integrais: ExamQuestion[] = [
  {
    id: 'am1-mt1-2016-q8',
    title: 'Integral definido com secante ao quadrado',
    source: 'Teste modelo 1, 2016/17',
    topic: 'integrais',
    prompt: 'Qual o valor do integral $\\int_0^{\\pi/4}[1+\\sec^2(x)]\\,dx$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$1$',
          correct: false,
          explanation: 'Esquece o termo $\\tan x$.',
        },
        {
          text: '$2-\\pi/4$',
          correct: false,
          explanation: 'Sinal trocado no resultado de $\\tan x$.',
        },
        {
          text: '$1+\\pi/4$',
          correct: true,
          explanation: '$[x+\\tan x]_0^{\\pi/4}=\\pi/4+1-0=1+\\pi/4$.',
        },
        {
          text: '$2$',
          correct: false,
          explanation: 'O limite superior foi mal substituído.',
        },
      ],
    },
    solution: '$\\int_0^{\\pi/4}[1+\\sec^2(x)]\\,dx=1+\\frac{\\pi}{4}$.',
    reasoning:
      'A primitiva de $1+\\sec^2 x$ é $x+\\operatorname{tg} x$. Nos extremos, $\\frac{\\pi}{4}+\\operatorname{tg}\\frac{\\pi}{4}-(0+\\operatorname{tg}0)=\\frac{\\pi}{4}+1$.',
  },
  {
    id: 'am1-mt1-2016-q9',
    title: 'Área de região limitada por um cúbico',
    source: 'Teste modelo 1, 2016/17',
    topic: 'integrais',
    prompt:
      'Esboce a região $Q$ do plano limitada horizontalmente pelos gráficos de $y=0$ e $y=(x+1)^3$ e verticalmente pelas retas $x=0$ e $x=1$. Determine a área da região $Q$.',
    answer: { kind: 'number', value: 3.75, tolerance: 0, unit: 'u.a.' },
    solution: 'A área é $\\frac{15}{4}$.',
    reasoning:
      'Na tira $0\\le x\\le1$ tem-se $(x+1)^3\\ge0$, logo a área é $\\int_0^1(x+1)^3\\,dx=\\left[\\frac{(x+1)^4}{4}\\right]_0^1=\\frac{16-1}{4}=\\frac{15}{4}$.',
    explanation: link.areas,
  },
  {
    id: 'am1-mt1-2016-q10',
    title: 'Taxa de rotação de um holofote',
    source: 'Teste 1, 2016/17',
    topic: 'integrais',
    prompt:
      'Um homem anda ao longo de um caminho retilíneo a uma velocidade de $1{,}2\\,\\mathrm{m/s}$. Um holofote no chão, a $6\\,\\mathrm{m}$ do caminho, focaliza o homem. A que taxa de variação instantânea gira o holofote quando o homem está a $4{,}5\\,\\mathrm{m}$ do ponto do caminho mais próximo da luz? (Se $x$ designa essa distância e $\\theta$ o ângulo do holofote, determine $\\frac{d\\theta}{dt}$.)',
    answer: { kind: 'number', value: 0.128, tolerance: 0.001, unit: 'rad/s' },
    solution: '$\\frac{d\\theta}{dt}=0{,}128\\ \\mathrm{rad/s}$.',
    reasoning:
      'Do triângulo retângulo, $\\operatorname{tg}\\theta=\\frac{x}{6}$. Derivando em ordem ao tempo, $\\sec^2\\theta\\frac{d\\theta}{dt}=\\frac{1}{6}\\frac{dx}{dt}$. Para $x=4{,}5$, $\\sec^2\\theta=1+\\frac{4{,}5^2}{36}=\\frac{25}{16}$ e $\\frac{dx}{dt}=1{,}2$, logo $\\frac{d\\theta}{dt}=\\frac{1{,}2}{6}\\cdot\\frac{16}{25}=0{,}128\\ \\mathrm{rad/s}$.',
    explanation: link.taxas,
  },
];

export const mt1Series: ExamQuestion[] = [
  {
    id: 'am1-mt1-2015-q1',
    title: 'Classificação da série dos fatoriais',
    source: 'Teste 4, 2014/15',
    topic: 'series',
    prompt: 'Classifique a série $\\sum_{n=1}^{\\infty}\\frac{n!}{4^n}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta aplica o critério da razão.',
        'A resposta conclui que a série diverge porque o termo geral não tende para zero.',
      ],
    },
    solution: 'A série diverge.',
    reasoning:
      'Pelo critério da razão, $\\frac{a_{n+1}}{a_n}=\\frac{n+1}{4}\\to+\\infty>1$. Em particular, $a_n\\to+\\infty\\neq0$, logo a série diverge pelo teste do termo geral.',
    explanation: link.geometricas,
  },
  {
    id: 'am1-mt1-2015-q2',
    title: 'Soma de uma série telescópica com logaritmos',
    source: 'Teste 4, 2014/15',
    topic: 'series',
    prompt:
      'Calcule a soma da série $\\sum_{n=1}^{\\infty}\\ln\\frac{(n+1)(n+3)}{(n+2)^2}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta decompõe o logaritmo e escreve a soma parcial.',
        'A resposta indica a soma $\\ln\\frac{2}{3}$.',
      ],
    },
    solution: 'A soma da série é $\\ln\\frac{2}{3}$.',
    reasoning:
      'O termo geral é $\\ln(n+1)-2\\ln(n+2)+\\ln(n+3)$. A soma parcial até $N$ cancela quase tudo: $S_N=\\ln2-\\ln3+\\ln\\frac{N+3}{N+2}$. Quando $N\\to\\infty$, $\\ln\\frac{N+3}{N+2}\\to0$, logo a soma é $\\ln2-\\ln3=\\ln\\frac{2}{3}$.',
    explanation: link.telescopicas,
  },
];

export const mt1Taylor: ExamQuestion[] = [
  {
    id: 'am1-mt1-2015-q3',
    title: 'Série de Taylor de (x-1)e^x em torno de x=1',
    source: 'Teste 4, 2014/15',
    topic: 'taylor',
    prompt:
      'Seja $f(x)=(x-1)e^x$ e $x_0=1$. Calcule a expressão geral da série de Taylor de $f(x)$ em torno de $x_0$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa a mudança $u=x-1$ e a série de $e^u$.',
        'A resposta indica $\\sum_{n=1}^{\\infty}\\frac{e\\,(x-1)^n}{(n-1)!}$.',
      ],
    },
    solution:
      '$f(x)=\\sum_{n=1}^{\\infty}\\frac{e\\,(x-1)^n}{(n-1)!}=e\\,(x-1)\\,e^{x-1}$.',
    reasoning:
      'Com $u=x-1$, $f(x)=u\\,e^{u+1}=e\\,u\\,e^u=e\\sum_{k=0}^{\\infty}\\frac{u^{k+1}}{k!}$. Fazendo $n=k+1$, obtém-se $\\sum_{n=1}^{\\infty}\\frac{e\\,(x-1)^n}{(n-1)!}$.',
    explanation: link.serieTaylor,
  },
  {
    id: 'am1-mt1-2017-q1',
    title: 'Polinómio de Taylor de √x no centro 4',
    source: 'Teste modelo 3, 2016/17',
    topic: 'taylor',
    prompt:
      'Escreva o polinómio de Taylor de grau $n$ que aproxima $f(x)=\\sqrt{x}$ na vizinhança do ponto $a=4$, incluindo os quatro primeiros termos.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta os quatro primeiros termos $2+\\frac{x-4}{4}-\\frac{(x-4)^2}{64}+\\frac{(x-4)^3}{512}$.',
        'A resposta indica o termo geral $\\binom{1/2}{k}4^{1/2-k}(x-4)^k$.',
      ],
    },
    solution:
      '$P_n(x)=\\sum_{k=0}^{n}\\binom{1/2}{k}4^{1/2-k}(x-4)^k=2+\\frac{x-4}{4}-\\frac{(x-4)^2}{64}+\\frac{(x-4)^3}{512}-\\cdots$',
    reasoning:
      'As derivadas em $a=4$ são $f^{(k)}(4)=\\binom{1/2}{k}k!\\,4^{1/2-k}$, pelo que os coeficientes são $\\binom{1/2}{k}4^{1/2-k}$. Os primeiros quatro termos resultam de $k=0,1,2,3$.',
    explanation: link.taylor,
  },
];

export const mt1EquacoesLaplace: ExamQuestion[] = [
  {
    id: 'am1-mt1-2016-q11',
    title: 'Equação linear de segunda ordem com termo e^x',
    source: 'Teste modelo 2, 2016/17',
    topic: 'equacoes-laplace',
    prompt: "Calcule a solução geral da equação diferencial $y''-2y'+2y=e^x$.",
    answer: {
      kind: 'self',
      checklist: [
        'A solução homogénea é $e^x(C_1\\cos x+C_2\\operatorname{sen} x)$.',
        'A solução particular é $e^x$ e a geral é $y=e^x(C_1\\cos x+C_2\\operatorname{sen} x+1)$.',
      ],
    },
    solution: '$y=e^x(C_1\\cos x+C_2\\operatorname{sen} x)+e^x$.',
    reasoning:
      'A característica é $r^2-2r+2=0$, com raízes $r=1\\pm i$, logo $y_h=e^x(C_1\\cos x+C_2\\operatorname{sen} x)$. Para a particular, tenta-se $y_p=Ae^x$: substituindo, $A-2A+2A=A=1$, logo $y_p=e^x$.',
    explanation: link.edo2,
  },
  {
    id: 'am1-mt1-2014-q1',
    title: 'Transformada de Laplace inversa com translação',
    source: 'Teste 3, 2014/15',
    topic: 'equacoes-laplace',
    prompt:
      'Calcule a transformada de Laplace inversa de $\\frac{e^{-\\pi s}}{s^2+4s+8}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta completa o quadrado: $s^2+4s+8=(s+2)^2+4$.',
        'A resposta indica $\\frac{1}{2}e^{-2(t-\\pi)}\\operatorname{sen}(2(t-\\pi))\\,u(t-\\pi)$.',
      ],
    },
    solution:
      '$\\mathcal{L}^{-1}\\left\\{\\frac{e^{-\\pi s}}{s^2+4s+8}\\right\}=\\frac{1}{2}e^{-2(t-\\pi)}\\operatorname{sen}(2(t-\\pi))\\,u(t-\\pi)$.',
    reasoning:
      'Tem-se $\\mathcal{L}^{-1}\\left\\{\\frac{1}{(s+2)^2+4}\\right\}=\\frac{1}{2}e^{-2t}\\operatorname{sen}(2t)$. O fator $e^{-\\pi s}$ desloca a função em $\\pi$ unidades, pelo segundo teorema do deslocamento, dando o resultado com o degrau $u(t-\\pi)$.',
    explanation: link.laplaceDegrau,
  },
];
