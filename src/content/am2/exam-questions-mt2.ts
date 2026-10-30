import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  parametrizarCurva:
    '/cadeiras/am2/curvas-parametricas/#parametrizar-uma-curva',
  linhaVetorial:
    '/cadeiras/am2/integrais-linha/#integral-de-linha-vetorial-e-trabalho',
  green: '/cadeiras/am2/integrais-linha/#teorema-de-green',
  gradiente:
    '/cadeiras/am2/integrais-linha/#campos-gradiente-e-independência-do-caminho',
  parametrizarSuperficie:
    '/cadeiras/am2/superficies-fluxo/#parametrizar-uma-superfície',
  superficieFluxo:
    '/cadeiras/am2/superficies-fluxo/#integrais-de-superfície-e-fluxo',
  divergencia: '/cadeiras/am2/superficies-fluxo/#teorema-da-divergência',
  cilindricas: '/cadeiras/am2/integrais-triplos/#coordenadas-cilíndricas',
};

export const mt2CurvasLinha: ExamQuestion[] = [
  {
    id: 'am2-mt2-2017-q1',
    title: 'Curva de interseção de dois paraboloides e integral de linha',
    source: 'Teste 2, 2016/17',
    topic: 'curvas-linha',
    prompt:
      'Considere a curva $C$ de interseção das superfícies $z=8-x^2-y^2$ e $z=x^2+y^2$. Obtenha uma parametrização para $C$ e calcule $\\int_C x\\,dx-y\\,dy+xyz\\,dz$.',
    answer: {
      kind: 'self',
      checklist: [
        'A parametrização é $r(t)=(2\\cos t,2\\sin t,4)$, $t\\in[0,2\\pi]$ (ou equivalente).',
        'A resposta indica que o integral de linha vale $0$.',
      ],
    },
    solution:
      '$r(t)=(2\\cos t,2\\sin t,4)$, $t\\in[0,2\\pi]$, e $\\int_C x\\,dx-y\\,dy+xyz\\,dz=0$.',
    reasoning:
      'Nos pontos da interseção, $x^2+y^2=8-x^2-y^2$, logo $x^2+y^2=4$ e $z=4$. Como $z$ é constante ao longo de $C$, $dz=0$ e o termo $xyz\\,dz$ anula-se. Além disso, $x\\,dx-y\\,dy=\\frac{1}{2}d(x^2-y^2)$ é uma diferencial exata, pelo que o integral numa curva fechada é nulo. Com a parametrização, o integral fica $\\int_0^{2\\pi}(-8\\sin t\\cos t)\\,dt=0$.',
    explanation: link.parametrizarCurva,
  },
  {
    id: 'am2-mt2-2018-q1',
    title: 'Círculo de interseção e integral de linha',
    source: 'Teste 2, 2017/18',
    topic: 'curvas-linha',
    prompt:
      'Seja $C$ a curva de interseção das superfícies $z=2x^2+2y^2$ e $x^2+y^2=1$. Obtenha uma parametrização para $C$ e calcule $\\int_C (1-2y)\\,dx+2x\\,dy+e^x\\,dz$.',
    answer: {
      kind: 'self',
      checklist: [
        'A parametrização é $r(t)=(\\cos t,\\sin t,2)$, $t\\in[0,2\\pi]$ (ou equivalente).',
        'A resposta indica que o integral de linha vale $4\\pi$.',
      ],
    },
    solution:
      '$r(t)=(\\cos t,\\sin t,2)$ e $\\int_C (1-2y)\\,dx+2x\\,dy+e^x\\,dz=4\\pi$.',
    reasoning:
      'Na interseção, $x^2+y^2=1$ e $z=2(x^2+y^2)=2$, logo $dz=0$. Com $x=\\cos t$ e $y=\\sin t$, o integrando reduz-se a $(1-2\\sin t)(-\\sin t)+2\\cos^2 t=2-\\sin t$, e $\\int_0^{2\\pi}(2-\\sin t)\\,dt=4\\pi$. Pelo teorema de Green, o resultado seria $\\iint_D 4\\,dA=4\\pi$.',
    explanation: link.linhaVetorial,
  },
  {
    id: 'am2-mt2-2018r-q1',
    title: 'Arco de parábola no espaço e integral de linha',
    source: 'Recurso, 2017/18',
    topic: 'curvas-linha',
    prompt:
      'Seja $L$ a curva de interseção das superfícies $y=2x-x^2$ e $z=x$, entre os pontos $O=(0,0,0)$ e $P=(1,1,1)$. Obtenha uma parametrização para $L$ e calcule $\\int_L (y-2z)\\,dx+2x\\,dy+e^x\\,dz$.',
    answer: {
      kind: 'self',
      checklist: [
        'A parametrização é $r(t)=(t,2t-t^2,t)$, $t\\in[0,1]$ (ou equivalente).',
        'A resposta indica que o integral de linha vale $e-\\frac{2}{3}$.',
      ],
    },
    solution:
      '$r(t)=(t,2t-t^2,t)$, $t\\in[0,1]$, e o integral de linha vale $e-\\frac{2}{3}$.',
    reasoning:
      'Com $x=t$, $y=2t-t^2$ e $z=t$, tem-se $dx=dt$, $dy=(2-2t)\\,dt$ e $dz=dt$. O integrando transforma-se em $(2t-t^2-2t)+2t(2-2t)+e^t=-5t^2+4t+e^t$, e $\\int_0^1(-5t^2+4t+e^t)\\,dt=-\\frac{5}{3}+2+(e-1)=e-\\frac{2}{3}$.',
    explanation: link.linhaVetorial,
  },
];

export const mt2Green: ExamQuestion[] = [
  {
    id: 'am2-mt2-2017-q2',
    title: 'Teorema de Green num triângulo, sentido retrógrado',
    source: 'Teste 2, 2016/17',
    topic: 'green',
    prompt:
      'Considere o campo vetorial $f(x,y)=(\\cos y,\\,x\\cos y)$. Calcule, pelo teorema de Green, $\\int_C f\\cdot dr$, sendo $C$ o triângulo com vértices em $(0,0)$, $(\\pi/2,0)$ e $(0,\\pi/2)$, percorrido no sentido retrógrado.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $-\\frac{\\pi}{2}$.',
        'A resolução calcula $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=\\cos y+\\sin y$ e inverte o sinal por causa do sentido retrógrado.',
      ],
    },
    solution: '$\\int_C f\\cdot dr=-\\frac{\\pi}{2}$.',
    reasoning:
      'Com $P=\\cos y$ e $Q=x\\cos y$, $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=\\cos y+\\sin y$. No triângulo $D$ ($x\\ge0$, $y\\ge0$, $x+y\\le\\pi/2$), $\\iint_D(\\cos y+\\sin y)\\,dA=\\int_0^{\\pi/2}(\\cos x-\\sin x+1)\\,dx=\\frac{\\pi}{2}$. Como $C$ é percorrida no sentido retrógrado, o integral é $-\\frac{\\pi}{2}$.',
    explanation: link.green,
  },
  {
    id: 'am2-mt2-2018-q2',
    title: 'Teorema de Green entre reta e parábola',
    source: 'Teste 2, 2017/18',
    topic: 'green',
    prompt:
      'Recorrendo ao teorema de Green, calcule $\\int_C 2xy\\,dx+(2x+x^2)\\,dy$, sendo $C$ a fronteira da região $\\Omega$ limitada pelos gráficos de $y=1-x$ e $y=(x-1)^2$, percorrida no sentido direto.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\frac{1}{3}$.',
        'A resolução usa $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=2$ e a área $\\frac{1}{6}$ da região.',
      ],
    },
    solution: '$\\int_C 2xy\\,dx+(2x+x^2)\\,dy=\\frac{1}{3}$.',
    reasoning:
      'Com $P=2xy$ e $Q=2x+x^2$, $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=2+2x-2x=2$. As curvas cruzam-se em $x=0$ e $x=1$ e, nesse intervalo, a reta está acima da parábola. A área é $\\int_0^1[(1-x)-(x-1)^2]\\,dx=\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$. Como o sentido é direto, o integral vale $2\\cdot\\frac{1}{6}=\\frac{1}{3}$.',
    explanation: link.green,
  },
  {
    id: 'am2-mt2-2018r-q2',
    title: 'Teorema de Green com região entre parábola e duas retas',
    source: 'Recurso, 2017/18',
    topic: 'green',
    prompt:
      'Usando o teorema de Green, determine $\\int_C (x^2-y)\\,dx+(x+y^2)\\,dy$, em que $C$ é a fronteira da região limitada por $x=y^2$, $y=2-x$ e $y=x-2$, percorrida no sentido retrógrado.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $-\\frac{14}{3}$.',
        'A resolução identifica a área $\\frac{7}{3}$ da região e inverte o sinal pelo sentido retrógrado.',
      ],
    },
    solution: '$\\int_C (x^2-y)\\,dx+(x+y^2)\\,dy=-\\frac{14}{3}$.',
    reasoning:
      'Com $P=x^2-y$ e $Q=x+y^2$, $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=1+1=2$. A região tem, para cada $y\\in[-1,1]$, $x$ entre $y^2$ e $2-|y|$, logo a área é $\\int_{-1}^{1}(2-|y|-y^2)\\,dy=\\frac{7}{3}$. No sentido retrógrado, o integral é $-2\\cdot\\frac{7}{3}=-\\frac{14}{3}$.',
    explanation: link.green,
  },
];

export const mt2Gradiente: ExamQuestion[] = [
  {
    id: 'am2-mt2-2017-q3',
    title: 'Campo gradiente com potencial seno e integral de linha',
    source: 'Teste 2, 2016/17',
    topic: 'gradiente',
    prompt:
      'Considere o campo vetorial $f(x,y)=(\\alpha x^{\\alpha-1}y\\cos(x^{\\alpha}y),\\;x^{\\alpha}\\cos(x^{\\alpha}y))$, com $\\alpha\\in\\mathbb R$. Mostre que $f$ é um campo gradiente, determine um potencial $\\phi$ tal que $f=\\nabla\\phi$ e calcule $\\int_L f\\cdot dr$ ao longo de uma curva $L$ com início em $(0,1)$ e fim em $(1,3\\pi/2)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação verifica $\\frac{\\partial P}{\\partial y}=\\frac{\\partial Q}{\\partial x}$.',
        'O potencial é $\\phi(x,y)=\\operatorname{sen}(x^{\\alpha}y)$ (a menos de constante).',
        'A resposta indica que o integral de linha vale $-1$.',
      ],
    },
    solution:
      '$\\phi(x,y)=\\operatorname{sen}(x^{\\alpha}y)+C$ e $\\int_L f\\cdot dr=\\operatorname{sen}(3\\pi/2)-\\operatorname{sen}(0)=-1$.',
    reasoning:
      'Tem-se $\\frac{\\partial P}{\\partial y}=\\alpha x^{\\alpha-1}\\cos(x^{\\alpha}y)-\\alpha x^{2\\alpha-1}y\\operatorname{sen}(x^{\\alpha}y)=\\frac{\\partial Q}{\\partial x}$, logo o campo é conservativo. Um potencial é $\\phi(x,y)=\\operatorname{sen}(x^{\\alpha}y)$, pois $\\nabla\\phi=f$. Pelo teorema fundamental dos integrais de linha, $\\int_L f\\cdot dr=\\phi(1,3\\pi/2)-\\phi(0,1)=\\operatorname{sen}(3\\pi/2)-0=-1$.',
    explanation: link.gradiente,
  },
  {
    id: 'am2-mt2-2018-q3',
    title: 'Potencial de campo linear e integral entre dois pontos',
    source: 'Teste 2, 2017/18',
    topic: 'gradiente',
    prompt:
      'Mostre que o campo vetorial $f(x,y,z)=(y+3z,\\,x,\\,3x+2z)$ é gradiente e determine $\\int_L f\\cdot dr$, em que $L$ é uma curva cujo ponto inicial é $(3,-3,-3)$ e o ponto final é $(-3,3,-3)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação verifica as três igualdades de rotacional nulo.',
        'O potencial é $\\phi(x,y,z)=xy+3xz+z^2$ (a menos de constante).',
        'A resposta indica que o integral de linha vale $54$.',
      ],
    },
    solution:
      '$\\phi=xy+3xz+z^2$ e $\\int_L f\\cdot dr=\\phi(-3,3,-3)-\\phi(3,-3,-3)=27-(-27)=54$.',
    reasoning:
      '$\\frac{\\partial P}{\\partial y}=1=\\frac{\\partial Q}{\\partial x}$, $\\frac{\\partial P}{\\partial z}=3=\\frac{\\partial R}{\\partial x}$ e $\\frac{\\partial Q}{\\partial z}=0=\\frac{\\partial R}{\\partial y}$, logo rot $f=0$ e o campo é gradiente. Integrando, $\\phi=xy+3xz+z^2$. Assim, $\\int_L f\\cdot dr=\\phi(-3,3,-3)-\\phi(3,-3,-3)=(-9+27+9)-(-9-27+9)=54$.',
    explanation: link.gradiente,
  },
  {
    id: 'am2-mt2-2018r-q3',
    title: 'Campo gradiente com seno e cosseno',
    source: 'Recurso, 2017/18',
    topic: 'gradiente',
    prompt:
      'Mostre que o campo vetorial $f(x,y,z)=(\\operatorname{sen} y+2x,\\;x\\cos y+z,\\;y)$ é gradiente e determine $\\int_L f\\cdot dr$, em que $L$ é uma curva com início em $(0,0,1)$ e fim em $(1,\\pi/2,1)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação verifica as três igualdades de rotacional nulo.',
        'O potencial é $\\phi(x,y,z)=x\\operatorname{sen} y+x^2+yz$ (a menos de constante).',
        'A resposta indica que o integral de linha vale $2+\\frac{\\pi}{2}$.',
      ],
    },
    solution:
      '$\\int_L f\\cdot dr=\\phi(1,\\pi/2,1)-\\phi(0,0,1)=\\left(1+1+\\frac{\\pi}{2}\\right)-0=2+\\frac{\\pi}{2}$.',
    reasoning:
      '$\\frac{\\partial P}{\\partial y}=\\cos y=\\frac{\\partial Q}{\\partial x}$, $\\frac{\\partial P}{\\partial z}=0=\\frac{\\partial R}{\\partial x}$ e $\\frac{\\partial Q}{\\partial z}=1=\\frac{\\partial R}{\\partial y}$, logo o campo é conservativo. Um potencial é $\\phi=x\\operatorname{sen} y+x^2+yz$. Portanto, $\\int_L f\\cdot dr=\\phi(1,\\pi/2,1)-\\phi(0,0,1)=2+\\frac{\\pi}{2}$.',
    explanation: link.gradiente,
  },
];

export const mt2SuperficiesFluxo: ExamQuestion[] = [
  {
    id: 'am2-mt2-2017-q4',
    title: 'Integral de superfície escalar sobre superfície curva',
    source: 'Teste 2, 2016/17',
    topic: 'superficies-fluxo',
    prompt:
      'Considere a superfície $S$ definida por $z=1+2y^2$, $0\\le x\\le4$, $-2\\le y\\le1$. Calcule $\\iint_S y\\,dS$.',
    answer: { kind: 'number', value: -37.8295, tolerance: 0.01 },
    solution:
      '$\\iint_S y\\,dS=\\frac{17\\sqrt{17}-65\\sqrt{65}}{12}\\approx-37{,}83$.',
    reasoning:
      'O elemento de área é $dS=\\sqrt{1+(\\frac{\\partial z}{\\partial x})^2+(\\frac{\\partial z}{\\partial y})^2}\\,dx\\,dy=\\sqrt{1+16y^2}\\,dx\\,dy$. Logo $\\iint_S y\\,dS=\\int_0^4\\int_{-2}^{1}y\\sqrt{1+16y^2}\\,dy\\,dx=4\\cdot\\frac{1}{48}\\left[(1+16y^2)^{3/2}\\right]_{-2}^{1}=\\frac{17^{3/2}-65^{3/2}}{12}$.',
    explanation: link.superficieFluxo,
  },
  {
    id: 'am2-mt2-2017-q5',
    title: 'Fluxo através de um parabolóide',
    source: 'Teste 2, 2016/17',
    topic: 'superficies-fluxo',
    prompt:
      'Considere o campo vetorial $g(x,y,z)=(x+1,\\,y-1,\\,2z-1)$. Determine o fluxo de $g$, no sentido de dentro para fora, através da superfície $S$ definida por $z=2x^2+2y^2$, $z\\le4$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que o fluxo vale $2\\pi$.',
        'A resolução usa a normal $(4x,4y,-1)$ (para fora) e o domínio $x^2+y^2\\le2$.',
      ],
    },
    solution: 'O fluxo de $g$ através de $S$ é $2\\pi$.',
    reasoning:
      'A superfície projeta-se no disco $D:x^2+y^2\\le2$. Com $r(x,y)=(x,y,2x^2+2y^2)$, a normal que aponta para fora do sólido é $n=(4x,4y,-1)$. Então $g\\cdot n=4x(x+1)+4y(y-1)-(2z-1)=4x-4y+1$, usando $z=2x^2+2y^2$. Por simetria do disco, $\\iint_D(4x-4y)\\,dA=0$, logo o fluxo é $\\iint_D 1\\,dA=\\pi(\\sqrt2)^2=2\\pi$.',
    explanation: link.divergencia,
  },
  {
    id: 'am2-mt2-2018-q4',
    title: 'Parametrização e área de um cone',
    source: 'Teste 2, 2017/18',
    topic: 'superficies-fluxo',
    prompt:
      'Considere a superfície $S$ definida por $z^2=x^2+y^2$, $1\\le z\\le4$. Parametrize $S$ e calcule a sua área.',
    answer: {
      kind: 'self',
      checklist: [
        'Uma parametrização válida é $r(u,v)=(v\\cos u,v\\sin u,v)$, $u\\in[0,2\\pi]$, $v\\in[1,4]$.',
        'A resposta indica que a área é $15\\sqrt2\\,\\pi$.',
      ],
    },
    solution:
      '$r(u,v)=(v\\cos u,v\\sin u,v)$ e a área de $S$ é $15\\sqrt2\\,\\pi$.',
    reasoning:
      '$|r_u\\times r_v|=v\\sqrt2$. A área é $\\int_0^{2\\pi}\\int_1^4 v\\sqrt2\\,dv\\,du=2\\pi\\sqrt2\\cdot\\frac{4^2-1^2}{2}=15\\sqrt2\\,\\pi$.',
    explanation: link.parametrizarSuperficie,
  },
  {
    id: 'am2-mt2-2018r-q5',
    title: 'Fluxo através de um plano no primeiro octante',
    source: 'Recurso, 2017/18',
    topic: 'superficies-fluxo',
    prompt:
      'Sejam o campo vetorial $h(x,y,z)=(y,\\,z,\\,-x)$ e a superfície plana $S$ situada no primeiro octante e definida por $z=1-x-y$. Calcule o fluxo de $h$ no sentido de baixo para cima através de $S$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que o fluxo vale $\\frac{1}{6}$.',
        'A resolução usa a normal $(1,1,1)$ e o domínio triangular $x\\ge0$, $y\\ge0$, $x+y\\le1$.',
      ],
    },
    solution: 'O fluxo de $h$ através de $S$ é $\\frac{1}{6}$.',
    reasoning:
      'A normal (não unitária) de baixo para cima é $n=(1,1,1)$. Então $h\\cdot n=y+z-x=y+(1-x-y)-x=1-2x$. O fluxo é $\\int_0^1\\int_0^{1-x}(1-2x)\\,dy\\,dx=\\int_0^1(1-2x)(1-x)\\,dx=\\int_0^1(1-3x+2x^2)\\,dx=1-\\frac32+\\frac23=\\frac16$.',
    explanation: link.superficieFluxo,
  },
];

export const mt2Triplos: ExamQuestion[] = [
  {
    id: 'am2-mt2-2017-q6',
    title: 'Integral triplo em cilíndricas e forma cartesiana',
    source: 'Teste 2, 2016/17',
    topic: 'triplos',
    prompt:
      'Calcule $\\int_0^{2\\pi}\\int_0^1\\int_0^{1+r^2}2r\\,dz\\,dr\\,d\\theta$, descreva o domínio de integração e reescreva o integral em coordenadas cartesianas.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que o valor é $3\\pi$.',
        'O domínio é o cilindro $x^2+y^2\\le1$ entre $z=0$ e $z=1+x^2+y^2$.',
        'Em cartesianas, o integral escreve-se $\\iint_{x^2+y^2\\le1}\\int_0^{1+x^2+y^2}2\\sqrt{x^2+y^2}\\,dz\\,dx\\,dy$.',
      ],
    },
    solution: 'O valor do integral é $3\\pi$.',
    reasoning:
      '$\\int_0^{2\\pi}\\int_0^1 2r(1+r^2)\\,dr\\,d\\theta=2\\pi\\left[r^2+\\frac{r^4}{2}\\right]_0^1=2\\pi\\cdot\\frac32=3\\pi$. O domínio é a região cilíndrica $0\\le r\\le1$, $0\\le z\\le1+r^2$, ou seja, em cartesianas, $x^2+y^2\\le1$ e $0\\le z\\le1+x^2+y^2$, com integrando $2\\sqrt{x^2+y^2}$.',
    explanation: link.cilindricas,
  },
  {
    id: 'am2-mt2-2018-q7',
    title:
      'Integral triplo sobre quarto de cilindro, por cilíndricas e por x primeiro',
    source: 'Teste 2, 2017/18',
    topic: 'triplos',
    prompt:
      'Calcule $\\int_0^2\\int_0^{\\sqrt{4-y^2}}\\int_0^{\\sqrt{5-x^2-y^2}}(x^2+y^2)\\,dz\\,dx\\,dy$ reescrevendo-o em coordenadas cilíndricas, e reescreva-o em cartesianas começando a integração na variável $x$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\frac{(25\\sqrt5-11)\\pi}{15}$.',
        'Em cilíndricas, o integral é $\\int_0^{\\pi/2}\\int_0^2\\int_0^{\\sqrt{5-r^2}}r^3\\,dz\\,dr\\,d\\theta$.',
        'Começando por $x$: $\\int_0^2\\int_0^{\\sqrt{4-x^2}}\\int_0^{\\sqrt{5-x^2-y^2}}(x^2+y^2)\\,dz\\,dy\\,dx$.',
      ],
    },
    solution: 'O valor do integral é $\\frac{(25\\sqrt5-11)\\pi}{15}$.',
    reasoning:
      'O domínio projeta-se no quarto de disco $x\\ge0$, $y\\ge0$, $x^2+y^2\\le4$. Em cilíndricas, o integral fica $\\int_0^{\\pi/2}\\int_0^2 r^3\\sqrt{5-r^2}\\,dr\\,d\\theta$. Com $u=5-r^2$, $\\int_0^2 r^3\\sqrt{5-r^2}\\,dr=\\frac{10\\sqrt5}{3}-\\frac{22}{15}$, logo o valor é $\\frac{\\pi}{2}\\left(\\frac{10\\sqrt5}{3}-\\frac{22}{15}\\right)=\\frac{(25\\sqrt5-11)\\pi}{15}$. Começando por $x$, os limites são $0\\le x\\le2$, $0\\le y\\le\\sqrt{4-x^2}$, $0\\le z\\le\\sqrt{5-x^2-y^2}$.',
    explanation: link.cilindricas,
  },
  {
    id: 'am2-mt2-2018r-q7',
    title: 'Integral triplo sobre sólido entre parabolóide e plano',
    source: 'Recurso, 2017/18',
    topic: 'triplos',
    prompt:
      'Calcule $\\iiint_V 2z\\,dx\\,dy\\,dz$, em que $V=\\{(x,y,z): x^2+y^2\\le z\\le3,\\;x^2+y^2\\le2\\}$, usando coordenadas cilíndricas, e descreva o domínio em cartesianas começando a integração pela variável $z$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\frac{46\\pi}{3}$.',
        'Em cilíndricas, o integral é $\\int_0^{2\\pi}\\int_0^{\\sqrt2}\\int_{r^2}^3 2zr\\,dz\\,dr\\,d\\theta$.',
      ],
    },
    solution: 'O valor do integral é $\\frac{46\\pi}{3}$.',
    reasoning:
      '$\\int_0^{2\\pi}\\int_0^{\\sqrt2}\\int_{r^2}^3 2zr\\,dz\\,dr\\,d\\theta=2\\pi\\int_0^{\\sqrt2}r(9-r^4)\\,dr=2\\pi\\left[\\frac{9r^2}{2}-\\frac{r^6}{6}\\right]_0^{\\sqrt2}=2\\pi\\left(9-\\frac43\\right)=\\frac{46\\pi}{3}$. Em cartesianas começando por $z$: para $0\\le z\\le2$ a secção é $x^2+y^2\\le z$ e para $2\\le z\\le3$ a secção é $x^2+y^2\\le2$.',
    explanation: link.cilindricas,
  },
];
