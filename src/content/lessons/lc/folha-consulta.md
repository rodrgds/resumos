---
title: Cheat sheet de LC
description: Portas, timer, interrupções, teclado, rato e vídeo dos laboratórios de LCom em consulta breve.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Apontamentos de Laboratório de Computadores, SofiaViP
      url: https://drive.google.com/file/d/18RQnr_bxQAURJRqwh5Pj13q6DUmQY9AX/view
  coverage: Síntese dos apontamentos SofiaViP, páginas 2 a 9, centradas nos laboratórios e no projeto.
  gaps:
    - A fonte não identifica uma edição atual da cadeira; portas, funções Minix e requisitos de laboratório devem ser confirmados no enunciado da tua ocorrência.
    - Os apontamentos não cobrem RTC, porta série nem uma especificação completa do projeto; esta folha não acrescenta esses tópicos como se viessem da fonte.
---

Os nomes das rotinas e os endereços abaixo pertencem ao ambiente Minix/PC dos laboratórios. Confirma-os no teu enunciado e nos cabeçalhos instalados.

## Falar com dispositivos

- O **driver** isola o acesso ao periférico e expõe operações ao resto do sistema. `sys_inb(port, &value)` lê uma porta de E/S; `sys_outb(port, value)` escreve nela. Portas de dados, estado e controlo têm papéis diferentes: consulta o **estado** antes de ler ou escrever dados quando o protocolo o exige. [Ver registos e portas](/cadeiras/lc/falar-com-hardware/#registos-e-portas).
- Uma máscara lê ou altera bits escolhidos sem apagar os restantes: testar `value & MASK`, ligar `value | MASK`, desligar `value & ~MASK`. Para um bit $n$, usa $1\ll n$ com tipo e largura adequados. Não confundas operadores bit a bit `&`, `|`, `~` com os lógicos `&&`, `||`, `!`. [Ver máscaras](/cadeiras/lc/falar-com-hardware/#máscaras-de-bits).
- **Polling** repete a leitura do estado até o dispositivo estar pronto. É simples, mas ocupa CPU enquanto espera. **Interrupção** deixa o processo bloquear e acorda-o após uma notificação; usa a política exigida no laboratório, sem fazer um ciclo de espera desnecessário. [Ver polling](/cadeiras/lc/falar-com-hardware/#polling-o-ciclo-de-espera) e [interrupções](/cadeiras/lc/interrupcoes/#quem-avisa-quem).

## Timer 8254 e interrupções

| Campo               | Regra de consulta                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Frequência          | Para o timer 0, $f_{\text{out}}=f_{\text{in}}/d$, com divisor $d$ válido para o modo e hardware configurados.                           |
| Palavra de controlo | Seleciona timer, modo de acesso, modo de operação e contagem binária/BCD. Ao mudar só uma opção, preserva os outros campos.             |
| Divisor             | No acesso LSB/MSB, escreve primeiro o byte menos significativo e depois o mais significativo; valida os limites aceites pela interface. |
| Notificação         | Identifica a linha através da máscara devolvida pela subscrição, trata apenas os bits esperados e desliga a subscrição ao sair.         |

Os apontamentos usam o modo 3 para onda quadrada e o timer 0 como fonte de interrupções periódicas. Calcula o divisor a partir da frequência pedida e dos valores **efetivos** do laboratório; não troques o valor do divisor com a frequência de saída. [Ver relógio e divisor](/cadeiras/lc/temporizador/#o-relógio-de-entrada-e-o-divisor).

No Minix da fonte, `sys_irqsetpolicy(irq, policy, &hook_id)` subscreve a IRQ. O `hook_id` participa na construção da máscara `BIT(hook_id)` e pode ser atualizado; conserva o valor correto para reconhecer notificações e remover a política. Interrupções do timer 0 podem ter prioridade sobre as do teclado no PC descrito. [Ver linhas](/cadeiras/lc/interrupcoes/#as-linhas-de-cada-periférico) e [subscrição](/cadeiras/lc/interrupcoes/#subscrever-uma-interrupção).

## Teclado e rato

- O controlador do teclado produz **scancodes**: no conjunto usado nos apontamentos, `0x01` é um _make code_ de um byte e `0x81` o respetivo _break code_. Não assumas que todos os códigos têm um byte; acompanha os prefixos e só considera o código completo no fim da sequência. [Ver make e break](/cadeiras/lc/teclado/#make-e-break).
- Antes de ler o buffer de saída, verifica o registo de estado, incluindo disponibilidade e bits de erro. A mesma porta de dados pode transportar bytes do teclado e do rato, pelo que o bit de origem importa. O _hook_ de interrupção e a máscara têm de corresponder à IRQ subscrita. [Ver leitura](/cadeiras/lc/teclado/#ler-com-polling-ou-interrupção).
- No rato PS/2 do laboratório, monta o pacote de três bytes **pela ordem recebida**. O primeiro contém os bits dos botões, sinal e sincronização; os restantes dão $\Delta x$ e $\Delta y$. Converte os deslocamentos com extensão de sinal e rejeita/recomeça se perderes a sincronização. Não contes um byte do teclado como parte do pacote do rato. [Ver pacote](/cadeiras/lc/rato/#anatomia-do-pacote) e [movimento](/cadeiras/lc/rato/#exemplo-reconstruir-um-movimento).

## Vídeo e integração

- Em **modo indexado**, o valor de um píxel é índice de uma paleta; em **modo direto**, codifica componentes de cor no próprio valor. O número de bytes por píxel depende do modo, não é sempre um nem sempre quatro. Consulta resolução, profundidade e _pitch_ antes de calcular endereços. [Ver framebuffer](/cadeiras/lc/video/#modo-gráfico-e-framebuffer).
- Para desenhar uma linha horizontal ou retângulo, valida os limites antes de escrever; pixels consecutivos numa linha ocupam posições consecutivas, mas a linha seguinte começa a `pitch` bytes. Num modo com _double buffering_, desenha no buffer secundário e copia para o visível no momento adequado, reduzindo a cintilação. [Ver desenho](/cadeiras/lc/video/#exemplo-desenhar-um-retângulo) e [double buffering](/cadeiras/lc/video/#double-buffering-contra-a-cintilação).
- Integra teclado, timer, rato e vídeo num **ciclo de eventos**: cada notificação atualiza o estado, e o desenho apresenta esse estado. Mantém explícita a política de saída e liberta as subscrições e buffers em todos os caminhos. A estimativa de esforço para o projeto que aparece nos apontamentos não é uma regra de avaliação atual. [Ver programação por eventos](/cadeiras/lc/projeto/#programação-por-eventos).
