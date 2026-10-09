## Threads e corridas

Threads têm registos e pilhas próprios, mas partilham espaço de endereçamento e descritores. Um objeto na pilha pode ser partilhado através de um apontador válido.

- `pthread_create` chama uma função `void *f(void *)`. Passa estruturas distintas por thread, vivas e sem alterações concorrentes até aos joins.
- `pthread_join` espera pela thread e recolhe o retorno. Não devolvas um apontador para a pilha da thread; usa um bloco reservado com dono definido ou outro objeto ainda vivo.
- Leitura e escrita concorrentes incompatíveis num objeto C não atómico, sem sincronização, são uma **data race**, com comportamento indefinido. Não há uma lista garantida de resultados possíveis.
- `volatile` não cria atomicidade nem sincronização. Protege também leituras enquanto houver escritores.

## Secção crítica e primitivas

Uma solução procura **exclusão mútua**, no máximo uma tarefa dentro, **progresso**, sem adiar indefinidamente a escolha quando há interessados, e **espera limitada**, com limite às entradas de outros antes do acesso. Exclusão mútua sozinha não garante justiça.

| Primitiva        | Efeito                                                                         |
| ---------------- | ------------------------------------------------------------------------------ |
| Mutex            | Protege acessos com o mesmo lock; a granularidade segue a operação indivisível |
| Test-and-set     | Lê valor antigo e escreve novo atomicamente                                    |
| Compare-and-swap | Só escreve se o valor coincide com o esperado                                  |
| Spinlock         | Repete tentativas consumindo CPU; espera longa desperdiça trabalho             |

Peterson para duas tarefas assinala interesse, cede a vez à outra e espera enquanto a outra está interessada e tem a vez. Exige operações atómicas e ordem de memória adequada; globais C comuns não satisfazem automaticamente essas hipóteses. Desativar interrupções numa CPU também não protege contra outras CPUs.

Um mutex por atualização permite entrelaçar ciclos; um mutex por ciclo torna o ciclo inteiro indivisível face ao mesmo lock. Depois de dois joins já não há escritores dessas threads. Muitas funções Pthreads devolvem diretamente o erro; usa esse código, não `errno`.

## Semáforos e fila limitada

`wait`, ou P, consome uma permissão ou espera; `post`, ou V, acrescenta uma. Um semáforo iniciado em 3 permite três utilizadores. Iniciado em 0 pode ordenar a preparação de A antes do avanço de B. Um semáforo binário não tem necessariamente dono como um mutex.

Para capacidade $N$, inicia `vazios=N`, `cheios=0` e protege os índices com mutex:

| Produtor              | Consumidor            |
| --------------------- | --------------------- |
| Esperar por um vazio  | Esperar por um cheio  |
| Obter mutex e inserir | Obter mutex e retirar |
| Libertar mutex        | Libertar mutex        |
| Anunciar um cheio     | Anunciar um vazio     |

Não esperes por disponibilidade **mantendo o mutex**: podes impedir a tarefa que criaria a permissão de que precisas.

## Variáveis de condição

A condição verdadeira está nos dados protegidos, não no sinal. `pthread_cond_wait` liberta o mutex e entra em espera atomicamente; retorna depois de voltar a obtê-lo.

Excerto de consumidor, assumindo sucesso das operações e dados protegidos pelo mesmo mutex:

```c
pthread_mutex_lock(&mutex);
while (quantidade == 0)
    pthread_cond_wait(&nao_vazio, &mutex);
int valor = buffer[saida];
saida = (saida + 1) % CAPACIDADE;
quantidade--;
pthread_cond_signal(&nao_cheio);
pthread_mutex_unlock(&mutex);
```

- Usa **`while`**: pode haver despertar espúrio ou outro consumidor retirar o item antes da reaquisição do mutex.
- `signal` não transfere imediatamente mutex ou CPU nem reserva um item. A condição não acumula todos os sinais.
- O produtor espera enquanto cheio, insere e sinaliza `nao_vazio`; mantém $0\leq quantidade\leq CAPACIDADE$.
- Para terminar vários consumidores, protege uma flag de fim pelo mesmo mutex, espera enquanto vazio e não terminado e usa `broadcast` para todos observarem o fim.
- Sinalizar apenas na transição vazio→não vazio pode deixar vários consumidores adormecidos apesar de haver itens. O protocolo precisa de atender ao número de consumidores.

[Fila e eventos durante cond_wait](/cadeiras/so/programacao-concorrente/#esperar-por-uma-condição).
