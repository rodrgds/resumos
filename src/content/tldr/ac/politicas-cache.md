## Escrita e alocação

| Política       | Acerto de escrita               | Falta de escrita                                         |
| -------------- | ------------------------------- | -------------------------------------------------------- |
| WT/no-allocate | Atualiza cache e nível seguinte | Escreve no nível seguinte, sem instalar                  |
| WB/allocate    | Atualiza cache e marca dirty    | Descarrega vítima válida dirty; instala e altera a linha |

- Write-through/write-back e allocate/no-allocate são decisões distintas, embora as combinações da tabela sejam frequentes.
- Dirty significa modificado, **não inválido**. Uma falta de leitura WB descarrega a vítima válida dirty, carrega o pedido e deixa-o limpo.
- Escrita parcial normalmente exige ler a nova linha para preservar os restantes bytes. Escrita que cobre **toda a linha** dispensa essa leitura no modelo da lição.
- Reconstrói o endereço da vítima com a **etiqueta antiga**, índice da entrada e deslocamento zero.
- Sem agentes externos, linha WB válida limpa coincide com memória. Linha dirty informa o que o CPU lê, mas não revela o valor antigo da RAM nem prova que seja diferente.
- Buffer WT pode sobrepor escritas. Cobra esperas segundo capacidade e bloqueios dados, sem acrescentar sempre toda a latência.

## Tempo médio e CPI

Modelo sem sobreposição de faltas, com penalidades **adicionais** que não estão já no custo base:

$$TMAM=t_{\rm acerto}+mp.$$

$m$ é a taxa de falta por acesso e $p$ a penalidade. Para inverter: $m=(TMAM-t_{\rm acerto})/p$.

Caches I/D separadas, uma obtenção por instrução e fração $r$ de instruções com um acesso a dados:

$$CPI=CPI_{\rm base}+m_Ip_I+r\,m_Dp_D.$$

- A taxa D tem denominador **acessos a dados**, por isso precisa de $r$. Para vários acessos por instrução, usa a contagem real.
- Base 1,2, faltas I 1%, D 4%, $r=0{,}30$ e penalidades 80 ciclos dão $CPI=2{,}96$.
- Cache unificada tem $1+r$ acessos por instrução neste modelo: espera $(1+r)mp$. Vítimas dirty podem acrescentar custo ponderado pela sua frequência.

## Dois níveis

$$
m_{2,g}=m_1m_{2,l},\qquad
TMAM=t_1+m_1(t_2+m_{2,l}p_{\rm RAM}).
$$

- Taxa **local** de L2 divide faltas L2 pelos pedidos que chegam a L2. Taxa **global** divide pelos pedidos originais.
- Em 100 pedidos, 10 chegam a L2 e 2 à RAM: local 20%, global 2%.
- Com $t_1=1$, $m_1=0{,}10$, $t_2=8$, $m_{2,l}=0{,}20$ e RAM 80 ciclos adicionais: $TMAM=3{,}4$ ciclos.
- Converte ns em ciclos pela frequência antes de calcular CPI. Não contes duas vezes a procura inicial nem a mesma penalidade.

[Traço de escritas e níveis de cache](/cadeiras/ac/politicas-cache/).
