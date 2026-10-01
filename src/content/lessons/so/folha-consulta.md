---
title: Cheat sheet de Sistemas Operativos
description: Fórmulas, condições, chamadas POSIX e erros a verificar antes de responder.
section: recursos
studyKind: revision
order: 1
---

## Processos e chamadas

| Operação  | O que faz                             | O que verificar                                   |
| --------- | ------------------------------------- | ------------------------------------------------- |
| `fork`    | Cria um filho, continua nos dois      | -1: erro; 0: filho; positivo: PID no pai          |
| `exec`    | Substitui a imagem no mesmo processo  | Sucesso não retorna; vetores terminam em `NULL`   |
| `waitpid` | Espera e recolhe um filho             | Repetir em `EINTR`; interpretar estado com macros |
| `exit`    | Termina e trata limpeza da biblioteca | Pode descarregar buffers copiados por fork        |
| `_exit`   | Termina sem limpeza stdio             | Adequado ao filho que falha antes de exec         |

Dados privados não passam a partilhados depois de fork. Descritores herdados referem a mesma descrição aberta e podem partilhar posição. Zombie já terminou e aguarda recolha; órfão perdeu o pai enquanto ainda pode estar vivo. $n$ forks sucessivos dão $2^n$ processos apenas se todos chegarem às chamadas e nenhuma falhar. [Explicação](../processos/#fork-devolve-duas-vezes).

## Escalonamento

Com uma rajada e sem I/O: $T=F-A$, $W=F-A-B$, $R=S-A$. Chegada $A$, duração $B$, primeiro início $S$, fim $F$. Havendo I/O, subtrai também o tempo bloqueado da espera. Desenha a linha do tempo antes das médias.

| Política   | Escolha                       | Atenção                               |
| ---------- | ----------------------------- | ------------------------------------- |
| FCFS       | Ordem da fila                 | Processo longo atrasa curtos          |
| SJF        | Menor rajada pronta           | Não espera por uma chegada futura     |
| SRTF       | Menor tempo restante          | Reavaliar nas chegadas                |
| RR         | Até um quantum e volta ao fim | Espera inclui intervalos entre fatias |
| Prioridade | Maior prioridade definida     | Pode haver inanição; aging combate-a  |

Previsão de rajada: $\tau_{n+1}=\alpha t_n+(1-\alpha)\tau_n$. Maior peso em CFS faz vruntime crescer mais devagar; nice menor corresponde a maior peso. [Contas](../escalonamento/#hipóteses-e-métricas).

Para tarefas independentes e preemptivas numa CPU, com deadline igual ao período: $U=\sum C_i/P_i$. RMS usa menor período e $U\leq n(2^{1/n}-1)$ é suficiente, não necessário. EDF usa menor deadline absoluta e admite $U\leq1$ nesse modelo. [Tempo real](../escalonamento/#tempo-real-rms-e-edf).

## Memória

Para página $P=2^n$: $p=\lfloor v/P\rfloor$, $d=v\bmod P$, físico $fP+d$. O deslocamento não muda. Um endereço de $m$ bits usa $m-n$ bits de página. Tabela linear completa: $2^{m-n}\times$ bytes por entrada. Fragmentação final: $\lceil tamanho/P\rceil P-tamanho$.

| Conceito             | Distingue de                                                  |
| -------------------- | ------------------------------------------------------------- |
| Fragmentação externa | Espaço livre total sem contiguidade suficiente                |
| Fragmentação interna | Espaço atribuído mas não utilizado                            |
| Miss do TLB          | Tradução ausente na cache, não necessariamente página ausente |
| Falta de página      | Pode ser recuperável, sem ser sempre I/O de disco             |
| Copy-on-write        | Páginas inicialmente partilhadas, cópia ao escrever           |

TLB com consulta $t$, RAM $M$, acerto $h$ e tabela de um nível: $EAT=h(t+M)+(1-h)(t+2M)$, sem outras caches nem faltas. [Tradução e TLB](../memoria-virtual/#tlb-e-tempo-efetivo).

Faltas com custo completo $F$ e probabilidade $p$: $EAT=(1-p)M+pF$. Usa as mesmas unidades. FIFO retira por entrada, LRU por último acesso e OPT por uso futuro mais distante. Um acerto atualiza LRU, não a fila FIFO. FIFO pode ter anomalia de Belady. Relógio limpa bits 1 e procura um 0. [Substituição](../paginacao-procura/#fifo-opt-e-lru).

Working set conta páginas distintas numa janela. Thrashing é pouca execução útil e muita paginação; aumentar processos ativos pode piorar. [Localidade](../paginacao-procura/#working-set-e-thrashing).

## Concorrência e comunicação

Mutex protege acessos à mesma invariável. Semáforo conta permissões ou impõe ordem. Condição permite esperar por um predicado sob mutex. `cond_wait` liberta e reobtém o mutex; usa `while`, não `if`. Data race em C tem comportamento indefinido; `volatile` não corrige. [Sincronização](../programacao-concorrente/#esperar-por-uma-condição).

Impasse exige exclusão mútua, retenção com espera, ausência de preempção de recursos e ciclo. Ordem global de locks quebra o ciclo. Inseguro não prova impasse; inanição permite que outros avancem. [Impasses](../impasses/#seguro-não-significa-livre-de-espera).

Pipe: ler em `fd[0]`, escrever em `fd[1]`; fechar pontas não usadas. EOF só com buffer vazio e todas as escritas fechadas. `dup2` prepara stdin/stdout antes de exec. Fluxos não preservam fronteiras de mensagens. Sinais tradicionais podem fundir-se; tratadores não devem chamar arbitrariamente stdio ou malloc. `SIGKILL` e `SIGSTOP` não são capturáveis. [IPC](../comunicacao-processos/#pipe-leitura-e-escrita).

## C, ficheiros e I/O

| Verificação                                      | Erro evitado                                   |
| ------------------------------------------------ | ---------------------------------------------- |
| `argc` antes de `argv[i]`                        | Argumento inexistente                          |
| Conversão validada e máximo com primeiro dado    | Texto inválido e máximos de negativos errados  |
| `strlen + 1` e capacidade do destino             | Falta de terminador ou escrita fora do buffer  |
| `malloc` e tempo de vida antes de desreferenciar | NULL, local que já terminou ou bloco libertado |
| Retornos `ssize_t` antes de conversão            | -1 transformado em quantidade sem sinal        |
| Ciclo de `write` com restante                    | Perda ou duplicação numa escrita parcial       |
| `stat` com sucesso e caminho correto             | Campos sem dados ou consulta noutra pasta      |

`open` falha com -1; descritor 0 é válido. `fopen` falha com NULL. `read`: positivo bytes, 0 EOF, -1 erro. `getline` preserva o newline quando existe e precisa de `free`. `FILE *` e `int` são interfaces diferentes. [API de ficheiros](../ficheiros-api/#file-e-descritor).

Inode guarda metadados e localização; diretório associa nome a inode; descrição aberta guarda posição. `dup` partilha posição, nova `open` normalmente não. Hard link é outro nome do mesmo inode; symlink contém um caminho. `unlink` não invalida um descritor aberto. [Implementação](../implementacao-ficheiros/#nome-inode-e-abertura).

Bitmap: volume/bloco dá número de bits; divide por 8 para bytes. Bloco de índice contém bloco/apontador entradas. Contíguo favorece acesso direto; ligado exige seguir cadeia; indexado exige índices. Journaling ajuda consistência, não substitui backup. [Alocação](../implementacao-ficheiros/#métodos-de-alocação).

HDD: posicionamento + rotação + transferência. Rotação média: $30/rpm$ segundos. Polling consulta, interrupção notifica, DMA transfere com hardware. `write` e `fflush` não provam persistência no dispositivo. [I/O](../ficheiros-entrada-saida/#polling-interrupções-e-dma).
