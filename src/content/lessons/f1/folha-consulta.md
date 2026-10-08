---
title: Folha de consulta de Física I
description: Fórmulas, condições de aplicação, sinais e verificações de mecânica e oscilações.
section: recursos
order: 8
studyKind: revision
---

Usa SI. Fixa sistema, referencial, eixos e condições iniciais antes de substituir números, porque o sinal decide o resultado. Os exemplos usam $g=9{,}81\ \mathrm{m/s^2}$.

## Cinemática

[Explicação e exemplos](/cadeiras/f1/cinematica/#integrar-o-movimento).

- $\vec v=d\vec r/dt$, $\vec a=d\vec v/dt$. Rapidez $v=|\vec v|$. Em 1D usa $v_x$ com sinal; $v$ é o módulo.
- Aceleração constante: $v_x=v_0+at$, $x=x_0+v_0t+at^2/2$, $v_x^2=v_0^2+2a\Delta x$.
- Separação: $a(v)=dv/dt$; $a(x)=v\,dv/dx$. Verifica soluções excluídas por divisões.
- Curvatura: $\vec a=\dot v\hat t+(v^2/\rho)\hat n$. Para $v\ne0$, $a_t=\vec v\cdot\vec a/v$ e $\rho=v^2/a_n$ se $a_n>0$.
- Circunferência: $v=R|\omega|$, $a_n=R\omega^2$; em movimento uniforme $|\omega|=2\pi/T=2\pi f$. $R\alpha$ usa o sentido angular positivo; $a_t=dv/dt$ usa o sentido da velocidade.
- Projétil sem resistência: $x=x_0+v_0\cos\theta\,t$, $y=y_0+v_0\sin\theta\,t-gt^2/2$. Alcance $v_0^2\sin2\theta/g$ só para alturas inicial e final iguais.

## Forças

[Diagramas, contactos e limites](/cadeiras/f1/leis-newton/#escolher-as-forças).

- Referencial inercial e massa constante: $\sum\vec F=m\vec a$.
- Peso $m\vec g$; mola $F_x=-kx$; resistência linear $\vec F=-b\vec v$.
- Normal perpendicular ao contacto, obtida das equações. Contacto simples exige $N\ge0$.
- Atrito estático $|f_s|\le\mu_sN$; cinético $|f_k|\approx\mu_kN$. Direção pela tendência ou velocidade relativa de deslizamento.
- Rampa: $N=mg\cos\theta$ se não há outras forças perpendiculares. Repouso possível se $\tan\theta\le\mu_s$. Descida deslizante: $a=g(\sin\theta-\mu_k\cos\theta)$.
- Movimento circular: $\sum F_\text{para o centro}=mv^2/R$, com o positivo radial para o centro. Não acrescentar uma força centrípeta fictícia ao diagrama inercial.
- Translação do referencial: $\vec F_\text{inércia}=-m\vec a_\mathrm{ref}$.

## Trabalho e energia

[Balanços e estabilidade](/cadeiras/f1/trabalho-energia/#balanço-de-energia).

- $W=\int\vec F\cdot d\vec r$; força constante $W=Fd\cos\phi$.
- $K=mv^2/2$; $W_\mathrm{total}=\Delta K$.
- $W_\mathrm{cons}=-\Delta U$; $F_x=-U'(x)$.
- $U_g=mgy$ perto da superfície; $U_e=kx^2/2$; gravitação $U=-GMm/r$ com zero no infinito.
- $\Delta(K+U)=W_\text{não\ cons}$. Energia mecânica constante apenas se esse trabalho for zero. Uma força não conservativa presente pode não fazer trabalho, como o atrito estático no rolamento ideal.
- Equilíbrio $U'=0$. Mínimo estrito estável, máximo estrito instável. $U''=0$ não decide. Estados acessíveis exigem $E\ge U$; $E=U$ pode indicar inversão ou equilíbrio.
- $P=\vec F\cdot\vec v$. Rendimento $\eta=P_\text{útil}/P_\mathrm{entrada}$.
- Volta vertical interior: $mg+N=mv_\mathrm{topo}^2/R$. Ponto deslizante sem atrito, partida do repouso: $h_{\mathrm{min}}=5R/2$.

## Sistemas e colisões

[Escolher sistema e intervalo](/cadeiras/f1/centro-massa-momento/#impulso-e-conservação).

- $\vec R_\mathrm{CM}=\sum m_i\vec r_i/M$ ou $M^{-1}\int\vec r\,dm$.
- $\vec P=M\vec V_\mathrm{CM}$ e $M\vec A_\mathrm{CM}=\sum\vec F_\mathrm{ext}$.
- Impulso $\vec J_\mathrm{ext}=\Delta\vec P$. Conservação do momento exige impulso externo nulo na componente usada, por isso verifica direção a direção.
- Corpos juntos: $u=\frac{m_1v_1+m_2v_2}{m_1+m_2}$.
- Choque elástico 1D: conserva $P$ e $K$, ou usa $u_2-u_1=v_1-v_2$ com momento. Só massas iguais trocam velocidades.
- Pêndulo balístico: momento no impacto, energia na subida. Não conservar energia cinética através do impacto inelástico.

## Rotação

[Eixos, equilíbrio e rolamento](/cadeiras/f1/rotacao/#momento-de-inércia).

- $\vec L_O=\vec r\times\vec p$, $\vec\tau_O=\vec r\times\vec F$. Módulo $\tau=Fd_\perp$.
- Origem inercial fixa ou centro de massa: $d\vec L/dt=\vec\tau_\mathrm{ext}$ com a mesma referência nos dois lados.
- $I=\int r_\perp^2\,dm$; eixos paralelos $I=I_\mathrm{CM}+Md^2$.
- Eixo fixo, corpo rígido: $\tau_z=I\alpha$, $L_z=I\omega$, $K_\mathrm{rot}=I\omega^2/2$, $P=\tau_z\omega$.
- Equilíbrio rígido: $\sum\vec F=0$ e $\sum\vec\tau=0$.
- Rolamento ideal: $v_\mathrm{CM}=R|\omega|$, $K=Mv^2/2+I_\mathrm{CM}\omega^2/2$. Descida: $a=g\sin\theta/[1+I_\mathrm{CM}/(MR^2)]$. Confirma $|f_s|\le\mu_sN$.
- Atwood com roldana de inércia $I$, fio sem deslizamento e $m_1>m_2$: $a=\frac{(m_1-m_2)g}{m_1+m_2+I/R^2}$.
- Pêndulo físico, pequenos ângulos: $T=2\pi\sqrt{I_O/(Mgd)}$.

| Corpo de densidade uniforme e eixo    | $I$          |
| ------------------------------------- | ------------ |
| Aro fino, simetria                    | $MR^2$       |
| Disco/cilindro maciço, simetria       | $MR^2/2$     |
| Esfera maciça, diâmetro               | $2MR^2/5$    |
| Haste, perpendicular pelo centro      | $M\ell^2/12$ |
| Haste, perpendicular pela extremidade | $M\ell^2/3$  |

## Oscilações

[Condições iniciais e regimes](/cadeiras/f1/oscilacoes/#condições-iniciais-e-fase).

- Mola ideal: $\omega_0=\sqrt{k/m}$; $T=2\pi/\omega_0$.
- Condições iniciais: $x=C\cos\omega_0t+D\sin\omega_0t$, com $C=x_0$ e $D=v_0/\omega_0$. Amplitude $A^2=C^2+D^2$; energia $E=kA^2/2$.
- Pêndulo simples: $T\approx2\pi\sqrt{\ell/g}$, pequenos ângulos em radianos.
- Amortecimento linear: $\gamma=b/(2m)$; subcrítico se $0<\gamma<\omega_0$, crítico se iguais, sobrecrítico se maior; $b=0$ dá o oscilador ideal.
- Subcrítico: $x=Ae^{-\gamma t}\cos(\omega_dt+\phi)$, $\omega_d^2=\omega_0^2-\gamma^2$.
- $\tau=m/b=1/(2\gamma)$; $Q=\omega_0/(2\gamma)$; meia amplitude em $\ln2/\gamma$. A amplitude é $e^{-t/(2\tau)}$ nesta convenção, que usa $\omega_a$ nas transparências para a frequência amortecida aqui chamada $\omega_d$.
- Picos do mesmo sinal: $\delta=\ln(A_n/A_{n+1})=\gamma T_d$.
- Força $F_0\cos\Omega t$: $A=\frac{F_0/m}{\sqrt{(\omega_0^2-\Omega^2)^2+(2\gamma\Omega)^2}}$.
- Pico de amplitude: $\Omega_\mathrm{res}=\sqrt{\omega_0^2-2\gamma^2}$ para $F_0$ constante e $0<\gamma<\omega_0/\sqrt2$.

[Análise de medições](/cadeiras/f1/medir-oscilacoes/#ajustar-o-decaimento): usa amplitudes relativamente à linha de base, vários ciclos e logaritmos de razões adimensionais. Não confundir a constante de tempo da amplitude com a da energia. Para $g$ fixo, $\Delta\ell/\ell\approx2\Delta T/T$ no modelo de pêndulo simples.
