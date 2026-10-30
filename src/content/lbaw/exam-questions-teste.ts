import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  historias: '/cadeiras/lbaw/requisitos/#histórias-de-utilizador',
  regras:
    '/cadeiras/lbaw/requisitos/#funcionalidade-qualidade-e-regra-de-negócio',
  conversao: '/cadeiras/lbaw/esquema-relacional/#as-regras-de-conversão',
  chaves: '/cadeiras/lbaw/esquema-relacional/#chaves-domínios-e-null',
  associacoes:
    '/cadeiras/lbaw/modelo-conceptual/#associações-e-multiplicidades',
  generalizacao:
    '/cadeiras/lbaw/modelo-conceptual/#generalização-e-restrições-dos-subtipos',
  agregacao:
    '/cadeiras/lbaw/consultas-relacionais/#agrega-sem-esconder-o-detalhe',
  hash: '/cadeiras/lbaw/sql-indices/#hash-b-tree-e-índice-invertido',
  sinais:
    '/cadeiras/lbaw/sql-indices/#sinais-de-relevância-e-momento-do-cálculo',
  carga: '/cadeiras/lbaw/sql-indices/#carga-seletividade-e-organização-física',
  acid: '/cadeiras/lbaw/triggers-transacoes/#acid-e-o-que-cada-letra-promete',
  triggers:
    '/cadeiras/lbaw/triggers-transacoes/#triggers-momento-unidade-e-retorno',
  procedures: '/cadeiras/lbaw/triggers-transacoes/#função-procedure-e-trigger',
  ajax: '/cadeiras/lbaw/cliente-desempenho/#pedidos-assíncronos-e-estados-da-interface',
  http: '/cadeiras/lbaw/http-estado/#pedido-e-resposta',
  laravel: '/cadeiras/lbaw/aplicacao-laravel/#orm-e-o-problema-n-1',
  acessibilidade:
    '/cadeiras/lbaw/interfaces-acessiveis/#acessibilidade-que-se-pode-verificar',
};

export const testeRequisitos: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2018-q1',
    title: 'Quem identifica as user stories',
    source: 'Exame modelo, 2018',
    topic: 'requisitos',
    prompt: 'Por quem são identificadas as user stories de um projeto?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Arquitetos do projeto',
          correct: false,
          explanation:
            'Os arquitetos usam o artefato, mas não são quem o identifica.',
        },
        {
          text: 'Developers do projeto',
          correct: false,
          explanation:
            'Os developers implementam as histórias, não as escrevem.',
        },
        {
          text: 'Stakeholders do projeto',
          correct: true,
          explanation:
            'As user stories são identificadas pelos stakeholders, que descrevem o que precisam do sistema.',
        },
        {
          text: 'Stakeholders e arquitetos do projeto',
          correct: false,
          explanation: 'Os arquitetos não fazem parte da identificação.',
        },
      ],
    },
    solution: 'Stakeholders do projeto.',
    reasoning:
      'As histórias de utilizador são pequenos requisitos escritos do ponto de vista de quem usa o sistema, logo são identificadas pelos stakeholders.',
    explanation: link.historias,
  },
  {
    id: 'lbaw-teste-2021-q1',
    title: 'Exemplo de regra de negócio',
    source: 'Teste de prática, 2021',
    topic: 'requisitos',
    prompt:
      'Qual das seguintes afirmações é um exemplo de uma regra de negócio?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '"No sistema deve ser possível editar um comentário adicionado anteriormente"',
          correct: false,
          explanation: 'É um requisito funcional do sistema.',
        },
        {
          text: '"O sistema do lado do servidor deve funcionar em várias plataformas (Linux, Mac OS, etc.)"',
          correct: false,
          explanation: 'É um requisito técnico (restrição de plataforma).',
        },
        {
          text: '"A data de devolução tem de ser superior a uma data de empréstimo que ainda não tenha devolução registada"',
          correct: true,
          explanation:
            'É uma regra do domínio do problema, independente da tecnologia usada.',
        },
        {
          text: '"O sistema deve ser implementado como aplicação web com páginas dinâmicas (HTML5, JavaScript, CSS3 e PHP)"',
          correct: false,
          explanation: 'É um requisito técnico de implementação.',
        },
      ],
    },
    solution:
      '"A data de devolução tem de ser superior a uma data de empréstimo que ainda não tenha devolução registada".',
    reasoning:
      'Uma regra de negócio é uma restrição do domínio que o sistema deve impor, qualquer que seja a tecnologia. As restantes opções são requisitos funcionais ou técnicos.',
    explanation: link.regras,
  },
];

export const testeModelacao: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2018-q2',
    title: 'Esquema relacional de utilizadores e itens',
    source: 'Exame modelo, 2018',
    topic: 'modelacao',
    prompt:
      'Considere um modelo conceptual com duas entidades, User e Item, numa associação de um para muitos: cada item pertence a um único utilizador e um utilizador pode ter vários itens. Qual dos seguintes esquemas relacionais representa melhor esse modelo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Users(id, nome, idI -> Item) Itens(id, nome)',
          correct: false,
          explanation:
            'Coloca a chave estrangeira no lado do um, o que não representa vários itens por utilizador.',
        },
        {
          text: 'Users(id, nome) Itens(id, nome, idU -> User)',
          correct: true,
          explanation:
            'A tabela do lado do muitos (Itens) guarda a referência para o utilizador.',
        },
        {
          text: 'Users(id, nome) Itens(id, nome) Item2User(idU -> User, idI -> Item)',
          correct: false,
          explanation:
            'Uma tabela associativa modela muitos para muitos, não um para muitos.',
        },
        {
          text: 'Users(id, nome, idI -> Item) Itens(id, nome, idU -> User)',
          correct: false,
          explanation:
            'Tem chaves estrangeiras nos dois lados, o que é supérfluo e inconsistente.',
        },
      ],
    },
    solution: 'Users(id, nome) Itens(id, nome, idU -> User).',
    reasoning:
      'Na conversão de uma associação um para muitos, a chave estrangeira fica sempre na relação do lado do muitos.',
    explanation: link.conversao,
  },
  {
    id: 'lbaw-teste-2019-q1',
    title: 'Composição de quartos num hotel',
    source: 'Teste de prática, 2019',
    topic: 'modelacao',
    prompt:
      'Para melhor representar num diagrama de classes UML a afirmação "Hoteis são constituídos por listas de quartos numerados sequencialmente dentro do hotel", o que deve ser feito?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Associação de muitos para um entre Quarto e Hotel',
          correct: false,
          explanation:
            'Uma associação simples não exprime a dependência de existência.',
        },
        {
          text: 'Classe-associação entre Hotel e Quarto',
          correct: false,
          explanation:
            'A classe-associação guarda atributos da associação, não o tempo de vida.',
        },
        {
          text: 'Agregação de Quarto num Hotel',
          correct: false,
          explanation:
            'Na agregação o quarto pode existir sem o hotel, o que não acontece aqui.',
        },
        {
          text: 'Composição de Quarto num Hotel',
          correct: true,
          explanation:
            'Os quartos existem apenas dentro do hotel e são numerados no seu contexto, logo há composição.',
        },
      ],
    },
    solution: 'Composição de Quarto num Hotel.',
    reasoning:
      'O quarto não tem existência própria fora do hotel (a numeração é sequencial dentro do hotel), o que caracteriza a composição.',
    explanation: link.associacoes,
  },
  {
    id: 'lbaw-teste-2021-q2',
    title: 'Classificação da herança de Animal',
    source: 'Teste de prática, 2021',
    topic: 'modelacao',
    prompt:
      "Considere que a partir de um modelo conceptual em UML com generalização foi gerado o esquema relacional:\n\n```sql\nCREATE TABLE animal (\n   id SERIAL,\n   nome VARCHAR(30) NOT NULL,\n   tipo ENUM ('cao', 'gato', 'golfinho') NOT NULL\n);\n```\n\nComo classifica a herança representada em UML?",
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não disjunta e não completa',
          correct: false,
          explanation:
            'O tipo ENUM obriga a um valor, logo a cobertura é completa.',
        },
        {
          text: 'Disjunta e não completa',
          correct: false,
          explanation:
            'O atributo tipo não pode ser nulo nem ter dois valores, logo é disjunta e completa.',
        },
        {
          text: 'Não disjunta e completa',
          correct: false,
          explanation:
            'Um animal só pode ter um tipo, logo a herança é disjunta.',
        },
        {
          text: 'Disjunta e completa',
          correct: true,
          explanation:
            'Todo o animal tem obrigatoriamente um único tipo, pelo que a generalização é disjunta e completa.',
        },
      ],
    },
    solution: 'Disjunta e completa.',
    reasoning:
      'O atributo `tipo` é obrigatório (NOT NULL) e de valores mutuamente exclusivos (ENUM), o que corresponde a uma generalização disjunta e completa.',
    explanation: link.generalizacao,
  },
];

export const testeSql: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2023-q1',
    title: 'Atributos referenciados por uma chave estrangeira',
    source: 'Teste de prática, 2023',
    topic: 'sql',
    prompt:
      'Uma FOREIGN KEY faz referência a atributos de uma segunda tabela. O que têm de ser esses atributos?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'NOT NULL',
          correct: false,
          explanation: 'NOT NULL impede nulos, mas não garante unicidade.',
        },
        {
          text: 'UNIQUE',
          correct: true,
          explanation:
            'Os atributos referenciados têm de ser uma chave candidata (UNIQUE), para que cada linha referenciada seja identificável.',
        },
        {
          text: 'DOMAIN',
          correct: false,
          explanation: 'DOMAIN define o conjunto de valores, não a unicidade.',
        },
        {
          text: 'DEFAULT',
          correct: false,
          explanation:
            'DEFAULT dá um valor por omissão, não restringe a unicidade.',
        },
      ],
    },
    solution: 'UNIQUE.',
    reasoning:
      'Uma chave estrangeira aponta para uma chave candidata da tabela referenciada, que tem de ser única (normalmente a chave primária).',
    explanation: link.chaves,
  },
  {
    id: 'lbaw-teste-2019-q2',
    title: 'WHERE versus HAVING',
    source: 'Teste de prática, 2019',
    topic: 'sql',
    prompt: 'Qual das seguintes afirmações está correta?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O comando WHERE é usado para filtrar valores de um agrupamento',
          correct: false,
          explanation: 'Quem filtra grupos (após GROUP BY) é o HAVING.',
        },
        {
          text: 'O comando HAVING é usado para filtrar registos de um resultado',
          correct: false,
          explanation: 'HAVING filtra grupos, não registos individuais.',
        },
        {
          text: 'O comando WHERE é usado para filtrar registos de um resultado',
          correct: true,
          explanation:
            'O WHERE seleciona as linhas antes da agregação; o HAVING filtra depois do GROUP BY.',
        },
        {
          text: 'O comando HAVING só pode ser usado em conjunto com o comando INSERT',
          correct: false,
          explanation: 'HAVING usa-se com SELECT e GROUP BY, nunca com INSERT.',
        },
      ],
    },
    solution: 'O comando WHERE é usado para filtrar registos de um resultado.',
    reasoning:
      'Na ordem lógica de um SELECT, o WHERE aplica-se às linhas individuais antes de qualquer agrupamento.',
    explanation: link.agregacao,
  },
  {
    id: 'lbaw-teste-2019-q3',
    title: 'Desvantagem das stored procedures',
    source: 'Teste de prática, 2019',
    topic: 'sql',
    prompt:
      'Qual das seguintes opções é uma desvantagem decorrente da utilização de stored procedures?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A diminuição do desempenho da aplicação',
          correct: false,
          explanation:
            'Em geral, as stored procedures reduzem o tráfego e podem melhorar o desempenho.',
        },
        {
          text: 'A redução do número de pedidos ao servidor de base de dados por parte dos clientes',
          correct: false,
          explanation: 'Isso é uma vantagem, não uma desvantagem.',
        },
        {
          text: 'A dificuldade adicionada à gestão de transações',
          correct: false,
          explanation: 'Não é a desvantagem típica apontada.',
        },
        {
          text: 'A incapacidade de reutilização noutros SGBD do código desenvolvido',
          correct: true,
          explanation:
            'O código das procedures é específico do SGBD (dialeto próprio), pelo que não é portável.',
        },
      ],
    },
    solution:
      'A incapacidade de reutilização noutros SGBD do código desenvolvido.',
    reasoning:
      'Cada SGBD tem o seu dialeto de procedures (PL/pgSQL, T-SQL, etc.), logo o código desenvolvido não é reutilizável noutros sistemas.',
    explanation: link.procedures,
  },
];

export const testeIndices: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2021-q3',
    title: 'Cenário ideal para um índice do tipo Hash',
    source: 'Teste de prática, 2021',
    topic: 'indices',
    prompt:
      'Qual dos seguintes representa um cenário ideal para um índice do tipo Hash?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Num campo de data, usado para filtrar registos entre uma data de início e fim',
          correct: false,
          explanation: 'Intervalos pedem índice ordenado (B-tree), não hash.',
        },
        {
          text: 'Num campo de texto, usado para pesquisa full-text no meio de um grande bloco de texto',
          correct: false,
          explanation: 'Full-text usa índice invertido.',
        },
        {
          text: 'Num campo de texto, usado para identificar todos os registos que começam por uma letra específica',
          correct: false,
          explanation: 'Prefixos pedem B-tree ou índice invertido, não hash.',
        },
        {
          text: 'Num campo de username, usado para encontrar um utilizador específico',
          correct: true,
          explanation:
            'O hash é ideal para procuras por igualdade exata sobre um valor único.',
        },
      ],
    },
    solution:
      'Num campo de username, usado para encontrar um utilizador específico.',
    reasoning:
      'Um índice hash suporta eficientemente apenas comparações de igualdade; intervalos, prefixos e full-text exigem outros tipos de índice.',
    explanation: link.hash,
  },
  {
    id: 'lbaw-teste-2019-q4',
    title: 'Sinais independentes da interrogação de pesquisa',
    source: 'Teste de prática, 2019',
    topic: 'indices',
    prompt:
      'O que se entende por sinais (critérios) independentes da interrogação de pesquisa?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Sinais que dependem diretamente da expressão de pesquisa utilizada',
          correct: false,
          explanation: 'Esses são sinais dependentes da interrogação.',
        },
        {
          text: 'Sinais que são calculados apenas no momento da interrogação',
          correct: false,
          explanation: 'Independentes da interrogação calculam-se antes dela.',
        },
        {
          text: 'Sinais que são definidos no momento de instalação do sistema de pesquisa',
          correct: false,
          explanation: 'A instalação não é o momento do cálculo dos sinais.',
        },
        {
          text: 'Sinais que são calculados aquando da indexação dos documentos',
          correct: true,
          explanation:
            'São exemplo o PageRank: calculam-se uma vez, na indexação, e não por cada pesquisa.',
        },
      ],
    },
    solution: 'Sinais que são calculados aquando da indexação dos documentos.',
    reasoning:
      'Sinais independentes da interrogação (como o PageRank) calculam-se no momento da indexação e ficam guardados, para não pesar em cada pesquisa.',
    explanation: link.sinais,
  },
  {
    id: 'lbaw-teste-2018-q3',
    title: 'Estudo da carga no desenho do esquema físico',
    source: 'Exame modelo, 2018',
    topic: 'indices',
    prompt:
      'O que inclui o estudo da carga do sistema usado no desenho do esquema físico?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O estudo da normalização de todas as relações',
          correct: false,
          explanation:
            'A normalização pertence ao esquema lógico, não ao estudo da carga.',
        },
        {
          text: 'A identificação das restrições de integridade',
          correct: false,
          explanation: 'Isso também é definido antes, no esquema lógico.',
        },
        {
          text: 'O mapeamento do modelo conceptual de dados num esquema relacional',
          correct: false,
          explanation:
            'O mapeamento é a passagem ao relacional, não o estudo da carga.',
        },
        {
          text: 'As alterações SQL (UPDATE, DELETE) importantes e qual a sua frequência',
          correct: true,
          explanation:
            'O esquema físico pesa a frequência das operações para decidir índices e organização dos dados.',
        },
      ],
    },
    solution:
      'As alterações SQL (UPDATE, DELETE) importantes e qual a sua frequência.',
    reasoning:
      'O estudo da carga estima que consultas e alterações são frequentes, informação essencial para escolher índices e a organização física.',
    explanation: link.carga,
  },
];

export const testeTransacoes: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2018-q4',
    title: 'Significado de ACID',
    source: 'Exame modelo, 2018',
    topic: 'transacoes',
    prompt:
      'No contexto de transações numa base de dados, o que significa ACID?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Automatic Classification and Interpretation of Data',
          correct: false,
          explanation: 'Não é o significado do acrónimo.',
        },
        {
          text: 'Advanced Computing Information Database',
          correct: false,
          explanation: 'Isso não corresponde às quatro propriedades.',
        },
        {
          text: 'Atomicity, Consistency, Isolation, Durability',
          correct: true,
          explanation:
            'São as quatro propriedades que garantem a fiabilidade das transações.',
        },
        {
          text: 'Advanced Combat Infantry Division',
          correct: false,
          explanation: 'É uma distração, não uma definição.',
        },
      ],
    },
    solution: 'Atomicity, Consistency, Isolation, Durability.',
    reasoning:
      'ACID resume as propriedades de atomicidade, consistência, isolamento e durabilité das transações.',
    explanation: link.acid,
  },
  {
    id: 'lbaw-teste-2021-q4',
    title: 'O que garante a consistência de uma transação',
    source: 'Teste de prática, 2021',
    topic: 'transacoes',
    prompt:
      'O que garante a propriedade da consistência na execução de uma transação numa base de dados?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A transação transforma a base de dados de um estado válido para outro estado válido',
          correct: true,
          explanation:
            'A consistência garante que a transação não quebra as regras de integridade.',
        },
        {
          text: 'A transação tem o mesmo resultado independentemente da altura em que é executada',
          correct: false,
          explanation: 'Isso descreve o isolamento, não a consistência.',
        },
        {
          text: 'As operações foram efetuadas como o programador deseja',
          correct: false,
          explanation: 'Não é uma definição formal da propriedade.',
        },
        {
          text: 'Todas as operações da transação são efetuadas ou nenhuma é efetuada',
          correct: false,
          explanation: 'Isso é a atomicidade.',
        },
      ],
    },
    solution:
      'A transação transforma a base de dados de um estado válido para outro estado válido.',
    reasoning:
      'Consistência (o C de ACID) significa que a transação respeita todas as restrições de integridade, passando de um estado válido a outro.',
    explanation: link.acid,
  },
  {
    id: 'lbaw-teste-2021-q5',
    title: 'Trigger despoletado por um UPDATE',
    source: 'Teste de prática, 2021',
    topic: 'transacoes',
    prompt:
      'Considere um trigger despoletado aquando de uma atualização (UPDATE). Qual das seguintes afirmações está correta?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O trigger é sempre executado uma vez por cada linha modificada',
          correct: false,
          explanation:
            'Depende do tipo de trigger (por linha ou por instrução).',
        },
        {
          text: 'O trigger pode ser executado em vez da atualização',
          correct: true,
          explanation:
            'Um trigger INSTEAD OF substitui a operação que o despoletou.',
        },
        {
          text: 'Triggers em instruções de UPDATE que envolvam múltiplas linhas desencadeiam um erro',
          correct: false,
          explanation:
            'Não é verdade; os triggers por linha correm para cada linha.',
        },
        {
          text: 'O trigger é sempre executado uma única vez, independentemente do número de linhas modificadas',
          correct: false,
          explanation: 'Só os triggers por instrução funcionam assim.',
        },
      ],
    },
    solution: 'O trigger pode ser executado em vez da atualização.',
    reasoning:
      'Além de BEFORE/AFTER, um trigger pode ser INSTEAD OF, caso em que substitui a operação original em vez de a acompanhar.',
    explanation: link.triggers,
  },
];

export const testeWeb: ExamQuestion[] = [
  {
    id: 'lbaw-teste-2018-q5',
    title: 'O que é o AJAX',
    source: 'Exame modelo, 2018',
    topic: 'web',
    prompt: 'O que é o AJAX?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Uma técnica assíncrona para comunicação com servidores remotos',
          correct: false,
          explanation: 'Isso descreve só parte do conceito, não o conjunto.',
        },
        {
          text: 'Uma técnica assíncrona para processamento em background',
          correct: false,
          explanation: 'O processamento em background não é o foco do AJAX.',
        },
        {
          text: 'Um limpa-vidros muito comum',
          correct: false,
          explanation: 'É uma distração sem relação com a definição.',
        },
        {
          text: 'Um conjunto de técnicas para manipulação assíncrona de páginas web',
          correct: true,
          explanation:
            'AJAX (Asynchronous JavaScript and XML) é o conjunto de técnicas que permite atualizar partes da página sem a recarregar.',
        },
      ],
    },
    solution:
      'Um conjunto de técnicas para manipulação assíncrona de páginas web.',
    reasoning:
      'O AJAX agrupa técnicas (como XMLHttpRequest/fetch) que comunicam com o servidor em segundo plano e atualizam a página dinamicamente.',
    explanation: link.ajax,
  },
  {
    id: 'lbaw-teste-2023-q2',
    title: 'Protocolo de comunicação entre servidores e clientes web',
    source: 'Teste de prática, 2023',
    topic: 'web',
    prompt:
      'Qual o nome do conjunto de regras (protocolo) que define a forma como servidores e clientes web devem estruturar e organizar as mensagens que usam para comunicar?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'File Transfer Protocol',
          correct: false,
          explanation: 'FTP trata da transferência de ficheiros, não da web.',
        },
        {
          text: 'Transmission Control Protocol',
          correct: false,
          explanation: 'TCP é a camada de transporte, não o protocolo da web.',
        },
        {
          text: 'HyperText Transfer Protocol',
          correct: true,
          explanation:
            'É o HTTP que define pedidos e respostas entre clientes e servidores web.',
        },
        {
          text: 'Internet Protocol',
          correct: false,
          explanation: 'IP trata do endereçamento e encaminhamento de pacotes.',
        },
      ],
    },
    solution: 'HyperText Transfer Protocol (HTTP).',
    reasoning:
      'É o protocolo da camada de aplicação usado na web para estruturar pedidos (métodos, cabeçalhos) e respostas (códigos de estado).',
    explanation: link.http,
  },
  {
    id: 'lbaw-teste-2021-q6',
    title: 'Eloquent e Blade na framework Laravel',
    source: 'Teste de prática, 2021',
    topic: 'web',
    prompt:
      'Na framework Laravel, quais das seguintes tecnologias são usadas para, respetivamente, (1) gerir o acesso aos dados e (2) definir as vistas HTML?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Artisan e Blade',
          correct: false,
          explanation: 'Artisan é a consola de comandos, não o acesso a dados.',
        },
        {
          text: 'Eloquent e Artisan',
          correct: false,
          explanation: 'Artisan não define vistas.',
        },
        {
          text: 'Blade e Eloquent',
          correct: false,
          explanation: 'Inverte as duas tecnologias.',
        },
        {
          text: 'Eloquent e Blade',
          correct: true,
          explanation:
            'O Eloquent é o ORM (acesso a dados) e o Blade é o motor de templates das vistas.',
        },
      ],
    },
    solution: 'Eloquent e Blade.',
    reasoning:
      'No Laravel, o Eloquent implementa o padrão Active Record sobre a base de dados e o Blade gera as vistas HTML.',
    explanation: link.laravel,
  },
  {
    id: 'lbaw-teste-2023-q3',
    title: 'O que é um leitor de ecrã',
    source: 'Teste de prática, 2023',
    topic: 'web',
    prompt: 'O que é um leitor de ecrã (screen reader)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Um software que converte discurso falado para texto, para apresentação num ecrã',
          correct: false,
          explanation:
            'Isso descreve reconhecimento de fala, não leitura do ecrã.',
        },
        {
          text: 'Um software que permite aumentar o texto num ecrã de um computador',
          correct: false,
          explanation: 'Isso é um ampliador de ecrã.',
        },
        {
          text: 'Um software que utiliza discurso sintetizado para ler uma página web',
          correct: true,
          explanation:
            'O screen reader lê o conteúdo da página em voz alta, apoiando utilizadores com deficiência visual.',
        },
        {
          text: 'Um indivíduo que traduz língua falada para língua gestual',
          correct: false,
          explanation: 'Isso é um intérprete, não software.',
        },
      ],
    },
    solution:
      'Um software que utiliza discurso sintetizado para ler uma página web.',
    reasoning:
      'O leitor de ecrã é uma tecnologia de apoio que converte o conteúdo do ecrã em fala sintetizada.',
    explanation: link.acessibilidade,
  },
];
