---
title: Álgebra relacional
description: Seleção, projeção, junções e conjuntos para formalizar perguntas.
section: conteudo
order: 5
---

Antes do `SELECT` houve a matemática. A **álgebra relacional** é a linguagem formal de perguntas sobre tabelas: cada operador recebe relações e devolve uma relação, por isso os operadores **encadeiam-se** como funções. Percebê-la é perceber o que cada cláusula do SQL faz, e a cadeira pede-a explicitamente.

## Os operadores essenciais

Sobre uma tabela `Produto(id, nome, preco, stock)`:

- **Seleção** $\sigma_{cond}(R)$: filtra linhas. $\sigma_{preco > 30}(Produto)$ devolve Teclado e Monitor.
- **Projeção** $\pi_{cols}(R)$: escolhe colunas. $\pi_{nome, preco}(Produto)$ devolve os três nomes com preços.
- **Produto cartesiano** $R \times S$: combina cada linha de uma com cada linha da outra.
- **Junção natural** $R \bowtie S$: combina pelas colunas de nomes iguais, fundindo-as. É o produto cartesiano seguido da igualdade nas colunas comuns, sem as colunas duplicadas.
- **União** $R \cup S$, **interseção** $R \cap S$ e **diferença** $R - S$: operações de conjuntos, que exigem tabelas compatíveis (mesmas colunas).

A ordem clássica é filtrar antes de juntar: $\sigma$ reduz as linhas, $\bowtie$ combina, $\pi$ corta as colunas no fim.

## Uma pergunta completa

"Nome dos clientes com encomendas em 2026-01-05." Primeiro filtra as encomendas, junta com os clientes e projeta o nome:

$$\pi_{nome}(\sigma_{data = '2026-01-05'}(Encomenda) \bowtie Cliente)$$

Passo a passo com os dados da loja: a seleção deixa só a encomenda 100 (data 2026-01-05, cliente 1). A junção com `Cliente` pela coluna comum `idCliente = id` acrescenta a linha da Ana. A projeção final devolve uma tabela de uma coluna e uma linha: `Ana`. Cada operador intermédio é uma tabela válida, e é por isso que podes ler a expressão de dentro para fora a verificar cada etapa.

:::tip[Como traduzir para SQL]
Cada operador tem a sua cláusula: $\sigma$ é o `WHERE`, $\pi$ é a lista do `SELECT`, $\bowtie$ é o `JOIN ... ON` ou `USING`, e $-$ é `EXCEPT`. Se souberes escrever a pergunta em álgebra, a página de [consultas SQL](sql-consultas/) é transcrição quase direta.
:::
