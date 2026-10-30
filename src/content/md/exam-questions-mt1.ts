import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  traducao: '/cadeiras/md/quantificadores/#domínio-e-tradução',
  validade:
    '/cadeiras/md/semantica-primeira-ordem/#validade-satisfazibilidade-e-modelos',
  prenexa: '/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa',
  substituicao: '/cadeiras/md/quantificadores/#substituição-sem-captura',
  consequence:
    '/cadeiras/md/logica-proposicional/#consequência-e-contraexemplos',
  formas: '/cadeiras/md/logica-proposicional/#formas-normais',
  completas:
    '/cadeiras/md/logica-proposicional/#conjuntos-completos-de-conetivas',
  regras: '/cadeiras/md/provas-proposicionais/#regras-básicas',
  casos: '/cadeiras/md/provas-proposicionais/#provar-por-casos',
  contradicao: '/cadeiras/md/provas-proposicionais/#negação-e-contradição',
};

export const mt1TraducaoFol: ExamQuestion[] = [
  {
    id: 'md-mt1-2019-q1',
    title: 'Traduzir a história das duas lojas para lógica de primeira ordem',
    source: 'Teste 1, 2019/20',
    topic: 'fol-traducao',
    prompt:
      'O José e o Pedro são irmãos. Em 2008 o José emigrou para Paris e aí abriu, nesse ano, uma loja chamada "pérola do Eliseu". Em 2011 o Pedro abriu uma loja em Lisboa, que se chama "pérola do Chiado". O vinho do Porto é o artigo mais vendido em ambas as lojas. Quando o José vende mais do que 300 garrafas de vinho do Porto, o Pedro envia-lhe o stock disponível de vinho do Porto e, em troca, recebe do José o stock disponível de vinho da Madeira.\n\nDefina uma linguagem de lógica de primeira ordem adequada para representar a situação, indicando as constantes, os predicados e as funções (com o significado de cada um), e traduza para essa linguagem todas as frases acima.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta define constantes, predicados e funções com significado descrito.',
        'A resposta traduz corretamente a frase condicional sobre o envio de stock.',
        'A resposta traduz o facto de o vinho do Porto ser o mais vendido nas duas lojas.',
      ],
    },
    solution:
      'Constantes: jose, pedro, paris, lisboa, 2008, 2011, 300, peroladoeliseu, peroladochiado, vinhodoporto, vinhodamadeira. Função: maisvendido(x), o artigo mais vendido na loja x. Predicados: Irmao(x,y), Emigrou(x,y,t), AbriuLoja(x,y,z,t), VendeMaisQue(x,y,z), EnviaStock(x,y,z), e a igualdade.\n\nTraduções: Irmao(jose, pedro); Emigrou(jose, paris, 2008); AbriuLoja(jose, peroladoeliseu, paris, 2008); AbriuLoja(pedro, peroladochiado, lisboa, 2011); maisvendido(peroladoeliseu) = vinhodoporto ∧ maisvendido(peroladochiado) = vinhodoporto; VendeMaisQue(jose, 300, vinhodoporto) → (EnviaStock(pedro, jose, vinhodoporto) ∧ EnviaStock(jose, pedro, vinhodamadeira)).',
    reasoning:
      'Cada facto da narrativa corresponde a uma fórmula atómica ou a uma conjunção/implicação de fórmulas atómicas. A frase condicional exige uma implicação cujo antecedente é VendeMaisQue(jose, 300, vinhodoporto) e o consequente é a conjunção dos dois envios de stock.',
    explanation: link.traducao,
  },
  {
    id: 'md-mt1-2016-q1',
    title:
      'Traduzir um cenário de contas bancárias para lógica de primeira ordem',
    source: 'Teste 1, 2016/17',
    topic: 'fol-traducao',
    prompt:
      'As empresas clientes de um banco podem ter dois tipos de contas, contas à ordem e contas a prazo, a cada uma das quais está associado um determinado saldo. Para além disso, as empresas podem ou não ser elegíveis para contrair empréstimos.\n\n"NRG", "XPTO", "SUN" e "UNIV" são empresas. A XPTO tem um saldo de 5000€ na sua conta à ordem. A NRG tem um saldo à ordem de 3000€ e um saldo a prazo de 20000€. O saldo à ordem da SUN, que é uma subsidiária da UNIV, é superior ao saldo a prazo da XPTO. Se a soma dos saldos à ordem e a prazo da UNIV for superior a 20000€, então a UNIV é elegível para um empréstimo.\n\nDefina uma linguagem de lógica de primeira ordem adequada para representar a situação, indicando constantes, predicados e funções, e traduza para essa linguagem cada uma das frases acima.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta define as funções saldoOrdem(x), saldoPrazo(x) e subsidiaria(x).',
        'A resposta traduz corretamente a frase sobre a subsidiária da UNIV.',
        'A resposta traduz a frase condicional sobre o empréstimo da UNIV.',
      ],
    },
    solution:
      'Constantes: nrg, xpto, sun, univ, ordem, prazo. Predicados: Empresa(x), TemSaldo(x,y,z), Emprestimo(x). Funções: saldoOrdem(x), saldoPrazo(x), subsidiaria(x).\n\nTraduções: Empresa(nrg) ∧ Empresa(xpto) ∧ Empresa(sun) ∧ Empresa(univ); TemSaldo(xpto, 5000, ordem); TemSaldo(nrg, 3000, ordem) ∧ TemSaldo(nrg, 20000, prazo); saldoOrdem(subsidiaria(univ)) > saldoPrazo(xpto) ∧ subsidiaria(univ) = sun; saldoOrdem(univ) + saldoPrazo(univ) > 20000 → Emprestimo(univ).',
    reasoning:
      'A hierquia "SUN é subsidiária da UNIV" traduz-se por subsidiaria(univ) = sun, e a comparação de saldos usa as funções de saldo aplicadas aos termos adequados. A última frase é uma implicação entre uma comparação de soma de saldos e o predicado de elegibilidade.',
    explanation: link.traducao,
  },
  {
    id: 'md-mt1-2019-q2',
    title: 'Tradução de "O gato mia e o urso gosta de mel"',
    source: 'Teste 1, 2019/20',
    topic: 'fol-traducao',
    prompt:
      'Qual é a tradução em lógica de primeira ordem da frase "O gato mia e o urso gosta de mel"?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\operatorname{Gato}(\operatorname{mia}) \wedge \operatorname{Urso}(\operatorname{gostaMel})$',
          correct: false,
          explanation:
            'Trata os verbos como argumentos de predicados unários, em vez de predicados sobre os animais.',
        },
        {
          text: '$\operatorname{Mia}(\operatorname{gato}) \wedge \operatorname{Gosta}(\operatorname{urso}, \operatorname{mel})$',
          correct: true,
          explanation:
            'Mia é predicado do gato e Gosta é predicado binário do urso e do mel, ligados por conjunção.',
        },
        {
          text: '$\operatorname{Mia}(\operatorname{gato}) \to \operatorname{Gosta}(\operatorname{urso}, \operatorname{mel})$',
          correct: false,
          explanation: 'Usa implicação, mas a frase original usa "e".',
        },
        {
          text: '$\operatorname{Animais}(\operatorname{gato} \wedge \operatorname{ursoGostaMel})$',
          correct: false,
          explanation:
            'Coloca uma conjunção de termos dentro de um predicado unário.',
        },
      ],
    },
    solution:
      '$\operatorname{Mia}(\operatorname{gato}) \wedge \operatorname{Gosta}(\operatorname{urso}, \operatorname{mel})$.',
    reasoning:
      'Na linguagem de primeira ordem, os verbos são predicados e os nomes são constantes: "mia" é propriedade do gato, "gosta de mel" é uma relação entre o urso e o mel, e as duas afirmações unem-se por $\wedge$.',
    explanation: link.traducao,
  },
  {
    id: 'md-mt1-2019-q4',
    title: 'Passar uma fórmula de primeira ordem para linguagem natural',
    source: 'Teste 1, 2019/20',
    topic: 'fol-traducao',
    prompt:
      'Considere a linguagem em que Nota(x, n, t) significa "a aluna x teve a nota n no teste t" e Faz(x, t) significa "a aluna x tem de fazer o teste t". Qual é a tradução para linguagem natural de $(\operatorname{Nota}(\operatorname{ana}, 20, t1) \wedge \operatorname{Nota}(\operatorname{carolina}, 20, t1)) \to (\neg\operatorname{Faz}(\operatorname{ana}, t2) \wedge \neg\operatorname{Faz}(\operatorname{carolina}, t2))$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A Ana e a Carolina tiveram 20 no teste 1 e não têm que fazer o teste 2.',
          correct: false,
          explanation: 'Escreve a implicação como uma conjunção de factos.',
        },
        {
          text: 'Se a Ana e a Carolina tiverem 20 no teste 1, então não têm que fazer o teste 2.',
          correct: true,
          explanation:
            'O antecedente é a conjunção das duas notas e o consequente é a conjunção das duas negações.',
        },
        {
          text: 'A Ana e a Carolina não têm que fazer o teste 2, mas têm que tirar 20 no teste 1.',
          correct: false,
          explanation: 'Inverte o sentido da implicação.',
        },
        {
          text: 'A Ana e a Carolina não têm que fazer o teste 1 se tiverem 20 no teste 2.',
          correct: false,
          explanation: 'Troca os testes 1 e 2 e altera a estrutura lógica.',
        },
      ],
    },
    solution:
      'Se a Ana e a Carolina tiverem 20 no teste 1, então não têm que fazer o teste 2.',
    reasoning:
      'A fórmula tem a forma $(A \wedge B) \to (C \wedge D)$, que em linguagem natural é "se A e B, então C e D".',
    explanation: link.traducao,
  },
];

export const mt1LogicaProposicional: ExamQuestion[] = [
  {
    id: 'md-mt1-2019-q8',
    title: 'Forma normal disjuntiva de uma bicondicional',
    source: 'Teste 1, 2019/20',
    topic: 'logica-proposicional',
    prompt:
      'Obtenha uma expressão equivalente a $(\neg P \to R) \leftrightarrow (P \to \neg Q)$ na forma normal disjuntiva, apresentando a cadeia de equivalências.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta expande a bicondicional como conjunção das duas implicações.',
        'A resposta chega a $(\neg Q \wedge P) \vee (\neg P \wedge R) \vee (\neg Q \wedge R)$.',
      ],
    },
    solution:
      '$(\neg P \to R) \leftrightarrow (P \to \neg Q) \Leftrightarrow (\neg Q \wedge P) \vee (\neg P \wedge R) \vee (\neg Q \wedge R)$.',
    reasoning:
      'A bicondicional desdobra-se em $((\neg P \to R) \to (P \to \neg Q)) \wedge ((P \to \neg Q) \to (\neg P \to R))$. Eliminando as implicações e distribuindo, os únicos casos verdadeiros são: $P$ verdadeiro e $Q$ falso; $P$ falso e $R$ verdadeiro; $Q$ falso e $R$ verdadeiro.',
    explanation: link.formas,
  },
  {
    id: 'md-mt1-2016-q13',
    title: 'Forma normal conjuntiva de uma implicação dupla',
    source: 'Teste 1, 2016/17',
    topic: 'logica-proposicional',
    prompt:
      'Obtenha uma expressão equivalente a $(P \to R) \to ((P \vee Q) \to R)$ na forma normal conjuntiva.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta elimina as implicações: $(P \wedge \neg R) \vee (\neg P \wedge \neg Q) \vee R$.',
        'A resposta simplifica para a cláusula única $P \vee \neg Q \vee R$.',
      ],
    },
    solution: '$P \vee \neg Q \vee R$.',
    reasoning:
      '$(P \to R) \to ((P \vee Q) \to R) \Leftrightarrow \neg(\neg P \vee R) \vee (\neg(P \vee Q) \vee R) \Leftrightarrow (P \wedge \neg R) \vee (\neg P \wedge \neg Q) \vee R$. Na forma normal conjuntiva, as cláusulas com $P$ e $\neg P$ ou com $R$ e $\neg R$ são tautológicas e desaparecem, restando apenas $P \vee \neg Q \vee R$.',
    explanation: link.formas,
  },
  {
    id: 'md-mt1-2016-q14',
    title: 'Completude de uma única conetiva binária',
    source: 'Teste 1, 2016/17',
    topic: 'logica-proposicional',
    prompt:
      'Defina uma conetiva binária $*$ pela tabela de verdade em que $A * B$ é verdadeiro sse $A$ é verdadeiro e $B$ é falso (assim, por exemplo, $\operatorname{True} * B \Leftrightarrow \neg B$). Dispondo apenas de portas $*$ e do valor constante $\operatorname{True}$, será possível implementar qualquer expressão da lógica proposicional? Justifique, mostrando como implementar a negação, a conjunção e a disjunção (ou a implicação).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica $A * B$ como $A \wedge \neg B$.',
        'A resposta mostra a negação: $\neg B = \operatorname{True} * B$.',
        'A resposta mostra a conjunção e a disjunção usando apenas $*$ e $\operatorname{True}$, concluindo que o conjunto é completo.',
      ],
    },
    solution:
      'Sim, o conjunto $\{*\}$ é completo. Com $\operatorname{True} * B = \neg B$ obtém-se a negação; depois $A \wedge B = A * (\operatorname{True} * B)$ e $A \vee B = \operatorname{True} * ((\operatorname{True} * A) * (\operatorname{True} * B))$.',
    reasoning:
      'Como $* \mathrm{e} \wedge$ com o segundo argumento negado, a negação sai diretamente com a entrada constante $\operatorname{True}$. A conjunção resulta de negar duas vezes o segundo operando, e a disjunção segue de De Morgan a partir da negação e da conjunção.',
    explanation: link.completas,
  },
  {
    id: 'md-mt1-2022-q1a',
    title: 'Classificar a fórmula (s ∨ ¬p) → (q ∧ ¬p)',
    source: 'Teste 1, 2022/23',
    topic: 'logica-proposicional',
    prompt:
      'A fórmula do cálculo proposicional $(s \vee \neg p) \to (q \wedge \neg p)$ é:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Uma tautologia.',
          correct: false,
          explanation: 'Para $s=V$, $p=F$, $q=F$ a fórmula é falsa.',
        },
        {
          text: 'Uma contradição.',
          correct: false,
          explanation: 'Para $s=V$, $p=F$, $q=V$ a fórmula é verdadeira.',
        },
        {
          text: 'Nenhuma das anteriores.',
          correct: true,
          explanation:
            'A fórmula toma ambos os valores: é falsa para $s=V$, $p=F$, $q=F$ e verdadeira para $s=V$, $p=F$, $q=V$.',
        },
      ],
    },
    solution:
      'Nenhuma das anteriores: a fórmula não é tautologia nem contradição.',
    reasoning:
      'Com $s=V$, $p=F$, $q=V$ tem-se $(V \vee V) \to (V \wedge V) = V$, e com $s=V$, $p=F$, $q=F$ tem-se $V \to F = F$. Logo a fórmula é satisfazível mas não válida.',
    explanation: link.consequence,
  },
  {
    id: 'md-mt1-2022-q1b',
    title: 'Consequência semântica de um conjunto de fórmulas',
    source: 'Teste 1, 2022/23',
    topic: 'logica-proposicional',
    prompt:
      'Qual das seguintes fórmulas é uma consequência semântica do conjunto $\{(s \to \neg q) \vee p,\ (p \vee q) \to s\}$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$s \wedge \neg q$',
          correct: false,
          explanation:
            'A afetação $s=F$, $p=F$, $q=F$ satisfaz as premissas mas não satisfaz $s \wedge \neg q$.',
        },
        {
          text: '$\neg q \vee p$',
          correct: true,
          explanation:
            'Se $\neg q \vee p$ fosse falsa, teríamos $q=V$ e $p=F$; a segunda premissa obriga então $s=V$, mas a primeira fica falsa. Logo não há contraexemplo.',
        },
        {
          text: '$s \to (q \vee p)$',
          correct: false,
          explanation:
            'A afetação $s=V$, $p=F$, $q=F$ satisfaz as premissas mas não satisfaz $s \to (q \vee p)$.',
        },
      ],
    },
    solution: '$\neg q \vee p$ é consequência semântica do conjunto dado.',
    reasoning:
      'Para haver contraexemplo a $\neg q \vee p$, é preciso $q=V$ e $p=F$. Nessas condições, $(p \vee q) \to s$ só é verdadeira com $s=V$, mas nesse caso $(s \to \neg q) \vee p$ é falsa. Portanto toda a afetação que satisfaz as premissas satisfaz $\neg q \vee p$.',
    explanation: link.consequence,
  },
  {
    id: 'md-mt1-2022-q3e',
    title: 'Forma normal negativa de uma disjunção negada',
    source: 'Teste 1, 2022/23',
    topic: 'logica-proposicional',
    prompt:
      'Determine a forma normal negativa de $\neg((s \to \neg p) \vee (\neg q \wedge p))$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta aplica De Morgan e a dupla negação: $s \wedge p \wedge \neg(\neg q \wedge p)$.',
        'A resposta indica $s \wedge p \wedge (q \vee \neg p)$.',
      ],
    },
    solution: '$s \wedge p \wedge (q \vee \neg p)$.',
    reasoning:
      '$\neg((s \to \neg p) \vee (\neg q \wedge p)) \Leftrightarrow \neg(\neg s \vee \neg p) \wedge \neg(\neg q \wedge p) \Leftrightarrow (s \wedge p) \wedge (q \vee \neg p)$. Na forma normal negativa só restam negações aplicadas a variáveis.',
    explanation: link.formas,
  },
];

export const mt1ProvasFitch: ExamQuestion[] = [
  {
    id: 'md-mt1-2019-q10',
    title: 'Prova em Fitch da transitividade da implicação',
    source: 'Teste 1, 2019/20',
    topic: 'provas-fitch',
    prompt:
      'Prove formalmente, sem premissas e usando o sistema de Fitch (sem usar a regra "Con"), que $(A \to B) \to [(B \to C) \to (A \to C)]$ é uma tautologia.',
    answer: {
      kind: 'self',
      checklist: [
        'A prova abre três caixas encaixadas com ipotesi $A \to B$, $B \to C$ e $A$.',
        'A resposta deriva $B$ e depois $C$ por eliminación da implicação e fecha as caixas por introducción da implicação.',
      ],
    },
    solution:
      '1. $A \to B$ (hipótese)\\quad 2. $B \to C$ (hipótese)\\quad 3. $A$ (hipótese)\\quad 4. $B$ ($\to$E, 1, 3)\\quad 5. $C$ ($\to$E, 2, 4)\\quad 6. $A \to C$ ($\to$I, 3-5)\\quad 7. $(B \to C) \to (A \to C)$ ($\to$I, 2-6)\\quad 8. $(A \to B) \to [(B \to C) \to (A \to C)]$ ($\to$I, 1-7).',
    reasoning:
      'A transitividade prova-se assumindo sucessivamente os três antecedentes e chaining duas eliminações da implicação; as introduções da implicação fecham as caixas na ordem inversa.',
    explanation: link.regras,
  },
  {
    id: 'md-mt1-2016-q15',
    title: 'Prova por casos de P ∨ R',
    source: 'Teste 1, 2016/17',
    topic: 'provas-fitch',
    prompt:
      'Prove formalmente, recorrendo ao sistema de Fitch, que $P \vee R$ é consequência de $P \vee Q$ e de $\neg Q \vee R$.',
    answer: {
      kind: 'self',
      checklist: [
        'A prova usa eliminação da disjunção sobre $P \vee Q$.',
        'No caso $P$ conclui $P \vee R$ por introdução da disjunção; no caso $Q$, deriva $R$ de $\neg Q \vee R$ e conclui $P \vee R$.',
      ],
    },
    solution:
      'De $P \vee Q$ e $\neg Q \vee R$: no caso $P$, $P \vee R$ por $\vee$I; no caso $Q$, de $\neg Q \vee R$ segue $R$ (pois $\neg Q$ é falso) e depois $P \vee R$ por $\vee$I. Logo $P \vee R$.',
    reasoning:
      'É o silogismo disjuntivo: ou vale $P$, ou vale $Q$; se vale $Q$, a segunda premissa obriga a $R$. Em qualquer dos casos, $P \vee R$.',
    explanation: link.casos,
  },
  {
    id: 'md-mt1-2016-q16',
    title: 'Argumento inválido: indicar um contraexemplo',
    source: 'Teste 1, 2016/17',
    topic: 'provas-fitch',
    prompt:
      'Será que de $(P \wedge Q) \to S$ e de $\neg S \vee R$ se pode concluir $(P \to R) \wedge (Q \to R)$? Em caso afirmativo, prove-o; em caso negativo, indique um contraexemplo (uma afetação que satisfaz as premissas e falsifica a conclusão).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta responde que não se pode concluir.',
        'A resposta dá uma afetação com $P=V$, $Q=F$, $R=F$, $S=F$ (ou equivalente).',
        'A justificação verifica que as premissas são verdadeiras e a conclusão é falsa nessa afetação.',
      ],
    },
    solution:
      'Não se pode concluir. Contraexemplo: $P=V$, $Q=F$, $R=F$, $S=F$. As premissas são verdadeiras: $(V \wedge F) \to F = V$ e $\neg F \vee F = V$. Mas a conclusão $(V \to F) \wedge (F \to F) = F \wedge V = F$.',
    reasoning:
      'As premissas só garantem que, quando $P$ e $Q$ são ambos verdadeiros, $R$ também o é (pois $S$ seria verdadeiro e $\neg S \vee R$ obriga a $R$). Com $Q$ falso, a conclusão exige $P \to R$, que falha no contraexemplo.',
    explanation: link.contradicao,
  },
  {
    id: 'md-mt1-2022-q5a',
    title: 'Dedução de θ → (γ → ϕ) em Fitch',
    source: 'Teste 1, 2022/23',
    topic: 'provas-fitch',
    prompt:
      'Usando o sistema de dedução em notação de Fitch, mostre que $(\theta \wedge \gamma) \to \phi \vdash \theta \to (\gamma \to \phi)$, anotando as regras de cada passo.',
    answer: {
      kind: 'self',
      checklist: [
        'A prova abre as hipótesis $\theta$ e $\gamma$ em caixas encaixadas.',
        'A resposta deriva $\theta \wedge \gamma$ por $\wedge$I e $\phi$ por $\to$E, fechando com duas $\to$I.',
      ],
    },
    solution:
      '1. $(\theta \wedge \gamma) \to \phi$ (premissa)\\quad 2. $\theta$ (hipótese)\\quad 3. $\gamma$ (hipótese)\\quad 4. $\theta \wedge \gamma$ ($\wedge$I, 2, 3)\\quad 5. $\phi$ ($\to$E, 1, 4)\\quad 6. $\gamma \to \phi$ ($\to$I, 3-5)\\quad 7. $\theta \to (\gamma \to \phi)$ ($\to$I, 2-6).',
    reasoning:
      'É a regra de curryficação: a conjunção dos dois antecedentes pode ser reescrita como duas implicações encaixadas, bastando introduzir as hypothèses e eliminar a conjunção e a implicação.',
    explanation: link.regras,
  },
];

export const mt1Quantificadores: ExamQuestion[] = [
  {
    id: 'md-mt1-2022-q1d',
    title: 'Fórmula de primeira ordem que não é válida',
    source: 'Teste 1, 2022/23',
    topic: 'quantificadores',
    prompt:
      'Qual das seguintes fórmulas de lógica de primeira ordem não é válida?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$(\exists w\, \gamma \vee \exists w\, \phi) \to \exists w\, (\gamma \vee \phi)$',
          correct: false,
          explanation:
            'É válida: se existe algum $w$ com $\gamma$ ou algum $w$ com $\phi$, existe um $w$ com $\gamma \vee \phi$.',
        },
        {
          text: '$(\forall w\, \gamma \vee \forall w\, \phi) \to \forall w\, (\gamma \vee \phi)$',
          correct: false,
          explanation:
            'É válida: se $\gamma$ vale para todos ou $\phi$ vale para todos, então $\gamma \vee \phi$ vale para todos.',
        },
        {
          text: '$(\exists w\, \gamma \wedge \exists w\, \phi) \to \exists w\, (\gamma \wedge \phi)$',
          correct: true,
          explanation:
            'Não é válida: o $w$ que satisfaz $\gamma$ pode ser diferente do $w$ que satisfaz $\phi$. Por exemplo, num domínio com dois elementos em que $\gamma$ só vale no primeiro e $\phi$ só no segundo.',
        },
      ],
    },
    solution:
      'A fórmula não válida é $(\exists w\, \gamma \wedge \exists w\, \phi) \to \exists w\, (\gamma \wedge \phi)$.',
    reasoning:
      'Os quantificadores existenciais em separado não garantem a mesma testemunha. Num domínio $\{1, 2\}$ com $\gamma = \{1\}$ e $\phi = \{2\}$, o antecedente é verdadeiro e o consequente falso.',
    explanation: link.validade,
  },
  {
    id: 'md-mt1-2022-q1f',
    title: 'Forma normal prenexa de uma fórmula negada',
    source: 'Teste 1, 2022/23',
    topic: 'quantificadores',
    prompt:
      'Qual das seguintes opções não é uma forma normal prenexa de $\neg(\forall w\, R(w) \to \exists w\, \neg(\exists y\, Q(y, w) \wedge \forall x\, P(x)))$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\forall x\, \exists y\, \forall z\, \forall w\ (R(w) \wedge Q(y, z) \wedge P(x))$',
          correct: true,
          explanation:
            'Não é equivalente: na matriz, $Q(y, z)$ deveria ser $Q(y, w)$, pois a testemunha $y$ depende do $w$ quantificado em $R(w)$.',
        },
        {
          text: '$\forall x\, \forall w\, \exists y\ (R(w) \wedge Q(y, w) \wedge P(x))$',
          correct: false,
          explanation:
            'É uma forma normal prenexa equivalente da fórmula dada.',
        },
        {
          text: '$\forall w\, \forall x\, \exists y\ (R(w) \wedge Q(y, w) \wedge P(x))$',
          correct: false,
          explanation:
            'É outra forma normal prenexa equivalente, com a ordem dos universais trocada.',
        },
      ],
    },
    solution:
      'A fórmula $\neg(\forall w\, R(w) \to \exists w\, \neg(\exists y\, Q(y, w) \wedge \forall x\, P(x)))$ equivale a $\forall w\, \forall x\, \exists y\ (R(w) \wedge Q(y, w) \wedge P(x))$; a opção com $Q(y, z)$ não é prenexa dessa fórmula.',
    reasoning:
      '$\neg(A \to B) \Leftrightarrow A \wedge \neg B$, logo a fórmula fica $\forall w\, R(w) \wedge \forall w\, (\exists y\, Q(y, w) \wedge \forall x\, P(x))$. Na forma prenexa, o existencial $\exists y$ fica depois dos universais e a matriz é $R(w) \wedge Q(y, w) \wedge P(x)$, com $Q$ a depender de $w$.',
    explanation: link.prenexa,
  },
  {
    id: 'md-mt1-2022-q3c',
    title: 'Substituição sem captura numa fórmula com quantificadores',
    source: 'Teste 1, 2022/23',
    topic: 'quantificadores',
    prompt:
      'Seja $\gamma = (\forall x\, \neg \exists y\, \forall u\, P(x, y)) \to \neg(\exists z\, P(x, y) \to \forall y\, P(u, y))$. Determine $\gamma[f(a, b)/y]$, onde $f$ é uma função de aridade 2 e $a$, $b$ são constantes.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta substitui apenas as ocorrências livres de $y$: em $\exists z\, P(x, y)$.',
        'A resposta mantém $\forall y\, P(u, y)$ inalterado, pois aí $y$ está ligada.',
        'A resposta indica $(\forall x\, \neg \exists y\, \forall u\, P(x, y)) \to \neg(\exists z\, P(x, f(a, b)) \to \forall y\, P(u, y))$.',
      ],
    },
    solution:
      '$\gamma[f(a, b)/y] = (\forall x\, \neg \exists y\, \forall u\, P(x, y)) \to \neg(\exists z\, P(x, f(a, b)) \to \forall y\, P(u, y))$.',
    reasoning:
      'Na expressão, $y$ ocorre livre apenas em $P(x, y)$ dentro de $\exists z$; nas restantes ocorrências está ligada pelos quantificadores $\exists y$ e $\forall y$. A substituição só pode ser feita em variáveis livres, para não haver captura.',
    explanation: link.substituicao,
  },
];
