---
title: Folha de consulta de AC
description: Fórmulas e condições para rever ISA, desempenho, pipeline, memória e entrada e saída.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AC, SofiaViP
      url: https://drive.google.com/file/d/1w3hVKtinpSiDUPF_TP7Wrm9CirnsU2nN/view
  coverage: Consulta breve das páginas 2 a 15 dos Resumos AC de SofiaViP, mantendo explícito o contexto AArch64, LEGv8 e NEON do documento.
  gaps:
    - O documento não identifica uma edição atual da cadeira; confirma a ISA, o programa e a avaliação da tua ocorrência.
    - Esta folha omite codificações de instruções, programas completos, diagramas temporais e exemplos longos; segue os links para as explicações.
---

Esta folha condensa os [Resumos AC de SofiaViP](https://drive.google.com/file/d/1w3hVKtinpSiDUPF_TP7Wrm9CirnsU2nN/view). **A fonte usa AArch64 e LEGv8, com NEON para SIMD.** As páginas de assembly deste site usam RISC-V. Compara as ideias de ISA, pilha e memória, mas não transportes nomes de registos, instruções ou convenções de chamada entre arquiteturas.

## ISA, registos e memória

- Uma **ISA** define a interface visível ao programa: instruções, registos, endereçamento e comportamento. A mesma ISA pode ter processadores com CPI, caches e custo diferentes. [Ver a ISA usada nas lições](/cadeiras/ac/riscv-assembly/#os-registos-que-interessam).
- Na parte **AArch64** da fonte, endereços e registos gerais têm 64 bits e as instruções têm 32 bits. `Xn` nomeia o registo de 64 bits; `Wn`, os seus 32 bits baixos. `XZR/WZR` lê como zero e descarta escritas. `SP` é o apontador da pilha; `X30` costuma guardar o endereço de retorno e `X29` pode servir de apontador de frame. O resumo também usa **LEGv8**, uma ISA didática: confirma a notação de cada exercício antes de escrever código.
- `N`, `Z`, `C` e `V` indicam, respetivamente, resultado negativo, zero, carry e overflow assinado quando a instrução atualiza as flags. **Carry sem sinal não é overflow com sinal.** Um salto condicional deve testar as flags produzidas pela comparação certa.
- A memória é endereçada por **byte**. Um acesso pode usar base, base mais deslocamento, índice escalado ou atualização da base antes/depois do acesso, conforme a instrução. O deslocamento é em bytes; indexar um vetor de palavras exige multiplicar o índice pelo tamanho de cada palavra. [Rever endereços e acessos](/cadeiras/ac/riscv-assembly/#contas-imediatos-e-memória).
- Na convenção AArch64 descrita, argumentos inteiros iniciais passam por `X0` a `X7`; valores de retorno usam `X0` e, quando necessário, `X1`. Registos que a convenção manda preservar devem ser repostos antes de voltar. A pilha cresce para endereços menores. Em RISC-V, consulta a [convenção própria](/cadeiras/ac/riscv-assembly/#chamadas-e-a-pilha).

## SIMD e vírgula flutuante

Os registos vetoriais **NEON** da fonte têm 128 bits e podem ser divididos em várias _lanes_ de 8, 16, 32 ou 64 bits. Uma instrução SIMD aplica a mesma operação a várias lanes; o número de lanes úteis depende do tipo e da largura dos dados. Operações saturadas param no mínimo ou máximo representável, ao contrário de operações que descartam bits excedentes. Comparações vetoriais produzem máscaras, não as flags escalares `NZCV`. [Ver quando SIMD rende](/cadeiras/ac/simd/#quando-rende-e-quando-não-rende).

Valores de vírgula flutuante podem usar 16, 32 ou 64 bits; a precisão e o intervalo variam. Os registos de vírgula flutuante e vetoriais partilham o banco físico referido na fonte. A convenção para passar argumentos flutuantes é distinta da dos inteiros, por isso não deduzas o registo só pela posição do argumento.

## Medir desempenho

$$
T_{\mathrm{CPU}}=\mathrm{IC}\times\mathrm{CPI}\times T_{\mathrm{ciclo}}
=\frac{\mathrm{IC}\times\mathrm{CPI}}{f_{\mathrm{clk}}}
$$

Aqui, $\mathrm{IC}$ é o número de instruções executadas, $\mathrm{CPI}$ os ciclos médios por instrução, $T_{\mathrm{ciclo}}$ a duração de um ciclo e $f_{\mathrm{clk}}$ a frequência do relógio. Para misturas de instruções, $\mathrm{CPI}_{\mathrm{med}}=\sum_i p_i\mathrm{CPI}_i$, com $p_i$ a fração de instruções da classe $i$. **MIPS ou frequência isolados não medem o tempo da mesma tarefa.** Speedup é $T_{\mathrm{antes}}/T_{\mathrm{depois}}$. [Ver a equação e o CPI](/cadeiras/ac/desempenho/#a-equação-do-processador).

Se a fração $f$ do tempo original **não** pode ser acelerada e o resto acelera por fator $p$, a lei de Amdahl dá $S\le 1/(f+(1-f)/p)$. Quando $p\to\infty$, o limite é $1/f$. A fração tem de ser medida no **tempo original**, não na contagem de linhas de código. [Ver Amdahl](/cadeiras/ac/desempenho/#a-lei-de-amdahl).

## Pipeline e paralelismo

Uma pipeline didática de cinco fases usa **IF, ID, EX, MEM, WB**. Depois de cheia, pode concluir uma instrução por ciclo, embora a **latência** de cada instrução atravesse várias fases. O objetivo é aumentar a taxa de conclusão; o CPI efetivo sobe com paragens. [Ver as fases](/cadeiras/ac/pipeline/#as-cinco-fases).

| Hazard     | Causa e resposta                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estrutural | Duas instruções precisam do mesmo recurso; duplica o recurso ou espera.                                                                             |
| Dados      | Uma instrução lê um resultado ainda não disponível; _forwarding_ resolve alguns casos, mas um `load` seguido de uso imediato pode exigir uma bolha. |
| Controlo   | O salto muda o próximo PC; previsão e resolução mais cedo reduzem a penalização, mas uma previsão errada descarta trabalho.                         |

Uma pipeline mais profunda pode elevar a frequência, mas aumenta o custo de alguns hazards. A emissão **superescalar** tenta iniciar várias instruções por ciclo; dependências verdadeiras de dados, limites de recursos e saltos restringem o paralelismo. Execução fora de ordem pode avançar instruções independentes, mantendo a confirmação arquitetural em ordem. [Ver hazards](/cadeiras/ac/pipeline/#hazards-de-dados) e [emissão múltipla](/cadeiras/ac/superescalar/#emissão-múltipla).

## Cache e memória virtual

- A hierarquia explora **localidade temporal** (voltar a usar um dado) e **espacial** (usar endereços próximos). Um bloco é a unidade transferida entre níveis; um _hit_ encontra-o na cache, um _miss_ procura-o no nível seguinte. [Ver localidade](/cadeiras/ac/hierarquia-cache/#localidade).
- Mapeamento **direto** dá um único lugar a cada bloco. Associação total permite qualquer entrada; associação por conjuntos restringe o bloco a um conjunto, com várias vias possíveis. Mais vias reduzem misses por **conflito**, mas não os **compulsórios** nem os de **capacidade**. A política de substituição e o tempo de procura também contam. [Ver o mapeamento](/cadeiras/ac/hierarquia-cache/#onde-cabe-cada-bloco).
- $\mathrm{AMAT}=t_{\mathrm{hit}}+r_{\mathrm{miss}}\,t_{\mathrm{miss}}$, onde $t_{\mathrm{miss}}$ é a penalização por falta. Em dois níveis, a penalização de L1 inclui o acesso a L2 e, se L2 falhar, a memória principal. Para estimar CPI, multiplica a taxa de misses pelo número de acessos por instrução e pela penalização em ciclos; não somes duas vezes a mesma espera. [Ver AMAT](/cadeiras/ac/hierarquia-cache/#quanto-custa-cada-acesso-o-amat).
- A **memória virtual** traduz páginas virtuais para _frames_ físicos por tabelas de páginas; um _page fault_ pode exigir trazer uma página do armazenamento secundário. Uma falha de cache e um _page fault_ são eventos de níveis e custos diferentes.

## Vários núcleos e entrada e saída

Em multiprocessadores, speedup $S(p)=T(1)/T(p)$ inclui comunicação e sincronização. **Paralelismo** é execução simultânea; **concorrência** é organizar tarefas que podem progredir sem ordem fixa, mesmo num núcleo. Se vários núcleos têm caches privadas, **coerência** trata o valor que uma leitura pode obter perante escritas noutros núcleos; não substitui sincronização para ordenar operações do programa. [Ver o SMP](/cadeiras/ac/multicore-energia/#o-multiprocessador-simétrico).

| Método de E/S | Quando faz sentido                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Polling       | O processador consulta repetidamente o estado; simples, mas gasta ciclos enquanto espera.            |
| Interrupção   | O periférico avisa quando há trabalho ou erro; há custo de tratar cada interrupção.                  |
| DMA           | Um controlador transfere blocos sem instrução do CPU por byte; é preciso coordenar buffers e caches. |

Num disco rotativo, estima um acesso por **busca + latência de rotação + transferência + controlo**. Não apliques esta decomposição mecânica a SSDs. [Ver E/S](/cadeiras/ac/entrada-saida/#estimar-desempenho-com-es).
