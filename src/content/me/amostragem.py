import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)
fig, axes = plt.subplots(1, 3, figsize=(9, 3))
for ax, n in zip(axes, (1, 5, 30)):
    medias = rng.exponential(scale=10, size=(5000, n)).mean(axis=1)
    se = 10 / np.sqrt(n)
    grade = np.linspace(max(0, 10 - 4 * se), 10 + 4 * se, 300)
    ax.hist(medias, bins=35, density=True, color="#8c2d3b", alpha=0.6)
    ax.plot(grade, stats.norm.pdf(grade, loc=10, scale=se), color="#28716c")
    ax.set(title=f"n = {n}; SE = {se:.2f}", xlabel="Média amostral", ylabel="Densidade")
print(f"Binomial exata P(X >= 36): {stats.binom.sf(35, 80, 0.4):.6f}")
print(f"Normal com correção: {stats.norm.sf(35.5, loc=32, scale=np.sqrt(19.2)):.6f}")
fig.tight_layout()
plt.show()
