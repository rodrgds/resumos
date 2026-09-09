---
title: C estruturado e ferramentas
description: De C++ para C, módulos com cabeçalhos, Makefile, Git e Doxygen no Minix.
section: conteudo
order: 1
---

Em LC programas em C, não em C++. Desaparecem as classes, as referências, o `new` e o `iostream`. Em troca ganhas controlo direto sobre a memória e um conjunto pequeno de ferramentas que vais usar em todos os trabalhos: o compilador `cc` (CLANG), o `make`, o `ar` para bibliotecas, o Git e o Doxygen para documentar. Esta página faz a tradução e monta o posto de trabalho.

## De C++ para C

As diferenças que vais sentir na primeira semana:

- Sem classes: dados e funções vivem separados. Onde tinhas um objeto com métodos, tens agora uma `struct` mais funções que a recebem por apontador.
- Sem `new` e `delete`: a alocação dinâmica faz-se com `malloc` e `free` da `stdlib.h`, e a memória continua a ser problema teu.
- Sem `iostream`: entrada e saída com `printf` e `scanf` da `stdio.h`, com formatos explícitos (`%d`, `%x`, `%c`).
- Sem referências e sem sobrecarga: passagem por valor ou por apontador, e cada função tem um nome único.

O resto do C++ que conheces (apontadores, `struct`, controlo de fluxo, aritmética de bits) transfere-se sem mudanças. Se os apontadores ainda tremem, revê-os antes de tocares em registos de hardware.

## Módulos com cabeçalhos

Um módulo é um par de ficheiros: o cabeçalho `.h` declara o que o módulo oferece, o `.c` implementa. Quem usa o módulo inclui só o `.h`:

```c
/* timer.h */
#ifndef TIMER_H
#define TIMER_H

int timer_set_frequency(unsigned long freq);
int timer_subscribe_int(void);

#endif
```

A guarda `#ifndef` impede inclusões duplas: sem ela, dois `#include` do mesmo cabeçalho duplicam as declarações e a compilação parte. Cada `.c` inclui o seu `.h` primeiro e depois as bibliotecas de que precisa. Esta disciplina parece burocracia até ao dia em que o projeto tem seis periféricos e cada um vive no seu módulo.

## Compilar com um Makefile

Compilar à mão cada ficheiro com o `cc` funciona uma vez. À segunda, escreve um `Makefile` que diga como construir cada objeto e como os ligar:

```make
CC = cc
CFLAGS = -Wall -Wextra

proj: main.o timer.o kbd.o
	$(CC) $(CFLAGS) -o proj main.o timer.o kbd.o

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f *.o proj
```

As linhas de receita começam obrigatoriamente por tabulação, não por espaços: é o erro mais clássico do primeiro Makefile. Com isto, `make` recompila só o que mudou e `make clean` limpa os objetos.

:::tip[Como ler um erro do clang]
Compila este programa sem o `#include <stdio.h>` e o clang responde com `use of undeclared identifier 'printf'` mais uma sugestão. O método é sempre o mesmo: lê a primeira linha do erro (ficheiro e número da linha), percebe o que o compilador não encontrou e corrige só isso antes de recompilar. Resolve os erros de cima para baixo, porque um erro a montante costuma arrastar os de baixo.
:::

## Git e Doxygen

Cada trabalho vive num repositório Git: `add` e `commit` frequentes com mensagens que descrevam o estado (por exemplo "teclado: polling a ler scancodes"), um `status` antes de cada commit para confirmar o que entra. Quando trabalhares em grupo, `pull` antes de começar e `push` ao acabar.

A documentação escreve-se no próprio código em formato Doxygen, com `/** ... */` antes de cada função pública a explicar parâmetros e retorno. Gerar a documentação passa a ser um comando, não um relatório escrito à parte no fim do semestre.

:::warning[O que o C não faz por ti]
Não há verificação de limites em vetores, não há inicialização automática de variáveis e um apontador solto corrompe memória silenciosamente. Quando o programa se comportar de forma impossível, suspeita primeiro de escrita fora de limites e de variável não inicializada, antes de culpares o hardware.
:::
