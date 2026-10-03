---
title: Cheat sheet de P
description: Tipos, passagem de argumentos, memória, cópia, objetos, STL, ficheiros e compilação.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos de Programação, SofiaViP
      url: https://drive.google.com/file/d/1tGxsf5qYJZxWgZgGnUcAc2juFPSrEPUo/view
---

## Tipos e funções

- `5 / 2` dá `2`; `5.0 / 2` dá `2.5`, porque a divisão usa os operandos. Converter o destino depois não recupera a fração. Divisão inteira por zero e overflow com sinal têm comportamento indefinido. [Expressões](/cadeiras/p/cpp-fundamentos/#operadores-e-divisão).
- `=` atribui; `==` compara. Um intervalo exige `min <= x && x <= max`, não `min <= x <= max`. `&&` e `||` usam curto-circuito. Inicializa antes de ler e confirma o sucesso de `cin`. [Entrada e controlo](/cadeiras/p/cpp-fundamentos/#entrada-e-saída-com-iostream).
- `T` passa por valor; `T&` dá acesso modificável; `const T&` evita a cópia e restringe esse acesso; `T*` pode ser nulo. Uma referência não muda de destino. Sobrecargas não se distinguem só pelo retorno. [Funções](/cadeiras/p/funcoes-arrays/#valor-referência-e-const).
- Um array C tem índices de `0` a `N-1`. Num parâmetro, ajusta-se para apontador e precisa de tamanho separado. `sizeof` do parâmetro não mede o array original. Uma string de C exige `\0`, logo `n+1` posições para `n` unidades de texto. [Arrays e texto](/cadeiras/p/funcoes-arrays/#arrays-c-e-dimensões).

## Memória e propriedade

| Expressão    | Significado                            |
| ------------ | -------------------------------------- |
| `p = &x`     | Guarda o endereço de x                 |
| `*p = 7`     | Altera o objeto apontado               |
| `p + i`      | Avança i elementos no mesmo array      |
| `p->campo`   | Equivale a `(*p).campo`                |
| `const T* p` | Apontador ajustável, acesso de leitura |
| `T* const p` | Endereço fixo, acesso modificável      |

- `[begin, end)` exclui o fim. A posição depois do último elemento pode marcar o fim, mas não pode ser desreferenciada. A aritmética não permite saltar entre objetos independentes. [Limites](/cadeiras/p/apontadores-memoria/#apontadores-e-arrays).
- Um objeto automático morre ao sair do âmbito; retornar o seu endereço não prolonga a vida. `new T` exige `delete`; `new T[n]` exige `delete[]`. `delete nullptr` é válido; desreferenciar `nullptr` não é. Após destruição, todos os aliases ficam pendentes. Pôr um deles a nulo não repara os outros. [Duração](/cadeiras/p/apontadores-memoria/#pilha-área-livre-e-duração-de-vida).
- RAII liga a libertação à vida do dono. Prefere `vector`, `string` e `unique_ptr`; usa `shared_ptr` só com propriedade realmente partilhada. Um observador não prolonga a vida do recurso. [RAII](/cadeiras/p/apontadores-memoria/#o-essencial-de-raii-e-smart-pointers).

## Objetos, cópia e herança

- O construtor deve estabelecer o invariante; cada operação pública deve conservá-lo. Bases e membros constroem-se antes do corpo, pela ordem de declaração; destroem-se em ordem inversa. `const` depois do método permite consulta por objeto constante. [Classes](/cadeiras/p/classes-objetos/#construtores-e-destrutor).
- `T b = a` constrói uma cópia; `b = a` atribui a um objeto existente. A cópia de apontador copia o endereço. Um dono precisa de decidir entre cópia profunda, partilha ou cópia proibida. Na atribuição, prepara o novo recurso antes de perder o anterior. [Cópia](/cadeiras/p/copia-propriedade/#atribuir-sem-perder-o-recurso-anterior).
- Regra de três: destrutor, construção e atribuição de cópia. Regra de cinco acrescenta movimento. Regra de zero prefere membros que já gerem recursos. `std::move` permite movimento; a operação escolhida efetua-o. Não assumes um estado concreto da origem sem contrato. [Movimento](/cadeiras/p/copia-propriedade/#regras-de-três-cinco-e-zero).
- Virtual pela referência ou apontador da base usa o tipo dinâmico. `override` confere a substituição, incluindo `const`. Copiar para um objeto base provoca slicing. `= 0` declara uma virtual pura. Destruir derivadas pela base exige destrutor virtual. [Polimorfismo](/cadeiras/p/heranca-polimorfismo/#funções-virtuais-e-override).

## STL

- `vector` oferece índice constante e inserção no fim amortizada constante. `list` permite remoção constante com posição conhecida, mas procura linear. `map` e `set` ordenam chaves e oferecem procura logarítmica. `unordered_map` procura em tempo médio constante, sem ordem fixa. [Escolha](/cadeiras/p/templates-stl/#escolher-um-contentor).
- `reserve` muda capacidade; `resize` muda tamanho. Uma realocação de `vector` invalida todos os acessos aos elementos. `erase` invalida na posição e depois; usa o iterador devolvido para continuar. Não desreferencies `end()`. [Invalidação](/cadeiras/p/templates-stl/#invalidação-de-iteradores).
- `sort` exige acesso aleatório e um comparador estrito, com `comp(x, x) == false`. `unique` remove repetidos adjacentes do intervalo lógico; `remove_if` compacta; ambos precisam de `erase` para reduzir o contentor. Pesquisa binária exige a ordenação adequada. `map[chave]` pode inserir; `find` consulta sem inserir. [Algoritmos](/cadeiras/p/templates-stl/#algoritmos-sort-e-find).

## Erros, ficheiros e build

- `while (fluxo >> valor)` usa apenas leituras válidas. `eof()` descreve o passado, não prevê a leitura. `getline` conserva espaços interiores; valida todos os campos e rejeita conteúdo extra. [Ficheiros](/cadeiras/p/ficheiros/#ler-sem-antecipar-o-fim).
- Exceções destroem donos automáticos já construídos ao sair dos âmbitos. Apanha por referência constante. Um destrutor não deve deixar sair exceções. Testa fronteiras a partir do contrato; `assert` pode desaparecer com `NDEBUG`. Sanitizers só observam os caminhos executados. [Erros e testes](/cadeiras/p/excecoes-testes/#testar-com-asserts).
- O cabeçalho declara; o `.cpp` define; a ligação reúne os ficheiros objeto. Uma definição em falta causa erro de ligação. Templates precisam da definição visível na instanciação. [Módulos](/cadeiras/p/organizar-programas/#compilação-e-ligação).

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g programa.cpp -o programa
cmake -S . -B build
cmake --build build
```
