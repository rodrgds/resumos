---
title: Espaços vetoriais, bases e dimensão
description: Subespaços, independência linear, bases, dimensão e coordenadas, tudo em R elevado a n.
section: conteudo
order: 4
---

Até aqui trabalhámos com contas. Esta página muda o ponto de vista: em vez de olhar para os números, olhamos para a estrutura do conjunto onde vivem as soluções. As noções de subespaço, independência linear, base e dimensão são o vocabulário com que o resto da cadeira se exprime, das aplicações lineares aos valores próprios.

## O espaço R elevado a n

O conjunto $\mathbb{R}^n$ contém todos os $n$-tuplos de números reais, $(x_1, x_2, \dots, x_n)$, com soma e produto por escalar feitos coordenada a coordenada. Para $n = 2$ são os pontos do plano, para $n = 3$ os do espaço. Um **espaço vetorial** (também chamado espaço linear) é qualquer conjunto com uma soma e um produto por escalar que obedecem às mesmas regras: associatividade, comutatividade, elemento neutro, simétricos, e as quatro regras que ligam a soma ao produto por escalar. $\mathbb{R}^n$ é o exemplo que interessa nesta cadeira, e todos os resultados vão ser aplicados nele.

## Subespaços: conjuntos fechados para as operações

Um **subespaço** $F$ de $\mathbb{R}^n$ é um subconjunto não vazio tal que:

1. se $u, v \in F$, então $u + v \in F$;
2. se $u \in F$ e $k \in \mathbb{R}$, então $ku \in F$.

Ou seja, consegues somar e multiplicar por escalares sem sair do conjunto. Todo o subespaço contém o vetor nulo (basta fazer $0 \cdot u$).

Exemplo: a reta $y = 2x$ no plano é um subespaço de $\mathbb{R}^2$. Somando $(a, 2a) + (b, 2b) = (a+b, 2(a+b))$ continuas na reta, e o mesmo vale para múltiplos. Já a reta $y = 2x + 1$ **não** é subespaço: nem sequer contém $(0, 0)$.

:::tip[O teste rápido]
Para mostrar que um conjunto definido por equações é subespaço, verifica três coisas: contém o zero, a soma de dois elementos verifica as equações e um múltiplo escalar também. Se falhar logo no zero, está despachado. Convém também verificar que o conjunto não é vazio, mas conter o zero já trata disso.
:::

A **interseção** de subespaços é sempre um subespaço. A **união**, em geral, não é: a união dos dois eixos coordenados em $\mathbb{R}^2$ contém $(1, 0)$ e $(0, 1)$ mas não a soma $(1, 1)$. Para juntar subespaços usa-se a **soma** $F + G = \{u + v : u \in F, v \in G\}$.

## Independência linear

Um conjunto de vetores $\{v_1, v_2, \dots, v_k\}$ é **linearmente independente** quando a única combinação linear que dá o vetor nulo é a trivial:

$$
\alpha_1 v_1 + \alpha_2 v_2 + \dots + \alpha_k v_k = 0 \implies \alpha_1 = \alpha_2 = \dots = \alpha_k = 0.
$$

Se existir uma combinação não trivial, os vetores são **linearmente dependentes**: pelo menos um deles escreve-se como combinação dos outros.

Testa $\{u_1 = (1, 0), u_2 = (1, 1)\}$ em $\mathbb{R}^2$. A equação $\alpha_1(1,0) + \alpha_2(1,1) = (0,0)$ dá o sistema $\alpha_1 + \alpha_2 = 0$, $\alpha_2 = 0$, cuja única solução é $\alpha_1 = \alpha_2 = 0$. São independentes. Por contraste, $(1, 2)$ e $(2, 4)$ são dependentes, porque $2 \cdot (1,2) - 1 \cdot (2,4) = (0,0)$: o segundo é o dobro do primeiro.

Há dois factos que orientam a intuição. Qualquer conjunto com mais vetores do que a dimensão do espaço é dependente (em $\mathbb{R}^2$, três vetores são sempre dependentes). E qualquer conjunto que contenha o vetor nulo é dependente, porque podes multiplicar o zero por um escalar não nulo e os restantes por zero.

## Bases e dimensão

Uma **base** é um conjunto que gera todo o espaço e é linearmente independente: gera porque qualquer vetor se escreve como combinação linear dos vetores da base, e é independente porque essa escrita é única. Os coeficientes dessa escrita única chamam-se **coordenadas** do vetor na base.

A base mais simples de $\mathbb{R}^n$ é a **base canónica**: $e_1 = (1, 0, \dots, 0)$, $e_2 = (0, 1, \dots, 0)$, até $e_n$. Qualquer $(x_1, \dots, x_n)$ escreve-se $x_1 e_1 + \dots + x_n e_n$, e as coordenadas na base canónica são as próprias componentes.

Todas as bases do mesmo espaço têm o mesmo número de vetores. Esse número é a **dimensão** do espaço: $\dim \mathbb{R}^n = n$. Daqui saem dois critérios práticos muito usados nos exercícios:

- para mostrar que $n$ vetores formam uma base de $\mathbb{R}^n$, basta mostrar que são independentes (ou que geram; uma das condições chega quando o número de vetores iguala a dimensão);
- a dimensão de um subespaço é o número de vetores de qualquer base dele, e calcula-se contando as variáveis livres da sua descrição.

Exemplo: qual é a dimensão do plano $x + y + z = 0$ em $\mathbb{R}^3$? Fazendo $y = s$, $z = t$, obtemos $x = -s - t$, logo os pontos são $s(-1, 1, 0) + t(-1, 0, 1)$. Os dois vetores geram o plano e são independentes (nenhum é múltiplo do outro), por isso formam uma base e a dimensão é 2. Em geral, cada equação independente "retira" uma dimensão.

## Coordenadas numa base

Se $B = \{b_1, b_2, \dots, b_n\}$ é uma base e $v = \alpha_1 b_1 + \dots + \alpha_n b_n$, escreve-se $v_B = (\alpha_1, \dots, \alpha_n)_B$. Por exemplo, com a base $B = \{(1, 1), (1, -1)\}$ de $\mathbb{R}^2$, o vetor $v = (3, 1)$ satisfaz $(3, 1) = a(1,1) + b(1,-1)$, ou seja, $a + b = 3$ e $a - b = 1$. Somando, $a = 2$; subtraindo, $b = 1$. As coordenadas são $v_B = (2, 1)_B$. Repara que $(3, 1)$ e $(2, 1)$ designam o mesmo vetor em bases diferentes: as coordenadas só fazem sentido quando dizes a base. A página de mudanças de base mostra como passar de umas para as outras sem resolver o sistema de raiz.

## O que costuma correr mal

- Chamar subespaço a um conjunto que não contém o zero, como uma reta ou plano deslocado da origem.
- Confundir "gerar" com "ser independente": gerar diz que chegas a todo o lado, independência diz que não há vetores a mais. Base é as duas coisas.
- Afirmar independência sem resolver o sistema $\alpha_1 v_1 + \dots = 0$. Intuição geométrica ("apontam para lados diferentes") ajuda, mas a prova é a conta.
- Esquecer que as coordenadas dependem da base e comparar coordenadas calculadas em bases diferentes.
