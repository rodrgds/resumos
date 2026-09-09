---
title: Complexidade e invariantes
description: Notação assintótica para tempo e espaço, e invariantes para provar a correção de ciclos.
section: conteudo
order: 1
---

Dois programas fazem o mesmo e um deles demora o dobro. Qual escolhes? A resposta séria depende do tamanho da entrada: o dobro numa lista de dez elementos é ruído, numa lista de dez milhões é a diferença entre responder hoje e responder amanhã. A análise de complexidade mede como o custo cresce com a entrada, e os invariantes provam que o programa calcula o que promete. São as duas ferramentas que vais usar em todas as páginas desta cadeira.

## O que conta como custo

Fixar primeiro o que se mede: o **tamanho da entrada** $n$ (número de elementos, de vértices, de bits) e o **custo** que interessa (comparações, acessos à memória, operações elementares). O resto é ruído de máquina e ignora-se. Quando dissermos que um algoritmo é $O(n^2)$, estamos a dizer que o número de operações elementares cresce no máximo com o quadrado de $n$, a menos de constantes.

A notação Big-O descreve um **limite superior**: $f(n) = O(g(n))$ significa que, a partir de certo $n$, $f(n)$ fica abaixo de uma constante vezes $g(n)$. Há mais duas que vais encontrar: $\Omega$ para limite inferior (o algoritmo custa pelo menos isto) e $\Theta$ quando os dois limites coincidem (o custo é exatamente desta ordem). Na prática da cadeira, $O$ domina: queres garantir que o programa aguenta o pior caso.

Os tempos que interessam, do melhor para o pior: $O(1)$ constante, $O(\log n)$ logarítmico, $O(n)$ linear, $O(n \log n)$, $O(n^2)$ quadrático e $O(2^n)$ exponencial. Decora a intuição, não a lista: logaritmo é "cortar o problema a metade em cada passo", $n \log n$ é "cortar e depois juntar", quadrático é "comparar tudo com tudo".

## Linear contra binária em $n = 1000$

Recorda a [pesquisa linear e binária](/cadeiras/fp/algoritmos-complexidade/): a linear percorre o vetor até encontrar, a binária exige o vetor ordenado e descarta metade a cada comparação. Conta comparações no pior caso com $n = 1000$.

Na linear, o pior caso é o elemento estar na última posição ou não existir: $1000$ comparações. Na binária, cada comparação elimina metade dos candidatos: depois de $k$ comparações restam $1000 / 2^k$ elementos, e o processo termina quando resta um, ou seja $2^k \geq 1000$. Como $2^9 = 512$ e $2^{10} = 1024$, bastam $k = 10$ comparações. Mil contra dez, e a diferença aumenta com $n$: para um milhão, a linear faz um milhão de comparações e a binária faz $20$, porque $2^{20} = 1\,048\,576$.

O preço da binária está fora da pesquisa: alguém teve de ordenar o vetor primeiro, e ordenar custa pelo menos $O(n \log n)$. Se pesquisares uma vez num vetor desordenado, ordenar mais pesquisar sai mais caro que a linear. A análise decide consoante o uso, não em abstrato.

## Espaço também conta

A **complexidade espacial** mede a memória extra além da entrada. A pesquisa binária iterativa usa $O(1)$ de espaço extra (algumas variáveis); a versão recursiva usa $O(\log n)$ pela pilha de chamadas. O mergesort, que vais seguir na próxima página, precisa de um vetor auxiliar de tamanho $n$: tempo $O(n \log n)$, espaço $O(n)$. O quicksort no próprio vetor usa $O(\log n)$ de pilha em média. Quando a memória é curta, esta coluna da tabela pesa tanto como a do tempo.

## Invariantes: provar o ciclo

Complexidade diz quanto custa; **correção** diz que o resultado está certo. Para ciclos, a técnica é o **invariante**: uma afirmação sobre as variáveis que é verdadeira antes de cada iteração e que, combinada com a condição de saída, implica o resultado.

Toma a soma dos primeiros $n$ inteiros:

```cpp
int soma = 0;
for (int i = 1; i <= n; i++) {
    soma += i;
}
```

O invariante é: antes da iteração com valor $i$, vale $soma = (i-1) \cdot i / 2$. Verifica por indução sobre $i$, como aprendeste em [indução](/cadeiras/md/inducao-recorrencia/): para $i = 1$, $soma = 0$ e $(1-1) \cdot 1 / 2 = 0$. Se vale para $i$, a iteração soma $i$ e obtém $(i-1) \cdot i / 2 + i = (i^2 - i + 2i)/2 = i \cdot (i+1)/2$, que é exatamente o invariante para $i+1$. Quando o ciclo termina, $i = n+1$, e o invariante dá $soma = n \cdot (n+1)/2$, a fórmula fechada. O invariante transforma "o ciclo parece somar tudo" numa prova.

:::tip[Como escrever um invariante]
Descreve o que já está feito em função do contador: "antes da iteração $i$, as primeiras $i-1$ posições estão tratadas". Depois confirma três pontos: vale antes da primeira iteração, cada iteração preserva-o, e com a condição de saída ele implica o resultado. Se algum falhar, ou o invariante está mal escrito ou o programa tem um erro.
:::

## Para levar para a próxima página

A análise de um algoritmo não é a mesma coisa que a classe de um problema: um algoritmo concreto corre em $O(n^2)$ enquanto o problema pode admitir solução melhor. A distinção entre "este programa custa isto" e "este problema exige pelo menos isto" reaparece em [complexidade](/cadeiras/tc/complexidade/), com as classes P e NP. Já a seguir, aplica estas contas à [pesquisa e ordenação](pesquisa-ordenacao/).
