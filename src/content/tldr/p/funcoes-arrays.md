## Contratos e passagem de argumentos

Uma função declara entradas, alterações permitidas e resultado. `return` devolve ao chamador e termina a chamada; não imprime. A declaração tem de estar visível antes da chamada e a definição tem de entrar na ligação.

| Parâmetro         | Efeito                                          |
| ----------------- | ----------------------------------------------- |
| `T valor`         | Recebe um objeto próprio, copiado do argumento  |
| `T& objeto`       | Pode alterar o original                         |
| `const T& objeto` | Consulta sem copiar nem alterar por esse acesso |
| `T* objeto`       | Recebe um endereço, possivelmente nulo          |

```cpp
void copia(int x) { ++x; }
void original(int& x) { ++x; }
// Com n = 4: copia(n) deixa 4; original(n) deixa 5.
```

Copiar um apontador conserva o acesso ao mesmo objeto; passar por valor não implica uma cópia profunda.

Uma referência tem de ser inicializada e não muda de destino. Em `int& r = a; r = b;`, copia-se o valor de `b` para `a`. `const T&` não impede que outro acesso altere o original. Devolver por valor é seguro; devolver referência ou endereço de uma variável local deixa acesso pendente.

Sobrecargas distinguem-se pelos parâmetros, não só pelo retorno. Argumentos por defeito permitem omitir os últimos argumentos e têm de ser conhecidos no ponto da chamada.

## Arrays e intervalos

- `int v[4]` tem quatro elementos contíguos, com índices `0` a `3`. Não cresce.
- Num parâmetro, `const int v[]` é ajustado para `const int* v`: passa também o tamanho. `sizeof(v)` nessa função mede o apontador.
- Uma função que lê `n` elementos exige um intervalo válido e resultados representáveis no tipo usado. Para `n == 0`, não deve desreferenciar o início.

```cpp
int soma(const int* valores, std::size_t n) {
    int total = 0;
    for (std::size_t i = 0; i < n; ++i) total += valores[i];
    return total;
}
// Para {4, -2, 7, 1}: soma(v, 4) dá 10; soma(v + 1, 2) dá 5.
// soma(nullptr, 0) dá 0, sem leitura pelo apontador.
```

`std::size_t` é sem sinal. Numa contagem descendente, evita `size() - 1` no vazio e a condição `i >= 0`. Usa `i = size()`, testa `i > 0` e lê a posição `i - 1`.

`for (int x : v)` copia cada elemento; `for (int& x : v)` permite alterá-lo. Um apontador isolado não fornece o tamanho para este percurso. `std::array<T, N>` conserva tamanho fixo; `std::vector<T>` gere tamanho variável.

Em `int matriz[2][3]`, a última dimensão é contígua. O parâmetro `const int matriz[][3]` precisa da dimensão interior para localizar linhas; não equivale a `int**`.

## Tipos compostos e texto

Uma `struct` reúne campos; `p.x` acede ao campo. Tem acesso público por defeito, enquanto `class` tem privado. Padding pode tornar `sizeof(struct)` diferente da soma dos campos. `enum class` cria valores nomeados com um tipo próprio.

- `std::string` gere armazenamento; `size()` conta unidades `char`, não letras Unicode visuais.
- `at(i)` verifica limites. Os elementos de texto têm índices inferiores a `size()`; o terminador nessa posição não é outro elemento de texto.
- `find` devolve posição ou `npos`; `substr` extrai uma parte. Em `"azul,verde"`, a vírgula está em `4`, e `substr(5)` dá `"verde"`.
- Depois de ler um número com `>>`, descarta o resto dessa linha antes do `getline`. `std::ws` também elimina espaços iniciais e linhas vazias, o que muda o formato aceite.
- A string de C `"Ana"` precisa de quatro posições, incluindo `\0`. `strlen` exige terminador válido; `strcpy` não verifica capacidade. `==` entre arrays convertidos em apontadores compara endereços; `strcmp` compara texto.

## Recursão

Exige um caso base e progresso até ele. Para `n >= 0`, `soma(0) = 0` e `soma(n) = n + soma(n - 1)` dão `soma(3) = 6`, se as somas forem representáveis. Cada chamada conserva estado próprio; muitas chamadas podem esgotar a pilha.

[Leitura de número e linha](/cadeiras/p/funcoes-arrays/#strings-e-linhas).
