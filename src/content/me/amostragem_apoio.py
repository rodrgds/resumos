import numpy as np
from scipy import stats
import matplotlib.pyplot as plt


def desenhar_medias(resultados, media):
    fig, axes = plt.subplots(1, len(resultados), figsize=(9, 3), squeeze=False)
    for ax, (n, medias, se) in zip(axes[0], resultados):
        grade = np.linspace(max(0, media - 4 * se), media + 4 * se, 300)
        ax.hist(medias, bins=35, density=True, color="#8c2d3b", alpha=0.6)
        ax.plot(grade, stats.norm.pdf(grade, loc=media, scale=se), color="#28716c")
        ax.set(title=f"n = {n}; SE = {se:.2f}", xlabel="Média amostral", ylabel="Densidade")
    fig.tight_layout()
    plt.show()
