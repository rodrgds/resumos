import numpy as np
from scipy import stats

observadas = np.array([60, 25, 15])
esperadas = observadas.sum() * np.array([0.5, 0.3, 0.2])
q, p = stats.chisquare(observadas, f_exp=esperadas)
print("Ajustamento; esperadas:", esperadas)
print(f"Q={q:.6f}, gl=2, valor-p={p:.6f}")
tabela = np.array([[40, 10], [20, 20]])
q2, p2, gl, e = stats.chi2_contingency(tabela, correction=False)
print("Homogeneidade; esperadas:")
print(e)
print(f"Q={q2:.6f}, gl={gl}, valor-p={p2:.6f}")
for n in (1000, 5000, 10000):
    q3 = 0.0004 * n
    print(f"n={n}; Q={q3:.4f}; p={stats.chi2.sf(q3, 1):.6f}")
