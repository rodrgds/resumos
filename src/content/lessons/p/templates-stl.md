---
title: Templates e STL
description: Funções e classes genéricas, vector, iteradores e algoritmos como sort e find.
section: conteudo
order: 5
---

Muitas funções fazem exatamente o mesmo com tipos diferentes: o máximo de dois inteiros e o máximo de dois reais só diferem no tipo. Copiar a função para cada tipo duplica código e cada correção tem de ser repetida. Os **templates** evitam isso: escreves a função uma vez com um tipo genérico e o compilador cria uma versão para cada tipo usado. A **STL** (Standard Template Library) é a coleção de estruturas e algoritmos genéricos que a linguagem já traz: vetores, iteradores e funções como ordenar e pesquisar.

## Funções template

Uma função template recebe o tipo como parâmetro, escrito entre parênteses angulares. O compilador deduz o tipo em cada chamada e gera a versão correspondente:

```cpp
#include <iostream>
#include <string>

template <typename T>
T maximo(const T& a, const T& b) {
    if (a > b) {
        return a;
    }
    return b;
}

int main() {
    std::cout << maximo(3, 7) << "\n";
    std::cout << maximo(2.5, 1.8) << "\n";
    std::cout << maximo(std::string("casa"), std::string("carro")) << "\n";
}
```

Isto escreve `7`, `2.5` e `carro`. A mesma definição serviu para `int`, `double` e `string`: cada chamada gerou (instanciou) a sua versão. A única exigência é que o tipo suporte as operações usadas, aqui o `>`; tentar `maximo` com um tipo sem `>` dá um erro de compilação na instanciação, muitas vezes longo e confuso. Quando vires um erro gigante depois de chamares um template, procura a primeira linha que menciona o teu código.

Repara nos parâmetros `const T&`: referência constante, como nos [fundamentos](/cadeiras/p/cpp-fundamentos/). Sem a referência, cada chamada copiava os argumentos; sem o `const`, não aceitava valores temporários.

## Classes template

Uma classe também pode ser genérica. O exemplo clássico é uma caixa que guarda um valor de qualquer tipo:

```cpp
#include <iostream>
#include <string>

template <typename T>
class Caixa {
public:
    Caixa(const T& v) : valor(v) {}

    T ler() const { return valor; }
    void guardar(const T& v) { valor = v; }

private:
    T valor;
};

int main() {
    Caixa<int> ci(42);
    Caixa<std::string> cs("ola");
    std::cout << ci.ler() << " " << cs.ler() << "\n";
}
```

Isto escreve `42 ola`. Na declaração do objeto o tipo já não se deduz: tens de o escrever (`Caixa<int>`), porque o compilador precisa de saber quanto espaço reservar. É assim que funcionam o `vector<int>` e as outras estruturas da STL: classes template que já alguém escreveu e testou por ti.

## vector: o array que cresce

O `vector` é o substituto moderno do array de C que viste nos [apontadores](/cadeiras/p/apontadores-memoria/): guarda os elementos num bloco contíguo, sabe o seu tamanho e cresce com `push_back`. Vem de [Tuplos e listas](/cadeiras/fp/tuplos-listas/) a ideia de lista que cresce com `append`; o `push_back` é o equivalente:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> notas;
    notas.push_back(12);
    notas.push_back(15);
    notas.push_back(10);
    std::cout << notas.size() << "\n";
    std::cout << notas[0] << " " << notas[2] << "\n";
    notas[1] = 18;
    for (int n : notas) {
        std::cout << n << " ";
    }
    std::cout << "\n";
}
```

Isto escreve `3`, depois `12 10` e depois `12 18 10`. O `size()` devolve o número de elementos, a indexação funciona como no array e o ciclo `for (int n : notas)` percorre todos os elementos sem gerir índices. Tal como o `append` de Python, o `push_back` pode obrigar a realocar o bloco interior, por isso não guardes apontadores para elementos de um vetor enquanto o alteras.

:::warning[Indexar fora do vector não é travado]
Tal como nos arrays, `notas[10]` num vetor de três elementos não dá erro de compilação: lê lixo ou avaria o programa. Para acesso verificado existe `notas.at(1)`, que lança uma exceção se o índice for inválido (vais perceber exceções na [próxima página](/cadeiras/p/excecoes-testes/)). Nos exercícios, usa `[]` quando já garantiste os limites com o `size()` e `at()` quando o índice vem de fora.
:::

## Iteradores

Um **iterador** é um objeto que aponta para um elemento de um contentor e sabe avançar para o seguinte. É a abstração que permite aos algoritmos da STL trabalharem sobre qualquer contentor: o algoritmo só vê iteradores, nunca o vetor ou a lista por baixo. Todo o contentor oferece `begin()` (primeiro elemento) e `end()` (posição a seguir ao último):

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30};
    for (std::vector<int>::iterator it = v.begin(); it != v.end(); it++) {
        std::cout << *it << " ";
    }
    std::cout << "\n";
}
```

Isto escreve `10 20 30`. O `*it` dereferencia o iterador (lê o elemento, tal como nos [apontadores](/cadeiras/p/apontadores-memoria/)) e o `it++` avança. Na prática escreves `auto it = v.begin()`, que pede ao compilador para deduzir o tipo comprido por ti. E o ciclo por intervalo (`for (int n : v)`) que usaste acima é açúcar sintático sobre estes mesmos iteradores.

## Algoritmos: sort e find

A biblioteca `<algorithm>` traz funções prontas que operam sobre intervalos de iteradores. As duas que vais usar já: `sort` ordena e `find` procura e devolve um iterador para o elemento (ou `end()` se não existir):

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {30, 10, 20};
    std::sort(v.begin(), v.end());
    for (int n : v) {
        std::cout << n << " ";
    }
    std::cout << "\n";
    auto it = std::find(v.begin(), v.end(), 20);
    if (it != v.end()) {
        std::cout << "Encontrei na posicao " << (it - v.begin()) << "\n";
    }
}
```

Isto escreve `10 20 30` e depois `Encontrei na posicao 1`. Repara que `find` devolve um iterador, não um índice: subtrair `v.begin()` converte para posição, e comparar com `v.end()` diz se a procura falhou. Este padrão (testar contra `end()`) aparece em quase todos os algoritmos de procura da STL. Se precisares de ordenar por outro critério, o `sort` aceita um terceiro argumento com a comparação, que escreves como função ou `lambda`; a ideia de passar comportamento como argumento vem da [programação funcional](/cadeiras/fp/programacao-funcional/) que já conheces.

## Exemplo completo: contar e ordenar

Vamos escrever uma função genérica `contar_maiores` que conta quantos elementos de um vetor excedem um limite, e usá-la com dois tipos diferentes. Depois ordenamos um dos vetores com `sort`:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

template <typename T>
int contar_maiores(const std::vector<T>& v, const T& limite) {
    int n = 0;
    for (const T& x : v) {
        if (x > limite) {
            n++;
        }
    }
    return n;
}

int main() {
    std::vector<int> notas = {8, 12, 15, 9, 18};
    std::vector<double> temps = {36.5, 37.8, 36.9, 38.2};
    std::cout << contar_maiores(notas, 10) << "\n";
    std::cout << contar_maiores(temps, 37.0) << "\n";
    std::sort(notas.begin(), notas.end());
    std::cout << notas.front() << " " << notas.back() << "\n";
}
```

Isto escreve `3`, `2` e `8 18`. Confere: em `notas`, excedem `10` o `12`, o `15` e o `18`; em `temps`, excedem `37.0` o `37.8` e o `38.2`. Depois de ordenar, `front()` é o menor (`8`) e `back()` é o maior (`18`). A função serviu os dois tipos sem duplicação, e o vetor passou por referência constante: sem cópia e sem alterações.
