---
title: Cheat sheet
description: Regras para prever HTML, CSS, PHP, JavaScript, HTTP, segurança, regex e XPath.
section: recursos
studyKind: revision
order: 0
---

Confirma primeiro o contexto: árvore HTML, nível da cascata, tipo da entrada, ordem dos callbacks ou nó XPath. As ligações levam à explicação de cada regra.

## HTML: o que o pedido contém

| Dado                                        | Para onde vai                      |
| ------------------------------------------- | ---------------------------------- |
| `id`                                        | À `label` (`for`), nunca ao pedido |
| `name`                                      | Ao pedido, como nome do parâmetro  |
| Sem `name`, `disabled`, checkbox por marcar | Não viaja                          |
| `readonly`, checkbox marcada, botão usado   | Viaja (marcada sem `value`: `on`)  |
| Fragmento `#...`                            | Fica no navegador                  |

[Formulários](/cadeiras/ltw/html-estrutura/#formulários-e-dados-enviados) · POST não cifra; o servidor valida tudo de novo. Tabela usa `th` com `scope`; `rowspan`/`colspan` ocupam posições que não se repetem.

## CSS: especificidade e caixa

Ordem de decisão: origem e importância, camadas, especificidade `(ID, classes, elementos)`, posição. Herança decide-se à parte: declaração no filho vence a herdada.

| Caso                                       | Regra                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| 1 ID contra 10 classes                     | Ganha o ID                                                                 |
| `:where`                                   | Vale 0                                                                     |
| `!important`, estilo em linha              | Mudam importância/nível, não especificidade                                |
| `content-box` / `border-box`               | `width` exclui / inclui padding e borda; margem sempre fora                |
| `em` / `rem`                               | Próprio elemento ou pai / raiz                                             |
| `relative` / `absolute`+`fixed` / `sticky` | Conserva lugar / sai do fluxo / prende no scroll                           |
| `fr`                                       | Reparte o que sobra após fixos e gaps; item em span inclui gaps interiores |

[Seletores](/cadeiras/ltw/css-estilo-layout/#seletores) · [Cascata](/cadeiras/ltw/css-estilo-layout/#cascata-e-herança) · [Caixa](/cadeiras/ltw/css-estilo-layout/#medidas-e-modelo-de-caixa) · [Fr](/cadeiras/ltw/css-estilo-layout/#repartir-o-espaço-com-fr)

## PHP: fronteira e persistência

| Entrada                         | Verificação                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Ausente, string com lixo, array | Rejeita antes de converter (`is_string`, inteiro completo, limites)               |
| `$_POST`                        | Só corpos de formulário; JSON lê-se em `php://input`                              |
| Coluna de ordenação             | Lista fixa de nomes; marcador é só valor                                          |
| Stock concorrente               | `UPDATE ... WHERE stock >= :q` + `rowCount`, em transação com `commit`/`rollback` |

`intval('2x')` dá 2: converter não valida. `header` antes de saída + `exit`; após POST, 303 para GET. `password_hash` / `password_verify`; sessão regenerada ao autenticar; dono verificado em cada ação a partir de `$_SESSION`.

[Pedir](/cadeiras/ltw/php-dinamicas-bd/#receber-um-pedido) · [PDO](/cadeiras/ltw/php-dinamicas-bd/#sqlite-e-consultas-preparadas) · [Transação](/cadeiras/ltw/php-dinamicas-bd/#alterar-dados-de-forma-consistente) · [Sessão](/cadeiras/ltw/php-dinamicas-bd/#sessões-e-autenticação) · [Âmbito](/cadeiras/ltw/php-dinamicas-bd/#âmbito-global-e-captura-de-uma-variável) · [Foreach com `&`: `unset($v)` após o ciclo](/cadeiras/ltw/php-dinamicas-bd/#terminar-uma-referência-de-foreach)

## JavaScript: valores e eventos

`+` concatena, `-` numericiza; `??` só para `null`/`undefined`, `||` para falsos. `map`/`filter` criam, `forEach` devolve `undefined`, `sort` altera (números: `(a,b) => a-b` sobre cópia). `[1] === [1]` é falso.

Closure guarda o ambiente de criação; `this` normal depende da chamada; arrow herda. `target` é a origem, `currentTarget` o listener em execução; delegação via `closest` serve itens futuros. `preventDefault` trava a ação, `stopPropagation` o percurso. Cada `bind` é função nova: guarda-a para remover, com igual tipo e captura. `textContent` para texto; `innerHTML` nunca com entrada.

[Tipos](/cadeiras/ltw/javascript-dom-eventos/#tipos-e-conversões) · [Eventos](/cadeiras/ltw/javascript-dom-eventos/#eventos-e-delegação) · [Remover listener](/cadeiras/ltw/javascript-dom-eventos/#guardar-a-função-que-foi-registada)

## HTTP: método, estado e origem

GET/HEAD/OPTIONS seguros e idempotentes; PUT/DELETE idempotentes; POST em geral não. Efeito igual, resposta pode diferir. `Accept` pede, `Content-Type` descreve. 201 criado, 204 sem corpo, 303 por GET, 304 cache válida, 400/401/403/404/405/500.

`fetch` resolve com 404: testa `ok`. `json()` é assíncrono. Parâmetros com `URLSearchParams`; respostas fora de ordem pedem contador ou `AbortController`. POST JSON entre origens exige preflight OPTIONS; a resposta real também autoriza a origem. Credenciais pedem origem concreta, nunca `*`.

[Métodos](/cadeiras/ltw/http-ajax-json/#métodos-segurança-e-idempotência) · [Mensagens](/cadeiras/ltw/http-ajax-json/#ler-mensagens) · [Fetch](/cadeiras/ltw/http-ajax-json/#json-e-fetch) · [CORS](/cadeiras/ltw/http-ajax-json/#sop-e-cors)

## Segurança: cada risco, a sua defesa

SQL preparado para valores; escape do contexto de saída; token CSRF não vazio com `hash_equals`; autorização no registo com o utilizador da sessão; caminhos de mapa fixo fora da raiz pública; HTTPS só no transporte. `HttpOnly` esconde o cookie, não trava pedidos. Salt público não salva palavra-passe fraca.

[Injeção](/cadeiras/ltw/seguranca-web/#injeção-sql) · [XSS](/cadeiras/ltw/seguranca-web/#xss-e-contexto-de-saída) · [CSRF](/cadeiras/ltw/seguranca-web/#csrf) · [Autorização](/cadeiras/ltw/seguranca-web/#autenticação-e-autorização) · [Palavras-passe](/cadeiras/ltw/seguranca-web/#palavras-passe-e-sessão) · [Percurso de revisão](/cadeiras/ltw/seguranca-web/#https-e-revisão-de-uma-ação)

## Regex e XPath: âncoras e alcance

`ab+` repete `b`; `(ab)+` o par; `^A|B$` prende cada lado; `^(?:A|B)$` prende ambas. Guloso consome o máximo, preguiçoso o mínimo; classe negada nunca atravessa o delimitador. `\1` repete a captura; `g` guarda `lastIndex` em JS; PCRE usa `\A...\z`; `pattern` testa o valor completo e o servidor valida de novo.

XPath: `/` raiz e filhos, `//` descendentes, `@` atributos, `text()` texto, posições desde 1. `[f][1]` filtra e escolhe; `[1][f]` escolhe e testa. `//livro[1]` por grupo, `(//livro)[1]` global. `!=` com vários nós pede `not(x = ...)`. Sem prefixo só há namespace vazio: regista prefixo para o URI.

[Peças](/cadeiras/ltw/expressoes-regulares/#peças-e-precedência) · [Motores](/cadeiras/ltw/expressoes-regulares/#javascript-php-e-html) · [Caminhos](/cadeiras/ltw/xml-xpath/#caminhos-xpath) · [Predicados](/cadeiras/ltw/xml-xpath/#predicados-e-posição)
