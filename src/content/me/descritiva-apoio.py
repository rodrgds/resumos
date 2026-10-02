import matplotlib.pyplot as plt


def desenhar_caixa(q1, mediana, q3, dentro, fora):
    fig, ax = plt.subplots(figsize=(7, 2.6))
    ax.bxp([dict(med=mediana, q1=q1, q3=q3,
                 whislo=min(dentro), whishi=max(dentro), fliers=fora)],
           vert=False, widths=0.4)
    ax.set_xlabel("Duração (minutos)")
    ax.set_yticks([])
    ax.set_title("Caixa com quantis tipo 2")
    fig.tight_layout()
    plt.show()
