## Mensagens sobre bytes

Um protocolo define limites, tipos, comprimentos, unidades, ordem de campos e ordem de bytes. UART entrega bytes, não mensagens. Serializa campos explicitamente; padding e endianness impedem usar uma `struct` crua como formato portátil.

No formato próprio da lição, cada frame é delimitado por `7E`. O corpo contém tipo, sequência, comprimento, payload e checksum XOR dos bytes anteriores.

- `7E` no corpo transmite-se como `7D 5E`.
- `7D` no corpo transmite-se como `7D 5D`.
- Remove escaping antes de interpretar campos e conferir checksum.

```text
Corpo:  01 07 02 7E 05 7F
Linha:  7E 01 07 02 7D 5E 05 7F 7E
```

O XOR dá `7F`. Os nove bytes em 8N1 a 9600 bit/s demoram pelo menos $9\cdot10/9600=9{,}375$ ms. Para payload de $L\leq255$ bytes, reserva até $2(L+4)+2$ bytes transmitidos.

XOR deteta alguns erros, mas inverter o mesmo bit em dois bytes conserva o checksum: payload `7F 04` tem o mesmo XOR de `7E 05`. ACK e timeout não revelam essa corrupção aceite.

## Parser e recuperação

O estado persiste entre chegadas fragmentadas; não bloqueies à espera do frame inteiro.

| Estado e entrada        | Ação                                   |
| ----------------------- | -------------------------------------- |
| `WAIT_START`, `7E`      | Iniciar corpo vazio em `BODY`          |
| `WAIT_START`, outro     | Ignorar                                |
| `BODY`, byte normal     | Guardar dentro da capacidade           |
| `BODY`, `7D`            | Passar a `ESCAPED`                     |
| `ESCAPED`, `5E` ou `5D` | Guardar byte XOR `20`, voltar a `BODY` |
| `ESCAPED`, `7E`         | Descartar parcial, iniciar corpo vazio |
| `BODY`, `7E`            | Validar corpo, preparar o seguinte     |

Outro byte após escape invalida o corpo e leva a `WAIT_START`. Delimitadores consecutivos não publicam mensagens vazias. Excesso de capacidade, erro UART ou timeout invalidam o parcial.

**Só publica um evento depois de validar** tipo, campos, comprimento e checksum no fecho. Aplicar o primeiro campo antes dessa validação deixa efeitos de mensagens inválidas.

## ACK, sequência e sessão

Em stop-and-wait, guarda a mensagem, envia e espera ACK; reenvia a **mesma sequência** após timeout, com tentativas limitadas.

1. `MOVE +5`, sequência 7, é aplicado e confirmado.
2. Se o ACK se perder, o emissor reenvia sequência 7.
3. O recetor reconhece o duplicado, repete ACK 7 e não aplica outro +5.

ACK confirma aceitação segundo o contrato, não apresentação ao utilizador. Sequências de oito bits dão a volta; sessão e janela têm de impedir confusão com mensagens antigas. Estados absolutos podem tolerar repetição, mas ainda precisam de rejeitar versões antigas.

## Sincronização e capacidade

Define quem inicia `JOIN`, quem responde `START`, versão, sessão, timeout e desempate se ambos iniciarem. Reconexão descarta bytes e estado parcial anterior.

Na replicação, ambos precisam do mesmo estado inicial, entradas na mesma ordem, instantes lógicos e regras determinísticas. Na centralização, um lado calcula o estado e o outro envia entradas/apresenta resultados.

Em 8N1 a 115200 bit/s, a capacidade ideal é 11520 bytes/s. Uma imagem de 1024×768 a 8 bpp demora pelo menos 68,27 s. Envia entradas ou alterações de estado e desenha localmente; overhead e retransmissões agravam o tempo.

[Parser e traço de receção](/cadeiras/lc/protocolos/#parser-com-estado).
