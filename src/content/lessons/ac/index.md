---
title: Arquitetura de Computadores
description: Desempenho, RISC-V, caches, pipeline, predição de saltos, SIMD, superescalares, multicore e entrada/saída.
---

AC é a cadeira onde percebes por que é que um programa corre depressa numa máquina e devagar noutra, mesmo quando ambas executam as mesmas instruções. Depois de FSC te mostrar como um processador executa uma instrução de cada vez, aqui aprendes as técnicas que os processadores reais usam para executar mais em menos tempo: hierarquia de memória, pipeline, predição de saltos, paralelismo explícito e vários núcleos.

## Como está organizado

Começa por [Assembly RISC-V](riscv-assembly/), que troca o LEGv8 de FSC pelo conjunto de instruções desta cadeira e te dá a linguagem para ler os exemplos seguintes. Depois, [Desempenho](desempenho/) fixa como medir velocidade: tempo de execução, CPI e lei de Amdahl. Estas duas páginas são a base de tudo o resto.

A segunda parte trata da memória: [Hierarquia e caches](hierarquia-cache/) mostra como uma memória pequena e rápida esconde a lentidão da memória grande. A terceira parte trata do paralelismo ao nível das instruções: [Pipeline](pipeline/) põe várias instruções em voo ao mesmo tempo, [Predição de saltos](predicao-saltos/) evita deitar trabalho fora a cada desvio e [SIMD](simd/) aplica a mesma operação a vários dados de uma só vez.

A última parte alarga o horizonte: [Superescalares](superescalar/) emitem várias instruções por ciclo e reordenam-nas em hardware, [Multicore e energia](multicore-energia/) explica por que os processadores ganharam núcleos em vez de gigahertz e [Entrada e saída](entrada-saida/) liga o processador a periféricos e ao armazenamento, com polling, interrupções e DMA.

## Como estudar

Lê cada página com papel ao lado e refaz as contas do exemplo principal. Em AC, quase todas as perguntas de teste são contas: frações de endereços em caches, ciclos de stalls num pipeline, speedups pela lei de Amdahl. O método é sempre o mesmo: identifica os parâmetros (taxa de faltas, penalidade, frequência de saltos), escolhe a fórmula e interpreta o resultado. Treina até cada fórmula sair do enunciado sem hesitação.

Para o assembly, usa o WebRISC-V ou o qtrvsim e corre cada exemplo. Muda os valores dos registos, prevê o resultado antes de correres e confirma depois.

## Avaliação

A forma de avaliação muda de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes o número de testes, as datas e as regras do recurso.

## Fontes e âmbito

Estas páginas seguem o programa oficial da unidade curricular L.EIC006, Arquitetura de Computadores, no ano letivo de 2025/26: plataformas computacionais e desenho para desempenho; organizações de memórias cache e o seu impacto no desempenho; paralelismo ao nível das instruções com pipeline, gestão de dependências de dados e de controlo e predição de saltos; instruções SIMD e vetoriais; arquiteturas superescalares com emissão múltipla e execução fora de ordem; limitações dos processadores de núcleo único em frequência e potência; organização básica de processadores multicore; interface com periféricos por varrimento, interrupções e DMA; subsistemas de armazenamento e estimação de desempenho com atividade de entrada e saída significativa.

Material oficial da FEUP:

- Ficha da unidade curricular L.EIC006, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560091).
- Página da disciplina no Moodle, indicada na ficha oficial (o acesso aos materiais requer inscrição).

Os livros de referência da cadeira são _Computer Organization and Design, versão RISC-V_, de Patterson e Hennessy, e _Memory Systems: Cache, DRAM, Disk_, de Jacob, Ng e Wang. Os simuladores usados nos trabalhos são o [WebRISC-V](https://webriscv.org/) e o [qtrvsim](https://github.com/cvut/qtrvsim).
