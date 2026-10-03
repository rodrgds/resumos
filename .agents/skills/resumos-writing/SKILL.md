---
name: resumos-writing
description: Escrever ou rever resumos de cadeiras, exercícios resolvidos e guias práticos dos Resumos FEUP, em português europeu simples e explícito, inspirado nos Resumos LEIC.
---

# Escrever para quem está a aprender

Escreve como um colega que percebeu a matéria e se sentou ao lado do leitor para a explicar. O leitor pode estar a aprender pela primeira vez ou a rever antes de resolver exercícios. Precisa de perceber o que acontece, porquê e como aplicar a ideia.

A referência é o modo de explicar dos [Resumos LEIC](https://resumos.leic.pt/). As regras abaixo são uma adaptação editorial para este projeto. O levantamento e as diferenças entre cadeiras estão em [Fontes](references/fontes.md), para quando precisares de comparar com o original.

## Preparar

1. Identifica o que o leitor deve conseguir fazer no fim da página e o que já precisa de saber. Lê os materiais da cadeira e as páginas vizinhas. Fica com um âmbito concreto, os pré-requisitos e as fontes das afirmações técnicas.
2. Escolhe um exemplo pequeno que permita seguir a explicação até ao resultado. Lê o [exemplo do mesmo tipo](references/exemplos.md) se estiveres a escrever uma página nova ou a mudar o tom de uma existente.
3. Escreve e revê com as regras abaixo. Termina quando o leitor conseguir refazer o exemplo, perceber a razão dos passos e reconhecer as condições em que o método se aplica.

Para criar ou alterar ficheiros de conteúdo, segue o [CONTRIBUTING.md](../../../CONTRIBUTING.md). O site do Técnico é uma referência de escrita; o programa, a notação e as regras de avaliação vêm da cadeira da FEUP e do ano em causa.

## Voz e linguagem

- Usa português europeu natural: "ficheiro", "ecrã", "utilizador", "guardar", "correr o programa". Mantém a terminologia da cadeira, mesmo quando existe outro termo igualmente correto.
- Usa "tu" para instruções, como "abre", "escolhe" e "confirma". Nas explicações, "vamos", "temos" e "podemos" ajudam a acompanhar o raciocínio. Uma definição pode começar simplesmente por "Uma pilha é...".
- Começa pela ideia ou pelo problema concreto. Dispensa a apresentação solene da importância do tema.
- Prefere verbos: "calculamos a média". Dá um nome ao que age: "o servidor envia a resposta". Mantém as frases curtas, mas liga as que formam um raciocínio.
- Usa "ou seja" para traduzir uma definição; "porque" para justificar; "por isso" para concluir. Cada ligação deve acrescentar a explicação que promete.
- Apresenta o termo técnico e explica-o logo. Acrescenta o nome inglês quando ajudar a reconhecer os slides, a documentação ou o código. Depois usa o mesmo nome, sem alternar sinónimos só para variar.
- A proximidade vem da atenção às dúvidas. Uma observação informal cabe quando ajuda; piadas, saudações e entusiasmo não são uma etapa obrigatória.
- Substitui "é óbvio", "é trivial" ou "basta aplicar" pelo passo que falta. Explica a dificuldade sem avaliar a capacidade do leitor.
- Usa títulos curtos sobre a matéria: "Como escolher o pivô", "Quando há colisões". Escreve em frase normal, sem maiúsculas em cada palavra. Separa orações com pontos ou vírgulas, sem travessões.

## Começar sem presumir nada

- A primeira lição de cada cadeira parte do zero. O primeiro parágrafo usa só termos do dia a dia ou define cada termo na mesma frase em que aparece.
- Não abras com um exemplo que usa conceitos que a página ainda não apresentou. Antes de converter 3661 segundos, diz o que é um programa e um inteiro; antes de usar uma matriz para guardar coeficientes, mostra que uma matriz é um quadro de números.
- A ordem é: mostra o objeto concreto, dá-lhe nome, só depois usa-o para resolver alguma coisa. Cada página só usa termos definidos nela ou em páginas anteriores do percurso; um termo futuro precisa de definição de uma frase.
- Quando reescreves uma abertura, consulta a versão anterior da página no histórico do Git. Recupera o que ela ensinava bem em vez de inventares uma entrada nova.

## Explicar sem saltos

Apresenta a ideia em palavras, dá a definição precisa e usa-a num exemplo. A ordem pode mudar quando um problema concreto é a melhor entrada. Isto é uma progressão de raciocínio, não um molde de secções obrigatório.

- Quando introduces uma técnica, mostra a necessidade que resolve. Para apresentar uma tabela de dispersão, começa pela procura de um valor através de uma chave.
- Liga ao que o leitor já conhece com uma recordação curta e um link preciso. A frase deve continuar a fazer sentido para quem chegou diretamente da pesquisa.
- Define símbolos, unidades e convenções junto da primeira utilização. Mantém cada nome e símbolo associado à mesma coisa ao longo do texto, código e figuras.
- Conserva hipóteses, quantificadores e limites da definição. Uma analogia ajuda a compreender; indica onde deixa de corresponder ao conceito técnico.
- Num exercício, dá o enunciado, justifica a escolha do método, mostra as transformações relevantes e interpreta o resultado na situação inicial. Explica especialmente a passagem em que um aluno pode ficar preso.
- Usa valores concretos e reutiliza o mesmo cenário enquanto for útil. Mostra um contraexemplo ou caso limite quando ajudar a distinguir conceitos ou revelar uma condição necessária.
- Num algoritmo, segue o estado dos dados, explica a escolha de cada passo e por que termina. Se apresentares complexidade, diz o que mede o tamanho da entrada e qual o custo que estás a contar.
- Num bloco de código, mostra a entrada e a saída ou o efeito observável. Explica a operação nova e a diferença entre calcular um valor e alterar os dados. Indica quando o trecho é apenas um excerto.

Ser conciso é retirar repetição. Mantém as frases que permitem reconstruir o raciocínio, mesmo quando tornam a página mais longa.

## Rever uma cadeira inteira

Quando preparares uma cadeira para exames, relaciona cada tópico dos materiais do Moodle do aluno com a explicação, um exemplo resolvido e uma oportunidade de prática. Usa esses materiais como base, confirmando o ano nos ficheiros; livros e outras fontes completam a explicação. A apresentação da cadeira reúne o percurso de estudo, a bibliografia e as ligações às fontes. As lições ensinam a matéria, sem notas sobre a recolha ou citações bibliográficas no corpo. Metadados editoriais no frontmatter são opcionais. Guarda downloads, inventários e notas de revisão apenas no arquivo local ignorado; não cries relatórios de cobertura nem testes que repitam o conteúdo.

Confirma o ano nos próprios ficheiros, além do endereço do Moodle. Se uma apresentação antiga contradisser a ficha atual, conserva a origem e a dúvida no registo editorial. Uma fonte indisponível continua a ser uma lacuna, mesmo quando um livro cobre o mesmo tema. Distingue exercícios próprios, adaptações e provas antigas; uma prova anterior ajuda a escolher tipos de problemas, mas não confirma as regras do exame atual.

As lições ensinam a matéria e mostram os passos necessários. As cheat sheets concentram fórmulas, condições, distinções e erros frequentes, com links para a explicação. Nos exemplos de código, confirma a versão das bibliotecas e a saída do bloco efetivamente publicado. Numa simulação, explicita as hipóteses do modelo e mostra o efeito de mudar os valores. A matéria vem primeiro: usa `InteractiveDemo` com controlos do tema e um visual, sem editores HTML/CSS/JS, cabeçalhos ou ações extra. Mostra código apenas quando corrê-lo ou editá-lo ensina a técnica. Reserva `WebPlayground` para desenvolvimento web. Coloca cada vídeo recomendado na lição do conceito que ele ajuda a visualizar; indica a dúvida que cada um resolve e o que observar. A apresentação da cadeira liga para essas secções em vez de incorporar players.

## Guias práticos

Começa pelo resultado pretendido e pelas condições necessárias. Se houver alternativas por sistema operativo ou ambiente, separa-as antes dos comandos.

Cada passo deve dizer onde agir, o que escrever ou selecionar e como reconhecer que funcionou. Explica os valores que o leitor tem de substituir. Distingue comandos da shell, código num ficheiro e instruções de uma consola interativa.

Coloca o aviso junto da ação a que se aplica. Quando for relevante, diz que processo deve continuar aberto, como o parar e o que fica guardado. Para uma falha provável, dá o sintoma e uma verificação concreta.

Um guia de consulta, como um glossário ou FAQ, pode usar entradas independentes. Não o transformes numa sequência artificial.

## Organizar a leitura

Usa parágrafos para raciocinar, listas para passos ou casos e tabelas para comparar as mesmas propriedades. Destaca o termo novo ou a condição decisiva, sem pôr parágrafos inteiros a negrito.

Mantém a explicação principal e o exemplo necessário visíveis. Demonstrações extensas, alternativas e aprofundamentos podem ficar numa secção separada ou num bloco expansível suportado pelo projeto. Um bloco expansível traz o próprio título; não repitas esse título num cabeçalho ao lado. Na apresentação da cadeira, a avaliação, as fontes e os vídeos vivem dentro dos toggles, sem cabeçalhos duplicados. Uma folha de consulta pode ser compacta, mas deve conservar condições de aplicação e ligar à explicação.

Para máquinas de estados e grafos com arestas legendadas que se cruzam, usa DOT; reserva o Mermaid para fluxos lineares simples e sequências. Uma figura deve mostrar uma relação, um estado ou uma mudança. Diz no texto o que observar e descreve o conteúdo no texto alternativo. Cores e setas complementam os nomes; a explicação deve continuar a funcionar sem distinguir cores. Confirma a legibilidade dos rótulos num ecrã de telemóvel. Se reduzir um SVG tornar o texto demasiado pequeno, adapta a disposição ou permite deslocar a figura sem reduzir as letras. Usa as cores existentes do site e verifica no browser se as curvas aparecem nos dois temas e se cada controlo tem um nome descritivo para leitores de ecrã.

## Rever antes de entregar

- Refaz as contas e verifica o resultado. Executa os exemplos de código e os comandos no ambiente indicado quando disponível; identifica o que ficou por verificar.
- Procura cada "logo", "portanto" e "como podemos ver". Confirma que a página contém a razão ou a observação necessária para essa conclusão.
- Confirma que cada conceito novo tem explicação ou um pré-requisito explícito, e que cada exemplo tem um resultado interpretado.
- Lê em voz alta os parágrafos mais densos. Troca a expressão formal pela que dirias a um colega, preservando o significado técnico.
- Verifica fontes, atribuições e âmbito. Não inventes experiências de aluno, conselhos de docentes ou promessas sobre o exame. Usa exemplos próprios e identifica adaptações.
- Numa revisão, conserva as distinções corretas do original. Corrige erros demonstráveis; assinala dúvidas técnicas em vez de as esconder com uma frase mais fluida.

Entrega o conteúdo pedido. As notas de revisão e as verificações pertencem à resposta ao autor, fora da página destinada aos alunos.
