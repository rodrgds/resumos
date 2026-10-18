## Avaliar por substituição

- Uma equação define um resultado por substituição. Com `dobra x = 2*x`, `dobra (3+1)` reduz a `2*(3+1)` e dá `8`.
- `x` nomeia o argumento dessa aplicação; não é uma posição de memória a atualizar.
- A aplicação tem prioridade sobre operadores e associa à esquerda: `dobra 3 + 1` dá `7`, `f x y` é `(f x) y`. Um número negativo como argumento escreve-se `f (-3)`.
- `where` dá nomes a cálculos de uma equação; `let ... in ...` dá nomes dentro de uma expressão. A indentação delimita os blocos.

## Padrões e guardas

```haskell
somaQuadrados :: [Int] -> Int
somaQuadrados [] = 0
somaQuadrados (x:xs) = x^2 + somaQuadrados xs
-- somaQuadrados [1,2,3] = 1 + 4 + 9 + 0 = 14
```

- `[]` é a lista vazia; `x:xs` separa cabeça e cauda. Os padrões tentam-se de cima para baixo; um padrão geral antes do caso base esconde-o.
- `_` aceita qualquer valor sem o ligar; não pode aparecer no corpo.
- As guardas escolhem a primeira condição verdadeira. `otherwise` é `True` e fica no fim.
- Usa padrões para a forma dos dados e guardas para condições sobre valores. O `if` precisa de `else`, e ambos os ramos têm o mesmo tipo.

## Tipos, divisão e domínio

| Tipo              | Valores                                     |
| ----------------- | ------------------------------------------- |
| `Int`, `Integer`  | Inteiros de precisão fixa e arbitrária.     |
| `Float`, `Double` | Aproximações em vírgula flutuante.          |
| `Bool`, `Char`    | `True`/`False` e carateres como `'a'`.      |
| `String`          | Sinónimo de `[Char]`; `"ola"` é uma lista.  |
| `[a]`, `(a,b)`    | Lista homogénea; par que pode juntar tipos. |
| `()`              | Valor unitário, sem informação a devolver.  |

- `/` exige tipo fracionário; converte com `fromIntegral`, nunca automaticamente.
- `div` arredonda o quociente para baixo e `mod` dá o resto. Com divisor não nulo, `(x div y)*y + (x mod y) == x`; assim, `(-7) div 3 = -3` e `(-7) mod 3 = 2`.
- Uma equação tipada pode ter domínio limitado: a fórmula de Heron exige lados positivos que respeitem as desigualdades do triângulo.

**Ter tipo não garante sucesso nem terminação.** `head []` falha ao pedir o resultado; `length [1..]` não termina. Confere tipo, cobertura dos padrões, domínio e progresso até ao caso base. `:t` no GHCi mostra o tipo inferido.

[Escolha entre `if`, guardas e padrões](/cadeiras/pfl/haskell-expressoes-tipos/#escolher-entre-if-guardas-e-padrões).
