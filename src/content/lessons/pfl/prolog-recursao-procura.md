---
title: Recursão, corte e procura em Prolog
description: Listas e aritmética com is, corte verde, findall e um labirinto por procura em profundidade.
section: conteudo
order: 8
---

Com factos, regras e unificação já respondes a queries sobre relações. Falta o resto do kit: **listas** para coleções, **aritmética** para contas, o **corte** para podar a procura, o **`findall`** para juntar todas as respostas, e a **procura** propriamente dita. É a [recursão](/cadeiras/fp/recursao/) outra vez, agora com cláusulas em vez de equações.

## Listas e aritmética

Listas usam `[Cabeça|Cauda]`, como o `(x:xs)` do Haskell. Somar uma lista é caso base mais passo recursivo:

```prolog
soma([], 0).
soma([H|T], S) :- soma(T, R), S is H + R.
```

A query `?- soma([1,2,3], S).` resolve `soma([2,3], R)`, depois `soma([3], R)`, até `soma([], 0)`, e no regresso calcula `S is 3 + 0`, depois `2 + 3`, depois `1 + 5`: `S = 6`. O **`is`** avalia o lado direito como expressão aritmética e unifica com a esquerda; sem ele, `S = H + R` ligaria `S` à expressão por avaliar, não ao número. Regra prática: tudo o que é conta usa `is`, e todas as variáveis do lado direito têm de estar ligadas quando ele corre.

## Corte e findall

Por omissão, o Prolog explora todas as alternativas ao pedir mais soluções. O **corte**, `!`, poda: descarta as alternativas daquela cláusula a partir dali.

```prolog
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).
```

Com o corte, `max(3, 5, M)` usa a primeira cláusula, falha no teste, e o corte nunca chega a correr; a segunda dá `M = 5`. Com `max(7, 5, M)`, o teste passa, o corte elimina a segunda cláusula, e `M = 7` sem deixar alternativa pendente. Este é um **corte verde**: só remove soluções redundantes, não muda as respostas. Um corte que mude respostas é vermelho, e é fonte clássica de erros.

Para juntar **todas** as respostas numa lista em vez de as pedir uma a uma, usa `findall`:

```prolog
?- findall(C, pai(ana, C), Cs).
Cs = [leo].
```

O segundo argumento é o objetivo, o primeiro diz o que colecionar de cada solução. Com os factos da [página anterior](logica-unificacao-prolog/), só `leo` é filho da Ana.

## Exemplo completo: sair do labirinto

Modela o labirinto como ligações e procura um caminho acumulando visitados para não andar em círculos:

```prolog
ligado(a, b). ligado(b, c). ligado(b, d). ligado(c, e). ligado(d, e).

caminho(X, X, _, [X]).
caminho(X, Z, Visitados, [X|Resto]) :-
  ligado(X, Y),
  \+ member(Y, Visitados),
  caminho(Y, Z, [Y|Visitados], Resto).
```

(`member/2` vem de `library(lists)`; em SICStus carrega-se com `:- use_module(library(lists)).`.) A query `?- caminho(a, e, [a], C).` faz **procura em profundidade**: de `a` vai a `b` (única saída); de `b` tenta `c` primeiro (ordem das cláusulas); de `c` chega a `e`, que unifica com o caso base. Responde `C = [a, b, c, e]`, e ao pedir mais soluções retrocede até `b`, tenta `d`, e encontra o segundo caminho `[a, b, d, e]`.

Repara nos três travões que impedem a procura de se perder: a lista de visitados com negação (não revisita), o caso base (para ao chegar), e a ordem das cláusulas (decide que caminho sai primeiro). Quando um programa de procura entra em ciclo, um destes três é quase sempre o culpado.
