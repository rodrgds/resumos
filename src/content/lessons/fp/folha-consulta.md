---
title: Cheat sheet de FP
description: Tipos, controlo, funções, coleções, recursão, estilo livre de efeitos, ficheiros e falhas.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Caderno FP SofiaViP
      url: https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view
    - title: Programa de FP, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560087
---

Usa esta folha para escolher uma operação e conferir as suas condições, ou seja, o contrato, os limites e os erros frequentes. As ligações levam à explicação e à prática.

## Valores e expressões

| Decisão                 | Regra                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Atribuir ou comparar    | `x = valor` associa um nome; `x == y` compara conteúdo; `x is y` testa identidade.                                                 |
| Converter entrada       | `input()` devolve `str`; `int` e `float` podem levantar `ValueError`. Decimais no código usam ponto.                               |
| Dividir                 | `/` calcula divisão; `//` arredonda o quociente para baixo; `%` dá o resto. Para inteiros e `b != 0`, `a == (a // b) * b + a % b`. |
| Interpretar precedência | `-2 ** 2` vale `-4`; `(-2) ** 2` vale `4`; a potência associa à direita. Usa parênteses.                                           |
| Comparar aproximações   | Define tolerância, como em `math.isclose`, ou o arredondamento pedido. `float` não representa todos os decimais exatamente.        |

[Expressões e precedência](/cadeiras/fp/primeiros-programas/#operadores-e-precedência). [Entrada e saída](/cadeiras/fp/primeiros-programas/#entrada-e-saída).

## Controlo e ciclos

| Padrão                   | Condição ou erro a conferir                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `if` / `elif` / `else`   | Escolhe o primeiro ramo verdadeiro. Dois `if` independentes podem executar ambos.                                |
| `and`, `or`, `not`       | `and` e `or` usam curto-circuito e devolvem operandos. Coloca a guarda antes da operação que pode falhar.        |
| `range(a, b, p)`         | `b` fica excluído; `p` não pode ser zero. Confere a direção do passo.                                            |
| Acumular soma ou produto | Inicializa soma com `0`, produto com `1`. Escreve o que já foi acumulado após cada iteração.                     |
| `while`                  | Confirma uma atualização que aproxima o estado do fim. Pode executar zero vezes.                                 |
| `break` / `continue`     | `break` sai do ciclo mais interno; `continue` salta o resto da iteração. Não saltes a atualização de um `while`. |
| `else` do ciclo          | Corre quando o percurso acaba normalmente, sem `break`, incluindo um percurso vazio.                             |

[Condições e curto-circuito](/cadeiras/fp/condicoes-ciclos/#comparar-e-combinar-condições). [Limites de range](/cadeiras/fp/condicoes-ciclos/#ciclos-for-e-a-função-range). [Terminação](/cadeiras/fp/condicoes-ciclos/#ciclos-while-e-terminação).

## Funções, âmbito e efeitos

`def` define; `f(argumento)` chama; `f` passa a função como valor. `return` termina a chamada e entrega o resultado. `print` escreve e devolve `None`; uma função sem retorno explícito também devolve `None`.

Passar um objeto não o copia. Reatribuir o parâmetro muda o nome local; alterar uma lista recebida muda o objeto partilhado. Define o domínio, o resultado, os casos limite e os efeitos no contrato. Os valores por defeito são avaliados quando `def` executa. Para uma lista nova por chamada, usa `None` e cria-a no corpo.

Uma função pura depende dos valores recebidos e não produz efeitos observáveis fora do cálculo. Um acumulador local não implica, por si só, um efeito no chamador; um enunciado que exige ausência de atribuições pode impor uma restrição adicional.

[Retorno e saída](/cadeiras/fp/funcoes/#return-e-print). [Passagem de argumentos](/cadeiras/fp/funcoes/#passagem-de-argumentos-e-efeitos). [Valores por defeito](/cadeiras/fp/funcoes/#argumentos-por-nome-e-valores-por-defeito). [Pureza](/cadeiras/fp/programacao-funcional/#funções-livres-de-efeitos).

## Escolher uma coleção

| Tipo    | Conserva                            | Armadilha                                                                                                    |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `str`   | Texto ordenado, imutável            | Índice inválido falha; fatia ajusta limites. Métodos devolvem texto novo.                                    |
| `tuple` | Sequência imutável                  | `(x,)` tem um elemento; um elemento mutável interior pode mudar.                                             |
| `list`  | Ordem, repetições, alterações       | `append` acrescenta um objeto; `extend` percorre outro iterável. Métodos mutadores costumam devolver `None`. |
| `dict`  | Chave para valor, ordem de inserção | Chaves são hashable. `in` testa chaves. `get` não cria a chave.                                              |
| `set`   | Elementos únicos, sem posição       | `set()` é vazio; `{}` é dicionário. Não uses ordem do conjunto como saída.                                   |

`b = a` cria um alias. `a.copy()` copia só o recipiente. Numa matriz, as linhas podem continuar partilhadas. `[[0] * c] * r` repete a mesma linha; `[[0] * c for _ in range(r)]` cria linhas independentes. `sorted(xs)` devolve outra lista; `xs.sort()` altera a existente.

`A | B` é união; `A & B`, interseção; `A - B`, diferença com direção; `A ^ B`, diferença simétrica. `A <= B` testa subconjunto. `zip` termina no iterável mais curto por defeito.

[Fatias](/cadeiras/fp/strings/#fatias). [Alias e cópia](/cadeiras/fp/tuplos-listas/#alias-contra-cópia-igualdade-contra-identidade). [Cópia superficial](/cadeiras/fp/tuplos-listas/#listas-de-listas-e-cópia-superficial). [Conjuntos](/cadeiras/fp/dicionarios-conjuntos/#conjuntos-e-pertença).

## Transformar e reduzir

| Operação            | Forma e contrato                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Transformar         | `map(f, xs)` devolve um iterador com `f(x)` para cada entrada.                                                                       |
| Selecionar          | `filter(p, xs)` conserva as entradas onde `p(x)` é verdadeiro.                                                                       |
| Acumular            | `reduce(f, xs, z)` faz um fold à esquerda a partir de `z`. Com `xs` vazio devolve `z`; sem inicial, o vazio falha.                   |
| Compreensão         | `[f(x) for x in xs if p(x)]` filtra e constrói uma lista. Um `if ... else` dentro da expressão escolhe valores, não retira posições. |
| Chave de ordenação  | `sorted(registos, key=lambda r: (-r[1], r[0]))` ordena pelo segundo campo decrescente e pelo primeiro crescente.                     |
| Devolver uma função | Uma closure conserva acesso ao âmbito envolvente. O contexto não é automaticamente uma cópia de cada valor.                          |

Um iterador consumido não recomeça. `(f(x) for x in xs)` é gerador; `yield` entrega um valor e suspende; `return` termina. Usa lista para índices e vários percursos, gerador para consumo progressivo. Verifica a ordem entre filtrar e transformar.

[Map, filter e reduce](/cadeiras/fp/programacao-funcional/#map-filter-e-reduce). [Closures](/cadeiras/fp/programacao-funcional/#devolver-funções-e-âmbito-léxico). [Compreensões](/cadeiras/fp/compreensoes-geradores/#compreensões-de-listas). [Geradores](/cadeiras/fp/compreensoes-geradores/#geradores-e-yield).

## Recursão e pesquisa

Na recursão, escreve o caso base e uma medida que diminui até ele. Devolve o resultado da chamada recursiva. Considera profundidade, chamadas repetidas e cópias de fatias. Python não elimina chamadas em posição terminal.

| Técnica                   | Pré-condição                  | Custo típico no pior caso |
| ------------------------- | ----------------------------- | ------------------------- |
| Pesquisa linear           | Nenhuma ordenação exigida     | $O(n)$ comparações        |
| Pesquisa binária          | Lista ordenada                | $O(\log n)$ iterações     |
| Dois percursos sucessivos | Cada um visita $n$ entradas   | $O(n)$                    |
| Todos os pares            | Há $n(n-1)/2$ pares distintos | $O(n^2)$                  |

Escolhe uma convenção para ausência, como `None`, e não a uses como índice. Uma função binária que encontra uma ocorrência não garante a primeira. Pertença em dicionários e conjuntos tem custo médio esperado constante, não uma garantia de pior caso constante. Define `n` e o trabalho contado antes de usar Big-O.

[Recursão](/cadeiras/fp/recursao/#o-modelo-da-recursão). [Pesquisas](/cadeiras/fp/algoritmos-complexidade/#pesquisa-linear-e-pesquisa-binária). [Custo](/cadeiras/fp/algoritmos-complexidade/#contar-operações).

## Ficheiros, falhas e verificação

`with open(caminho, "r", encoding="utf-8") as f:` fecha o recurso ao sair. `"w"` substitui o conteúdo; `"a"` acrescenta; `"x"` exige um ficheiro novo. Caminhos relativos partem da pasta de trabalho. `readline()` devolve `""` no fim; uma linha em branco é normalmente `"\n"`. Para CSV, usa `csv` e `newline=""`.

`except Tipo` trata a falha esperada; `else` corre sem exceção no `try`; `finally` corre na saída. `raise` comunica a falha ao chamador. Não escondas qualquer defeito com um tratador indiscriminado. `assert` verifica hipóteses internas e pode ser desativado. Entradas inválidas precisam de validação explícita.

Calcula o resultado esperado antes de executar. Testa limites, vazio, repetições e entradas inválidas conforme o contrato. Para uma falha, reduz a entrada e encontra a primeira instrução cujo estado diverge do esperado.

[Ficheiros](/cadeiras/fp/ficheiros-excecoes/#ler-e-escrever-ficheiros). [Exceções](/cadeiras/fp/ficheiros-excecoes/#exceções-try-except-else-e-finally). [Testes](/cadeiras/fp/ficheiros-excecoes/#asserções-e-testes).
