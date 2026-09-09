---
title: Equações de Maxwell
description: Fluxo, lei de Gauss, lei de Faraday e lei de Ampère-Maxwell, com o sentido físico de cada termo.
section: conteudo
order: 2
---

Somar campos carga a carga, como na [página anterior](/cadeiras/f2/carga-campo/), funciona mas não escala. As equações de Maxwell descrevem os mesmos campos de forma global: relacionam os campos elétrico $\vec{E}$ e magnético $\vec{B}$ com as suas fontes, as cargas e as correntes. São quatro leis, e cada uma tem uma frase que deves saber dizer.

## Fluxo

O **fluxo** de $\vec{E}$ através de uma superfície $S$ é a integral de superfície

$$
\Phi_E = \iint_S \vec{E} \cdot d\vec{A},
$$

onde $d\vec{A}$ é o vetor de área, perpendicular à superfície e a apontar para fora nas superfícies fechadas. Intuitivamente, o fluxo conta "quantas linhas de campo atravessam" a superfície. A matemática de integrais de superfície, divergência e rotacional está na [página de AM2](/cadeiras/am2/superficies-fluxo/): revê-a antes de prosseguir, porque as quatro leis usam este vocabulário.

## Lei de Gauss

A lei de Gauss diz que o fluxo de $\vec{E}$ através de uma superfície fechada é proporcional à carga lá dentro:

$$
\oiint_S \vec{E} \cdot d\vec{A} = \frac{Q_{\text{int}}}{\varepsilon_0}.
$$

Na forma diferencial, $\nabla \cdot \vec{E} = \rho/\varepsilon_0$: a divergência do campo num ponto é a densidade de carga nesse ponto dividida por $\varepsilon_0$. As cargas são as fontes do campo elétrico, e as linhas de campo começam nas positivas e terminam nas negativas.

O poder da lei está na simetria. Se a distribuição for esférica, cilíndrica ou plana, escolhes uma superfície de Gauss com a mesma simetria, o campo sai da integral por ser constante em módulo sobre ela, e o problema reduz-se a uma divisão.

## Exemplo: esfera condutora carregada

Uma esfera condutora de raio $R = 10\ \text{cm}$ tem carga total $Q = +5{,}0\ \text{nC}$ distribuída uniformemente à superfície. Qual é o campo a $r = 25\ \text{cm}$ do centro?

Fora da esfera, a simetria é esférica: o campo é radial e o seu módulo só depende de $r$. Escolhe como superfície de Gauss uma esfera de raio $r$. O fluxo é $E \times 4\pi r^2$ e a carga interior é toda a carga $Q$:

$$
E \cdot 4\pi r^2 = \frac{Q}{\varepsilon_0} \quad\Rightarrow\quad E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2} = k\,\frac{Q}{r^2}.
$$

É o campo de uma carga pontual colocada no centro. Com os números:

$$
E = 8{,}988 \times 10^9 \times \frac{5{,}0 \times 10^{-9}}{0{,}25^2} = \frac{44{,}94}{0{,}0625} \approx 719\ \text{N/C},
$$

radial e para fora. Verificação pela simetria: de fora, a esfera "parece" uma carga pontual, por isso o resultado tinha de coincidir com Coulomb. Dentro da esfera ($r < R$), a carga interior à superfície de Gauss é nula e $E = 0$: num condutor em equilíbrio, as cargas fogem todas para a superfície.

## As outras três leis

**Lei de Gauss do magnetismo**, $\oiint_S \vec{B} \cdot d\vec{A} = 0$, ou $\nabla \cdot \vec{B} = 0$: não há cargas magnéticas. As linhas de $\vec{B}$ fecham-se sempre sobre si mesmas, por isso entram tantas quantas as que saem de qualquer superfície fechada.

**Lei de Faraday**:

$$
\oint_C \vec{E} \cdot d\vec{l} = -\frac{d\Phi_B}{dt}, \qquad \nabla \times \vec{E} = -\frac{\partial\vec{B}}{\partial t}.
$$

Um campo magnético a variar no tempo cria um campo elétrico rotacional. É o princípio dos transformadores e geradores: variar o fluxo magnético através de uma espira induz uma força eletromotriz nela. O sinal menos é a lei de Lenz, e diz que a corrente induzida se opõe à variação que a criou.

**Lei de Ampère-Maxwell**:

$$
\oint_C \vec{B} \cdot d\vec{l} = \mu_0 I + \mu_0\varepsilon_0\,\frac{d\Phi_E}{dt}, \qquad \nabla \times \vec{B} = \mu_0\vec{J} + \mu_0\varepsilon_0\,\frac{\partial\vec{E}}{\partial t}.
$$

As correntes criam campo magnético à sua volta (lei de Ampère), e Maxwell acrescentou o segundo termo, a **corrente de deslocamento**: um campo elétrico a variar também cria campo magnético. Sem esse termo, a conservação da carga falhava nos condensadores a carregar, e, mais importante, as equações não previam ondas. A constante $\mu_0 = 4\pi \times 10^{-7}\ \text{N/A}^2$ é a permeabilidade do vazio.

:::warning[Decora a frase de cada lei, não só a fórmula]
Nos testes, a pergunta conceptual típica pede o sentido físico de um termo: porque é que o fluxo magnético é sempre nulo, o que significa o sinal menos de Faraday, para que serve a corrente de deslocamento. A fórmula sem a frase vale metade.
:::

## Para onde ir

Com campos estáticos e indução dominados, a variação acoplada de $\vec{E}$ e $\vec{B}$ produz algo novo: [ondas eletromagnéticas](/cadeiras/f2/ondas-eletromagneticas/) que se propagam sozinhas.
