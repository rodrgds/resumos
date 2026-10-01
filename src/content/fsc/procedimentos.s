.text
.globl main
main:
    andi sp, sp, -16
    li s0, 99
    li a0, 7
    jal ra, mais_um_dobro
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    mv a0, s0
    li a7, 1
    ecall
    li a7, 10
    ecall
mais_um_dobro:
    addi sp, sp, -16
    sw ra, 12(sp)
    sw s0, 8(sp)
    addi s0, a0, 1
    mv a0, s0
    jal ra, dobro
    lw s0, 8(sp)
    lw ra, 12(sp)
    addi sp, sp, 16
    ret
dobro:
    slli a0, a0, 1
    ret
