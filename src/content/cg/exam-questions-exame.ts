import type { ExamQuestion } from '../../lib/exam-question';

export const transformacoes: ExamQuestion[] = [
  {
    id: 'cg-exame-2016-q1',
    title: 'Matriz de B para A a partir das matrizes que passam por C',
    source: 'Exame de recurso, 2015/16',
    topic: 'transformacoes',
    prompt:
      'Sejam $M_{AC}$ a matriz de transformação geométrica que leva um objeto da posição $A$ para a posição $C$ e $M_{BC}$ a que o leva de $B$ para $C$. Indique, em notação simbólica, como calcula a matriz $M_{BA}$ que leva o objeto de $B$ para $A$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $M_{BA}=M_{BC}^{-1}\\,M_{AC}$.',
        'A justificação usa $M_{BC}M_{BA}=M_{AC}$.',
      ],
    },
    solution: '$M_{BA}=M_{BC}^{-1}\\,M_{AC}$.',
    reasoning:
      'Como $M_{BC}$ leva de $B$ para $C$ e $M_{AC}$ leva de $A$ para $C$, a composição que leva de $B$ para $A$ e depois de $A$ para $C$ é $M_{BC}M_{BA}=M_{AC}$. Multiplicando à esquerda por $M_{BC}^{-1}$ obtém-se $M_{BA}=M_{BC}^{-1}M_{AC}$.',
    explanation:
      '/cadeiras/cg/transformacoes-geometricas/#composição-de-transformações',
  },
  {
    id: 'cg-exame-2016-q2',
    title: 'Parafuso: rotação e avanço ao longo do próprio eixo',
    source: 'Exame de recurso, 2015/16',
    topic: 'transformacoes',
    prompt:
      'Represente, em notação simbólica, a matriz de transformação geométrica 3D que faz um parafuso rodar $45°$ em torno do seu próprio eixo e, em simultâneo, avançar $0{,}25$ unidades ao longo desse eixo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta inclui a rotação $R(\\hat e,45°)$ em torno do eixo do parafuso.',
        'A resposta inclui a translação $T(0{,}25\\,\\hat e)$ ao longo do mesmo eixo.',
        'A justificação nota que as duas operações comutam por atuarem no mesmo eixo.',
      ],
    },
    solution:
      '$M=T(0{,}25\\,\\hat e)\\,R(\\hat e,45°)=R(\\hat e,45°)\\,T(0{,}25\\,\\hat e)$, em que $\\hat e$ é a direção do eixo do parafuso.',
    reasoning:
      'Rodar o parafuso em torno do seu eixo é a rotação $R(\\hat e,45°)$ e o avanço é a translação de $0{,}25$ na direção $\\hat e$. Como ambos os movimentos são em torno ou ao longo do mesmo eixo, as duas matrizes comutam e a ordem dos fatores não altera o resultado.',
    explanation:
      '/cadeiras/cg/transformacoes-geometricas/#composição-de-transformações',
  },
  {
    id: 'cg-exame-2002-q1',
    title: 'Espelho no plano y=k, escala em y e rotação',
    source: 'Exame, 2001/02 (2.ª chamada)',
    topic: 'transformacoes',
    prompt:
      'Pretende-se realizar, em 3D, a sequência de transformações: 1) reflexão ("espelho") no plano $y=k$; 2) ampliação de fator $s$ na direção $y$; 3) rotação de $\\alpha$ no sentido dos ponteiros do relógio, para quem observa de $y=+\\infty$ para $y=0$. Determine a matriz de transformação equivalente, com vetores coluna, e diga se o mesmo resultado se obteria com outra ordem das operações.',
    answer: {
      kind: 'self',
      checklist: [
        'A matriz é $R_y(-\\alpha)\\,S(1,s,1)\\,T(0,k,0)\\,\\mathrm{Ref}_y\\,T(0,-k,0)$, com $\\mathrm{Ref}_y=\\mathrm{diag}(1,-1,1,1)$.',
        'A justificação da reflexão no plano $y=k$ usa $T(0,k,0)\\,\\mathrm{Ref}_y\\,T(0,-k,0)$.',
        'Conclui que outra ordem não produz o mesmo resultado, pois as transformações não comutam.',
      ],
    },
    solution:
      '$M=R_y(-\\alpha)\\,S(1,s,1)\\,T(0,k,0)\\,\\mathrm{Ref}_y\\,T(0,-k,0)$, com $\\mathrm{Ref}_y=\\mathrm{diag}(1,-1,1,1)$; não é possível trocar a ordem das operações.',
    reasoning:
      'A reflexão no plano $y=k$ obtém-se trasladando o plano para $y=0$, refletindo em $y$ e voltando atrás: $T(0,k,0)\\,\\mathrm{Ref}_y\\,T(0,-k,0)$. A seguir aplica-se a escala $S(1,s,1)$ e, por fim, a rotação. O sentido dos ponteiros do relógio visto de $y=+\\infty$ corresponde ao ângulo $-\\alpha$ em torno do eixo $+y$. Com vetores coluna, aplica-se primeiro a matriz mais à direita; como rotação, escala e reflexão não comutam, trocar a ordem altera o resultado.',
    explanation:
      '/cadeiras/cg/transformacoes-geometricas/#composição-de-transformações',
  },
  {
    id: 'cg-exame-2002-q2',
    title: 'Parafuso de eixo paralelo a y: matriz do movimento',
    source: 'Exame, 2001/02 (recurso)',
    topic: 'transformacoes',
    prompt:
      'Um parafuso encontra-se no espaço 3D com o eixo segundo a reta $x=40$, $z=20$. A rosca é direita e faz o parafuso avançar 2 unidades por volta. Determine a matriz de transformação geométrica 3D do movimento do parafuso quando este roda $10°$ no sentido indicado, e diga se os dados fornecidos seriam suficientes se o parafuso fosse também alvo de um escalamento $S(1,1.2,1)$.',
    answer: {
      kind: 'self',
      checklist: [
        'O avanço numa rotação de $10°$ é $2\\cdot 10/360=1/18$ ao longo do eixo.',
        'A matriz é $T(40,1/18,20)\\,R_y(10°)\\,T(-40,0,-20)$, ou forma equivalente.',
        'Conclui que basta compor com $S(1,1.2,1)$, pelo que os dados são suficientes.',
      ],
    },
    solution:
      'O avanço é $2\\cdot\\frac{10}{360}=\\frac{1}{18}$ ao longo de $y$ e a matriz é $M=T(40,1/18,20)\\,R_y(10°)\\,T(-40,0,-20)$. Sim, os dados são suficientes: o escalamento entra como mais um fator da composição.',
    reasoning:
      'Uma volta completa ($360°$) faz avançar 2 unidades, logo uma rotação de $10°$ faz avançar $2\\cdot\\frac{10}{360}=\\frac{1}{18}$. A rotação faz-se em torno do eixo $x=40$, $z=20$, conjugando $R_y(10°)$ pelas translações $T(40,0,20)$ e $T(-40,0,-20)$, e o avanço acumula-se na componente $y$ da translação final. O escalamento $S(1,1.2,1)$ é apenas mais uma matriz na composição, pelo que os dados fornecidos chegam.',
    explanation:
      '/cadeiras/cg/transformacoes-geometricas/#rotação-em-torno-de-um-centro',
  },
];

export const iluminacao: ExamQuestion[] = [
  {
    id: 'cg-exame-2016-q3',
    title: 'Volume de sombras com mais do que uma fonte de luz',
    source: 'Exame, 2015/16 (época normal)',
    topic: 'iluminacao',
    prompt:
      'Diga como pode o método do "volume de sombras" ser utilizado em cenas em que existam mais do que uma fonte de luz.',
    answer: {
      kind: 'self',
      checklist: [
        'Calcula-se um volume de sombras por cada fonte de luz.',
        'Um ponto está na sombra de uma dada fonte se estiver dentro do volume de sombras dessa fonte.',
        'Com $N$ fontes, a iluminação de cada ponto é determinada testando os $N$ volumes (uma máscara de sombra por fonte).',
      ],
    },
    solution:
      'Calcula-se um volume de sombras por fonte de luz e testa-se, para cada ponto, a que volumes ele pertence.',
    reasoning:
      'O volume de sombras de uma fonte é o sólido delimitado pelos raios que passam pelos contornos do objeto-blocker. Com várias fontes, cada fonte projeta o seu próprio volume; um ponto só recebe luz difusa e especular de uma fonte se não estiver dentro do volume de sombras dessa fonte. Assim, com $N$ fontes, aplicam-se $N$ testes de pertença e a iluminação final é a soma das contribuições das fontes não bloqueadas.',
    explanation: '/cadeiras/cg/cor-texturas-visibilidade/#sombras-projetadas',
  },
  {
    id: 'cg-exame-2016-q4',
    title: 'Efeito de Mach Band no sombreamento constante e no de Gouraud',
    source: 'Exame, 2015/16 (época normal)',
    topic: 'iluminacao',
    prompt:
      'Quando se usa sombreamento constante, o efeito de Mach Band corresponde a uma descontinuidade de iluminação que pode ser sentida através da função de iluminação ou da sua derivada? E no caso do sombreamento de Gouraud?',
    answer: {
      kind: 'self',
      checklist: [
        'Identifica a derivada da função de iluminação (a 1.ª derivada), e não a função em si.',
        'No sombreamento constante as bandas são visíveis porque a derivada é descontínua nas arestas dos polígonos.',
        'No sombreamento de Gouraud a interpolação dos valores nos vértices suaviza a descontinuidade.',
      ],
    },
    solution:
      'Pela derivada da função de iluminação. No sombreamento constante a derivada é descontínua nas arestas e as bandas de Mach são visíveis; no de Gouraud a interpolação suaviza esse efeito.',
    reasoning:
      'O olho humano é sensível a variações bruscas da derivada da intensidade, não a descontinuidades da própria função. No sombreamento constante cada face tem iluminação uniforme, pelo que a derivada salta nas arestas e aparecem bandas claras ou escuras junto às arestas. No sombreamento de Gouraud a iluminação varia linearmente dentro de cada face, o que suaviza o salto da derivada e torna as bandas muito menos perceptíveis.',
    explanation:
      '/cadeiras/cg/iluminacao-sombreamento/#sombreamento-constante-gouraud-e-phong',
  },
  {
    id: 'cg-exame-2009-q1',
    title: 'Iluminação na sombra: apenas componente difusa?',
    source: 'Exame, 2008/09',
    topic: 'iluminacao',
    prompt:
      'Comente a afirmação: "Com o cálculo de projeção de sombras determinam-se os objetos, ou partes destes, cuja iluminação, por se encontrarem em sombra, se calcula somente pela componente de iluminação difusa".',
    answer: {
      kind: 'self',
      checklist: [
        'Classifica a afirmação como falsa.',
        'Em sombra calcula-se a componente ambiente mais a difusa.',
        'A componente especular anula-se porque a fonte de luz não é visível do ponto.',
      ],
    },
    solution:
      'A afirmação é falsa: nos pontos em sombra calcula-se a iluminação ambiente mais a difusa, e não apenas a difusa.',
    reasoning:
      'Um ponto em sombra não vê a fonte de luz, logo o termo especular, que depende da direção de reflexão dessa luz, é nulo. Porém o ponto continua a receber luz ambiente, pelo que a iluminação na sombra inclui sempre a componente ambiente (mais a difusa das fontes que não estão bloqueadas). A componente ambiente nunca desaparece.',
    explanation:
      '/cadeiras/cg/iluminacao-sombreamento/#iluminação-local-de-phong',
  },
];

export const corVisibilidade: ExamQuestion[] = [
  {
    id: 'cg-exame-2016-q5',
    title: 'Back face culling: três afirmações',
    source: 'Exame, 2015/16 (época normal)',
    topic: 'cor-visibilidade',
    prompt:
      'Classifique como verdadeiras ou falsas, justificando, as afirmações sobre a técnica Back Face Culling: a) permite reduzir o número de polígonos a processar em termos de cálculo de iluminação; b) baseia-se na análise do ângulo formado entre a normal orientada de um polígono e o vetor que aponta para o observador; c) a análise do ângulo resume-se à verificação do sinal do produto vetorial desses dois vetores.',
    answer: {
      kind: 'self',
      checklist: [
        'a) Verdadeira: as faces traseiras são eliminadas antes do cálculo de iluminação.',
        'b) Verdadeira: o teste usa o ângulo entre a normal $N$ e o vetor de visão $V$.',
        'c) Falsa: o sinal resulta do produto escalar $N\\cdot V$, não do produto vetorial.',
      ],
    },
    solution:
      'a) Verdadeira. b) Verdadeira. c) Falsa: o teste é o sinal de $N\\cdot V$ (uma face é traseira quando $N\\cdot V<0$).',
    reasoning:
      'O Back Face Culling elimina as faces cujo lado de fora não está virado para o observador, reduzindo o número de polígonos a iluminar e a rasterizar. O critério geométrico é o ângulo entre a normal orientada $N$ da face e o vetor $V$ que vai do polígono para o observador: se $N\\cdot V<0$, a face está de costas. O produto vetorial não entra no teste; o sinal relevante é o do produto escalar.',
    explanation: '/cadeiras/cg/cor-texturas-visibilidade/#visibilidade',
  },
  {
    id: 'cg-exame-2016-q6',
    title: 'Item buffers para acelerar o ray-tracing',
    source: 'Exame, 2015/16 (época normal)',
    topic: 'cor-visibilidade',
    prompt:
      'Diga de que forma é que a técnica Item Buffers garante a diminuição do número de raios a processar em Ray-Tracing.',
    answer: {
      kind: 'self',
      checklist: [
        'Associa a cada pixel a lista dos itens (polígonos) que o cobrem.',
        'Para cada raio, só se testam os itens do pixel por onde ele passa.',
        'Assim evitam-se os testes de interseção com todos os objetos da cena.',
      ],
    },
    solution:
      'Cada pixel guarda a lista dos polígonos que o cobrem; um raio só testa a interseção com essa lista.',
    reasoning:
      'Sem item buffers, cada raio primário testa-se contra todos os objetos da cena, o que é caro. Com item buffers, constrói-se para cada pixel a lista dos itens que o cobrem; quando um raio atravessa esse pixel, só se calculam as interseções com os itens dessa lista. O número de testes de interseção por raio desce drasticamente, acelerando o ray-tracing.',
    explanation: '/cadeiras/cg/cor-texturas-visibilidade/#visibilidade',
  },
  {
    id: 'cg-exame-2002-q3',
    title: 'Z-buffer na projeção de sombras',
    source: 'Exame, 2001/02 (2.ª chamada)',
    topic: 'cor-visibilidade',
    prompt:
      'Comente a afirmação: "O algoritmo Z-buffer é tão adequado ao cálculo de projeção de sombras como o de Atherton e Weiler".',
    answer: {
      kind: 'self',
      checklist: [
        'Classifica a afirmação como falsa.',
        'O Z-buffer compara profundidades por pixel e não produz sombras directamente.',
        'O algoritmo de Atherton e Weiler calcula as sombras geometricamente, por recorte com os volumes de sombra.',
      ],
    },
    solution:
      'A afirmação é falsa: o Z-buffer não é, por si, adequado ao cálculo de projeção de sombras.',
    reasoning:
      'O Z-buffer resolve visibilidade ponto a ponto comparando profundidades; não guarda informação sobre que fonte de luz ilumina cada ponto, pelo que não detecta sombras (só com variantes como shadow maps, que correm o z-buffer do ponto de vista da fonte). O algoritmo de Atherton e Weiler trata as sombras directamente no espaço objeto, recortando a cena pelos volumes de sombra projectados a partir de cada fonte.',
    explanation: '/cadeiras/cg/cor-texturas-visibilidade/#sombras-projetadas',
  },
  {
    id: 'cg-exame-2009-q2',
    title: 'Porque não há cinzentos no diagrama CIE',
    source: 'Exame, 2008/09',
    topic: 'cor-visibilidade',
    prompt:
      'Justifique a razão pela qual, no diagrama de cores da CIE, não são normalmente representados níveis de cinzento.',
    answer: {
      kind: 'self',
      checklist: [
        'O diagrama representa cromaticidade, não luminância.',
        'Os cinzentos situam-se no eixo acromático, entre o branco e o preto, onde a cromaticidade é irrelevante.',
        'A posição no diagrama não distingue diferentes tons de cinzento.',
      ],
    },
    solution:
      'Porque o diagrama CIE representa cromaticidade; os cinzentos estão no eixo acromático e o diagrama não os distingue.',
    reasoning:
      'O diagrama CIE xy mostra a cromaticidade (proporções de vermelho, verde e azul) independentemente da intensidade. Todos os tons de cinzento têm a mesma cromaticidade do branco (o ponto de igual energia), variando apenas a luminância, que o diagrama não representa. Por isso aparecem todos sobre o mesmo ponto do eixo acromático e não são normalmente marcados.',
    explanation: '/cadeiras/cg/cor-texturas-visibilidade/#rgb-cmy-e-hsv',
  },
];

export const modelacao: ExamQuestion[] = [
  {
    id: 'cg-exame-2002-q4',
    title: 'União de dois cubos em CSG e fórmula de Euler generalizada',
    source: 'Exame, 2001/02 (1.ª chamada)',
    topic: 'modelacao',
    prompt:
      'Num sistema de modelação sólida baseada em CSG, sejam $B_1$ e $B_2$ duas instanciações de um cubo de aresta unitária centrado na origem, às quais se aplicam respectivamente as transformações $M_1=S(4,10,10)$ e $M_2=T(4,2,0)\\,S(8,4,8)$, em que $S$ é escalamento e $T$ translação. Esboce o sólido resultante $A=B_1\\cup B_2$ e verifique a validade do sólido à luz da fórmula de Euler generalizada.',
    answer: {
      kind: 'self',
      checklist: [
        '$B_1$ é uma caixa $8\\times20\\times20$ centrada na origem; $B_2$ é uma caixa $16\\times8\\times16$ centrada em $(4,2,0)$.',
        'A interseção $B_1\\cap B_2$ é uma caixa $8\\times8\\times16$.',
        'A união é válida: $V-E+F=\\chi(B_1)+\\chi(B_2)-\\chi(B_1\\cap B_2)=2+2-2=2$.',
      ],
    },
    solution:
      '$A$ é a união de duas caixas que se intersetam numa caixa $8\\times8\\times16$; o sólido é válido pois $V-E+F=2$.',
    reasoning:
      'O cubo unitário centrado na origem tem vértices em $(\\pm0{,}5,\\pm0{,}5,\\pm0{,}5)$. Com $S(4,10,10)$, $B_1$ fica com arestas $8\\times20\\times20$ centradas na origem. Com $S(8,4,8)$ seguido de $T(4,2,0)$, $B_2$ fica com arestas $16\\times8\\times16$ centradas em $(4,2,0)$. As duas caixas sobrepõem-se na caixa $x\\in[-4,4]$, $y\\in[-2,6]$, $z\\in[-8,8]$, ou seja, $8\\times8\\times16$. Pela aditividade da característica de Euler, $\\chi(A)=\\chi(B_1)+\\chi(B_2)-\\chi(B_1\\cap B_2)=2+2-2=2$, logo $V-E+F=2$ e o sólido é válido.',
    explanation: '/cadeiras/cg/modelacao-malhas/#fronteira-de-um-sólido',
  },
  {
    id: 'cg-exame-2009-q3',
    title: 'Prismas concêntricos e operações booleanas',
    source: 'Exame, 2008/09',
    topic: 'modelacao',
    prompt:
      'Sejam três prismas quadrangulares concêntricos $A$ (exterior), $B$ (intermédio) e $C$ (interior). Esboce o sólido resultante da sequência de operações booleanas $D=B-C$ e $E=A-D$, e mostre que o sólido obtido é válido à luz da fórmula de Euler.',
    answer: {
      kind: 'self',
      checklist: [
        '$D=B-C$ é a "casca" entre $B$ e $C$; $E=A-D$ é a parte de $A$ fora de $B$ mais o prisma interior $C$.',
        'O sólido resultante é fechado e sem auto-interseções.',
        'Vale a fórmula de Euler $V-E+F=2$, pelo que é válido.',
      ],
    },
    solution:
      '$E=(A-B)\\cup C$: a parte exterior de $A$ até $B$, mais o prisma interior $C$; vale $V-E+F=2$.',
    reasoning:
      'A diferença $D=B-C$ remove o interior de $C$ a $B$, deixando a casca entre os dois prismas. Subtraindo essa casca a $A$, resta a parte de $A$ que está fora de $B$ (a coroa exterior) mais o prisma $C$ que estava dentro da casca. O resultado é um sólido fechado, tipo "caixa com núcleo", sem auto-interseções, pelo que a sua fronteira é uma superfície fechada e $V-E+F=2$.',
    explanation: '/cadeiras/cg/modelacao-malhas/#verificar-a-fronteira',
  },
  {
    id: 'cg-exame-2010-q1',
    title: 'Varrimento espacial na modelação e conversão para B-rep',
    source: 'Exame, 2009/10',
    topic: 'modelacao',
    prompt:
      'Comente a afirmação: "Na modelação 3D, o modelo de varrimento espacial é utilizado, especialmente, como meio de interação no ato de modelar; o produto resultante é normalmente convertido para o modelo de representação pela fronteira (B-rep)".',
    answer: {
      kind: 'self',
      checklist: [
        'Concorda que o varrimento (sweep) é uma forma intuitiva de construir sólidos durante a modelação.',
        'Concorda que o sólido varrido é normalmente convertido para B-rep.',
        'Justifica a conversão: a B-rep é a representação habitual para as operações posteriores sobre a fronteira.',
      ],
    },
    solution:
      'A afirmação é verdadeira: o varrimento espacial serve como técnica de interação na modelação e o resultado converte-se em B-rep.',
    reasoning:
      'O varrimento espacial (sweep) gera um sólido a partir de um perfil 2D e de uma trajetória, o que corresponde naturalmente ao gesto de "extruir" ou "rodar" um perfil, sendo por isso usado como meio de interação. O sólido assim gerado é depois convertido para B-rep, a representação pela fronteira, porque é nesta forma que se fazem as verificações de validade, as operações booleanas e a posterior utilização pelo resto do sistema.',
    explanation: '/cadeiras/cg/modelacao-malhas/#escolher-uma-representação',
  },
];

export const curvas: ExamQuestion[] = [
  {
    id: 'cg-exame-2009-q4',
    title: 'Matriz de base de uma família de curvas cúbicas',
    source: 'Exame, 2008/09',
    topic: 'curvas',
    prompt:
      'A família de curvas de Hermite usa a matriz de base $M_H=\\begin{bmatrix}2&-2&1&1\\\\-3&3&-2&-1\\\\0&0&1&0\\\\1&0&0&0\\end{bmatrix}$ com o vetor geométrico $G_H=[P_1,P_4,R_1,R_4]^T$. Determine a matriz de base $M_X$ de uma nova família de curvas polinomiais de grau 3 cujo vetor geométrico é $G_X=[P_1,R_1,X_4,R_4]^T$, com $X_4=P_4-P_1$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica $M_X=\\begin{bmatrix}0&1&-2&1\\\\0&-2&3&-1\\\\0&1&0&0\\\\1&0&0&0\\end{bmatrix}$.',
        'Verifica que $Q(0)=P_1$ e $Q(1)=P_4$.',
        'Verifica que $Q^{\\prime}(0)=R_1$ e $Q^{\\prime}(1)=R_4$.',
      ],
    },
    solution:
      '$M_X=\\begin{bmatrix}0&1&-2&1\\\\0&-2&3&-1\\\\0&1&0&0\\\\1&0&0&0\\end{bmatrix}$.',
    reasoning:
      'Como $P_4=X_4+P_1$, o vetor de Hermite obtém-se de $G_X$ por $G_H=A\\,G_X$, em que $A$ troca as posições e soma a primeira à segunda linha. Multiplicando, $M_X=M_H\\,A$, o que dá as colunas $[0,0,0,1]^T$ (donde $Q(0)=P_1$), $[1,-2,1,0]^T$ (donde $Q^{\\prime}(0)=R_1$), $[-2,3,0,0]^T$ e $[1,-1,0,0]^T$; somando todas as linhas, $Q(1)=P_1+X_4=P_4$, e a derivada em $t=1$ dá $R_4$. A curva resultante é a própria curva de Hermite, reparametrizada no vetor geométrico.',
    explanation: '/cadeiras/cg/curvas-superficies/#curvas-paramétricas',
  },
  {
    id: 'cg-exame-2002-q5',
    title:
      'Constante dos pontos de controlo intermédios de uma curva de Bézier numa circunferência',
    source: 'Exame, 2001/02 (recurso)',
    topic: 'curvas',
    prompt:
      'Uma circunferência de raio $R$ pode representar-se por quatro segmentos de curvas de Bézier cúbicas. Num quarto de circunferência, os pontos de controlo intermédios $P_1$ e $P_2$ situam-se sobre as tangentes nos extremos, a uma distância $kR$ dos respetivos vértices. Determine a constante $k$ (analiticamente ou por de Casteljau).',
    answer: {
      kind: 'number',
      value: 0.5523,
      tolerance: 0.001,
    },
    solution: '$k=\\dfrac{4(\\sqrt{2}-1)}{3}\\approx 0{,}5523$.',
    reasoning:
      'Para o quarto de circunferência de $(R,0)$ a $(0,R)$, os pontos de controlo são $P_0=(R,0)$, $P_1=(R,kR)$, $P_2=(kR,R)$ e $P_3=(0,R)$. No instante $t=1/2$ a curva deve passar no ponto a $45°$, $(R/\\sqrt2,R/\\sqrt2)$. Como $Q(1/2)=\\frac{1}{8}(P_0+3P_1+3P_2+P_3)$, cada coordenada fica $\\frac{R(4+3k)}{8}$. Igualando a $R/\\sqrt2$: $\\frac{4+3k}{8}=\\frac{1}{\\sqrt2}$, donde $k=\\frac{4(\\sqrt2-1)}{3}\\approx0{,}5523$.',
    explanation: '/cadeiras/cg/curvas-superficies/#polinómios-de-bernstein',
  },
];

export const rasterizacao: ExamQuestion[] = [
  {
    id: 'cg-exame-2002-q6',
    title:
      'Preenchimento de polígono pela lista de pontos de fronteira ordenados',
    source: 'Exame, 2001/02 (1.ª chamada)',
    topic: 'rasterizacao',
    prompt:
      'Seja o polígono definido pela sucessão de vértices $(1,1)$, $(6,2)$, $(6,6)$, a preencher pelo algoritmo da lista de pontos de fronteira ordenados (varrimento por linhas de digitalização). Apresente os passos iniciais do algoritmo e descreva o preenchimento resultante.',
    answer: {
      kind: 'self',
      checklist: [
        'As arestas são $x=5y-4$ (de $(1,1)$ a $(6,2)$), $x=6$ (de $(6,2)$ a $(6,6)$) e $x=y$ (de $(6,6)$ a $(1,1)$).',
        'Na linha $y=2$ as interseções são $x=2$ e $x=6$; preenche-se de $x=2$ a $x=6$.',
        'Nas linhas $y=3,4,5$ preenche-se de $x=y$ a $x=6$; em $y=1$ e $y=6$ só há um ponto.',
      ],
    },
    solution:
      'Preenche-se $(1,1)$; em $y=2$: $x=2..6$; em $y=3$: $x=3..6$; em $y=4$: $x=4..6$; em $y=5$: $x=5..6$; e $(6,6)$.',
    reasoning:
      'O algoritmo calcula, para cada linha de varrimento $y$, as interseções com as arestas e preenche os píxeis entre pares consecutivos de interseções. A aresta de $(1,1)$ a $(6,2)$ dá $x=5y-4$ (só para $y\\in[1,2]$), a aresta vertical dá $x=6$ (para $y\\in[2,6]$) e a diagonal de $(6,6)$ a $(1,1)$ dá $x=y$. Assim, em $y=2$ os pontos de fronteira são $x=2$ e $x=6$; em $y=3,4,5$ são $x=y$ e $x=6$; em $y=1$ e $y=6$ a linha toca o polígono num único vértice.',
    explanation: '/cadeiras/cg/rasterizacao-2d/#regiões-por-varrimento',
  },
  {
    id: 'cg-exame-2016-q7',
    title: 'Preenchimento de região por análise de contorno',
    source: 'Exame, 2015/16 (época normal)',
    topic: 'rasterizacao',
    prompt:
      'Considere o preenchimento de uma região de conetividade 4 segundo a descrição de contorno, pelo algoritmo da lista de pontos de fronteira ordenados. As interseções das arestas com as linhas de varrimento do ecrã resultaram no conjunto de pontos $(3,2)$, $(3,3)$, $(3,4)$, $(8,2)$, $(7,3)$, $(6,4)$. Mencione os passos seguintes do algoritmo, aplicados a este caso, e efetue o preenchimento da área correspondente.',
    answer: {
      kind: 'self',
      checklist: [
        'Em cada linha de varrimento ordena as interseções e agrupa-as em pares consecutivos.',
        'Linha $y=2$: par $(3,8)$, preenche $x=4$ a $x=7$.',
        'Linha $y=3$: par $(3,7)$, preenche $x=4$ a $x=6$; linha $y=4$: par $(3,6)$, preenche $x=4$ a $x=5$.',
      ],
    },
    solution:
      'Em $y=2$ preenche-se $x=4..7$; em $y=3$ preenche-se $x=4..6$; em $y=4$ preenche-se $x=4..5$ (interiores aos pares de fronteira, com conetividade 4).',
    reasoning:
      'Depois de obter as interseções de cada linha de varrimento com o contorno, o algoritmo ordena-as por $x$ e agrupa-as em pares: o interior da região fica entre o 1.º e o 2.º ponto, entre o 3.º e o 4.º, etc. Com conetividade 4, os próprios pontos de fronteira não são incluídos nos pares interiores quando o vizinho já foi tratado, evitando duplicações. Aplicando ao caso: em $y=2$ o par é $(3,8)$, em $y=3$ é $(3,7)$ e em $y=4$ é $(3,6)$, preenchendo-se o interior de cada par.',
    explanation: '/cadeiras/cg/rasterizacao-2d/#regiões-por-varrimento',
  },
];
