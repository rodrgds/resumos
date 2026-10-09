## Chamada e preservação

`jal ra,rotina` guarda PC+4 em ra; `ret` equivale a `jalr zero,0(ra)`. Uma **leaf** não chama outras rotinas. Uma **non-leaf** tem de preservar o ra recebido antes de outra chamada o sobrescrever.

| Registos         | Obrigação                                      |
| ---------------- | ---------------------------------------------- |
| a0…a7, t0…t6, ra | Caller-saved, podem mudar na chamada           |
| s0…s11, sp       | Callee-saved, o chamado repõe o valor recebido |
| gp, tp           | Reservados, não usar como temporários          |

Argumentos inteiros iniciais seguem em a0…a7; resultados usuais, em a0/a1. Mais argumentos podem seguir na pilha.

O chamador guarda temporários ainda necessários depois de `jal`. O chamado guarda os registos s que modifica. Num ciclo com auxiliar, um apontador em t0 pode perder-se; usar s0 exige também preservar o s0 do chamador.

## Frame da pilha

A pilha cresce para endereços menores; a ABI normal mantém **sp alinhado a 16 bytes**.

1. Reserva espaço, por exemplo `addi sp,sp,-16`.
2. Guarda os valores necessários em offsets dentro do frame.
3. Executa a rotina e chamadas interiores.
4. Recupera os valores, liberta exatamente o espaço reservado e volta.

Um frame de 16 bytes pode guardar ra em 12(sp) e s0 em 8(sp). Recuperar estes registos não deve apagar o resultado em a0. Guardar ra depois da chamada interior preservaria o retorno errado.

Não escrevas abaixo de sp antes de reservar. Todos os caminhos de retorno devem restaurar os mesmos valores e o sp recebido. Alinhar arbitrariamente o sp de uma rotina perderia esse compromisso.

## Recursão e ambiente

Cada chamada recursiva precisa do seu frame para argumentos e resultados parciais ainda vivos. a0 pode ser alterado pela chamada interior; uma variável global não separa o estado das várias chamadas. Define o caso base e verifica cada epílogo.

`ecall` de impressão e saída pertence ao RARS, não substitui a ABI entre rotinas.

[Exemplo non-leaf](/cadeiras/fsc/procedimentos-pilha/#exemplo-non-leaf).
