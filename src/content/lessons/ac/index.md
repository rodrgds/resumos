---
title: Arquitetura de Computadores
description: RV32, caches, pipeline, Tomasulo, SIMD empacotado, multiprocessadores e entrada e saída.
editorial:
  basedOn: 2024/25
  sources:
    - title: Moodle AC 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=4594
    - title: RISC-V ABI
      url: https://riscv-non-isa.github.io/riscv-elf-psabi-doc/
    - title: Proposta histórica de SIMD empacotado RISC-V
      url: https://github.com/riscv/riscv-p-spec/blob/master/old-doc/P-ext-proposal.adoc
  gaps:
    - A ficha SIGARRA de 2026/27 ainda não publica programa nem avaliação.
    - Não foram consultados materiais Moodle de 2026/27.
    - Os testes e questionários fechados não foram iniciados nem consultados como tentativas.
---

No fim vais ler um fragmento RV32 e prever o seu custo: que endereços de cache toca, quantos ciclos de pipeline ocupa e onde o paralelismo ajuda ou bloqueia. Ou seja, vais ligar a instrução ao tempo que ela demora, porque a organização do processador e da memória decide esse tempo.

Começa por [Assembly RISC-V](/cadeiras/ac/riscv-assembly/) e [Desempenho](/cadeiras/ac/desempenho/), porque tudo o resto mede instruções e ciclos. Depois segue a ordem do percurso abaixo, com um exercício previsto antes de abrires cada resolução. Guarda a [cheat sheet](/cadeiras/ac/folha-consulta/) para consulta depois de perceberes cada modelo.

## Percurso de estudo

Começa por [Assembly RISC-V](/cadeiras/ac/riscv-assembly/) e [Desempenho](/cadeiras/ac/desempenho/). Depois segue [Hierarquia e caches](/cadeiras/ac/hierarquia-cache/) e [Políticas de cache](/cadeiras/ac/politicas-cache/): separa endereços, simula cada acesso e calcula o custo da memória.

[Percurso de dados](/cadeiras/ac/percurso-dados/), [Pipeline](/cadeiras/ac/pipeline/) e [Predição de saltos](/cadeiras/ac/predicao-saltos/) explicam controlo, atalhos, paragens e escolha do caminho. [Paralelismo ao nível de instruções](/cadeiras/ac/superescalar/) e [Tomasulo](/cadeiras/ac/tomasulo/) passam às unidades múltiplas e ao sequenciamento dinâmico.

[SIMD](/cadeiras/ac/simd/) e [Programar com SIMD](/cadeiras/ac/programar-simd/) usam bytes e meias palavras empacotados. [Multicore e energia](/cadeiras/ac/multicore-energia/) e [Coerência](/cadeiras/ac/coerencia/) tratam potência, divisão do trabalho e memória partilhada. [Entrada e saída](/cadeiras/ac/entrada-saida/) e [Armazenamento](/cadeiras/ac/armazenamento/) fecham o percurso com controladores, DMA e limites de taxa.

Os exercícios estão no fim de cada tema, com pistas e resolução. Prevê o resultado antes de os abrir: um estado de cache, uma tabela por ciclo ou uma justificação de dependências é parte da resposta. A [cheat sheet](/cadeiras/ac/folha-consulta/) serve para consultar fórmulas e condições depois de compreender o percurso.

## Fontes e edição

:::details[Ver base, bibliografia e vídeos]
A base são os materiais da [disciplina no Moodle de 2024/25](https://moodle2425.up.pt/course/view.php?id=4594): sete apresentações teóricas, seis fichas com soluções, resumos WT/WB, cartão de instruções e soluções ILP em folha de cálculo. A ficha de periféricos identifica 2023/24 e foi reutilizada nessa disciplina. As duas apresentações de FSC sobre RV32 e implementação do CPU datam de novembro e dezembro de 2022.

Estes materiais usam RV32 e operações SIMD empacotadas de uma versão histórica da proposta P. Não se devem misturar com AArch64/NEON de apontamentos de outras edições, nem com RVV, a extensão de registos vetoriais. A proposta P atual também evoluiu: as mnemónicas destas lições seguem o modelo dos materiais, conferido com a [proposta histórica](https://github.com/riscv/riscv-p-spec/blob/master/old-doc/P-ext-proposal.adoc). O preditor de dois bits da apresentação de pipeline usa uma máquina de histerese; a lição distingue-a do contador saturante.

As soluções foram usadas para compreender os modelos, com contas e exemplos próprios conferidos antes da redação. Quando o cartão de instruções e as apresentações divergem, as operações foram conferidas na especificação, incluindo STAS16/STSA16 e saturação de KMDA.

Bibliografia indicada nos materiais: Patterson e Hennessy, _Computer Organization and Design, RISC-V Edition_, 2.ª edição, 2021. A ficha [SIGARRA de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560091) também indica _Memory Systems: Cache, DRAM, Disk_, de Jacob, Ng e Wang. A [ficha de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586985), consultada a 3 de outubro de 2026, está ativa mas ainda não publica programa nem avaliação. Os materiais Moodle de 2026/27 não foram consultados. A bibliografia e os modelos abaixo continuam, por isso, ligados às edições identificadas, sem presumir as regras do ano atual.

Referências complementares: [especificação RV32I](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) e [extensão M](https://docs.riscv.org/reference/isa/v20260120/unpriv/m-st-ext.html), para operações e codificação; [ABI RISC-V](https://riscv-non-isa.github.io/riscv-elf-psabi-doc/), para nomes de registos e chamadas; [RARS](https://github.com/TheThirdOne/rars), para executar os exemplos RV32 base. Os blocos de semântica SIMD calculam vias em Python, pois o executável RV32 base não monta essas instruções empacotadas.

O Moodle também recomenda [a otimização SGEMM de Zhao Dongyu](https://medium.com/@zhaodongyu/optimize-sgemm-on-risc-v-platform-b0098630b444), com localidade e blocagem, e [Cooling Chips Still A Top Challenge](https://semiengineering.com/cooling-chips-still-a-top-challenge/), sobre dissipação térmica. O primeiro usa RVV 0.7.1 nas versões vetoriais, um contexto distinto dos exercícios packed SIMD. Os vídeos portugueses [Varrimento](https://www.youtube.com/watch?v=4nxblx4ADQ8) e [Interrupções](https://www.youtube.com/watch?v=DBVVpybCXcU) acompanham a lição de entrada e saída.
:::

## Avaliação

:::details[Ver regras da edição 2024/25]
A apresentação de 2024/25 descreve dois testes em computador, T1 e T2, com escolha múltipla e respostas curtas, e nota final `(T1+T2)/2`. Indica até três faltas às aulas teórico-práticas e regras específicas de frequência. São regras **dessa edição**: confirma no teu Moodle e na ficha SIGARRA a avaliação, datas e condições que te são aplicáveis.

Os testes e questionários fechados não foram iniciados. As lições e exercícios desenvolvem os assuntos e tipos de raciocínio das fichas disponíveis; não permitem afirmar que todas as perguntas de exames fechados foram revistas.
:::
