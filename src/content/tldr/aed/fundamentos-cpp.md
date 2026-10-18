## Posições válidas

- `v{4,7,2}` ocupa as posições 0, 1 e 2. `size()` conta elementos. `capacity()` conta espaço reservado.
- Lê `v[i]` só com `0<=i<size()`. `front()`, `back()` e `pop_back()` exigem vetor não vazio.
- `reserve(10)` não cria elementos. `push_back` cria; `pop_back` retira sem devolver.
- `[l,r)` tem `r-l` posições. `[1,3)` lê 7 e 2. `[3,3)` está vazio e é válido.

Percorre para trás sem subtrair a zero sem sinal:

```cpp
for (std::size_t i = v.size(); i > 0; --i)
    std::cout << v[i - 1];
```

## Cópia ou referência

| Código                         | O que acontece        |
| ------------------------------ | --------------------- |
| `f(std::vector<int> v)`        | Trabalha sobre cópia  |
| `f(std::vector<int>& v)`       | Altera o original     |
| `f(const std::vector<int>& v)` | Lê sem copiar         |
| `for (int x : v)`              | `x` é cópia           |
| `for (int& x : v)`             | `x` altera o elemento |

- `end()` marca a posição a seguir ao último. Nunca uses `*end()`. No vazio, `begin()==end()`.
- `find` devolve `end()` quando falta. Num vetor, `it-v.begin()` dá o índice. Numa lista, esse salto não existe.
- `sort(v.begin(),v.end())` ordena tudo. Precisa de `<algorithm>`; `vector` precisa de `<vector>`.

## Comparar, apontar e contar

- Lambda `[](int a,int b){return a<b;}` não captura nada. `[p]` guarda cópia de `p`. Exige ordem fraca estrita; `<=` viola essa regra.
- Só segue `p->campo` com `p` válido. `nullptr` marca ausência. Depois de `delete p`, o nó deixa de existir.
- `optional<T>` distingue ausência de zero. Testa `if (r)` antes de `*r`.
- Inteiros truncam: `7/2` vale 3. `7/2*8` dá 24 e `7*8/2` dá 28. Escreve `1LL*a*b` para alargar antes de multiplicar.
- Recursão suspende a chamada. Fixa caso base e medida que diminui antes de contares o custo.

[Contratos de memória e cópia](/cadeiras/aed/tipos-abstratos/#memória-cópia-e-iteradores).
