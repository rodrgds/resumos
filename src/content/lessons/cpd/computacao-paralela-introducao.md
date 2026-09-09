---
title: Introdução à computação paralela
description: Speedup, eficiência e tempo de execução, com um cálculo completo e a sua interpretação.
section: conteudo
order: 1
---

Um programa sequencial corre as instruções uma a uma. Um programa paralelo divide o trabalho por vários núcleos que avançam ao mesmo tempo. Esta página fixa o vocabulário mínimo da cadeira e as três medidas com que vais julgar qualquer paralelização.

## O vocabulário base

Um **processo** é um programa em execução com o seu espaço de memória. Uma **thread** é uma linha de execução dentro de um processo, que partilha a memória com as outras threads do mesmo processo. Um **núcleo** (_core_) é a unidade física do processador que executa instruções. Na parte paralela da cadeira trabalhas quase sempre com threads do mesmo processo em memória partilhada, tipicamente com OpenMP.

Dizemos que um trecho é **paralelizável** quando pode ser dividido em partes independentes. Somar os elementos de um vetor é paralelizável, porque cada núcleo soma uma fatia. Calcular os dígitos de uma recorrência em que cada valor depende do anterior não é, porque a ordem é obrigatória.

## As três medidas

Corre o mesmo programa em 1 núcleo e em $p$ núcleos e mede os tempos de parede (_wall-clock_), $T_1$ e $T_p$. A partir daí:

- **Speedup**: $S_p = T_1 / T_p$. Quantas vezes mais rápido ficou.
- **Eficiência**: $E_p = S_p / p$. Que fração do hardware foi aproveitada.
- **Tempo de execução**: $T_p$ em segundos, a medida que o utilizador sente.

O speedup ideal com $p$ núcleos é $p$, com eficiência de 100 por cento. Na prática fica sempre abaixo, por três razões que vais reencontrar a cadeira toda. Há trabalho que não se divide (a fração serial), há custo de coordenação (criar threads, sincronizar, comunicar) e há recursos partilhados que saturam (a memória e a cache).

## Exemplo completo

Um programa de tratamento de imagem demora $T_1 = 12$ s num núcleo e $T_4 = 4$ s em 4 núcleos. Calculamos:

$$
S_4 = \frac{12}{4} = 3{,}0 \qquad E_4 = \frac{3{,}0}{4} = 0{,}75
$$

O speedup é 3 e a eficiência é 75 por cento. A interpretação: dos 4 núcleos, um quarto do potencial perdeu-se. Os 12 s de trabalho sequencial viraram 4 s de relógio em vez dos 3 s ideais, por isso 1 s por núcleo foi para a fração serial e para o custo de coordenação. Se o enunciado pedir para julgar a paralelização, é isto que se responde, o número mais o destino do tempo perdido.

:::tip[Como pensar em teste]
Perante tempos com 1 e $p$ núcleos, calcula sempre as duas medidas e interpreta a eficiência. Uma eficiência abaixo de 50 por cento com poucos núcleos é sinal de que a coordenação ou a fração serial dominam, e sugere procurar o gargalo antes de pedir mais núcleos.
:::

:::warning[Speedup contra o quê]
O speedup honesto compara contra o melhor programa sequencial conhecido, não contra a versão paralela corrida com 1 thread. Comparar contra a versão paralela com uma thread esconde o custo da própria paralelização e inflaciona o número.
:::
