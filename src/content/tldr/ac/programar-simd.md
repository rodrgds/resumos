## Contagens por grupos

Contrato da rotina da lição: bytes com sinal, base alinhada a 4, comprimento de 0 a $2^{31}-1$, limite de −128 a 127 e memória válida para todos os bytes.

1. Conserva os 8 bits baixos do limite antes de o replicar: `andi ...,255`. Replicar diretamente um negativo estendido pode contaminar vias.
2. Processa $n//4$ palavras. Compara quatro bytes; AND da máscara com `0x01010101` converte verdadeiros em 1.
3. Reduz cada grupo para um acumulador escalar com largura suficiente. Trata $n\bmod4$ bytes com `lb`, sem ler uma palavra além do vetor. Comprimento zero não lê memória.

- `[0xFF,0,0xFF,0xFF]` representa três verdadeiros. Após AND, `[1,0,1,1]` soma 3.
- ADD8 acumulado durante todo o vetor perde contagem ao atingir 256 por via. Reduzir imediatamente evita esse wrap; somas escalares de bytes 0/1 não geram carry entre vias nesta redução de quatro parcelas.
- Com `[−128,−3,0,127,−4,−3,−2]` e limite −2: grupo dá 2, resto dá 2, total 4. A comparação é **estrita**.

## Produto interno e vetores

- Para meias palavras, cada `lw` traz dois elementos. KMDA gera um parcial de 32 bits; soma-o num acumulador suficientemente largo, avança os dois apontadores 4 B e trata o elemento ímpar.
- `x=[2,−3,4,1]`, `y=[5,6,−2,7]`: parciais −8 e −1, total −9.
- Se ambas as meias palavras de ambos os operandos são −32768, KMDA **já satura**. Para exatidão, usa produtos completos SMUL16 e soma com largura suficiente. Redução em vírgula flutuante pode mudar arredondamentos.
- SMUL16 retorna dois produtos de 32 bits num par, não duas meias palavras prontas para `sw`. Para `Y=kY`, guarda partes de 16 bits com `sh` apenas se couberem.
- ADD16 para `Z=X+Y` é modular. Soma matemática com sinal exige $-32768\le X_i+Y_i\le32767$.
- Uma rotina que chama outras preserva `ra` e argumentos necessários. Define se pode alterar X; para o conservar em `Y−kX`, usa temporários.

## Absoluto e permutações

- $|{-32768}|=32768$ não cabe em 16 bits com sinal. MAX entre X e −X falha nesse extremo; KABS16 satura em 32767. Exclui o valor, alarga ou aceita explicitamente saturação.
- Antes de SUB16, empacota partes adequadas dos produtos **se couberem**. Um registo de produto de 32 bits não contém os dois produtos.
- Pontos de bytes `[x1,y1,x2,y2]`: SWAP8 dá `[y1,x1,y2,x2]`, espelhando cada ponto. SWAP16 apenas troca os pontos. Para coordenadas de 16 bits, cada palavra tem um ponto e SWAP16 troca x/y.

## Complexos e custo

Com H0 real e H1 imaginária:

$$\Re(ab)=a_rb_r-a_ib_i,\qquad \Im(ab)=a_rb_i+a_ib_r.$$

SMUL16 dá produtos diretos; SMULX16, cruzados. `(2,3)×(4,−1)` dá real $8-(-3)=11$ e imaginária $-2+12=10$. Empacota `(H1,H0)=(10,11)` só se ambas as partes couberem.

SIMD também paga cargas, replicação, permutações, alinhamento e resto. Quatro vias só aceleram a parte paralelizável: 60% do tempo acelerado 4 vezes dá Amdahl $1/(0{,}4+0{,}6/4)=1{,}818$, antes dos custos novos.

[Rotina completa e contratos de largura](/cadeiras/ac/programar-simd/).
