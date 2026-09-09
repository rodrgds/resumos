---
title: 'Projeto: eventos e debugging'
description: Máquinas de estados com vários periféricos e debugging pelo método científico.
section: conteudo
order: 9
---

O **projeto** junta tudo: dois ou mais periféricos a gerar eventos ao mesmo tempo, um programa que reage sem polling e uma sessão de demonstração onde nada pode falhar. A técnica que organiza o caos é a **máquina de estados**, a mesma ideia das máquinas finitas de [Circuitos sequenciais](/cadeiras/fsc/circuitos-sequenciais/), agora a conduzir um jogo em vez de um circuito. E quando algo falhar, o método para o caçar é o método científico.

## Programação por eventos

Com interrupções, o programa principal não pergunta nada: bloqueia à espera de eventos e reage. Cada handler limita-se a registar o que aconteceu (tecla premida, tique do temporizador, pacote do rato) em variáveis partilhadas, e o ciclo principal consome esses eventos um a um. Esta separação é o que permite lidar com vários periféricos ao mesmo tempo sem que nenhum fique à espera do polling dos outros.

## Exemplo: máquina de estados de um mini jogo

Um jogo simples com teclado e temporizador vive em quatro estados:

| Estado | O que mostra             | Transições                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| MENU   | título e instruções      | tecla Enter passa a JOGO                                                     |
| JOGO   | sprites e pontuação      | tecla P passa a PAUSA, fim das vidas passa a FIM, cada tique avança a lógica |
| PAUSA  | imagem congelada e aviso | tecla P volta a JOGO, tecla Esc volta a MENU                                 |
| FIM    | pontuação final          | tecla Enter volta a MENU                                                     |

Cada evento (tecla ou tique) entra numa função que olha para o estado atual e decide: em JOGO, a tecla P pausa; em PAUSA, a mesma tecla retoma. O desenho de cada imagem depende só do estado e dos dados, nunca do histórico de eventos. Quando um comportamento estranho aparecer, a primeira pergunta é sempre "em que estado estávamos e que evento chegou": nove em dez bugs do projeto são transições em falta ou a mais.

## Debugging como ciência experimental

Quando o programa falha, não mudes código à toa. O método que funciona:

1. **Observa e regista**: o que acontece exatamente, em que estado, com que sequência de eventos. Escreve, não confies na memória.
2. **Formula uma hipótese**: uma frase testável, como "o cursor salta porque o pacote do rato chega dessincronizado após overflow".
3. **Prevê**: se a hipótese for verdadeira, que observação a confirmaria. Por exemplo: "se for dessincronização, o bit 3 do primeiro byte está a 0 nesses pacotes".
4. **Testa uma coisa de cada vez**: instrumenta o código para registar só essa observação e corre.
5. **Conclui e itera**: hipótese confirmada, corrige; refutada, formula a próxima com o que aprendeste.

Um registo realista cabe numa tabela: cada linha com a hipótese, a previsão, o resultado e a conclusão. Três linhas destas valem mais que uma tarde a mudar máscaras ao acaso.

:::tip[Para a demonstração]
Congela uma versão que funciona uns dias antes e testa-a de rajada: reinícios, teclas erradas, rato parado, overflow propositado. O júri vai fazer exatamente o que não testaste. Uma máquina de estados com um estado FIM bem tratado e um programa que nunca fica pendurado impressionam mais que uma funcionalidade extra a meio.
:::
