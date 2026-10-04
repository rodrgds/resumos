from math import ceil, sqrt
from potencia_apoio import desenhar_potencia
from scipy import stats

mu0 = 100
mu1 = 102
sigma = 8
alpha = 0.05
potencia_pretendida = 0.80
resultados = []
for n in (64, 256):
    se = sigma / sqrt(n)
    limite = mu0 + stats.norm.isf(alpha) * se
    beta = stats.norm.cdf(limite, loc=mu1, scale=se)
    print(f"n={n}; limite={limite:.6f}; beta={beta:.6f}; potência={1 - beta:.6f}")
    resultados.append((n, se, limite))
q = stats.norm.isf(alpha / 2)
se_bilateral = sigma / sqrt(64)
beta_bilateral = stats.norm.cdf(mu0 + q * se_bilateral, loc=mu1, scale=se_bilateral) - stats.norm.cdf(mu0 - q * se_bilateral, loc=mu1, scale=se_bilateral)
print(f"Bilateral, n=64: beta={beta_bilateral:.6f}; potência={1 - beta_bilateral:.6f}")
n_planeado = ceil((sigma * (stats.norm.isf(alpha) + stats.norm.isf(1 - potencia_pretendida)) / (mu1 - mu0)) ** 2)
print(f"n para potência {potencia_pretendida:.0%} unilateral: {n_planeado}")
desenhar_potencia(mu0, mu1, resultados)
