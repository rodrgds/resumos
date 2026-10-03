---
title: Engenharia de Software
description: Requisitos, modelos, decisões de desenho e evidência de qualidade para desenvolver software em equipa.
order: 0
editorial:
  basedOn: 2025/26
  gaps:
    - A ocorrência de 2026/27 ainda não tem programa preenchido.
    - Nem todas as referências externas e vídeos do Moodle têm texto integral disponível.
---

No fim desta cadeira vais conseguir transformar uma necessidade numa regra verificável, ou seja vais saber escrevê-la, modelá-la, decidir onde a garantir e mostrar evidência de que funciona. Vais também conseguir trabalhar em equipa com Scrum, porque cada tema usa a mesma aplicação de reserva de salas e os exercícios pedem sempre a decisão e a sua justificação.

Por isso começa pelos [fundamentos](/cadeiras/es/introducao/) e pelos [processos](/cadeiras/es/processos-software/). Aprende a transformar uma necessidade em [requisitos](/cadeiras/es/requisitos-uml/) com histórias e aceitação. Depois acompanha uma equipa com [Scrum](/cadeiras/es/scrum/) e [gestão de projetos](/cadeiras/es/gestao-projetos/), que usam esses artefactos. Descreve o acordo com [UML](/cadeiras/es/modelacao-uml/) e escolhe a [arquitetura](/cadeiras/es/arquitetura-desenho/).

## Percurso de estudo

A segunda parte trata da evidência e da mudança: [verificação e validação](/cadeiras/es/verificacao-validacao/), [práticas de XP](/cadeiras/es/xp/), [construção e evolução](/cadeiras/es/construcao-evolucao/) e [melhoria do processo](/cadeiras/es/melhoria-processo/). Termina com a [documentação e demonstração do projeto](/cadeiras/es/projeto/). A [cheat sheet](/cadeiras/es/folha-consulta/) reúne condições e distinções para rever depois de estudar.

As páginas usam exemplos próprios de uma aplicação de reserva de salas. Os exercícios no fim de cada tema pedem classificações, modelos, cálculos e decisões justificadas. Antes de abrir a solução, escreve a tua resposta e tenta encontrar um caso que a possa contradizer.

::::details[Avaliação e ano de referência: pesos, fórmula e regras de 2025/26]

A base destes apontamentos é o Moodle de **2025/26**, com aulas datadas da primavera de 2026, e a [ficha SIGARRA dessa ocorrência](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560102). Alguns materiais reutilizam páginas de anos anteriores. As regras gerais de Scrum abaixo seguem o Scrum Guide de 2020; quadros, estimativas e ferramentas apresentados nas aulas são escolhas do projeto, não novas regras obrigatórias do framework. A [ocorrência de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586995) ainda não tem o programa preenchido. Estes apontamentos não confirmam as regras do novo ano.

Em 2025/26, a avaliação era distribuída, sem exame final:

| Componente                 | Peso |
| -------------------------- | ---: |
| Participação nas aulas, PA |  15% |
| Projeto em equipa, TP      |  60% |
| Trabalhos individuais, TPC |  25% |

A fórmula publicada era $CF = \operatorname{round}(0{,}15PA + 0{,}60TP + 0{,}25TPC)$. A classificação do projeto era individual, podendo variar dentro da equipa. Para estudantes dispensados da assiduidade, a ficha retirava PA e atribuía 40% aos TPC. A frequência exigia participação efetiva no projeto e cumprimento das regras de assiduidade aplicáveis. Quem tinha dispensa precisava de apresentar regularmente a evolução do trabalho, com periodicidade acordada com os docentes, e de fazer a apresentação com os restantes estudantes. As entregas tinham as mesmas datas para todos. Só TPC podia ser melhorado na época de recurso, a pedido do estudante e com um trabalho individual extraordinário acordado. A ficha permitia aproveitar PA e TP do ano anterior, mas exigia TPC do ano corrente. Confirma no Moodle e na ficha do teu ano as entregas, dispensas, frequência e melhoria.

::::

::::details[Materiais e bibliografia: base de ensino, fichas e bibliografia]

O [Moodle de ES 2025/26](https://moodle2526.up.pt/course/view.php?id=4440) é a base docente: introdução e história, processos e RUP, Agile e Scrum, requisitos, simulação Scrum, verificação e validação, XP, arquitetura, padrões Scrum, construção, evolução, retrospetivas, desenvolvimento assistido por IA e apresentação de produtos. As referências externas incompletas não foram tratadas como material integral. Exemplos de projetos de alunos servem para observar artefactos, sem substituir o programa docente.

Origem temporal dos materiais reutilizados: Processos com capa 2024/25 e rodapés 2025/26; Arquitetura com páginas ASSO 2023/24; Padrões Scrum com rodapés 2024/25 e Guide 2017; Construção com capa 2024/25; Pitch adaptado de ES 2022/23; Mike Cohn de 6 de junho de 2014; projetos Top6 de 2023/24 com releases de maio de 2024; dashboard de 2025/26; guia dos monitores sem ano interno. As regras de Scrum seguem o Guide 2020 salvo indicação de prática local.

A ficha indica:

- Ian Sommerville, _Software Engineering_, 10.ª edição global, Pearson, 2015, ISBN 9781292096131. A [página do autor](https://iansommerville.com/software-engineering-book/) reúne recursos do livro.
- Russ Miles e Kim Hamilton, _Learning UML 2.0_, O'Reilly, 2006, ISBN 0-596-00982-8, como bibliografia complementar.

Para esclarecer regras e notação, consulta o [Scrum Guide de 2020](https://scrumguides.org/scrum-guide.html), a [especificação UML 2.5.1 da OMG](https://www.omg.org/spec/UML/2.5.1), o [Manifesto Ágil](https://agilemanifesto.org/iso/ptpt/manifesto.html) e os guias oficiais de [arquitetura](https://docs.flutter.dev/app-architecture/guide) e [testes em Flutter](https://docs.flutter.dev/testing/overview). O exemplo Flutter dos slides inspira separação de responsabilidades, não obriga a usar uma estrutura em todas as aplicações.

::::

::::details[Vídeos recomendados: o que observar em cada um]

- História da disciplina: [como a disciplina surgiu](/cadeiras/es/introducao/#como-a-disciplina-surgiu), com o webinar de Grady Booch. Observa como a evolução do hardware altera os problemas de organização, abstração e custo do software.
- Da necessidade à propriedade verificável: [tornar a afirmação verificável](/cadeiras/es/requisitos-uml/#tornar-a-afirmação-verificável), com a introdução à engenharia de requisitos. Observa a passagem da necessidade para propriedades verificáveis do sistema.
- Protótipos: [protótipos e mudanças](/cadeiras/es/requisitos-uml/#protótipos-e-mudanças), com o vídeo de prototipagem em papel. Observa como testar o percurso de um utilizador antes de implementar o ecrã.

Os vídeos complementam as explicações. Os exercícios destes apontamentos são próprios, não são provas anteriores nem previsões de perguntas de avaliação.

::::
