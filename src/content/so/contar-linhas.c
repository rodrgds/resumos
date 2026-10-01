#include <stdio.h>

static size_t linhas(const char *texto) {
    size_t n = 1;
    for (size_t i = 0; texto[i] != '\0'; i++)
        if (texto[i] == '\n') n++;
    return n;
}

int main(void) {
    const char *dados[] = {"", "abc", "a\nb\n"};
    const size_t esperado[] = {0, 0, 2};
    for (size_t i = 0; i < 3; i++)
        printf("caso %zu: obtido=%zu esperado=%zu\n",
               i, linhas(dados[i]), esperado[i]);
    return 0;
}
