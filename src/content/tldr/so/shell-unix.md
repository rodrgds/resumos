## Caminhos e expansão

- Um caminho absoluto começa em `/`; um relativo parte do diretório de trabalho. `.` é esse diretório e `..` o pai. `cd` altera a própria shell.
- A shell expande `*.c` para nomes existentes **antes da execução**. Em `find . -name '*.c'`, as aspas entregam o padrão ao `find` para procurar na árvore. Um glob não é uma expressão regular.
- Aspas simples conservam texto literal; duplas permitem expansões como `$HOME`.

## Canais e redirecionamento

| Descritor | Canal  | Operadores                                         |
| --------- | ------ | -------------------------------------------------- |
| 0         | stdin  | `< entrada`                                        |
| 1         | stdout | `> saida` cria ou trunca; `>> saida` acrescenta    |
| 2         | stderr | `2> erros`; `2>&1` copia o destino atual de stdout |

`a | b` liga stdout de `a` a stdin de `b`. Redirecionamentos **não entram em argv**: `./programa 7 < dados.txt` dá `argc=2`, `argv[1]="7"` e stdin ligado ao ficheiro.

```sh
sort -n < numeros.txt | uniq > distintos.txt
```

`sort -n` ordena numericamente. `uniq` só elimina repetições **adjacentes**, por isso ocorrências separadas precisam de ordenação prévia.

- `comando > tudo.txt 2>&1` envia ambos os canais para o ficheiro.
- `comando 2>&1 > saida.txt` deixa stderr no destino anterior de stdout.
- Não uses o mesmo ficheiro como entrada e destino truncado: a shell pode apagá-lo antes de o programa ler.

## Filtros e processos

| Comando                  | Operação                                      |
| ------------------------ | --------------------------------------------- |
| `grep -v '^#' dados.txt` | Excluir linhas iniciadas por `#`              |
| `cut -d ':' -f 1`        | Selecionar primeiro campo separado por `:`    |
| `sed 's/erro/aviso/g'`   | Substituir todas as ocorrências em cada linha |
| `wc -l`, `wc -c`         | Contar mudanças de linha ou bytes             |

`printf abc | wc -l` dá 0. Caracteres UTF-8 podem ocupar vários bytes. Os filtros não alteram por si o ficheiro original.

- `comando &` inicia um job sem esperar, ainda ligado à sessão. `jobs` lista jobs; `ps` consulta processos.
- `Ctrl+C` costuma enviar `SIGINT` ao grupo em primeiro plano; `Ctrl+Z` envia `SIGTSTP` e `fg` retoma o job.
- `kill` envia sinais. `SIGTERM` permite limpeza; `SIGKILL` não pode ser tratado.

## Manual e permissões

`man 2 open` consulta a interface de sistema; `man 3 fopen` a biblioteca. Confere assinatura, retorno e erros.

Os bits 4, 2 e 1 representam leitura, escrita e execução. `chmod 640` dá `rw-` ao dono, `r--` ao grupo e `---` aos restantes. Num diretório, leitura lista nomes e execução atravessa-os; remover entradas depende desse diretório.

[Exemplo completo de pipeline e redirecionamentos](/cadeiras/so/shell-unix/#três-canais-e-redirecionamento).
