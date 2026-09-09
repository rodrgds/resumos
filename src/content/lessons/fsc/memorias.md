---
title: Memórias
description: RAM e ROM, SRAM e DRAM, capacidade, descodificação total e parcial e espaço de endereçamento.
section: conteudo
order: 7
---

Os registos guardam poucas palavras junto ao processador. Para guardar quantidades maiores de dados usam-se **memórias de acesso direto**, onde qualquer posição se lê ou escreve indicando o seu endereço.

## Tipos de memória

A **RAM** permite leitura e escrita em qualquer posição. A **ROM** permite apenas leitura, com o conteúdo definido no fabrico. À parte, uma memória pode ser **volátil**, isto é, perde os dados quando se desliga a alimentação, ou não volátil, que os conserva.

Dentro da RAM há duas tecnologias com compromissos opostos:

- **SRAM** (memória estática): cada bit vive num circuito que se mantém sozinho. É rápida, mas cada célula ocupa muito silício, por isso tem menor capacidade.
- **DRAM** (memória dinâmica): cada bit vive como carga num condensador minúsculo, que se descarrega com o tempo e **precisa de ser refrescada** periodicamente. É mais lenta no acesso, mas muito mais densa.

Em geral, o tempo de escrita é maior do que o tempo de leitura.

## Capacidade

Com $P$ linhas de endereço há $N = 2^P$ posições endereçáveis. A **capacidade** obtém-se multiplicando o número de posições pelo número de bits por posição, que é igual ao número de bits do porto de dados:

$$
\text{capacidade} = 2^P \times W
$$

onde $W$ é a largura em bits de cada posição. Uma memória com $2^{12}$ posições de 8 bits guarda $2^{12} \times 8$ bits, ou seja, $2^{12}$ bytes. Como $2^{10}$ bytes valem $1$ KiB e $2^{20}$ bytes valem $1$ MiB:

$$
2^{12} \times 8\ \text{bits} = 2^2 \times 2^{10}\ \text{bytes} = 4\ \text{KiB}
$$

Decora as potências de referência: $2^{10} = 1024$ bytes $= 1$ KiB, $2^{20} = 1048576$ bytes $= 1$ MiB.

## Descodificação

Ligar as linhas de endereço às posições chama-se **descodificação**, e há dois regimes:

- **Descodificação total**: cada endereço corresponde a uma posição. Todos os bits de endereço são usados na seleção.
- **Descodificação parcial**: vários endereços correspondem à mesma posição. Nem todos os bits de endereço participam na seleção, por isso a mesma célula aparece em vários endereços (diz-se que tem imagem, _alias_).

A descodificação parcial desperdiça espaço de endereçamento, mas poupa descodificadores e é comum quando a memória é mais pequena do que o espaço disponível.

## Espaço de endereçamento

O **espaço de endereçamento** conta tudo o que o processador consegue designar: $2$ elevado ao número total de bits de endereço, somando os bits de endereço de entrada com os bits perdidos (os que a descodificação parcial ignora), caso existam. Se um processador emite 12 bits de endereço mas 2 deles se perdem na descodificação parcial, o espaço total continua a ser $2^{12}$ endereços, embora só $2^{10}$ posições distintas existam.

> Experimenta: uma memória tem 10 linhas de endereço e posições de 16 bits. Qual é a capacidade em bytes? (Resposta: $2^{10} \times 16$ bits $= 1024 \times 2$ bytes $= 2$ KiB.)
