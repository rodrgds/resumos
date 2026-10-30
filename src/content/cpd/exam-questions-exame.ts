import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  comunicacao:
    '/cadeiras/cpd/sistemas-distribuidos-comunicacao/#atraso-timeout-e-repetição',
  servidores:
    '/cadeiras/cpd/sistemas-distribuidos-comunicacao/#servidores-com-estado-e-eventos',
  relogios:
    '/cadeiras/cpd/relogios-causalidade/#tempo-físico-e-atraso-limitado',
  lamport: '/cadeiras/cpd/relogios-causalidade/#relógios-de-lamport',
  falhas: '/cadeiras/cpd/tolerancia-falhas/#two-phase-commit',
  bloqueio: '/cadeiras/cpd/tolerancia-falhas/#por-que-o-2pc-pode-bloquear',
  primario: '/cadeiras/cpd/tolerancia-falhas/#replicação-primário-apoio',
  falsaPartilha: '/cadeiras/cpd/arquiteturas-memoria-cache/#falsa-partilha',
  hibrido: '/cadeiras/cpd/paralelismo-openmp/#tipos-de-paralelismo',
  threads:
    '/cadeiras/cpd/computacao-paralela-introducao/#processos-threads-e-núcleos',
  consistencia:
    '/cadeiras/cpd/sistemas-distribuidos-comunicacao/#ordenar-mensagens',
  dns: '/cadeiras/cpd/escalabilidade-dns/#nomes-zonas-e-delegação',
};

export const exameComunicacao: ExamQuestion[] = [
  {
    id: 'cpd-exame-2025-q1',
    title: 'Transporte adequado para operações não idempotentes',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'comunicacao',
    prompt:
      'Na presença de uma função não idempotente, qual dos protocolos é mais adequado usar?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'TCP, porque tem canais bidirecionais.',
          correct: false,
          explanation:
            'A bidirecionalidade não garante a semântica de execução pretendida.',
        },
        {
          text: 'UDP, porque não tem deduplicação de mensagens.',
          correct: false,
          explanation:
            'Sem deduplicação, uma retransmissão pode executar a operação duas vezes.',
        },
        {
          text: 'TCP, porque garante a entrega das mensagens.',
          correct: true,
          explanation:
            'Com entrega garantida e sem duplicados, a operação não idempotente executa no máximo uma vez por pedido.',
        },
        {
          text: 'UDP, porque envia a mensagem inteira num único pacote.',
          correct: false,
          explanation:
            'O tamanho do pacote não impede retransmissões nem duplicados.',
        },
      ],
    },
    solution: 'TCP, porque garante a entrega das mensagens.',
    reasoning:
      'Uma operação não idempotente não pode ser executada mais do que uma vez com o mesmo efeito. O TCP, ao garantir entrega sem duplicados, assegura essa semântica; o UDP pode perder ou duplicar mensagens em retransmissões.',
    explanation: link.comunicacao,
  },
  {
    id: 'cpd-exame-2025-q2',
    title: 'Cache de respostas para semântica at-most-once',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'comunicacao',
    prompt:
      'Num sistema RPC sobre UDP com semântica at-most-once, o cliente envia um pedido mas a mensagem de resposta perde-se. Que mecanismo permite ao middleware evitar reexecutar o procedimento quando o cliente retransmite?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O cliente inclui um timestamp no pedido e o servidor rejeita pedidos com timestamp anterior ao último recebido.',
          correct: false,
          explanation:
            'Timestamps não impedem a reexecução; apenas ordenam pedidos.',
        },
        {
          text: 'O servidor mantém uma cache de respostas que guarda os resultados dos pedidos recentes, indexados por um identificador único de cliente/pedido.',
          correct: true,
          explanation:
            'Ao reenviar o mesmo pedido, o servidor devolve a resposta em cache em vez de executar de novo, garantindo at-most-once.',
        },
        {
          text: 'O middleware converte automaticamente a ligação UDP numa ligação TCP após a primeira retransmissão.',
          correct: false,
          explanation:
            'Não há conversão automática de UDP para TCP no middleware RPC.',
        },
        {
          text: 'O servidor usa um mecanismo de bloqueio global que só deixa processar um pedido de cada vez.',
          correct: false,
          explanation:
            'O bloqueio não impede que o mesmo pedido seja executado outra vez.',
        },
      ],
    },
    solution:
      'Uma cache de respostas no servidor, indexada por identificador único de cliente/pedido.',
    reasoning:
      'Se a resposta se perdeu mas o pedido foi executado, uma retransmissão não pode executar o procedimento outra vez. Guardando o resultado de cada pedido, o servidor responde à duplicata com a resposta em cache.',
    explanation: link.comunicacao,
  },
  {
    id: 'cpd-exame-2015-q1',
    title: 'RPC at-most-once com operações idempotentes',
    source: 'Exame, 2014/15',
    topic: 'comunicacao',
    prompt:
      'Indique se é verdadeira ou falsa a afirmação, justificando: "Uma biblioteca de RPC que suporte a semântica at-most-once não pode ser usada em aplicações cliente-servidor com operações idempotentes."',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a afirmação como falsa.',
        'A justificação explica que at-most-once é compatível com operações idempotentes.',
      ],
    },
    solution: 'A afirmação é falsa.',
    reasoning:
      'A semântica at-most-once garante que cada pedido é executado no máximo uma vez, o que é perfeitamente aceitável para operações idempotentes (executar zero ou uma vez não altera o resultado). Pelo contrário, é com operações não idempotentes que o at-least-once coloca problemas.',
    explanation: link.comunicacao,
  },
];

export const exameRelogios: ExamQuestion[] = [
  {
    id: 'cpd-exame-2025-q3',
    title: 'Estimativa de relógio que minimiza o pior erro',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'relogios',
    prompt:
      'Num sistema síncrono, o relógio do emissor marca 100 ms no envio e o atraso de trânsito está no intervalo $[4, 12]$ ms. Que estimativa minimiza o erro no pior caso e qual é esse erro?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '108 ms com uma margem de erro de 4 ms.',
          correct: true,
          explanation:
            'O ponto médio do intervalo é $100+(4+12)/2=108$ ms e a半-amplitude é $(12-4)/2=4$ ms.',
        },
        {
          text: '108 ms com uma margem de erro de 8 ms.',
          correct: false,
          explanation:
            'A margem de erro é metade da amplitude do intervalo, não a amplitude toda.',
        },
        {
          text: '104 ms com uma margem de erro de 8 ms.',
          correct: false,
          explanation:
            '104 ms corresponde ao limite inferior do atraso, não ao ponto médio.',
        },
        {
          text: '112 ms com uma margem de erro de 8 ms.',
          correct: false,
          explanation:
            '112 ms corresponde ao limite superior do atraso, não ao ponto médio.',
        },
      ],
    },
    solution: '108 ms, com uma margem de erro de 4 ms.',
    reasoning:
      'Com o atraso $d\in[4,12]$ ms, a melhor estimativa do instante de receção é o ponto médio $100+8=108$ ms. O erro máximo nessa estimativa é metade da amplitude do intervalo: $(12-4)/2=4$ ms.',
    explanation: link.relogios,
  },
  {
    id: 'cpd-exame-2014-q1',
    title: 'Por que o NTP usa duas mensagens',
    source: 'Exame, 2013/14',
    topic: 'relogios',
    prompt:
      'Embora seja possível sincronizar relógios usando uma única mensagem, muitos protocolos, por exemplo o NTP, usam duas mensagens, uma em cada direção. Explique porquê.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que com uma só mensagem não é possível separar o desvio do relógio do atraso de transmissão.',
        'A resposta indica que as duas mensagens permitem medir o round-trip e limitar o erro da sincronização.',
      ],
    },
    solution:
      'Com duas mensagens (pedido e resposta, cada uma com timestamp) o cliente mede o tempo de ida e volta e estima o atraso em cada direção, separando o desvio do relógio do atraso de rede.',
    reasoning:
      'Numa única mensagem, o recetor mistura o seu desvio com o atraso de transmissão e não consegue distingui-los. Com um pedido e uma resposta, o NTP calcula o round-trip e usa metade como estimativa do atraso em cada direção, obtendo um limite superior para o erro.',
    explanation: link.relogios,
  },
  {
    id: 'cpd-exame-2015-q2',
    title: 'Lamport implica comparação vetorial?',
    source: 'Exame, 2014/15',
    topic: 'relogios',
    prompt:
      'Sejam $e_1$ e $e_2$ dois eventos e $LS(e)$ e $VS(e)$ o timestamp de Lamport e o timestamp vetorial do evento $e$, respetivamente. Indique se é verdadeira ou falsa a implicação $LS(e_1)<LS(e_2)\Rightarrow VS(e_1)<VS(e_2)$, justificando.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta classifica a implicação como falsa.',
        'A justificação dá um contraexemplo ou explica que a ordem de Lamport não implica a ordem parcial vetorial.',
      ],
    },
    solution: 'A implicação é falsa.',
    reasoning:
      'O timestamp de Lamport só garante que se $e_1$ aconteceu antes de $e_2$ então $LS(e_1)<LS(e_2)$; a recíproca não é válida. Dois eventos concorrentes podem ter $LS(e_1)<LS(e_2)$ sem que $VS(e_1)<VS(e_2)$ (um componente do vetor de $e_2$ pode ser menor). Só os timestamps vetoriais comparam a relação aconteceu-antes de forma exata.',
    explanation: link.lamport,
  },
];

export const exameFalhas: ExamQuestion[] = [
  {
    id: 'cpd-exame-2014-q2',
    title: 'Coordenador do 2PC falha com todos em READY',
    source: 'Exame, 2013/14',
    topic: 'falhas',
    prompt:
      'Numa execução do protocolo two-phase commit, todos os participantes estão no estado READY e o coordenador falha sem enviar a sua decisão aos participantes. É possível que os participantes venham a decidir COMMIT? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que os participantes não podem decidir COMMIT.',
        'A justificação explica que em READY o resultado ainda é incerto e só o coordenador pode decidir.',
      ],
    },
    solution:
      'Não. Sem a decisão do coordenador, os participantes em READY ficam bloqueados à espera, sem poder fazer COMMIT (nem ABORT unilateralmente).',
    reasoning:
      'Em READY, um participante já votou COMMIT mas ainda não sabe o resultado global: outro participante pode ter votado ABORT. Por isso só o coordenador, que reúne todos os votos, pode anunciar a decisão. Se ele falha antes de a enviar, o protocolo bloqueia até ele recuperar.',
    explanation: link.bloqueio,
  },
  {
    id: 'cpd-exame-2025-q4',
    title: 'Timeout no estado READY do 2PC',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'falhas',
    prompt:
      'Num protocolo 2PC, o que faz um nó quando o temporizador expira estando no estado READY?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Faz abort imediatamente.',
          correct: false,
          explanation:
            'Em READY já votou COMMIT e não pode abortar unilateralmente, pois outro nó pode ter decidido commit.',
        },
        {
          text: 'Faz commit imediatamente.',
          correct: false,
          explanation:
            'Em READY não sabe se todos votaram COMMIT; o commit unilateral romperia a atomicidade.',
        },
        {
          text: 'Executa o protocolo de terminação.',
          correct: true,
          explanation:
            'O protocolo de terminação consulta os outros participantes para descobrir a decisão tomada e sair do estado incerto.',
        },
        {
          text: 'Reinicia o protocolo.',
          correct: false,
          explanation:
            'Reiniciar não resolve a incerteza sobre a decisão já tomada.',
        },
      ],
    },
    solution: 'Executa o protocolo de terminação.',
    reasoning:
      'No estado READY o nó está incerto: votou COMMIT mas não recebeu a decisão global. No timeout, consulta os outros participantes (protocolo de terminação) para saber se alguém recebeu a decisão do coordenador e assim concluir em segurança.',
    explanation: link.bloqueio,
  },
  {
    id: 'cpd-exame-2025-q5',
    title: 'Papel do PRECOMMIT no 3PC',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'falhas',
    prompt:
      'Qual é a tarefa do passo PRECOMMIT no protocolo three-phase commit (3PC)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Reduz o número de mensagens.',
          correct: false,
          explanation: 'O 3PC acrescenta mensagens e estados, não as reduz.',
        },
        {
          text: 'Elimina a necessidade de logging.',
          correct: false,
          explanation:
            'O registo em log continua a ser necessário para a recuperação.',
        },
        {
          text: 'Impede que os processos façam commit enquanto outros estiverem num estado incerto.',
          correct: true,
          explanation:
            'O PRECOMMIT garante que, se algum participante está incerto, nenhum faz commit, evitando decisões divergentes.',
        },
        {
          text: 'Tolera falhas durante a execução.',
          correct: false,
          explanation:
            'O objetivo do passo é precisely tolerar a falha do coordenador, mas a opção não descreve o seu papel.',
        },
      ],
    },
    solution:
      'Impede que os processos façam commit enquanto outros estiverem num estado incerto.',
    reasoning:
      'No 2PC, se o coordenador falha com todos em READY, os participantes ficam bloqueados. O 3PC adiciona a fase PRECOMMIT: um participante só avança para COMMIT quando sabe que todos estão preparados, eliminando o estado incerto e permitindo terminar mesmo com falha do coordenador.',
    explanation: link.falhas,
  },
  {
    id: 'cpd-exame-2014-q3',
    title: 'Replicação primário-apoio e falhas bizantinas',
    source: 'Exame, 2013/14',
    topic: 'falhas',
    prompt:
      'A replicação do tipo primário-apoio (primary-backup) pode tolerar falhas bizantinas? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta responde que não.',
        'A justificação explica que com um primário e um apoio não é possível mascarar respostas incorretas arbitrárias.',
      ],
    },
    solution:
      'Não. Com apenas duas réplicas não é possível tolerar falhas bizantinas.',
    reasoning:
      'Numa falha bizantina, um componente pode comportar-se de forma arbitrária, incluindo enviar respostas erradas. Com um primário e um único apoio, se o primário envia respostas incorretas não há quórum para as detetar e mascarar. São precisas pelo menos $3f+1$ réplicas (4 para $f=1$) com um protocolo de quórum.',
    explanation: link.primario,
  },
];

export const exameOpenmpMemoria: ExamQuestion[] = [
  {
    id: 'cpd-exame-2025-q6',
    title: 'Caracterização de falsa partilha',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'openmp-memoria',
    prompt:
      'A falsa partilha (false sharing) em multiprocessadores caracteriza-se por:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O núcleo acede a uma variável partilhada e recebe falso porque a variável foi atualizada.',
          correct: false,
          explanation:
            'Isso descreve uma corrida de dados, não falsa partilha.',
        },
        {
          text: '2 ou mais núcleos acedem a endereços diferentes no mesmo bloco de memória (linha de cache).',
          correct: true,
          explanation:
            'Variáveis distintas na mesma linha de cache fazem o protocolo de coerência invalidar a linha nos outros núcleos a cada escrita.',
        },
        {
          text: '2 ou mais núcleos leem a mesma variável mas não escrevem.',
          correct: false,
          explanation: 'Leituras partilhadas não provocam invalidações.',
        },
        {
          text: '2 ou mais núcleos leem a mesma variável.',
          correct: false,
          explanation:
            'A leitura partilhada é suportada pela cache sem penalização.',
        },
      ],
    },
    solution:
      'Dois ou mais núcleos acedem a endereços diferentes que partilham o mesmo bloco de memória (linha de cache).',
    reasoning:
      'A coherence cache trabalha por linhas. Se duas variáveis distintas usadas por núcleos diferentes caem na mesma linha, cada escrita invalida a linha nas outras caches, arrastando acessos desnecessários apesar de não haver partilha lógica.',
    explanation: link.falsaPartilha,
  },
  {
    id: 'cpd-exame-2025-q7',
    title: 'Desafio de usar MPI e OpenMP em conjunto',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'openmp-memoria',
    prompt: 'Qual é o desafio de implementar MPI e OpenMP em conjunto?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Ambos os modelos só suportam memória partilhada.',
          correct: false,
          explanation:
            'O MPI foi concebido para memória distribuída, entre máquinas.',
        },
        {
          text: 'O OpenMP substitui completamente o MPI.',
          correct: false,
          explanation: 'O OpenMP não comunica entre máquinas distintas.',
        },
        {
          text: 'A programação híbrida elimina a necessidade de sincronização e comunicação.',
          correct: false,
          explanation:
            'A sincronização entre threads e a comunicação entre processos continuam a ser necessárias.',
        },
        {
          text: 'A programação híbrida aumenta a complexidade do programa.',
          correct: true,
          explanation:
            'Combinar MPI entre nós com OpenMP dentro de cada nó exige coordenar dois modelos de paralelismo.',
        },
      ],
    },
    solution: 'A programação híbrida aumenta a complexidade do programa.',
    reasoning:
      'O modelo híbrido (MPI entre máquinas, OpenMP dentro de cada máquina) tira partido de ambos, mas o programador tem de gerir dois níveis de paralelismo, a comunicação por mensagens e a partilha de memória, o que aumenta a complexidade.',
    explanation: link.hibrido,
  },
  {
    id: 'cpd-exame-2025-q8',
    title: 'Desvantagem das threads de nível de utilizador',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'openmp-memoria',
    prompt:
      'Qual é a desvantagem de usar threads de nível de utilizador (user-level threads)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não podem ser implementadas sem suporte do kernel.',
          correct: false,
          explanation:
            'Pelo contrário, são implementadas na biblioteca, sem chamadas de sistema por thread.',
        },
        {
          text: 'O sistema operativo precisa de manter uma tabela para cada thread.',
          correct: false,
          explanation:
            'A tabela de threads é gerida em espaço de utilizador, não pelo kernel.',
        },
        {
          text: 'Uma page fault numa das threads bloqueia a execução de todo o processo.',
          correct: true,
          explanation:
            'Como o kernel vê um único processo, uma chamada de sistema bloqueante bloqueia todas as suas threads.',
        },
        {
          text: 'Toda a criação de thread requer uma chamada de sistema.',
          correct: false,
          explanation: 'A criação em espaço de utilizador não invoca o kernel.',
        },
      ],
    },
    solution:
      'Uma page fault (ou outra chamada bloqueante) numa das threads bloqueia todo o processo.',
    reasoning:
      'Nas threads de nível de utilizador, o kernel gere apenas o processo como um todo. Se uma thread faz uma operação bloqueante, o kernel bloqueia o processo inteiro, impedindo que as restantes threads avancem.',
    explanation: link.threads,
  },
];

export const exameConsistencia: ExamQuestion[] = [
  {
    id: 'cpd-exame-2014-q4',
    title:
      'Read-your-writes e writes-follow-reads implicam consistência sequencial?',
    source: 'Exame, 2013/14',
    topic: 'consistencia',
    prompt:
      'Considere um serviço replicado que implementa read-your-writes e writes-follow-reads. Este serviço garante consistência sequencial? Justifique.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta responde que não garante consistência sequencial.',
        'A justificação explica que estas garantias são apenas por cliente, não impõem uma ordem global única.',
      ],
    },
    solution: 'Não, não garante consistência sequencial.',
    reasoning:
      'Read-your-writes e writes-follow-reads são garanties centradas no cliente: cada cliente vê as suas próprias operações por ordem. A consistência sequencial exige ainda uma ordem global única das operações de todos os clientes, que estas propriedades não impõem.',
    explanation: link.consistencia,
  },
  {
    id: 'cpd-exame-2025-q9',
    title: 'Papel do diretório num protocolo baseado em diretório',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'consistencia',
    prompt:
      'Num protocolo baseado em diretório (directory-based) para memória partilhada, qual é o papel principal do diretório?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Eliminar a necessidade de comunicação entre processos.',
          correct: false,
          explanation: 'A comunicação entre caches continua a existir.',
        },
        {
          text: 'Substituir as caches locais de cada processador.',
          correct: false,
          explanation:
            'As caches locais continuam a existir; o diretório apenas regista o estado dos blocos.',
        },
        {
          text: 'Garantir que cada bloco de memória está replicado em todas as caches.',
          correct: false,
          explanation: 'O diretório não replica blocos em todas as caches.',
        },
        {
          text: 'Registar que processos detêm cópias em cache de cada bloco de memória.',
          correct: true,
          explanation:
            'O diretório sabe que caches têm cada bloco, para enviar invalidações ou atualizações apenas a quem precisa.',
        },
      ],
    },
    solution:
      'Registar que processos detêm cópias em cache de cada bloco de memória.',
    reasoning:
      'Nos protocolos baseados em diretório, o diretório mantém, para cada bloco, a lista das caches que o detêm. Assim, uma escrita envia invalidações ou atualizações apenas às caches afetadas, em vez de fazer broadcast.',
    explanation: link.consistencia,
  },
  {
    id: 'cpd-exame-2025-q10',
    title: 'Reconciliação de réplicas com CRDT',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'consistencia',
    prompt:
      'Considere um bloco $B$ que contém $\{b_1,b_2,b_3\}$. São criadas duas outras réplicas com histórias causais, contendo $\{b_1,b_2,c_1\}$ e $\{b_1,c_1,c_2,a_1 respetivamente. Admitindo que os estados são todos concorrentes entre si, qual é o resultado de reconciliar e fundir (merge) no bloco $B$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\{b_1,b_2,c_1,c_2,a_1\\}$',
          correct: false,
          explanation: 'Falta o elemento $b_3$, que continua presente em $B$.',
        },
        {
          text: '$\\{b_4,c_2,c_1\\}$',
          correct: false,
          explanation:
            'Aparecem elementos ($b_4$) que não existem em nenhuma réplica.',
        },
        {
          text: '$\\{b_1,b_2,b_3,c_1,c_2,a_1\\}$',
          correct: true,
          explanation:
            'O merge de um CRDT de conjunto é a união dos elementos presentes nas réplicas fundidas.',
        },
        {
          text: '$\\{b_1,b_2,b_3,b_4,c_1,c_2,a_1\\}$',
          correct: false,
          explanation: 'Inclui $b_4$, que não existe em nenhuma das réplicas.',
        },
      ],
    },
    solution: '$\\{b_1,b_2,b_3,c_1,c_2,a_1\\}$.',
    reasoning:
      'Num CRDT de conjuntos, a reconciliação é a união (merge associativa, comutativa e idempotente) dos conjuntos de cada réplica: $\\{b_1,b_2,b_3\\}\cup\\{b_1,b_2,c_1\\}\cup\\{b_1,c_1,c_2,a_1\\}=\\{b_1,b_2,b_3,c_1,c_2,a_1\\}$.',
    explanation: link.consistencia,
  },
];

export const exameDnsServidores: ExamQuestion[] = [
  {
    id: 'cpd-exame-2015-q3',
    title: 'Resolução de uma chave no anel Chord',
    source: 'Exame, 2014/15',
    topic: 'dns-servidores',
    prompt:
      'Considere uma implementação de Chord com chaves de 5 bits. Assuma que os nós com identificadores 1, 9, 18, 20, 21 e 28 são os únicos nós ativos e que as suas finger tables convergiram para o valor final nesta configuração. Ilustre a resolução da chave de valor 11 por esse sistema partindo do nó 20. Explique.',
    answer: {
      kind: 'self',
      checklist: [
        'A finger table do nó 20 é (21, 28, 28, 28, 9).',
        'A resolução segue o caminho 20 → 9 e concluye que o nó responsável pela chave 11 é o nó 18.',
      ],
    },
    solution:
      'O nó responsável pela chave 11 é o nó 18, com o caminho de resolução 20 → 9.',
    reasoning:
      'Com 5 bits, os identificadores são módulo 32. A finger table do nó 20 é: $20+1\to21$, $20+2\to28$, $20+4\to28$, $20+8\to28$ e $20+16=36\equiv4\to9$, ou seja (21, 28, 28, 28, 9). Procurando o finger que precede a chave 11, o nó 20 escolhe o 9 e encaminha-lhe o pedido. No nó 9, a chave 11 cai no intervalo (9, 18], cujo sucessor é o nó 18. Assim, successor(11) = 18.',
    explanation: link.dns,
  },
  {
    id: 'cpd-exame-2025-q11',
    title: 'Arquitetura de servidor para milhares de ligações simultâneas',
    source: 'Exame (réplica de estudante), 2025/26',
    topic: 'dns-servidores',
    prompt:
      'Um servidor Web suporta milhares de ligações simultâneas minimizando o custo de comutação de contexto. Que arquitetura é mais adequada?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Iterativa (uma ligação de cada vez).',
          correct: false,
          explanation:
            'Uma servidor iterativo não serve milhares de ligações simultâneas.',
        },
        {
          text: 'Multi-thread.',
          correct: false,
          explanation:
            'Uma thread por ligação exige comutação de contexto e memória por ligação.',
        },
        {
          text: 'Orientada a eventos (event-driven).',
          correct: true,
          explanation:
            'Um único ciclo de eventos trata todas as ligações com uma thread, sem comutar de contexto por ligação.',
        },
        {
          text: 'Servidor sem estado (stateless).',
          correct: false,
          explanation:
            'Ser stateless não determina como as ligações são atendidas.',
        },
      ],
    },
    solution: 'Arquitetura orientada a eventos (event-driven).',
    reasoning:
      'Com um único processo e um ciclo de eventos, o servidor atende todas as ligações sem criar threads nem mudar de contexto por ligação, o que minimiza o custo quando há milhares de ligações simultâneas.',
    explanation: link.servidores,
  },
];
