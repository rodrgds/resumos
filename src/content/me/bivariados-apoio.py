import matplotlib.pyplot as plt


def desenhar_dispersao(x, y, u, v):
    fig, axes = plt.subplots(1, 2, figsize=(8, 3))
    for ax, a, b, titulo in zip(axes, (x, u), (y, v),
                              ("Relação aproximadamente linear", "Relação y = x²")):
        ax.scatter(a, b, color="#8c2d3b")
        ax.set(xlabel="x", ylabel="y", title=titulo)
    fig.tight_layout()
    plt.show()
