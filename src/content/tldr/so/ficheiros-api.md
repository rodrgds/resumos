## Fluxos e descritores

| Biblioteca C      | POSIX           | Retorno e unidade                                   |
| ----------------- | --------------- | --------------------------------------------------- |
| `fopen`           | `open`          | `FILE *`, falha `NULL`; descritor `int`, falha `-1` |
| `fread`, `fwrite` | `read`, `write` | Elementos completos; bytes com retorno `ssize_t`    |
| `fseek`, `ftell`  | `lseek`         | Posição do fluxo; posição da descrição aberta       |
| `fclose`          | `close`         | Fechar fluxo trata buffers da biblioteca            |

O descritor 0 é válido. `fread` com elementos de tamanho 1 conta bytes; uma leitura curta exige distinguir EOF e erro com `feof` e `ferror`. Não alternes operações C e POSIX na mesma abertura sem coordenar buffers e posição.

## Transferências e posição

Para `read` com quantidade positiva, retorno positivo é a quantidade lida, 0 é EOF e `-1` é erro. Testa o valor **com sinal** antes de converter para `size_t`.

1. Lê para um buffer e interpreta o retorno; repete a chamada interrompida com `EINTR`.
2. Para escrever $n$ bytes, mantém uma contagem `feito`.
3. Chama `write(fd, buf+feito, n-feito)` e soma só os bytes aceites.
4. Repete até completar ou ocorrer erro; zero sem progresso também exige tratamento.

Se oito bytes dão retorno 3, a tentativa seguinte começa em `buf+3` e pede 5. Reenviar os oito duplicaria o prefixo. Não é preciso `\0` para transferir quantidades de bytes.

- Para criar ou substituir, `O_WRONLY | O_CREAT | O_TRUNC` requer modo, como `0666`, alterado pela `umask`. **Confirma que origem e destino não são o mesmo ficheiro antes de truncar**, incluindo hard links.
- Cada `open` independente tem a sua posição. `dup` e descritores herdados por `fork` partilham a descrição aberta e a posição.
- `lseek(fd, 0, SEEK_SET)` volta ao início de um ficheiro reposicionável e falha com `(off_t)-1`. Pipes não permitem essa operação.

## Linhas e pesquisa

`getline` é POSIX. Recebe um buffer que pode reservar ou aumentar; o retorno inclui newline, se existir, e exclui o terminador zero. Liberta o buffer no fim e distingue retorno `-1` por EOF de erro.

- Para últimas $k$ linhas num ficheiro regular, conta $L$, volta ao início e imprime índices desde $\max(0,L-k)$, contando de zero.
- Num pipe, usa uma fila circular das últimas $k$ linhas e comprimentos, porque não podes voltar atrás.
- Conserva uma última linha sem newline. Bytes zero podem existir nos dados; funções de strings parariam cedo.
- `getopt` processa opções e deixa `optind` no primeiro argumento restante. Define se contas bytes, caracteres ou palavras.
- Em `strstr`, sobreposição pede avançar um byte após o início encontrado; sem sobreposição, avança o comprimento do padrão. Define ou rejeita padrão vazio.

## Metadados e diretórios

- Só usa a `struct stat` depois de sucesso. `st_size` é tamanho lógico em bytes; `st_blocks` usa unidades de 512 bytes nas interfaces UNIX usuais e pode diferir por ficheiros esparsos.
- `stat` segue links simbólicos; `lstat` consulta o link; `fstat` consulta uma abertura. Usa `S_ISREG` e `S_ISDIR` para o tipo.
- `opendir`, `readdir`, `closedir` gerem a travessia. `d_name` é só o nome: consulta com caminho completo ou `fstatat(dirfd(dir), nome, &info, 0)`.
- Põe `errno=0` imediatamente antes de **cada** `readdir`. Ao receber `NULL`, distingue fim de erro.
- Numa recursão, trata `.` e `..` e define se segues links para evitar ciclos.

## Medir tempo

`time_t` representa tempo civil; `localtime` usa ano relativo a 1900 e mês entre 0 e 11. Para duração, usa `CLOCK_MONOTONIC`, que evita correções do relógio civil. A diferença entre duas `timespec` é $(s_2-s_1)+(n_2-n_1)/10^9$ segundos.

Tempo de CPU mede execução; tempo decorrido inclui espera. Um processo bloqueado pode ter grande duração e quase nenhum tempo de CPU.

[Cópia com tratamento de escritas parciais](/cadeiras/so/ficheiros-api/#ler-e-escrever-todos-os-bytes).
