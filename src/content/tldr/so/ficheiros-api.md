## Interfaces

| Biblioteca C      | POSIX           | Falha                                  |
| ----------------- | --------------- | -------------------------------------- |
| `fopen`           | `open`          | `NULL` / `-1`                          |
| `fread`, `fwrite` | `read`, `write` | elementos / bytes (`ssize_t`)          |
| `fseek`, `ftell`  | `lseek`         | posição do fluxo / da descrição aberta |
| `fclose`          | `close`         | `fclose` descarrega buffers            |

- Descritor 0 é válido: testa `fd == -1`, não `!fd`.
- Leitura curta: distingue EOF de erro com `feof`/`ferror`. Não mistures C e POSIX na mesma abertura sem coordenar buffer e posição.

## Transferências completas

`write` pode entregar menos bytes. Para $n$ bytes, repete `write(fd, buf+feito, n-feito)` e soma só o aceite; trata `EINTR` e progresso nulo. Se 8 bytes dão 3, continua em `buf+3` com 5.

- Destino de cópia: abre **sem truncar**, compara `st_dev`/`st_ino` via `fstat` (hard links contam), e só depois trunca.
- Cada `open` tem posição própria; `dup` e herança de `fork` partilham a descrição aberta.

## Posição e linhas

- `lseek` devolve a posição absoluta ou `(off_t)-1`. Para inverter bytes, visita `tamanho-1` até 0 com `SEEK_SET`; um recuo relativo após `read` relê o mesmo byte. EOF é retorno 0, não um byte.
- `getline` (POSIX) reserva ou aumenta o buffer; inclui `\n` se existir. Liberta no fim; `-1` pode ser erro. Últimas $k$ linhas: duas passagens em ficheiro regular, fila circular em pipe.
- `strstr` com sobreposição avança 1 byte após o início; sem ela, avança o padrão. Rejeita padrão vazio.

## Metadados e tempo

- Lê `struct stat` só após sucesso. `stat` segue links, `lstat` não, `fstat` usa abertura. `S_ISREG`/`S_ISDIR` para o tipo.
- `d_name` não é caminho: junta o diretório ou usa `fstatat(dirfd(d), nome, &info, 0)`. Repõe `errno=0` antes de **cada** `readdir`.
- `time_t` é civil; `CLOCK_MONOTONIC` mede durações. `localtime`: ano desde 1900, mês 0–11.

[Cópia robusta](/cadeiras/so/ficheiros-api/#ler-e-escrever-todos-os-bytes).
