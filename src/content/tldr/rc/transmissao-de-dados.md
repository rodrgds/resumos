## Símbolos e débito

- $R_s$ em baud conta símbolos/s; $R$ em bit/s conta bits/s. Com $M$ símbolos: $R=R_s\log_2M$.
- 2400 baud com 16 símbolos dão $2400\times4=9600$ bit/s.
- Passa-baixo de 2 kHz a 12 kbit/s exige $\log_2M=12000/4000=3$, logo $M=8$ níveis.

## Nyquist e Shannon

- Nyquist, canal ideal sem ruído: $R=2B\log_2M$.
- Shannon, ruído gaussiano: $C=B\log_2(1+SNR)$, com SNR **linear**.
- Converte dB antes: $SNR=10^{SNR_{dB}/10}$. 20 dB valem 100.
- Com ambos impostos, fica o menor. Aumentar $M$ sobe Nyquist sem passar o teto de Shannon.
- $B=4000$ Hz, $M=16$, SNR 20 dB: Nyquist 32 kbit/s, Shannon ~26,6 kbit/s. Vale ~26,6 kbit/s.

## Linha e potência

- NRZ: níveis. Manchester: transição no meio de cada bit, facilita relógio. 4B/5B: 4 bits de dados em 5 codificados.
- Ganho: $G_{dB}=10\log_{10}(P_2/P_1)$. Perda de 3 dB deixa cerca de metade.
- dBm é face a 1 mW; dBW face a 1 W. $P_{dBm}=P_{dBW}+30$. dB sozinho é razão.
- Espaço livre isotrópico: $P_r/P_t=(\lambda/4\pi d)^2$. Duplicar distância ou frequência soma ~6,02 dB de perda.

## Erros

- BER $p$ por bit, trama de $L$ bits, erros independentes: $F=1-(1-p)^L$. Para $Lp\ll1$, $F\approx Lp$.
- $k$ tentativas independentes: pelo menos um sucesso com $1-F^k$.
- $p=10^{-5}$, $L=10000$: $F\approx0{,}095$.
