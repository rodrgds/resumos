---
title: Cheat sheet de FSC
description: Fórmulas, condições e erros frequentes para rever representação, circuitos e RV32.
section: recursos
studyKind: revision
order: 99
---

Cada linha resume uma regra com a condição junto do método e aponta para a explicação completa.

## Sistemas digitais

- Bit é 0 ou 1 lógico; níveis elétricos com margens definem o que conta como 0 ou 1. CMOS usa NMOS para ligar à massa e PMOS para ligar à alimentação.
- NAND CMOS tem NMOS em série e PMOS em paralelo. A saída só desce a 0 quando A e B valem 1, porque só aí o caminho para a massa conduz e nenhum PMOS conduz.
- NOR CMOS inverte a topologia. Segue primeiro os caminhos completos até à alimentação e à massa para descobrir a função.

[Portas CMOS na lição](/cadeiras/fsc/sistemas-digitais/#construir-nand-e-nor).

## Inteiros e overflow

- Valor posicional: $x=\sum d_ib^i$. Fração binária finita só quando o denominador reduzido é potência de 2. Hex usa 4 bits por algarismo, octal usa 3.
- Intervalos com $n$ bits: sem sinal $[0,2^n-1]$; C2 $[-2^{n-1},2^{n-1}-1]$; sinal e magnitude com dois zeros.
- C2 tem MSB com peso negativo. Negar é inverter e somar 1. Alargar repete o sinal. $-2^{n-1}$ não tem simétrico.
- A soma guarda os $n$ bits inferiores. Sem sinal, carry final 1 indica overflow. Em C2, usa $V=C_{n-1}\oplus C_n$, com $C_n$ o carry que sai do bit de sinal e $C_{n-1}$ o carry que entra nele.
- Overflow C2 na adição $A+B$: operandos com o mesmo sinal e resultado com sinal diferente. Na subtração $A-B$: operandos com sinais diferentes e resultado com sinal diferente do sinal de $A$.

[Adição e subtração](/cadeiras/fsc/inteiros-complemento-dois/#adição-e-subtração).

## Vírgula fixa e flutuante

- Qm.n usa $m$ bits com sinal e $n$ fracionários, $x=X2^{-n}$, passo $2^{-n}$. Produto: calcula $XY$ com intermédio largo e divide por $2^n$. Divisão: calcula $X2^n/Y$, com divisor $Y\ne0$, numerador alargado e arredondamento definido.
- IEEE 754 binary32 tem 1 sinal, 8 expoente e 23 fração, bias 127. $E$ e $F$ lêem-se sem sinal, $p$ é a largura da fração e $E_{max}$ é o expoente todo a 1, 255 em binary32.
- Normal $0<E<E_{max}$: $(-1)^s(1+F/2^p)2^{E-bias}$. Subnormal $E=0,F\ne0$: $(-1)^s(F/2^p)2^{1-bias}$. $E=F=0$ dá zero. $E=E_{max}$ dá infinito se $F=0$ e NaN se $F\ne0$.
- Em binary32, o menor normal positivo é $2^{-126}$, o menor subnormal positivo é $2^{-149}$ e o maior finito é $(2-2^{-23})2^{127}$. Nos normais binary32 em $[2^e,2^{e+1})$, o passo é $2^{e-23}$; nos subnormais o passo é fixo em $2^{-149}$.
- Multiplicação: XOR dos sinais, soma dos expoentes reais, produto dos significandos, depois normaliza e arredonda no fim.
- Bfloat16 usa a disposição 1/8/7 da tabela. Não se deve inferir que qualquer operação de bfloat16 segue as mesmas regras de um ambiente IEEE 754 completo.

[Operações e empates](/cadeiras/fsc/virgula-flutuante/#somar-e-subtrair).

## Texto e imagens

- ASCII tem 128 códigos; `A` é 65 e os dígitos `0` a `9` são 48 a 57. UTF-8 usa 1 a 4 bytes; conta bytes, pontos de código e símbolos separadamente.
- Raster guarda pixéis; vetor guarda formas. Tamanho raster: largura vezes altura vezes bits por píxel, a dividir por 8. Paleta soma cores vezes bytes por cor.

[Exemplos na lição](/cadeiras/fsc/texto-imagens/#calcular-o-tamanho).

## Álgebra de Boole e Shannon

- AND escreve-se $AB$, OR escreve-se $A+B$, NOT escreve-se $\overline A$. Precedência: NOT, AND, OR. XOR vale 1 com entradas diferentes.
- Absorção: $A+AB=A$ e $A(A+B)=A$. De Morgan: $\overline{AB}=\overline A+\overline B$ e $\overline{A+B}=\overline A\,\overline B$.
- SOP canónica soma os mintermos das linhas 1; POS canónica multiplica os maxtermos das linhas 0.
- Expansão de Shannon por $A$: $F=\overline A F(0)+AF(1)$, onde os cofatores fixam $A$ em 0 e em 1. Esta forma escolhe entre os dois cofatores conforme $A$; um multiplexador selecionado por $A$ implementa esta seleção.

[Formas canónicas na lição](/cadeiras/fsc/algebra-boole-portas/#formas-canónicas).

## Karnaugh

- Ordem Gray `00,01,11,10`; grupos de $2^k$ células com adjacência por fronteiras. SOP agrupa 1, POS agrupa 0; X é opcional em cada grupo.
- Confirma cada fator do produto de somas: substituir um zero coberto tem de anular o fator.

[Grupos e fronteiras](/cadeiras/fsc/karnaugh/#ordem-e-adjacência).

## Circuitos combinatórios

- MUX 2:1: $Y=\overline SI_0+SI_1$. MUX de $2^k$ entradas usa $k$ bits de seleção. Descodificador de $k$ bits ativa uma de $2^k$ saídas.
- Igualdade compara bit a bit. Ordem sem sinal segue do MSB para o LSB; com sinal distingue os sinais primeiro.
- Full adder: $S=A\oplus B\oplus C_i$ e $C_{i+1}=AB+AC_i+BC_i$. Ripple liga carries do LSB para o MSB.
- Somador e subtrator com controlo $M$: aplica $B_i\oplus M$ a cada bit e usa $C_0=M$. Com $M=0$ calcula $A+B$; com $M=1$ calcula $A+\overline B+1=A-B$. Só inverter $B$ sem pôr $C_0=1$ não subtrai.
- Atraso soma módulos em série em cada percurso e fica com o máximo entre percursos.

[Implementar por seleção](/cadeiras/fsc/circuitos-combinatorios/#implementar-uma-função-por-seleção).

## Circuitos sequenciais

- Latch segue o nível; flip-flop guarda no flanco. Todos os registos síncronos lêem o estado antigo no mesmo flanco.
- Flip-flop D guarda $Q^+_D=D$. Flip-flop T conserva com $T=0$ e troca com $T=1$, com $Q^+_T=Q\oplus T$; $Q$ é o estado atual e $Q^+$ o próximo estado. Para projetar com T, usa $T=Q\oplus Q^+$.
- Registo com enable carrega D se $E=1$ e conserva se $E=0$: $Q^+=ED+\overline E Q$ bit a bit. Reset síncrono só atua no flanco; reset assíncrono atua de imediato. Com prioridade ao reset: reset ativo dá 0, senão enable ativo carrega D, senão conserva. Confirma polaridade e prioridade no símbolo.
- Contador soma 1 por ciclo com regra de paragem explícita. Para módulo 6, os estados válidos são 0 a 5; com estado antigo 5 e enable ativo, o próximo é 0. Define o destino dos códigos não usados para o contador não ficar preso.
- Setup usa o caminho mais lento, hold usa o caminho mais rápido. Aumentar o período não corrige hold.

[Contas na lição](/cadeiras/fsc/circuitos-sequenciais/#setup-hold-e-caminho-crítico).

## Máquinas de estados

- Moore: saída depende do estado. Mealy: saída depende do estado e da entrada. O próximo estado é comum às duas leituras.
- Binária usa $\lceil\log_2S\rceil$ flip-flops; one-hot usa $S$ flip-flops. Define reset e trata estados inválidos; a recuperação one-hot só vale com essa definição.
- Soma em memória de 64 words: contador i de 6 bits percorre 0 a 63; em Soma, $S\leftarrow S+\mathrm{módulo}(Mem[i])$ e $i\leftarrow i+1$; done é 1 só em Concluído. Para módulos de 32 bits, usa acumulador sem sinal de 38 bits, pois $S_{max}=2^{37}$.
- Resto módulo 3: $r^+=(2r+b)\bmod 3$ com reset em R0 e saída 1 em R0. Em `110`, o percurso R0, R1, R0, R0 mostra o resto depois de cada bit.

[Laboratório](/cadeiras/fsc/maquinas-estados/#laboratório-de-máquinas). [Síntese](/cadeiras/fsc/maquinas-estados/#síntese-com-flip-flops-d).

## Memórias

- SRAM guarda em circuito estável alimentado; DRAM guarda em carga com refresh; ambas são voláteis. ROM tem conteúdo fixo; Flash apaga por blocos.
- Chip $2^a\times w$ tem $a$ linhas de endereço e $w$ de dados, com $2^aw$ bits. Largura em paralelo aumenta $w$; profundidade usa seleção.
- Descodificação parcial cria aliases, não capacidade. Z é alta impedância, não valor guardado.
- Paridade deteta número ímpar de erros. SECDED corrige um e deteta dois no modelo do código.

[Mapa de endereços](/cadeiras/fsc/memorias/#mapa-de-endereços).

## Registos e endereçamento RV32

- RV32I tem 32 registos inteiros x0 a x31 de 32 bits; x0 vale sempre 0 e o PC é separado destes registos.
- No RARS, `ecall` é convenção do simulador, não instrução da ISA RV32: a7 escolhe o serviço e a0 leva o valor. Serviço 1 imprime o inteiro em a0, 11 imprime o carácter em a0, 10 termina o programa.
- Endereço é em bytes, little endian no RARS. Num vetor de words com base B, endereço do elemento 0, o elemento i fica em $B+4i$ bytes; o apontador avança 4 bytes por elemento. Texto avança de 1 em 1.

[Endereços e RARS](/cadeiras/fsc/legv8-registos-memoria/#endereços-e-little-endian).

## Instruções e codificação

- `lw rd,d(rs1)` lê 4 bytes em $rs1+d$ e guarda o valor em $rd$. `sw rs2,d(rs1)` lê o valor em $rs2$ e escreve-o na memória em $rs1+d$. `lb/lh` estendem o sinal; `lbu/lhu` estendem com zeros.
- Instruções R escrevem o resultado da ALU em $rd$. Branch compara e segue o PC da instrução mais o deslocamento em bytes. `jal` guarda PC+4; `jalr` limpa o bit 0 do destino.
- Formato B reconstrói `imm[12],imm[11],imm[10:5],imm[4:1],0`. `lui` mais `addi` compensa metade baixa negativa.
- Pseudo-instruções são conveniências do assembler. Conta as instruções máquina reais produzidas pela expansão, que pode ter vários elementos. `li`, `la` e `call` podem emitir mais de uma instrução.

[Codificação passo a passo](/cadeiras/fsc/legv8-instrucoes/#codificar-passo-a-passo).

## Programação RV32

- Condições traduzem comparação e salto com o teste da condição inversa para o else. No ciclo de soma do vetor: à entrada de cada iteração, t2 é a soma dos elementos já lidos, t0 aponta para o próximo e t1 conta os que faltam.
- Máscaras: testar o bit k com `x & (1<<k)`; limpar com AND do complementar; pôr a 1 com OR; trocar com XOR.
- Conversão decimal: acumulador $v=0$, passo $v\leftarrow 10v+d$ com $d=c-48$. Para 32 bits sem sinal com $M=2^{32}-1$, rejeita antes de alterar se $v>429496729$ ou se $v=429496729$ e $d>5$, com comparações sem sinal; testar depois de `mul` e `add` não basta porque guardam só 32 bits.
- Soma de 64 bits em duas words: $L=(A_L+B_L)\bmod 2^{32}$ com carry $c=1$ se $L<A_L$ em comparação sem sinal; a igualdade não indica carry. Depois $H=(A_H+B_H+c)\bmod 2^{32}$.

[Traço do vetor](/cadeiras/fsc/programacao-riscv/#somar-um-vetor).

## Procedimentos e pilha

- a0 a a7, t0 a t6 e ra são caller-saved; s0 a s11 e sp são callee-saved. O chamado repõe o valor de $s$ que recebeu.
- Se o chamador precisa de t0 depois da chamada, guarda-o na sua pilha, recalcula-o depois ou move-o para um $s$ já preservado no seu próprio frame. A terceira só vale com esse $s$ preservado, pois ele tem de voltar intacto ao seu próprio chamador.
- Non-leaf preserva ra antes do `jal` interior. Reserva antes de escrever; sp alinhado a 16; mesmo tamanho em todos os retornos.

[Non-leaf completa](/cadeiras/fsc/procedimentos-pilha/#exemplo-non-leaf).

## Datapath uniciclo

- `lw x5,12(x8)` calcula $rs1+d$ na ALU, lê a memória e escreve o conteúdo em $rd$ através do MUX MemtoReg. `sw` usa o mesmo endereço mas escreve o valor da segunda leitura do banco. R escreve o resultado da ALU em $rd$. `beq` só muda o PC.
- $PCSrc=Branch\land Zero$. X em MemtoReg, em sw e beq, significa que o MUX de writeback é ignorado porque RegWrite é 0 e impede a escrita no banco. ALUSrc e MemWrite continuam a importar num sw: ALUSrc é 1 para escolher o imediato e MemWrite é 1 para autorizar a escrita.
- Falha MemtoReg preso em 0 escreve o endereço no lugar do conteúdo; só se vê quando endereço e conteúdo diferem. Falha PCSrc preso em 0 só falha branches tomados.

[Load completo](/cadeiras/fsc/datapath-controlo/#seguir-um-load-completo).

## CPU multiciclo

- Recursos partilhados guardam resultados em IR, MDR, A, B e ALUOut. Totais com fetch (estado 0) e decode (estado 1) incluídos: `lw` usa 5 ciclos (0, 1, 2, 3, 4), `sw` usa 4 (0, 1, 2, 5), R usa 4 (0, 1, 6, 7) e `beq` usa 3 (0, 1, 8).
- IorD escolhe PC ou ALUOut; ALUSrcA escolhe PC ou A; ALUSrcB escolhe B, 4 ou imediato. PC escreve-se quando $PCWrite+(PCWriteCond\cdot Zero)$ vale 1.
- Alvo arquitetural é PC da instrução mais $d$. Neste modelo o fetch já avançou 4, por isso o decode soma $d-4$. Outra organização guarda o PC da instrução; a compensação é deste modelo, não da ISA.
- Conta execuções reais, incluindo expansões de pseudo-instruções e excluindo instruções saltadas.

[Estados e sinais](/cadeiras/fsc/cpu-multiciclo/#estados-e-caminhos).

## Desempenho

- $T_{CPU}=N\cdot CPI/f$: $T_{CPU}$ é o tempo de CPU, $N$ o número de instruções máquina executadas, $CPI$ os ciclos por instrução e $f$ a frequência. $CPI=\sum p_iCPI_i$ com $p_i$ fração do número de instruções. Speedup $S=T_{antigo}/T_{novo}$.
- Amdahl com $p$ fração do tempo original melhorada $s$ vezes, com $0\le p\le1$ e $s>0$: $S=1/(1-p+p/s)$. Limite $1/(1-p)$ para $0<p<1$; $p=0$ dá 1 e $p=1$ dá $s$.

[Lei de Amdahl](/cadeiras/fsc/desempenho/#lei-de-amdahl).
