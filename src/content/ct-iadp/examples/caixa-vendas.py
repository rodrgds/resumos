import numpy as np
import matplotlib.pyplot as plt

quantidades = np.array([2, 3, 3, 4, 4, 5, 5, 6, 20])
q1, mediana, q3 = np.quantile(quantidades, [0.25, 0.5, 0.75])
amplitude = q3 - q1
limites = [q1 - 1.5 * amplitude, q3 + 1.5 * amplitude]
print("quartis e mediana:", q1, mediana, q3)
print("limites:", [float(v) for v in limites])
fig, ax = plt.subplots(figsize=(2.6, 3.1))
ax.boxplot(quantidades, whis=1.5)
ax.set_xticks([1], ["Vendas"])
ax.tick_params(labelsize=14)
ax.set_ylabel("Unidades\npor venda", fontsize=16)
fig.suptitle("Distribuição de\nnove vendas", fontsize=16)
fig.tight_layout()
plt.show()
