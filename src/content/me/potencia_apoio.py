import numpy as np
from scipy import stats
import matplotlib.pyplot as plt


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
