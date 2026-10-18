## Currying e composição

- `soma :: Int -> Int -> Int` recebe um inteiro e devolve uma função. `soma 5` é aplicação parcial; com `soma x y = x+y`, `(soma 5) 3` dá `8`.
- Uma função de ordem superior recebe ou devolve funções: `map` recebe a transformação, `filter` recebe o teste.
- `\x -> x*2` é uma lambda; `(*2)` é a secção equivalente. `(>= 9.5)` testa o argumento contra `9.5`.
- Para subtrair dois, usa `subtract 2` ou `\x -> x-2`: `(-2)` é o número negativo.
- `(f . g) x = f (g x)`; a função da direita corre primeiro. `sum . map (^2) . filter even` em `[1,2,3,4]` passa por `[2,4]`, `[4,16]` e dá `20`.

## Escolher a operação sobre listas

| Função           | Efeito quando aplicar                                            |
| ---------------- | ---------------------------------------------------------------- |
| `map f`          | Transforma cada elemento; tipo `(a -> b) -> [a] -> [b]`.         |
| `filter p`       | Conserva todos os elementos que passam no teste.                 |
| `takeWhile p`    | Conserva só o prefixo até à primeira falha; depois já não testa. |
| `dropWhile p`    | Retira esse prefixo e conserva o resto.                          |
| `all p`, `any p` | Exigem todos ou pelo menos um; em `[]` dão `True` e `False`.     |

Em `[2,4,1,6]`, `takeWhile even` dá `[2,4]`, mas `filter even` dá `[2,4,6]`: o filtro continua depois do `1`.

## Folds: direção e custo

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
-- foldr (-) 0 [1,2,3] = 1-(2-(3-0)) = 2
-- foldl (-) 0 [1,2,3] = ((0-1)-2)-3 = -6
```

- `foldr f z` substitui `[]` por `z` e cada `(:)` por `f`. Assim, `sum = foldr (+) 0` e `concat = foldr (++) []`.
- Direita e esquerda descrevem os parênteses, não o ponto de partida: ambos percorrem da esquerda para a direita. Associar à direita não obriga a avaliar primeiro a cauda.
- `myappend xs ys = foldr (:) ys xs`; `myreverse xs = foldl (flip (:)) [] xs`.
- A inversão com `foldl (flip (:)) []` é linear numa lista finita. `foldr (\x acc -> acc ++ [x]) []` percorre acumuladores repetidamente e é quadrática.

:::tip[Que fold escolher]
Lista possivelmente infinita ou resultado construído por etapas: `foldr` com operação que possa ignorar a cauda. Lista finita com resultado único, como uma soma: `foldl'` de `Data.List`. Evita `foldl` sem apóstrofo em listas grandes: acumula expressões por avaliar.
:::

## Preguiça: o que termina

- `take 3 [1..]` dá `[1,2,3]`; `length [1..]` e `sum [1..]` precisam do fim e não terminam.
- `False && undefined` dá `False`; `True && undefined` exige o segundo argumento e falha.
- `foldr (&&) True (False:repeat True)` termina com `False`. Com `(+)` em vez de `(&&)`, o mesmo `foldr` exigiria a cauda inteira.
- `foldl` numa lista infinita nunca chega à aplicação exterior e diverge, seja a operação estrita ou não.
- `foldl'` força o acumulador a cada passo, até à forma normal fraca; não força necessariamente o interior de tuplos ou árvores.

Para uma média, filtra primeiro e trata `[]` com `Nothing`. No caso não vazio, `Just (sum xs / fromIntegral (length xs))`: a soma já é `Double`, só o comprimento precisa de conversão.

[Derivação dos folds e preguiça](/cadeiras/pfl/funcoes-ordem-superior/#derivar-um-fold).

## Contar um intervalo ordenado e infinito

Numa lista ordenada, `takeWhile (<=fim) . dropWhile (<inicio)` delimita pelos **valores**. Nos primos de 10 a 30, `dropWhile` chega ao primeiro admissível (11) e `takeWhile` para ao observar 31: pela ordenação, nenhum primo posterior volta ao intervalo. Dá seis: `[11,13,17,19,23,29]`.

- `length (filter (\p -> 10<=p && p<=30) primos)` não termina: depois do 29, o filtro procura para sempre outro elemento. `take 30` conta posições, não valores.
- A ordenação justifica parar no primeiro valor acima do limite. Numa lista arbitrária, esse valor posterior podia existir. É preciso alcançar a fronteira em passos finitos; uma repetição infinita de 20 nunca a atinge.

[Delimitação e condições](/cadeiras/pfl/funcoes-ordem-superior/#contar-um-intervalo-numa-lista-infinita-ordenada).
