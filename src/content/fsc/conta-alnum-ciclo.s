.data
texto: .asciz "A7"
.text
.globl main
main:
  andi sp, sp, -16
  la a0, texto
  jal ra, conta_alnum
  li a7, 1
  ecall
  li a7, 10
  ecall
conta_alnum:
  # a0: base da string asciz; devolve a contagem em a0
  # s0: apontador, s1: contador; esta rotina preserva ambos para o chamador
  addi sp, sp, -16
  sw ra, 12(sp)
  sw s0, 8(sp)
  sw s1, 4(sp)
  mv s0, a0
  li s1, 0
ciclo:
  lbu t0, 0(s0)
  beq t0, zero, fim
  mv a0, t0
  jal ra, is_alnum
  add s1, s1, a0
  addi s0, s0, 1
  j ciclo
fim:
  mv a0, s1
  lw s1, 4(sp)
  lw s0, 8(sp)
  lw ra, 12(sp)
  addi sp, sp, 16
  ret
is_alnum:
  # a0: byte; devolve 1 se letra ou digito ASCII, 0 caso contrario
  # so usa a0 e t1 (caller-saved); nao toca em s0/s1
  li t1, 48
  bltu a0, t1, nao
  li t1, 58
  bltu a0, t1, sim
  li t1, 65
  bltu a0, t1, nao
  li t1, 91
  bltu a0, t1, sim
  li t1, 97
  bltu a0, t1, nao
  li t1, 123
  bltu a0, t1, sim
nao:
  li a0, 0
  ret
sim:
  li a0, 1
  ret
