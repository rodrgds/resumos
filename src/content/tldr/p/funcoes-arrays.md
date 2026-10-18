## Que passagem escolho?

| Preciso de               | Declara           |
| ------------------------ | ----------------- |
| Ler um número pequeno    | `int n`           |
| Alterar o original       | `T& objeto`       |
| Consultar sem copiar     | `const T& objeto` |
| Endereço que pode faltar | `T* objeto`       |

`return` devolve e termina. Não imprime. Declara antes de chamar.

```cpp
void copia(int x) { ++x; }      // n = 4 continua 4
void original(int& x) { ++x; }  // n = 4 passa a 5
```

- `int& r = a; r = b;` copia `b` para `a`. A referência não muda de destino.
- `const T&` não congela o objeto. Outro acesso pode alterá-lo.
- Devolver endereço de local deixa acesso pendente.
- Sobrecargas distinguem-se pelos parâmetros. O retorno sozinho não chega.

## Arrays e índices

- `int v[4]` tem índices `0` a `3`. Não cresce.
- Em parâmetro, `const int v[]` vira `const int* v`. Passa o tamanho à parte.
- `sizeof(v)` dentro da função mede o apontador.
- Com `n == 0`, não desreferencies o início.

```cpp
// {4, -2, 7, 1}: soma(v, 4) = 10; soma(v + 1, 2) = 5; soma(nullptr, 0) = 0
// Mantém n dentro do array e a soma representável em int.
int soma(const int* valores, std::size_t n) {
    int total = 0;
    for (std::size_t i = 0; i < n; ++i) total += valores[i];
    return total;
}
```

Para descer com `size_t`, que não representa negativos, decrementa primeiro e lê `v[i]`:

```cpp
for (std::size_t i = n; i > 0; ) {
    --i;
    std::cout << v[i] << '\n';
}
```

Com `n = 3`, `i` visita `2`, `1`, `0`. Com `n = 0`, o corpo não corre. Em alternativa, lê `v[i - 1]` e só depois decrementa. `i >= 0` é sempre verdade num tipo sem sinal, por isso não serve como condição de paragem.

| Percurso           | Efeito                         |
| ------------------ | ------------------------------ |
| `for (int x : v)`  | Copia cada elemento            |
| `for (int& x : v)` | Altera o elemento              |
| Apontador isolado  | Sem tamanho para este percurso |

`int matriz[2][3]` precisa da dimensão interior no parâmetro. Não equivale a `int**`.

Saída num array do chamador: capacidade é espaço reservado, prefixo válido é o que a função devolveu. Em `4,9,4,2,9,7`, conservar repetidos dá `4,9,4,9`. Custo quadrático, memória constante além do destino.

[Filtro de ocorrências repetidas](/cadeiras/p/funcoes-arrays/#arrays-de-entrada-e-de-saída).

## Texto e recursão

- `string::size()` conta unidades `char`. `at(i)` verifica limites.
- `find` devolve a posição ou `npos`. Numa variável `std::string par`
  com `"azul,verde"`, `par.find(',')` dá `4`.
- Depois de `>>` número, descarta o fim dessa linha antes de `getline`.
- String C `"Ana"` ocupa 4 posições com `\0`. `==` entre arrays compara endereços.

Diferença simétrica de letras, alfabeto `a` a `z`:

1. Marca presença em cada texto, sem distinguir maiúscula.
2. Ignora o resto dos caracteres.
3. Escreve por ordem alfabética as letras presentes em exatamente um texto.
4. Destino com 27 posições, terminado com `\0`. O número devolvido exclui o terminador.

Recursão: caso base mais medida que diminui. `soma(0) = 0`, `soma(n) = n + soma(n - 1)` para `n > 0`. Entrada negativa nunca chega à base.

[Leitura de número e linha](/cadeiras/p/funcoes-arrays/#strings-e-linhas). [Conjuntos de letras](/cadeiras/p/funcoes-arrays/#presença-de-letras-em-dois-textos).
