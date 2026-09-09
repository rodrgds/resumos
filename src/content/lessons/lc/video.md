---
title: Placa de vídeo
description: Modos VBE, framebuffer linear e double buffering sem cintilação.
section: conteudo
order: 7
---

A **placa de vídeo** em modo gráfico expõe a imagem como um **framebuffer**: uma zona de memória onde cada posição corresponde a um píxel no ecrã. Desenhar é escrever bytes nos endereços certos. O trabalho desta página é mapear o modo gráfico, calcular o endereço de cada píxel e eliminar a cintilação com dois buffers.

## Modo gráfico e framebuffer

O modo define-se pelo padrão VBE: resolução, bits por píxel e endereço base do framebuffer linear. Um modo clássico dos trabalhos é 1024 por 768 com 8 bits por píxel (256 cores indexadas): cada píxel ocupa exatamente um byte, e o framebuffer inteiro ocupa $1024 \times 768 = 786432$ bytes. O endereço do píxel $(x, y)$ é:

$$
\text{endereço} = \text{base} + y \times \text{bytes\_por\_linha} + x \times \text{bytes\_por\_píxel}
$$

Com 8 bits por píxel, `bytes_por_píxel` é 1 e `bytes_por_linha` é 1024 (mais eventuais bytes de enchimento no fim de cada linha, que se lêem nas informações do modo e nunca se assumem). Com mais bits por píxel, cada píxel ocupa vários bytes seguidos e a cor escreve-se por componentes.

## Exemplo: desenhar um retângulo

Para pintar um retângulo de 100 por 50 píxeis com o canto superior esquerdo em $(200, 150)$, percorrem-se as 50 linhas de $y = 150$ a $y = 199$ e, em cada uma, escrevem-se 100 bytes a partir de $x = 200$:

```c
for (int y = 150; y < 150 + 50; y++) {
  for (int x = 200; x < 200 + 100; x++) {
    framebuffer[y * 1024 + x] = COR;
  }
}
```

São $100 \times 50 = 5000$ bytes escritos. O cálculo do índice usa sempre `bytes_por_linha` (1024), nunca a largura visível assumida de cor: se o modo tiver enchimento, usar a largura desalinhava todas as linhas abaixo da primeira. Cada primitiva gráfica (linha, círculo, sprite) é uma variação deste padrão de percorrer posições e escrever cores.

## Double buffering contra a cintilação

Se desenhares diretamente no buffer visível, o utilizador vê o desenho a meio: sprites a aparecer por partes e o fundo a piscar. A solução é o **double buffering**: desenhas a imagem completa num segundo buffer fora do ecrã e depois copias tudo de uma vez (ou trocas o buffer visível). A cópia de $786432$ bytes é rápida face ao tempo de uma imagem, e o olho só vê imagens completas.

A regra de ouro: nunca mistures desenho e apresentação no mesmo buffer. O ciclo de cada imagem é sempre desenhar tudo no buffer escondido, apresentar, e só depois começar a próxima.

:::tip[Como depurar gráficos]
Quando o ecrã mostra lixo, verifica por esta ordem: o modo foi bem definido e o endereço base é o anunciado, o cálculo do índice usa os bytes por linha do modo, a cor escrita cabe nos bits por píxel, e estás a desenhar no buffer escondido e a apresentar depois. A maioria dos ecrãs estranhos é um índice mal calculado, não hardware avariado.
:::
