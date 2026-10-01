import numpy as np
import matplotlib.pyplot as plt

x = np.array([1, 2, 3, 4], dtype=float)
y = np.array([2, 4, 5, 9], dtype=float)
u = np.array([-2, -1, 0, 1, 2], dtype=float)
v = u ** 2
print(f"Covariância amostral: {np.cov(x, y, ddof=1)[0, 1]:.4f}")
print(f"Correlação linear: {np.corrcoef(x, y)[0, 1]:.4f}")
print(f"Correlação na parábola: {np.corrcoef(u, v)[0, 1]:.4f}")
fig, axes = plt.subplots(1, 2, figsize=(8, 3))
for ax, a, b, titulo in zip(axes, (x, u), (y, v),
                           ("Relação aproximadamente linear", "Relação y = x²")):
    ax.scatter(a, b, color="#8c2d3b")
    ax.set(xlabel="x", ylabel="y", title=titulo)
fig.tight_layout()
plt.show()
