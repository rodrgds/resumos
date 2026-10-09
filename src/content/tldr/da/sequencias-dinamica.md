## LCS

Uma subsequência conserva a ordem, podendo omitir elementos. A LCS é uma subsequência comum de comprimento máximo. Não exige contiguidade.

$L[i,j]$ é o comprimento da LCS dos primeiros $i$ símbolos de $X$ e $j$ de $Y$:

$$
L[i,j]=\begin{cases}
0,&i=0\text{ ou }j=0,\\
1+L[i-1,j-1],&X[i-1]=Y[j-1],\\
\max(L[i-1,j],L[i,j-1]),&X[i-1]\ne Y[j-1].
\end{cases}
$$

Reconstrói de $(|X|,|Y|)$: símbolos iguais dão diagonal e guardam o símbolo; diferentes dão cima ou esquerda conforme o máximo. Inverte o resultado. Empates podem dar soluções diferentes: `ABCD` e `BACD` têm `ACD` e `BCD`, ambas de comprimento 3.

Tempo e tabela $O(|X||Y|)$. Duas linhas bastam para o comprimento, mas não guardam todo o percurso.

## Distância de edição

Levenshtein minimiza inserções, remoções e substituições, cada uma com custo 1. Manter um símbolo custa zero. $D[i,j]$ transforma os prefixos de comprimentos $i,j$:

$$D[i,0]=i,\qquad D[0,j]=j,$$

$$
D[i,j]=\min\begin{cases}
D[i-1,j]+1&\text{remoção},\\
D[i,j-1]+1&\text{inserção},\\
D[i-1,j-1]+[X[i-1]\ne Y[j-1]]&\text{manter/substituir}.
\end{cases}
$$

A condição entre colchetes vale 1 se verdadeira, 0 caso contrário. Guarda a operação escolhida para reconstruir um alinhamento. `canto` para `gato` custa 2: substituir `c` e remover `n`.

Tempo $O(|X||Y|)$; espaço igual para a tabela, ou $O(\min(|X|,|Y|))$ para apenas a distância. Define a unidade do símbolo: o programa da lição usa bytes, que não correspondem sempre a caracteres Unicode.

Sem substituições, o mínimo seria $|X|+|Y|-2|LCS|$. Com substituição de custo 1, `a` para `b` custa 1, em vez de 2.

## Cadeia de matrizes

Mantém a ordem dos fatores e escolhe só os parênteses. Para $A_i$ de dimensões $p_{i-1}\times p_i$, o produto usual de $r\times s$ por $s\times t$ custa $rst$ multiplicações escalares.

$M[i,j]$ é o menor custo da cadeia $A_i\cdots A_j$:

$$M[i,i]=0,$$

$$M[i,j]=\min_{i\le k<j}\big(M[i,k]+M[k+1,j]+p_{i-1}p_kp_j\big).$$

Preenche intervalos por comprimento crescente e guarda a divisão vencedora $k$ para reconstruir. São $\Theta(n^2)$ estados e $O(n)$ divisões por estado: tempo $O(n^3)$, espaço $O(n^2)$.

Para $A:5\times10$, $B:10\times3$, $C:3\times12$, $(AB)C$ custa $150+180=330$; $A(BC)$ custa $360+600=960$. A tabela calcula um plano, não os elementos do produto. Dimensões incompatíveis invalidam a cadeia antes da otimização.

[Tabelas e reconstrução completas](/cadeiras/da/sequencias-dinamica/).
