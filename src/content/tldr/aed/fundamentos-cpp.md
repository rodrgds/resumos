## Vetores e intervalos

- `std::vector<int> v{4,7,2}` tem três elementos, nas posições 0 a 2. `size()` conta elementos; `capacity()` conta espaço disponível.
- `reserve(10)` reserva espaço, sem criar elementos. `v[i]` exige `0<=i<v.size()`.
- `push_back(x)` acrescenta; `pop_back()` retira sem devolver. `front()`, `back()` e `pop_back()` exigem não vazio.
- **Intervalo semiaberto** `[l,r)` inclui `l`, exclui `r` e contém `r-l` posições. `[1,3)` contém 7 e 2; `[3,3)` é vazio.

`size()` usa `std::size_t`, um inteiro sem sinal. Evita subtrair 1 a zero num percurso inverso:

```cpp
for (std::size_t i = v.size(); i > 0; --i)
    std::cout << v[i - 1];
```

## Referências e iteradores

| Expressão                             | Efeito                                         |
| ------------------------------------- | ---------------------------------------------- |
| Parâmetro `std::vector<int> v`        | Copia o vetor; alterações ficam na cópia       |
| Parâmetro `std::vector<int>& v`       | Permite alterar o vetor do chamador            |
| Parâmetro `const std::vector<int>& v` | Lê sem copiar nem alterar por essa referência  |
| `for (int x : v)`                     | Copia cada valor para `x`                      |
| `for (int& x : v)`                    | `x` refere o elemento; uma atribuição altera-o |

- `begin()` identifica o início e `end()` a posição depois do último. No vazio coincidem. **Nunca desreferencies `end()`**.
- `std::find(v.begin(),v.end(),x)` devolve `end()` se não encontrar. Num vetor, `it-v.begin()` dá o índice e `it+k` permite acesso direto; numa lista ligada essas operações não existem.
- `std::sort(v.begin(),v.end())` ordena o vetor inteiro. `find` e `sort` precisam de `<algorithm>`.

## Comparação, ausência e contas

- Um comparador indica se `a` vem antes de `b`. `[](int a,int b){return a<b;}` é uma lambda sem capturas; `[p]` captura uma cópia de `p`. A comparação exige uma ordem fraca estrita, pelo que `<=` não serve.
- `nullptr` representa apontador ausente. Só consulta `p->campo` com um apontador válido. Depois de `delete p`, as referências ao nó são inválidas.
- `std::optional<T>` contém um valor ou ausência. Verifica `if (r)` antes de `*r`; zero pode ser um resultado válido e não deve representar erro sem contrato explícito.
- A divisão inteira trunca: `7/2*8` dá 24; `7*8/2` dá 28. `1LL*a*b` alarga o tipo **antes** de multiplicar; converter depois de `a*b` não evita overflow prévio.
- Uma chamada recursiva suspensa ocupa memória. Identifica caso base, redução do problema e trabalho local antes de analisar o custo.

[Regras de memória e invalidação de iteradores](/cadeiras/aed/tipos-abstratos/#memória-cópia-e-iteradores).
