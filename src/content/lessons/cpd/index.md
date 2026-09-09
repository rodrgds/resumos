---
title: Computação Paralela e Distribuída
description: As duas metades da cadeira, paralelismo com OpenMP e sistemas distribuídos com tolerância a falhas.
section: conteudo
order: 0
---

Computação Paralela e Distribuída, CPD, é a cadeira onde deixas de pensar num só programa a correr num só processador. A primeira metade acelera cálculos dividindo o trabalho por vários núcleos da mesma máquina. A segunda metade liga várias máquinas em rede para cooperarem apesar de atrasos e falhas. As ferramentas saem diretamente da ficha da cadeira, git, JDK e Go, e a avaliação junta exame e projeto.

## Um problema, duas metades

Imagina que tens de multiplicar matrizes grandes todos os dias e servir os resultados a vários clientes ao mesmo tempo. Na primeira metade aprendes a dividir a multiplicação pelos núcleos disponíveis, a medir o ganho e a perceber onde ele esgota. Na segunda metade aprendes a pôr esse cálculo atrás de um servidor, a lidar com mensagens que se atrasam ou se perdem e a manter o serviço de pé quando uma máquina falha.

O mapa da cadeira segue essa divisão. Começa por [Introdução à computação paralela](computacao-paralela-introducao/), que fixa o vocabulário e as medidas de desempenho. Depois, [Máquinas paralelas e memória cache](arquiteturas-memoria-cache/) mostra por que a organização da memória decide o desempenho real. A [Lei de Amdahl](lei-de-amdahl/) põe o limite teórico ao speedup. Com [Tipos de paralelismo e OpenMP](paralelismo-openmp/) passas à prática em memória partilhada, e [Concorrência e sincronização](concorrencia-sincronizacao/) trata dos erros que nascem quando threads partilham dados.

A segunda metade abre com [Sistemas distribuídos e comunicação](sistemas-distribuidos-comunicacao/), os modelos para máquinas conversarem. [Tolerância a falhas](tolerancia-falhas/) mostra como o sistema sobrevive a avarias. Fecha com [Escalabilidade e o caso DNS](escalabilidade-dns/), onde o sistema de nomes da Internet ilustra as técnicas todas a funcionar em escala planetária.

## Como estudar

Cada metade pede um hábito diferente. Na parte paralela, corre o código e mede. Os números desta cadeira só fazem sentido com cronómetro na mão, porque o speedup depende da máquina, do tamanho da entrada e da ordem dos acessos à memória. Na parte distribuída, desenha. Protocolos como eleição e two-phase commit percebem-se seguindo mensagens concretas entre processos numerados, passo a passo, até cada processo decidir o mesmo.

## Avaliação

A avaliação é distribuída com exame final. Pela ficha de 2025/2026, o exame pesa 60 por cento e o trabalho de projeto 40 por cento, com nota mínima de 6 valores no exame. A frequência exige 75 por cento das aulas TP, demonstração dos projetos e os formulários de autoavaliação e avaliação de pares. Há dois projetos, um paralelo e um distribuído. Regras e pesos mudam de ano para ano, por isso confirma sempre a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Computação Paralela e Distribuída (L.EIC028) do 3.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: medidas de desempenho, máquinas paralelas e cache, lei de Amdahl, tipos de paralelismo, OpenMP, concorrência, computação distribuída, modelos de comunicação, tolerância a falhas e escalabilidade com o caso DNS. O software de trabalho é git, JDK e Go.

Material oficial da FEUP:

- Ficha da unidade curricular de Computação Paralela e Distribuída, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560113).
