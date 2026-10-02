import matplotlib.pyplot as plt
from scipy import stats


def desenhar_histogramas_qq(amostras):
    fig, axes = plt.subplots(2, 2, figsize=(8, 5.5))
    for linha, dados, titulo in zip(axes, amostras, ("Normal", "Exponencial")):
        linha[0].hist(dados, bins=12, density=True, color="#8c2d3b", edgecolor="white")
        linha[0].set(title=titulo, xlabel="Valor", ylabel="Densidade")
        stats.probplot(dados, dist="norm", plot=linha[1])
        linha[1].set(title=f"QQ: {titulo}", xlabel="Quantil normal teórico", ylabel="Valor observado")
    fig.tight_layout()
    plt.show()
