---
title: Programação linear
description: Modelar otimização com variáveis, restrições e objetivo, resolver no gráfico e perceber o salto para inteiros.
section: conteudo
order: 6
---

A programação linear trata de otimizar uma função linear sujeita a restrições lineares. A técnica aqui não é um algoritmo que executas à mão em geral, é a **modelação**: traduzir um problema de palavras para variáveis, restrições e função objetivo. Com duas variáveis ainda resolves no gráfico, e esse caso pequeno ensina a geometria toda: o ótimo está sempre num vértice da região admissível.

## Modelar em três passos

Primeiro, escolhe as **variáveis de decisão** com unidades claras. Depois escreve as **restrições** como desigualdades lineares, uma por cada limite do problema. Por fim, escreve a **função objetivo** a minimizar ou maximizar. Se alguma relação for curva ou envolver produtos de variáveis, o problema já não é linear e esta técnica não se aplica diretamente.

## Exemplo: dieta com duas variáveis

Queres planear quantidades $x$ e $y$ de dois alimentos, com custos 2 e 3 por unidade, garantindo pelo menos 5 unidades de nutriente P ($x + 2y \ge 5$) e pelo menos 6 de nutriente Q ($3x + y \ge 6$), com $x, y \ge 0$. O modelo é minimizar $2x + 3y$ sujeito a essas restrições.

No gráfico, cada restrição corta um semiplano e a região admissível é o polígono ilimitado acima das duas retas. Os vértices são as interseções: $(0, 6)$ com custo 18, $(1{,}4;\, 1{,}8)$ com custo $2 \times 1{,}4 + 3 \times 1{,}8 = 8{,}2$, e $(5, 0)$ com custo 10. O ótimo é o vértice do meio: **$x = 1{,}4$, $y = 1{,}8$, custo 8,2**. Repara que a solução usa frações: $1{,}4$ unidades de um alimento só fazem sentido se ele for divisível.

## O salto para inteiros

Exige agora unidades inteiras (pacotes indivisíveis). Arredondar $(1{,}4;\, 1{,}8)$ para $(1, 2)$ falha: $1 + 4 = 5$ cumpre P mas $3 + 2 = 5 < 6$ viola Q, ou seja, o arredondado nem sequer é admissível. Testando vizinhos inteiros admissíveis: $(2, 2)$ custa 10, $(3, 1)$ custa $6 + 3 = 9$, e nada admissível custa 8. O **ótimo inteiro é $(3, 1)$ com custo 9**, pior que os 8,2 fracionários. Esta é a lição da programação linear inteira (ILP): o ótimo inteiro não é o arredondamento do ótimo contínuo, e encontrá-lo é em geral muito mais difícil, o que liga esta página aos problemas exponenciais de [complexidade e aproximação](/cadeiras/da/complexidade-aproximacao/).

:::tip[Como cai em teste]
O enunciado dá-te o problema em palavras e pede o modelo, não o algoritmo simplex. Escreve variáveis com unidades, lista as restrições numeradas e identifica a função objetivo. Se pedir a solução gráfica, marca os vértices com os custos ao lado e sublinha o mínimo: a apresentação conta tanto como a conta.
:::
