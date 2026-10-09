## Pesquisa sequencial e binária

- **Sequencial:** funciona sem ordenação; pior caso $\Theta(n)$, melhor caso $\Theta(1)$ e espaço auxiliar $O(1)$. A média $(n+1)/2$ comparações pressupõe alvo presente e posição uniforme.
- **Binária:** exige vetor ordenado e acesso direto ao meio. Custa $O(\log(n+1))$ e usa $O(1)$ de espaço auxiliar.
- Ordenar para `q` consultas custa $O(n\log n+q\log n)$; percorrer em cada consulta pode custar $O(nq)$. Guarda os índices originais se forem necessários.

## Fronteiras e repetidos

| Limite num vetor crescente | Primeira posição procurada | Teste que exclui o meio e a esquerda |
| -------------------------- | -------------------------- | ------------------------------------ |
| `lower_bound(x)`           | valor `>=x`                | `v[m]<x`                             |
| `upper_bound(x)`           | valor `>x`                 | `v[m]<=x`                            |

1. Começa com `l=0,r=n` e mantém o intervalo `[l,r)`.
2. Enquanto `l<r`, calcula `m=l+(r-l)/2`.
3. Se o teste da tabela for verdadeiro, faz `l=m+1`; caso contrário, `r=m`.
4. Ao terminar, devolve `l`. Pode valer `n`, que não é uma posição consultável.

No limite inferior, antes de `l` só há valores `<x`; a partir de `r`, só valores `>=x`.

Em `[1,3,3,3,8]`, os limites de 3 são 1 e 4: há `4-1=3` ocorrências. Parar numa igualdade não garante a primeira ocorrência.

Com iteradores apenas de avanço, comparações logarítmicas podem exigir avanços lineares; num `set`, usa `set.lower_bound`.

## Pesquisa binária da resposta

Exige predicado **falso antes da fronteira e verdadeiro a partir dela**.

Para dividir pesos **positivos**, sem alterar a ordem, em no máximo `k` grupos contíguos:

1. Pesquisa a capacidade `M` entre o maior peso e a soma `S`.
2. Testa `M` enchendo cada grupo até o próximo peso já não caber. Se um peso exceder `M`, rejeita.
3. Aceita se o número de grupos for no máximo `k`. Aumentar `M` conserva uma divisão válida.

O guloso maximiza cada prefixo e minimiza o número de grupos. Cada teste custa $O(n)$; total $O(n\log(S+1))$, espaço $O(1)$.

| Pesos `[5,2,8,4]`, até 2 grupos | Divisão gulosa        | Resultado     |
| ------------------------------- | --------------------- | ------------- |
| `M=11`                          | `[5,2]`, `[8]`, `[4]` | inviável      |
| `M=12`                          | `[5,2]`, `[8,4]`      | mínimo viável |

Pesos negativos invalidam esta justificação. Com positivos e `1<=k<=n`, «exatamente `k` grupos não vazios» equivale a «no máximo `k`», pois podes subdividir sem aumentar a soma máxima.

## Bisseção real

- Exige função **contínua** e sinais opostos nos extremos. Garante uma raiz, sem garantir unicidade; uma raiz de multiplicidade par pode não mudar de sinal.
- Conserva a metade que mantém a mudança de sinal. Após `k` divisões de um intervalo de largura `L`, a largura é `L/2^k`; o meio tem erro de localização no máximo metade dessa largura, em aritmética exata.
- Em `double`, termina também se o meio coincidir com um extremo ou atingir o limite de iterações. Compara sinais sem multiplicar; intervalo pequeno e `f(x)` pequeno são critérios diferentes.

[Justificação dos métodos](/cadeiras/aed/pesquisa-ordenacao/).
