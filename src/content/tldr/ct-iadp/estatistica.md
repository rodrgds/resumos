## Centro e dispersão

Para 2, 3, 5 e 4, a soma é 14 e a média 3,5. Ordenar dá 2, 3, 4, 5 e mediana `(3 + 4) / 2 = 3,5`. A média é mais sensível a extremos; `mode()` pode devolver várias modas.

Para `n` observações conhecidas, com média `m`:

$$
\operatorname{var} = \frac{\sum_{i=1}^{n}(x_i-m)^2}{n-\mathrm{ddof}}.
$$

O denominador tem de ser positivo. pandas usa `ddof=1` em `var` e `std`; NumPy usa `ddof=0`. No exemplo, a soma dos quadrados é 5: variância amostral `5/3`, populacional `5/4`. O desvio padrão é a raiz da variância, na unidade original.

| Medida                | pandas                        | Interpretação                                                        |
| --------------------- | ----------------------------- | -------------------------------------------------------------------- |
| Quantil               | `s.quantile(p)`               | Depende da interpolação, com `0 <= p <= 1`                           |
| Desvio absoluto médio | `(s - s.mean()).abs().mean()` | Distância média à média; `mad()` foi removido                        |
| Erro padrão           | `s.sem()`                     | `std / sqrt(count)`; interpretação amostral exige um modelo adequado |
| Assimetria            | `s.skew()`                    | Sinal positivo sugere cauda à direita                                |
| Excesso de curtose    | `s.kurt()`                    | Referência normal zero; não identifica sozinho a distribuição        |

Com interpolação linear, os quartis dos quatro valores são 2,75 e 4,25. O desvio absoluto médio é 1 e o erro padrão cerca de 0,6455. Poucas observações ou valores constantes podem tornar medidas de forma pouco informativas ou ausentes.

## Contagem, ausências e ordem

- `len(df)` conta linhas; `s.count()` conta valores conhecidos; `nunique()` conta distintos, excluindo nulos por defeito.
- `value_counts(dropna=False)` inclui ausências. Com `normalize=True`, as proporções usam o total de valores considerados como denominador.
- `describe()` resume a coluna; seleciona colunas quantitativas antes de calcular estatísticas de uma tabela mista.
- `cumsum`, `cumprod`, `cummax` e `cummin` usam o prefixo de cada posição. Com `skipna=True`, a posição ausente mantém-se ausente, mas o acumulado pode continuar depois; `skipna=False` propaga a ausência.
- `sort_values` ordena valores e `sort_index` rótulos. `idxmax()` devolve um rótulo máximo; uma máscara de igualdade com o máximo conserva todos os empates.

## Média ponderada e unidade

Para quantidades `q_i` e preços `p_i`, com total de unidades positivo:

$$
\text{preço médio por unidade}=\frac{\sum_i q_i p_i}{\sum_i q_i}.
$$

Duas unidades a 1,50 euros e três a 1,20 dão `6,60 / 5 = 1,32` euros por unidade. A média simples dos preços, 1,35, responde a outra pergunta. Faturação dividida por vendas dá euros por venda, não por unidade.
