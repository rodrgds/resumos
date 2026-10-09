## Aplicação e avaliação

- Uma equação define um resultado por substituição: com `dobra x = 2*x`, `dobra (3+1)` reduz a `2*(3+1)` e dá `8`.
- A aplicação tem prioridade sobre operadores e associa à esquerda. `dobra 3 + 1` dá `7`; `f x y` significa `(f x) y`. Um argumento negativo escreve-se `f (-3)`.
- `x` nomeia o argumento daquela aplicação, não uma posição de memória a atualizar. `where` e `let ... in ...` dão nomes a cálculos locais; a indentação delimita os blocos.

## Padrões e guardas

```haskell
somaQuadrados :: [Int] -> Int
somaQuadrados [] = 0
somaQuadrados (x:xs) = x^2 + somaQuadrados xs
-- somaQuadrados [1,2,3] = 1 + 4 + 9 + 0 = 14
```

- `[]` é a lista vazia; `x:xs` separa cabeça e cauda. `_` aceita qualquer valor sem o nomear.
- Os padrões são tentados de cima para baixo. Um padrão geral colocado primeiro pode esconder o caso base.
- As guardas escolhem a primeira condição verdadeira. `otherwise` é `True`, pelo que fica no fim.
- `if` precisa de `else`, e ambos os ramos têm o mesmo tipo. Usa padrões para a forma dos dados e guardas para condições sobre valores.

## Tipos e domínio

| Tipo              | Significado                                                    |
| ----------------- | -------------------------------------------------------------- |
| `Int`, `Integer`  | Inteiros de precisão fixa e arbitrária, respetivamente.        |
| `Float`, `Double` | Aproximações em vírgula flutuante de precisão simples e dupla. |
| `Bool`, `Char`    | `True`/`False` e carateres como `'a'`.                         |
| `String`          | Sinónimo de `[Char]`, como `"ola"`.                            |
| `[a]`, `(a,b)`    | Lista homogénea e par que pode juntar tipos diferentes.        |
| `()`              | Valor unitário, usado quando não há informação a devolver.     |

`div` arredonda o quociente inteiro para baixo; `mod` é o resto correspondente. Para divisor não nulo, `(x div y)*y + x mod y == x`. Assim, `(-7) div 3 = -3` e `(-7) mod 3 = 2`. `/` exige um tipo fracionário.

**Ter tipo não garante sucesso nem terminação.** `head []` falha quando se pede o resultado; `length [1..]` não termina. Confere tipo, cobertura dos padrões, domínio das operações e progresso até ao caso base. `:t` no GHCi mostra o tipo inferido.

[Exemplos de aplicação e domínio](/cadeiras/pfl/haskell-expressoes-tipos/#aplicação-parênteses-e-domínio).
