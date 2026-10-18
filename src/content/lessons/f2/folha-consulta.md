---
title: Cheat sheet de F2
description: Fórmulas e condições para campos, circuitos, medições, sinais e amostragem.
section: recursos
studyKind: revision
---

## Convenções e referências

| Convenção         | Fixação                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Fasores           | De pico; $j^2=-1$; $\omega=2\pi f$                                                                                                   |
| Número de onda    | $k=2\pi/\lambda$, distinto de $k_e\simeq8{,}99\times10^9\,\mathrm{N\,m^2/C^2}$                                                       |
| Sinais em Faraday | Fixa normal e contorno pela mão direita; o sinal refere-se a essa escolha                                                            |
| Pico vs eficaz    | $U_{\rm ef}=U_m/\sqrt2$ só para sinusoide sem offset                                                                                 |
| Decibéis          | Ganho de tensão $20\log_{10}\|H\|$; razão de potências $10\log_{10}$                                                                 |
| Unidades de campo | $E$ em $\mathrm{N/C}=\mathrm{V/m}$; $B$ em teslas; fluxo elétrico em $\mathrm{V\,m}$; fluxo magnético em $\mathrm{Wb}=\mathrm{V\,s}$ |

## Carga, campo e Maxwell

- Para força sobre carga conhecida, [Coulomb e Lorentz](/cadeiras/f2/carga-campo/#força-de-lorentz): $q_e=-e$, $q_p=+e$, $e=1{,}602176634\times10^{-19}\,\mathrm C$. $\vec F_E=q\vec E$, com $q\ne0$. Lorentz $\vec F=q(\vec E+\vec v\times\vec B)$. A força magnética não realiza trabalho. Para movimento não relativista perpendicular a $B$ uniforme, $r=mv/(|q|B)$ e $\omega_c=|q|B/m$.
- Para campo criado por cargas pontuais, [sobreposição](/cadeiras/f2/carga-campo/#sobreposição): $\vec E=\sum_i k_eq_i(\vec r-\vec r_i)/|\vec r-\vec r_i|^3$. Soma componentes, não módulos; o sinal de $q_i$ já orienta cada parcela.
- [Maxwell no vazio](/cadeiras/f2/equacoes-maxwell/#as-quatro-leis-lado-a-lado):

$$
\nabla\cdot\vec E=\rho_V/\varepsilon_0,\quad\nabla\cdot\vec B=0,
\qquad
\nabla\times\vec E=-\partial_t\vec B,\quad
\nabla\times\vec B=\mu_0\vec J+\mu_0\varepsilon_0\partial_t\vec E.
$$

- $Q=\int\rho_VdV$, $I=\int\vec J\cdot d\vec A$, $\partial_t\rho_V=-\nabla\cdot\vec J$. $\rho_V$ em $\mathrm{C/m^3}$ e $J$ em $\mathrm{A/m^2}$. Derivada espacial divide a unidade por metro.
- Para testar se um campo proposto é possível, usa a forma diferencial e verifica as quatro equações com as fontes; uma só não basta.

## Gauss com simetria

- Para campo com simetria, [Gauss](/cadeiras/f2/equacoes-maxwell/#lei-de-gauss): fluxo fechado $Q_{\rm int}/\varepsilon_0$. Só a simetria permite retirar $E$ da integral. Exige distribuição uniforme na simetria invocada.

| Simetria                  | Relação                                | Hipótese                                        |
| ------------------------- | -------------------------------------- | ----------------------------------------------- |
| Esfera                    | $E4\pi r^2=Q_{\rm int}/\varepsilon_0$  | carga com simetria esférica                     |
| Fio infinito e uniforme   | $E=\lambda_Q/(2\pi\varepsilon_0r)$     | densidade linear uniforme, fio longo            |
| Plano infinito e uniforme | Módulo $\|\sigma_Q\|/(2\varepsilon_0)$ | densidade superficial uniforme, longe de bordos |

## Potencial e condutores

- [Potencial](/cadeiras/f2/potencial-capacidade/#potencial-e-energia): em eletrostática, $\vec E=-\nabla V$. Entre dois pontos, $V_B-V_A=-\int_A^B\vec E\cdot d\vec\ell$. Para carga $q$, $\Delta U=q(V_B-V_A)=-W_{A\to B}$, logo $\Delta V=-W_{\text{campo}}/q$. Cargas localizadas com $V(\infty)=0$: $V=\sum k_eq_i/r_i$. $V=0$ não implica $E=0$, porque o campo depende do gradiente.
- [Condutor em equilíbrio](/cadeiras/f2/potencial-capacidade/#condutores-em-equilíbrio): $E=0$ no material, $V$ constante, excesso de carga nas superfícies. Cavidade vazia fechada tem campo zero. Terra fixa potencial, não carga total. Com corrente, há campo interior e queda de potencial.
- [Capacidade](/cadeiras/f2/potencial-capacidade/#capacidade): $C=q/u$, esfera isolada $C=4\pi\varepsilon_0R$, placas $C=\varepsilon A/d$ desprezando bordos. Paralelo: $C_{\rm eq}=\sum C_i$. Série com nós intermédios neutros: $1/C_{\rm eq}=\sum1/C_i$. $W_C=Cu^2/2$.
- [Limites de tensão em série](/cadeiras/f2/potencial-capacidade/#tensões-máximas-em-série), com nós intermédios neutros: calcula primeiro $q_{\max}=\min_k(C_kU_{k,\max})$ e depois $U_{\max}=q_{\max}\sum_k1/C_k$. Não somes automaticamente as tensões nominais.

## Campo magnético estático

- [Ampère](/cadeiras/f2/magnetismo-inducao/#ampère-e-simetria): em magnetostática no vazio, $\oint\vec B\cdot d\vec\ell=\mu_0I_{\rm int}$. Só a simetria permite retirar $B$ da integral.
- Fio infinito: $B=\mu_0I/(2\pi r)$, azimutal pela mão direita.
- Bobina longa, longe dos extremos: $B\simeq\mu_0nI$, com $n$ espiras por metro.
- Centro de espira circular de raio $a$: $B=\mu_0I/(2a)$, apenas nesse ponto.

## Força e momento magnéticos

- [Força em fios](/cadeiras/f2/magnetismo-inducao/#forças-e-momento-magnético): $d\vec F=I\,d\vec\ell\times\vec B$. Segmento retilíneo em campo uniforme: $\vec F=I\vec\ell\times\vec B$.
- [Espira em campo uniforme](/cadeiras/f2/magnetismo-inducao/#forças-e-momento-magnético): força total zero, momento $\vec m=NIA\hat n$, torque $\vec\tau=\vec m\times\vec B$, energia $U=-\vec m\cdot\vec B$. A normal segue a corrente pela mão direita.

## Faraday, Lenz e indução

- [Fluxo](/cadeiras/f2/magnetismo-inducao/#lei-de-faraday-e-lenz): $\Phi_B=\int\vec B\cdot d\vec A$. Para campo uniforme, $\Phi_B=BA\cos\theta$.
- [Faraday](/cadeiras/f2/magnetismo-inducao/#lei-de-faraday-e-lenz): $\mathcal E=-N\,d\Phi_B/dt$ na orientação escolhida. Pode variar $B$, área ou orientação.
- [Lenz](/cadeiras/f2/magnetismo-inducao/#lei-de-faraday-e-lenz): fixa normal e contorno pela mão direita; o sinal refere-se a essa escolha. A corrente induzida contraria a variação do fluxo, não o fluxo.
- [Transformador ideal](/cadeiras/f2/magnetismo-inducao/#geradores-e-transformadores): $|U_2/U_1|=N_2/N_1$, $|I_2/I_1|=N_1/N_2$. A polaridade depende dos enrolamentos. Tensão contínua não mantém transformação estacionária.
- [Autoindução](/cadeiras/f2/magnetismo-inducao/#autoindução): bobina linear fixa $N\Phi_B=LI$, força eletromotriz própria $-L\,dI/dt$, queda passiva $u_L=L\,dI/dt$, energia $LI^2/2$.

## Ondas e energia

- Para direção e fase, [ondas](/cadeiras/f2/ondas-eletromagneticas/#fase-frequência-e-direção): $c=1/\sqrt{\mu_0\varepsilon_0}=\lambda f=\omega/k$. Fase $kz-\omega t$ avança para $+z$; $kz+\omega t$ recua para $-z$. $\vec B=\hat k\times\vec E/c$ para onda plana no vazio; $B_m=E_m/c$.
- Para energia, [Poynting](/cadeiras/f2/ondas-eletromagneticas/#energia-e-vetor-de-poynting): $\vec S=\vec E\times\vec B/\mu_0$, $w=\varepsilon_0E^2/2+B^2/(2\mu_0)$, $\partial_tw=-\vec J\cdot\vec E-\nabla\cdot\vec S$. Intensidade média harmónica com amplitude de pico $\mathcal I=\varepsilon_0cE_m^2/2$; com eficaz, $\mathcal I=\varepsilon_0cE_{\rm ef}^2$. Campo distante: amplitude $1/r$, intensidade $1/r^2$.

## Condução e Hall

- Para corrente num material, [condução](/cadeiras/f2/conducao-eletrica/#lei-de-ohm-microscópica): $\vec J=\sigma\vec E=nq\vec v_d$, $\rho=1/\sigma$, $R=\rho\ell/A$ para fio homogéneo de secção constante. Potência por volume $\vec J\cdot\vec E=\sigma E^2$. Não confundas deriva com velocidade de propagação do sinal.
- Para o sinal de Hall com um só tipo de portador, $|U_H|=|IB/(nqd)|$ com $d$ na direção de $B$. O módulo não dá a polaridade: fixa corrente, campo e contactos antes de concluir.

## Kirchhoff e associações

- [Kirchhoff](/cadeiras/f2/circuitos-resistivos/#leis-de-kirchhoff): $\sum i=0$ nos nós, $\sum u=0$ em malhas, no modelo concentrado sem fluxos variáveis externos. Convenção passiva $p=ui$ para potência absorvida.
- Série sem derivação: somam $R$. Paralelo nos mesmos dois nós: soma $1/R$.
- Divisor sem carga $u_2=U_sR_2/(R_1+R_2)$; com carga, substitui $R_2$ por $R_2\parallel R_L$.
- Limites de potência por resistor, não pela soma das classificações: em série, $I_{\max}^2=\min_k(P_{k,\max}/R_k)$; em paralelo, $U_{\max}^2=\min_k(P_{k,\max}R_k)$.

## Thévenin e potência máxima

- [Thévenin](/cadeiras/f2/circuitos-resistivos/#thévenin-e-norton): $U_{\rm Th}$ em aberto. Para $R_{\rm Th}$, anula fontes independentes (tensão ideal vira curto, corrente ideal vira aberto; com fontes dependentes usa fonte de teste). $I_N=U_{\rm Th}/R_{\rm Th}$. Carga: $I_L=U_{\rm Th}/(R_{\rm Th}+R_L)$.
- Máxima potência resistiva em $R_L=R_{\rm Th}>0$: $P_{\max}=U_{\rm Th}^2/(4R_{\rm Th})$. Os $50\%$ de eficiência pertencem ao equivalente, não necessariamente à rede original.

## Transitórios de primeira ordem

- [RC e RL](/cadeiras/f2/circuitos-reativos/#transitório-rc): $i_C=C\dot u_C$, $u_L=L\dot i_L$. $u_C$ e $i_L$ são contínuos sem impulsos ideais.
- Vale apenas para circuito linear de primeira ordem estável, após comutação, com fonte constante. Então, com $x_0$ no instante $0^+$ e $x_\infty$ no limite DC:

$$
x(t)=x_\infty+(x_0-x_\infty)e^{-t/\tau}.
$$

- $\tau_{RC}=R_{\rm Th}C$, $\tau_{RL}=L/R_{\rm vista}$. DC estacionário: condensador aberto, bobina em curto. Após $5\tau$, resta menos de $0{,}7\%$ da variação. Não uses esta forma para entrada variável no tempo.

## RLC e amortecimento

- [RLC série](/cadeiras/f2/circuitos-reativos/#rlc-e-amortecimento): $\omega_0=1/\sqrt{LC}$, $\delta=R/(2L)$, $Q=\sqrt{L/C}/R$. $Q<1/2$ sem oscilação; $Q=1/2$ crítico; $Q>1/2$ subamortecido, $\omega_d=\sqrt{\omega_0^2-\delta^2}$. São precisas duas condições iniciais.

## Fasores e potência

- [Fasores](/cadeiras/f2/regime-sinusoidal/#fasores-e-impedância): $u=U_m\cos(\omega t+\phi)\leftrightarrow\underline U=U_me^{j\phi}$, uma frequência de cada vez. Derivar multiplica por $j\omega$. $Z_R=R$, $Z_L=j\omega L$, $Z_C=1/(j\omega C)$. Série soma $Z$, paralelo soma $Y=1/Z$.
- [Potência](/cadeiras/f2/regime-sinusoidal/#valores-eficazes-e-potência): para sinusoide sem offset, $U_{\rm ef}=U_m/\sqrt2$. Fasores de pico: $P=\Re(\underline U\underline I^*)/2$. Eficazes: $S=\underline U_{\rm ef}\underline I_{\rm ef}^*=P+jQ_{\rm r}$. $P$ em W, $Q_{\rm r}$ em var, $|S|$ em VA. Não esqueças conjugado nem fator $1/2$.
- [Ressonância](/cadeiras/f2/regime-sinusoidal/#ressonância-série): RLC série, $Z=R$ em $\omega_0$, corrente máxima com tensão fixa, $Q=\omega_0L/R$. RLC paralelo ideal, $Z=R$ em $\omega_0$, corrente total mínima com tensão fixa; $Q=R\sqrt{C/L}$. Não troques as duas definições de $Q$.

## Linhas sem perdas

- [Linha sem perdas](/cadeiras/f2/linhas-transmissao/#linha-sem-perdas): $v=1/\sqrt{L'C'}$, $Z_0=\sqrt{L'/C'}$ (impedância característica, não resistência do fio), atraso $\ell/v$.
- [Reflexão na carga](/cadeiras/f2/linhas-transmissao/#reflexão-e-adaptação): $\Gamma=(Z_L-Z_0)/(Z_L+Z_0)$; aberto $+1$, curto $-1$, adaptação $0$. Para pulsos, compara atraso com tempo de subida, não só $\ell$ com $\lambda$.

## Medições

- [Incerteza](/cadeiras/f2/laboratorio/#propagação-de-incertezas): entradas independentes, $u(y)^2=\sum(\partial y/\partial x_i)^2u(x_i)^2$; com correlação, junta covariâncias. Para $P=RI^2$, $u(P)/P=\sqrt{[u(R)/R]^2+4[u(I)/I]^2}$: compara incertezas relativas, porque a corrente entra com peso dois. Desvio $s$ descreve observações; $s/\sqrt n$ descreve a média de observações independentes. Especificação $\pm(a\%+n\text{ dígitos})$ ainda não é incerteza padrão.

## Sinais e SLIT

- [Sinais](/cadeiras/f2/sinais/#energia-e-potência-de-um-sinal): $E_x=\int|x|^2dt$, $P_x=\lim_{T\to\infty}(2T)^{-1}\int_{-T}^T|x|^2dt$. No discreto, usa somas. Sinusoide não nula: energia infinita e $P_x=A^2/2$. As unidades dependem do sinal; numa resistência, divide por $R$. Amostragem discretiza tempo, quantização discretiza valores.
- [SLIT](/cadeiras/f2/sistemas-lti/#convolução-contínua): $y=x*h$; contínuo $\int x(\lambda)h(t-\lambda)d\lambda$ com limites pela interseção dos suportes, discreto $\sum_kx[k]h[n-k]$ só com índices não nulos. Causal: $h=0$ antes de zero. Estável BIBO para respostas ordinárias: $\int|h|<\infty$ ou $\sum|h|<\infty$. Cascata convolui $h$; paralelo soma $h$. Cascata de circuitos só mantém as respostas se a carga de um não alterar o outro.

## Fourier e amostragem

- [Fourier](/cadeiras/f2/fourier/#transformada-contínua): $X(\omega)=\int x(t)e^{-j\omega t}dt$, inversa com $1/(2\pi)$. Convolução temporal vira produto $Y=XH$. Atraso multiplica por $e^{-j\omega t_0}$ sem mudar o módulo. Série periódica: $a_k=T_0^{-1}\int_{T_0}x(t)e^{-jk\omega_0t}dt$. O fasor de pico é o dobro de $a_1$; não os confundas.
- [Filtro RC](/cadeiras/f2/frequencia-amostragem/#filtro-rc-passa-baixo): $H=1/(1+j\omega RC)$, $f_c=1/(2\pi RC)$. No corte, $|H|=1/\sqrt2$, fase $-\pi/4$, ganho $-3{,}01\,\mathrm{dB}$. Os terminais de saída decidem o filtro: condensador dá passa-baixo, resistência dá passa-alto.
- [Nyquist](/cadeiras/f2/frequencia-amostragem/#teorema-de-amostragem): banda $|f|\le B$, usa $f_s>2B$; a igualdade pode perder amplitude ou fase. Réplicas $X_s(\omega)=T_s^{-1}\sum_kX(\omega-k\omega_s)$. Filtra antes da amostragem; aumentar os bits não corrige aliasing.
