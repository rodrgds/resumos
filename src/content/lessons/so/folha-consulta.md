---
title: Cheat sheet de Sistemas Operativos
description: Fórmulas, condições, chamadas POSIX e erros a verificar antes de responder.
section: recursos
studyKind: revision
order: 1
---

## Processos

| Chamada          | Retorno                   | Verificação                                                               |
| ---------------- | ------------------------- | ------------------------------------------------------------------------- |
| `fork`           | `-1`, `0` ou PID do filho | Trata a falha; no filho e no pai segue ramos separados                    |
| `execvp`         | Só retorna em falha       | Mantém o PID; vetor termina em `NULL`                                     |
| `waitpid`        | PID ou `-1`               | Repete em `EINTR`; interpreta com `WIFEXITED` antes de `WEXITSTATUS`      |
| `exit` / `_exit` | Não retorna               | No filho após `exec` falhado usa `_exit`; `exit` repete limpezas herdadas |

- Um processo terminado liberta a memória de execução, mas resta uma entrada na tabela do núcleo com PID e estado até ser recolhido. Esse zombie já não executa.
- Um filho vivo cujo pai terminou é órfão; em Linux pode ser adotado por init ou por um subreaper.
- Dados privados ficam logicamente separados após `fork` (COW); descritores herdados partilham a posição.
- Contagem: se todos os processos chegam a cada `fork`, $n$ forks dão $2^n$ processos. Filhos que terminam antes quebram a progressão.
- Antes de `fork`, descarrega buffers com `fflush` para não duplicar saída.
- [Processos](/cadeiras/so/processos/#fork-devolve-duas-vezes).

## Escalonamento

- Hipóteses base dos exemplos: 1 CPU, uma rajada por processo, sem I/O e sem custo de troca.
- Com chegada $A$, rajada $B$, primeiro início $S$ e fim $F$:
  - Retorno $T=F-A$.
  - Espera $W=F-A-B$ (subtrai também o tempo bloqueado se houver I/O).
  - Resposta $R=S-A$.
- Utilização mede fração de CPU ocupada; débito conta tarefas por unidade de tempo.

| Política           | Regra de escolha                               | Risco a verificar                           |
| ------------------ | ---------------------------------------------- | ------------------------------------------- |
| FCFS               | Ordem de chegada                               | Efeito de comboio com rajada longa à frente |
| SJF não preemptivo | Menor rajada entre as já prontas               | Não adivinha chegadas futuras               |
| SRTF               | Menor tempo restante; reavalia em cada chegada | Inanição sem aging                          |
| RR com quantum $q$ | Fatia até $q$; quem não termina volta ao fim   | Espera inclui intervalos entre fatias       |
| Prioridades        | Ordem definida                                 | Inanição; usa aging ou quotas               |

- Previsão da próxima rajada, com medida $t_n$, previsão anterior $\tau_n$ e $0\leq\alpha\leq1$:

$$\tau_{n+1}=\alpha t_n+(1-\alpha)\tau_n.$$

- Fração útil com fatias de duração $q$ e custo de troca $c$, supondo fatias cheias e fila sempre ocupada: $q/(q+c)$.
- CFS escolhe menor vruntime; peso maior faz o vruntime crescer mais devagar. Em `nice`, valor menor significa maior prioridade.
- Modelo de tempo real: 1 CPU, tarefas independentes e preemptivas, deadline igual ao período. Para a tarefa $i$, $C_i$ é o custo máximo e $P_i$ o período; $U=\sum C_i/P_i$.
  - RMS dá prioridade ao menor período; $U\leq n(2^{1/n}-1)$ para $n$ tarefas é suficiente, não necessária.
  - EDF escolhe a deadline absoluta mais próxima; $U\leq1$ decide.
- [Métricas](/cadeiras/so/escalonamento/#hipóteses-e-métricas) · [Tempo real](/cadeiras/so/escalonamento/#tempo-real-rms-e-edf).

## Memória e paginação

- Página e moldura com $P=2^n$ bytes. Para o virtual $v$, com página $p$, deslocamento $d$, moldura $f$ e físico $a$:

$$p=\lfloor v/P\rfloor,\quad d=v\bmod P,\quad a=fP+d.$$

- O deslocamento passa intacto para o endereço físico.
- Tabela linear: com $m$ bits de endereço virtual e $n=\log_2 P$, há $2^{m-n}$ entradas. Exemplo de 32 bits com 4 KiB e 4 bytes por entrada: $2^{20}$ entradas, 4 MiB.
- Multinível com 10+10+12 bits: cria tabelas interiores só para regiões mapeadas.
- TLB guarda traduções; cache guarda conteúdo. Falta no TLB não é falta de página.
- Tempo efetivo com tabela de um nível, sem caches nem faltas. Aqui $t$ é o acesso ao TLB, $M$ o acesso à memória e $h$ a taxa de acerto, com $0\leq h\leq1$:
  - Acerto: $t+M$.
  - Falta: $t+2M$.
  - Média: $EAT=h(t+M)+(1-h)(t+2M)$.
  - Com duas tabelas no miss: $t+3M$.
- Custo com faltas de página. Aqui $M$ é o acesso normal, $F$ o serviço completo de falta incluindo a repetição, e $p_f$ a probabilidade de falta, todos na mesma unidade:

$$EAT=(1-p_f)M+p_fF.$$

| Política | Vítima                              | Nota                                                |
| -------- | ----------------------------------- | --------------------------------------------------- |
| FIFO     | Entrada mais antiga                 | Acerto não reordena                                 |
| LRU      | Acesso menos recente                | Cada acerto atualiza a ordem                        |
| OPT      | Uso futuro mais distante            | Referência mínima com futuro conhecido              |
| Relógio  | Primeiro bit 0 a partir da ponteira | Bit 1 é limpo e a ponteira avança                   |
| NRU      | Primeira classe `(R,M)` não vazia   | $R$ é referência desde a limpeza, $M$ é modificação |

- Fragmentação externa: falta de região contígua livre. Fragmentação interna: capacidade atribuída sem uso.
- FIFO pode dar mais faltas com mais molduras (anomalia de Belady). LRU e OPT são de pilha no modelo.
- Working set: páginas distintas nas últimas $\Delta$ referências.
- Thrashing: paginação contínua sem trabalho útil. CPU pouco ocupada não pede mais processos; confirma a frequência de faltas.
- [Tradução](/cadeiras/so/memoria-virtual/#tlb-e-tempo-efetivo) · [Substituição](/cadeiras/so/paginacao-procura/#fifo-opt-e-lru).

## Concorrência

- Protege a operação indivisível com mutex. A granularidade segue os dados, não o menor número de linhas.
- Semáforo conta permissões (`vazios=N`, `cheios=0`) ou impõe ordem. Procedimento na fila limitada:
  1. Espera por disponibilidade antes de obter o mutex.
  2. Obtém o mutex e atualiza índices.
  3. Liberta o mutex e anuncia depois.
- `pthread_cond_wait` liberta o mutex e dorme de forma atómica; ao voltar, reobtém o mutex.
- Passos do consumidor:
  1. Testa o predicado com o mutex obtido.
  2. Espera em `while`, porque há despertares espúrios e outro consumidor pode levar o item.
  3. Retira e sinaliza segundo o número de consumidores.
- O sinal permite sair da espera; não reserva um item nem entrega o mutex.
- Acessos concorrentes incompatíveis sem sincronização são data race, com comportamento indefinido em C. `volatile` não cria sincronização.
- Impasse exige as quatro condições em simultâneo: exclusão mútua, retenção com espera, ausência de preempção e espera circular. Ordem global de locks quebra o ciclo.
- Banqueiro, com `Need=Max-Allocation` e `Work=Available`:
  1. Escolhe por concluir um processo com `Need<=Work` em cada componente.
  2. Soma `Work+=Allocation` desse processo.
  3. Repete até incluir todos. Só concede o que mantém segurança.
- [Condição](/cadeiras/so/programacao-concorrente/#esperar-por-uma-condição) · [Impasses](/cadeiras/so/impasses/#quatro-condições).

## Comunicação entre processos

- Pipe: `fd[0]` lê, `fd[1]` escreve. Cria antes de `fork`; depois de `fork`, cada processo fecha as pontas que não usa.
- EOF no pipe exige buffer vazio e todas as pontas de escrita fechadas. Passos:
  1. Leitor fecha a escrita herdada.
  2. Escritor fecha a escrita quando terminam os dados.
  3. Leitor esgota o buffer e recebe `0`.
- Sem leitores, escrever pode gerar `SIGPIPE` e falhar com `EPIPE` se o sinal não terminar o processo.
- `dup2` prepara `stdin`/`stdout` antes de `exec`. O supervisor fecha ambas as pontas e recolhe os filhos.
- Fluxos não preservam fronteiras de mensagem: usa ciclos e define linhas, tamanho ou comprimento. Escritas curtas não provam EOF.
- Meio-fecho em sockets: `shutdown(fd, SHUT_WR)` termina o pedido sem fechar a leitura da resposta. Em pipes, o fim usa fecho da escrita, não `shutdown`.
- Sinais:
  - `SIGKILL` e `SIGSTOP` não se capturam nem se ignoram. Usa nomes, não números.
  - No tratador, usa só funções async-signal-safe. Assinala com `volatile sig_atomic_t` e trabalha no fluxo normal.
  - Sinais padrão repetidos enquanto pendentes podem fundir-se; não os uses como contador. Sinais de tempo real têm fila.
  - Contra a janela teste/dormir: bloqueia, instala com `sigaction`, testa sob bloqueio e dorme com `sigsuspend`.
- Memória partilhada: `mmap` falha com `MAP_FAILED`. `MAP_SHARED` partilha; `MAP_PRIVATE` isola com COW. `munmap` remove; fechar o descritor não remove. Pai que lê depois de `waitpid` está ordenado; filas vivas exigem sincronização entre processos.
- [IPC](/cadeiras/so/comunicacao-processos/#pipe-leitura-e-escrita).

## C e ficheiros

- Argumentos:
  - `argc` inclui o nome do programa. Confirma `argc` antes de ler `argv[1]`.
  - Valida inteiros com `strtol`: põe `errno=0`, rejeita `ERANGE`, rejeita sem dígitos (`fim==argv[1]`) e rejeita resto (`*fim!='\0'`). Para `int`, confirma também `INT_MIN<=n<=INT_MAX`.
  - Para o máximo de números que podem ser negativos, inicializa com o primeiro valor validado, não com zero.
- Strings:
  - `strcpy(dst, src)` exige `strlen(src)+1` bytes no destino.
  - `strcat(dst, src)` exige `strlen(dst)+strlen(src)+1` bytes, com `dst` já terminada.
  - As regiões não se podem sobrepor. `strlen` não mede capacidade.
- Tempo de vida:
  - Testa `NULL` após reserva. `malloc` não inicializa; `calloc` zera.
  - Em `realloc`, usa temporário. Com tamanho maior que zero, a falha conserva o bloco antigo; `realloc(p, 0)` varia por implementação.
  - Após `free`, o bloco deixa de ser válido; pôr um alias a `NULL` não salva os outros.
- Transferências:
  - `open` falha com `-1`; descritor `0` é válido. `fopen` falha com `NULL`.
  - `read` devolve `>0` bytes, `0` no fim e `-1` em erro. `write` pode entregar menos bytes: repete com `buf+feito` e `n-feito`, trata `EINTR` e não confunde erro com tamanho sem sinal.
  - Para copiar sem truncar primeiro: abre sem truncar, compara `st_dev`/`st_ino` via `fstat` e só depois trunca.
  - Cada `open` tem posição própria; `dup` e herança de `fork` partilham a descrição aberta.
  - `lseek` devolve a posição absoluta ou `(off_t)-1`. EOF é retorno `0`, não um byte.
  - `getline` inclui `\n` quando existe e pode pedir reserva; liberta o buffer no fim.
- Metadados:
  - Lê `struct stat` só após sucesso. `stat` segue links, `lstat` não, `fstat` usa abertura.
  - `d_name` não é caminho: junta o diretório ou usa `fstatat`. Repõe `errno=0` antes de cada `readdir`.
  - [API](/cadeiras/so/ficheiros-api/#file-e-descritor).

## Sistema de ficheiros e I/O

- VFS fornece a interface comum e encaminha para cada implementação; não é um formato em disco.
- Inode guarda metadados e localização; diretório guarda nome para inode; descrição aberta guarda posição.
- `dup` partilha posição; nova `open` recomeça. `unlink` remove o nome sem invalidar aberturas.
- Bitmap: um bit por bloco. Exemplo de 1 TiB em blocos de 4 KiB: $2^{28}$ blocos, $2^{25}$ bytes, 32 MiB.
- Índice com blocos de 4 KiB e apontadores de 4 bytes: 1024 entradas por bloco. Com 12 diretos, um simples e um duplo: diretos 0–11, simples 12–1035, duplo desde 1036.
- Durabilidade:
  - `fflush` entrega buffers ao sistema; não prova persistência.
  - `fsync` pede sincronização do ficheiro; confere erros de escrita, fecho e sincronização.
  - Criar ou renomear pode exigir sincronizar também o diretório.
- Disco HDD: posicionamento, rotação e transferência. A 7200 rpm, a espera média de rotação é 4,17 ms.
- Polling consulta estado em ciclo; interrupção anuncia o evento; DMA transfere com configuração e conclusão por interrupção.
- Shell:
  - Expansão antes da execução; redirecionamentos não entram em `argv`.
  - `> f 2>&1` junta ambos em `f`; `2>&1 > f` deixa stderr no destino antigo.
  - `uniq` só remove adjacentes; `ls -l` mostra modificação, não criação.
- [Implementação](/cadeiras/so/implementacao-ficheiros/#nome-inode-e-abertura) · [I/O](/cadeiras/so/ficheiros-entrada-saida/#polling-interrupções-e-dma) · [Shell](/cadeiras/so/shell-unix/#três-canais-e-redirecionamento).
