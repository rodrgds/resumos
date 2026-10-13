#include <iostream>

int indice_letra(char letra) {
    const char minusculas[] = "abcdefghijklmnopqrstuvwxyz";
    const char maiusculas[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (int i = 0; i < 26; ++i)
        if (letra == minusculas[i] || letra == maiusculas[i]) return i;
    return -1;
}

// texto e uma string de C valida com, no maximo, 1000 unidades char.
void marcar_letras(const char texto[], bool presentes[]) {
    for (int i = 0; texto[i] != '\0'; ++i) {
        int indice = indice_letra(texto[i]);
        if (indice >= 0) presentes[indice] = true;
    }
}

// a e b sao validas; saida tem 27 posicoes e nao se sobrepoe as entradas.
int diferenca_letras(const char a[], const char b[], char saida[]) {
    bool em_a[26]{};
    bool em_b[26]{};
    marcar_letras(a, em_a);
    marcar_letras(b, em_b);
    const char alfabeto[] = "abcdefghijklmnopqrstuvwxyz";
    int usados = 0;
    for (int i = 0; i < 26; ++i)
        if (em_a[i] != em_b[i]) saida[usados++] = alfabeto[i];
    saida[usados] = '\0';
    return usados;
}

int main() {
    char saida[27];
    int n = diferenca_letras("ac AB!", "B-cd", saida);
    std::cout << n << " [" << saida << "]\n";
    n = diferenca_letras("abAB", "ba", saida);
    std::cout << n << " [" << saida << "]\n";
}
