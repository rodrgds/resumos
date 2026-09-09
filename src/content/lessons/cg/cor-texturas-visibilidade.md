---
title: Cor, texturas, visibilidade e sombras
description: Modelos de cor, mapeamento de texturas, teste de profundidade e sombras projetadas.
section: conteudo
order: 6
---

A [iluminação](iluminacao-sombreamento/) calcula um número por ponto; esta página transforma-o em imagem final. A **cor** diz como representar esse número, as **texturas** vestem a geometria com detalhe sem geometria extra, e a **visibilidade** com as **sombras** decidem o que chega ao ecrã. São quatro mecanismos independentes que se combinam no mesmo fragmento.

## Cor: perceção e modelos

O olho tem recetores para três gamas de comprimentos de onda, e por isso três números chegam para descrever uma cor. O modelo **RGB** soma luz vermelha, verde e azul: $(1, 1, 1)$ é branco e $(0, 0, 0)$ é preto. É aditivo porque parte do escuro do ecrã apagado. Para imprimir vale o contrário: o modelo **CMYK** subtrai do branco do papel com tintas ciano, magenta, amarela e preta. Quando precisas de escolher cores, o modelo **HSV** (matiz, saturação, valor) é mais intuitivo: rodas o matiz para mudar a cor, baixas a saturação para a desmaiar e baixas o valor para a escurecer.

Um aviso prático: aritmética ingénua em RGB não preserva o brilho percebido, porque o olho é mais sensível ao verde que ao azul. É por isso que converter para cinzento usa pesos e não a média simples.

## Texturas

Uma **textura** é uma imagem colada na superfície: cada vértice recebe **coordenadas UV** e cada fragmento interpola as suas, lendo o **texel** correspondente. Assim um cubo de 12 triângulos pode mostrar tijolos, madeira ou texto sem um único vértice extra.

O mapeamento de um fragmento com $UV = (0{,}37,\ 0{,}62)$ numa textura de $256 \times 256$ cai no texel:

$$
(\lfloor 0{,}37 \times 256 \rfloor,\ \lfloor 0{,}62 \times 256 \rfloor) = (94,\ 158),
$$

porque $0{,}37 \times 256 = 94{,}72$ e $0{,}62 \times 256 = 158{,}72$. Ler só esse texel (_nearest_) é rápido mas tremido quando a superfície se move; a **filtragem bilinear** mistura os quatro vizinhos e a **mipmapping** escolhe uma versão reduzida da textura conforme a distância, o que elimina o tremido ao longe. O preço é memória: a pirâmide de mipmaps ocupa cerca de mais um terço.

## Visibilidade

Com objetos sobrepostos, cada píxel deve mostrar só o mais próximo. O **_z-buffer_** resolve isto com uma conta por fragmento: guarda a profundidade de cada píxel e só desenha o fragmento se ele estiver mais perto que o guardado. É simples, funciona em qualquer ordem de desenho e custa uma comparação mais uma escrita por fragmento.

Antes disso, o _backface culling_ já eliminou as faces traseiras usando a orientação dos vértices que viste nas [malhas](modelacao-malhas/). A ordem típica é: descarta o que está fora do enquadramento, descarta faces traseiras e resolve o resto com o _z-buffer_.

## Sombras projetadas

O **_shadow mapping_** reutiliza a mesma ideia para a luz: renderiza a cena do ponto de vista da fonte e guarda as profundidades num mapa de sombras. Depois, para cada fragmento visível, compara a sua distância à luz com a guardada. Um fragmento a distância $0{,}45$ da luz, quando o mapa guarda $0{,}42$ na mesma direção, está atrás de alguma coisa: está na sombra e só recebe a parcela ambiente. Na prática soma-se um pequeno **enviesamento** (_bias_) à comparação para evitar artefactos de precisão, porque duas profundidades quase iguais não devem decidir sombra por ruído numérico.

:::details[Ver o raciocínio da sombra]
Imagina a luz como uma câmara que só mede distâncias. O mapa de sombras diz, para cada direção, onde está o objeto mais próximo da luz. Se o teu fragmento estiver mais longe que esse valor, há um objeto no caminho e a luz direta não chega lá. Tudo o resto, incluindo a luz ambiente e reflexos, continua a aplicar-se normalmente.
:::
