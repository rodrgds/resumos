---
title: Sistemas distribuídos e comunicação
description: Troca de mensagens, invocação remota e multicast, com um servidor mínimo e análise de falhas.
section: conteudo
order: 6
---

Na segunda metade da cadeira, cada máquina tem a sua memória e a sua velocidade, e a única ponte entre elas é a rede. Um sistema distribuído é um conjunto de processos assim que coopera para um objetivo comum, parecendo ao utilizador um sistema coerente.

## Os modelos de comunicação

Na **troca de mensagens**, os processos enviam e recebem bytes explicitamente, como cartas. Sockets TCP e UDP vivem aqui. Na **invocação remota** (RPC, _remote procedure call_), o programador chama uma função que executa noutra máquina, e a biblioteca trata de empacotar argumentos, enviar, esperar e desembrulhar o resultado. Parece uma chamada local, mas atravessa a rede com latência e risco de falha. O **multicast** envia uma mensagem para um grupo de processos de uma vez, útil para difusão de atualizações e descoberta de serviços.

A diferença decisiva para a memória partilhada: aqui não há relógio comum nem memória comum. Cada processo vê apenas as mensagens que já lhe chegaram, e uma resposta que demora pode significar máquina lenta ou máquina morta. Essa ambiguidade, a **falha parcial**, é o tema recorrente daqui até ao fim da cadeira.

## Exemplo completo

Um servidor de horas mínimo em Go, uma das ferramentas da ficha. O servidor escuta na porta 8080 e responde com a hora atual a cada cliente:

```go
package main

import (
    "fmt"
    "net"
    "time"
)

func main() {
    ln, _ := net.Listen("tcp", ":8080")
    defer ln.Close()
    for {
        conn, _ := ln.Accept()
        fmt.Fprintln(conn, time.Now().Format(time.RFC3339))
        conn.Close()
    }
}
```

Guarda em `servidor.go`, corre com `go run servidor.go` e testa noutro terminal com `nc localhost 8080` ou com um pequeno cliente Go com `net.Dial("tcp", "localhost:8080")` seguido de leitura até EOF. A saída é uma linha como `2026-03-14T10:30:00Z`.

Agora a análise que o teste pede. Se uma mensagem se perde, o TCP retransmite e o cliente espera, por isso com TCP a perda vira atraso. Se o servidor cai a meio, o cliente fica à espera até ao timeout sem distinguir "lento" de "morto". E se o cliente repetir o pedido por timeout e o servidor afinal estava vivo, o pedido executa duas vezes. Operações que se repetem sem efeito extra, como ler a hora, chamam-se **idempotentes** e são a resposta padrão a este problema.

:::tip[Como pensar em teste]
Perante um cenário com falhas, pergunta sempre três coisas. O que cada processo sabe quando decide, porque só vê as mensagens recebidas. Se a falha é distinguível de atraso, e com que timeout. E se repetir a operação é seguro, ou seja, se ela é idempotente.
:::
