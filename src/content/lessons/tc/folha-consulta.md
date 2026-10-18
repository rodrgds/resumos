---
title: Cheat sheet de TC
description: Condições, construções e erros a conferir em linguagens, autómatos, gramáticas e computabilidade.
section: recursos
studyKind: revision
---

Decide primeiro o que precisas: reconhecer, converter, provar ou calcular custos. Cada linha dá a condição exata e o erro que a quebra. As ligações levam às construções completas.

## Reconhecer uma palavra

| Modelo          | Condição de aceitação                                                                        | Erro que quebra                                 |
| --------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| DFA             | Estado final **depois de consumir toda a entrada**                                           | Parar a meio num final                          |
| NFA             | **Existe** ramo que consome tudo até um final                                                | Exigir que todos os ramos terminem em final     |
| ε-NFA           | Simula com fecho-ε antes e depois de cada letra; no fim aceita se o conjunto contém um final | Esquecer o fecho inicial ou aceitar a meio      |
| PDA final       | Entrada consumida e estado em $F$                                                            | Chegar a final com entrada restante             |
| PDA pilha vazia | Entrada consumida e pilha vazia                                                              | Esvaziar antes de consumir tudo                 |
| TM              | Parar num final aceita, mesmo sem consumir o resto; parar fora de final rejeita              | Confundir o limite do simulador com não paragem |

Só a linha TM dispensa consumo total. Uma máquina que entra logo num final aceita, mesmo sem ler o resto da fita.

Um DFA incompleto no desenho abrevia um poço para as transições omitidas; isto não vale para PDA ou TM em geral. Para determinizar, com o conjunto atual $S$ já fechado, $\delta_D(S,a)=E(\bigcup_{q\in S}\delta_N(q,a))$, com fecho-ε aplicado depois de cada letra e conjunto inicial $E(\{q_0\})$. Um subconjunto é final quando intersecta $F$. Para complementar, determiniza, completa e troca finais num DFA. [DFA](/cadeiras/tc/automatos-finitos/), [NFA](/cadeiras/tc/automatos-nao-deterministas/).

## Descrever e converter

| Tarefa                 | Procedimento mínimo                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ler expressão          | Precedência: estrela, depois concatenação, depois união; $01^*\ne(01)^*$                                                                                            |
| Thompson               | Fragmentos com entrada e saída; a união escolhe por ε, a concatenação liga a saída de $E$ à entrada de $F$ e a estrela salta ou repete; só a saída final fica final |
| Eliminar estado $k$    | Para estados sobreviventes $i\ne k$ e $j\ne k$, $R'_{ij}=R_{ij}+R_{ik}(R_{kk})^*R_{kj}$, sempre com os rótulos anteriores à ronda                                   |
| Derivada $D_a$         | $L(D_a(E))=\{w\mid aw\in L(E)\}$; $D_a(EF)\equiv D_a(E)F+D_a(F)$ se $E$ aceita $\varepsilon$, senão $D_a(E)F$                                                       |
| Equivalência           | Converte para DFA, constrói o produto e procura um par com exatamente uma componente final; exemplos não provam igualdade                                           |
| Complementar expressão | Converte para autómato, determiniza, completa, troca finais e converte de novo; nunca basta trocar operadores                                                       |

$\emptyset\ne\{\varepsilon\}$; $L\emptyset=\emptyset$; $L\{\varepsilon\}=L$; $\emptyset^*=\{\varepsilon\}$. A igualdade $(E+F)^*=E^*+F^*$ não vale em geral: com $E=a$ e $F=b$, a palavra $ab$ pertence a $(E+F)^*$ mas não a $E^*+F^*$. Quando $E=F$, os dois lados coincidem, por isso esse caso não serve como contraexemplo. [Conversões](/cadeiras/tc/expressoes-automatos/).

## Provar e decidir

| Pergunta                    | Resposta, sempre num DFA completo para decisão e minimização                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Finitas                     | Toda a linguagem finita é regular: une uma expressão por palavra                                                                                                                     |
| Fecho por produto           | União (pelo menos uma componente final), interseção (ambas finais) e diferença de dois DFA; a construção do produto só muda o critério dos finais                                    |
| Outras operações regulares  | Complemento por troca de finais; concatenação, estrela, reverso, quocientes e intercalação por construções próprias, não por troca de finais no produto                              |
| Vazio                       | Nenhum estado final é alcançável a partir do início                                                                                                                                  |
| Infinito                    | No DFA, existe um ciclo alcançável do início do qual se alcança um final; um ciclo só de ε num NFA não chega                                                                         |
| Inclusão $L_1\subseteq L_2$ | A diferença $L_1\setminus L_2$ é vazia                                                                                                                                               |
| Minimizar                   | Parte de um DFA completo; retira inacessíveis, marca pares final/não final, propaga marcas pelos destinos e repete até nenhuma ronda produzir marcas novas; junta os pares sem marca |
| Fecho CFL                   | União, concatenação, estrela, reverso e interseção **com uma regular**; sem interseção geral, complemento ou diferença                                                               |
| Decidível em CFG            | Pertença por CYK e vazio pelo teste de início gerador; sem decisor para equivalência, universalidade ou ambiguidade                                                                  |

**Lema regular:** existe $p\ge1$ tal que toda $s\in L$ com $|s|\ge p$ admite $s=xyz$ com $|xy|\le p$, $|y|\ge1$ e $xy^iz\in L$ para todo $i\ge0$.

**Lema CFL:** existe $p\ge1$ tal que toda $s\in L$ com $|s|\ge p$ admite $s=uvwxy$ com $|vwx|\le p$, $|vx|\ge1$ e $uv^iwx^iy\in L$ para todo $i\ge0$.

Em ambos: supõe a classe, recebe $p$, escolhe $s$ em função de $p$, cobre **todos** os cortes válidos e exibe um $i$ cuja palavra bombeada sai de $L$. Um corte que falha não prova nada e um corte que funciona numa palavra isolada não prova pertença. [Limites](/cadeiras/tc/limites-regulares/), [CFL](/cadeiras/tc/propriedades-livres/).

## Gramáticas e pilhas

- Uma CFG é $G=(V,\Sigma,P,S)$ com $S$ inicial; cada produção tem a forma $A\to\alpha$ com uma variável à esquerda. A linguagem é $L(G)=\{w\in\Sigma^*\mid S\Rightarrow^*w\}$; prova sempre as duas inclusões.
- Tipo 3: todas lineares à direita ou todas à esquerda. Tipo 2: uma variável à esquerda. Tipo 1: regras $u\to v$ com $|u|\le|v|$, admitindo $S\to\varepsilon$ só se $S$ não aparece em lados direitos. Classifica as regras dadas, não a menor classe da linguagem.
- Uma gramática é ambígua quando uma palavra tem duas árvores distintas, ou seja, duas derivações mais à esquerda distintas. As ordens esquerda e direita da mesma árvore não contam.
- No PDA, o topo fica à esquerda; $a,X/\alpha$ lê $a$ e substitui $X$ por $\alpha$. A variável $[pXq]$ gera as palavras que levam de $p$ a $q$ removendo $X$ sem mexer na pilha abaixo.
- Para simplificar: elimina produções vazias por combinações (preserva $\varepsilon$ só se pertencia à linguagem, com início novo), depois unitárias copiando produções, depois variáveis não geradoras e inacessíveis. CNF: $A\to BC$ ou $A\to a$, com $S_0\to\varepsilon$ isolado e $S_0$ fora dos lados direitos.
- CYK com palavra não vazia: preenche intervalos por comprimento crescente com todos os cortes; numa produção $A\to BC$, $B$ gera o prefixo esquerdo e $C$ o sufixo direito. Aceita se o início está no intervalo total. Custo $O(n^3)$ tempo e $O(n^2)$ espaço para gramática fixa. [Gramáticas](/cadeiras/tc/gramaticas-livres/), [pilhas](/cadeiras/tc/automatos-pilha/).

## Computabilidade e custo

- Um reconhecedor aceita cada palavra de $L$ e, fora de $L$, rejeita ou corre para sempre. Um decisor termina sempre com a resposta certa. Se $L$ e $\overline L$ são reconhecíveis, então $L$ é decidível por simulação alternada.
- $HALT$ e $A_{TM}$ são reconhecíveis e indecidíveis. Uma redução $A\le_m B$ usa $f$ total computável com $x\in A\iff f(x)\in B$; para provar $B$ indecidível, reduz um $A$ já indecidível a $B$.
- P decide por TM determinística em tempo polinomial. NP tem, para cada resposta sim, um certificado de comprimento polinomial verificado em tempo polinomial por um verificador determinístico; fora de $L$, nenhum certificado passa. A inclusão $P\subseteq NP$ está estabelecida; a igualdade $P=NP$ continua em aberto.
- Um problema é **NP-difícil** quando todo o problema de NP se reduz a ele em tempo polinomial. É **NP-completo** quando é NP-difícil e pertence a NP. Para provar, descreve certificado, tamanho e verificador, depois reduz um NP-completo conhecido com as duas implicações e o custo.
- Um inteiro $N\ge1$ em binário usa $\lfloor\log_2N\rfloor+1$ bits ($N=0$ à parte); $N$ iterações são exponenciais no comprimento $n$. [Turing](/cadeiras/tc/turing-decidibilidade/), [complexidade](/cadeiras/tc/complexidade/).
