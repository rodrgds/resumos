---
title: Linguagens e Tecnologias Web
description: Construir páginas com HTML e CSS, programar o cliente e o servidor, e explicar HTTP, segurança, expressões regulares e XML.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  sources:
    - title: LTW, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560104
    - title: André Restivo, LTW 2025/26
      url: https://pages.up.pt/~up353972/page/courses/ltw/
  review:
    edition: 2026/27
    reviewer: Revisão editorial dos Resumos FEUP
    date: '2026-10-08'
  coverage: Programa da ficha de 2025/26 e sequência pública de aulas do docente, com exemplos e exercícios próprios.
  gaps:
    - Programa e avaliação de 2026/27 por confirmar.
    - Materiais de Moodle de 2026/27 por confirmar.
    - Páginas protegidas do projeto, exame e algumas soluções práticas indisponíveis.
---

Ao carregar em Reservar no catálogo, o navegador envia um pedido HTTP ao servidor. O HTML define o formulário, o CSS dispõe os campos e o JavaScript pode atualizar a página sem a carregar de novo. O PHP valida o pedido e consulta a base de dados antes de confirmar a reserva.

Escolhes um livro e indicas a quantidade. O pedido inclui o identificador do livro e essa quantidade. A sessão identifica o utilizador; o servidor verifica a permissão e o stock. Depois responde com HTML ou JSON. Se a quantidade for zero ou o utilizador não tiver permissão, a resposta deve explicar a recusa sem revelar detalhes internos.

Vamos usar um catálogo de livros e pequenas reservas como fio condutor. São exemplos e exercícios próprios, não resoluções de provas oficiais. Precisas de funções, ciclos e estruturas de dados, SQL básico e uso de Git.

## Percurso de estudo

1. [HTML e estrutura semântica](/cadeiras/ltw/html-estrutura/). Escolher elementos, construir formulários e prever os dados enviados.
2. [CSS, caixa e layout](/cadeiras/ltw/css-estilo-layout/). Resolver seletores e cascata, medir caixas e construir layouts responsivos.
3. [PHP e páginas dinâmicas](/cadeiras/ltw/php-dinamicas-bd/). Validar pedidos, consultar SQLite e organizar páginas, ações e sessões.
4. [JavaScript e DOM](/cadeiras/ltw/javascript-dom-eventos/). Seguir variáveis e funções, alterar a árvore e responder a eventos.
5. [HTTP e Ajax](/cadeiras/ltw/http-ajax-json/). Ler mensagens, usar JSON, lidar com promessas e distinguir origem de autenticação.
6. [Segurança web](/cadeiras/ltw/seguranca-web/). Identificar o que o atacante controla e escolher uma defesa para cada fronteira.
7. [Expressões regulares](/cadeiras/ltw/expressoes-regulares/). Construir padrões, prever o primeiro resultado e interpretar capturas.
8. [XML e XPath](/cadeiras/ltw/xml-xpath/). Distinguir boa formação de validade e selecionar nós com contexto e namespaces.

Cada lição tem exemplos resolvidos e exercícios no fim. Prevê o resultado antes de correres o exemplo, porque é aí que descobres o que ainda não percebeste. Depois altera um dado, uma condição ou um seletor e explica a diferença. A [Cheat sheet](/cadeiras/ltw/folha-consulta/) serve para consultar regras depois de as estudares.

O percurso segue o programa de 2025/26. O programa e a avaliação de 2026/27 não estão confirmados nestes apontamentos; consulta a [ficha dessa edição](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586997) e o Moodle para os tópicos e regras aplicáveis.

Para treinar em conjunto, implementa uma reserva que começa num formulário, valida no PHP, usa uma consulta preparada, identifica o utilizador pela sessão e devolve uma resposta. Confirma o pedido no separador Rede do navegador. Repete com quantidade zero, parâmetro ausente e utilizador sem permissão.

## Ambiente dos exemplos

Os editores HTML/CSS/JavaScript executam numa pré-visualização isolada sem rede. Mostram DOM, eventos e layout; não fazem pedidos ao teu servidor. Os blocos PHP usam PHP 8.4 numa origem separada. A ficha de 2025/26 indica PHP 7.4 e sqlite3. As regras de conversão e funcionalidades variam com a versão, por isso confirma o ambiente pedido pelo docente.

Para uma aplicação com vários ficheiros, usa o ambiente indicado na aula e cria a base de dados a partir do script SQL. Mantém a base e os ficheiros privados fora da pasta pública. Na raiz do projeto, corre `php -S localhost:8000 -t public`, se `public/` for a pasta das páginas acessíveis. Abre `http://localhost:8000/`; abrir o ficheiro PHP diretamente não o executa. Este servidor serve para desenvolvimento local.

:::details[Avaliação de 2025/26]
A [ficha de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560104) define 50% de exame e 50% de trabalho, com mínimo de 8/20 no exame. Frequência exige participar e entregar o projeto, sem ultrapassar 25% de faltas às práticas e teórico-práticas. A entrega antecede a apresentação na última semana de aulas.

Quem conserva a frequência anterior informa o responsável na primeira semana e não se inscreve nas turmas TP. Trabalhadores-estudantes cumprem os mesmos prazos e combinam apresentações intermédias. O exame pode melhorar no recurso da mesma edição; o projeto não. Melhorar um projeto de uma edição anterior já aprovada exige frequentar novamente a UC.

A [página do docente](https://pages.up.pt/~up353972/page/courses/ltw/) divide os 50% de projeto em 10% e 40%. Os detalhes protegidos de exame, projeto e algumas soluções não estavam disponíveis nesta revisão. Confirma formatos, datas, recursos permitidos e regras de 2026/27 no Moodle e na ficha dessa edição. Estes apontamentos não garantem uma classificação nem substituem esses materiais.
:::

:::details[Materiais e bibliografia]
O [Moodle de 2025/26](https://moodle2526.up.pt/course/view.php?id=4015) remete para a página de André Restivo, com slides e propostas práticas. Os slides nem sempre identificam o ano de produção. XML e XPath mantêm-se no percurso porque constam da ficha de 2025/26, embora não apareçam no calendário público mais recente do docente. As explicações e soluções destas páginas foram escritas de novo.

- [Slides e exercícios de André Restivo](https://pages.up.pt/~up353972/page/courses/ltw/). Segue a sequência de aulas e consulta o enunciado original de cada prática.
- [Exemplo Chinook do docente](https://github.com/arestivo/chinook). Observa a separação entre páginas, templates, ações e base de dados. Código de demonstração antigo pode usar práticas que precisam de correção, incluindo SHA-1 para palavras-passe.
- Elizabeth Castro e Bruce Hyslop, _HTML5 & CSS3: Visual QuickStart Guide_, 2011, ISBN 0-321-71961-1.
- David Flanagan, _JavaScript: The Definitive Guide_, 2011, ISBN 0-596-80552-7.
- Anders Møller e Michael I. Schwartzbach, _An Introduction to XML and Web Technologies_, ISBN 0-321-26966-7.

Os três livros constam da bibliografia da ficha. As regras normativas de HTTP/1.1 e JSON estão nas [RFC 9112](https://www.rfc-editor.org/rfc/rfc9112.html) e [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.html). Para XML e XPath, consulta as normas [XML 1.0](https://www.w3.org/TR/xml/) e [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/). Para pormenores atuais de APIs, consulta [MDN Web Docs](https://developer.mozilla.org/), [manual do PHP](https://www.php.net/manual/en/) e [SQLite](https://www.sqlite.org/docs.html). Para os contextos de saída e defesas de segurança, consulta as cheat sheets da OWASP sobre [XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) e [palavras-passe](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

A [norma HTML](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-entry-list) define quais os controlos que contribuem para os pares enviados por um formulário.
:::

:::details[Vídeos para rever]

- [Escolher elementos sem CSS](/cadeiras/ltw/html-estrutura/#escolher-a-etiqueta). Panorama de HTML para rever estrutura e apresentação antes de escolheres os elementos.
- [Ler mensagens HTTP](/cadeiras/ltw/http-ajax-json/#ler-mensagens). Segue uma mensagem e distingue linha inicial, cabeçalhos e corpo.
- [Recursos e métodos](/cadeiras/ltw/http-ajax-json/#métodos-segurança-e-idempotência). Relaciona recursos e métodos e verifica por que JSON, por si, não define REST.
- [Injeção SQL](/cadeiras/ltw/seguranca-web/#injeção-sql). Vê onde a entrada muda a sintaxe e como os marcadores a impedem.
- [Closures e eventos](/cadeiras/ltw/javascript-dom-eventos/#âmbito-e-closures). Panorama da linguagem antes de seguires variáveis em closures e eventos.
- [Peças de um padrão](/cadeiras/ltw/expressoes-regulares/#peças-e-precedência). Observa classes, grupos e quantificadores e prevê a correspondência.

Os vídeos são complementos. O programa e as regras de avaliação vêm da FEUP.
:::
