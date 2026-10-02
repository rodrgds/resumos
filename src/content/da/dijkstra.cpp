#include <algorithm>
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>

int main() {
    int n, m, s, t;
    if (!(std::cin >> n >> m >> s >> t) || n < 1 || n > 2000 ||
        m < 0 || m > 20000 || s < 0 || s >= n || t < 0 || t >= n) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    using Aresta = std::pair<int, int>;
    std::vector<std::vector<Aresta>> adj(n);
    for (int i = 0; i < m; ++i) {
        int u, v, w;
        if (!(std::cin >> u >> v >> w) || u < 0 || u >= n || v < 0 ||
            v >= n || w < 0 || w > 1000000) {
            std::cout << "entrada invalida\n";
            return 0;
        }
        adj[u].push_back({v, w});
    }
    constexpr long long INF = 1LL << 60;
    std::vector<long long> dist(n, INF);
    std::vector<int> pai(n, -1);
    using Entrada = std::pair<long long, int>;
    std::priority_queue<Entrada, std::vector<Entrada>, std::greater<Entrada>> heap;
    dist[s] = 0;
    heap.push({0, s});
    while (!heap.empty()) {
        auto [d, u] = heap.top();
        heap.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (d + w >= dist[v]) continue;
            dist[v] = d + w;
            pai[v] = u;
            heap.push({dist[v], v});
        }
    }
    if (dist[t] == INF) {
        std::cout << "sem caminho\n";
        return 0;
    }
    std::cout << "distancia " << dist[t] << "\ncaminho";
    std::vector<int> caminho;
    for (int v = t; v != -1; v = pai[v]) caminho.push_back(v);
    std::reverse(caminho.begin(), caminho.end());
    for (int v : caminho) std::cout << ' ' << v;
    std::cout << '\n';
}
