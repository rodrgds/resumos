---
title: Cheat sheet de AC
description: Fórmulas, notação RV32 e condições dos modelos, para consulta breve.
section: recursos
studyKind: revision
editorial:
  basedOn: 2024/25
  sources:
    - title: Moodle AC 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=4594
---

Fórmulas e condições para consultar depois de resolver os exemplos das lições. Cada linha vale nas condições da lição ligada.

## RV32

| Tema      | Regra                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registos  | `x0` zero; `x1` ra; `x2` sp, repor e alinhar 16; `t` temporários; `a` argumentos e retorno; `s` preservados pelo chamado                                                     |
| Memória   | Endereços em bytes. `lw/sw` 4 B; `lb/lh` estendem sinal; `lbu/lhu` zeros. `vetor[i]` de elementos de 4 bytes em `base+4i`. Little endian                                     |
| Imediatos | I/S 12 bits com sinal. `lui` + `addi` baixo negativo compensam a alta                                                                                                        |
| Saltos    | `jal`/`jalr` guardam PC+4; `jalr` salta para `(base+imm)&~1`. Branch: PC próprio + deslocamento em bytes. `blt/bge` com sinal                                                |
| Formatos  | R `funct7 rs2 rs1 funct3 rd opcode`; I `imm12 rs1 funct3 rd opcode`; S parte o imediato; B/J reordenam, bit 0 implícito                                                      |
| FP        | `.s` 32 bits, `.d` 64 bits. `flw` copia, `fcvt` converte. Simples em memória, cálculo duplo: `flw`, `fcvt.d.s`, `fadd.d`, avanço 4 B, divisor `fcvt.d.w`, retorno `fcvt.s.d` |
| Pilha     | Pico soma os tamanhos dos frames ativos; com tamanhos iguais, ativos × tamanho. Caso base conta se reservar antes de testar                                                  |

[Assembly](/cadeiras/ac/riscv-assembly/) · [Recursão](/cadeiras/ac/riscv-assembly/#profundidade-da-pilha-na-recursão)

## Desempenho

$$T=N\,CPI/f,\qquad CPI=\sum_i p_iCPI_i,\qquad S=\frac{T_{\rm antes}}{T_{\rm depois}}=\frac{1}{(1-p)+p/s}.$$

$p_i$ é a fração de instruções da classe $i$; $p$ de Amdahl é a fração do **tempo original** que melhora. Ganho $S-1$; redução $1-1/S$. MIPS e frequência isolados não comparam tarefas.

[Desempenho](/cadeiras/ac/desempenho/) · [Amdahl](/cadeiras/ac/desempenho/#a-lei-de-amdahl)

## Cache

$C$ capacidade de dados em bytes, $B$ bytes por bloco, $A$ vias por conjunto, $S$ número de conjuntos, $E$ endereço em bytes.

$$S=C/(BA),\qquad \text{bloco}=E//B,\quad \text{índice}=\text{bloco}\bmod S,\quad \text{tag}=\text{bloco}//S.$$

| Caso       | WT/no-allocate   | WB/allocate                            |
| ---------- | ---------------- | -------------------------------------- |
| Read hit   | Cache            | Cache                                  |
| Read miss  | Carrega          | Descarrega vítima dirty; carrega limpa |
| Write hit  | Cache + seguinte | Cache, dirty                           |
| Write miss | Só seguinte      | Descarrega dirty; instala e altera     |

Acerto exige entrada válida com etiqueta igual à pedida. LRU atualiza em acertos, FIFO não. Escrita parcial lê restantes bytes; no modelo adotado, linha inteira dispensa. Vítima usa etiqueta **antiga**. Dirty não é inválido.

$$TMAM=t_h+mp$$

$$CPI=CPI_b+m_Ip_I+r\,m_Dp_D$$

$$TMAM=t_1+m_1(t_2+m_{2,l}p_R)$$

$t_h$ tempo de acerto; $m$ taxa de faltas; $p$ penalidade em ciclos. $m_I$/$p_I$ faltas e penalidade de instruções; $m_D$/$p_D$ de dados. $t_1$ acerto em L1; $m_1$ faltas locais de L1; $t_2$ acerto em L2; $m_{2,l}$ faltas locais de L2; $p_R$ penalidade da RAM.

Penalidades adicionais após a falta, sem sobreposição e fora do custo base. $r$ é a fração de instruções com acesso a dados; unificada usa $1+r$. L2 local divide pelos que chegam a L2. Inversa unificada neste modelo (uma obtenção e no máximo um acesso a dados por instrução): $r=CPI_{\rm espera}/(mp)-1$, $0\le r\le1$. Acertos $k$ vezes faltas: $m=1/(k+1)$.

[Hierarquia](/cadeiras/ac/hierarquia-cache/) · [Políticas](/cadeiras/ac/politicas-cache/) · [Inversão](/cadeiras/ac/politicas-cache/#recuperar-a-mistura-a-partir-das-esperas)

## Pipeline e saltos

IF, ID, EX, MEM, WB. Período $T$ = maior atraso de fase (+ registo). Para $k$ fases e $N$ instruções sem paragens, no modelo da lição:

$$T_{\rm conj}=(N+k-1)T;\qquad \text{latência}=kT.$$

| Situação | Custo                                                                       |
| -------- | --------------------------------------------------------------------------- |
| ALU→ALU  | Atalho, sem paragem                                                         |
| Load→ALU | 1 bolha com forwarding; 2 sem (WB-primeiro/ID-depois), no modelo de 5 fases |
| Store    | Base em EX, dado em MEM; segue o caminho disponível                         |
| Erro MEM | 3 ciclos; erro ID, 1 + paragens de operandos                                |
| Branch   | $CPI=CPI_b+bep$; $e=1-\text{acerto}$                                        |

Histerese: 01+T→11, 10+N→00. Saturante: 01+T→10, 10+N→01. Ambas preveem N em 00/01, T em 10/11. Segue a máquina fornecida; prevê antes de atualizar.

[Percurso](/cadeiras/ac/percurso-dados/) · [Pipeline](/cadeiras/ac/pipeline/) · [Predição](/cadeiras/ac/predicao-saltos/)

## ILP e Tomasulo

RAW transporta valor; WAR/WAW saem com renomeação. Memória depende de endereços. Nesta via dupla (uma ALU e uma memória), duas operações de memória não emitem juntas. Unidade com duração $L$ e intervalo $I$: $C=L+(n-1)I$. $IPC=N/C$.

Tomasulo no modelo da lição, por instrução:

- **Emite:** lê as origens (valor se Qi=0, etiqueta se Qi≠0) e só depois renomeia o destino com a etiqueta da estação. Cada estação guarda uma instrução.
- **Executa:** começa quando Qj=Qk=0, no ciclo seguinte à emissão ou à receção do último operando.
- **Difunde:** o CDB entrega um par etiqueta/valor por ciclo, com prioridade à instrução mais antiga. O registo aceita o valor se o seu Qi ainda for essa etiqueta.

Confirmar em ordem exige reorder buffer.

[ILP](/cadeiras/ac/superescalar/) · [Tomasulo](/cadeiras/ac/tomasulo/)

## SIMD empacotado

RV32, B0/H0 vias baixas. ADD/SUB por via, sem carry. Comparação verdadeira = via toda a 1; escolhe signed/unsigned. Deslocamentos lógicos introduzem zeros; aritméticos à direita replicam o sinal de cada via. Posições: 3 bits para 8, 4 para 16.

| Par    | H1 recebe | H0 recebe |
| ------ | --------- | --------- |
| PKBB16 | a.H0      | b.H0      |
| PKTT16 | a.H1      | b.H1      |
| PKBT16 | a.H0      | b.H1      |
| PKTB16 | a.H1      | b.H0      |

- SMUL16: H0xH0 no registo baixo do par, H1xH1 no alto. SMULX16 cruza H0xH1 e H1xH0.
- KMDA soma os dois produtos e satura: com a=b=`0x80008000`, cada produto vale $2^{30}$ e a soma $2^{31}$ satura em `0x7FFFFFFF`.
- Replicar byte: mascara antes de shifts. Contadores de 8 bits voltam a 0 após 256.
- $|{-32768}|$ não cabe em 16 bits com sinal; KABS16 satura em 32767 com overflow assinalado.

[SIMD](/cadeiras/ac/simd/) · [Programar](/cadeiras/ac/programar-simd/)

## Energia, coerência, E/S

$$E=P\Delta t$$

$$T_j=T_a+PR_{\theta}$$

$$P_{\rm din}\propto\alpha CV^2f$$

$$S_n=\frac{1}{s+(1-s)/n}$$

$E$ energia; $P$ potência; $\Delta t$ duração. $T_j$ temperatura da junção; $T_a$ ambiente; $R_{\theta}$ resistência térmica. $P_{\rm din}$ potência de comutação, com atividade $\alpha$, capacidade $C$, tensão $V$ e frequência $f$; exclui a estática. $S_n$ rapidez com $n$ núcleos; $s$ fração serial do tempo original.

- Com $V$ fixa, $P\propto f$; só com $V\propto f$ vale $P\propto f^3$.
- Tempo de partições segue $\max w_i$. Redução: caminho crítico, não rondas.

Write-invalidate invalida a **linha inteira**. Falsa partilha gera tráfego, sem alterar resultados. Coerência não ordena posições diferentes nem torna incrementos atómicos.

- Polling: consulta de $C$ ciclos a cada $P$ ciclos; fração do CPU $C/P$.
- Interrupções: compara $q_pc_p$ ciclos/s do polling com $uq_{\max}c_i$ das interrupções ($q$ consultas, $c$ custo, $u$ fração com dados).
- DMA: $R$ taxa em bytes/s, $B$ bytes por bloco, $c$ ciclos de preparação e conclusão por transferência, $f$ frequência do CPU; fração do CPU $u=Rc/(Bf)$ e bloco mínimo $B\ge Rc/(u_{\max}f)$.
- Em DMA não coerente, a saída exige clean das linhas dirty relevantes; a entrada invalida cópias antigas e impede que dirty velhas voltem a escrever por cima.
- Mensagem sem sobreposição: tempo $t(B)=t_{\rm fixo}+B/R$, com $t_{\rm fixo}$ custo de preparação e conclusão e $R$ taxa.

HDD: fila + procura + rotação ($30/RPM$ s média) + transferência + controlador. MB $10^6$, KiB 1024. Taxa máxima = mínimo dos limites. Dois buffers: $T_n=t_D+t_C+(n-1)\max(t_D,t_C)$, com $t_D$ tempo de disco e $t_C$ tempo de cálculo por bloco.

[Multicore](/cadeiras/ac/multicore-energia/) · [Coerência](/cadeiras/ac/coerencia/) · [E/S](/cadeiras/ac/entrada-saida/) · [Armazenamento](/cadeiras/ac/armazenamento/)
