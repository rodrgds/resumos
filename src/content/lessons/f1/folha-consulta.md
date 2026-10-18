---
title: Folha de consulta de Física I
description: Fórmulas, condições de aplicação, sinais e verificações de mecânica e oscilações.
section: recursos
order: 8
studyKind: revision
---

Usa SI. Fixa sistema, referencial, eixos e condições iniciais antes de substituir números. Os exemplos usam $g=9{,}81\ \mathrm{m/s^2}$.

## Cinemática

[Explicação e exemplos](/cadeiras/f1/cinematica/#integrar-o-movimento).

- $\vec v=d\vec r/dt$, $\vec a=d\vec v/dt$. Rapidez $v=|\vec v|\ge0$; em 1D usa $v_x$ com sinal.
- Aceleração constante: $v_x=v_0+at$, $x=x_0+v_0t+at^2/2$, $v_x^2=v_0^2+2a\Delta x$. A última perde o sentido; escolhe o sinal da raiz.
- Se $a$ depende de $v_x$ ou $x$: separa com limites desde a condição inicial; verifica soluções excluídas pela divisão. Para $a_x(v_x)\ne0$ no trecho, $\Delta x=\int v_x/a_x(v_x)\,dv_x$.
- Curvatura ($v\ne0$): $a_t=\vec v\cdot\vec a/v$, $a_n=\sqrt{|\vec a|^2-a_t^2}$, $\rho=v^2/a_n$ se $a_n>0$.
- Roda de raio $R$: $v=R|\omega|$, $a_n=R\omega^2$; uniforme com $|\omega|=2\pi/T=2\pi f$. $R\alpha$ usa o sentido angular positivo; $a_t=dv/dt$ usa o sentido da velocidade.
- Projétil sem ar: $x=x_0+v_0\cos\theta\,t$, $y=y_0+v_0\sin\theta\,t-gt^2/2$. No topo, $v_y=0$ com $v_x$ intacto. Alcance $v_0^2\sin2\theta/g$ só para chegada à altura de partida.

## Forças

[Diagramas, contactos e limites](/cadeiras/f1/leis-newton/#escolher-as-forças).

- Inercial, massa constante: $\sum\vec F=m\vec a$, uma equação por direção. Terceira lei em corpos diferentes.
- Peso $m\vec g$; mola $F_x=-kx$; resistência $-b\vec v$ (modelos lineares, verifica o intervalo).
- Normal perpendicular ao contacto, das equações; contacto simples exige $N\ge0$.
- Atrito: $|f_s|\le\mu_sN$ (igualdade só no limiar); $|f_k|\approx\mu_kN$ contra o deslizamento relativo. Estático em repouso vale o necessário, não o máximo.
- Rampa sem outras forças perpendiculares: $N=mg\cos\theta$; repouso se $\tan\theta\le\mu_s$; a descer, $a=g(\sin\theta-\mu_k\cos\theta)$; a subir, o atrito soma-se ao peso.
- Circular: $\sum F_\text{para o centro}=mv^2/R$, positivo para o centro. Sem força centrípeta extra no diagrama inercial. Fundo de calote após descer $r$ sem atrito: $N=3mg$.
- Referencial em translação com $\vec a_\mathrm{ref}$: junta $\vec F_\text{inércia}=-m\vec a_\mathrm{ref}$.

## Trabalho e energia

[Balanços e estabilidade](/cadeiras/f1/trabalho-energia/#balanço-de-energia).

- $W=\int\vec F\cdot d\vec r$; constante: $W=Fd\cos\phi$. Em 1D, área com sinal sob $F_x(x)$.
- Sem trabalho: força perpendicular ao deslocamento do ponto de aplicação. Normal em pista fixa, tensão de fio com suporte fixo. Com suporte móvel (elevador), a normal faz trabalho.
- $K=mv^2/2$; $W_\mathrm{total}=\Delta K$. A velocidade constante dá o atrito sem a normal: $f_k$ iguala a componente motora.
- Conservativa: $W_\mathrm{cons}=-\Delta U$; $F_x=-U'(x)$. $U_g=mgy$, $U_e=kx^2/2$, $U=-GMm/r$ (zero no infinito).
- $\Delta(K+U)=W_\text{não cons}$. Mecânica constante só com esse trabalho nulo. Força não conservativa presente pode não fazer trabalho (atrito estático no rolamento ideal).
- Equilíbrio $U'=0$: mínimo estrito estável, máximo estrito instável; $U''=0$ não decide. Acessível exige $E\ge U$; $E=U$ com força não nula é inversão.
- $P=\vec F\cdot\vec v$; entrada $=P_\text{útil}/\eta$.
- Volta interior, ponto deslizante sem atrito, partida do repouso: $v_\mathrm{topo}^2=gR$ e $h_{\mathrm{min}}=5R/2$.

## Sistemas e colisões

[Escolher sistema e intervalo](/cadeiras/f1/centro-massa-momento/#impulso-e-conservação).

- $\vec R_\mathrm{CM}=\sum m_i\vec r_i/M$ ou $M^{-1}\int\vec r\,dm$ ($\lambda\,dx$, $\sigma\,dA$, $\rho\,dV$).
- $\vec P=M\vec V_\mathrm{CM}$; $M\vec A_\mathrm{CM}=\sum\vec F_\mathrm{ext}$. Internas cancelam.
- $\vec J_\mathrm{ext}=\Delta\vec P$. Conservação exige impulso externo nulo na direção usada; verifica direção a direção.
- Juntos: $u=(m_1v_1+m_2v_2)/(m_1+m_2)$.
- Elástico 1D: $P$ e $K$, ou $u_2-u_1=v_1-v_2$ com o momento. Só massas iguais trocam velocidades.
- Pêndulo balístico: momento no impacto, energia na subida. Nunca $K$ através do impacto inelástico.

## Rotação

[Eixos, equilíbrio e rolamento](/cadeiras/f1/rotacao/#momento-de-inércia).

- $\vec L_O=\vec r\times\vec p$, $\vec\tau_O=\vec r\times\vec F$; $|\tau|=Fd_\perp$. Mesma referência nos dois lados de $d\vec L/dt=\sum\vec\tau_\mathrm{ext}$.
- $I=\int r_\perp^2\,dm$; paralelos com um pelo centro: $I=I_\mathrm{CM}+Md^2$.
- Eixo fixo ou rotação plana no centro: $\tau_z=I\alpha$, $L_z=I\omega$, $K_\mathrm{rot}=I\omega^2/2$, $P=\tau_z\omega$.
- Equilíbrio rígido: $\sum\vec F=0$ e $\sum\vec\tau=0$; momentos na reação desconhecida.
- Rolamento ideal: $v_\mathrm{CM}=R|\omega|$, $K=Mv^2/2+I_\mathrm{CM}\omega^2/2$, $a=g\sin\theta/[1+I_\mathrm{CM}/(MR^2)]$. Confirma $|f_s|\le\mu_sN$; a direção do atrito sai das equações.
- Atwood com inércia $I$ ($m_1>m_2$): $a=(m_1-m_2)g/(m_1+m_2+I/R^2)$; tensões diferentes.
- Pêndulo físico, ângulos pequenos: $T=2\pi\sqrt{I_O/(Mgd)}$.

| Corpo uniforme e eixo                 | $I$          |
| ------------------------------------- | ------------ |
| Aro fino, simetria                    | $MR^2$       |
| Disco ou cilindro maciço, simetria    | $MR^2/2$     |
| Esfera maciça, diâmetro               | $2MR^2/5$    |
| Haste, perpendicular pelo centro      | $M\ell^2/12$ |
| Haste, perpendicular pela extremidade | $M\ell^2/3$  |
| Aro, eixo na periferia                | $2MR^2$      |

## Oscilações

[Condições iniciais e regimes](/cadeiras/f1/oscilacoes/#condições-iniciais-e-fase).

| Pergunta                              | Grandeza              | Relação                                                      |
| ------------------------------------- | --------------------- | ------------------------------------------------------------ |
| Livre sem amortecimento nem força     | $\omega_0$            | $\sqrt{k/m}$; $T=2\pi/\omega_0$                              |
| Livre com amortecimento subcrítico    | $\omega_d$            | $\sqrt{\omega_0^2-\gamma^2}$                                 |
| Pico de amplitude com $F_0$ constante | $\Omega_\mathrm{res}$ | $\sqrt{\omega_0^2-2\gamma^2}$, se $0<\gamma<\omega_0/\sqrt2$ |

- Iniciais sem amortecimento: $x=x_0\cos\omega_0t+(v_0/\omega_0)\sin\omega_0t$; $A^2=x_0^2+(v_0/\omega_0)^2$. Os dois sinais dão o quadrante.
- Pêndulo simples, radianos pequenos: $T\approx2\pi\sqrt{\ell/g}$, sem massa.
- Amortecimento $\gamma=b/(2m)$: subcrítico $0<\gamma<\omega_0$, crítico igual, sobrecrítico maior.
- Iniciais subcríticas: $x=e^{-\gamma t}[x_0\cos\omega_dt+(v_0+\gamma x_0)\sin\omega_dt/\omega_d]$.
- Envolvente $e^{-\gamma t}$; meia amplitude em $\ln2/\gamma$. Energia média $\sim e^{-2\gamma t}$ (fraco). $\tau=1/(2\gamma)$, $Q=\omega_0/(2\gamma)$; confirma se um tempo é da amplitude ou da energia. $\omega_a$ das transparências é aqui $\omega_d$.
- Picos do mesmo sinal: $\delta=\ln(A_n/A_{n+1})=\gamma T_d$.
- Forçada $F_0\cos\Omega t$: resposta permanente a $\Omega$ com $A=(F_0/m)/\sqrt{(\omega_0^2-\Omega^2)^2+(2\gamma\Omega)^2}$. Em $\Omega=\omega_0$: atraso $\pi/2$, $A=F_0/(b\omega_0)$.

[Análise de medições](/cadeiras/f1/medir-oscilacoes/#ajustar-o-decaimento): amplitudes desde a base, vários ciclos, logaritmos de razões adimensionais. Período na posição dos picos, amortecimento na envolvente. Para $g$ fixo, $\Delta\ell/\ell\approx2\Delta T/T$ no pêndulo simples.
