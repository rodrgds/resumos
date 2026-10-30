import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  historia: '/cadeiras/es/introducao/#como-a-disciplina-surgiu',
  complexidade: '/cadeiras/es/introducao/#complexidade-e-trabalho-em-equipa',
  sistemasLegados: '/cadeiras/es/construcao-evolucao/#sistemas-legados',
  objetivosRequisitos: '/cadeiras/es/requisitos-uml/#objetivos-e-requisitos',
  tiposRequisitos: '/cadeiras/es/requisitos-uml/#tipos-de-requisitos',
  elicitacao: '/cadeiras/es/requisitos-uml/#elicitação',
  casosDeUso: '/cadeiras/es/modelacao-uml/#casos-de-uso',
  classesDominio: '/cadeiras/es/modelacao-uml/#classes-e-modelo-de-domínio',
  planningGame: '/cadeiras/es/xp/#planning-game',
  valoresXp: '/cadeiras/es/xp/#valores-e-práticas',
  tdd: '/cadeiras/es/xp/#tdd',
  velocidade: '/cadeiras/es/gestao-projetos/#velocidade-e-previsão',
  caixaPreta: '/cadeiras/es/verificacao-validacao/#caixa-preta-e-caixa-branca',
  niveisTestes: '/cadeiras/es/verificacao-validacao/#níveis-e-objetivos',
  estilosPadroes: '/cadeiras/es/arquitetura-desenho/#estilos-e-padrões',
  rup: '/cadeiras/es/processos-software/#rup',
};

export const fundamentos: ExamQuestion[] = [
  {
    id: 'es-exame-2019-q1',
    title: 'Primeiro bug de software registado',
    source: 'Exame, 2019/20',
    topic: 'fundamentos',
    prompt:
      'Qual foi o primeiro bug de software registado e como foi identificado? Justifique a resposta.\n\n- a) Nos anos 50, com os sistemas avançados de identificação de bugs da NATO\n- b) Nos anos 80, por análise de serviços críticos\n- c) Nos anos 40, manualmente\n- d) Nos anos 90, com testes automatizados',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Nos anos 50, com os sistemas avançados de identificação de bugs da NATO',
          correct: false,
          explanation:
            'Não existiam sistemas de identificação de bugs da NATO nos anos 50.',
        },
        {
          text: 'Nos anos 80, por análise de serviços críticos',
          correct: false,
          explanation:
            'A análise de serviços críticos não foi o método de identificação do primeiro bug.',
        },
        {
          text: 'Nos anos 40, manualmente',
          correct: true,
          explanation:
            'Em 1945, nos anos 40, Grace Hopper encontrou manualmente uma traça (moth) entre os relés do computador Harvard Mark II.',
        },
        {
          text: 'Nos anos 90, com testes automatizados',
          correct: false,
          explanation:
            'Os testes automatizados não foram usados na identificação do primeiro bug registado.',
        },
      ],
    },
    solution: 'c) Nos anos 40, manualmente.',
    reasoning:
      'Nos anos 40, os computadores enchiam salas inteiras e o seu calor atraía insetos, que provocavam curto-circuitos. A 9 de setembro de 1945, a oficial Grace Hopper encontrou manualmente uma traça entre os relés do Harvard Mark II, registando o primeiro bug de software.',
    explanation: link.historia,
  },
  {
    id: 'es-exame-2022-q1',
    title: 'Complexidade essencial e acidental',
    source: 'Teste, 2022/23',
    topic: 'fundamentos',
    prompt:
      'Os sistemas de software atuais são muito grandes e muito complexos. Como se podem classificar os projetos de software quanto à sua complexidade global?\n\n- a) Complexidade acidental e complexidade de gestão\n- b) Complexidade acidental e complexidade essencial\n- c) Complexidade técnica e complexidade de gestão\n- d) Complexidade técnica e complexidade essencial',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Complexidade acidental e complexidade de gestão',
          correct: false,
          explanation:
            'A complexidade de gestão não é uma das duas classes fundamentais da complexidade do software.',
        },
        {
          text: 'Complexidade acidental e complexidade essencial',
          correct: true,
          explanation:
            'A complexidade do software divide-se na essencial, que vem da dificuldade do problema, e na acidental, que vem das ferramentas e métodos usados.',
        },
        {
          text: 'Complexidade técnica e complexidade de gestão',
          correct: false,
          explanation:
            'Esta não é a classificação habitual da complexidade global dos projetos de software.',
        },
        {
          text: 'Complexidade técnica e complexidade essencial',
          correct: false,
          explanation:
            'A complexidade técnica não substitui a distinção entre complexidade essencial e acidental.',
        },
      ],
    },
    solution: 'b) Complexidade acidental e complexidade essencial.',
    reasoning:
      'A complexidade essencial resulta da dificuldade intrínseca do problema, enquanto a acidental resulta das ferramentas, linguagens e métodos escolhidos. Reduzir a complexidade acidental não resolve o problema em si.',
    explanation: link.complexidade,
  },
  {
    id: 'es-exame-2019-q2',
    title: 'Engenharia inversa como atividade de reengenharia',
    source: 'Exame, 2019/20',
    topic: 'fundamentos',
    prompt:
      'A engenharia inversa (reverse engineering):\n\n- a) É uma atividade do processo de reengenharia\n- b) Significa converter código para uma nova linguagem\n- c) É limpar e reestruturar os dados do sistema\n- d) É reorganizar a estrutura do programa',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'É uma atividade do processo de reengenharia',
          correct: true,
          explanation:
            'A engenharia inversa analisa um programa existente para o compreender melhor, servindo de base à reengenharia.',
        },
        {
          text: 'Significa converter código para uma nova linguagem',
          correct: false,
          explanation:
            'Converter código para outra linguagem é uma tarefa específica, não a definição de engenharia inversa.',
        },
        {
          text: 'É limpar e reestruturar os dados do sistema',
          correct: false,
          explanation:
            'A reestruturação dos dados é outra atividade da reengenharia, não a engenharia inversa.',
        },
        {
          text: 'É reorganizar a estrutura do programa',
          correct: false,
          explanation:
            'Reorganizar a estrutura do programa é reengenharia, não engenharia inversa.',
        },
      ],
    },
    solution: 'a) É uma atividade do processo de reengenharia.',
    reasoning:
      'A engenharia inversa consiste em analisar um programa ou código existente, de forma estática ou dinâmica, para o compreender melhor. Tal como as outras atividades de reengenharia, ajuda a reestruturar e a documentar o software para o tornar mais fácil de perceber e de alterar.',
    explanation: link.sistemasLegados,
  },
];

export const requisitos: ExamQuestion[] = [
  {
    id: 'es-exame-2022-q2',
    title: 'Da necessidade vaga à definição clara do sistema',
    source: 'Teste, 2022/23',
    topic: 'requisitos',
    prompt:
      'O processo que leva de "necessidades vagamente definidas" a uma "definição clara e bem percebida do sistema" é comummente conhecido como:\n\n- a) Engenharia de requisitos\n- b) Especificação de requisitos\n- c) Análise de requisitos\n- d) Elicitação de requisitos',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Engenharia de requisitos',
          correct: true,
          explanation:
            'A engenharia de requisitos engloba elicitar, analisar, especificar e validar os requisitos, levando das necessidades vagas até à definição clara do sistema.',
        },
        {
          text: 'Especificação de requisitos',
          correct: false,
          explanation:
            'A especificação é apenas uma parte do processo, a produção do documento de requisitos.',
        },
        {
          text: 'Análise de requisitos',
          correct: false,
          explanation:
            'A análise estuda e organiza os requisitos já elicitados, não cobre todo o processo.',
        },
        {
          text: 'Elicitação de requisitos',
          correct: false,
          explanation:
            'A elicitação é a recolha das necessidades junto das partes interessadas, apenas o início do processo.',
        },
      ],
    },
    solution: 'a) Engenharia de requisitos.',
    reasoning:
      'A engenharia de requisitos é o processo global que transforma necessidades vagas numa definição clara e percebida do sistema, incluindo elicitação, análise, especificação e validação.',
    explanation: link.objetivosRequisitos,
  },
  {
    id: 'es-exame-2022-q3',
    title: 'Requisito não funcional',
    source: 'Teste, 2022/23',
    topic: 'requisitos',
    prompt:
      'Qual das seguintes afirmações é um requisito não funcional de um sistema?\n\n- a) O sistema deve permitir ao cliente comprar vários bilhetes de uma só vez\n- b) O sistema deve permitir ao cliente iniciar sessão\n- c) O sistema deve ser desenvolvido com uma base de dados SQL\n- d) O sistema deve permitir ao cliente comprar bilhetes presencialmente',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O sistema deve permitir ao cliente comprar vários bilhetes de uma só vez',
          correct: false,
          explanation:
            'É uma funcionalidade do sistema, logo um requisito funcional.',
        },
        {
          text: 'O sistema deve permitir ao cliente iniciar sessão',
          correct: false,
          explanation:
            'O início de sessão é uma funcionalidade, logo um requisito funcional.',
        },
        {
          text: 'O sistema deve ser desenvolvido com uma base de dados SQL',
          correct: true,
          explanation:
            'Impor uma tecnologia de implementação é uma restrição de projeto, que conta como requisito não funcional.',
        },
        {
          text: 'O sistema deve permitir ao cliente comprar bilhetes presencialmente',
          correct: false,
          explanation:
            'Descreve uma funcionalidade, logo é um requisito funcional.',
        },
      ],
    },
    solution: 'c) O sistema deve ser desenvolvido com uma base de dados SQL.',
    reasoning:
      'As opções a), b) e d) descrevem o que o sistema faz, ou seja, requisitos funcionais. A opção c) restringe como o sistema é construído, sendo uma restrição de projeto que se classifica como requisito não funcional.',
    explanation: link.tiposRequisitos,
  },
  {
    id: 'es-exame-2019-q3',
    title: 'Brainstorming na elicitação de requisitos',
    source: 'Exame, 2019/20',
    topic: 'requisitos',
    prompt:
      'O brainstorming é uma técnica comum de elicitação de requisitos na qual (justifique a resposta):\n\n- a) As ideias vêm apenas dos utilizadores finais do sistema\n- b) Todas as ideias são bem-vindas\n- c) Não existe um facilitador\n- d) O limite é de 15 pessoas na sala',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'As ideias vêm apenas dos utilizadores finais do sistema',
          correct: false,
          explanation:
            'Participam pessoas com várias perspetivas sobre o produto, não apenas os utilizadores finais.',
        },
        {
          text: 'Todas as ideias são bem-vindas',
          correct: true,
          explanation:
            'O objetivo é recolher o maior número de ideias novas, dando prioridade à quantidade sobre a qualidade; só depois são discutidas e organizadas.',
        },
        {
          text: 'Não existe um facilitador',
          correct: false,
          explanation: 'Existe um moderador que conduz a sessão.',
        },
        {
          text: 'O limite é de 15 pessoas na sala',
          correct: false,
          explanation:
            'A sessão reúne normalmente cerca de 4 a 8 pessoas com perspetivas diferentes.',
        },
      ],
    },
    solution: 'b) Todas as ideias são bem-vindas.',
    reasoning:
      'Numa sessão de brainstorming há um moderador e cerca de 4 a 8 pessoas com perspetivas diferentes sobre o produto. Todas as ideias são bem-vindas, por mais criativas que pareçam, dando prioridade à quantidade sobre a qualidade; num passo posterior são discutidas, revistas e organizadas.',
    explanation: link.elicitacao,
  },
];

export const uml: ExamQuestion[] = [
  {
    id: 'es-exame-2022-q4',
    title: 'Elementos de um diagrama de casos de uso',
    source: 'Teste, 2022/23',
    topic: 'uml',
    prompt:
      'Quais dos seguintes elementos estão TODOS presentes num diagrama de casos de uso?\n\n- a) Ator, caso de uso, fronteira do sistema, nome do sistema\n- b) Ator, pacote, nome do sistema, sistema externo\n- c) Caso de uso, ator, classe principal, nome do sistema\n- d) Caso de uso, generalização, nome do sistema, teste',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Ator, caso de uso, fronteira do sistema, nome do sistema',
          correct: true,
          explanation:
            'Um diagrama de casos de uso mostra atores, casos de uso e a fronteira do sistema com o seu nome.',
        },
        {
          text: 'Ator, pacote, nome do sistema, sistema externo',
          correct: false,
          explanation:
            'Pacotes e sistemas externos não são elementos próprios deste diagrama.',
        },
        {
          text: 'Caso de uso, ator, classe principal, nome do sistema',
          correct: false,
          explanation:
            'Classes não fazem parte de um diagrama de casos de uso.',
        },
        {
          text: 'Caso de uso, generalização, nome do sistema, teste',
          correct: false,
          explanation: 'Testes não são um elemento deste diagrama.',
        },
      ],
    },
    solution: 'a) Ator, caso de uso, fronteira do sistema, nome do sistema.',
    reasoning:
      'Num diagrama de casos de uso representam-se os atores, os casos de uso que eles iniciam e a fronteira do sistema, identificada pelo nome do sistema. Classes, pacotes e testes pertencem a outros tipos de diagrama.',
    explanation: link.casosDeUso,
  },
  {
    id: 'es-exame-2022-q5',
    title: 'Diagramas de comportamento em UML',
    source: 'Teste, 2022/23',
    topic: 'uml',
    prompt:
      'Qual dos seguintes NÃO é um diagrama UML normalmente usado para modelar o comportamento de um sistema de software?\n\n- a) Diagrama de atividades\n- b) Diagrama de casos de uso\n- c) Diagrama de classes\n- d) Diagrama de máquina de estados',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Diagrama de atividades',
          correct: false,
          explanation:
            'Modela fluxos de atividades, incluindo paralelismo com fork e join.',
        },
        {
          text: 'Diagrama de casos de uso',
          correct: false,
          explanation:
            'Mostra as interações entre atores e o sistema, sendo usado para modelar comportamento.',
        },
        {
          text: 'Diagrama de classes',
          correct: true,
          explanation:
            'O diagrama de classes modela a estrutura estática do sistema, não o seu comportamento.',
        },
        {
          text: 'Diagrama de máquina de estados',
          correct: false,
          explanation:
            'Modela o ciclo de vida de objetos com comportamento orientado por eventos.',
        },
      ],
    },
    solution: 'c) Diagrama de classes.',
    reasoning:
      'Os diagramas de atividades, de casos de uso e de máquina de estados descrevem aspetos dinâmicos do sistema. O diagrama de classes descreve a estrutura estática: classes, atributos e relações entre elas.',
    explanation: link.classesDominio,
  },
  {
    id: 'es-exame-2019-q4',
    title: 'Relações include em casos de uso',
    source: 'Exame, 2019/20',
    topic: 'uml',
    prompt:
      'Em modelação de casos de uso, as relações include servem para (justifique a resposta):\n\n- a) Representar comportamento opcional\n- b) Representar comportamento crítico\n- c) Representar comportamento obrigatório\n- d) Representar comportamento importado de outro sistema',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Representar comportamento opcional',
          correct: false,
          explanation:
            'O comportamento opcional modela-se com relações extend, não include.',
        },
        {
          text: 'Representar comportamento crítico',
          correct: false,
          explanation:
            'O include não distingue comportamento crítico de outro tipo.',
        },
        {
          text: 'Representar comportamento obrigatório',
          correct: true,
          explanation:
            'Quando vários casos de uso partilham um comportamento comum, esse comportamento separa-se num novo caso de uso incluído por eles, e é sempre executado.',
        },
        {
          text: 'Representar comportamento importado de outro sistema',
          correct: false,
          explanation:
            'O comportamento incluído pode ou não vir de outro sistema, mas é sempre obrigatório.',
        },
      ],
    },
    solution: 'c) Representar comportamento obrigatório.',
    reasoning:
      'Quando vários casos de uso partilham algum comportamento comum, esse comportamento pode ser separado e descrito num novo caso de uso, que os primeiros incluem. Esse comportamento comum é sempre obrigatório e não pode ser removido.',
    explanation: link.casosDeUso,
  },
];

export const scrumXp: ExamQuestion[] = [
  {
    id: 'es-exame-2022-q6',
    title: 'Como funciona o Planning Game',
    source: 'Teste, 2022/23',
    topic: 'scrum-xp',
    prompt:
      'Qual das seguintes afirmações sobre o funcionamento do Planning Game é VERDADEIRA?\n\n- a) Os gestores estimam o tamanho de cada história de utilizador\n- b) Os programadores contribuent para uma lista de funcionalidades que desejam\n- c) Os programadores decidem quando as funcionalidades devem ser entregues\n- d) O cliente prioriza quais as histórias de utilizador a implementar',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Os gestores estimam o tamanho de cada história de utilizador',
          correct: false,
          explanation:
            'No Planning Game são os programadores que estimam o esforço.',
        },
        {
          text: 'Os programadores contribuent para uma lista de funcionalidades que desejam',
          correct: false,
          explanation:
            'A lista de funcionalidades vem do cliente, não dos programadores.',
        },
        {
          text: 'Os programadores decidem quando as funcionalidades devem ser entregues',
          correct: false,
          explanation:
            'As entregas resultam das iterações combinadas com o cliente.',
        },
        {
          text: 'O cliente prioriza quais as histórias de utilizador a implementar',
          correct: true,
          explanation:
            'No Planning Game o cliente ordena as histórias por valor de negócio e os programadores estimam o esforço de cada uma.',
        },
      ],
    },
    solution:
      'd) O cliente prioriza quais as histórias de utilizador a implementar.',
    reasoning:
      'No Planning Game, o cliente apresenta as histórias de utilizador por ordem de prioridade de negócio e os programadores estimam o esforço de cada uma. A combinação das duas perspetivas define o que entra em cada entrega.',
    explanation: link.planningGame,
  },
  {
    id: 'es-exame-2022-q7',
    title: 'Práticas que não são de XP',
    source: 'Teste, 2022/23',
    topic: 'scrum-xp',
    prompt:
      'Qual das seguintes NÃO é uma prática de XP?\n\n- a) Test-driven Deployment\n- b) On-Site Customer\n- c) Planning Game\n- d) Continuous Integration',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Test-driven Deployment',
          correct: true,
          explanation:
            'O XP pratica desenvolvimento orientado a testes (TDD), não "test-driven deployment".',
        },
        {
          text: 'On-Site Customer',
          correct: false,
          explanation:
            'Ter o cliente presente na equipa é uma prática clássica de XP.',
        },
        {
          text: 'Planning Game',
          correct: false,
          explanation:
            'O Planning Game é a prática de planeamento conjunto de XP.',
        },
        {
          text: 'Continuous Integration',
          correct: false,
          explanation: 'A integração contínua é uma prática central de XP.',
        },
      ],
    },
    solution: 'a) Test-driven Deployment.',
    reasoning:
      'On-Site Customer, Planning Game e Continuous Integration são práticas de XP. O que existe é desenvolvimento orientado a testes (test-driven development), não "test-driven deployment".',
    explanation: link.valoresXp,
  },
  {
    id: 'es-exame-2019-q5',
    title: 'Quem escreve os testes no XP',
    source: 'Exame, 2019/20',
    topic: 'scrum-xp',
    prompt:
      'O XP previne regressões de software promovendo uma abordagem test-first. Quem deve participar nesse processo? Justifique a sua resposta.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que a equipa de desenvolvimento escreve os testes antes de implementar novas funcionalidades.',
        'A resposta reconhece que o cliente participa especificando os testes de aceitação (customer tests).',
        'A resposta refere que uma história de utilizador está completa quando todos os seus testes de aceitação passam.',
      ],
    },
    solution:
      'A equipa de desenvolvimento, com contributos do cliente, escreve os testes antes de abordar novas funcionalidades.',
    reasoning:
      'São os programadores que escrevem os testes unitários antes de implementar cada nova funcionalidade. O cliente participa especificando os testes de aceitação: uma história de utilizador só está completa quando todos os testes de aceitação passam. Os testes unitários testam métodos, classes ou cenários específicos e são internos à equipa de desenvolvimento.',
    explanation: link.tdd,
  },
  {
    id: 'es-exame-2019-q6',
    title: 'Como o Scrum tenta cumprir prazos',
    source: 'Exame, 2019/20',
    topic: 'scrum-xp',
    prompt:
      'Não cumprir os prazos do projeto é possivelmente a falha mais reincidente no desenvolvimento de software. Como é que o Scrum tenta resolver esse problema? Justifique a resposta.\n\n- a) O Scrum garante apenas que existe um incremento do produto no fim de cada sprint, mas não a quantidade de funcionalidades\n- b) O Scrum Master é responsável por garantir que a equipa é eficiente e entrega o software a tempo\n- c) As estimativas de esforço e a velocidade podem ser usadas para prever quando o backlog ficará completo\n- d) Um processo bem definido garante eficiência no desenvolvimento e, por isso, o cumprimento do prazo',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O Scrum garante apenas que existe um incremento do produto no fim de cada sprint, mas não a quantidade de funcionalidades',
          correct: false,
          explanation:
            'O Scrum não se limita a garantir a existência do incremento; usa a medição para prever o progresso.',
        },
        {
          text: 'O Scrum Master é responsável por garantir que a equipa é eficiente e entrega o software a tempo',
          correct: false,
          explanation:
            'O Scrum Master facilita o processo, mas não é o responsável direto pela entrega a tempo.',
        },
        {
          text: 'As estimativas de esforço e a velocidade podem ser usadas para prever quando o backlog ficará completo',
          correct: true,
          explanation:
            'Em cada sprint mede-se a velocidade e o esforço da equipa para prever, nos sprints seguintes, quanto falta para completar o backlog.',
        },
        {
          text: 'Um processo bem definido garante eficiência no desenvolvimento e, por isso, o cumprimento do prazo',
          correct: false,
          explanation:
            'Um processo rígido não garante por si só o cumprimento dos prazos.',
        },
      ],
    },
    solution:
      'c) As estimativas de esforço e a velocidade podem ser usadas para prever quando o backlog ficará completo.',
    reasoning:
      'Em cada sprint mede-se a velocidade e o esforço da equipa, para que nos sprints seguintes essa informação permita prever que progresso é possível fazer. Com este método, a equipa percebe melhor como avança e pode prioritar as próximas tarefas de forma mais informada, aumentando a probabilidade de cumprir os prazos e de estimar quando o backlog ficará completo.',
    explanation: link.velocidade,
  },
];

export const testesArquitetura: ExamQuestion[] = [
  {
    id: 'es-exame-2022-q8',
    title: 'Teste de caixa preta',
    source: 'Teste, 2022/23',
    topic: 'testes-arquitetura',
    prompt:
      'Qual das seguintes é uma abordagem de teste de caixa preta (black-box)?\n\n- a) Partição por classes de equivalência\n- b) Nenhuma das opções\n- c) Teste estrutural, por exemplo baseado em cobertura\n- d) Teste de mutação',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Partição por classes de equivalência',
          correct: true,
          explanation:
            'A partição por classes de equivalência deriva os casos de teste apenas da especificação, sem conhecer a estrutura interna do código.',
        },
        {
          text: 'Nenhuma das opções',
          correct: false,
          explanation: 'Existe pelo menos uma opção correta.',
        },
        {
          text: 'Teste estrutural, por exemplo baseado em cobertura',
          correct: false,
          explanation:
            'O teste estrutural é de caixa branca, pois usa o conhecimento do código.',
        },
        {
          text: 'Teste de mutação',
          correct: false,
          explanation:
            'O teste de mutação também se apoia na estrutura interna do programa.',
        },
      ],
    },
    solution: 'a) Partição por classes de equivalência.',
    reasoning:
      'No teste de caixa preta os casos de teste são escolhidos a partir da especificação do componente, sem olhar para o código. A partição por classes de equivalência agrupa as entradas equivalentes e escolhe representantes de cada classe. O teste estrutural e o teste de mutação são de caixa branca.',
    explanation: link.caixaPreta,
  },
  {
    id: 'es-exame-2022-q9',
    title: 'Objetivo do teste de integração',
    source: 'Teste, 2022/23',
    topic: 'testes-arquitetura',
    prompt:
      'Qual é o objetivo do teste de integração?\n\n- a) Verificar o comportamento e a funcionalidade corretos de um widget ou ecrã específico\n- b) Testar a integração e a interação entre diferentes unidades ou componentes\n- c) Testar as unidades ou componentes individuais de forma isolada\n- d) Garantir que a aplicação cumpre os requisitos de desempenho e capacidade de resposta especificados',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Verificar o comportamento e a funcionalidade corretos de um widget ou ecrã específico',
          correct: false,
          explanation:
            'Isso é objetivo do teste de componentes ou de interface.',
        },
        {
          text: 'Testar a integração e a interação entre diferentes unidades ou componentes',
          correct: true,
          explanation:
            'O teste de integração verifica se os componentes funcionam corretamente em conjunto.',
        },
        {
          text: 'Testar as unidades ou componentes individuais de forma isolada',
          correct: false,
          explanation: 'O teste isolado de unidades é o teste unitário.',
        },
        {
          text: 'Garantir que a aplicação cumpre os requisitos de desempenho e capacidade de resposta especificados',
          correct: false,
          explanation: 'Isso é objetivo do teste de desempenho.',
        },
      ],
    },
    solution:
      'b) Testar a integração e a interação entre diferentes unidades ou componentes.',
    reasoning:
      'O teste unitário testa cada unidade isoladamente, o teste de componentes testa widgets ou ecrãs, e o teste de desempenho mede tempos de resposta. O teste de integração junta as unidades já testadas e verifica se comunicam e funcionam corretamente em conjunto.',
    explanation: link.niveisTestes,
  },
  {
    id: 'es-exame-2022-q10',
    title: 'Padrão para interface interativa',
    source: 'Teste, 2022/23',
    topic: 'testes-arquitetura',
    prompt:
      'Qual dos seguintes padrões é o mais adequado para arquitetar uma aplicação com uma interface de utilizador interativa?\n\n- a) Repository\n- b) Pipes and filters\n- c) Todas as outras opções\n- d) Model-View-Controller',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Repository',
          correct: false,
          explanation:
            'O padrão Repository organiza o acesso centralizado a dados, não a interface interativa.',
        },
        {
          text: 'Pipes and filters',
          correct: false,
          explanation:
            'Pipes and filters adequa-se a fluxos de processamento de dados em cadeia, não a interfaces interativas.',
        },
        {
          text: 'Todas as outras opções',
          correct: false,
          explanation:
            'Nem todos os padrões listados servem para interfaces interativas.',
        },
        {
          text: 'Model-View-Controller',
          correct: true,
          explanation:
            'O MVC separa o modelo, a vista e o controlador, sendo o padrão clássico para aplicações com interface interativa.',
        },
      ],
    },
    solution: 'd) Model-View-Controller.',
    reasoning:
      'O padrão Model-View-Controller separa os dados (modelo), a apresentação (vista) e o controlo da interação (controlador), sendo o mais adequado para aplicações com interface de utilizador interativa. Repository e pipes and filters servem outros tipos de problema.',
    explanation: link.estilosPadroes,
  },
  {
    id: 'es-exame-2019-q7',
    title: 'Disciplinas mais ativas na construção do RUP',
    source: 'Exame, 2019/20',
    topic: 'testes-arquitetura',
    prompt:
      'No RUP, a fase de construção é aquela em que o software é desenvolvido mais ativamente. Identifique as disciplinas mais ativas durante esta fase e explique resumidamente porquê.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica as disciplinas de conceção (analysis & design), implementação e testes.',
        'A justificação refere que o software é implementado e testado segundo os critérios de avaliação definidos.',
        'A justificação refere que podem surgir alterações de conceção a partir da análise do processo e dos recursos.',
      ],
    },
    solution:
      'As disciplinas mais ativas são a conceção (analysis & design), a implementação e os testes.',
    reasoning:
      'Na fase de construção o software é desenvolvido mais ativamente, ou seja, é implementado. Ao mesmo tempo, é testado de forma extensiva segundo os critérios de avaliação definidos, e os produtos libertados são avaliados segundo os critérios de aceitação da visão, pelo que os testes também têm um papel importante. Além disso, deve haver atenção à gestão de recursos, ao controlo e à otimização do processo, análise que pode levar a alterações de conceção.',
    explanation: link.rup,
  },
];
