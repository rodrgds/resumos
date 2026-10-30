import type { ExamQuestion } from '../../lib/exam-question';

export const processos: ExamQuestion[] = [
  {
    id: 'so-exame-2021-q1',
    title: 'Saída de um programa com fork e wait',
    source: 'Exame (época normal), 2020/21',
    topic: 'processos',
    prompt:
      'Considere o seguinte excerto de código. O que será impresso na saída padrão?\n\n```c\nint global = 0;\nvoid main() {\n  int pid = fork();\n  if (pid == 0) { global++; }\n  else { wait(NULL); global--; }\n  printf("%d ", global);\n}\n```',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '-1 1',
          correct: false,
          explanation:
            'A ordem estaría invertida; o wait() garante que o filho imprime primeiro.',
        },
        {
          text: '0 0',
          correct: false,
          explanation:
            'Após o fork, cada processo tem a sua própria cópia de global.',
        },
        {
          text: '1 -1',
          correct: true,
          explanation:
            'O filho incrementa a sua cópia (fica 1) e o pai, após esperar, decrementa a sua (fica -1).',
        },
      ],
    },
    solution: 'A saída é `1 -1`.',
    reasoning:
      'O `fork()` cria um processo filho e cada processo passa a ter a sua própria cópia da variável `global`. O filho executa o ramo `pid == 0` e coloca a sua cópia a 1; o pai espera com `wait(NULL)` e depois coloca a sua cópia a -1. Como o `wait()` garante que o filho termina antes de o pai continuar, a saída é primeiro `1 ` (filho) e depois `-1 ` (pai).',
  },
  {
    id: 'so-exame-2019-q1',
    title: 'Quantas vezes é impresso Hello num ciclo de fork',
    source: 'Exame (época normal), 2018/19',
    topic: 'processos',
    prompt:
      'Considere o código `for (int i = 1; i <= 3; i++) { fork(); } printf("Hello ");`. Quantas vezes é impressa a palavra `Hello` na saída padrão?',
    answer: { kind: 'number', value: 8, tolerance: 0 },
    solution: 'São impressas 8 vezes.',
    reasoning:
      'Cada chamada a `fork()` duplica o número de processos em execução. Começando com 1 processo, após 3 iterações há $2^3 = 8$ processos, e cada um executa o `printf`, pelo que `Hello` aparece 8 vezes.',
  },
  {
    id: 'so-exame-2021-q2',
    title: 'Quem executa primeiro depois de um fork',
    source: 'Exame (época normal), 2020/21',
    topic: 'processos',
    prompt:
      'Na sequência da invocação da chamada `fork()`, o novo processo irá começar imediatamente a executar. Indique se esta afirmação é verdadeira.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não, pois o processo pai é sempre o primeiro a executar.',
          correct: false,
          explanation:
            'O escalonador decide; não há garantia de que o pai seja o primeiro.',
        },
        {
          text: 'Sim, se for escolhida a opção certa para o fork().',
          correct: false,
          explanation:
            'O fork() não tem opções que controlem quem executa primeiro.',
        },
        {
          text: 'Não é possível afirmar isso com certeza.',
          correct: true,
          explanation:
            'Após o fork() existem dois processos em execução e não se pode saber qual deles o escalonador despacha primeiro.',
        },
      ],
    },
    solution:
      'Não é possível afirmar com certeza qual dos dois processos começa a executar primeiro.',
    reasoning:
      'O `fork()` gera um novo processo que continua a execução do programa a partir da invocação desse comando. Passam a existir dois processos (pai e filho) e o sistema operativo escalona ambos; quem executa primeiro varia, pelo que não se pode afirmar com certeza.',
  },
];

export const sincronizacao: ExamQuestion[] = [
  {
    id: 'so-exame-2020-q1',
    title: 'Sequência f1, f2, f3 com semáforos',
    source: 'Exame (época normal), 2019/20',
    topic: 'sincronizacao',
    prompt:
      'Três threads, T1, T2 e T3, de um mesmo programa, têm três blocos de código, respetivamente `f1()`, `f2()` e `f3()`, que se pretende que sejam executados sequencial e repetidamente, começando sempre por `f1()`, seguindo-se `f2()` e `f3()` por qualquer ordem, com a restrição de que `f2()` e `f3()` nunca são executados simultaneamente e de que `f1()` só volta a executar depois de `f2()` e `f3()` terem concluído. A sequência é: `f1()` → [`f2()` → `f3()` ou `f3()` → `f2()`] → `f1()` → ...\n\nRecorrendo apenas a semáforos, indique como implementaria o código de T1, T2 e T3 que garante esta sequência e como inicializa os semáforos. Considere disponíveis as funções `init(sem, value)`, `wait(sem)` e `signal(sem)`.',
    answer: {
      kind: 'self',
      checklist: [
        'Usa um semáforo distinto para libertar f2() e f3() (inicializados a 0) e um semáforo de exclusão mútua entre f2() e f3() (inicializado a 1).',
        'T1 executa f1(), sinaliza os dois semáforos de libertação e espera duas vezes no semáforo de fim de ronda.',
        'T2 e T3 esperam no seu semáforo de libertação, adquirem o semáforo de exclusão mútua, executam a sua função, libertam a exclusão mútua e sinalizam o fim da sua tarefa.',
      ],
    },
    solution:
      '```c\ninit(sem2, 0); init(sem3, 0); init(semX, 1); init(sem1, 0);\n\n// T1:  while (1) { f1(); signal(sem2); signal(sem3); wait(sem1); wait(sem1); }\n// T2:  while (1) { wait(sem2); wait(semX); f2(); signal(semX); signal(sem1); }\n// T3:  while (1) { wait(sem3); wait(semX); f3(); signal(semX); signal(sem1); }\n```',
    reasoning:
      'O semáforo `semX` (valor inicial 1) garante que `f2()` e `f3()` nunca correm em simultâneo. Os semáforos `sem2` e `sem3` (valor inicial 0) libertam respetivamente T2 e T3 depois de `f1()`; o semáforo `sem1` (valor inicial 0) conta as tarefas concluídas e só deixa T1 avançar para a ronda seguinte depois de receber dois `signal(sem1)`.',
  },
  {
    id: 'so-exame-2019-q4',
    title: 'Por que não inicializar um semáforo com valor negativo',
    source: 'Exame (época normal), 2018/19',
    topic: 'sincronizacao',
    prompt:
      'Explique por que não faz sentido inicializar um semáforo com um valor negativo.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação refere que o valor inicial representa o número de recursos disponíveis.',
        'Conclui que um valor negativo não corresponde a nenhum recurso real e viola o invariante do semáforo.',
      ],
    },
    solution:
      'O valor inicial de um semáforo indica quantos recursos estão disponíveis (ou quantos sinalizações podem ser consumidas de imediato). Um valor negativo não corresponde a nenhum recurso existente, pelo que não faz sentido e quebra o invariante de que o semáforo não pode ficar negativo durante a execução.',
    reasoning:
      'Num semáforo de contagem, `wait()` bloqueia quando o contador é zero e `signal()` incrementa. Se o semáforo começasse negativo, a primeira operação `wait()` ainda o decrementaria e o número de sinais consumidos deixaria de corresponder a recursos existentes, tornando o controlo de sincronização incorreto.',
  },
  {
    id: 'so-exame-2021-q3',
    title: 'Variável de condição em programação POSIX',
    source: 'Exame (época normal), 2020/21',
    topic: 'sincronizacao',
    prompt:
      'Em programação POSIX, uma variável de condição deve ser sempre usada em associação com um mutex. Indique a opção correta e justifique.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não, tal não é necessário, pois a variável de condição é suficiente.',
          correct: false,
          explanation:
            'Sem mutex, o teste da condição e a espera não são atómicos, dando origem a corridas.',
        },
        {
          text: 'Talvez, se não se puder usar outro tipo de semáforo.',
          correct: false,
          explanation:
            'Não se trata de uma alternativa opcional; o mutex é obrigatório.',
        },
        {
          text: 'Sim, para garantir o acesso exclusivo à zona onde se vai usar a variável de condição.',
          correct: true,
          explanation:
            'O mutex protege a condição entre o teste e o wait, evitando sinais perdidos.',
        },
      ],
    },
    solution:
      'Sim, a variável de condição deve ser sempre usada em associação com um mutex.',
    reasoning:
      'A variável de condição não tem estado próprio: é preciso um mutex para garantir acesso exclusivo à variável de condição, permitindo testar a condição e chamar `pthread_cond_wait()` de forma atómica, de modo a não perder sinalizações entre o teste e a espera.',
  },
];

export const impasses: ExamQuestion[] = [
  {
    id: 'so-exame-2021-q4',
    title: 'Ordem de aquisição de mutexes sem encravar',
    source: 'Exame (época normal), 2020/21',
    topic: 'impasses',
    prompt:
      'Um programa tem 3 threads T1, T2 e T3 que invocam uma função `work(...)` sobre recursos R1, R2 e R3, cada um protegido por um mutex (`m1`, `m2`, `m3`). T1 usa R1 e R2, T2 usa R1, R2 e R3 e T3 usa R2 e R3. Indique, para cada thread, uma ordem de `lock()` dos mutexes que impeça o programa de encravar, executando com a máxima eficiência.',
    answer: {
      kind: 'self',
      checklist: [
        'T1 adquire os mutexes por ordem crescente: m1 e depois m2.',
        'T2 adquire os mutexes por ordem crescente: m1, m2 e m3.',
        'T3 adquire os mutexes por ordem crescente: m2 e depois m3.',
        'A justificação refere que todas as threads seguem a mesma ordem global (m1 < m2 < m3), o que elimina a espera circular.',
      ],
    },
    solution:
      'T1: `lock(m1); lock(m2); work(R1,R2); unlock(m2); unlock(m1);`\nT2: `lock(m1); lock(m2); lock(m3); work(R1,R2,R3); unlock(m3); unlock(m2); unlock(m1);`\nT3: `lock(m2); lock(m3); work(R2,R3); unlock(m3); unlock(m2);`',
    reasoning:
      'Um encravamento exige espera circular, que se evita se todos os processos adquirirem os recursos segundo uma mesma ordem global. Aqui a ordem global m1 → m2 → m3 funciona: T1 usa (m1, m2), T2 usa (m1, m2, m3) e T3 usa (m2, m3), todas por ordem crescente, pelo que nenhum ciclo de espera se pode formar.',
  },
  {
    id: 'so-exame-2020-q2',
    title: 'Forma mais simples de prevenir deadlocks',
    source: 'Exame (época normal), 2019/20',
    topic: 'impasses',
    prompt:
      'Qual é a forma mais simples que um programador tem de prevenir a existência de deadlocks nos seus programas?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica impor uma ordem total sobre os recursos.',
        'Refere que todos os recursos devem ser requisitados sempre por essa mesma ordem.',
      ],
    },
    solution:
      'Ordenar os recursos e requisitá-los sempre pela mesma ordem (por exemplo, por ordem crescente do seu identificador).',
    reasoning:
      'Uma das quatro condições necessárias para um deadlock é a espera circular. Se todos os processos requisitarem os recursos segundo uma ordem global fixa, essa espera circular nunca pode surgir, eliminando assim a possibilidade de encravamento.',
  },
];

export const memoria: ExamQuestion[] = [
  {
    id: 'so-exame-2019-q3',
    title: 'Faltas de página com LRU e 4 quadros',
    source: 'Exame (época normal), 2018/19',
    topic: 'memoria',
    prompt:
      'Um processo em execução num sistema com paginação a pedido tem atribuídos 4 quadros (frames) e nenhuma página carregada inicialmente. A sua sequência de referências às páginas é:\n\n`1, 2, 3, 4, 1, 5, 4, 3, 6, 5, 1, 3, 2, 4, 6, 1, 5, 2, 4`\n\nConsiderando a substituição de páginas com alcance local segundo o algoritmo LRU, indique quantas faltas de página são geradas por esta sequência.',
    answer: { kind: 'number', value: 14, tolerance: 0 },
    solution: 'São geradas 14 faltas de página.',
    reasoning:
      'Com 4 quadros e LRU, cada referência a uma página fora dos quadros causa falta e expulsa a página usada há mais tempo. Percorrendo a sequência, as faltas dão-se nas referências 1, 2, 3, 4, 5, 6, 1, 2, 4, 6, 1, 5, 2 e 4, num total de 14 faltas (as restantes 6 referências são acertos).',
  },
  {
    id: 'so-exame-2021-q5',
    title: 'Método de alocação de memória detetado pelos espaços vazios',
    source: 'Exame (época normal), 2020/21',
    topic: 'memoria',
    prompt:
      'Num sistema de memória, numa dada ocasião, os espaços vazios (holes), por ordem crescente de posição, são: 10 KiB, 4 KiB, 20 KiB, 18 KiB, 7 KiB e 9 KiB. São feitos 3 pedidos sequenciais de 10 KiB, 12 KiB e 9 KiB e, após isso, a lista ordenada de espaços vazios fica: 4 KiB, 20 KiB, 6 KiB e 7 KiB. Qual foi o método de alocação utilizado?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Primeiro a servir (first fit)',
          correct: false,
          explanation:
            'Com first fit, o pedido de 10 KiB ocuparia o primeiro espaço de 10 KiB e o de 12 KiB o de 20 KiB, deixando outros restos.',
        },
        {
          text: 'Melhor a servir (best fit)',
          correct: true,
          explanation:
            'O pedido de 10 KiB usa o espaço exato de 10 KiB, o de 12 KiB usa o de 18 KiB (deixando 6 KiB) e o de 9 KiB usa o exato de 9 KiB, quedando 4, 20, 6 e 7 KiB.',
        },
        {
          text: 'Pior a servir (worst fit)',
          correct: false,
          explanation:
            'Com worst fit, o pedido de 10 KiB ocuparia o maior espaço (20 KiB), o que não aconteceu.',
        },
      ],
    },
    solution: 'Foi utilizado o método melhor a servir (best fit).',
    reasoning:
      'Com best fit: o pedido de 10 KiB escolhe o espaço de 10 KiB (ajuste exato); o de 12 KiB escolhe o de 18 KiB, sobrando 6 KiB; o de 9 KiB escolhe o de 9 KiB (ajuste exato). Restam então os espaços 4 KiB, 20 KiB, 6 KiB e 7 KiB, exatamente os indicados.',
  },
  {
    id: 'so-exame-2019-q2',
    title: 'Número de entradas da tabela de páginas',
    source: 'Exame (época normal), 2018/19',
    topic: 'memoria',
    prompt:
      'Num sistema em que a gestão de memória é baseada em paginação simples, os endereços lógicos têm 32 bits e as páginas têm 16 KiB. Quantos elementos tem a tabela de páginas?',
    answer: { kind: 'number', value: 262144, tolerance: 0 },
    solution: 'A tabela de páginas tem $2^{18} = 262144$ elementos.',
    reasoning:
      'Uma página de 16 KiB = $2^{14}$ bytes precisa de 14 bits para o deslocamento dentro da página. Dos 32 bits do endereço lógico, os restantes $32 - 14 = 18$ bits identificam a página, pelo que a tabela de páginas tem $2^{18} = 262144$ entradas.',
  },
  {
    id: 'so-exame-2020-q3',
    title: 'Papel dos bits de referência e de modificação',
    source: 'Exame (época normal), 2019/20',
    topic: 'memoria',
    prompt:
      'Num sistema que usa paginação a pedido (demand paging), qual a importância de cada página ter associado um bit de referência (reference bit) e um bit de modificação (modified bit)?',
    answer: {
      kind: 'self',
      checklist: [
        'Refere que ambos apoiam a escolha da página a substituir quando não há quadros livres.',
        'O bit de referência indica se a página foi acedida recentemente (apoia algoritmos como o LRU/NRU).',
        'O bit de modificação indica se a página foi alterada; páginas não modificadas são substituídas primeiro porque não exigem escrita em disco.',
      ],
    },
    solution:
      'Ambos facilitam a troca de página quando já não há quadros disponíveis: o bit de referência permite saber quais as páginas que não foram acedidas recentemente (as menos recentemente usadas devem ser as primeiras a ser substituídas, como no LRU), e o bit de modificação permite saber quais não foram alteradas desde que foram carregadas, que são substituídas primeiro porque dispensam a escrita no disco.',
    reasoning:
      'Na altura de libertar um quadro, o sistema operativo precisa de escolher a vítima. O bit de referência alimenta as aproximações do LRU (páginas não referenciadas recentemente são boas candidatas) e o bit de modificação evita o custo de escrever páginas limpas de volta ao disco, que é o que torna a substituição de páginas modificadas mais cara.',
  },
];

export const comunicacao: ExamQuestion[] = [
  {
    id: 'so-exame-2021-q6',
    title: 'Saída de um tratador de sinal SIGUSR1',
    source: 'Exame (época normal), 2020/21',
    topic: 'comunicacao',
    prompt:
      'Considere o programa, executado sem erros nas chamadas de sistema:\n\n```c\nvoid handler(int signo) { printf("Hello "); }\n\nvoid main() {\n  struct sigaction new;\n  sigset_t smask; sigemptyset(&smask);\n  new.sa_handler = handler; new.sa_mask = smask; new.sa_flags = 0;\n  sigaction(SIGUSR1, &new, NULL);\n  pause(); printf("World.\\n");\n}\n```\n\nO que aparecerá na saída padrão assim que for enviado ao processo o sinal SIGUSR1?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Hello World.',
          correct: true,
          explanation:
            'O handler de SIGUSR1 imprime "Hello " e, ao regressar, o pause() é interrompido e imprime "World.".',
        },
        {
          text: 'World. Hello',
          correct: false,
          explanation:
            'A ordem estaría invertida; o handler corre durante o pause().',
        },
        {
          text: 'World.',
          correct: false,
          explanation: 'Falta a saída do handler, que é invocado pelo sinal.',
        },
      ],
    },
    solution: 'Aparece `Hello World.`.',
    reasoning:
      'A chamada `sigaction(SIGUSR1, ...)` instala o `handler` para o SIGUSR1. Quando o sinal chega, o handler imprime `Hello `; depois o `pause()` é interrompido e a execução continua, imprimindo `World.`.',
  },
  {
    id: 'so-exame-2020-q4',
    title: 'Diferença entre popen e execlp com redirecionamento',
    source: 'Exame (época normal), 2019/20',
    topic: 'comunicacao',
    prompt:
      'Um programa client pretende enviar para um FIFO (pipe com nome) a saída do utilitário `md5sum` aplicado a um ficheiro. A implementação 1 faz `snprintf(cmd, ..., "md5sum %s", argv[1]); FILE *f = popen(cmd, "r"); fread(msg, MAX_SIZE, 1, f); write(fd, msg, MAX_SIZE);` enquanto a implementação 2 faz `dup2(fd, STDOUT_FILENO); close(fd); execlp("md5sum", "md5sum", argv[1], NULL);`. Explique sucintamente a diferença entre as duas implementações.',
    answer: {
      kind: 'self',
      checklist: [
        'Refere que a implementação 1 cria um pipe anónimo com popen() entre o client e o md5sum e depois copia os dados para o FIFO.',
        'Refere que a implementação 2 substitui o processo client pelo md5sum com execlp().',
        'Refere que, na implementação 2, o redirecionamento com dup2() faz o md5sum escrever diretamente no FIFO.',
      ],
    },
    solution:
      'Na implementação 1, o `popen()` cria um pipe entre o client e o processo `md5sum`; o client lê o resultado desse pipe e só depois o escreve no FIFO. Na implementação 2, o processo client é substituído pelo `md5sum` (`execlp`) e, como a saída padrão foi redirecionada para o FIFO com `dup2()`, o `md5sum` escreve diretamente no FIFO, sem cópias intermédias.',
    reasoning:
      'Ambas enviam o resumo para o servidor, mas a segunda evita o pipe adicional e a cópia de dados: o descritor do FIFO passa a ser a saída padrão do próprio `md5sum`, que escreve a mensagem diretamente no canal.',
  },
];

export const ficheiros: ExamQuestion[] = [
  {
    id: 'so-exame-2021-q7',
    title: 'Conteúdo de um i-node em Unix',
    source: 'Exame (época normal), 2020/21',
    topic: 'ficheiros',
    prompt:
      'Em Unix, um nó de indexação (i-node) contém os atributos de um ficheiro e os seus blocos de dados. Indique a afirmação correta.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Sim, o i-node contém o nome do ficheiro, a data da sua criação, os seus blocos de dados, etc.',
          correct: false,
          explanation:
            'O nome do ficheiro está na entrada de diretório, não no i-node.',
        },
        {
          text: 'Só será assim se o ficheiro for pequeno; se for grande, o i-node não tem blocos de dados.',
          correct: false,
          explanation:
            'O tamanho do ficheiro não muda o que o i-node armazena.',
        },
        {
          text: 'Não, o i-node além dos atributos só tem endereços que conduzem aos blocos de dados.',
          correct: true,
          explanation:
            'O i-node guarda os atributos e os apontadores para os blocos (diretos, indiretos), não os dados em si.',
        },
      ],
    },
    solution:
      'O i-node contém os atributos do ficheiro e os endereços (apontadores) que conduzem aos blocos de dados, não os blocos em si.',
    reasoning:
      'Em sistemas de ficheiros do tipo Unix, cada i-node guarda os metadados do ficheiro (tipo, permissões, datas, tamanho) e uma lista de apontadores para os blocos de disco onde os dados residem, incluindo esquema de indireção para ficheiros grandes. O nome do ficheiro fica nas entradas dos diretórios.',
  },
  {
    id: 'so-exame-2019-q5',
    title: 'Como o i-node suporta ficheiros muito grandes',
    source: 'Exame (época normal), 2018/19',
    topic: 'ficheiros',
    prompt:
      'A estrutura dos i-nodes dos sistemas de ficheiros do tipo Linux foi pensada para suportar ficheiros de tamanhos muito diversos, desde alguns KiB a alguns TiB. Descreva sucintamente como isto é conseguido e justifique um potencial problema de desempenho no acesso a ficheiros muito grandes.',
    answer: {
      kind: 'self',
      checklist: [
        'Refere a indireção: o i-node tem apontadores diretos e apontadores indiretos (simples, duplo e triplo).',
        'Os apontadores indiretos acedem a blocos de apontadores, que por sua vez acedem aos blocos de dados.',
        'O problema de desempenho é o número de acessos a disco extra necessários para seguir a cadeia de indireção.',
      ],
    },
    solution:
      'O i-node combina um pequeno número de apontadores diretos com apontadores indiretos de um, dois e três níveis: cada nível aponta para um bloco de apontadores, que por sua vez aponta para blocos de dados (ou para outro nível de apontadores). Assim, ficheiros pequenos usam apenas os diretos e ficheiros muito grandes são cobertos pelos níveis de indireção. O custo é que, num ficheiro muito grande, seguir a cadeia de indireção exige vários acessos a disco adicionais antes de chegar aos dados.',
    reasoning:
      'Sem indireção, um i-node com apontadores diretos limitaria o tamanho máximo do ficheiro. Com indireção simples, dupla e tripla, o número de blocos endereçáveis cresce exponencialmente com o número de níveis, permitindo chegar a TiB, à custa de alguma profundidade de pesquisa em disco para ficheiros grandes.',
  },
];
