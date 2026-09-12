---
title: Folha de consulta de LTW
description: Referência curta para HTML, CSS, PHP, JavaScript e DOM, conforme os apontamentos de SofiaViP.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos LTW (até DOM) SofiaViP
      url: https://drive.google.com/file/d/1oPo24z5B_E4aHgSTvD3wTMgtYtXftv6e/view
  coverage: A página 1 é a capa; as páginas 2 a 15 resumem Web e URL, HTML e formulários, CSS e layout, PHP e sessões, JavaScript, DOM e uma nota breve sobre Ajax e temporizadores.
  gaps:
    - O PDF não desenvolve XML/XPath, segurança Web, APIs REST nem aplicações completas com base de dados; as notas de Ajax são breves.
    - A edição do programa e as regras de avaliação a que os apontamentos correspondem não foram confirmadas.
---

Esta folha segue os [apontamentos LTW de SofiaViP](https://drive.google.com/file/d/1oPo24z5B_E4aHgSTvD3wTMgtYtXftv6e/view), cujo foco acaba no DOM com uma pequena nota final sobre Ajax. Para cada página, separa **estrutura, apresentação, comportamento e resposta do servidor**.

## HTML e formulários

Um URL identifica um recurso e pode incluir esquema, anfitrião, caminho, parâmetros de consulta e fragmento. O navegador pede o recurso e interpreta a resposta. Em HTML, começa por `<!doctype html>`, `html`, `head` e `body`; usa `title`, `meta charset` e `meta viewport` no cabeçalho. Escolhe elementos pela **função semântica** (`main`, `nav`, `section`, `article`, `h1`–`h6`) e mantém a hierarquia de títulos coerente. Um `id` deve ser único na página. Vê [estrutura HTML](/cadeiras/ltw/html-estrutura/#o-esqueleto-mínimo).

Num formulário, cada controlo enviado precisa de `name`; associa `label` ao `id` do controlo. `type`, `required`, `min`, `max` e `pattern` ajudam a entrada, mas a validação do navegador **não substitui** a validação no servidor. `GET` põe dados no URL e é adequado a consultas sem efeitos; `POST` envia dados no corpo e é adequado a alterações. Usa tabelas para dados tabulares, com cabeçalhos e associações claras, não para dispor a página. Vê [formulários](/cadeiras/ltw/html-estrutura/#formulários-acessíveis) e [tabelas](/cadeiras/ltw/html-estrutura/#tabelas-para-dados-não-para-layout).

## CSS sem adivinhar a cascata

Um seletor escolhe elementos; a cascata compara origem/importância, especificidade e ordem. Em regra, um ID tem mais especificidade do que uma classe, e uma classe mais do que um tipo; não somes especificidades como números decimais. Com `box-sizing: border-box`, a largura declarada inclui _padding_ e borda. Margens continuam fora. `rem` refere o tamanho de letra da raiz; `em`, o contexto do elemento. Vê [seletores e especificidade](/cadeiras/ltw/css-estilo-layout/#seletores-e-a-conta-da-especificidade) e [modelo de caixa](/cadeiras/ltw/css-estilo-layout/#o-modelo-de-caixa).

No fluxo normal, os blocos ocupam linhas e os elementos inline acompanham o texto. `position: absolute` sai do fluxo e posiciona-se relativamente ao ancestral posicionado mais próximo; `fixed` prende-se ao _viewport_. **Flexbox** dispõe itens num eixo principal, com `justify-content` nesse eixo e `align-items` no transversal. **Grid** define linhas e colunas para composições bidimensionais. Uma _media query_ adapta o layout ao espaço disponível; verifica também conteúdo longo, zoom e ecrãs estreitos. Vê [flex e grid](/cadeiras/ltw/css-estilo-layout/#dispor-cartões-com-flexbox-e-grelha) e [media queries](/cadeiras/ltw/css-estilo-layout/#desenho-responsivo-com-media-queries).

## PHP e estado do pedido

PHP corre no servidor e gera uma resposta, muitas vezes HTML. Cada pedido HTTP é independente: para guardar estado entre pedidos, a aplicação usa mecanismos como sessões, associadas a um identificador enviado pelo navegador. Lê entrada de `$_GET` ou `$_POST` conforme o método e valida **tipo, formato e autorização** antes de a usar. `$_SESSION` contém dados do lado do servidor depois de iniciar a sessão; não trates o identificador de sessão como prova suficiente de autorização para qualquer ação. Vê [primeiro script](/cadeiras/ltw/php-dinamicas-bd/#o-primeiro-script) e [sessões](/cadeiras/ltw/php-dinamicas-bd/#sessões-e-login).

Ao aceder a uma base de dados, passa valores por parâmetros de uma instrução preparada; nunca constróis SQL com entrada colada numa string. Ao mostrar texto não confiável em HTML, escapa-o para o contexto de saída. Estas regras são necessárias para usar os exemplos do PDF em projetos reais; o PDF não desenvolve a análise de segurança. Vê [acesso à BD](/cadeiras/ltw/php-dinamicas-bd/#ler-produtos-do-sqlite) e [injeção SQL](/cadeiras/ltw/seguranca-web/#injeção-sql-nunca-colar-entrada-no-sql).

## JavaScript, DOM e eventos

Em JavaScript, `const` impede reatribuir a variável, não congela o objeto. `let` permite reatribuição; evita `var` quando o âmbito de bloco é o pretendido. `===` compara sem conversão implícita de tipos; `==` pode converter operandos. Arrays guardam elementos ordenados; objetos agrupam propriedades; `Map` mantém associações chave-valor e `Set` valores únicos. Uma _closure_ retém acesso ao ambiente léxico da função que a criou. Vê [sintaxe JavaScript](/cadeiras/ltw/javascript-dom-eventos/#sintaxe-sem-surpresas-quase).

O DOM representa o documento como nós. Seleciona com `querySelector` ou `querySelectorAll`, altera `textContent` para texto e cria nós com `createElement`/`append` quando precisares de estrutura. `innerHTML` interpreta marcação e exige tratamento explícito de conteúdo não confiável. Num evento, `event.target` é a origem e `event.currentTarget` o elemento cujo listener está a correr; a propagação permite delegar eventos num ancestral estável. `preventDefault()` cancela a ação padrão quando o evento é cancelável; não pára a propagação. Vê [DOM](/cadeiras/ltw/javascript-dom-eventos/#mexer-na-página-pelo-dom) e [eventos](/cadeiras/ltw/javascript-dom-eventos/#a-propagação-dos-eventos).

Uma operação assíncrona não termina necessariamente antes da próxima linha de código. A nota final do PDF menciona pedidos Ajax e temporizadores; em código atual, `fetch()` devolve uma promessa. Verifica `response.ok`, trata erros e atualiza apenas o DOM necessário quando os dados chegarem. Vê [pesquisa com fetch](/cadeiras/ltw/http-ajax-json/#pesquisa-com-fetch-sem-recarregar), que desenvolve este tema além do PDF.

O PDF é um apoio parcial. Confirma a matéria e os critérios da edição que estás a frequentar.
