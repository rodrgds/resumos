# Rever como quem aprende pela primeira vez

## 1. Confirmar o que a cadeira ensina

Lê a ficha oficial, os materiais Moodle disponíveis e os enunciados da edição usada. Confirma o ano dentro dos documentos. A ficha define o âmbito; os materiais mostram a profundidade, a notação e os problemas praticados. Livros e documentação primária ajudam a verificar e explicar, mas não provam o que entra na avaliação atual.

No arquivo privado `_data/<cadeira>/`, regista as fontes efetivamente consultadas, o ano, os tópicos cobertos e o que não foi possível confirmar. Uma ligação na bibliografia não conta como leitura. Se uma fonte exigir acesso que não tens, regista a lacuna e continua com as fontes acessíveis, sem apresentar a cobertura como completa.

Antes de reescrever, relaciona todos os tópicos confirmados com as lições existentes. Identifica conteúdos essenciais ausentes, complementos e duplicações. O âmbito está definido quando cada tópico tem destino e cada lacuna de fontes está explícita.

## 2. Construir a ordem de aprendizagem

Lê todas as páginas publicadas da cadeira, incluindo exercícios, laboratórios e folhas de consulta. Anota, por página, o que o leitor já deve saber, o conceito novo e o problema que deve conseguir resolver. Confirma que os pré-requisitos vêm de cadeiras anteriores ou de uma explicação anterior deste percurso.

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

## 4. Escolher o apoio visual

Escolhe o formato pela dúvida: uma tabela para comparar casos, um gráfico para relacionar grandezas, um diagrama para mostrar ligações, uma sequência de estados para seguir um algoritmo. Uma interação serve para o aluno prever e observar o efeito de um parâmetro. Usa Manim quando o movimento, e não apenas dois estados lado a lado, ensina a mudança.

O texto deve dizer o que observar e explicar a conclusão. Conserva a interpretação e o exemplo essenciais sem interação. Segue o CONTRIBUTING para componentes, rótulos, temas e validação no navegador.

## 5. Conferir o percurso completo

Refaz contas, executa exemplos alterados e confronta as afirmações técnicas com as fontes. Confirma que os exercícios só exigem matéria já ensinada, que as soluções justificam as escolhas e que a folha de consulta coincide com as lições.

Relê todas as páginas na nova ordem. A revisão acaba quando cada página tem uma decisão explícita, alterada ou mantida por estar clara e correta, e os tópicos confirmados têm explicação e prática adequadas. Guarda esse registo apenas no arquivo privado; não publiques um relatório de revisão nas lições.

Entrega ao autor as alterações principais, fontes e anos consultados, verificações executadas e lacunas. Distingue a revisão pedagógica, a conferência de fontes e os checks técnicos; um build correto não prova a matéria.
