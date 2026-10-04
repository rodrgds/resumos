import numpy as np
from acesso_ao_meio_apoio import mostrar_aloha

G = np.linspace(0, 3, 121)
puro = G * np.exp(-2 * G)
ranhuras = G * np.exp(-G)
mostrar_aloha(G, puro, ranhuras)
