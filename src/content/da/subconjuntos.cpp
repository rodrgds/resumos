#include <iostream>
#include <vector>

bool procura(int i, long long soma, long long alvo,
             const std::vector<int> &a, const std::vector<long long> &resto,
             std::vector<int> &escolhidos) {
    if (soma == alvo) return true;
    if (i == static_cast<int>(a.size()) || soma > alvo || soma + resto[i] < alvo)
        return false;
    escolhidos.push_back(a[i]);
    if (procura(i + 1, soma + a[i], alvo, a, resto, escolhidos)) return true;
    escolhidos.pop_back();
    return procura(i + 1, soma, alvo, a, resto, escolhidos);
}

int main() {
    int n;
    long long alvo;
    if (!(std::cin >> n >> alvo) || n < 0 || n > 30 || alvo < 0 || alvo > 30000000) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    std::vector<int> a(n);
    for (int &x : a) {
        if (!(std::cin >> x) || x < 1 || x > 1000000) {
            std::cout << "entrada invalida\n";
            return 0;
        }
    }
    std::vector<long long> resto(n + 1);
    for (int i = n - 1; i >= 0; --i) resto[i] = resto[i + 1] + a[i];
    std::vector<int> escolhidos;
    if (!procura(0, 0, alvo, a, resto, escolhidos)) {
        std::cout << "sem solucao\n";
        return 0;
    }
    std::cout << "subconjunto";
    for (int x : escolhidos) std::cout << ' ' << x;
    std::cout << '\n';
}
