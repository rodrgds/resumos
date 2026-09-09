---
title: Armazéns de dados e NoSQL
description: Modelo multidimensional, OLAP e quando trocar o relacional.
section: conteudo
order: 9
---

O modelo relacional foi desenhado para o dia a dia da loja: registar cada venda depressa e sem contradições (o mundo **OLTP**). Mas responder a "como evoluíram as vendas por categoria e mês no último ano" sobre esse esquema é juntar quatro tabelas e agregar milhões de linhas. Para análise há um modelo próprio, e para dados sem esquema fixo há outro. Saber escolher entre os três é o último resultado de aprendizagem da cadeira.

## Armazém de dados e OLAP

Um **armazém de dados** (_data warehouse_) copia periodicamente os factos operacionais para um esquema otimizado para leitura e análise (**OLAP**). A organização típica é em **estrela**: uma tabela de factos central com medidas (quantidade, valor) rodeada de tabelas de dimensões (tempo, produto, cliente, loja). A pergunta anual acima vira uma agregação direta sobre a estrela, sem junções de normalização pelo caminho.

O preço é claro: os dados do armazém têm a idade da última carga, nunca o segundo atual, e manter dois sistemas custa. Usa armazém quando as perguntas são analíticas, agregadas e históricas; mantém o relacional para o registo operacional do momento.

## NoSQL em quatro sabores

**NoSQL** não é "sem SQL" por capricho: é abdicar do esquema rígido e, muitas vezes, de parte do ACID em troca de escala ou flexibilidade. As quatro famílias:

- **Chave-valor**: um dicionário gigante distribuído. Serve para sessões, carrinhos e caches, onde cada acesso é por chave exata.
- **Documento**: objetos semiestruturados, como JSON, com esquema flexível por documento. Serve para catálogos e perfis, onde cada registo tem campos próprios.
- **Colunar**: tabelas por colunas em vez de linhas, ótimas para agregar uma coluna sobre milhões de linhas. Serve para telemetria e analítica.
- **Grafo**: nós e arestas como cidadãos de primeira classe. Serve para redes sociais e recomendações, onde as perguntas são sobre ligações.

## A tabela de decisão

| Situação                                             | Escolha             | Porquê                                                          |
| ---------------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| Registar vendas da loja sem contradições             | Relacional          | Integridade e transações por cada escrita                       |
| Relatório anual de vendas por mês e categoria        | Armazém de dados    | Agregações históricas sobre a estrela, sem pesar no operacional |
| Catálogo onde cada produto tem atributos próprios    | Documento (NoSQL)   | Esquema flexível, sem colunas nulas para todos                  |
| Carrinho de compras com milhões de acessos por chave | Chave-valor (NoSQL) | Leitura e escrita por chave a grande escala                     |

A pergunta de teste típica dá-te um cenário e pede a escolha justificada: identifica primeiro o padrão de acesso (escritas com integridade, análise agregada ou escala sem esquema) e só depois casa com a coluna da esquerda. E quando o cenário mistura os dois mundos, como a loja real, a resposta honesta é híbrida: relacional para operar, armazém para analisar.
