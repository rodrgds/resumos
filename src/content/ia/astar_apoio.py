def vizinhos_grelha(posicao, bloqueados, tamanho):
    linha, coluna = posicao
    for dl, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
        vizinho = (linha + dl, coluna + dc)
        if (0 <= vizinho[0] < tamanho and 0 <= vizinho[1] < tamanho
                and vizinho not in bloqueados):
            yield vizinho
