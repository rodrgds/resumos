---
title: Folha de consulta de RC
description: Fórmulas, condições e distinções para rever antes de resolver problemas.
section: recursos
studyKind: revision
order: 0
editorial:
  basedOn: 2026/27
  coverage: Consulta compacta dos tópicos das onze lições. As derivações e resoluções estão nas lições.
---

## Unidades, canal e erros

$1\text{ byte}=8\text{ bit}$. kbit/s e Mbit/s decimais: $10^3$ e $10^6$. Converte ms, μs e km antes de calcular.

| Conta                   | Expressão                            | Condição                           |
| ----------------------- | ------------------------------------ | ---------------------------------- |
| Bits por símbolo        | $\log_2M$                            | Alfabeto de M símbolos codificados |
| Débito                  | $R_s\log_2M$                         | Sem descontar redundância          |
| Nyquist                 | $2B\log_2M$                          | Canal ideal sem ruído, banda B     |
| Shannon                 | $B\log_2(1+SNR)$                     | SNR linear, modelo de ruído        |
| SNR                     | $10^{SNR_{dB}/10}$                   | Razão de potências                 |
| Ganho                   | $10\log_{10}(P_r/P_t)$               | dB é uma razão                     |
| Potência                | $P_{dBm}=P_{dBW}+30$                 | Referências 1 mW e 1 W             |
| Espaço livre            | $L_{dB}=20\log_{10}(4\pi d/\lambda)$ | Modelo isotrópico, campo distante  |
| Erro de trama           | $F=1-(1-p)^L$                        | Erros de bit independentes         |
| Sucesso em k tentativas | $1-F^k$                              | Tentativas independentes           |

4B/5B: dados ocupam 4/5 dos bits codificados. Manchester inclui transição no meio do bit. NRZ e Manchester precisam de uma convenção para níveis/transições. [Explicação](/cadeiras/rc/transmissao-de-dados/).

## Atraso e utilização

Transmissão $t_f=L/R$; propagação $t_p=D/v$. Primeiro pacote store-and-forward: soma transmissão, propagação, processamento e fila em cada salto. N pacotes iguais, H ligações iguais, só transmissão: $(H+N-1)L/R$.

Stop-and-Wait sem perdas: $U=t_f/(t_f+2t_p+t_a)$. Com ACK desprezável e $a=t_p/t_f$: $U=1/(1+2a)$. Janela W sem perdas: $U=\min(1,W/(1+2a))$. Débito útil = R×U×fração de dados úteis.

Modelo com erro independente $p_e$: $U_{SW}=(1-p_e)/(1+2a)$, $U_{SR}=(1-p_e)\min(1,W/(1+2a))$.

Go-Back-N com erros independentes e ACK desprezável: se $W\ge1+2a$, $U=(1-p_e)/(1+2ap_e)$; senão $U=W(1-p_e)/((1+2a)(1-p_e+Wp_e))$.

Não apliques estas expressões fora do modelo. [Contas e traços](/cadeiras/rc/ligacao-de-dados/).

## CRC e ARQ

CRC: gerador de grau r, acrescentar r zeros, dividir por XOR, colocar resto. Resto zero significa **nenhum erro foi detetado**; não garante ausência de erro. Distância mínima d deteta até d−1 erros. Bit stuffing: zero depois de cinco uns entre flags, incluindo CRC.

RR(n): próximo esperado n. REJ(n): repetir desde n em Go-Back-N; SREJ(n): repetir apenas n em Selective Repeat. GBN descarta fora de ordem; SR guarda dentro da janela. Com m bits: $W_{GBN}\le2^m-1$, $W_{SR}\le2^{m-1}$ para janelas iguais. ACK perdido não autoriza entregar duplicados. [Explicação](/cadeiras/rc/ligacao-de-dados/).

## Filas

Little: $N=\lambda T$, mesma fronteira e taxa efetiva. Carga $\rho=\lambda/\mu$. Serviço médio $1/\mu$, ou comprimento médio/R.

| Modelo | Tempo médio em fila              | Condição                                        |
| ------ | -------------------------------- | ----------------------------------------------- |
| M/M/1  | $T_q=\rho/(\mu-\lambda)$         | $\rho<1$, serviço exponencial                   |
| M/D/1  | $T_q=\rho/(2\mu(1-\rho))$        | $\rho<1$, serviço constante                     |
| M/G/1  | $T_q=\lambda E[S^2]/(2(1-\rho))$ | $\rho<1$, Poisson, FIFO, segundo momento finito |

Serviços independentes das chegadas e entre si, FIFO e sem preempção. $T=T_q+E[S]$. Em M/M/1: $N=\rho/(1-\rho)$, $N_q=\rho^2/(1-\rho)$. Poisson num intervalo t: $P(k)=e^{-\lambda t}(\lambda t)^k/k!$.

M/M/1 estável: tempo ocioso $p_0=1-\rho$, $P(N\ge k)=\rho^k$ no sistema; para k≥1, $P(N_q\ge k)=\rho^{k+1}$ na fila. Serviço constante, FIFO e capacidade total B: espera de um admitido limitada por $(B-1)/\mu$. [Exemplos](/cadeiras/rc/modelos-filas/#inferir-a-ligação-a-partir-do-tempo-ocioso).

M/M/1/B, B capacidade total: $p_n=(1-\rho)\rho^n/(1-\rho^{B+1})$; se $\rho=1$, $p_n=1/(B+1)$. Bloqueio $p_B$, $\lambda_e=\lambda(1-p_B)$, $N=\sum n p_n$, $T=N/\lambda_e$.

Jackson aberto: $\lambda_i=\gamma_i+\sum_j\lambda_jp_{ji}$. Resolve taxas, confirma estabilidade de cada nó, soma N dos nós e divide pela taxa externa para o tempo global. [Filas básicas](/cadeiras/rc/desempenho-e-filas/) e [modelos adicionais](/cadeiras/rc/modelos-filas/).

## Acesso e LAN

ALOHA: puro $S=Ge^{-2G}$, máximo $1/(2e)$ em G=0,5; com ranhuras $S=Ge^{-G}$, máximo $1/e$ em G=1. Tentativas Poisson, tramas iguais, colisões destrutivas e sem captura; ranhuras sincronizadas na receção.

CSMA/CD ideal: $L_{min}/R\ge2t_p$. Ethernet full-duplex não tem colisões nem usa CD. Wi-Fi congela backoff durante canal ocupado e confirma depois da trama; RTS/CTS reduz alguns efeitos das estações escondidas, com sobrecarga.

Comutador aprende MAC **de origem**. Destino desconhecido: inunda mesma VLAN, exceto entrada. Conhecido na entrada: filtra. VLAN separa broadcast; spanning tree evita ciclos lógicos. [Acesso](/cadeiras/rc/acesso-ao-meio/) e [LAN](/cadeiras/rc/redes-locais/).

## IP e rotas

IPv4/p: $2^{32-p}$ endereços; hosts usuais menos 2, com exceções /31 ponto a ponto e /32. Rede = IP AND máscara. VLSM: maiores primeiro, blocos alinhados. Longest prefix match: maior prefixo que corresponda; /0 é a rota por omissão.

ARP resolve IP do próximo salto para MAC local. Router muda trama por salto; IP dos extremos normalmente mantém-se sem NAT. IPv4 fragmenta se permitido: dados de fragmentos não finais múltiplos de 8 bytes; offset em blocos de 8 da carga original; cada fragmento tem cabeçalho. IPv6 usa 128 bits, não tem checksum no cabeçalho base e routers não fragmentam.

Dijkstra: fixa a menor distância provisória e relaxa vizinhos. Distance vector: $D_x(y)=\min_v(c(x,v)+D_v(y))$. Regista próximo salto e rondas; soma de custos não é bottleneck. [IP](/cadeiras/rc/camada-de-rede/) e [routing](/cadeiras/rc/algoritmos-encaminhamento/).

## TCP e aplicações

TCP numera bytes; ACK cumulativo indica próximo esperado. SYN e FIN consomem 1; ACK sem dados não. Janela efetiva $\min(rwnd,cwnd)$; bytes novos descontam pendentes. Limite por janela W bytes: $8W/RTT$ bit/s. Fluxo protege recetor; congestionamento protege rede. Slow start aproximadamente duplica por RTT; congestion avoidance cresce aproximadamente 1 MSS por RTT, segundo o modelo.

DNS: A/AAAA endereços, MX correio, CNAME alias, NS autoritativos, PTR inverso. UDP e TCP 53. HTTP/1.1 delimita cabeçalhos por CRLF; ligação persistente evita nova abertura; não confundir com HTTP/3. FTP: controlo TCP 21 e dados separados. SMTP envia correio; POP3/IMAP acedem à caixa. TCP não preserva fronteiras de chamadas send/recv.

Distribuição: $D_{CS}\ge\max(NF/u_s,F/d_{min})$; $D_{P2P}\ge\max(F/u_s,F/d_{min},NF/(u_s+\sum u_i))$. Limites inferiores sob o modelo ideal. [TCP](/cadeiras/rc/transporte-e-aplicacoes/) e [aplicações](/cadeiras/rc/aplicacoes/).
