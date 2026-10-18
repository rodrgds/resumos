## Atraso de um salto

$$d=d_{proc}+d_{fila}+L/R+D/v.$$

- $L$ em bits com $R$ em bit/s; $D$ em metros com $v$ em m/s. Transmissão põe o pacote no meio; propagação atravessa a distância.
- 1500 bytes, 10 Mbit/s, 100 km a $2\times10^8$ m/s: 1,2 ms mais 0,5 ms, sem fila nem processamento.
- Débito sustentado não passa o menor débito do percurso. Custo mínimo não é débito máximo.

## Janela e bits em voo

- Produto banda-atraso $Rt_p$ conta bits em propagação num sentido. Para janela de transporte usa-se $RRTT$.
- Janela $W$ bytes, RTT $T$: limite ideal $8W/T$ bit/s. $W=64000$ bytes e RTT 0,08 s dão 6,4 Mbit/s.

## Little e Poisson

- **Little**, mesma fronteira: $N=\lambda T$. Fila exclui serviço, sistema inclui. Com perdas, usa a taxa admitida.
- **Poisson** de taxa $\lambda$: $P(A(t)=k)=e^{-\lambda t}(\lambda t)^k/k!$. Taxa média não fixa intervalos; tempos entre chegadas são exponenciais de média $1/\lambda$.
- $\lambda=20$/s, intervalo 0,1 s: média 2, $P(0)=e^{-2}\approx0{,}135$.

## M/M/1 e M/D/1

Hipóteses M/M/1: Poisson, serviço exponencial, um servidor, fila ilimitada. $\rho=\lambda/\mu<1$.

| | M/M/1 | M/D/1 |
| --- | --- | --- |
| $T_q$ | $\rho/(\mu-\lambda)$ | $\rho/(2\mu(1-\rho))$ |
| $T$ | $1/(\mu-\lambda)$ | $T_q+1/\mu$ |
| $N$ | $\rho/(1-\rho)$ | — |
| $N_q$ | $\rho^2/(1-\rho)$ | — |

- $P(N=n)=(1-\rho)\rho^n$. Fila vazia: $P(N_q=0)=1-\rho^2$.
- Mesma carga não fixa o atraso: a variabilidade do serviço conta. M/G/1: $T_q=\lambda E[S^2]/(2(1-\rho))$.
