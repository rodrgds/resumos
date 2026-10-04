from matrizes_apoio import validar_produto

def mul(a, b):
    validar_produto(a, b)
    return [[sum(x * y for x, y in zip(row, col)) for col in zip(*b)] for row in a]

a = [[2, 1], [0, 3]]
b = [[1, -1], [4, 2]]
print(mul(a, b))
print(mul(b, a))
