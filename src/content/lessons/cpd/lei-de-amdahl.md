---
title: Lei de Amdahl e limites do paralelismo
description: A fração serial, o cálculo do speedup máximo e a leitura crítica do teto.
section: conteudo
order: 3
---

A [introdução](computacao-paralela-introducao/) mostrou que o speedup real fica abaixo do ideal. A lei de Amdahl quantifica esse teto a partir de uma só pergunta, que fração do programa não se divide.

## A lei

Seja $f$ a fração serial do tempo de execução, a parte que nem com infinitos núcleos acelera. A fração paralelizável é $1 - f$ e, com $p$ núcleos, demora $(1 - f)/p$. O speedup máximo é:

$$
S_p = \frac{1}{f + \frac{1 - f}{p}}
$$

O denominador lê-se como orçamento de tempo. A parcela $f$ nunca mexe. A parcela paralela encolhe com $p$, mas nunca chega a zero enquanto $p$ for finito. Quando $p$ tende para infinito, o speedup tende para $1/f$. É esse o teto, e ele depende só da fração serial.

## Exemplo completo

Um simulador passa 20 por cento do tempo a ler dados e a escrever resultados, trabalho serial, e 80 por cento a calcular, trabalho paralelizável. Então $f = 0{,}2$.

Com 4 núcleos:

$$
S_4 = \frac{1}{0{,}2 + 0{,}8/4} = \frac{1}{0{,}2 + 0{,}2} = 2{,}5
$$

Com 16 núcleos:

$$
S_{16} = \frac{1}{0{,}2 + 0{,}8/16} = \frac{1}{0{,}2 + 0{,}05} = 4{,}0
$$

Com infinitos núcleos:

$$
S_{\infty} = \frac{1}{0{,}2} = 5{,}0
$$

Repara no rendimento decrescente. Quadruplicar de 4 para 16 núcleos sobe o speedup de 2,5 para 4, um ganho de 60 por cento por 4 vezes mais hardware. E nenhum hardware do mundo passa de 5. A conclusão prática: quando o speedup estabiliza, o trabalho útil é atacar a fração serial, não comprar núcleos.

:::tip[Como pensar em teste]
O enunciado dá-te a fração serial de outra forma, por exemplo "30 por cento do tempo é leitura de ficheiros". Essa é o teu $f$, direto para a fórmula. Se te pedirem o número de núcleos para atingir certo speedup, resolve a equação em $p$ e arredonda para cima. Se não houver solução finita, o speedup pedido está acima do teto $1/f$, e é isso que deves responder.
:::

:::warning[O que a lei não conta]
Amdahl assume trabalho fixo e ignora custos de coordenação, por isso é um teto otimista. O speedup medido fica abaixo do calculado. Quando o problema cresce com o número de núcleos, a leitura muda e entra a lei de Gustafson, que a ficha não exige mas que explica por que programas reais escalam melhor do que Amdahl prevê para tamanho fixo.
:::
