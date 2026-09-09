---
title: Autómatos finitos
description: DFA como quíntuplo, NFA com epsilon, construção de subconjuntos e minimização.
section: conteudo
order: 2
---

Um **autómato finito** é uma máquina com memória limitada: um conjunto finito de estados, um estado inicial e uma regra que diz, para cada estado e cada símbolo lido, para onde ir. Não tem pilha nem fita, só o estado atual. Esta página mostra os dois sabores (determinístico e não determinístico) e três construções que tens de saber executar: de NFA para DFA, minimização e teste de equivalência.

## DFA: definição e leitura

Um **autómato finito determinístico** (DFA) é um quíntuplo $M = (Q, \Sigma, \delta, q_0, F)$ onde:

- $Q$ é o conjunto finito de estados;
- $\Sigma$ é o alfabeto;
- $\delta: Q \times \Sigma \to Q$ é a **função de transição** (para cada estado e símbolo, exatamente um destino);
- $q_0 \in Q$ é o estado inicial;
- $F \subseteq Q$ é o conjunto de estados de aceitação.

$M$ **aceita** a palavra $w$ se, começando em $q_0$ e seguindo $\delta$ símbolo a símbolo, terminar num estado de $F$. A **linguagem reconhecida** $L(M)$ é o conjunto das palavras aceites.

Exemplo: palavras sobre $\{0, 1\}$ que terminam em $1$. Dois estados chegam: $q_0$ ("último símbolo visto não foi $1$", que também é o início) e $q_1$ ("último símbolo foi $1$").

```text
Estados: q0 (inicial), q1 (aceitação)
Transições:
  q0 --0--> q0
  q0 --1--> q1
  q1 --0--> q0
  q1 --1--> q1
```

Testa $w = 01$: $q_0 \xrightarrow{0} q_0 \xrightarrow{1} q_1$, que é de aceitação, por isso $01 \in L(M)$. Testa $w = 10$: $q_0 \xrightarrow{1} q_1 \xrightarrow{0} q_0$, rejeitada. E $\varepsilon$: fica em $q_0$, rejeitada, o que está certo porque $\varepsilon$ não termina em $1$.

:::tip[Desenha antes de formalizar]
Num exercício de construção, desenha primeiro os estados com nomes que digam o que memorizam ("resto 0", "vi um $a$"). Depois escreve a tabela de $\delta$. Só no fim, se pedirem, apresenta o quíntuplo. Nomes com significado evitam transições trocadas.
:::

## NFA: adivinhar com epsilon

Um **autómato finito não determinístico** (NFA) permite, para o mesmo estado e símbolo, zero, uma ou várias transições, mais transições **epsilon** ($\varepsilon$) que mudam de estado sem consumir símbolo. Formalmente, $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \to \mathcal{P}(Q)$ devolve um conjunto de destinos.

Um NFA aceita $w$ se **existir** pelo menos um caminho etiquetado por $w$ (ignorando os $\varepsilon$) do estado inicial até um estado de aceitação. É um "adivinhar bem": basta um caminho com sorte.

Exemplo: palavras sobre $\{0, 1\}$ que terminam em $01$. O NFA adivinha onde começa o sufixo final:

```text
Estados: p0 (inicial), p1, p2 (aceitação)
Transições:
  p0 --0,1--> p0        (consome qualquer prefixo)
  p0 --0--> p1          (adivinha: aqui começa o 01 final)
  p1 --1--> p2
  p2 --(nada)--> _      (sem saídas: se vier mais símbolo, este caminho morre)
```

Para $w = 001$: o caminho $p_0 \xrightarrow{0} p_0 \xrightarrow{0} p_1 \xrightarrow{1} p_2$ aceita. Repara que outros caminhos morrem (por exemplo ficar sempre em $p_0$), mas um basta. Os NFA são quase sempre mais pequenos e mais fáceis de inventar que o DFA equivalente.

## De NFA para DFA: construção de subconjuntos

Todo o NFA tem um DFA equivalente. A ideia: o DFA simula **todos** os caminhos do NFA em paralelo, e cada estado do DFA é o conjunto dos estados onde o NFA poderia estar. Os passos:

1. O estado inicial do DFA é o **fecho epsilon** do estado inicial do NFA (todos os alcançáveis só com transições $\varepsilon$).
2. Para cada estado-conjunto $S$ e cada símbolo $a$: o destino é o fecho epsilon de todos os destinos por $a$ a partir de estados de $S$.
3. Um estado-conjunto é de aceitação se contiver pelo menos um estado de aceitação do NFA.

Exemplo resolvido. NFA com estados $\{p, q\}$, inicial $p$, aceitação $\{q\}$, transições: $p \xrightarrow{0} \{p, q\}$, $p \xrightarrow{1} \{p\}$, $q$ sem saídas, sem transições $\varepsilon$.

- Inicial do DFA: fecho epsilon de $\{p\} = \{p\}$. Chama-lhe $A = \{p\}$.
- De $A$ com $0$: destinos $\{p, q\}$, fecho $\{p, q\}$. Novo estado $B = \{p, q\}$.
- De $A$ com $1$: destinos $\{p\}$, ou seja $A$.
- De $B$ com $0$: de $p$ sai $\{p, q\}$, de $q$ nada. Resultado $\{p, q\} = B$.
- De $B$ com $1$: de $p$ sai $\{p\}$. Resultado $\{p\} = A$.
- Aceitação: $B$ contém $q$, logo $B$ é final; $A$ não.

```text
DFA resultante:
  A = {p}   (inicial)
  B = {p,q} (aceitação)
  A --0--> B,  A --1--> A
  B --0--> B,  B --1--> A
```

Reconheces a linguagem? É "palavras que contêm pelo menos um $0$": o $B$ significa "já vi um $0$". O método funciona sempre, mas pode gerar até $2^n$ estados para um NFA de $n$ estados. Na prática só constróis os alcançáveis a partir do inicial, como acima.

## Minimização por preenchimento de tabela

O DFA mínimo para uma linguagem é único (a menos de nomes de estados). Para o obter, elimina estados inalcançáveis e depois funde estados **equivalentes** (indistinguíveis por qualquer sufixo). O algoritmo de preenchimento de tabela:

1. Marca todos os pares (estado final, estado não final): são distinguíveis por $\varepsilon$.
2. Repete: se para algum símbolo $a$ o par $(\delta(p,a), \delta(q,a))$ já está marcado, marca $(p, q)$.
3. Os pares nunca marcados fundem-se.

Exemplo resolvido. DFA com estados $A$ (inicial), $B$, $C$ (final), alfabeto $\{0,1\}$:

```text
  A --0--> B,  A --1--> C
  B --0--> B,  B --1--> C
  C --0--> B,  C --1--> C
```

Pares: $(A,B)$, $(A,C)$, $(B,C)$.

1. Base: $C$ é final, $A$ e $B$ não. Marca $(A,C)$ e $(B,C)$.
2. Par $(A,B)$: com $0$, vai para $(B,B)$, par igual (nunca marcado); com $1$, vai para $(C,C)$, igual. Nenhum símbolo leva a par marcado, por isso $(A,B)$ fica por marcar.
3. Funde $A$ e $B$ num estado $AB$. O DFA mínimo tem dois estados:

```text
  AB --0--> AB,  AB --1--> C
  C  --0--> AB,  C  --1--> C
```

Isto reconhece "palavras que terminam em $1$", e dois estados são o mínimo (é preciso distinguir "termina em $1$" de "não termina em $1$").

## Teste de equivalência

Dois DFA $M_1$ e $M_2$ são **equivalentes** quando $L(M_1) = L(M_2)$. Para testar, constrói o DFA produto (pares de estados, transição componente a componente) e verifica se algum estado alcançável é "um final e outro não". Se nenhum existir, são equivalentes. Como bónus, o mesmo produto com a condição de aceitação "ambos finais" reconhece a interseção, o que prova que as linguagens regulares são fechadas para interseção. O fecho e os limites destas linguagens são o tema de [limites das linguagens regulares](limites-regulares/).

## Para levar para a próxima página

DFA, NFA e expressões regulares descrevem exatamente a mesma família de linguagens. Mas nem todas as linguagens são regulares, e provar que uma linguagem fica de fora exige uma ferramenta nova: o lema da repetição.
