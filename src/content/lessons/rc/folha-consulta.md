---
title: Folha de consulta de RC
description: Fórmulas, condições e distinções para rever antes de resolver problemas.
section: recursos
studyKind: revision
order: 0
editorial:
  basedOn: 2026/27
  review:
    edition: 2026/27
    reviewer: T3-RC
    date: '2026-10-18'
  coverage: Consulta esquemática dos tópicos das onze lições. Derivações e resoluções nas lições.
---

Escolhe primeiro o modelo e a fronteira. Cada secção indica quando a fórmula vale e o erro que a troca provoca.

## Canal e erros

| Conta                     | Expressão                     | Vale quando                     |
| ------------------------- | ----------------------------- | ------------------------------- |
| Bits por símbolo          | $\log_2M$                     | Alfabeto de $M$ símbolos        |
| Débito                    | $R_s\log_2M$                  | Sem redundância                 |
| Nyquist                   | $2B\log_2M$                   | Ideal, sem ruído, banda $B$     |
| Shannon                   | $B\log_2(1+SNR)$              | SNR **linear**, ruído gaussiano |
| SNR de dB                 | $10^{SNR_{dB}/10}$            | Razão de potências              |
| Ganho/perda               | $10\log_{10}(P_2/P_1)$        | dB é razão, não potência        |
| dBm/dBW                   | $P_{dBm}=P_{dBW}+30$          | Referências 1 mW e 1 W          |
| Espaço livre              | $20\log_{10}(4\pi d/\lambda)$ | Isotrópico, campo distante      |
| Erro de trama             | $F=1-(1-p)^L$                 | Bits independentes              |
| Sucesso em $k$ tentativas | $1-F^k$                       | Tentativas independentes        |

Com Nyquist e Shannon impostos, fica o menor. [Transmissão](/cadeiras/rc/transmissao-de-dados/#nyquist-e-shannon)

## Atraso e débito

1. Converte bytes em bits, ms em s, km em m.
2. Soma por salto: $t_f=L/R$, $t_p=D/v$, mais fila e processamento.
3. $N$ pacotes, $H$ ligações iguais, só transmissão: $(H+N-1)L/R$. Débitos diferentes: desenha cada transmissão.
4. Débito sustentado não passa o menor débito do percurso.
5. Janela $W$ bytes, RTT $T$: $8W/T$ bit/s. [Atraso](/cadeiras/rc/desempenho-e-filas/#atraso-de-um-salto)

## ARQ: escolher e calcular

|                  | Stop-and-Wait | Go-Back-N            | Selective Repeat |
| ---------------- | ------------- | -------------------- | ---------------- |
| Fora de ordem    | —             | Descarta             | Guarda na janela |
| Retransmite      | A trama       | Em falta e seguintes | Só em falta      |
| Janela, $m$ bits | 1             | $\le2^m-1$           | $\le2^{m-1}$     |

- Sem perdas: $U=t_f/(t_f+2t_p+t_a)$; janela $W$: $\min(1,W/(1+2a))$, $a=t_p/t_f$.
- Com $p_e$ independente: $U_{SW}=(1-p_e)/(1+2a)$; SR entrega $(1-p_e)\min(1,W/(1+2a))$.
- RR(n) pede a trama $n$; REJ(n) repete desde $n$; SREJ(n) repete só $n$.
- Bloco finito: segue transmissões e ACKs; último bit chega uma propagação após o fim, confirmação após duas. [Traços](/cadeiras/rc/ligacao-de-dados/#resolver-traços)
- Lab 1 usa BCC por XOR, stuffing após o cálculo, API `llOpenTx`/`llOpenRx`/`llSend`/`llReceive`. [Lab](/cadeiras/rc/ligacao-de-dados/#do-crc-da-teoria-ao-bcc-do-laboratório)

## Filas: escolher o modelo

1. Confirma a fronteira: fila exclui serviço, sistema inclui. Com perdas, $\lambda$ é a taxa **admitida**.
2. Poisson dá $P(k)=e^{-\lambda t}(\lambda t)^k/k!$. Agregado periódico não é Poisson.
3. M/M/1 exige $\rho<1$: $T=1/(\mu-\lambda)$, $T_q=\rho/(\mu-\lambda)$, $N=\rho/(1-\rho)$.
4. Serviço constante muda para M/D/1: $T_q=\rho/(2\mu(1-\rho))$. Variância geral: Pollaczek-Khinchine.
5. B é capacidade **total**: $p_n=(1-\rho)\rho^n/(1-\rho^{B+1})$; bloqueio $p_B$.
6. Jackson: resolve $\lambda_i=\gamma_i+\sum_j\lambda_jp_{ji}$, confirma cada nó, soma $N$ e divide pela taxa externa. [Filas](/cadeiras/rc/modelos-filas/)

## Acesso e LAN

- ALOHA puro $Ge^{-2G}$ (máximo $1/2e$ em $0{,}5$); com ranhuras $Ge^{-G}$ (máximo $1/e$ em 1). Tentativas Poisson, tramas iguais.
- CSMA/CD: $L_{min}/R\ge2t_p$. Comutada full-duplex não usa CD.
- Wi-Fi: sem deteção de colisão; ACK após SIFS; backoff congela com meio ocupado. Escondidas não se ouvem; RTS/CTS reserva com sobrecarga.
- Comutador aprende origem; desconhecido inunda a VLAN; mesma porta filtra. VLAN separa broadcast; STP evita ciclos. [Acesso](/cadeiras/rc/acesso-ao-meio/) e [LAN](/cadeiras/rc/redes-locais/)

## IP e rotas

1. Rede = IP AND máscara. Bloco alinhado a potência de dois.
2. VLSM: maiores primeiro; desconta rede, broadcast, gateway e gestão.
3. Vale o prefixo mais longo; `/0` é a rota por omissão.
4. ARP resolve o próximo salto; remoto resolve o gateway.
5. Fragmento IPv4: dados não finais múltiplos de 8; offset em blocos de 8; 4000 em MTU 1500 dá 1480/0, 1480/185, 1020/370.
6. Dijkstra exige custos não negativos; prossimo salto é o primeiro após a origem. DV: $D_x(y)=\min_v(c+D_v)$. RIP: 16 é infinito. [IP](/cadeiras/rc/camada-de-rede/) e [routing](/cadeiras/rc/algoritmos-encaminhamento/)

## TCP e aplicações

- Bytes, não segmentos: SYN/FIN consomem 1. ACK indica o próximo esperado.
- Fluxo gere o recetor (`rwnd`); congestionamento gere a rede (`cwnd`). Novos: $\max(0,\min(rwnd,cwnd)-FlightSize)$.
- Reno: 3 duplicados dão `ssthresh+3MSS` e volta a `ssthresh`; timeout dá `cwnd=1MSS` e slow start. Slow start duplica por RTT; avoidance soma ~1 MSS.
- RTO: atualiza RTTVAR antes de SRTT; mínimo recomendado 1 s; Karn ignora amostras ambíguas.
- DNS: A/AAAA, CNAME, MX, NS, PTR; recursão nos locais; porta 53.
- HTTP/1.1: CRLF e linha vazia delimitam; persistente poupa aberturas; 304 reutiliza corpo.
- FTP: controlo 21, dados à parte. SMTP `DATA` acaba em linha só com `.`. [TCP](/cadeiras/rc/transporte-e-aplicacoes/) e [aplicações](/cadeiras/rc/aplicacoes/)

## Erros que custam pontos

- Misturar bit/s com baud, ou SNR em dB dentro de Shannon.
- Esquecer gateway e gestão na contagem de terminais.
- Usar broadcast ou rede como endereço de host.
- Confirmar RR como entrega; tratar duplicado confirmado como dados novos.
- Aplicar M/M/1 a fila finita, serviço constante ou chegadas periódicas.
- Anunciar agregados que incluem destinos indevidos.
- Atribuir a perda apenas a congestionamento; ignorar ECN e erros de canal.
