import matplotlib.pyplot as plt


def desenhar_permutacoes(estatisticas, observado):
    fig, ax = plt.subplots(figsize=(7, 3))
    possiveis = sorted(set(estatisticas))
    ax.bar(possiveis, [estatisticas.count(t) / len(estatisticas) for t in possiveis], width=0.5)
    ax.axvline(observado, color="#8c2d3b", linestyle="--")
    ax.axvline(-observado, color="#8c2d3b", linestyle="--")
    ax.set(xlabel="Diferença de médias A menos B", ylabel="Probabilidade", title="Distribuição exata de permutação")
    fig.tight_layout()
    plt.show()
