---
title: Cheat sheet de TC
description: Condições, construções e erros a conferir em linguagens, autómatos, gramáticas e computabilidade.
section: recursos
studyKind: revision
---

Depois de estudar cada tema nas lições, usa esta página para rever depressa condições e procedimentos antes de resolver exercícios. Não substitui os exemplos completos.

Cada tabela reúne o que há a conferir num tema e aponta para a explicação completa, por isso usa-a para confirmar uma condição, não para aprender o tema pela primeira vez.

## Palavras e expressões

| Conceito           | Conferir                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| Palavra vazia      | $\lvert\varepsilon\rvert=0$; não é símbolo de entrada.                          |
| Linguagem vazia    | $\emptyset\ne\{\varepsilon\}$; $L\emptyset=\emptyset$, $L\{\varepsilon\}=L$.    |
| Potência e estrela | $L^0=\{\varepsilon\}$; $L^*=\bigcup_{k\ge0}L^k$; $\emptyset^*=\{\varepsilon\}$. |
| Complemento        | Relativo ao alfabeto: $\overline L=\Sigma^*\setminus L$.                        |
| Reverso            | $(xy)^R=y^Rx^R$.                                                                |
| Precedência de RE  | Estrela, concatenação, união. $01^*\ne(01)^*$.                                  |

União é comutativa; concatenação não é. $(E+F)^*\not\equiv E^*+F^*$ em geral. [Explicação e contraexemplos](/cadeiras/tc/linguagens-expressoes/).

## Construções regulares

| Tarefa              | Procedimento                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| DFA                 | Define o significado dos estados; uma transição por símbolo; aceita só depois de ler tudo.      |
| NFA                 | Mantém todos os destinos; aceita se algum percurso completo terminar em final.                  |
| Fecho-$\varepsilon$ | Inclui os estados do conjunto e segue zero ou mais arestas vazias.                              |
| NFA para DFA        | Início $E(\{q_0\})$; saída $E(\bigcup_{q\in S}\delta(q,a))$; final se $S\cap F\ne\emptyset$.    |
| Complemento         | Determiniza e completa antes de trocar finais.                                                  |
| Thompson            | Fragmentos com entrada/saída; união escolhe, concatenação liga, estrela permite saltar/repetir. |
| Eliminar $k$        | $R'_{ij}=R_{ij}+R_{ik}(R_{kk})^*R_{kj}$.                                                        |

O DFA de um NFA com $n$ estados tem no máximo $2^n$ estados, contando o conjunto vazio quando alcançável. Não precisa de usar todos. [DFA](/cadeiras/tc/automatos-finitos/), [NFA](/cadeiras/tc/automatos-nao-deterministas/), [conversões](/cadeiras/tc/expressoes-automatos/).

## Fecho, decisão e minimização

Toda a linguagem finita é regular: une uma expressão por palavra.

Regulares são fechadas para união, interseção, complemento, diferença, concatenação, estrela, reverso e quocientes. No produto, as transições são iguais para várias operações; muda o critério dos finais.

- Vazio: nenhum final alcançável.
- Infinito: num DFA, um ciclo alcançável do início e capaz de chegar a final.
- Equivalência: nenhum estado alcançável no produto em que só uma componente seja final.
- Minimização: remove inacessíveis, marca pares final/não final, propaga marcas pelos destinos e junta pares não distinguíveis.

Para provar que dois estados não podem fundir, dá uma continuação que um aceita e o outro rejeita. [Procedimentos e exemplo](/cadeiras/tc/limites-regulares/).

**Lema regular:** se $L$ é regular, $\exists p\ge1$, $\forall s\in L$ com $|s|\ge p$, $\exists x,y,z$ tais que

$$
s=xyz,\quad |xy|\le p,\quad |y|\ge1,
\quad \forall i\ge0,\ xy^iz\in L.
$$

Para refutar: supõe regular, recebe $p$, escolhe $s$, considera qualquer corte válido e escolhe um $i$ que sai de $L$. Não uses o lema para provar regularidade.

## CFG, PDA e CNF

CFG: $G=(V,\Sigma,P,S)$; $A\to\alpha$ tem uma variável à esquerda. $L(G)=\{w\in\Sigma^*\mid S\Rightarrow^*w\}$. Prova ambas as inclusões quando descreves a linguagem.

Tipo 3: regras lineares todas à direita ou todas à esquerda. Tipo 2: uma variável à esquerda. Tipo 1: regras sem diminuir comprimento, com a exceção inicial vazia quando permitida. Tipo 0: lado esquerdo contém uma variável. Classifica as regras dadas, não a menor classe da linguagem. [Hierarquia](/cadeiras/tc/gramaticas-livres/#classificar-gramáticas).

Ambiguidade: uma palavra com duas árvores, ou duas derivações mais à esquerda distintas. Duas ordens de expansão da mesma árvore não bastam. [Gramáticas e ambiguidade](/cadeiras/tc/gramaticas-livres/).

PDA: $(q,w,\gamma)$ regista estado, entrada restante e pilha, com topo à esquerda. $a,X/\alpha$ lê $a$ e substitui $X$ por $\alpha$.

- Estado final: entrada vazia e estado em $F$, sem exigir pilha vazia; chegar a final com entrada restante não aceita.
- Pilha vazia: entrada e pilha vazias, incluindo o marcador de fundo; esvaziar antes de consumir tudo não aceita.
- CFG para PDA: expande a variável do topo por $\varepsilon$; lê e retira terminais iguais.
- PDA para CFG: $[pXq]$ gera o que remove $X$ indo de $p$ a $q$.

Os dois critérios de PDA são equivalentes por conversão de máquinas não determinísticas. A mesma máquina pode ter linguagens diferentes pelos dois critérios. CFG e PDA têm o mesmo poder; DPDA tem menos poder que NPDA. [Construções](/cadeiras/tc/automatos-pilha/).

Simplificar por esta ordem: vazias (substituindo o efeito por combinações), unitárias (copiando produções não unitárias alcançadas), não geradores e depois inacessíveis. Produções vazias e unitárias podem ser essenciais e não se apagam sem substituição. Depois substitui terminais em corpos longos e divide corpos com mais de duas variáveis.

CNF: $A\to BC$ ou $A\to a$. Se $\varepsilon\in L$, permite $S_0\to\varepsilon$, com $S_0$ ausente dos corpos. CYK preenche intervalos por comprimento, tentando cada corte; aceita se o início aparece no intervalo total. Tempo $O(n^3)$ para gramática fixa. [Conversão e tabela](/cadeiras/tc/propriedades-livres/).

## Limites das livres de contexto

CFL são fechadas para união, concatenação, estrela, reverso e interseção com regular. Não são fechadas para interseção geral, complemento ou diferença geral.

**Lema CFL:** $s=uvwxy$, $|vwx|\le p$, $|vx|\ge1$ e $uv^iwx^iy\in L$ para todo $i\ge0$. Bombeiam-se duas partes com o mesmo expoente, possivelmente uma vazia. A zona limitada pode estar em qualquer posição. [Prova e quantificadores](/cadeiras/tc/propriedades-livres/#lema-da-repetição-para-cfl).

Pertença e vazio de CFG são decidíveis. Equivalência, universalidade e ambiguidade de CFG são indecidíveis em geral.

## Turing e complexidade

TM: lê, escreve e desloca a cabeça. Em $\alpha q\beta$, a cabeça lê o primeiro símbolo de $\beta$. A reconhecedora pode não parar fora da linguagem; o decisor para em todas as entradas. Se $L$ e $\overline L$ são reconhecíveis, $L$ é decidível. $HALT$ e $A_{TM}$ são reconhecíveis e indecidíveis. [Modelo e provas](/cadeiras/tc/turing-decidibilidade/).

Redução $A\le_m B$: função total computável que preserva sim/não. Para provar $B$ indecidível, reduz a ele um $A$ já indecidível. Não confundas simular por um limite finito com decidir paragem sem limite.

P: decidir em tempo polinomial. NP: certificado de tamanho polinomial verificável em tempo polinomial. $P\subseteq NP$; $P=NP$ continua em aberto. NP-completo significa estar em NP e ser NP-difícil. Para provar dificuldade de $B$, reduz $A\le_p B$ com $A$ já NP-completo. O tamanho de um inteiro em binário cresce como $\log N$, não como $N$. [Complexidade](/cadeiras/tc/complexidade/).
