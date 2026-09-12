---
title: Cheat sheet de F1
description: Relações e passos de cálculo para cinemática, dinâmica, energia, corpos rígidos e sistemas dinâmicos.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Caderno Física SofiaViP
      url: https://drive.google.com/file/d/1bnR2QVhahe__spL63pZS_qty_LERPsnI/view
  coverage: As páginas 2 a 79 do caderno cobrem cinemática e referenciais, forças, equilíbrio, rotação, energia, coordenadas generalizadas e equações de Lagrange, sistemas dinâmicos, estabilidade e ciclos limite. A página 1 é a capa.
  gaps:
    - O site ainda não tem páginas explicativas próprias para coordenadas generalizadas, equações de Lagrange e a maior parte dos sistemas dinâmicos.
    - A edição do programa e as regras de avaliação a que o caderno corresponde não foram confirmadas.
---

Antes de substituir números, fixa **corpo ou sistema, referencial, sentidos positivos e hipóteses**.

## Cinemática e referenciais

Para a posição $\vec r(t)$, $\vec v=d\vec r/dt$ e $\vec a=d\vec v/dt$; deslocamento é $\Delta\vec r$, enquanto a distância percorrida é o comprimento da trajetória. Em movimento retilíneo, $v=ds/dt$ e $a=v\,dv/ds$ quando $v$ pode ser tratado como função de $s$. Com aceleração constante, $v=v_0+at$, $s=s_0+v_0t+at^2/2$ e $v^2=v_0^2+2a(s-s_0)$. Não apliques estas três igualdades a aceleração variável. Vê [posição, velocidade e aceleração](/cadeiras/f1/cinematica/#posição-velocidade-e-aceleração).

Num lançamento sem resistência do ar, com $y$ positivo para cima, $x=x_0+v_0\cos\theta\,t$, $y=y_0+v_0\sin\theta\,t-gt^2/2$. O alcance $v_0^2\sin(2\theta)/g$ exige partida e chegada à **mesma altura**. Para uma curva regular, $\vec v=\dot s\,\hat t$ e $\vec a=\ddot s\,\hat t+(v^2/R)\hat n$, com $R$ raio de curvatura e $\hat n$ apontado para o centro. No movimento circular, $v=R\omega$, $a_t=R\alpha$ e $a_n=R\omega^2$. Vê [movimento curvilíneo](/cadeiras/f1/cinematica/#movimento-curvilíneo-e-aceleração-centrípeta).

Se $\vec r_{P/Q}=\vec r_P-\vec r_Q$, então $\vec v_{P/Q}=\vec v_P-\vec v_Q$ e $\vec a_{P/Q}=\vec a_P-\vec a_Q$ em referenciais com eixos paralelos sem rotação relativa. Para um ponto de um corpo rígido em rotação, $\vec v_P=\vec v_O+\vec\omega\times\vec r_{P/O}$. Num rolamento sem escorregar sobre uma superfície parada, o ponto de contacto tem velocidade instantânea nula; isso não implica aceleração nula. Escolhe primeiro o referencial e o ponto $O$.

## Forças, equilíbrio e momento

Desenha um diagrama de corpo livre **por corpo**. Em referencial inercial, $\sum\vec F=d\vec p/dt=m\vec a$ se a massa for constante. O impulso $\int_{t_1}^{t_2}\vec F_{\mathrm{ext}}\,dt=\Delta\vec p$; a quantidade de movimento conserva-se quando o impulso externo resultante é nulo. Em equilíbrio estático de um corpo rígido, $\sum\vec F=0$ e $\sum\vec M_O=0$. Vê [leis de Newton](/cadeiras/f1/leis-newton/#as-três-leis), [diagramas](/cadeiras/f1/leis-newton/#diagramas-de-corpo-livre) e [equilíbrio](/cadeiras/f1/leis-newton/#equilíbrio-estático).

Decompõe o peso $m\vec g$ nos eixos escolhidos. Para contacto seco, $|F_{at,est}|\leq\mu_sN$ enquanto não há deslizamento; $|F_{at,cin}|=\mu_kN$ durante deslizamento, com sentido oposto à velocidade relativa. Não imponhas $F_{at,est}=\mu_sN$ sem verificar que está no limiar. O arrasto de um fluido pode depender de $v$ ou de $v^2$ conforme o regime, e atua contra a velocidade **relativa ao fluido**. Vê [tipos de força](/cadeiras/f1/leis-newton/#tipos-de-força).

O momento de $\vec F$ relativamente a $O$ é $\vec M_O=\vec r_{P/O}\times\vec F$, com módulo $Fd_\perp$. Um binário tem força resultante nula e momento não nulo. O centro de massa satisfaz $\vec r_{CM}=M^{-1}\int\vec r\,dm$; para massas discretas, troca o integral por $\sum m_i\vec r_i$. Escolher o ponto de momentos pode eliminar forças cuja linha de ação passe por ele. Vê [centro de massa](/cadeiras/f1/centro-massa-momento/#centro-de-massa) e [torque](/cadeiras/f1/rotacao/#torque).

Para rotação em torno de **eixo fixo**, $I=\int r_\perp^2\,dm$ e $\sum M_{eixo}=I\alpha$. Se o eixo for paralelo ao que atravessa o centro de massa, $I=I_{CM}+Md^2$. A energia cinética de um corpo rígido em movimento plano é $K=Mv_{CM}^2/2+I_{CM}\omega^2/2$. Em rolamento sem escorregar, $v_{CM}=R\omega$ apenas na geometria correspondente; verifica o raio efetivo. Vê [momento de inércia](/cadeiras/f1/rotacao/#momento-de-inércia) e [segunda lei da rotação](/cadeiras/f1/rotacao/#segunda-lei-da-rotação).

## Trabalho, energia e oscilações

O trabalho é $W_{1\to2}=\int_1^2\vec F\cdot d\vec r$ e $W_{\mathrm{resultante}}=K_2-K_1$ para uma partícula. Para uma força conservativa, $W_c=U_1-U_2$; com forças não conservativas, $E_{m,2}-E_{m,1}=W_{nc}$. Usa $U_g=mgz$ perto da superfície terrestre e $U_e=kx^2/2$ para uma mola ideal, medindo $x$ desde o comprimento natural. Potência instantânea: $P=\vec F\cdot\vec v$; na rotação em torno de eixo fixo, $P=M\omega$. Vê [trabalho](/cadeiras/f1/trabalho-energia/#trabalho-de-uma-força), [energia potencial](/cadeiras/f1/trabalho-energia/#energia-potencial-e-conservação) e [potência](/cadeiras/f1/trabalho-energia/#potência).

No oscilador harmónico sem amortecimento, $m\ddot x+kx=0$, $\omega_0=\sqrt{k/m}$ e $T=2\pi/\omega_0$. Com atrito viscoso linear, $m\ddot x+b\dot x+kx=F(t)$; o movimento livre pode ser subamortecido, crítico ou sobreamortecido conforme $b^2$ seja menor, igual ou maior que $4mk$. Forçamento perto da frequência natural pode aumentar a amplitude; com amortecimento, o pico não coincide necessariamente com $\omega_0$. Vê [movimento harmónico](/cadeiras/f1/oscilacoes/#movimento-harmónico-simples), [amortecimento](/cadeiras/f1/oscilacoes/#amortecimento) e [ressonância](/cadeiras/f1/oscilacoes/#forçamento-e-ressonância).

## Coordenadas generalizadas e sistemas dinâmicos

Uma restrição holónoma reduz os graus de liberdade: escolhe coordenadas independentes $q_i$ antes de escrever energia cinética $T(q,\dot q,t)$ e potencial $U(q,t)$. Para forças conservativas, $L=T-U$ e $\frac{d}{dt}\frac{\partial L}{\partial\dot q_i}-\frac{\partial L}{\partial q_i}=Q_i^{nc}$. O termo $Q_i^{nc}=\sum_j\vec F_j^{nc}\cdot\partial\vec r_j/\partial q_i$ representa forças generalizadas não conservativas; uma força de vínculo ideal que não faz trabalho virtual não entra. Se $L$ não depender de $q_i$, o momento conjugado $\partial L/\partial\dot q_i$ conserva-se quando $Q_i^{nc}=0$.

Para $\dot{\vec x}=\vec f(\vec x)$, um ponto de equilíbrio $\vec x_*$ cumpre $\vec f(\vec x_*)=0$. Lineariza perto dele com $\dot{\boldsymbol\eta}\simeq J(\vec x_*)\boldsymbol\eta$. Em duas dimensões, $\lambda^2-(\operatorname{tr}J)\lambda+\det J=0$: $\det J<0$ dá sela instável; $\det J>0$ e $\operatorname{tr}J<0$ dão estabilidade **linear assintótica** se os valores próprios tiverem parte real negativa; traço positivo dá instabilidade. Se algum valor próprio tiver parte real zero, a linearização pode ser inconclusiva. Esta leitura cobre a classificação local, não prova por si a existência de ciclos limite.

No modelo logístico, $\dot x=x(a-bx)$ com $a,b>0$: os equilíbrios são $0$ e $a/b$; para $x>0$, $0$ repele e $a/b$ atrai. Para uma solução periódica isolada de um sistema autónomo plano, observa o retrato de fase e a direção do campo dos dois lados antes de lhe chamar ciclo limite atrativo ou repulsivo. O caderno também usa modelos presa-predador e aproximação numérica: passo de Euler $\vec x_{n+1}=\vec x_n+h\vec f(t_n,\vec x_n)$, cujo erro depende de $h$ e da regularidade de $\vec f$.

Estas relações condensam o caderno, incluindo assuntos que ainda não têm explicação desenvolvida no site. Confirma sempre a edição e os critérios da tua unidade curricular.
