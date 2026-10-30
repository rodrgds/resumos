import type { ExamQuestion } from '../../lib/exam-question';

export const mt2EstruturasLineares: ExamQuestion[] = [
  {
    id: 'aed-mt2-2018-q1',
    title: 'Estrutura para procurar um elemento ou o imediatamente anterior',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'Qual é a estrutura de dados linear mais adequada (eficiente em tempo e espaço) quando se pretende procurar, num conjunto de elementos, um determinado elemento $X$ ou, no caso deste não existir, o imediatamente anterior?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Lista ordenada simplesmente ligada',
          correct: true,
          explanation:
            'Numa lista ordenada, a pesquisa do predecessor de $X$ faz-se durante a própria pesquisa, em $O(n)$ no pior caso, e a representação simplesmente ligada poupa o espaço extra do ponteiro para o nó anterior.',
        },
        {
          text: 'Lista ordenada duplamente ligada',
          correct: false,
          explanation:
            'Também funciona, mas gasta mais memória por elemento (ponteiro extra) sem melhorar o tempo de pesquisa.',
        },
        {
          text: 'Lista desordenada simplesmente ligada',
          correct: false,
          explanation:
            'Numa lista desordenada é preciso percorrer todos os elementos e não se identifica o predecessor de $X$ de forma direta.',
        },
        {
          text: 'Lista desordenada duplamente ligada',
          correct: false,
          explanation:
            'A desordenação impede a pesquisa eficiente e a dupla ligação só acarreta custo de espaço.',
        },
        {
          text: 'Nenhuma das possibilidades anteriores',
          correct: false,
          explanation: 'Há uma estrutura adequada entre as enumeradas.',
        },
      ],
    },
    solution: 'Lista ordenada simplesmente ligada.',
    reasoning:
      'Para devolver $X$ ou o seu predecessor basta uma pesquisa sequencial numa lista ordenada: quando se ultrapassa o valor procurado, o nó anterior é o imediatamente anterior. Uma lista ordenada simplesmente ligada é suficiente e é a que ocupa menos espaço.',
  },
  {
    id: 'aed-mt2-2018-q3',
    title: 'Estrutura para o botão "voltar" de um browser',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'Qualquer browser possui a funcionalidade de retorno à página visitada anteriormente. Na implementação desta funcionalidade, que estrutura de dados é mais adequada (eficiente em tempo e espaço)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Pilha',
          correct: true,
          explanation:
            'A página "anterior" é sempre a última que foi visitada (disciplina LIFO), que é precisamente o comportamento de uma pilha, com push/pop em $O(1)$.',
        },
        {
          text: 'Fila',
          correct: false,
          explanation:
            'Uma fila retira primeiro a página mais antiga, não a visitada imediatamente antes.',
        },
        {
          text: 'Lista simplesmente ligada',
          correct: false,
          explanation:
            'Funciona, mas não exprime a disciplina LIFO de forma tão direta e económica.',
        },
        {
          text: 'Lista duplamente ligada',
          correct: false,
          explanation: 'Gasta mais espaço sem vantagem para este cenário.',
        },
        {
          text: 'É indiferente o uso de qualquer das estruturas enumeradas',
          correct: false,
          explanation: 'A pilha é claramente a mais adequada e económica.',
        },
      ],
    },
    solution: 'Pilha (stack).',
    reasoning:
      'O retorno à página anterior segue a ordem inversa das visitas (LIFO). Numa pilha, tanto a consulta da página atual (top) como a entrada numa nova página (push) e o retorno (pop) são operações em $O(1)$.',
  },
  {
    id: 'aed-mt2-2018-q5',
    title:
      'Operações em O(1) numa lista simplesmente ligada com referências para o início e o fim',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'Considere uma lista implementada por uma lista simplesmente ligada com referências para o início e o fim (primeiro e último nó). Quais destas operações podem ser realizadas em tempo $O(1)$?\n\nI. Inserir um elemento no início da lista\nII. Inserir um elemento no fim da lista\nIII. Remover o primeiro elemento (início) da lista\nIV. Remover o último elemento (fim) da lista',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'I e II apenas',
          correct: false,
          explanation: 'Falta a remoção no início, que também é $O(1)$.',
        },
        {
          text: 'I e III apenas',
          correct: false,
          explanation:
            'Operação II (inserir no fim) também é $O(1)$, por causa da referência para o último nó.',
        },
        {
          text: 'I, II e III apenas',
          correct: true,
          explanation:
            'Com referências para o primeiro e o último nó, inserir no início, inserir no fim e remover o primeiro elemento são $O(1)$. Remover o último exige chegar ao penúltimo nó, logo é $O(n)$.',
        },
        {
          text: 'I, II e IV apenas',
          correct: false,
          explanation:
            'Remover o último elemento não é $O(1)$ numa lista simplesmente ligada.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há operações em $O(1)$.',
        },
      ],
    },
    solution: 'I, II e III apenas.',
    reasoning:
      'Inserir no início (I) e remover o primeiro elemento (III) acedem diretamente ao primeiro nó. Inserir no fim (II) é direto porque existe referência para o último nó. Remover o último elemento (IV) exige o penúltimo nó, que numa lista simplesmente ligada só se alcança percorrendo a lista: $O(n)$.',
  },
  {
    id: 'aed-mt2-2018-q6',
    title: 'Estrutura para encaixotar itens pela ordem temporal da encomenda',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'No fim do processo produtivo de uma fábrica, todos os itens (objetos da classe `Item`) são encaixotados para envio aos clientes, respeitando a ordem temporal da encomenda. Que estrutura melhor representa este cenário?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`vector<vector<Item>>`',
          correct: false,
          explanation:
            'O vetor não garante a disciplina FIFO de expedição das encomendas.',
        },
        {
          text: '`list<stack<Item>>`',
          correct: false,
          explanation: 'A lista não retira primeiro a encomenda mais antiga.',
        },
        {
          text: '`queue<stack<Item>>`',
          correct: true,
          explanation:
            'A fila processa as encomendas por ordem de chegada (FIFO) e cada encomenda é uma pilha de itens encaixotados.',
        },
        {
          text: '`stack<queue<Item>>`',
          correct: false,
          explanation:
            'A pilha retiraria primeiro a encomenda mais recente, violando a ordem temporal.',
        },
        {
          text: 'É indiferente o uso de qualquer das estruturas enumeradas',
          correct: false,
          explanation:
            'A ordem temporal da encomenda exige uma fila de encomendas.',
        },
      ],
    },
    solution: '`queue<stack<Item>>`.',
    reasoning:
      'As encomendas devem ser enviadas pela ordem em que chegam: disciplina FIFO, que é a de uma fila (queue). Dentro de cada encomenda, os itens são encaixotados numa pilha (stack). Assim, a estrutura correta é uma fila de pilhas.',
  },
  {
    id: 'aed-mt2-2018-q8',
    title: 'O que testa a função mistério sobre uma fila?',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'A função `misterio` retorna verdadeiro se:\n\n```cpp\ntemplate <class T>\nbool misterio(queue<T> &f1) {\n  stack<T> s1;\n  int k = f1.size()/2;\n  for (int i = 1; i <= k; i++) {\n    s1.push(f1.front());\n    f1.pop();\n  }\n  if (f1.size() > k)\n    f1.pop();\n  for (int i = 1; i <= k; i++) {\n    if (f1.front() != s1.top())\n      return false;\n    f1.pop();\n    s1.pop();\n  }\n  return true;\n}\n```',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'f1 contém um número ímpar de elementos',
          correct: false,
          explanation: 'A função não testa a paridade do número de elementos.',
        },
        {
          text: 'f1 contém um palíndromo (a sequência é igual quando vista nos dois sentidos)',
          correct: true,
          explanation:
            'A primeira metade da fila é empilhada e depois comparada, elemento a elemento, com a segunda metade na ordem inversa: é o teste clássico de palíndromo.',
        },
        {
          text: 'f1 contém duas sequências iguais nas suas metades',
          correct: false,
          explanation:
            'A comparação é feita com a pilha, ou seja, com a primeira metade invertida.',
        },
        {
          text: 'f1 contém uma sequência ordenada',
          correct: false,
          explanation: 'A ordenação não é verificada.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution: 'f1 contém um palíndromo.',
    reasoning:
      'O ciclo inicial passa os primeiros $k = \\lfloor n/2 \\rfloor$ elementos para a pilha (ficando na ordem inversa no topo) e, se o número de elementos é ímpar, descarta o elemento do meio. Depois compara o resto da fila com o topo da pilha: a igualdade elemento a elemento com a primeira metade invertida caracteriza um palíndromo.',
  },
  {
    id: 'aed-mt2-2017-q7',
    title: 'Gestão de pacientes para recolha de sangue',
    source: 'Teste 2, 2017/18',
    topic: 'estruturas-lineares',
    prompt:
      'Qual é a estrutura de dados mais adequada na gestão de pacientes de um laboratório de análises, que vão efetuar a recolha de sangue num determinado dia?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Pilha',
          correct: false,
          explanation:
            'Atenderia primeiro o último paciente a chegar, o que não é justo nem habitual.',
        },
        {
          text: 'Fila',
          correct: true,
          explanation:
            'Os pacientes são atendidos pela ordem de chegada (FIFO), que é a disciplina de uma fila, com as operações principais em $O(1)$.',
        },
        {
          text: 'Lista',
          correct: false,
          explanation: 'A lista não impone a ordem de chegada por si só.',
        },
        {
          text: 'Lista ordenada',
          correct: false,
          explanation:
            'Não há critério de ordenação dos pacientes; basta a ordem de chegada.',
        },
        {
          text: 'Indiferente',
          correct: false,
          explanation: 'A fila é claramente a mais adequada.',
        },
      ],
    },
    solution: 'Fila (queue).',
    reasoning:
      'A recolha de sangue deve atender os pacientes pela ordem em que chegam. A fila garante a disciplina FIFO (primeiro a entrar, primeiro a ser atendido), com atendimento e saída em $O(1)$.',
  },
  {
    id: 'aed-mt2-2018-q9',
    title: 'Lista mais adequada quando a inversão é frequente',
    source: 'Teste 2, 2018/19',
    topic: 'estruturas-lineares',
    prompt:
      'Numa aplicação que usa uma lista ligada para guardar os elementos, a operação de inversão da lista é frequente. Que implementação de lista é mais adequada (eficiente em tempo e espaço): lista simplesmente ligada ou lista duplamente ligada? Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta escolhe a lista duplamente ligada.',
        'A justificação indica que a inversão se faz em $O(n)$ trocando os ponteiros de cada nó (ou percorrendo a lista nos dois sentidos).',
        'A justificação compara com o custo espacial da lista simplesmente ligada.',
      ],
    },
    solution:
      'Lista duplamente ligada. A inversão pode ser feita em $O(n)$ trocando, em cada nó, os ponteiros `next` e `prev` (a lista passa a ser percorrida no sentido contrário).',
    reasoning:
      'Numa lista duplamente ligada cada nó conhece o anterior e o seguinte, pelo que a inversão é uma troca local de ponteiros em todos os nós, em tempo linear, e a estrutura suporta naturalmente o percurso nos dois sentidos. Numa lista simplesmente ligada também é possível inverter em $O(n)$ re-ligando os nós, mas a lista duplamente ligada é a opção mais adequada quando essa operação é frequente. O custo é um ponteiro extra por nó.',
  },
];

export const mt2Ordenacao: ExamQuestion[] = [
  {
    id: 'aed-mt2-2016-q1',
    title: 'Ordenação por seleção consoante o estado inicial do vetor',
    source: 'Teste 2, 2016/17',
    topic: 'ordenacao',
    prompt:
      'Usando o algoritmo de ordenação por seleção, pretende-se ordenar um vetor por ordem crescente. Em qual destas situações a ordenação do vetor é realizada em menor tempo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O vetor está ordenado por ordem decrescente',
          correct: false,
          explanation:
            'A ordenação por seleção não tira partido de nenhuma ordenação prévia.',
        },
        {
          text: 'O vetor está ordenado por ordem crescente',
          correct: false,
          explanation:
            'Mesmo já estando ordenado, o algoritmo continua a procurar o mínimo em cada passo.',
        },
        {
          text: 'O vetor está desordenado',
          correct: false,
          explanation: 'O estado inicial não altera o número de comparações.',
        },
        {
          text: 'O vetor está ordenado (por ordem crescente ou decrescente)',
          correct: false,
          explanation:
            'Nenhuma ordenação prévia reduz o trabalho do selection sort.',
        },
        {
          text: 'É indiferente',
          correct: true,
          explanation:
            'O selection sort faz sempre $\\Theta(n^2)$ comparações, qualquer que seja o estado inicial do vetor.',
        },
      ],
    },
    solution: 'É indiferente.',
    reasoning:
      'A ordenação por seleção percorre, em cada passo, todos os elementos que faltam para encontrar o mínimo e trocá-lo com a primeira posição livre. Esse número de comparações é sempre da ordem de $n^2$, independentemente de o vetor já estar ordenado ou não.',
  },
  {
    id: 'aed-mt2-2016-q3',
    title: 'Complexidade do merge sort com divisão em três partes',
    source: 'Teste 2, 2016/17',
    topic: 'ordenacao',
    prompt:
      'O algoritmo merge sort divide o vetor em duas partes de igual tamanho, que ordena recursivamente. Se o algoritmo dividisse o vetor em três partes de igual tamanho, qual seria a complexidade temporal?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$O(n)$',
          correct: false,
          explanation:
            'Há trabalho linear por nível de recursão, mas existem vários níveis.',
        },
        {
          text: '$O(n\\log n)$',
          correct: true,
          explanation:
            'A recorrência $T(n)=3T(n/3)+O(n)$ resolve-se em $O(n\\log n)$ (a base do logaritmo muda, mas não a classe de crescimento).',
        },
        {
          text: '$O(n^2)$',
          correct: false,
          explanation: 'Não há ciclos aninhados proporcionais a $n$.',
        },
        {
          text: '$O(n^3)$',
          correct: false,
          explanation: 'Muito acima do custo real.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution: '$O(n\\log n)$.',
    reasoning:
      'Dividir em três partes dá a recorrência $T(n)=3T(n/3)+cn$. Pelo teorema mestre (ou somando os níveis da árvore de recursão), cada nível custa $O(n)$ e há $O(\\log n)$ níveis, pelo que $T(n)=O(n\\log n)$. A base do logaritmo altera apenas a constante.',
  },
  {
    id: 'aed-mt2-2016-q5',
    title: 'Pivot usado num passo de partição do quick sort',
    source: 'Teste 2, 2016/17',
    topic: 'ordenacao',
    prompt:
      'No quick sort, após um passo de partição, o vetor apresenta a configuração $[5, 1, 7, 3, 10, 12, 20, 11, 15]$. Qual foi o elemento pivot usado nesse passo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '7',
          correct: false,
          explanation:
            'Há elementos maiores que 7 à sua direita na configuração dada (10, 12, 20, 11, 15), logo 7 não ficou na posição final.',
        },
        {
          text: '5',
          correct: false,
          explanation:
            'O primeiro elemento foi o pivot inicial, mas a configuração dada já é a do fim do passo.',
        },
        {
          text: '10',
          correct: true,
          explanation:
            'Todos os elementos à esquerda de 10 são menores que 10 e todos os à direita são maiores: 10 é o pivot colocado na posição final.',
        },
        {
          text: '15',
          correct: false,
          explanation:
            'Há elementos menores que 15 à sua direita (11), logo não está na posição final.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'O pivot está identificado.',
        },
      ],
    },
    solution: 'O pivot foi 10.',
    reasoning:
      'Depois de um passo de partição, o pivot fica na sua posição definitiva: à sua esquerda só há valores menores e à sua direita só há valores maiores. No vetor dado, isso acontece com o 10 (esquerda: 5, 1, 7, 3; direita: 12, 20, 11, 15).',
  },
  {
    id: 'aed-mt2-2015-q7',
    title: 'Pivot do quick sort após o primeiro passo',
    source: 'Teste 2 (CI2), 2015/16',
    topic: 'ordenacao',
    prompt:
      'Estava a verificar a implementação do quick sort que ordena um vetor por ordem ascendente. Após o primeiro passo, o conteúdo do vetor é $[3, 9, 1, 8, 17, 24, 22, 20]$. Qual foi o pivot usado nesse passo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '17',
          correct: true,
          explanation:
            'À esquerda de 17 estão apenas valores menores (3, 9, 1, 8) e à direita apenas valores maiores (24, 22, 20): 17 é o pivot.',
        },
        {
          text: '8',
          correct: false,
          explanation:
            'Há valores maiores que 8 à esquerda de 8 na configuração final (9).',
        },
        {
          text: '24',
          correct: false,
          explanation: 'Há valores menores que 24 à direita (22, 20).',
        },
        {
          text: '1',
          correct: false,
          explanation: 'O elemento 1 não está na posição de partição.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'O pivot está identificado.',
        },
      ],
    },
    solution: 'O pivot foi 17.',
    reasoning:
      'Após a partição, o pivot fica na posição correta: $[3, 9, 1, 8 \\,|\\, 17 \\,|\\, 24, 22, 20]$. Todos os elementos à esquerda de 17 são menores que 17 e todos os à direita são maiores, confirmando que 17 foi o pivot.',
  },
  {
    id: 'aed-mt2-2015-q8',
    title: 'Complexidade do insertion sort com pesquisa binária',
    source: 'Teste 2 (CI2), 2015/16',
    topic: 'ordenacao',
    prompt:
      'O insertion sort mantém os primeiros $k$ elementos ordenados e insere o elemento $k+1$ na posição correta, usando pesquisa sequencial nessa procura. Se uma variante usar pesquisa binária nesse passo, qual é a complexidade temporal do algoritmo resultante?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$O(n\\log n)$',
          correct: false,
          explanation:
            'A pesquisa binária reduz o número de comparações, mas não o número de deslocamentos.',
        },
        {
          text: '$O(n)$',
          correct: false,
          explanation:
            'O algoritmo continua a deslocar elementos em cada inserção.',
        },
        {
          text: '$O(\\log n)$',
          correct: false,
          explanation: 'Cada inserção individual não é de tempo constante.',
        },
        {
          text: '$O(n^2)$',
          correct: true,
          explanation:
            'Encontrar a posição custa $O(\\log k)$ com pesquisa binária, mas inserir o elemento desloca em média $k/2$ elementos: o total continua $O(n^2)$.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution: '$O(n^2)$.',
    reasoning:
      'Com pesquisa binária, localizar a posição de inserção passa a custar $O(\\log k)$ em vez de $O(k)$. Porém, depois de encontrada a posição, é necessário deslocar os elementos maiores para abrir espaço, o que custa $O(k)$ em cada inserção. Somando sobre todas as inserções, o custo dominante continua a ser $O(n^2)$.',
  },
];

export const mt2Pesquisa: ExamQuestion[] = [
  {
    id: 'aed-mt2-2016-q4',
    title: 'Quando a pesquisa sequencial vence a binária',
    source: 'Teste 2, 2016/17',
    topic: 'pesquisa',
    prompt:
      'Considere a pesquisa de um elemento $X$ num vetor ordenado. Em que situação a pesquisa sequencial é realizada em menor tempo que a pesquisa binária?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O elemento $X$ não existe no vetor',
          correct: false,
          explanation:
            'Se $X$ não existe, a sequencial percorre o vetor todo ($O(n)$), enquanto a binária termina em $O(\\log n)$.',
        },
        {
          text: 'O elemento $X$ é o primeiro elemento do vetor',
          correct: true,
          explanation:
            'A sequencial encontra $X$ na primeira comparação ($O(1)$), ao passo que a binária precisa de cerca de $\\log n$ comparações.',
        },
        {
          text: 'O elemento $X$ encontra-se no meio do vetor',
          correct: false,
          explanation:
            'No meio, a binária encontra $X$ em poucas comparações; a sequencial precisa de cerca de $n/2$.',
        },
        {
          text: 'Nunca',
          correct: false,
          explanation: 'Há situações em que a sequencial é mais rápida.',
        },
        {
          text: 'Sempre',
          correct: false,
          explanation: 'No caso geral a binária é muito mais rápida.',
        },
      ],
    },
    solution: 'Quando $X$ é o primeiro elemento do vetor.',
    reasoning:
      'A pesquisa sequencial compara os elementos pela ordem, pelo que encontra o primeiro elemento com uma única comparação. A pesquisa binária, qualquer que seja a posição de $X$, realiza sempre cerca de $\\log_2 n$ comparações. Assim, só quando $X$ está no início (ou muito próximo dele) a sequencial pode ser mais rápida.',
  },
  {
    id: 'aed-mt2-2016-q6',
    title: 'Pesquisa numa lista duplamente ligada ordenada',
    source: 'Teste 2, 2016/17',
    topic: 'pesquisa',
    prompt:
      'Uma lista duplamente ligada mantém os elementos ordenados por ordem crescente. Usando o algoritmo de pesquisa mais adequado para essa lista, qual é a complexidade temporal da operação de pesquisa?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$O(n)$',
          correct: true,
          explanation:
            'Numa lista ligada não há acesso direto ao elemento do meio, pelo que a pesquisa binária não é eficiente; a pesquisa sequencial é $O(n)$.',
        },
        {
          text: '$O(\\log n)$',
          correct: false,
          explanation:
            'A pesquisa binária exige acesso em $O(1)$ a qualquer posição, o que uma lista ligada não oferece.',
        },
        {
          text: '$O(1)$',
          correct: false,
          explanation:
            'Não é possível aceder diretamente a um elemento arbitrário.',
        },
        {
          text: '$O(n\\log n)$',
          correct: false,
          explanation: 'É pior do que o custo real da pesquisa sequencial.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution: '$O(n)$.',
    reasoning:
      'Numa lista ligada (simples ou dupla) não existe acesso indexado em $O(1)$ ao elemento central, condição necessária para a pesquisa binária. O melhor algoritmo é a pesquisa sequencial, que no pior caso percorre todos os $n$ nós: $O(n)$.',
  },
];

export const mt2Complexidade: ExamQuestion[] = [
  {
    id: 'aed-mt2-2015-q5',
    title: 'Tempo de execução de um algoritmo O(N^1/2) para N=1000',
    source: 'Teste 2 (CI2), 2015/16',
    topic: 'complexidade',
    prompt:
      'Suponha um algoritmo de complexidade temporal $O(N^{1/2})$. Para $N=100$, o seu tempo de execução é de 1 minuto. Qual é o tempo aproximado de execução para $N=1000$?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa a proporcionalidade com $\\sqrt{N}$.',
        'A resposta indica cerca de 3 minutos ($\\sqrt{10}\\approx 3{,}16$ minutos).',
      ],
    },
    solution:
      'Cerca de 3 minutos ($\\sqrt{1000}/\\sqrt{100}=\\sqrt{10}\\approx 3{,}16$ minutos).',
    reasoning:
      'Como o tempo é proporcional a $N^{1/2}$, passar de $N=100$ para $N=1000$ multiplica o tempo por $\\sqrt{1000}/\\sqrt{100}=\\sqrt{10}\\approx 3{,}16$. Logo o tempo rondará os $3{,}16$ minutos, ou seja, cerca de 3 minutos.',
  },
  {
    id: 'aed-mt2-2015-q6',
    title: 'Complexidade da função methodX',
    source: 'Teste 2 (CI2), 2015/16',
    topic: 'complexidade',
    prompt:
      'Indique a complexidade temporal da função:\n\n```cpp\nint methodX(int n) {\n  int s = 0;\n  while (n > 1) {\n    n = n/2;\n    s++;\n  }\n  return s;\n}\n```',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$O(n\\log n)$',
          correct: false,
          explanation: 'Não há dois fatores que cresçam ambos com $n$.',
        },
        {
          text: '$O(n)$',
          correct: false,
          explanation:
            'O valor de $n$ não diminui um número constante de vezes; antes é dividido por 2.',
        },
        {
          text: '$O(\\log n)$',
          correct: true,
          explanation:
            'Em cada iteração $n$ passa a metade, pelo que o ciclo corre cerca de $\\log_2 n$ vezes.',
        },
        {
          text: '$O(n^2)$',
          correct: false,
          explanation: 'Muito acima do número real de iterações.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution: '$O(\\log n)$.',
    reasoning:
      'O ciclo repete-se enquanto $n>1$, dividindo $n$ por 2 em cada passo: $n, n/2, n/4, \\dots, 1$. O número de iterações é, portanto, aproximadamente $\\log_2 n$, pelo que a complexidade é $O(\\log n)$.',
  },
  {
    id: 'aed-mt2-2017-q1',
    title: 'Vetores e listas da STL em inserções e remoções',
    source: 'Teste 2, 2017/18',
    topic: 'complexidade',
    prompt:
      'Considere as implementações de vetores (`vector`) e listas (`list`) da STL. Sobre a eficiência temporal, o que é correto afirmar sobre as operações de inserção e remoção?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Vetores e listas são igualmente eficientes nas operações de inserção e remoção',
          correct: false,
          explanation:
            'Inserir ou remover no meio de um vetor exige deslocar elementos ($O(n)$).',
        },
        {
          text: 'Listas são geralmente mais eficientes que vetores nas operações de inserção e remoção',
          correct: true,
          explanation:
            'Numa lista, basta religar ponteiros ($O(1)$ conhecida a posição); num vetor é preciso deslocar todos os elementos seguintes ($O(n)$).',
        },
        {
          text: 'Vetores são geralmente mais eficientes do que listas nas operações de inserção e remoção',
          correct: false,
          explanation:
            'O acesso por índice torna o vetor melhor na pesquisa, não na inserção/remoção no meio.',
        },
        {
          text: 'Listas são geralmente mais eficientes que vetores na inserção, mas não na remoção',
          correct: false,
          explanation:
            'A remoção numa lista também é $O(1)$ conhecida a posição.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'Há uma resposta correta.',
        },
      ],
    },
    solution:
      'Listas são geralmente mais eficientes que vetores nas operações de inserção e remoção',
    reasoning:
      'Numa `list`, inserir ou remover um elemento numa posição conhecida é apenas uma religação de ponteiros, em $O(1)$. Num `vector`, essas operações de inserção e remoção no meio do vetor obrigam a deslocar todos os elementos seguintes, em $O(n)$. O vetor continua vantajoso no acesso por índice ($O(1)$) e na pesquisa binária.',
  },
];
