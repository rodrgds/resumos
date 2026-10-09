---
name: resumos-tldr
description: Escrever e rever versões TLDR de lições dos Resumos FEUP, com definições, condições, fórmulas e visuais essenciais. Usar para o modo de leitura rápida, mantendo a lição completa como explicação de referência.
---

# TLDR de uma lição

O leitor já estudou a matéria e quer recuperar o que precisa de saber e aplicar. O TLDR deve permitir encontrar uma definição, escolher um método ou conferir uma condição em poucos segundos. É uma versão escrita para consulta, não o início da lição cortado a meio nem uma lista de títulos.

Antes de escrever, lê a lição completa, a skill [resumos-writing](../resumos-writing/SKILL.md) e os [exemplos TLDR](references/exemplos.md). Consulta as fontes e os exercícios associados quando precisares de decidir prioridades ou resolver uma ambiguidade. A lição fornece o âmbito; os materiais docentes confirmam o que está certo. Conserva as lacunas editoriais existentes.

## Selecionar o essencial

Identifica o que o aluno tem de reconhecer, calcular, construir ou distinguir neste tópico. Conserva:

- Definições com as condições que as tornam exatas.
- Fórmulas com domínio, significado dos símbolos e unidades quando relevantes.
- A decisão que escolhe um método, seguida dos seus passos indispensáveis.
- Uma distinção ou um contraexemplo que impeça um erro provável.
- Um exemplo pequeno quando uma regra isolada não chega para a aplicar.

Retira a motivação extensa, a narração repetida do exemplo, demonstrações longas, exercícios em série e variantes que não mudam a decisão. Se um resultado depende de independência, ordenação, sinal dos pesos, completude ou outra hipótese, mantém essa hipótese junto dele. Uma omissão que transforma uma afirmação em falsa não é uma simplificação.

O alvo habitual é cerca de **um quarto a um terço** do corpo explicativo original. Pode ser menor se os conceitos couberem com clareza, ou maior numa lição já curta. Usa a proporção para detetar excesso, não como quota: conta a informação que o leitor vê, não imports, frontmatter, código de SVG ou resoluções de exercícios. Não enchas um resumo curto para atingir um mínimo.

## Escrever para consulta

Começa no primeiro tópico. Os títulos nomeiam a matéria, como "Fecho-ε", "Condições da binomial" ou "Atualização das distâncias". Evita uma abertura a anunciar o TLDR e um fecho a repetir a página.

Usa bullets curtos para factos paralelos, números para procedimentos e tabelas para comparar alternativas. Um bullet pode ter duas frases se a segunda preserva uma condição ou explica uma consequência. Evita blocos de prosa com um marcador à frente, listas dentro de listas e abreviaturas que obriguem a decifrar o texto.

Uma fórmula não substitui a definição das suas grandezas. Mantém quantificadores, desigualdades estritas, direção das implicações, casos de igualdade, convenções e complexidade associada ao algoritmo e ao modelo de entrada corretos. Distingue condição necessária de suficiente, exemplo de prova e testes de equivalência.

Põe fórmulas compridas num bloco próprio, com frações ou linhas alinhadas quando isso facilitar a leitura. Confere a 320 px: a expressão pode precisar de deslocação horizontal dentro do bloco, mas não deve alargar a página.

Usa PT-PT e os termos da lição. Destaca apenas o termo ou a condição que se procura. Acrescenta uma ligação à secção completa quando o leitor possa precisar de reconstruir uma demonstração ou um cálculo, com texto que nomeie esse conteúdo. A ligação não substitui a regra essencial que o TLDR tem de dizer.

## Visuais e código

Conserva um visual quando se lê mais depressa do que a explicação que substitui. Uma tabela de estados, um gráfico com região identificada, uma árvore ou um cronograma podem ser o centro do resumo.

Reutiliza figuras e componentes existentes. Escolhe Manim quando ver a ordem da mudança é a parte importante e mantém uma descrição que permita compreender o resultado sem reproduzir o vídeo. Um laboratório editável só merece ficar se experimentar um valor ajudar à consulta; em páginas dominadas por controlos, prefere um caso preenchido ou a figura essencial com ligação ao laboratório completo.

Um pequeno bloco de código deve ter entrada e efeito claros. Mantém o editor executável quando correr ou alterar esse bloco for a operação que se está a recordar. Não copies todos os visuais ou editores da lição por estarem disponíveis. Também não transformes uma cadeira visual numa parede de bullets.

## Ficheiros e integração

Escreve em `src/content/tldr/<cadeira>/<slug>.md` ou `.mdx`, com o mesmo identificador da lição em `src/content/lessons/`. O título e a descrição vêm da lição; não é necessário frontmatter. Para componentes em MDX, os imports mantêm a profundidade `../../../components/`.

O modo TLDR destina-se às lições das secções `conteudo` e `laboratorios`, com `studyKind: lesson`. Apresentações, páginas só de exercícios, guias, recursos, cheat sheets e a cadeira fictícia não recebem uma segunda versão. Um resumo nunca publica uma lição em rascunho. Mantém os créditos no original e as notas de revisão no arquivo privado `_data/`.

Ao alterar conceitos, condições, exemplos ou o âmbito de uma lição, revê também o seu TLDR. Uma lição nova dentro deste âmbito recebe uma síntese própria. Alterações de apresentação sem efeito no conteúdo não exigem reescrever a síntese.

Usa ligações absolutas para a explicação completa, com fragmentos conferidos nos títulos. O contrato de rotas, preferências e impressão está em [docs/leitura.md](../../../docs/leitura.md); a sintaxe de componentes está em [CONTRIBUTING.md](../../../CONTRIBUTING.md).

## Rever a entrega

Lê o TLDR sem alternar para a lição: é possível identificar a regra, as hipóteses e o próximo passo? Depois compara ambos e procura condições perdidas, símbolos sem definição e conclusões mais fortes do que as fontes permitem.

Refaz os exemplos e contas. Verifica os links e a renderização de fórmulas, tabelas e visuais. Inspeciona amostras representativas em desktop e a 320 px, nos dois temas, e a impressão. O build valida a integração; não decide se a seleção ajuda o aluno.

Numa tarefa de várias cadeiras, cada agente tem uma lista explícita de lições e só escreve nesse conjunto. Regista cobertura e exceções para o integrador conferir que não ficaram páginas esquecidas. Gera a lista de trabalho por código se for útil, mas escreve e revê cada resumo a partir da lição: extrair automaticamente primeiras frases ou cabeçalhos não produz um TLDR.
