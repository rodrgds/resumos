---
title: Tabelas de dispersão
description: Funções de dispersão, colisões por encadeamento e endereçamento aberto, e o fator de carga.
section: conteudo
order: 6
---

A ABP pesquisa em $O(\log n)$ comparando chaves. Uma tabela de dispersão tenta $O(1)$: em vez de procurar a chave, **calcula** onde ela está. O cálculo raramente é perfeito, e esta página é sobre gerir as imperfeições sem perder o tempo constante.

## A ideia

Uma **função de dispersão** $h$ transforma cada chave num índice da tabela: para guardar o par (chave, valor), põe-no na posição $h(chave)$; para o ler, recalcula $h(chave)$ e vai lá. Uma boa função espalha as chaves uniformemente pelos índices, é rápida e determinista (a mesma chave dá sempre o mesmo índice). O exemplo canónico para chaves inteiras é $h(k) = k \bmod m$, sendo $m$ o tamanho da tabela.

Duas chaves com o mesmo índice fazem uma **colisão**. Colisões são inevitáveis quando há mais chaves que posições, e prováveis muito antes disso: com 23 pessoas numa sala, a probabilidade de dois aniversários coincidirem já passa de metade. Por isso a tabela precisa de uma estratégia de colisões, não de esperança.

## Encadeamento

No **encadeamento** (chaining), cada posição guarda uma lista ligada de pares. Inserir 5 chaves numa tabela de tamanho 7 com $h(k) = k \bmod 7$, pela ordem 12, 25, 9, 30, 18:

- $12 \bmod 7 = 5$: posição 5 fica $[12]$.
- $25 \bmod 7 = 4$: posição 4 fica $[25]$.
- $9 \bmod 7 = 2$: posição 2 fica $[9]$.
- $30 \bmod 7 = 2$: colisão com o 9; a posição 2 fica $[9, 30]$.
- $18 \bmod 7 = 4$: colisão com o 25; a posição 4 fica $[25, 18]$.

Pesquisar o 30 recalcula o índice 2 e percorre a cadeia: compara com 9 (diferente), compara com 30 (igual). Duas comparações em vez de uma, o preço da colisão. Apagar remove o nó da cadeia, como numa lista ligada.

O **fator de carga** $\alpha = n/m$ (chaves por posição) prevê o custo: com boa dispersão, cada cadeia tem cerca de $\alpha$ elementos e a pesquisa custa $O(1 + \alpha)$. Aqui $\alpha = 5/7 \approx 0{,}71$. Quando $\alpha$ cresce, a tabela **redimensiona**: cria uma tabela maior e reinsere tudo (rehashing). Redimensionar custa $O(n)$, mas acontece raramente, por isso o custo amortizado por inserção continua $O(1)$, como na fila de duas pilhas.

## Endereçamento aberto

No **endereçamento aberto**, os pares vivem todos dentro da tabela; em colisão, tenta-se a próxima posição livre segundo uma **sondagem**. Na sondagem linear tenta-se $h(k), h(k)+1, h(k)+2, \dots$ (módulo $m$). É simples e amiga da cache, mas forma **aglomerados**: posições ocupadas atraem mais tentativas, que ocupam mais posições. A sondagem quadrática e a dispersão dupla espalham melhor as tentativas.

O preço do endereçamento aberto aparece na remoção: apagar uma chave a meio de uma sequência de sondagem parte o caminho das chaves seguintes, por isso marca-se a posição como **apagada** (tombstone) em vez de livre. As remoções acumulam lixo e obrigam a redimensionar mais cedo. Escolhe encadeamento quando as remoções são frequentes e a memória não aperta; endereçamento aberto quando a tabela cabe na cache e as chaves são estáveis.

:::tip[Como cai em teste]
Dão-te a função, o tamanho e a sequência de inserções e pedem a tabela final, ou dão-te a tabela e perguntam quantas comparações custa uma pesquisa. Segue a ordem dada sem saltos: cada inserção vê a tabela deixada pelas anteriores. E confirma sempre o módulo das tuas contas antes de escreveres a posição.
:::
