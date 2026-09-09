---
title: Lambda, currying e ordem superior
description: Aplicação parcial, secções de operadores e pipelines com map, filter e foldr.
section: conteudo
order: 3
---

Toda a função em Haskell recebe na verdade um só argumento. Uma função "de dois argumentos" é uma função que recebe o primeiro e devolve outra função à espera do segundo. Esta convenção chama-se **currying** e transforma a aplicação parcial, passar só alguns argumentos, na ferramenta mais usada da linguagem.

## Aplicação parcial

```haskell
soma :: Int -> Int -> Int
soma x y = x + y

soma5 :: Int -> Int
soma5 = soma 5
```

`soma 5` é uma função à espera do segundo argumento, por isso `soma5 3` dá `8`. O mesmo vale para operadores por meio de **secções**: `(>= 9.5)` é a função que testa se o seu argumento é maior ou igual a `9.5`, e `(* 2)` é a função que dobra. Quando precisares de uma função pequena só uma vez, escreve-a anónima com **lambda**: `(\x -> x * 2)` lê-se "a função que a `x` associa `x * 2`".

Isto generaliza o que viste em [FP](/cadeiras/fp/programacao-funcional/): o `lambda` do Python e o `\` do Haskell são o mesmo gesto, mas em Haskell a aplicação parcial dispensa a maioria dos lambdas.

## map, filter e foldr

O prelúdio traz as três de ordem superior que já conheces, com tipos honestos:

```haskell
map    :: (a -> b) -> [a] -> [b]
filter :: (a -> Bool) -> [a] -> [a]
foldr  :: (a -> b -> b) -> b -> [a] -> b
```

`map` transforma, `filter` seleciona, `foldr` combina tudo num valor partindo da direita com um acumulador inicial. `sum` é `foldr (+) 0` e `length` é `foldr (\_ n -> n + 1) 0`. Quando o problema for "transformar cada um", "ficar só com alguns" ou "resumir tudo", começa por estas antes de escreveres recursão à mão.

## Exemplo completo: média das aprovações

Dada uma pauta, calcular a média só das notas de aprovação (maior ou igual a 9.5):

```haskell
mediaAprovados :: [Int] -> Double
mediaAprovados notas = fromIntegral soma / fromIntegral n
  where
    ap   = filter (>= 9.5) notas
    soma = sum ap
    n    = length ap
```

Segue com `[8,12,6,15,10]`. O `filter (>= 9.5)` usa uma secção para ficar com `[12,15,10]`. Depois `soma` vale `37` e `n` vale `3`. A divisão `/` exige `Double` dos dois lados, mas `soma` e `n` são `Int`: `fromIntegral` converte cada um, como prometido na página de [classes](polimorfismo-classes/). O resultado é `12.333333333333334`.

O bloco `where` define nomes locais partilhados, avaliados só se usados. É o sítio para os passos intermédios com nome, enquanto o corpo da função fica a frase principal.

:::warning[Lista vazia dá infinito]
Com `[]`, `soma` e `n` valem `0` e a divisão dá `Infinity` em vez de falhar. Num programa real, este caso pedia `Maybe Double` com `Nothing` para a lista vazia. Por agora, regista a lição: funções totais tratam todos os casos, e o tipo é o sítio onde isso se declara.
:::
