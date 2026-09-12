---
title: Cheat sheet de FP
description: Decisões rápidas sobre Python, coleções, funções, algoritmos e erros, a partir do caderno SofiaViP.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Caderno FP SofiaViP
      url: https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view
  coverage: Síntese das páginas 3 a 28 do caderno, de tipos e controlo a funções, coleções, recursão, programação funcional, pesquisa, custos, ficheiros e exceções.
  gaps:
    - Os exemplos de física, turtle e acesso à Web não entram nesta folha.
    - Os pesos de avaliação históricos do caderno não foram transportados para uma edição atual.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Esta folha serve para escolher uma operação ou um padrão durante a resolução de problemas. O caderno começa por **decompor** o problema, reconhecer padrões, abstrair os dados relevantes e escrever um algoritmo antes do programa. Se o resultado estiver errado, distingue [erro de sintaxe, erro de execução e erro de lógica](/cadeiras/fp/primeiros-programas/#python-e-os-três-tipos-de-erros).

## Valores e controlo

| Decisão               | Regra curta                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guardar ou comparar   | `x = valor` associa um nome a um objeto; `x == y` compara valores. `is` testa identidade, não substitui `==`.                                                                          |
| Dividir inteiros      | `a / b` dá quociente real; `a // b` arredonda para baixo; `a % b` é o resto, com `a == (a // b) * b + a % b`, para `b != 0`.                                                           |
| Escolher um ramo      | `if` / `elif` / `else`; combina condições com `and`, `or` e `not`. Confere a precedência ou usa parênteses.                                                                            |
| Repetir               | `for` quando percorres uma sequência ou `range(início, fim, passo)`, cujo `fim` fica excluído; `while` quando a condição determina o fim. Garante que o estado muda e o ciclo termina. |
| Interromper ou saltar | `break` sai do ciclo mais interno; `continue` inicia a iteração seguinte.                                                                                                              |

Antes de usar uma expressão, verifica [tipos e precedência](/cadeiras/fp/primeiros-programas/#operadores-e-precedência) e, em ciclos, o [limite excluído de `range`](/cadeiras/fp/condicoes-ciclos/#ciclos-for-e-a-função-range). `int`, `float`, `str` e `bool` são tipos diferentes; conversões têm de ser explícitas quando a operação as exige.

## Funções e estado

`def f(parametro): ...` **define** uma função; `f(argumento)` **chama-a**. `return` entrega um valor e termina a chamada. Sem `return`, o resultado é `None`, mesmo que a função escreva no ecrã. Os nomes locais de uma chamada não passam a existir fora dela. Usa [funções, retorno e âmbito](/cadeiras/fp/funcoes/#definir-e-chamar) para separar cálculo de apresentação.

Prefere uma função sem efeitos laterais quando queres reutilizar e testar um cálculo. Se mutares uma lista recebida, a alteração é visível para quem a passou. `assert condição` exprime uma suposição interna que deve ser verdadeira; não trata erros esperados de entrada. Usa docstrings para explicar o contrato e testes para comparar resultados esperados com os obtidos.

## Coleções: escolher antes de operar

| Necessidade           | Estrutura e armadilha                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Texto ordenado        | `str` é imutável; `s[i]` acede a um carácter, `s[a:b]` cria uma fatia e `s.find(x)` devolve `-1` se não encontrar.                                                         |
| Registo pequeno, fixo | `tuple` é imutável; um tuplo de um elemento precisa de vírgula: `(x,)`.                                                                                                    |
| Sequência alterável   | `list` é mutável; `append(x)` acrescenta **um** elemento, `extend(xs)` acrescenta os elementos de `xs`. `sort()` altera a lista e devolve `None`; `sorted(xs)` cria outra. |
| Acesso por chave      | `dict` associa chaves únicas a valores; `d[k]` lança `KeyError` se a chave faltar, `d.get(k, padrão)` permite um valor alternativo. Iterar `for k in d` percorre chaves.   |
| Unicidade ou pertença | `set` remove duplicados e não tem posição; `set.union`, `set.intersection` e `set.difference` calculam união, interseção e diferença. `frozenset` é imutável.              |

Em sequências, `a == b` compara conteúdo; `a is b` pergunta se são o mesmo objeto. `b = a` cria um **alias**, não uma cópia; para uma lista, `b = a.copy()` faz uma cópia superficial. Isto importa quando os elementos também são mutáveis. Vê [fatias de strings](/cadeiras/fp/strings/#fatias), [alias e cópia de listas](/cadeiras/fp/tuplos-listas/#alias-contra-cópia-igualdade-contra-identidade) e [dicionários e conjuntos](/cadeiras/fp/dicionarios-conjuntos/#dicionários-chaves-e-valores).

## Transformar dados

Uma compreensão `[f(x) for x in xs if p(x)]` **constrói uma lista**. `(f(x) for x in xs if p(x))` cria um gerador, que produz valores à medida que é percorrido e pode esgotar-se. `yield` permite escrever esse produtor como função. Escolhe [compreensão ou gerador](/cadeiras/fp/compreensoes-geradores/#geradores-e-yield) conforme precises de guardar todos os resultados.

`map(f, xs)` transforma; `filter(p, xs)` seleciona; `reduce(f, xs, inicial)`, de `functools`, acumula. Uma função de ordem superior recebe ou devolve funções. `lambda` escreve uma função curta; uma _closure_ conserva nomes do contexto em que foi criada. Usa `key=` em `sorted` para escolher a chave de ordenação. Consulta [map, filter e reduce](/cadeiras/fp/programacao-funcional/#map-filter-e-reduce).

Na recursão, identifica um **caso base** e mostra que cada chamada reduz o problema até lá. A pilha guarda as chamadas pendentes; para uma travessia simples, um ciclo costuma evitar esse custo. Confere o [modelo da recursão](/cadeiras/fp/recursao/#o-modelo-mental).

## Pesquisa e custo

| Tarefa                                                 | Condição                                                                        | Custo no pior caso                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Pesquisa linear                                        | Qualquer sequência                                                              | $O(n)$                                            |
| Pesquisa binária                                       | Sequência **ordenada**, com intervalo de procura reduzido a metade a cada passo | $O(\log n)$                                       |
| Indexar lista                                          | Índice conhecido                                                                | $O(1)$                                            |
| Procurar numa lista                                    | Sem índice ou outra estrutura                                                   | $O(n)$                                            |
| Procurar chave num dicionário ou elemento num conjunto | Tabela hash, custo **médio**                                                    | $O(1)$ em média, não garantia para todos os casos |
| Ordenar com `sorted`                                   | Elementos comparáveis ou `key`                                                  | $O(n\log n)$                                      |

Dois ciclos aninhados sobre $n$ elementos podem dar $O(n^2)$. A notação $O$ exprime um limite de crescimento, não um tempo em segundos nem, por si só, o melhor caso. Ordenar antes de uma única pesquisa custa mais do que percorrer uma vez; para muitas pesquisas na mesma coleção, essa preparação pode compensar. Vê [pesquisa binária](/cadeiras/fp/algoritmos-complexidade/#pesquisa-linear-e-pesquisa-binária) e [custos das operações](/cadeiras/fp/algoritmos-complexidade/#custo-das-operações-mais-usadas).

## Módulos, ficheiros e falhas

`import modulo` mantém o nome qualificado (`modulo.funcao`); `from modulo import funcao` introduz o nome no espaço atual. Para ficheiros, `with open(caminho, "r", encoding="utf-8") as f:` fecha o recurso ao sair do bloco; `"w"` cria ou **substitui** o conteúdo. Decide se queres ler tudo (`read`), percorrer linhas ou escrever (`write`), e considera o tamanho do ficheiro.

`try` envolve a operação que pode falhar; `except ErroEspecifico` trata a falha esperada; `else` só corre sem exceção; `finally` corre na saída do bloco. Capturar erros demasiado amplos pode esconder defeitos. Vê [ficheiros](/cadeiras/fp/ficheiros-excecoes/#ler-e-escrever-ficheiros), [exceções](/cadeiras/fp/ficheiros-excecoes/#exceções-try-except-else-e-finally) e [asserções e testes](/cadeiras/fp/ficheiros-excecoes/#asserções-e-testes).
