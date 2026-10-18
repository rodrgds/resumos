## Escolhe o método

- Vetor desordenado: percorre tudo. Pior $\Theta(n)$, espaço $O(1)$. Média $(n+1)/2$ só com alvo presente e posição uniforme.
- Vetor ordenado com acesso direto: pesquisa binária, $O(\log(n+1))$. Numa lista ligada, chegar ao meio já custa deslocações.
- Uma só consulta raramente paga a ordenação. Para `q` consultas, compara $O(n\log n+q\log n)$ com $O(nq)$.

## Limites com repetidos

Cada limite é uma posição de inserção, não «o valor encontrado».

| Pretendes        | Procura o primeiro | Descarta esquerda com |
| ---------------- | ------------------ | --------------------- |
| `lower_bound(x)` | `>=x`              | `v[m]<x`              |
| `upper_bound(x)` | `>x`               | `v[m]<=x`             |

Procedimento com `[l,r)`, a começar em `[0,n)`:

1. Enquanto `l<r`, calcula `m=l+(r-l)/2`.
2. Se o teste for verdadeiro, `l=m+1`. Senão, `r=m`.
3. Devolve `l`. Pode ser `n`.

Em `[1,3,3,3,8]`, os limites de 3 são 1 e 4. Há `4-1=3` ocorrências. Confirma presença com `l<n` e `v[l]==x` antes de leres. Contar «diferentes de `x`» dá `n-(upper-lower)`.

## Resposta monótona

Usa quando a pergunta é «qual o menor valor viável» e a viabilidade só muda uma vez, de falso para verdadeiro.

Para pesos positivos em no máximo `k` grupos contíguos:

1. Pesquisa `M` entre o maior peso e a soma total.
2. Enche cada grupo até o próximo já não caber. Peso acima de `M` rejeita logo.
3. Aceita se couber em `k` grupos. Mais capacidade nunca estraga uma divisão válida.

Cada teste percorre o vetor em $O(n)$. Total $O(n\log(S+1))$. Com `[5,2,8,4]` e dois grupos, `M=11` precisa de três grupos e `M=12` usa `[5,2]` e `[8,4]`. Pesos negativos quebram o argumento guloso.

## Raiz real por bisseção

- Pede continuidade e sinais opostos nos extremos. Garante existência, não unicidade.
- Fica com a metade que conserva a mudança de sinal. Após `k` cortes, a largura divide-se por $2^k$.
- Em `double`, para também quando o meio encosta a um extremo ou esgota iterações. Compara sinais sem os multiplicar.

[Demonstrações e traços](/cadeiras/aed/pesquisa-ordenacao/).
