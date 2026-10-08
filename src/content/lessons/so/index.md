---
title: Sistemas Operativos
description: Processos, concorrência, memória e ficheiros, com programação de sistema em C e UNIX.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  sources:
    - title: Sistemas Operativos, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586993
    - title: Materiais de Sistemas Operativos, Moodle 2025/26
      url: https://moodle2526.up.pt/course/view.php?id=4727
    - title: Operating Systems, Three Easy Pieces
      url: https://pages.cs.wisc.edu/~remzi/OSTEP/
---

Um processo que lança uma compilação precisa de criar um filho, escolher o programa que esse filho executa e recolher o estado de saída. Se várias compilações correm ao mesmo tempo, o sistema reparte CPU e memória entre elas. Guardar o resultado acrescenta outra obrigação: conferir quantos bytes foram realmente escritos.

Este percurso liga a programação em C à gestão desses recursos. Precisas de funções, ciclos, arrays e estruturas. [C avançado](/cadeiras/so/c-avancado/) desenvolve apontadores e tempo de vida antes das chamadas de sistema.

## Percurso de estudo

1. [Introdução aos sistemas operativos](/cadeiras/so/introducao-sistemas-operativos/) e [shell UNIX](/cadeiras/so/shell-unix/) explicam os recursos, as chamadas de sistema e os comandos que vais usar no terminal.
2. [C avançado](/cadeiras/so/c-avancado/) e [programar ficheiros e diretórios](/cadeiras/so/ficheiros-api/) ligam a memória do programa às duas interfaces de I/O, a biblioteca C e os descritores do núcleo.
3. [Processos](/cadeiras/so/processos/) e [escalonamento](/cadeiras/so/escalonamento/) mostram como criar fluxos de execução e decidir qual usa o processador.
4. [Comunicação entre processos](/cadeiras/so/comunicacao-processos/), [programação concorrente](/cadeiras/so/programacao-concorrente/) e [impasses](/cadeiras/so/impasses/) tratam a troca de dados e a sincronização.
5. [Memória virtual](/cadeiras/so/memoria-virtual/) e [paginação por procura](/cadeiras/so/paginacao-procura/) explicam a tradução de endereços, as faltas de página e a gestão da RAM.
6. [Ficheiros e entrada/saída](/cadeiras/so/ficheiros-entrada-saida/) e [implementação de ficheiros](/cadeiras/so/implementacao-ficheiros/) seguem um pedido desde a aplicação até aos blocos do dispositivo.

A [cheat sheet](/cadeiras/so/folha-consulta/) reúne fórmulas e condições para consulta. As lições têm exercícios próprios associados, com pistas e resolução. São prática dos tipos de raciocínio da cadeira, não reproduções de perguntas de uma prova. Os aprofundamentos de impasses e banqueiro e as notas sobre a evolução do escalonador Linux estão assinalados como complemento: só contam para avaliação se os materiais do ano os pedirem.

## Como praticar

Antes de correr um programa, escreve o resultado que esperas e as ordens de saída que são possíveis. Em seguida, compila com avisos, testa uma entrada normal e um caso limite, como ficheiro vazio, argumentos em falta ou todos os números negativos. Se o resultado variar, procura que acessos ou eventos não têm uma ordem imposta.

Os exemplos C portáteis podem correr no editor da página. `fork`, `exec`, sinais, sockets e Pthreads precisam de um terminal num sistema UNIX. Para acompanhar as aulas, usa Linux, por exemplo numa máquina virtual ou no ambiente indicado pelos docentes. O executor do navegador não implementa um sistema Linux completo e não serve para esses exemplos.

:::details[Avaliação em 2026/27]

A [ficha oficial de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586993), consultada a 3 de outubro de 2026, indica avaliação distribuída com dois testes de 10 valores. Cada um cobre sensivelmente metade da matéria teórica e dos exercícios TP, incluindo programação em computador. Com frequência, a classificação final é $T1 + T2$.

Para obter frequência, é necessário assistir a pelo menos 50% das aulas TP da turma. A assiduidade tem validade no ano letivo seguinte; quem a obteve no ano anterior pode pedir dispensa através do formulário dos docentes. Os regimes especiais previstos na ficha têm dispensa de presença nas condições aí descritas.

O recurso cobre toda a matéria teórica e prática e dá acesso aos reprovados com frequência e aos inscritos para melhoria. A melhoria também cobre toda a matéria. A ficha proíbe dispositivos eletrónicos na avaliação, salvo os autorizados pelos docentes ou previstos num estatuto aplicável. Confirma datas, instruções e qualquer alteração no Moodle de [2026/27](https://moodle2627.up.pt/course/view.php?id=4478).

:::

:::details[Materiais e bibliografia]

A base de ensino são os materiais do [Moodle de 2025/26](https://moodle2526.up.pt/course/view.php?id=4727): apresentações teóricas `part1` a `part6`, capítulos 9, 10, 12, 13 e 14, fichas práticas `f0` a `f7` em português e inglês e notas dos docentes sobre erros no primeiro teste. As versões PT/EN das fichas repetem os mesmos exercícios. O documento de funcionamento `os2526` está datado de 1 de setembro de 2025. A nota sobre tempos UNIX é de novembro de 2024, embora esteja disponibilizada nessa edição.

As apresentações de Silberschatz identificam a 10.ª edição, de 2018; `os2526` recomenda a 9.ª edição. A numeração dos capítulos depende da edição. O programa de 2026/27 foi comparado com esta base, mas os ficheiros do Moodle de 2026/27 não foram revistos. Estes apontamentos não substituem novos materiais que os docentes acrescentem.

- Silberschatz, Galvin e Gagne, _Operating System Concepts_, bibliografia obrigatória na ficha. Os slides locais usam a 10.ª edição.
- Stevens e Rago, _Advanced Programming in the UNIX Environment_, 3.ª edição, para a API de UNIX.
- Kernighan e Pike, _The Practice of Programming_, para programação e tratamento de erros.
- Arpaci-Dusseau e Arpaci-Dusseau, [_Operating Systems: Three Easy Pieces_](https://pages.cs.wisc.edu/~remzi/OSTEP/), complemento para virtualização, concorrência e persistência.
- [Linux man-pages](https://man7.org/linux/man-pages/), referência de argumentos, retornos e erros das funções. Consulta `SYNOPSIS` para saber os cabeçalhos necessários.
- Documentação do núcleo Linux sobre [CFS](https://docs.kernel.org/scheduler/sched-design-CFS.html) e [EEVDF](https://docs.kernel.org/scheduler/sched-eevdf.html), para distinguir os modelos estudados da evolução do escalonador real.

As explicações e os exercícios foram escritos para estas páginas. Os resumos históricos SofiaViP são referências complementares, não a autoridade para a avaliação atual. As notas de erros orientaram os casos de prática, mas afirmações sobre APIs foram conferidas com a sua documentação: abrir um ficheiro duas vezes é permitido, e cada abertura pode ter uma posição independente.

:::
