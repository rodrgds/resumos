---
title: Memória virtual
description: Hierarquia, paginação, tabelas de páginas e a tradução de um endereço virtual com páginas de 4 KiB.
section: conteudo
order: 7
---

Cada processo acredita que tem gigabytes de memória contígua só para si, mesmo quando a máquina tem menos RAM do que a soma do que os processos pedem. A **memória virtual** é a ilusão que o SO e o hardware mantêm juntos: cada processo vê um espaço de endereçamento privado, e o sistema traduz cada endereço virtual para o sítio físico real. Recorda a [hierarquia de memória](/cadeiras/fsc/memorias/) e a ponte das [caches](/cadeiras/ac/hierarquia-cache/): a paginação é o nível seguinte da mesma ideia.

## O modelo de memória do processo

O espaço virtual de um processo Linux típico organiza-se de baixo para cima: código e dados fixos, a área livre (_heap_) a crescer para cima com o `malloc`, e a pilha (_stack_) a crescer para baixo a cada chamada de função. Entre as duas fica espaço livre para crescerem. Este mapa é igual em todos os processos, o que simplifica o compilador e o carregador. A igualdade é possível porque os endereços são virtuais: dois processos usam o mesmo endereço virtual para coisas físicas completamente diferentes.

## Paginação

A **paginação** divide o espaço virtual em blocos de tamanho fixo, as **páginas** (tipicamente 4 KiB), e a memória física em blocos do mesmo tamanho, as **molduras**. Cada processo tem uma **tabela de páginas** que diz, para cada página virtual, em que moldura física ela está, ou se está no disco (_swap_) ou se ainda não existe. O hardware traduz cada acesso automaticamente: separa o endereço virtual em número de página e deslocamento dentro da página, consulta a tabela e junta a moldura com o deslocamento.

## Traduzir um endereço, passo a passo

Toma páginas de 4 KiB, ou seja, $2^{12}$ bytes. O deslocamento ocupa os 12 bits baixos do endereço, e o resto é o número da página. Traduz o endereço virtual `0x1A3F5`:

1. Separa os 12 bits baixos: `0x1A3F5` termina em `3F5`, por isso o deslocamento é `0x3F5` e o número da página é `0x1A`.
2. Consulta a tabela de páginas na entrada `0x1A`. Supõe que ela diz moldura `0x07`, presente em memória.
3. Junta a moldura com o deslocamento: endereço físico `0x073F5`.

Três pormenores que os exercícios adoram testar. Primeiro, o deslocamento passa intacto: só a página é traduzida. Segundo, se a entrada disser que a página está no disco, o hardware levanta uma **falta de página**, o SO traz a página do swap para uma moldura livre e repete o acesso. Terceiro, a tradução acontece em cada acesso, por isso o hardware guarda as traduções recentes numa cache própria, o **TLB**; sem ele, cada acesso à memória custaria dois.

:::tip[Como fazer estas contas]
Converte o endereço para hexadecimal e conta os dígitos da direita: com páginas de $2^n$ bytes, os últimos $n/4$ dígitos hexadecimais são o deslocamento. Para 4 KiB ($n = 12$), são os últimos 3 dígitos. O resto é o número da página.
:::

## Segmentação e proteção

Antes da paginação dominar, a **segmentação** dividia o espaço em blocos de tamanho variável com significado lógico: código, dados, pilha. Cada acesso verificava limites e permissões do segmento. Os sistemas modernos usam paginação para a tradução e guardam da segmentação a ideia essencial: cada página tem permissões (leitura, escrita, execução) e o hardware recusa acessos ilegais. É por isso que escrever numa zona de código ou dereferenciar um apontador inválido termina o processo com falha de segmentação em vez de corromper outro programa. A proteção entre processos, que o [C avançado](c-avancado/) prometeu, é implementada aqui.

## Para levar para a próxima página

A memória virtual dá a cada processo um espaço privado e protegido. Falta persistir dados para além da vida do processo: ficheiros, discos e dispositivos, que vivem nos [ficheiros e na entrada e saída](ficheiros-entrada-saida/).
