---
title: Lógica, unificação e execução em Prolog
description: Cláusulas de Horn, unificação passo a passo, resolução SLD e negação por falha.
section: conteudo
order: 7
---

Em Prolog não escreves como calcular. Declaras **factos** (o que é verdade) e **regras** (o que se conclui), fazes uma **query**, e o motor procura a resposta por ti. O programa é uma base de conhecimento; a execução é procura com retrocesso. A lógica por baixo é a [lógica proposicional e de predicados](/cadeiras/md/logica-proposicional/) de MD, restrita a **cláusulas de Horn**: no máximo um literal positivo, o que torna a procura tratável.

## Factos, regras e queries

```prolog
pai(tomas, ana).
pai(ana, leo).
pai(leo, rui).
avo(X, Z) :- pai(X, Y), pai(Y, Z).
```

As três primeiras linhas são factos: Tomás é pai da Ana, e por aí fora. A última é uma regra, lida "X é avô de Z **se** X é pai de Y **e** Y é pai de Z". As maiúsculas são **variáveis** (por preencher); as minúsculas são **átomos** (valores concretos). A query `?- avo(ana, X).` pede os X que satisfazem a relação, e o Prolog responde `X = rui`.

## Unificação

Antes de procurar, o motor precisa de casar termos. **Unificar** dois termos é encontrar a substituição mínima de variáveis que os torna iguais:

- `pai(ana, X)` com `pai(ana, leo)` unifica com `{X/leo}`.
- `pai(X, leo)` com `pai(ana, leo)` unifica com `{X/ana}`.
- `pai(X, leo)` com `pai(tomas, ana)` falha: `leo` nunca iguala `ana`, e nenhuma substituição muda átomos.

A substituição aplica-se a toda a query de uma vez, o que propaga cada descoberta a todos os lugares onde a variável aparece. É este mecanismo, e não atribuição, que move valores pelo programa.

## Resolução SLD passo a passo

Para responder `?- avo(ana, X).`, o motor constrói uma **árvore de procura**. Segue o ramo de sucesso:

1. A query unifica com a cabeça da regra `avo(X', Z')`, com `{X'/ana, Z'/X}`. Restam os subobjetivos `pai(ana, Y), pai(Y, X)`.
2. `pai(ana, Y)` unifica com o facto `pai(ana, leo)`: `{Y/leo}`. Resta `pai(leo, X)`.
3. `pai(leo, X)` unifica com `pai(leo, rui)`: `{X/rui}`. Não resta nada: sucesso, e a resposta compõe as substituições, `X = rui`.

Se pedires mais soluções (`;`), o motor faz **retrocesso**: volta ao último ponto com alternativas por explorar. Aqui não há mais factos `pai(ana, _)` nem `pai(leo, _)`, por isso responde `false`. Desenhar esta árvore é a técnica de estudo da página: quando o programa diz `false` onde esperavas resposta, o desenho mostra o ramo que morreu e a cláusula em falta.

## Negação por falha

`\+ Objetivo` sucede quando o objetivo **não se prova**:

```prolog
?- \+ pai(rui, _).
true.
```

Não há facto com `rui` como pai, a prova falha finitamente, e a negação sucede. Isto é "negação por falha", não negação lógica: o motor não prova que é falso, constata que não consegue provar que é verdade.

:::warning[Variáveis livres na negação]
`?- \+ pai(X, leo).` responde `false`, e não "ninguém". Como `pai(ana, leo)` prova-se com `X = ana`, a negação falha, e o `X` fica por ligar. Regra prática: só nega objetivos sem variáveis por preencher, ou liga-as antes. Este é o erro mais traiçoeiro dos primeiros programas.
:::
