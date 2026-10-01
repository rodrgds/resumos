from math import ceil, sqrt
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

mu0, mu1, sigma, alpha = 100, 102, 8, 0.05
fig, axes = plt.subplots(1, 2, figsize=(8, 3))
for ax, n in zip(axes, (64, 256)):
    se = sigma / sqrt(n)
    limite = mu0 + stats.norm.isf(alpha) * se
    beta = stats.norm.cdf(limite, loc=mu1, scale=se)
    print(f"n={n}; limite={limite:.6f}; beta={beta:.6f}; potência={1-beta:.6f}")
    x = np.linspace(mu0 - 4 * se, mu1 + 4 * se, 400)
    ax.plot(x, stats.norm.pdf(x, loc=mu0, scale=se), label="Sob H0")
    ax.plot(x, stats.norm.pdf(x, loc=mu1, scale=se), label="Média verdadeira 102")
    ax.axvline(limite, color="#8c2d3b", linestyle="--", label="Limite de rejeição")
    ax.set(title=f"n = {n}", xlabel="Média amostral", ylabel="Densidade")
    ax.legend(fontsize=7)
q = stats.norm.isf(alpha / 2)
beta2 = stats.norm.cdf(mu0 + q, loc=mu1) - stats.norm.cdf(mu0 - q, loc=mu1)
print(f"Bilateral, n=64: beta={beta2:.6f}; potência={1-beta2:.6f}")
print("n para potência 80% unilateral:", ceil((sigma * (stats.norm.isf(alpha) + stats.norm.isf(0.2)) / (mu1 - mu0)) ** 2))
fig.tight_layout()
plt.show()
