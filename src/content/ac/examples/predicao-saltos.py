resultados = "TNTNTN"
histerese = {0: {"N": 0, "T": 1}, 1: {"N": 0, "T": 3},
             2: {"N": 0, "T": 3}, 3: {"N": 2, "T": 3}}
for modelo in ("histerese", "saturante"):
    estado, erros = 1, 0
    for real in resultados:
        previsto = "T" if estado >= 2 else "N"
        erros += previsto != real
        seguinte = (histerese[estado][real] if modelo == "histerese"
                    else min(3, estado + 1) if real == "T" else max(0, estado - 1))
        print(modelo, format(estado, "02b"), previsto, real, format(seguinte, "02b"))
        estado = seguinte
    print("erros:", erros)
