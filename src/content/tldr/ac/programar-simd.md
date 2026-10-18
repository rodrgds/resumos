## Contar por grupos

1. Replica o limite mascarando os 8 bits baixos; replicar um negativo estendido contamina vias.
2. Processa $n//4$ palavras; AND com `0x01010101` converte cada máscara em contagem 0/1.
3. Reduz cada grupo num acumulador escalar largo. Resto com `lb`, sem ler além do vetor. Vazio retorna zero sem ler.

ADD8 acumulado perde contagens a 256 por via; reduzir cada grupo evita o wrap. Comparação **estrita**: −2 não entra com limite −2.

## Produto e vetores

- Cada `lw` traz dois elementos de 16 bits; KMDA gera um parcial de 32 bits. Soma com largura suficiente, avança 4 B, trata o ímpar.
- SMUL16 devolve dois produtos completos, não vias prontas para `sw`. Para `Y=kY`, guarda partes de 16 bits só se couberem.
- ADD16 é modular; soma matemática exige limites por elemento.
- Rotina que chama outras preserva `ra` e argumentos; define se pode alterar X.

## Extremos e permutações

- $|{-32768}|$ não cabe em 16 bits com sinal. MAX falha no extremo; KABS16 satura em 32767.
- SWAP8 espelha pontos de bytes; SWAP16 troca os pontos. A granularidade tem de coincidir com a largura das coordenadas.
- Complexos com H0 real e H1 imaginária: diretos para o real com subtração, cruzados para a imaginária com soma. Empacota só se couber.

[Rotina completa](/cadeiras/ac/programar-simd/).
