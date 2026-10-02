---
title: Cheat sheet
description: Regras para prever HTML, CSS, PHP, JavaScript, HTTP, segurança, regex e XPath.
section: recursos
studyKind: revision
order: 0
---

## HTML e CSS

- [Formulários](/cadeiras/ltw/html-estrutura/#formulários-e-dados-enviados): `id` liga à label; `name` identifica o parâmetro. Checkbox não marcada e `disabled` não enviam. `readonly` normalmente envia. `POST` não cifra; valida de novo no servidor.
- [Seletores](/cadeiras/ltw/css-estilo-layout/#seletores): espaço = descendente; `>` = filho; `+` = irmão seguinte; `~` = irmãos posteriores. `nth-child` conta todos os elementos; `nth-of-type` só o tipo.
- [Cascata](/cadeiras/ltw/css-estilo-layout/#cascata-e-herança): origem/importância e camadas antes de especificidade; posição desempata. Trio `(ID, classes/atributos/pseudo-classes, elementos/pseudo-elementos)`. Declaração no filho vence herança.
- [Caixa](/cadeiras/ltw/css-estilo-layout/#medidas-e-modelo-de-caixa): `content-box` soma padding e border à largura; `border-box` já os inclui. Margin fica fora. `rem` usa a raiz; `em` depende da propriedade e do tamanho de letra relevante.
- [Layout](/cadeiras/ltw/css-estilo-layout/#fluxo-e-posicionamento): `relative` conserva espaço; `absolute` e `fixed` saem do fluxo; `sticky` conserva. Flex organiza eixos; grid organiza linhas e colunas. `justify-content` segue o eixo principal.

## PHP e JavaScript

- [PHP](/cadeiras/ltw/php-dinamicas-bd/#receber-um-pedido): entrada pode faltar ou ser array. Verifica tipo, valida e só depois converte. `===` distingue tipos; `isset` rejeita null; `empty` rejeita também `'0'`.
- [PDO](/cadeiras/ltw/php-dinamicas-bd/#sqlite-e-consultas-preparadas): `prepare` + `execute` para valores. Marcadores não substituem identificadores. `fetch` devolve linha ou false. Transação = commit conjunto ou rollback.
- [Redirecionamento e sessão](/cadeiras/ltw/php-dinamicas-bd/#sessões-e-autenticação): `header` antes de saída; `Location` não pára o programa, usa `exit`. Após POST, 303 permite GET. Sessão no servidor, identificador habitualmente no cookie.
- [JavaScript](/cadeiras/ltw/javascript-dom-eventos/#tipos-e-conversões): `const` impede reatribuição, não mutação. `+` pode concatenar. `??` substitui null/undefined; `||` substitui valores falsos. `map` transforma, `filter` seleciona, `reduce` acumula.
- [Funções e eventos](/cadeiras/ltw/javascript-dom-eventos/#eventos-e-delegação): closure conserva ambiente lexical. `this` normal depende da chamada; arrow herda-o. `target` é o alvo; `currentTarget` é o elemento cujo listener está a correr. `preventDefault` impede ação, não propagação.

## HTTP e segurança

- [HTTP](/cadeiras/ltw/http-ajax-json/#métodos-segurança-e-idempotência): GET seguro e idempotente; PUT/DELETE idempotentes; POST não em geral. Idempotência descreve efeito, não resposta igual. Fragmento não vai ao servidor.
- [Cabeçalhos](/cadeiras/ltw/http-ajax-json/#ler-mensagens): Accept pede formato; Content-Type descreve corpo. Set-Cookie na resposta, Cookie no pedido. 201 criado; 204 sem corpo; 303 redireciona; 304 cache válida; 400 entrada; 403 recusa; 404 ausente; 405 método; 500 interno.
- [Ajax](/cadeiras/ltw/http-ajax-json/#json-e-fetch): `fetch` não rejeita só por 404; verifica `ok`. `json()` também é assíncrono. Encoda parâmetros; ignora respostas antigas. CORS permite leitura entre origens, não autentica nem impede CSRF.
- [Defesas](/cadeiras/ltw/seguranca-web/#injeção-sql): SQL preparado; escape conforme contexto; `textContent` para texto; token CSRF não vazio e verificado; autorização no servidor; caminhos fixos ou controlados; HTTPS no transporte.
- [Palavras-passe](/cadeiras/ltw/seguranca-web/#palavras-passe-e-sessão): password_hash/password_verify, nunca SHA-1 simples. Salt não salva uma palavra-passe fraca. Regenera sessão ao autenticar.

## Regex e XML

- [Regex](/cadeiras/ltw/expressoes-regulares/#peças-e-precedência): `[]` escolhe um caráter; `*` zero+, `+` um+, `?` opcional. `(?:...)` agrupa sem capturar. Agrupa alternativas antes de ancorar. Guloso tenta máximo; preguiçoso tenta mínimo.
- [Capturas](/cadeiras/ltw/expressoes-regulares/#capturas-e-referências): grupo 0 é tudo; `\1` exige repetição da captura. Lookaround testa sem consumir. Formato de data não prova data existente.
- [XML](/cadeiras/ltw/xml-xpath/#boa-formação-e-validade): boa formação = sintaxe; validade = contrato. Namespace é URI, não prefixo. Por defeito afeta elementos, não atributos sem prefixo.
- [XPath](/cadeiras/ltw/xml-xpath/#predicados-e-posição): `/` parte da raiz; `//` procura descendentes; `@` atributo; `text()` texto; `[condição]` filtra. Posições começam em 1. `//x[1]` pode dar vários; `(//x)[1]` dá o primeiro global.
