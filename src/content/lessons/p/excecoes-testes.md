---
title: "Exceções e testes"
description: throw, try e catch, segurança com RAII, boas práticas, comentários de documentação e testes com asserts.
section: conteudo
order: 6
---

Até aqui, quando algo corria mal (índice inválido, divisão por zero, ficheiro inexistente), o programa ou avariava ou devolvia um código de erro que ninguém verificava. As **exceções** dão ao erro um caminho próprio: o código que deteta o problema **lança** (throw) um objeto de erro, e o código que sabe lidar com ele **apanha** (catch) esse objeto, mesmo que esteja várias chamadas acima na pilha. Já viste esta ideia em Python nos [ficheiros e exceções](/cadeiras/fp/ficheiros-excecoes/); a mecânica em C++ é gémea, com uma diferença importante na gestão da memória.

## Lançar e apanhar

Envolve o código arriscado num bloco `try` e trata cada tipo de erro num bloco `catch`. O exemplo clássico é o acesso verificado `at()` do `vector`, que lança `std::out_of_range` quando o índice sai dos limites:

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30};
    try {
        std::cout << v.at(1) << "\n";
        std::cout << v.at(10) << "\n";
        std::cout << "Nunca chega aqui\n";
    } catch (const std::out_of_range& e) {
        std::cout << "Indice invalido\n";
    }
    std::cout << "O programa continua\n";
}
```

Isto escreve `20`, depois `Indice invalido` e depois `O programa continua`. O primeiro `at` corre bem e escreve `20`. O segundo lança a exceção: o resto do bloco `try` é abandonado (a terceira linha nunca executa) e o controlo salta para o `catch` correspondente. Depois do `catch`, o programa segue normalmente. Sem o `try`, a exceção não apanhada terminava o programa com uma mensagem de erro.

Para os teus próprios erros, lança objetos da biblioteca `<stdexcept>`, como `std::runtime_error`, com uma mensagem que explique o problema:

```cpp
#include <iostream>
#include <stdexcept>

double dividir(double a, double b) {
    if (b == 0.0) {
        throw std::runtime_error("divisao por zero");
    }
    return a / b;
}

int main() {
    try {
        std::cout << dividir(7.0, 2.0) << "\n";
        std::cout << dividir(1.0, 0.0) << "\n";
    } catch (const std::runtime_error& e) {
        std::cout << "Erro: " << e.what() << "\n";
    }
}
```

Isto escreve `3.5` e depois `Erro: divisao por zero`. O método `what()` devolve a mensagem guardada na exceção. Repara que o `catch` recebe por referência constante (`const ... &`): apanhar por valor copiava o objeto e podia cortar informação de tipos derivados, o mesmo problema de slicing que viste na [herança](/cadeiras/p/heranca-polimorfismo/).

:::tip[Exceções são para o excecional]
Usa exceções para situações anómalas (ficheiro em falta, índice impossível, pré-condição violada), não para controlar o fluxo normal do programa. Um ciclo que tentasse índices até apanhar `out_of_range` funcionava, mas seria lento e ilegível; para isso há o `size()`. Reserva o `throw` para o caso que não devia acontecer.
:::

## Exceções e RAII: a memória continua segura

Aqui está a diferença que importa em relação a Python. Quando uma exceção atravessa funções, todos os objetos locais dessas funções são destruídos pelo caminho (chama-se **desenrolamento da pilha**, stack unwinding). Se os teus recursos estiverem em objetos com destrutores, como o `vector` ou os smart pointers dos [apontadores](/cadeiras/p/apontadores-memoria/), a limpeza acontece sozinha mesmo no caminho da exceção:

```cpp
#include <iostream>
#include <memory>
#include <stdexcept>

void arriscar() {
    std::unique_ptr<int> p = std::make_unique<int>(99);
    std::cout << *p << "\n";
    throw std::runtime_error("algo correu mal");
}

int main() {
    try {
        arriscar();
    } catch (const std::runtime_error& e) {
        std::cout << "Apanhei: " << e.what() << "\n";
    }
}
```

Isto escreve `99` e depois `Apanhei: algo correu mal`, e a memória do inteiro é libertada no desenrolamento, sem `delete` escrito por ti. Se em vez do smart pointer tivesses um `new` cru seguido de `throw` antes do `delete`, essa memória fugia: é a demonstração mais curta de porque o C++ moderno prefere RAII a gestão manual.

## Boas práticas

As regras abaixo não são estilo pessoal; são o que distingue um programa que passa nos testes de um programa que passa nos testes e se consegue ler um mês depois:

- **Nomes honestos**: variáveis e funções com nomes que dizem o que guardam ou fazem (`media`, não `m`; `numero_aluno`, não `x2`). Se precisares de um comentário para explicar o nome, muda o nome.
- **Funções curtas com uma tarefa**: se uma função faz duas coisas, divide-a em duas. Cada função cabe idealmente num ecrã, e o seu nome descreve o resultado ou o efeito.
- **`const` por omissão**: parâmetros que só se leem, métodos que não alteram o objeto e variáveis locais que não voltam a mudar. O compilador passa a trabalhar para ti.
- **Sem números mágicos**: o `20` da nota máxima ou o `3.1416` do $pi$ devem ser constantes com nome (`const int NOTA_MAX = 20;`), declaradas uma vez. Quando o valor mudar, muda num sítio.
- **Sem `using namespace std;` nos cabeçalhos**: num ficheiro pequeno parece inofensivo, mas polui todos os ficheiros que o incluem e pode colidir com os teus nomes. Escreve `std::` ou importa só o que usas.
- **Compila sem avisos**: `-Wall` ligado sempre, como viste nos [fundamentos](/cadeiras/p/cpp-fundamentos/), e trata cada aviso como um erro até prova em contrário.

## Documentar com comentários

Documenta a **intenção**, não a sintaxe: o código já diz o que faz, o comentário diz porquê e em que condições. O formato corrente em C++ usa comentários `///` antes de cada função pública, com o que recebe, o que devolve e que exceções pode lançar; ferramentas como o Doxygen geram páginas a partir deles:

```cpp
/// Calcula a media de tres notas.
/// Devolve um valor entre 0 e 20.
/// Nao valida as entradas: o chamador garante notas validas.
double media(double a, double b, double c) {
    return (a + b + c) / 3.0;
}
```

Três linhas chegam para outra pessoa (ou tu, daqui a dois meses) usar a função sem ler o corpo. Comenta também as decisões surpreendentes no meio do código: um `+ 1` para compensar indexação, uma ordem de argumentos exigida por uma biblioteca. Não comentes o óbvio (`i++; // incrementa i` é ruído, não documentação).

## Testar com asserts

Um **teste** executa o teu código com entradas conhecidas e confirma as saídas. O instrumento mais simples em C++ é o `assert` da biblioteca `<cassert>`: verifica uma condição e, se ela for falsa, termina o programa indicando o ficheiro e a linha. É ideal para testar funções puras enquanto as escreves:

```cpp
#include <cassert>
#include <iostream>

int quadrado(int x) {
    return x * x;
}

void testar_quadrado() {
    assert(quadrado(0) == 0);
    assert(quadrado(5) == 25);
    assert(quadrado(-3) == 9);
}

int main() {
    testar_quadrado();
    std::cout << "Testes passaram\n";
}
```

Isto escreve `Testes passaram`. Se algum `assert` falhasse, o programa abortava nessa linha em vez de continuar com um valor errado. O hábito que a cadeira espera: para cada função que escreves, uma função `testar_*` com dois ou três casos, incluindo os casos limite (zero, negativos, vazio). Quando mais tarde mudares a implementação, corres os testes e sabes logo se partiste alguma coisa.

Repara que o `assert` desaparece nas compilações otimizadas com `NDEBUG` definido: serve para apanhar os teus erros durante o desenvolvimento, não para validar dados do utilizador em produção. Para entradas vindas de fora (teclado, ficheiro), usa verificações normais com `if` e exceções, como no início desta página.

:::details[Uma rotina de trabalho completa]
Para cada exercício: lê o enunciado e escreve dois ou três exemplos à mão com resultado esperado; declara a função com um comentário `///`; implementa-a; escreve a função `testar_*` com os teus exemplos mais um caso limite; compila com `-Wall` e corre. Se um teste falhar, o erro está ou no código ou no teu exemplo à mão, e descobrir qual dos dois é metade da aprendizagem.
:::
