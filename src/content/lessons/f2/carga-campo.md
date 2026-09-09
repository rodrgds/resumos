---
title: Carga e campo elétrico
description: Lei de Coulomb, campo de cargas pontuais e sobreposição, com unidades e ordens de grandeza.
section: conteudo
order: 1
---

Tudo nesta cadeira começa com cargas paradas. A carga elétrica é uma propriedade da matéria, medida em coulombs ($\text{C}$), que aparece em dois sinais: cargas do mesmo sinal repelem-se, de sinais opostos atraem-se. O eletrão tem carga $-e$ e o protão $+e$, com a carga elementar $e = 1{,}602 \times 10^{-19}\ \text{C}$. Um coulomb é uma quantidade enorme à escala quotidiana: equivale à carga de cerca de $6 \times 10^{18}$ eletrões.

## Lei de Coulomb

Duas cargas pontuais $q_1$ e $q_2$ separadas pela distância $r$ atraem-se ou repelem-se com força de módulo

$$
F = k\,\frac{|q_1 q_2|}{r^2}, \qquad k = \frac{1}{4\pi\varepsilon_0} \approx 8{,}988 \times 10^9\ \text{N}\cdot\text{m}^2/\text{C}^2.
$$

A direção é a reta que une as cargas e o sentido depende dos sinais. A constante $\varepsilon_0 = 8{,}854 \times 10^{-12}\ \text{C}^2/(\text{N}\cdot\text{m}^2)$ é a **permitividade do vazio** e vai reaparecer nas equações de Maxwell. Repara na dependência em $1/r^2$, igual à da gravitação: duplicar a distância divide a força por quatro.

## O campo elétrico

Em vez de pensar em pares de cargas, definimos o **campo elétrico** $\vec{E}$ criado por uma distribuição de cargas: é a força por unidade de carga que uma carga de prova $q$ sentiria em cada ponto,

$$
\vec{E} = \frac{\vec{F}}{q}.
$$

O campo de uma carga pontual $Q$ à distância $r$ tem módulo $E = k|Q|/r^2$ e aponta para fora se $Q > 0$ e para dentro se $Q < 0$. As unidades são $\text{N/C}$, equivalentes a $\text{V/m}$ (volts por metro), que vais usar mais nos circuitos. O campo é um campo vetorial: tem módulo, direção e sentido em cada ponto do espaço.

## Sobreposição

O campo de várias cargas é a **soma vetorial** dos campos de cada uma, calculados como se as outras não existissem. Isto é o princípio da sobreposição, e é ele que torna os problemas resolúveis: divides a distribuição em cargas pontuais, calculas cada contribuição e somas componente a componente. A dificuldade está quase sempre na geometria, não na física.

## Exemplo: duas cargas iguais e um ponto simétrico

Sejam $q_1 = +4{,}0\ \text{nC}$ em $(-3{,}0,\ 0)\ \text{cm}$ e $q_2 = -4{,}0\ \text{nC}$ em $(+3{,}0,\ 0)\ \text{cm}$. Queremos o campo em $P = (0,\ 4{,}0)\ \text{cm}$.

Cada carga dista de $P$ o valor $r = 5{,}0\ \text{cm} = 0{,}050\ \text{m}$ (triângulo 3-4-5). O módulo de cada contribuição é

$$
E_0 = k\,\frac{|q|}{r^2} = 8{,}988 \times 10^9 \times \frac{4{,}0 \times 10^{-9}}{0{,}050^2} = \frac{35{,}95}{0{,}0025} \approx 1{,}44 \times 10^4\ \text{N/C}.
$$

Agora as direções. A carga positiva repele: $\vec{E}_1$ aponta de $q_1$ para $P$, na direção $(3,\ 4)/5$. A carga negativa atrai: $\vec{E}_2$ aponta de $P$ para $q_2$, na direção $(3,\ -4)/5$. Somando:

$$
\vec{E} = E_0\,\frac{(3,\ 4) + (3,\ -4)}{5} = E_0\,(6/5,\ 0).
$$

As componentes verticais cancelam por simetria, como devia ser: o sistema é simétrico em relação ao eixo dos $x$ trocando as cargas e o sinal. O resultado é horizontal, $\vec{E} = (1{,}2 \times 1{,}44 \times 10^4,\ 0) \approx (1{,}73 \times 10^4,\ 0)\ \text{N/C}$.

:::tip[Procura a simetria antes de calcular]
Sempre que vires componentes a cancelar, pára e verifica se a simetria o previa. Aqui, a configuração espelhada garante $E_y = 0$ sem contas. Nas [equações de Maxwell](/cadeiras/f2/equacoes-maxwell/) esta mesma simetria vai escolher a superfície de Gauss por ti.
:::

## Ordens de grandeza

Vale a pena fixar referências: o campo de rotura do ar (onde faisca) é cerca de $3 \times 10^6\ \text{V/m}$; dentro de um processador, campos de $10^6\ \text{V/m}$ através de óxidos com nanómetros de espessura dão quedas de tensão de apenas alguns volts. Cargas de nanocoulombs a centímetros de distância dão milhares de $\text{N/C}$, como no exemplo. Se um exercício de eletrostática te der um campo de $10^{12}\ \text{V/m}$ numa situação quotidiana, desconfia das contas.
