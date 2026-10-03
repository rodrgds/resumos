.data
.align 2
vetor: .word 7, -3, 10, 0, 8
.text
.globl main
main:
    andi sp, sp, -16
    la a0, vetor
    li a1, 5
    jal ra, inverter
    la t0, vetor
    li t1, 5
mostrar:
    beq t1, zero, terminar
    lw a0, 0(t0)
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    addi t0, t0, 4
    addi t1, t1, -1
    j mostrar
terminar:
    li a7, 10
    ecall
inverter:
    li t0, 2
    bltu a1, t0, voltar
    mv t0, a0
    slli t1, a1, 2
    add t1, a0, t1
    addi t1, t1, -4
trocar:
    bgeu t0, t1, voltar
    lw t2, 0(t0)
    lw t3, 0(t1)
    sw t3, 0(t0)
    sw t2, 0(t1)
    addi t0, t0, 4
    addi t1, t1, -4
    j trocar
voltar:
    ret
