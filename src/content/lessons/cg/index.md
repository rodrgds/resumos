---
title: Computação Gráfica
description: Do vértice ao píxel, síntese de imagem 3D e rasterização 2D na cadeira do 3.º ano.
section: conteudo
order: 0
---

Computação Gráfica é a cadeira onde aprendes a fabricar imagens: pegar numa cena 3D descrita por números e transformá-la nos píxeis que vês no ecrã. A abordagem é de cima para baixo, do 3D para o 2D. Primeiro percebes o caminho completo do vértice até ao ecrã, depois as peças que o compõem (transformações, modelos, luz, cor) e só no fim os algoritmos que pintam píxeis. Vens de [matrizes](/cadeiras/alga/matrizes/) e [aplicações lineares](/cadeiras/alga/aplicacoes-lineares/); aqui vais usá-las todos os dias para mover objetos no espaço.

## Como está organizado

Começa pela [pipeline de visualização](pipeline-visualizacao/), que mostra o caminho completo do vértice até ao dispositivo e onde encaixa cada tópico seguinte. Depois, [transformações geométricas 2D e 3D](transformacoes-geometricas/) ensina a mover, rodar e enquadrar objetos com matrizes homogéneas.

A construção da cena reparte-se por duas páginas: [malhas poligonais e sólidos](modelacao-malhas/) para objetos facetados e [curvas e superfícies](curvas-superficies/) para objetos suaves. Com a geometria pronta, [iluminação e sombreamento](iluminacao-sombreamento/) calcula a luz em cada ponto e [cor, texturas, visibilidade e sombras](cor-texturas-visibilidade/) veste os objetos e decide o que se vê. Fecha com [rasterização 2D](rasterizacao-2d/), que converte linhas e regiões em píxeis.

## Como estudar

Lê cada página com papel ao lado e refaz o exemplo numérico antes de continuar. Em Computação Gráfica quase todos os erros escondem-se em convenções: ordem das matrizes, vetores linha ou coluna, ângulos em graus ou radianos, normais normalizadas ou não. Quando uma conta dá um valor absurdo, a convenção é o primeiro suspeito. Nas aulas teórico-práticas vais testar os exercícios em computador com OpenGL e WebGL; experimenta mudar um parâmetro de cada vez e observa o efeito na imagem.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes os pesos do exame, do teste e do trabalho laboratorial, os mínimos exigidos e as regras de frequência. Não estudes por pesos de anos anteriores.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Computação Gráfica (L.EIC027) do 3.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: panorâmica e aplicações, arquitetura dos sistemas gráficos e pipeline de visualização, síntese de imagem de cenas 3D com iluminação local e global, cor, transformações geométricas 2D e 3D, modelação com malhas poligonais, curvas, superfícies e sólidos, e rasterização 2D de linhas e regiões. O software de trabalho indicado na ficha é JavaScript, C e C++ com OpenGL e WebGL.

Material oficial da FEUP:

- Ficha da unidade curricular de Computação Gráfica, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560112).
