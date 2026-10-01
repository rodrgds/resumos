a, b, c, d = 4, 1, 2, 3
t = a + d
det = a * d - b * c
disc = t * t - 4 * det
if disc < 0:
    print("A matriz não tem valores próprios reais.")
else:
    r = disc ** 0.5
    print((t - r) / 2, (t + r) / 2)
