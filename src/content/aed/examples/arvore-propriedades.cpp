#include <algorithm>
#include <iostream>
struct No { int valor; const No* esq; const No* dir; };
struct Resumo { bool perfeita; int altura; int binarios; };
Resumo resumir(const No* p) {
    if (!p) return {true, -1, 0};
    const auto e = resumir(p->esq), d = resumir(p->dir);
    return {e.perfeita && d.perfeita && e.altura == d.altura,
            1 + std::max(e.altura, d.altura),
            e.binarios + d.binarios + (p->esq && p->dir ? 1 : 0)};
}
void mostrar(const No* p) {
    const auto r = resumir(p);
    std::cout << "perfeita=" << r.perfeita << "; altura=" << r.altura
              << "; dois filhos=" << r.binarios << '\n';
}
int main() {
    const No a{1,nullptr,nullptr}, b{3,nullptr,nullptr};
    const No folhaDireita{6,nullptr,nullptr};
    const No c{2,&a,&b}, umFilho{4,&folhaDireita,nullptr};
    const No alturasIguais{5,&c,&umFilho};
    mostrar(nullptr); mostrar(&a); mostrar(&c); mostrar(&alturasIguais);
    return 0;
}
