## Serviço

| Método       | Trabalho do CPU                        |
| ------------ | -------------------------------------- |
| Polling      | Consulta e transfere quando necessário |
| Interrupções | Conserva estado, serve, retoma         |
| DMA          | Configura, trata a conclusão           |

Polling periódico com consulta de $C$ ciclos a cada $P$ ciclos custa $C/P$ do CPU. Em DMA não coerente, a saída exige clean das linhas dirty relevantes; a entrada invalida cópias antigas. Invalidar não substitui clean.

## Mensagens

Sem sobreposição, mensagem de $B$ bytes com custo fixo $t_{\rm fixo}$ de preparação e conclusão e taxa $R$:

$$t(B)=t_{\rm fixo}+B/R.$$

A rede de maior taxa pode perder em mensagens curtas; compara curvas por tamanho, não só taxas.

## Dimensionar DMA

$R$ taxa em bytes/s, $B$ bytes por bloco, $c$ ciclos de preparação e conclusão por transferência, $f$ frequência do CPU, $u$ fração do CPU:

$$u=\frac{Rc}{Bf},\qquad B\ge\frac{Rc}{u_{\max}f}.$$

$R$ é taxa agregada em unidades decimais. Blocos pequenos multiplicam transferências.

[Limiares e sincronização](/cadeiras/ac/entrada-saida/).
