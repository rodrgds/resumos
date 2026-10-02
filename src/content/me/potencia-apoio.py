from math import ceil, sqrt
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt


def comparar_potencias(mu0, mu1, sigma, alpha, tamanhos, n_bilateral, potencia_pretendida):
    resultados = []
    for n in tamanhos:
        se = sigma / sqrt(n)
        limite = mu0 + stats.norm.isf(alpha) * se
        beta = stats.norm.cdf(limite, loc=mu1, scale=se)
        print(f"n={n}; limite={limite:.6f}; beta={beta:.6f}; potência={1-beta:.6f}")
        resultados.append((n, se, limite))
    q = stats.norm.isf(alpha / 2)
    se = sigma / sqrt(n_bilateral)
    beta = stats.norm.cdf(mu0 + q * se, loc=mu1, scale=se) - stats.norm.cdf(mu0 - q * se, loc=mu1, scale=se)
    print(f"Bilateral, n={n_bilateral}: beta={beta:.6f}; potência={1-beta:.6f}")
    n_planeado = ceil((sigma * (stats.norm.isf(alpha) + stats.norm.isf(1 - potencia_pretendida)) / (mu1 - mu0)) ** 2)
    print(f"n para potência {potencia_pretendida:.0%} unilateral:", n_planeado)
    desenhar_potencia(mu0, mu1, resultados)


def desenhar_potencia(mu0, mu1, resultados):
    fig, axes = plt.subplots(1, len(resultados), figsize=(8, 3), squeeze=False)
    for ax, (n, se, limite) in zip(axes[0], resultados):
        x = np.linspace(mu0 - 4 * se, mu1 + 4 * se, 400)
        ax.plot(x, stats.norm.pdf(x, loc=mu0, scale=se), label="Sob H0")
        ax.plot(x, stats.norm.pdf(x, loc=mu1, scale=se), label=f"Média verdadeira {mu1}")
        ax.axvline(limite, color="#8c2d3b", linestyle="--", label="Limite de rejeição")
        ax.set(title=f"n = {n}", xlabel="Média amostral", ylabel="Densidade")
        ax.legend(fontsize=7)
    fig.tight_layout()
    plt.show()
