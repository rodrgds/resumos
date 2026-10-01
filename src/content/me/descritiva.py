import math
import statistics
import matplotlib.pyplot as plt

x = sorted([2, 3, 3, 4, 5, 6, 7, 18])

def quantil_tipo2(dados, p):
    posicao = len(dados) * p
    k = math.floor(posicao)
    if posicao.is_integer():
        return (dados[k - 1] + dados[k]) / 2
    return dados[k]

q1, mediana, q3 = [quantil_tipo2(x, p) for p in (0.25, 0.5, 0.75)]
aiq = q3 - q1
bi, bs = q1 - 1.5 * aiq, q3 + 1.5 * aiq
dentro = [v for v in x if bi <= v <= bs]
fora = [v for v in x if not bi <= v <= bs]
print(f"Média: {statistics.mean(x):.4f}")
print(f"Variância amostral: {statistics.variance(x):.4f}")
print(f"Desvio amostral: {statistics.stdev(x):.4f}")
print(f"Q1, mediana, Q3: {q1}, {mediana}, {q3}")
print(f"Barreiras: {bi}, {bs}; valores afastados: {fora}")
fig, ax = plt.subplots(figsize=(7, 2.6))
ax.bxp([dict(med=mediana, q1=q1, q3=q3,
             whislo=min(dentro), whishi=max(dentro), fliers=fora)],
       vert=False, widths=0.4)
ax.set_xlabel("Duração (minutos)")
ax.set_yticks([])
ax.set_title("Caixa com quantis tipo 2")
fig.tight_layout()
plt.show()
