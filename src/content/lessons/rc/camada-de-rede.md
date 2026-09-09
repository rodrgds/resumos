---
title: Camada de rede e encaminhamento
description: Endereçamento IP, sub-redes com máscaras e algoritmos de encaminhamento.
section: conteudo
order: 7
---

A camada de rede responde à pergunta grande: como levar um pacote de qualquer origem a qualquer destino, atravessando redes que ninguém desenhou em conjunto. As respostas são o endereçamento IP, a divisão em sub-redes e os algoritmos que preenchem as tabelas dos routers.

## Endereços IP e máscaras

Um endereço IPv4 tem 32 bits, escritos como quatro números decimais, por exemplo `192.168.1.20`. A **máscara** diz que parte identifica a rede e que parte identifica a máquina dentro dela: em `192.168.1.0/24`, os primeiros 24 bits são a rede e os últimos 8 bits são as máquinas. O `/24` é o comprimento do prefixo, e a máscara em decimal é `255.255.255.0`.

Cada sub-rede reserva dois endereços: o primeiro identifica a própria rede e o último é o **endereço de difusão** (broadcast), que fala com todas as máquinas da sub-rede. Numa `/24` há $2^8 = 256$ endereços menos estes dois, ou seja 254 máquinas utilizáveis.

## Dividir uma rede em sub-redes

Pegar na rede `192.168.1.0/24` e parti-la em 4 sub-redes iguais pede 2 bits emprestados à parte das máquinas: o prefixo passa a `/26` e a máscara a `255.255.255.192`. Cada sub-rede fica com $2^6 = 64$ endereços, 62 utilizáveis. A tabela fica assim:

| Sub-rede | Rede               | Utilizáveis                       | Difusão         |
| -------- | ------------------ | --------------------------------- | --------------- |
| 1        | `192.168.1.0/26`   | `192.168.1.1` a `192.168.1.62`    | `192.168.1.63`  |
| 2        | `192.168.1.64/26`  | `192.168.1.65` a `192.168.1.126`  | `192.168.1.127` |
| 3        | `192.168.1.128/26` | `192.168.1.129` a `192.168.1.190` | `192.168.1.191` |
| 4        | `192.168.1.192/26` | `192.168.1.193` a `192.168.1.254` | `192.168.1.255` |

Confere a segunda: começa em 64 porque cada bloco tem 64 endereços ($0$, $64$, $128$, $192$); o último utilizável é $64 + 62 = 126$ e a difusão é $127$. O método geral é sempre este: $n$ bits emprestados dão $2^n$ sub-redes, e cada bloco começa em múltiplo do seu tamanho.

Na prática, quase ninguém configura isto à mão em cada máquina: o **DHCP** entrega endereço, máscara, gateway e DNS automaticamente quando te ligas, e o **ICMP** leva as mensagens de erro e de diagnóstico (o `ping` e o `traceroute` falam ICMP).

## Como os routers escolhem

Cada router tem uma **tabela de encaminhamento** com entradas do tipo "para este prefixo, envia pela interface X ao vizinho Y". Perante um pacote, escolhe a entrada com o **prefixo mais longo** que contenha o destino: entre `192.168.0.0/16` e `192.168.1.128/26`, um pacote para `192.168.1.130` segue a segunda, porque é a mais específica.

As tabelas podem ser escritas à mão (encaminhamento estático, bom para redes pequenas) ou aprendidas por protocolos: **vetor de distâncias**, onde cada router conta aos vizinhos o que sabe e todos convergem por aproximações sucessivas, e **estado de ligação**, onde cada router inunda o mapa da rede e todos calculam os caminhos mais curtos localmente. O primeiro é simples e por vezes lento a reagir a falhas; o segundo é rápido e gasta mais memória e processamento. A Internet usa as duas ideias em escalas diferentes.

:::details[Ver a regra de ouro da divisão]
Para partir uma rede em $k$ sub-redes, escolhe o menor $n$ com $2^n \geq k$ e empresta $n$ bits. Cada sub-rede tem $2^{32 - \text{prefixo}}$ endereços e blocos alinhados a múltiplos desse tamanho. O erro típico é esquecer os dois endereços reservados por sub-rede e contar $64$ máquinas onde só cabem $62$.
:::
