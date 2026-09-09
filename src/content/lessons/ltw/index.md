---
title: Linguagens e Tecnologias Web
description: HTML, CSS, PHP, JavaScript, HTTP, segurança, expressões regulares e XML para construir sítios dinâmicos.
section: conteudo
order: 0
---

Linguagens e Tecnologias Web é a cadeira onde aprendes a construir sítios a sério: páginas bem estruturadas, com estilo próprio, que reagem no navegador e vão buscar dados a um servidor com base de dados. Vens de [programação procedimental](/cadeiras/fp/) em Python e de [C++](/cadeiras/p/) com tipos estáticos; aqui vais trabalhar com linguagens de tipagem dinâmica como PHP e JavaScript, onde as mesmas ideias de funções, parâmetros e erros aparecem com regras mais soltas e armadilhas novas.

## Como está organizado

O fio condutor destas páginas é uma pequena mercearia em linha: uma lista de produtos guardada numa base de dados SQLite, uma página que a mostra, pesquisa que filtra sem recarregar e um login para o dono da loja. Vais reencontrar este cenário em várias páginas, sempre com um pedaço novo.

Começa por [HTML e estrutura semântica](html-estrutura/), que monta o esqueleto da página de produto com formulário acessível e validação. Depois, [CSS, caixa e layout](css-estilo-layout/) veste esse esqueleto com seletores, flexbox, grelha e desenho responsivo.

A terceira parte põe o servidor a trabalhar: [PHP e páginas dinâmicas com base de dados](php-dinamicas-bd/) lê os produtos do SQLite, trata parâmetros e sessões, e organiza o código com includes. A quarta parte corre no navegador: [JavaScript no cliente e DOM](javascript-dom-eventos/) manipula a página por eventos e valida formulários.

Segue-se a conversa entre os dois lados: [HTTP, pedidos e Ajax](http-ajax-json/) lê pedidos e respostas, usa REST e JSON e implementa a pesquisa com `fetch`. Depois, [Segurança web](seguranca-web/) corrige a loja contra injeção SQL, XSS e CSRF. Por fim, duas ferramentas transversais: [Expressões regulares](expressoes-regulares/) para validar e limpar texto, e [XML e XPath](xml-xpath/) para representar e consultar dados em XML.

## Como estudar

Lê cada página com o editor aberto e um servidor local a correr. Em LTW, ler o exemplo não chega: escreve o código, abre a página no navegador, abre as ferramentas de desenvolvimento e vê o que viaja na rede. Quando algo falhar, decide primeiro de que lado está o erro: inspeciona o HTML e a consola no cliente, e imprime os parâmetros recebidos no servidor. Mete um erro de propósito, como um parâmetro em falta, e confirma que a tua página trata esse caso em vez de partir.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes o peso do exame e do trabalho laboratorial, as notas mínimas e as regras do projeto.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Linguagens e Tecnologias Web (L.EIC019) do 2.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: HTML 5 e CSS 3, a linguagem PHP, JavaScript do lado do cliente, o protocolo HTTP, segurança web, expressões regulares, e XML com XPath. O software indicado na ficha é o sqlite3 e o PHP 7.4.

Material oficial da FEUP:

- Ficha da unidade curricular de Linguagens e Tecnologias Web, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560104).
