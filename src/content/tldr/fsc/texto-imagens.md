## Texto

- **ASCII:** 128 códigos, 7 bits. `A`=65, `a`=97, dígitos 48…57. Valor do carácter `7`: $55-48=7$.
- Unicode atribui **pontos de código**; UTF-8 e UTF-16 codificam-nos em unidades de armazenamento.
- UTF-8: 1…4 bytes por ponto, ASCII preservado num byte. `á` (U+00E1) é `C3 A1`.
- Prefixos: `110…` anuncia dois bytes; `10…` continua o ponto. `Aá` são **3 bytes, 2 pontos**.
- Bytes, pontos de código e símbolos visíveis (letra + acento combinatório) contam-se separadamente. O terminador zero não é letra.

## Imagens

- **Raster:** grelha de píxeis. **Vetorial:** formas redesenháveis noutra resolução.
- RGB aditivo, 8 bits por canal: preto `00 00 00`, branco `FF FF FF`. 24 bits/píxel; com alfa, 32.
- CMYK subtrativo para impressão; o suporte faz de branco.

## Tamanho

Sem compressão, cabeçalho ou padding:

$$\text{bytes}=\frac{\text{largura}\times\text{altura}\times\text{bits/píxel}}8.$$

- 640×480 RGB: 921 600 bytes = **900 KiB**.
- Indexada de 8 bits: píxeis guardam índices; paleta de 256 cores RGB soma $256\times3=768$ bytes. Total: 307 968.
- Sem perdas reconstrói exato; com perdas pode alterar valores. O tamanho JPEG depende do conteúdo, não só da resolução.

[Exemplos na lição](/cadeiras/fsc/texto-imagens/#calcular-o-tamanho).
