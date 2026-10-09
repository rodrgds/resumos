## Prefixos e VLSM

IPv4 tem 32 bits. `/p` fixa p bits de rede; máscara com p uns seguida de zeros. `IP AND máscara` dá a rede.

`192.0.2.77/26` tem máscara `255.255.255.192`, rede `.64`, broadcast `.127` e hosts `.65` a `.126`. Em sub-redes usuais, $2^{32-p}-2$ hosts; `/31` pode usar ambos em ponto a ponto e `/32` representa um endereço.

Para VLSM, ordena necessidades da maior para a menor, inclui interfaces de gateway, escolhe blocos potência de dois e alinha o início. Em `198.51.100.0/24`:

| Hosts pedidos | Rede      | Hosts usuais    |
| ------------- | --------- | --------------- |
| 100           | `.0/25`   | `.1` a `.126`   |
| 50            | `.128/26` | `.129` a `.190` |
| 20            | `.192/27` | `.193` a `.222` |

Sobra `.224/27`. Um `/26` não começa em `.130` ou `.224`. Crescimento pode exigir redistribuir redes, mesmo que a soma dos hosts caiba no bloco original.

Agrega apenas blocos contíguos e alinhados com a mesma saída pretendida. Dois `/25` de `.0` e `.128` formam `/24`; um prefixo demasiado curto pode anunciar destinos indevidos.

## Encaminhamento e salto local

Escolhe o **prefixo mais longo** entre rotas correspondentes ao destino. `/0` perde para qualquer correspondência mais específica. Com `/0`, `10.0.0.0/8` e `10.2.0.0/16`, `10.2.3.4` usa `/16`.

- Destino local: próximo salto é o próprio destino.
- Destino remoto: próximo salto é um router diretamente alcançável.
- ARP resolve IPv4 local para MAC. Para destino remoto, o host resolve o MAC do gateway.
- Sem NAT, conservam-se IP dos extremos; cada router diminui TTL, recalcula checksum IPv4 e cria trama para o próximo salto.

Cada interface de router tem IP e prefixo próprios. Instala redes diretamente ligadas e rotas remotas, estáticas ou aprendidas. O IP final não é o IP do próximo salto.

DHCP inicial usa Discover, Offer, Request, ACK, UDP 68 no cliente e 67 no servidor, podendo fornecer IP, máscara, gateway, DNS e concessão. Renovação pode usar outra sequência. ICMP comunica controlo e erros; ping sem resposta não prova máquina desligada.

## Fragmentação IPv4

A MTU limita o pacote IP. Com fragmentação permitida, cada fragmento recebe cabeçalho. Offset conta blocos de 8 bytes dos **dados originais**; cargas de fragmentos não finais são múltiplas de oito. O destino reconstitui. A checksum IPv4 protege apenas o cabeçalho.

4000 bytes totais, cabeçalho 20, MTU 1500, sem opções e DF=0:

| Fragmento | Dados      | Total      | Offset | MF  |
| --------- | ---------- | ---------- | ------ | --- |
| 1         | 1480 bytes | 1500 bytes | 0      | 1   |
| 2         | 1480 bytes | 1500 bytes | 185    | 1   |
| 3         | 1020 bytes | 1040 bytes | 370    | 0   |

## NAT e IPv6

NAT traduz endereços; NAPT/PAT também pode traduzir portas. Uma associação `10.0.0.5:1234 → 198.51.100.9:5001` transforma a origem na ida e repõe o destino privado na resposta. Ligações iniciadas de fora podem exigir associação estática. NAT não substitui firewall.

IPv6 tem 128 bits, cabeçalho base de 40 bytes, Hop Limit e nenhuma checksum de cabeçalho. `::` comprime um único trecho de zeros. Routers **não fragmentam**: descartam pacote demasiado grande e enviam ICMPv6 Packet Too Big. A origem adapta tamanho ou fragmenta. Neighbor Discovery usa ICMPv6 para funções do ARP; multicast substitui funções de broadcast.

[Construir tabelas a partir da topologia](/cadeiras/rc/camada-de-rede/#passar-de-uma-topologia-a-tabelas-de-rotas).
