import math
import statistics

x = sorted([2, 3, 3, 4, 5, 6, 7, 18])

def quantil_tipo2(dados, p):
    if not dados or not 0 <= p <= 1:
        raise ValueError("Usa dados ordenados não vazios e 0 <= p <= 1.")
    if p == 0:
        return dados[0]
    if p == 1:
        return dados[-1]
    posicao = len(dados) * p
    inteiro = round(posicao)
    # Um produto como 100 * 0.29 pode ficar ligeiramente abaixo de 29.
    if 0 < inteiro < len(dados) and math.isclose(posicao, inteiro, rel_tol=0, abs_tol=1e-12):
        k = inteiro
        return (dados[k - 1] + dados[k]) / 2
    return dados[math.floor(posicao)]

q1, mediana, q3 = [quantil_tipo2(x, p) for p in (0.25, 0.5, 0.75)]
aiq = q3 - q1
bi, bs = q1 - 1.5 * aiq, q3 + 1.5 * aiq
dentro = [v for v in x if bi <= v <= bs]
fora = [v for v in x if not bi <= v <= bs]
print(f"Média: {statistics.mean(x):.4f}")
print(f"Variância amostral: {statistics.variance(x):.4f}")
print(f"Desvio amostral: {statistics.stdev(x):.4f}")
print(f"Q1, mediana, Q3: {q1}, {mediana}, {q3}")
print(f"Barreiras: {bi}, {bs}; valores afastados: {fora}")
desenhar_caixa(q1, mediana, q3, dentro, fora)
