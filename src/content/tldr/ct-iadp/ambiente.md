## Algoritmo e execução

- Um **algoritmo** é uma sequência finita de passos para resolver um problema. Define entradas, cálculo e resultado esperado antes de escrever código.
- Um script `.py` executa de cima para baixo. A consola executa instruções individuais; um notebook `.ipynb` junta células de código, texto e resultados.
- `sum([2, 4, 6]) / len([2, 4, 6])` dá `4.0`. A sequência tem de ser não vazia para calcular a média.
- Parênteses conservam a ordem pretendida: `(2 + 4 + 6) / 3` dá 4, mas `2 + 4 + 6 / 3` dá 8.

## Estado e reprodução

No Jupyter, `Shift+Enter` executa a célula. A ordem visual pode diferir da ordem de execução, e uma variável antiga pode alterar o resultado.

1. Reinicia o kernel.
2. Executa todas as células por ordem, incluindo imports e leitura dos dados.
3. Confere os resultados e guarda o notebook.

A biblioteca tem de estar instalada no intérprete selecionado. Nos blocos do site, cada execução começa num ambiente descartável e não partilha variáveis com outros blocos.

## Diagnosticar erros

| Erro                               | Conferir                                    |
| ---------------------------------- | ------------------------------------------- |
| `SyntaxError` / `IndentationError` | Sintaxe e indentação dos blocos             |
| `NameError`                        | Nome definido e ordem de execução           |
| `TypeError` / `ValueError`         | Tipo dos operandos e valor da conversão     |
| `IndexError` / `KeyError`          | Limites das posições e existência do rótulo |

Lê o tipo e a causa na última linha do traceback e localiza a linha do teu código. Para uma saída errada sem exceção, calcula um caso pequeno à mão e compara os valores intermédios.
