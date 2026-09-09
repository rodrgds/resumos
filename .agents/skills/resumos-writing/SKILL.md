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

## Guias práticos

Começa pelo resultado pretendido e pelas condições necessárias. Se houver alternativas por sistema operativo ou ambiente, separa-as antes dos comandos.

Cada passo deve dizer onde agir, o que escrever ou selecionar e como reconhecer que funcionou. Explica os valores que o leitor tem de substituir. Distingue comandos da shell, código num ficheiro e instruções de uma consola interativa.

Coloca o aviso junto da ação a que se aplica. Quando for relevante, diz que processo deve continuar aberto, como o parar e o que fica guardado. Para uma falha provável, dá o sintoma e uma verificação concreta.

Um guia de consulta, como um glossário ou FAQ, pode usar entradas independentes. Não o transformes numa sequência artificial.

## Organizar a leitura

Usa parágrafos para raciocinar, listas para passos ou casos e tabelas para comparar as mesmas propriedades. Destaca o termo novo ou a condição decisiva, sem pôr parágrafos inteiros a negrito.

Mantém a explicação principal e o exemplo necessário visíveis. Demonstrações extensas, alternativas e aprofundamentos podem ficar numa secção separada ou num bloco expansível suportado pelo projeto. Uma folha de consulta pode ser compacta, mas deve conservar condições de aplicação e ligar à explicação.

Uma figura deve mostrar uma relação, um estado ou uma mudança. Diz no texto o que observar e descreve o conteúdo no texto alternativo. Cores e setas complementam os nomes; a explicação deve continuar a funcionar sem distinguir cores.

## Rever antes de entregar

- Refaz as contas e verifica o resultado. Executa os exemplos de código e os comandos no ambiente indicado quando disponível; identifica o que ficou por verificar.
- Procura cada "logo", "portanto" e "como podemos ver". Confirma que a página contém a razão ou a observação necessária para essa conclusão.
- Confirma que cada conceito novo tem explicação ou um pré-requisito explícito, e que cada exemplo tem um resultado interpretado.
- Lê em voz alta os parágrafos mais densos. Troca a expressão formal pela que dirias a um colega, preservando o significado técnico.
- Verifica fontes, atribuições e âmbito. Não inventes experiências de aluno, conselhos de docentes ou promessas sobre o exame. Usa exemplos próprios e identifica adaptações.
- Numa revisão, conserva as distinções corretas do original. Corrige erros demonstráveis; assinala dúvidas técnicas em vez de as esconder com uma frase mais fluida.

Entrega o conteúdo pedido. As notas de revisão e as verificações pertencem à resposta ao autor, fora da página destinada aos alunos.
