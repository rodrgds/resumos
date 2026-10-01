#include <stdio.h>

int main(void) {
    const int duracao[4] = {6, 3, 2, 4};
    int falta[4] = {6, 3, 2, 4};
    int fim[4] = {0};
    int quantum, tempo = 0, feitos = 0;
    if (scanf("%d", &quantum) != 1 || quantum < 1 || quantum > 100) {
        puts("Usa um quantum inteiro entre 1 e 100.");
        return 1;
    }
    while (feitos < 4) {
        for (int i = 0; i < 4; i++) {
            if (falta[i] == 0) continue;
            int fatia = falta[i] < quantum ? falta[i] : quantum;
            tempo += fatia;
            falta[i] -= fatia;
            if (falta[i] == 0) {
                fim[i] = tempo;
                feitos++;
            }
        }
    }
    double soma = 0;
    for (int i = 0; i < 4; i++) {
        int espera = fim[i] - duracao[i];
        printf("P%d: fim=%d espera=%d\n", i + 1, fim[i], espera);
        soma += espera;
    }
    printf("Espera media: %.2f\n", soma / 4);
    return 0;
}
