---
title: Folha de consulta de P
description: Regras e armadilhas de C++ para rever tipos, funções, memória, templates, classes e ficheiros.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos de Programação, SofiaViP
      url: https://drive.google.com/file/d/1tGxsf5qYJZxWgZgGnUcAc2juFPSrEPUo/view
  coverage: Consulta breve dos tópicos das páginas 2 a 12 dos Resumos Prog de SofiaViP, com correções de regras de linguagem quando necessárias.
  gaps:
    - O documento não identifica uma edição atual da cadeira nem uma versão de C++; confirma a ferramenta e o programa da tua ocorrência.
    - Esta folha omite programas completos, testes e demonstrações; segue os links para as explicações.
---

Esta folha condensa os [Resumos de Programação de SofiaViP](https://drive.google.com/file/d/1tGxsf5qYJZxWgZgGnUcAc2juFPSrEPUo/view). A fonte usa bastante `new`, `delete` e arrays C. Mantém essas regras para ler código antigo, mas prefere objetos que gerem a própria memória quando escreves código novo.

## Tipos, expressões e controlo

- `int`, `char`, `bool` e os tipos de vírgula flutuante têm representações distintas. A norma **não fixa em todos os sistemas** que `int` tem 4 bytes ou que `long` tem 8: usa `sizeof(T)` e os limites de `<limits>` quando a largura importa. `void` indica ausência de valor de retorno, não o tipo de uma variável. [Ver tipos](/cadeiras/p/cpp-fundamentos/#declarar-variáveis-com-tipos-fixos).
- Uma expressão inteira pode perder a parte fracionária antes de ser atribuída a `double`: `5 / 2` vale `2`, enquanto `5.0 / 2` vale `2.5`. `&&` e `||` avaliam o segundo operando apenas quando precisam. O operador `?:` escolhe uma das duas expressões; `switch` prossegue pelos casos seguintes sem `break` ou outra saída.
- `while` testa antes de entrar; `do ... while` executa o corpo pelo menos uma vez. Uma variável local sem inicialização não tem valor seguro para ler. `const` impede modificar o objeto através desse nome ou referência; não significa, por si só, que todas as referências ao mesmo objeto sejam constantes.
- Diretivas `#include` são tratadas antes da compilação; um cabeçalho declara interfaces, mas não substitui a ligação das definições necessárias. `namespace` organiza nomes; `std::` identifica nomes da biblioteca padrão. [Ver compilação](/cadeiras/p/cpp-fundamentos/#compilar-e-correr-com-g).

## Funções e passagem de argumentos

Por **valor**, a função recebe uma cópia; por **referência** (`T&`), opera sobre o objeto original; por `const T&`, evita uma cópia e promete não modificar através dessa referência. Um apontador (`T*`) também pode dar acesso ao original, mas pode ser nulo. Escolhe `const T&` para objetos grandes só de leitura e `T&` quando a alteração é parte do contrato. [Ver referências](/cadeiras/p/cpp-fundamentos/#referências-contra-cópias).

Argumentos por defeito ficam no fim da lista de parâmetros e devem estar visíveis no ponto de chamada. Uma **sobrecarga** distingue funções pelo número ou tipo dos parâmetros, não apenas pelo tipo de retorno. Chamar uma função template ou uma sobrecarga exige que o compilador encontre uma opção válida sem ambiguidade.

## Arrays e texto

- Um array `T a[N]` tem $N$ elementos contíguos. Índices válidos vão de `0` a `N - 1`; ler ou escrever fora deles é comportamento indefinido. Ao passar um array C a uma função, ele decai para apontador e a dimensão deixa de acompanhar o argumento. Usa `std::vector` quando o tamanho varia e `std::array` quando é fixo e conhecido em compilação. [Ver memória contígua](/cadeiras/p/apontadores-memoria/#apontadores-e-arrays).
- Uma **C string** termina no byte `\0`. Texto com $n$ caracteres exige pelo menos $n+1$ posições no array; `strlen` não conta o terminador. `strcpy` e `strcat` só são seguras se o destino tiver espaço para todos os caracteres e o terminador. `std::string` gere o tamanho e é a opção habitual para texto. [Ver strings](/cadeiras/p/cpp-fundamentos/#strings).
- Uma `struct` reúne campos e pode ter **padding**, por isso `sizeof(struct)` pode exceder a soma dos `sizeof` dos campos. Arrays multidimensionais C guardam os elementos de uma linha de forma contígua; ao passar a uma função, as dimensões posteriores precisam de estar no tipo.

## Apontadores e duração de vida

`&x` obtém o endereço de `x`; `*p` acede ao objeto apontado por `p`; `p->campo` equivale a `(*p).campo`. Só desreferencies um apontador que aponta para um objeto ainda vivo. `nullptr` não aponta para um objeto; não se lê nem escreve através dele. Uma referência tem de ser inicializada e não pode ser redirecionada depois. [Ver endereços](/cadeiras/p/apontadores-memoria/#endereço-de-e-dereferenciação).

`new T` emparelha com `delete`; `new T[n]` com `delete[]`. Depois de libertar o objeto, todos os apontadores que o referiam ficam pendentes. Esquecer a libertação causa **fuga**; libertar duas vezes ou usar depois de libertar é erro. O destrutor de um objeto automático corre ao sair do âmbito, inclusive quando uma exceção sai dele. Por isso, prefere **RAII**, `std::vector` e smart pointers para que a libertação acompanhe a duração de vida do dono. [Ver RAII](/cadeiras/p/apontadores-memoria/#o-essencial-de-raii-e-smart-pointers).

## Estruturas ligadas

Numa lista simplesmente ligada, cada nó aponta para o seguinte; uma lista dupla guarda também o anterior. Mantém claros o **primeiro**, o **último** e o caso vazio. Ao remover um nó, liga primeiro os vizinhos e só depois o destrói; ao destruir a lista, guarda `next` antes de libertar o nó atual. Inserir no início com o primeiro nó conhecido custa $O(1)$; encontrar uma posição custa $O(n)$.

Numa árvore binária de pesquisa sem duplicados, chaves menores ficam à esquerda e maiores à direita. Inserção e procura custam $O(h)$, com $h$ a altura; sem equilíbrio, $h$ pode ser $n-1$. Destruir uma árvore exige visitar os filhos antes de libertar o pai. Estas estruturas da fonte mostram a gestão manual; para coleções usuais, consulta também [`vector`, `map` e `set`](/cadeiras/p/templates-stl/#map-e-set-chaves-e-conjuntos).

## Templates, classes e ficheiros

Uma função ou classe **template** define código parametrizado por tipos. O compilador instancia-o quando o usa com tipos concretos; a operação escrita no corpo tem de existir nesses tipos. `typename` e `class` são equivalentes na declaração simples de um parâmetro de tipo. [Ver funções template](/cadeiras/p/templates-stl/#funções-template).

Uma **classe** agrupa estado e operações. O construtor inicializa o objeto; o destrutor liberta recursos que ele possui. Copiar um objeto que detém um recurso exige decidir como duplicar ou partilhar esse recurso. Quando escreves um destrutor, construtor de cópia ou atribuição de cópia manual, revê também as restantes operações de cópia e movimento; sempre que possível, deixa esses trabalhos a membros que seguem RAII. Métodos `const` não alteram o estado observável através desse objeto. [Ver construtores e cópia](/cadeiras/p/classes-objetos/#copiar-objetos-com-memória-própria).

`ifstream` lê ficheiros, `ofstream` escreve e `fstream` permite ambos. Confirma que a abertura resultou; `getline` lê uma linha, enquanto `>>` separa tokens por espaços. `eof()` só fica verdadeiro **depois** de uma tentativa de leitura que chega ao fim: usa a própria leitura como condição do ciclo. [Ver ficheiros](/cadeiras/p/cpp-fundamentos/#ler-e-escrever-ficheiros).
