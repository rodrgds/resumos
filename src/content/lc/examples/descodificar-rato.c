#include <stdint.h>
#include <stdio.h>

int main(void) {
  uint8_t bytes[] = {0x28, 0x05, 0xFB};
  int dx = (int)bytes[1] - ((bytes[0] & 0x10u) ? 256 : 0);
  int dy = (int)bytes[2] - ((bytes[0] & 0x20u) ? 256 : 0);
  int x = 100 + dx;
  int y = 100 - dy;
  printf("dx=%d dy=%d x=%d y=%d\n", dx, dy, x, y);
  return 0;
}
