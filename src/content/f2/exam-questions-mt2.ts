import type { ExamQuestion } from '../../lib/exam-question';

export const mt2CargaCampo: ExamQuestion[] = [
  {
    id: 'f2-mt2-2015-q1',
    title: 'Carga total dentro de uma esfera equipotencial',
    source: 'Teste 2, 2015/16',
    topic: 'carga-campo',
    prompt:
      'A esfera $E_1$ de equação $x^2+y^2+z^2=9$ é superfície equipotencial de potencial $V_1$ e a esfera $E_2$ de equação $x^2+y^2+z^2=16$ é superfície equipotencial de potencial $V_2$, com $V_1>V_2$. Entre as duas esferas não existe carga. Qual das seguintes afirmações é sempre verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A carga total dentro da esfera $E_1$ é negativa.',
          correct: false,
          explanation:
            'O potencial decresce para fora, logo o campo aponta para fora e o fluxo é positivo.',
        },
        {
          text: 'A esfera $E_1$ é uma esfera condutora.',
          correct: false,
          explanation:
            'As equipotenciais esféricas não implicam que a superfície seja condutora.',
        },
        {
          text: 'Existe uma carga pontual na origem.',
          correct: false,
          explanation:
            'A carga pode estar distribuída; só se conhece o fluxo total.',
        },
        {
          text: 'A carga total dentro da esfera $E_1$ é positiva.',
          correct: true,
          explanation:
            'Como $V_1>V_2$, o campo entre as esferas aponta para fora, logo o fluxo através de $E_1$ é positivo e, pela lei de Gauss, a carga interior é positiva.',
        },
        {
          text: 'A carga total dentro da esfera $E_1$ é nula.',
          correct: false,
          explanation:
            'Se a carga fosse nula, o potencial seria constante entre as esferas.',
        },
      ],
    },
    solution:
      'A carga total dentro de $E_1$ é positiva. Entre as esferas, $\\vec E=-\\mathrm{d}V/\\mathrm{d}r\\,\\hat r$ aponta no sentido de $-\\hat r$ (para fora), porque o potencial decresce de $V_1$ para $V_2$. Assim, o fluxo de $\\vec E$ através de $E_1$ é positivo e, pela lei de Gauss, $Q_{\\mathrm{int}}=\\varepsilon_0\\Phi_E>0$.',
    reasoning:
      'O sinal do campo entre equipotenciais esféricas fica determinado pela derivada do potencial: como $V$ decresce com $r$, $\\vec E$ é radial para fora e a carga interior tem de ser positiva.',
  },
  {
    id: 'f2-mt2-2015-q8',
    title: 'Velocidade de um feixe de eletrões não desviado',
    source: 'Teste 2, 2015/16',
    topic: 'carga-campo',
    prompt:
      'Um feixe de eletrões atravessa uma região onde existem campos elétrico e magnético uniformes e perpendiculares entre si. O módulo do campo elétrico é $3{,}4\\times10^4\\ \\mathrm{V/m}$ e o do campo magnético é $20\\ \\mathrm{G}$. Calcule o módulo da velocidade dos eletrões, sabendo que o feixe não é desviado pelos campos.',
    answer: {
      kind: 'number',
      value: 1.7,
      tolerance: 0.1,
      unit: '10^7 m/s',
    },
    solution: '$v=1{,}7\\times10^7\\ \\mathrm{m/s}$.',
    reasoning:
      'Para o feixe não ser desviado, a força elétrica e a força magnética têm de se anular: $eE=evB$, logo $v=E/B$. Com $B=20\\ \\mathrm{G}=2{,}0\\times10^{-3}\\ \\mathrm{T}$, obtém-se $v=3{,}4\\times10^4/(2{,}0\\times10^{-3})=1{,}7\\times10^7\\ \\mathrm{m/s}$.',
  },
];

export const mt2PotencialCapacidade: ExamQuestion[] = [
  {
    id: 'f2-mt2-2015-q4',
    title: 'Potencial entre duas esferas condutoras concêntricas',
    source: 'Teste 2, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Duas superfícies esféricas condutoras e concêntricas têm raios de $5\\ \\mathrm{cm}$ e $7\\ \\mathrm{cm}$. A superfície menor tem carga total de $6\\ \\mathrm{nC}$ e a superfície maior tem carga total de $3\\ \\mathrm{nC}$. Calcule o potencial num ponto a $6\\ \\mathrm{cm}$ do centro, arbitrando potencial nulo no infinito.',
    answer: {
      kind: 'number',
      value: 1286,
      tolerance: 2,
      unit: 'V',
    },
    solution:
      '$V\\approx1286\\ \\mathrm{V}$ (cerca de $1285\\ \\mathrm{V}$ com $k=8{,}99\\times10^9$).',
    reasoning:
      'O ponto a $6\\ \\mathrm{cm}$ está dentro da esfera exterior, logo esta contribui com o potencial na sua superfície: $k\\cdot3\\ \\mathrm{nC}/0{,}07\\ \\mathrm{m}$. A esfera interior contribui com $k\\cdot6\\ \\mathrm{nC}/0{,}06\\ \\mathrm{m}$. Com $k=9\\times10^9\\ \\mathrm{N\\,m^2/C^2}$: $V=9\\times10^9(6\\times10^{-9}/0{,}06+3\\times10^{-9}/0{,}07)=900+386=1286\\ \\mathrm{V}$.',
  },
  {
    id: 'f2-mt2-2015-q11',
    title: 'Carga pontual a partir do potencial num ponto',
    source: 'Teste 2, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Uma carga pontual no ponto $(x,y,z)=(4,5,3)$ (distâncias em cm) produz um potencial de $6\\ \\mathrm{kV}$ no ponto $(x,y,z)=(3,7,4)$, arbitrando potencial nulo no infinito. Calcule o valor da carga, em nC.',
    answer: {
      kind: 'number',
      value: 16.33,
      tolerance: 0.05,
      unit: 'nC',
    },
    solution: '$q\\approx16{,}33\\ \\mathrm{nC}$.',
    reasoning:
      'A distância entre os pontos é $r=\\sqrt{(4-3)^2+(5-7)^2+(3-4)^2}=\\sqrt6\\ \\mathrm{cm}\\approx2{,}449\\ \\mathrm{cm}$. De $V=kq/r$ vem $q=Vr/k=(6000\\times0{,}02449)/(8{,}99\\times10^9)\\approx1{,}633\\times10^{-8}\\ \\mathrm{C}=16{,}33\\ \\mathrm{nC}$.',
  },
  {
    id: 'f2-mt2-2015-q17',
    title: 'Diferença de potencial num campo elétrico não uniforme',
    source: 'Teste 2, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Numa região do espaço, o campo elétrico é $\\vec E=6x^2\\,\\hat\\imath$ (unidades SI). Calcule a diferença de potencial $V(2)-V(1)$ entre os pontos $x=2\\ \\mathrm{m}$ e $x=1\\ \\mathrm{m}$ sobre o eixo dos $x$.',
    answer: {
      kind: 'number',
      value: -14,
      tolerance: 0,
      unit: 'V',
    },
    solution: '$V(2)-V(1)=-14\\ \\mathrm{V}$.',
    reasoning:
      '$V(b)-V(a)=-\\int_a^b\\vec E\\cdot\\mathrm{d}\\vec r=-\\int_1^2 6x^2\\,\\mathrm{d}x=-[2x^3]_1^2=-(16-2)=-14\\ \\mathrm{V}$.',
  },
];

export const mt2MagnetismoInducao: ExamQuestion[] = [
  {
    id: 'f2-mt2-2015-q2',
    title: 'Binário magnético numa espira triangular',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'O campo magnético numa região do espaço é $\\vec B=2\\,\\hat\\imath+3\\,\\hat\\jmath+5\\,\\hat k$ (unidades SI). Determine o módulo do binário magnético numa espira triangular com vértices na origem, em $(3{,}2,0,0)$ e em $(0,4{,}8,0)$ (unidades SI), percorrida por uma corrente de $1\\ \\mathrm{A}$.',
    answer: {
      kind: 'number',
      value: 27.7,
      tolerance: 0.1,
      unit: 'N·m',
    },
    solution: '$|\\vec\\tau|\\approx27{,}7\\ \\mathrm{N\\cdot m}$.',
    reasoning:
      'A área do triângulo é $A=\\frac12\\cdot3{,}2\\cdot4{,}8=7{,}68\\ \\mathrm{m^2}$, com normal $\\hat k$. O momento magnético é $\\vec m=IA\\,\\hat k=7{,}68\\,\\hat k\\ \\mathrm{A\\cdot m^2}$. O binário é $\\vec\\tau=\\vec m\\times\\vec B=7{,}68\\,\\hat k\\times(2\\hat\\imath+3\\hat\\jmath+5\\hat k)=7{,}68(2\\hat\\jmath-3\\hat\\imath)$, cujo módulo é $7{,}68\\sqrt{2^2+3^2}=7{,}68\\sqrt{13}\\approx27{,}7\\ \\mathrm{N\\cdot m}$.',
  },
  {
    id: 'f2-mt2-2015-q3',
    title: 'Fluxo magnético através de uma bobina',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'Uma bobina com $200$ espiras quadradas de aresta $6\\ \\mathrm{cm}$ encontra-se numa região com campo magnético uniforme de módulo $0{,}15\\ \\mathrm{T}$, perpendicular ao plano das espiras. Calcule o fluxo magnético através da bobina.',
    answer: {
      kind: 'number',
      value: 0.108,
      tolerance: 0.001,
      unit: 'T·m²',
    },
    solution:
      '$\\Phi_B=0{,}108\\ \\mathrm{T\\cdot m^2}=108\\ \\mathrm{mT\\cdot m^2}$.',
    reasoning:
      '$\\Phi_B= NBA\\cos\\theta=200\\times0{,}15\\times(0{,}06)^2\\times1=200\\times0{,}15\\times0{,}0036=0{,}108\\ \\mathrm{Wb}$.',
  },
  {
    id: 'f2-mt2-2015-q9',
    title: 'Força eletromotriz média induzida numa bobina',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'Uma bobina de indutância $4{,}2\\ \\mathrm{mH}$ é ligada a uma fonte ideal de $1{,}5\\ \\mathrm{V}$. Após $4{,}5\\ \\mathrm{s}$, a corrente na bobina é $2{,}8\\ \\mathrm{mA}$. Calcule o valor absoluto da força eletromotriz média induzida na bobina durante esse intervalo.',
    answer: {
      kind: 'number',
      value: 2.61,
      tolerance: 0.01,
      unit: 'µV',
    },
    solution:
      '$|\\varepsilon_{\\mathrm{m\\acute edia}}|\\approx2{,}61\\ \\mathrm{\\mu V}$.',
    reasoning:
      'Pela lei de Faraday, $|\\varepsilon|=L\\,\\dfrac{\\Delta I}{\\Delta t}=4{,}2\\times10^{-3}\\times\\dfrac{2{,}8\\times10^{-3}}{4{,}5}=2{,}61\\times10^{-6}\\ \\mathrm{V}=2{,}61\\ \\mathrm{\\mu V}$. A f.e.m. da fonte não entra no cálculo da f.e.m. induzida.',
  },
  {
    id: 'f2-mt2-2015-q14',
    title: 'Campo elétrico induzido num referencial em movimento',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'O campo magnético produzido por um fio retilíneo com corrente $I$ é $\\vec B=-\\dfrac{2k_mIx}{z^2+x^2}\\,\\hat k+\\dfrac{2k_mIz}{z^2+x^2}\\,\\hat\\imath$, em que $k_m=\\mu_0/(4\\pi)$. Calcule o campo elétrico induzido num referencial que se desloca com velocidade $\\vec v=v\\,\\hat\\imath$ em relação ao fio.',
    answer: {
      kind: 'self',
      checklist: [
        "A resposta usa a transformação $\\vec E'=\\vec v\\times\\vec B$ num referencial em movimento.",
        "A resposta indica $\\vec E'=\\dfrac{2k_mIvx}{z^2+x^2}\\,\\hat\\jmath$.",
      ],
    },
    solution:
      "$\\vec E'=\\vec v\\times\\vec B=\\dfrac{2k_mIvx}{z^2+x^2}\\,\\hat\\jmath$.",
    reasoning:
      "No referencial do fio não há campo elétrico, logo no referencial que se desloca com $\\vec v$ o campo elétrico é $\\vec E'=\\vec v\\times\\vec B$. Como $\\hat\\imath\\times\\hat k=-\\hat\\jmath$ e $\\hat\\imath\\times\\hat\\imath=0$, apenas a componente $B_z$ contribui: $\\vec E'=v\\hat\\imath\\times\\left(-\\dfrac{2k_mIx}{z^2+x^2}\\hat k\\right)=\\dfrac{2k_mIvx}{z^2+x^2}\\hat\\jmath$.",
  },
  {
    id: 'f2-mt2-2015-q15',
    title: 'Propriedade dos pontos de equilíbrio de um campo magnético',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'Qual das seguintes afirmações sobre um campo magnético é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'É um campo conservativo.',
          correct: false,
          explanation:
            'Em geral $\\nabla\\times\\vec B\\neq0$ onde há corrente, logo não é conservativo.',
        },
        {
          text: 'Os seus pontos de equilíbrio podem ser centros.',
          correct: true,
          explanation:
            'Um ponto onde $\\vec B=0$ pode ser um centro, com linhas de campo fechadas à sua volta; isto não acontece com o campo elétrico em regiões sem carga.',
        },
        {
          text: 'Pode ter pontos de equilíbrio atrativos.',
          correct: false,
          explanation:
            'Um ponto de equilíbrio atrativo implicaria convergência das linhas de campo, impossível porque $\\nabla\\cdot\\vec B=0$.',
        },
        {
          text: 'As suas linhas de campo são sempre curvas; nunca podem ser retas.',
          correct: false,
          explanation:
            'Perto de um fio retilíneo longo, por exemplo, as linhas de campo são circunferências, mas noutras geometrias podem ser retas.',
        },
        {
          text: 'Os seus pontos de equilíbrio podem ser focos.',
          correct: false,
          explanation:
            'Um foco implicaria divergência das linhas de campo, excluída por $\\nabla\\cdot\\vec B=0$.',
        },
      ],
    },
    solution:
      'Os pontos de equilíbrio de um campo magnético podem ser centros.',
    reasoning:
      'Como $\\nabla\\cdot\\vec B=0$, as linhas de campo magnético não podem começar nem acabar num ponto: não pode haver focos nem atrativos. Podem, no entanto, anular-se num ponto rodeado por linhas fechadas, ou seja, um centro.',
  },
  {
    id: 'f2-mt2-2015-q20',
    title: 'Direção da força magnética sobre uma carga negativa',
    source: 'Teste 2, 2015/16',
    topic: 'magnetismo-inducao',
    prompt:
      'Uma partícula com carga negativa desloca-se no sentido positivo do eixo dos $x$, numa região onde o campo elétrico é nulo e existe um campo magnético uniforme no sentido negativo do eixo dos $y$. Em que direção e sentido aponta a força magnética sobre a partícula?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Sentido positivo do eixo dos z.',
          correct: true,
          explanation:
            'Com $q<0$, $\\vec F=q\\vec v\\times\\vec B$ inverte o sentido de $\\vec v\\times\\vec B$.',
        },
        {
          text: 'Sentido negativo do eixo dos x.',
          correct: false,
          explanation: 'A força magnética é sempre perpendicular à velocidade.',
        },
        {
          text: 'Sentido positivo do eixo dos x.',
          correct: false,
          explanation: 'A força magnética é sempre perpendicular à velocidade.',
        },
        {
          text: 'Sentido negativo do eixo dos z.',
          correct: false,
          explanation:
            'O sinal da carga inverte o resultado de $\\vec v\\times\\vec B$.',
        },
        {
          text: 'Sentido negativo do eixo dos y.',
          correct: false,
          explanation: 'A força magnética é perpendicular ao campo magnético.',
        },
      ],
    },
    solution: 'A força aponta no sentido positivo do eixo dos $z$.',
    reasoning:
      '$\\vec v=v\\hat\\imath$ e $\\vec B=-B\\hat\\jmath$, logo $\\vec v\\times\\vec B=v\\hat\\imath\\times(-B\\hat\\jmath)=-vB\\hat k$. Como a carga é negativa, $\\vec F=q(\\vec v\\times\\vec B)=(-|q|)(-vB\\hat k)=|q|vB\\hat k$, ou seja, no sentido positivo de $z$.',
  },
];

export const mt2CircuitosReativos: ExamQuestion[] = [
  {
    id: 'f2-mt2-2015-q10',
    title: 'Corrente num circuito RC durante o transitório',
    source: 'Teste 2, 2015/16',
    topic: 'circuitos-reativos',
    prompt:
      'A tensão da fonte num circuito série RC é $V_e=400e^{-2t}$ (unidades SI) em $t>0$ e nula em $t\\le0$, e a capacidade do condensador é $C=2\\ \\mu\\mathrm{F}$. O condensador encontrava-se descarregado em $t=0$. Determine a expressão da corrente no circuito em $t>0$ (unidades SI).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa $i=C\\,\\mathrm{d}V_e/\\mathrm{d}t$.',
        'A resposta indica $i(t)=-1{,}6\\times10^{-3}e^{-2t}\\ \\mathrm{A}$ (módulo $0{,}0016e^{-2t}$ A no sentido de descarga).',
      ],
    },
    solution:
      '$i(t)=C\\dfrac{\\mathrm{d}V_e}{\\mathrm{d}t}=2\\times10^{-6}\\times(-800e^{-2t})=-1{,}6\\times10^{-3}e^{-2t}\\ \\mathrm{A}$.',
    reasoning:
      'Num condensador, a corrente é $i=C\\,\\mathrm{d}V/\\mathrm{d}t$. Derivando a tensão da fonte, $\\mathrm{d}V_e/\\mathrm{d}t=-800e^{-2t}$, logo $i=-1{,}6\\times10^{-3}e^{-2t}\\ \\mathrm{A}$. O sinal negativo indica que a corrente descarrega o condensador no sentido oposto ao de carga.',
  },
  {
    id: 'f2-mt2-2015-q19',
    title: 'Tensão no indutor em regime permanente',
    source: 'Teste 2, 2015/16',
    topic: 'circuitos-reativos',
    prompt:
      'Um indutor de $3{,}6\\ \\mathrm{H}$ e uma resistência de $2{,}0\\ \\mathrm{k\\Omega}$ ligam-se em série a uma fonte ideal com f.e.m. de $6\\ \\mathrm{V}$. Calcule a diferença de potencial no indutor no instante final, após a fonte ter estado ligada muito tempo.',
    answer: {
      kind: 'number',
      value: 0,
      tolerance: 0,
      unit: 'V',
    },
    solution: '$V_L=0\\ \\mathrm{V}$.',
    reasoning:
      'Em regime permanente, a corrente é constante ($I=6\\ \\mathrm{V}/2{,}0\\ \\mathrm{k\\Omega}=3\\ \\mathrm{mA}$) e a tensão no indutor é $V_L=L\\,\\mathrm{d}I/\\mathrm{d}t=0$. Toda a tensão da fonte fica na resistência.',
  },
];
