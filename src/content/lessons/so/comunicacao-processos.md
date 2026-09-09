---
title: Comunicação entre processos
description: Sinais, pipes, FIFOs, sockets e memória partilhada, com um pipe pai-filho explicado.
section: conteudo
order: 5
---

O `fork` dá ao filho uma cópia da memória do pai, por isso as variáveis não atravessam a fronteira entre processos. Quando dois processos precisam de cooperar, usam um mecanismo de **comunicação entre processos** (_IPC_). Cada um tem um compromisso diferente entre simplicidade, volume e alcance.

## Sinais: interromper para avisar

Um **sinal** é uma notificação curta que um processo envia a outro: terminar (`SIGTERM`), interromper do teclado (`SIGINT`, o Ctrl+C), filho terminou (`SIGCHLD`). O processo destino pode ignorar, tratar com uma função própria ou sofrer a ação por defeito. Sinais transportam quase nenhuma informação (só o número do sinal), por isso servem para avisar, não para conversar. O `kill -TERM <pid>` da shell é o exemplo que já usaste sem saber o nome.

## Pipes: conversa entre parentes

Um **pipe** é um canal unidirecional com uma ponta de escrita e uma de leitura. Cria-se com `pipe`, que devolve dois descritores, e tipicamente usa-se entre pai e filho: o pai cria o pipe antes do `fork`, por isso ambos herdam as duas pontas, e depois cada um fecha a ponta que não usa.

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void) {
    int pontas[2];
    pipe(pontas);
    pid_t pid = fork();
    if (pid == 0) {
        close(pontas[0]);
        const char *msg = "ola pai";
        write(pontas[1], msg, strlen(msg));
        close(pontas[1]);
    } else {
        close(pontas[1]);
        char buf[32];
        ssize_t n = read(pontas[0], buf, sizeof(buf) - 1);
        buf[n] = '\0';
        printf("Pai leu: %s\n", buf);
        close(pontas[0]);
    }
    return 0;
}
```

Segue o protocolo com atenção. O filho fecha a ponta de leitura e escreve na de escrita; o pai fecha a de escrita e lê da de leitura. Fechar as pontas não usadas não é arrumação, é correção: o `read` só devolve fim de ficheiro quando **todas** as pontas de escrita estiverem fechadas, por isso um pai que se esqueça de fechar a sua cópia da escrita fica bloqueado para sempre à espera de dados que nunca chegam. A leitura também bloqueia até haver dados, o que aqui é exatamente o que queremos: o pai espera que o filho escreva.

## FIFOs, sockets e memória partilhada

- Um **FIFO** (_named pipe_) é um pipe com nome no sistema de ficheiros. Qualquer processo com permissões o abre pelo nome, por isso serve para processos sem parentesco. De resto comporta-se como o pipe: unidirecional e com bloqueio na leitura.
- Um **socket** é um canal bidirecional que tanto liga processos na mesma máquina como máquinas diferentes pela rede. É a base de quase toda a comunicação em rede, mas paga-se em complexidade: endereços, ligações e protocolos.
- A **memória partilhada** com `mmap` mapeia a mesma zona física no espaço dos dois processos, que passam a ler e escrever nela diretamente. É o mecanismo mais rápido para grandes volumes, porque não copia dados pelo núcleo. O preço é a sincronização: sem [mutexes e semáforos](programacao-concorrente/) para ordenar os acessos, os dois processos pisam-se e o resultado varia de execução para execução.

| Mecanismo        | Sentido      | Entre quem           | Quando usar                    |
| ---------------- | ------------ | -------------------- | ------------------------------ |
| Sinais           | aviso        | qualquer processo    | notificar eventos simples      |
| Pipes            | unidirecional | pai e filho         | conversa simples entre parentes |
| FIFOs            | unidirecional | qualquer processo   | pipe sem parentesco            |
| Sockets          | bidirecional  | qualquer processo   | rede ou protocolo completo     |
| Memória partilhada | direto      | qualquer processo   | grandes volumes, com sincronização |

## Para levar para a próxima página

Pipes e FIFOs copiam bytes pelo núcleo e impõem ordem; a memória partilhada é rápida mas deixa os acessos desordenados. Ordenar acessos concorrentes é o trabalho da [programação concorrente](programacao-concorrente/).
