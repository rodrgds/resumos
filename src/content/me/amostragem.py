import numpy as np
from scipy import stats
from amostragem_apoio import desenhar_medias

rng = np.random.default_rng(2026)
resultados = []
for n in (1, 5, 30):
    medias = rng.exponential(scale=10, size=(5000, n)).mean(axis=1)
    se = 10 / np.sqrt(n)
    resultados.append((n, medias, se))
print(f"Binomial exata P(X >= 36): {stats.binom.sf(35, 80, 0.4):.6f}")
print(f"Normal com correção: {stats.norm.sf(35.5, loc=32, scale=np.sqrt(19.2)):.6f}")
desenhar_medias(resultados, media=10)
