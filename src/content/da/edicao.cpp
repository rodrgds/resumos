#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

int main() {
    std::string a, b;
    if (!std::getline(std::cin, a) || !std::getline(std::cin, b) ||
        a.size() > 500 || b.size() > 500) {
        std::cout << "entrada invalida\n";
        return 0;
    }
    int n = static_cast<int>(a.size()), m = static_cast<int>(b.size());
    std::vector<std::vector<int>> d(n + 1, std::vector<int>(m + 1));
    for (int i = 0; i <= n; ++i) d[i][0] = i;
    for (int j = 0; j <= m; ++j) d[0][j] = j;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            d[i][j] = std::min({d[i - 1][j] + 1, d[i][j - 1] + 1,
                               d[i - 1][j - 1] + (a[i - 1] != b[j - 1])});
    std::cout << "distancia " << d[n][m] << '\n';
}
