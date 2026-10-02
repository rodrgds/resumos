#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

struct Aresta {
    int destino, inversa;
    long long residual;
};

int main() {
    int n, m, s, t;
    if (!(std::cin >> n >> m >> s >> t) || n < 2 || n > 2000 ||
        m < 0 || m > 20000 || s < 0 || s >= n || t < 0 || t >= n || s == t) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    std::vector<std::vector<Aresta>> adj(n);
    for (int i = 0; i < m; ++i) {
        int u, v;
        long long c;
        if (!(std::cin >> u >> v >> c) || u < 0 || u >= n || v < 0 ||
            v >= n || c < 0 || c > 1000000) {
            std::cout << "entrada invalida\n";
            return 0;
        }
        if (u == v) continue;
        int iu = static_cast<int>(adj[u].size());
        int iv = static_cast<int>(adj[v].size());
        adj[u].push_back({v, iv, c});
        adj[v].push_back({u, iu, 0});
    }
    long long fluxo = 0;
    std::vector<int> pai(n), via(n);
    while (true) {
        std::fill(pai.begin(), pai.end(), -1);
        std::queue<int> fila;
        fila.push(s);
        pai[s] = s;
        while (!fila.empty()) {
            int u = fila.front();
            fila.pop();
            for (int i = 0; i < static_cast<int>(adj[u].size()); ++i) {
                const auto &e = adj[u][i];
                if (e.residual <= 0 || pai[e.destino] != -1) continue;
                pai[e.destino] = u;
                via[e.destino] = i;
                fila.push(e.destino);
            }
        }
        if (pai[t] == -1) break;
        long long aumento = 1LL << 60;
        for (int v = t; v != s; v = pai[v])
            aumento = std::min(aumento, adj[pai[v]][via[v]].residual);
        for (int v = t; v != s; v = pai[v]) {
            auto &e = adj[pai[v]][via[v]];
            e.residual -= aumento;
            adj[v][e.inversa].residual += aumento;
        }
        fluxo += aumento;
    }
    std::cout << "fluxo " << fluxo << "\nlado s:";
    for (int v = 0; v < n; ++v)
        if (pai[v] != -1) std::cout << ' ' << v;
    std::cout << '\n';
}
