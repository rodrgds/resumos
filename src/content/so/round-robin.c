#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    const int duracao[4] = {6, 3, 2, 4};
    int falta[4] = {6, 3, 2, 4};
    int fim[4] = {0};
    int tempo = 0, feitos = 0;
    char entrada[64];
    if (fgets(entrada, sizeof entrada, stdin) == NULL) {
        puts("Usa um quantum inteiro entre 1 e 100.");
        return 1;
    }
    char *fim_texto;
    long valor = strtol(entrada, &fim_texto, 10);
    int sem_numero = fim_texto == entrada;
    while (isspace((unsigned char)*fim_texto)) fim_texto++;
    // Os limites devolvidos por strtol em overflow também ficam fora de 1..100.
    if (sem_numero || *fim_texto != '\0' ||
        valor < 1 || valor > 100 || ferror(stdin) ||
        (strchr(entrada, '\n') == NULL && !feof(stdin))) {
        puts("Usa um quantum inteiro entre 1 e 100.");
        return 1;
    }
    int quantum = (int)valor;
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
