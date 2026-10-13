#include <cassert>
#include <iostream>
#include <queue>
#include <vector>
using Grafo = std::vector<std::vector<int>>;
// Grafo simples, nao dirigido; cada aresta ocorre nas duas listas.
long long somarGraus(const Grafo& g, int u, std::vector<bool>& visto) {
    visto[u] = true;
    long long total = static_cast<long long>(g[u].size());
    for (int v : g[u]) if (!visto[v]) total += somarGraus(g, v, visto);
    return total;
}
long long arestasComponente(const Grafo& g, int origem) {
    assert(origem >= 0 && static_cast<std::size_t>(origem) < g.size());
    std::vector<bool> visto(g.size(), false);
    return somarGraus(g, origem, visto) / 2;
}
int proximos(const Grafo& g, int origem, int limite) {
    assert(origem >= 0 && static_cast<std::size_t>(origem) < g.size());
    if (limite <= 0) return 0;
    std::vector<int> dist(g.size(), -1);
    std::queue<int> fila;
    dist[origem] = 0;
    fila.push(origem);
    int total = 0;
    while (!fila.empty()) {
        const int u = fila.front(); fila.pop();
        if (dist[u] == limite) continue;
        for (int v : g[u]) if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            ++total;
            fila.push(v);
        }
    }
    return total;
}
int main() {
    const Grafo g{{1,2},{0,2},{0,1,3},{2},{5},{4},{}};
    std::cout << "arestas: " << arestasComponente(g,0) << ' '
              << arestasComponente(g,4) << ' ' << arestasComponente(g,6) << '\n';
    for (int d : {0,1,2,99}) std::cout << "raio " << d << ": " << proximos(g,0,d) << '\n';
    return 0;
}
