## Construtores e invariantes

Uma definição indutiva dá o **menor conjunto** gerado pelas bases e por um número finito de aplicações dos construtores. Para provar uma propriedade de todos os objetos:

1. Prova-a para cada base.
2. Para cada construtor, assume-a nos objetos de entrada e prova-a no objeto construído.

Trata todos os construtores. Um invariante pode excluir objetos, mas satisfazê-lo não prova por si só pertença: fornece uma construção ou prova a direção inversa.

Se $3\in S$ e $x,y\in S\Rightarrow x+y\in S$, a indução estrutural mostra que todos os elementos são múltiplos positivos de 3. Para concluir $S=\{3n:n\in\mathbb N^+\}$, mostra ainda que cada $3n$ pode construir-se, somando 3 sucessivamente.

## Palavras e parênteses

Com base $\varepsilon$ e construtores $axb,bxa,xy$, todos os objetos gerados têm igual número de $a$ e $b$: cada envolvimento acrescenta um de cada; a concatenação soma as contagens.

Para parênteses equilibrados, conserva duas propriedades:

- O saldo final, aberturas menos fechos, é zero.
- O saldo de **cada prefixo** é não negativo.

`)(` tem saldo final zero, mas falha no primeiro prefixo. Na definição com base `()` e construtores `(x)` e `xy`, a palavra vazia não é gerada, embora seja um prefixo usado na prova.

## Listas finitas

Os construtores são `[]` e `x:xs`. Prova a base vazia; no passo, toma cabeça `x` e cauda `xs` arbitrárias, assumindo a propriedade só de `xs`. Este princípio não abrange listas infinitas.

```haskell
[] ++ ys = ys
(x:xs) ++ ys = x : (xs ++ ys)
reverse [] = []
reverse (x:xs) = reverse xs ++ [x]
map f [] = []
map f (x:xs) = f x : map f xs
```

A recursão de `++` analisa a primeira lista. Nas provas seguintes, induz em `xs` e mantém as outras listas arbitrárias:

| Propriedade              | Igualdade                                       |
| ------------------------ | ----------------------------------------------- |
| Comprimento              | `length (xs ++ ys) = length xs + length ys`     |
| Identidade à direita     | `xs ++ [] = xs`                                 |
| Associatividade          | `(xs ++ ys) ++ zs = xs ++ (ys ++ zs)`           |
| Inversão da concatenação | `reverse (xs ++ ys) = reverse ys ++ reverse xs` |
| Dupla inversão           | `reverse (reverse xs) = xs`                     |
| Fusão de map             | `map f (map g xs) = map (f . g) xs`             |

Desenvolve definições até aparecer a expressão da hipótese. Se ela não aparece, pode faltar um lema ou uma hipótese mais geral.

Na dupla inversão, precisas primeiro do lema da concatenação:

```text
reverse (reverse (x:xs))
= reverse (reverse xs ++ [x])
= reverse [x] ++ reverse (reverse xs)
= [x] ++ xs
= x:xs
```

A segunda passagem usa o lema; a terceira usa a hipótese de indução. A base dá `reverse (reverse []) = []`.

## Correção de uma ordenação

Para `sort (x:xs) = insert x (sort xs)`, prova primeiro que `insert` conserva a ordenação de uma lista ordenada, assumindo uma ordem total nos elementos. Depois usa esse lema e a hipótese sobre `sort xs`.

É preciso também conservar os elementos **e as multiplicidades**. Devolver sempre `[]` produz uma lista ordenada, mas não uma ordenação correta da entrada. Testes de algumas listas não substituem estas provas universais.

[Provas de listas, reverse, map e ordenação](/cadeiras/md/inducao-estrutural/).
