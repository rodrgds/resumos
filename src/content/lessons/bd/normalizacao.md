---
title: Normalização e formas normais
description: Dependências funcionais, anomalias, 1FN a 3FN e Boyce-Codd com decomposição.
section: conteudo
order: 3
---

Uma tabela mal desenhada repete factos: o nome do cliente em cada encomenda, o preço do produto em cada linha vendida. A repetição traz **anomalias**: para mudar o preço tens de atualizar N linhas (atualização), não consegues registar um produto ainda sem vendas (inserção) e apagar a última venda apaga o produto (eliminação). A **normalização** remove a redundância decompondo tabelas, e as **formas normais** dizem quando parar.

## Dependências funcionais

Uma **dependência funcional** (FD) `X -> Y` diz que o valor de `X` determina o de `Y`: linhas com o mesmo `X` têm obrigatoriamente o mesmo `Y`. Na loja: `idCliente -> nomeCliente` (o id determina o nome) e `idProd -> nomeProd, preco`. Uma **chave** (ou superchave mínima) é um conjunto de colunas que determina todas as outras: em `Item`, só o par `(idEncomenda, idProduto)` determina a quantidade.

Para testar formas normais, primeiro lista as FDs e descobre as chaves. Tudo o resto é mecânico.

## As formas, por ordem

Supõe esta tabela única, com a chave `(idEnc, idProd)`:

```
Vendas(idEnc, dataEnc, idCliente, nomeCliente, idProd, nomeProd, preco, qtd)
```

- **1FN**: cada célula tem um valor atómico, sem listas nem grupos repetidos. Assume-se cumprida.
- **2FN**: nenhum atributo fora da chave depende de *parte* da chave. Falha aqui: `idEnc -> dataEnc` e `idProd -> nomeProd, preco` usam só metade da chave. São **dependências parciais**.
- **3FN**: nenhum atributo fora da chave depende de outro atributo fora da chave. Mesmo depois de resolver as parciais, `idCliente -> nomeCliente` seria uma **dependência transitiva** se `idCliente` não fosse chave.
- **Boyce-Codd (BCNF)**: todo o determinante de uma FD não trivial é superchave. É a versão sem exceções da 3FN: em BCNF, cada seta parte de uma (super)chave.

## Decompor até BCNF

Parte a tabela pelas FDs problemáticas, uma de cada vez, até cada tabela ter só setas a partir de chaves:

```
Cliente(idCliente, nomeCliente)        -- idCliente -> nomeCliente, é chave: ok
Produto(idProd, nomeProd, preco)       -- idProd -> ..., é chave: ok
Encomenda(idEnc, dataEnc, idCliente)   -- idEnc -> ..., é chave: ok
Item(idEnc, idProd, qtd)               -- (idEnc, idProd) -> qtd, é chave: ok
```

Cada facto vive num sítio só: o preço do Teclado está apenas em `Produto`. Mudar o preço é uma atualização; registar um produto sem vendas é uma inserção em `Produto`; apagar encomendas nunca apaga produtos. As três anomalias desapareceram, e o resultado é exatamente o esquema do [mapeamento](mapeamento-relacional/). Quando o UML está bem feito, o mapeamento já sai normalizado; a normalização é a prova de que está, e a rede de segurança quando o diagrama nasceu torto.

:::tip[Como cai isto em teste]
O enunciado dá-te uma tabela e as FDs. O método: sublinha a chave, marca cada FD como total, parcial ou transitiva, classifica a forma normal mais alta que passa e decompõe pela primeira FD que falha, repetindo até tudo passar. Mostra sempre as chaves das tabelas resultantes, porque é nelas que o corretor confirma BCNF.
:::
