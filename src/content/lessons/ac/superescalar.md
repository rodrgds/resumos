---
title: Superescalares
description: Emissão múltipla, dependências que limitam, execução fora de ordem e commit em ordem.
section: conteudo
order: 7
---

O pipeline escalar completa no máximo uma instrução por ciclo. O processador **superescalar** replica hardware para buscar, descodificar e executar **várias instruções por ciclo**: CPI abaixo de 1, ou, na linguagem do mercado, IPC (_instructions per cycle_) acima de 1. O preço é decidir em hardware, a cada ciclo, que instruções podem avançar juntas sem violar o programa.

## Emissão múltipla

Um superescalar de 2 vias busca 2 instruções por ciclo e tem (pelo menos) 2 unidades funcionais para as executar. Se o programa fosse uma fila de instruções independentes, o débito duplicava. Mas as instruções dependem umas das outras, e as dependências mandam:

```riscv
add  t0, t1, t2
sub  t3, t0, t4
```

O `sub` precisa de `t0`, que o `add` ainda está a calcular. Não há paralelismo aqui: o `sub` espera, e a segunda via fica vazia nesse ciclo. O débito real fica ditado pelo paralelismo do programa, não pela largura da máquina. Duplicar as vias sem instruções independentes para as encher é hardware parado.

## O que limita: três dependências

Entre duas instruções há três relações possíveis, comparando o que cada uma lê e escreve:

- **RAW** (_read after write_): a segunda lê o que a primeira escreve. É dependência a sério: o valor tem de fluir da primeira para a segunda, por forwarding ou espera.
- **WAR** (_write after read_): a segunda escreve num registo que a primeira lê. Não há fluxo de valor nenhum; o problema é só o nome do registo estar reutilizado. Se a escrita adiantada corromper a leitura atrasada, o programa parte, mas nada impede a ordem certa com registos diferentes.
- **WAW** (_write after write_): ambas escrevem no mesmo registo. Outra vez só o nome colide: a ordem das escritas é que tem de ser preservada.

RAW limita de verdade; WAR e WAW são **dependências falsas**, artefactos da reutilização de nomes. E é aqui que entra a técnica central desta página.

## Execução fora de ordem

O processador **fora de ordem** não espera pela instrução bloqueada: olha para a frente (a **janela de instruções**), encontra trabalho independente mais à frente e executa-o já. Toma esta sequência:

```riscv
lw   t0, 0(t1)     # 1: falta a cache, demora
add  t3, t0, t4    # 2: depende de 1, bloqueia
sub  t5, t6, t7    # 3: independente, pode avancar
```

Um pipeline em ordem parava na 2 e a 3 esperava também. O fora de ordem executa a 3 enquanto a 1 espera pela memória, e faz a 2 quando `t0` chegar. O programa observa exatamente a mesma sequência de resultados, mas o hardware preenche os vazios com trabalho útil.

Para isto funcionar, o processador resolve as dependências falsas com **renomeação de registos**: dá a cada escrita um registo físico novo e separado, por isso WAR e WAW desaparecem (nomes diferentes nunca colidem) e só as RAW verdadeiras impõem ordem. O registo arquitetural `t0` do programa passa a ser uma etiqueta; por baixo há um ficheiro de registos físicos maior que o programador nunca vê.

## Commit em ordem

Executar fora de ordem não significa terminar fora de ordem para o mundo exterior. As instruções **reformam-se** (_commit_) pela ordem original do programa: só quando todas as anteriores terminaram sem exceção é que o resultado se torna visível (escrita no registo, loja na memória). Se uma instrução levantar uma exceção, o processador descarta tudo o que veio depois dela como se nunca tivesse corrido, e o sistema operativo vê o estado exato da instrução que falhou. A execução é especulativa e desordenada por dentro; o comportamento observável é sequencial e preciso.

## O limite do paralelismo implícito

Junta as peças e vês o teto: a largura de emissão, o tamanho da janela, a precisão da [predição de saltos](predicao-saltos/) (cada erro deita fora a janela inteira) e, acima de tudo, o paralelismo real do programa. Passar de 2 para 4 vias duplica o hardware de emissão e de forwarding, mas o IPC típico sobe muito menos, porque os programas comuns têm paralelismo limitado. É este rendimento decrescente, somado ao muro da energia, que empurrou a indústria para vários núcleos em vez de núcleos cada vez mais largos. E isso é a próxima página.
