---
title: Laboratório de Bases de Dados e Aplicações Web
description: Preparação do teste individual, dos requisitos e da modelação aos dados, à aplicação web e às suas garantias.
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: Moodle LBAW 2026/27, apresentação e materiais das primeiras três semanas
      url: https://moodle2627.up.pt/course/view.php?id=4222
    - title: Plano do semestre LBAW 2026/27
      url: https://docs.google.com/spreadsheets/d/e/2PACX-1vTm1WlNzZqrCttNHAnZe7Kzq_EJUiGZatZVK5QVfoo-GZlnngu6Xq6COshlPym2Jl3iHQkvU1gUpmbZ/pubhtml?gid=979371688&single=true
    - title: Ficha LBAW 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587001
  coverage: Tópicos do plano atual, com teoria para o teste individual, questões próprias e comparação delimitada com provas históricas.
  gaps:
    - Em 1 de outubro, estavam disponíveis quatro conjuntos de slides, até especificação da base de dados. Os slides posteriores e as provas de 2026/27 ainda não estavam publicados.
    - O plano confirma os tópicos futuros, mas o detalhe e as convenções de cada aula devem ser comparados quando os materiais forem publicados.
---

LBAW junta requisitos, dados e aplicação web. Para o teste individual, precisas de explicar as decisões, executar consultas e reconhecer as garantias que cada mecanismo dá. O exemplo das páginas é uma Loja de Bilhetes, com compradores, eventos, sessões e bilhetes. As questões são próprias, não reproduções de provas oficiais.

## Percurso de estudo

1. [Requisitos](/cadeiras/lbaw/requisitos/) distingue atores, histórias, regras e critérios de aceitação. [Modelo conceptual](/cadeiras/lbaw/modelo-conceptual/) e [esquema relacional](/cadeiras/lbaw/esquema-relacional/) convertem essas regras em estrutura e restrições.
2. [Normalização](/cadeiras/lbaw/normalizacao/) encontra chaves e justifica decomposições. [Consultas SQL](/cadeiras/lbaw/consultas-relacionais/) trata junções, NULL, agregação e quantificação.
3. [Índices e pesquisa](/cadeiras/lbaw/sql-indices/) relaciona consultas, planos e relevância. [Triggers e transações](/cadeiras/lbaw/triggers-transacoes/) explica atomicidade e concorrência, incluindo o caso do último lugar.
4. [HTTP](/cadeiras/lbaw/http-estado/), [arquitetura com Laravel](/cadeiras/lbaw/aplicacao-laravel/) e [segurança](/cadeiras/lbaw/seguranca-web/) distinguem protocolo, responsabilidades e permissões.
5. [Arquitetura de informação e acessibilidade](/cadeiras/lbaw/interfaces-acessiveis/), [cliente e desempenho](/cadeiras/lbaw/cliente-desempenho/) e [NoSQL](/cadeiras/lbaw/nosql/) completam os tópicos do plano atual.

Cada capítulo termina com questões e resoluções justificadas. A [cheat sheet](/cadeiras/lbaw/folha-consulta/) conserva definições, condições e armadilhas para consulta depois de estudar.

## Preparar o teste

Resolve uma questão de modelação, uma de normalização e uma consulta sem abrir as pistas. Depois analisa um cenário concorrente e identifica as defesas de um pedido web. Justifica sempre a condição: não chega dizer «tem trigger», «usa ORM» ou «está autenticado».

Para SQL, cria dados com zero, uma e várias correspondências, e com NULL quando é permitido. Para uma regra concorrente, escreve uma sequência possível de duas transações. Para uma falha web, identifica quem controla a entrada, onde ela é interpretada e que permissão devia ser verificada.

Os blocos SQL no navegador usam SQLite. Os exemplos específicos de PostgreSQL, como PL/pgSQL, índices GIN e níveis de isolamento, estão identificados e exigem PostgreSQL. Os fragmentos Laravel pressupõem a aplicação e as dependências do projeto; os blocos PHP executáveis isolam uma operação da linguagem.

## Avaliação atual

A apresentação e a FAQ de 2026/27 indicam 80% de projeto e 20% de teste individual, com mínimo de 8/20 no teste, sem arredondamento para atingir esse mínimo. Cada componente do projeto exige 10/20. A classificação final não pode exceder a nota do teste acrescida de cinco valores. Por exemplo, projeto 18 e teste 10 dão 16,4 pela média ponderada, mas o limite baixa esse resultado para 15.

O foco destas páginas é o teste. Regras de frequência, entregas, apresentação e avaliação individual do projeto continuam nos [materiais atuais do Moodle](https://moodle2627.up.pt/course/view.php?id=4222). A ficha pública atual identifica a ocorrência, mas ainda não apresentava o programa detalhado quando foi consultada. O âmbito temático foi confirmado no plano do semestre e nos slides já publicados.

## Referências complementares

Os materiais da edição atual do Moodle definem o percurso da cadeira. Estas referências ajudam a consultar definições, detalhes das ferramentas e aulas sobre os mesmos temas. Confirma a versão quando segues documentação de software.

- **Modelo conceptual em UML:** [UML Specification](https://www.omg.org/spec/UML).
- **Do modelo ao esquema relacional:** [restrições em PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html).
- **Consultas SQL, NULL e agregação:** [SELECT em PostgreSQL](https://www.postgresql.org/docs/current/sql-select.html), [comparações com NULL](https://www.postgresql.org/docs/current/functions-comparison.html).
- **Índices, planos e pesquisa em PostgreSQL:** [tipos de índice](https://www.postgresql.org/docs/16/indexes-types.html), [Static quality scores and ordering](https://nlp.stanford.edu/IR-book/html/htmledition/static-quality-scores-and-ordering-1.html), [índices compostos](https://www.postgresql.org/docs/16/indexes-multicolumn.html), [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html), [pesquisa em texto](https://www.postgresql.org/docs/current/textsearch.html).
- **Triggers, transações e concorrência:** [isolamento](https://www.postgresql.org/docs/current/transaction-iso.html), [bloqueios explícitos](https://www.postgresql.org/docs/current/explicit-locking.html), [triggers](https://www.postgresql.org/docs/16/trigger-definition.html), [procedures](https://www.postgresql.org/docs/current/xproc.html), [programa oficial de CMU](https://15445.courses.cs.cmu.edu/fall2024/schedule.html).
- **HTTP, recursos e estado da aplicação:** [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), [métodos em MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
- **Aplicação web com Laravel:** [Cliente e servidor, MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server), [Validation](https://laravel.com/docs/11.x/validation), [Routing](https://laravel.com/docs/11.x/routing), [âmbito de variáveis](https://www.php.net/manual/en/language.variables.scope.php), [arrow functions](https://www.php.net/manual/en/functions.arrow.php), [autorização](https://laravel.com/docs/authorization), [validação](https://laravel.com/docs/validation), [relações Eloquent](https://laravel.com/docs/eloquent-relationships).
- **Segurança da aplicação web:** [SQL injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html), [XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), [armazenamento de palavras-passe](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
- **Interfaces, usabilidade e acessibilidade:** [Labels nos formulários](https://www.w3.org/WAI/tutorials/forms/labels/), [Formulários acessíveis](https://web.dev/learn/accessibility/forms), [Understanding Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [Wireflows, Nielsen Norman Group](https://www.nngroup.com/articles/wireflows/), [Tecnologias de apoio, WAI](https://www.w3.org/WAI/people-use-web/tools-techniques/), [tutoriais de formulários](https://www.w3.org/WAI/tutorials/forms/), [introdução em vídeo](https://www.w3.org/WAI/videos/standards-and-benefits/).
- **Cliente web e desempenho:** [referência de seletores](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selectors_and_combinators), [tabelas com cabeçalhos](https://www.w3.org/WAI/tutorials/tables/one-header/), [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), [modo estrito](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), [Fetch em MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [desempenho web](https://developer.mozilla.org/en-US/docs/Web/Performance).
- **Modelos NoSQL e decisões de armazenamento:** [modelação em MongoDB](https://www.mongodb.com/docs/manual/data-modeling/), [transações](https://www.mongodb.com/docs/manual/core/transactions/), [Perspectives on the CAP Theorem](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf).
