## Tempos

HDD sem cache:

$$
T=T_{\text{posicionamento}}+T_{\text{rotação}}+T_{\text{transferência}}.
$$

A $r$ rpm, a volta demora $60/r$ s; espera média é metade. A 7200 rpm: 4,17 ms; 1 MiB a 100 MiB/s: 10 ms; com 5 ms de posicionamento, cerca de 19,17 ms.

- SSD não tem cabeça nem rotação; tem latência e limites próprios. TRIM não é apagamento garantido.
- Latência é duração; largura de banda é bytes por tempo.

## Mecanismos

| Mecanismo    | CPU                                                | Quando serve                    |
| ------------ | -------------------------------------------------- | ------------------------------- |
| Polling      | consulta estado em ciclo                           | esperas curtíssimas             |
| Interrupções | trata o evento anunciado                           | tarefa pode bloquear entretanto |
| DMA          | configura; hardware transfere; interrupção conclui | evita copiar byte a byte        |

DMA não elimina configuração nem erros; combina-se com interrupções. Interrupção não obriga a trocar de processo.

- **Controlador** é hardware; **driver** é software. Bloco é endereçável; carácter é fluxo. `/dev` identifica dispositivos; `ioctl` configura.
- Bloqueante suspende; não bloqueante devolve `EAGAIN` sem esperar; assíncrona separa submissão e conclusão. `select`/`poll` esperam disponibilidade; transferências parciais continuam possíveis.

## Cache e persistência

- **Buffer** adapta trânsito; **cache** evita repetir; **spool** enfileira para dispositivo único.
- `read` ok não prova disco; `write` ok não prova sobrevivência a falha. Persistência pede `fsync` (e diretório em operações de nomes).
- Compara com quantidade, padrão e estado da cache definidos; uma medição pode ser só cache quente.

[Caminho do pedido](/cadeiras/so/ficheiros-entrada-saida/#seguir-um-read).
