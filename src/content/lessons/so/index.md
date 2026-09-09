---
title: Sistemas Operativos
description: O que o sistema operativo faz, processos, concorrência, memória virtual, ficheiros e entrada e saída em C e Linux.
section: conteudo
order: 0
---

O sistema operativo é o programa que gere tudo o resto: decide que processo usa o processador a cada instante, que bytes cada programa pode tocar e como os ficheiros chegam ao disco. Nesta cadeira vais perceber esses mecanismos por dentro e usá-los em C sobre Linux, que é onde os conceitos aparecem sem disfarces. Vens de [Programação](/cadeiras/p/cpp-fundamentos/), por isso o C já é teu conhecido; aqui vais usá-lo para falar diretamente com o núcleo.

## Como está organizado

Começa por [Introdução aos sistemas operativos](introducao-sistemas-operativos/), que explica as funções do SO, o arranque, a shell e as chamadas de sistema. Depois, [C avançado para sistemas](c-avancado/) revê o compilador, as bibliotecas e a gestão de memória em C, que é a ferramenta de todo o resto.

O bloco central é a gestão de processos: [Processos](processos/) mostra o ciclo de vida com `fork`, `exec`, `wait` e `exit`; [Escalonamento](escalonamento/) compara as políticas que escolhem quem corre a seguir; [Comunicação entre processos](comunicacao-processos/) liga processos com sinais, pipes, FIFOs, sockets e memória partilhada; [Programação concorrente](programacao-concorrente/) junta threads, mutexes, semáforos e a ordem dos locks que evita impasses.

A fechar, [Memória virtual](memoria-virtual/) explica paginação, tabelas de páginas e o modelo de memória do processo, e [Ficheiros e entrada/saída](ficheiros-entrada-saida/) mostra ficheiros, drivers e o diretório `/dev`.

## Como estudar

Lê cada página com um terminal aberto e corre todos os programas tu próprio. Em Sistemas Operativos, perceber o exemplo com os olhos não chega: muda a ordem dos `fork`, tira um `wait`, troca o tamanho do quantum e observa o que muda na saída. Compila sempre com avisos ligados (`gcc -Wall -Wextra`) e lê as mensagens do compilador antes de correres. Quando um programa com processos se comportar de forma estranha, corre-o várias vezes: a ordem de execução varia, e essa variação é matéria, não ruído.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes o número de testes, a matéria de cada um, as regras de frequência e as condições de recurso e melhoria.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Sistemas Operativos (L.EIC015) do 2.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: C avançado, introdução aos sistemas operativos, gestão de processos, gestão de memória, sistema de ficheiros, entrada e saída, e programação de sistema com a API do UNIX e do Linux. A bibliografia de referência é Silberschatz, Galvin e Gagne, Operating System Concepts.

Material oficial da FEUP:

- Ficha da unidade curricular de Sistemas Operativos, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560100).
