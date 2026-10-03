import heapq

tamanho = 4
bloqueados = {(1, 1), (1, 2), (2, 1)}
inicio, objetivo = (0, 0), (3, 3)
h = lambda n: abs(objetivo[0] - n[0]) + abs(objetivo[1] - n[1])

fronteira = [(h(inicio), 0, inicio, [inicio])]
visto = {}
while fronteira:
    f, g, n, caminho = heapq.heappop(fronteira)
    if n in visto:
        continue
    if n == objetivo:
        print("expandidos:", list(visto))
        print("custo:", g)
        print("caminho:", caminho)
        break
    visto[n] = g
    for m in vizinhos_grelha(n, bloqueados, tamanho):
        if m not in visto:
            heapq.heappush(fronteira, (g + 1 + h(m), g + 1, m, caminho + [m]))

else:
    print("sem solução")
