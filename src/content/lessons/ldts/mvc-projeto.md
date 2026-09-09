---
title: MVC e projeto integrador
description: Model-View-Controller em aplicações event driven e a organização do projeto em equipa.
section: conteudo
order: 8
---

**MVC** separa a aplicação em três papéis. O **Model** guarda o estado e as regras: posições, vidas, pontuação. A **View** desenha o estado no ecrã e não decide nada. O **Controller** recebe os eventos (teclas, cliques), atualiza o Model e pede à View para redesenhar. Em aplicações **event driven** como o jogo, nada corre em sequência fixa: o programa espera eventos e reage.

## Porque separar

Sem MVC, a classe do jogo lê teclas, mexe em posições e desenha tudo misturado, e cada mudança toca em tudo. Com MVC, cada pergunta tem um dono: "onde está o herói" é o Model, "como se desenha" é a View, "o que acontece ao premir cima" é o Controller. Os testes agradecem: o Model testa-se sem ecrã nem teclado, como fizeste nos [testes unitários](testes-unitarios/).

## Mapear o Hero

No jogo do projeto, o mapeamento típico é este:

- **Model**: `Arena` com o herói, os monstros, as paredes e a pontuação, mais as regras de movimento e colisão. Não importa nenhum pacote de desenho.
- **View**: a classe que pega na `Arena` e desenha cada elemento no terminal com a biblioteca do projeto (Lanterna, no caso do jogo Hero). Só lê o Model, nunca o altera.
- **Controller**: o `ControladorArena` com o mapa de `Comando` por tecla. Recebe o evento, atualiza o Model e chama a View.

O ciclo de um evento fica assim: tecla premida, Controller atualiza a posição no Model, View redesenha a arena. Se um dia trocares Lanterna por outra biblioteca, só a View muda.

## Organizar o projeto em equipa

Três pessoas, seis semanas, um repositório. O que funciona:

- Divide por camadas MVC, uma pessoa por camada, com as interfaces (`Ecra`, `Comportamento`, `Comando`) acordadas na primeira semana.
- Cada funcionalidade num branch com revisão antes do merge, como no [controlo de versões](controlo-versoes/).
- Testes escritos junto com o código: o Model com testes unitários puros, o Controller com mocks da View, e a cobertura e o Pitest no build para apanhar testes fracos.
- Refactoring contínuo: quando um smell aparece, trata-o nessa semana. Na última semana já não há tempo para reestruturar.

:::warning[Os relatórios contam]
O projeto avalia produto e relatórios. Guarda decisões à medida que as tomas: que padrões aplicaste e porquê, que smells encontraste, o que os testes apanharam. Reconstruir isto na véspera da entrega produz relatórios vagos e notas que o produto não salva.
:::

## Exemplo: planear os testes do projeto

Antes de escrever código novo, lista o que vais testar. Para a funcionalidade "herói apanha item e ganha pontos":

1. Model: apanhar o item soma 50 à pontuação e remove o item da arena (teste puro, sem ecrã).
2. Controller: a tecla move o herói para a casa do item (mock da View verifica o redesenho).
3. Observer: a pontuação é notificada quando o item desaparece (verifica com mock de observador).

Três testes, três camadas, cada um a proteger a sua responsabilidade. Quando o projeto crescer, esta lista vira a bateria que te deixa refatorar sem medo.
