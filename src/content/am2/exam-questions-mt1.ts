import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  curvas: '/cadeiras/am2/curvas-parametricas/',
  derivadas: '/cadeiras/am2/derivadas-gradiente/',
  cadeia: '/cadeiras/am2/regra-cadeia-implicitas/',
  extremos: '/cadeiras/am2/taylor-extremos/',
  integrais: '/cadeiras/am2/integrais-duplos/',
};

export const mt1Curvas: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q1',
    title: 'Triedro e plano osculador de uma hélice',
    source: 'Teste 1, 2016/17',
    topic: 'curvas',
    prompt:
      'Considere o ponto $Q=(3,3,-1)$ e a curva parametrizada por $r(t)=(3+3t\\cos t,\\,3+3t\\operatorname{sen}t,\\,4t-1)$, $t\\in\\mathbb{R}$. Determine no ponto $Q$: a) os versores da tangente e da binormal; b) a equação cartesiana do plano osculador; c) as componentes tangencial e normal do vetor aceleração.',
    answer: {
      kind: 'self',
      checklist: [
        'O versor da tangente em $Q$ é $(3/5,0,4/5)$ e o da binormal é $(-4/5,0,3/5)$.',
        'O plano osculador tem equação $4x-3z-15=0$.',
        'A componente tangencial da aceleração é $0$ e a normal é $6$.',
      ],
    },
    solution:
      '$T=(3/5,0,4/5)$, $B=(-4/5,0,3/5)$, plano osculador $4x-3z-15=0$, $a_T=0$ e $a_N=6$.',
    reasoning:
      "O ponto $Q$ corresponde a $t=0$. Tem-se $r'(t)=(3\\cos t-3t\\operatorname{sen}t,\\,3\\operatorname{sen}t+3t\\cos t,\\,4)$, logo $r'(0)=(3,0,4)$ e $|r'(0)|=5$, donde $T=(3/5,0,4/5)$. Além disso, $r''(0)=(0,6,0)$ e $r'(0)\\times r''(0)=(-24,0,18)$, com norma $30$, donde $B=(-4/5,0,3/5)$. O plano osculador tem normal $B$ e passa por $Q$: $-4(x-3)+3(z+1)=0$, ou seja, $4x-3z-15=0$. A componente tangencial é $a_T=(r'\\cdot r'')/|r'|=0$ e a normal é $a_N=|r'\\times r''|/|r'|=30/5=6$.",
    explanation: link.curvas,
  },
  {
    id: 'am2-mt1-2017r-q1',
    title: 'Comprimento de arco e triedro de uma curva',
    source: 'Recurso do Teste 1, 2016/17',
    topic: 'curvas',
    prompt:
      "Considere o ponto $P=(2,1,0)$ e a curva $C$ parametrizada por $r(t)=(2t,\\,t^2,\\,\\ln t)$, $t\\in[1,e]$. a) Mostre que $|r'(t)|=\\frac{1+2t^2}{t}$ e calcule o comprimento de $C$. b) Obtenha os versores da tangente, da binormal e da normal principal no ponto $P$. c) Determine a equação cartesiana do plano normal à curva em $P$.",
    answer: {
      kind: 'self',
      checklist: [
        'O comprimento da curva é $e^2$.',
        'Em $P$: $T=(2/3,2/3,1/3)$, $B=(-2/3,1/3,2/3)$ e $N=(-1/3,2/3,-2/3)$.',
        'O plano normal em $P$ tem equação $2x+2y+z-6=0$.',
      ],
    },
    solution:
      'Comprimento $e^2$; em $P=(2,1,0)$: $T=(2/3,2/3,1/3)$, $B=(-2/3,1/3,2/3)$, $N=(-1/3,2/3,-2/3)$; plano normal $2x+2y+z-6=0$.',
    reasoning:
      "Tem-se $r'(t)=(2,2t,1/t)$, logo $|r'(t)|=\\sqrt{4+4t^2+1/t^2}=\\frac{1+2t^2}{t}$, pois $(1+2t^2)^2/t^2=1/t^2+4+4t^2$. O comprimento é $\\int_1^e \\frac{1+2t^2}{t}\\,dt=[\\ln t+t^2]_1^e=e^2$. O ponto $P$ corresponde a $t=1$: $r'(1)=(2,2,1)$, $|r'(1)|=3$, donde $T=(2/3,2/3,1/3)$. Como $r''(1)=(0,2,-1)$ e $r'(1)\\times r''(1)=(-4,2,4)$ (norma $6$), obtém-se $B=(-2/3,1/3,2/3)$. A normal principal é $N=B\\times T=(-1/3,2/3,-2/3)$. O plano normal tem normal $T$ e passa por $P$: $2(x-2)+2(y-1)+z=0$, ou seja, $2x+2y+z-6=0$.",
    explanation: link.curvas,
  },
  {
    id: 'am2-mt1-2018-q1',
    title: 'Versor da tangente e comprimento de arco',
    source: 'Teste 1, 2017/18',
    topic: 'curvas',
    prompt:
      'Considere o ponto $T=(1/3,1,0)$ e a curva parametrizada por $r(t)=\\left(\\frac{t^3}{3},\\,t^2,\\,1-t^2\\right)$, $t\\ge 0$. a) Determine o versor da tangente num ponto genérico da curva e o seu valor no ponto $T$. b) Calcule o comprimento de arco entre $T$ e $Q=(9,9,-8)$.',
    answer: {
      kind: 'self',
      checklist: [
        'O versor da tangente é $\\left(t,2,-2\\right)/\\sqrt{t^2+8}$ e em $T$ vale $(1,2,-2)/3$.',
        'O comprimento de arco entre $T$ e $Q$ é $(17\\sqrt{17}-27)/3$.',
      ],
    },
    solution:
      '$\\hat T(t)=\\frac{(t,2,-2)}{\\sqrt{t^2+8}}$, $\\hat T(1)=\\frac{(1,2,-2)}{3}$ e comprimento $L=\\frac{17\\sqrt{17}-27}{3}$.',
    reasoning:
      "Os pontos $T$ e $Q$ correspondem a $t=1$ e $t=3$. Tem-se $r'(t)=(t^2,2t,-2t)$ e $|r'(t)|=\\sqrt{t^4+8t^2}=t\\sqrt{t^2+8}$ (para $t\\ge0$), donde $\\hat T(t)=\\frac{(t,2,-2)}{\\sqrt{t^2+8}}$. O comprimento é $\\int_1^3 t\\sqrt{t^2+8}\\,dt=\\left[\\frac{(t^2+8)^{3/2}}{3}\\right]_1^3=\\frac{17\\sqrt{17}-27}{3}$.",
    explanation: link.curvas,
  },
  {
    id: 'am2-mt1-2018-q6',
    title: 'Curva parametrizada pelo comprimento de arco',
    source: 'Teste 1, 2017/18',
    topic: 'curvas',
    prompt:
      "Seja uma curva descrita por $r(s)$, parametrizada pelo comprimento de arco $s$, com $|r(s)|=k$ constante, $k>0$, para todo $s\\in[0,a]$. Mostre que, para todo $s\\in[0,a]$, $r(s)\\cdot r'(s)=0$ e $r(s)\\cdot r''(s)=-1$.",
    answer: {
      kind: 'self',
      checklist: [
        "A justificação usa $|r(s)|^2=k^2$ para obter $r\\cdot r'=0$.",
        "A segunda identidade resulta de derivar $r\\cdot r'=0$ e usar $|r'|=1$.",
      ],
    },
    solution: "$r(s)\\cdot r'(s)=0$ e $r(s)\\cdot r''(s)=-1$.",
    reasoning:
      "Como $|r(s)|^2=r(s)\\cdot r(s)=k^2$ é constante, derivando obtém-se $2r(s)\\cdot r'(s)=0$. Derivando esta identidade, $r'(s)\\cdot r'(s)+r(s)\\cdot r''(s)=0$. Como a parametrização é pelo comprimento de arco, $|r'(s)|=1$, logo $r(s)\\cdot r''(s)=-1$.",
    explanation: link.curvas,
  },
];

export const mt1Derivadas: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q2',
    title: 'Derivada direcional, reta normal e plano tangente',
    source: 'Teste 1, 2016/17',
    topic: 'derivadas',
    prompt:
      'Considere a função escalar $f(x,y,z)=\\operatorname{sen}(xy^3)+\\ln(yz^2)$. a) Calcule a derivada direcional de $f$ no ponto $P=(\\pi/2,1,1)$ na direção do vetor $v=(0,1,-1)$. b) Considere a superfície de nível $S$, $f(x,y,z)=1$. Escreva as equações cartesianas da reta normal a $S$ em $P$ e do plano tangente a $S$ em $P$.',
    answer: {
      kind: 'self',
      checklist: [
        'A derivada direcional é $-\\sqrt{2}/2$.',
        'A reta normal é $x=\\pi/2$, $y=1+t$, $z=1+2t$ (ou cartesiana $x=\\pi/2$ e $y-1=(z-1)/2$).',
        'O plano tangente é $y+2z-3=0$.',
      ],
    },
    solution:
      '$D_vf(P)=-\\frac{\\sqrt{2}}{2}$; reta normal: $x=\\frac{\\pi}{2}$, $\\frac{y-1}{1}=\\frac{z-1}{2}$; plano tangente: $y+2z-3=0$.',
    reasoning:
      'O gradiente é $\\nabla f=(y^3\\cos(xy^3),\\,3xy^2\\cos(xy^3)+1/y,\\,2/z)$. Em $P$: $xy^3=\\pi/2$, $\\cos(\\pi/2)=0$, logo $\\nabla f(P)=(0,1,2)$. O versor na direção de $v$ é $u=(0,1,-1)/\\sqrt2$, donde $D_uf(P)=(0,1,2)\\cdot u=-1/\\sqrt2=-\\sqrt2/2$. Como $f(P)=1$, o ponto $P$ pertence a $S$. A reta normal tem a direção do gradiente: $(x,y,z)=(\\pi/2,1+t,1+2t)$. O plano tangente é $\\nabla f(P)\\cdot(x-\\pi/2,y-1,z-1)=0$, ou seja, $(y-1)+2(z-1)=0$, donde $y+2z-3=0$.',
    explanation: link.derivadas,
  },
  {
    id: 'am2-mt1-2017r-q2',
    title: 'Ângulo entre a tangente a uma curva e o gradiente',
    source: 'Recurso do Teste 1, 2016/17',
    topic: 'derivadas',
    prompt:
      'Dada a função escalar $f(x,y,z)=x\\cos y-e^z\\operatorname{sen}y$ e a curva $C$ parametrizada por $r(t)=(\\cos^3t,\\,\\operatorname{sen}^2t,\\,\\cos t\\,\\operatorname{sen}t)$, $t\\in[0,\\pi/2]$, determine: a) o vetor $v$ tangente a $C$ no ponto $R=(1,0,0)$; b) o ângulo que $v$ faz com $\\nabla f(R)$; c) a derivada direcional de $f$ em $R$ na direção da maior taxa de variação.',
    answer: {
      kind: 'self',
      checklist: [
        'O vetor tangente em $R$ é $v=(0,0,1)$.',
        'O ângulo entre $v$ e $\\nabla f(R)=(1,-1,0)$ é $\\pi/2$.',
        'A derivada direcional máxima em $R$ é $\\sqrt{2}$.',
      ],
    },
    solution:
      '$v=(0,0,1)$, ângulo $\\pi/2$ e derivada direcional máxima $\\sqrt{2}$.',
    reasoning:
      "O ponto $R$ corresponde a $t=0$. Tem-se $r'(t)=(-3\\cos^2t\\,\\operatorname{sen}t,\\,2\\operatorname{sen}t\\cos t,\\,\\cos^2t-\\operatorname{sen}^2t)$, logo $r'(0)=(0,0,1)$. O gradiente é $\\nabla f=(\\cos y,\\,-x\\operatorname{sen}y-e^z\\cos y,\\,-e^z\\operatorname{sen}y)$, donde $\\nabla f(R)=(1,-1,0)$. Como $v\\cdot\\nabla f(R)=0$, o ângulo é $\\pi/2$. A maior taxa de variação dá-se na direção do gradiente e vale $|\\nabla f(R)|=\\sqrt{1^2+(-1)^2}=\\sqrt2$.",
    explanation: link.derivadas,
  },
  {
    id: 'am2-mt1-2018-q2',
    title: 'Derivada direcional segundo a normal a uma superfície',
    source: 'Teste 1, 2017/18',
    topic: 'derivadas',
    prompt:
      'Considere a função escalar $f(x,y,z)=(x-y)^3-z(1+y)$ e o ponto $P=(1,2,-3)$. a) Calcule a derivada direcional de $f$ em $P$ na direção do vetor normal à superfície $x^2+\\frac{z^2}{3}-xy-3y=-4$ nesse ponto. b) Em que direção $f$ tem a mínima razão de variação em $P$, e qual é o valor dessa razão mínima? c) Escreva a equação cartesiana do plano tangente à superfície de nível $f(x,y,z)=8$ em $P$.',
    answer: {
      kind: 'self',
      checklist: [
        'A derivada direcional pedida é $3/\\sqrt{5}$.',
        'A direção de mínima variação é $(-1,0,1)/\\sqrt{2}$ e a razão mínima é $-3\\sqrt{2}$.',
        'O plano tangente é $x-z-4=0$.',
      ],
    },
    solution:
      '$D_uf(P)=\\frac{3}{\\sqrt5}$; direção mínima $(-1,0,1)/\\sqrt2$ com valor $-3\\sqrt2$; plano tangente $x-z-4=0$.',
    reasoning:
      'Seja $g(x,y,z)=x^2+z^2/3-xy-3y+4$. Tem-se $\\nabla g(P)=(2x-y,\\,-x-3,\\,2z/3)\big|_P=(0,-4,-2)$, donde o versor normal é $u=(0,-2,-1)/\\sqrt5$. O gradiente de $f$ é $\\nabla f=(3(x-y)^2,\\,-3(x-y)^2-z,\\,-(1+y))$, donde $\\nabla f(P)=(3,0,-3)$. Assim, $D_uf(P)=(3,0,-3)\\cdot u=3/\\sqrt5$. A mínima razão de variação ocorre na direção oposta ao gradiente, $-\\nabla f/|\\nabla f|=(-1,0,1)/\\sqrt2$, com valor $-|\\nabla f(P)|=-3\\sqrt2$. Como $f(P)=(-1)^3-(-3)(3)=8$, o plano tangente é $3(x-1)-3(z+3)=0$, ou seja, $x-z-4=0$.',
    explanation: link.derivadas,
  },
];

export const mt1Implicitas: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q3',
    title: 'Derivadas parciais de uma função implícita',
    source: 'Teste 1, 2016/17',
    topic: 'implicitas',
    prompt:
      'Sabendo que a equação $xy+yz+e^z=2$ define implicitamente $z=z(x,y)$ na vizinhança do ponto $R=(1,1,0)$, obtenha $\\frac{\\partial z}{\\partial x}$, $\\frac{\\partial z}{\\partial y}$ e $\\frac{\\partial^2 z}{\\partial x^2}$ em $R$.',
    answer: {
      kind: 'self',
      checklist: [
        'Em $R$: $\\partial z/\\partial x=-1/2$ e $\\partial z/\\partial y=-1/2$.',
        'Em $R$: $\\partial^2 z/\\partial x^2=-1/8$.',
      ],
    },
    solution:
      '$\\frac{\\partial z}{\\partial x}(R)=-\\frac12$, $\\frac{\\partial z}{\\partial y}(R)=-\\frac12$ e $\\frac{\\partial^2 z}{\\partial x^2}(R)=-\\frac18$.',
    reasoning:
      'Com $F(x,y,z)=xy+yz+e^z-2$, tem-se $F_x=y$, $F_y=x+z$ e $F_z=y+e^z$. Pelo teorema da função implícita, $\\partial z/\\partial x=-F_x/F_z=-y/(y+e^z)$ e $\\partial z/\\partial y=-(x+z)/(y+e^z)$. Em $R$: ambas valem $-1/2$. Derivando $\\partial z/\\partial x$ em ordem a $x$ (com $y$ constante): $\\partial^2 z/\\partial x^2=\\frac{y\\,e^z}{(y+e^z)^2}\\frac{\\partial z}{\\partial x}$, que em $R$ dá $\\frac{1\\cdot1}{4}\\cdot(-\\frac12)=-\\frac18$.',
    explanation: link.cadeia,
  },
  {
    id: 'am2-mt1-2017r-q3',
    title: 'Derivadas de segunda ordem de função implícita',
    source: 'Recurso do Teste 1, 2016/17',
    topic: 'implicitas',
    prompt:
      'Sabendo que a equação $2xz^2+y+z=2$ define implicitamente $z=z(x,y)$ na vizinhança do ponto $Q=(1,2,0)$, obtenha $\\frac{\\partial z}{\\partial x}$, $\\frac{\\partial z}{\\partial y}$ e $\\frac{\\partial^2 z}{\\partial y^2}$ em $Q$.',
    answer: {
      kind: 'self',
      checklist: [
        'Em $Q$: $\\partial z/\\partial x=0$ e $\\partial z/\\partial y=-1$.',
        'Em $Q$: $\\partial^2 z/\\partial y^2=-4$.',
      ],
    },
    solution:
      '$\\frac{\\partial z}{\\partial x}(Q)=0$, $\\frac{\\partial z}{\\partial y}(Q)=-1$ e $\\frac{\\partial^2 z}{\\partial y^2}(Q)=-4$.',
    reasoning:
      'Com $F(x,y,z)=2xz^2+y+z-2$, tem-se $F_x=2z^2$, $F_y=1$ e $F_z=4xz+1$. Em $Q$: $F_z=1$, logo $\\partial z/\\partial x=-2z^2/(4xz+1)=0$ e $\\partial z/\\partial y=-1/(4xz+1)=-1$. Derivando $\\partial z/\\partial y=-(4xz+1)^{-1}$ em ordem a $y$: $\\partial^2 z/\\partial y^2=\\frac{4x}{(4xz+1)^2}\\frac{\\partial z}{\\partial y}$, que em $Q$ dá $4\\cdot1\\cdot(-1)=-4$.',
    explanation: link.cadeia,
  },
];

export const mt1Extremos: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q4',
    title: 'Pontos estacionários de uma função de duas variáveis',
    source: 'Teste 1, 2016/17',
    topic: 'extremos',
    prompt:
      'Determine e classifique os pontos estacionários da função $f(x,y)=8y^3+2xy-3y^2+x^2$.',
    answer: {
      kind: 'self',
      checklist: [
        'Os pontos estacionários são $(0,0)$ e $(-1/3,1/3)$.',
        '$(0,0)$ é ponto de sela e $(-1/3,1/3)$ é mínimo local, com $f(-1/3,1/3)=-4/27$.',
      ],
    },
    solution: '$(0,0)$ é sela e $(-1/3,1/3)$ é mínimo local com valor $-4/27$.',
    reasoning:
      'As condições $f_x=2x+2y=0$ e $f_y=24y^2+2x-6y=0$ dão $x=-y$ e $24y^2-8y=8y(3y-1)=0$, donde $(0,0)$ e $(-1/3,1/3)$. A matriz hessiana tem $f_{xx}=2$, $f_{xy}=2$ e $f_{yy}=48y-6$, com determinante $96y-16$. Em $(0,0)$ o determinante é $-16<0$, logo é sela. Em $(-1/3,1/3)$ é $16>0$ e $f_{xx}=2>0$, logo é mínimo local; o valor é $f(-1/3,1/3)=8/27-2/9-1/3+1/9=-4/27$.',
    explanation: link.extremos,
  },
  {
    id: 'am2-mt1-2017r-q4',
    title: 'Classificação de pontos estacionários',
    source: 'Recurso do Teste 1, 2016/17',
    topic: 'extremos',
    prompt:
      'Determine e classifique os pontos estacionários da função $f(x,y)=x^3+y^3+3xy+2$.',
    answer: {
      kind: 'self',
      checklist: [
        'Os pontos estacionários são $(0,0)$ e $(-1,-1)$.',
        '$(0,0)$ é ponto de sela e $(-1,-1)$ é máximo local, com $f(-1,-1)=3$.',
      ],
    },
    solution: '$(0,0)$ é sela e $(-1,-1)$ é máximo local com valor $3$.',
    reasoning:
      'De $f_x=3x^2+3y=0$ e $f_y=3y^2+3x=0$ resulta $x^2=-y$ e $y^2=-x$, donde $x^4=-x$, ou seja, $x(x^3+1)=0$: $x=0$ ou $x=-1$, obtendo-se $(0,0)$ e $(-1,-1)$. A hessiana tem $f_{xx}=6x$, $f_{xy}=3$, $f_{yy}=6y$ e determinante $36xy-9$. Em $(0,0)$ o determinante é $-9<0$ (sela). Em $(-1,-1)$ é $27>0$ e $f_{xx}=-6<0$, logo máximo local, com $f(-1,-1)=-1-1+3+2=3$.',
    explanation: link.extremos,
  },
  {
    id: 'am2-mt1-2018-q4',
    title: 'Estacionários de uma quártica simétrica',
    source: 'Teste 1, 2017/18',
    topic: 'extremos',
    prompt:
      'Determine e classifique os pontos estacionários da função $f(x,y)=x^4+y^4-xy+3$.',
    answer: {
      kind: 'self',
      checklist: [
        'Os pontos estacionários são $(0,0)$, $(1/2,1/2)$ e $(-1/2,-1/2)$.',
        '$(0,0)$ é sela; $(1/2,1/2)$ e $(-1/2,-1/2)$ são mínimos locais, com valor $23/8$.',
      ],
    },
    solution:
      '$(0,0)$ é sela; $(\\pm1/2,\\pm1/2)$ são mínimos locais com valor $23/8$.',
    reasoning:
      'De $f_x=4x^3-y=0$ e $f_y=4y^3-x=0$ resulta $y=4x^3$ e $x=256x^9$, ou seja, $x(256x^8-1)=0$: $x=0$ ou $x=\\pm1/2$, obtendo-se $(0,0)$, $(1/2,1/2)$ e $(-1/2,-1/2)$. A hessiana tem determinante $144x^2y^2-1$ e $f_{xx}=12x^2$. Em $(0,0)$ o determinante é $-1<0$ (sela). Nos outros dois, o determinante é $8>0$ e $f_{xx}=3>0$, logo são mínimos locais, com $f=1/16+1/16-1/4+3=23/8$.',
    explanation: link.extremos,
  },
];

export const mt1Integrais: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q5',
    title: 'Integral duplo sobre região entre parábolas',
    source: 'Teste 1, 2016/17',
    topic: 'integrais',
    prompt:
      'Considere o integral duplo $\\int_{-1}^{1}\\int_{x^2}^{4-x^2}(1-x)\\,dy\\,dx$. a) Esboce o domínio de integração. b) Calcule o valor do integral. c) Reescreva-o trocando a ordem de integração.',
    answer: {
      kind: 'self',
      checklist: [
        'O valor do integral é $20/3$.',
        'Na ordem trocada, o domínio decompõe-se em $0\\le y\\le3$, $-\\sqrt y\\le x\\le\\sqrt y$, e $3\\le y\\le4$, $-\\sqrt{4-y}\\le x\\le\\sqrt{4-y}$.',
      ],
    },
    solution:
      '$\\int_{-1}^{1}\\int_{x^2}^{4-x^2}(1-x)\\,dy\\,dx=\\frac{20}{3}=\\int_0^3\\int_{-\\sqrt y}^{\\sqrt y}(1-x)\\,dx\\,dy+\\int_3^4\\int_{-\\sqrt{4-y}}^{\\sqrt{4-y}}(1-x)\\,dx\\,dy$.',
    reasoning:
      'O domínio é a região entre $y=x^2$ e $y=4-x^2$, com $x\\in[-1,1]$; as parábolas só se intersectam em $x=\\pm\\sqrt2$, fora do intervalo. O integral vale $\\int_{-1}^1(1-x)(4-2x^2)\\,dx$. Como $4x-2x^3$ é ímpar, anula-se no intervalo simétrico, obtendo-se $\\int_{-1}^1(4-2x^2)\\,dx=20/3$. Trocando a ordem: para $0\\le y\\le3$ a fronteira inferior é $y=x^2$, donde $x=\\pm\\sqrt y$; para $3\\le y\\le4$ a fronteira superior é $y=4-x^2$, donde $x=\\pm\\sqrt{4-y}$.',
    explanation: link.integrais,
  },
  {
    id: 'am2-mt1-2018-q5',
    title: 'Integral duplo entre reta e parábola',
    source: 'Teste 1, 2017/18',
    topic: 'integrais',
    prompt:
      'Considere o integral duplo $\\int_0^4\\int_{-x}^{4x-x^2}dy\\,dx$. a) Calcule o valor do integral. b) Esboce o domínio de integração. c) Reescreva-o trocando a ordem de integração, definindo analiticamente o respetivo domínio.',
    answer: {
      kind: 'self',
      checklist: [
        'O valor do integral é $56/3$.',
        'Na ordem trocada: $-4\\le y\\le0$ com $2-\\sqrt{4-y}\\le x\\le-y$, e $0\\le y\\le4$ com $2-\\sqrt{4-y}\\le x\\le2+\\sqrt{4-y}$.',
      ],
    },
    solution:
      '$\\int_0^4\\int_{-x}^{4x-x^2}dy\\,dx=\\frac{56}{3}=\\int_{-4}^{0}\\int_{2-\\sqrt{4-y}}^{-y}dx\\,dy+\\int_0^4\\int_{2-\\sqrt{4-y}}^{2+\\sqrt{4-y}}dx\\,dy$.',
    reasoning:
      'O domínio é limitado por baixo pela reta $y=-x$ e por cima pela parábola $y=4x-x^2$; as curvas intersectam-se em $x=0$ e $x=5$, e no intervalo $[0,4]$ a parábola está acima da reta. O integral vale $\\int_0^4(4x-x^2+x)\\,dx=\\int_0^4(5x-x^2)\\,dx=40-64/3=56/3$. Invertendo a ordem, resolve-se $y=4x-x^2$ em ordem a $x$: $x=2\\pm\\sqrt{4-y}$. Para $-4\\le y\\le0$ a fronteira direita é a reta $x=-y$; para $0\\le y\\le4$ as duas fronteiras são os dois ramos da parábola.',
    explanation: link.integrais,
  },
];

export const mt1Cadeia: ExamQuestion[] = [
  {
    id: 'am2-mt1-2017-q6',
    title: 'Regra da cadeia em coordenadas polares',
    source: 'Teste 1, 2016/17',
    topic: 'cadeia',
    prompt:
      'As equações $u=f(x,y)$, $x=r\\cos t$ e $y=r\\operatorname{sen}t$ definem $u$ como função de $r$ e $t$, $u=F(r,t)$. Usando a regra da cadeia, obtenha: a) $\\frac{\\partial F}{\\partial t}$ em função de $\\frac{\\partial f}{\\partial x}$ e $\\frac{\\partial f}{\\partial y}$; b) $\\frac{\\partial^2 F}{\\partial t^2}$.',
    answer: {
      kind: 'self',
      checklist: [
        '$\\frac{\\partial F}{\\partial t}=-r\\operatorname{sen}t\\,\\frac{\\partial f}{\\partial x}+r\\cos t\\,\\frac{\\partial f}{\\partial y}$.',
        '$\\frac{\\partial^2 F}{\\partial t^2}=r^2\\operatorname{sen}^2t\\,f_{xx}-2r^2\\operatorname{sen}t\\cos t\\,f_{xy}+r^2\\cos^2t\\,f_{yy}-r\\cos t\\,f_x-r\\operatorname{sen}t\\,f_y$.',
      ],
    },
    solution:
      '$\\frac{\\partial F}{\\partial t}=-r\\operatorname{sen}t\\,f_x+r\\cos t\\,f_y$ e $\\frac{\\partial^2 F}{\\partial t^2}=r^2\\operatorname{sen}^2t\\,f_{xx}-2r^2\\operatorname{sen}t\\cos t\\,f_{xy}+r^2\\cos^2t\\,f_{yy}-r\\cos t\\,f_x-r\\operatorname{sen}t\\,f_y$.',
    reasoning:
      'Pela regra da cadeia, $\\frac{\\partial F}{\\partial t}=f_x\\frac{\\partial x}{\\partial t}+f_y\\frac{\\partial y}{\\partial t}=-r\\operatorname{sen}t\\,f_x+r\\cos t\\,f_y$. Derivando outra vez em ordem a $t$ e aplicando a cadeia a $f_x$ e $f_y$ (cujas derivadas em $t$ são $-r\\operatorname{sen}t\\,f_{xx}+r\\cos t\\,f_{xy}$ e $-r\\operatorname{sen}t\\,f_{yx}+r\\cos t\\,f_{yy}$), obtém-se a expressão indicada, com os termos das derivadas dos coeficientes $-r\\cos t\\,f_x$ e $-r\\operatorname{sen}t\\,f_y$.',
    explanation: link.cadeia,
  },
  {
    id: 'am2-mt1-2017r-q6',
    title: 'Derivada da norma de uma função vetorial',
    source: 'Recurso do Teste 1, 2016/17',
    topic: 'cadeia',
    prompt:
      "Seja $f(t)$, $t\\in I$, uma função vetorial tal que $f(t)\\neq0$. Mostre que: a) $\\frac{d}{dt}|f(t)|=\\frac{f(t)\\cdot f'(t)}{|f(t)|}$; b) $\\frac{d}{dt}\\left(\\frac{f(t)}{|f(t)|}\\right)=\\frac{f'(t)}{|f(t)|}-\\frac{f(t)\\,(f(t)\\cdot f'(t))}{|f(t)|^3}$.",
    answer: {
      kind: 'self',
      checklist: [
        'A primeira identidade resulta de derivar $|f|^2=f\\cdot f$.',
        'A segunda resulta da regra do quociente aplicada a $f/|f|$, usando a primeira identidade.',
      ],
    },
    solution:
      "$\\frac{d}{dt}|f|=\\frac{f\\cdot f'}{|f|}$ e $\\frac{d}{dt}\\frac{f}{|f|}=\\frac{f'}{|f|}-\\frac{f\\,(f\\cdot f')}{|f|^3}$.",
    reasoning:
      "Como $|f(t)|^2=f(t)\\cdot f(t)$, derivando obtém-se $2|f|\\frac{d|f|}{dt}=2f\\cdot f'$, donde a primeira identidade. Para a segunda, deriva-se o quociente: $\\frac{d}{dt}\\frac{f}{|f|}=\\frac{f'|f|-f\\frac{d|f|}{dt}}{|f|^2}$, e substituindo $\\frac{d|f|}{dt}=\\frac{f\\cdot f'}{|f|}$ obtém-se $\\frac{f'}{|f|}-\\frac{f\\,(f\\cdot f')}{|f|^3}$.",
    explanation: link.cadeia,
  },
];
