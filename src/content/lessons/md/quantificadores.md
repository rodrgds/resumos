---
title: Quantificadores
description: Variáveis, tradução com para todo e existe, múltiplos quantificadores e provas.
section: conteudo
order: 3
---

A lógica proposicional trata cada frase como um bloco. Mas "todos os alunos sabem programar" fala de objetos individuais e da sua quantidade. Os **quantificadores** abrem a frase e deixam quantificar sobre objetos: $\forall$ ("para todo") e $\exists$ ("existe"). Com eles consegues representar quase todo o discurso matemático, das definições de [funções](/cadeiras/md/ordens-funcoes/) às propriedades de [relações](/cadeiras/md/conjuntos-relacoes/).

## Variáveis e fórmulas bem formadas

Uma **variável** como $x$ não refere nenhum objeto: marca um lugar nos argumentos de um predicado. $Gosta(clara, x)$ é uma condição sobre $x$, não uma frase com valor de verdade. Só quando quantificamos a variável, como em $\exists x\, Gosta(clara, x)$, obtemos uma frase que é verdadeira ou falsa.

Uma fórmula onde todas as variáveis estão quantificadas chama-se **frase**. $Aluno(x) \land NaSala(x)$ tem $x$ livre e não pode ser avaliada; $\exists x\,(Aluno(x) \land NaSala(x))$ já pode. Esta distinção importa nas provas: só frases são premissas ou conclusões.

## Os dois quantificadores

- $\forall x\, P(x)$: **todos** os objetos verificam a condição $P$. Em português: "todo", "cada", "qualquer".
- $\exists x\, P(x)$: **pelo menos um** objeto verifica $P$. Em português: "algum", "existe", "há", "um".

Repara que $\exists$ não diz "só um", diz "um ou mais". "Existe um aluno na sala" continua verdadeiro se houver três.

## Os dois padrões de tradução

Quase todas as traduções usam um de dois moldes. Decora-os, porque trocar o molde é o erro mais penalizado:

- **Todo o A é B:** $\forall x\,(A(x) \to B(x))$. O universal combina com o **condicional**. "Todos os alunos de MDIS estão na sala": $\forall x\,(AlunoMDIS(x) \to NaSala(x))$.
- **Algum A é B:** $\exists x\,(A(x) \land B(x))$. O existencial combina com a **conjunção**. "Algum aluno de MDIS está na sala": $\exists x\,(AlunoMDIS(x) \land NaSala(x))$.

Porquê? Testa a combinação errada $\forall x\,(A(x) \land B(x))$: ela exige que _todos_ os objetos sejam A, o que é demasiado forte. E $\exists x\,(A(x) \to B(x))$ é demasiado fraca: basta um objeto que não seja A para o condicional ser vacuamente verdadeiro, por isso a frase diria quase nada. Quando traduzires, pergunta sempre: "esta tradução diz exatamente o que a frase portuguesa diz, nem mais nem menos?"

## Negar frases quantificadas

A negação troca os quantificadores:

- $\lnot \forall x\, P(x) \equiv \exists x\, \lnot P(x)$. "Nem todos sabem programar" equivale a "existe quem não saiba".
- $\lnot \exists x\, P(x) \equiv \forall x\, \lnot P(x)$. "Não há erros no programa" equivale a "tudo está sem erros".

Exemplo completo: negar "todos os corvos são pretos", $\forall x\,(Corvo(x) \to Preto(x))$.

1. $\exists x\, \lnot(Corvo(x) \to Preto(x))$.
2. Como $A \to B \equiv \lnot A \lor B$, negar dá $A \land \lnot B$: $\exists x\,(Corvo(x) \land \lnot Preto(x))$.
3. Em português: "existe um corvo que não é preto". É exatamente o que esperavas: um contraexemplo deita abaixo um "todos".

## Múltiplos quantificadores e a ordem

Com dois quantificadores, a ordem interessa quando eles são diferentes. Compara:

- $\forall x\, \exists y\, Gosta(x, y)$: "toda a gente gosta de alguém" (o alguém pode variar de pessoa para pessoa).
- $\exists y\, \forall x\, Gosta(x, y)$: "há alguém de quem toda a gente gosta" (a mesma pessoa para todos).

A segunda implica a primeira, mas não o contrário. Um contraexemplo: duas pessoas $a$ e $b$ onde cada uma gosta só de si própria. Aí $\forall x\, \exists y\, Gosta(x, y)$ é verdadeira, mas $\exists y\, \forall x\, Gosta(x, y)$ é falsa, porque ninguém é gostado por ambas. Quantificadores iguais podem trocar ($\forall x\, \forall y$ é o mesmo que $\forall y\, \forall x$); quantificadores diferentes, não.

## Forma prenexa e âmbito

Diz-se que uma fórmula está na **forma prenexa** quando todos os quantificadores estão à frente: $Q_1x_1\, Q_2x_2 \dots Q_nx_n\, M$, onde $M$ não tem quantificadores. Converter para esta forma (empurrando negações para dentro com as leis da secção anterior) ajuda a comparar frases e a preparar provas. O **âmbito** de um quantificador é a parte da fórmula onde a variável está ligada por ele; fora do âmbito, outra variável com o mesmo nome seria uma variável diferente.

## Provas com quantificadores

Há quatro movimentos, dois por quantificador:

- **Eliminação do universal:** de $\forall x\, P(x)$ infere $P(c)$ para qualquer objeto $c$. O que vale para todos vale para cada um.
- **Introdução do existencial:** de $P(c)$ para um objeto concreto $c$, infere $\exists x\, P(x)$. Um exemplo basta para um "existe".
- **Instanciação existencial (eliminação do existencial):** de $\exists x\, S(x)$, escolhe um nome **novo** $c$ e assume $S(c)$. É como dizer "chamemos-lhe Zé" a um objeto cuja existência já provaste. A condição do nome novo é essencial: não podes reutilizar um nome que já designa outro objeto.
- **Prova condicional geral e generalização universal:** para provar $\forall x\,(P(x) \to Q(x))$, escolhe um objeto **arbitrário** $c$ (nome novo), assume $P(c)$ e prova $Q(c)$. Como $c$ podia ser qualquer um, o resultado vale para todos.

## Exemplo: o silogismo em forma moderna

Prova que "todos os alunos do terceiro ano sabem programar" segue de "todos os alunos com boa nota a Programação sabem programar" e "todos os alunos do terceiro ano tiveram boa nota a Programação".

Escreve $T(x)$ para "é do terceiro ano", $B(x)$ para "teve boa nota" e $S(x)$ para "sabe programar". As premissas são $\forall x\,(B(x) \to S(x))$ e $\forall x\,(T(x) \to B(x))$.

1. Escolhe um aluno arbitrário $z$ e assume $T(z)$. (Generalização universal mais prova condicional.)
2. Instancia a segunda premissa em $z$: $T(z) \to B(z)$. Com $T(z)$, obténs $B(z)$ por modus ponens.
3. Instancia a primeira em $z$: $B(z) \to S(z)$. Com $B(z)$, obténs $S(z)$.
4. Como $z$ era arbitrário e só assumiste $T(z)$, concluis $\forall x\,(T(x) \to S(x))$.

Este é o molde da prova condicional geral: arbitrário dentro, universal fora. Reconhecê-lo no enunciado ("para um $x$ qualquer...") diz-te logo que regra usar.

## Verdades lógicas com quantificadores

Nem tudo o que parece válido é válido, e a diferença entre **tautologia** (verdade só pela estrutura booleana) e **verdade lógica** (verdade em todos os mundos, incluindo pelos quantificadores) cai nos testes. Exemplos para fixar:

- $\exists x\, Cube(x) \lor \exists x\, \lnot Cube(x)$ é verdade lógica, mas $\forall x\, Cube(x) \lor \forall x\, \lnot Cube(x)$ não é: num mundo com um cubo e um não cubo, a segunda é falsa.
- $\forall x\, Cube(x) \lor \lnot\forall x\, Cube(x)$ é tautologia (tem a forma $P \lor \lnot P$).
- De $\forall x\, Cube(x)$ e $\forall x\, Small(x)$ segue $\forall x\,(Cube(x) \land Small(x))$, mas de $\exists x\, Cube(x)$ e $\exists x\, Small(x)$ **não** segue $\exists x\,(Cube(x) \land Small(x))$: o cubo e o pequeno podem ser objetos diferentes.

:::tip[Como testar um argumento com quantificadores]
Tenta construir um mundo pequeno (dois ou três objetos) onde as premissas sejam verdadeiras e a conclusão falsa. Se conseguires, o argumento é inválido. Se a conclusão "tem de" seguir em qualquer mundo que tentes, formula a prova com as quatro regras acima.
:::

## De volta ao essencial

Traduzir bem é metade da cadeira: o molde universal com $\to$ e o molde existencial com $\land$, a negação que troca $\forall$ por $\exists$, e a ordem dos quantificadores mistos. Com isto, as definições de [relações](/cadeiras/md/conjuntos-relacoes/), [funções](/cadeiras/md/ordens-funcoes/) e [congruências](/cadeiras/md/inteiros-congruencias/) passam a ler-se como frases precisas em vez de símbolos decorados.
