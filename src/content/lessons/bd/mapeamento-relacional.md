---
title: Do UML ao esquema relacional
description: Mapear classes e associações para tabelas, chaves primárias e estrangeiras.
section: conteudo
order: 2
---

O **esquema relacional** é a tradução do diagrama UML para tabelas: cada tabela tem colunas, cada linha é uma instância e as ligações entre tabelas fazem-se com chaves. Há uma regra de tradução para cada construção do diagrama, e aplicá-las mecanicamente dá o esquema certo.

## A regra base e as chaves

Cada classe vira uma tabela com os seus atributos como colunas. A chave da classe vira a **chave primária** (_primary key_, PK): a coluna, ou combinação, que identifica cada linha e nunca se repete nem é nula. Uma **chave estrangeira** (_foreign key_, FK) é uma coluna que guarda a chave primária de outra tabela, criando a ligação entre as linhas.

Para a loja:

```
Cliente(id, nome, email)          -- PK: id
Produto(id, nome, preco, stock)   -- PK: id
```

## Associações um para muitos

A associação um para muitos traduz-se com uma chave estrangeira do lado **muitos**. Cada encomenda tem um cliente, por isso a tabela `Encomenda` ganha a coluna `idCliente` a apontar para `Cliente(id)`:

```
Encomenda(id, data, idCliente)    -- PK: id; FK: idCliente -> Cliente(id)
```

Não ponhas a estrangeira do outro lado: uma coluna `idEncomenda` em `Cliente` só guardaria uma encomenda por cliente e estragava o `*`. A regra é sempre esta: a FK vive na tabela do lado muitos e aponta para a PK do lado um.

## Muitos para muitos e um para um

Muitos para muitos não cabem numa estrangeira e exigem uma **tabela própria**, que é a classe associativa do diagrama com as duas chaves mais os seus atributos:

```
Item(idEncomenda, idProduto, qtd) -- PK: (idEncomenda, idProduto)
   FK: idEncomenda -> Encomenda(id); FK: idProduto -> Produto(id)
```

A chave primária é o par: a mesma encomenda pode ter vários produtos e o mesmo produto pode estar em várias encomendas, mas cada par aparece uma vez. A quantidade `qtd` vive aqui porque depende do par, não de cada lado isolado.

Associações um para um traduzem-se com uma estrangeira de um dos lados marcada como única, ou fundindo as duas tabelas numa só quando a participação é obrigatória dos dois lados.

## Conversão completa da loja

Aplicando as três regras ao diagrama da página anterior:

```
Cliente(id, nome, email)
Produto(id, nome, preco, stock)
Encomenda(id, data, idCliente -> Cliente)
Item(idEncomenda -> Encomenda, idProduto -> Produto, qtd)
```

Confere com os dados da apresentação: a encomenda 100 tem `idCliente = 1` (a Ana), e a linha `(100, 10, 2)` diz que ela leva 2 Teclados. Repara que nada se repete: o nome da Ana está só em `Cliente`, o preço do Teclado só em `Produto`. Essa ausência de repetição é o que a [normalização](normalizacao/) vai formalizar e verificar.

:::warning[O erro mais comum]
Criar a tabela da associação muitos para muitos com uma PK artificial e sem unicidade no par. Se `Item` tivesse `id` próprio sem restrição única em `(idEncomenda, idProduto)`, nada impediria duas linhas iguais para o mesmo par e a quantidade deixava de fazer sentido.
:::
