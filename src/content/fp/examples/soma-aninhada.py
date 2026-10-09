def soma_aninhada(elementos):
    soma = 0
    for elemento in elementos:
        if isinstance(elemento, list):
            soma += soma_aninhada(elemento)
        else:
            soma += elemento
    return soma

print(soma_aninhada([2, [3, [], [4]], 1]))
print(soma_aninhada([]))
