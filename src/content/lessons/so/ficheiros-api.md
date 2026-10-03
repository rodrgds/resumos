---
title: Programar ficheiros e diretórios
description: Biblioteca C, descritores POSIX, transferências parciais, linhas, metadados e caminhos.
section: conteudo
order: 4
practices:
  - so/praticar-ficheiros-api
---

Já viste programas em C e a shell. Agora queres copiar bytes de um ficheiro sem duplicar nem perder dados quando o núcleo escreve menos do que pediste. Como lê e escreve um programa esses bytes?

Queremos copiar os bytes de um ficheiro para a saída padrão, o fluxo de bytes que o programa escreve no descritor 1. O terminal é o destino habitual, mas pode ser um ficheiro ou um pipe. Há duas interfaces principais: a biblioteca C, com funções como `fopen` e `fread`, que representa um ficheiro aberto com um `FILE *` e pode juntar dados num buffer, uma zona temporária de memória, e a API POSIX, o conjunto normalizado de interfaces que inclui funções de biblioteca e chamadas de sistema. As funções `open`, `read` e `write` pedem serviços ao núcleo e representam um ficheiro aberto com um número inteiro chamado **descritor**. Conhecer ambas evita misturar tipos e permite escolher o nível de controlo necessário.

## FILE e descritor

| Biblioteca C      | API POSIX       | Diferença                                   |
| ----------------- | --------------- | ------------------------------------------- |
| `fopen`           | `open`          | Devolve `FILE *` ou `int`                   |
| `fread`, `fwrite` | `read`, `write` | Elementos na biblioteca, bytes na API       |
| `fseek`, `ftell`  | `lseek`         | Posição do fluxo ou da descrição aberta     |
| `fclose`          | `close`         | `fclose` também trata buffers da biblioteca |

`fopen` falha com `NULL`; `open` falha com `-1`. O descritor 0 é válido. Não uses `if (!fd)` para testar um erro de abertura.

`fread(buf, tamanho, quantidade, fp)` devolve o número de elementos completos lidos. Com `tamanho == 1`, esse valor também conta bytes. Uma leitura curta pode significar fim de ficheiro ou erro; consulta `feof` e `ferror`. `read` devolve `ssize_t`: positivo é a quantidade de bytes, zero indica EOF e `-1` indica erro. Guarda o resultado num tipo com sinal antes de o interpretar. Num pedido de zero bytes, `read` pode devolver zero sem testar EOF; os ciclos desta página pedem sempre uma quantidade positiva.

A biblioteca pode antecipar leituras e acumular escritas num buffer, por isso evita alternar `fread` e `read` sobre a mesma abertura sem compreenderes a sincronização: a posição no núcleo pode já estar adiante dos bytes que a biblioteca entregou à aplicação.

## Ler e escrever todos os bytes

Uma chamada a `write(fd, buf, n)` não garante que escreve `n` bytes, porque o núcleo pode aceitar só uma parte ou a chamada pode falhar com `EINTR`. Traça um pedido de 8 bytes em que a primeira tentativa devolve 3: faltam 5, por isso a próxima tentativa usa o endereço `buf + 3` com quantidade 5. Repetir os 8 duplicaria os 3 já entregues. O programa seguinte copia a entrada padrão para a saída padrão e conserva a parte ainda não escrita.

Guarda-o como `copiar.c` e compila num terminal UNIX com `cc -std=c17 -Wall -Wextra -Wpedantic copiar.c -o copiar`.

```c
#include <errno.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    char buf[4096];
    for (;;) {
        ssize_t n = read(STDIN_FILENO, buf, sizeof buf);
        if (n < 0) {
            if (errno == EINTR) continue;
            perror("read");
            return 1;
        }
        if (n == 0) return 0;
        ssize_t enviados = 0;
        while (enviados < n) {
            ssize_t k = write(STDOUT_FILENO, buf + enviados,
                              (size_t)(n - enviados));
            if (k < 0 && errno == EINTR) continue;
            if (k <= 0) {
                if (k < 0) perror("write");
                else fputs("write nao progrediu\n", stderr);
                return 1;
            }
            enviados += k;
        }
    }
}
```

```sh
printf 'abc\nxyz\n' | ./copiar > copia.txt
cat copia.txt
```

A saída são as duas linhas originais. Não acrescentámos `\0` ao buffer, porque trabalhamos com a quantidade lida, não com uma string. Um ficheiro vazio termina na primeira leitura com zero.

Uma versão que recebe um nome precisa de validar `argc`, abrir com `O_RDONLY`, usar o descritor nas leituras e fechar os descritores que abriu. Para criar um destino novo ou substituir o conteúdo antigo, usa `O_WRONLY | O_CREAT | O_TRUNC` e fornece o argumento de permissões, por exemplo `0666`, modificado pela `umask`. Não abras o destino com truncamento antes de verificar que ele não é o próprio ficheiro de origem, inclusive através de outro hard link.

## Posição e reabertura

Numa abertura de ficheiro regular, a posição começa normalmente em zero. Cada leitura avança-a pela quantidade devolvida. `lseek(fd, 0, SEEK_SET)` volta ao início e falha com `(off_t)-1`.

Duas chamadas independentes a `open` sobre o mesmo ficheiro podem coexistir e têm posições independentes. Já `dup` e os descritores herdados por `fork` referem a mesma **descrição de ficheiro aberto** e partilham a posição. Fecha o que deixas de usar para evitar perder descritores, não porque seja proibido abrir o nome novamente.

Na biblioteca, `rewind(fp)` volta ao início e limpa indicadores de erro e EOF. `fseek` permite reposicionamento com retorno que deves verificar. Pipes e terminais não se comportam como ficheiros regulares reposicionáveis.

## Linhas com getline

`getline` é POSIX, não C17. Precisa de `_POSIX_C_SOURCE 200809L` antes dos includes quando o ambiente exige macros de funcionalidades. Recebe um buffer que pode reservar ou aumentar.

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>

int main(void) {
    char *linha = NULL;
    size_t capacidade = 0, numero = 0;
    ssize_t n;
    while ((n = getline(&linha, &capacidade, stdin)) != -1) {
        if (printf("%zu: ", ++numero) < 0 ||
            fwrite(linha, 1, (size_t)n, stdout) != (size_t)n) {
            free(linha);
            return 1;
        }
    }
    int erro = ferror(stdin) || !feof(stdin);
    if (fflush(stdout) == EOF) erro = 1;
    free(linha);
    return erro ? 1 : 0;
}
```

O comprimento inclui o `\n` se existir e exclui o terminador `\0`. O programa conserva uma última linha sem mudança de linha. `getline` também pode ler bytes zero; funções de strings parariam cedo nesse caso. Liberta o buffer mesmo quando a leitura termina em EOF. O retorno `-1` de `getline` também pode ser erro, incluindo falha de reserva: só consideramos o fim normal se `feof` estiver ativo e não houver erro de leitura. `fflush` verifica ainda a entrega da saída que ficou em buffer.

Para imprimir as últimas $k$ linhas de um ficheiro regular, uma solução simples faz duas passagens: conta $L$ linhas, reposiciona e imprime as linhas com índice pelo menos $\max(0,L-k)$, contando desde zero. Para stdin que pode ser um pipe, usa uma fila circular das últimas $k$ linhas, porque não podes contar e voltar atrás. O teste de leitura é o ciclo exterior; não coloques um ciclo que lê todo o ficheiro dentro de outro que supostamente lê só $k$ linhas.

## Strings, opções e pesquisa

`getopt` permite processar opções como `-l` e `-c` e deixa `optind` no primeiro argumento que não é opção. Define no enunciado se `-c` conta bytes ou caracteres e o que é uma palavra. Contar palavras por transições de espaço para não espaço trata espaços repetidos sem inventar palavras vazias.

Para procurar uma substring numa linha, `strstr` encontra a próxima ocorrência. Se permites sobreposição, avança um byte depois do início encontrado; se não permites, avança o comprimento da substring. Rejeita a substring vazia ou define o seu significado antes do ciclo.

## Metadados e diretórios

`stat(caminho, &info)` preenche a estrutura apenas quando tem sucesso. `st_size` mede o tamanho lógico em bytes. `st_blocks` mede blocos de 512 bytes nas interfaces UNIX usuais e pode diferir do tamanho por causa de ficheiros esparsos. Usa `S_ISREG(info.st_mode)` e `S_ISDIR(info.st_mode)`, não testes improvisados aos bits do tipo.

`stat` segue um link simbólico; `lstat` consulta o próprio link. Para um descritor já aberto, `fstat` evita voltar a resolver o nome.

`opendir` devolve `DIR *`; `readdir` devolve uma entrada ou `NULL`; `closedir` fecha. `d_name` é apenas o nome da entrada, não o caminho completo. Se abriste `pasta` estando fora dela, `stat(entrada->d_name, ...)` procuraria no diretório de trabalho errado.

Podes juntar o diretório e o nome, verificando comprimentos, ou usar `fstatat(dirfd(dir), entrada->d_name, &info, 0)`. Esta segunda opção resolve o nome relativamente ao diretório aberto. Trata `.` e `..` antes de uma travessia recursiva e define se segues links simbólicos, para não criar ciclos. Imediatamente antes de cada chamada a `readdir`, pôr `errno = 0` permite distinguir um fim normal de um erro quando retorna `NULL`.

O programa seguinte lista uma pasta com `fstatat`, sem mudar o diretório de trabalho. Guarda-o em `listar.c` e compila num terminal UNIX com `cc -std=c17 -Wall -Wextra -Wpedantic listar.c -o listar`.

```c
#define _POSIX_C_SOURCE 200809L
#include <dirent.h>
#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "uso: %s pasta\n", argv[0]);
        return 1;
    }
    DIR *d = opendir(argv[1]);
    if (d == NULL) {
        perror("opendir");
        return 1;
    }
    int dfd = dirfd(d);
    errno = 0;
    struct dirent *e;
    while ((e = readdir(d)) != NULL) {
        if (strcmp(e->d_name, ".") == 0 || strcmp(e->d_name, "..") == 0) {
            errno = 0;
            continue;
        }
        struct stat info;
        if (fstatat(dfd, e->d_name, &info, 0) < 0) {
            perror("fstatat");
            continue;
        }
        printf("%s: %lld bytes%s\n", e->d_name, (long long)info.st_size,
               S_ISDIR(info.st_mode) ? " [dir]" : "");
        errno = 0;
    }
    int erro = errno;
    closedir(d);
    if (erro != 0) {
        errno = erro;
        perror("readdir");
        return 1;
    }
    return 0;
}
```

Execução observada numa pasta com `a.txt` de 4 bytes, um link simbólico para `a.txt` e uma subpasta (a ordem de `readdir` varia; aqui ordenada para leitura):

```sh
printf 'ola\n' > demo/a.txt
ln -sf a.txt demo/lig.txt
mkdir -p demo/sub
./listar demo | sort
```

```text
a.txt: 4 bytes
lig.txt: 4 bytes
sub: 64 bytes [dir]
```

O `fstatat` sem flags segue o link e mede o destino. O tamanho em bytes de um diretório depende do sistema de ficheiros; o marcador `[dir]` vem de `S_ISDIR`. Os campos de `info` só são lidos após sucesso.

## Datas e medição

Um `time_t` representa tempo de calendário; em POSIX conta segundos desde 1970-01-01 00:00:00 UTC. `localtime` converte para campos locais, com `tm_year` relativo a 1900 e `tm_mon` entre 0 e 11. `strftime` formata esses campos. O tamanho concreto de `time_t` depende do sistema.

Para duração decorrida, prefere `clock_gettime(CLOCK_MONOTONIC, ...)`: o relógio civil pode ser corrigido. Uma diferença de `timespec` em segundos é $(s_2-s_1)+(n_2-n_1)/10^9$. Tempo de CPU mede trabalho executado pelo processo; tempo decorrido também inclui esperas. Um programa bloqueado pode demorar um segundo e consumir quase nenhum tempo de CPU.
