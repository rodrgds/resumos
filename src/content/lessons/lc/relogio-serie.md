---
title: Relógio e porta série
description: RTC com validação de leitura e UART com tramas e paridade.
section: conteudo
order: 8
---

Os dois últimos periféricos são lentos e pacientes, o oposto do vídeo: o **RTC** guarda a hora mesmo com o PC desligado, e a **porta série** (UART) troca bytes com o exterior um bit de cada vez. Ambos ensinam a mesma lição: nunca confies numa leitura sem validar primeiro que ela é válida.

## RTC: ler a hora com validação

O RTC tem um registo por campo (segundos, minutos, horas e por aí fora), em BCD: cada byte guarda dois dígitos decimais, um em cada metade. O valor `0x23` nas horas significa 2 dezenas e 3 unidades, ou seja 23 horas. A conversão é `(byte >> 4) * 10 + (byte & 0x0F)`: para `0x23` dá $2 \times 10 + 3 = 23$.

O pormenor crítico é o bit de atualização em curso (_update in progress_): o RTC atualiza os registos uma vez por segundo, e ler a meio da atualização devolve uma hora inconsistente (os minutos novos com os segundos velhos). A sequência correta é esperar que o bit desligue, ler todos os campos de seguida e, por segurança, confirmar que continuam coerentes. Uma leitura sem esta espera funciona quase sempre e falha exatamente no segundo em que estás a demonstrar o projeto.

## Porta série: tramas e paridade

A UART envia cada byte como uma **trama**: um bit de arranque (start), os bits de dados, um bit de paridade opcional e um ou mais bits de paragem (stop). Numa configuração 8N1 (8 dados, sem paridade, 1 stop), cada byte custa 10 bits no fio: a 9600 baud, passam cerca de $9600 / 10 = 960$ bytes por segundo. A conta da taxa útil é sempre bits de dados a dividir pelo total de bits da trama.

A **paridade par** acrescenta um bit que torna par o número total de 1s na trama. Toma o dado `0b1011001`: tem quatro 1s, número par, por isso o bit de paridade é 0. Já o dado `0b1011011` tem cinco 1s, por isso o bit de paridade é 1 e o total fica seis. O recetor repete a conta: se o total for ímpar, a trama corrompeu-se e descarta-se. A paridade apanha qualquer número ímpar de bits virados, mas é cega a dois erros na mesma trama.

## Exemplo: verificar uma trama recebida

Chega uma trama com dados `0b1011011` e bit de paridade 1, em paridade par. A verificação:

1. Conta os 1s nos dados: `0b1011011` tem cinco.
2. Soma o bit de paridade: $5 + 1 = 6$, número par.
3. Total par com paridade par: trama válida, aceita o byte.

Se o total desse ímpar, o byte descartava-se e o protocolo pedia retransmissão. Repara que a verificação é uma conta de dois passos feita em todos os bytes recebidos: barata, automática e a única defesa contra um fio ruidoso.

:::warning[Bits de configuração: confirmar, nunca assumir]
Taxa de transmissão, bits de dados, paridade e stop bits têm de ser iguais nos dois lados da porta série. Com qualquer divergência, os bytes chegam mas descodificam lixo consistente, o sintoma mais enganador da cadeira: tudo parece funcionar exceto o conteúdo. Perante lixo consistente, confere a configuração antes de culpares o código.
:::
