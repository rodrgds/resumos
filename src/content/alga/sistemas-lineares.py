def gauss(a, b):
    n = len(a)
    if not n or len(b) != n or any(len(row) != n for row in a):
        raise ValueError("Este exemplo exige uma matriz quadrada e um termo por linha.")
    m = [row[:] + [val] for row, val in zip(a, b)]
    for col in range(n):
        piv = max(range(col, n), key=lambda r: abs(m[r][col]))
        m[col], m[piv] = m[piv], m[col]
        if abs(m[col][col]) < 1e-12:
            raise ValueError("Não há solução única. Classifica o sistema pela característica.")
        for row in range(n):
            if row != col and m[row][col] != 0:
                f = m[row][col] / m[col][col]
                for k in range(col, n + 1):
                    m[row][k] -= f * m[col][k]
    return [m[i][n] / m[i][i] for i in range(n)]

a = [[1, 1, 1], [2, -1, 1], [1, 2, -1]]
b = [6, 3, 2]
print([round(v, 9) for v in gauss(a, b)])
