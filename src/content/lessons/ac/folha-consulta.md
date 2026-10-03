---
title: Cheat sheet de AC
description: Fórmulas, notação RV32 e condições dos modelos, para consulta breve.
section: recursos
studyKind: revision
editorial:
  basedOn: 2024/25
  sources:
    - title: Resumos AC, SofiaViP
      url: https://drive.google.com/file/d/1w3hVKtinpSiDUPF_TP7Wrm9CirnsU2nN/view
    - title: Moodle AC 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=4594
---

Consulta depois de perceberes cada modelo. Cada linha indica a condição que decide a conta.

## RV32

- 32 registos inteiros de 32 bits; `zero` é sempre 0. `t0…t6` e `a0…a7` podem mudar numa chamada; o chamado repõe `s0…s11`. `ra` guarda retorno; `sp` é reposto e mantém alinhamento 16 bytes.
- Palavra 4 B: `lw/sw`. Bytes: `lb/lbu/sb`; meias palavras: `lh/lhu/sh`. `lb/lh` estendem o sinal; `lbu/lhu` preenchem com zeros. Endereço de `lw rd,k(rs1)` = `rs1+k`, em bytes. Little endian guarda byte baixo no menor endereço.
- Imediato I/S: 12 bits com sinal. `lui` forma parte alta; `addi` baixo negativo exige compensação na alta. `mv rd,rs` = `addi rd,rs,0`; pseudoinstruções podem expandir-se.
- `jal` guarda PC+4; `jalr` salta para `(base+imm)&~1`. Branch usa PC da própria instrução + deslocamento com sinal em bytes. `blt/bge` com sinal; `bltu/bgeu` sem sinal.
- R: `funct7 rs2 rs1 funct3 rd opcode`; larguras 7,5,5,3,5,7. I: `imm12 rs1 funct3 rd opcode`. S divide imediato em bits 11:5 e 4:0; B reordena imediato e omite bit 0.

## Desempenho

$$\begin{aligned}T&=N\,CPI/f\\CPI&=\sum_i p_iCPI_i\\S&=T_{\rm antes}/T_{\rm depois}\end{aligned}$$

$1\ \mathrm{GHz}\leftrightarrow1\ \mathrm{ns}$. Frações $p_i$ contam instruções; frações de Amdahl contam **tempo original**.

$$S=\frac1{(1-p)+p/s}.$$

Ganho de rapidez: $S-1$; redução do tempo: $1-1/S$. MIPS ou frequência isolados não comparam a mesma tarefa.

## Cache

$C$ bytes de dados, $B$ bytes/linha, $A$ vias, $S=C/(BA)$ conjuntos. Para $B$ e $S$ potências de 2: offset $b=\log_2B$; índice $s=\log_2S$; tag $t=n-b-s$.

$$\begin{aligned}\text{bloco}&=\lfloor \text{endereço}/B\rfloor\\\text{índice}&=\text{bloco}\bmod S\\\text{tag}&=\lfloor \text{bloco}/S\rfloor\end{aligned}$$

Bits físicos: linhas × (8×B + tag + validade + dirty se WB), mais política se pedida. Acerto exige validade e etiqueta iguais. LRU atualiza recência nos acertos; FIFO conserva chegada.

| Caso       | WT/no-allocate              | WB/allocate                                        |
| ---------- | --------------------------- | -------------------------------------------------- |
| Read miss  | Carregar linha              | Descarregar vítima V 1, D 1; carregar; D 0         |
| Write hit  | Cache + nível seguinte      | Cache; D 1                                         |
| Write miss | Nível seguinte; cache igual | Descarregar vítima V 1, D 1; instalar/alterar; D 1 |

Escrita parcial normalmente exige carregar bytes restantes; escrita de **linha inteira** pode dispensar leitura. Vítima usa etiqueta **antiga**. Dirty não significa inválido.

$$\begin{aligned}TMAM&=t_h+mp\\CPI&=CPI_b+m_Ip_I+r\,m_Dp_D\end{aligned}$$

$r$: acessos a dados/instrução. Unificada: acessos/instrução = $1+r$. L2 local mede falhas entre consultas a L2; global = $m_1m_{2,l}$.

$$TMAM=t_1+m_1(t_2+m_{2,l}p_R).$$

Penalidades adicionais, faltas sem sobreposição e esperas ainda não incluídas no CPI de base.

## Pipeline e ILP

IF→ID→EX→MEM→WB. Período = máximo atraso de fase + registo, se fornecido. $N$ instruções, $k$ fases: ciclos $N+k-1+B$.

- ALU→ALU imediato: atalho EX/MEM→EX. Load→ALU imediato: 1 paragem com atalhos completos; sem atalhos, 2 se WB-primeiro/ID-depois.
- Store usa base em EX e dado em MEM; caminho de forwarding determina a paragem. Resultado mais recente tem prioridade; destino zero nunca produz dependência útil.
- Branch MEM: erro 3 ciclos; ID: erro 1, com possíveis paragens de operandos em ID. $CPI=CPI_b+bep$, erro $e=1-\text{acerto}$.
- 1 bit prevê último resultado. Histerese 2 bits: 01+T→11,10+N→00. Saturante: 01+T→10,10+N→01. Ambos preveem N em 00/01, T em 10/11. Segue a máquina fornecida.
- RAW: produzir antes de ler; WAR: ler antes de nova escrita; WAW: preservar última escrita. RAR não restringe. Memória exige considerar endereços.
- Unidade: duração $L$, intervalo de início $I$; $n$ operações independentes ocupam $L+(n-1)I$ ciclos. IPC=instruções/ciclos; CPI=1/IPC.
- Tomasulo: capturar origens V/Q, **depois** renomear destino Qi. Executar com Qj=Qk=0 e unidade livre. CDB entrega tag/valor; atualizar registo só se Qi=tag. Estação ocupa-se até difundir; confirmar em ordem exige mecanismo adicional.

## SIMD empacotado

RV32: B0=bits 7:0, B3=31:24; H0=15:0, H1=31:16. ADD8/16 e SUB8/16 reduzem por via, sem carry entre vias. Comparação verdadeira=0xFF/0xFFFF; escolhe signed/unsigned.

SMUL16: dois produtos 32 bits em par físico par/seguinte; SMULX16 cruza vias. PKBT16=(a.H0, b.H1), primeira parcela na metade alta. Replicar byte: mascarar antes de shifts. Contadores 8 bits dão wrap a 256; `abs(−32768)` não cabe em 16 bits com sinal; KABS16 satura em 32767. KMDA satura no caso `0x80008000 × 0x80008000`. Verifica zero, resto, alinhamento e largura de acumulação.

## Multicore e coerência

$$\begin{aligned}E&=P\Delta t\\T_j&=T_a+P R_\theta\\P_{\rm din}&\propto\alpha C V^2f\end{aligned}$$

Com $V\propto f$, $P\propto f^3$; com V fixa, $P\propto f$. Paralelo ideal: $S_n=1/(s+(1-s)/n)$. Tempo de partições iguais em rapidez depende de $\max w_i$. Redução com n participantes, sendo n uma potência de 2: $\log_2n$ rondas, além das somas locais/barreiras.

Write-invalidate invalida a **linha inteira**. Leitura de outro dado na linha pode causar falsa partilha. Coerência por endereço não substitui ordenação/sincronização entre endereços.

## Entrada, saída e armazenamento

- Polling: consultas/s × ciclos/consulta / frequência = fração CPU. Intervalo máximo ideal de um buffer $B/R$, sem margem de serviço.
- Interrupções: eventos/s × ciclos/evento / frequência. DMA: $u=(R/B)c/f$; usa taxa agregada e custo setup+fim. Saída exige clean de dirty se não há coerência; entrada precisa evitar cópias antigas e write-back posterior.
- HDD: fila + procura + rotação + transferência + controlador. Rotação média $30/RPM$ segundos. Transferência $B/R$.
- Taxa máxima = mínimo dos limites CPU, bus, controladores, discos, na mesma unidade. MB=10⁶B; MiB=2²⁰B; KiB=1024 B.
- Dois buffers e estágios independentes, $n\ge1$, incluindo enchimento e esvaziamento:

$$T_n=t_D+t_C+(n-1)\max(t_D,t_C).$$
