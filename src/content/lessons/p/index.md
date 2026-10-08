---
title: Programação
description: C++ explicado com programas executáveis, memória, objetos, STL, validação e exercícios próprios.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  sources:
    - title: Programação, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560094
    - title: Programação, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586987
    - title: Programação, Moodle 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=4881
    - title: The C++ Programming Language, Bjarne Stroustrup
      url: https://www.stroustrup.com/4th.html
    - title: Resumos de Programação, SofiaViP
      url: https://drive.google.com/file/d/1tGxsf5qYJZxWgZgGnUcAc2juFPSrEPUo/view
  coverage: Tipos, funções, arrays, texto, memória, classes, cópia e movimento, herança, templates, STL, ficheiros, exceções, testes, sanitizers e compilação separada.
  gaps:
    - A ficha de 2026/27 consultada não tem programa nem bibliografia preenchidos.
    - O Moodle de 2024/25 acessível contém informações e apoio, sem ficheiros letivos; faltam os slides e guiões docentes dessa edição.
    - Os suplementos estudantis locais não identificam todos o seu ano letivo e não confirmam o formato das provas atuais.
---

Os exemplos usam C++17. A contagem de notas acompanha tipos, ciclos, funções e validação; um relógio mostra como uma classe conserva estado válido; um buffer permite seguir cópia, atribuição e movimento. Os programas com ficheiros ou exceções têm instruções para execução local com GCC e CMake.

## Percurso

Começa pelos [Fundamentos de C++](/cadeiras/p/cpp-fundamentos/) e por [Funções, arrays e texto](/cadeiras/p/funcoes-arrays/). Aprende a ler condições, passar argumentos e definir intervalos antes de seguir [Apontadores e memória](/cadeiras/p/apontadores-memoria/).

[Classes e objetos](/cadeiras/p/classes-objetos/) explica como manter estado válido. [Cópia, movimento e propriedade](/cadeiras/p/copia-propriedade/) acompanha os recursos de cada objeto. Depois, [Herança e polimorfismo](/cadeiras/p/heranca-polimorfismo/) distingue uma interface base do objeto concreto e mostra o que se perde numa cópia por valor.

[Templates e STL](/cadeiras/p/templates-stl/) junta tipos genéricos, coleções e algoritmos. [Ficheiros e validação](/cadeiras/p/ficheiros/) trata dados externos. [Exceções e testes](/cadeiras/p/excecoes-testes/) explica falhas, limpeza e verificação. [Organizar e depurar programas](/cadeiras/p/organizar-programas/) reúne módulos, CMake, CLion e depuração.

A [Cheat sheet](/cadeiras/p/folha-consulta/) serve para rever regras e condições depois de estudar as explicações.

## Como praticar

Prevê a saída antes de correr um programa. Se houver apontadores, desenha objetos e setas; se houver ciclos, acompanha índice e acumulador; se houver classes, identifica o invariante. Depois compara a execução com a previsão e muda um caso de fronteira.

Os exercícios no fim das lições são próprios. Pedem leitura de código, decisão sobre contratos e escrita de funções. As respostas em C++ usam autoavaliação, por isso compara o comportamento e o raciocínio com a solução. Resolve primeiro sem abrir as pistas. Num projeto, aplica a mesma sequência a uma operação pequena de cada vez: contrato, implementação, teste e integração.

:::details[Programa e avaliação]

O âmbito segue a [ficha preenchida de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560094), confirmada em 8 de outubro de 2026. Inclui programação imperativa em C/C++, memória dinâmica, objetos, herança, templates, STL, exceções, bibliotecas padrão, módulos, documentação, testes e runtime sanitizers. As ferramentas indicadas são GCC, CMake e CLion.

Essa edição usa 10% de projeto e 90% de provas, com a componente de provas definida pelo máximo entre a média dos dois mini-testes e o recurso. Esta informação descreve 2025/26. A [ocorrência de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586987), consultada em 8 de outubro de 2026, ainda não apresenta programa, bibliografia nem regras de avaliação preenchidos. Confirma as condições, datas e materiais permitidos no SIGARRA e no Moodle da tua edição.
:::

:::details[Fontes e âmbito]

Para esta edição, a referência de escrita é C++17. Vens de Fundamentos de Programação com Python: aqui os tipos decidem a divisão, a memória tem duração explícita e os erros de limites não dão exceção por defeito. A ficha de 2025/26 indica como bibliografia obrigatória _C++ How to Program_, de Paul e Harvey Deitel, Pearson, 2016, e _C How to Program_, ISBN 978-0-13-705966-9. Como complemento, indica _The C Programming Language_, de Kernighan e Ritchie, ISBN 0-13-110362-8; _The C++ Programming Language_, de Bjarne Stroustrup, ISBN 978-0321563842; e _Big C++: Late Objects_, de Cay Horstmann, Wiley, 2017.

A [página de Stroustrup](https://www.stroustrup.com/4th.html) disponibiliza prefácio, índice e exercícios da quarta edição, orientada a C++11. Usa-a como referência de desenho; as regras de linguagem destas páginas seguem C++17. O arquivo estudantil local _FEUP_PROG_ acrescentou exemplos de tipos de exercícios sobre funções, arrays, strings, memória, classes, herança e STL. Os problemas de relógio e iteradores inspiram a prática, com contratos próprios e atribuição nos conjuntos correspondentes. As resoluções estudantis podem conter erros, por isso os programas destas páginas foram escritos e verificados separadamente.

Os [Resumos de Programação de SofiaViP](https://drive.google.com/file/d/1tGxsf5qYJZxWgZgGnUcAc2juFPSrEPUo/view) são um suplemento histórico sem ano letivo identificado. Os exemplos destas páginas foram escritos e verificados separadamente; quando um suplemento diverge, vale a ficha e o comportamento confirmado no compilador. A página acessível do [Moodle de 2024/25](https://moodle2425.up.pt/course/view.php?id=4881) contém informação e apoio, sem ficheiros de ensino descarregáveis.

As regras de linguagem foram confrontadas com o [rascunho público do padrão C++](https://eel.is/c++draft/), restringindo os exemplos a C++17, e as decisões de propriedade com as [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines). Compilação, avisos e sanitizers seguem a [documentação de GCC](https://gcc.gnu.org/onlinedocs/gcc/) e a organização do build segue a [documentação de CMake](https://cmake.org/cmake/help/latest/guide/tutorial/index.html).
:::
