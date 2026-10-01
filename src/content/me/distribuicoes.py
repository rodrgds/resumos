import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

print(f"Binomial: P(X >= 2) = {stats.binom.sf(1, 12, 0.2):.6f}")
print(f"Normal: P(X > 106) = {stats.norm.sf(106, loc=100, scale=4):.6f}")
print(f"Percentil 95: {stats.norm.ppf(0.95, loc=100, scale=4):.6f}")
print(f"t de cauda direita 0.025, 5 graus: {stats.t.isf(0.025, 5):.6f}")
rng = np.random.default_rng(2026)
amostras = [rng.normal(size=100), rng.exponential(size=100)]
fig, axes = plt.subplots(2, 2, figsize=(8, 5.5))
for linha, dados, titulo in zip(axes, amostras, ("Normal", "Exponencial")):
    linha[0].hist(dados, bins=12, density=True, color="#8c2d3b", edgecolor="white")
    linha[0].set(title=titulo, xlabel="Valor", ylabel="Densidade")
    stats.probplot(dados, dist="norm", plot=linha[1])
    linha[1].set(title=f"QQ: {titulo}", xlabel="Quantil normal teórico", ylabel="Valor observado")
fig.tight_layout()
plt.show()
