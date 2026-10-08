# Escolher prática e interação

## Exercícios que merecem ficar

Lê as fichas e resoluções docentes para reconhecer operações, notação, dificuldade e erros que a cadeira trabalha. Regista no arquivo privado os documentos e as páginas consultados. A frequência nas fichas ajuda a priorizar, mas não justifica inventar previsões do exame.

Para cada exercício existente, identifica a decisão que exige. Mantém-no se treina um objetivo relevante com dados e solução corretos. Reescreve-o se o objetivo é útil mas o enunciado entrega a resposta, as opções são artificiais ou a solução salta o passo principal. Junta ou elimina variantes que só trocam números sem mudar a decisão. Mantém variações quando mudam uma condição, um caso limite ou a estratégia necessária.

Uma cadeira pode ter poucas questões com várias alíneas ligadas. O aluno deve conseguir resolver cada pedido com a informação disponível, e a solução deve distinguir os resultados. Evita transformar toda a prática em escolha múltipla por ser fácil de corrigir.

### Exemplo: dependências funcionais

Três perguntas de reconhecimento, como nomear uma DF, reconhecer a seta e repetir a definição, podem dar lugar a este problema:

> Uma tabela guarda `Encomenda`, `Produto`, `Nome` e `Quantidade`. Cada produto tem um único nome atual e só aparece uma vez em cada encomenda.
>
> 1. Que dependência permite guardar o nome fora desta tabela?
> 2. `Encomenda → Quantidade` é garantida? Justifica com uma instância válida.
> 3. Que atributos identificam uma linha, segundo estas regras?

Uma solução precisa explica `Produto → Nome`; constrói a mesma encomenda com produtos e quantidades diferentes para refutar a segunda DF; e justifica a chave composta `Encomenda, Produto`. As regras dadas não tornam nenhum desses atributos, isoladamente, único.

Uma pista útil pode pedir para distinguir "a mesma encomenda" de "a mesma linha". Repetir a definição ou fornecer logo a chave não ajuda o aluno a escolher o próximo passo.

### Exemplo: teste de um programa

Um exercício sobre o máximo de uma lista pode pedir uma implementação e dois testes que exponham erros diferentes: uma lista com um único valor e uma lista só com valores negativos. A lista vazia precisa de um contrato explícito. Vinte testes com listas positivas de tamanhos parecidos acrescentam pouco à explicação.

A solução deve mostrar por que inicializar o máximo a zero falha nos negativos. O corretor automático verifica comportamento, incluindo uma implementação alternativa correta e uma errada. Não compara o texto da resposta com o da solução.

## Ajuda sem ocupar o enunciado

O leitor deve ver primeiro o problema e o espaço ou modo de resposta. A ação principal é verificar ou comparar com a solução. A ajuda fica disponível por escolha; ações secundárias e diagnósticos só aparecem quando são úteis.

Uma primeira pista orienta o método. Uma segunda só se justifica se desbloqueia outro passo. A resolução explica o raciocínio, e um erro frequente só precisa de um bloco próprio se acrescentar uma distinção que ainda não foi feita. Respeita o contrato atual dos componentes em CONTRIBUTING; não preenchas slots com frases vazias para simular ajuda. Se esse contrato impedir uma apresentação útil, comunica o problema ao integrador para corrigir o componente comum.

Na autoavaliação, a checklist tem critérios observáveis e curtos, como "justifiquei por que a união não é fechada". O texto do aluno não recebe uma classificação automática. Preserva a distinção no feedback.

## Uma interação, uma pergunta investigável

Antes de adicionar controlos, escreve a pergunta que eles permitem explorar. Depois escolhe as variáveis necessárias para a responder. O estado inicial já deve mostrar matéria; não obrigues o aluno a configurar a demonstração para ver o primeiro resultado.

| Pergunta                                          | Apresentação útil                                                                              | Controlos dispensáveis                                                                         |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Em que ciclo o consumidor pode receber o valor?   | Cronograma com produção, consumo e eventual bolha. Dois casos quando a disponibilidade difere. | Velocidade de reprodução numa figura estática, opções de ISA fora do modelo.                   |
| Por que apagar esta posição interrompe a procura? | Tabela hash antes da remoção e procura passo a passo depois.                                   | Editor de estilos, escolha de algoritmo antes de explicar o caso, painéis de métricas sem uso. |
| Como a taxa afeta o tempo de transmissão?         | Um parâmetro de taxa, dimensão fixa explícita e resultado com unidades.                        | Sliders para todas as constantes e várias formas de repor os valores.                          |
| Que região satisfaz estas restrições?             | Gráfico com retas identificadas e interseção legível.                                          | Tabela de coeficientes, consola e editor de código se o assunto é a geometria.                 |

Prefere estados lado a lado quando o aluno precisa de comparar. Usa interação quando mudar um valor altera uma relação importante. Usa movimento quando a ordem temporal é parte da explicação. Mantém uma interpretação acessível sem executar ou animar.

Ao simplificar uma demo existente, retira controlos sem função pedagógica, agrupa os que pertencem à mesma escolha e aproxima o resultado do valor que o altera. Conserva nomes acessíveis, teclado e valores válidos. Reutiliza tokens, ícones e componentes do projeto. Não acrescentes novos componentes globais a partir de uma revisão de cadeira sem coordenar com o integrador.

## Verificação

Resolve cada questão revista sem consultar a solução e confronta ambos os resultados. Verifica que as hipóteses bastam e que nenhuma resposta depende de adivinhar a intenção. Confirma o traço ou as contas do visual com um caso conhecido e um caso limite relevante.

No navegador, lê uma questão como aluno, pede ajuda e verifica uma resposta certa e uma errada. Numa demo, altera o parâmetro e confirma o significado da mudança. Revê a disposição a 320 px e em desktop, nos dois temas. Não uses contagem de exercícios, palavras ou visuais como prova de melhoria.

Confere o interior de cada figura, não apenas a largura da página. Um contentor com deslocação pode esconder o segundo caso ou um ramo inteiro sem fazer a página transbordar. Faz caber as relações de um diagrama pequeno: encurta rótulos repetidos, reparte linhas ou muda a disposição, mantendo letras legíveis. Para tabelas extensas ou diagramas que precisem de deslocação, percorre-os até ao fim com teclado e toque e confirma que o texto explica como ler a parte inicialmente oculta. Depois de corrigir, inspeciona a nova compilação.
