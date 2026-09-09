---
title: Circuitos resistivos
description: Lei de Ohm, leis de Kirchhoff, método dos nós e equivalente de Thévenin.
section: conteudo
order: 4
---

Um circuito é um caminho fechado onde cargas se movem de forma organizada: a **corrente** $I$, em amperes ($\text{A}$), mede a carga que atravessa uma secção por segundo, e a **tensão** $V$, em volts ($\text{V}$), mede a energia por unidade de carga entre dois pontos. Nos circuitos resistivos só há fontes e resistências, sem memória: a resposta é instantânea e tudo se reduz a álgebra linear.

## Lei de Ohm e potência

Numa resistência $R$, em ohms ($\Omega$), tensão e corrente relacionam-se por

$$
V = RI.
$$

A potência dissipada (convertida em calor) é $P = VI$, que com a lei de Ohm se escreve de duas formas úteis:

$$
P = RI^2 = \frac{V^2}{R}.
$$

Escolhe a forma conforme o dado fixo: corrente imposta pela malha usa $RI^2$, tensão imposta aos terminais usa $V^2/R$. A potência total fornecida pelas fontes iguala sempre a soma das potências dissipadas: é a conservação da energia disfarçada de verificação de contas.

## Leis de Kirchhoff

Duas leis governam qualquer circuito, e ambas são conservação:

- **Lei dos nós** (correntes): a soma das correntes que entram num nó iguala a soma das que saem. É a conservação da carga, porque num nó não se acumula carga.
- **Lei das malhas** (tensões): a soma das tensões ao longo de qualquer malha fechada é nula. É a conservação da energia por unidade de carga: dar a volta completa e voltar ao mesmo potencial soma zero.

O **método dos nós** sistematiza isto: escolhe um nó de referência (terra, $0\ \text{V}$), escreve a lei dos nós em cada um dos restantes usando $I = \Delta V/R$, e resolve o sistema para as tensões. Para circuitos pequenos, simplificar associações em série e paralelo chega lá mais depressa: $R_{\text{série}} = R_1 + R_2$ e $1/R_{\text{paralelo}} = 1/R_1 + 1/R_2$.

## Equivalente de Thévenin

Qualquer rede linear vista de dois terminais comporta-se como uma fonte de tensão $V_{\text{th}}$ em série com uma resistência $R_{\text{th}}$:

- $V_{\text{th}}$ é a tensão em aberto entre os terminais (sem nada ligado).
- $R_{\text{th}}$ é a resistência vista dos terminais com as fontes independentes anuladas (fontes de tensão em curto, fontes de corrente em aberto).

Isto separa o circuito em "fonte complicada" e "carga": uma vez calculado o equivalente, estudar várias cargas é trocar um valor numa fórmula em vez de resolver a rede toda de novo. O **divisor de tensão** é o caso mais usado: com $R_1$ e $R_2$ em série alimentadas por $V_s$, a tensão sobre $R_2$ é $V_s\,R_2/(R_1 + R_2)$.

## Exemplo: Thévenin de uma rede com duas malhas

Uma fonte $V_s = 12\ \text{V}$ alimenta $R_1 = 2\ \text{k}\Omega$ em série; do nó intermédio $A$ sai $R_2 = 4\ \text{k}\Omega$ para a terra. Queremos o equivalente visto dos terminais $a = A$ e $b = \text{terra}$, e a potência numa carga $R_L = 4\ \text{k}\Omega$ ligada entre eles.

Em aberto (sem carga), $R_1$ e $R_2$ formam um divisor de tensão:

$$
V_{\text{th}} = 12 \times \frac{4}{2 + 4} = 12 \times \frac{2}{3} = 8{,}0\ \text{V}.
$$

Anulando a fonte (curto no lugar dos $12\ \text{V}$), de $A$ vê-se $R_1$ e $R_2$ em paralelo para a terra:

$$
R_{\text{th}} = \frac{2 \times 4}{2 + 4} = \frac{8}{6} \approx 1{,}33\ \text{k}\Omega.
$$

Com a carga ligada, $R_{\text{th}}$ e $R_L$ formam novo divisor sobre os $8{,}0\ \text{V}$:

$$
V_L = 8{,}0 \times \frac{4}{1{,}33 + 4} = 8{,}0 \times \frac{4}{5{,}33} = 8{,}0 \times 0{,}75 = 6{,}0\ \text{V},
$$

$$
P_L = \frac{V_L^2}{R_L} = \frac{36}{4000} = 9{,}0 \times 10^{-3}\ \text{W} = 9{,}0\ \text{mW}.
$$

Verificação pela energia: a corrente total que sai da fonte com a carga ligada é $I = 12/(2 + (4 \parallel 4)) = 12/(2+2) = 3{,}0\ \text{mA}$, logo a fonte entrega $36\ \text{mW}$; em $R_1$ dissipam-se $2 \times 3^2 = 18\ \text{mW}$, e em $R_2$ e $R_L$ (ambas com $6\ \text{V}$) dissipam-se $9\ \text{mW}$ cada. A soma $18 + 9 + 9 = 36\ \text{mW}$ fecha com a fonte.

:::warning[Thévenin só vale para redes lineares]
Se houver um díodo, um transistor ou qualquer componente não linear entre os terminais, o equivalente de Thévenin não existe. Nos testes, a presença de um elemento não linear é o sinal de que o método pedido é outro.
:::

## Para onde ir

Resistências respondem no instante. Com condensadores e bobinas o circuito ganha memória, e a resposta passa a depender do passado: são os [circuitos reativos](/cadeiras/f2/circuitos-reativos/).
