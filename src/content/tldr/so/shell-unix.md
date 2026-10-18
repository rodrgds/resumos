## Caminhos e expansão

- Absoluto começa em `/`; relativo parte do diretório de trabalho. `cd` muda a própria shell; `cd` sem argumentos volta à pasta pessoal.
- A shell expande globs **antes de correr o comando**. Sem aspas, `*.c` chega ao programa já substituído; com aspas, o padrão chega intacto ao `find`.
- Aspas simples protegem tudo; duplas permitem `$VAR`. Glob `*` não é regex.

## Canais

| Canal  | Descritor | Operadores                                            |
| ------ | --------- | ----------------------------------------------------- |
| stdin  | 0         | `< ficheiro`                                          |
| stdout | 1         | `> ficheiro` trunca; `>>` acrescenta                  |
| stderr | 2         | `2> ficheiro`; `2>&1` copia o destino atual de stdout |

- `a | b` liga stdout de `a` a stdin de `b`. Redirecionamentos não entram em `argv`: `./prog 7 < dados.txt` dá `argc=2`.
- A ordem decide: `> tudo.txt 2>&1` junta ambos no ficheiro; `2>&1 > saida.txt` deixa stderr no destino antigo.
- Nunca uses o ficheiro de entrada como destino truncado na mesma linha.

## Filtros

```sh
sort -n < numeros.txt | uniq > distintos.txt
```

- `sort -n` ordena numericamente; `uniq` só remove repetições **adjacentes**.
- `grep -v` exclui; `cut -d ':' -f 1` escolhe campos; `sed 's/a/b/g'` substitui em cada linha.
- `wc -l` conta newlines (`printf abc | wc -l` dá 0); `wc -c` conta bytes.

## Jobs e manual

- `comando &` não espera; `jobs` lista jobs da shell, `ps` lista processos.
- `Ctrl+C` envia `SIGINT`; `Ctrl+Z` envia `SIGTSTP` e `fg` retoma. `kill` envia qualquer sinal: `SIGTERM` pede saída limpa, `SIGKILL` não é tratável.
- `man 2 open` é chamada de sistema; `man 3 fopen` é biblioteca.
- `chmod 640` dá `rw-`, `r--`, `---`. Em diretórios, leitura lista e execução atravessa; apagar depende do diretório. `ls -l` mostra modificação, não criação.

[Pipeline completa](/cadeiras/so/shell-unix/#três-canais-e-redirecionamento).
