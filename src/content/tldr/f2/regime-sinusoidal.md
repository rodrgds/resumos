## Fasores e impedâncias

O regime permanente sinusoidal pressupõe circuito linear, invariante no tempo e transitório que decai. Usa uma frequência de cada vez.

Para $u(t)=U_m\cos(\omega t+\phi)$, o fasor de pico é $\underline U=U_me^{j\phi}$, com $j^2=-1$. Recupera $u(t)=\Re\{\underline Ue^{j\omega t}\}$. Um seno passa a cosseno subtraindo $\pi/2$ à fase; amplitude negativa passa a positiva acrescentando $\pi$.

$$
\underline U=Z\underline I,\qquad
Z_R=R,\quad Z_L=j\omega L,\quad Z_C=-\frac j{\omega C}.
$$

- Impedâncias somam em série; admitâncias $Y=1/Z$ somam em paralelo.
- Derivar multiplica por $j\omega$. Kirchhoff, divisores e equivalentes usam a mesma álgebra com complexos.
- Na bobina, a tensão adianta a corrente de $90^\circ$; no condensador, a corrente adianta a tensão.

Para $u_s=10\cos(100t)\,\mathrm V$, $R=3\,\Omega$ e $L=40\,\mathrm{mH}$, $Z=3+j4$ e $\underline I=1{,}2-j1{,}6$. Assim, $i=2\cos(100t-0{,}927)\,\mathrm A$.

## Potência

Para sinusoides sem offset, $U_{\rm ef}=U_m/\sqrt2$ e $I_{\rm ef}=I_m/\sqrt2$.

$$
P=\tfrac12\Re\{\underline U\underline I^*\}
=U_{\rm ef}I_{\rm ef}\cos(\phi_U-\phi_I).
$$

Com fasores eficazes, $S=\underline U_{\rm ef}\underline I_{\rm ef}^*=P+jQ_{\rm r}$. As unidades são W, var e VA para $P$, $Q_{\rm r}$ e $|S|$. O fator de potência é $P/|S|$; o conjugado é indispensável. O RL do exemplo absorve $6\,\mathrm W$ e $8\,\mathrm{var}$, com fator $0{,}6$.

## Ressonância

| RLC ideal | Expressão                        | Em $\omega_0=1/\sqrt{LC}$, com tensão fixa |
| --------- | -------------------------------- | ------------------------------------------ |
| Série     | $Z=R+j(\omega L-1/(\omega C))$   | Corrente máxima, $Z=R$                     |
| Paralelo  | $Y=1/R+j(\omega C-1/(\omega L))$ | Corrente total mínima, $Z=R$               |

As tensões reativas em série, ou as correntes reativas em paralelo, cancelam-se como fasores, embora cada módulo possa ser grande.

- Série: $Q=\omega_0L/R$ e largura de meia potência $\Delta\omega=R/L$.
- Paralelo ideal: $Q=R\sqrt{C/L}$. Com fonte de corrente fixa, a tensão é máxima na ressonância.
- Num osciloscópio, $U_m=U_{pp}/2$ para sinusoide sem offset. A diferença de fase tem módulo $\omega\Delta t$; identifica qual sinal chega primeiro para dar o sinal.

[Ver ressonância e potência](/cadeiras/f2/regime-sinusoidal/#ressonância-série).
