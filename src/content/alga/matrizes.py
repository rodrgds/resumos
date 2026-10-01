def mul(a, b):
    if not a or not b or not a[0] or not b[0]:
        raise ValueError("Usa matrizes com pelo menos uma linha e coluna.")
    if any(len(row) != len(a[0]) for row in a):
        raise ValueError("Todas as linhas de A devem ter o mesmo tamanho.")
    if any(len(row) != len(b[0]) for row in b):
        raise ValueError("Todas as linhas de B devem ter o mesmo tamanho.")
    if len(a[0]) != len(b):
        raise ValueError("As colunas de A devem igualar as linhas de B.")
    return [[sum(x * y for x, y in zip(row, col)) for col in zip(*b)] for row in a]

a = [[2, 1], [0, 3]]
b = [[1, -1], [4, 2]]
print(mul(a, b))
print(mul(b, a))
