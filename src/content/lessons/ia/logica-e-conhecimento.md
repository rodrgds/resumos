---
title: Lógica e conhecimento
description: Lógica proposicional e de primeira ordem, inferência e encadeamento para a frente e para trás.
section: conteudo
order: 6
---

Para pesquisar, o agente precisa do problema bem descrito. A **representação do conhecimento** guarda factos e regras numa **base de conhecimento**, e a **inferência** deriva conclusões novas a partir dela. A lógica proposicional e a lógica de primeira ordem dão a linguagem; o encadeamento para a frente e para trás dão os dois sentidos de uso. O exemplo desta página usa blocos, com três regras e um objetivo provado das duas maneiras.

## A base de exemplo

Factos sobre blocos: $Bloco(a)$, $Bloco(b)$, $Sobre(a, b)$ e $Sobre(b, mesa)$. Regras com variáveis (lê $x$, $y$ e $z$ como "para todos"):

- R1: $Sobre(x, y) \to Acima(x, y)$. Estar sobre implica estar acima.
- R2: $Acima(x, y) \land Acima(y, z) \to Acima(x, z)$. "Acima" é transitiva.
- R3: $Bloco(x) \land Sobre(x, y) \to PrecisaDe(y, x)$. O que está por baixo suporta o de cima.

As conetivas $\land$ e $\to$ e a mecânica de tabelas de verdade estão recordadas na página de [lógica proposicional](/cadeiras/md/logica-proposicional/). A novidade aqui são os quantificadores e as variáveis: uma regra com variáveis representa todas as suas instâncias concretas de uma vez, o que compacta muito face a escrever cada caso.

## Encadeamento para a frente

O encadeamento para a frente parte dos factos e aplica regras até derivar o objetivo ou esgotar as conclusões. Queremos provar $Acima(a, mesa)$:

1. R1 com $x = a$, $y = b$, a partir de $Sobre(a, b)$: deriva $Acima(a, b)$.
2. R1 com $x = b$, $y = mesa$, a partir de $Sobre(b, mesa)$: deriva $Acima(b, mesa)$.
3. R2 com $x = a$, $y = b$, $z = mesa$, a partir de 1 e 2: deriva $Acima(a, mesa)$. Objetivo provado.

Cada passo instancia as variáveis com objetos concretos e só dispara quando as premissas já estão na base. É o modo dos sistemas que reagem a dados novos: chega um facto, disparam as regras, a base cresce. O risco é derivar muito que não interessa ao objetivo.

## Encadeamento para trás

O encadeamento para trás parte do objetivo e procura regras que o conclusam, transformando-o em subobjetivos até chegar a factos. Para $Acima(a, mesa)$:

1. Que regra conclui algo da forma $Acima(\_, \_)$ com $mesa$ no fim? R2, com $x = a$ e $z = mesa$. Subobjetivos: $Acima(a, y)$ e $Acima(y, mesa)$, para algum $y$.
2. Tenta $y = b$. $Acima(a, b)$ conclui-se por R1 com $x = a$, $y = b$, cujo subobjetivo $Sobre(a, b)$ é facto. Primeiro ramo fechado.
3. $Acima(b, mesa)$ conclui-se por R1 com $x = b$, $y = mesa$, cujo subobjetivo $Sobre(b, mesa)$ é facto. Segundo ramo fechado. Objetivo provado.

Repara na escolha do passo 2: $y = b$ não caiu do céu, é o único objeto que aparece como "meio" nos factos $Sobre$. Em geral, o encadeamento para trás pesquisa sobre substituições possíveis, e é por isso que a programação em lógica (Prolog) se comporta como uma pesquisa com retrocesso: cada escolha de regra e de instância é um ramo.

:::details[O papel de R3 no exemplo]
R3 nunca foi usada na prova, e está no exemplo de propósito. O encadeamento para a frente com R3 derivaria $PrecisaDe(b, a)$ e $PrecisaDe(mesa, b)$, conclusões verdadeiras mas inúteis para este objetivo. É a demonstração viva do defeito do encadeamento para a frente: deriva tudo o que as regras permitem, não só o que precisas.
:::

## Sistemas periciais e limites

Um **sistema pericial** é uma base de conhecimento grande com um motor de inferência, tipicamente para trás, que explica as conclusões mostrando as regras usadas. Foram a primeira aplicação comercial da IA (diagnóstico, configuração) e funcionam bem em domínios estreitos com regras claras.

O limite é a aquisição e a rigidez: alguém tem de escrever as regras, e o mundo fora delas não existe para o sistema. Quando as regras são incertas ou aprendidas de dados, passam a interessar as probabilidades da próxima página em vez da verdade absoluta desta.
