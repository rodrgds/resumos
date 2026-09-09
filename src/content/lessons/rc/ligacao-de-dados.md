---
title: Ligação de dados
description: Tramas, deteção de erros com CRC, retransmissão com ARQ e controlo de fluxo.
section: conteudo
order: 3
---

A camada física entrega bits; a camada de ligação de dados entrega **tramas** entre vizinhos diretos, com princípio, fim e garantia de que o conteúdo chegou intacto ou então volta a pedir-se. É o contrato "do próximo salto", usado em cada cabo e em cada troço de rádio da rede.

## Delimitar e proteger a trama

O recetor precisa de saber onde começa e acaba cada trama. A técnica comum é reservar sequências especiais como delimitadores e fugir dessas sequências quando aparecem nos dados (**bit stuffing**): depois de cinco uns seguidos, o emissor insere um zero extra, e o recetor remove-o. Assim o delimitador nunca aparece por acidente dentro dos dados.

Proteger significa detetar erros. O mecanismo de trabalho é o **CRC** (verificação de redundância cíclica): o emissor divide os dados por um gerador acordado e cola o resto à trama; o recetor repete a divisão e só aceita a trama se o resto der zero. Todo o cálculo é feito bit a bit com ou-exclusivo, sem empréstimos nem transportes.

Segue um exemplo completo. Dados `1010`, gerador `1011` (grau 3, por isso três bits de CRC). Acrescenta três zeros aos dados: `1010000`. Divide por `1011`:

- Primeiros quatro bits `1010`; começa por 1, faz ou-exclusivo com `1011` e dá `0001`; desce o zero seguinte e fica `0010`.
- Começa por 0, não faz nada; desce o zero seguinte e fica `0100`.
- Começa por 0, não faz nada; desce o último zero e fica `1000`.
- Começa por 1, faz ou-exclusivo com `1011` e dá `0011`. Acabaram os bits: o CRC é `011`.

A trama transmitida é `1010011`. Confirma: dividir `1010011` por `1011` dá resto zero, por isso o recetor aceita. Se um bit se corromper pelo caminho, o resto deixa de dar zero e a trama é descartada. O CRC não corrige, só acusa, e fá-lo muito bem: com um gerador decente, erros de rajada curtos são sempre apanhados.

## ARQ: pedir outra vez

Descartar não chega; alguém tem de voltar a pedir. Os protocolos **ARQ** numeram as tramas e usam confirmações (**ACK**): o recetor confirma o que chegou bem, e o emissor retransmite o que não foi confirmado dentro de um temporizador. O **stop-and-wait** envia uma trama e para à espera do ACK; o **go-back-N** e a **retransmissão seletiva** mantêm várias tramas em voo e só repetem as que falharam.

O stop-and-wait mostra o custo da espera. Uma trama de 1000 bits a 1 Mbps demora 1 ms a transmitir; se a ida e volta (**RTT**) for 20 ms, a ligação passa 1 ms a trabalhar e 20 ms à espera. A utilização é $1 / (1 + 20)$, menos de 5 por cento. Em ligações longas ou rápidas, parar à espera é um luxo, e é por isso que os protocolos reais usam janelas de várias tramas.

## Controlo de fluxo

O emissor também não pode afogar o recetor. O **controlo de fluxo** limita quantas tramas podem estar em voo sem confirmação: a **janela deslizante** do emissor avança à medida que chegam ACKs, e o tamanho da janela é negociado com a capacidade do recetor. É uma ideia simples com uma consequência importante: a janela limita o débito máximo a $\text{janela} / RTT$, por muito rápida que seja a ligação. Vais reencontrar esta fração no [controlo de congestionamento](transporte-e-aplicacoes/), onde o limite passa a ser a rede em vez do recetor.
