#include <cassert>
#include <iostream>
#include <vector>

template <class T> class Lista {
    struct No { T valor; No* seguinte; };
    No* primeiro = nullptr;
    int tamanho = 0;
public:
    Lista() = default;
    Lista(const Lista&) = delete;
    Lista& operator=(const Lista&) = delete;
    ~Lista() {
        while (primeiro) {
            No* p = primeiro;
            primeiro = p->seguinte;
            delete p;
        }
    }
    void inserirFrente(const T& x) {
        primeiro = new No{x, primeiro};
        ++tamanho;
    }
    int size() const { return tamanho; }
    std::vector<T> valores() const {
        std::vector<T> r;
        for (No* p = primeiro; p; p = p->seguinte) r.push_back(p->valor);
        return r;
    }
    // resto deve ser outra lista, inicialmente vazia.
    void separar(Lista& resto, int k) {
        assert(&resto != this && resto.tamanho == 0);
        if (k >= tamanho) return;
        if (k <= 0) {
            resto.primeiro = primeiro;
            resto.tamanho = tamanho;
            primeiro = nullptr;
            tamanho = 0;
            return;
        }
        No* ultimo = primeiro;
        for (int i = 1; i < k; ++i) ultimo = ultimo->seguinte;
        resto.primeiro = ultimo->seguinte;
        resto.tamanho = tamanho - k;
        ultimo->seguinte = nullptr;
        tamanho = k;
    }
    // As duas listas devem estar ordenadas e ser distintas.
    void intercalar(Lista& outra) {
        assert(&outra != this);
        No* esquerda = primeiro;
        No* direita = outra.primeiro;
        No** fim = &primeiro;
        while (esquerda && direita) {
            // Escolher esquerda no empate conserva a estabilidade.
            No*& escolhido = direita->valor < esquerda->valor ? direita : esquerda;
            *fim = escolhido;
            escolhido = escolhido->seguinte;
            fim = &(*fim)->seguinte;
        }
        *fim = esquerda ? esquerda : direita;
        tamanho += outra.tamanho;
        outra.primeiro = nullptr;
        outra.tamanho = 0;
    }
    void ordenar() {
        if (tamanho <= 1) return;
        Lista resto;
        separar(resto, tamanho / 2);
        ordenar();
        resto.ordenar();
        intercalar(resto);
    }
};

struct Registo {
    int chave;
    char etiqueta;
    bool operator<(const Registo& r) const { return chave < r.chave; }
};
void mostrar(const Lista<Registo>& lista) {
    for (auto r : lista.valores()) std::cout << r.chave << r.etiqueta << ' ';
    std::cout << "(tamanho " << lista.size() << ")\n";
}
int main() {
    Lista<Registo> lista, resto;
    // Inserir pela frente em ordem inversa cria [4A,1B,4C,2D,4E].
    for (Registo r : {Registo{4,'E'}, {2,'D'}, {4,'C'}, {1,'B'}, {4,'A'}})
        lista.inserirFrente(r);
    lista.separar(resto, 2);
    mostrar(lista); mostrar(resto);
    lista.ordenar(); resto.ordenar();
    lista.intercalar(resto);
    mostrar(lista); mostrar(resto);
    return 0;
}
