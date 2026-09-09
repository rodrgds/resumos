---
title: Polimorfismo e classes de tipos
description: Tipos polimórficos, restrições de classe e leitura de assinaturas no GHCi.
section: conteudo
order: 2
---

Em Python, `len` funciona em listas, strings e tuplos sem prometer nada sobre o conteúdo. Em Haskell, essa generalidade escreve-se no tipo. Há duas formas: o **polimorfismo paramétrico**, que funciona para qualquer tipo sem olhar para os valores, e as **classes de tipos**, que exigem uma capacidade específica, como comparar por igualdade.

## Paramétrico: funciona para tudo

```haskell
primeiro :: [a] -> a
primeiro (x:xs) = x
```

A letra `a` minúscula é uma **variável de tipo**: `primeiro` recebe uma lista de qualquer coisa e devolve um elemento desse mesmo tipo. O compilador confirma no GHCi:

```text
ghci> :t length
length :: [a] -> Int
```

`length` conta elementos de qualquer lista sem olhar para eles, por isso o tipo não restringe `a`. A regra de ouro: uma variável de tipo que aparece várias vezes tem de ser instanciada com o mesmo tipo concreto em cada uso. É por isso que `primeiro [1, 'a']` nem compila: a lista teria de ser `[Int]` e `[Char]` ao mesmo tempo.

## Classes: funciona para quem sabe fazer

Comparar por igualdade não dá para todos os tipos (funções, por exemplo, não se comparam). A restrição escreve-se antes de `=>`:

```haskell
contem :: Eq a => a -> [a] -> Bool
contem x xs = x `elem` xs
```

Lê-se: para qualquer tipo `a` que pertença à classe `Eq`, `contem` recebe um `a` e uma lista de `a` e devolve `Bool`. No GHCi:

```text
ghci> :t (==)
(==) :: Eq a => a -> a -> Bool
```

O `(==)` entre parênteses é o operador usado como função. `contem 3 [1,2,3]` dá `True`; `contem 'a' "ola"` dá `True`, porque `Char` também pertence a `Eq`. Se tentares `contem length [length]`, o compilador recusa: funções não têm instância de `Eq`.

## As classes que vais encontrar

| Classe | Capacidade | Exemplos de membros |
| ------ | ---------- | ------------------- |
| `Eq` | comparar com `==` e `/=` | `Int`, `Char`, `Bool`, listas deles |
| `Ord` | ordenar com `<`, `>`, `compare` | `Int`, `Double`, `String` |
| `Show` | converter para string | quase todos (é o que o GHCi usa para imprimir) |
| `Num` | aritmética com `+`, `*`, `-` | `Int`, `Integer`, `Double` |
| `Integral` | inteiros com `div` e `mod` | `Int`, `Integer` |
| `Fractional` | reais com `/` | `Double` |

Repara que `Ord` implica `Eq` e `Num` implica `Eq`: para ordenar é preciso comparar igualdade, e a hierarquia reflete isso. Quando vires uma assinatura com várias restrições, como `(Ord a, Show a) => ...`, lê como uma lista de capacidades exigidas.

:::warning[O erro clássico de `Num`]
Um literal como `3` tem tipo `Num a => a`: pode ser qualquer tipo numérico. Por isso `length [1,2] + 0.5` falha: o `+` exige os dois lados do mesmo tipo, mas `length` devolve `Int` e `0.5` é `Fractional`. A cura é converter explicitamente, como vais ver na página de [ordem superior](funcoes-ordem-superior/) com `fromIntegral`.
:::
