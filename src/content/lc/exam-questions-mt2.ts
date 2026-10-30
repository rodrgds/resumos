import type { ExamQuestion } from '../../lib/exam-question';

export const mt2Teclado: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q1',
    title: 'Significado de um break code',
    source: 'Teste de Recurso, 2024/25',
    topic: 'teclado',
    prompt: 'No protocolo do teclado PS/2, o que representa um _break code_?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A libertação de uma tecla.',
          correct: true,
          explanation:
            'O break code sinaliza que a tecla foi libertada, não pressionada.',
        },
        {
          text: 'O código de uma tecla pressionada.',
          correct: false,
          explanation: 'Esse é o make code, não o break code.',
        },
        {
          text: 'O início de um novo scan code.',
          correct: false,
          explanation: 'O break code termina a tecla, não inicia outra.',
        },
        {
          text: 'Um erro de paridade.',
          correct: false,
          explanation: 'O break code é um código válido, não um erro.',
        },
      ],
    },
    solution: 'Um _break code_ representa a libertação de uma tecla.',
    reasoning:
      'Cada tecla gera um make code ao ser pressionada e um break code ao ser libertada. No protocolo PS/2, o break code obtém-se juntando o prefixo 0xF0 ao make code da tecla.',
    explanation: '/cadeiras/lc/teclado/#make-break-e-prefixos',
  },
  {
    id: 'lc-mt2-2025-q2',
    title: 'Objetivo de verificar o bit KBC_OBF',
    source: 'Teste de Recurso, 2024/25',
    topic: 'teclado',
    prompt:
      'Ao ler dados devolvidos pelo KBC, qual é o objetivo principal de verificar o bit KBC_OBF no registo de estado?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Reiniciar o sinalizador OBF do registo de estado.',
          correct: false,
          explanation:
            'A leitura do buffer de saída limpa o OBF; não é esse o objetivo da verificação.',
        },
        {
          text: 'Verificar se o buffer de saída contém dados para serem lidos.',
          correct: true,
          explanation:
            'OBF (Output Buffer Full) a 1 indica que há um byte pronto na porta 0x60.',
        },
        {
          text: 'Reiniciar a porta KBC_OUT_BUF.',
          correct: false,
          explanation:
            'A porta não se reinicia; o bit apenas reflete o estado do buffer.',
        },
        {
          text: 'Determinar se o buffer de entrada está pronto para aceitar novos dados.',
          correct: false,
          explanation: 'Esse é o papel do bit IBF, não do OBF.',
        },
      ],
    },
    solution:
      'Verificar se o buffer de saída (OBF) contém dados para serem lidos.',
    reasoning:
      'O bit KBC_OBF (Output Buffer Full) fica a 1 quando o KBC colocou um byte no buffer de saída, na porta 0x60. Só nesse caso a leitura tem dados válidos.',
    explanation: '/cadeiras/lc/teclado/#estado-do-i8042',
  },
  {
    id: 'lc-mt2-2025-q3',
    title: 'Bit KBC_ST_IBF antes de enviar um byte ao KBC',
    source: 'Teste 2, 2024/25',
    topic: 'teclado',
    prompt:
      'Antes de enviar um byte ao KBC, qual é o motivo principal de verificar o bit KBC_ST_IBF do registo de estado?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Garantir que o buffer de saída está pronto para dados.',
          correct: false,
          explanation:
            'O buffer de saída serve para ler dados do KBC, não para enviar.',
        },
        {
          text: 'Verificar que o buffer de entrada não está cheio e o KBC pode receber um novo byte.',
          correct: true,
          explanation:
            'IBF (Input Buffer Full) a 1 significa que o KBC ainda não processou o byte anterior.',
        },
        {
          text: 'Verificar se o buffer de entrada contém dados para ler.',
          correct: false,
          explanation: 'Quem verifica se há dados para ler é o bit OBF.',
        },
        {
          text: 'Repor o bit IBF antes de escrever dados.',
          correct: false,
          explanation: 'O bit IBF é controlado pelo KBC, não pela escrita.',
        },
      ],
    },
    solution:
      'Confirmar que o buffer de entrada não está cheio (IBF a 0) antes de escrever na porta 0x60.',
    reasoning:
      'Se o bit IBF estiver a 1, o KBC ainda não consumiu o byte anterior e um novo byte escrito seria perdido. Por isso se espera que IBF fique a 0 antes de enviar.',
    explanation: '/cadeiras/lc/teclado/#estado-do-i8042',
  },
];

export const mt2Rato: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q4',
    title: 'Tamanho do pacote padrão do rato PS/2',
    source: 'Teste 2, 2024/25',
    topic: 'rato',
    prompt: 'Quantos bytes tem o pacote padrão de um rato PS/2?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Depende do rato.',
          correct: false,
          explanation: 'O protocolo padrão do laboratório usa sempre 3 bytes.',
        },
        {
          text: '2.',
          correct: false,
          explanation: 'Ficaria sem deslocamentos.',
        },
        {
          text: '3.',
          correct: true,
          explanation: 'Botões + deslocamentos X e Y.',
        },
        {
          text: '4.',
          correct: false,
          explanation: 'O quarto byte só surge com roda.',
        },
      ],
    },
    solution: 'O pacote padrão tem 3 bytes.',
    reasoning:
      'O primeiro byte traz os botões e os bits de sinal e overflow; os dois seguintes registam os deslocamentos X e Y em complemento para dois com 9 bits.',
    explanation: '/cadeiras/lc/rato/#anatomia-do-pacote',
  },
  {
    id: 'lc-mt2-2025-q5',
    title: 'Linha de IRQ do controlador do rato',
    source: 'Teste 2, 2024/25',
    topic: 'rato',
    prompt: 'Que linha de IRQ eleva o controlador do rato?',
    answer: {
      kind: 'choice',
      options: [
        { text: '12.', correct: true, explanation: 'O rato usa a IRQ 12.' },
        {
          text: '2.',
          correct: false,
          explanation: 'A IRQ 2 é a cascata dos PICs.',
        },
        { text: '1.', correct: false, explanation: 'A IRQ 1 é o teclado.' },
        {
          text: '15.',
          correct: false,
          explanation: 'A IRQ 15 é o disco secundário.',
        },
      ],
    },
    solution: 'A linha de IRQ do rato é a 12.',
    reasoning:
      'O teclado usa a IRQ 1 e o rato a IRQ 12. A subscrição no Minix indica a linha (hook_id) e o kernel devolve a máscara de notificação correspondente no payload.',
    explanation: '/cadeiras/lc/interrupcoes/#irq-vetor-e-rotina',
  },
  {
    id: 'lc-mt2-2025-q6',
    title: 'Valores de ACK e NACK do rato',
    source: 'Teste 2, 2024/25',
    topic: 'rato',
    prompt:
      'Quando enviamos um comando ao controlador do rato, este devolve códigos de sucesso e de falha. Quais são os valores de ACK e de NACK?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'ACK = 0xEF; NACK = 0xFE.',
          correct: false,
          explanation: 'Valores trocados.',
        },
        {
          text: 'ACK = 0xFE; NACK = 0xFA.',
          correct: false,
          explanation: 'ACK e NACK invertidos.',
        },
        {
          text: 'ACK = 0xFA; NACK = 0xFE.',
          correct: true,
          explanation: 'ACK é 0xFA e NACK é 0xFE.',
        },
        {
          text: 'ACK = 0xFA; NACK = 0xEF.',
          correct: false,
          explanation: 'O NACK é 0xFE.',
        },
      ],
    },
    solution: 'ACK = 0xFA e NACK = 0xFE.',
    reasoning:
      'Após um comando bem-sucedido o rato responde 0xFA (ACK); se falhar, responde 0xFE (NACK), caso em que o driver deve reenviar o byte ou o comando.',
    explanation: '/cadeiras/lc/rato/#enviar-um-comando',
  },
  {
    id: 'lc-mt2-2025-q7',
    title: 'Bit de sincronização do pacote do rato',
    source: 'Teste de Recurso, 2024/25',
    topic: 'rato',
    prompt: 'Que bit é utilizado para sincronizar os pacotes do rato?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Bit 0 do primeiro byte = 1.',
          correct: false,
          explanation: 'O bit 0 é o botão esquerdo.',
        },
        {
          text: 'Bit 3 do primeiro byte = 1.',
          correct: true,
          explanation:
            'O bit 3 do primeiro byte está sempre a 1 e marca o início do pacote.',
        },
        {
          text: 'Bit 7 do segundo byte = 1.',
          correct: false,
          explanation: 'O bit 7 é o sinal do deslocamento Y.',
        },
        {
          text: 'Bit 5 do terceiro byte = 0.',
          correct: false,
          explanation: 'O bit 5 é o botão do meio.',
        },
      ],
    },
    solution: 'O bit 3 do primeiro byte, que deve estar sempre a 1.',
    reasoning:
      'Como o driver pode subscrever interrupções a meio de um pacote, o bit 3 do primeiro byte (sempre 1) permite detetar o início de um novo pacote e descartar bytes inválidos.',
    explanation: '/cadeiras/lc/rato/#montagem-e-sincronização',
  },
];

export const mt2Video: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q8',
    title: 'Escrever um píxel RGB em modo VBE 0x115',
    source: 'Teste 2, 2024/25',
    topic: 'video',
    prompt:
      'Queremos definir um píxel com uma cor RGB, usando o modo VBE 0x115, na posição $(x,y)$. Como deve proceder o _device driver_?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Copiar os 3 bytes, um de cada vez, para a memória gráfica mapeada com um offset de $x + y \\cdot \\text{BytesPerColumn}$.',
          correct: false,
          explanation: 'Esse offset baralha píxeis e bytes por píxel.',
        },
        {
          text: 'Copiar os 3 bytes, um de cada vez, para a memória gráfica mapeada com um offset de $x \\cdot 3 + y \\cdot \\text{BytesPerScanLine}$.',
          correct: false,
          explanation: 'Copiar byte a byte não é eficiente; usa-se memcpy.',
        },
        {
          text: 'Fazer memcpy dos 3 bytes para a memória gráfica mapeada com um offset de $x \\cdot 3 + y \\cdot \\text{BytesPerScanLine}$.',
          correct: true,
          explanation:
            'Offset = $x \\cdot 3 + y \\cdot \\text{BytesPerScanLine}$, com memcpy dos 3 bytes.',
        },
        {
          text: 'Fazer memcpy dos 3 bytes para a memória gráfica mapeada com um offset de $x + y \\cdot \\text{BytesPerColumn}$.',
          correct: false,
          explanation: 'Falta multiplicar $x$ pelos bytes por píxel.',
        },
      ],
    },
    solution:
      'Fazer `memcpy` dos 3 bytes da cor para o endereço base da VRAM mais $x \\cdot 3 + y \\cdot \\text{BytesPerScanLine}$.',
    reasoning:
      'No modo 0x115 há 3 bytes por píxel (24 bits de cor direta). Num frame buffer linear, o píxel $(x,y)$ começa no byte $x \\cdot 3 + y \\cdot \\text{BytesPerScanLine}$.',
    explanation: '/cadeiras/lc/video/#calcular-o-endereço-de-um-píxel',
  },
  {
    id: 'lc-mt2-2025-q9',
    title: 'Modo gráfico predefinido do Minix no Lab 5',
    source: 'Teste 2, 2024/25',
    topic: 'video',
    prompt:
      'Qual é o modo gráfico predefinido da versão de Minix usada no Lab 5?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '0x115.',
          correct: true,
          explanation: 'Resolução 1024x768, 24 bits de cor.',
        },
        { text: '0x03.', correct: false, explanation: 'É o modo de texto.' },
        {
          text: '0x030.',
          correct: false,
          explanation: 'Não é um modo VBE.standard.',
        },
        {
          text: '0x105.',
          correct: false,
          explanation: 'É modo indexado de 8 bits.',
        },
      ],
    },
    solution: 'O modo predefinido é o 0x115.',
    reasoning:
      'O modo 0x115 é direct color com 1024x768 e 24 bits por píxel (8:8:8), o modo que as funções de vídeo do LCF assumem por omissão nos laboratórios.',
    explanation: '/cadeiras/lc/video/#modo-e-informação-vbe',
  },
  {
    id: 'lc-mt2-2025-q10',
    title: 'Para que serve o double buffering',
    source: 'Teste 2, 2024/25',
    topic: 'video',
    prompt: 'Em programação gráfica, para que serve o _double buffering_?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Eliminar artefactos visuais.',
          correct: true,
          explanation:
            'Desenha-se numa imagem oculta e só depois se apresenta, evitando flickering e tearing.',
        },
        {
          text: 'Evitar cores trocadas.',
          correct: false,
          explanation: 'Não é esse o objetivo.',
        },
        {
          text: 'Poupar tempo de processamento.',
          correct: false,
          explanation: 'Usa mais memória, não poupa tempo.',
        },
        {
          text: 'Guardar cópias das imagens.',
          correct: false,
          explanation: 'O segundo buffer não é uma cópia de segurança.',
        },
      ],
    },
    solution:
      'Utilizar dois buffers para evitar flickering/tearing, desenhando numa imagem oculta antes de a apresentar no ecrã.',
    reasoning:
      'Se se desenhasse diretamente na VRAM visível, o utilizador veria o desenho a meio. Com double buffering, desenha-se no buffer secundário e copia-se para o visível (ou troca-se) durante o vertical retrace.',
    explanation: '/cadeiras/lc/video/#double-buffering-e-tearing',
  },
  {
    id: 'lc-mt2-2025-q11',
    title: 'Memória ocupada por um frame aRGB',
    source: 'Teste 2, 2024/25',
    topic: 'video',
    prompt:
      'Quanto memória ocupa um frame de $100 \\times 100$ píxeis, com componentes de cor aRGB (8:8:8:8)?',
    answer: { kind: 'number', value: 40000, tolerance: 0, unit: 'bytes' },
    solution: '$100 \\cdot 100 \\cdot 4 = 40\\,000$ bytes (40 kB).',
    reasoning:
      'O formato (8:)8:8:8 usa 32 bits por píxel, ou seja, 4 bytes. Um frame de $100 \\times 100$ píxeis ocupa, portanto, $10\\,000 \\times 4 = 40\\,000$ bytes.',
    explanation: '/cadeiras/lc/video/#mapear-memória-física',
  },
  {
    id: 'lc-mt2-2025-q12',
    title: 'Significado de cada caráter no XPM',
    source: 'Teste 2, 2024/25',
    topic: 'video',
    prompt:
      'No formato XPM usado no Lab 5, o que representa cada caráter do mapa da imagem?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A velocidade de um sprite.',
          correct: false,
          explanation: 'O XPM não guarda velocidades.',
        },
        {
          text: 'Um índice de cor.',
          correct: true,
          explanation:
            'Cada caráter aponta para uma entrada da tabela de cores.',
        },
        {
          text: 'Um endereço de memória.',
          correct: false,
          explanation:
            'O XPM é um formato de alto nível, independente de endereços.',
        },
        {
          text: 'A posição de um píxel.',
          correct: false,
          explanation: 'A posição é dada pela posição do caráter na string.',
        },
      ],
    },
    solution: 'Cada caráter representa um índice da tabela de cores.',
    reasoning:
      'Num XPM, as primeiras strings definem a correspondência caráter → cor (por exemplo `"s"` para uma cor, `"c"` para outra) e as strings seguintes usam esses caracteres para desenhar a imagem píxel a píxel.',
    explanation: '/cadeiras/lc/video/#xpm-e-sprites',
  },
];

export const mt2Interrupcoes: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q13',
    title: 'Significado da flag IRQ_REENABLE',
    source: 'Teste de Recurso, 2024/25',
    topic: 'interrupcoes',
    prompt:
      'No contexto da subscrição de notificações de interrupção no Minix, qual é o significado da flag IRQ_REENABLE?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Permite remover a subscrição mais tarde.',
          correct: false,
          explanation: 'A remoção faz-se com outra chamada, não com esta flag.',
        },
        {
          text: 'Permite ao Device Driver incluído no Minix tratar a IRQ quando a subscrição é removida.',
          correct: false,
          explanation: 'A flag atua durante a subscrição, não depois dela.',
        },
        {
          text: 'Eleva a prioridade do handler de interrupção.',
          correct: false,
          explanation: 'A flag não altera prioridades.',
        },
        {
          text: 'Permite ao kernel desmascarar automaticamente interrupções na linha de IRQ associada ao hook_id indicado.',
          correct: true,
          explanation:
            'IRQ_REENABLE faz o kernel reativar a linha de IRQ no PIC.',
        },
      ],
    },
    solution:
      'Permite ao kernel desmascarar (reenable) automaticamente a linha de IRQ associada ao hook_id usado na subscrição.',
    reasoning:
      'Em `sys_irqsetpolicy(irq_line, IRQ_REENABLE, &hook_id)`, a flag IRQ_REENABLE instrui o kernel a desmascarar a linha de IRQ no PIC, para que as interrupções desse dispositivo cheguem ao processador.',
    explanation: '/cadeiras/lc/interrupcoes/#hook-e-máscara-de-notificação',
  },
  {
    id: 'lc-mt2-2025-q14',
    title: 'Comportamento de driver_receive no Minix',
    source: 'Teste de Recurso, 2024/25',
    topic: 'interrupcoes',
    prompt:
      'Qual é o comportamento da chamada ao sistema `driver_receive` no Minix?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Bloqueia até receber uma mensagem de pedido de serviço, permitindo trocas de contexto.',
          correct: true,
          explanation:
            'O processo fica bloqueado até chegar uma notificação ou mensagem.',
        },
        {
          text: 'Devolve um erro se não houver notificações pendentes.',
          correct: false,
          explanation: 'Nesse caso, bloqueia em vez de falhar.',
        },
        {
          text: 'Faz polling ao PIC para obter interrupções de periféricos.',
          correct: false,
          explanation:
            'driver_receive não faz polling; recebe mensagens do kernel.',
        },
        {
          text: 'Bloqueia até receber uma interrupção de software.',
          correct: false,
          explanation:
            'Recebe notificações de interrupções de hardware, não de software.',
        },
      ],
    },
    solution:
      'Bloqueia até receber uma mensagem (por exemplo, uma notificação de interrupção), permitindo ao kernel trocar de contexto enquanto isso.',
    reasoning:
      'O ciclo de eventos dos drivers em Minix usa `driver_receive(ANY, &msg, &status)`: a chamada bloqueia o processo até o kernel entregar uma mensagem, seja uma notificação de IRQ (HARDWARE) ou um pedido de outro processo.',
  },
  {
    id: 'lc-mt2-2025-q15',
    title: 'Polling vs interrupções em chamadas ao kernel',
    source: 'Teste de Recurso, 2024/25',
    topic: 'interrupcoes',
    prompt:
      'Para ler scancodes do teclado, pode escolher-se polling ou interrupções. Qual das duas abordagens espera que faça mais chamadas `sys_inb()` ao kernel?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Fazem sempre o mesmo número de chamadas.',
          correct: false,
          explanation: 'O número de chamadas difere muito.',
        },
        {
          text: 'O número de chamadas é aleatório.',
          correct: false,
          explanation: 'Polling verifica em ciclo, de forma previsível.',
        },
        {
          text: 'Polling.',
          correct: true,
          explanation:
            'Em polling lê-se o registo de estado em ciclo, gastando muitas chamadas.',
        },
        {
          text: 'Interrupções.',
          correct: false,
          explanation: 'Com interrupções só se lê quando há dados.',
        },
      ],
    },
    solution: 'O polling faz muito mais chamadas `sys_inb()`.',
    reasoning:
      'Em polling, o programa lê o registo de estado do KBC repetidamente até o bit OBF indicar dados, gastando uma chamada ao kernel por verificação. Com interrupções, só se acede ao KBC quando há realmente um byte novo, pelo que o número de chamadas é muito menor.',
    explanation: '/cadeiras/lc/falar-com-hardware/#polling-e-timeout',
  },
];

export const mt2Eventos: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q16',
    title: 'Função de uma fila de eventos',
    source: 'Teste 2, 2024/25',
    topic: 'eventos',
    prompt:
      'Num design orientado a eventos, qual é o objetivo de uma fila de eventos (_event queue_)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Registar todos os eventos passados e os handlers correspondentes.',
          correct: false,
          explanation: 'A fila não é um registo histórico.',
        },
        {
          text: 'Mapear tipos de eventos em handlers.',
          correct: false,
          explanation: 'Esse mapeamento é feito por outra estrutura.',
        },
        {
          text: 'Agendar os eventos por ordem first in, first out.',
          correct: false,
          explanation:
            'A fila garante ordem FIFO, mas o objetivo é o buffering.',
        },
        {
          text: 'Fornecer buffering para que o tratamento de um evento possa ocorrer assincronamente em relação à sua ocorrência.',
          correct: true,
          explanation:
            'Os eventos acumulam-se na fila e são tratados depois, em ordem.',
        },
      ],
    },
    solution:
      'Fornecer buffering: os eventos aguardam na fila e o seu tratamento pode ocorrer assincronamente, em ordem FIFO.',
    reasoning:
      'Quando chegam várias interrupções seguidas, o handler não pode tratá-las todas de imediato. A fila de eventos guarda os pedidos por ordem de chegada e o ciclo principal vai despachando cada um para o handler respetivo.',
    explanation: '/cadeiras/lc/projeto/#filas-ordem-e-ritmo',
  },
  {
    id: 'lc-mt2-2025-q17',
    title: 'Vantagem do design orientado a eventos num driver',
    source: 'Teste de Recurso, 2024/25',
    topic: 'eventos',
    prompt:
      'Qual é a principal vantagem de usar um design orientado a eventos na programação de device drivers em Minix?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Reduz a necessidade de interrupções.',
          correct: false,
          explanation: 'As interrupções continuam a ser necessárias.',
        },
        {
          text: 'Permite reagir eficientemente a eventos assíncronos, melhorando o desempenho e o consumo de CPU.',
          correct: true,
          explanation: 'O processo bloqueia em vez de fazer polling contínuo.',
        },
        {
          text: 'Garante que todos os dispositivos são tratados por ordem de chegada.',
          correct: false,
          explanation: 'A ordem não é a vantagem principal.',
        },
        {
          text: 'Permite usar polling de forma mais intensiva.',
          correct: false,
          explanation: 'O objetivo é justement evitar polling intensivo.',
        },
      ],
    },
    solution:
      'Reagir eficientemente a eventos assíncronos, sem polling contínuo, melhorando o desempenho e o consumo de CPU.',
    reasoning:
      'Em vez de verificar dispositivos em ciclo (polling), o driver bloqueia em `driver_receive` e só acorda quando o kernel lhe entrega uma notificação. O CPU fica livre para outros processos entre eventos.',
    explanation: '/cadeiras/lc/projeto/#programação-por-eventos',
  },
];

export const mt2Memoria: ExamQuestion[] = [
  {
    id: 'lc-mt2-2025-q18',
    title: 'Tamanho de uma union em C',
    source: 'Teste de Recurso, 2024/25',
    topic: 'memoria',
    prompt:
      'Considera uma `union` com um campo `char[10]`, um campo `int` e um campo `short`, numa arquitetura de 32 bits. Qual é o tamanho em memória de uma variável deste tipo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '10 bytes.',
          correct: false,
          explanation:
            'O tamanho tem de respecter o alinhamento da arquitetura.',
        },
        {
          text: '12 bytes.',
          correct: true,
          explanation:
            'O maior membro (char[10]) arredonda a 12 por alinhamento a 4 bytes.',
        },
        {
          text: '4 bytes.',
          correct: false,
          explanation: 'Seria o tamanho se só houvesse o int.',
        },
        {
          text: '8 bytes.',
          correct: false,
          explanation: 'Nenhum membro chega a 8 bytes.',
        },
      ],
    },
    solution: '12 bytes.',
    reasoning:
      'Numa union, todos os membros começam no mesmo endereço e o tamanho total é o do maior membro, arredondado ao alinhamento. Em 32 bits, `char[10]` ocupa 10 bytes mas o alinhamento de 4 bytes obriga a arredondar para 12.',
    explanation:
      '/cadeiras/lc/memoria-funcoes/#calcular-o-tamanho-com-alinhamento',
  },
];
