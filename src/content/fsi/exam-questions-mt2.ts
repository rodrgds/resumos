import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  cifrasClassicas:
    '/cadeiras/fsi/criptografia/#cifras-clássicas-e-espaço-de-chaves',
  aleatoriedade:
    '/cadeiras/fsi/criptografia/#aleatoriedade-e-bits-de-segurança',
  rsa: '/cadeiras/fsi/criptografia/#rsa-de-brinquedo',
  gestaoChaves: '/cadeiras/fsi/criptografia/#gestão-de-chaves',
  modos: '/cadeiras/fsi/modos-protocolos/#ecb-cbc-e-ctr',
  autenticada: '/cadeiras/fsi/modos-protocolos/#cifragem-autenticada',
  dh: '/cadeiras/fsi/modos-protocolos/#diffie-hellman-em-números-pequenos',
  tls: '/cadeiras/fsi/seguranca-redes/#tls-ssh-e-ipsec',
  observacao: '/cadeiras/fsi/seguranca-redes/#observação-e-falsificação',
  sql: '/cadeiras/fsi/seguranca-web/#injeção-sql',
  xss: '/cadeiras/fsi/seguranca-web/#xss-e-o-contexto-de-saída',
  palavrasPasse: '/cadeiras/fsi/seguranca-web/#autenticação-e-palavras-passe',
};

export const mt2CriptografiaSimetrica: ExamQuestion[] = [
  {
    id: 'fsi-mt2-2025-q1',
    title: 'One-time pad em bits',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-simetrica',
    prompt:
      'Considere a cifra one-time pad da mensagem $10011100$ com a chave $11110000$. Qual é o texto cifrado associado?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$01101100$',
          correct: true,
          explanation:
            'O one-time pad faz XOR bit a bit: $10011100 \oplus 11110000 = 01101100$.',
        },
        {
          text: '$11111100$',
          correct: false,
          explanation: 'Esse valor resulta de somar em vez de fazer XOR.',
        },
        {
          text: '$10010000$',
          correct: false,
          explanation: 'Esse valor resulta de aplicar AND aos bits.',
        },
        {
          text: '$10010011$',
          correct: false,
          explanation:
            'Esse valor não corresponde a nenhuma operação bit a bit entre a mensagem e a chave.',
        },
      ],
    },
    solution: 'O texto cifrado é $01101100$.',
    reasoning:
      'No one-time pad, cada bit do texto cifrado é o XOR do bit da mensagem com o bit da chave: $1\oplus1=0$, $0\oplus1=1$, $0\oplus1=1$, $1\oplus1=0$, $1\oplus0=1$, $1\oplus0=1$, $0\oplus0=0$, $0\oplus0=0$, obtendo $01101100$.',
    explanation: link.cifrasClassicas,
  },
  {
    id: 'fsi-mt2-2025-q2',
    title: 'Cifra de substituição monoalfabética',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-simetrica',
    prompt:
      'Porque é que as cifras de substituição monoalfabética não garantem confidencialidade segundo os padrões criptográficos modernos?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Porque a cifra substitui letras por outras, permitindo ler parte da mensagem original',
          correct: false,
          explanation:
            'A substituição em si não torna a mensagem legível sem a chave.',
        },
        {
          text: 'Porque o espaço de chaves é demasiado pequeno e um computador moderno testa a chave por força bruta',
          correct: false,
          explanation:
            'O problema não é o tamanho do espaço de chaves, mas a preservação de padrões estatísticos.',
        },
        {
          text: 'Porque um adversário pode adulterar a mensagem subjacente alterando o texto cifrado',
          correct: false,
          explanation:
            'Isso descreve um problema de integridade, não de confidencialidade.',
        },
        {
          text: 'Porque os textos cifrados resultantes revelam padrões das mensagens cifradas',
          correct: true,
          explanation:
            'A substituição preserva frequências de letras, permitindo análise de frequências.',
        },
      ],
    },
    solution:
      'Porque os textos cifrados revelam padrões (por exemplo, frequências de letras) das mensagens originais.',
    reasoning:
      'Numa cifra de substituição monoalfabética, cada letra é sempre substituída pela mesma letra do alfabeto, pelo que as frequências relativas se mantêm. Um atacante pode explorar esses padrões com análise de frequências para recuperar a mensagem.',
    explanation: link.cifrasClassicas,
  },
  {
    id: 'fsi-mt2-2025-q3',
    title: 'Colisão de uma função de hash',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-simetrica',
    prompt: 'Considere uma função de hash $H$. O que é uma colisão de $H$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Se $m_1 \\neq m_2$ e $H(m_1)$ produz uma saída com um prefixo semelhante ao de $H(m_2)$',
          correct: false,
          explanation: 'Semelhança de prefixos não é o conceito de colisão.',
        },
        {
          text: 'Se $m_1 \\neq m_2$ e $H(m_1)$ produz a mesma saída que $H(m_2)$',
          correct: true,
          explanation: 'É a definição exata de colisão.',
        },
        {
          text: 'Acontece quando duas funções de hash percorrem direções opostas',
          correct: false,
          explanation: 'Não tem significado criptográfico.',
        },
        {
          text: 'Se $m_1 = m_2$ e $H(m_1)$ produz a mesma saída que $H(m_2)$',
          correct: false,
          explanation: 'Entradas iguais não são uma colisão.',
        },
      ],
    },
    solution:
      'Uma colisão ocorre quando $m_1 \\neq m_2$ mas $H(m_1) = H(m_2)$.',
    reasoning:
      'Uma função de hash não é injetiva em geral: o espaço de entradas é maior que o de saídas. Uma colisão é precisamente um par de mensagens distintas com o mesmo valor de hash, e a resistência a colisões exige que seja computacionalmente inviável encontrar esse par.',
  },
  {
    id: 'fsi-mt2-2025-q4',
    title: 'Garantias da cifragem autenticada simétrica',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-simetrica',
    prompt:
      'Qual das seguintes garantias NÃO é assegurada por uma cifragem autenticada simétrica?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não repúdio',
          correct: true,
          explanation:
            'Como a chave é partilhada, qualquer das partes pode ter produzido o MAC, logo não há não repúdio.',
        },
        {
          text: 'Integridade',
          correct: false,
          explanation: 'É precisamente o que o MAC acrescenta à cifra.',
        },
        {
          text: 'Correção',
          correct: false,
          explanation:
            'A decifra devolve a mensagem original quando a verificação passa.',
        },
        {
          text: 'Confidencialidade',
          correct: false,
          explanation: 'É a garantia base da cifra simétrica.',
        },
      ],
    },
    solution: 'O não repúdio não é assegurado.',
    reasoning:
      'A cifragem autenticada simétrica garante confidencialidade (cifra) e integridade/autenticidade de origem (MAC com chave partilhada). Como a mesma chave secreta é conhecida pelas duas partes, nenhuma delas pode negar ter gerado a etiqueta, pelo que o não repúdio exige criptografia de chave pública com assinatura digital.',
    explanation: link.autenticada,
  },
];

export const mt2CriptografiaAssimetrica: ExamQuestion[] = [
  {
    id: 'fsi-mt2-2025-q5',
    title: 'RSA simples é determinístico',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-assimetrica',
    prompt:
      'Considere a cifra RSA simples: chave pública $(e, n)$ e chave privada $(d, n)$, com $c = m^e \bmod n$ e $m = c^d \bmod n$. Qual das seguintes afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Este esquema não garante confidencialidade porque é determinístico',
          correct: true,
          explanation:
            'Sem aleatoriedade, cifrar duas vezes a mesma mensagem dá o mesmo texto cifrado.',
        },
        {
          text: 'Este esquema não garante confidencialidade porque, dada um texto cifrado, um adversário recupera a mensagem',
          correct: false,
          explanation:
            'Recuperar $m$ a partir de $c$ sem $d$ equivale a resolver o problema RSA.',
        },
        {
          text: 'Este esquema é seguro contra computadores quânticos',
          correct: false,
          explanation:
            'O algoritmo de Shor quebra o RSA com um computador quântico.',
        },
        {
          text: 'Este esquema é seguro se a fatorização de inteiros for um problema computacionalmente difícil',
          correct: false,
          explanation:
            'Essa é a condição de segurança do RSA, mas não resolve por si a falta de confidencialidade da cifra determinística.',
        },
      ],
    },
    solution:
      'O RSA simples não garante confidencialidade porque é determinístico.',
    reasoning:
      'Como $c = m^e \bmod n$ não usa qualquer valor aleatório, cifrar a mesma mensagem duas vezes produz o mesmo texto cifrado, o que permite detetar repetições e facilita ataques. Na prática usa-se RSA-OAEP, com preenchimento aleatório (padding), que torna a cifra probabilística.',
    explanation: link.rsa,
  },
  {
    id: 'fsi-mt2-2025-q6',
    title: 'Assinaturas digitais versus MAC',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-assimetrica',
    prompt:
      'Que garantia de segurança é assegurada por assinaturas digitais, mas não por códigos de autenticação de mensagem (MAC)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Unicidade',
          correct: false,
          explanation: 'Não é o conceito em causa.',
        },
        {
          text: 'Não repúdio',
          correct: true,
          explanation:
            'Só o titular da chave privada pode assinar, logo não pode negar a autoria.',
        },
        {
          text: 'Anonimato',
          correct: false,
          explanation: 'As assinaturas não dão anonimato.',
        },
        {
          text: 'Integridade',
          correct: false,
          explanation: ' Tanto a assinatura como o MAC garantem integridade.',
        },
      ],
    },
    solution: 'O não repúdio.',
    reasoning:
      'Um MAC usa uma chave simétrica partilhada, pelo que qualquer conhecedor da chave pode produzi-lo: não permite atribuir a autoria a uma entidade concreta. Uma assinatura digital usa a chave privada do signatário, pelo que só esse signatário a pode ter gerado, garantindo não repúdio.',
    explanation: link.gestaoChaves,
  },
  {
    id: 'fsi-mt2-2025-q7',
    title: 'Cifrar e assinar uma mensagem',
    source: 'Teste 2, 2024/25',
    topic: 'criptografia-assimetrica',
    prompt:
      'A Alice tem o par de chaves $(pk_A, sk_A)$ e o Bob tem $(pk_B, sk_B)$. Ambos conhecem as duas chaves públicas. A Alice quer enviar a mensagem $m$ ao Bob. Como deve cifrar e assinar a mensagem?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Cifrar com $sk_B$; assinar com $pk_A$',
          correct: false,
          explanation:
            'Usa as chaves no papel errado: cifra com a privada e assina com a pública.',
        },
        {
          text: 'Cifrar com $pk_B$; assinar com $sk_A$',
          correct: true,
          explanation:
            'Só o Bob pode decifrar (chave privada $sk_B$) e só a Alice pode ter assinado ($sk_A$).',
        },
        {
          text: 'Cifrar com $sk_A$; assinar com $pk_B$',
          correct: false,
          explanation: 'Usa as chaves no papel errado.',
        },
        {
          text: 'Cifrar com $pk_A$; assinar com $sk_B$',
          correct: false,
          explanation:
            'A cifra ficaria apenas decifrável pela Alice e a assinatura seria do Bob.',
        },
      ],
    },
    solution: 'Cifra-se com $pk_B$ e assina-se com $sk_A$.',
    reasoning:
      'Para confidencialidade, cifra-se com a chave pública do destinatário ($pk_B$), de modo a que só o Bob, com $sk_B$, decifre. Para autenticidade e não repúdio, assina-se com a própria chave privada ($sk_A$), que só a Alice possui.',
  },
  {
    id: 'fsi-mt2-2024-q1',
    title: 'Decifra do paradigma híbrido',
    source: 'Teste 2, 2023/24',
    topic: 'criptografia-assimetrica',
    prompt:
      'No paradigma híbrido, a mensagem $m$ é primeiro cifrada com uma chave simétrica nova: $c_1 \\leftarrow \\mathrm{Enc}(k, m)$. Esse texto cifrado é enviado, bem como a cifra dessa chave com a chave pública do destinatário: $c_2 \\leftarrow \\mathrm{Enc}(pk, k)$. Como se faz a decifra de tal mensagem?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$k \\leftarrow \\mathrm{Dec}(pk, c_2)$; $m \\leftarrow \\mathrm{Dec}(k, c_1)$',
          correct: false,
          explanation:
            'A decifra de $c_2$ exige a chave privada, não a pública.',
        },
        {
          text: '$k \\leftarrow \\mathrm{Dec}(sk, c_2)$; $m \\leftarrow \\mathrm{Dec}(k, c_1)$',
          correct: true,
          explanation:
            'O destinatário usa a sua chave privada para recuperar $k$ e depois decifra o corpo da mensagem.',
        },
        {
          text: '$m \\leftarrow \\mathrm{Dec}(sk, c_1, c_2)$',
          correct: false,
          explanation: 'Não existe uma decifra conjunta assim.',
        },
        {
          text: '$k \\leftarrow \\mathrm{Dec}(sk, c_1)$; $m \\leftarrow \\mathrm{Dec}(c_1, c_2)$',
          correct: false,
          explanation: 'Troca os papéis de $c_1$ e $c_2$.',
        },
      ],
    },
    solution:
      '$k \\leftarrow \\mathrm{Dec}(sk, c_2)$ e depois $m \\leftarrow \\mathrm{Dec}(k, c_1)$.',
    reasoning:
      'A chave de sessão $k$ foi cifrada com a chave pública do destinatário, logo só a chave privada correspondente ($sk$) a recupera. Com $k$ recuperada, decifra-se o corpo $c_1$ com a cifra simétrica. Assim, a morosidade da cifra assimétrica aplica-se apenas a uma chave curta.',
    explanation: link.gestaoChaves,
  },
];

export const mt2ModosProtocolos: ExamQuestion[] = [
  {
    id: 'fsi-mt2-2025-q8',
    title: 'Alterar bits no modo CTR',
    source: 'Teste 2, 2024/25',
    topic: 'modos-protocolos',
    prompt:
      'Considere a cifra AES em modo CTR, com blocos de 16 bits. Se alterarmos 3 bits do segundo bloco do texto cifrado, quantos bits da mensagem original são afetados na decifra?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '19 bits',
          correct: false,
          explanation: 'Esse valor não corresponde a nenhum efeito do CTR.',
        },
        {
          text: '0 bits',
          correct: false,
          explanation: 'Os bits alterados propagam-se para a mensagem.',
        },
        {
          text: '16 bits',
          correct: false,
          explanation:
            'No CTR não há encadeamento de blocos, logo não se perde o bloco inteiro.',
        },
        {
          text: '3 bits',
          correct: true,
          explanation:
            'No modo CTR cada bloco de texto cifrado é XOR com o keystream; alterar 3 bits do bloco afeta exatamente esses 3 bits da mensagem.',
        },
      ],
    },
    solution: '3 bits da mensagem original ficam afetados.',
    reasoning:
      'No modo CTR, $c_i = p_i \oplus E(k, N \| i)$, pelo que a decifra é $p_i = c_i \oplus E(k, N \| i)$. Alterar 3 bits de $c_1$ altera apenas os mesmos 3 bits de $p_1$; não há propagação de erro como no CBC.',
    explanation: link.modos,
  },
  {
    id: 'fsi-mt2-2025-q9',
    title: 'EtM, MtE ou EtM na cifragem autenticada',
    source: 'Teste 2, 2024/25',
    topic: 'modos-protocolos',
    prompt:
      'Considere um par de chaves $(k_1, k_2)$, uma cifra $E$ e um MAC $M$. O esquema de cifragem autenticada funciona assim: $t = M(k_1, m)$; $c = E(k_2, m \| t)$; devolve-se $c$. Que tipo de cifragem autenticada é esta?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'MAC-and-Encrypt',
          correct: false,
          explanation:
            'Nesse modo o MAC de $m$ é enviado ao lado do texto cifrado de $m$, não dentro dele.',
        },
        {
          text: 'MAC-then-Encrypt',
          correct: true,
          explanation:
            'Calcula-se primeiro o MAC sobre $m$ e depois cifra-se $m \| t$.',
        },
        {
          text: 'Encrypt-and-MAC',
          correct: false,
          explanation:
            'Nesse modo cifra-se $m$ e calcula-se o MAC em paralelo.',
        },
        {
          text: 'Encrypt-then-MAC',
          correct: false,
          explanation:
            'Nesse modo cifra-se primeiro e calcula-se o MAC sobre o texto cifrado.',
        },
      ],
    },
    solution: 'É MAC-then-Encrypt (MtE).',
    reasoning:
      'A etiqueta $t$ é calculada sobre a mensagem em claro $m$ e só depois o conjunto $m \| t$ é cifrado com a chave $k_2$. Essa ordem, MAC sobre o texto em claro seguido de cifra, caracteriza o modo MAC-then-Encrypt.',
    explanation: link.autenticada,
  },
  {
    id: 'fsi-mt2-2024-q2',
    title: 'Troca de chaves Diffie-Hellman',
    source: 'Teste 2, 2023/24',
    topic: 'modos-protocolos',
    prompt:
      'Considere a troca de chaves Diffie-Hellman: a Alice e o Bob geram $x$ e $y$, respetivamente, e enviam $X = g^x$ e $Y = g^y$ pela rede. Como podem usar isto para trocar um segredo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$g^x$ e $g^y$ são o mesmo valor e podem ser usados como segredo',
          correct: false,
          explanation: 'Em geral $g^x \\neq g^y$.',
        },
        {
          text: 'A Alice calcula $Y^x$ e o Bob calcula $X^y$, sendo ambos iguais a $g^{xy}$',
          correct: true,
          explanation: '$(g^y)^x = g^{xy} = (g^x)^y$.',
        },
        {
          text: 'A Alice calcula $g^{xy}$ e envia-o ao Bob',
          correct: false,
          explanation:
            'A Alice não conhece $y$, logo não pode calcular $g^{xy}$ diretamente.',
        },
        {
          text: 'O segredo é $g$ dividido por $x y$',
          correct: false,
          explanation: 'Não existe essa operação no protocolo.',
        },
      ],
    },
    solution:
      'A Alice calcula $Y^x = g^{xy}$ e o Bob calcula $X^y = g^{xy}$; esse valor comum é o segredo partilhado.',
    reasoning:
      'Cada parte eleva o valor recebido à sua chave privada: $Y^x = (g^y)^x = g^{xy}$ e $X^y = (g^x)^y = g^{xy}$. Um atacante que só vê $g$, $g^x$ e $g^y$ enfrenta o problema do logaritmo discreto para obter $g^{xy}$.',
    explanation: link.dh,
  },
];

export const mt2TlsRedes: ExamQuestion[] = [
  {
    id: 'fsi-mt2-2025-q10',
    title: 'Função do handshake TLS',
    source: 'Teste 2, 2024/25',
    topic: 'tls-redes',
    prompt: 'Qual é o papel do protocolo de handshake no TLS?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Divulgar a identidade dos participantes no canal',
          correct: false,
          explanation: 'A identidade não é o objetivo central do handshake.',
        },
        {
          text: 'Notificar regularmente a vitalidade do canal',
          correct: false,
          explanation: 'Isso não é função do handshake.',
        },
        {
          text: 'Estabelecer o material criptográfico e os parâmetros da comunicação',
          correct: true,
          explanation: 'É o que o handshake negoceia antes da troca de dados.',
        },
        {
          text: 'Cifrar e decifrar as mensagens trocadas no canal',
          correct: false,
          explanation:
            'Isso é papel do protocolo de registo, não do handshake.',
        },
      ],
    },
    solution:
      'Estabelecer o material criptográfico e os parâmetros para a comunicação.',
    reasoning:
      'Durante o handshake, cliente e servidor autenticam-se (tipicamente o servidor via certificado), concordam cifras e parâmetros e derivam as chaves de sessão que o protocolo de registo usa depois para cifrar e autenticar os dados.',
    explanation: link.tls,
  },
  {
    id: 'fsi-mt2-2025-q11',
    title: 'TLS, PKI e cifras assimétrica e simétrica',
    source: 'Teste 2, 2024/25',
    topic: 'tls-redes',
    prompt:
      'Qual é a relação entre TLS, PKI e a criptografia de chave pública e simétrica?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A Alice e o Bob usam canais TLS para trocar chaves simétricas, que depois cifram as chaves públicas',
          correct: false,
          explanation:
            'As chaves públicas não são cifradas com chaves de sessão.',
        },
        {
          text: 'As PKI usam canais TLS para comunicar certificados, que transportam chaves simétricas',
          correct: false,
          explanation:
            'Os certificados transportam chaves públicas, não simétricas.',
        },
        {
          text: 'As assinaturas digitais autenticam chaves simétricas, que depois autenticam os utilizadores no protocolo TLS',
          correct: false,
          explanation: 'Confunde o papel das assinaturas no handshake.',
        },
        {
          text: 'O TLS usa certificados de uma PKI para validar chaves públicas, que são depois usadas para estabelecer uma chave simétrica e criar um canal seguro',
          correct: true,
          explanation:
            'Descreve corretamente a cadeia de confiança e a derivação da chave de sessão.',
        },
      ],
    },
    solution:
      'O TLS valida as chaves públicas através de certificados da PKI e usa-as para estabelecer uma chave simétrica de sessão.',
    reasoning:
      'Numa sessão HTTPS habitual, o servidor apresenta um certificado X.509 emitido por uma autoridade de certificação; o cliente valida a assinatura desse certificado (confiando na raiz da PKI) e usa a chave pública autenticada do servidor para estabelecer, por exemplo via (EC)DHE, uma chave simétrica de sessão.',
    explanation: link.tls,
  },
  {
    id: 'fsi-mt2-2025-q12',
    title: 'IPsec e falsificação de IP',
    source: 'Teste 2, 2024/25',
    topic: 'tls-redes',
    prompt:
      'Porque é que o IPsec é resiliente à falsificação de endereços IP (IP spoofing), ao contrário do TLS?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Porque o IPsec usa mecanismos de cifra mais fortes que o TLS',
          correct: false,
          explanation: 'A força da cifra não é o que impede o spoofing.',
        },
        {
          text: 'Porque o IPsec existe na camada de rede e pode validar o conteúdo dos cabeçalhos IP',
          correct: true,
          explanation:
            'O AH/ESP autenticam o cabeçalho IP, detetando endereços forjados.',
        },
        {
          text: 'Porque o IPsec é usado em firewalls, que validam origem e destino dos pacotes',
          correct: false,
          explanation: 'Isso descreve a filtragem da firewall, não o IPsec.',
        },
        {
          text: 'Devido ao protocolo de acordo de algoritmos usado no IPsec',
          correct: false,
          explanation: 'O acordo de algoritmos não impede o spoofing.',
        },
      ],
    },
    solution:
      'Porque o IPsec opera na camada de rede e autentica o conteúdo dos cabeçalhos IP.',
    reasoning:
      'Com o Authentication Header (AH), o IPsec calcula um MAC sobre o cabeçalho IP (incluindo os endereços de origem e destino), pelo que pacotes com endereços forjados falham a verificação. O TLS opera acima da camada de rede e não protege o cabeçalho IP.',
    explanation: link.tls,
  },
  {
    id: 'fsi-mt2-2022-q1',
    title: 'Ataque de Rogue DHCP',
    source: 'Exame final, 2021/22',
    topic: 'tls-redes',
    prompt:
      'Descreva um ataque de Rogue DHCP e explique porque pode ser útil no contexto do lançamento de ataques man-in-the-middle.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta descreve um servidor DHCP falso que responde antes do servidor legítimo.',
        'A resposta indica que o atacante distribui endereços IP e o endereço do gateway/DNS próprio.',
        'A justificação liga o controlo do gateway/DNS ao redirecionamento do tráfego da vítima (MITM).',
      ],
    },
    solution:
      'Um Rogue DHCP é um servidor DHCP falso na rede local que responde aos pedidos dos clientes antes do servidor legítimo, distribuindo como gateway ou servidor DNS uma máquina do atacante. Assim, o tráfego da vítima passa pela máquina do atacante, que pode intercetá-lo ou modificá-lo (man-in-the-middle).',
    reasoning:
      'O DHCP não autentica as respostas: o cliente aceita o primeiro servidor que responder. Se o atacante colocar um servidor falso na rede, consegue indicar-se a si próprio como gateway padrão ou como DNS, fazendo passar por si todo o tráfego da vítima, que pode então ler ou alterar antes de reencaminhar.',
    explanation: link.observacao,
  },
];

export const mt2SegurancaWeb: ExamQuestion[] = [
  {
    id: 'fsi-mt2-2022-q2',
    title: 'Vulnerabilidade de injeção SQL',
    source: 'Exame final, 2021/22',
    topic: 'seguranca-web',
    prompt:
      'Considere o código seguinte, que prepara uma consulta SQL. Identifique a vulnerabilidade que contém.\n\n```\nuName = getRequestString("username");\nuPass = getRequestString("userpassword");\n\nsql = \'SELECT * FROM Users WHERE Name ="\' +\n      uName + \'" AND Pass ="\' + uPass + \'"\';\n```',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta identifica injeção SQL (SQL injection).',
        'A justificação explica que os parâmetros do utilizador são concatenados diretamente na consulta.',
        'A resposta indica um exemplo de entrada maliciosa que altera a condição (por exemplo, `" OR "1"="1`).',
      ],
    },
    solution:
      'O código é vulnerável a injeção SQL: os valores de `username` e `userpassword` são concatenados diretamente no texto da consulta, sem qualquer escapagem ou consulta parametrizada.',
    reasoning:
      'Se o utilizador introduzir `" OR "1"="1` no campo do nome, a consulta torna-se `SELECT * FROM Users WHERE Name ="" OR "1"="1" AND Pass ="..."`, que é verdadeira para todas as linhas, permitindo autenticação sem palavra-passe. A correção passa por consultas parametrizadas (prepared statements), que tratam os dados como dados e nunca como código SQL.',
    explanation: link.sql,
  },
  {
    id: 'fsi-mt2-2022-q3',
    title: 'XSS refletido versus XSS armazenado',
    source: 'Exame final, 2021/22',
    topic: 'seguranca-web',
    prompt:
      'Qual é a diferença entre um ataque reflected XSS e um ataque stored XSS?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que no XSS refletido o script malicioso vem no próprio pedido (por exemplo, num parâmetro do URL).',
        'A resposta indica que o servidor reflete esse script na resposta sem o sanitizar.',
        'A resposta explica que no XSS armazenado o script fica guardado no servidor (por exemplo, numa base de dados) e é servido a todos os visitantes.',
      ],
    },
    solution:
      'No XSS refletido, o script malicioso é injetado num pedido da vítima (por exemplo, num parâmetro do URL) e o servidor devolve-o na resposta, sem o validar. No XSS armazenado, o script é guardado permanentemente no servidor (por exemplo, num comentário ou perfil) e é servido a todas as vítimas que acedem à página afetada.',
    reasoning:
      'Em ambos os casos o navegador da vítima executa código JavaScript do atacante no contexto da origem legítima. A diferença está na persistência: o refletido exige enganar a vítima para seguir um link especial, enquanto o armazenado persiste no servidor e atinge automaticamente todos os visitantes, sendo potencialmente muito mais grave. A defesa comum é a sanitização/validação de todas as entradas e a codificação das saídas consoante o contexto.',
    explanation: link.xss,
  },
  {
    id: 'fsi-mt2-2022-q4',
    title: 'Armazenamento de palavras-passe com salt',
    source: 'Exame final, 2021/22',
    topic: 'seguranca-web',
    prompt:
      'Considere três servidores que guardam credenciais de utilizadores: o servidor A guarda $(username, password)$ em claro; o servidor B guarda $(username, H(password))$; e o servidor C guarda $(username, salt, H(salt, password))$, em que o salt é gerado independentemente para cada utilizador. Explique porque é que as garantias de segurança, em caso de fuga da base de dados (data breach), são superiores no servidor C.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta compara os três esquemas: texto em claro, hash sem salt e hash com salt.',
        'A justificação menciona ataques de dicionário e tabelas rainbow contra hashes sem salt.',
        'A resposta explica que o salt único por utilizador impede o uso de tabelas pré-computadas e obriga a atacar cada hash individualmente.',
      ],
    },
    solution:
      'No servidor A, uma fuga expõe diretamente as palavras-passe. No servidor B, os hashes sem salt podem ser atacados com tabelas rainbow ou dicionários pré-computados, e utilizadores com a mesma palavra-passe têm o mesmo hash. No servidor C, o salt aleatório e único por utilizador inviabiliza as tabelas pré-computadas e obriga a um ataque de força bruta individual por conta, aumentando muito o custo do ataque.',
    reasoning:
      'O salt não torna o hash mais forte por si só, mas elimina os atalhos coletivos: sem salt, um atacante calcula $H(p)$ para milhões de palavras-passe uma única vez e compara com todos os hashes da base de dados. Com salt único por utilizador, cada hash exige um ataque separado, pelo que a fuga de credenciais fica contida.',
    explanation: link.palavrasPasse,
  },
];
