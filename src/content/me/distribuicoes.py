import numpy as np
from scipy import stats
from distribuicoes_apoio import desenhar_histogramas_qq

print(f"Binomial: P(X >= 2) = {stats.binom.sf(1, 12, 0.2):.6f}")
print(f"Normal: P(X > 106) = {stats.norm.sf(106, loc=100, scale=4):.6f}")
print(f"Percentil 95: {stats.norm.ppf(0.95, loc=100, scale=4):.6f}")
print(f"t de cauda direita 0.025, 5 graus: {stats.t.isf(0.025, 5):.6f}")
rng = np.random.default_rng(2026)
amostras = [rng.normal(size=100), rng.exponential(size=100)]
desenhar_histogramas_qq(amostras)
