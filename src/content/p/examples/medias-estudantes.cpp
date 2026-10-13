#include <algorithm>
#include <iomanip>
#include <iostream>
#include <list>
#include <map>
#include <string>
#include <vector>

struct Media {
    std::string nome;
    double valor;
};

// Cada lista tem 1 a 1000 notas inteiras de 0 a 20.
void imprimir_medias(const std::map<std::string, std::list<int>>& notas) {
    std::vector<Media> resumo;
    double soma_medias = 0;
    for (const auto& estudante : notas) {
        double soma = 0;
        for (int nota : estudante.second) soma += nota;
        double media = soma / estudante.second.size();
        resumo.push_back({estudante.first, media});
        soma_medias += media;
    }
    std::sort(resumo.begin(), resumo.end(), [](const Media& a, const Media& b) {
        if (a.valor != b.valor) return a.valor > b.valor;
        return a.nome < b.nome;
    });
    std::cout << std::fixed << std::setprecision(2);
    for (const auto& estudante : resumo)
        std::cout << estudante.nome << " " << estudante.valor << "\n";
    if (resumo.empty()) std::cout << "Sem estudantes\n";
    else std::cout << "Global " << soma_medias / resumo.size() << "\n";
}

int main() {
    imprimir_medias({{"Ana", {10, 20}}, {"Bruno", {12}}, {"Carla", {13, 17}}});
}
