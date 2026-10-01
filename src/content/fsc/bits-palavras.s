.text
.globl main
main:
    li t0, 0x80000005
    li t1, 0
count_loop:
    beq t0, zero, count_done
    andi t2, t0, 1
    add t1, t1, t2
    srli t0, t0, 1
    j count_loop
count_done:
    mv a0, t1
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    li t0, -1
    li t1, 1
    li t2, 1
    li t3, 2
    add t4, t0, t2
    sltu t5, t4, t0
    add t6, t1, t3
    add t6, t6, t5
    mv a0, t4
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    mv a0, t6
    li a7, 1
    ecall
    li a7, 10
    ecall
