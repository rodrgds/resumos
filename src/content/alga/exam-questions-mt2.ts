import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  lei: '/cadeiras/alga/aplicacoes-lineares/#descobrir-a-lei-a-partir-de-imagens',
  matriz: '/cadeiras/alga/aplicacoes-lineares/#representação-matricial',
  nucleo:
    '/cadeiras/alga/aplicacoes-lineares/#núcleo-imagem-e-o-teorema-das-dimensões',
  kerNaoTrivial: '/cadeiras/alga/aplicacoes-lineares/#um-núcleo-não-trivial',
  proprios:
    '/cadeiras/alga/valores-proprios/#polinómio-característico-e-espaços-próprios',
  reconstruir:
    '/cadeiras/alga/valores-proprios/#reconstruir-a-aplicação-a-partir-dos-espaços-próprios',
  diagonal: '/cadeiras/alga/valores-proprios/#diagonalização',
  passagem:
    '/cadeiras/alga/mudanca-de-base/#coordenadas-e-a-matriz-de-passagem',
  misto:
    '/cadeiras/alga/produtos-vetoriais/#produto-misto-volumes-e-coplanaridade',
  planos: '/cadeiras/alga/retas-planos/#planos-ponto-mais-normal',
};

export const mt2Aplicacoes: ExamQuestion[] = [
  {
    id: 'alga-mt2-2023-q1',
    title: 'Imagem de um vetor por uma aplicação linear',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Seja $f:\\mathbb R^2\\to\\mathbb R^2$ a aplicação linear tal que $f(1,0)=(1,2)$ e $f(0,1)=(-3,5)$. Indique $f(1,2)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $f(1,2)=(-5,12)$.',
        'A justificação usa a linearidade, $f(1,2)=f(1,0)+2f(0,1)$.',
      ],
    },
    solution: '$f(1,2)=(-5,12)$.',
    reasoning:
      'Pela linearidade, $f(1,2)=f(1,0)+2f(0,1)=(1,2)+2(-3,5)=(1-6,2+10)=(-5,12)$.',
    explanation: link.lei,
  },
  {
    id: 'alga-mt2-2023-q2',
    title: 'Matriz de uma aplicação linear na base canónica',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Seja $f:\\mathbb R^2\\to\\mathbb R^2$ a aplicação linear tal que $f(1,0)=(-1,-2)$ e $f(0,1)=(1,7)$. Indique a matriz $M_{bc,bc}(f)$ de $f$ relativamente à base canónica $bc=((1,0),(0,1))$ nos dois lados.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $M_{bc,bc}(f)=\\begin{pmatrix}-1&1\\\\-2&7\\end{pmatrix}$.',
        'A justificação coloca as imagens dos vetores da base como colunas.',
      ],
    },
    solution: '$M_{bc,bc}(f)=\\begin{pmatrix}-1&1\\\\-2&7\\end{pmatrix}$.',
    reasoning:
      'As colunas da matriz são as coordenadas das imagens dos vetores da base canónica: a primeira coluna é $f(1,0)=(-1,-2)$ e a segunda é $f(0,1)=(1,7)$.',
    explanation: link.matriz,
  },
  {
    id: 'alga-mt2-2023-q3',
    title: 'Núcleo de uma aplicação linear',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Considere a aplicação linear $f:\\mathbb R^2\\to\\mathbb R^2$ definida por $f(x,y)=(x+2y,2x+4y)$. Indique o núcleo de $f$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\ker(f)=\\langle(-2,1)\\rangle$.',
        'A justificação resolve o sistema $x+2y=0$, $2x+4y=0$.',
      ],
    },
    solution: '$\\ker(f)=\\langle(-2,1)\\rangle$.',
    reasoning:
      '$f(x,y)=(0,0)$ equivale a $x+2y=0$ (a segunda equação é o dobro da primeira). Logo $x=-2y$ e o núcleo é o conjunto dos múltiplos de $(-2,1)$.',
    explanation: link.nucleo,
  },
  {
    id: 'alga-mt2-2023-q4',
    title: 'Imagem de uma aplicação linear',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Considere a aplicação linear $f:\\mathbb R^2\\to\\mathbb R^2$ definida por $f(x,y)=(2x+y,2x+y)$. Indique a imagem de $f$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\operatorname{Im}(f)=\\langle(1,1)\\rangle$.',
        'A justificação observa que as duas coordenadas da imagem são sempre iguais.',
      ],
    },
    solution: '$\\operatorname{Im}(f)=\\langle(1,1)\\rangle$.',
    reasoning:
      'Para todo $(x,y)$, $f(x,y)=(2x+y)(1,1)$, pelo que a imagem é o conjunto dos múltiplos de $(1,1)$, uma reta pela origem.',
    explanation: link.nucleo,
  },
  {
    id: 'alga-mt2-2023-q5',
    title: 'Lei de uma aplicação a partir do núcleo e de uma imagem',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Seja $f:\\mathbb R^2\\to\\mathbb R^2$ a aplicação linear tal que $\\ker(f)=\\langle(1,1)\\rangle$ e $f(0,1)=(10,13)$. Indique $f(x,y)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $f(x,y)=(y-x)(10,13)$.',
        'A justificação deduz $f(1,0)=(-10,-13)$ a partir de $f(1,1)=(0,0)$.',
      ],
    },
    solution: '$f(x,y)=(y-x)(10,13)=(-10x+10y,-13x+13y)$.',
    reasoning:
      'Como $(1,1)\\in\\ker(f)$, $f(1,0)=f(1,1)-f(0,1)=-(10,13)=(-10,-13)$. Pela linearidade, $f(x,y)=x(-10,-13)+y(10,13)=(y-x)(10,13)$.',
    explanation: link.kerNaoTrivial,
  },
  {
    id: 'alga-mt2-2024-q1',
    title: 'Dimensão do núcleo a partir das imagens da base canónica',
    source: 'Recurso, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Seja $f:\\mathbb R^3\\to\\mathbb R^3$ a aplicação linear tal que $f(1,0,0)=(1,2,3)$, $f(0,1,0)=(2,4,6)$ e $f(0,0,1)=(-2,-4,-6)$. Indique $\\dim\\ker(f)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\dim\\ker(f)=2$.',
        'A justificação usa o teorema das dimensões com posto 1.',
      ],
    },
    solution: '$\\dim\\ker(f)=2$.',
    reasoning:
      'As três imagens são múltiplas de $(1,2,3)$, logo a imagem tem dimensão 1. Pelo teorema das dimensões, $\\dim\\ker(f)=3-1=2$.',
    explanation: link.nucleo,
  },
  {
    id: 'alga-mt2-2023-q6',
    title: 'Aplicação linear injetiva de R3 em R2',
    source: 'Teste 2, 2023/24',
    topic: 'aplicacoes',
    prompt:
      'Averigue a veracidade da seguinte afirmação, justificando: "Existe uma aplicação linear injetiva $f:\\mathbb R^3\\to\\mathbb R^2$."',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como falsa.',
        'A justificação mostra que $\\dim\\ker(f)\\geq 1$ pelo teorema das dimensões.',
      ],
    },
    solution: 'A afirmação é falsa.',
    reasoning:
      'Se $f:\\mathbb R^3\\to\\mathbb R^2$ é linear, então $3=\\dim\\mathbb R^3=\\dim\\ker(f)+\\dim\\operatorname{Im}(f)$. Como $\\operatorname{Im}(f)\\subseteq\\mathbb R^2$, tem-se $\\dim\\operatorname{Im}(f)\\leq2$ e, portanto, $\\dim\\ker(f)\\geq1$. Logo $f$ não é injetiva.',
    explanation: link.nucleo,
  },
];

export const mt2Proprios: ExamQuestion[] = [
  {
    id: 'alga-mt2-2023-q7',
    title: 'Valores próprios de uma aplicação diagonal',
    source: 'Teste 2, 2023/24',
    topic: 'proprios',
    prompt:
      'Seja $f:\\mathbb R^2\\to\\mathbb R^2$ a aplicação linear definida por $f(x,y)=(2x,-y)$. Indique os valores próprios de $f$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica os valores próprios $2$ e $-1$.',
        'A justificação usa a matriz $\\begin{pmatrix}2&0\\\\0&-1\\end{pmatrix}$.',
      ],
    },
    solution: 'Os valores próprios são $2$ e $-1$.',
    reasoning:
      'Na base canónica, $M(f)=\\begin{pmatrix}2&0\\\\0&-1\\end{pmatrix}$, que já é diagonal. Os valores próprios são as entradas da diagonal, $2$ e $-1$.',
    explanation: link.proprios,
  },
  {
    id: 'alga-mt2-2023-q8',
    title: 'Valores próprios com núcleo de dimensão 2',
    source: 'Teste 2, 2023/24',
    topic: 'proprios',
    prompt:
      'Seja $f:\\mathbb R^3\\to\\mathbb R^3$ a aplicação linear tal que $\\ker(f)=\\langle(1,0,0),(0,1,0)\\rangle$ e $f(1,1,1)=(3,4,5)$. Indique os valores próprios de $f$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica os valores próprios $0$ (com multiplicidade 2) e $5$.',
        'A justificação obtém $f(x,y,z)=(3z,4z,5z)$.',
      ],
    },
    solution: 'Os valores próprios são $0$ e $5$.',
    reasoning:
      'Escrevendo $(x,y,z)=(x-z)(1,0,0)+(y-z)(0,1,0)+z(1,1,1)$, obtém-se $f(x,y,z)=z(3,4,5)=(3z,4z,5z)$. A matriz de $f$ na base canónica é $\\begin{pmatrix}0&0&3\\\\0&0&4\\\\0&0&5\\end{pmatrix}$, donde os valores próprios são $0$, $0$ e $5$.',
    explanation: link.proprios,
  },
  {
    id: 'alga-mt2-2024-q2',
    title: 'Vetor próprio associado a um valor próprio dado',
    source: 'Recurso, 2023/24',
    topic: 'proprios',
    prompt:
      'A aplicação linear $f:\\mathbb R^2\\to\\mathbb R^2$ definida por $f(x,y)=(2y,2x)$ tem o valor próprio $-2$, e um vetor próprio associado tem a forma $(1,a)$. Indique $a$.',
    answer: {
      kind: 'self',
      checklist: ['A resposta indica $a=-1$.'],
    },
    solution: '$a=-1$, ou seja, $(1,-1)$ é vetor próprio associado a $-2$.',
    reasoning:
      'Procura-se $a$ tal que $f(1,a)=-2(1,a)$. Como $f(1,a)=(2a,2)$, obtém-se $(2a,2)=(-2,-2a)$, donde $a=-1$.',
    explanation: link.proprios,
  },
  {
    id: 'alga-mt2-2024-q3',
    title: 'Valores próprios de uma permuta com sinal',
    source: 'Recurso, 2023/24',
    topic: 'proprios',
    prompt:
      'Seja $f:\\mathbb R^3\\to\\mathbb R^3$ a aplicação linear definida por $f(x,y,z)=(2z,2y,2x)$. Indique os valores próprios de $f$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica os valores próprios $2$ (duplo) e $-2$.',
        'A justificação calcula o polinómio caraterístico $-(\\lambda-2)^2(\\lambda+2)$.',
      ],
    },
    solution: 'Os valores próprios são $2$, com multiplicidade $2$, e $-2$.',
    reasoning:
      '$M(f)=\\begin{pmatrix}0&0&2\\\\0&2&0\\\\2&0&0\\end{pmatrix}$ e $\\det(M(f)-\\lambda I)=(2-\\lambda)(\\lambda^2-4)=-(\\lambda-2)^2(\\lambda+2)$.',
    explanation: link.proprios,
  },
  {
    id: 'alga-mt2-2024-q4',
    title: 'Reconstruir a aplicação a partir dos espaços próprios',
    source: 'Recurso, 2023/24',
    topic: 'proprios',
    prompt:
      'Seja $f:\\mathbb R^3\\to\\mathbb R^3$ a aplicação linear tal que $E_{-2}=\\langle(1,0,0),(0,1,0)\\rangle$ e $E_{7}=\\langle(1,1,1)\\rangle$. Indique $f(x,y,z)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $f(x,y,z)=(-2x+9z,-2y+9z,7z)$.',
        'A justificação decompõe $(x,y,z)$ nos espaços próprios.',
      ],
    },
    solution: '$f(x,y,z)=(-2x+9z,-2y+9z,7z)$.',
    reasoning:
      'Tem-se $(x,y,z)=(x-z)(1,0,0)+(y-z)(0,1,0)+z(1,1,1)$. Aplicando $f$, que vale $-2$ nos dois primeiros vetores e $7$ no terceiro, obtém-se $f(x,y,z)=-2(x-z)(1,0,0)-2(y-z)(0,1,0)+7z(1,1,1)=(-2x+9z,-2y+9z,7z)$.',
    explanation: link.reconstruir,
  },
  {
    id: 'alga-mt2-2024-q5',
    title: 'Mostrar que uma aplicação é diagonalizável',
    source: 'Recurso, 2023/24',
    topic: 'proprios',
    prompt:
      'Mostre que a aplicação linear $f:\\mathbb R^3\\to\\mathbb R^3$ definida por $f(x,y,z)=(x+y+z,x+y+z,x+y+z)$ é diagonalizável.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta calcula o polinómio caraterístico $(3-\\lambda)\\lambda^2$.',
        'A justificação verifica que $\\dim E_0=2$ e $\\dim E_3=1$.',
        'Conclui que $2+1=3=\\dim\\mathbb R^3$, logo $f$ é diagonalizável.',
      ],
    },
    solution:
      '$p(\\lambda)=(3-\\lambda)\\lambda^2$, com $\\dim E_0=2$ e $\\dim E_3=1$; como $2+1=3$, existe uma base de $\\mathbb R^3$ de vetores próprios e $f$ é diagonalizável.',
    reasoning:
      'Somando as três linhas na matriz de $f$, $p(\\lambda)=\\det(M(f)-\\lambda I)=(3-\\lambda)\\lambda^2$. O núcleo de $f$ é o plano $x+y+z=0$, de dimensão $2$, e $E_3=\\langle(1,1,1)\\rangle$. Como $\\dim E_0+\\dim E_3=3$, a soma dos espaços próprios é $\\mathbb R^3$.',
    explanation: link.diagonal,
  },
];

export const mt2Base: ExamQuestion[] = [
  {
    id: 'alga-mt2-2018-q1',
    title: 'Coordenadas noutra base e matriz de passagem compuesta',
    source: 'Teste 2, 2018/19',
    topic: 'base',
    prompt:
      'Seja $E$ um espaço vetorial de dimensão 3 e $B_1=(b_1,b_2,b_3)$, $B_2$ e $B_3$ bases de $E$. Sabendo que $M(\\mathrm{Id};B_1,B_2)=\\begin{pmatrix}1&0&0\\\\0&1&1\\\\0&2&3\\end{pmatrix}$ e $M(\\mathrm{Id};B_1,B_3)=\\begin{pmatrix}1&1&1\\\\0&1&1\\\\0&0&1\\end{pmatrix}$, indique as coordenadas de $b_1+b_2$ na base $B_2$ e escreva $M(\\mathrm{Id};B_2,B_3)$ como produto de duas das matrizes dadas (sem calcular o produto).',
    answer: {
      kind: 'self',
      checklist: [
        'As coordenadas de $b_1+b_2$ em $B_2$ são $(1,1,2)$.',
        'A resposta indica $M(\\mathrm{Id};B_2,B_3)=M(\\mathrm{Id};B_1,B_3)\\cdot(M(\\mathrm{Id};B_1,B_2))^{-1}$.',
      ],
    },
    solution:
      '$[b_1+b_2]_{B_2}=(1,1,2)$ e $M(\\mathrm{Id};B_2,B_3)=M(\\mathrm{Id};B_1,B_3)\\cdot(M(\\mathrm{Id};B_1,B_2))^{-1}$.',
    reasoning:
      'As colunas de $M(\\mathrm{Id};B_1,B_2)$ são as coordenadas dos $b_i$ em $B_2$. Assim, $[b_1+b_2]_{B_2}=(1,0,0)+(0,1,2)=(1,1,2)$. Para a passagem de $B_2$ para $B_3$, passa-se primeiro de $B_2$ para $B_1$ (inversa) e depois de $B_1$ para $B_3$.',
    explanation: link.passagem,
  },
  {
    id: 'alga-mt2-2016-q1',
    title: 'Coordenadas de vetores em bases diferentes',
    source: 'Teste, 2016/17',
    topic: 'base',
    prompt:
      'Considere as bases de $\\mathbb R^3$, $B=(b_1,b_2,b_3)$ e $C=(c_1,c_2,c_3)$, e a matriz $M(\\mathrm{Id};B,C)=\\begin{pmatrix}0&-1&1\\\\-2&1&1\\\\0&1&1\\end{pmatrix}$. Indique as coordenadas de $b_1$ e de $b_2+b_3$ na base $C$, e as coordenadas de $c_1$ na base $B$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $[b_1]_C=(0,-2,0)$ e $[b_2+b_3]_C=(0,2,2)$.',
        'A resposta indica $[c_1]_B=(0,-1/2,1/2)$.',
      ],
    },
    solution:
      '$[b_1]_C=(0,-2,0)$, $[b_2+b_3]_C=(-1,1,1)+(1,1,1)=(0,2,2)$ e $[c_1]_B=(0,-1/2,1/2)$.',
    reasoning:
      'As colunas de $M(\\mathrm{Id};B,C)$ são as coordenadas dos $b_j$ na base $C$, logo $[b_1]_C=(0,-2,0)$ e $[b_2+b_3]_C=(0,2,2)$. Para $[c_1]_B$, resolve-se $M(\\mathrm{Id};B,C)\\cdot x=(1,0,0)$, o que dá $x=(0,-1/2,1/2)$.',
    explanation: link.passagem,
  },
];

export const mt2Geometria: ExamQuestion[] = [
  {
    id: 'alga-mt2-2016-q2',
    title: 'Volume de um paralelipípedo',
    source: 'Teste, 2016/17',
    topic: 'geometria',
    prompt:
      'Considere os pontos de $\\mathbb R^3$, $a=(0,3,-1)$, $b=(2,0,-1)$ e $c=(-1,0,1)$. Determine o volume do paralelipípedo de vértices $0$, $a$, $b$, $c$, $a+b$, $c+b$, $c+a$ e $c+a+b$, sendo $0=(0,0,0)$.',
    answer: {
      kind: 'number',
      value: 3,
      tolerance: 0,
      unit: 'u.v.',
    },
    solution: 'O volume é $3$.',
    reasoning:
      'O volume é o valor absoluto do produto misto $a\\cdot(b\\times c)$. Tem-se $b\\times c=(2,0,-1)\\times(-1,0,1)=(0,-1,0)$ e $a\\cdot(b\\times c)=(0,3,-1)\\cdot(0,-1,0)=-3$. Logo o volume é $|-3|=3$.',
    explanation: link.misto,
  },
  {
    id: 'alga-mt2-2017-q1',
    title: 'Ponto c com volume e projeção dados',
    source: 'Teste, 2017/18',
    topic: 'geometria',
    prompt:
      'Considere o paralelipípedo de vértices $0$, $a$, $b$, $c$, $a+b$, $c+b$, $c+a$ e $c+a+b$, com $0=(0,0,0)$, $a=(1,0,1)$ e $b=(1,1,1)$. Sabendo que o volume é $6$, que $P$ é o plano determinado por $0$, $a$ e $b$, e que a reta perpendicular a $P$ que passa por $c$ intersecta $P$ no ponto $(2,3,2)$, determine o(s) ponto(s) $c$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $c=(-1,3,5)$ ou $c=(5,3,-1)$.',
        'A justificação usa a normal $a\\times b=(-1,0,1)$ e a condição $|\\det(a,b,c)|=6$.',
      ],
    },
    solution: '$c=(-1,3,5)$ ou $c=(5,3,-1)$.',
    reasoning:
      'Uma normal ao plano $P$ é $a\\times b=(1,0,1)\\times(1,1,1)=(-1,0,1)$. Como a reta por $c$ perpendicular a $P$ passa por $(2,3,2)$, tem-se $c=(2,3,2)+t(-1,0,1)=(2-t,3,2+t)$. O volume é $|a\\cdot(b\\times c)|=|c_z-c_x|=|2t|$, logo $|2t|=6$ e $t=\\pm3$, donde $c=(-1,3,5)$ ou $c=(5,3,-1)$.',
    explanation: link.planos,
  },
];
