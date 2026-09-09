---
title: Concorrência e sincronização
description: Condições de corrida e secções críticas, com um contador partilhado que falha e depois acerta.
section: conteudo
order: 5
---

Duas threads a escrever na mesma variável sem coordenação produzem resultados errados de forma intermitente, os piores erros de depurar. Esta página mostra o mecanismo e a correção.

## A condição de corrida

Uma **condição de corrida** acontece quando o resultado depende da ordem dos acessos entrelaçados das threads. Incrementar um contador parece atómico, mas são três passos, ler, somar 1, escrever. Se duas threads lerem o mesmo valor antes de qualquer uma escrever, um dos incrementos perde-se.

A zona de código que só pode executar numa thread de cada vez chama-se **secção crítica**. Protegê-la é o trabalho da sincronização. Em OpenMP, `#pragma omp critical` garante exclusão mútua, e `#pragma omp atomic` faz o mesmo para operações simples com menos custo.

## Exemplo completo

Quatro threads incrementam um contador partilhado 100000 vezes cada. O resultado correto é 400000. Sem proteção:

```c
long contador = 0;
#pragma omp parallel for num_threads(4)
for (long i = 0; i < 400000; i++) contador++;
printf("%ld\n", contador);
```

Uma corrida típica imprime um valor como 287341, sempre abaixo de 400000 e diferente em cada execução. Cada unidade em falta é um incremento perdido num entrelaçamento azarado. Com proteção:

```c
long contador = 0;
#pragma omp parallel for num_threads(4)
for (long i = 0; i < 400000; i++) {
    #pragma omp atomic
    contador++;
}
printf("%ld\n", contador);
```

Agora imprime sempre 400000. O preço é a serialização dos incrementos, que a [lei de Amdahl](lei-de-amdahl/) conta como fração serial. Daqui sai a regra de ouro da sincronização: secções críticas curtas e raras. Proteger cada incremento de um ciclo longo anula o paralelismo, por isso na prática acumula-se em variáveis privadas e combina-se no fim, como a redução da página de [OpenMP](paralelismo-openmp/).

:::warning[O erro mais comum]
Testar uma vez, ver o valor certo e concluir que está correto. Sem proteção, o valor certo sai muitas vezes por sorte do escalonamento. Corre em ciclo e com várias threads, porque a corrida só aparece quando os acessos colidem, e em teste o enunciado conta com essa colisão.
:::
