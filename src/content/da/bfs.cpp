#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

int main() {
    int n, m, s;
    if (!(std::cin >> n >> m >> s) || n < 1 || n > 2000 ||
        m < 0 || m > 20000 || s < 0 || s >= n) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    std::vector<std::vector<int>> adj(n);
    for (int i = 0; i < m; ++i) {
        int u, v;
        if (!(std::cin >> u >> v) || u < 0 || u >= n || v < 0 || v >= n) {
            std::cout << "entrada invalida\n";
            return 0;
        }
        adj[u].push_back(v);
    }
    std::vector<int> dist(n, -1), pai(n, -1);
    std::queue<int> fila;
    dist[s] = 0;
    fila.push(s);
    while (!fila.empty()) {
        int u = fila.front();
        fila.pop();
        for (int v : adj[u]) {
            if (dist[v] != -1) continue;
            dist[v] = dist[u] + 1;
            pai[v] = u;
            fila.push(v);
        }
    }
    for (int v = 0; v < n; ++v)
        std::cout << dist[v] << (v + 1 == n ? '\n' : ' ');
    int destino = n - 1;
    if (dist[destino] == -1) {
        std::cout << "sem caminho\n";
        return 0;
    }
    std::vector<int> caminho;
    for (int v = destino; v != -1; v = pai[v]) caminho.push_back(v);
    std::reverse(caminho.begin(), caminho.end());
    for (int v : caminho) std::cout << v << ' ';
    std::cout << '\n';
}
