---
title: Fases de um compilador
description: O pipeline da compilação, o que cada fase recebe e produz, e o percurso de uma atribuição até ao código objeto.
section: conteudo
order: 1
---

Um compilador não traduz o programa de uma vez: organiza o trabalho em **fases**, cada uma com uma entrada e uma saída bem definidas. Esta separação é o que permite raciocinar sobre o programa a níveis diferentes, do texto à máquina. Vamos seguir a linha `x = a + b * 2` e ver quem trata de cada passo.

## O pipeline

As fases clássicas, por ordem:

1. **Análise lexical**: agrupa caracteres em símbolos (_tokens_).
2. **Análise sintática**: organiza os símbolos numa árvore sintática.
3. **Análise semântica**: verifica tipos, declarações e âmbitos.
4. **Geração de código intermédio**: traduz a árvore para uma representação simples.
5. **Otimização**: transforma o código sem mudar o significado.
6. **Geração de código objeto**: emite instruções da máquina alvo e gere registos.

Há ainda duas estruturas transversais: a **tabela de símbolos**, que guarda o que se sabe sobre cada nome, e o tratamento de erros, que cada fase deve reportar com posição e mensagem útil.

## Seguir `x = a + b * 2`

O analisador lexical lê os caracteres e devolve símbolos: `ID(x)`, `=`, `ID(a)`, `+`, `ID(b)`, `*`, `NUM(2)`. Repara que `b * 2` ainda não foi calculado: o léxico só classifica, não interpreta.

O analisador sintático consome os símbolos segundo a gramática e constrói a árvore: a raiz é a atribuição a `x`, com o filho `+` a somar `a` ao produto `b * 2`. A precedência do `*` sobre o `+` fica gravada na forma da árvore, como viste nas [gramáticas livres](/cadeiras/tc/gramaticas-livres/).

A análise semântica consulta a tabela de símbolos: `x`, `a` e `b` estão declarados? Têm tipos compatíveis com `+` e `*`? Se `b` for um vetor, aqui nasce um erro de tipo, com a linha e a coluna da ficha do símbolo.

O gerador de código intermédio traduz a árvore para instruções simples de três endereços:

```
t1 = b * 2
t2 = a + t1
x = t2
```

O otimizador pode dobrar constantes ou propagar cópias. Por fim, o gerador de código objeto escolhe instruções da máquina alvo, decide que valores vivem em registos e emite o código final, por exemplo para a JVM no caso do projeto.

## Para levar para a próxima página

Cada fase fala uma linguagem diferente: caracteres, símbolos, árvores, código de três endereços, instruções. A [análise lexical](analise-lexica/) é a primeira fronteira, onde as [expressões regulares](/cadeiras/tc/linguagens-expressoes/) se transformam em reconhecedores automáticos.
