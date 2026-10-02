def mostrar_tabela_cyk(table, n):
    for length in range(1, n + 1):
        cells = ["{" + ",".join(sorted(table[i, length])) + "}"
                 for i in range(n - length + 1)]
        print(f"comprimento {length}: " + " ".join(cells))
