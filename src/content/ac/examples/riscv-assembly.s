.text
.globl main
main:
    andi sp, sp, -16
    li a0, 7
    jal ra, dobro_mais_cinco
    li a7, 1
    ecall
    li a7, 10
    ecall

dobro_mais_cinco:
    addi sp, sp, -16
    sw ra, 12(sp)
    sw s0, 0(sp)
    li s0, 5
    jal ra, dobro
    add a0, a0, s0
    lw s0, 0(sp)
    lw ra, 12(sp)
    addi sp, sp, 16
    ret

dobro:
    slli a0, a0, 1
    ret
