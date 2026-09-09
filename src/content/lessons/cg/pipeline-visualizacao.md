---
title: Pipeline de visualização
description: O caminho do vértice até ao ecrã, fase a fase, com um exemplo numérico completo.
section: conteudo
order: 1
---

Uma imagem 3D nasce de números: vértices, matrizes e luzes. A **pipeline de visualização** é a sequência fixa de etapas que transforma esses números em píxeis. Percebê-la é perceber a cadeira inteira, porque cada página seguinte explica uma destas etapas em detalhe. A ideia é simples: cada vértice viaja por vários sistemas de coordenadas até chegar ao ecrã, e em cada paragem acontece uma operação bem definida.

## As aplicações primeiro

Computação Gráfica serve para fazer imagens que não existem: videojogos, efeitos visuais, visualização científica e médica, CAD, interfaces. Todas partilham o mesmo problema, que é desenhar depressa cenas descritas por geometria. A pipeline existe para resolver esse problema sempre da mesma maneira, de modo que o hardware gráfico consiga acelerar cada etapa.

## As etapas do vértice

Segue um vértice desde o modelo até ao dispositivo:

1. **Espaço do objeto.** O vértice nasce nas coordenadas locais do modelo, tal como foi modelado.
2. **Transformação de modelação.** Uma matriz coloca o objeto na cena (posição, orientação, escala). O vértice passa ao **espaço do mundo**.
3. **Transformação de vista.** Outra matriz move o mundo para a frente da câmara. O vértice passa ao **espaço da câmara**, onde a câmara está na origem a olhar para uma direção fixa.
4. **Projeção.** A matriz de projeção (perspetiva ou ortográfica) deforma o volume visível para um cubo canónico. O resultado está em **coordenadas de recorte** (_clip_), com quatro componentes $(x, y, z, w)$.
5. **Recorte** (_clipping_). Tudo o que fica fora do cubo $[-w, w]$ em cada eixo é cortado. É aqui que desaparece o que está atrás da câmara ou fora do enquadramento.
6. **Divisão perspética.** Divide-se por $w$: $(x/w, y/w, z/w)$. O resultado está em **coordenadas normalizadas** (_NDC_), dentro do cubo $[-1, 1]$.
7. **Transformação de viewport.** Mapeiam-se as NDC para **coordenadas do dispositivo**, os píxeis da janela.

Depois disto vem a **rasterização**, que converte a geometria projetada em fragmentos e depois em píxeis, e o teste de profundidade, que decide o que fica à frente.

:::tip[Uma frase para decorar]
Modelação põe o objeto no mundo, vista põe o mundo na câmara, projeção achata para o cubo, recorte corta o que sobra, divisão normaliza e viewport cola no ecrã.
:::

## Exemplo completo

Um vértice sai da projeção em coordenadas de recorte $(0{,}6,\ 0{,}3,\ -0{,}4,\ 2)$. Primeiro verifica o recorte: $|0{,}6| \le 2$, $|0{,}3| \le 2$ e $|-0{,}4| \le 2$, por isso passa. A divisão por $w = 2$ dá as NDC:

$$
\left(\frac{0{,}6}{2},\ \frac{0{,}3}{2},\ \frac{-0{,}4}{2}\right) = (0{,}3,\ 0{,}15,\ -0{,}2).
$$

Todas as componentes estão em $[-1, 1]$, logo o ponto está dentro do volume visível. Numa janela de $800 \times 600$ píxeis, a transformação de viewport dá:

$$
x = (0{,}3 \times 0{,}5 + 0{,}5) \times 800 = 520, \qquad
y = (0{,}15 \times 0{,}5 + 0{,}5) \times 600 = 345.
$$

O vértice acende perto do píxel $(520,\ 345)$, à direita e um pouco acima do centro. Repara que a terceira coordenada, $-0{,}2$, não se perde: guardada no _buffer_ de profundidade, decide se este fragmento fica à frente ou atrás de outro que caia no mesmo píxel.

## O que a pipeline esconde

Cada etapa tem parâmetros que vais aprender a controlar: a matriz de modelação e a câmara vivem nas [transformações geométricas](transformacoes-geometricas/), a luz entra na [iluminação](iluminacao-sombreamento/) e o fim do caminho é a [rasterização 2D](rasterizacao-2d/). Quando uma imagem sai errada, a pergunta útil é sempre em que etapa o número se estragou.
