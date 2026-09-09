---
title: Superfícies, fluxo e os teoremas da divergência e de Stokes
description: Parametrização de superfícies, integrais de superfície, divergência, rotacional e os dois grandes teoremas.
section: conteudo
order: 9
---

Curvas usam um parâmetro; **superfícies** usam dois. Integrar sobre elas mede área, massa de uma casca ou o **fluxo** de um campo (quanto fluido atravessa a superfície por unidade de tempo). Os teoremas da **divergência** e de **Stokes** convertem esses integrais de superfície em integrais de volume e de linha, e são o ponto alto da cadeira.

## Parametrizar uma superfície

Uma superfície descreve-se por $\vec{r}(u, v) = \langle x(u,v), y(u,v), z(u,v) \rangle$ sobre uma região $R$ do plano $uv$. As derivadas parciais $\vec{r}_u$ e $\vec{r}_v$ são tangentes à superfície, e o **produto vetorial fundamental**

$$
\vec{N}(u, v) = \vec{r}_u \times \vec{r}_v
$$

é normal a ela. A sua norma corrige o elemento de área: $dS = \lVert \vec{N} \rVert \, du \, dv$.

A esfera de raio $a$ parametriza-se por $\vec{r}(u, v) = \langle a\sin u\cos v, a\sin u\sin v, a\cos u \rangle$ com $u \in [0, \pi]$, $v \in [0, 2\pi]$. O produto fundamental é $\vec{N} = a^2\sin u\,\langle \sin u\cos v, \sin u\sin v, \cos u \rangle$, que aponta para fora da esfera (no polo norte, $u = 0$, dá $\langle 0, 0, a^2 \rangle$: para cima, portanto para fora). A área confirma-se por $\iint_R \lVert \vec{N} \rVert = \int_0^{2\pi}\int_0^{\pi} a^2\sin u \, du \, dv = 4\pi a^2$.

Para o gráfico $z = f(x, y)$ sobre $R$, a parametrização $\vec{r}(x, y) = \langle x, y, f(x,y) \rangle$ dá $dS = \sqrt{f_x^2 + f_y^2 + 1} \, dx \, dy$, logo

$$
A = \iint_R \sqrt{f_x^2 + f_y^2 + 1} \, dx \, dy.
$$

## Integrais de superfície e fluxo

O integral escalar $\iint_S g \, dS$ soma $g$ ponderada pela área (massa de uma casca com densidade $g$). O **fluxo** de um campo $\vec{F}$ através de $S$ orientada (com normal unitária $\vec{n}$ escolhida) é

$$
\Phi = \iint_S \vec{F} \cdot \vec{n} \, dS = \iint_R \vec{F}(\vec{r}(u,v)) \cdot \vec{N}(u, v) \, du \, dv,
$$

onde $\vec{N}$ deve apontar para o lado da orientação pedida. Só a componente normal atravessa a superfície; a tangencial passa ao lado.

Calcula o fluxo de $\vec{F}(x, y, z) = z\,\hat{k}$ através da esfera de raio $a$, de dentro para fora. Com a parametrização acima, $\vec{F} \cdot \vec{N} = a\cos u \cdot a^2\sin u\cos u = a^3\sin u\cos^2 u$, e

$$
\Phi = \int_0^{2\pi} \int_0^{\pi} a^3\sin u\cos^2 u \, du \, dv = 2\pi a^3 \cdot \frac{2}{3} = \frac{4\pi a^3}{3},
$$

porque $\int_0^{\pi} \sin u\cos^2 u \, du = \left[-\cos^3 u/3\right]_0^{\pi} = 2/3$. Guarda este número: vamos reencontrá-lo pelo teorema da divergência.

## Divergência, rotacional e o operador nabla

Com $\nabla = \langle \partial_x, \partial_y, \partial_z \rangle$, a **divergência** $\nabla \cdot \vec{F} = \frac{\partial F_1}{\partial x} + \frac{\partial F_2}{\partial y} + \frac{\partial F_3}{\partial z}$ mede o balanço local entre fontes e sorvedouros (positiva onde o campo "nasce"). O **rotacional** $\nabla \times \vec{F}$ mede a tendência local de rodar; $\vec{F}$ diz-se **irrotacional** quando $\nabla \times \vec{F} = \vec{0}$. Duas identidades ligam tudo: o rotacional de um gradiente é nulo, e a divergência de um rotacional é nula. Além disso, num domínio sem buracos, $\vec{F}$ é gradiente se e só se for irrotacional, o que generaliza o teste da página de [integrais de linha](integrais-linha/).

## Teorema da divergência

Se $S$ é a superfície fechada (orientada para fora) que delimita o volume $\mathcal{G}$:

$$
\iint_S \vec{F} \cdot \vec{n} \, dS = \iiint_{\mathcal{G}} (\nabla \cdot \vec{F}) \, dV.
$$

O fluxo total para fora iguala a soma das fontes interiores. Para $\vec{F} = z\,\hat{k}$, $\nabla \cdot \vec{F} = 1$, e o fluxo através da esfera é simplesmente o volume da bola: $4\pi a^3/3$. É o mesmo valor do cálculo direto, obtido aqui numa linha. Sempre que a divergência é constante (ou simples) e a superfície é fechada, este teorema evita parametrizar.

:::tip[Superfície aberta? Fecha-a.]
O teorema exige superfície fechada. Se $S$ for aberta (uma calota, um paraboloide), acrescenta uma tampa, aplica o teorema ao volume fechado e subtrai o fluxo através da tampa. Esta manobra resolve grande parte dos exercícios de fluxo.
:::

## Teorema de Stokes

Se $S$ é uma superfície orientada com bordo $\mathcal{C}$ (orientações compatíveis pela regra da mão direita):

$$
\oint_{\mathcal{C}} \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \vec{n} \, dS.
$$

A circulação ao longo do bordo iguala o fluxo do rotacional através de qualquer superfície que ele delimita. Para $\vec{F}(x, y, z) = \langle -y, x, 0 \rangle$, $\nabla \times \vec{F} = \langle 0, 0, 2 \rangle$. Sobre a circunferência unitária no plano $xy$, a circulação direta dá $\int_0^{2\pi} 1 \, dt = 2\pi$; por Stokes, com o disco unitário, $\iint 2 \, dA = 2\pi$. Qualquer outra superfície com o mesmo bordo (por exemplo, o hemisfério superior) daria o mesmo valor: é essa liberdade de escolha que torna o teorema útil.

## Falhas frequentes

A orientação decide o sinal em tudo: normal para dentro numa superfície fechada troca o sinal do fluxo, e bordo percorrido ao contrário troca o sinal em Stokes. Confirma sempre para que lado aponta $\vec{N} = \vec{r}_u \times \vec{r}_v$ (a ordem do produto vetorial importa) antes de integrar. E não apliques a divergência a superfícies abertas nem Stokes a superfícies sem bordo (numa esfera não há $\mathcal{C}$, por isso Stokes não diz nada sobre ela).
