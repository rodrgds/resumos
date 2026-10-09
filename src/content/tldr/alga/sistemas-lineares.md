## Gauss e Gauss-Jordan

Um sistema real de $m$ equações a $n$ incógnitas escreve-se $Ax=b$. Trabalha na matriz ampliada $[A\mid b]$ e aplica cada operação à linha inteira, incluindo o termo independente.

1. Escolhe um pivô não nulo, trocando linhas se necessário.
2. Elimina as entradas abaixo dele e avança para a coluna seguinte. Os pivôs ficam sucessivamente à direita; as linhas nulas ficam no fim.
3. Em Gauss, resolve por substituição de baixo para cima. Em Gauss-Jordan, transforma os pivôs em 1 e elimina também acima deles.

As operações permitidas são trocar linhas, multiplicar uma linha por um escalar **não nulo** e somar a uma linha um múltiplo de outra. São reversíveis e preservam as soluções.

## Classificação pela característica

A característica $r=\operatorname{car}(A)$ é o número de pivôs de $A$. Com $n$ incógnitas:

| Condição                                                | Soluções                                                        |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| $\operatorname{car}(A)<\operatorname{car}([A\mid b])$   | Nenhuma, sistema impossível                                     |
| $\operatorname{car}(A)=\operatorname{car}([A\mid b])=n$ | Uma, possível e determinado                                     |
| $\operatorname{car}(A)=\operatorname{car}([A\mid b])<n$ | Infinitas, possível e indeterminado, com $n-r$ variáveis livres |

Uma linha $[0\ \cdots\ 0\mid c]$ com $c\ne0$ significa uma contradição. As variáveis livres correspondem às **colunas sem pivô de $A$**, não às linhas nulas.

Por exemplo, a forma reduzida

$$
\left[\begin{array}{ccc|c}1&2&0&5\\0&0&1&2\\0&0&0&0\end{array}\right]
$$

dá $y=t$, $z=2$ e $x=5-2t$. Todas as soluções são $(5,0,2)+t(-2,1,0)$, com $t\in\mathbb R$.

## Sistemas homogéneos e parâmetros

- $Ax=0$ tem sempre a solução nula. Tem soluções não nulas exatamente quando $r<n$.
- Se $x_0$ resolve $Ax=b$, todas as soluções são $x_0+\ker A$, onde $\ker A=\{u:Au=0\}$.
- Com um parâmetro, separa os valores que anulam um pivô **antes de dividir**. Um determinante nulo, sozinho, não distingue impossibilidade de indeterminação.

No sistema $x+ky=1$, $kx+y=1$, eliminar $x$ dá $(1-k^2)y=1-k$:

| Valor de $k\in\mathbb R$ | Resultado                        |
| ------------------------ | -------------------------------- |
| $k\ne\pm1$               | $x=y=1/(1+k)$                    |
| $k=1$                    | $(x,y)=(1-t,t)$, $t\in\mathbb R$ |
| $k=-1$                   | Contradição $0=2$                |

## Inversa por Gauss-Jordan

Para $A$ quadrada, reduz $[A\mid I]$ aplicando as mesmas operações aos dois blocos. Se obtiveres $[I\mid C]$, então $C=A^{-1}$. Se faltar um pivô à esquerda, $A$ não é invertível. Confirma com $AC=I$.

[Discussão de sistemas com parâmetro](/cadeiras/alga/sistemas-lineares/#sistemas-com-um-parâmetro).
