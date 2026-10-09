## Folha, cabeçalho e tipos

Os exemplos Excel correm em Python local com pandas e openpyxl, fora dos blocos executáveis do site.

```python
import pandas as pd
vendas = pd.read_excel(
    "dados.xlsx", sheet_name="Vendas", header=0,
    dtype={"codigo": "string"}, engine="openpyxl",
)
```

- `sheet_name="Vendas"` escolhe pelo nome; `0` escolhe a primeira folha e `None` devolve um dicionário de DataFrames por folha.
- `pd.ExcelFile(...).sheet_names` permite conferir nomes. `header=2` usa a terceira linha como cabeçalho; `usecols` seleciona colunas.
- Um código `"0012"` deve estar guardado como texto. Se Excel guarda o número 12 com formato visual de quatro algarismos, `dtype="string"` não recupera sozinho os zeros.
- Formatação de casas decimais não altera o valor guardado. Confere nulos, unidades e regras de quantidade e preço antes de calcular.

## Exportar e conferir

```python
with pd.ExcelWriter("relatorio.xlsx", engine="openpyxl") as escritor:
    vendas.to_excel(escritor, sheet_name="Vendas", index=False)
    resumo.to_excel(escritor, sheet_name="Resumo", index=False)
```

`resumo` deve ser a tabela calculada antes da exportação. `index=False` evita escrever as posições como coluna. Usa um nome novo, pois a escrita habitual substitui um ficheiro existente.

Depois, lê ambas as folhas pelos nomes e compara códigos, número de linhas e totais com as tabelas em memória. Ao usar `BytesIO`, termina o contexto de escrita e faz `seek(0)` antes de ler os bytes.

## Fórmulas e apresentação

pandas trabalha com tabelas e não reproduz automaticamente gráficos, células unidas ou toda a formatação. openpyxl não calcula fórmulas Excel: um resultado guardado pode estar desatualizado ou ausente.

Para exportar valores, calcula-os em Python. Se precisas de fórmulas, define a aplicação que as recalcula e confere lá o resultado. Uma leitura sem erro não prova que uma fórmula está atualizada.
