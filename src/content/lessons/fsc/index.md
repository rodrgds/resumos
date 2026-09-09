---
title: Fundamentos de Sistemas Computacionais
description: Bits e representação de dados, circuitos lógicos combinatórios e sequenciais, memórias e os primeiros passos no processador LEGv8.
---

FSC mostra o que acontece entre o programa que escreves e o silício que o executa. Começas nos bits que representam números e texto, sobes até às portas lógicas e aos circuitos que calculam e guardam valores, e chegas ao processador LEGv8, onde vês como uma instrução sai da memória, atravessa a unidade de controlo e produz um resultado.

## Como está organizado

A primeira parte é sobre **representar dados**. [Representação de dados](representacao-dados/) fixa bits, bytes, MSB e LSB e as conversões entre decimal, binário, octal e hexadecimal. Depois, [Inteiros em complemento para dois](inteiros-complemento-dois/) explica como representar negativos, estender o sinal e detetar overflow, e [Vírgula flutuante](virgula-flutuante/) mostra a normalização e o formato IEEE 754 com um exemplo completo.

A segunda parte é sobre **circuitos digitais**. [Álgebra de Boole e portas lógicas](algebra-boole-portas/) apresenta as operações, a dualidade, as formas canónicas e as portas AND, OR, NOT, XOR e XNOR. [Circuitos combinatórios](circuitos-combinatorios/) constrói multiplexadores, descodificadores e somadores a partir dessas portas. [Circuitos sequenciais](circuitos-sequenciais/) introduz o relógio, os flip-flops, os registos e as máquinas de estados finitas. [Memórias](memorias/) fecha o tema com RAM e ROM, SRAM e DRAM, capacidade e descodificação de endereços.

A terceira parte é sobre o **processador**. [LEGv8: registos e memória](legv8-registos-memoria/) apresenta os 32 registos, o endereçamento ao byte e a pilha. [LEGv8: instruções](legv8-instrucoes/) explica os formatos R, D, CB e B e como se escrevem acessos à memória, saltos e procedimentos. Por fim, [Datapath e controlo](datapath-controlo/) abre o capot do monociclo: sinais de controlo, ALU e o custo de fazer tudo num só ciclo de relógio.

## Como estudar

Em FSC, cada conceito tem uma conta ou um circuito que o concretiza. Refaz os exemplos com papel e lápis: converte as bases à mão, nega um número em complemento para dois, monta a tabela de verdade de uma função pequena e codifica uma instrução LEGv8 campo a campo. Nos capítulos de circuitos, desenha os esquemas em vez de só os leres; nos capítulos do processador, segue cada instrução desde o PC até à escrita do resultado.

## Avaliação

A forma de avaliação muda de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes o peso dos testes, do exame e de eventuais trabalhos.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Fundamentos de Sistemas Computacionais do 1.º ano, 1.º semestre da LEIC: representação de dados em código binário; sistemas de numeração e conversões; inteiros sem sinal e em complemento para dois, extensão de sinal e overflow; números em vírgula flutuante e IEEE 754; álgebra de Boole, formas canónicas e portas lógicas; módulos combinatórios, multiplexadores, descodificadores e somadores iterativos; circuitos sequenciais, flip-flops, registos e máquinas de estados finitas; sistemas de memória, capacidade e descodificação; registos, endereçamento e pilha no LEGv8; formatos de instrução e procedimentos; datapath monociclo e sinais de controlo.

Material oficial da FEUP:

- Ficha da unidade curricular de Fundamentos de Sistemas Computacionais, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560088).
- Página informativa da disciplina no Moodle da Universidade do Porto, edição de 2025/26, cujo conteúdo exige inscrição (consultada em setembro de 2026): [Moodle](https://moodle2526.up.pt/course/info.php?id=4962).

Notas de estudantes, úteis como apoio mas sem valor oficial:

- _Resumos FSC1 SofiaViP_, apontamentos manuscritos de estudante em circulação pública que acompanham a parte de representação de dados, circuitos e memórias (ficheiro PDF descarregado da pasta pública do 1.º ano, 1.º semestre em setembro de 2026).
- _Resumos FSC2 SofiaViP_, apontamentos de estudante em circulação pública que acompanham a parte de registos, instruções LEGv8, datapath e controlo (ficheiro PDF descarregado da mesma pasta pública em setembro de 2026).

Os exemplos, contas e exercícios destas páginas são originais, escritos para este site. Não reproduzem os apontamentos acima.
