p = 0.70
for s in (1, 2, 4, 8, 1000):
    novo_tempo = (1 - p) + p / s
    print(s, round(novo_tempo, 4), round(1 / novo_tempo, 4))
