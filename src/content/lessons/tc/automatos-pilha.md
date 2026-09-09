---
title: Autómatos de pilha
description: PDA com um exemplo completo para 0n1n e a equivalência com gramáticas.
section: conteudo
order: 5
---

Um **autómato de pilha** (PDA, de *pushdown automaton*) é um NFA com uma pilha: a cada passo, além de ler (ou não) um símbolo, pode empilhar ou desempilhar símbolos. A pilha é memória ilimitada mas só com acesso ao topo, e é exatamente o que faltava para reconhecer $\{0^n 1^n\}$. Esta página constrói esse autómato e enuncia a equivalência com gramáticas livres de contexto.

## O modelo

Um PDA tem estados finitos, alfabeto de entrada $\Sigma$ e alfabeto de pilha $\Gamma$ (que pode incluir um marcador de fundo como $\$$). Cada transição indica: estado atual, símbolo a ler ($\varepsilon$ se não lê), símbolo no topo da pilha, estado destino e o que empilhar (ou desempilhar). Aceita por **estado final** (terminar num estado de aceitação após ler tudo, com qualquer conteúdo na pilha) ou por **pilha vazia**; os dois critérios são equivalentes.

A intuição: a parte finita (estados) trata o que os DFA já tratavam, e a pilha guarda contagens e chamadas por fechar. É o mesmo salto dos parênteses bem formados: empilha ao abrir, desempilha ao fechar.

## Exemplo resolvido: PDA para $\{0^n 1^n\}$

Linguagem sobre $\{0, 1\}$: $n$ zeros seguidos de $n$ uns, incluindo $\varepsilon$ ($n = 0$). Estratégia: empilha um marcador por cada $0$ lido, depois desempilha um por cada $1$. Aceita se a pilha esvaziar exatamente no fim.

Estados: $q_0$ (inicial, a ler zeros), $q_1$ (a ler uns), $q_f$ (aceitação). Alfabeto de pilha: $\{0, \$\}$, com $\$$ no fundo.

```text
Inicialização:
  q0 --(ε, topo nada: empilha $)--> q0     (põe o marcador de fundo)
Leitura de zeros (fica em q0):
  q0 --(0, topo x: empilha 0 por cima)--> q0   para qualquer x
Transição para os uns:
  q0 --(1, topo 0: desempilha)--> q1
Aceitação (inclui a palavra vazia, com n = 0):
  q0 --(ε, topo $: desempilha)--> qf
Leitura de uns (fica em q1):
  q1 --(1, topo 0: desempilha)--> q1
Aceitação (cont.):
  q1 --(ε, topo $: desempilha)--> qf
```

Corre $w = 0011$: empilha $\$$, empilha $0$, empilha $0$ (pilha: $0,0,\$$ do topo para o fundo). Lê $1$: desempilha um $0$, vai para $q_1$. Lê $1$: desempilha o outro $0$ (pilha: $\$$). Fim da palavra em $q_1$ com topo $\$$: transição $\varepsilon$ para $q_f$. Aceite.

E porque é que $010$ é rejeitada? Lê $0$ (empilha), lê $1$ (desempilha, vai para $q_1$ com pilha $\$$), lê $0$: não há transição de $q_1$ a ler $0$. O caminho morre, e não há outro. Rejeitada, como devia.

:::tip[Receita para contar com a pilha]
Para "tantos $a$ como $b$": empilha nos $a$, desempilha nos $b$, com um marcador de fundo para detetar o zero. Para "mais $a$ que $b$": igual, mas aceita com pilha não vazia. Quase todos os exercícios de PDA são variantes desta receita com dois estados de fase.
:::

## PDA equivale a CFG

**Teorema.** Uma linguagem é reconhecida por algum PDA se e só se é gerada por alguma CFG. As linguagens desta família chamam-se **livres de contexto**.

A prova tem dois sentidos, e cada um é uma construção:

- De CFG para PDA: o autómato simula derivações mais à esquerda, mantendo a forma sentencial na pilha e expandindo variáveis no topo. Se a palavra esvaziar a pilha, aceita.
- De PDA para CFG: a gramática ganha uma variável $[pAq]$ para cada par de estados $(p, q)$ e símbolo $A$, significando "de $p$ com $A$ no topo até $q$ com $A$ removido". As regras copiam as transições do autómato.

Não decores as construções símbolo a símbolo; fixa o que elas implicam: tudo o que provaste para gramáticas (como a árvore sintática) vale para autómatos de pilha, e vice-versa. Em particular, há um lema da repetição para linguagens livres de contexto (com duas partes repetíveis), que exclui linguagens como $\{0^n 1^n 2^n\}$. O padrão é o mesmo da página sobre [limites das linguagens regulares](limites-regulares/): conta finita contra crescimento ilimitado.

## Para levar para a próxima página

A pilha resolve a contagem, mas há linguagens que nem ela alcança, como $\{0^n 1^n 2^n\}$, e há perguntas que nenhuma máquina responde. O modelo sem restrições é a [máquina de Turing](turing-decidibilidade/).
