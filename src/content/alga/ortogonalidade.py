from fractions import Fraction as F

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

base = []
for v in [(1, 1, 0), (1, 0, 1), (0, 1, 1)]:
    u = list(map(F, v))
    for anterior in base:
        fator = dot(v, anterior) / dot(anterior, anterior)
        u = [x - fator * y for x, y in zip(u, anterior)]
    if any(u):
        base.append(u)
for u in base:
    print([str(x) for x in u])
print([dot(base[i], base[j]) for i in range(3) for j in range(i)])
