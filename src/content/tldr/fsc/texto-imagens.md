## Texto e codificação

**ASCII** tem 128 códigos, 7 bits. `A` é 65=`0x41`; os dígitos têm códigos 48…57. O valor do carácter `7` é $55-48=7$.

Unicode atribui **pontos de código**; UTF-8 e UTF-16 codificam-nos em unidades de armazenamento.

- UTF-8 usa 1…4 bytes por ponto de código, preservando ASCII num byte.
- UTF-16 usa uma unidade de 16 bits ou um par, conforme o ponto de código.
- Um símbolo visível pode reunir vários pontos de código, como letra e acento combinatório.

`Aá` em UTF-8 é `41 C3 A1`: **3 bytes, 2 pontos de código**. `C3` começa por `110`, anunciando dois bytes; `A1` começa por `10`, continuando o mesmo ponto. Um terminador zero ocupa mais um byte, sem ser uma letra do texto.

## Imagens

Uma **raster** guarda uma grelha de píxeis; uma imagem **vetorial** guarda formas que podem ser redesenhadas noutra resolução.

RGB é aditivo: com 8 bits por canal, preto=`00 00 00` e branco=`FF FF FF`. São 24 bits/píxel; com alfa de 8 bits, 32. CMYK descreve tintas subtrativas, com branco do suporte quando não há tinta.

## Tamanho dos dados

Sem compressão, cabeçalho ou padding:

$$\text{bytes dos píxeis}=\frac{\text{largura}\times\text{altura}\times\text{bits/píxel}}8.$$

640×480 em RGB de 24 bits dá 921 600 bytes, ou **900 KiB**.

Numa imagem indexada, os píxeis guardam índices. Com 8 bits por índice, a mesma grelha ocupa 307 200 bytes; uma paleta de 256 cores RGB de 3 bytes acrescenta 768 bytes. Total: 307 968 bytes, antes dos restantes campos.

Compressão **sem perdas** reconstrói os dados exatos; **com perdas** pode alterar valores. O tamanho JPEG depende do conteúdo e dos parâmetros, não só da resolução. Converter para uma paleta limitada pode perder cores.

[Cálculos de raster e paleta](/cadeiras/fsc/texto-imagens/#calcular-o-tamanho).
