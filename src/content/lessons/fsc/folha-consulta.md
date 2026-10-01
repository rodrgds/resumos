---
title: Cheat sheet de FSC
description: Fórmulas, condições e erros frequentes para rever representação, circuitos e RV32.
section: recursos
studyKind: revision
order: 99
---

## Representação

- [Bases](../representacao-dados/): $x=\sum d_ib^i$. Fração binária finita: denominador reduzido potência de 2. Hexadecimal: 4 bits/algarismo; octal: 3.
- [Inteiros](../inteiros-complemento-dois/): unsigned $[0,2^n-1]$; C2 $[-2^{n-1},2^{n-1}-1]$. Negar: inverter e somar 1. Alargar C2: repetir sinal.
- Overflow de soma C2: entradas com mesmo sinal, resultado com sinal diferente. Subtração: sinais das entradas diferentes, resultado diferente do sinal do primeiro operando. Carry final não é overflow com sinal.
- [Qm.n](../virgula-fixa/): m inclui sinal; $N=m+n$, $x=X2^{-n}$, passo $2^{-n}$. Produto para mesma escala: $XY/2^n$, com intermédio alargado.
- [IEEE 754](../virgula-flutuante/): normal $(-1)^s(1+F/2^p)2^{E-bias}$; subnormal $(-1)^s(F/2^p)2^{1-bias}$. E=0,F=0: zero; E máximo,F=0: infinito; E máximo,F≠0: NaN. Binary32: 1/8/23, bias127; binary64: 1/11/52, bias1023; bfloat16: 1/8/7, bias127.
- [Imagem raster](../texto-imagens/): bytes de píxeis = largura × altura × bits/píxel /8; acrescentar paleta, cabeçalho e alinhamento quando pedidos.

## Circuitos

- [Boole](../algebra-boole-portas/): $\overline{AB}=\overline A+\overline B$; $\overline{A+B}=\overline A\overline B$; $A+AB=A$; $A(A+B)=A$.
- SOP canónica: mintermos das linhas 1. POS canónica: maxtermos das linhas 0.
- [Karnaugh](../karnaugh/): Gray 00,01,11,10; grupos retangulares de $2^k$, com fronteiras e sobreposição. SOP agrupa 1; POS agrupa 0. X é opcional.
- [MUX](../circuitos-combinatorios/): $Y=\overline SI_0+SI_1$. $2^k$ entradas precisam de k seletores. Full adder: $S=A\oplus B\oplus C_i$, $C_{i+1}=AB+AC_i+BC_i$.
- [Registos](../circuitos-sequenciais/): D: $Q^+=D$; T: $Q^+=Q\oplus T$. Todos usam estado antigo. Setup: $T_{clk}\ge t_{cq,max}+t_{comb,max}+t_{setup}$, sem skew. Hold verifica o caminho mínimo separadamente.
- [FSM](../maquinas-estados/): Moore saída do estado; Mealy saída do estado e entrada. Binária: $\lceil\log_2S\rceil$ FF; one-hot: S FF. Definir reset e estados inválidos.
- [Memória](../memorias/): $2^a\times w$ guarda $2^aw$ bits. Largura: chips paralelos. Profundidade: seleção de bancos. Descodificação parcial cria aliases, não capacidade.

## RV32 e CPU

- [Memória RV32](../legv8-registos-memoria/): registo e word=32 bits; endereço ao byte; word em B+4i; little endian, byte baixo no menor endereço. `.align 2` alinha a 4 bytes.
- [Instruções](../legv8-instrucoes/): imediato I/S de 12 bits com sinal, [-2048,2047]. `lb/lh` estendem sinal; `lbu/lhu` zeros. Branch usa PC da instrução+d em bytes. `jal` guarda PC+4; `jalr` limpa bit0 do destino.
- [Pilha](../procedimentos-pilha/): a/t/ra caller-saved; s/sp callee-saved. Non-leaf preserva o ra que recebeu. Reservar antes de escrever; manter sp alinhado a 16 bytes; restaurar em todos os retornos.
- [Uniciclo](../datapath-controlo/): lw escreve dado da memória; sw escreve rs2; R escreve ALU; beq só muda PC. $PCSrc=Branch\land Zero$. X só em escolhas cujo valor não se usa.
- [Multiciclo](../cpu-multiciclo/): lw=5, sw=4, R=4, beq=3 ciclos neste modelo. Contar execuções e expansões, incluindo testes finais. PC já avançado exige conservar PC da instrução ou compensar d−4 no branch.
- [Desempenho](../desempenho/): $T=N\,CPI/f$, $CPI=\sum p_iCPI_i$ com frações de instruções; $S=T_{antigo}/T_{novo}$. Amdahl: $S=1/(1-p+p/s)$ com p fração do tempo original; máximo $1/(1-p)$.
