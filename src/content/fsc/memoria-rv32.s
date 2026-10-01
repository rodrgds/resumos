.data
bytes: .byte 0x80, 0x7f
.align 2
words: .word 0x12345678
.text
.globl main
main:
    la t0, bytes
    lb a0, 0(t0)
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    lbu a0, 0(t0)
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    la t1, words
    lbu a0, 0(t1)
    li a7, 1
    ecall
    li a0, 10
    li a7, 11
    ecall
    sb zero, 1(t1)
    lw a0, 0(t1)
    li a7, 1
    ecall
    li a7, 10
    ecall
