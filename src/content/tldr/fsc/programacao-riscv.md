## Condições e ciclos

Traduz uma condição escolhendo comparação com ou sem sinal. Para `if (x<y)`, `bge` pode saltar ao else; um salto no fim do primeiro ramo evita executar ambos.

Um `while` testa antes e pode executar zero vezes; um `do...while` testa depois. Conta também o teste final que deteta a saída.

## Vetores e texto

Num vetor válido de words, o apontador avança **4 bytes**. Para somar, mantém apontador, quantidade restante e acumulador; testa quantidade zero antes de ler. `[7,-3,10,0]` dá 14, e vazio dá 0. `add` conserva só 32 bits, pelo que a soma exata exige caber na largura ou deteção de overflow.

Para máximo, começa no primeiro elemento e define o caso vazio. Começar em zero falha em vetores só negativos.

Para inverter, lê ambas as words antes de escrever, troca e aproxima os apontadores. Termina quando se encontram ou cruzam. Comprimentos 0 e 1 regressam antes de calcular a última posição. Supõe alinhamento e um vetor que não atravesse o fim do espaço de endereços.

Uma string ASCII terminada em zero percorre-se com `lbu`, avançando **1 byte**. O terminador não conta. Dígitos estão entre `'0'` e `'9'`; o valor é c−48. Testa letras nos intervalos A…Z e a…z separadamente, pois A…z inclui pontuação. Esta classificação não é Unicode.

## Máscaras e palavras

| Operação no bit k | Expressão                   |
| ----------------- | --------------------------- |
| Testar            | $x\mathbin{\&}(1\ll k)$     |
| Colocar a 1       | $x\mathbin{\lor}(1\ll k)$   |
| Limpar            | $x\mathbin{\&}\sim(1\ll k)$ |
| Trocar            | $x\mathbin{\oplus}(1\ll k)$ |

Para contar bits por deslocamentos até zero, usa `srli`; `srai` pode nunca zerar uma palavra negativa. Rotação esquerda combina os deslocamentos por k e 32−k, tratando k=0 separadamente.

Na soma de duas palavras de 64 bits:

$$L=(A_L+B_L)\bmod2^{32},\quad c=[L<A_L],$$
$$H=(A_H+B_H+c)\bmod2^{32}.$$

A comparação do carry é **estrita e sem sinal**. L=A não implica carry.

Para classificar binary32 como bits, expoente `0xFF` e fração zero dão infinito; fração não zero dá NaN. Magnitude `bits & 0x7FFFFFFF` igual a zero reconhece +0 e −0.

[Percursos e invariantes dos vetores](/cadeiras/fsc/programacao-riscv/#somar-um-vetor).
