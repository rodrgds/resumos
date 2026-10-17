---
title: Cheat sheet de FP
description: Tipos, controlo, funções, coleções, recursão, estilo livre de efeitos, ficheiros e falhas.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Caderno FP SofiaViP
      url: https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view
    - title: Programa de FP, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586981
---

As tabelas reúnem operações, condições e casos limite. As ligações levam às explicações e à prática.

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

| Decisão             | Regra                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definir ou chamar   | `def` define; `f(argumento)` chama; `f` passa a função como valor.                                                                                                    |
| Devolver ou mostrar | `return` termina a chamada e entrega o resultado. `print` escreve e devolve `None`; sem `return` explícito, também devolve `None`.                                    |
| Passar um objeto    | Não o copia. Reatribuir o parâmetro muda o nome local; alterar uma lista recebida muda o objeto partilhado.                                                           |
| Escrever o contrato | Define domínio, resultado, casos limite e efeitos.                                                                                                                    |
| Valor por defeito   | Avaliado quando `def` executa. Para uma lista nova por chamada, usa `None` e cria-a no corpo.                                                                         |
| Manter pureza       | Depende dos valores recebidos, sem efeitos observáveis fora do cálculo. Um acumulador local não é, por si só, um efeito no chamador; sem atribuições é mais restrito. |

[Retorno e saída](/cadeiras/fp/funcoes/#return-e-print). [Passagem de argumentos](/cadeiras/fp/funcoes/#passagem-de-argumentos-e-efeitos). [Valores por defeito](/cadeiras/fp/funcoes/#argumentos-por-nome-e-valores-por-defeito). [Pureza](/cadeiras/fp/programacao-funcional/#funções-livres-de-efeitos).

## Escolher uma coleção

- **`str`:** texto ordenado e imutável. Índice inválido falha; fatia ajusta limites. `upper` e `replace` devolvem texto sem alterar a string.
- **`tuple`:** sequência imutável. `(x,)` tem um elemento; um elemento mutável interior pode mudar.
- **`list`:** conserva ordem e repetições, e pode mudar. `append` acrescenta um objeto; `extend` percorre outro iterável. Métodos mutadores costumam devolver `None`.
- **`dict`:** associa chaves a valores e conserva a ordem de inserção. Chaves são hashable; `in` testa chaves; `get` não cria a chave.
- **`set`:** elementos únicos, sem posição. `set()` é vazio; `{}` é dicionário. Não uses a ordem do conjunto como saída.

- `b = a` cria um alias. `a.copy()` copia só o recipiente. Numa matriz, as linhas podem continuar partilhadas.
- `[[0] * c] * r` repete a mesma linha; `[[0] * c for _ in range(r)]` cria linhas independentes.
- `sorted(xs)` devolve outra lista; `xs.sort()` altera a existente.
- `A | B` é união; `A & B`, interseção; `A - B`, diferença com direção; `A ^ B`, diferença simétrica. `A <= B` testa subconjunto.
- `zip` termina no iterável mais curto por defeito; valida comprimentos iguais se o contrato exigir.

[Fatias](/cadeiras/fp/strings/#fatias). [Alias e cópia](/cadeiras/fp/tuplos-listas/#alias-contra-cópia-igualdade-contra-identidade). [Cópia superficial](/cadeiras/fp/tuplos-listas/#listas-de-listas-e-cópia-superficial). [Conjuntos](/cadeiras/fp/dicionarios-conjuntos/#conjuntos-e-pertença).

## Transformar e reduzir

| Operação            | Forma e contrato                                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transformar         | `map(f, xs)` devolve um iterador com `f(x)` para cada entrada.                                                                                                                                       |
| Selecionar          | `filter(p, xs)` conserva as entradas onde `p(x)` é verdadeiro.                                                                                                                                       |
| Acumular            | `reduce(f, xs, z)` faz um fold à esquerda a partir de `z`. Com `xs` vazio devolve `z`; sem inicial, o vazio falha.                                                                                   |
| Compreensão         | `[f(x) for x in xs if p(x)]` filtra e constrói uma lista nova; não garante ausência de efeitos se `f(x)` alterar objetos. Um `if ... else` dentro da expressão escolhe valores, não retira posições. |
| Chave de ordenação  | `sorted(registos, key=lambda r: (-r[1], r[0]))` ordena pelo segundo campo decrescente e pelo primeiro crescente.                                                                                     |
| Devolver uma função | Uma closure conserva acesso ao âmbito envolvente. O contexto não é automaticamente uma cópia de cada valor.                                                                                          |

- Um iterador consumido não recomeça. Usa lista para índices e vários percursos; gerador para consumo progressivo.
- `(f(x) for x in xs)` é gerador; `yield` entrega um valor e suspende; o próximo pedido retoma depois de `yield`; `return` termina.
- Filtrar positivos antes de elevar ao quadrado exclui negativos; filtrar os quadrados já não os exclui. A paridade de um inteiro, pelo contrário, mantém-se no seu quadrado.

[Compreensões](/cadeiras/fp/compreensoes-geradores/#compreensões-de-listas). [Geradores](/cadeiras/fp/compreensoes-geradores/#geradores-e-yield). [Map, filter e reduce](/cadeiras/fp/programacao-funcional/#map-filter-e-reduce). [Closures](/cadeiras/fp/programacao-funcional/#devolver-funções-e-âmbito-léxico).

## Recursão e pesquisa

- Escreve o caso base e uma medida que diminui até ele.
- Devolve o resultado da chamada recursiva.
- Considera profundidade, chamadas repetidas e cópias de fatias. Python não elimina chamadas em posição terminal.

| Técnica                   | Pré-condição                  | Custo típico no pior caso |
| ------------------------- | ----------------------------- | ------------------------- |
| Pesquisa linear           | Nenhuma ordenação exigida     | $O(n)$ comparações        |
| Pesquisa binária          | Lista ordenada                | $O(\log n)$ iterações     |
| Dois percursos sucessivos | Cada um visita $n$ entradas   | $O(n)$                    |
| Todos os pares            | Há $n(n-1)/2$ pares distintos | $O(n^2)$                  |

- Escolhe uma convenção para ausência, como `None`, e não a uses como índice.
- Uma função binária que encontra uma ocorrência não garante a primeira.
- Pertença em dicionários e conjuntos tem custo médio esperado constante, não uma garantia de pior caso constante.
- Define `n` e o trabalho contado antes de usar Big-O.

[Recursão](/cadeiras/fp/recursao/#o-modelo-da-recursão). [Pesquisas](/cadeiras/fp/algoritmos-complexidade/#pesquisa-linear-e-pesquisa-binária). [Custo](/cadeiras/fp/algoritmos-complexidade/#contar-operações).

## Construções para combinar

- Dígitos de um inteiro `n >= 0`, em base inteira `b >= 2`: repete `n % b` e `n //= b`. Os restos saem do menos para o mais significativo; inverte-os para escrever o número.
- Representa zero por `"0"`. Um inteiro invertido não conserva zeros à esquerda.
- Frequências de ramos diferentes: soma as contagens da mesma chave, sem as substituir. Uma sublista vazia contribui com `{}`.
- Árvore de expressões: calcula os dois operandos antes de aplicar o operador, conservando a ordem.
- Para somar exatamente um alvo com preços positivos, retira a primeira posição nos ramos escolher e ignorar; só escolher reduz o alvo.
- Alvo zero aceita a escolha vazia; alvo negativo falha, pois os preços são positivos. Diminuir as posições garante terminação; $n$ posições admitem $2^n$ escolhas.
- `any` procura um verdadeiro; `all` procura um falso. `any([])` é `False` e `all([])` é `True`.
- «Cada peça existe em alguma caixa» difere de «uma caixa contém todas as peças»: a ordem dos percursos importa. Repetir percursos interiores exige coleções reutilizáveis, não iteradores consumidos.
- Para pares de posições distintos, usa `j > i`.
- Reservas semiabertas $[a,b[$ e $[c,d[$, com início menor que fim, conflituam se `max(a, c) < min(b, d)`; um contacto no extremo não conta. Intervalos fechados exigem outra condição.
- Para gerar intervalos inteiros inclusivos, percorre cada par com `range(inicio, fim + 1)` e `yield valor`. Exige `inicio <= fim`; conserva a ordem e as repetições sem guardar todos os inteiros.

[Dígitos e bases](/cadeiras/fp/condicoes-ciclos/#construir-um-número-a-partir-dos-dígitos). [Resultados recursivos](/cadeiras/fp/recursao/#combinar-resultados-recursivos). [Árvores de expressões](/cadeiras/fp/recursao/#expressões-como-árvores). [Any e all](/cadeiras/fp/programacao-funcional/#any-all-e-condições-sobre-coleções). [Fronteiras](/cadeiras/fp/compreensoes-geradores/#pares-de-posições-e-fronteiras).

## Ficheiros, falhas e verificação

| Decisão                                                                     | Regra                                                                                                                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Abrir e fechar](/cadeiras/fp/ficheiros-excecoes/#ler-e-escrever-ficheiros) | `with open(caminho, "r", encoding="utf-8") as f:` fecha o recurso ao sair. Caminhos relativos partem da pasta de trabalho. |
| Escolher o modo                                                             | `"w"` substitui o conteúdo; `"a"` acrescenta; `"x"` exige um ficheiro novo. Para CSV, usa `csv` e `newline=""`.            |
| Distinguir o fim                                                            | `readline()` devolve `""` no fim; uma linha em branco é normalmente `"\n"`.                                                |

| Bloco                                                                                | Quando corre                                                                                                                                          |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`except Tipo`](/cadeiras/fp/ficheiros-excecoes/#exceções-try-except-else-e-finally) | Trata a falha esperada; não escondas qualquer defeito com um tratador indiscriminado.                                                                 |
| `else`                                                                               | Apenas se o `try` terminar normalmente, sem `return`, `break` ou `continue`.                                                                          |
| `finally`                                                                            | Sempre na saída.                                                                                                                                      |
| `raise` / `assert`                                                                   | `raise` comunica a falha ao chamador. `assert` verifica hipóteses internas e pode ser desativado; entradas inválidas precisam de validação explícita. |

- O primeiro tratador compatível ganha. Coloca `FileNotFoundError` antes de `OSError`, pois o primeiro é também um caso do segundo. Sem tratador compatível, a falha propaga-se ao chamador.
- Calcula o resultado esperado antes de executar. [Testa](/cadeiras/fp/ficheiros-excecoes/#asserções-e-testes) limites, vazio, repetições e entradas inválidas. Se falhar, reduz a entrada e localiza o primeiro estado que diverge do esperado.
