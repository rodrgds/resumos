---
title: Interrupções
description: IRQs, subscrição, rotinas de atendimento e máscaras no Minix.
section: conteudo
order: 3
---

O polling prende o processador a perguntar. As **interrupções** invertem o sentido da conversa: o periférico avisa quando tem algo a dizer, e o processador atende. O preço é um mecanismo com mais peças, subscrição de linhas de interrupção, rotinas de atendimento e máscaras, que esta página monta peça a peça.

## Quem avisa quem

Cada periférico capaz de interromper está ligado a uma linha **IRQ** (_interrupt request_). Quando o evento acontece, o controlador de interrupções assinala o pedido e, se essa linha estiver desmascarada, o processador suspende o programa, corre a **rotina de atendimento** (_handler_) e depois retoma onde parou. A rotina deve ser curta: lê o estado, recolhe os dados, assinala que há trabalho novo e sai. O processamento pesado fica para o programa principal, que consome o que a rotina recolheu.

O resultado disto é que entre eventos o processador é livre. Um teclado que gera meia dúzia de interrupções por segundo custa meia dúzia de atendimentos; em polling, o mesmo teclado custaria milhões de perguntas por segundo.

## Subscrever uma interrupção

No Minix, usar uma interrupção segue sempre a mesma sequência: subscrever a linha IRQ para receberes notificações, ativar a linha, entrar no ciclo de espera por mensagens e, no fim, desativar e remover a subscrição. Em pseudocódigo com a API do Minix:

```c
sys_irqsetpolicy(TIMER_IRQ, IRQ_REENABLE, &bit_mask);
sys_irqenable(&bit_mask);

int ipc_status;
message msg;
while (continuar) {
  driver_receive(ANY, &msg, &ipc_status);
  if (is_ipc_notify(ipc_status) && (msg.m_source == HARDWARE)) {
    timer_handler(); /* curta: conta e sai */
  }
}

sys_irqdisable(&bit_mask);
sys_irqrmpolicy(&bit_mask);
```

Cada chamada tem um papel: `setpolicy` regista o interesse e diz se a linha se rearma sozinha, `enable` abre a porta, `driver_receive` bloqueia o processo até chegar uma mensagem (de hardware ou de outro processo), e no fim `disable` e `rmpolicy` devolvem tudo ao estado inicial. Esquecer a limpeza final deixa a linha armada para o próximo programa, que recebe interrupções que não pediu.

## Máscaras e linhas partilhadas

A **máscara** (`bit_mask`) identifica a tua linha no meio de todas: cada IRQ corresponde a um bit, e o bit a 1 significa "esta é a minha". Quando o `driver_receive` acorda, confirma sempre que a notificação veio mesmo da tua linha antes de chamares o handler, porque o processo pode receber mensagens de outras fontes no mesmo ciclo.

Duas regras de higiene que evitam os bugs mais penosos: a rotina nunca espera por nada (não há polling dentro de um handler, e muito menos chamadas bloqueantes), e os dados partilhados entre a rotina e o programa principal são o mínimo possível, atualizados de forma que uma leitura a meio nunca veja um estado inconsistente.

## Exemplo: medir um segundo com o temporizador

O temporizador interrompe 60 vezes por segundo. Para medir um segundo, o handler incrementa um contador e o programa principal espera que ele chegue a 60:

```c
static int ticks = 0;

void timer_handler(void) {
  ticks++;
}
```

Com `ticks` a subir de 60 em 60 por segundo, esperar `ticks >= 60` é esperar um segundo, e esperar `ticks >= 300` são cinco segundos. A conta é direta porque a frequência é conhecida: número de interrupções a dividir pela frequência dá o tempo decorrido. Este mesmo contador serve de relógio para tudo o resto, do ritmo de um jogo ao timeout de uma operação.

:::tip[Como depurar interrupções que não chegam]
Se o handler nunca corre, verifica por esta ordem: a linha foi subscrita e ativada, a máscara corresponde ao IRQ certo, o ciclo chama `driver_receive` de verdade em vez de fazer polling por cima, e a subscrição foi feita antes de ativares. Em nove de dez casos, o problema está nesta lista, não no hardware.
:::
