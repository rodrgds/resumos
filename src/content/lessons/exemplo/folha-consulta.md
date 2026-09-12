---
title: Cheat sheet de somas
description: Fórmula, limites do ciclo e verificações rápidas do exemplo.
section: recursos
studyKind: revision
editorial:
  coverage: Soma dos primeiros inteiros não negativos, implementação por ciclo e custo no modelo de operações constantes.
  gaps:
    - Exemplo fictício, sem programa curricular associado.
---

## Soma de 1 até n

Para $n\in\mathbb{N}_0$:

$$
S_n = \sum_{k=1}^{n} k = \frac{n(n+1)}{2}.
$$

Caso vazio: $S_0=0$. Para $n\ge 1$, $S_n=S_{n-1}+n$.

| Consulta                    | Resultado                                               |
| --------------------------- | ------------------------------------------------------- |
| Último termo incluído       | n                                                       |
| Limites do ciclo em Python  | `range(1, n + 1)`                                       |
| Valor inicial do acumulador | 0                                                       |
| Custo do ciclo              | Θ(n) atualizações                                       |
| Custo da fórmula            | Θ(1), se cada operação aritmética tiver custo constante |

Verifica $n=0$, $n=1$ e $n=4$: deves obter 0, 1 e 10. O limite de `range` é exclusivo. Inteiros de precisão arbitrária exigem uma análise do custo em bits se os valores crescerem sem limite.

[Rever a justificação e o código](/exemplo/apontamentos/#uma-ideia-de-cada-vez) · [Praticar](/exemplo/apontamentos/#exercicios)
