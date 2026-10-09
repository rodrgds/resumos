import pandas as pd
vendas = pd.read_csv("vendas.csv", sep=";", decimal=",")
vendas["total"] = vendas["quantidade"] * vendas["preco"]
resumo = vendas.groupby("cidade", as_index=False).agg(
    unidades=("quantidade", "sum"),
    faturacao=("total", "sum"),
    vendas=("produto", "size"),
)
print(resumo.round(2).to_string(index=False))
