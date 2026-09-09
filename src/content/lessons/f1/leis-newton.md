---
title: Leis de Newton e forças
description: As três leis, tipos de força, diagramas de corpo livre, equilíbrio estático e o plano inclinado com atrito resolvido.
section: conteudo
order: 2
---

A [cinemática](/cadeiras/f1/cinematica/) descreve o movimento. As leis de Newton explicam-no: ligam a aceleração de um corpo às **forças** que atuam sobre ele. Uma força é uma interação, medida em newtons ($\text{N}$), que empurra ou puxa um corpo numa direção.

## As três leis

A **primeira lei** (inércia) diz que um corpo mantém a sua velocidade, incluindo o repouso, quando a resultante das forças sobre ele é nula. É por isso que o estudo do movimento começa por somar vetorialmente todas as forças.

A **segunda lei** quantifica a relação entre força e movimento:

$$
\sum \vec{F} = m\vec{a}.
$$

A soma é vetorial e abrange todas as forças aplicadas ao corpo. A massa $m$, em quilogramas, mede a resistência do corpo a mudar de velocidade.

A **terceira lei** (ação e reação) diz que, se o corpo A exerce uma força sobre o corpo B, então B exerce sobre A uma força simétrica, com o mesmo módulo, a mesma direção e sentido oposto. As duas forças atuam em corpos diferentes, por isso nunca se cancelam no diagrama de um só corpo.

## Tipos de força

As forças que vais encontrar nestas páginas são poucas:

- **Peso**: $\vec{P} = m\vec{g}$, vertical e para baixo, com $g = 9{,}8\ \text{m/s}^2$. Atua sempre.
- **Normal** $\vec{N}$: força de contacto perpendicular à superfície, que impede a interpenetração. O seu módulo ajusta-se à situação, não é $mg$ por decreto.
- **Atrito**: opõe-se ao deslizamento (ou à sua tendência) e é paralelo à superfície. O atrito estático tem um máximo $\mu_s N$; o atrito cinético vale aproximadamente $\mu_c N$ enquanto houver deslizamento.
- **Elástica**: numa mola ideal, $\vec{F} = -k\vec{x}$, proporcional à deformação e oposta a ela, com $k$ em $\text{N/m}$.

## Diagramas de corpo livre

Antes de qualquer equação, isola mentalmente o corpo e desenha todas as forças com origem nele, indicando direção e sentido. Só depois escolhe eixos e decompõe cada força em componentes. Este hábito é a técnica de estudo central da cadeira, como explicado na [apresentação](index/).

:::tip[Como não esquecer forças]
Percorre esta lista para cada corpo: peso (sempre), contactos (uma normal por superfície, mais atrito se houver), molas ou fios (tensão ao longo do fio). Descreve cada força em palavras, por exemplo "normal do plano sobre o bloco, perpendicular ao plano". Se não consegues dizer quem exerce a força sobre o corpo, ela provavelmente não existe.
:::

## Equilíbrio estático

Um corpo em repouso permanente tem aceleração nula, logo a segunda lei reduz-se a

$$
\sum \vec{F} = \vec{0}.
$$

Isto dá uma equação por direção. Um candeeiro pendurado por um fio, por exemplo, tem tensão para cima e peso para baixo, logo $T = mg$. O equilíbrio estático é o caso mais simples, e é o teste de sanidade das equações: se a tua fórmula para a aceleração não dá zero quando esperas repouso, algo está mal.

## Exemplo completo: plano inclinado com atrito

Um bloco de massa $m = 5{,}0\ \text{kg}$ desce um plano inclinado de ângulo $\theta = 30^{\circ}$. Os coeficientes de atrito entre o bloco e o plano são $\mu_s = 0{,}40$ (estático) e $\mu_c = 0{,}20$ (cinético). Queremos saber se o bloco desliza e, nesse caso, com que aceleração.

O diagrama de corpo livre do bloco tem três forças: o peso $m\vec{g}$ vertical para baixo, a normal $\vec{N}$ perpendicular ao plano e o atrito paralelo ao plano, oposto ao movimento. Escolhemos eixos ao longo do plano ($x$, para baixo) e perpendicular ($y$, para fora). As componentes do peso são $mg\sin\theta$ ao longo do plano e $mg\cos\theta$ contra o plano.

Na direção $y$ não há movimento, logo $N = mg\cos\theta$. Com os números, $N = 5{,}0 \times 9{,}8 \times \cos 30^{\circ} \approx 49 \times 0{,}8660 \approx 42{,}4\ \text{N}$.

Antes de supor movimento, testa o repouso: a força que puxa o bloco plano abaixo é $mg\sin\theta = 49 \times 0{,}50 = 24{,}5\ \text{N}$, e o atrito estático máximo é $\mu_s N = 0{,}40 \times 42{,}4 \approx 17{,}0\ \text{N}$. Como $24{,}5 > 17{,}0$, o atrito estático não segura o bloco e ele desliza. (Em geral, o deslizamento começa quando $\tan\theta > \mu_s$, porque $mg\sin\theta > \mu_s mg\cos\theta$ simplifica para isso.)

Com o bloco a deslizar, o atrito passa a cinético: $f = \mu_c N = 0{,}20 \times 42{,}4 \approx 8{,}5\ \text{N}$, dirigido plano acima. A segunda lei na direção $x$ dá

$$
mg\sin\theta - f = ma, \qquad a = g\sin\theta - \mu_c g\cos\theta.
$$

Substituindo, $a = 9{,}8 \times 0{,}50 - 0{,}20 \times 9{,}8 \times 0{,}8660 \approx 4{,}90 - 1{,}70 \approx 3{,}2\ \text{m/s}^2$, dirigida plano abaixo. Como verificação, sem atrito daria $g\sin\theta = 4{,}9\ \text{m/s}^2$ e com atrito suficiente para travar ($\mu_c = \tan 30^{\circ} \approx 0{,}58$) daria zero. O nosso $3{,}2\ \text{m/s}^2$ fica entre os dois, como esperado.

:::warning[Os pares ação e reação não se cancelam]
O bloco puxa a Terra para cima com uma força simétrica ao seu peso, e empurra o plano com uma força simétrica à normal. Nenhuma destas entra no diagrama do bloco, porque atuam noutros corpos. Misturá-las no mesmo somatório é o erro mais comum desta página.
:::

## Para onde ir

Forças e acelerações contam a história instante a instante. O [trabalho e a energia](/cadeiras/f1/trabalho-energia/) contam a mesma história de outra forma, muitas vezes com menos contas.
