---
title: Hierarquia e caches
description: Localidade, mapeamento direto e associativo, os três Cs, políticas de escrita e o AMAT.
section: conteudo
order: 3
---

A memória que um programa vê é grande, mas a memória grande é lenta. A hierarquia de memória resolve esta contradição com um facto empírico: em cada momento, o programa só precisa de uma pequena fração dos seus dados. A cache guarda essa fração numa memória pequena e rápida junto ao processador, e o programa corre quase à velocidade da memória rápida com a capacidade da memória lenta.

## Localidade

Os programas acedem à memória com dois padrões. A **localidade temporal** diz que um endereço acedido agora tem boa probabilidade de ser acedido outra vez em breve (contadores, variáveis de ciclo, o topo da pilha). A **localidade espacial** diz que os vizinhos de um endereço acedido também vão ser precisados (instruções seguidas, elementos seguidos de um vetor).

A cache explora ambas: guarda o dado acedido (temporal) e traz com ele um **bloco** inteiro de vizinhos, tipicamente 32 a 128 bytes (espacial). Quando o processador pede um endereço, a cache responde de imediato se o bloco já lá estiver (**hit**); se não estiver, vai buscar o bloco à memória seguinte (**miss**), paga a **penalidade de falta** e só depois continua.

## Onde cabe cada bloco

Uma cache com $2^n$ conjuntos e blocos de $2^b$ bytes divide cada endereço em três campos: os $b$ bits baixos escolhem o byte dentro do bloco (**offset**), os $n$ bits seguintes escolhem o conjunto (**índice**) e os restantes identificam qual dos muitos blocos da memória ali cabe (**etiqueta**, _tag_).

Há três organizações, do mais rígido ao mais livre:

- **Mapeamento direto**: cada bloco da memória cabe num único conjunto e cada conjunto guarda um só bloco. A etiqueta decide se o bloco presente é o pedido. É simples e rápido, mas dois blocos que calhem no mesmo conjunto expulsam-se um ao outro sem parar.
- **Associativa por conjuntos** (_n-way_): cada conjunto guarda $n$ blocos e o bloco pode ocupar qualquer um deles. Compara-se a etiqueta com as $n$ em paralelo. É o compromisso que quase todos os processadores usam (tipicamente 4 a 8 vias).
- **Totalmente associativa**: um só conjunto com todos os blocos; qualquer bloco cabe em qualquer posição. Só é viável em estruturas pequenas, como os _buffers_ de tradução de endereços.

Um exemplo de repartição. Cache de 8 KiB, blocos de 64 bytes, associativa de 4 vias: há $8192 / 64 = 128$ blocos no total, logo $128 / 4 = 32$ conjuntos. Com endereços de 32 bits: offset de 6 bits ($\log_2 64$), índice de 5 bits ($\log_2 32$) e etiqueta de $32 - 5 - 6 = 21$ bits. Vê como cada parâmetro se obtém por divisões e logaritmos, nunca de cor.

## Os três Cs e o que fazer a cada um

As faltas dividem-se em três causas, os **três Cs**:

- **Compulsórias** (_cold_): o primeiro acesso a cada bloco. Não há como as evitar com esta cache; só blocos maiores (mais vizinhos de cada vez) as reduzem, até certo ponto.
- **De capacidade**: a cache é demasiado pequena para o conjunto de trabalho do programa. Aumentar a cache resolve-as.
- **De conflito**: caberia na cache, mas calha sempre no conjunto ocupado por outro bloco. Mais associatividade (ou uma cache maior) resolve-as.

O diagnóstico manda na cura: se as faltas forem de conflito, duplicar a cache desperdiça área quando bastava passar de mapeamento direto para 2 vias. Em teste, classifica a falta antes de propor a solução.

## Políticas de escrita

Ler da cache é simples; escrever levanta duas decisões. Na escrita (_write hit_), o **write-through** escreve na cache e na memória seguinte ao mesmo tempo: simples, mas cada escrita paga o custo da memória lenta. O **write-back** escreve só na cache e marca o bloco como **sujo** (_dirty_); a escrita na memória fica adiada para a expulsão do bloco. É mais rápido, mas exige o bit de sujo e escritas de blocos inteiros na expulsão.

Na falta de escrita (_write miss_), o **write-allocate** traz o bloco para a cache como numa leitura, e o **no-write-allocate** escreve diretamente na memória sem trazer nada. A combinação habitual é write-back com write-allocate (aproveita a localidade das escritas) ou write-through com no-write-allocate (não polui a cache com dados que não vão ser lidos).

## Quanto custa cada acesso: o AMAT

O **tempo médio de acesso** combina a velocidade dos hits com a frequência e o custo das faltas:

$$
\text{AMAT} = \text{tempo de hit} + \text{taxa de faltas} \times \text{penalidade de falta}
$$

Um exemplo. Cache com hit de 1 ciclo, taxa de faltas de 5% e penalidade de 100 ciclos:

$$
\text{AMAT} = 1 + 0{,}05 \times 100 = 6\ \text{ciclos}
$$

Repara: apesar de 95% dos acessos acertarem, o tempo médio é 6 vezes o tempo de hit, porque cada falta custa 100 vezes mais. Esta é a aritmética que justifica caches maiores, mais associativas e multinível: tudo o que baixe a taxa ou a penalidade paga-se depressa. Com dois níveis, aplica a fórmula em cascata: a penalidade da L1 é o AMAT da L2.

Para fechar o círculo com a página de [desempenho](desempenho/): cada acesso à memória do programa custa em média AMAT ciclos, por isso o CPI efetivo cresce com a taxa de faltas. Uma otimização que corte as faltas a metade pode valer mais do que duplicar a frequência.

:::tip[Como resolver um exercício de caches]
Divide o endereço em etiqueta, índice e offset e confirma que a soma dos bits fecha. Depois pergunta: o bloco está na cache (hit)? Se não, que tipo de falta é (compulsória, capacidade, conflito)? Só então calcula tempos com o AMAT. Etiqueta primeiro, classificação depois, contas no fim.
:::
