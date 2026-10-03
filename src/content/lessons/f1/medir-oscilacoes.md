---
title: Medir oscilações amortecidas
description: Estimar período, amortecimento e comprimento equivalente a partir de picos, com unidades e limites do modelo.
section: laboratorios
order: 7
practices:
  - f1/praticar-medicoes
---

Já estudaste o modelo das oscilações que perdem amplitude; esta página pergunta como transformar picos medidos em período e amortecimento para testar esse modelo.

Uma medição deve permitir testar o modelo, não apenas produzir uma curva parecida com uma oscilação. Aqui vamos partir de picos de um sinal amortecido e obter período, amortecimento e uma previsão verificável, ou seja transformamos leituras em parâmetros.

## O que mede o sensor

Uma posição harmónica tem aceleração $\ddot x=-\omega_0^2x$. Num oscilador amortecido, derivar a solução conserva o fator exponencial e a frequência, mas muda a amplitude e a fase. Por isso, picos da aceleração podem permitir estimar o mesmo período e a mesma taxa de decaimento, depois de retirares uma linha de base adequada.

Um acelerómetro num dispositivo mede aceleração própria nas direções dos seus eixos. Rotação do dispositivo, gravidade projetada, movimento do suporte e seleção do canal podem modificar o sinal. Não identifiques uma coluna com a aceleração tangencial do pêndulo sem analisar a orientação e o significado do canal. Guarda os dados originais e as unidades, porque podes precisar de rever essa escolha.

## Período e amplitude

Usa máximos do mesmo sinal, medidos relativamente à linha de base. Se os tempos forem $t_0,t_1,\ldots,t_N$, estima $T_d=(t_N-t_0)/N$. Usar vários ciclos reduz o efeito da leitura de um único pico, porque o erro divide-se por $N$. Um máximo positivo e o mínimo seguinte estão separados aproximadamente por meio período.

Suponhamos máximos positivos em $0{,}00$, $2{,}00$ e $4{,}00\ \mathrm s$, com amplitudes $1{,}00$, $0{,}80$ e $0{,}64\ \mathrm{m/s^2}$. Temos $T_d=(4-0)/2=2{,}00\ \mathrm s$. Os fatores de decaimento iguais são coerentes com uma envolvente exponencial.

## Ajustar o decaimento

A envolvente satisfaz $A(t)=A_0e^{-\gamma t}$. Para dois picos separados por $N$ períodos,

$$
\gamma=\frac{\ln(A_n/A_{n+N})}{NT_d}.
$$

No exemplo, $\gamma=\ln(1/0{,}64)/4\approx0{,}1116\ \mathrm{s^{-1}}$. O decremento por ciclo é $\delta=\ln(1/0{,}80)\approx0{,}2231$. Assim, o tempo para reduzir a amplitude para metade é $\ln2/\gamma\approx6{,}21\ \mathrm s$.

Com muitos picos, ajusta $\ln(A_n/A_\mathrm{ref})=c-\gamma t_n$, usando uma amplitude de referência na mesma unidade. O argumento do logaritmo é adimensional.

:::details[Ver quando desconfiar do ajuste]
Examina os resíduos, não só o declive: curvatura sistemática pode indicar amortecimento não linear ou uma linha de base errada. Picos próximos do ruído não devem dominar o ajuste, porque têm incerteza relativa maior.
:::

## Frequência natural e comprimento

Do período medido obtemos $\omega_d=2\pi/T_d$. Para amortecimento linear subcrítico,

$$
\omega_0=\sqrt{\omega_d^2+\gamma^2},\qquad
\tau=\frac1{2\gamma},\qquad Q=\frac{\omega_0}{2\gamma}.
$$

Aqui, $\omega_d=\pi\ \mathrm{rad/s}$ e $\omega_0\approx3{,}1436\ \mathrm{rad/s}$. Portanto $\tau\approx4{,}481\ \mathrm s$ e $Q\approx14{,}09$. Este $\tau$ corresponde ao decaimento médio da energia; a constante de tempo da amplitude é $1/\gamma=2\tau$.

Se o sistema for um pêndulo simples de pequenos ângulos, o comprimento equivalente é $\ell=g/\omega_0^2\approx0{,}993\ \mathrm m$. A aproximação que despreza o amortecimento dá $\ell=g(T_d/2\pi)^2\approx0{,}994\ \mathrm m$. A diferença pequena é coerente com amortecimento fraco. Num dispositivo extenso suspenso por fios, as dimensões e a inércia podem exigir um pêndulo físico; não compares com o comprimento de um fio sem essa análise.

## Incerteza e conclusão

Se o modelo de pêndulo simples valer e o amortecimento for desprezável, $\ell=gT^2/(4\pi^2)$. Para pequenas incertezas e $g$ fixo, $\Delta\ell/\ell\approx2\Delta T/T$. Uma incerteza de $0{,}02\ \mathrm s$ num período de $2{,}00\ \mathrm s$ produz cerca de $2\%$ no comprimento inferido.

Ao concluir, apresenta o intervalo de dados, o número de ciclos, as unidades, o método de estimativa e os resíduos. Compara a previsão de meia amplitude com os picos observados. Uma concordância dentro da incerteza apoia o modelo nesse intervalo, mas não prova que ele descreve todos os regimes ou amplitudes. Uma discrepância pode vir da geometria, de resistência não linear, de erro temporal ou do canal escolhido. Distingue uma causa demonstrada de uma hipótese a testar, ou seja diz o que mediste e o que ainda falta verificar.
