import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  registos:
    '/cadeiras/lc/falar-com-hardware/#registos-e-espaços-de-endereçamento',
  polling: '/cadeiras/lc/falar-com-hardware/#polling-e-timeout',
  privilegios: '/cadeiras/lc/falar-com-hardware/#privilégios-e-minix',
  tecladoMakeBreak: '/cadeiras/lc/teclado/#make-break-e-prefixos',
  tecladoEstado: '/cadeiras/lc/teclado/#estado-do-i8042',
  freq: '/cadeiras/lc/temporizador/#escolher-a-frequência',
  controlo: '/cadeiras/lc/temporizador/#palavra-de-controlo',
  readback: '/cadeiras/lc/temporizador/#read-back-e-estado',
  ciclo: '/cadeiras/lc/interrupcoes/#ciclo-completo-com-timer',
  hook: '/cadeiras/lc/interrupcoes/#hook-e-máscara-de-notificação',
  irq: '/cadeiras/lc/interrupcoes/#irq-vetor-e-rotina',
  conversoes: '/cadeiras/lc/c-estruturado/#promoções-e-conversões-de-inteiros',
};

export const mt1HardwareIO: ExamQuestion[] = [
  {
    id: 'lc-mt1-2024-q1',
    title: 'Função principal dos dispositivos de I/O',
    source: 'Teste 1, 2024/25',
    topic: 'hardware-io',
    prompt:
      'Qual é a função principal dos dispositivos de entrada/saída (I/O) num sistema de computador?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Fornecer uma interface entre o computador e o seu ambiente.',
          correct: true,
          explanation:
            'Os periféricos de I/O ligam o processador ao mundo exterior: teclado, rato, ecrã, etc.',
        },
        {
          text: 'Executar programas de software.',
          correct: false,
          explanation:
            'Quem executa programas é o CPU, não o dispositivo de I/O.',
        },
        {
          text: 'Aumentar a velocidade de processamento do CPU.',
          correct: false,
          explanation:
            'A velocidade do CPU não depende dos periféricos de I/O.',
        },
        {
          text: 'Armazenar dados de forma permanente.',
          correct: false,
          explanation:
            'O armazenamento permanente é papel da memória secundária, não da interface de I/O.',
        },
      ],
    },
    solution:
      'Fornecer uma interface entre o computador e o seu ambiente exterior.',
    reasoning:
      'Os dispositivos de I/O são a ponte entre o sistema computacional e o utilizador ou outros sistemas, convertendo informação entre o mundo exterior e a representação interna do computador.',
    explanation: link.registos,
  },
  {
    id: 'lc-mt1-2024-q2',
    title: 'O que é um device driver',
    source: 'Teste 1, 2024/25',
    topic: 'hardware-io',
    prompt: 'O que é um device driver?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'É um software que permite a interação com um componente de hardware.',
          correct: true,
          explanation:
            'O driver traduz pedidos do sistema operativo em operações sobre o dispositivo.',
        },
        {
          text: 'É um componente de hardware de um dispositivo externo que recebe pedidos do processador.',
          correct: false,
          explanation: 'O driver é software, não um componente de hardware.',
        },
        {
          text: 'É uma classe de software específica para configurar o temporizador do processador.',
          correct: false,
          explanation:
            'O driver não se limita ao temporizador nem ao processador.',
        },
        {
          text: 'É um componente de software que permite interagir diretamente com o hardware sem o sistema operativo.',
          correct: false,
          explanation:
            'Em Minix, o driver corre como processo e usa chamadas ao kernel; não dispensa o sistema operativo.',
        },
      ],
    },
    solution:
      'É um software que permite a interação com um componente de hardware.',
    reasoning:
      'O device driver esconde os detalhes do dispositivo atrás de uma interface uniforme e faz as operações privilegiadas (portas de I/O, interrupções) através de chamadas ao kernel.',
    explanation: link.registos,
  },
  {
    id: 'lc-mt1-2024-q3',
    title: 'Polling vs interrupções: chamadas ao kernel',
    source: 'Teste 1, 2024/25',
    topic: 'hardware-io',
    prompt:
      'Para ler scancodes do teclado pode escolher-se polling ou interrupções. Qual das duas alternativas espera que faça menos chamadas `sys_inb()` ao kernel?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Interrupções.',
          correct: true,
          explanation:
            'Com interrupções, o kernel só é chamado quando há um evento novo; em polling consulta-se o estado repetidamente.',
        },
        {
          text: 'Polling.',
          correct: false,
          explanation:
            'Em polling é preciso consultar o registo de estado muitas vezes, mesmo sem teclas premidas.',
        },
        {
          text: 'O número de chamadas é aleatório.',
          correct: false,
          explanation:
            'O número de chamadas não é aleatório; depende do mecanismo escolhido.',
        },
        {
          text: 'Fazem sempre o mesmo número de chamadas.',
          correct: false,
          explanation:
            'Polling e interrupções não fazem o mesmo número de chamadas.',
        },
      ],
    },
    solution: 'Interrupções.',
    reasoning:
      'Em polling, o programa verifica o estado do dispositivo em ciclo, gastando uma chamada `sys_inb()` por consulta. Com interrupções, cada chamada ao kernel corresponde a um evento real, pelo que o número de chamadas é menor.',
    explanation: link.polling,
  },
];

export const mt1Teclado: ExamQuestion[] = [
  {
    id: 'lc-mt1-2024-q4',
    title: 'Combinação make code e break code válida',
    source: 'Teste 1, 2024/25',
    topic: 'teclado',
    prompt:
      'No protocolo PS/2 (set 1), o break code de uma tecla obtém-se poniendo o bit 7 do make code a 1. Qual é uma combinação make code / break code válida?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Make code: `0xC2`, break code: `0xCA`',
          correct: false,
          explanation:
            '`0xC2` já tem o bit 7 a 1; o break code não pode resultar dele.',
        },
        {
          text: 'Make code: `0x9E`, break code: `0x1E`',
          correct: false,
          explanation:
            'O break code tem sempre o bit 7 a 1, ao contrário do make code.',
        },
        {
          text: 'Make code: `0x1E`, break code: `0x9E`',
          correct: true,
          explanation: '`0x9E = 0x1E | 0x80`, ou seja, o bit 7 foi posto a 1.',
        },
        {
          text: 'Make code: `0xCA`, break code: `0xC2`',
          correct: false,
          explanation:
            '`0xCA` já tem o bit 7 a 1; o break code não pode resultar dele.',
        },
      ],
    },
    solution: 'Make code `0x1E` e break code `0x9E`.',
    reasoning:
      'No set 1, o break code distingue-se do make code apenas no bit 7: `0x1E = 0001 1110` e `0x9E = 1001 1110 = 0x1E | 0x80`.',
    explanation: link.tecladoMakeBreak,
  },
  {
    id: 'lc-mt1-2024-q5',
    title: 'Porque é que alguns scancodes têm dois bytes',
    source: 'Teste 1, 2024/25',
    topic: 'teclado',
    prompt: 'No KBC, porque é que há scancodes com dois bytes?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Por retrocompatibilidade.',
          correct: false,
          explanation:
            'A retrocompatibilidade explica a conservação do set 1, não o facto de alguns scancodes usarem dois bytes.',
        },
        {
          text: 'Porque não era possível representar todo o conjunto de scancodes num só byte.',
          correct: true,
          explanation:
            'Um byte só dá 256 códigos; o prefixo `0xE0` duplica o espaço disponível para teclas estendidas.',
        },
        {
          text: 'Para permitir mapear os scancodes para diferentes idiomas de teclado.',
          correct: false,
          explanation:
            'O idioma do teclado é interpretado em software, não pelo número de bytes do scancode.',
        },
        {
          text: 'Para mapear diretamente para ASCII.',
          correct: false,
          explanation:
            'Scancode não é ASCII; a tecla `0x1E` não produz o caráter `a` sem interpretação do layout.',
        },
      ],
    },
    solution:
      'Porque não era possível representar todo o conjunto de scancodes num só byte.',
    reasoning:
      'As teclas estendidas usam o prefixo `0xE0` seguido do código, como a seta direita (`E0 4D` no make). Com um só byte ficariam indisponíveis muitos códigos.',
    explanation: link.tecladoMakeBreak,
  },
  {
    id: 'lc-mt1-2024-q6',
    title: 'Função do registo de estado do KBC',
    source: 'Teste 1, 2024/25',
    topic: 'teclado',
    prompt:
      'Qual é o objetivo principal do registo de estado (status register) do KBC?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Guardar o último caráter digitado dentro do KBC.',
          correct: false,
          explanation:
            'O caráter lido está no output buffer, não no registo de estado.',
        },
        {
          text: 'Mostrar no ecrã o que se digita no teclado.',
          correct: false,
          explanation: 'O KBC não gere o ecrã; isso é papel da placa de vídeo.',
        },
        {
          text: 'Guardar o estado do KBC.',
          correct: true,
          explanation:
            'Bits como OBF e IBF indicam se há byte novo para ler ou se se pode escrever uma ordem.',
        },
        {
          text: 'Guardar palavras-passe do utilizador.',
          correct: false,
          explanation: 'O KBC não guarda palavras-passe.',
        },
      ],
    },
    solution: 'Guardar o estado do KBC.',
    reasoning:
      'O registo de estado (lido na porta `0x64`) tem bits como OBF (output buffer full) e IBF (input buffer full), que o programa testa antes de ler scancodes ou escrever comandos.',
    explanation: link.tecladoEstado,
  },
];

export const mt1Temporizador: ExamQuestion[] = [
  {
    id: 'lc-mt1-2024-q7',
    title: 'Fórmula do divisor de frequência do timer',
    source: 'Teste 1, 2024/25',
    topic: 'temporizador',
    prompt:
      'Na função `timer_set_frequency`, é necessário um divisor de frequência `d`. Qual fórmula exprime corretamente o seu cálculo? Neste contexto, `freq` é a frequência desejada, `TIMER_FREQ` é a frequência do relógio do timer no PC e `USHRT_MAX` é o valor máximo do contador.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`d = TIMER_FREQ / freq`',
          correct: true,
          explanation:
            'A frequência de saída é a de entrada dividida pelo divisor: `freq = TIMER_FREQ / d`.',
        },
        {
          text: '`d = TIMER_FREQ / USHRT_MAX * freq`',
          correct: false,
          explanation:
            'Esta expressão mistura o valor máximo do contador com a frequência desejada.',
        },
        {
          text: '`d = TIMER_FREQ * freq`',
          correct: false,
          explanation:
            'Multiplicar as frequências não produz um divisor de contagem.',
        },
        {
          text: '`d = freq / USHRT_MAX`',
          correct: false,
          explanation:
            'O divisor não depende da razão entre a frequência desejada e o valor máximo.',
        },
      ],
    },
    solution: '`d = TIMER_FREQ / freq`.',
    reasoning:
      'O contador divide o relógio de entrada: para obter `freq` Hz a partir de `TIMER_FREQ` Hz, carrega-se `d = TIMER_FREQ / freq` (com a política de quociente inteiro usada no laboratório).',
    explanation: link.freq,
  },
  {
    id: 'lc-mt1-2024-q8',
    title: 'Função do registo de controlo na porta 0x43',
    source: 'Teste 1, 2024/25',
    topic: 'temporizador',
    prompt: 'Qual é a função do registo de controlo na porta `0x43` do i8254?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Guarda a hora atual.',
          correct: false,
          explanation:
            'A hora é dada pelo relógio de tempo real, não pelo i8254.',
        },
        {
          text: 'Controla a transferência de dados entre o CPU e a memória.',
          correct: false,
          explanation:
            'Isso é papel do controlador de memória/DMA, não do timer.',
        },
        {
          text: 'Guarda definições de configuração do utilizador.',
          correct: false,
          explanation:
            'O registo de controlo programa o próprio contador, não preferências do utilizador.',
        },
        {
          text: 'Programa os timers e seleciona os modos de contagem.',
          correct: true,
          explanation:
            'A palavra de controlo escolhe o contador, a ordem de bytes (LSB/MSB), o modo e o formato binário/BCD.',
        },
      ],
    },
    solution: 'Programa os timers e seleciona os modos de contagem.',
    reasoning:
      'A porta `0x43` recebe a palavra de controlo do i8254, que configura cada contador de 16 bits (portas `0x40` a `0x42`).',
    explanation: link.controlo,
  },
  {
    id: 'lc-mt1-2024-q9',
    title: 'O que permite o comando read-back do i8254',
    source: 'Teste 1, 2024/25',
    topic: 'temporizador',
    prompt: 'O que permite o comando read-back do i8254?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Aumentar a velocidade de processamento do timer.',
          correct: false,
          explanation: 'O read-back não altera a velocidade do relógio.',
        },
        {
          text: 'Alterar o vetor de interrupção.',
          correct: false,
          explanation:
            'O vetor de interrupção é gerido pelo PIC, não pelo read-back.',
        },
        {
          text: 'Ler o valor atual do contador e a configuração programada.',
          correct: true,
          explanation:
            'O comando read-back (escrito em `0x43` com os bits 7–6 a `11`) permite obter a contagem e/ou o estado do contador.',
        },
        {
          text: 'Repor o timer nas definições de fábrica.',
          correct: false,
          explanation: 'O read-back é apenas de leitura; não repõe nada.',
        },
      ],
    },
    solution: 'Ler o valor atual do contador e a configuração programada.',
    reasoning:
      'Sem o read-back, a porta de um contador só daria a contagem de forma pouco fiável; o comando permite ainda ler o estado (modo, formato) de um contador.',
    explanation: link.readback,
  },
  {
    id: 'lc-mt1-2024-q10',
    title: 'Como se mediu o tempo no Lab 2',
    source: 'Teste 1, 2024/25',
    topic: 'temporizador',
    prompt:
      'No Lab 2, como foi medido o tempo e impressa uma mensagem a cada segundo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Usando o comando read-back a cada segundo.',
          correct: false,
          explanation:
            'O read-back lê o contador, mas não foi esse o mecanismo de temporização do Lab 2.',
        },
        {
          text: 'Subscrivendo as interrupções do timer com a definição de 60 Hz do Minix.',
          correct: true,
          explanation:
            'O ciclo de eventos recebia notificações do timer (60 Hz) e contava ticks até perfazer um segundo.',
        },
        {
          text: 'Configurando o timer com uma frequência de 120 Hz.',
          correct: false,
          explanation:
            'O Lab 2 usou a frequência de 60 Hz habitual do Minix, não 120 Hz.',
        },
        {
          text: 'Subscrivendo as interrupções do timer com a definição de 120 Hz do Minix.',
          correct: false,
          explanation: 'A definição usada foi a de 60 Hz, não 120 Hz.',
        },
      ],
    },
    solution:
      'Subscrivendo as interrupções do timer com a definição de 60 Hz do Minix.',
    reasoning:
      'O Lab 2 configurava o contador 0 para gerar interrupções e o handler incrementava um contador de ticks; a cada 60 ticks (1 segundo a 60 Hz) se imprimia a mensagem.',
    explanation: link.ciclo,
  },
];

export const mt1Interrupcoes: ExamQuestion[] = [
  {
    id: 'lc-mt1-2024-q11',
    title: 'Comportamento de driver_receive no Minix',
    source: 'Teste 1, 2024/25',
    topic: 'interrupcoes',
    prompt: 'Qual é o comportamento da chamada `driver_receive` no Minix?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Bloqueia até receber uma interrupção de software, permitindo comutação de contexto.',
          correct: false,
          explanation:
            'A `driver_receive` não espera por uma interrupção de software; espera por uma mensagem (que pode ser uma notificação de hardware).',
        },
        {
          text: 'Dá erro se não houver notificações pendentes para o processo chamador.',
          correct: false,
          explanation: 'Não dá erro; bloqueia à espera de mensagem.',
        },
        {
          text: 'Faz polling do PIC à procura de interrupções dos periféricos relevantes.',
          correct: false,
          explanation: 'Quem trata do PIC é o kernel, não a aplicação.',
        },
        {
          text: 'Bloqueia até receber uma mensagem de pedido de serviço, permitindo comutação de contexto.',
          correct: true,
          explanation:
            'Enquanto não chega mensagem, o processo fica bloqueado e o CPU pode correr outro processo.',
        },
      ],
    },
    solution:
      'Bloqueia até receber uma mensagem de pedido de serviço, permitindo comutação de contexto.',
    reasoning:
      'O ciclo de eventos do Lab 2 chama `driver_receive(ANY, &msg, &ipc_status)` e fica bloqueado até o kernel lhe entregar uma mensagem, incluindo as notificações de interrupção de hardware.',
    explanation: link.ciclo,
  },
  {
    id: 'lc-mt1-2024-q12',
    title: 'Valor de hook_id para receber o bit 7 na notificação',
    source: 'Teste 1, 2024/25',
    topic: 'interrupcoes',
    prompt:
      'Um device driver quer subscrever interrupções do timer para ser notificado pelo kernel com um payload em que o bit 7 está a 1. Que valor deve passar no argumento `hook_id` da função `sys_irqsetpolicy`?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`BIT(7)`',
          correct: false,
          explanation:
            '`BIT(7)` vale 128 e seria a máscara a testar na notificação, não o valor do hook; como hook pediria um bit que não existe no campo de notificações.',
        },
        {
          text: '`0`',
          correct: false,
          explanation:
            'Com `hook_id = 0`, o kernel poria a 1 o bit 0 da notificação, não o bit 7.',
        },
        {
          text: '`7`',
          correct: true,
          explanation:
            'O `hook_id` é o número do bit: o kernel coloca a 1 esse bit no payload, e a máscara a testar na aplicação é `BIT(7) = 0x80`.',
        },
        {
          text: '`1`',
          correct: false,
          explanation: 'Com `hook_id = 1`, a notificação teria o bit 1 a 1.',
        },
      ],
    },
    solution: '`hook_id = 7`.',
    reasoning:
      'Guarda-se o número do bit antes da chamada: a máscara a testar na notificação é `1 << hook_id`, ou seja `BIT(7) = 0x80`. Passar o próprio `BIT(7)` como hook pediria o bit 128, que não existe no campo de notificações.',
    explanation: link.hook,
  },
  {
    id: 'lc-mt1-2024-q13',
    title: 'O que faz a política IRQ_REENABLE',
    source: 'Teste 1, 2024/25',
    topic: 'interrupcoes',
    prompt:
      'O que faz a flag `IRQ_REENABLE` no contexto das subscrições de notificações de interrupção no Minix?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Permite remover mais tarde a respetiva subscrição.',
          correct: false,
          explanation:
            'A remoção faz-se com `sys_irqrmpolicy`, independentemente desta flag.',
        },
        {
          text: 'Aumenta a prioridade do handler instalado, impedindo o kernel de o tratar primeiro.',
          correct: false,
          explanation: 'A política não altera prioridades de atendimento.',
        },
        {
          text: 'Permite que o driver de dispositivo do próprio Minix trate das interrupções da respetiva linha IRQ depois de a subscrição ser removida.',
          correct: false,
          explanation:
            'A reativação automática da linha é o efeito da flag, não a devolução ao driver do sistema.',
        },
        {
          text: 'Faz com que o kernel desmascare automaticamente as interrupções na linha IRQ associada ao `hook_id` indicado.',
          correct: true,
          explanation:
            'Sem esta política, o processo teria de chamar `sys_irqenable` quando ficasse pronto; com ela, a rotina genérica do kernel reativa a linha.',
        },
      ],
    },
    solution:
      'Faz com que o kernel desmascare automaticamente as interrupções na linha IRQ associada ao `hook_id` indicado.',
    reasoning:
      'A `IRQ_REENABLE` autoriza a rotina genérica a reativar a linha de IRQ depois de cada interrupção, para que as seguintes possam chegar sem a aplicação ter de chamar `sys_irqenable`.',
    explanation: link.hook,
  },
  {
    id: 'lc-mt1-2024-q14',
    title: 'Papel do PIC no mecanismo de interrupções',
    source: 'Teste 1, 2024/25',
    topic: 'interrupcoes',
    prompt: 'De que é responsável o PIC (Priority Interrupt Controller)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Avisar o CPU de uma nova interrupção.',
          correct: true,
          explanation:
            'O periférico pede IRQ ao PIC, o PIC escolhe o pedido a apresentar e sinaliza o processador com o vetor correspondente.',
        },
        {
          text: 'Avisar o dispositivo de I/O das interrupções pela ordem correta.',
          correct: false,
          explanation: 'O PIC comunica com o CPU, não com os dispositivos.',
        },
        {
          text: 'Executar o handler respetivo de cada interrupção.',
          correct: false,
          explanation:
            'Quem executa o handler é o CPU, depois de o kernel despachar a notificação.',
        },
        {
          text: 'Avisar o CPU de que o handler terminou.',
          correct: false,
          explanation:
            'O fim do atendimento é sinalizado com EOI, tratado pelo kernel.',
        },
      ],
    },
    solution: 'Avisar o CPU de uma nova interrupção.',
    reasoning:
      'O PIC i8259 regista os pedidos de interrupção, aplica as máscaras e apresenta ao processador o pedido prioritário, que o CPU atende com o vetor associado.',
    explanation: link.irq,
  },
];

export const mt1CSistema: ExamQuestion[] = [
  {
    id: 'lc-mt1-2024-q15',
    title: 'Semântica dos valores de retorno das chamadas POSIX',
    source: 'Teste 1, 2024/25',
    topic: 'c-sistema',
    prompt:
      'Nas chamadas ao sistema POSIX, qual é a semântica habitual dos valores de retorno?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`1` indica sucesso e os outros valores erro.',
          correct: false,
          explanation: 'Não é `1` que indica sucesso nas chamadas POSIX.',
        },
        {
          text: '`0` indica erro e os outros valores sucesso.',
          correct: false,
          explanation: 'É ao contrário: `0` é o valor de sucesso.',
        },
        {
          text: '`1` indica erro e os outros valores sucesso.',
          correct: false,
          explanation: 'Nenhum valor positivo indica erro por convenção geral.',
        },
        {
          text: '`0` indica sucesso e os outros valores erro.',
          correct: true,
          explanation:
            'É a convenção habitual, também usada nas chamadas do Minix como `sys_inb` e `sys_irqsetpolicy`.',
        },
      ],
    },
    solution: '`0` indica sucesso e os outros valores erro.',
    reasoning:
      'As chamadas ao sistema POSIX (e as do kernel do Minix usadas em LC) devolvem `0` quando a operação foi bem-sucedida e um código de erro diferente de zero quando falhou.',
    explanation: link.privilegios,
  },
  {
    id: 'lc-mt1-2024-q16',
    title: 'Resultado da operação bit a bit 12 & 10',
    source: 'Teste 1, 2024/25',
    topic: 'c-sistema',
    prompt: 'Qual é o resultado da expressão em C `(12 & 10)`?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`8`',
          correct: true,
          explanation: '`12 = 1100b` e `10 = 1010b`; `1100 & 1010 = 1000 = 8`.',
        },
        {
          text: '`12`',
          correct: false,
          explanation: 'O resultado não é o primeiro operando.',
        },
        {
          text: '`2`',
          correct: false,
          explanation:
            '`2 = 0010b` seria o resultado de `12 & 10` se só o bit 1 contasse, mas o bit 3 também é comum.',
        },
        {
          text: '`10`',
          correct: false,
          explanation: 'O resultado não é o segundo operando.',
        },
      ],
    },
    solution: '`8`.',
    reasoning:
      'O operador `&` atua bit a bit: `12 = 1100b`, `10 = 1010b`, logo `12 & 10 = 1000b = 8`.',
    explanation: link.conversoes,
  },
];

export const mt1L3223: ExamQuestion[] = [
  {
    id: 'lc-mt1-2020-q1',
    title: 'Palavra de controlo do L3223: timer 1, alarme em milissegundos',
    source: 'PP1, 2020',
    topic: 'l3223',
    prompt:
      'No dispositivo fictício L3223 do PP1 de 2020, a escrita no porto `0x23` acede ao registo de controlo, cujos bits relevantes são: bits 7–6 selecionam o timer (`00`, `01`, `10` para os timers 0, 1, 2), o bit 4 seleciona o modo (`0` periódico, `1` alarme) e os bits 1–0 selecionam a unidade de tempo (`00` microssegundos, `01` milissegundos, `10` segundos). Indique a palavra de controlo, em hexadecimal, para configurar o timer 1 em modo alarme com unidade de milissegundos.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica a palavra de controlo `0x51` (binário `01010001`).',
        'A justificação separa os campos: bits 7–6 = `01`, bit 4 = `1`, bits 1–0 = `01`.',
      ],
    },
    solution: 'A palavra de controlo é `0x51`.',
    reasoning:
      'Timer 1 dá `01` nos bits 7–6 (`0x40`), o modo alarme liga o bit 4 (`0x10`) e milissegundos são `01` nos bits 1–0 (`0x01`). Somando: `0x40 | 0x10 | 0x01 = 0x51`. Depois de escrever a palavra de controlo em `0x23`, carrega-se o intervalo no porto do timer (`0x21`), primeiro o LSB e depois o MSB.',
  },
  {
    id: 'lc-mt1-2020-q2',
    title: 'Bit do registo de estado do L3223 para o timer 2',
    source: 'PP1, 2020',
    topic: 'l3223',
    prompt:
      'No L3223, a leitura do porto `0x23` acede ao registo de estado, em que o bit 2 (TIMER2-INT), o bit 1 (TIMER1-INT) e o bit 0 (TIMER0-INT) indicam, com valor 1, uma interrupção pendente do respetivo timer. Num atendimento de interrupção, para detetar o alarme do timer 2, que bit do registo de estado deve ser testado e com que valor?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que se testa o bit 2 (TIMER2-INT).',
        'A resposta indica que o valor esperado é 1.',
      ],
    },
    solution: 'Testa-se o bit 2 (TIMER2-INT) e o valor esperado é 1.',
    reasoning:
      'Cada timer tem o seu bit no registo de estado: o timer 0 usa o bit 0, o timer 1 o bit 1 e o timer 2 o bit 2. No handler lê-se `0x23` com `sys_inb` e verifica-se `(estado & TIMER2_INT) != 0` quando se espera o alarme do timer 2.',
  },
];
