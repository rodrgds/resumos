.data
.align 2
vetor: .word 7, -3, 10, 0
.text
.globl main
main:
    la t0, vetor
    li t1, 4
    li t2, 0
loop:
    beq t1, zero, done
    lw t3, 0(t0)
    add t2, t2, t3
    addi t0, t0, 4
    addi t1, t1, -1
    j loop
done:
    mv a0, t2
    li a7, 1
    ecall
    li a7, 10
    ecall
