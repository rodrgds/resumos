## Canais e protocolos

O canal transporta dados; o **protocolo** define fronteiras, ordem e fim da troca.

| Mecanismo          | Uso e condição                                                                |
| ------------------ | ----------------------------------------------------------------------------- |
| Pipe               | Fluxo de bytes num sentido; EOF exige fechar todas as escritas                |
| FIFO               | Fluxo com nome; a abertura bloqueante pode esperar pela outra ponta           |
| Socket             | Fluxo ou datagramas; num fluxo, define fronteiras das mensagens               |
| Sinal              | Notificação, com tratador restrito; não transporta uma estrutura C arbitrária |
| Memória partilhada | Acesso aos mesmos bytes; exige sincronização e gestão do tempo de vida        |

## Pipes e redirecionamento

`pipe(fd)` cria `fd[0]` para leitura e `fd[1]` para escrita. Após `fork`, cada processo herdou ambas as pontas: fecha todas as cópias que não usa.

- Buffer vazio com alguma escrita aberta faz uma leitura bloqueante esperar.
- Buffer vazio com **todas as escritas fechadas** faz `read` devolver 0, EOF.
- Sem leitores, escrever pode gerar `SIGPIPE`; se o sinal não terminar o processo, a escrita falha com `EPIPE`.
- Uma leitura curta não prova EOF. Fluxos exigem ciclos para leituras e escritas parciais.
- Escritas até `PIPE_BUF` não se entrelaçam com outras escritas no pipe, mas uma leitura pode entregar apenas parte ou juntar dados de escritas distintas.

Numa pipeline, `dup2(origem, destino)` faz o destino referir a mesma descrição aberta. Antes de `exec`, liga a escrita do produtor a stdout e a leitura do consumidor a stdin. Os excertos seguintes assumem descritores distintos dos canais padrão e sucesso:

```c
/* produtor */
dup2(fd[1], STDOUT_FILENO);
/* consumidor */
dup2(fd[0], STDIN_FILENO);
```

Cada filho fecha as pontas desnecessárias. O supervisor fecha ambas e só depois recolhe os filhos. Conservar uma escrita impede EOF; esperar pelo produtor antes de lançar o consumidor pode bloquear quando o buffer enche.

## FIFOs e sockets

- `mkfifo` cria um nome, não um ficheiro regular onde os bytes persistem. Em modo bloqueante, abertura para leitura espera por escritor e abertura para escrita espera por leitor.
- `socketpair(AF_UNIX, SOCK_STREAM, 0, fd)` dá duas pontas bidirecionais locais. Um fluxo pode delimitar mensagens por linhas, comprimento prefixado ou tamanho fixo.
- Se o servidor responde só depois de EOF, o cliente acaba o pedido com **`shutdown(fd, SHUT_WR)`**. Conserva a leitura para receber a resposta; `close` fecharia ambos os sentidos.
- Dois envios grandes sem leituras podem encher os buffers e bloquear ambos. Define uma ordem ou trata os dois sentidos em simultâneo.

## Sinais e espera atómica

Usa nomes simbólicos de sinais. `SIGKILL` e `SIGSTOP` não podem ser capturados nem ignorados. Num tratador, evita `printf` e `malloc`; uma flag `volatile sig_atomic_t` permite assinalar trabalho para o fluxo normal, mas não torna estruturas arbitrárias seguras.

Para evitar a janela entre testar a flag e dormir:

1. Bloqueia o sinal com `sigprocmask` e instala o tratador com `sigaction`.
2. Testa a flag enquanto o sinal está bloqueado.
3. Usa `sigsuspend` com máscara que o desbloqueie, mudando máscara e entrando em espera atomicamente.
4. Repete o teste e restaura a máscara anterior no fim.

Em `while (!recebido) pause()`, o sinal pode chegar depois do teste e antes de dormir. Sinais tradicionais pendentes também podem fundir-se; não são um contador fiável.

## Memória partilhada

`mmap` falha com `MAP_FAILED`. `MAP_SHARED` permite partilhar alterações; `MAP_PRIVATE` dá alterações privadas com copy-on-write. `munmap` remove o mapeamento; fechar o descritor não o remove automaticamente.

Se o pai só lê depois de `waitpid` pelo filho que escreveu e terminou, essa leitura fica ordenada. Atualizações simultâneas de uma fila exigem sincronização adequada entre processos; `volatile` ou `MAP_SHARED` não bastam.

[Programa de pipe com fechos e transferências completas](/cadeiras/so/comunicacao-processos/#pipe-leitura-e-escrita).
