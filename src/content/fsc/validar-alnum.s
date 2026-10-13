# a0: string ASCII terminada em zero; resultado 0 ou 1 em a0
# is_alnum: byte em a0; devolve 0 ou 1; respeita a ABI
# String vazia e valida segundo o contrato desta rotina.
valida_alnum:
    addi sp, sp, -16
    sw ra, 12(sp)
    sw s0, 8(sp)
    mv s0, a0
valida_ciclo:
    lbu a0, 0(s0)
    beq a0, zero, valida_sim
    jal ra, is_alnum
    beq a0, zero, valida_fim
    addi s0, s0, 1
    j valida_ciclo
valida_sim:
    li a0, 1
valida_fim:
    lw s0, 8(sp)
    lw ra, 12(sp)
    addi sp, sp, 16
    ret
