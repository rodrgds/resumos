import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  trig: '/cadeiras/am1/primitivas-avancadas/#potências-e-produtos-trigonométricos',
  irracionais: '/cadeiras/am1/primitivas-avancadas/#expressões-irracionais',
  substituicao: '/cadeiras/am1/primitivas/#primitivação-por-substituição',
  areasPolares: '/cadeiras/am1/volumes-polares/#áreas-em-coordenadas-polares',
  discos:
    '/cadeiras/am1/volumes-polares/#secções-transversais-discos-e-arandelas',
  propriedades: '/cadeiras/am1/integral-definido/#propriedades-e-sinal',
  bernoulli:
    '/cadeiras/am1/equacoes-diferenciais/#lineares-de-primeira-ordem-e-bernoulli',
  homogeneas:
    '/cadeiras/am1/equacoes-diferenciais/#equações-homogéneas-de-primeira-ordem',
  edo2: '/cadeiras/am1/equacoes-segunda-ordem/#coeficientes-indeterminados-e-ressonância',
  laplacePvi: '/cadeiras/am1/laplace/#resolver-edos-com-laplace',
  laplaceDegrau: '/cadeiras/am1/laplace/#translações-e-degrau-unitário',
  criterios: '/cadeiras/am1/series-numericas/#critérios-de-convergência',
  geometricas:
    '/cadeiras/am1/series-numericas/#o-teste-do-termo-geral-e-as-séries-geométricas',
  alternadas:
    '/cadeiras/am1/series-numericas/#séries-alternadas-e-convergência-absoluta',
  euler: '/cadeiras/am1/fourier/#coeficientes-as-fórmulas-de-euler',
};

export const mt2PrimitivasAvancadas: ExamQuestion[] = [
  {
    id: 'am1-mt2-2016-q1',
    title: 'Primitiva de produto trigonométrico com ângulo triplo',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'primitivas-avancadas',
    prompt: 'Calcule $\\int\\cos(3x)\\,\\operatorname{sen}^4 x\\,dx$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a identidade $\\cos(3x)=\\cos x\\,(1-4\\operatorname{sen}^2 x)$.',
        'A resposta indica $\\frac{\\operatorname{sen}^5 x}{5}-\\frac{4\\operatorname{sen}^7 x}{7}+C$.',
      ],
    },
    solution:
      '$\\int\\cos(3x)\\operatorname{sen}^4 x\\,dx=\\frac{\\operatorname{sen}^5 x}{5}-\\frac{4\\operatorname{sen}^7 x}{7}+C$.',
    reasoning:
      'Como $\\cos(3x)=4\\cos^3 x-3\\cos x=\\cos x\\,(1-4\\operatorname{sen}^2 x)$, o integral fica $\\int\\operatorname{sen}^4 x\\,(1-4\\operatorname{sen}^2 x)\\cos x\\,dx$. Com $u=\\operatorname{sen} x$, $du=\\cos x\\,dx$, obtém-se $\\int(u^4-4u^6)\\,du=\\frac{u^5}{5}-\\frac{4u^7}{7}+C$.',
    explanation: link.trig,
  },
  {
    id: 'am1-mt2-2016-q2',
    title: 'Primitiva de expressão irracional com raiz quadrada',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'primitivas-avancadas',
    prompt: 'Calcule $\\int\\frac{dx}{\\sqrt{x^2-4}}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a substituição trigonométrica $x=2\\sec\\theta$ (ou hiperbólica).',
        'A resposta indica $\\ln\\left|x+\\sqrt{x^2-4}\\right|+C$.',
      ],
    },
    solution:
      '$\\int\\frac{dx}{\\sqrt{x^2-4}}=\\ln\\left|x+\\sqrt{x^2-4}\\right|+C$.',
    reasoning:
      'Com $x=2\\sec\\theta$, tem-se $\\sqrt{x^2-4}=2\\operatorname{tg}\\theta$ e $dx=2\\sec\\theta\\operatorname{tg}\\theta\\,d\\theta$, logo o integral fica $\\int\\sec\\theta\\,d\\theta=\\ln|\\sec\\theta+\\operatorname{tg}\\theta|+C$, que se reescreve como $\\ln\\left|x+\\sqrt{x^2-4}\\right|+C$.',
    explanation: link.irracionais,
  },
  {
    id: 'am1-mt2-2016-q3',
    title: 'Primitiva por substituição com raiz de quartic',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'primitivas-avancadas',
    prompt: 'Calcule $\\int x^7\\sqrt{1-x^4}\\,dx$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a substituição $u=1-x^4$.',
        'A resposta indica $-\\frac{2+3x^4}{30}(1-x^4)^{3/2}+C$.',
      ],
    },
    solution:
      '$\\int x^7\\sqrt{1-x^4}\\,dx=-\\frac{2+3x^4}{30}(1-x^4)^{3/2}+C$.',
    reasoning:
      'Com $u=1-x^4$, tem-se $du=-4x^3\\,dx$ e $x^4=1-u$, logo $x^7\\,dx=x^4\\cdot x^3\\,dx=-\\frac{1-u}{4}\\,du$. O integral fica $-\\frac14\\int(u^{1/2}-u^{3/2})\\,du=-\\frac16 u^{3/2}+\\frac1{10}u^{5/2}+C$, que se simplifica para $-\\frac{2+3x^4}{30}(1-x^4)^{3/2}+C$.',
    explanation: link.substituicao,
  },
];

export const mt2IntegraisAplicacoes: ExamQuestion[] = [
  {
    id: 'am1-mt2-2016-q4',
    title: 'Área interior à cardioide r = 2 + cos θ',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'integrais-aplicacoes',
    prompt:
      'Considere a curva $C$ de equação polar $r=2+\\cos\\theta$. Identifique a área da região do plano interior à curva $C$ e calcule-a.',
    answer: { kind: 'number', value: 14.137, tolerance: 0.001, unit: 'u.a.' },
    solution:
      'A área interior à curva é $\\frac{9\\pi}{2}\\approx 14{,}137\\ \\mathrm{u.a.}$',
    reasoning:
      'A área em coordenadas polares é $A=\\frac12\\int_0^{2\\pi}(2+\\cos\\theta)^2\\,d\\theta=\\frac12\\int_0^{2\\pi}(4+4\\cos\\theta+\\cos^2\\theta)\\,d\\theta=\\frac12(8\\pi+0+\\pi)=\\frac{9\\pi}{2}$.',
    explanation: link.areasPolares,
  },
  {
    id: 'am1-mt2-2016-q5',
    title: 'Volume do sólido de rotação de uma região triangular',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'integrais-aplicacoes',
    prompt:
      'Esboce o sólido obtido pela rotação da região do plano limitada por $y=x$, $y=0$ e $x=2$ em torno do eixo $y=0$. Calcule o volume do sólido gerado.',
    answer: { kind: 'number', value: 8.378, tolerance: 0.001, unit: 'u.v.' },
    solution:
      'O volume do sólido é $\\frac{8\\pi}{3}\\approx 8{,}378\\ \\mathrm{u.v.}$',
    reasoning:
      'Pelo método dos discos, o raio da secção em $x$ é $y=x$, logo $V=\\pi\\int_0^2 x^2\\,dx=\\pi\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8\\pi}{3}$. O sólido é um cone de raio $2$ e altura $2$, donde $V=\\frac13\\pi r^2 h=\\frac{8\\pi}{3}$.',
    explanation: link.discos,
  },
  {
    id: 'am1-mt2-2016-q6',
    title: 'Identidade de mudança de variável no integral definido',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'integrais-aplicacoes',
    prompt:
      'Usando as propriedades do integral definido, demonstre a igualdade $\\int_a^b f(x)\\,dx=(a-b)\\int_1^0 f\\bigl(a-(a-b)x\\bigr)\\,dx$, justificando os passos e citando as propriedades usadas.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução faz a substituição $u=a-(a-b)x$.',
        'A resposta justifica a troca dos extremos $x=1\\mapsto u=b$ e $x=0\\mapsto u=a$ e o sinal de $dx$.',
        'A resposta conclui que os dois integrais são iguais.',
      ],
    },
    solution:
      'Com $u=a-(a-b)x$, tem-se $du=-(a-b)\\,dx$. Quando $x=1$, $u=b$; quando $x=0$, $u=a$. Logo $(a-b)\\int_1^0 f(a-(a-b)x)\\,dx=\\int_b^a f(u)\\,(-du)=\\int_a^b f(u)\\,du$.',
    reasoning:
      'A propriedade da mudança de variável dá $dx=-\\frac{du}{a-b}$; os extremos invertem-se e o sinal negativo compensa a inversão, pelo que o integral transforma-se no integral de $f$ de $a$ a $b$.',
    explanation: link.propriedades,
  },
];

export const mt2EquacoesPrimeiraOrdem: ExamQuestion[] = [
  {
    id: 'am1-mt2-2016-q7',
    title: 'Equação de Bernoulli com termo em x² ln x',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'equacoes-primeira-ordem',
    prompt:
      'Calcule a solução geral da equação diferencial $x\\frac{dy}{dx}+y\\bigl[1-yx^2\\ln x\\bigr]=0$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica a equação como de Bernoulli e usa a substituição $z=1/y$.',
        'A resposta indica $y=\\frac{1}{Cx+x^2(1-\\ln x)}$.',
      ],
    },
    solution: '$y=\\frac{1}{Cx+x^2(1-\\ln x)}$.',
    reasoning:
      "A equação escreve-se $y'+\\frac{y}{x}=y^2x\\ln x$. Dividindo por $y^2$ e pondo $z=1/y$, vem $z'-\\frac{z}{x}=-x\\ln x$. O fator integrante é $\\frac1x$, logo $\\left(\\frac{z}{x}\\right)'=-\\ln x$, donde $\\frac{z}{x}=-x\\ln x+x+C$ e $z=Cx+x^2(1-\\ln x)$.",
    explanation: link.bernoulli,
  },
  {
    id: 'am1-mt2-2016-q8',
    title: 'Equação homogénea (y − x)/(x + y)',
    source: '2º Mini-Teste modelo, 2016/17',
    topic: 'equacoes-primeira-ordem',
    prompt:
      'Calcule a solução geral da equação diferencial $\\frac{dy}{dx}=\\frac{y-x}{x+y}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a substituição $y=vx$.',
        'A resposta indica a solução na forma implícita $\\operatorname{arctg}\\frac{y}{x}+\\frac12\\ln(x^2+y^2)=C$.',
      ],
    },
    solution: '$\\operatorname{arctg}\\frac{y}{x}+\\frac12\\ln(x^2+y^2)=C$.',
    reasoning:
      "Com $y=vx$, $v+xv'=\\frac{v-1}{1+v}$, logo $\\frac{1+v}{1+v^2}\\,dv=-\\frac{dx}{x}$. Integrando, $\\operatorname{arctg} v+\\frac12\\ln(1+v^2)=-\\ln|x|+C$, que em $x$ e $y$ dá $\\operatorname{arctg}\\frac{y}{x}+\\frac12\\ln(x^2+y^2)=C$.",
    explanation: link.homogeneas,
  },
  {
    id: 'am1-mt2-2014-q1',
    title: 'Equação homogénea x²y′ − y² + 2xy = 0',
    source: '3º Mini-Teste, 2014/15',
    topic: 'equacoes-primeira-ordem',
    prompt:
      "Calcule a solução geral da equação diferencial $x^2y'-y^2+2xy=0$, sem recorrer a transformadas de Laplace.",
    answer: {
      kind: 'self',
      checklist: [
        'A resolução usa a substituição $y=vx$ e separa as variáveis em $v$.',
        'A resposta indica $y=\\frac{3x}{1-Cx^3}$.',
      ],
    },
    solution: '$y=\\frac{3x}{1-Cx^3}$.',
    reasoning:
      "A equação escreve-se $y'=\\left(\\frac{y}{x}\\right)^2-2\\frac{y}{x}$. Com $v=y/x$, $xv'=v^2-3v=v(v-3)$. Separando, $\\frac{dv}{v(v-3)}=\\frac{dx}{x}$; por frações parciais, $\\frac13\\ln\\left|\\frac{v-3}{v}\\right|=\\ln|x|+C$, donde $v=\\frac{3}{1-Cx^3}$.",
    explanation: link.homogeneas,
  },
];

export const mt2EquacoesLaplace: ExamQuestion[] = [
  {
    id: 'am1-mt2-2014-q2',
    title: 'Equação de segunda ordem com termo e^x sen x cos x',
    source: '3º Mini-Teste, 2014/15',
    topic: 'equacoes-laplace',
    prompt:
      "Calcule a solução geral da equação diferencial $y''-2y'+2y=e^x\\operatorname{sen}x\\cos x$, sem recorrer a transformadas de Laplace.",
    answer: {
      kind: 'self',
      checklist: [
        'A solução homogénea é $e^x(C_1\\cos x+C_2\\operatorname{sen}x)$.',
        'A solução particular é $-\\frac16 e^x\\operatorname{sen}(2x)$ e a geral é $y=e^x(C_1\\cos x+C_2\\operatorname{sen}x)-\\frac16 e^x\\operatorname{sen}(2x)$.',
      ],
    },
    solution:
      '$y=e^x(C_1\\cos x+C_2\\operatorname{sen}x)-\\frac16 e^x\\operatorname{sen}(2x)$.',
    reasoning:
      "A característica é $r^2-2r+2=0$, com raízes $1\\pm i$. Com $y=e^xu$, a equação reduz-se a $u''+u=\\operatorname{sen}x\\cos x=\\frac12\\operatorname{sen}(2x)$. Tentando $u=A\\operatorname{sen}(2x)$, $-4A+A=\\frac12$, logo $A=-\\frac16$.",
    explanation: link.edo2,
  },
  {
    id: 'am1-mt2-2014-q3',
    title: 'Problema de valores iniciais com Laplace e termo e^x',
    source: '3º Mini-Teste, 2014/15',
    topic: 'equacoes-laplace',
    prompt:
      "Usando as transformadas de Laplace, resolva o problema de valores iniciais $y''+4y=4e^x$, com $y(0)=1$ e $y'(0)=5$.",
    answer: {
      kind: 'self',
      checklist: [
        'A resposta aplica a transformada e usa as condições iniciais: $s^2Y-s+4Y=\\frac{4}{s-1}$.',
        'A resposta indica $y=\\frac15\\cos(2x)+\\frac{21}{10}\\operatorname{sen}(2x)+\\frac45 e^x$.',
      ],
    },
    solution:
      '$y=\\frac15\\cos(2x)+\\frac{21}{10}\\operatorname{sen}(2x)+\\frac45 e^x$.',
    reasoning:
      "A homogénea é $C_1\\cos(2x)+C_2\\operatorname{sen}(2x)$ e a particular é $\\frac45 e^x$, pois $A+4A=4$. Impondo $y(0)=1$ dá $C_1=\\frac15$ e $y'(0)=5$ dá $2C_2+\\frac45=5$, logo $C_2=\\frac{21}{10}$.",
    explanation: link.laplacePvi,
  },
  {
    id: 'am1-mt2-2014-q4',
    title: 'Transformada de Laplace de função por partes com degraus',
    source: '3º Mini-Teste, 2014/15',
    topic: 'equacoes-laplace',
    prompt:
      'Considere a função $f(t)=t\\,[1-u(t-4)]+(t-6)^2\\,[u(t-4)-u(t-6)]$, para $t\\ge0$, onde $u(t)$ é a função degrau unitário. Esboce a função e calcule a sua transformada de Laplace.',
    answer: {
      kind: 'self',
      checklist: [
        'O esboço mostra $f(t)=t$ em $[0,4[$, $f(t)=(t-6)^2$ em $[4,6[$ e $f(t)=0$ para $t\\ge6$.',
        'A resposta reescreve $f$ com translações: $f(t)=t+[(t-4)^2-5(t-4)]u(t-4)-(t-6)^2u(t-6)$.',
        'A resposta indica $\\mathcal{L}\\{f\\}=\\frac{1}{s^2}+\\left(\\frac{2}{s^3}-\\frac{5}{s^2}\\right)e^{-4s}-\\frac{2}{s^3}e^{-6s}$.',
      ],
    },
    solution:
      '$\\mathcal{L}\\{f\\}=\\frac{1}{s^2}+\\left(\\frac{2}{s^3}-\\frac{5}{s^2}\\right)e^{-4s}-\\frac{2}{s^3}e^{-6s}$.',
    reasoning:
      'Escrevendo $t\\,u(t-4)=[(t-4)+4]u(t-4)$ e $(t-6)^2=[(t-4)^2-4(t-4)+4]$, a função decompõe-se em $f(t)=t+(t-4)^2u(t-4)-5(t-4)u(t-4)-(t-6)^2u(t-6)$. Pelo segundo teorema do deslocamento, $\\mathcal{L}\\{g(t-a)u(t-a)\\}=e^{-as}G(s)$, donde resultam os termos com $e^{-4s}$ e $e^{-6s}$.',
    explanation: link.laplaceDegrau,
  },
];

export const mt2SeriesFourier: ExamQuestion[] = [
  {
    id: 'am1-mt2-2015-q1',
    title: 'Convergência absoluta de série com cos(nx)',
    source: '4º Mini-Teste, 2014/15',
    topic: 'series-fourier',
    prompt:
      'Classifique a série $\\sum_{n=1}^{\\infty}\\frac{(-1)^n\\cos(nx)}{n^2+1}$, justificando convenientemente.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta aplica o critério de comparação em valor absoluto: $\\left|\\frac{(-1)^n\\cos(nx)}{n^2+1}\\right|\\le\\frac{1}{n^2+1}\\le\\frac{1}{n^2}$.',
        'A resposta conclui que a série é absolutamente convergente (logo convergente) para todo o $x$.',
      ],
    },
    solution:
      'A série é absolutamente convergente para todo o $x$, pois $\\sum\\frac{1}{n^2}$ converge.',
    reasoning:
      'Como $|\\cos(nx)|\\le1$, o termo geral em módulo é majorado por $\\frac{1}{n^2+1}\\le\\frac{1}{n^2}$. A série $\\sum\\frac{1}{n^2}$ é uma série de potências $p=2>1$, convergente, logo a série dada converge absolutamente pelo critério de comparação.',
    explanation: link.criterios,
  },
  {
    id: 'am1-mt2-2017-q1',
    title: 'Série geométrica com razão 3/e²',
    source: '3º Mini-Teste modelo, 2016/17',
    topic: 'series-fourier',
    prompt:
      'Investigue a convergência da série $\\sum_{n=1}^{\\infty}\\frac{3^n}{e^{2n}}$, justificando. Se for convergente, calcule a sua soma.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica a série como geométrica de razão $r=\\frac{3}{e^2}<1$.',
        'A resposta conclui que a série converge e indica a soma $\\frac{3}{e^2-3}$.',
      ],
    },
    solution:
      'A série é geométrica de razão $\\frac{3}{e^2}\\approx0{,}406<1$, logo converge, e a soma é $\\frac{3}{e^2-3}\\approx0{,}684$.',
    reasoning:
      '$\\frac{3^n}{e^{2n}}=\\left(\\frac{3}{e^2}\\right)^n$. Como $e^2\\approx7{,}389>3$, a razão satisfaz $0<r<1$, pelo que a série geométrica converge com soma $\\frac{r}{1-r}=\\frac{3/e^2}{1-3/e^2}=\\frac{3}{e^2-3}$.',
    explanation: link.geometricas,
  },
  {
    id: 'am1-mt2-2017-q2',
    title: 'Série alternada com termo geral n/(n³ + 1)',
    source: '3º Mini-Teste modelo, 2016/17',
    topic: 'series-fourier',
    prompt:
      'Investigue a convergência da série $\\sum_{n=1}^{\\infty}\\frac{(-1)^n n}{n^3+1}$, justificando convenientemente.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta compara em valor absoluto: $\\frac{n}{n^3+1}\\le\\frac{1}{n^2}$.',
        'A resposta conclui que a série é absolutamente convergente (e portanto convergente).',
      ],
    },
    solution:
      'A série é absolutamente convergente, pois $\\sum\\frac{n}{n^3+1}$ converge por comparação com $\\sum\\frac{1}{n^2}$.',
    reasoning:
      'Tem-se $\\left|\\frac{(-1)^n n}{n^3+1}\\right|=\\frac{n}{n^3+1}\\le\\frac{n}{n^3}=\\frac{1}{n^2}$. Como $\\sum\\frac{1}{n^2}$ converge, a série dos módulos converge pelo critério de comparação, logo a série alternada é absolutamente convergente.',
    explanation: link.alternadas,
  },
  {
    id: 'am1-mt2-2015-q2',
    title: 'Coeficientes de Fourier de função por partes de período 3π',
    source: '4º Mini-Teste, 2014/15',
    topic: 'series-fourier',
    prompt:
      'Considere a função $f(x)$ de período $3\\pi$ definida por $f(x)=2\\pi$ se $-\\pi<x<0$, $f(x)=\\pi$ se $0<x<\\pi$ e $f(x)=0$ se $\\pi<x<2\\pi$. Calcule os coeficientes $a_0$, $a_n$ e $b_n$ da sua série de Fourier e escreva a forma geral da série.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $a_0=2\\pi$.',
        'A resposta indica $a_n=\\frac{3}{n}\\operatorname{sen}\\frac{2n\\pi}{3}$.',
        'A resposta indica $b_n=-\\frac{3}{2n}$ para $n$ não múltiplo de 3 e $b_n=0$ para $n$ múltiplo de 3.',
      ],
    },
    solution:
      '$f(x)\\sim\\pi+\\sum_{n=1}^{\\infty}\\left[\\frac{3}{n}\\operatorname{sen}\\frac{2n\\pi}{3}\\cos\\frac{2nx}{3}+b_n\\operatorname{sen}\\frac{2nx}{3}\\right]$, com $b_n=-\\frac{3}{2n}$ se $3\\nmid n$ e $b_n=0$ se $3\\mid n$.',
    reasoning:
      'Com período $T=3\\pi$, usa-se $\\omega=\\frac{2\\pi}{T}=\\frac23$. Num período, $\\int f=2\\pi\\cdot\\pi+\\pi\\cdot\\pi=3\\pi^2$, logo $a_0=\\frac{2}{3\\pi}\\cdot3\\pi^2=2\\pi$. Para $a_n$, os integrais sobre $[-\\pi,0]$ e $[0,\\pi]$ dão $\\operatorname{sen}\\frac{2n\\pi}{3}$ em ambos, donde $a_n=\\frac{2}{3\\pi}\\cdot\\frac{3}{2n/3}\\cdot3\\pi\\operatorname{sen}\\frac{2n\\pi}{3}=\\frac{3}{n}\\operatorname{sen}\\frac{2n\\pi}{3}$. Para $b_n$, a combinação dá $b_n=\\frac{2}{3\\pi}\\cdot\\frac{\\pi}{2n/3}\\left(\\cos\\frac{2n\\pi}{3}-1\\right)$, que vale $-\\frac{3}{2n}$ quando $\\cos\\frac{2n\\pi}{3}=-\\frac12$ e $0$ quando $n$ é múltiplo de 3.',
    explanation: link.euler,
  },
];
