---
title: Integrais de linha e teorema de Green
description: Integrais escalares e de campos vetoriais ao longo de curvas, independência do caminho e Green.
section: conteudo
order: 6
---

Integrar **ao longo** de uma curva (e não sobre um intervalo) serve para somar quantidades distribuídas por um fio (massa, carga) ou para calcular o trabalho de uma força ao longo de um trajeto. Há dois integrais distintos: o escalar, que usa o comprimento, e o vetorial, que usa a direção. O teorema de Green liga o segundo ao integral duplo sobre a região delimitada.

## Integral de linha escalar

Para $f$ definida sobre a curva $\mathcal{C}$ parametrizada por $\vec{r}(t)$, $t \in [a, b]$:

$$
\int_{\mathcal{C}} f \, ds = \int_a^b f(\vec{r}(t)) \, \lVert \vec{r}'(t) \rVert \, dt.
$$

O fator $\lVert \vec{r}'(t) \rVert$ converte $dt$ em comprimento $ds$. Este integral não depende da orientação: percorrer ao contrário dá o mesmo valor.

Calcula $\int_{\mathcal{C}} x \, ds$ onde $\mathcal{C}$ é o arco de parábola $y = x^2$ de $(0, 0)$ a $(1, 1)$, parametrizado por $\vec{r}(t) = \langle t, t^2 \rangle$, $t \in [0, 1]$. Então $\vec{r}'(t) = \langle 1, 2t \rangle$, $\lVert \vec{r}'(t) \rVert = \sqrt{1 + 4t^2}$, e

$$
\int_{\mathcal{C}} x \, ds = \int_0^1 t\sqrt{1 + 4t^2} \, dt.
$$

Com $u = 1 + 4t^2$ ($du = 8t\,dt$), o integral é $\frac{1}{12}\left[u^{3/2}\right]_{1}^{5} = \frac{5\sqrt{5} - 1}{12} \approx 0{,}85$. Confirma a ordem de grandeza: $x$ varia entre $0$ e $1$ com média cerca de $0{,}5$, e o comprimento do arco é cerca de $1{,}48$, logo $0{,}5 \times 1{,}48 \approx 0{,}74$, próximo do valor exato (um pouco abaixo porque o arco é mais comprido onde $x$ é maior).

## Integral de linha vetorial e trabalho

Para um campo $\vec{F}$ ao longo de $\mathcal{C}$ orientada:

$$
\int_{\mathcal{C}} \vec{F} \cdot d\vec{r} = \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}'(t) \, dt.
$$

Fisicamente é o **trabalho**: em cada instante, só a componente da força na direção do movimento contribui ($\vec{F} \cdot \vec{r}'$), e somamos ao longo do trajeto. Inverter a orientação troca o sinal.

## Campos gradiente e independência do caminho

Se $\vec{F} = \nabla f$ para algum potencial $f$, o **teorema fundamental** diz que só os extremos interessam:

$$
\int_{\mathcal{C}} \nabla f \cdot d\vec{r} = f(B) - f(A),
$$

qualquer que seja o caminho de $A$ a $B$. Em particular, o integral sobre uma curva fechada é zero.

Para reconhecer um gradiente no plano, verifica a condição cruzada: $\vec{F} = \langle P, Q \rangle$ com derivadas contínuas é gradiente (em domínios sem buracos) se e só se $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$. Para $\vec{F}(x, y) = \langle 2x, 2y \rangle$: $\frac{\partial P}{\partial y} = 0 = \frac{\partial Q}{\partial x}$, e o potencial é $f(x, y) = x^2 + y^2$. O trabalho de $(0, 0)$ a $(1, 1)$ é então $f(1,1) - f(0,0) = 2$, por qualquer caminho. Verifica por um caminho concreto (por exemplo, primeiro o eixo $x$ e depois a vertical) para ganhares confiança no teorema.

:::warning[Campo gradiente exige domínio sem buracos]
A condição $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$ só garante potencial em regiões simplesmente conexas. O campo $\langle -y/(x^2+y^2), x/(x^2+y^2) \rangle$ satisfaz a condição fora da origem, mas a circulação sobre a circunferência unitária é $2\pi$, não zero: o buraco na origem impede o potencial global.
:::

## Teorema de Green

Se $\mathcal{C}$ é uma curva fechada simples percorrida no sentido direto (região sempre à esquerda) e fronteira da região $R$:

$$
\oint_{\mathcal{C}} P \, dx + Q \, dy = \iint_R \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA.
$$

O teorema troca um integral de linha fechado por um integral duplo, e vice-versa. Usa-o nos dois sentidos: para calcular circulações difíceis via área, ou áreas via linha (com $P = -y/2$, $Q = x/2$, o integrando é $1$ e obténs $A(R) = \frac{1}{2}\oint_{\mathcal{C}} -y\,dx + x\,dy$).

Exemplo: $\vec{F}(x, y) = \langle -y, x \rangle$ sobre a circunferência unitária. Direto: $\vec{r}(t) = \langle \cos t, \sin t \rangle$, $\vec{F} = \langle -\sin t, \cos t \rangle$, $\vec{r}' = \langle -\sin t, \cos t \rangle$, produto escalar $\sin^2 t + \cos^2 t = 1$, integral $\int_0^{2\pi} 1 \, dt = 2\pi$. Por Green: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1 + 1 = 2$, e $\iint_R 2 \, dA = 2 \cdot \pi = 2\pi$. Bate certo, e a via Green evita parametrizar.

## Falhas frequentes

Trocar $ds$ por $dt$ sem a norma (esquecer $\lVert \vec{r}' \rVert$) é o erro mais comum no integral escalar. No vetorial, o erro gémeo é esquecer o produto escalar e integrar componente a componente. E atenção à orientação: só o integral vetorial muda de sinal ao inverter o percurso; se Green der o simétrico do cálculo direto, a curva foi percorrida no sentido retrógrado.
