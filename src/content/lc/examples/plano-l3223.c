#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

struct escrita { uint16_t porta; uint8_t valor; };

static bool preparar(unsigned timer, uint32_t intervalo, unsigned unidade,
                     struct escrita plano[3]) {
  if (timer > 2 || unidade > 2 || intervalo == 0 || intervalo > UINT16_MAX)
    return false;
  const uint16_t porta = (uint16_t)(0x20u + timer);
  const uint8_t controlo = (uint8_t)((timer << 6) | (1u << 4) | unidade);
  plano[0] = (struct escrita){0x23u, controlo};
  plano[1] = (struct escrita){porta, (uint8_t)(intervalo & 0xFFu)};
  plano[2] = (struct escrita){porta, (uint8_t)(intervalo >> 8)};
  return true;
}

int main(void) {
  struct escrita plano[3];
  if (!preparar(2, 1000, 1, plano)) return 1;
  for (unsigned i = 0; i < 3; ++i)
    printf("porta=0x%02X valor=0x%02X\n",
           (unsigned)plano[i].porta, (unsigned)plano[i].valor);
  return 0;
}
