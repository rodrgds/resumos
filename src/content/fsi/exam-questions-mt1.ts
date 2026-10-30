import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  ameacas: '/cadeiras/fsi/principios-seguranca/#ativo-ameaça-e-vulnerabilidade',
  canarios:
    '/cadeiras/fsi/programacao-defensiva/#canários-o-que-está-a-ser-verificado',
  outrosErros: '/cadeiras/fsi/programacao-defensiva/#outros-erros-de-memória',
  principios: '/cadeiras/fsi/sistemas-seguros/#princípios-de-construção',
  permissoes: '/cadeiras/fsi/controlo-acessos/#permissões-unix',
  sessoes: '/cadeiras/fsi/seguranca-web/#sessões-e-cookies',
  csrf: '/cadeiras/fsi/seguranca-web/#csrf',
  xsleaks: '/cadeiras/fsi/seguranca-web/#observação-e-falsificação',
};

export const mt1Conceitos: ExamQuestion[] = [
  {
    id: 'fsi-mt1-2021-q1',
    title: 'Classificar ameaça, vulnerabilidade e exploit',
    source: 'Teste Intercalar, 2021/22',
    topic: 'conceitos',
    prompt:
      'Atribua a cada um dos seguintes exemplos a classificação 1 (ameaça), 2 (vulnerabilidade) ou 3 (exploit):\n\n- ativista que discorda da política de uma empresa\n- mensagem que provoca leitura de memória out of bounds na heap\n- empresa concorrente\n- overflow de inteiros no cálculo do tamanho de um buffer\n- catástrofe natural\n- utilização de memória depois de libertada\n- JavaScript que faz heap spraying\n- esquecimento de realizar um update de segurança',
    answer: {
      kind: 'self',
      checklist: [
        'Classifica como ameaças (1) o ativista, a empresa concorrente e a catástrofe natural.',
        'Classifica como vulnerabilidades (2) a leitura out of bounds, o overflow de inteiros, o use after free e o esquecimento do update.',
        'Classifica como exploit (3) o JavaScript de heap spraying.',
      ],
    },
    solution:
      'Ameaças (1): ativista, empresa concorrente, catástrofe natural. Vulnerabilidades (2): mensagem com leitura out of bounds, overflow de inteiros, utilização de memória libertada, esquecimento do update. Exploit (3): JavaScript de heap spraying.',
    reasoning:
      'Uma ameaça é um agente ou evento com potencial para causar dano; uma vulnerabilidade é uma fraqueza do sistema explorável; um exploit é o código ou técnica que concretiza a exploração. O heap spraying é código do atacante, logo exploit; as restantes fraquezas são propriedades do sistema vulnerável.',
    explanation: link.ameacas,
  },
  {
    id: 'fsi-mt1-2021-q2',
    title: 'Zero-day vulnerability e valor de mercado',
    source: 'Teste Intercalar, 2021/22',
    topic: 'conceitos',
    prompt:
      'Explique o conceito de zero-day vulnerability e indique uma razão pela qual poderá ter grande valor de mercado.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta define zero-day como uma vulnerabilidade ainda desconhecida do fabricante (e sem correção disponível).',
        'A justificação do valor de mercado liga-se ao facto de não existir defesa conhecida, podendo ser usada contra muitos alvos antes de ser detetada.',
      ],
    },
    solution:
      'Uma zero-day é uma vulnerabilidade que ainda não é conhecida publicamente nem corrigida pelo fabricante. Tem grande valor de mercado porque não existe defesa ou assinatura de deteção disponível, pelo que um exploit pode comprometer sistemas antes de qualquer proteção ser aplicada.',
    reasoning:
      'O valor de uma zero-day advém da assimetria entre atacante e defensor: enquanto a falha não for conhecida, não há patch nem assinatura de antivírus, e o ataque tem taxa de sucesso elevada.',
    explanation: link.ameacas,
  },
  {
    id: 'fsi-mt1-2023-q1',
    title: 'Os três eixos da segurança (tríade CIA)',
    source: 'Teste 1, 2023/24',
    topic: 'conceitos',
    prompt:
      'A segurança é frequentemente descrita em termos de três eixos amplos. Quais são esses três eixos?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Segurança / Exposição / Usabilidade',
          correct: false,
          explanation:
            'Estes são eixos de compromisso de usabilidade, não a tríade clássica.',
        },
        {
          text: 'Confidencialidade / Integridade / Disponibilidade',
          correct: true,
          explanation:
            'A tríade CIA (Confidentiality, Integrity, Availability) é a descrição clássica das propriedades de segurança.',
        },
        {
          text: 'Confidencialidade / Integridade / Autenticação',
          correct: false,
          explanation:
            'A autenticação é um mecanismo, não um dos três eixos da tríade.',
        },
        {
          text: 'Confidencialidade / Funcionalidade / Usabilidade',
          correct: false,
          explanation:
            'Funcionalidade e usabilidade não fazem parte da tríade.',
        },
      ],
    },
    solution: 'Confidencialidade / Integridade / Disponibilidade.',
    reasoning:
      'Confidencialidade impede o acesso não autorizado, integridade garante que os dados não são alterados indevidamente e disponibilidade garante o acesso quando necessário.',
    explanation: link.ameacas,
  },
  {
    id: 'fsi-mt1-2024-q1',
    title: 'Porque é devastador um ataque de zero-day',
    source: 'Teste 1, 2024/25',
    topic: 'conceitos',
    prompt: 'Um ataque de zero-day é devastador porque:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Explora uma vulnerabilidade desconhecida.',
          correct: true,
          explanation:
            'Sem conhecimento público da falha, não há correção nem mecanismo de deteção disponível no momento do ataque.',
        },
        {
          text: 'Explora uma vulnerabilidade recentemente publicada, mas ainda não corrigida.',
          correct: false,
          explanation:
            'Nesse caso já existe conhecimento público da falha, pelo que deixa de ser zero-day.',
        },
        {
          text: 'Não requer qualquer intervenção do utilizador (zero-click).',
          correct: false,
          explanation:
            'Zero-click descreve uma forma de explorar a falha, não a razão pela qual ela é devastadora.',
        },
        {
          text: 'Explora problemas de calendário em anos bissextos.',
          correct: false,
          explanation: 'Não existe qualquer relação com o conceito.',
        },
      ],
    },
    solution: 'Explora uma vulnerabilidade desconhecida.',
    reasoning:
      'A definição de zero-day centra-se na ausência de conhecimento público: sem patch e sem assinatura de deteção, o ataque não encontra defesa conhecido no momento em que ocorre.',
    explanation: link.ameacas,
  },
];

export const mt1Software: ExamQuestion[] = [
  {
    id: 'fsi-mt1-2021-q3',
    title: 'Overflow de inteiros no openSSH (nresp)',
    source: 'Teste Intercalar, 2021/22',
    topic: 'software',
    prompt:
      'Considere o seguinte código, que esteve na origem de uma vulnerabilidade de gravidade elevada no openSSH:\n\n```c\nnresp = packet_get_int();\nif (nresp > 0) {\n   response = xmalloc(nresp*sizeof(char*));\n   for (i = 0; i < nresp; i++)\n      response[i] = packet_get_string(NULL);\n}\n```\n\nExplique de que forma um atacante que controla o valor de `nresp` pode provocar uma falha de gestão de memória na origem do problema.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica que `nresp*sizeof(char*)` pode sofrer overflow de inteiro para um valor pequeno.',
        'A resposta conclui que o `xmalloc` aloca um buffer inferior ao necessário e que o ciclo escreve `nresp` apontadores, causando heap buffer overflow.',
      ],
    },
    solution:
      'Se `nresp` for suficientemente grande, o produto `nresp*sizeof(char*)` ultrapassa o valor máximo de um inteiro e volta a um valor pequeno. O `xmalloc` aloca então um bloco muito menor, mas o ciclo continua a escrever `nresp` apontadores, progresso o heap para lá do fim da zona alocada: heap buffer overflow.',
    reasoning:
      'A verificação `nresp > 0` não impede valores muito grandes. A multiplicação é feita em aritmética de inteiros e pode fazer wrap-around, pelo que a alocação fica inconsistente com o número de escritas efetuadas no ciclo.',
  },
  {
    id: 'fsi-mt1-2021-q4',
    title: 'Use after free e tomada de controlo',
    source: 'Teste Intercalar, 2021/22',
    topic: 'software',
    prompt:
      'Explique porque é que um erro de gestão de memória do tipo use after free pode expor uma vulnerabilidade que permite a um atacante concretizar uma tomada de controlo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que, após libertada, a memória pode ser reutilizada por outro objeto, incluindo estruturas com apontadores de função.',
        'A resposta conclui que o atacante pode controlar o conteúdo reutilizado e desviar o fluxo de execução, por exemplo sobrescrevendo um apontador para função.',
      ],
    },
    solution:
      'Num use after free, o programa continua a usar um apontador para memória já libertada. Essa memória pode ser realocada para outro objeto controlado pelo atacante; se aí ficar um apontador para função ou um vtable, o atacante pode fazer o programa saltar para código seu, conquistando a tomada de controlo.',
    reasoning:
      'A libertade não limpa o apontador antigo. Quando a zona é reutilizada, o objeto "fantasma" e o novo objeto partilham a mesma memória, e o atacante explora essa sobreposição para corromper dados sensíveis à execução.',
    explanation: link.outrosErros,
  },
  {
    id: 'fsi-mt1-2023-q2',
    title: 'openSSH: overflow de inteiros seguido de heap overflow',
    source: 'Teste 1, 2023/24',
    topic: 'software',
    prompt:
      'Considere o código do openSSH em que um atacante controla a variável `nresp`:\n\n```c\nnresp = packet_get_int();\nif (nresp > 0) {\n   response = xmalloc(nresp*sizeof(char*));\n   for (i = 0; i < nresp; i++)\n      response[i] = packet_get_string(NULL);\n}\n```\n\nO atacante pode provocar um problema de gestão de memória porque consegue despoletar:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Um overflow de inteiros e um subsequente stack buffer overflow.',
          correct: false,
          explanation:
            'A escrita ocorre na heap (zona alocada por xmalloc), não na stack.',
        },
        {
          text: 'Um overflow de inteiros e um subsequente use after free.',
          correct: false,
          explanation:
            'O problema não é usar memória libertada, mas escrever para lá do fim da zona alocada.',
        },
        {
          text: 'Um overflow de inteiros e um subsequente heap buffer overflow.',
          correct: true,
          explanation:
            'A multiplicação `nresp*sizeof(char*)` faz wrap-around, a alocação fica pequena e o ciclo escreve para lá do fim do bloco na heap.',
        },
        {
          text: 'Um heap overflow e um subsequente integer buffer overflow.',
          correct: false,
          explanation:
            'A ordem está invertida: primeiro ocorre o overflow do inteiro, depois o heap overflow.',
        },
      ],
    },
    solution: 'Um overflow de inteiros e um subsequente heap buffer overflow.',
    reasoning:
      'Com `nresp` muito grande, `nresp*sizeof(char*)` excede a capacidade do inteiro e o resultado volta a um valor pequeno, pelo que o `xmalloc` aloca pouco espaço. O ciclo escreve depois `nresp` entradas nesse bloco pequeno da heap.',
  },
  {
    id: 'fsi-mt1-2023-q3',
    title: 'Função dos NOP (0x90) no shellcode',
    source: 'Teste 1, 2023/24',
    topic: 'software',
    prompt:
      'Num ataque de buffer overflow, parte do payload foi preenchida com 0x90, o código da instrução NOP. O seu objetivo é gastar ciclos de CPU enquanto:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Limpa o registo %ebp.',
          correct: false,
          explanation: 'NOP não altera nenhum registo.',
        },
        {
          text: 'Conta quantas vezes o NOP foi executado e guarda o valor num registo.',
          correct: false,
          explanation: 'NOP não atualiza contadores nem registos.',
        },
        {
          text: 'Aumenta o contador de programa sem alterar memória ou registos.',
          correct: true,
          explanation:
            'NOP (no operation) apenas avança o contador de programa, criando um colchão de instruções que conduz a execução até ao shellcode.',
        },
        {
          text: 'Nenhuma das outras opções.',
          correct: false,
          explanation: 'A terceira opção descreve corretamente o NOP.',
        },
      ],
    },
    solution: 'Aumenta o contador de programa sem alterar memória ou registos.',
    reasoning:
      'Uma sequência de NOP (NOP sled) torna o ataque robusto: mesmo que o endereço de salto não aponte exatamente para o início do shellcode, a execução desliza pelos NOP até lá.',
  },
  {
    id: 'fsi-mt1-2024-q2',
    title: 'Canário de stack e stack smashing',
    source: 'Teste 1, 2024/25',
    topic: 'software',
    prompt:
      'Um canário procura impedir a modificação da stack. É impossível fazer "smash the stack":',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Sem adivinhar a posição do canário.',
          correct: false,
          explanation:
            'A posição do canário não é o segredo; o valor é que tem de permanecer intacto.',
        },
        {
          text: 'Sem ler o valor do canário.',
          correct: false,
          explanation:
            'O ataque pode ler o valor; o que não pode é alterá-lo sem ser detetado.',
        },
        {
          text: 'Se o valor do canário tiver mudado ao saltar para o endereço de retorno.',
          correct: true,
          explanation:
            'Antes de usar o endereço de retorno, o programa compara o canário com o valor original; se mudou, o programa termina em vez de seguir o endereço corrompido.',
        },
        {
          text: 'Ao chamar a função seguinte.',
          correct: false,
          explanation:
            'A verificação ocorre no regresso da função, não na chamada seguinte.',
        },
      ],
    },
    solution:
      'Se o valor do canário tiver mudado ao saltar para o endereço de retorno.',
    reasoning:
      'O canário é colocado entre as variáveis locais e o endereço de retorno. Um overflow que tente sobrescrever o endereço de retorno tem de passar pelo canário, alterando o seu valor; a verificação no regresso deteta a adulteração e aborta o programa.',
    explanation: link.canarios,
  },
];

export const mt1Sistemas: ExamQuestion[] = [
  {
    id: 'fsi-mt1-2021-q5',
    title: 'Princípio do desenho aberto',
    source: 'Teste Intercalar, 2021/22',
    topic: 'sistemas',
    prompt:
      'Dos princípios de segurança de sistemas (economia nos mecanismos, proteção por omissão, desenho aberto, defesa em profundidade, privilégio mínimo, separação de privilégios e mediação completa), enuncie o princípio do desenho aberto e apresente uma motivação para a sua utilização.',
    answer: {
      kind: 'self',
      checklist: [
        'O enunciado indica que a segurança não deve depender do segredo do desenho ou da implementação.',
        'A motivação liga-se a que o segredo acaba por ser descoberto e a que o escrutínio público permite encontrar e corrigir falhas.',
      ],
    },
    solution:
      'O princípio do desenho aberto (open design) diz que a segurança de um sistema não deve depender do segredo do seu desenho ou implementação, mas sim das chaves ou palavras-passe. A motivação é que os mecanismos ocultos acabam por ser descobertos e explorados. Um desenho público pode ser revisto por muitos especialistas, que encuentran e corrigem falhas antes dos atacantes.',
    reasoning:
      'A "segurança por obscuridade" falha porque não escala com o número de atacantes. Pelo contrário, mecanismos abertos beneficiam do escrutínio alargado da comunidade, como acontece com os protocolos e código aberto revistos publicamente.',
    explanation: link.principios,
  },
  {
    id: 'fsi-mt1-2021-q6',
    title: 'Effective user id e privilégio mínimo',
    source: 'Teste Intercalar, 2021/22',
    topic: 'sistemas',
    prompt:
      'Apresente uma situação em que um processo altera o seu effective user id em tempo de execução de acordo com o princípio do privilégio mínimo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta um exemplo concreto (por exemplo um programa setuid que larga os privilégios de root depois de abrir o ficheiro necessário).',
        'A justificação usa o princípio do privilégio mínimo: manter apenas os privilégios estritamente necessários em cada momento.',
      ],
    },
    solution:
      'Um programa setuid root que só precisa de ler um ficheiro protegido pode chamar `seteuid` para o utilizador normal logo após abrir o ficheiro, ou voltar a `seteuid(0)` apenas quando precisa de novo de privilégios. Assim, a maior parte do tempo o processo corre sem privilégios de root, minimizando o dano de uma eventual vulnerabilidade.',
    reasoning:
      'O privilégio mínimo manda que cada componente use apenas os privilégios estritamente necessários à tarefa em curso. Alterar o EUID em tempo de execução permite reduzir a janela em que o processo corre com privilégios elevados.',
    explanation: link.permissoes,
  },
  {
    id: 'fsi-mt1-2023-q4',
    title: 'UID de um processo lançado',
    source: 'Teste 1, 2023/24',
    topic: 'sistemas',
    prompt:
      'Um detalhe importante das permissões de ficheiros UNIX é o User ID (UID) de um processo. Um processo é lançado com o UID:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Do utilizador que o lançou, a menos que o bit setuid esteja a 1.',
          correct: false,
          explanation:
            'Por omissão o UID é o do utilizador, mas com o bit setuid ativo o processo corre com o UID do dono do ficheiro.',
        },
        {
          text: 'Do dono do ficheiro, a menos que o bit setuid esteja a 1.',
          correct: true,
          explanation:
            'Sem setuid, o processo fica com o UID de quem o lançou; com o bit setuid a 1, o EUID passa a ser o do dono do executável.',
        },
        {
          text: 'Do dono do ficheiro, a menos que esse utilizador seja root.',
          correct: false,
          explanation:
            'O facto de o dono ser root não anula o efeito do bit setuid.',
        },
        {
          text: 'Do utilizador root, se o bit setuid estiver a 1.',
          correct: false,
          explanation:
            'O setuid dá o UID do dono do ficheiro, que só é root se o ficheiro pertencer a root.',
        },
      ],
    },
    solution:
      'Do dono do ficheiro, se o bit setuid estiver a 1 (nos restantes casos, do utilizador que lançou o processo).',
    reasoning:
      'O bit setuid faz com que o effective user id do processo seja o do proprietário do ficheiro executável em vez do utilizador que o invocou, permitindo programas como o `passwd` aceder a ficheiros restritos de forma controlada.',
    explanation: link.permissoes,
  },
  {
    id: 'fsi-mt1-2024-q3',
    title: 'setuid e seteuid: alteração permanente vs temporária',
    source: 'Teste 1, 2024/25',
    topic: 'sistemas',
    prompt:
      'Os privilégios de um processo podem ser ajustados em tempo de execução por chamadas de sistema que manipulam o Effective User ID (EUID), o Saved User ID (SUID) e o Real User ID (RUID). Qual destas afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'seteuid altera permanentemente os privilégios, modificando EUID, RUID e SUID.',
          correct: false,
          explanation:
            'seteuid altera apenas o EUID e de forma temporária; o RUID e o SUID não são alterados.',
        },
        {
          text: 'setuid altera temporariamente os privilégios, modificando EUID e SUID, mas não o RUID.',
          correct: false,
          explanation:
            'setuid (quando chamado por root) altera permanentemente EUID, RUID e SUID; não é temporário.',
        },
        {
          text: 'setuid altera permanentemente os privilégios, modificando EUID e RUID mas não o SUID.',
          correct: false,
          explanation:
            'Quando chamado por root, setuid modifica os três identificadores.',
        },
        {
          text: 'seteuid altera temporariamente os privilégios, modificando o EUID mas não o RUID nem o SUID.',
          correct: true,
          explanation:
            'seteuid muda apenas o EUID e pode voltar atrás usando o SUID, sendo a forma recomendada de alternar privilégios temporariamente.',
        },
      ],
    },
    solution:
      'seteuid altera temporariamente os privilégios, modificando o EUID mas não o RUID nem o SUID.',
    reasoning:
      'setuid altera permanentemente os três identificadores quando invocado por root. seteuid altera apenas o EUID, permitindo que um processo setuid baixe e recupere privilégios conforme necessário, de acordo com o privilégio mínimo.',
    explanation: link.permissoes,
  },
];

export const mt1Web: ExamQuestion[] = [
  {
    id: 'fsi-mt1-2023-q5',
    title: 'Gestão de sessões mais segura',
    source: 'Teste 1, 2023/24',
    topic: 'web',
    prompt:
      'Qual é a forma mais segura de gestão de sessões em aplicações web?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O servidor guarda todo o estado do cliente, associado a um token aleatório em cada cookie de sessão.',
          correct: true,
          explanation:
            'Com o estado no servidor e apenas um identificador aleatório no cliente, o atacante não consegue forjar ou alterar o estado da sessão.',
        },
        {
          text: 'O servidor gere todo o estado do cliente, guardado num cookie de sessão cifrado e assinado com MAC.',
          correct: false,
          explanation:
            'Guardar estado no cookie (stateful client-side) expõe os dados ao cliente e aumenta a superfície de ataque.',
        },
        {
          text: 'O cliente gere todo o seu estado no seu cookie de sessão, que é guardado pelo servidor.',
          correct: false,
          explanation:
            'Esta descrição é inconsistente e coloca dados controláveis pelo cliente no fluxo de autenticação.',
        },
        {
          text: 'O servidor guarda todo o estado do cliente, associado ao mesmo identificador para todos os cookies de um cliente.',
          correct: false,
          explanation:
            'Reutilizar o mesmo identificador para vários cookies permite ataques de fixation e rastreio entre sessões.',
        },
      ],
    },
    solution:
      'O servidor guarda todo o estado do cliente, associado a um token aleatório em cada cookie de sessão.',
    reasoning:
      'Se o estado fica no servidor e o cookie carrega apenas um token aleatório imprevisível, o cliente não pode manipular os seus próprios privilégios; a revogação no servidor também é imediata.',
    explanation: link.sessoes,
  },
  {
    id: 'fsi-mt1-2023-q6',
    title: 'CSRF e cabeçalhos Fetch Metadata',
    source: 'Teste 1, 2023/24',
    topic: 'web',
    prompt:
      'Cross-Site Request Forgery (CSRF) é um ataque clássico à web que muitas propostas procuram mitigar. Qual destas afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Os tokens CSRF permitem ao servidor web receber uma lista branca de origens confiáveis.',
          correct: false,
          explanation:
            'Os tokens CSRF provam que o pedido veio de uma página legítima do próprio site, não uma lista de origens.',
        },
        {
          text: 'Os cabeçalhos Fetch Metadata permitem ao servidor web receber uma lista branca de origens confiáveis.',
          correct: false,
          explanation:
            'Os Fetch Metadata não são uma lista branca; são cabeçalhos que descrevem a origem e o contexto do pedido.',
        },
        {
          text: 'Os cabeçalhos Fetch Metadata permitem ao servidor web decidir que pedidos de clientes aceitar com base na origem.',
          correct: true,
          explanation:
            'O servidor pode inspecionar `Sec-Fetch-Site` e rejeitar pedidos cross-site não legítimos, mitigando CSRF sem tokens adicionais.',
        },
        {
          text: 'Os cookies SameSite=Strict permitem ao servidor web decidir que pedidos de clientes aceitar com base na origem.',
          correct: false,
          explanation:
            'SameSite é uma política do navegador sobre o envio do cookie, não uma decisão do servidor.',
        },
      ],
    },
    solution:
      'Os cabeçalhos Fetch Metadata permitem ao servidor web decidir que pedidos de clientes aceitar com base na origem.',
    reasoning:
      'Numa CSRF, o navegador do utilizador autenticado envia o pedido forjado com os cookies válidos. Os Fetch Metadata (`Sec-Fetch-Site`, `Sec-Fetch-Mode`, etc.) informam o servidor de que o pedido é cross-site, permitindo rejeitá-lo.',
    explanation: link.csrf,
  },
  {
    id: 'fsi-mt1-2024-q4',
    title: 'Deteção de sessão com imagem: XS-Leaks',
    source: 'Teste 1, 2024/25',
    topic: 'web',
    prompt:
      'Uma página maliciosa contém o seguinte código. Se o utilizador estiver autenticado, o URL redireciona para a imagem do logótipo do Medium; caso contrário, redireciona para a página de login do Medium, que não é uma imagem e provoca um erro. Este ataque pode ser catalogado como:\n\n```html\n<img src="https://medium.com/m/login-redirect?redirectUrl=https%3A%2F%2Fmedium.com%2Ffavicon.ico"\n  onerror="alert(\'Not logged in\')" onload="alert(\'logged in\')">\n```',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Cross-Frame Scripting (XFS).',
          correct: false,
          explanation:
            'XFS envolve frames, não a fuga de informação de estado de sessão.',
        },
        {
          text: 'Cross-Site Request Forgery (CSRF).',
          correct: false,
          explanation:
            'CSRF força o utilizador a executar uma ação; aqui o atacante apenas lê informação de estado.',
        },
        {
          text: 'Cross-Site Leaks (XS-Leaks).',
          correct: true,
          explanation:
            'O atacante usa o sucesso ou insucesso do carregamento de um recurso cross-site (onload/onerror) para inferir se o utilizador está autenticado.',
        },
        {
          text: 'Cross-Site Scripting (XSS).',
          correct: false,
          explanation:
            'Não há injeção de script na página da vítima; o script corre na página do atacante.',
        },
      ],
    },
    solution: 'Cross-Site Leaks (XS-Leaks).',
    reasoning:
      'O evento `onload`/`onerror` da imagem funciona como um oráculo: o atacante não vê a resposta, mas consegue distinguir o estado de autenticação da vítima através do recurso que carregou com sucesso, fugando informação entre sites.',
    explanation: link.xsleaks,
  },
];
