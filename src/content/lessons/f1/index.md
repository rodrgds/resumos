---
title: Física I
description: Mecânica newtoniana, com modelos, exemplos resolvidos e exercícios de cinemática, forças, energia, colisões, rotação e oscilações.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  review:
    edition: 2025/26
    reviewer: Codex
    date: '2026-10-03'
  sources:
    - title: Física I, L.EIC008, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560093
    - title: Física I, L.EIC008, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586986
    - title: F. Salzedas, transcrição das transparências, 27 de maio de 2026
      url: https://pages.up.pt/~up334829/Fisica1_leic/leicFisica1.htm
    - title: Moodle Física I, L.EIC, 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=5260
    - title: University Physics, Volume 1, OpenStax
      url: https://openstax.org/details/books/university-physics-volume-1
    - title: Jaime E. Villate, Dinâmica e Sistemas Dinâmicos
      url: https://villate.org/dinamica/
  coverage: Programa de mecânica da ficha preenchida e tópicos das transparências de Salzedas, com exemplos próprios, exercícios e análise de oscilações experimentais.
  gaps:
    - A ficha de 2026/27, consultada em 3 de outubro de 2026, ainda não apresenta programa nem avaliação.
    - Não foram consultados materiais do Moodle de 2026/27.
    - O arquivo Moodle de 2024/25 contém o relatório experimental, mas não o guia experimental nem o programa Python referido nesse relatório.
---

No fim de Física I consegues prever um movimento com um modelo simples, ou seja escolhes o sistema, fixas as hipóteses e comparas a previsão com uma medição. Vais relacionar posição, forças e energia para obter essa previsão, porque cada equação representa a situação física que escolheste.

Precisas de vetores, derivadas, integrais e equações diferenciais simples, por isso usa as páginas de [AM1](/cadeiras/am1/) quando o cálculo travar. Os exemplos usam unidades SI e $g=9{,}81\ \mathrm{m/s^2}$, salvo indicação em contrário.

## Percurso

1. [Cinemática](/cadeiras/f1/cinematica/): reconstruir movimentos, separar variáveis e distinguir aceleração tangencial de normal.
2. [Leis de Newton](/cadeiras/f1/leis-newton/): escolher um referencial, desenhar forças e resolver contactos, atrito e movimento circular.
3. [Trabalho e energia](/cadeiras/f1/trabalho-energia/): comparar estados, calcular trabalho e reconhecer equilíbrio e estabilidade.
4. [Centro de massa e momento linear](/cadeiras/f1/centro-massa-momento/): delimitar um sistema, calcular impulsos e resolver colisões.
5. [Rotação](/cadeiras/f1/rotacao/): calcular torques e inércias, impor equilíbrio e resolver rolamento, roldanas e pêndulos físicos.
6. [Oscilações](/cadeiras/f1/oscilacoes/): determinar fase, energia, amortecimento e resposta a uma força periódica.
7. [Medir oscilações](/cadeiras/f1/medir-oscilacoes/): interpretar picos, período, decremento logarítmico e limites de um ajuste experimental.

Cada tema tem exercícios próprios com duas pistas e uma resolução. Tenta resolver antes de abrir a ajuda, porque a pista só ajuda quando já tentaste um caminho. A [cheat sheet](/cadeiras/f1/folha-consulta/) reúne fórmulas e condições depois de estudares as explicações.

## Como resolver um problema

Escolhe o corpo ou conjunto de corpos e o intervalo de tempo. Desenha eixos e fixa sinais, ou seja decide o positivo antes de escrever equações. Num problema de forças, representa apenas as forças que atuam nesse corpo, porque a força que esse corpo exerce noutro pertence a outro diagrama. Num problema de conservação, escreve a condição que permite conservar a grandeza. Por exemplo, momento linear exige impulso externo nulo, enquanto energia mecânica exige trabalho total nulo das forças que não estão incluídas no potencial.

Substitui os números depois de obteres as relações. Confirma unidades, sinais e casos limite, por isso lê um resultado estranho como aviso do modelo. Uma normal negativa significa que o contacto suposto não pode existir. Uma energia cinética negativa significa que o estado não é acessível. Uma velocidade negativa apenas indica movimento contrário ao eixo escolhido.

## Programa e avaliação

:::details[Ver base e regras de 2025/26]
A base é a [ficha preenchida de 2025/26, L.EIC008](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560093), comparada com as transparências de F. Salzedas datadas de 27 de maio de 2026. A [ocorrência de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586986) já existe, mas, na consulta de 3 de outubro de 2026, ainda não apresenta programa nem regras de avaliação. Não se devem transportar automaticamente as regras anteriores para essa edição.

Em **2025/26**, a ficha define $\mathrm{CF}=\min(0{,}4\max(\mathrm{AD},E_1)+0{,}6E_2+\mathrm{AF},20)$. AD é o teste individual, $E_1$ a parte do exame sobre essa matéria e $E_2$ a parte sobre a restante matéria. AF vale no máximo um valor e só se aplica quando há aprovação sem esse acréscimo. A ficha também distingue a assiduidade da primeira inscrição e a dos repetentes. Confirma sempre a edição aplicável e os avisos docentes antes de uma prova.
:::

## Fontes e limites

:::details[Ver fontes e âmbito]

- **Materiais da cadeira:** [transparências de F. Salzedas](https://pages.up.pt/~up334829/Fisica1_leic/leicFisica1.htm), coleção de problemas e lista das aulas TP de 2024/25. A coleção identifica problemas de _Physics for Scientists and Engineers_, 5.ª edição. Os exemplos e exercícios destas páginas são próprios, não transcrições desses problemas.
- **Moodle de 2024/25:** o [arquivo da cadeira](https://moodle2425.up.pt/course/view.php?id=5260) disponibiliza o relatório do estudo do oscilador amortecido com o acelerómetro de um smartphone. O relatório confirma esse ano. O guia experimental e o programa de tratamento de dados referido no relatório não constam dos ficheiros disponíveis; a página de medição ensina a análise física, sem substituir as instruções de submissão.
- **Bibliografia indicada pela FEUP:** Tipler e Mosca, _Physics for Scientists and Engineers_, ISBN 0-7167-4389-2; Young e Freedman, _Sears and Zemansky's University Physics with Modern Physics_, ISBN 0-321-20469-7. Nussenzveig, _Curso de Física Básica_, volume 1, ISBN 85-212-0046-3, é complementar. Os textos integrais dessas edições não foram consultados nesta revisão.
- **Apoio aberto:** [_University Physics_, volume 1, OpenStax](https://openstax.org/details/books/university-physics-volume-1), sobretudo capítulos 2 a 11 e 15, e [_Dinâmica e Sistemas Dinâmicos_, Jaime E. Villate](https://villate.org/dinamica/). A cópia local de Villate indica fevereiro de 2019 e ISBN 978-972-99396-1-7. A ligação aponta para a versão Web posterior. Este apoio histórico não define o programa nem a avaliação atuais.
  :::
