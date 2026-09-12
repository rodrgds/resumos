---
title: Cheat sheet de CG
description: Fórmulas e decisões rápidas para transformações, iluminação, visibilidade, malhas, curvas e rasterização.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos CG SofiaViP
      url: https://drive.google.com/file/d/1VcTxk6X36ipf_SynqzerkUKZYYmGyqST/view
  coverage: A página 1 é a capa; as páginas 2 a 22 cobrem transformações 2D/3D, iluminação local e global, sombras, sombreamento, texturas e cor, visibilidade, malhas, curvas, sólidos e rasterização de linhas.
  gaps:
    - O PDF não desenvolve a pipeline programável moderna, gestão de cor completa, rasterização de triângulos ou implementação de ray tracing.
    - A edição do programa e as regras de avaliação a que os apontamentos correspondem não foram confirmadas.
---

Antes de calcular, fixa **espaço de coordenadas, convenção de vetores e sentido da luz/câmara**.

## Transformar pontos, vetores e normais

Em coordenadas homogéneas, um ponto 3D é $(x,y,z,1)$ e um vetor direção é $(v_x,v_y,v_z,0)$. A translação altera pontos, não direções. Com vetores-coluna, $p'=Mp$ e a transformação mais à direita atua primeiro: para escalar, rodar e depois transladar, $M=TRS$. Em geral, $TR\ne RT$. Para rodar em torno de um ponto $c$, usa $T(c)R T(-c)$. Escala não uniforme altera ângulos e comprimentos. Vê [coordenadas homogéneas](/cadeiras/cg/transformacoes-geometricas/#coordenadas-homogéneas) e [ordem das transformações](/cadeiras/cg/transformacoes-geometricas/#a-ordem-muda-o-resultado).

Transforma uma normal por $n'\propto(M_{3\times3}^{-1})^{\mathsf T}n$ quando a parte linear de $M$ é invertível, e **normaliza-a** antes da iluminação. Multiplicar a normal como um ponto ou pelo mesmo $M$ pode dar resultado errado com escala não uniforme. No percurso objeto → mundo → vista → recorte → ecrã, recorta antes de dividir por $w$; após a divisão de perspetiva obtêm-se coordenadas normalizadas. Vê [câmara](/cadeiras/cg/transformacoes-geometricas/#instancing-e-câmara) e [etapas da pipeline](/cadeiras/cg/pipeline-visualizacao/#as-etapas-do-vértice).

## Iluminação, sombras e sombreamento

No modelo **local** de Phong, uma forma útil por canal é $I=k_aI_a+f(d)I_l\{k_d\max(0,n\cdot l)+k_s\max(0,r\cdot v)^q\}$. Os vetores $n,l,r,v$ têm norma 1, $l$ aponta do ponto para a luz e $r=2(n\cdot l)n-l$ reflete a direção incidente. Inclui a componente especular apenas na face iluminada. $q$ maior concentra o brilho; $f(d)$ modela atenuação se a luz for pontual. A reflexão difusa depende de $n\cdot l$; a especular depende também do observador. Vê [modelo de Phong](/cadeiras/cg/iluminacao-sombreamento/#o-modelo-local-phong) e [especularidade](/cadeiras/cg/iluminacao-sombreamento/#duas-formas-de-especular).

**Sombreamento constante:** uma cor por face. **Gouraud:** iluminação nos vértices, depois interpolação de cores; pode perder um brilho no interior de um triângulo. **Phong:** interpola normais, renormaliza e ilumina por fragmento; não é o mesmo que o _modelo de reflexão_ de Phong. Uma sombra projetada exige testar se a luz chega ao ponto visível: _shadow ray_, mapa de sombras ou outro método. Um _z-buffer_ guarda, por pixel, a profundidade mais próxima segundo a convenção escolhida; inicialização e teste de profundidade têm de concordar. Vê [iluminação e sombreamento](/cadeiras/cg/iluminacao-sombreamento/#iluminação-global-e-sombreamento), [visibilidade](/cadeiras/cg/cor-texturas-visibilidade/#visibilidade) e [sombras](/cadeiras/cg/cor-texturas-visibilidade/#sombras-projetadas).

Iluminação **global** considera luz refletida ou transmitida por outras superfícies. No _ray tracing_, lança raios da câmara, escolhe a interseção visível mais próxima e pode gerar raios secundários para sombra, reflexão e refração; isto não torna automaticamente a luz difusa global. Em radiosidade, as trocas entre superfícies difusas são descritas por fatores de forma. Se usares Snell, $n_1\sin\theta_1=n_2\sin\theta_2$, com ângulos medidos face à normal e índices dos dois meios.

## Cor, texturas e visibilidade

RGB combina luz por **adição**; CMY descreve componentes subtrativas numa aproximação de impressão. Matiz, saturação e valor são uma representação útil para editar cor, mas não substituem modelos físicos ou percetivos completos. Uma textura 2D associa coordenadas $(u,v)$ à superfície; _bump mapping_ altera a normal usada na luz, **não** a geometria nem a silhueta. Filtragem e amostragem determinam o detalhe visível. Vê [cor](/cadeiras/cg/cor-texturas-visibilidade/#cor-perceção-e-modelos) e [texturas](/cadeiras/cg/cor-texturas-visibilidade/#texturas).

**Back-face culling** descarta faces orientadas para trás na convenção de orientação definida, mas não resolve ocultação entre faces frontais. Em espaço de imagem, o _z-buffer_ compara fragmentos por pixel; _ray casting_ procura a interseção mais próxima ao longo de um raio; métodos de ordenação ou subdivisão exigem hipóteses adicionais sobre os objetos. Transparência precisa de tratamento próprio: um teste de profundidade simples não compõe corretamente várias camadas transparentes. Vê [visibilidade](/cadeiras/cg/cor-texturas-visibilidade/#visibilidade).

## Malhas, curvas, sólidos e linhas

Numa malha triangular, a normal geométrica é proporcional a $(p_1-p_0)\times(p_2-p_0)$; inverter a ordem dos vértices inverte a normal. Guardar conectividade permite encontrar faces e arestas vizinhas. Uma malha fechada não é necessariamente um sólido válido: verifica orientação consistente, interseções, fronteira e topologia. Para um poliedro convexo simples, $V-E+F=2$; a igualdade por si só não prova validade. Vê [estrutura da malha](/cadeiras/cg/modelacao-malhas/#a-estrutura-da-malha), [normal](/cadeiras/cg/modelacao-malhas/#a-normal-do-triângulo) e [sólidos](/cadeiras/cg/modelacao-malhas/#dos-triângulos-aos-sólidos).

Uma curva cúbica paramétrica usa quatro coeficientes por coordenada. **Hermite** fixa extremos e tangentes; **Bézier cúbica** usa quatro pontos de controlo, passa pelos dois extremos e tem tangentes iniciais/finais proporcionais a $P_1-P_0$ e $P_3-P_2$. Continuidade $C^0$ une posições; $C^1$ iguala primeiras derivadas com a mesma parametrização. Não confundas continuidade geométrica $G^1$ (direção da tangente) com $C^1$. Vê [curvas paramétricas](/cadeiras/cg/curvas-superficies/#curvas-paramétricas) e [superfícies](/cadeiras/cg/curvas-superficies/#de-curvas-a-superfícies).

Para rasterizar uma linha no primeiro octante ($0\le m\le1$), avança um pixel em $x$ e decide entre E e NE pelo erro no ponto médio; para outros octantes, troca eixos e sinais de forma consistente. Isto evita usar apenas arredondamento de $y=mx+b$ a cada passo. Vê [linha pelo ponto médio](/cadeiras/cg/rasterizacao-2d/#linhas-pelo-ponto-médio) e [outros octantes](/cadeiras/cg/rasterizacao-2d/#os-outros-octantes).

Os apontamentos selecionam algoritmos clássicos; verifica as convenções concretas do motor ou API antes de os implementar.
