# Rever uma cadeira inteira

Antes deste percurso, lê `SKILL.md`, `exemplos.md` e `exercicios-visuais.md`. A revisão deve mudar a experiência de leitura e a qualidade da prática. Trocar palavras nas introduções ou acrescentar uma figura isolada não revê a cadeira.

## 1. Confirmar o que a cadeira ensina

Lê a ficha oficial, os materiais Moodle disponíveis e os enunciados da edição usada. Confirma o ano dentro dos documentos. A ficha define o âmbito; os materiais mostram a profundidade, a notação e os problemas praticados. Livros e documentação primária ajudam a verificar e explicar, mas não provam o que entra na avaliação atual.

No arquivo privado `_data/<cadeira>/`, regista as fontes efetivamente consultadas, o ano, os tópicos cobertos e o que não foi possível confirmar. Uma ligação na bibliografia não conta como leitura. Se uma fonte exigir acesso que não tens, regista a lacuna e continua com as fontes acessíveis, sem apresentar a cobertura como completa.

Antes de reescrever, relaciona todos os tópicos confirmados com as lições existentes. Identifica conteúdos essenciais ausentes, complementos e duplicações. O âmbito está definido quando cada tópico tem destino e cada lacuna de fontes está explícita.

## 2. Construir a ordem de aprendizagem

Lê todas as páginas da cadeira incluídas no pedido, incluindo exercícios, laboratórios, folhas de consulta e rascunhos. Anota, por página, o que o leitor já deve saber, o conceito novo e o problema que deve conseguir resolver. Confirma que os pré-requisitos vêm de cadeiras anteriores ou de uma explicação anterior deste percurso. A revisão de um rascunho não altera por si só a autorização para o publicar.

Reorganiza, divide ou junta páginas quando isso resolver uma dependência ou uma mudança de assunto. Mantém rotas e fragmentos existentes quando forem compatíveis com a nova estrutura. Se precisarem de mudar, atualiza todos os links e associações de exercícios; comunica ao integrador referências fora da tua cadeira. Conserva ids de exercícios sem mudança de significado e aumenta `revision` quando mudares a pergunta ou a resposta.

## 3. Ensinar cada passagem difícil

Segue cada explicação como aluno: consigo dizer o que significa este termo, por que se escolheu este passo e de onde saiu este resultado? Corrige o primeiro ponto onde a resposta depende de conhecimento ainda não ensinado. Rever só as aberturas não revê uma cadeira.

Problemas recorrentes que pedem uma correção concreta:

| Sinal                                                   | Correção                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Várias definições na mesma frase                        | Separa as ideias e mostra o objeto antes de acrescentar outro nome.                                    |
| Fórmula seguida imediatamente de números                | Explica as grandezas e condições, substitui com unidades e interpreta o resultado.                     |
| Técnica resumida em "racionaliza", "aplica" ou "logo"   | Mostra a transformação que um principiante ainda não sabe reconstruir.                                 |
| Tabela que apresenta pela primeira vez vários conceitos | Ensina um caso completo antes da comparação.                                                           |
| Ressalvas técnicas a interromper cada frase             | Mantém a condição necessária junto do método; desenvolve exceções depois de um exemplo básico correto. |
| Analogia tratada como definição                         | Conserva a definição exata e verifica um caso em que a analogia falha.                                 |
| Parágrafo a descrever uma sequência de estados          | Mostra os estados numa tabela, num esquema ou em linhas de cálculo, com a razão de cada transição.     |
| Código completo que esconde a técnica ensinada          | Explica a operação nova e separa apoio repetitivo, usando os componentes existentes.                   |

Simplificar exige verificar a afirmação resultante. Por exemplo, um corpo eletricamente neutro tem carga total nula, mas pode sofrer atração por polarização. "Não exerce forças à distância" muda a física. Do mesmo modo, uma variável estatística é a característica medida, não cada valor observado.

## 4. Selecionar a prática

Revê cada questão contra os objetivos e os problemas das fichas docentes. Decide mantê-la, reescrevê-la, juntá-la a outra ou eliminá-la. Regista no arquivo privado a decisão e o motivo. Uma redução é útil quando conserva as decisões diferentes que o aluno precisa de treinar; um total menor, por si só, não prova qualidade.

Substitui perguntas de reconhecimento repetidas por problemas que peçam aplicar, justificar, diagnosticar ou comparar. Conserva variações que mudam a estratégia, uma hipótese ou um caso limite. Resolve os enunciados revistos antes de escrever a solução final. Segue os exemplos em `exercicios-visuais.md`.

Quando eliminas a última questão de um conjunto, retira a associação `practices` da lição e trata a rota antiga segundo os contratos do projeto. Se preservares um conjunto com menos questões, confirma que a descrição e a folha de consulta continuam coerentes. Não deixes listas vazias ou ligações a tópicos renomeados.

## 5. Escolher o apoio visual

Escolhe o formato pela dúvida: uma tabela para comparar casos, um gráfico para relacionar grandezas, um diagrama para mostrar ligações, uma sequência de estados para seguir um algoritmo. Uma interação serve para o aluno prever e observar o efeito de um parâmetro. Usa Manim quando o movimento, e não apenas dois estados lado a lado, ensina a mudança.

O texto deve dizer o que observar e explicar a conclusão. Conserva a interpretação e o exemplo essenciais sem interação. Segue o CONTRIBUTING para componentes, rótulos, temas e validação no navegador.

Revê também as demos que já existem. Identifica a pergunta que cada uma responde e retira os controlos que não ajudam a investigá-la. Prefere uma figura quando apenas mostra o mesmo resultado sem uma escolha significativa. Não acrescentes uma demo para compensar uma explicação que continua incompleta.

## 6. Conferir o percurso completo

Refaz contas, executa exemplos alterados e confronta as afirmações técnicas com as fontes. Confirma que os exercícios só exigem matéria já ensinada, que as soluções justificam as escolhas e que a folha de consulta coincide com as lições.

Relê todas as páginas na nova ordem. A revisão acaba quando cada página e cada questão têm uma decisão explícita, os tópicos confirmados têm explicação adequada e a prática selecionada cobre decisões relevantes. Guarda esse registo apenas no arquivo privado; não publiques um relatório de revisão nas lições. Identifica quais os exemplos que verificaste por execução, cálculo ou fonte, e quais as páginas que observaste no navegador.

Entrega ao autor as alterações principais, fontes e anos consultados, verificações executadas e lacunas. Distingue a revisão pedagógica, a conferência de fontes e os checks técnicos; um build correto não prova a matéria.
