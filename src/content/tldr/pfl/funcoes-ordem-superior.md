## Currying, lambda e composição

- `soma :: Int -> Int -> Int` recebe um inteiro e devolve uma função. `soma 5` é aplicação parcial; se `soma x y = x+y`, `(soma 5) 3` dá `8`.
- Uma função de ordem superior recebe ou devolve funções. `\x -> x*2` é uma lambda; `(*2)` é a secção equivalente.
- `(>=9.5)` testa o argumento contra `9.5`. Para subtrair dois usa `subtract 2` ou `\x -> x-2`; `(-2)` é um número negativo.
- `(f . g) x = f (g x)`. `sum . map (^2) . filter even` em `[1,2,3,4]` passa por `[2,4]`, `[4,16]` e dá `20`.

## Escolher a operação sobre listas

| Função           | Efeito                                                       |
| ---------------- | ------------------------------------------------------------ |
| `map f`          | Transforma cada elemento; tipo `(a -> b) -> [a] -> [b]`.     |
| `filter p`       | Conserva todos os elementos que satisfazem `p`.              |
| `takeWhile p`    | Conserva só o prefixo até à primeira falha.                  |
| `dropWhile p`    | Retira esse prefixo e conserva o resto.                      |
| `all p`, `any p` | Exigem todos ou pelo menos um; em `[]` dão `True` e `False`. |

Com `[2,4,1,6]`, `takeWhile even` dá `[2,4]`, mas `filter even` dá `[2,4,6]`.

## Folds e custo

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
-- foldr (-) 0 [1,2,3] = 1-(2-(3-0)) = 2
-- foldl (-) 0 [1,2,3] = ((0-1)-2)-3 = -6

myappend xs ys = foldr (:) ys xs
myreverse xs = foldl (flip (:)) [] xs
```

`foldr f z` substitui `[]` por `z` e cada `(:)` por `f`. Assim, `sum = foldr (+) 0` e `concat = foldr (++) []`. A associação à direita não obriga a avaliar primeiro a cauda.

A inversão com `foldl (flip (:)) []` é linear no comprimento de uma lista finita. `foldr (\x acc -> acc ++ [x]) []` é quadrática, porque percorre acumuladores repetidamente.

## Avaliação não estrita

- `take 3 [1..]` dá `[1,2,3]`; `length [1..]` e `sum [1..]` precisam do fim e não terminam.
- `False && undefined` dá `False`; `True && undefined` exige o argumento indefinido e falha.
- `foldr (&&) True (False:repeat True)` termina com `False`. `foldl` nessa lista precisa de chegar ao fim e diverge.
- `foldr` não garante terminação em listas infinitas: a operação tem de conseguir produzir o resultado sem exigir toda a cauda.
- `foldl` pode acumular expressões por avaliar. `foldl'`, de `Data.List`, força o acumulador até à forma normal fraca a cada passo, mas não necessariamente todos os campos de um tuplo ou árvore.

Para uma média, filtra primeiro e trata `[]` com `Nothing`. No caso não vazio, `Just (sum xs / fromIntegral (length xs))` evita confundir a ausência de média com `0/0`.

[Derivação dos folds e preguiça](/cadeiras/pfl/funcoes-ordem-superior/#derivar-um-fold).
