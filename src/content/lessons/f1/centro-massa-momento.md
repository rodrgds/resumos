---
title: Centro de massa e momento linear
description: Centro de massa de sistemas discretos e contínuos, conservação do momento linear e colisões elásticas e inelásticas.
section: conteudo
order: 4
---

Um corpo extenso ou um conjunto de corpos move-se de forma complicada, mas há um ponto que se move de forma simples: o **centro de massa**. E há uma grandeza que, em sistemas isolados, nunca muda: o **momento linear**. Juntas, estas ideias resolvem colisões sem ser preciso conhecer as forças durante o impacto.

## Centro de massa

Para um sistema de partículas com massas $m_i$ nas posições $\vec{r}_i$, o centro de massa é a média pesada pelas massas:

$$
\vec{R} = \frac{\sum m_i \vec{r}_i}{\sum m_i}.
$$

Exemplo: duas massas, $m_1 = 2{,}0\ \text{kg}$ em $x_1 = 0$ e $m_2 = 3{,}0\ \text{kg}$ em $x_2 = 5{,}0\ \text{m}$. O centro de massa fica em $x_{\text{CM}} = (2{,}0 \times 0 + 3{,}0 \times 5{,}0)/(2{,}0 + 3{,}0) = 15/5{,}0 = 3{,}0\ \text{m}$, mais perto da massa maior, como esperado.

Para um corpo contínuo, a soma passa a integral sobre a distribuição de massa. Não precisamos do cálculo geral aqui, mas o resultado para os casos simétricos é intuitivo: o centro de massa de uma barra uniforme está no seu ponto médio, e o de um disco uniforme está no seu centro. A simetria localiza o centro de massa sem contas.

A propriedade que torna o centro de massa útil: ele move-se como se toda a massa do sistema lá estivesse concentrada e todas as forças externas lá fossem aplicadas, $M\vec{A}_{\text{CM}} = \sum \vec{F}_{\text{ext}}$. As forças internas cancelam-se duas a duas pela terceira lei.

## Momento linear e a sua conservação

O **momento linear** (ou quantidade de movimento) de uma partícula é $\vec{p} = m\vec{v}$, em $\text{kg·m/s}$. A segunda lei escreve-se de forma compacta como $\sum \vec{F} = d\vec{p}/dt$: a força resultante é a taxa de variação do momento.

Num **sistema isolado**, sem forças externas, a variação total é nula e o momento total conserva-se:

$$
\sum \vec{p}_{\text{inicial}} = \sum \vec{p}_{\text{final}}.
$$

Isto vale mesmo quando as forças internas são desconhecidas ou violentas, como numa colisão ou numa explosão. É por isso que a conservação do momento resolve problemas onde a análise força a força seria impossível.

## Colisões em uma dimensão

Considera dois corpos que colidem frontalmente, sem forças externas apreciáveis durante o impacto breve. O momento total conserva-se sempre, mas a energia cinética pode não se conservar:

- **Colisão elástica**: a energia cinética conserva-se. As velocidades trocam-se de acordo com as massas.
- **Colisão perfeitamente inelástica**: os corpos seguem juntos após o choque. É a que dissipa mais energia cinética.

Exemplo com números: um carrinho $m_1 = 2{,}0\ \text{kg}$ a $v_1 = 3{,}0\ \text{m/s}$ embate num carrinho parado $m_2 = 1{,}0\ \text{kg}$. O momento inicial é $p = 2{,}0 \times 3{,}0 = 6{,}0\ \text{kg·m/s}$ e a energia cinética inicial é $K = 2{,}0 \times 9{,}0/2 = 9{,}0\ \text{J}$.

Se a colisão for perfeitamente inelástica, os carrinhos seguem juntos com velocidade $V = p/(m_1 + m_2) = 6{,}0/3{,}0 = 2{,}0\ \text{m/s}$. A energia final é $K' = 3{,}0 \times 4{,}0/2 = 6{,}0\ \text{J}$: perderam-se $3{,}0\ \text{J}$ na deformação.

Se for elástica, impõem-se conservação do momento e da energia, o que dá

$$
v_1' = \frac{m_1 - m_2}{m_1 + m_2}v_1, \qquad v_2' = \frac{2m_1}{m_1 + m_2}v_1.
$$

Com os números, $v_1' = (1{,}0/3{,}0) \times 3{,}0 = 1{,}0\ \text{m/s}$ e $v_2' = (4{,}0/3{,}0) \times 3{,}0 = 4{,}0\ \text{m/s}$. Confirma o momento: $2{,}0 \times 1{,}0 + 1{,}0 \times 4{,}0 = 6{,}0\ \text{kg·m/s}$. Confirma a energia: $2{,}0 \times 1{,}0/2 + 1{,}0 \times 16/2 = 1{,}0 + 8{,}0 = 9{,}0\ \text{J}$. Ambas batem certo com os valores iniciais, por isso a resolução está verificada.

:::tip[Qual fórmula usar em cada colisão]
Perfeitamente inelástica: uma incógnita (a velocidade conjunta) e uma equação (momento). Elástica: duas incógnitas e duas equações (momento mais energia). Se o enunciado não disser nada sobre deformação nem sobre os corpos seguirem juntos, assume elástica apenas quando for explícito. Na dúvida, a conservação do momento é o ponto de partida seguro.
:::

## Para onde ir

O momento linear governa translações. Para rotações existe uma grandeza análoga: o [momento angular](/cadeiras/f1/rotacao/), na página sobre rotação de corpos rígidos.
