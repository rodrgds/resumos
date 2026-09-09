---
title: Laboratório de Computadores
description: Programação de baixo nível no Minix, dos periféricos do PC às interrupções e ao projeto final.
---

LC é a cadeira onde deixas de programar contra abstrações simpáticas e passas a falar diretamente com o hardware: lês registos, mascaras bits, atendes interrupções e desenhas píxeis num framebuffer que mais ninguém gere por ti. O ambiente é o Minix 3 numa máquina virtual, a linguagem é C e os periféricos são os clássicos do PC: temporizador, teclado, rato, placa de vídeo, relógio de tempo real e porta série. Vens de [Programação](/cadeiras/p/cpp-fundamentos/) com C++ na mão e de [Arquitetura](/cadeiras/ac/entrada-saida/) com a teoria de polling e interrupções; aqui vais implementar os dois do zero.

## Como está organizado

Começa por [C estruturado e ferramentas](c-estruturado/), que troca as classes de C++ por módulos, Makefiles e Doxygen. Depois, [Falar com o hardware](falar-com-hardware/) mostra o mapeamento em memória, os registos e o polling com máscaras de bits, e [Interrupções](interrupcoes/) troca o varrimento pela subscrição de IRQs com rotinas de atendimento.

A segunda metade é um periférico por página, sempre com o mesmo método: que registos existem, que bits interessam, que sequência os programa. Pela ordem habitual dos trabalhos: [Temporizador](temporizador/), [Teclado](teclado/), [Rato](rato/), [Placa de vídeo](video/) e [Relógio e porta série](relogio-serie/). Fecha com [Projeto: eventos e debugging](projeto/), que junta vários periféricos numa máquina de estados e ensina a caçar bugs como um experimentalista.

## Como estudar

Lê cada página com o Minix aberto e experimenta cada sequência na máquina virtual. Em LC, perceber o diagrama do registo com os olhos não chega: escreve a máscara, lê o registo, confirma o bit e só depois avança. Quando algo não funcionar (e vai acontecer muitas vezes), não mudes três coisas de cada vez: formula uma hipótese, prevê o que devias observar e testa só isso. A última página dá-te o método completo.

## Avaliação

Na edição de 2025/26, a avaliação é distribuída e não há exame final: a nota é $0{,}4 \times T + 0{,}6 \times \text{Proj}$, com mínimo de 8,0 valores tanto no teste teórico como no projeto. O projeto faz-se em grupos de 4, com classificações individuais possíveis, e a frequência exige não ultrapassar 25 por cento de faltas. Confirma sempre os pesos e as regras da edição corrente na ficha da unidade curricular no SIGARRA e na página da disciplina no Moodle.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Laboratório de Computadores (L.EIC018) do 2.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: periféricos e modos de funcionamento, mapeamento em memória, polling e interrupções, controladores de interrupções e rotinas, programação em C e estruturação de código, memória de processos e chamadas de funções, programação por eventos e máquinas de estados, bibliotecas e ligação estática, debugging sistemático e ferramentas (cc, make, ar, diff, patch, Git, doxygen). O trabalho faz-se em Minix 3 sobre VirtualBox, com o compilador CLANG e documentação em Doxygen.

Material oficial da FEUP:

- Ficha da unidade curricular de Laboratório de Computadores, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=560103).

O livro de referência da cadeira é _Making Embedded Systems_, de Elecia White. Os capítulos 1, 2, 35 e 36 de _Operating Systems: Three Easy Pieces_, de Arpaci-Dusseau, são leitura complementar indicada na ficha.
