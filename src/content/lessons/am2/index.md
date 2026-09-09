---
title: Análise Matemática II
description: Cálculo diferencial e integral de funções de várias variáveis, integrais de linha e superfície e teoremas de Green, divergência e Stokes.
---

AM2 generaliza o cálculo de AM1 para funções de várias variáveis: curvas no espaço, derivadas parciais e otimização, integrais duplos e triplos, e os integrais de linha e de superfície que culminam nos teoremas de Green, da divergência e de Stokes. Estas ferramentas reaparecem em física, métodos estatísticos e computação gráfica.

## Como está organizado

O primeiro bloco é o cálculo diferencial. Começa por [Curvas paramétricas e funções vetoriais](curvas-parametricas/), que fixa tangente, normal, comprimento de arco e curvatura. Depois, [Limites e continuidade em várias variáveis](limites-continuidade/) trata domínios, curvas de nível e o teste dos caminhos, e [Derivadas parciais, gradiente e jacobiana](derivadas-gradiente/) apresenta a derivação direcional, o plano tangente e a aproximação linear. A [Regra da cadeia e funções implícitas](regra-cadeia-implicitas/) deriva encadeamentos e equações sem isolar variáveis, e [Taylor e extremos](taylor-extremos/) aproxima por polinómios de segunda ordem e otimiza com a hessiana e os multiplicadores de Lagrange.

O segundo bloco é a integração. Os [Integrais de linha e teorema de Green](integrais-linha/) distinguem o integral escalar do trabalho de um campo, com campos gradiente e independência do caminho. Os [Integrais duplos](integrais-duplos/) cobrem Fubini, troca de ordem e coordenadas polares, e os [Integrais triplos](integrais-triplos/) acrescentam as coordenadas cilíndricas e esféricas. Por fim, [Superfícies, fluxo e os teoremas da divergência e de Stokes](superficies-fluxo/) parametriza superfícies e fecha a cadeira com os dois grandes teoremas.

## Como estudar

Lê cada página com papel ao lado e refaz o exemplo principal sem espreitar, porque AM2 avalia cálculo encadeado: um domínio mal lido ou um jacobiano esquecido propaga-se por todo o exercício. Desenha sempre a região ou o sólido antes de escrever limites, e confirma cada resultado com um caso conhecido (metade da bola, circulação nula num gradiente). Nos testes não é permitido usar tabelas, formulários nem calculadoras, por isso decora as parametrizações standard (reta, circunferência, esfera), os jacobianos ($r$, $r$, $\rho^2\sin\varphi$) e as condições de cada teorema. Quando houver várias vias (direta, Green, divergência), escolhe a que te sai com menos erros e verifica a orientação antes de integrar.

## Avaliação

A forma de avaliação muda de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes o número de testes, as datas e as regras de frequência e de recurso.

## Fontes e âmbito

Estas páginas seguem o programa da unidade curricular L.EIC007, Análise Matemática II, documentado nos materiais oficiais de 2024/25: funções vetoriais e curvas paramétricas (vetor tangente e normal, comprimento de arco, curvatura); funções de $\mathbb{R}^n$ em $\mathbb{R}^m$ (limites, continuidade, derivadas parciais e direcionais, gradiente, jacobiana, cadeia, funções implícitas, Taylor, máximos e mínimos livres e condicionados); integração (integrais de linha, duplos em cartesianas e polares, triplos em cartesianas, cilíndricas e esféricas); e tópicos adicionais (campos gradiente, Green, superfícies, área, integrais de superfície, fluxo, divergência, rotacional e os teoremas da divergência e de Stokes).

Material oficial da FEUP:

- Página de conteúdos de Análise Matemática II (L.EIC007), ocorrência de 2024/25, com 11 aulas teóricas, 5 fichas de problemas práticos e enunciados de testes (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/conteudos_geral.ver?pct_pag_id=249640&pct_parametros=pv_ocorrencia_id=541872).
- Plano de estudos da LEIC, que confirma a colocação da unidade curricular no primeiro ano, segundo semestre: [LEIC](https://www.up.pt/feup/documents/30/LEIC.pdf).
- Bibliografia indicada nas aulas: _Calculus, One and Several Variables_ de Salas, Hille e Etgen; _Calculus: Early Transcendental Functions_ de Larson e Edwards; _Apontamentos de Análise Matemática II_ de C. C. António, AEFEUP, 2017; e _Noções sobre Análise Matemática_ de José Augusto Trigo Barbosa, 2020.

Material histórico da FEUP, usado para confirmar a estrutura dos temas (os enunciados e a avaliação atuais estão na página da disciplina):

- Acetatos por capítulos (funções vetoriais e escalares, integrais duplos, triplos, de linha e de superfície com fluxo), fichas de exercícios e provas de avaliação de 2012 a 2018 da unidade de Complementos de Matemática do MIEIC, preservados no repositório público [xico2001pt/feup-cmat](https://github.com/xico2001pt/feup-cmat) e consultados como referência local.

Notas de estudantes, úteis como apoio mas sem valor oficial:

- _Resumos AM II SofiaViP_, apontamentos de estudante em circulação pública (ficheiro PDF descarregado da pasta pública em setembro de 2026).

Limite do âmbito: o programa oficial prevê ainda uma introdução às equações diferenciais parciais nas últimas aulas, mas o material local disponível não a cobre de forma substantiva (as aulas correspondentes não constam da coleção e os testes de 2024/25 não a avaliam), por isso esse tópico não é aqui desenvolvido. Os exemplos e exercícios destas páginas são originais, escritos para este site. Não reproduzem os enunciados das fichas nem dos testes.
