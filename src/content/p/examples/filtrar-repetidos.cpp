#include <iostream>

// n >= 0; entrada e saida nao se sobrepoem, com n posicoes validas.
int filtrar_repetidos(const int entrada[], int n, int saida[]) {
    int usados = 0;
    for (int i = 0; i < n; ++i) {
        bool repetido = false;
        for (int j = 0; j < n; ++j) {
            if (i != j && entrada[i] == entrada[j]) {
                repetido = true;
                break;
            }
        }
        if (repetido) saida[usados++] = entrada[i];
    }
    return usados;
}

int main() {
    int entrada[] = {4, 9, 4, 2, 9, 7};
    int saida[6];
    int usados = filtrar_repetidos(entrada, 6, saida);
    std::cout << usados << ":";
    for (int i = 0; i < usados; ++i) std::cout << " " << saida[i];
    std::cout << "\n";
    std::cout << filtrar_repetidos(nullptr, 0, nullptr) << "\n";
}
