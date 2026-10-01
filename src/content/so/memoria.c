#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *original = malloc(sizeof *original);
    int *copia = malloc(sizeof *copia);
    if (original == NULL || copia == NULL) {
        free(original);
        free(copia);
        return 1;
    }
    *original = 4;
    *copia = *original;
    *copia = 9;
    printf("original=%d copia=%d\n", *original, *copia);
    free(copia);
    free(original);
    return 0;
}
