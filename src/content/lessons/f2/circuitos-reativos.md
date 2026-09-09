---
title: Circuitos reativos
description: Condensador e bobina, transitórios RC e RL e a constante de tempo.
section: conteudo
order: 5
---

O condensador e a bobina guardam energia em vez de a dissipar: o condensador guarda-a no campo elétrico entre as armaduras, a bobina no campo magnético à volta das espiras. Por isso o estado do circuito depende do que aconteceu antes, e as equações passam a ser diferenciais. A boa notícia é que quase todos os transitórios desta cadeira têm a mesma forma exponencial.

## Condensador e bobina

No **condensador** de capacidade $C$, em farads ($\text{F}$), a carga armazenada é $q = Cv_C$, e derivando em ordem ao tempo:

$$
i = C\,\frac{dv_C}{dt}.
$$

A tensão no condensador não pode saltar: variar $v_C$ num instante exigiria corrente infinita. A energia guardada é $w_C = \tfrac{1}{2}Cv_C^2$.

Na **bobina** de indutância $L$, em henrys ($\text{H}$), o fluxo ligado é $\lambda = Li$, e pela lei de Faraday:

$$
v_L = L\,\frac{di}{dt}.
$$

Aqui é a corrente que não pode saltar: variá-la num instante exigiria tensão infinita. A energia guardada é $w_L = \tfrac{1}{2}Li^2$.

Estas continuidades são as condições iniciais dos transitórios: $v_C(0^+)$ iguala $v_C(0^-)$, e o mesmo para a corrente na bobina. Tudo o resto segue as leis de Kirchhoff como nos [circuitos resistivos](/cadeiras/f2/circuitos-resistivos/).

## Transitório RC

Um condensador descarregado ($v_C(0) = 0$) em série com uma resistência $R$ ligado a uma fonte $V_s$ em $t = 0$. A malha dá $V_s = Ri + v_C$, e com $i = C\,dv_C/dt$:

$$
RC\,\frac{dv_C}{dt} + v_C = V_s.
$$

A solução com a condição inicial é a exponencial de carga:

$$
v_C(t) = V_s\left(1 - e^{-t/\tau}\right), \qquad \tau = RC.
$$

A **constante de tempo** $\tau$ mede a rapidez: em $t = \tau$ o condensador chega a $63\%$ da fonte, em $3\tau$ a $95\%$ e em $5\tau$ considera-se carregado para efeitos práticos. A corrente é $i(t) = (V_s/R)e^{-t/\tau}$, máxima no instante inicial (condensador descarregado comporta-se como um curto) e nula no fim (carregado comporta-se como um circuito aberto).

O transitório RL é gémeo: corrente $i(t) = (V_s/R)(1 - e^{-t/\tau})$ com $\tau = L/R$. Repara que $\tau$ tem sempre unidade de tempo: $\Omega \times \text{F} = \text{s}$ e $\text{H}/\Omega = \text{s}$. Se a tua constante de tempo não sair em segundos, volta atrás.

## Exemplo: carga com números

Sejam $V_s = 9{,}0\ \text{V}$, $R = 10\ \text{k}\Omega$ e $C = 100\ \mu\text{F}$, com o condensador inicialmente descarregado. A constante de tempo é

$$
\tau = RC = 10 \times 10^3 \times 100 \times 10^{-6} = 1{,}0\ \text{s}.
$$

Ao fim de $t = 1{,}0\ \text{s}$ (um $\tau$), a tensão é $v_C = 9{,}0 \times (1 - e^{-1}) = 9{,}0 \times 0{,}6321 \approx 5{,}69\ \text{V}$. A energia guardada nesse instante é $w_C = \tfrac{1}{2} \times 100 \times 10^{-6} \times 5{,}69^2 = 50 \times 10^{-6} \times 32{,}38 \approx 1{,}62 \times 10^{-3}\ \text{J} = 1{,}62\ \text{mJ}$, ainda longe dos $\tfrac{1}{2} \times 100 \times 10^{-6} \times 81 = 4{,}05\ \text{mJ}$ da carga completa. A corrente inicial foi $9{,}0/10000 = 0{,}90\ \text{mA}$ e ao fim de $1\ \text{s}$ vale $0{,}90 \times e^{-1} \approx 0{,}33\ \text{mA}$. Verifica os limites: em $t = 0$ a fórmula dá $0\ \text{V}$ (condição inicial) e quando $t \to \infty$ dá $9{,}0\ \text{V}$ (toda a tensão da fonte no condensador, corrente nula).

## Resposta livre do RLC

Com resistência, bobina e condensador em malha sem fonte, a energia oscila entre o campo elétrico do condensador e o magnético da bobina enquanto a resistência a dissipa. É o gémeo elétrico do oscilador amortecido de [F1](/cadeiras/f1/oscilacoes/): conforme $R$ comparado com $2\sqrt{L/C}$, a resposta é subamortecida (oscila a decair), criticamente amortecida ou sobreamortecida. A frequência natural é $\omega_0 = 1/\sqrt{LC}$, que vais reencontrar na ressonância da próxima página.

:::tip[Desenha a curva antes de calcular]
Um esboço de $v_C(t)$ com o valor inicial, o valor final e a rapidez $\tau$ apanha a maioria dos erros de sinal e de condição inicial. Se a curva desenhada contradiz a fórmula, a fórmula é que está errada.
:::

## Para onde ir

Os transitórios morrem ao fim de alguns $\tau$. Se a fonte for sinusoidal e nunca desligar, o circuito entra num regime permanente também sinusoidal: é o [regime forçado sinusoidal](/cadeiras/f2/regime-sinusoidal/), onde os fasores substituem as equações diferenciais.
