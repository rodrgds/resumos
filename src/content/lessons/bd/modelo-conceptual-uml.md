---
title: Modelo conceptual em UML
description: Classes, atributos, associações, multiplicidades e chaves no diagrama de classes.
section: conteudo
order: 1
---

Antes de criar uma tabela, é preciso decidir que coisas existem no problema e como se relacionam. O **modelo conceptual** regista essas decisões sem pensar ainda em tabelas: que entidades há, que propriedades tem cada uma e que ligações existem entre elas. A linguagem da cadeira para o desenhar é o diagrama de classes **UML** (_Unified Modeling Language_).

## Classes e atributos

Uma **classe** é um tipo de coisa do problema, como `Cliente` ou `Produto`. Cada classe tem **atributos**, as propriedades que queremos guardar: `Cliente` tem `nome` e `email`, `Produto` tem `nome`, `preco` e `stock`. Cada objeto concreto, a Ana ou o Teclado, é uma **instância** com um valor em cada atributo.

Um ou mais atributos identificam cada instância sem ambiguidade e formam a **chave**: o `id` do cliente, o `id` do produto. Marca a chave no diagrama (convenção: sublinhado ou estereótipo `<<PK>>`), porque tudo o resto, das associações à normalização, depende de saberes o que identifica o quê. Atributos como o nome do cliente não servem de chave: dois clientes podem chamar-se igual.

## Associações e multiplicidades

Uma **associação** liga duas classes: um cliente _faz_ encomendas, uma encomenda _contém_ produtos. A **multiplicidade** diz quantos de cada lado participam, e é a decisão mais importante do diagrama:

- `1`: exatamente um. Cada encomenda pertence a exatamente um cliente.
- `0..1`: zero ou um. Um produto pode estar sem encomenda nenhuma.
- `*`: zero ou mais. Um cliente pode ter zero, uma ou muitas encomendas.
- `1..*`: uma ou mais.

Lê-se cada direção separadamente. "Um cliente faz `*` encomendas; cada encomenda é feita por `1` cliente" descreve uma associação **um para muitos**. "Uma encomenda contém `1..*` produtos; cada produto aparece em `*` encomendas" descreve **muitos para muitos**. Errar a multiplicidade é o erro clássico: se disseres que cada encomenda tem um só produto, o modelo já não representa a loja.

Associações muitos para muitos guardam quase sempre dados próprios, como a quantidade de cada produto na encomenda. Essa associação com atributos, a classe associativa `ItemEncomenda` com `qtd`, vai dar origem a uma tabela própria no esquema relacional.

## O diagrama da loja

Junta as peças no cenário da [apresentação](index/):

```
Cliente(<<PK>> id, nome, email)
  "1" ---- faz ---- "*" Encomenda(<<PK>> id, data)

Encomenda "*" ---- contém ---- "1..*" Produto(<<PK>> id, nome, preco, stock)
  classe associativa: ItemEncomenda(qtd)
```

Lê a segunda associação com atenção: cada encomenda contém pelo menos um produto (`1..*`), cada produto pode não estar em encomenda nenhuma (`*`), e a quantidade vive na classe associativa. Pergunta de teste típica: "um produto sem encomendas viola o diagrama?" Não, porque o lado do produto admite zero. "Uma encomenda sem produtos?" Sim, viola o `1..*`.

:::tip[Como validar um diagrama]
Para cada associação, inventa um caso concreto e testa as duas direções: "a Ana tem duas encomendas, ok; a encomenda 100 tem dois donos, proibido". Se um caso realista da loja for proibido pelo diagrama, ou um absurdo for permitido, a multiplicidade está errada.
:::

## Para levar para a próxima página

O diagrama diz _o quê_, mas o SQLite só percebe tabelas. A página sobre [mapeamento relacional](mapeamento-relacional/) converte cada classe e cada associação em tabelas com chaves primárias e estrangeiras, incluindo a tabela que nasce da classe associativa.
