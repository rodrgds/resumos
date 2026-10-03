---
title: Laboratório de Computadores
description: C, periféricos do PC, interrupções Minix e aplicações por eventos, com exemplos resolvidos e prática.
editorial:
  basedOn: 2025/26
  sources:
    - title: Ficha de LC, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560103
    - title: Materiais docentes de LC, Moodle 2025/26
      url: https://moodle2526.up.pt/course/view.php?id=4355
  gaps:
    - A ficha SIGARRA de 2026/27 não continha programa e avaliação na consulta de 3 de outubro de 2026.
    - O sítio externo de guiões laboratoriais não estava acessível na revisão.
---

No fim de LC consegues escrever um programa em C que configura um periférico, lê os seus registos e reage a eventos sem bloquear. Vamos usar Minix numa máquina virtual VirtualBox, porque é aí que tens permissões para pedir I/O ao kernel. O percurso liga a representação de bytes aos periféricos do PC e depois à organização de uma aplicação que usa vários deles.

## Percurso de estudo

Começa por [C estruturado e ferramentas](/cadeiras/lc/c-estruturado/) e [Memória, funções e objetos em C](/cadeiras/lc/memoria-funcoes/). Precisas de dominar apontadores, duração dos objetos, conversões e compilação separada antes de usar as APIs dos dispositivos.

[Falar com o hardware](/cadeiras/lc/falar-com-hardware/) distingue portas de I/O de memória mapeada e ensina máscaras e polling. [Interrupções](/cadeiras/lc/interrupcoes/) explica PIC, IRQ, vetor e notificação Minix, sem os confundir.

Segue os periféricos pela ordem [Temporizador](/cadeiras/lc/temporizador/), [Teclado](/cadeiras/lc/teclado/), [Rato](/cadeiras/lc/rato/) e [Placa de vídeo](/cadeiras/lc/video/). Em cada um, acompanha uma configuração e uma interpretação de dados até ao resultado. Depois estuda [Relógio de tempo real](/cadeiras/lc/relogio-tempo-real/), [Porta série e UART](/cadeiras/lc/relogio-serie/) e [Protocolos de comunicação](/cadeiras/lc/protocolos/).

[Eventos, estado e debugging](/cadeiras/lc/projeto/) reúne os componentes numa aplicação. Os exercícios no fim das páginas são originais e treinam contas, registos, sequências de bytes, estados e diagnóstico. A [Cheat sheet](/cadeiras/lc/folha-consulta/) é uma folha de consulta para rever depois de estudar as explicações.

## Como praticar

Antes de executar uma sequência de I/O, escreve a porta, a condição de estado e o efeito esperado de cada passo. Num byte de configuração, identifica os campos que podem mudar e os que devem ficar intactos. Num parser, segue o estado depois de cada byte, incluindo erros e entradas incompletas.

Os exemplos de C portátil podem correr fora do Minix. As funções que usam LCF, kernel calls ou BIOS precisam da imagem e das permissões do laboratório; a página indica os seus pressupostos e efeito esperado. As simulações modelam apenas as relações descritas, não executam I/O real.

:::details[Avaliação de 2025/26]
A ficha de 2025/26 define avaliação distribuída sem exame final, com teste teórico de 40% e projeto de 60%:

$$NF=0{,}4T+0{,}6Proj.$$

Exige pelo menos 8,0 valores no teste. O projeto realiza-se em grupos de quatro e pode ter classificações individuais diferentes. A frequência exige não exceder 25% de faltas às aulas previstas. A melhoria da componente teórica pode fazer-se no teste de recurso.

A ficha permite usar notas de projeto superiores a 10 obtidas em 2023/24 ou 2024/25, mediante sinalização ao regente no formulário próprio, com dispensa das aulas práticas nesses casos. Não permite reutilizar notas de testes anteriores. Estas condições pertencem a essa edição. Confirma as regras que se aplicam à tua inscrição na [ficha corrente de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586996) e no Moodle.
:::

:::details[Materiais e bibliografia]
A base de estudo é o [Moodle de LC de 2025/26](https://moodle2526.up.pt/course/view.php?id=4355), com materiais docentes sobre C, Minix, timer, interrupções, teclado, rato, eventos, vídeo, XPM, sprites, RTC, UART e protocolos. Inclui o guião de introdução a C e a aula de construção de aplicações. Várias apresentações reutilizadas têm datas de 2024 ou 2025 e exemplos de laboratórios de anos anteriores; esses exemplos explicam mecanismos, não fixam entregas nem regras da edição atual.

Os vídeos de preparação e _Weekly tips_ estão no mesmo Moodle, junto dos materiais a que se referem. Usa-os para acompanhar operações e ferramentas do laboratório, conservando os PDFs e o guião da tua edição como referência para parâmetros e requisitos. O acesso pode exigir autenticação da U.Porto.

A [ficha completa de 2025/26 no SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560103) indica:

- Elecia White, _Making Embedded Systems: Design Patterns for Great Software_, O'Reilly, 2011. Bibliografia obrigatória.
- Derek Molloy, _Exploring Raspberry Pi: Interfacing to the Real World with Embedded Linux_, Wiley, 2016. Bibliografia complementar.
- Remzi e Andrea Arpaci-Dusseau, [_Operating Systems: Three Easy Pieces_](https://pages.cs.wisc.edu/~remzi/OSTEP/), capítulos 1, 2, 35 e 36. Bibliografia complementar.

Para conferir as regras de C, o [rascunho público C11 N1570](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf) detalha duração dos objetos, conversões e alocação. É uma referência técnica de 2011, não um guião de LC.

Para aprofundar a interface de cada dispositivo, consulta as especificações i8254, i8259, VBE e UART indicadas nos materiais docentes. A [página pública de LC](https://web.fe.up.pt/~pfs/aulas/lcom2223/index.html) conserva materiais de uma edição anterior.
:::
