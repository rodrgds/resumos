---
title: Folha de consulta de SO
description: Processos, sincronização, memória, armazenamento, ficheiros e E/S em regras de consulta rápida.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos SO 1, SofiaViP
      url: https://drive.google.com/file/d/1ZWuTWkwi6xWG8He0z_TQ3BUkK3N81YO9/view
    - title: Resumos SO 2, SofiaViP
      url: https://drive.google.com/file/d/1pLlaDVIVa0bhDy7qLG1M_CtejRLmZlmI/view
  coverage: Síntese dos dois volumes SofiaViP, páginas 2 a 10 do primeiro e 2 a 19 do segundo.
  gaps:
    - Os volumes não identificam uma edição atual da cadeira; confirma o programa da tua ocorrência.
    - Esta folha omite diagramas, demonstrações, APIs completas e detalhes de dispositivos atuais; os exemplos de discos mecânicos e de Unix descrevem os modelos da fonte.
---

Esta folha condensa [SO 1](https://drive.google.com/file/d/1ZWuTWkwi6xWG8He0z_TQ3BUkK3N81YO9/view) e [SO 2](https://drive.google.com/file/d/1pLlaDVIVa0bhDy7qLG1M_CtejRLmZlmI/view) de SofiaViP. Os dois volumes usam exemplos de discos mecânicos, Unix e arquiteturas específicas. Aplica as regras gerais, mas confirma os valores e as chamadas na plataforma do exercício.

## Sistema, processos e CPU

- O SO gere CPU, memória, dispositivos e ficheiros, fornece chamadas de sistema e separa aplicações do hardware. Uma chamada entra no **modo kernel**; uma interrupção de hardware ou uma exceção também transfere controlo para o kernel. O _bootloader_ carrega o núcleo antes do arranque dos processos. [Ver funções e arranque](/cadeiras/so/introducao-sistemas-operativos/#o-que-o-sistema-operativo-faz).
- Um **programa** é código guardado; um **processo** é uma execução com espaço de endereços, recursos e estado. O PCB guarda o contexto necessário ao escalonamento. Estados úteis: pronto, em execução, bloqueado e terminado. Uma troca de contexto guarda e restaura o estado do processo ou da thread; tem custo e, por si só, não faz trabalho da aplicação. [Ver ciclo de vida](/cadeiras/so/processos/#o-ciclo-de-vida).
- `fork()` cria um processo filho; ambos regressam da chamada com valores diferentes. `exec` substitui a imagem do processo, não cria outro. `exit` termina; `wait` recolhe o estado de um filho e evita que permaneça _zombie_. Sem `wait`, um filho terminado pode continuar como zombie até ser recolhido. [Ver criação](/cadeiras/so/processos/#criar-com-fork) e [recolha](/cadeiras/so/processos/#terminar-e-recolher-exit-e-wait).
- Threads do mesmo processo partilham memória e outros recursos, mas cada uma tem pilha e contexto de execução próprios. Partilhar endereços facilita comunicação e também cria corridas. [Ver threads](/cadeiras/so/programacao-concorrente/#threads-e-a-corrida).

| Escalonador | Escolha e custo principal                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------- |
| FCFS        | Primeiro a chegar; um trabalho longo pode atrasar todos os seguintes.                             |
| SJF/SRTF    | Menor duração prevista, sem/com preempção; exige estimar a duração e pode adiar trabalhos longos. |
| Round Robin | Cada pronto recebe uma fatia; fatia curta aumenta trocas de contexto, longa aproxima-se de FCFS.  |

**Espera** é tempo na fila de prontos; **retorno** vai da chegada à conclusão; **resposta** vai da chegada à primeira execução/resposta. Não confundas estes três tempos quando comparas políticas. [Ver métricas](/cadeiras/so/escalonamento/#o-que-se-mede) e [Round Robin](/cadeiras/so/escalonamento/#round-robin-fatias-para-todos).

## Cooperação e sincronização

- Em memória partilhada, uma **corrida** ocorre quando o resultado depende da ordem dos acessos. A secção crítica precisa de exclusão mútua, progresso e espera limitada conforme o modelo do problema. Um mutex protege uma região: adquirir antes de ler/modificar o estado partilhado, libertar em todos os caminhos de saída. [Ver mutexes](/cadeiras/so/programacao-concorrente/#mutexes-uma-de-cada-vez).
- Um semáforo conta permissões: `wait` decrementa ou bloqueia se indisponível; `signal` liberta uma permissão e pode acordar alguém. **Semáforo binário** e **mutex** não são automaticamente intercambiáveis: o mutex também tem semântica de posse. Uma variável de condição espera por um **predicado**, sempre num ciclo que o volta a testar depois de acordar. [Ver semáforos e condições](/cadeiras/so/programacao-concorrente/#semáforos-e-variáveis-de-condição).
- _Deadlock_: cada participante espera por recurso retido por outro e nenhum avança. Verifica espera circular e a ordem de aquisição; uma ordem global de locks evita o ciclo. _Starvation_ é espera indefinida de um participante enquanto outros progridem. [Ver impasses](/cadeiras/so/programacao-concorrente/#impasses-e-a-ordem-dos-locks).
- Um pipe é um canal de bytes com extremidades de leitura e escrita; depois de `fork`, fecha as extremidades que cada processo não usa, senão um leitor pode nunca observar EOF. FIFO dá nome ao canal; sockets identificam extremos de comunicação; memória partilhada exige sincronização separada. [Ver pipes](/cadeiras/so/comunicacao-processos/#pipes-conversa-entre-parentes) e [outras formas de IPC](/cadeiras/so/comunicacao-processos/#fifos-sockets-e-memória-partilhada).

## Memória e tradução de endereços

- Endereço **lógico/virtual** é o que o processo usa; a MMU traduz para endereço físico, com tabelas criadas pelo SO e proteção por processo. Na segmentação, um segmento tem base e limite; acesso fora do limite falha. Alocação contígua pode ter fragmentação externa; paginação troca-a por páginas e frames de tamanho fixo, com possível fragmentação interna. [Ver modelo](/cadeiras/so/memoria-virtual/#o-modelo-de-memória-do-processo) e [segmentação](/cadeiras/so/memoria-virtual/#segmentação-e-proteção).
- Com páginas de $2^k$ bytes, separa endereço virtual em número de página e **offset** de $k$ bits. A tabela dá o frame; o físico é $\text{frame}\times2^k+\text{offset}$. A TLB guarda traduções recentes; uma falha de TLB ainda pode encontrar a página em RAM. Bit inválido por ausência de página causa **page fault**; o SO obtém a página ou rejeita o acesso, conforme a causa. [Ver tradução](/cadeiras/so/memoria-virtual/#traduzir-um-endereço-passo-a-passo).
- Memória virtual permite carregar páginas só quando são necessárias. Se faltar um frame, escolhe-se vítima: FIFO remove a mais antiga, LRU aproxima a menos recentemente usada e a segunda oportunidade usa bits de referência. Uma página modificada pode exigir escrita antes da substituição; acessos excessivos ao disco por falta de frames levam a _thrashing_. Custo médio simplificado: $EAT=(1-p)t_m+p\,t_f$, com $p$ probabilidade de page fault e $t_f$ custo **total** da falta, incluindo acesso e retoma. [Ver paginação](/cadeiras/so/memoria-virtual/#paginação).

## Armazenamento, ficheiros e E/S

- Nos **discos mecânicos** da fonte, o acesso combina procura da pista, latência de rotação e transferência. FCFS serve por chegada; SSTF aproxima o pedido mais próximo; SCAN percorre em direção até inverter, C-SCAN regressa ao início lógico. Estas políticas não descrevem da mesma forma SSDs. Formatação física, partições, formatação lógica e bloco de arranque são passos distintos. [Ver percurso de E/S](/cadeiras/so/ficheiros-entrada-saida/#do-pedido-ao-dispositivo).
- Um ficheiro é uma sequência lógica com metadados; diretórios associam nomes a entradas e podem formar grafos com links. **Hard link** aponta para o mesmo objeto/inode no sistema de ficheiros; **symlink** guarda um caminho e pode ficar pendente. Abrir produz um descritor associado a posição e modo; `read`/`write` avançam essa posição, `seek` muda-a. Permissões controlam acesso, mas não substituem locks de concorrência. [Ver ficheiros](/cadeiras/so/ficheiros-entrada-saida/#ficheiros-e-a-sua-implementação) e [API Unix](/cadeiras/so/ficheiros-entrada-saida/#a-api-unix-em-ação).
- Alocação **contígua** dá acesso sequencial e aleatório simples, mas dificulta crescimento; **ligada** cresce bem, mas acesso aleatório percorre blocos; **FAT** mantém os próximos blocos numa tabela; **indexada** guarda referências aos blocos num bloco índice/inode. Diretórios, mapa de espaço livre, descritores abertos e blocos de arranque são estruturas diferentes. Um sistema de ficheiros só fica acessível depois de ser montado.
- Um dispositivo expõe registos/filas de dados, controlo e estado através do controlador; o driver traduz pedidos do SO para o protocolo. _Polling_ consulta repetidamente o estado; interrupções avisam quando há trabalho ou conclusão, após guardar contexto e despachar o handler. Máscaras e prioridades dependem da arquitetura. [Ver pedido ao dispositivo](/cadeiras/so/ficheiros-entrada-saida/#do-pedido-ao-dispositivo).
