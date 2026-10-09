## Controlador e serviço

- Registos de comando iniciam ações; estado indica pronto/ocupado/erro; dados transportam informação.
- Memory-mapped I/O usa endereços de memória; I/O isolado usa portas/instruções próprias. Leituras podem ter efeitos. Ordenação, permissões e cacheabilidade seguem a plataforma.

| Método       | Trabalho do CPU                                               |
| ------------ | ------------------------------------------------------------- |
| Polling      | Consulta estado e transfere quando necessário                 |
| Interrupções | Conserva estado, serve a notificação e retoma a tarefa        |
| DMA          | Configura transferência dispositivo/memória e trata conclusão |

Polling em espera ativa e consultas periódicas têm custos diferentes. Prioridades, máscaras e aninhamento determinam o serviço de interrupções.

## Polling e interrupções

- Consulta de C ciclos a cada P ciclos ocupa fração $C/P$ do CPU, mesmo sem dados.
- Chegada R bytes/s, bloco B bytes: $q=R/B$ blocos/s. Com um bloco de armazenamento, intervalo máximo ideal $B/R$; serviço, atrasos e jitter exigem margem.
- 16000 bits/s e bloco 400 bits dão 40 blocos/s e 25 ms. A 300 ciclos/consulta e CPU 2 GHz, consultas ocupam $40\times300/(2\times10^9)=0{,}000006$, ou **0,0006%**. Acrescenta transferência se ainda não contada.
- Polling $q_pc_p$ ciclos/s e interrupções $u q_{\max}c_i$ igualam custos em:

$$u=\frac{q_pc_p}{q_{\max}c_i}.$$

Com frequências iguais, consulta 400 ciclos e interrupção 600, igualdade em $u=2/3$. Custo menor não garante latência ou capacidade suficiente.

## Custo de DMA

Para taxa agregada R bytes/s, B bytes/bloco, c ciclos de preparação/conclusão e frequência f:

$$u_{\rm CPU}=\frac{Rc}{Bf},\qquad B\ge\frac{Rc}{u_{\max}f}.$$

Dois discos de 100 MB/s, c=2000, f=2 GHz e limite 1% exigem B≥20000 bytes, com unidades decimais. Blocos menores aumentam transferências/s. DMA reduz trabalho por palavra, mas disputa memória/interligador e paga preparação.

## Cache e posse de buffers

- DMA de **saída** deve ler dados recentes: descarrega linhas WB dirty e aplica ordenação antes de arrancar. Invalidar não substitui clean.
- DMA de **entrada** não pode ser sobrescrito depois por uma linha dirty antiga. Invalida cópias antigas no momento definido pela plataforma e respeita o protocolo de posse.
- Hardware coerente pode realizar parte do trabalho. Não alteres buffers enquanto o dispositivo os usa fora do contrato.

[Dimensionamento e sincronização de DMA](/cadeiras/ac/entrada-saida/).
