## CYK

CYK reconhece palavras de uma gramática independente de contexto em **forma normal de Chomsky**: produções $A\to BC$ ou $A\to a$. Regras unitárias ou com três não-terminais precisam de conversão.

A palavra vazia é tratada separadamente se houver $S\to\varepsilon$, com $S$ ausente dos lados direitos.

$T[i,\ell]$ contém os não-terminais que geram o segmento de início $i$ e comprimento $\ell$:

1. Para comprimento 1, inclui $A$ se há $A\to w[i]$.
2. Para cada comprimento crescente $\ell\ge2$, experimenta divisões $1\le k<\ell$.
3. Inclui $A$ se alguma produção $A\to BC$ tem $B\in T[i,k]$ e $C\in T[i+k,\ell-k]$.
4. Aceita a palavra não vazia de comprimento $n$ se $S\in T[0,n]$.

Com $S\to AB\mid AC$, $A\to a$, $B\to BA\mid b$, $C\to AA$:

| Comprimento | Segmentos de `aba` e conjuntos           |
| ----------- | ---------------------------------------- |
| 1           | `a`: $\{A\}$; `b`: $\{B\}$; `a`: $\{A\}$ |
| 2           | `ab`: $\{S\}$; `ba`: $\{B\}$             |
| 3           | `aba`: $\{S\}$ pela divisão `a` e `ba`   |

Há $O(n^2)$ células e $O(n)$ divisões por célula. Para gramática fixa, tempo $O(n^3)$; percorrendo as produções de uma gramática de entrada, $O(n^3|P|)$. Espaço direto $O(n^2|N|)$, com $N$ não-terminais.

Uma célula com dois não-terminais não prova ambiguidade. Esta exige duas árvores distintas **a partir do inicial** para alguma palavra. Guarda produção e divisão para reconstruir uma árvore; guarda todas as alternativas ou contagens para distinguir derivações da mesma palavra.

## Construção de Kleene

A união $R\mid S$ escolhe uma linguagem; $RS$ concatena; $R^*$ repete zero ou mais vezes. $\varnothing$ não gera palavra nenhuma; $\varepsilon$ gera a palavra vazia.

Num autómato de estados $1,\ldots,n$, $R_{ij}^{(k)}$ descreve palavras de caminhos de $i$ a $j$ cujos **intermédios** estão em $1,\ldots,k$.

Inicializa $R_{ij}^{(0)}$ com a união dos rótulos diretos e inclui $\varepsilon$ na diagonal. Sem transição nem caminho vazio, usa $\varnothing$.

$$R_{ij}^{(k)}=R_{ij}^{(k-1)}\mid R_{ik}^{(k-1)}\big(R_{kk}^{(k-1)}\big)^*R_{kj}^{(k-1)}.$$

A segunda alternativa chega a $k$, dá zero ou mais voltas e sai. Sem estrela, perderias repetições. Usa a etapa anterior, sem misturar níveis. A expressão final une $R_{sf}^{(n)}$ para todos os finais $f$.

Com ciclo `a` no inicial, ligação `b` ao final e ciclo `c` no final, a linguagem é $a^*bc^*$. `aaabcc` é aceite; `aaacc` não tem a ligação necessária.

São $O(n^3)$ **combinações**, não uma garantia de tamanho polinomial da expressão expandida. Partilhar subexpressões evita cópias; expandi-las numa string pode continuar caro.

[CYK, ambiguidade e Kleene completos](/cadeiras/da/linguagens-dinamica/).
