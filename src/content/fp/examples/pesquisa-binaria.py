def binaria(valores, alvo):
    inicio, fim = 0, len(valores) - 1
    while inicio <= fim:
        meio = (inicio + fim) // 2
        if valores[meio] == alvo:
            return meio
        if alvo < valores[meio]:
            fim = meio - 1
        else:
            inicio = meio + 1
    return None
