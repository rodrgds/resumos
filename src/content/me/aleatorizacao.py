from itertools import combinations
from statistics import mean
import matplotlib.pyplot as plt

valores = [1, 2, 3, 4, 5, 6]
n_a = 3
observado = mean(valores[:n_a]) - mean(valores[n_a:])
estatisticas = []
for indices_a in combinations(range(len(valores)), n_a):
    grupo_a = [valores[i] for i in indices_a]
    grupo_b = [v for i, v in enumerate(valores) if i not in indices_a]
    estatisticas.append(mean(grupo_a) - mean(grupo_b))
extremos = sum(abs(t) >= abs(observado) - 1e-12 for t in estatisticas)
print(f"Diferença observada: {observado}")
print(f"Atribuições: {len(estatisticas)}; extremas: {extremos}")
print(f"Valor-p bilateral exato: {extremos / len(estatisticas):.4f}")
fig, ax = plt.subplots(figsize=(7, 3))
possiveis = sorted(set(estatisticas))
ax.bar(possiveis, [estatisticas.count(t) / len(estatisticas) for t in possiveis], width=0.5)
ax.axvline(observado, color="#8c2d3b", linestyle="--")
ax.axvline(-observado, color="#8c2d3b", linestyle="--")
ax.set(xlabel="Diferença de médias A menos B", ylabel="Probabilidade", title="Distribuição exata de permutação")
fig.tight_layout()
plt.show()
