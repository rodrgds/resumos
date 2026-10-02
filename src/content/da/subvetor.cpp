#include <iostream>
#include <vector>

int main() {
    int n;
    if (!(std::cin >> n) || n < 1 || n > 2000) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    std::vector<long long> a(n);
    for (auto &x : a) {
        if (!(std::cin >> x) || x < -1000000 || x > 1000000) {
            std::cout << "entrada invalida\n";
            return 0;
        }
    }
    long long melhor = a[0];
    int inicio = 0, fim = 0;
    for (int i = 0; i < n; ++i) {
        long long soma = 0;
        for (int j = i; j < n; ++j) {
            soma += a[j];
            if (soma <= melhor) continue;
            melhor = soma;
            inicio = i;
            fim = j;
        }
    }
    std::cout << "soma " << melhor << "\nintervalo " << inicio << ' ' << fim << '\n';
}
