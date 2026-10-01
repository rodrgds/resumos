---
title: Shell UNIX
description: Caminhos, expansão de nomes, redirecionamentos, pipes, processos e consulta do manual.
section: conteudo
order: 2
practices:
  - so/praticar-shell
---

A shell lê um comando, expande os seus argumentos e prepara as entradas e saídas do programa. Para prever um resultado, separa o que a shell faz do que o programa faz.

## Caminhos e diretório de trabalho

Um caminho absoluto começa em `/`, a raiz. Um relativo começa no diretório de trabalho. `.` designa esse diretório e `..` o seu pai. `~` expande para a pasta pessoal quando usado numa posição apropriada da linha de comando.

```sh
mkdir -p treino/a/b
cd treino/a/b
pwd
cd ../..
pwd
```

Depois do primeiro `cd` estás em `treino/a/b`; `../..` sobe dois níveis até `treino`. O resultado absoluto de `pwd` depende da pasta onde começaste. `cd` sem argumento leva-te à pasta pessoal.

## Expandir nomes e proteger texto

A shell expande `*.c` para nomes existentes que terminam em `.c`. `?` corresponde a um carácter e `[ab]` a um carácter do conjunto. As aspas protegem o texto contra certas expansões.

```sh
printf '%s\n' *.c
find . -name '*.c' -print
```

No primeiro comando, a shell procura os nomes na pasta corrente. No segundo, as aspas entregam `*.c` ao `find`, que procura na árvore. Sem aspas, o padrão pode ser expandido cedo e dar argumentos diferentes dos pretendidos.

Aspas simples conservam o texto literal. Aspas duplas conservam espaços, mas ainda permitem expansões como `$HOME`. A expansão `{a,b}` da Bash produz duas alternativas de texto, mesmo que os ficheiros não existam. Um glob não é uma expressão regular: o `*` de `grep` tem outro significado.

## Três canais e redirecionamento

Um processo costuma começar com os descritores 0, 1 e 2 abertos, respetivamente entrada padrão, saída padrão e erros padrão. Na biblioteca C, as interfaces correspondentes são `stdin`, `stdout` e `stderr`, do tipo `FILE *`.

| Operador da shell | Efeito                                             |
| ----------------- | -------------------------------------------------- |
| `< entrada.txt`   | Liga a entrada padrão ao ficheiro                  |
| `> saida.txt`     | Cria ou trunca o ficheiro e liga a saída padrão    |
| `>> saida.txt`    | Acrescenta a saída no fim                          |
| `2> erros.txt`    | Redireciona os erros padrão                        |
| `2>&1`            | Faz o descritor 2 referir o destino atual do 1     |
| `a \| b`          | Liga a saída padrão de `a` à entrada padrão de `b` |

```sh
printf '9\n2\n9\n5\n' > numeros.txt
sort -n < numeros.txt | uniq > distintos.txt
cat distintos.txt
```

A saída final é `2`, `5`, `9`, uma por linha. `sort -n` ordena numericamente; `uniq` elimina repetições adjacentes. Sem ordenar, duas ocorrências separadas poderiam sobreviver.

A shell retira `< numeros.txt` da lista de argumentos de `sort`. O programa recebe dados por stdin, não o texto `<`. Este detalhe explica por que um programa com `argc == 1` ainda consegue ler um ficheiro redirecionado.

A ordem dos redirecionamentos importa. `comando > tudo.txt 2>&1` envia os dois canais para o ficheiro. Em `comando 2>&1 > saida.txt`, stderr conserva o destino que stdout tinha antes de mudar.

Não uses `sort ficheiro > ficheiro`: a shell pode truncar o destino antes de `sort` o ler. Usa um destino diferente e, depois de confirmar o resultado, substitui o original.

## Filtrar e contar

```sh
grep -v '^#' dados.txt | cut -d ':' -f 1 | sort
sed 's/erro/aviso/g' < registo.txt
head -n 3 dados.txt
tail -n 3 dados.txt
```

`grep -v` exclui linhas que correspondem ao padrão. `cut` escolhe campos usando `:` como separador. `sed` substitui todas as ocorrências por linha por causa de `g`. Estes comandos não alteram o ficheiro de entrada por si só.

`wc -l` conta caracteres de mudança de linha, não necessariamente linhas visuais: `printf abc | wc -l` dá 0. `wc -c` conta bytes; um carácter acentuado em UTF-8 pode ocupar mais de um byte.

## Processos e jobs

`comando &` inicia um job sem a shell esperar pelo seu fim antes de apresentar outro prompt. O processo não fica automaticamente independente do terminal nem imune ao logout. `jobs` mostra jobs da shell; `ps` consulta processos do sistema.

`Ctrl+C` costuma enviar `SIGINT` ao grupo em primeiro plano. `Ctrl+Z` costuma enviar `SIGTSTP`; `fg` retoma um job em primeiro plano. `kill` envia sinais e não significa sempre matar. Para pedir terminação, começa normalmente com `SIGTERM`; `SIGKILL` não permite limpeza pelo programa.

`ps -A | wc -l` é apenas uma aproximação ao número de processos. Pode incluir um cabeçalho, os próprios programas da pipeline e alterações ocorridas enquanto os dados são recolhidos.

## Manual, permissões e arquivo

`man 2 open` consulta uma chamada de sistema; `man 3 fopen` consulta uma função de biblioteca. `SYNOPSIS` mostra cabeçalhos e tipos. `RETURN VALUE` e `ERRORS` dizem como reconhecer falhas. `command -v gcc` mostra o comando que a shell encontra.

`chmod 640 ficheiro` dá leitura e escrita ao dono, leitura ao grupo e nada aos restantes. Os dígitos são combinações de 4 para leitura, 2 para escrita e 1 para execução. Num diretório, execução permite atravessar nomes; leitura permite listar entradas. Apagar uma entrada depende das permissões do diretório que a contém.

```sh
tar -czf treino.tar.gz treino
tar -tzf treino.tar.gz
```

O primeiro comando cria um arquivo comprimido e o segundo lista-o sem o extrair. Para exercícios que removem ou substituem ficheiros, trabalha numa pasta de treino e confirma `pwd` antes do comando.
