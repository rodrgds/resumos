## Definições indutivas

Uma definição indutiva gera o menor conjunto fechado para as bases e as aplicações finitas dos construtores. Para provar uma propriedade de todos os objetos gerados:

1. Prova-a para cada base.
2. Para cada construtor, assume-a nas entradas e prova-a no objeto construído.

Trata todos os construtores. Um invariante exclui objetos fora do conjunto, mas não prova a pertença: para incluir um objeto, dá a sua construção ou prova a direção inversa.

Se $3\in S$ e $x,y\in S\Rightarrow x+y\in S$, o passo estrutural dá $S\subseteq\{3n:n\in\mathbb N^+\}$; para a igualdade constrói cada múltiplo $3n$ por somas de 3.

## Palavras

Com as bases $\varepsilon$, $axb,bxa,xy$: cada envolvimento junta um $a$ e um $b$; concatenar soma as contagens. Logo, cada palavra gerada tem tantos $a$ como $b$.

Para os parênteses equilibrados conserva duas condições:

- O saldo final, aberturas menos fechos, é igual a zero.
- O saldo de cada prefixo é não negativo.

A palavra `)(` tem saldo final zero mas falha no primeiro prefixo. Com a base `()` e os construtores `(x)` e `xy`, o vazio não é gerado, mas é um prefixo no teste.

## Listas

Os construtores de listas são `[]` e $x:xs$. Prova a base vazia; no passo, toma uma cabeça e uma cauda arbitrárias com a hipótese só sobre a cauda $xs$. A indução não abrange listas infinitas.

```haskell
[] ++ ys = ys
(x:xs) ++ ys = x : (xs ++ ys)
reverse [] = []
reverse (x:xs) = reverse xs ++ [x]
map f [] = []
map f (x:xs) = f x : map f xs
```

A recursão de `++` analisa a primeira lista. Induz em $xs$ e mantém as restantes listas arbitrárias:

| Propriedade          | Igualdade                                       |
| -------------------- | ----------------------------------------------- |
| Comprimento          | `length (xs ++ ys) = length xs + length ys`     |
| Identidade à direita | `xs ++ [] = xs`                                 |
| Associatividade      | `(xs ++ ys) ++ zs = xs ++ (ys ++ zs)`           |
| Inversão             | `reverse (xs ++ ys) = reverse ys ++ reverse xs` |
| Dupla inversão       | `reverse (reverse xs) = xs`                     |
| Fusão de map         | `map f (map g xs) = map (f . g) xs`             |

Desenvolve as definições até aparecer a hipótese. Se ela não aparece, pode faltar um lema ou uma hipótese mais geral.

Na dupla inversão precisas primeiro do lema da concatenação:

```text
reverse (reverse (x:xs))
= reverse (reverse xs ++ [x])
= reverse [x] ++ reverse (reverse xs)
= [x] ++ xs
= x:xs
```

A segunda passagem usa o lema; a terceira usa a hipótese. A base dá `reverse (reverse []) = []`.

Em `interleave x (y:ys) = y:x:interleave x ys`, cada passo junta duas posições; a hipótese aplica-se à cauda. Os valores repetidos contam como posições distintas.

## Ordenação

Para `sort (x:xs) = insert x (sort xs)`:

1. Prova o lema de `insert` numa lista ordenada, assumindo uma ordem total.
2. Aplica a hipótese sobre `sort xs`.

Uma ordenação correta conserva a ordem e as multiplicidades: devolver sempre `[]` dá uma lista ordenada, mas não ordena a entrada. Testes finitos não substituem a prova universal.

[Provas de listas, reverse, map e ordenação](/cadeiras/md/inducao-estrutural/).
