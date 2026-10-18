## Escolher o canal

| Mecanismo          | Transporta          | Condição                                                            |
| ------------------ | ------------------- | ------------------------------------------------------------------- |
| Pipe               | bytes, um sentido   | EOF exige buffer vazio e **todas** as escritas fechadas             |
| FIFO               | bytes com nome      | abertura bloqueante pode esperar pela outra ponta                   |
| Socket             | fluxo ou datagramas | fluxo exige fronteiras (linhas, tamanho); meio-fecho com `shutdown` |
| Sinal              | notificação         | tratador restrito; sinais padrão pendentes podem fundir-se          |
| Memória partilhada | mesmos bytes        | sincronização entre processos                                       |

- `pipe(fd)`: lê em `fd[0]`, escreve em `fd[1]`. Fecha as pontas não usadas em cada processo; cópia esquecida adia EOF.
- Fluxos não preservam mensagens: leitura curta não é EOF; usa ciclos. Escritas até `PIPE_BUF` não se entrelaçam, mas podem chegar partidas.
- Cria o canal **antes** de `fork`. Depois, cada `pipe` é um objeto distinto, mesmo com números iguais. O filho só lê EOF vazio se fechou a escrita do seu pipe e o buffer está esgotado; o pai só recebe `SIGPIPE`/`EPIPE` se fechou a leitura do outro pipe e tenta escrever sem leitores.
- Pipeline: `dup2(fd[1], STDOUT_FILENO)` no produtor, `dup2(fd[0], STDIN_FILENO)` no consumidor; o supervisor fecha ambas e recolhe depois. Não esperes pelo produtor antes de lançar o consumidor com dados grandes.
- Pedido/resposta em fluxo socket: `shutdown(fd, SHUT_WR)` termina o pedido sem fechar a leitura da resposta. `close` fecharia ambos os sentidos. Em pipes, o fim usa fecho da escrita, não `shutdown`.

## Sinais

- `SIGKILL` e `SIGSTOP` não se capturam. Usa nomes, não números.
- No tratador, só funções async-signal-safe: assinala com `volatile sig_atomic_t` e trabalha no fluxo normal. `printf` e `malloc` no tratador não são seguros.
- Sinais padrão repetidos enquanto pendentes podem fundir-se; não os uses como contador. Sinais de tempo real têm fila.
- Contra a janela teste/dormir: bloqueia com `sigprocmask`, instala com `sigaction`, testa sob bloqueio e dorme com `sigsuspend`.

## Memória partilhada

`mmap` falha com `MAP_FAILED`. `MAP_SHARED` partilha; `MAP_PRIVATE` isola com COW. `munmap` remove; fechar o descritor não remove. Pai que lê depois de `waitpid` está ordenado; filas vivas exigem sincronização de processos.

[Pipe completo](/cadeiras/so/comunicacao-processos/#pipe-leitura-e-escrita).
