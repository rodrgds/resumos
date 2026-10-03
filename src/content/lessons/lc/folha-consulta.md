---
title: Cheat sheet de LC
description: Máscaras, sequências, fórmulas e erros de C e dos periféricos do PC.
section: recursos
studyKind: revision
order: 1
---

## C e memória

| Operação ou condição            | Consulta rápida                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Byte de um dispositivo          | `uint8_t`; `sys_inb` recebe armazenamento de 32 bits                              |
| Complementar só oito bits       | `(uint8_t)~byte`, antes de deslocar                                               |
| Alterar o objeto do chamador    | Receber o seu endereço e desreferenciar                                           |
| Alterar o apontador do chamador | Devolver novo apontador ou receber `T **`                                         |
| Duração automática              | Termina com o bloco; não devolver endereço local                                  |
| Memória dinâmica                | Conferir `malloc`, inicializar, libertar uma vez; não avaliar aliases após `free` |
| Array recebido por parâmetro    | Passar também o comprimento                                                       |
| Biblioteca estática             | `ar rcs libname.a a.o`; ligar objetos antes da biblioteca                         |
| Apontador para função           | `int (*f)(int)`, assinatura compatível                                            |

[Tipos e compilação](/cadeiras/lc/c-estruturado/), [memória e funções](/cadeiras/lc/memoria-funcoes/).

## Registos e interrupções

| Intenção                | Expressão                                  |
| ----------------------- | ------------------------------------------ |
| Algum bit de `m`        | `(r & m) != 0`                             |
| Todos os bits de `m`    | `(r & m) == m`                             |
| Ligar, limpar, inverter | `r \| m`, `r & ~m`, `r ^ m`                |
| Substituir campo        | `(r & ~mask) \| ((value << shift) & mask)` |
| Máscara da notificação  | `1u << bit_pedido`, não `1u << IRQ`        |
| Vários bits pendentes   | `if` independentes, sem `else if`          |

Portas de timer, i8042 e UART pertencem ao espaço de I/O. Framebuffer é memória mapeada. No PIC, máscara a 1 bloqueia IRQ; na notificação Minix, bit a 1 indica pedido. Guardar bit pedido antes de `sys_irqsetpolicy`; usar hook devolvido nas restantes kernel calls. Receber, conferir notificação, origem HARDWARE e máscara. Limpar recursos também após falha parcial.

[Registos](/cadeiras/lc/falar-com-hardware/#testar-e-alterar-campos), [hooks](/cadeiras/lc/interrupcoes/#hook-e-máscara-de-notificação).

## Timer i8254

- Portas 0, 1, 2: `40`, `41`, `42` hex. Controlo: `43` hex. Timer 0 usa IRQ0.
- Palavra normal: seleção nos bits 7:6, acesso em 5:4, modo em 3:1 e BCD em 0.
- LSB/MSB: acesso `11`. Escrever LSB e depois MSB na mesma porta do contador.
- Modo 2 dá impulso periódico; modo 3 dá onda aproximadamente quadrada. Divisor mínimo 2 nesses modos; binário zero codifica 65536.
- $f=f_{in}/N$, $t=k/f$. Conferir divisor antes de converter para 16 bits.
- Estado por read-back do timer 0: `E2` hex em controlo, depois ler `40` hex. COUNT e STATUS ativos a 0.
- Extrair modo: `(st >> 1) & 7`; normalizar 6 para 2 e 7 para 3. Preservar `st & 0x0F` ao mudar só acesso e frequência.
- Subtração sem sinal mede intervalos através de uma passagem por zero, se o intervalo tiver menos de uma volta completa.

[Configuração](/cadeiras/lc/temporizador/#palavra-de-controlo), [divisor](/cadeiras/lc/temporizador/#escolher-a-frequência), [intervalos](/cadeiras/lc/temporizador/#ticks-intervalos-e-overflow).

## Teclado e rato

| Campo ou operação             | Regra                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| i8042 estado                  | Ler `64` hex; OBF bit 0, IBF bit 1, AUX bit 5, erros 7:6             |
| Ler dados                     | OBF a 1, ler `60` hex e descartar se inválido                        |
| Escrever comando ou argumento | Esperar IBF a 0 antes de cada escrita                                |
| Set 1                         | Esc make `01`, break `81`; E0 é prefixo, não evento                  |
| Command byte KBC              | Ler com comando `20`; escrever com comando `60`; valor em porta `60` |
| Rato                          | IRQ12, três bytes por pacote, uma leitura por notificação            |
| Primeiro byte do rato         | Bit 3 a 1; não testar esse bit nos restantes bytes                   |
| Deltas PS/2                   | Byte baixo menos 256 se o sinal do primeiro byte for 1               |
| Coordenadas de ecrã           | `x += dx`, `y -= dy`; validar com sinal e limitar                    |
| Comando de rato               | `D4` em porta `64`, byte em `60`, ACK `FA`                           |
| Respostas                     | `FE` reenvio, `FC` erro; limitar tentativas                          |
| Reporting                     | `F4` ativa, `F5` desativa; não misturar respostas e pacotes          |

[Teclado](/cadeiras/lc/teclado/#make-break-e-prefixos), [pacotes](/cadeiras/lc/rato/#reconstruir-nove-bits), [comandos](/cadeiras/lc/rato/#enviar-um-comando).

## Vídeo

- VBE `INT 10h`: AX `4F00` controlador, `4F01` modo, `4F02` seleção. BX bit 14 pede framebuffer linear. Sucesso VBE: AX `004F`.
- Mapear VRAM física para o espaço virtual; não escrever num cast de `PhysBasePtr`.
- $B=\lceil bpp/8\rceil$, offset $=y\cdot pitch+x\cdot B$, tamanho de imagem $=pitch\cdot height$.
- Indexed guarda índice da paleta. Direct color usa tamanhos e posições dos campos do modo.
- 24 bpp ocupa três bytes; escrever quatro pisa o píxel seguinte.
- XPM é texto; `xpm_load` produz pixmap. Carregar uma vez, validar falha e definir propriedade.
- Double buffering por cópia reduz desenho intermédio; sincronização vertical continua necessária para evitar tearing. Page flipping muda a imagem apresentada na VRAM.

[Endereços](/cadeiras/lc/video/#calcular-o-endereço-de-um-píxel), [cores](/cadeiras/lc/video/#índices-e-cores-diretas), [buffers](/cadeiras/lc/video/#double-buffering-e-tearing).

## RTC

- Selecionar registo em `70` hex; ler ou escrever dados em `71` hex. IRQ8.
- BCD: $10(v\gg4)+(v\mathbin{\&}15)$, só com algarismos válidos. B.DM a 1 significa binário.
- B bit 1 a 1 significa 24 h. Em 12 h, separar PM antes de converter.
- A.UIP indica atualização. Garantir leitura coerente, não apenas converter bytes.
- B bits PIE/AIE/UIE 6/5/4; C bits PF/AF/UF 6/5/4. Ler C limpa flags, testar causas independentemente.
- Alarme com dois bits superiores a 1 num campo aceita qualquer valor desse campo.

[Formatos](/cadeiras/lc/relogio-tempo-real/#bcd-e-formato-das-horas), [coerência](/cadeiras/lc/relogio-tempo-real/#ler-uma-hora-coerente).

## UART e protocolos

- COM1: base `3F8` hex, IRQ4. COM2: base `2F8` hex, IRQ3.
- Offsets 0 dados, 1 IER, 2 IIR/FCR, 3 LCR, 5 LSR.
- LCR.DLAB a 1 transforma offsets 0 e 1 em DLL/DLM. Limpar antes de dados ou IER.
- Taxa clássica $=115200/D$. 8N1: LCR `03` hex e dez bits por byte útil.
- LSR bit 0 dado disponível, bit 5 THR vazio, bit 6 transmissão toda terminada.
- IIR bit 0 a 1 significa nenhuma causa pendente. Ler e tratar todas as causas relevantes.
- FIFO não substitui fila de software. Definir capacidade e política de perda.
- Mensagens precisam de framing, comprimento, tipos e integridade. Delimitadores nos dados exigem escaping.
- Reenvio após timeout precisa de sequência e tratamento de duplicados para não repetir efeitos.

[UART](/cadeiras/lc/relogio-serie/#registos-e-endereços), [mensagens](/cadeiras/lc/protocolos/#um-formato-com-escaping), [duplicados](/cadeiras/lc/protocolos/#ack-timeout-e-duplicados).

## Aplicação e diagnóstico

Driver recolhe dados; parser produz eventos; aplicação muda estado; desenho apresenta um frame. Processar todos os eventos antes de voltar a bloquear. Definir ordem para eventos simultâneos, recursos adquiridos e limpeza inversa. Para depurar, escolher uma entrada mínima, prever o resultado e testar uma hipótese de cada vez.

[Máquinas de estados](/cadeiras/lc/projeto/#máquinas-de-estados), [debugging](/cadeiras/lc/projeto/#debugging-como-experiência).
