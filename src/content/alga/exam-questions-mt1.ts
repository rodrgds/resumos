import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  matrizes: '/cadeiras/alga/matrizes/#produto-de-matrizes',
  potencias: '/cadeiras/alga/matrizes/#potências-simetria-e-ortogonalidade',
  sistemas: '/cadeiras/alga/sistemas-lineares/#o-método-de-gauss',
  classificacao:
    '/cadeiras/alga/sistemas-lineares/#característica-e-classificação',
  determinantes:
    '/cadeiras/alga/determinantes/#propriedades-que-poupam-trabalho',
  laplace: '/cadeiras/alga/determinantes/#regra-de-laplace-e-matriz-adjunta',
  subespacos:
    '/cadeiras/alga/espacos-vetoriais/#subespaços-conjuntos-fechados-para-as-operações',
  bases: '/cadeiras/alga/espacos-vetoriais/#bases-e-dimensão',
  soma: '/cadeiras/alga/espacos-vetoriais/#soma-interseção-e-soma-direta',
};

export const mt1: ExamQuestion[] = [
  {
    id: 'alga-mt1-2023-q1',
    title: 'Quadrado de uma matriz igual a menos a identidade',
    source: 'Teste 1, 2023/24',
    topic: 'matrizes',
    prompt:
      'Seja $A=\\begin{pmatrix}1&1/3\\\\a&b\\end{pmatrix}$. Indique os valores de $a$ e $b$ tais que $A^2=-I_2$.',
    answer: {
      kind: 'self',
      checklist: ['A resposta indica $a=-6$.', 'A resposta indica $b=-1$.'],
    },
    solution: '$a=-6$ e $b=-1$.',
    reasoning:
      'Multiplicando, $A^2=\\begin{pmatrix}1+a/3&1/3+b/3\\\\a+ab&a/3+b^2\\end{pmatrix}$. Igualando a $-I_2$, obtém-se $1+a/3=-1$, logo $a=-6$, e $1/3+b/3=0$, logo $b=-1$. As restantes entradas também ficam corretas: $-6+6=0$ e $-2+1=-1$.',
    explanation: link.potencias,
  },
  {
    id: 'alga-mt1-2023-q2',
    title: 'Produto de matrizes retangulares',
    source: 'Teste 1, 2023/24',
    topic: 'matrizes',
    prompt:
      'Indique a matriz produto $BC$, onde $B=\\begin{pmatrix}-1&2&3\\\\1&0&0\\end{pmatrix}$ e $C=\\begin{pmatrix}1&1&1\\\\1&2&3\\\\1&1&0\\end{pmatrix}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta uma matriz $2\\times 3$.',
        'A primeira linha é $(4,6,5)$ e a segunda é $(1,1,1)$.',
      ],
    },
    solution: '$BC=\\begin{pmatrix}4&6&5\\\\1&1&1\\end{pmatrix}$.',
    reasoning:
      'Cada entrada é o produto interno da linha de $B$ com a coluna de $C$. Na primeira linha: $(-1)\\cdot1+2\\cdot1+3\\cdot1=4$, $(-1)\\cdot1+2\\cdot2+3\\cdot1=6$ e $(-1)\\cdot1+2\\cdot3+3\\cdot0=5$. Na segunda, como $B$ só tem o primeiro elemento não nulo, a linha repete a primeira linha de $C$.',
    explanation: link.matrizes,
  },
  {
    id: 'alga-mt1-2023-q3',
    title: 'Coluna da matriz dos cofatores',
    source: 'Teste 1, 2023/24',
    topic: 'determinantes',
    prompt:
      'Considere $E=\\begin{pmatrix}1&2&1\\\\3&4&10\\\\5&6&-20\\end{pmatrix}$ e seja $M=[m_{ij}]$ a matriz dos cofatores de $E$. Indique as entradas da coluna 3 de $M$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $m_{13}=-2$.',
        'A resposta indica $m_{23}=4$ e $m_{33}=-2$.',
      ],
    },
    solution: '$m_{13}=-2$, $m_{23}=4$ e $m_{33}=-2$.',
    reasoning:
      'Para a coluna 3, $m_{13}=+\\det\\begin{pmatrix}3&4\\\\5&6\\end{pmatrix}=18-20=-2$, $m_{23}=-\\det\\begin{pmatrix}1&2\\\\5&6\\end{pmatrix}=-(6-10)=4$ e $m_{33}=+\\det\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}=4-6=-2$.',
    explanation: link.laplace,
  },
  {
    id: 'alga-mt1-2023-q4',
    title: 'Parâmetro que anula um determinante',
    source: 'Teste 1, 2023/24',
    topic: 'determinantes',
    prompt:
      'Considere $F=\\begin{pmatrix}1&3&2\\\\c&-3&-3\\\\0&9&5\\end{pmatrix}$. Indique o valor de $c$ para o qual $\\det(F)=0$.',
    answer: {
      kind: 'self',
      checklist: ['A resposta indica $c=-4$.'],
    },
    solution: '$c=-4$.',
    reasoning:
      'Expandindo ao longo da primeira coluna, $\\det(F)=1\\cdot(-15+27)-c\\cdot(15-18)=12+3c$. Assim, $\\det(F)=0$ quando $c=-4$.',
    explanation: link.determinantes,
  },
  {
    id: 'alga-mt1-2023-q5',
    title: 'Determinantes de múltiplos e da inversa',
    source: 'Teste 1, 2023/24',
    topic: 'determinantes',
    prompt:
      'Seja $G$ uma matriz $3\\times3$ cujo determinante é $5$. Indique $\\det(2G)$ e $\\det(2G^{-1})$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\det(2G)=40$.',
        'A resposta indica $\\det(2G^{-1})=8/5$.',
      ],
    },
    solution: '$\\det(2G)=40$ e $\\det(2G^{-1})=8/5$.',
    reasoning:
      'Para uma matriz $3\\times3$, $\\det(2G)=2^3\\det(G)=8\\cdot5=40$. Além disso, $\\det(2G^{-1})=2^3\\det(G^{-1})=8/5$.',
    explanation: link.determinantes,
  },
  {
    id: 'alga-mt1-2023-q6',
    title: 'Equação cartesiana de um plano gerado',
    source: 'Teste 1, 2023/24',
    topic: 'espacos',
    prompt:
      'O subespaço vetorial de $\\mathbb R^3$ gerado por $(2,-3,-3)$ e $(0,3,2)$ é um plano de equação $ax+by+6z=0$. Indique $a$ e $b$.',
    answer: {
      kind: 'self',
      checklist: ['A resposta indica $a=3$.', 'A resposta indica $b=-4$.'],
    },
    solution: '$a=3$ e $b=-4$.',
    reasoning:
      'Uma normal ao plano é o produto vetorial $(2,-3,-3)\\times(0,3,2)=(3,-4,6)$. A equação é $3x-4y+6z=0$, pelo que $a=3$ e $b=-4$.',
    explanation: link.subespacos,
  },
  {
    id: 'alga-mt1-2023-q7',
    title: 'Equações de uma reta gerada',
    source: 'Teste 1, 2023/24',
    topic: 'espacos',
    prompt:
      'O subespaço vetorial de $\\mathbb R^3$ gerado por $(0,-2,6)$ é uma reta de equações $x=c$ e $z=dy$. Indique $c$ e $d$.',
    answer: {
      kind: 'self',
      checklist: ['A resposta indica $c=0$.', 'A resposta indica $d=-3$.'],
    },
    solution: '$c=0$ e $d=-3$.',
    reasoning:
      'Todos os pontos da reta são múltiplos de $(0,-2,6)$, portanto $x=0$. Para $y=-2$ tem-se $z=6$, logo $6=d(-2)$ e $d=-3$.',
    explanation: link.subespacos,
  },
  {
    id: 'alga-mt1-2023-q8',
    title: 'Dois geradores que definem o mesmo subespaço',
    source: 'Teste 1, 2023/24',
    topic: 'espacos',
    prompt:
      'Justifique com uma frase a igualdade $\\langle(1,-2,3),(2,-4,6)\\rangle=\\langle(1,-2,3)\\rangle$.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação reconhece que um gerador é múltiplo do outro.',
        'A conclusão é que o segundo vetor não acrescenta dimensão.',
      ],
    },
    solution:
      'Como $(2,-4,6)=2(1,-2,3)$, o segundo vetor já pertence ao subespaço gerado pelo primeiro.',
    reasoning:
      'Se um dos geradores é combinação linear dos restantes, pode ser retirado sem alterar o subespaço gerado. Neste caso, os dois vetores são colineares.',
    explanation: link.soma,
  },
  {
    id: 'alga-mt1-2023-q9',
    title: 'Sistema com matriz reduzida dada',
    source: 'Teste 1, 2023/24',
    topic: 'sistemas',
    prompt:
      'Considere o sistema $x+y+z=2$, $x+3y+3z=0$, $x+3y+6z=3$. A matriz em escada e reduzida associada tem a forma $\\begin{pmatrix}1&0&0&a\\\\0&1&0&b\\\\0&0&1&c\\end{pmatrix}$. Indique $a$, $b$, $c$ e o conjunto solução.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $a=3$, $b=-2$ e $c=1$.',
        'O conjunto solução é $\\{(3,-2,1)\\}$.',
      ],
    },
    solution: '$a=3$, $b=-2$, $c=1$ e o conjunto solução é $\\{(3,-2,1)\\}$.',
    reasoning:
      'Subtraindo a primeira equação às outras, obtém-se $2y+2z=-2$ e $2y+5z=1$. Da primeira, $y+z=-1$; substituindo na segunda, $3z=3$, logo $z=1$, $y=-2$ e $x=3$.',
    explanation: link.sistemas,
  },
  {
    id: 'alga-mt1-2023-q10',
    title: 'Sistema sempre determinado para uma matriz fixa',
    source: 'Teste 1, 2023/24',
    topic: 'sistemas',
    prompt:
      'Considere a afirmação: qualquer sistema linear de 3 equações e 3 incógnitas cuja matriz dos coeficientes é $H=\\begin{pmatrix}1&1&1\\\\1&3&3\\\\1&3&6\\end{pmatrix}$ é possível e determinado. Indique se é verdadeira ou falsa e justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como verdadeira.',
        'A justificação usa $\\det(H)=6\\neq0$.',
      ],
    },
    solution: 'A afirmação é verdadeira.',
    reasoning:
      '$\\det(H)=1(18-9)-1(6-3)+1(3-3)=6\\neq0$. Como a matriz dos coeficientes é invertível, qualquer segundo membro produz uma única solução.',
    explanation: link.classificacao,
  },
  {
    id: 'alga-mt1-2023-q11',
    title: 'Determinante por expansão na segunda coluna',
    source: 'Teste 1, 2023/24',
    topic: 'determinantes',
    prompt:
      'Considere $J=\\begin{pmatrix}1&1&1\\\\1&2&3\\\\1&1&0\\end{pmatrix}$. Determine $\\det(J)$ usando a expansão ao longo da segunda coluna e apresente os cálculos.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $\\det(J)=-1$.',
        'A resolução usa os três cofatores da segunda coluna com os sinais corretos.',
      ],
    },
    solution: '$\\det(J)=-1$.',
    reasoning:
      '$\\det(J)=1\\cdot(+1)\\det\\begin{pmatrix}1&3\\\\1&0\\end{pmatrix}+2\\cdot(+1)\\det\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}+1\\cdot(-1)\\det\\begin{pmatrix}1&1\\\\1&3\\end{pmatrix}=3-2-2=-1$.',
    explanation: link.laplace,
  },
  {
    id: 'alga-mt1-2023-q12',
    title: 'Sistema com uma variável livre por Gauss',
    source: 'Teste 1, 2023/24',
    topic: 'sistemas',
    prompt:
      'Considere o sistema $x+y+z=2$, $x+3y+3z=0$, $2x+4y+4z=2$. Use o método de Gauss para resolver o sistema e indique a matriz em escada e reduzida e o conjunto solução.',
    answer: {
      kind: 'self',
      checklist: [
        'A matriz reduzida tem uma linha nula e duas linhas pivô.',
        'O conjunto solução é $\\{(3,-1-z,z):z\\in\\mathbb R\\}$.',
      ],
    },
    solution:
      'Matriz reduzida: $\\begin{pmatrix}1&0&0&3\\\\0&1&1&-1\\\\0&0&0&0\\end{pmatrix}$. Conjunto solução: $\\{(3,-1-z,z):z\\in\\mathbb R\\}$.',
    reasoning:
      'Depois de eliminar a primeira coluna, as duas últimas equações ficam iguais: $2y+2z=-2$, ou $y+z=-1$. A primeira equação dá então $x=3$. A variável $z$ fica livre e $y=-1-z$.',
    explanation: link.sistemas,
  },
  {
    id: 'alga-mt1-2023-q13',
    title: 'Dimensões da soma e da interseção de duas retas',
    source: 'Teste 1, 2023/24',
    topic: 'espacos',
    prompt:
      'Sejam $M$ e $N$ subespaços de $\\mathbb R^3$ com $\\dim M=\\dim N=1$. Indique, justificando, o que pode concluir sobre $\\dim(M+N)$ e $\\dim(M\\cap N)$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta separa os casos $M=N$ e $M\\neq N$.',
        'No primeiro caso, as duas dimensões são 1; no segundo, são 2 e 0.',
      ],
    },
    solution:
      'Se $M=N$, então $\\dim(M+N)=\\dim(M\\cap N)=1$. Se $M\\neq N$, então $\\dim(M+N)=2$ e $\\dim(M\\cap N)=0$.',
    reasoning:
      'Duas retas pela origem ou coincidem ou geram um plano. No primeiro caso a soma e a interseção são a própria reta. No segundo, a soma tem dimensão 2 e a interseção só contém o vetor nulo. A fórmula $\\dim(M+N)=\\dim M+\\dim N-\\dim(M\\cap N)$ confirma ambos os casos.',
    explanation: link.soma,
  },
];
