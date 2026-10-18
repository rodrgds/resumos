## Prefixos e máscaras

- IPv4 tem 32 bits; `/p` fixa $p$ bits de rede. Rede = IP AND máscara.
- `192.0.2.77/26`: máscara `255.255.255.192`, rede `.64`, broadcast `.127`, hosts `.65` a `.126`. Blocos de 64: 0, 64, 128, 192.
- $2^{32-p}$ endereços; hosts usuais menos 2, salvo `/31` ponto a ponto e `/32`.
- Contam interfaces: desconta gateway e gestão. Numa `/27` com gateway cabem 29 computadores, não 30.

## VLSM

- Ordena da maior para a menor necessidade, blocos potência de dois, início alinhado. `/26` não começa em `.130`.
- Para 100, 50 e 20 hosts em `198.51.100.0/24`: `.0/25`, `.128/26`, `.192/27`; sobra `.224/27`.
- Agrega contíguos alinhados com a mesma saída: dois `/25` dão um `/24`. Prefixo curto a mais anuncia destinos indevidos.

## Encaminhamento

- Vale o **prefixo mais longo**. `/0` perde para qualquer correspondência.
- Destino local: próximo salto é o destino. Remoto: router diretamente alcançável.
- Fragmentação IPv4: offset em blocos de 8 bytes da carga; não finais múltiplos de 8; cada fragmento com cabeçalho. 4000 bytes em MTU 1500: 1480/0, 1480/185, 1020/370, MF 1, 1, 0.
- IPv6: 128 bits, sem checksum no cabeçalho, routers não fragmentam; origem reduz ou fragmenta após Packet Too Big.

## ARP, DHCP, NAT

- ARP resolve o MAC do próximo salto; remoto resolve o gateway. Cache vazia não muda a regra.
- DHCP: Discover, Offer, Request, ACK; UDP 68/67.
- NAT traduz endereços e portas com tabela; ida e volta invertem a associação. Iniciado de fora exige associação estática ou reenvio.
