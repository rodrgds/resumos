---
title: Cheat sheet de F2
description: Fórmulas e condições para campos, circuitos, medições, sinais e amostragem.
section: recursos
studyKind: revision
---

Fixa primeiro regime, geometria, referências e unidades. Aqui, fasores são de pico; $j^2=-1$, $\omega=2\pi f$, $k=2\pi/\lambda$. Usa $k_e\simeq8{,}99\times10^9\,\mathrm{N\,m^2/C^2}$ para a constante de Coulomb, distinta do número de onda.

## Carga e campos

[Coulomb e Lorentz](/cadeiras/f2/carga-campo/#força-de-lorentz): $q_e=-e$, $q_p=e$, $e=1{,}602176634\times10^{-19}\,\mathrm C$; $\vec F=q(\vec E+\vec v\times\vec B)$. A força magnética não realiza trabalho. Para movimento não relativista perpendicular a $B$ uniforme, $r=mv/(|q|B)$ e $\omega_c=|q|B/m$.

[Sobreposição](/cadeiras/f2/carga-campo/#sobreposição): $\vec E=\sum_i k_eq_i(\vec r-\vec r_i)/|\vec r-\vec r_i|^3$. $E$ em $\mathrm{N/C}=\mathrm{V/m}$; $B$ em teslas. Soma componentes, não módulos.

[Maxwell no vazio](/cadeiras/f2/equacoes-maxwell/#as-quatro-leis-lado-a-lado):

$$
\nabla\cdot\vec E=\rho_V/\varepsilon_0,\quad\nabla\cdot\vec B=0,
\qquad
\nabla\times\vec E=-\partial_t\vec B,\quad
\nabla\times\vec B=\mu_0\vec J+\mu_0\varepsilon_0\partial_t\vec E.
$$

$Q=\int\rho_VdV$, $I=\int\vec J\cdot d\vec A$, $\partial_t\rho_V=-\nabla\cdot\vec J$. $\rho_V$ em $\mathrm{C/m^3}$ e $J$ em $\mathrm{A/m^2}$. Derivada espacial divide a unidade por metro.

[Gauss](/cadeiras/f2/equacoes-maxwell/#lei-de-gauss): fluxo fechado $Q_{\rm int}/\varepsilon_0$. Esfera: $E4\pi r^2=Q_{\rm int}/\varepsilon_0$. Fio infinito: $E=\lambda_Q/(2\pi\varepsilon_0r)$. Plano infinito: módulo $|\sigma_Q|/(2\varepsilon_0)$. Só a simetria permite retirar $E$ da integral.

## Potencial, capacidade e indução

[Potencial](/cadeiras/f2/potencial-capacidade/#potencial-e-energia): $\vec E=-\nabla V$ em eletrostática; $\Delta V=-\int\vec E\cdot d\vec\ell$, $\Delta U=q\Delta V$, $W=-\Delta U$. Cargas localizadas com $V(\infty)=0$: $V=\sum k_eq_i/r_i$. $V=0$ não implica $E=0$, porque o campo depende do gradiente.

[Condutor em equilíbrio](/cadeiras/f2/potencial-capacidade/#condutores-em-equilíbrio): $E=0$ no material, $V$ constante, excesso de carga nas superfícies. Cavidade vazia fechada tem campo zero. Terra fixa potencial, não carga total.

[Capacidade](/cadeiras/f2/potencial-capacidade/#capacidade): $C=q/u$, esfera isolada $C=4\pi\varepsilon_0R$, placas $C=\varepsilon A/d$ desprezando bordos. Paralelo: $C_{\rm eq}=\sum C_i$; série: $1/C_{\rm eq}=\sum1/C_i$, com nós intermédios neutros. $W_C=Cu^2/2$.

[Magnetismo e Faraday](/cadeiras/f2/magnetismo-inducao/#lei-de-faraday-e-lenz): fio infinito $B=\mu_0I/(2\pi r)$, bobina longa $B\simeq\mu_0nI$. $d\vec F=I\,d\vec\ell\times\vec B$, $\vec m=NIA\hat n$, $\vec\tau=\vec m\times\vec B$. $\Phi_B=\int\vec B\cdot d\vec A$, $\mathcal E=-N\,d\Phi_B/dt$. Lenz contraria a variação do fluxo. Transformador ideal: $|U_2/U_1|=N_2/N_1$, $|I_2/I_1|=N_1/N_2$.

## Ondas e condução

[Ondas](/cadeiras/f2/ondas-eletromagneticas/#fase-frequência-e-direção): $c=1/\sqrt{\mu_0\varepsilon_0}=\lambda f=\omega/k$. Fase $kz-\omega t$ avança para $+z$. $\vec B=\hat k\times\vec E/c$ para onda plana no vazio.

[Poynting](/cadeiras/f2/ondas-eletromagneticas/#energia-e-vetor-de-poynting): $\vec S=\vec E\times\vec B/\mu_0$, $w=\varepsilon_0E^2/2+B^2/(2\mu_0)$, $\partial_tw=-\vec J\cdot\vec E-\nabla\cdot\vec S$. Intensidade média harmónica $\mathcal I=\varepsilon_0cE_m^2/2$. Campo distante de radiação: amplitude $1/r$, intensidade $1/r^2$.

[Condução](/cadeiras/f2/conducao-eletrica/#lei-de-ohm-microscópica): $\vec J=\sigma\vec E=nq\vec v_d$, $\rho=1/\sigma$, $R=\rho\ell/A$. Potência por volume $\vec J\cdot\vec E=\sigma E^2$. Não confundas deriva com velocidade de propagação.

## Redes e transitórios

[Kirchhoff](/cadeiras/f2/circuitos-resistivos/#leis-de-kirchhoff): $\sum i=0$, $\sum u=0$ no modelo concentrado. Convenção passiva $p=ui$. Resistores série somam $R$; paralelo soma $1/R$. Divisor sem carga $u_2=U_sR_2/(R_1+R_2)$.

[Thévenin](/cadeiras/f2/circuitos-resistivos/#thévenin-e-norton): $U_{\rm Th}$ em aberto; anular fontes independentes dá $R_{\rm Th}$. Tensão ideal vira curto, corrente ideal vira aberto. $I_N=U_{\rm Th}/R_{\rm Th}$. Carga: $I_L=U_{\rm Th}/(R_{\rm Th}+R_L)$. Máxima potência resistiva em $R_L=R_{\rm Th}>0$: $P_{\max}=U_{\rm Th}^2/(4R_{\rm Th})$. Os $50\%$ de eficiência pertencem ao equivalente, não necessariamente à rede original.

[RC e RL](/cadeiras/f2/circuitos-reativos/#transitório-rc): $i_C=C\dot u_C$, $u_L=L\dot i_L$. $u_C$ e $i_L$ são contínuos sem impulsos ideais. $x(t)=x_\infty+(x_0-x_\infty)e^{-t/\tau}$; $\tau_{RC}=R_{\rm Th}C$, $\tau_{RL}=L/R_{\rm vista}$. DC estacionário: condensador aberto, bobina em curto.

[RLC série](/cadeiras/f2/circuitos-reativos/#rlc-e-amortecimento): $\omega_0=1/\sqrt{LC}$, $\delta=R/(2L)$, $Q=\sqrt{L/C}/R$. $Q<1/2$ sem oscilação; $Q=1/2$ crítico; $Q>1/2$ subamortecido, $\omega_d=\sqrt{\omega_0^2-\delta^2}$. São precisas duas condições iniciais.

## Fasores, potência e linhas

[Fasores](/cadeiras/f2/regime-sinusoidal/#fasores-e-impedância): $u=U_m\cos(\omega t+\phi)\leftrightarrow\underline U=U_me^{j\phi}$. Derivar multiplica por $j\omega$. $Z_R=R$, $Z_L=j\omega L$, $Z_C=1/(j\omega C)$. Série soma $Z$, paralelo soma $Y=1/Z$.

[Potência](/cadeiras/f2/regime-sinusoidal/#valores-eficazes-e-potência): para sinusoide $U_{\rm ef}=U_m/\sqrt2$. Fasores de pico: $P=\Re(\underline U\underline I^*)/2$. Eficazes: $S=\underline U_{\rm ef}\underline I_{\rm ef}^*=P+jQ_{\rm r}$. $P$ em W, $Q_{\rm r}$ em var, $|S|$ em VA. Não esqueças conjugado nem fator $1/2$.

[Ressonância](/cadeiras/f2/regime-sinusoidal/#ressonância-série): RLC série, $Z=R$ em $\omega_0$, corrente máxima com tensão fixa. RLC paralelo ideal, $Z=R$ em $\omega_0$, corrente total mínima com tensão fixa; $Q=R\sqrt{C/L}$. Não troques as duas definições de $Q$.

[Linhas sem perdas](/cadeiras/f2/linhas-transmissao/#linha-sem-perdas): $v=1/\sqrt{L'C'}$, $Z_0=\sqrt{L'/C'}$, atraso $\ell/v$. $\Gamma=(Z_L-Z_0)/(Z_L+Z_0)$; aberto $+1$, curto $-1$, adaptação $0$. Pulsos exigem comparar atraso e tempo de subida.

## Medições e sinais

[Incerteza](/cadeiras/f2/laboratorio/#propagação-de-incertezas): entradas independentes, $u(y)^2=\sum(\partial y/\partial x_i)^2u(x_i)^2$. Para $P=RI^2$, $u(P)/P=\sqrt{[u(R)/R]^2+4[u(I)/I]^2}$. Desvio $s$ descreve observações; $s/\sqrt n$ descreve a média de observações independentes.

[Sinais](/cadeiras/f2/sinais/#energia-e-potência-de-um-sinal): $E_x=\int|x|^2dt$, $P_x=\lim_{T\to\infty}(2T)^{-1}\int_{-T}^T|x|^2dt$. No discreto, usa somas. Sinusoide: energia infinita e $P_x=A^2/2$. As unidades dependem do sinal. Amostragem discretiza tempo, quantização discretiza valores.

[SLIT](/cadeiras/f2/sistemas-lti/#convolução-contínua): $y=x*h$; contínuo $\int x(\lambda)h(t-\lambda)d\lambda$, discreto $\sum_kx[k]h[n-k]$. Causal: $h=0$ antes de zero. Estável BIBO para respostas ordinárias: $\int|h|<\infty$ ou $\sum|h|<\infty$. Cascata convolui $h$; paralelo soma $h$.

## Fourier e amostragem

[Fourier](/cadeiras/f2/fourier/#transformada-contínua): $X(\omega)=\int x(t)e^{-j\omega t}dt$, inversa com $1/(2\pi)$. Convolução temporal vira produto $Y=XH$. Atraso multiplica por $e^{-j\omega t_0}$. Série periódica: $a_k=T_0^{-1}\int_{T_0}x(t)e^{-jk\omega_0t}dt$.

[Filtro RC](/cadeiras/f2/frequencia-amostragem/#filtro-rc-passa-baixo): $H=1/(1+j\omega RC)$, $f_c=1/(2\pi RC)$. No corte, $|H|=1/\sqrt2$, fase $-\pi/4$, ganho $-3{,}01\,\mathrm{dB}$.

[Nyquist](/cadeiras/f2/frequencia-amostragem/#teorema-de-amostragem): banda $|f|\le B$, usa $f_s>2B$. Réplicas $X_s(\omega)=T_s^{-1}\sum_kX(\omega-k\omega_s)$. Igualdade pode perder uma sinusoide pelos zeros. Filtra antes da amostragem; aumentar os bits não corrige aliasing.
