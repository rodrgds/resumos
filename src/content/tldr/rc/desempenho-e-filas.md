## Atraso e débito

$$d=d_{proc}+d_{fila}+L/R+D/v.$$

$L$ são bits, $R$ bit/s, $D$ metros e $v$ m/s. Transmissão $L/R$ coloca o pacote no meio; propagação $D/v$ leva o sinal até ao destino. Para 1500 bytes, 10 Mbit/s, 100 km e $v=2\times10^8$ m/s, dão 1,2 e 0,5 ms. Sem fila nem processamento, o último bit chega em 1,7 ms.

- Num pacote store-and-forward, soma transmissão e propagação de cada ligação. Muitos pacotes podem sobrepor trabalho entre ligações.
- Sem outras limitações, o débito sustentado não ultrapassa o menor débito do percurso.
- $Rt_p$ conta bits em propagação num sentido. Para uma janela de transporte, usa frequentemente $R\,RTT$.
- Uma janela $W$ em bytes limita idealmente o débito a $8W/RTT$ bit/s. A 100 Mbit/s e RTT de 40 ms, ocupar o percurso exige cerca de 500000 bytes.

## Lei de Little e Poisson

**Little:** num sistema estável, $N=\lambda T$, com taxa efetiva de entradas $\lambda$, tempo médio $T$ e número médio $N$. Usa a mesma fronteira: sistema inclui serviço, fila exclui-o. Não exige Poisson; com perdas, usa entradas admitidas.

**Poisson:** taxa $\lambda$ não impõe intervalos fixos. A contagem em $t$ segundos é:

$$P(A(t)=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}.$$

Intervalos disjuntos têm contagens independentes; o tempo entre chegadas é exponencial de média $1/\lambda$. Com $\lambda=20$/s e $t=0,1$ s, zero chegadas tem probabilidade $e^{-2}\approx0,1353$.

## Modelos com um servidor

M/M/1 assume chegadas Poisson e tempos de serviço exponenciais independentes das chegadas, de taxa $\mu$, com capacidade ilimitada. M/D/1 troca o serviço por duração constante, com FIFO sem preempção. Em ambos, serviço médio $1/\mu$ e carga $\rho=\lambda/\mu<1$.

| Média                 | M/M/1                |
| --------------------- | -------------------- |
| Tempo no sistema $T$  | $1/(\mu-\lambda)$    |
| Tempo em fila $T_q$   | $\rho/(\mu-\lambda)$ |
| Número no sistema $N$ | $\rho/(1-\rho)$      |
| Número em fila $N_q$  | $\rho^2/(1-\rho)$    |

Em M/M/1, $p_n=(1-\rho)\rho^n$; o servidor está ocupado uma fração $\rho$ do tempo. Em M/D/1:

$$T_q=\frac{\rho}{2\mu(1-\rho)},\qquad T=T_q+1/\mu.$$

Com $\mu=125$ e $\lambda=100$ pacotes/s, carga 0,8: M/M/1 dá 32 ms de fila e 40 ms no sistema; M/D/1 dá 16 e 24 ms. A variabilidade do serviço altera a espera.

Escalar ambas as taxas pelo mesmo fator mantém carga e números médios, mas divide os tempos pelo fator. Aproximar $\lambda$ de $\mu$ faz divergir as médias dos modelos ilimitados.

Duas fontes Poisson independentes de 40 pacotes/s, com pacotes exponenciais de média 1000 bytes, numa ligação comum de 1 Mbit/s dão $T=22,22$ ms. Reservar 0,5 Mbit/s a cada fonte dá 44,44 ms por fila, à mesma carga 0,64: a capacidade reservada fica indisponível para a outra fonte.

[Hipóteses e dedução das médias](/cadeiras/rc/desempenho-e-filas/#mm1-hipóteses-e-fórmulas).
