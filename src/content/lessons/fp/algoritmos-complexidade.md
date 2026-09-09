---
title: Algoritmos e complexidade
description: Pesquisa linear e binária, ordens de crescimento, notação Big-O e o custo das operações em listas e dicionários.
section: conteudo
order: 10
---

Dois programas corretos podem ter velocidades muito diferentes. Esta página mostra como comparar algoritmos sem cronometrar: conta-se como o trabalho cresce com o tamanho da entrada. A recompensa é saberes prever, antes de correres, se o teu programa aguenta entradas grandes.

## Pesquisa linear e pesquisa binária

O problema é simples: dada uma lista e um valor alvo, dizer em que posição ele está (ou que não está). A **pesquisa linear** percorre os elementos por ordem até encontrar o alvo. Funciona em qualquer lista, ordenada ou não, mas no pior caso percorre a lista inteira.

```python
def pesquisa_linear(valores, alvo):
    for i in range(len(valores)):
        if valores[i] == alvo:
            return i
    return -1

print(pesquisa_linear([4, 2, 7, 1], 7))
print(pesquisa_linear([4, 2, 7, 1], 9))
```

Isto escreve `2` e `-1`. Devolver `-1` quando o valor não existe é a convenção usada nesta cadeira; alternativa seria devolver `None`, mas o `-1` nunca é uma posição válida, por isso não há ambiguidade.

Se a lista estiver **ordenada**, há melhor. A **pesquisa binária** compara o alvo com o elemento do meio: se for igual, acabou; se o alvo for menor, continua na metade esquerda; se for maior, na metade direita. Cada comparação exclui metade dos candidatos. É a ordenação que legitima este descarte: numa lista desordenada, um valor menor do que o meio poderia estar à direita, e excluir a metade direita seria errado.

```python
def pesquisa_binaria(valores, alvo):
    inicio, fim = 0, len(valores) - 1
    while inicio <= fim:
        meio = (inicio + fim) // 2
        if valores[meio] == alvo:
            return meio
        elif alvo < valores[meio]:
            fim = meio - 1
        else:
            inicio = meio + 1
    return -1

print(pesquisa_binaria([2, 5, 8, 11, 14, 17, 20], 14))
print(pesquisa_binaria([2, 5, 8, 11, 14, 17, 20], 9))
```

Isto escreve `4` e `-1`. Segue a procura de `14` na lista de sete elementos: o meio inicial é a posição `3` (valor `11`); como $14 > 11$, a metade esquerda sai e o intervalo passa a `[4, 6]`. O novo meio é a posição `5` (valor `17`); como $14 < 17$, o intervalo passa a `[4, 4]`. O meio é a posição `4` (valor `14`): encontrado em três comparações. A condição `inicio <= fim` garante que o ciclo termina também quando o alvo não existe: o intervalo encolhe até ficar vazio.

## Ordens de crescimento e Big-O

Para comparar algoritmos, mede-se o **tempo de execução** $T(n)$: o número de passos em função do tamanho $n$ da entrada. Mas os detalhes (quantos passos exatos, que computador) interessam menos do que a forma como o tempo cresce. Uma **ordem de crescimento** é um conjunto de funções com comportamento equivalente: $2n$, $100n$ e $n + 1$ são todas lineares, porque para entradas grandes o que conta é crescer proporcionalmente a $n$.

A **notação Big-O** exprime esse crescimento como um limite superior: dizer que um algoritmo é $O(n)$ significa que o número de passos cresce no máximo linearmente com $n$.

| Complexidade  | Nome         | Exemplo                                   |
| ------------- | ------------ | ----------------------------------------- |
| $O(1)$        | Constante    | Aceder a `lista[i]`                       |
| $O(\log n)$   | Logarítmica  | Pesquisa binária                          |
| $O(n)$        | Linear       | Pesquisa linear, travessia                |
| $O(n \log n)$ | Quase-linear | Ordenar com `sorted`                      |
| $O(n^2)$      | Quadrática   | Dois ciclos aninhados sobre a mesma lista |

A diferença entre $O(n)$ e $O(\log n)$ é dramática em entradas grandes. Com $n = 1\,000\,000$, a pesquisa linear faz até um milhão de comparações; a binária faz cerca de $\log_2(1\,000\,000) \approx 20$. Por isso a pergunta "a lista está ordenada?" muda completamente o algoritmo a escolher. O preço da binária é a pré-condição: exige a lista ordenada, e ordenar custa $O(n \log n)$.

## Custo das operações mais usadas

Escolher a estrutura certa exige saber quanto custa cada operação:

| Operação                                       | Custo típico    |
| ---------------------------------------------- | --------------- |
| Aceder a `lista[i]`, `append`, `pop()` no fim  | $O(1)$          |
| `pop(i)` e `insert(i, x)` no meio              | $O(n)$          |
| Percorrer, `in` numa lista, concatenar com `+` | $O(n)$          |
| Ordenar com `sorted`                           | $O(n \log n)$   |
| Aceder, inserir e apagar em dicionário         | $O(1)$ em média |
| Percorrer chaves de um dicionário              | $O(n)$          |

Duas consequências práticas. Primeira: testar pertença muitas vezes numa lista grande (`x in lista` repetido) é quadrático no total; converter para conjunto ou dicionário torna cada teste $O(1)$. Segunda: construir uma lista inserindo sempre na posição `0` é $O(n^2)$, porque cada inserção desloca todos os elementos; acrescentar no fim com `append` é $O(1)$ por operação.

Por vezes um algoritmo mais rápido ocupa mais memória: guardar resultados já calculados num dicionário (memoização) evita recomputações à custa de espaço. Tempo e espaço negoceiam-se; a análise serve para fazeres essa troca de olhos abertos.

## Exemplo completo: comparar os dois algoritmos

O programa seguinte conta comparações em vez de tempo, para a comparação não depender do computador. Procura o valor `999` numa lista ordenada de `1000` elementos.

```python
def conta_linear(n):
    comparacoes = 0
    for i in range(n):
        comparacoes += 1
        if i == n - 1:
            break
    return comparacoes

def conta_binaria(n):
    comparacoes = 0
    inicio, fim = 0, n - 1
    while inicio <= fim:
        comparacoes += 1
        meio = (inicio + fim) // 2
        if meio == n - 1:
            break
        elif meio < n - 1:
            inicio = meio + 1
        else:
            fim = meio - 1
    return comparacoes

print(conta_linear(1000))
print(conta_binaria(1000))
```

Isto escreve `1000` e `10`. A linear percorre as mil posições; a binária encontra o último elemento em dez comparações, porque cada passo reduz o intervalo para cerca de metade ($2^{10} = 1024 \geq 1000$). Generalizando: duplicar o tamanho da entrada duplica o trabalho da linear, mas acrescenta apenas uma comparação à binária.

:::tip[Como analisar o teu código]
Identifica o que é $n$ (normalmente o comprimento da lista ou da string) e conta as operações dominantes: um ciclo simples sobre a entrada é $O(n)$; dois ciclos aninhados sobre a mesma entrada são $O(n^2)$; um ciclo que reduz o problema para metade a cada volta é $O(\log n)$. Ignora constantes e termos mais pequenos: num algoritmo com um ciclo $O(n)$ seguido de uma ordenação $O(n \log n)$, a ordenação domina.
:::
