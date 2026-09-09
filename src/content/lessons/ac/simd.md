---
title: SIMD e vetores
description: Paralelismo explícito de dados, registos vetoriais, um exemplo de soma e os limites do speedup.
section: conteudo
order: 6
---

O pipeline e a predição exploram o paralelismo **implícito**: o hardware descobre sozinho que instruções pode sobrepor. O SIMD (_single instruction, multiple data_) é paralelismo **explícito**: uma só instrução declara que a mesma operação se aplica a vários dados ao mesmo tempo, e o programador (ou o compilador) organiza o trabalho para isso. É a técnica por trás do desempenho em multimédia, gráficos e computação científica.

## A ideia em dez segundos

Somar dois vetores de 4 elementos sem SIMD demora 4 instruções de soma. Com registos vetoriais de 4 elementos, demora 1 instrução de soma vetorial mais as cargas e guardas vetoriais:

```riscv
vle32.v  v0, (a0)    # carrega 4 palavras de a0 para o registo vetorial v0
vle32.v  v1, (a1)    # carrega 4 palavras de a1 para v1
vadd.vv  v0, v0, v1  # v0[i] = v0[i] + v1[i], os 4 em paralelo
vse32.v  v0, (a2)    # guarda os 4 resultados em a2
```

Cada registo vetorial guarda vários elementos; a unidade funcional tem várias ALUs em paralelo (ou uma em pipeline profundo) e produz todos os resultados juntos. O ganho ideal acompanha a largura: 4 elementos por instrução, 4 vezes menos instruções de soma.

Isto é diferente do pipeline: o pipeline sobrepõe instruções **diferentes** no tempo, o SIMD executa a **mesma** operação sobre dados diferentes no mesmo instante. E é diferente do multicore: há um só fluxo de instruções, sem threads nem sincronização.

## Quando rende e quando não rende

O SIMD rende quando o mesmo cálculo se repete sobre muitos dados independentes: somar vetores, ajustar o brilho de uma imagem, aplicar um filtro, multiplicar matrizes. O padrão é sempre o mesmo: um ciclo cujas iterações não comunicam entre si.

Não rende quando há dependências entre elementos (cada iteração precisa do resultado da anterior), quando o controlo diverge (metade dos elementos segue um ramo e a outra metade outro) ou quando os acessos são irregulares (cada elemento está num endereço imprevisível). Nesses casos o código vetorial passa o tempo a mascarar elementos e a reorganizar dados, e o escalar simples ganha.

## A conta do speedup

Volta à [lei de Amdahl](desempenho/): se 60% do tempo está num ciclo vetorizável e a unidade SIMD acelera essa parte 4 vezes, o speedup total é $1 / (0{,}4 + 0{,}6/4) \approx 1{,}82$, como já calculaste. Duplica a largura para 8 elementos e o speedup sobe só para $1 / (0{,}4 + 0{,}6/8) \approx 2{,}11$. A fração não vetorizável manda, e cada duplicação de hardware rende menos que a anterior.

Há ainda o custo escondido: carregar os dados para os registos vetoriais e voltar a guardá-los. Se o vetor for curto, o prólogo e o epílogo comem o ganho. A regra prática é que o SIMD compensa em ciclos longos sobre dados contíguos, exatamente o caso dos vetores e das imagens.

:::warning[O erro mais comum]
Multiplicar o speedup pela largura sem aplicar Amdahl. "8 elementos em paralelo" não significa programa 8 vezes mais rápido: significa a parte vetorizável 8 vezes mais rápida, e o total decide-se na fórmula com a fração real.
:::

## SIMD na prática da cadeira

Nos resultados de aprendizagem, o SIMD aparece com uma exigência concreta: aplicar instruções vetoriais em sub-rotinas de elevado desempenho. O padrão pedido é o desta página: identifica o ciclo paralelizável, carrega em bloco, opera em vetor, guarda em bloco. Nos testes, a pergunta típica dá-te um ciclo escalar e pede o equivalente vetorial, ou dá-te tempos com e sem vetorização e pede o speedup pela lei de Amdahl. Em ambos os casos, o método é o mesmo: fração primeiro, contas depois.
