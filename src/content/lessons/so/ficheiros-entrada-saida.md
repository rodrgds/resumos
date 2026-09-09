---
title: Ficheiros e entrada/saída
description: Ficheiros, implementação, interrupções, drivers e o diretório /dev, com a API Unix em ação.
section: conteudo
order: 8
---

Os processos morrem e a RAM esquece, mas os dados ficam: é o sistema de ficheiros que lhes dá nomes e persistência, e são os drivers que falam com os dispositivos. Esta página mostra como os ficheiros se implementam por baixo e como a entrada e saída chega ao hardware, retomando o [polling, as interrupções e o DMA](/cadeiras/ac/entrada-saida/) do lado do sistema operativo.

## Ficheiros e a sua implementação

Um ficheiro é uma sequência de bytes com nome, tamanho e **metadados**: dono, permissões, instantes de acesso e modificação. Para o programa, o ficheiro é contínuo; no disco, está partido em blocos que podem andar espalhados. O sistema de ficheiros mantém a tradução entre as duas vistas com estruturas auxiliares: para cada ficheiro, um **inode** guarda os metadados e a lista de blocos, e os diretórios são tabelas que associam nomes a inodes. É por isso que renomear é instantâneo (muda uma entrada de tabela) e que apagar liberta blocos (marca-os como livres no mapa de espaço).

## A API Unix em ação

Criar, escrever e reler um ficheiro com chamadas de sistema mostra os metadados a mudar:

```c
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int fd = open("nota.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    write(fd, "primeira linha\n", 15);
    close(fd);
    fd = open("nota.txt", O_RDONLY);
    char buf[32];
    ssize_t n = read(fd, buf, sizeof(buf) - 1);
    buf[n] = '\0';
    printf("Li %zd bytes: %s", n, buf);
    close(fd);
    return 0;
}
```

Isto escreve `Li 15 bytes: primeira linha` e deixa o ficheiro com 15 bytes. Confirma com `ls -l nota.txt` (o tamanho) e `stat nota.txt` (os instantes de modificação e o número do inode). O `0644` são as permissões em octal: leitura e escrita para o dono, só leitura para os outros. Cada `open` devolve um descritor novo, por isso as duas fases são independentes: podias fechar o programa entre elas e o ficheiro continuava lá.

## Do pedido ao dispositivo

Entre o `write` e os bits no disco há uma cadeia. O núcleo resolve o caminho até ao inode, verifica permissões, traduz a posição em blocos e entrega o pedido ao **driver** (_device driver_), o módulo que sabe falar com aquele hardware concreto. O driver programa o controlador e espera pela conclusão, que chega por **interrupção**: o dispositivo avisa, o núcleo suspende o que corria, o driver recolhe o resultado e o processo bloqueado acorda. Para grandes transferências o driver usa **DMA**, e o processador só intervém no início e no fim. É a mesma divisão de trabalho do hardware, agora vista de cima: o processo pede, o núcleo gere, o driver traduz, o dispositivo executa.

## O diretório /dev

No UNIX, quase tudo é ficheiro, incluindo os dispositivos. O diretório `/dev` contém uma entrada por dispositivo: ler de uma entrada lê do dispositivo, escrever nela escreve nele. Experimenta sem medo, só a ler:

```sh
ls /dev | head
cat /dev/null
head -c 16 /dev/urandom | od -An -tx1
```

O `/dev/null` descarta tudo o que lá escreves e devolve fim imediato à leitura, o caixote do lixo universal dos scripts. O `/dev/urandom` debita bytes aleatórios, úteis para chaves e testes. O `/dev/sda` seria o disco: lê-lo despeja o disco inteiro, por isso estas entradas também mostram o outro lado da abstração, que um ficheiro de dispositivo dá poder total sobre o hardware e as permissões decidem quem o tem.

:::warning[Poder de root com sintaxe de ficheiro]
Redirecionar a saída para a entrada errada em `/dev` escreve mesmo no dispositivo. Nunca corras comandos com `>` para uma entrada de `/dev` que não conheças, e confirma sempre o nome antes de carregar em Enter. A abstração "tudo é ficheiro" não perdoa distrações.
:::
