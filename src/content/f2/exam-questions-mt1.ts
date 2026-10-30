import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  coulomb: '/cadeiras/f2/carga-campo/#lei-de-coulomb',
  gauss: '/cadeiras/f2/equacoes-maxwell/#lei-de-gauss',
  potencial: '/cadeiras/f2/potencial-capacidade/#potencial-e-energia',
  capacidade: '/cadeiras/f2/potencial-capacidade/#capacidade',
  associacoes: '/cadeiras/f2/potencial-capacidade/#associações-e-energia',
  kir: '/cadeiras/f2/circuitos-resistivos/#leis-de-kirchhoff',
  potenciaMax: '/cadeiras/f2/circuitos-resistivos/#potência-máxima',
  rc: '/cadeiras/f2/circuitos-reativos/#transitório-rc',
  deriva: '/cadeiras/f2/conducao-eletrica/#corrente-e-deriva',
};

export const mt1CampoEletrico: ExamQuestion[] = [
  {
    id: 'f2-mt1-2021-q2',
    title: 'Campo de um fio infinito carregado',
    source: 'Teste 1, 2021/22',
    topic: 'campo-eletrico',
    prompt:
      'Um fio retilíneo, muito comprido, com carga linear de $6\\ \\mu\\mathrm{C/m}$, encontra-se sobre o eixo dos $z$. Calcule o módulo do campo elétrico no ponto $P$ de coordenadas $(x,y,z)=(1,9,12)$ m.',
    answer: { kind: 'number', value: 11.9, tolerance: 0.1, unit: 'kN/C' },
    solution: '$|\\vec E|\\approx 11{,}9\\ \\mathrm{kN/C}$.',
    reasoning:
      'Para um fio infinito, $E=\\frac{2k\\lambda}{r}$, com $r=\\sqrt{1^2+9^2}=\\sqrt{82}\\approx 9{,}06$ m. Assim, $E=\\frac{2\\cdot 8{,}99\\times10^9\\cdot 6\\times10^{-6}}{9{,}06}\\approx 1{,}19\\times10^4\\ \\mathrm{N/C}=11{,}9\\ \\mathrm{kN/C}$.',
    explanation: link.gauss,
  },
  {
    id: 'f2-mt1-2021-q7',
    title: 'Carga desconhecida com potencial nulo',
    source: 'Teste 1, 2021/22',
    topic: 'campo-eletrico',
    prompt:
      'Duas cargas pontuais estão sobre o eixo dos $x$: uma carga de $+2$ nC em $x=-2$ cm e outra de valor desconhecido em $x=1$ cm. Arbitrando potencial nulo no infinito e sabendo que o potencial é também nulo no ponto $x=-1$ cm, calcule o valor da segunda carga.',
    answer: { kind: 'number', value: -4, tolerance: 0, unit: 'nC' },
    solution: '$q_2=-4\\ \\mathrm{nC}$.',
    reasoning:
      'O potencial no ponto $x=-1$ cm é $V=k\\left(\\frac{2\\ \\mathrm{nC}}{1\\ \\mathrm{cm}}+\\frac{q_2}{2\\ \\mathrm{cm}}\\right)=0$, logo $q_2=-4$ nC.',
    explanation: link.potencial,
  },
  {
    id: 'f2-mt1-2021-q9',
    title: 'Campo de duas cargas no eixo dos x',
    source: 'Teste 1, 2021/22',
    topic: 'campo-eletrico',
    prompt:
      'Uma carga de $4\\ \\mu\\mathrm{C}$ está em $x=-1{,}0$ m e outra de $-2\\ \\mu\\mathrm{C}$ na origem. Calcule o módulo do campo elétrico no ponto $x=1{,}0$ m do eixo dos $x$.',
    answer: {
      kind: 'number',
      value: 8.99,
      tolerance: 0.01,
      unit: 'mN/µC',
    },
    solution:
      '$|\\vec E|=8{,}99\\ \\mathrm{mN/\\mu C}=8{,}99\\times10^3\\ \\mathrm{N/C}$.',
    reasoning:
      'A carga de $4\\ \\mu\\mathrm{C}$ produz em $x=1$ m um campo de $\\frac{k\\cdot4\\times10^{-6}}{2^2}=8{,}99\\times10^3$ N/C no sentido $+x$; a carga de $-2\\ \\mu\\mathrm{C}$ produz $\\frac{k\\cdot2\\times10^{-6}}{1^2}=1{,}798\\times10^4$ N/C no sentido $-x$. O módulo do campo resultante é $|1{,}798\\times10^4-8{,}99\\times10^3|=8{,}99\\times10^3$ N/C.',
    explanation: link.coulomb,
  },
  {
    id: 'f2-mt1-2015-q10',
    title: 'Campo de dois planos carregados',
    source: 'Teste 1, 2015/16',
    topic: 'campo-eletrico',
    prompt:
      'Existe carga distribuída uniformemente em todo o plano $xy$, com carga superficial de $3{,}5$ nC/m², e uniformemente em todo o plano $xz$, com carga superficial de $4$ nC/m². Determine o módulo do campo elétrico no ponto $(x,y,z)=(1,1,1)$ m.',
    answer: { kind: 'number', value: 300, tolerance: 1, unit: 'N/C' },
    solution: '$|\\vec E|\\approx 300\\ \\mathrm{N/C}$.',
    reasoning:
      'Um plano infinito com carga superficial $\\sigma$ produz um campo de módulo $\\sigma/(2\\varepsilon_0)$, perpendicular ao plano. As componentes devidas aos dois planos são $E_z=3{,}5\\times10^{-9}/(2\\varepsilon_0)\\approx 198$ N/C e $E_y=4\\times10^{-9}/(2\\varepsilon_0)\\approx 226$ N/C. O módulo do campo resultante é $\\sqrt{198^2+226^2}\\approx 300$ N/C.',
    explanation: link.gauss,
  },
  {
    id: 'f2-mt1-2021-q18',
    title: 'Fluxo através de um quadrado num campo uniforme',
    source: 'Teste 1, 2021/22',
    topic: 'campo-eletrico',
    prompt:
      'Um quadrado com $1$ cm de lado encontra-se numa região onde existe um campo elétrico uniforme de módulo $6$ kN/C, numa direção que faz um ângulo de $60°$ com o plano do quadrado. Calcule o valor absoluto do fluxo elétrico através do quadrado.',
    answer: {
      kind: 'number',
      value: 0.3,
      tolerance: 0.001,
      unit: 'N·m²/C',
    },
    solution: '$|\\Phi|=0{,}3\\ \\mathrm{N\\cdot m^2/C}$.',
    reasoning:
      '$\\Phi=\\vec E\\cdot\\vec A=EA\\cos\\theta=6\\times10^3\\cdot(10^{-2})^2\\cdot\\cos 60°=6\\times10^3\\cdot10^{-4}\\cdot0{,}5=0{,}3\\ \\mathrm{N\\cdot m^2/C}$.',
    explanation: link.gauss,
  },
];

export const mt1PotencialCapacidade: ExamQuestion[] = [
  {
    id: 'f2-mt1-2015-q6',
    title: 'Capacidade equivalente de uma associação mista',
    source: 'Teste 1, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Calcule a capacidade equivalente entre os pontos $A$ e $B$, sabendo que $C_1=2$ nF e $C_2=4$ nF estão em paralelo, esse conjunto em série com $C_4=6$ nF, e $C_3=8$ nF em paralelo com todo esse ramo.',
    answer: { kind: 'number', value: 11, tolerance: 0, unit: 'nF' },
    solution: '$C_{eq}=11{,}0\\ \\mathrm{nF}$.',
    reasoning:
      'Em paralelo, $C_{12}=C_1+C_2=6$ nF. Em série com $C_4$, $C_s=\\frac{6\\cdot6}{6+6}=3$ nF. Em paralelo com $C_3$, $C_{eq}=C_3+C_s=8+3=11$ nF.',
    explanation: link.associacoes,
  },
  {
    id: 'f2-mt1-2015-q9',
    title: 'Carga armazenada num condensador plano',
    source: 'Teste 1, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Num condensador, sem dielétrico, de placas paralelas quadradas com $15{,}0$ cm de lado, a distância entre as placas é $0{,}2$ mm. Se o condensador é carregado até uma diferença de potencial de $15$ V, determine a carga armazenada.',
    answer: { kind: 'number', value: 14.9, tolerance: 0.1, unit: 'nC' },
    solution: '$Q\\approx 14{,}9\\ \\mathrm{nC}$.',
    reasoning:
      '$C=\\varepsilon_0\\frac{A}{d}=8{,}854\\times10^{-12}\\cdot\\frac{(0{,}15)^2}{2\\times10^{-4}}\\approx 0{,}996$ nF e $Q=CV\\approx 0{,}996\\times10^{-9}\\cdot15\\approx 14{,}9\\times10^{-9}$ C.',
    explanation: link.capacidade,
  },
  {
    id: 'f2-mt1-2021-q8',
    title: 'Diferença de potencial em condensadores em série',
    source: 'Teste 1, 2021/22',
    topic: 'potencial-capacidade',
    prompt:
      'Dois condensadores com capacidades $5\\ \\mu\\mathrm{F}$ e $10\\ \\mu\\mathrm{F}$ são ligados em série a uma fonte de $30$ V. Calcule a diferença de potencial no condensador de $5\\ \\mu\\mathrm{F}$.',
    answer: { kind: 'number', value: 20, tolerance: 0, unit: 'V' },
    solution: '$V_5=20\\ \\mathrm{V}$.',
    reasoning:
      'Em série, a carga é comum: $Q=C_{eq}V=\\frac{5\\cdot10}{5+10}\\ \\mu\\mathrm{F}\\cdot30\\ \\mathrm{V}=100\\ \\mu\\mathrm{C}$. A ddp no condensador de $5\\ \\mu\\mathrm{F}$ é $V_5=Q/C_5=100/5=20$ V.',
    explanation: link.associacoes,
  },
  {
    id: 'f2-mt1-2015-q15',
    title: 'Rigidez dielétrica de um condensador',
    source: 'Teste 1, 2015/16',
    topic: 'potencial-capacidade',
    prompt:
      'Um condensador plano, de placas paralelas com área de $9\\times10^{-4}$ m² e capacidade de $3{,}5$ nF, está preenchido com um dielétrico de constante dielétrica $3{,}7$. Sabendo que a voltagem máxima que o condensador suporta é $200$ V, determine a rigidez dielétrica do dielétrico.',
    answer: { kind: 'number', value: 23.8, tolerance: 0.2, unit: 'MV/m' },
    solution: '$E_{max}\\approx 23{,}8\\ \\mathrm{MV/m}$.',
    reasoning:
      'De $C=\\kappa\\varepsilon_0 A/d$ vem $d=\\frac{3{,}7\\cdot8{,}854\\times10^{-12}\\cdot9\\times10^{-4}}{3{,}5\\times10^{-9}}\\approx 8{,}4\\times10^{-6}$ m. A rigidez dielétrica é $E_{max}=V_{max}/d=200/(8{,}4\\times10^{-6})\\approx 2{,}38\\times10^7$ V/m $=23{,}8$ MV/m.',
    explanation: link.capacidade,
  },
  {
    id: 'f2-mt1-2021-q20',
    title: 'Energia armazenada ao reduzir a carga',
    source: 'Teste 1, 2021/22',
    topic: 'potencial-capacidade',
    prompt:
      'Num condensador isolado e carregado com carga $Q$, a energia eletrostática armazenada é $U$. Se $Q$ for diminuída até $Q/2$, a energia passa a ser:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$4U$',
          correct: false,
          explanation: 'A energia não aumenta ao reduzir a carga.',
        },
        {
          text: '$2U$',
          correct: false,
          explanation: 'Esquece que a energia depende do quadrado da carga.',
        },
        {
          text: '$U/2$',
          correct: false,
          explanation: 'Confunde a proporcionalidade com a quadrática.',
        },
        {
          text: '$U/4$',
          correct: true,
          explanation: "$U=Q^2/(2C)$; com $Q/2$, $U'=(Q/2)^2/(2C)=U/4$.",
        },
        {
          text: 'a mesma $U$',
          correct: false,
          explanation: 'A energia armazenada muda com a carga.',
        },
      ],
    },
    solution: "$U'=U/4$.",
    reasoning:
      "A energia armazenada num condensador é $U=\\frac{Q^2}{2C}$. Reduzindo a carga a metade, $U'=\\frac{(Q/2)^2}{2C}=\\frac{Q^2}{8C}=\\frac{U}{4}$.",
    explanation: link.associacoes,
  },
];

export const mt1CircuitosResistivos: ExamQuestion[] = [
  {
    id: 'f2-mt1-2021-q17',
    title: 'Potência dissipada ao triplicar a corrente',
    source: 'Teste 1, 2021/22',
    topic: 'circuitos-resistivos',
    prompt:
      'Quando a intensidade da corrente numa resistência é $I$, a potência dissipada é $P$. Que potência dissipa a mesma resistência quando a intensidade da corrente muda para $3I$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$P$',
          correct: false,
          explanation: 'A potência não fica igual.',
        },
        {
          text: '$3P$',
          correct: false,
          explanation: 'A potência depende do quadrado da corrente.',
        },
        {
          text: '$P/3$',
          correct: false,
          explanation: 'A potência aumenta com a corrente.',
        },
        {
          text: '$9P$',
          correct: true,
          explanation: "$P=RI^2$; com $3I$, $P'=R(3I)^2=9RI^2=9P$.",
        },
        {
          text: '$P/9$',
          correct: false,
          explanation: 'O fator é $3^2=9$, não $1/9$.',
        },
      ],
    },
    solution: "$P'=9P$.",
    reasoning:
      "Pela lei de Joule, $P=RI^2$. Triplicando a corrente, $P'=R(3I)^2=9RI^2=9P$.",
    explanation: link.potenciaMax,
  },
  {
    id: 'f2-mt1-2015-q7',
    title: 'Potência máxima de duas resistências em série',
    source: 'Teste 1, 2015/16',
    topic: 'circuitos-resistivos',
    prompt:
      'Duas resistências de $18{,}0$ kΩ e $22{,}5$ kΩ suportam, cada uma, potência máxima de $0{,}5$ W sem se queimar. Determine a potência máxima que o sistema dessas duas resistências suporta quando ligadas em série.',
    answer: { kind: 'number', value: 0.9, tolerance: 0.01, unit: 'W' },
    solution: '$P_{max}\\approx 0{,}9\\ \\mathrm{W}$.',
    reasoning:
      'Em série a corrente é comum. O limite é o da resistência de $22{,}5$ kΩ: $I_{max}=\\sqrt{0{,}5/22500}\\approx 4{,}71$ mA (nesse limite a de $18$ kΩ dissipa apenas $0{,}4$ W). A potência total máxima é $P_{max}=I_{max}^2(18000+22500)\\approx 0{,}9$ W.',
    explanation: link.potenciaMax,
  },
  {
    id: 'f2-mt1-2015-q8',
    title: 'Corrente num ramo por divisor de corrente',
    source: 'Teste 1, 2015/16',
    topic: 'circuitos-resistivos',
    prompt:
      'No circuito, a resistência de $8$ kΩ está em série com o paralelo de $3$ kΩ e $5$ kΩ. Sabendo que a corrente através da resistência de $8$ kΩ é $4$ mA, calcule a corrente na resistência de $5$ kΩ.',
    answer: { kind: 'number', value: 1.5, tolerance: 0, unit: 'mA' },
    solution: '$I_{5k}=1{,}5\\ \\mathrm{mA}$.',
    reasoning:
      'A corrente de $4$ mA que chega ao paralelo divide-se entre $3$ kΩ e $5$ kΩ. Pelo divisor de corrente, a resistência de $5$ kΩ recebe $I_{5k}=4\\cdot\\frac{3}{3+5}=1{,}5$ mA.',
    explanation: link.kir,
  },
  {
    id: 'f2-mt1-2015-q14',
    title: 'Ddp numa resistência em regime permanente',
    source: 'Teste 1, 2015/16',
    topic: 'circuitos-resistivos',
    prompt:
      'Uma fonte de $12$ V alimenta a associação em que a resistência de $6$ kΩ está em paralelo com o ramo série de $4$ kΩ e $2$ kΩ. Um condensador de $3\\ \\mu\\mathrm{F}$, inicialmente descarregado, está ligado em paralelo com a resistência de $4$ kΩ. Calcule a diferença de potencial na resistência de $4$ kΩ muito tempo depois de o interruptor ter sido fechado.',
    answer: { kind: 'number', value: 8, tolerance: 0, unit: 'V' },
    solution: '$V_{4k}=8\\ \\mathrm{V}$.',
    reasoning:
      'Muito tempo depois de fechar o interruptor, o condensador está totalmente carregado e não passa corrente por ele, mas a corrente continua a percorrer as resistências. A ddp no ramo série de $4$ kΩ e $2$ kΩ é $12$ V, pelo que $V_{4k}=12\\cdot\\frac{4}{4+2}=8$ V.',
    explanation: link.rc,
  },
];

export const mt1Conducao: ExamQuestion[] = [
  {
    id: 'f2-mt1-2015-q11',
    title: 'Carga transportada por uma corrente variável',
    source: 'Teste 1, 2015/16',
    topic: 'conducao',
    prompt:
      'Se a corrente num fio varia segundo $I=1+7t^4$, com $I$ em amperes e $t$ em segundos, calcule a carga, em coulombs, que atravessa a secção transversal do fio entre $t=3$ s e $t=5$ s.',
    answer: { kind: 'number', value: 4036.8, tolerance: 0.1, unit: 'C' },
    solution: '$Q=4036{,}8\\ \\mathrm{C}$.',
    reasoning:
      '$Q=\\int_3^5 I\\,dt=\\int_3^5(1+7t^4)\\,dt=\\left[t+\\frac{7t^5}{5}\\right]_3^5=\\left(5+\\frac{7\\cdot3125}{5}\\right)-\\left(3+\\frac{7\\cdot243}{5}\\right)=4380-343{,}2=4036{,}8$ C.',
    explanation: link.deriva,
  },
  {
    id: 'f2-mt1-2021-q3',
    title: 'Grandeza medida em A·V·h',
    source: 'Teste 1, 2021/22',
    topic: 'conducao',
    prompt:
      'As unidades A·V·h (ampere vezes volt vezes hora) podem ser usadas para medir:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Potência',
          correct: false,
          explanation: 'A·V é potência, mas A·V·h já inclui o tempo.',
        },
        {
          text: 'Corrente',
          correct: false,
          explanation: 'A corrente mede-se em amperes.',
        },
        {
          text: 'Voltagem',
          correct: false,
          explanation: 'A voltagem mede-se em volts.',
        },
        {
          text: 'Energia',
          correct: true,
          explanation: 'A·V = W e W·h é energia: 1 W·h = 3600 J.',
        },
        {
          text: 'Carga',
          correct: false,
          explanation: 'A carga mede-se em coulombs (A·s).',
        },
      ],
    },
    solution: 'Energia.',
    reasoning:
      'O produto $\\mathrm{A\\cdot V}$ é potência (watt). Multiplicando pelo tempo em horas obtém-se energia: $1\\ \\mathrm{W\\cdot h}=3600\\ \\mathrm{J}$.',
    explanation: link.deriva,
  },
];
