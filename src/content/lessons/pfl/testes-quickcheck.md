---
title: Propriedades e testes com QuickCheck
description: Propriedades em vez de exemplos, geradores automáticos e leitura de contraexemplos.
section: conteudo
order: 6
---

Um teste de exemplo verifica um caso: `reverse [1,2,3]` dá `[3,2,1]`. Uma **propriedade** afirma uma lei para todos os casos: inverter duas vezes devolve a lista original. O **QuickCheck** testa a propriedade em centenas de casos aleatórios por ti. Em vez de inventares exemplos, inventas leis, e a ferramenta trata de as tentar partir.

## A primeira propriedade

Propriedades são funções que devolvem `Bool`, com tipos concretos para a ferramenta saber o que gerar:

```haskell
import Test.QuickCheck

prop_revRev :: [Int] -> Bool
prop_revRev xs = reverse (reverse xs) == xs
```

No GHCi, com o pacote QuickCheck instalado:

```text
ghci> quickCheck prop_revRev
+++ OK, passed 100 tests.
```

A ferramenta gerou 100 listas aleatórias (vazias, curtas, longas, com negativos e repetidos) e a igualdade valeu em todas. Repara no que isto compra: um teste de exemplo cobre a lista que escreveste; a propriedade cobre as listas que nunca te lembrarias de escrever, incluindo `[]`, que apanha metade dos erros de recursão.

## Quando falha: o contraexemplo

Uma propriedade falsa dá um contraexemplo mínimo. Afirma que ordenar é a identidade:

```haskell
import Data.List (sort)

prop_sortId :: [Int] -> Bool
prop_sortId xs = sort xs == xs
```

```text
ghci> quickCheck prop_sortId
*** Failed! Falsifiable (after 3 tests):
[1,0]
```

O QuickCheck responde que a propriedade é falsificável e mostra a testemunha: `[1,0]`, já **encolhida** (shrinking) de um caso aleatório maior até ao mínimo que ainda falha. O número de testes varia de corrida para corrida; a lista curta fora de ordem é o essencial. O fluxo de trabalho é este: escreve a propriedade, vê-a falhar, lê o contraexemplo, corrige a ideia. A versão verdadeira compara duas ordenações:

```haskell
prop_sortSort :: [Int] -> Bool
prop_sortSort xs = sort (sort xs) == sort xs
```

```text
ghci> quickCheck prop_sortSort
+++ OK, passed 100 tests.
```

## Geradores e condições

Por omissão, o QuickCheck gera valores **arbitrários** do tipo pedido: inteiros pequenos e grandes, listas de vários tamanhos, carateres Unicode. Quando a propriedade só faz sentido sob uma condição, impõe-na com `==>`:

```haskell
prop_divMod :: Int -> Int -> Property
prop_divMod x y = y /= 0 ==> (x `div` y) * y + (x `mod` y) == x
```

Os casos com `y == 0` são descartados antes de contar. Se a condição for demasiado rara, a ferramenta avisa que não conseguiu casos suficientes, e aí o remédio é um gerador à medida com `forAll`. Para esta cadeira, chega saberes que o gerador existe e que a seta `==>` filtra.

:::tip[De onde vêm as propriedades]
Boas fontes: leis algébricas (`x + 0 == x`), idempotência (`sort (sort xs) == sort xs`), inversas (`reverse (reverse xs) == xs`) e modelos de referência (a tua função dá o mesmo que a versão lenta e óbvia). Se não consegues enunciar nenhuma lei sobre a função, é sinal de que ainda não percebeste o que ela promete.
:::
