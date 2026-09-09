---
title: Iluminação e sombreamento
description: Modelos local e global, Phong e Blinn-Phong, Gouraud contra Phong, com contas feitas.
section: conteudo
order: 5
---

A geometria diz onde está a superfície; a **iluminação** diz que cor ela tem em cada ponto. O modelo de iluminação combina a luz que chega, a orientação da superfície e o material do objeto. O modelo de **sombreamento** decide onde essa conta se faz: em cada vértice ou em cada fragmento. Confundir os dois é o erro conceptual mais comum desta parte da matéria.

## O modelo local: Phong

A **iluminação local** só olha para as luzes diretas e ignora a luz refletida por outros objetos. O modelo de **Phong** escreve a intensidade num ponto como soma de três parcelas:

$$
I = k_a I_a + k_d I_l \max(0, \mathbf{n} \cdot \mathbf{l}) + k_s I_l \max(0, \mathbf{r} \cdot \mathbf{v})^{\alpha}.
$$

Cada símbolo tem um papel. $I_a$ é a luz **ambiente**, que existe em todo o lado e evita pretos totais; $k_a$ diz quanto dela o material absorve. $I_l$ é a intensidade da fonte. A parcela **difusa** usa o cosseno entre a normal $\mathbf{n}$ e a direção da luz $\mathbf{l}$: faces de frente para a luz recebem mais, e $k_d$ é a cor própria do objeto. A parcela **especular** cria o brilho: depende do alinhamento entre a direção de reflexão perfeita $\mathbf{r}$ e o observador $\mathbf{v}$, elevado ao expoente $\alpha$ (**brilho** ou _shininess_), com $k_s$ a controlar a força. Quanto maior $\alpha$, mais pequeno e nítido o reflexo.

A variante **Blinn-Phong** troca o vetor de reflexão pelo **vetor halfway** $\mathbf{h}$, a bissetriz entre $\mathbf{l}$ e $\mathbf{v}$: a parcela especular passa a $k_s I_l \max(0, \mathbf{n} \cdot \mathbf{h})^{\alpha}$. É mais barata e comporta-se melhor em ângulos rasantes, por isso é a que vais implementar.

## Exemplo com números

Um ponto tem normal $\mathbf{n} = (0, 0, 1)$ e recebe luz branca de intensidade $1$ vinda de $\mathbf{l} = (0,\ 0{,}6,\ 0{,}8)$ (confirma que está normalizado: $0{,}6^2 + 0{,}8^2 = 1$). O observador está em $\mathbf{v} = (0, 0, 1)$ e o material tem $k_a = 0{,}1$, $k_d = 0{,}7$, $k_s = 0{,}5$ e $\alpha = 16$.

Ambiente: $0{,}1 \times 1 = 0{,}1$. Difusa: $\mathbf{n} \cdot \mathbf{l} = 0{,}8$, logo $0{,}7 \times 0{,}8 = 0{,}56$. Para a especular, o halfway é a soma normalizada de $\mathbf{l}$ com $\mathbf{v}$:

$$
\mathbf{h} = \frac{(0,\ 0{,}6,\ 1{,}8)}{\lVert (0,\ 0{,}6,\ 1{,}8) \rVert} = \frac{(0,\ 0{,}6,\ 1{,}8)}{1{,}8974} \approx (0,\ 0{,}3162,\ 0{,}9487).
$$

Então $\mathbf{n} \cdot \mathbf{h} \approx 0{,}9487$ e $0{,}9487^{16} \approx 0{,}43$, o que dá $0{,}5 \times 0{,}43 \approx 0{,}22$. O total é $0{,}1 + 0{,}56 + 0{,}22 = 0{,}88$: um ponto bem iluminado com um brilho moderado. Se o observador se movesse, só a parcela especular mudava, porque ambiente e difusa não dependem de $\mathbf{v}$. Essa é a observação que distingue quem decorou a fórmula de quem a percebeu.

## Iluminação global e sombreamento

A iluminação local não explica espelhos nem sombras suaves, porque ignora a luz que viaja entre objetos. A **iluminação global** segue esses caminhos: _ray tracing_ para reflexões e refrações exatas, **radiosidade** para a luz difusa que se espalha entre superfícies. É mais realista e muito mais cara, por isso aparece em cinema e cada vez mais em jogos com aceleração dedicada.

Quanto ao **sombreamento**, há duas escolhas. O sombreamento de **Gouraud** calcula a iluminação nos vértices e interpola as cores pela face: é barato, mas perde brilhos no interior dos triângulos grandes. O sombreamento de **Phong** interpola as [normais](modelacao-malhas/) e calcula a iluminação em cada fragmento: custa mais e mostra os brilhos onde eles estão. Repara na simetria dos nomes: o modelo de Phong diz o que calcular, o sombreamento de Phong diz onde o calcular.

:::tip[Como cai em teste]
O enunciado típico dá normal, luz, observador e coeficientes e pede as três parcelas. O método é sempre o mesmo: verifica que os vetores estão normalizados, calcula os dois produtos escalares, eleva à potência e soma. Aponta o resultado parcial de cada parcela antes de somar, porque cada uma vale pontos.
:::
