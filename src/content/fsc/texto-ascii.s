.data
texto: .asciz "A-7_z!"
.text
.globl main
main:
    la t0, texto
    li t1, 0
loop:
    lbu t2, 0(t0)
    beq t2, zero, done
    li t3, 48
    bltu t2, t3, next
    li t3, 57
    bgeu t3, t2, count
    li t3, 65
    bltu t2, t3, next
    li t3, 90
    bgeu t3, t2, count
    li t3, 97
    bltu t2, t3, next
    li t3, 122
    bltu t3, t2, next
count:
    addi t1, t1, 1
next:
    addi t0, t0, 1
    j loop
done:
    mv a0, t1
    li a7, 1
    ecall
    li a7, 10
    ecall
