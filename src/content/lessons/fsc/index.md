---
title: Fundamentos de Sistemas Computacionais
description: Representação digital, lógica, memórias, programação RISC-V e construção de um CPU.
---

FSC liga os bits de um número às instruções que um processador executa. Primeiro escolhemos representações e construímos circuitos para calcular e guardar dados. Depois programamos em RISC-V e seguimos uma instrução através do CPU.

## Percurso de estudo

A sequência começa em [sistemas digitais](sistemas-digitais/) e [bases de numeração](representacao-dados/). Seguem-se [inteiros](inteiros-complemento-dois/), [vírgula fixa](virgula-fixa/), [vírgula flutuante](virgula-flutuante/) e [texto e imagens](texto-imagens/).

Nos circuitos, passa de [expressões booleanas](algebra-boole-portas/) para [Karnaugh](karnaugh/), [módulos combinatórios](circuitos-combinatorios/), [registos e temporização](circuitos-sequenciais/), [máquinas de estados](maquinas-estados/) e [memórias](memorias/). Uma tabela de verdade descreve o resultado; um diagrama temporal explica quando esse resultado pode ser usado.

A parte do computador cobre [organização e memória RISC-V](legv8-registos-memoria/), [instruções e codificação](legv8-instrucoes/), [programação](programacao-riscv/), [procedimentos e pilha](procedimentos-pilha/), [CPU uniciclo](datapath-controlo/), [CPU multiciclo](cpu-multiciclo/) e [desempenho](desempenho/). A [cheat sheet](folha-consulta/) reúne as fórmulas e condições para revisão.

Cada capítulo termina com exercícios originais. Faz primeiro a tentativa, consulta uma pista quando faltar um passo e compara depois o raciocínio com a resolução. Nos programas, altera os dados e prevê a saída antes de executar.

## Edição e avaliação

A base pedagógica é o material dos docentes disponibilizado ao aluno no Moodle de **2024/25**. Essa edição usa **RV32**, com palavras e registos de 32 bits. Dois endereços antigos contêm `legv8` no nome por compatibilidade com ligações publicadas; o seu conteúdo ensina RISC-V.

As provas consultadas incluem o primeiro teste de 15 de novembro de 2024 e o segundo de 24 de janeiro de 2025. Ambos indicam 90 minutos e penalização de 15% da cotação da pergunta nas escolhas erradas. Os exemplos de avaliação incluem conversões, circuitos, formas de onda, memória, assembly, codificação, controlo do CPU e contas de desempenho. Estas regras descrevem aquelas provas, não confirmam a avaliação de outra edição. Consulta a tua página da cadeira para as regras em vigor.

## Fontes e bibliografia

A [ficha de FSC de 2024/25](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=541868) enquadra o programa e a bibliografia. Os recursos do [Moodle FSC 2024/25](https://moodle2425.up.pt/course/view.php?id=5166) podem exigir inscrição. Foram usados os diapositivos e os dois volumes de exercícios de João Canas Ferreira, António José Araújo e Pedro C. Diniz, além das folhas de consulta, listas de matéria e provas disponibilizadas nessa edição:

- [Introdução](https://moodle2425.up.pt/mod/resource/view.php?id=61767), [representação e aritmética](https://moodle2425.up.pt/mod/resource/view.php?id=61768), [circuitos combinatórios](https://moodle2425.up.pt/mod/resource/view.php?id=61769), [circuitos sequenciais](https://moodle2425.up.pt/mod/resource/view.php?id=61771) e [memórias](https://moodle2425.up.pt/mod/resource/view.php?id=61770).
- [Exercícios, volume 1](https://moodle2425.up.pt/mod/resource/view.php?id=71216), revisão de 24 de novembro de 2024, e [volume 2](https://moodle2425.up.pt/mod/resource/view.php?id=102794), revisão de 5 de janeiro de 2025.
- [Conjunto de instruções RISC-V](https://moodle2425.up.pt/mod/resource/view.php?id=102792), [organização do CPU](https://moodle2425.up.pt/mod/resource/view.php?id=109231) e [desempenho](https://moodle2425.up.pt/mod/resource/view.php?id=113934).
- [Folha de instruções](https://moodle2425.up.pt/mod/resource/view.php?id=61680), [folha do CPU](https://moodle2425.up.pt/mod/resource/view.php?id=61681), [matéria do teste 1](https://moodle2425.up.pt/mod/resource/view.php?id=96768) e [matéria do teste 2](https://moodle2425.up.pt/mod/resource/view.php?id=117487).
- [Teste 1 de 2024/25](https://moodle2425.up.pt/mod/resource/view.php?id=61708), [teste 2 de 2024/25](https://moodle2425.up.pt/mod/resource/view.php?id=129190), exemplos do primeiro teste ([1](https://moodle2425.up.pt/mod/resource/view.php?id=61707), [2](https://moodle2425.up.pt/mod/resource/view.php?id=101191)), segundos testes de [2022](https://moodle2425.up.pt/mod/resource/view.php?id=117490) e [2023](https://moodle2425.up.pt/mod/resource/view.php?id=117489), e recursos globais de [2022](https://moodle2425.up.pt/mod/resource/view.php?id=131748) e [2023](https://moodle2425.up.pt/mod/resource/view.php?id=131749).

O livro de apoio é David A. Patterson e John L. Hennessy, _Computer Organization and Design RISC-V Edition_, 2.ª edição, 2020, ISBN 9780128203316. A [página da editora](https://shop.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6) identifica a edição; não foi usada uma cópia integral local correspondente.

Para confirmar pormenores da arquitetura e da execução: [especificação RISC-V](https://docs.riscv.org/reference/isa/unpriv/rv32.html), [convenção de chamadas RISC-V](https://riscv-non-isa.github.io/riscv-elf-psabi-doc/) e [serviços do RARS](https://github.com/TheThirdOne/rars/wiki/Environment-Calls). Os programas desta cadeira usam o ambiente RARS em RV32. As contas, esquemas e exercícios apresentados são originais.
