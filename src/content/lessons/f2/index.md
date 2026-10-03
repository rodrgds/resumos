---
title: Física II
description: Campos elétricos e magnéticos, circuitos, medições e processamento de sinais.
order: 0
editorial:
  basedOn: 2025/26
  sources:
    - title: Física II, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586991
    - title: Materiais teóricos e teórico-práticos de Física II, Moodle 2025/26
      url: https://moodle2526.up.pt/mod/resource/view.php?id=135878
    - title: Jaime E. Villate, Eletricidade, Magnetismo e Circuitos, 3.ª edição, 2019
      url: https://villate.org/eletricidade/
    - title: Jaime E. Villate, Exercícios Resolvidos de Eletricidade, Magnetismo e Circuitos, 3.ª edição, 2020
      url: https://def.fe.up.pt/eletricidade/problemas.html
  coverage: Eletromagnetismo, redes resistivas e reativas, medições, linhas de transmissão, sinais, SLIT, Fourier e amostragem, com exemplos e exercícios escritos para este percurso e duas adaptações identificadas. A ficha SIGARRA de 2026/27 enumera sete blocos até indução e menciona processamento de sinais nos objetivos; os blocos de sinais derivam dos materiais arquivados de 2025/26 e são cobertura histórica, não confirmação do exame de 2026/27.
  gaps:
    - Os materiais de aula usados são de 2025/26; a avaliação foi conferida na ficha de 2026/27, não em futuros enunciados ou avisos do Moodle.
    - Os vídeos indicados pelo docente estão ligados como recursos opcionais, sem revisão integral do seu conteúdo.
---

No fim desta cadeira consegues calcular campos a partir de cargas e correntes, resolver circuitos com resistências, condensadores e bobinas, e tratar tensões e correntes como sinais com filtros e amostragem. O percurso abaixo ordena esses passos: primeiro forças, potenciais e energia; depois tensões, correntes e memória; por fim sinais, filtros e conversão digital.

Precisas de vetores, produto escalar e vetorial, derivadas, integrais, números complexos e equações diferenciais simples. Para fluxo, divergência e rotacional, revê [AM2](/cadeiras/am2/), porque essas ferramentas reaparecem em Maxwell. Força, trabalho e oscilações vêm de [F1](/cadeiras/f1/).

## Percurso de estudo

1. [Carga e campo elétrico](/cadeiras/f2/carga-campo/): estrutura atómica, Coulomb, Lorentz e trajetórias.
2. [Equações de Maxwell](/cadeiras/f2/equacoes-maxwell/): fluxo, circulação, simetrias e conservação da carga.
3. [Potencial, condutores e capacidade](/cadeiras/f2/potencial-capacidade/): trabalho, blindagem e energia eletrostática.
4. [Magnetismo e indução](/cadeiras/f2/magnetismo-inducao/): forças em fios, Ampère, Faraday, Lenz e transformadores.
5. [Ondas eletromagnéticas](/cadeiras/f2/ondas-eletromagneticas/): fase, polarização, Poynting e radiação.
6. [Condução elétrica](/cadeiras/f2/conducao-eletrica/): deriva, resistividade, semicondutores e Hall.
7. [Circuitos resistivos](/cadeiras/f2/circuitos-resistivos/): nós, malhas, divisores, Thévenin e Norton.
8. [Circuitos reativos](/cadeiras/f2/circuitos-reativos/): condições iniciais, RC, RL e RLC.
9. [Medições e incertezas](/cadeiras/f2/laboratorio/): instrumentos, propagação e ajuste de dados.
10. [Regime sinusoidal](/cadeiras/f2/regime-sinusoidal/): fasores, potência e ressonância.
11. [Linhas de transmissão](/cadeiras/f2/linhas-transmissao/): atrasos, parâmetros distribuídos e reflexão.
12. [Sinais e sistemas](/cadeiras/f2/sinais/): energia, memória, causalidade, estabilidade e linearidade.
13. [Sistemas lineares invariantes](/cadeiras/f2/sistemas-lti/): convolução e resposta impulsional.
14. [Fourier](/cadeiras/f2/fourier/): harmónicos e transformadas.
15. [Resposta em frequência e amostragem](/cadeiras/f2/frequencia-amostragem/): filtros, banda e aliasing.

Os exercícios no fim de cada página foram escritos para este percurso, com duas pistas, solução e erros frequentes. Resolve-os antes de abrir a ajuda. Dois casos reutilizam valores de materiais de 2025/26 para treinar o mesmo cálculo: o exemplo de referenciais em carga e campo usa os valores do mini-teste A, e um exercício de fasores usa amplitude e fase da TP9 com outra frequência. Quando isso acontece, a lição identifica a adaptação. A [cheat sheet](/cadeiras/f2/folha-consulta/) reúne relações e condições para consulta depois de estudar.

## Como resolver problemas

Desenha a geometria ou o circuito. Marca referências de tensão, corrente, normal e sentido do percurso. Escreve as hipóteses antes das equações: eletrostática ou campos variáveis, condutor ou isolante, estado inicial ou regime permanente, amplitude de pico ou eficaz.

Mantém unidades nas contas e verifica um resultado por outro caminho. Em circuitos, compara a potência entregue e absorvida. Num transitório, confirma o instante inicial e o limite final. Num campo, testa a direção e a simetria. Num sinal amostrado, compara os valores nos instantes de amostragem, não apenas a forma da curva.

:::details[Avaliação de 2026/27]

A [ficha de Física II de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586991) indica avaliação distribuída com exame final. Com $T$ a nota do teste, $LAB$ a do trabalho laboratorial e $E$ a do exame, a classificação é

$$
\max\left(E,\;0{,}3T+0{,}1LAB+0{,}6E\right).
$$

É obrigatória a participação em $75\%$ das aulas teórico-práticas para obter frequência. A assiduidade obtida vale também no ano imediatamente seguinte. Trabalhadores estudantes e situações justificadas equiparadas têm o regime indicado na ficha, com nota final do exame; a época especial usa um exame de formato próprio e classificação integral desse exame.

Confirma os avisos da edição em que estás inscrito. Os mini-testes e o recurso de 2025/26 abaixo são treino histórico: as suas datas, duração e regras não definem as provas de 2026/27.

:::

:::details[Materiais de 2025/26]

A base de estudo são os materiais do Moodle de 2025/26. As apresentações teóricas 1 a 13 abrangem carga, campo, Maxwell, ondas, condução, redes resistivas e reativas, análise laboratorial, regime sinusoidal, ressonância e linhas de transmissão, sinais, SLIT e frequência. As folhas TP 1 a 12 dão problemas correspondentes.

- [Primeira apresentação, carga elétrica](https://moodle2526.up.pt/mod/resource/view.php?id=77336) e [primeira folha TP](https://moodle2526.up.pt/mod/resource/view.php?id=77433).
- [Análise de dados laboratoriais](https://moodle2526.up.pt/mod/resource/view.php?id=115798), [resistências](https://moodle2526.up.pt/mod/resource/view.php?id=119354), [multímetro](https://moodle2526.up.pt/mod/resource/view.php?id=119355) e [placa de protótipos](https://moodle2526.up.pt/mod/resource/view.php?id=119356).
- [SLIT no domínio das frequências](https://moodle2526.up.pt/mod/resource/view.php?id=135878), que completa o percurso de sinais.
- [Formulário v0.6](https://moodle2526.up.pt/mod/resource/view.php?id=108558), [mini-teste de 5 de novembro de 2025](https://moodle2526.up.pt/mod/resource/view.php?id=130314) e [recurso de 2 de fevereiro de 2026](https://moodle2526.up.pt/mod/resource/view.php?id=109689).

As ligações do Moodle podem exigir autenticação. Confere sempre a notação: nestas páginas, os fasores são de pico, e a transformada de Fourier usa frequência angular com $1/(2\pi)$ na inversa.

:::

:::details[Bibliografia]

- Jaime E. Villate, [Eletricidade, Magnetismo e Circuitos](https://villate.org/eletricidade/), 3.ª edição, setembro de 2019, 2.ª reimpressão de 2022, ISBN 978-972-99396-6-2. O livro usa licença CC BY-SA 3.0 e ajuda a aprofundar campos, circuitos e ondas.
- Jaime E. Villate, [Exercícios Resolvidos de Eletricidade, Magnetismo e Circuitos](https://def.fe.up.pt/eletricidade/problemas.html), 3.ª edição, setembro de 2020, ISBN 978-972-752-271-2, licença CC BY-SA 4.0. Usa-o para comparar passos de resolução depois de tentares um problema.

Os textos, exemplos, exercícios e diagramas destas páginas foram escritos para este percurso. Não são transcrições das provas ou figuras dos livros.

:::

:::details[Vídeos e simulações]

Os vídeos recomendados pelos materiais de 2025/26 estão nas lições onde se vê o conceito: [Fluxo e circulação](/cadeiras/f2/equacoes-maxwell/#fluxo-e-circulação) para divergência e rotacional, [Fasores e impedância](/cadeiras/f2/regime-sinusoidal/#fasores-e-impedância) para amplitude e fase, e [Montar e medir](/cadeiras/f2/laboratorio/#montar-e-medir) para a preparação dos instrumentos. São recursos opcionais dessa edição, sem revisão integral aqui.

Para experimentar circuitos, o [kit de circuitos DC da PhET](https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc) permite comparar ligações em série e paralelo. A [visualização de Faraday do MIT](https://web.mit.edu/8.02t/www/802TEAL3D/visualizations/faraday/index.htm) ajuda a seguir a relação entre campo variável e campo induzido. Usa os modelos interativos nas lições para RC, harmónicos e aliasing antes de passar a montagens reais.

:::
