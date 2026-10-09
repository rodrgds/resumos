## Banda, símbolos e codificação

- $B$, em Hz, mede banda; $R_s$, em baud, mede símbolos/s; $R$, em bit/s, mede bits/s.
- Cada símbolo codifica $\log_2M$ bits, para $M$ potência de dois e sem sobrecarga; $R=R_s\log_2M$. 16 símbolos a 2400 baud dão 9600 bit/s.
- Banda base representa bits por níveis ou transições. NRZ-L usa níveis; NRZ-I usa transições segundo a convenção. Manchester tem transição a meio de cada bit, facilitando sincronização.
- Modulação altera amplitude em ASK, frequência em FSK, fase em PSK; QAM combina amplitude e fase. Não confundir com codificação de linha.
- 4B/5B transforma quatro bits em cinco: 80 Mbit/s úteis exigem 100 Mbit/s antes de outras sobrecargas.

Simplex permite uma direção; half-duplex, ambas à vez; full-duplex, ambas simultaneamente. FDM separa frequências, TDM intervalos, WDM comprimentos de onda. TDM síncrona pode reservar intervalos vazios.

## Canal e limites

Num canal linear invariante no tempo, sem ruído, $r(t)=s(t)*h(t)$ e $R(f)=S(f)H(f)$: a resposta do canal altera o sinal. Para reconstrução ideal de sinal limitado a $B$ Hz, usa mais de $2B$ amostras/s. A igualdade pode perder componentes no limite.

| Modelo  | Limite em bit/s  | Hipóteses                                           |
| ------- | ---------------- | --------------------------------------------------- |
| Nyquist | $2B\log_2M$      | Banda limitada, sem ruído, $M$ níveis distinguíveis |
| Shannon | $B\log_2(1+SNR)$ | Ruído gaussiano, SNR linear de potências            |

Se ambos forem impostos, usa o menor. Com $B=4000$ Hz, $M=16$ e SNR de 20 dB, SNR linear é 100: limites de 32 e aproximadamente 26,6 kbit/s. Respeitar limites não garante atingir o débito na prática.

## Potência e propagação

$$G_{dB}=10\log_{10}(P_2/P_1),\qquad P_2/P_1=10^{G_{dB}/10}.$$

Ganhos e perdas em dB somam-se. Para tensões, $20\log_{10}(V_2/V_1)$ exige impedâncias iguais. dBW usa 1 W como referência; dBm usa 1 mW, logo $P_{dBm}=P_{dBW}+30$. 20 dBm menos 30 dB de perda dão −10 dBm, ou 0,1 mW, uma potência positiva.

Em espaço livre, campo distante e antenas isotrópicas:

$$\frac{P_r}{P_t}=\left(\frac{\lambda}{4\pi d}\right)^2,\qquad \lambda=v/f.$$

Duplicar distância ou frequência, mantendo os restantes parâmetros, acrescenta cerca de 6,02 dB de perda. Obstáculos e multipercurso podem invalidar este modelo.

## Erros de bit e de trama

Com $L$ bits e erros independentes de probabilidade $p$, a FER é:

$$F=1-(1-p)^L\approx Lp\quad\text{se }Lp\ll1.$$

BER não é FER. Para $p=10^{-5}$ e $L=10000$, $F\approx0,09516$. Com $k$ tentativas independentes, sucesso pelo menos uma vez tem probabilidade $1-F^k$. Uma retransmissão permite duas tentativas. Erros em rajadas podem quebrar a independência.

[Dimensionamento do canal](/cadeiras/rc/transmissao-de-dados/#nyquist-e-shannon).
