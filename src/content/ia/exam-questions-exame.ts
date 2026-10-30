import type { ExamQuestion } from '../../lib/exam-question';

export const pesquisa: ExamQuestion[] = [
  {
    id: 'ia-exame-2019-q1',
    title: 'Agente reflexo que nunca perde no jogo do galo',
    source: 'Exame, 2018/19',
    topic: 'pesquisa',
    prompt:
      'É possível criar um agente simples reflexo (agente reativo simples) para jogar o jogo do galo com a garantia de que nunca perde? Justifique e explique como implementaria esse agente.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta afirma que é possível.',
        'O agente usa regras que exploram a vitória iminente e bloqueiam a derrota iminente do adversário.',
        'A justificação refere que o tabuleiro é totalmente observável, pelo que o estado cabe numa única perceção.',
      ],
    },
    solution:
      'É possível. Basta um conjunto finito de regras SE-ENTÃO sobre a perceção atual do tabuleiro, por exemplo: se há duas marcas próprias numa linha com a terceira casa livre, joga aí (ganha); senão, se o adversário tem duas marcas numa linha com a terceira casa livre, joga aí (bloqueia); senão, joga no centro, senão num canto, senão numa casa livre qualquer.',
    reasoning:
      'O jogo do galo é determinístico e totalmente observável: o agente vê o tabuleiro completo em cada instante, pelo que não precisa de estado interno nem de memória. Como o número de tabuleiros é finito, um conjunto de regras que cobre todas as ameaças e jogadas vencedoras garante pelo menos o empate.',
  },
  {
    id: 'ia-exame-2016-q1',
    title: 'Garantia de solução com pesquisa primeiro em profundidade',
    source: 'Exame, 2015/16',
    topic: 'pesquisa',
    prompt:
      'Considere o jogo das Torres de Hanói com dois discos (o disco maior $G$, de peso 2, e o menor $P$, de peso 1) e três hastes, em que só se pode mover o disco do topo de uma pilha e nunca se pode colocar um disco sobre outro menor. O custo de mover um disco é o seu peso vezes a distância entre hastes (1 se forem adjacentes, 2 se não forem). Como pode garantir que a estratégia de pesquisa primeiro em profundidade encontra sempre uma solução neste cenário? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação refere que o espaço de estados é finito (no máximo $3^2=9$ estados).',
        'A resposta exige evitar ciclos, por exemplo guardando os estados já visitados.',
        'A conclusão é que, com espaço finito e sem ciclos, a pesquisa em profundidade é completa.',
      ],
    },
    solution:
      'Garante-se que a pesquisa primeiro em profundidade encontra sempre uma solução porque o espaço de estados é finito e porque se impede a expansão de estados já visitados (deteção de ciclos).',
    reasoning:
      'Com dois discos e três hastes há no máximo $3^2=9$ estados. Uma DFS que nunca reexpande um estado já visitado percorre um espaço finito sem ciclos, terminando forçosamente; como o estado objetivo é alcançável, a solução é encontrada.',
  },
  {
    id: 'ia-exame-2019-q2',
    title: 'Custo uniforme e A* com heurística admissível',
    source: 'Exame, 2018/19',
    topic: 'pesquisa',
    prompt:
      'Num espaço de estados em que todas as soluções têm custos diferentes, a estratégia de pesquisa de custo uniforme encontra sempre a mesma solução que o algoritmo A* usando uma heurística admissível? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta afirma que sim, as duas estratégias encontram a mesma solução.',
        'A justificação refere que ambas devolvem a solução de custo ótimo.',
        'O A* com heurística admissível nunca sobrestima o custo restante, pelo que também é ótimo.',
      ],
    },
    solution:
      'Sim. Tanto o custo uniforme como o A* com heurística admissível encontram a solução ótima, logo a mesma solução (que é única porque os custos das soluções são todos diferentes).',
    reasoning:
      'O custo uniforme expande os nós por ordem de $g$ e só para quando retira o objetivo da fronteira, devolvendo a solução de menor custo. O A* expande por $f=g+h$; como $h$ é admissível ($h\\leq h^*$), o primeiro objetivo retirado tem $f$ mínimo e, sendo o custo do caminho ótimo, esse $f$ é o custo ótimo. Logo ambos devolvem a solução ótima.',
  },
  {
    id: 'ia-exame-2017-q1',
    title: 'Estratégias de pesquisa completas para o cavalo',
    source: 'Exame, 2016/17',
    topic: 'pesquisa',
    prompt:
      'Num tabuleiro de xadrez, um cavalo só pode dar saltos "para cima" (por exemplo, de d4 só pode ir para b5, c6, e6 ou f5). Pretende-se ir da posição a1 para a posição f8. Neste cenário, quais das estratégias de pesquisa sistemática são completas? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica a pesquisa em largura e a de custo uniforme como completas.',
        'A justificação usa o fator de ramificação finito e os custos positivos.',
        'A pesquisa primeiro em profundidade não é completa em geral, por poder ficar presa num ramo infinito.',
      ],
    },
    solution:
      'São completas a pesquisa em largura e a pesquisa de custo uniforme. A pesquisa primeiro em profundidade, sem deteção de ciclos, não é completa em geral.',
    reasoning:
      'A pesquisa em largura é completa quando o fator de ramificação é finito; o custo uniforme é completa com custos de arco estritamente positivos, pois expande por ordem de custo do caminho. A pesquisa em profundidade pode descer por um ramo de profundidade ilimitada e nunca encontrar o objetivo, pelo que não é completa (num espaço finito com deteção de ciclos passaria a ser completa).',
  },
  {
    id: 'ia-exame-2017-q2',
    title: 'Incremento do limite de custo no IDA*',
    source: 'Exame de recurso, 2016/17',
    topic: 'pesquisa',
    prompt:
      'No algoritmo IDA* usa-se uma pesquisa por aprofundamento iterativo em que o limite de expansão é dado pelo custo ($f=g+h$) e não pela profundidade. Como deve ser incrementado esse limite de custo, de modo a que a solução ótima seja encontrada?',
    answer: {
      kind: 'self',
      checklist: [
        'O novo limite deve ser o menor valor de $f$ que excedeu o limite anterior.',
        'A justificação refere que os limites crescem de forma monótona.',
        'Assim garante-se que nenhuma solução de custo inferior fica por expandir.',
      ],
    },
    solution:
      'O limite deve ser incrementado para o menor valor de $f=g+h$ que tenha excedido o limite da iteração anterior.',
    reasoning:
      'Como o A* com heurística admissível é ótimo, o IDA* deve explorar todos os nós com $f$ até ao custo da solução ótima. Ao usar como novo limite o menor $f$ que ficou de fora, os limites aumentam gradualmente e a primeira solução encontrada é a ótima.',
  },
];

export const jogos: ExamQuestion[] = [
  {
    id: 'ia-exame-2019-q3',
    title: 'Papel da ordenação dos nós nos cortes alfa-beta',
    source: 'Exame, 2018/19',
    topic: 'jogos',
    prompt:
      'Na aplicação do algoritmo minimax com cortes alfa-beta, que papel pode ter a ordenação dos nós gerados e avaliados pela função de avaliação?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que ordenar os nós do melhor para o pior aumenta o número de cortes.',
        'Se o melhor nó for sempre examinado primeiro, o número de nós examinados desce de $b^d$ para cerca de $b^{d/2}$.',
        'Com uma ordenação má, os cortes alfa-beta podem não ter qualquer efeito.',
      ],
    },
    solution:
      'A ordenação dos nós determina a eficácia dos cortes: se em cada nó o ramo mais promissor for examinado primeiro, o valor alfa-beta já fica atualizado quando os restantes ramos são avaliados, permitindo cortá-los.',
    reasoning:
      'Com ordenação perfeita, cada nó MIN só precisa de avaliar o primeiro filho (que dá o valor máximo) e cada nó MAX o primeiro filho (que dá o mínimo), pelo que o número de nós folha examinados baixa de $b^d$ para cerca de $2b^{d/2}-1$. Sem boa ordenação, o alfa-beta pode não cortar ramo nenhum.',
  },
  {
    id: 'ia-exame-2017-q3',
    title: 'Vantagens do MCTS face ao Minimax',
    source: 'Exame de recurso, 2016/17',
    topic: 'jogos',
    prompt:
      'Explique duas vantagens do método Monte Carlo Tree Search (MCTS) relativamente ao algoritmo Minimax.',
    answer: {
      kind: 'self',
      checklist: [
        'Uma vantagem: o MCTS não precisa de avaliar todos os ramos até uma profundidade fixa.',
        'Outra vantagem: concentra as simulações nos ramos mais promissores, pelo que escala melhor em jogos com fator de ramificação elevado.',
        'O MCTS também lida melhor com jogos estocásticos, por usar amostragens.',
      ],
    },
    solution:
      'O MCTS (1) não exige a expansão completa da árvore até uma profundidade fixa, amostrando apenas os ramos mais promissores, e (2) funciona bem em jogos com fator de ramificação elevado e com aleatoriedade, porque as simulações Monte Carlo estimam o valor dos estados sem função de avaliação exata.',
    reasoning:
      'Enquanto o Minimax com alfa-beta precisa de gerar e avaliar todos os nós até à profundidade limite, o MCTS faz seleção, expansão, simulação e retropropagação repetidas, concentrando o cálculo onde a recompensa média é maior. Por isso é especialmente útil em jogos como o Go, com ramificação enorme.',
  },
  {
    id: 'ia-exame-2017-q4',
    title: 'Redução de nós examinados com cortes alfa-beta',
    source: 'Exame, 2016/17',
    topic: 'jogos',
    prompt:
      'Os cortes alfa-beta, quando utilizados no algoritmo de pesquisa adversarial minimax, podem permitir reduzir o número de nós examinados de $b^d$ para $b^{d/2}$, sendo $b$ o fator de ramificação e $d$ a profundidade máxima da árvore de pesquisa. Explique em que circunstâncias é que isto acontece.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que isto acontece quando os nós estão ordenados do melhor para o pior.',
        'Nesse caso, cada nó só precisa de examinar o primeiro ramo; os restantes são cortados.',
      ],
    },
    solution:
      'A redução de $b^d$ para cerca de $b^{d/2}$ acontece quando a ordenação dos nós é perfeita, isto é, quando em cada nó o ramo que dá o melhor valor é examinado primeiro.',
    reasoning:
      'Com ordenação perfeita, ao avaliar o segundo ramo de um nó MIN o valor alfa já é suficientemente baixo para cortar, e o mesmo acontece nos nós MAX com o valor beta. Assim só metade da profundidade contribuir com ramificação, donde resulta a complexidade efetiva $O(b^{d/2})$.',
  },
];

export const otimizacao: ExamQuestion[] = [
  {
    id: 'ia-exame-2019-q4',
    title: 'Probabilidade de aceitação no arrefecimento simulado',
    source: 'Exame, 2018/19',
    topic: 'otimizacao',
    prompt:
      'Numa dada altura da aplicação do arrefecimento simulado, a função de avaliação indica que o estado atual vale 20 e gerou-se um estado sucessor com valor 18. A temperatura atual é $T=0{,}9$. Calcule a probabilidade de o estado gerado ser aceite nos seguintes casos: a) o problema é de maximização da função de avaliação; b) o problema é de minimização. Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'No caso de maximização, a probabilidade é $e^{-2/0{,}9}\\approx 0{,}108$.',
        'No caso de minimização, o sucessor é melhor e a probabilidade de aceitação é 1.',
      ],
    },
    solution:
      'a) Maximização: $p=e^{\\Delta E/T}=e^{-2/0{,}9}\\approx 0{,}108$. b) Minimização: como $18<20$ o sucessor melhora o estado atual, logo $p=1$.',
    reasoning:
      'No arrefecimento simulado, um sucessor pior (no sentido do objetivo) é aceite com probabilidade $e^{\\Delta E/T}$, em que $\\Delta E$ é a diferença de avaliação (negativa). Para maximização, $\\Delta E=18-20=-2$, donde $p=e^{-2/0{,}9}=e^{-2{,}22}\\approx0{,}108$. Para minimização, o sucessor é melhor ($\\Delta E$ negativo no sentido da minimização), pelo que é sempre aceite.',
  },
  {
    id: 'ia-exame-2018-q1',
    title: 'Probabilidades de seleção num algoritmo genético',
    source: 'Exame de recurso, 2017/18',
    topic: 'otimizacao',
    prompt:
      'Ao aplicar um algoritmo genético a um problema de maximização, obteve-se uma população com os cromossomas C1, C2, C3 e C4, com valores de adaptação 10, 15, 27 e 30, respetivamente. Determine a probabilidade de seleção de cada cromossoma (seleção por roleta).',
    answer: {
      kind: 'self',
      checklist: [
        'A soma dos valores de adaptação é 82.',
        'As probabilidades são $10/82\\approx0{,}122$, $15/82\\approx0{,}183$, $27/82\\approx0{,}329$ e $30/82\\approx0{,}366$.',
      ],
    },
    solution:
      '$p(C1)=10/82\\approx0{,}122$, $p(C2)=15/82\\approx0{,}183$, $p(C3)=27/82\\approx0{,}329$ e $p(C4)=30/82\\approx0{,}366$.',
    reasoning:
      'Na seleção por roleta, a probabilidade de cada cromossoma é o seu valor de adaptação a dividir pela soma dos valores de toda a população: $10+15+27+30=82$. Assim, quanto maior a adaptação, maior a fatia da roleta e maior a probabilidade de ser selecionado.',
  },
  {
    id: 'ia-exame-2017-q5',
    title: 'Papel da aleatoriedade no arrefecimento simulado',
    source: 'Exame de recurso, 2016/17',
    topic: 'otimizacao',
    prompt:
      'Qual a razão da inclusão de algum grau de aleatoriedade no arrefecimento simulado? Descreva o funcionamento do algoritmo quando o grau de aleatoriedade é nulo ou extremamente elevado (infinito).',
    answer: {
      kind: 'self',
      checklist: [
        'A aleatoriedade permite aceitar estados piores com probabilidade $e^{\\Delta E/T}$, escapando a ótimos locais.',
        'Com aleatoriedade nula, o algoritmo comporta-se como um hill-climbing (só aceita melhorias).',
        'Com aleatoriedade infinita, aceita qualquer sucessor e comporta-se como uma pesquisa aleatória.',
      ],
    },
    solution:
      'A aleatoriedade serve para escapar a ótimos locais: mesmo um sucessor pior pode ser aceite, com probabilidade $e^{\\Delta E/T}$. Se a aleatoriedade for nula, o algoritmo só aceita sucessores melhores (hill-climbing). Se for infinita, aceita qualquer sucessor e torna-se uma pesquisa aleatória sem direção.',
    reasoning:
      'A probabilidade de aceitar um estado pior decai exponencialmente com a diferença de avaliação e com $1/T$. No início, com $T$ alta, o algoritmo explora; à medida que $T$ desce, a aceitação de estados piores torna-se rara e o algoritmo converge. Sem esse grau de aleatoriedade, ficaria preso no primeiro ótimo local.',
  },
];

export const aprendizagem: ExamQuestion[] = [
  {
    id: 'ia-exame-2016-q2',
    title: 'Informação média e atributo de maior ganho',
    source: 'Exame, 2015/16',
    topic: 'aprendizagem',
    prompt:
      'Um selecionador de futebol recolheu 10 jogos da sua equipa, com os seguintes resultados: 4 vitórias, 2 derrotas e 4 empates. Conhecem-se as entropias de cada atributo em relação ao resultado: Rank Adversário (1,522), Tipo de Jogo (1,036), Competição (1,161) e Tempo (1,2). a) Calcule a informação média do conjunto de dados. b) Determine qual o atributo que maximiza o ganho de informação.',
    answer: {
      kind: 'self',
      checklist: [
        'A informação média é $H\\approx1{,}522$ bits.',
        'Os ganhos são aproximadamente 0 (Rank), 0,486 (Tipo de Jogo), 0,361 (Competição) e 0,322 (Tempo).',
        'O atributo que maximiza o ganho é o Tipo de Jogo.',
      ],
    },
    solution:
      'a) $H=-(0{,}4\\log_2 0{,}4+0{,}2\\log_2 0{,}2+0{,}4\\log_2 0{,}4)\\approx1{,}522$ bits. b) O atributo com maior ganho é o Tipo de Jogo ($1{,}522-1{,}036=0{,}486$).',
    reasoning:
      'A informação média calcula-se a partir das proporções das três classes: $0{,}4\\log_2(1/0{,}4)+0{,}2\\log_2(1/0{,}2)+0{,}4\\log_2(1/0{,}4)\\approx1{,}522$. O ganho de cada atributo é $H-H(\\text{atributo})$; comparando, o Tipo de Jogo tem o maior ganho e seria a raiz da árvore de decisão.',
  },
  {
    id: 'ia-exame-2017-q6',
    title: 'Atributo raiz da árvore dos peixes',
    source: 'Exame, 2016/17',
    topic: 'aprendizagem',
    prompt:
      'Um robô aprende a distinguir peixes vermelhos de peixes azuis a partir de 8 exemplos (4 vermelhos e 4 azuis) descritos pelos atributos Barbatana, Cauda e Corpo. Sabe-se que entropia(Barbatana)=0,811, entropia(Cauda)=0,6 e entropia(Corpo)=0,95. Que atributo escolheria para a raiz da árvore de decisão, usando o critério do ganho de informação? Apresente os cálculos.',
    answer: {
      kind: 'self',
      checklist: [
        'A informação média do conjunto é $H=1$ bit (metade vermelhos, metade azuis).',
        'Os ganhos são 0,189 (Barbatana), 0,4 (Cauda) e 0,05 (Corpo).',
        'O atributo escolhido para a raiz é a Cauda.',
      ],
    },
    solution:
      'A raiz é o atributo Cauda, com ganho $1-0{,}6=0{,}4$, o maior dos três.',
    reasoning:
      'Com 4 exemplos de cada classe, $H=-(0{,}5\\log_2 0{,}5+0{,}5\\log_2 0{,}5)=1$ bit. O ganho de cada atributo é $1-H(\\text{atributo})$: Barbatana $0{,}189$, Cauda $0{,}4$ e Corpo $0{,}05$. Logo a Cauda é o atributo mais informativo e fica na raiz.',
  },
  {
    id: 'ia-exame-2018-q2',
    title: 'Raiz da árvore com ID3 e com C4.5',
    source: 'Exame de recurso, 2017/18',
    topic: 'aprendizagem',
    prompt:
      'A tabela mostra o que aconteceu a 8 pessoas expostas ao sol, sabendo se usaram protetor solar:\n\n| Nome | Hair | Height | Weight | Lotion | Result |\n| --- | --- | --- | --- | --- | --- |\n| Sarah | blonde | average | light | no | sunburned |\n| Dana | blonde | tall | average | yes | none |\n| Alex | brown | short | average | yes | none |\n| Annie | blonde | short | average | no | sunburned |\n| Emily | red | average | heavy | no | sunburned |\n| Pete | brown | tall | heavy | no | none |\n| John | brown | average | heavy | no | none |\n| Katie | blonde | short | light | yes | none |\n\na) Calcule a informação média da coleção. b) Usando o algoritmo ID3, determine que atributo deve ser colocado na raiz, justificando com cálculos. c) Usando o critério da razão do ganho do C4.5, determine qual o atributo da raiz, justificando com cálculos.',
    answer: {
      kind: 'self',
      checklist: [
        'A informação média é $H\\approx0{,}954$ bits (3 sunburned, 5 none).',
        'Com ID3 (maior ganho), a raiz é o atributo Hair (ganho $\\approx0{,}454$).',
        'Com C4.5 (maior razão do ganho), a raiz é o atributo Lotion (razão $\\approx0{,}364$, contra $\\approx0{,}323$ de Hair).',
      ],
    },
    solution:
      'a) $H\\approx0{,}954$ bits. b) ID3: raiz = Hair. c) C4.5: raiz = Lotion.',
    reasoning:
      'Há 3 exemplos sunburned e 5 none, logo $H=-(3/8\\log_2 3/8+5/8\\log_2 5/8)\\approx0{,}954$. Os ganhos são: Hair $0{,}454$, Lotion $0{,}348$, Height $0{,}266$ e Weight $\\approx0{,}016$, pelo que o ID3 escolhe Hair. A razão do ganho divide o ganho pela informação da separação: Hair $0{,}454/1{,}406\\approx0{,}323$ e Lotion $0{,}348/0{,}954\\approx0{,}364$, pelo que o C4.5 escolhe Lotion.',
  },
];

export const periciais: ExamQuestion[] = [
  {
    id: 'ia-exame-2016-q3',
    title: 'Fator de certeza combinado no modelo de fatores de certeza',
    source: 'Exame, 2015/16',
    topic: 'periciais',
    prompt:
      'Uma base de conhecimento diz que, para uma determinada equipa de futebol, um jogo de uma fase final de um campeonato do mundo resulta em vitória (FC=0,9) e que, se o jogo for de uma qualquer fase final e jogado com bom tempo, a vitória é provável (FC=0,7). A equipa vai jogar um jogo da fase final do campeonato do mundo e as previsões indicam bom tempo (FC=0,6). Aplique o modelo dos fatores de certeza para estimar o fator de certeza na vitória.',
    answer: {
      kind: 'number',
      value: 0.942,
      tolerance: 0.001,
    },
    solution: 'FC(vitória) = 0,942.',
    reasoning:
      'A primeira regra dispara com FC $0{,}9\\times1=0{,}9$. A segunda dispara com FC $\\min(1;0{,}6)\\times0{,}7=0{,}42$. A combinação de dois fatores de certeza positivos é $FC_1+FC_2-FC_1\\cdot FC_2=0{,}9+0{,}42-0{,}9\\times0{,}42=0{,}942$.',
  },
  {
    id: 'ia-exame-2018-q3',
    title: 'Encadeamento para a frente com fatores de certeza',
    source: 'Exame de recurso, 2017/18',
    topic: 'periciais',
    prompt:
      'Um sistema baseado em regras usa as regras: SE sw recente ENTÃO funciona (FC=0,8); SE computadores em_bom_estado ENTÃO funciona (FC=0,7); SE checkup ok ENTÃO computadores em_bom_estado (FC=0,75). O software utilizado é recente e o checkup parece ter corrido bem (FC=0,9). Usando encadeamento para a frente e o modelo dos fatores de certeza, que fator de certeza se obtém para a conclusão "funciona"?',
    answer: {
      kind: 'number',
      value: 0.8945,
      tolerance: 0.001,
    },
    solution: 'FC(funciona) = 0,8945.',
    reasoning:
      'Do checkup ok (FC=0,9) resulta computadores em_bom_estado com FC $0{,}75\\times0{,}9=0{,}675$. A primeira regra dá FC $0{,}8\\times1=0{,}8$ e a segunda dá $0{,}7\\times0{,}675=0{,}4725$. Combinando: $0{,}8+0{,}4725-0{,}8\\times0{,}4725=0{,}8945$.',
  },
];
