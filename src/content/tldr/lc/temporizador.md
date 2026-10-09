## Divisor e saída

Nos modos periódicos do i8254, com relógio de entrada $f_{in}$ e divisor $N$:

$$f_{out}=\frac{f_{in}}{N},\qquad T=\frac{N}{f_{in}}.$$

- Usa `TIMER_FREQ` do apoio de LC. O valor nominal dos exemplos é 1193182 Hz.
- A política de quociente inteiro para 60 Hz dá $N=19886=\texttt{0x4DAE}$ e cerca de 60,001106 Hz. Pedido e frequência real diferem.
- Em binário, dois bytes zero codificam **65536**. Valida o divisor antes de converter para 16 bits; nos modos 2 e 3, exige pelo menos 2. BCD precisa de cálculo próprio.
- Modo 2 produz um impulso baixo por período. Modo 3 produz uma onda aproximadamente quadrada; com $N$ ímpar, a fase alta dura um ciclo de entrada mais. Não há duas interrupções por período.
- Modos 0 e 1 correspondem a terminal count e one-shot; 4 e 5 produzem strobes iniciados por software e hardware.

## Programar o contador

Contadores 0, 1 e 2 usam `0x40`, `0x41` e `0x42`; controlo usa `0x43`.

| Bits da palavra normal | Campo                                     |
| ---------------------- | ----------------------------------------- |
| 7:6                    | Contador, códigos 00, 01, 10              |
| 5:4                    | Acesso, 01 LSB, 10 MSB, 11 LSB depois MSB |
| 3:1                    | Modo                                      |
| 0                      | 0 binário, 1 BCD                          |

Para contador 2, LSB/MSB, modo 3 binário, escreve `0xB6` em `0x43`. Para carregar $1234=\texttt{0x04D2}$, escreve **`0xD2` e depois `0x04`** em `0x42`.

Se só alteras a frequência, conserva modo e base com `status & 0x0F`, juntando seleção do contador e acesso `0x30`. Confere cada operação de I/O. Alterar timer 0 afeta o tempo que o Minix mede; repõe a configuração do ambiente.

## Read-back

- Bits 7:6 são 11. Bit 5 a 0 captura contagem; bit 4 a 0 captura estado.
- Bits 3, 2 e 1 a 1 selecionam contadores 2, 1 e 0. Bit 0 fica a 0.
- Só estado do contador 0: escreve `0xE2` em `0x43` e lê `0x40` uma vez.
- No estado devolvido, bits 7 e 6 são OUT e Null Count; bits 5:0 são acesso, modo e base.
- Extrai modo com `(status >> 1) & 7`; códigos 6 e 7 equivalem a 2 e 3. O latch evita misturar bytes de contagens diferentes; respeita a ordem quando capturas estado e contagem.

## Ticks e intervalos

$k$ ticks a frequência $f$ representam aproximadamente $k/f$ segundos. 333 ticks a 60 Hz dão 5,55 s, com resolução de um tick.

A diferença entre contadores `uint32_t` é módulo $2^{32}$: de `0xFFFFFFFE` até 3 passaram 5 ticks. A conta exige **menos de uma volta completa** e tipos sem sinal coerentes. Overflow com sinal é comportamento indefinido.

Timer a 60 Hz e desenho a cada dois ticks dão 30 frames/s. A receção de teclas continua entre frames.

[Divisor e frequência real](/cadeiras/lc/temporizador/#escolher-a-frequência).
