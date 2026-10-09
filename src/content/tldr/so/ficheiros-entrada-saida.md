## Armazenamento e latência

Uma partição delimita uma região do dispositivo; um volume é uma unidade lógica que pode combinar recursos. **Montar** associa um sistema de ficheiros à árvore de nomes, sem copiar todo o conteúdo para RAM. Swap guarda certas páginas retiradas da RAM.

Num HDD, sem cache nem custos de fila:

$$
T=T_{\text{posicionamento}}+T_{\text{rotação}}+T_{\text{transferência}},
\qquad T_{\text{transferência}}=\frac{\text{bytes}}{\text{bytes por segundo}}.
$$

A $r$ rpm, uma volta demora $60/r$ segundos. Com posição angular uniforme, a espera média é metade. A 7200 rpm, são 4,17 ms de espera média; ler 1 MiB a 100 MiB/s custa 10 ms de transferência. Com posicionamento de 5 ms, o total é cerca de 19,17 ms.

- SSDs não têm posicionamento de cabeça nem rotação, mas têm latência e limites de transferência.
- TRIM comunica blocos lógicos dispensáveis; não garante apagamento seguro imediato.
- Latência mede duração de uma operação; largura de banda mede bytes por tempo.

## Driver, controlador e transferência

O **controlador** é hardware; o **driver** é software que conhece o seu protocolo. Registos de dispositivo mapeados em memória são memory-mapped I/O de hardware, distinto de mapear ficheiros com `mmap`.

| Mecanismo    | Papel da CPU e hardware                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Polling      | Software consulta estado repetidamente; espera longa consome CPU                                         |
| Interrupções | Hardware anuncia evento; o núcleo trata resultado e pode acordar a tarefa                                |
| DMA          | CPU configura endereços, direção e tamanho; hardware transfere dados; a conclusão pode gerar interrupção |

DMA evita a CPU copiar cada byte, mas não elimina configuração ou tratamento de erros. DMA e interrupções podem funcionar juntos. Uma interrupção não obriga a trocar de processo.

Dispositivos de bloco permitem unidades endereçáveis; dispositivos de carácter apresentam fluxos. Entradas especiais em `/dev` identificam dispositivos. `ioctl` permite operações específicas; a interface comum não torna `lseek` válido em todos os canais.

## Espera e conclusão

- I/O **bloqueante** pode suspender a tarefa até obter o resultado.
- I/O **não bloqueante** retorna sem esperar por disponibilidade futura, podendo dar `EAGAIN` ou `EWOULDBLOCK`. Não confundas com EOF; repetir num ciclo apertado recria espera ativa.
- I/O **assíncrona** separa submissão e conclusão, com indicação posterior do resultado.
- `select` e `poll` esperam disponibilidade em vários canais; ainda é preciso tratar transferências parciais e o protocolo. `readv` e `writev` usam vários buffers, sem garantia universal de atomicidade.

Estas semânticas exigem um canal que as suporte. `O_NONBLOCK` não significa que um ficheiro regular retorna `EAGAIN` apenas por faltar conteúdo na cache.

## Cache e caminho de um read

**Buffer** adapta dados em trânsito; **cache** evita repetir trabalho futuro; **spool** guarda trabalhos para um dispositivo os servir em sequência.

| Dados em cache                             | Dados ainda no dispositivo                                     |
| ------------------------------------------ | -------------------------------------------------------------- |
| Validar descritor, posição e acesso        | Validar descritor, posição e acesso                            |
| Obter bytes em memória                     | Submeter pedido pelo driver e controlador                      |
| Copiar bytes, atualizar posição e retornar | Bloquear se necessário; tratar conclusão; tornar tarefa pronta |
|                                            | Quando recebe CPU, entregar bytes e retornar                   |

- Falta na cache de ficheiros não é necessariamente falta de página virtual.
- `read` bem-sucedido não prova I/O físico. `write` bem-sucedido não prova persistência perante falha de energia; são necessárias garantias como `fsync`.
- Compara desempenho com quantidade, padrão de acesso e estado da cache definidos. Tempo de CPU ignora esperas; uma execução pode só medir cache quente.

[Percursos do pedido bloqueante](/cadeiras/so/ficheiros-entrada-saida/#seguir-um-read).
