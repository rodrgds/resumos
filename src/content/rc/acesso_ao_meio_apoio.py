import matplotlib.pyplot as plt


def mostrar_aloha(G, puro, ranhuras):
    plt.plot(G, puro, label="Puro")
    plt.plot(G, ranhuras, label="Com ranhuras")
    plt.xlabel("Tentativas por tempo de trama, G")
    plt.ylabel("Tramas entregues por tempo de trama, S")
    plt.title("ALOHA: modelo Poisson, tramas iguais")
    plt.legend()
    plt.grid(alpha=0.3)
    plt.show()
