---
title: Transporte e aplicações
description: UDP e TCP, fiabilidade, congestionamento, sockets e as aplicações da Internet.
section: conteudo
order: 8
---

A camada de rede entrega pacotes entre máquinas; a camada de transporte entrega entre **processos**, com a fiabilidade que cada aplicação precisa. Esta página mostra os dois transportes da Internet, como o TCP abre e fecha ligações, e como um programa cliente usa tudo isto.

## UDP: simples e rápido

O **UDP** cola um cabeçalho pequeno (portas de origem e destino, comprimento e soma de verificação) e envia. Não estabelece ligação, não confirma, não retransmite, não ordena. Parece pouco, mas é exatamente o que precisam o DNS (uma pergunta, uma resposta), o streaming (mais vale perder um pedaço que parar tudo) e os jogos (o estado novo substitui o velho). Quando a aplicação trata da fiabilidade ou não precisa dela, o UDP não atrapalha.

## TCP: fiabilidade de ponta a ponta

O **TCP** dá à aplicação a ilusão de um tubo fiável e ordenado de bytes. Por baixo, continua a haver pacotes IP que se perdem e baralham; o TCP numera cada byte, confirma a receção (**ACK cumulativo**: "recebi tudo até aqui") e retransmite o que falta, como um ARQ da [ligação de dados](ligacao-de-dados/) mas de ponta a ponta. A janela deslizante regressa aqui, agora limitada por dois lados: o que o recetor aguenta (controlo de fluxo) e o que a rede aguenta (controlo de congestionamento).

Abrir uma ligação é o aperto de mão triplo. O cliente escolhe um número inicial, por exemplo 100, e envia SYN com seq 100. O servidor escolhe o seu, por exemplo 500, e responde SYN-ACK com seq 500 e ack 101 ("recebi o teu 100, espero o 101"). O cliente confirma com ACK de seq 101 e ack 501. A partir daqui, cada lado sabe que o outro está vivo e por onde começar a contar. Fechar é parecido mas com FINs em cada direção, porque cada lado pode ter ainda dados para enviar quando o outro já acabou.

O **controlo de congestionamento** é o TCP a sondar a rede: começa devagar, acelera enquanto chegam ACKs e trava quando deteta perdas, porque perda significa fila cheia algures. É um algoritmo distribuído sem dono: milhões de emissores a acelerar e travar produzem, em média, uma partilha justa das ligações. Falha em casos conhecidos (ligações sem fios com perdas que não são congestionamento), mas é o que mantém a Internet de pé desde os anos 80.

:::warning[Fluxo contra congestionamento]
O controlo de fluxo protege o recetor (a aplicação lenta); o controlo de congestionamento protege a rede (as filas cheias). Ambos limitam a janela, e vale o menor dos dois. Perante "por que está lento?", a primeira pergunta é qual dos dois está a mandar.
:::

## Sockets: a aplicação a pedir rede

Um **socket** é o ponto onde o programa toca na rede: abre-se, liga-se a um endereço e porta, e depois lê-se e escreve-se como num ficheiro. O excerto abaixo é um cliente TCP mínimo em Python que pede uma página a um servidor e mostra a resposta. Lê-o como ilustração da sequência abrir, ligar, enviar, receber, fechar, que é igual em qualquer linguagem.

```python
import socket

cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cliente.connect(("exemplo.local", 8000))
cliente.sendall(b"GET /dados HTTP/1.0\r\n\r\n")
resposta = cliente.recv(4096)
print(resposta.decode())
cliente.close()
```

A chamada `connect` dispara o aperto de mão triplo; `sendall` entrega os bytes ao TCP, que trata de numerar, confirmar e retransmitir; `recv` devolve o que chegou por ordem; `close` inicia o encerramento com FIN. Por cima disto vivem as aplicações que usas todos os dias: o HTTP do navegador, o DNS que traduz nomes em endereços, o correio eletrónico e a transferência de ficheiros. Cada uma escolhe o transporte à sua medida, UDP para o rápido e simples, TCP para o fiável, e a pilha trata do resto.
