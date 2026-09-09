---
title: Fundamentos de IHC
description: O que é a interação pessoa computador, porque importa e o vocabulário de UI e UX.
section: conteudo
order: 1
---

A **interação pessoa computador** (IHC, do inglês HCI) estuda como as pessoas usam tecnologia e como desenhar sistemas que se deixem usar bem. Repara na ordem das palavras: começa na pessoa, não no computador. A pergunta central nunca é "o que o sistema faz", é "o que a pessoa consegue fazer com o sistema, com quanto esforço e com quantos erros".

## Porque é que isto importa

Uma má interface não é só feia; custa dinheiro, tempo e por vezes segurança. Um formulário de candidatura que rejeita silenciosamente um campo mal preenchido faz o candidato desistir. Um painel de controlo com dois botões parecidos para "guardar" e "apagar" vai apagar dados um dia. Um sistema hospitalar que obriga a dez cliques para registar uma dose vai gerar atalhos perigosos. Em todos os casos o software "funcionava"; o que falhou foi a interação.

Dois termos que vais usar sempre:

- **UI** (_user interface_) é a superfície de contacto: ecrãs, botões, menus, sons, gestos. É o que se vê e toca.
- **UX** (_user experience_) é a experiência total de usar o sistema: se foi fácil, rápido, agradável, se inspirou confiança. Uma UI bonita pode dar má UX se o fluxo for confuso.

Dizer "a app tem bom UI" quando queres dizer que é fácil de usar é o erro de vocabulário mais comum. Guarda a distinção: UI desenha-se, UX sente-se e mede-se.

## Uma história muito curta

Nos anos 70, usar um computador era escrever comandos decorados. O rato e as janelas (Xerox PARC, depois Apple Macintosh) mostraram que manipular objetos visíveis era mais fácil do que decorar sintaxe. Nos anos 90, a Web pôs interfaces nas mãos de toda a gente e os erros de usabilidade passaram a custar vendas. Nos anos 2000, os telemóveis com ecrã tátil trocaram precisão por gestos e contexto de uso em movimento. Cada salto repetiu a lição: a tecnologia muda, as pessoas continuam com a mesma atenção limitada e a mesma impaciência.

## Exemplo: a máquina de bilhetes

Imagina o painel de uma máquina de bilhetes de transportes com três falhas típicas:

1. O botão "Comprar" e o botão "Cancelar" têm o mesmo tamanho, a mesma cor e ficam lado a lado. O utilizador apressado carrega no vizinho errado e perde a compra.
2. Depois de escolher o destino, o ecrã volta ao início sem explicar porquê (o tempo esgotou). O utilizador repete os mesmos passos, sem saber o que falhou.
3. O preço final só aparece depois de inserir as moedas. Se for mais caro do que esperava, já investiu tempo e trocos no processo.

Cada falha mapeia um conceito que vais estudar: a primeira é falta de prevenção de erros e de distinção visual; a segunda é falta de feedback e de visibilidade do estado; a terceira esconde informação necessária à decisão. Repara que nenhuma exige código para diagnosticar. Olhar crítico para interfaces é a primeira competência da cadeira, e treina-se em qualquer ecrã.

:::tip[Como analisar uma interface]
Descreve primeiro a tarefa do utilizador em uma frase ("comprar um bilhete simples de ida"). Depois percorre o fluxo como se fosses essa pessoa, com pressa e sem ler manuais. Cada hesitação, cada passo que exige adivinhar e cada erro sem recuperação clara é uma falha a registar. Vais formalizar isto com as [heurísticas de Nielsen](principios-usabilidade/).
:::

## Para levar para a próxima página

Más interfaces custam esforço, erros e desistências, e a cura começa por olhar para a pessoa antes do sistema. Mas para desenhar para pessoas é preciso saber como elas veem, prestam atenção e memorizam. Isso é a [perceção e cognição](percepcao-cognicao/).
