---
title: Processos
description: Ciclo de vida do processo e as chamadas fork, exec, wait e exit num exemplo pai-filho.
section: conteudo
order: 3
---

Um processo nasce, corre, pode criar filhos e morre. O sistema operativo gere esse **ciclo de vida** com quatro chamadas de sistema que formam o vocabulário central da cadeira: `fork` para criar, `exec` para trocar de programa, `exit` para terminar e `wait` para recolher. Esta página mostra as quatro a trabalhar juntas.

## O ciclo de vida

Um processo está sempre num estado: **pronto** (quer correr e espera pelo processador), **a correr** (tem o processador agora), **bloqueado** (espera por algo, como leitura do disco ou um filho terminar) ou **terminado** (acabou e espera que o pai recolha o seu estado). O núcleo move os processos entre estes estados à medida que os eventos acontecem. Quando escreves `ls` na shell, ela cria um processo filho, o filho troca-se pelo programa `ls`, e a shell bloqueia à espera que ele termine.

## Criar com fork

O `fork` cria um processo filho como cópia do pai: mesmo código, mesmos dados, mesmos descritores abertos. A única diferença inicial é o valor devolvido: o pai recebe o PID do filho e o filho recebe 0. É assim que o programa distingue quem é quem depois da bifurcação:

```c
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Sou o filho, o meu pai e %d\n", getppid());
    } else {
        printf("Sou o pai, criei o filho %d\n", pid);
    }
    return 0;
}
```

Corre várias vezes e repara que a ordem das duas linhas varia: pai e filho correm em concorrência e o escalonador decide quem imprime primeiro. Essa variação não é um defeito do exemplo, é a realidade dos processos.

:::warning[O erro que toda a gente comete uma vez]
O filho herda cópias, não partilha variáveis com o pai. Se o filho fizer `x = 5`, o `x` do pai continua igual. processes separados têm memórias separadas. Quando precisares de partilhar dados, é preciso um mecanismo de [comunicação entre processos](comunicacao-processos/).
:::

## Trocar de programa com exec

Um filho que é uma cópia do pai serve para pouco até se trocar por outro programa com `exec`. A família `exec` substitui o código do processo atual pelo programa indicado, mantendo o PID e os descritores. O padrão é sempre o mesmo: `fork` cria, `exec` troca, e o terceiro argumento `NULL` fecha a lista:

```c
#include <unistd.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        execlp("ls", "ls", "-l", NULL);
    }
    return 0;
}
```

Se o `execlp` funcionar, o filho deixa de correr o teu código e passa a correr `ls`. Se falhar (programa inexistente, por exemplo), o filho continua no teu código a seguir à chamada, por isso trata sempre esse caso.

## Terminar e recolher: exit e wait

Um processo termina com `exit` (ou retornando do `main`) e deixa um **estado de saída**, o número que a shell guarda em `$?`. Mas terminar não chega: o pai tem de recolher esse estado com `wait`, que bloqueia o pai até um filho terminar e devolve o seu PID. Um filho terminado à espera de recolha chama-se **zombie**: já não corre nem ocupa memória de trabalho, mas ocupa a sua entrada na tabela de processos. Zombies acumulados são lixo do pai distraído, não do sistema.

Junta as quatro peças. O pai cria o filho, o filho troca-se por outro programa, o pai espera e lê o estado:

```c
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        execlp("ls", "ls", NULL);
    } else {
        int estado;
        wait(&estado);
        printf("O filho terminou\n");
    }
    return 0;
}
```

Sem o `wait`, o pai podia terminar primeiro e o filho ficava **órfão**, adotado pelo processo de arranque. Com o `wait`, a ordem é garantida: a mensagem do pai sai sempre depois da listagem.

## Para levar para a próxima página

Criar, trocar, terminar e recolher chegam para gerir um processo de cada vez. Mas há dezenas de processos prontos e um processador: quem corre a seguir decide-se no [escalonamento](escalonamento/).
