## LCS e edição por prefixos

| Problema | Estado                   | Transição                                                    | Custo                             |
| -------- | ------------------------ | ------------------------------------------------------------ | --------------------------------- |
| LCS      | Prefixos $X[..i],Y[..j]$ | Iguais: diagonal $+1$; diferentes: máximo de cima e esquerda | $O(\lvert X\rvert\lvert Y\rvert)$ |
| Edição   | Mesmos prefixos          | Mínimo de remover, inserir, manter ou substituir             | $O(\lvert X\rvert\lvert Y\rvert)$ |

Bases com prefixo vazio: LCS zero; edição custa comprimento do outro. Guarda decisão para reconstruir alinhamento ou sequência.

## Cadeia de matrizes

$$M[i,j]=\min_k(M[i,k]+M[k+1,j]+p_{i-1}p_kp_j).$$

Ordem dos fatores fixa; parênteses escolhem onde dividir. Preenche por comprimento crescente de intervalo. Custo $O(n^3)$ com $O(n^2)$ estados.

[Exemplos e reconstrução](/cadeiras/da/sequencias-dinamica/).
