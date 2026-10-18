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

## Tipos e divisão

| Quero                | Regra                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| Fração de inteiros   | Converte antes: `static_cast<double>(a) / b`. `a / b` inteiro perde a fração |
| Sinal de `-7 / 2`    | `-3`, resto `-1`. Trunca para zero                                           |
| Proteger `soma / n`  | `n != 0 && soma / n > 10`. Com `n == 0`, a segunda parte não corre           |
| Intervalo `0` a `20` | `0 <= nota && nota <= 20`. `0 <= nota <= 20` está errado                     |

Indefinido: divisão inteira por zero, overflow com sinal. [Expressões](/cadeiras/p/cpp-fundamentos/#operadores-e-divisão).

## Funções e arrays

| Preciso de         | Usa                                           |
| ------------------ | --------------------------------------------- |
| Ler sem copiar     | `const T&`                                    |
| Alterar original   | `T&`                                          |
| Pode faltar        | `T*`, testa nulo                              |
| Referência `r = b` | Copia valor para o referido. Não muda destino |

- Array `N` tem `0` a `N-1`. Em parâmetro vira apontador. Passa tamanho.
- Descer com `size_t`: `for (i = size(); i > 0;) { --i; lê v[i]; }`. Com `size() = 0`, não entra.
- Saída: devolve quantos escreveu. Chamador lê só esse prefixo.
- Letras `a` a `z`: 26 presenças, destino 27 com `\0`. Conta letras, não terminador. [Arrays](/cadeiras/p/funcoes-arrays/#arrays-c-e-dimensões). [Filtro](/cadeiras/p/funcoes-arrays/#arrays-de-entrada-e-de-saída). [Letras](/cadeiras/p/funcoes-arrays/#presença-de-letras-em-dois-textos).

## Memória

| Expressão    | Significado                                   |
| ------------ | --------------------------------------------- |
| `p = &x`     | Guarda o endereço de `x` em `p`               |
| `*p = 7`     | Altera o objeto apontado por `p`              |
| `p + i`      | Avança `i` elementos no mesmo array           |
| `const T* p` | O destino pode mudar; a leitura não altera    |
| `T* const p` | O destino não muda; a escrita altera o objeto |

- `[begin, end)` exclui o fim. O fim marca a paragem, não se lê.
- Automático morre no bloco. `new T` pede `delete`. `new T[n]` pede `delete[]`.
- Depois de `delete`, os outros acessos a esse objeto ficam pendentes.
  Atribuir `nullptr` só limpa esse nome.
- RAII: `vector`, `string`, `unique_ptr` primeiro. `shared_ptr` só com partilha real. [Limites](/cadeiras/p/apontadores-memoria/#apontadores-e-arrays). [Duração](/cadeiras/p/apontadores-memoria/#pilha-área-livre-e-duração-de-vida). [RAII](/cadeiras/p/apontadores-memoria/#o-essencial-de-raii-e-smart-pointers).

## Objetos e cópia

- Invariante primeiro. Valida antes de alterar. [Classes](/cadeiras/p/classes-objetos/#construtores-e-destrutor).
- `T b = a` constrói. `b = a` substitui existente.
- Atribuição segura: prepara cópia completa, troca sem lançar, destrói antiga. Libertar primeiro perde estado. [Cópia](/cadeiras/p/copia-propriedade/#atribuir-sem-perder-o-recurso-anterior).
- Três: destrutor, cópia, atribuição. Cinco: mais dois movimentos. Zero: prefere `vector`.
- `move` apenas permite selecionar movimento. A operação escolhida é que transfere. Na biblioteca padrão, a origem continua válida sem estado prometido; tipos como `unique_ptr` prometem mais, e nos teus tipos vale o teu contrato. Em `vector` e `string`, podes destruir, atribuir ou consultar `size()`; o acesso a elementos continua a pedir índice válido.

## Herança

- Virtual por referência ou apontador usa tipo dinâmico.
- `override` confere, incluindo `const`.
- Cópia para base faz slicing.
- `= 0` é pura, classe abstrata.
- Destruir por base pede destrutor virtual. [Polimorfismo](/cadeiras/p/heranca-polimorfismo/#funções-virtuais-e-override).

## STL por decisão

| Quero                          | Escolhe                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Índice e crescer no fim        | `vector`                                                                                                            |
| Chave ordenada                 | `map`, `set`; procura, inserção e remoção em `O(log n)` comparações                                                 |
| Chave sem ordem                | `unordered_map`; média `O(1)` com boa distribuição das chaves e hash/igualdade de custo constante; pior caso linear |
| Remover com iterador conhecido | `list` constante; localizar o elemento pode custar `O(n)`                                                           |

- `reserve(n)` só aumenta a reserva se `n` exceder a capacidade atual; não cria elementos nem diminui. `resize` muda o tamanho.
- No `vector`, realocar invalida todos os acessos aos elementos. `erase`
  no `vector` invalida os acessos da posição removida em diante. Usa o
  iterador devolvido.
- Comparador estrito: `comp(x, x)` falso. `<=` não serve. Só isso não prova transitividade.
- `unique`: junta adjacentes, devolve fim lógico, tamanho igual. Cauda válida sem valor prometido. Faz `erase` e não contes com ela. Ordena antes para todos os repetidos.
- `remove_if`: compacta por predicado. Também pede `erase`.
- Pesquisa: `lower_bound` exige intervalo particionado pelo mesmo
  comparador. Confirma `!= end()` e a igualdade.
- Consulta: `find` não insere. `map[chave]` insere um valor por omissão
  quando falta: `int` fica `0`, `string` fica vazia. [Contentor](/cadeiras/p/templates-stl/#escolher-um-contentor). [Invalidação](/cadeiras/p/templates-stl/#invalidação-de-iteradores). [Algoritmos](/cadeiras/p/templates-stl/#algoritmos-sort-e-find).

## Erros e ficheiros

- Ciclo: `while (fluxo >> valor)`. `eof()` conta passado, não prevê.
- Linha: `getline` mais `istringstream`. Confirma extração, sem sobra, domínio `0` a `20`.
- Incompleto dá linha inválida. Vazio não dá registo. [Ficheiros](/cadeiras/p/ficheiros/#ler-sem-antecipar-o-fim).
- Exceção: apanha por referência constante. Os destrutores devem libertar recursos sem deixar sair exceções; se uma exceção escapa de um destrutor chamado durante o desenrolamento, o programa termina com `std::terminate`.
- Básica conserva invariantes e evita fugas, sem prometer o valor. Forte
  não deixa efeitos observáveis.
- `assert` desaparece com `NDEBUG`. Sanitizers só veem o executado. [Testes](/cadeiras/p/excecoes-testes/#testar-com-asserts).

## Build

- O cabeçalho declara a função. O `.cpp` define-a. A ligação junta os
  objetos. Em falta dá `undefined reference`.
- Templates veem definição no cabeçalho. [Módulos](/cadeiras/p/organizar-programas/#compilação-e-ligação).

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g programa.cpp -o programa
cmake -S . -B build
cmake --build build
```
