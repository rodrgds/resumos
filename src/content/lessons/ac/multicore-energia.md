---
title: Multicore e energia
description: O muro da potência, os limites do núcleo único e a organização dos multiprocessadores simétricos.
section: conteudo
order: 8
---

Durante décadas, cada geração de processadores trazia mais frequência e os programas aceleravam sem mudar uma linha. Por volta de 2005 essa boleia acabou: subir a frequência passou a custar potência que o chip não consegue dissipar. A indústria respondeu com vários núcleos em vez de um núcleo cada vez mais rápido. Esta página explica o muro e a organização que o contornou.

## O muro da potência

A potência dinâmica de um chip segue aproximadamente:

$$
P \propto C \times V^2 \times f
$$

com $C$ a capacitância comutada, $V$ a tensão e $f$ a frequência. Durante anos, cada geração encolhia os transístores, baixava $V$ e subia $f$ com a potência controlada. Depois o encolhimento deixou de baixar $V$ ao mesmo ritmo, e subir $f$ passou a exigir subir $V$, o que dispara a potência ao quadrado. Um processador de 100 W já precisa de um dissipador sério; muito acima disso o silício coze. Este é o **muro da potência** (_power wall_): a frequência estagnou nos poucos GHz e não vai sair daí por física, não por falta de ideias.

## Os limites do núcleo único

A energia não foi a única a travar. O paralelismo ao nível das instruções tem rendimento decrescente: cada via a mais no [superescalar](superescalar/) e cada entrada a mais na janela rende menos IPC e custa mais área e potência. A [memória](hierarquia-cache/) também não acompanha: cada falta à cache custa centenas de ciclos, e nenhuma largura de emissão fabrica paralelismo quando o programa espera por dados. Moral: um núcleo gigante e esfomeado rende menos, por watt, do que vários núcleos modestos. A saída foi o paralelismo **explícito com threads**: em vez de o hardware descobrir paralelismo sozinho, o software divide o trabalho.

## O multiprocessador simétrico

A organização básica é o **SMP** (_symmetric multiprocessing_): vários núcleos idênticos partilham a mesma memória e veem o mesmo espaço de endereços. Cada núcleo tem as suas caches privadas (L1, muitas vezes L2) e partilha os níveis seguintes e a memória principal com os outros. "Simétrico" significa que qualquer núcleo corre qualquer thread e acede a qualquer endereço com o mesmo custo nominal: o sistema operativo distribui o trabalho sem preferências arquiteturais.

Partilhar memória levanta uma pergunta nova: se dois núcleos têm o mesmo bloco nas suas caches privadas e um deles escreve, o outro fica com uma cópia velha. O hardware resolve isto com um protocolo de **coerência de caches**, que invalida ou atualiza as cópias alheias em cada escrita. Para esta cadeira basta a ideia: o programador vê uma só memória partilhada e coerente, e o protocolo paga o custo por baixo. Só quando dois núcleos disputam o mesmo bloco a sério (_partilha falsa_ incluída) é que a coerência aparece na fatura do desempenho.

## Amdahl outra vez, agora com núcleos

A [lei de Amdahl](desempenho/) decide se N núcleos valem a pena. Se 90% do tempo é paralelizável e 10% é serial, com 8 núcleos:

$$
\text{Speedup} = \frac{1}{0{,}1 + 0{,}9 / 8} = \frac{1}{0{,}1 + 0{,}1125} \approx 4{,}7
$$

Oito núcleos, menos de 5 vezes mais rápido. E a fração serial inclui tudo o que não paraleliza: arranque, sincronização, secções críticas, desequilíbrio de carga. A conclusão prática é a mesma do [SIMD](simd/): o hardware multiplica a parte paralela, a parte serial manda no total. É por isso que programar para multicore é sobretudo reduzir e baratear a parte serial.

:::tip[Como pensar em teste]
Perante "vale a pena passar de 4 para 16 núcleos?", calcula Amdahl com a fração dada e compara os speedups, não os núcleos. E perante "o que limita?", procura a fração serial: sincronização, comunicação e desequilíbrio vivem todas aí dentro.
:::
