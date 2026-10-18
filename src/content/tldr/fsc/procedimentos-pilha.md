## Chamada

- `jal ra,rotina` guarda PC+4; `ret` é `jalr zero,0(ra)`. **Leaf** não chama outras; **non-leaf** preserva o ra recebido antes do próximo `jal`.
- Caller-saved (a0…a7, t0…t6, ra) podem mudar; callee-saved (s0…s11, sp) repõem o recebido. gp/tp reservados.
- Argumentos em a0…a7, resultados em a0/a1. O chamador guarda temporários vivos; o chamado guarda os s que usa.

## Frame

A pilha desce; ABI com sp alinhado a 16 bytes.

1. Reserva (`addi sp,sp,-16`).
2. Guarda nos offsets do novo frame.
3. Executa, incluindo chamadas interiores.
4. Recupera, liberta o mesmo tamanho, volta.

- sp=$S-$16: 12(sp) fica em $S-4$, 8(sp) em $S-8$. Mover sp reserva; **não guarda**.
- Não escrevas abaixo de sp sem reservar. Todos os retornos restauram os mesmos valores e o sp recebido. Guardar ra depois do `jal` interior preserva o retorno errado.

## Rotinas com auxiliar

- Conta alfanuméricos com apontador em s0 e contador em s1 (t0 perder-se-ia na chamada). s0 e s1 sobrevivem porque a auxiliar respeita a ABI.
- Validação com saída antecipada: testa o zero **antes** de chamar; primeiro 0 devolve 0, terminador devolve 1. Vazio devolve 1 neste contrato.
- Sucesso e erro passam pelo mesmo epílogo, sem apagar a0. `ecall` é RARS, não ABI.

[Non-leaf completa](/cadeiras/fsc/procedimentos-pilha/#exemplo-non-leaf).
