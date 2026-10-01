from math import sqrt
from scipy import stats

x, n = 5, 30
phat = x / n
pt = (x + 2) / (n + 4)
for nome, centro, tamanho in (("Wald", phat, n), ("Mais quatro", pt, n + 4)):
    margem = 1.96 * sqrt(centro * (1 - centro) / tamanho)
    print(f"{nome}: [{max(0, centro-margem):.6f}, {min(1, centro+margem):.6f}]")
z = (30 / 200 - 0.2) / sqrt(0.2 * 0.8 / 200)
print(f"Uma proporção: z={z:.6f}, p esquerda={stats.norm.cdf(z):.6f}")
x1, n1, x2, n2 = 40, 50, 20, 40
p1, p2 = (x1 + 1) / (n1 + 2), (x2 + 1) / (n2 + 2)
se = sqrt(p1 * (1 - p1) / (n1 + 2) + p2 * (1 - p2) / (n2 + 2))
print(f"Mais dois por grupo: centro={p1-p2:.6f}, SE={se:.6f}")
print(f"IC 95%: [{p1-p2-1.96*se:.6f}, {p1-p2+1.96*se:.6f}]")
pcomum = (x1 + x2) / (n1 + n2)
z2 = (x1 / n1 - x2 / n2) / sqrt(pcomum * (1 - pcomum) * (1/n1 + 1/n2))
print(f"Duas proporções: z={z2:.6f}, p bilateral={2*stats.norm.sf(abs(z2)):.6f}")
