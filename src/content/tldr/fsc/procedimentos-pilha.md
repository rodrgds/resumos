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

Com sp recebido $S$, reservar 16 dá sp=$S-16$: 12(sp) fica em $S-4$ e 8(sp) em $S-8$, onde podes guardar ra e s0. Mover sp reserva espaço, mas **não guarda os registos**. Recuperá-los não deve apagar o resultado em a0. Guardar ra depois da chamada interior preservaria o retorno errado.

Não escrevas abaixo de sp antes de reservar. Todos os caminhos de retorno devem restaurar os mesmos valores e o sp recebido. Alinhar arbitrariamente o sp de uma rotina perderia esse compromisso.

## Validação com auxiliar

Para exigir todos os bytes ASCII alfanuméricos, testa o zero **antes** de chamar a auxiliar; rejeita no primeiro resultado 0 e aceita no terminador. Neste contrato, vazio devolve 1; exigir um carácter precisa de um teste separado.

O apontador s0 sobrevive às chamadas, mas a rotina tem de preservar o s0 recebido e ra num frame alinhado. Sucesso e erro passam pelo mesmo epílogo, sem apagar a0. [Rotina e saída antecipada](/cadeiras/fsc/procedimentos-pilha/#validar-com-saída-antecipada).

## Recursão e ambiente

Cada chamada recursiva precisa do seu frame para argumentos e resultados parciais ainda vivos. a0 pode ser alterado pela chamada interior; uma variável global não separa o estado das várias chamadas. Define o caso base e verifica cada epílogo.

`ecall` de impressão e saída pertence ao RARS, não substitui a ABI entre rotinas.

[Exemplo non-leaf](/cadeiras/fsc/procedimentos-pilha/#exemplo-non-leaf).
