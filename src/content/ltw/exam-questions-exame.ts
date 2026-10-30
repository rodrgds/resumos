import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  seletores: '/cadeiras/ltw/css-estilo-layout/#seletores',
  cascata: '/cadeiras/ltw/css-estilo-layout/#cascata-e-herança',
  this: '/cadeiras/ltw/javascript-dom-eventos/#objetos-this-e-protótipos',
  registar:
    '/cadeiras/ltw/javascript-dom-eventos/#guardar-a-função-que-foi-registada',
  json: '/cadeiras/ltw/http-ajax-json/#json-e-fetch',
  mensagens: '/cadeiras/ltw/http-ajax-json/#ler-mensagens',
  cookies: '/cadeiras/ltw/http-ajax-json/#estados-cookies-e-cache',
  xss: '/cadeiras/ltw/seguranca-web/#xss-e-contexto-de-saída',
  csrf: '/cadeiras/ltw/seguranca-web/#csrf',
  passwords: '/cadeiras/ltw/seguranca-web/#palavras-passe-e-sessão',
  auth: '/cadeiras/ltw/seguranca-web/#autenticação-e-autorização',
  https: '/cadeiras/ltw/seguranca-web/#https-e-revisão-de-uma-ação',
  guloso:
    '/cadeiras/ltw/expressoes-regulares/#guloso-preguiçoso-e-primeiro-resultado',
  xpath: '/cadeiras/ltw/xml-xpath/#caminhos-xpath',
  validade: '/cadeiras/ltw/xml-xpath/#boa-formação-e-validade',
};

export const htmlCss: ExamQuestion[] = [
  {
    id: 'ltw-exame-2017-q1',
    title: 'Significado do seletor `header h1, h2`',
    source: 'Exame, 2016/17',
    topic: 'html-css',
    prompt:
      'Que elementos seleciona o seguinte seletor CSS?\n\n```css\nheader h1, h2 { ... }\n```',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Elementos h1 e h2 dentro de um header.',
          correct: false,
          explanation:
            'A vírgula separa dois seletores independentes; o segundo, `h2`, não está limitado ao header.',
        },
        {
          text: 'Elementos h1 dentro de um header e qualquer elemento h2.',
          correct: true,
          explanation:
            '`header h1` seleciona h1 descendentes de header e `h2` seleciona todos os h2 do documento.',
        },
        {
          text: 'Elementos h1, h2 e header.',
          correct: false,
          explanation: 'O seletor não inclui o próprio header.',
        },
        {
          text: 'Nunca seleciona nenhum elemento.',
          correct: false,
          explanation:
            'Ambos os seletores são válidos e podem corresponder a elementos.',
        },
      ],
    },
    solution:
      'Seleciona os elementos `h1` dentro de um `header` e todos os elementos `h2` do documento.',
    reasoning:
      'A vírgula funciona como um "ou": a regra aplica-se à união dos conjuntos definidos por `header h1` e por `h2`.',
    explanation: link.seletores,
  },
  {
    id: 'ltw-exame-2016-q1',
    title: 'Especificidade e cor de um conjunto de regras CSS',
    source: 'Exame, 2015/16',
    topic: 'html-css',
    prompt: `Considere o seguinte código HTML:

\`\`\`html
<div class="post" id="first">
  <div class="header">
    <h1>Title</h1>
  </div>
  <p>First paragraph</p>
  <p>Second paragraph</p>
  <div class="footer">
    <p>This is a footer</p>
  </div>
</div>
\`\`\`

E o seguinte código CSS:

\`\`\`css
#first div { color: blue; }                /* R1 */
div .header { color: magenta; }            /* R2 */
p + p + div:first-child { color: red; }    /* R3 */
h1 { color: green; }                       /* R4 */
div + p { color: cyan; }                   /* R5 */
p { color: yellow; }                       /* R6 */
\`\`\`

(a) Indique a especificidade de cada regra, no formato (estilo inline, id, classe, tipo), por exemplo 0,2,2,1.

(b) Considerando apenas as regras de R1 a R3, indique a cor de cada um dos textos: Title, First paragraph, Second paragraph e This is a footer.

(c) Considerando todas as regras, indique a cor de cada um desses textos.`,
    answer: {
      kind: 'self',
      checklist: [
        'As spécificités são R1 0,1,0,1; R2 0,0,1,1; R3 0,0,1,3; R4 0,0,0,1; R5 0,0,0,2; R6 0,0,0,1.',
        'Com apenas R1 a R3: Title e o texto do rodapé ficam azuis; os dois parágrafos ficam com a cor predefinida (preto).',
        'Com todas as regras: Title verde, primeiro parágrafo ciano, segundo parágrafo amarelo e rodapé amarelo.',
      ],
    },
    solution: `(a) R1: 0,1,0,1; R2: 0,0,1,1; R3: 0,0,1,3; R4: 0,0,0,1; R5: 0,0,0,2; R6: 0,0,0,1.

(b) R1 aplica-se às duas divs internas e vence R2 (mais específica), pelo que Title e o rodapé herdam azul. Nenhum seletor de R1 a R3 corresponde aos parágrafos, logo ficam pretos.

(c) Title fica verde por R4 (regra direta sobre o h1 vence a herança). O primeiro parágrafo fica ciano porque R5 (0,0,0,2) vence R6 (0,0,0,1). O segundo parágrafo e o texto do rodapé ficam amarelos por R6.`,
    reasoning:
      'A specificity de R3 conta a pseudoclasse :first-child como classe e os três tipos p, p, div. A cor é herdada, mas uma regra que corresponda diretamente ao elemento vence sempre a herança; entre regras diretas vence a de maior specificity e, em caso de empate, a última.',
    explanation: link.cascata,
  },
  {
    id: 'ltw-exame-2017r-q1',
    title: 'Seletor do título do primeiro artigo com classe featured',
    source: 'Exame de recurso, 2016/17',
    topic: 'html-css',
    prompt:
      'Que seletor CSS se deve usar para selecionar o título (h2) do primeiro artigo com a classe `featured`?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`article.featured :first-child h2 { ... }`',
          correct: false,
          explanation:
            'A pseudoclasse aplicava-se a um elemento dentro do article, não ao próprio article.',
        },
        {
          text: '`article.featured h2:first-child { ... }`',
          correct: false,
          explanation:
            'Seleciona o h2 apenas se este for o primeiro filho dentro do article featured.',
        },
        {
          text: '`article:first-child .featured h2 { ... }`',
          correct: false,
          explanation:
            'Seleciona h2 dentro de um elemento .featured que esteja dentro do primeiro article.',
        },
        {
          text: '`article.featured:first-child h2 { ... }`',
          correct: true,
          explanation:
            'Seleciona o h2 dentro de um article com a classe featured que seja o primeiro filho do seu pai, ou seja, o título do primeiro artigo featured.',
        },
      ],
    },
    solution: '`article.featured:first-child h2 { ... }`.',
    reasoning:
      'A pseudoclasse `:first-child` tem de ficar junto do elemento a que se refere (o article com a classe featured), e o h2 é um descendente desse article.',
    explanation: link.seletores,
  },
];

export const javascriptDom: ExamQuestion[] = [
  {
    id: 'ltw-exame-2016-q2',
    title: 'Comportamento de `$("a").click(say("Hello"))`',
    source: 'Exame, 2015/16',
    topic: 'javascript-dom',
    prompt: `Assuma que o seguinte código jQuery se encontra definido dentro do evento ready de um documento HTML. Indique qual o comportamento esperado:

\`\`\`js
$('a').click(say('Hello'));

function say(message) {
  alert(message);
}
\`\`\``,
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'É mostrado um alerta com a mensagem Hello assim que a página carrega.',
          correct: true,
          explanation:
            '`say("Hello")` é invocada imediatamente durante o registo do handler; o valor retornado (undefined) é o que fica associado ao click.',
        },
        {
          text: 'É mostrado um alerta com a mensagem Hello quando se carrega num link.',
          correct: false,
          explanation:
            'Para isso era preciso passar a função sem a invocar: `$("a").click(say)` ou usar uma função anónima.',
        },
        {
          text: 'Não acontece nada.',
          correct: false,
          explanation:
            'A função say chega a ser executada, embora na altura errada.',
        },
        {
          text: 'A página não carrega.',
          correct: false,
          explanation:
            'O código não lança erros; apenas produz o alerta demasiado cedo.',
        },
      ],
    },
    solution:
      'É mostrado um alerta com a mensagem Hello assim que a página carrega.',
    reasoning:
      'Os argumentos de `.click()` são avaliados antes da chamada, pelo que a função say corre logo durante o registo do handler. Para adiar a execução, passa-se a referência da função sem a invocar.',
    explanation: link.registar,
  },
  {
    id: 'ltw-exame-2017-q2',
    title: 'A palavra-chave `this` em JavaScript',
    source: 'Exame, 2016/17',
    topic: 'javascript-dom',
    prompt: 'Em JavaScript, a palavra-chave `this` refere-se sempre...',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Ao objeto atual.',
          correct: false,
          explanation:
            'Nem sempre: em funções normais, `this` depende de como a função é chamada.',
        },
        {
          text: 'A um objeto que representa o documento.',
          correct: false,
          explanation: 'Isso acontece apenas em handlers de eventos do DOM.',
        },
        {
          text: 'A um objeto que representa o browser.',
          correct: false,
          explanation: '`window` representa o browser, não `this`.',
        },
        {
          text: 'Ao contexto de execução.',
          correct: true,
          explanation:
            '`this` é determinado pelo contexto em que o código corre (global, função, método, evento).',
        },
      ],
    },
    solution: 'Ao contexto de execução.',
    reasoning:
      'O valor de `this` não é fixo: numa função simples é o objeto global (ou undefined em modo estrito), num método é o objeto recetor, num handler de evento é o elemento.',
    explanation: link.this,
  },
  {
    id: 'ltw-exame-2017-q3',
    title: 'Incrementar quantidades e enviar o total por Ajax',
    source: 'Exame, 2016/17',
    topic: 'javascript-dom',
    prompt: `Considere o seguinte excerto HTML (podem existir outros elementos ul, li e a no documento):

\`\`\`html
<div id="products">
  <ul>
    <li>Apple: <span class="qty">3</span> <a href="#">+</a></li>
    <li>Banana: <span class="qty">5</span> <a href="#">+</a></li>
    <li>Pear: <span class="qty">6</span> <a href="#">+</a></li>
  </ul>
  <a href="#" class="buy">Buy</a>
  <p class="total">0</p>
</div>
\`\`\`

Escreva o código jQuery necessário para que:

(a) Quando o link no final de cada linha seja clicado, a quantidade nessa linha seja incrementada uma unidade.

(b) Quando o link com a classe buy seja clicado, seja enviado, num pedido Ajax do tipo POST para o endereço calculatetotal.php, um array products com a lista de produtos e as suas quantidades, por exemplo [{"name":"Apple","qty":3},{"name":"Banana","qty":5},{"name":"Pear","qty":6}]. Quando o resultado for recebido, o texto do parágrafo total deve ser substituído pelo valor retornado, ou por "not enough stock" caso esse valor seja menor do que 0.`,
    answer: {
      kind: 'self',
      checklist: [
        'O handler do link "+" seleciona o span.qty da mesma linha (por exemplo com .closest("li").find(".qty")) e incrementa o valor.',
        'O handler do link .buy percorre os li, constrói o array products com name e qty e envia o POST com esse array.',
        'Na resposta, o texto de .total é atualizado para o valor retornado ou para "not enough stock" quando o valor é inferior a 0.',
      ],
    },
    solution: `\`\`\`js
$('#products ul li a').click(function () {
  const qty = $(this).closest('li').find('.qty');
  qty.text(parseInt(qty.text(), 10) + 1);
});

$('#products a.buy').click(function () {
  const products = [];
  $('#products ul li').each(function () {
    const li = $(this);
    products.push({
      name: li.contents().first().text().trim().replace(/:$/, ''),
      qty: parseInt(li.find('.qty').text(), 10),
    });
  });
  $.post('calculatetotal.php', { products: products }, function (total) {
    $('.total').text(total < 0 ? 'not enough stock' : total);
  });
});
\`\`\``,
    reasoning:
      'Em (a), o link está dentro do li, pelo que o encadeamento closest mais find isola a quantidade da linha certa. Em (b), o método each percorre as linhas para montar o array no formato pedido e a callback do POST atualiza o total conforme o valor recebido.',
    explanation: link.json,
  },
];

export const httpAjax: ExamQuestion[] = [
  {
    id: 'ltw-exame-2015-q1',
    title: 'Porque é que o HTTP é um protocolo stateless',
    source: 'Exame, 2014/15',
    topic: 'http-ajax',
    prompt:
      'Explique sucintamente o que queremos dizer quando dizemos que o protocolo HTTP é um protocolo stateless.',
    answer: {
      kind: 'self',
      checklist: [
        'Cada pedido é tratado de forma independente, sem memória de pedidos anteriores.',
        'O servidor não guarda, por si, estado entre pedidos do mesmo cliente.',
        'O estado tem de ser mantido pelo cliente, por exemplo em cookies ou numa sessão.',
      ],
    },
    solution:
      'Stateless significa que cada pedido HTTP é autossuficiente: o servidor não associa pedidos consecutivos ao mesmo utilizador, nem guarda estado entre eles. Quem mantém o estado (por exemplo via cookies de sessão) é o cliente, reenviando-o em cada pedido.',
    reasoning:
      'Sem estado no servidor, qualquer servidor pode responder a qualquer pedido, o que facilita a escalabilidade; o preço é que a aplicação tem de transportar o estado relevante em cada mensagem.',
    explanation: link.mensagens,
  },
  {
    id: 'ltw-exame-2016-q3',
    title: 'Como são enviadas as cookies no protocolo HTTP',
    source: 'Exame, 2015/16',
    topic: 'http-ajax',
    prompt: 'No protocolo HTTP, como são enviadas as cookies?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Numa resposta AJAX usando JSON.',
          correct: false,
          explanation:
            'AJAX e JSON são do lado do cliente; as cookies viajam nos cabeçalhos.',
        },
        {
          text: 'Na barra de endereços do browser.',
          correct: false,
          explanation: 'O URL não transporta cookies.',
        },
        {
          text: 'Ficam guardadas no servidor.',
          correct: false,
          explanation:
            'As cookies ficam no browser; o servidor guarda apenas o identificador da sessão.',
        },
        {
          text: 'Num header HTTP.',
          correct: true,
          explanation:
            'O browser envia `Cookie` nos pedidos e o servidor responde com `Set-Cookie`.',
        },
      ],
    },
    solution: 'Num header HTTP (Cookie no pedido, Set-Cookie na resposta).',
    reasoning:
      'As cookies são um mecanismo de transporte nos cabeçalhos da mensagem HTTP, não no corpo nem no URL.',
    explanation: link.cookies,
  },
  {
    id: 'ltw-exame-2017r-q2',
    title: 'O que garante um URL que começa por https://',
    source: 'Exame de recurso, 2016/17',
    topic: 'http-ajax',
    prompt:
      'Ao navegar para um site cujo URL começa por https:// temos sempre a certeza de que...',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não está a existir um ataque do tipo Man in the Middle.',
          correct: false,
          explanation:
            'HTTPS cifra a comunicação, mas não protege de todos os ataques possíveis.',
        },
        {
          text: 'O servidor usa a versão 2.0 do protocolo HTTP.',
          correct: false,
          explanation:
            'https:// indica TLS sobre HTTP, não uma versão específica do protocolo.',
        },
        {
          text: 'A comunicação é cifrada.',
          correct: true,
          explanation:
            'O "s" indica que a ligação usa TLS, garantindo confidencialidade e integridade.',
        },
        {
          text: 'A versão do HTML é superior a 4.',
          correct: false,
          explanation:
            'O esquema do URL não diz nada sobre a versão do HTML servido.',
        },
      ],
    },
    solution: 'A comunicação é cifrada.',
    reasoning:
      'https:// = HTTP sobre TLS: os dados trocados entre cliente e servidor vão cifrados, protegendo contra escutas na rede.',
    explanation: link.https,
  },
];

export const seguranca: ExamQuestion[] = [
  {
    id: 'ltw-exame-2015-q2',
    title: 'Vulnerabilidade explorada com script num parâmetro do pedido',
    source: 'Exame, 2014/15',
    topic: 'seguranca',
    prompt: `Ao examinar os logs do servidor, um administrador de sistemas reparou no seguinte pedido HTTP:

\`\`\`
post_comment.php?title=&body=<script>window.onload = function() {var link=document.getElementsByTagName("a");link[0].href="http://do-something.com/";}</script>
\`\`\`

Que tipo de vulnerabilidade estava a ser explorada?`,
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Cross-Site Scripting',
          correct: true,
          explanation:
            'O atacante injeta JavaScript num parâmetro; se o servidor o devolver sem escapar, o script corre no browser da vítima.',
        },
        {
          text: 'SQL Injection',
          correct: false,
          explanation: 'Não há aqui alteração da sintaxe de uma consulta SQL.',
        },
        {
          text: 'Javascript Vulnerability',
          correct: false,
          explanation:
            'O problema não está na linguagem, mas na falta de validação/escapamento da entrada.',
        },
        {
          text: 'Cross-Site Request Forgery',
          correct: false,
          explanation:
            'CSRF engana o utilizador para enviar um pedido que ele não queria; aqui o pedido é assumido como legítimo.',
        },
      ],
    },
    solution: 'Cross-Site Scripting (XSS).',
    reasoning:
      'O parâmetro body contém código JavaScript. Se a página o présenter sem escapar no contexto HTML, o script executa no browser de quem vê o comentário, podendo roubar cookies ou alterar a página.',
    explanation: link.xss,
  },
  {
    id: 'ltw-exame-2016-q4',
    title: 'Como prevenir um ataque de Cross-Site Request Forgery',
    source: 'Exame, 2015/16',
    topic: 'seguranca',
    prompt:
      'Qual a forma correta de prevenir um ataque do tipo Cross-Site Request Forgery?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Usar sempre formulários do tipo POST.',
          correct: false,
          explanation:
            'POST por si só não impede que outro site envie um pedido forjado.',
        },
        {
          text: 'Fazer os pedidos usando AJAX.',
          correct: false,
          explanation:
            'Um pedido AJAX também pode ser disparado por um site malicioso.',
        },
        {
          text: 'Usar um token de segurança diferente para cada sessão.',
          correct: true,
          explanation:
            'O token (único por sessão e imprevisível) é incluído no formulário e verificado no servidor; um site externo não o conhece.',
        },
        {
          text: 'Ter sempre um diálogo de confirmação.',
          correct: false,
          explanation:
            'Ajuda contra cliques acidentais, não contra pedidos forjados automáticos.',
        },
      ],
    },
    solution:
      'Usar um token de segurança diferente para cada sessão (token anti-CSRF).',
    reasoning:
      'O ataque funciona porque o browser envia automaticamente as cookies de sessão. Um token que só o servidor original conhece, devolvido no formulário e validado no envio, impede que um pedido de outro site seja aceite.',
    explanation: link.csrf,
  },
  {
    id: 'ltw-exame-2015-q3',
    title: 'Ataque prevenido ao usar salts diferentes para cada password',
    source: 'Exame, 2014/15',
    topic: 'seguranca',
    prompt:
      'Uma password deve ser sempre cifrada usando um algoritmo de hash seguro. Que tipo de ataque é prevenido ao usar salts diferentes para cada password?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Man in the Middle Attack',
          correct: false,
          explanation:
            'Isso previne-se com cifras na comunicação (TLS), não com salts.',
        },
        {
          text: 'Rainbow Tables',
          correct: true,
          explanation:
            'O salt torna cada hash único, pelo que tabelas pré-calculadas de hashes (rainbow tables) deixam de servir.',
        },
        {
          text: 'Brute Force',
          correct: false,
          explanation:
            'A força bruta continua possível; o que se usa contra ela é um hash lento.',
        },
        {
          text: 'Dictionary Attack',
          correct: false,
          explanation:
            'O salt também dificulta dicionários por utilizador, mas o ataque diretamente visado pelas rainbow tables é esse.',
        },
      ],
    },
    solution: 'Rainbow Tables.',
    reasoning:
      'Sem salt, duas passwords iguais produisent o mesmo hash, o que permite tablas pré-calculadas. Com um salt aleatório por utilizador, cada hash é distinto e essas tabelas falham; além disso, é preciso calcular um hash por entrada.',
    explanation: link.passwords,
  },
  {
    id: 'ltw-exame-2017-q4',
    title: 'Ataque de Session Fixation',
    source: 'Exame, 2016/17',
    topic: 'seguranca',
    prompt: 'Um ataque do tipo Session Fixation consiste em...',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Decorar e copiar a cookie de sessão de um utilizador.',
          correct: false,
          explanation:
            'Isso descreve antes o session hijacking por cópia da cookie.',
        },
        {
          text: 'Roubar uma cookie de sessão enviada de forma insegura.',
          correct: false,
          explanation: 'Isso é session hijacking por interceção na rede.',
        },
        {
          text: 'Tirar partido de cookies não cifradas.',
          correct: false,
          explanation: 'Relaciona-se com cookies em claro, não com fixation.',
        },
        {
          text: 'Forçar uma certa cookie de sessão a um utilizador.',
          correct: true,
          explanation:
            'O atacante fixa um identificador de sessão conhecido na vítima; se esta autenticar com ele, o atacante reutiliza a sessão.',
        },
      ],
    },
    solution: 'Forçar uma certa cookie de sessão a um utilizador.',
    reasoning:
      'Na fixation, o atacante consegue que a vítima use um session id à sua escolha (por exemplo num link). Depois de a vítima iniciar sessão, o atacante entra com o mesmo id. A defesa passa por regenerar o id no login.',
    explanation: link.auth,
  },
];

export const regex: ExamQuestion[] = [
  {
    id: 'ltw-exame-2017-q5',
    title: 'Primeiro match de seis expressões regulares',
    source: 'Exame, 2016/17',
    topic: 'regex',
    prompt: `Considere a seguinte string:

\`\`\`
Washing the washing machine while watching the washing machine washing washing
\`\`\`

Para cada uma das expressões regulares seguintes, indique qual o primeiro match (a substring encontrada, da esquerda para a direita):

(a) /wa.*ing/

(b) /[a-z]{3}\\b/

(c) /(ing).*?\\1/

(d) /^.{3}/

(e) /(sh|ch)(?!ing)/

(f) /(.+?).*?\\1/`,
    answer: {
      kind: 'self',
      checklist: [
        '(a) "washing the washing machine while watching the washing machine washing washing".',
        '(b) "ing" (de "Washing").',
        '(c) "ing the washing".',
        '(d) "Was".',
        '(e) "ch" (de "machine").',
        '(f) "ashing the wa".',
      ],
    },
    solution: `(a) /wa.*ing/ → "washing the washing machine while watching the washing machine washing washing" (o primeiro "wa" minúsculo até ao último "ing", porque .* é guloso).

(b) /[a-z]{3}\\b/ → "ing" (as três primeiras letras minúsculas seguidas de fronteira de palavra são o "ing" final de "Washing").

(c) /(ing).*?\\1/ → "ing the washing" (o primeiro "ing" é o de "Washing"; o .*? preguiçoso para no "ing" seguinte, em "washing").

(d) /^.{3}/ → "Was" (os três primeiros caracteres).

(e) /(sh|ch)(?!ing)/ → "ch" de "machine" (os "sh" de "Washing", "washing" e "watching" estão seguidos de "ing" e são rejeitados pelo lookahead negativo).

(f) /(.+?).*?\\1/ → "ashing the wa" (não há outro "W" maiúsculo, pelo que o match começa no "a" seguinte; o grupo captura "a" e volta a encontrar "a" no "wa" de "washing").`,
    reasoning:
      'O motor de expressões regulares testa da esquerda para a direita e, dentro de cada posição, respeita a Guloso/preguiça dos quantificadores: .* avança o mais possível, .*? o menos possível, e os lookarounds filtram sem consumir caracteres.',
    explanation: link.guloso,
  },
  {
    id: 'ltw-exame-2016-q5',
    title: 'Primeiro match de seis expressões regulares (2016)',
    source: 'Exame, 2015/16',
    topic: 'regex',
    prompt: `Considere a seguinte string:

\`\`\`
When you write copy you have the right to copyright the copy you write
\`\`\`

Para cada uma das expressões regulares seguintes, indique qual o primeiro match:

(a) /copy.*right/

(b) /[write]/

(c) /(\\w{4}).*\\1/

(d) /write$/

(e) /(ri|py)(?!t)/

(f) /(\\w{3,}?).*?\\1/`,
    answer: {
      kind: 'self',
      checklist: [
        '(a) "copy you have the right to copyright".',
        '(b) "e" (a terceira letra de "When").',
        '(c) "write copy you have the right to copyright the copy you writ".',
        '(d) "write" (a última palavra da string).',
        '(e) "py" (de "copy").',
        '(f) "write copy you have the right to copyright the copy you writ".',
      ],
    },
    solution: `(a) /copy.*right/ → "copy you have the right to copyright" (do primeiro "copy" até ao último "right", que está dentro de "copyright").

(b) /[write]/ → "e" (a classe contém os caracteres w, r, i, t, e; o primeiro que aparece na string é o "e" de "When").

(c) /(\\w{4}).*\\1/ → "write copy you have the right to copyright the copy you writ" ("When" não se repete; o primeiro grupo de 4 letras que volta a aparecer é "writ", no "write" final).

(d) /write$/ → "write" (a última ocorrência, presa ao fim da string).

(e) /(ri|py)(?!t)/ → "py" de "copy" (o "ri" de "write" está seguido de "t" e é rejeitado; "py" está seguido de espaço).

(f) /(\\w{3,}?).*?\\1/ → "write copy you have the right to copyright the copy you writ" (igual a (c): o grupo preguiçoso "wri" repete-se no "write" final).`,
    reasoning:
      'Em (b), a classe de caracteres não é a palavra "write". Em (c) e (f), a captura tem de começar na primeira posição em que o texto capturado volte a surgir mais à frente; como "When" é único, o match começa em "writ".',
    explanation: link.guloso,
  },
];

export const xml: ExamQuestion[] = [
  {
    id: 'ltw-exame-2017-q6',
    title: 'Expressões XPath sobre um documento de autores',
    source: 'Exame, 2016/17',
    topic: 'xml',
    prompt: `Considere o seguinte documento XML (o nó de contexto é a raiz do documento):

\`\`\`xml
<authors>
  <author country="Spain" name="Miguel de Cervantes">
    <book year="1605" type="Novel">Don Quixote</book>
  </author>
  <author country="England" name="William Shakespeare">
    <book year="1599" type="Tragedy">Hamlet</book>
    <book year="1606" type="Tragedy">Macbeth</book>
  </author>
  <author country="Russia" name="Leo Tolstoy">
    <book year="1865" type="Novel">War and Peace</book>
  </author>
  <author country="Portugal" name="Jose Saramago">
    <book year="1995" type="Novel">Ensaio sobre a Cegueira</book>
    <book year="1997" type="Novel">Todos os Nomes</book>
  </author>
</authors>
\`\`\`

Escreva as expressões XPath que selecionam:

(a) O nome de todos os autores.

(b) O título dos livros do tipo Novel.

(c) O nome dos autores que escreveram mais do que um livro.

(d) O país do autor do livro "Ensaio sobre a Cegueira".`,
    answer: {
      kind: 'self',
      checklist: [
        '(a) //author/@name.',
        '(b) //book[@type="Novel"] (ou o seu texto).',
        '(c) //author[count(book) > 1]/@name.',
        '(d) //author[book = "Ensaio sobre a Cegueira"]/@country.',
      ],
    },
    solution: `(a) \`//author/@name\`

(b) \`//book[@type='Novel']\` (devolve os elementos; o texto dos títulos fica em \`//book[@type='Novel']/text()\`)

(c) \`//author[count(book) > 1]/@name\`

(d) \`//author[book = 'Ensaio sobre a Cegueira']/@country\` (devolve "Portugal")`,
    reasoning:
      'Os atributos selecionam-se com @ e os predicados com []; count(book) > 1 filtra os autores com mais de um elemento book filho, e a comparação book = "..." compara o conteúdo do elemento filho com o texto indicado.',
    explanation: link.xpath,
  },
  {
    id: 'ltw-exame-2016-q6',
    title: 'Nós selecionados pela expressão `.//person/job`',
    source: 'Exame, 2015/16',
    topic: 'xml',
    prompt:
      'Explique sucintamente quais os nós que são selecionados pela seguinte expressão XPath: `.//person/job`',
    answer: {
      kind: 'self',
      checklist: [
        '`//` seleciona descendentes do nó de contexto a qualquer profundidade.',
        'A expressão seleciona todos os elementos job que são filhos de um elemento person descendente do nó de contexto.',
      ],
    },
    solution:
      'Seleciona todos os elementos `job` filhos de qualquer elemento `person` que seja descendente do nó de contexto (a qualquer profundidade).',
    reasoning:
      '`.` é o nó de contexto, `//person` apanha todos os person abaixo dele e `/job` os seus filhos diretos do tipo job.',
    explanation: link.xpath,
  },
  {
    id: 'ltw-exame-2016-q7',
    title: 'Texto num complexType de XSD',
    source: 'Exame, 2015/16',
    topic: 'xml',
    prompt: 'Em XSD, um complexType pode conter texto?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Sim, desde que não contenha outros elementos XML.',
          correct: false,
          explanation: 'Isso descreve um simpleType com conteúdo de texto.',
        },
        {
          text: 'Sim, desde que o atributo mixed tenha o valor true.',
          correct: true,
          explanation:
            'mixed="true" permite texto intercalado com os elementos filhos num complexType.',
        },
        {
          text: 'Sim, desde que o atributo text tenha o valor true.',
          correct: false,
          explanation: 'Não existe esse atributo em XSD.',
        },
        {
          text: 'Não, só elementos simpleType podem conter texto.',
          correct: false,
          explanation:
            'Um complexType com mixed="true" também pode conter texto.',
        },
      ],
    },
    solution: 'Sim, desde que o atributo mixed tenha o valor true.',
    reasoning:
      'Num complexType, o conteúdo misto (texto e elementos) só é permitido quando mixed="true"; caso contrário, o conteúdo limita-se aos elementos declarados.',
    explanation: link.validade,
  },
];
