#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    int n, W;
    if (!(std::cin >> n >> W) || n < 0 || n > 100 || W < 0 || W > 2000) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    std::vector<int> peso(n + 1);
    std::vector<long long> valor(n + 1);
    for (int i = 1; i <= n; ++i) {
        if (!(std::cin >> peso[i] >> valor[i]) || peso[i] < 1 || peso[i] > 2000 ||
            valor[i] < 0 || valor[i] > 1000000) {
            std::cout << "entrada invalida\n";
            return 0;
        }
    }
    std::vector<std::vector<long long>> f(n + 1, std::vector<long long>(W + 1));
    for (int i = 1; i <= n; ++i)
        for (int w = 0; w <= W; ++w) {
            f[i][w] = f[i - 1][w];
            if (peso[i] <= w)
                f[i][w] = std::max(f[i][w], valor[i] + f[i - 1][w - peso[i]]);
        }
    std::vector<int> escolhidos;
    for (int i = n, w = W; i > 0; --i) {
        if (f[i][w] == f[i - 1][w]) continue;
        escolhidos.push_back(i);
        w -= peso[i];
    }
    std::reverse(escolhidos.begin(), escolhidos.end());
    std::cout << "valor " << f[n][W] << "\nobjetos";
    for (int i : escolhidos) std::cout << ' ' << i;
    std::cout << '\n';
}
